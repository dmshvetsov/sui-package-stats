import * as fs from 'fs/promises'
import * as assert from 'assert'
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client'
import * as percentile from 'just-percentile'
import log from './log'

export async function writeToFile(fileName: string, s: string) {
  return fs.writeFile(fileName, s)
}

function internalPercentile(acc: number[] | IterableIterator<number>, p: number) {
  const arr = Array.isArray(acc) ? acc : Array.from(acc)
  return Math.round((percentile as unknown as (acc: number[], p: number) => number)(arr, p))
}

const NETWORKS = Object.freeze(['localnet', 'testnet', 'devnet', 'mainnet'] as const)
type Network = (typeof NETWORKS)[number]

const getNetwork = (): Network => {
  if (!process.env.NETWORK) {
    return 'devnet'
  }
  assert(
    NETWORKS.includes(process.env.NETWORK as Network),
    'unsupported environment variable NETWORK'
  )
  return process.env.NETWORK as Network
}

function getOwner(bc: any): string | null {
  if (bc.owner.AddressOwner) {
    return bc.owner.AddressOwner
  } else if (bc.owner.ObjectOwner) {
    return bc.owner.ObjectOwner
  }
  // unknown type of owner or shared owner
  return null
}

// create a client connected to devnet
const client = new SuiClient({ url: getFullnodeUrl(getNetwork()) })

const USDC_COIN = '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN'
const CETUS_PACKAGE = '0x12fc0b1791df55bf2c91921f12152659c4a897fa6867144b5b3939a3ea004c46'
const TURBOSFINANCE_PACKAGE = '0xeb9210e2980489154cc3c293432b9a1b1300edd0d580fe2269dd9cda34baee6d'
const KRIYADEX_PACKAGE = '0xa0eba10b173538c8fecca1dff298e488402cc9ff374f8a12ca7758eebe830b66'
const DEFI_FN = [
  CETUS_PACKAGE + '::router::swap_ab_bc',
  CETUS_PACKAGE + '::router::swap_ab_cb',
  CETUS_PACKAGE + '::router::swap_ba_bc',
  CETUS_PACKAGE + '::router::swap_ba_cb',
  CETUS_PACKAGE + '::router::swap',
  TURBOSFINANCE_PACKAGE + '::swap_router::swap_a_b',
  TURBOSFINANCE_PACKAGE + '::swap_router::swap_b_a',
  KRIYADEX_PACKAGE + '::spot_dex::swap_token_y',
  KRIYADEX_PACKAGE + '::spot_dex::swap_token_x'
]

// client
//   .getCoins({
//     owner: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214'
//   })
//   .then(log.info)
//   .catch(log.error)

// client
//   .getTransactionBlock({
//     digest: '9VFEXApF2QeyJWqrPN5r7FJZgJHvY9ZTNzsL9VzWKuAF',
//     options: {
//       showEffects: true,
//       showInput: true,
//       showEvents: true,
//       showObjectChanges: true,
//       showBalanceChanges: true,
//       showRawInput: true
//     }
//   })
//   .then(log.info)
//   .catch(log.error)

// client
//   .queryTransactionBlocks({
//     filter: {
//       MoveFunction: {
//         package: '0xeb9210e2980489154cc3c293432b9a1b1300edd0d580fe2269dd9cda34baee6d',
//         module: 'swap_router',
//         function: 'swap_b_a'
//       }
//     },
//     options: {
//       showBalanceChanges: true
//     },
//     order: 'descending'
//   })
//   .then(log.info)
//   .catch(log.error)

async function aggregateNumberOfTx(
  fnSignature: string,
  untilTimestamp: number,
  acc: Map<string, number> = new Map(),
  cursor?: string
) {
  const [pkgName, modName, fnName] = fnSignature.split('::')
  assert(typeof pkgName === 'string', 'invalid function signature, missing package, module, and function names')
  assert(typeof modName === 'string', 'invalid function signature, missing module, and function names')
  assert(typeof fnName === 'string', 'invalid function signature, missing function name')

  const res = await client.queryTransactionBlocks({
    filter: {
      MoveFunction: {
        package: pkgName,
        module: modName,
        function: fnName
      }
    },
    options: {
      showBalanceChanges: true
    },
    order: 'descending',
    limit: 1000,
    cursor
  })

  const txsBeforeUntilTs = res.data.filter((tx) => (Number(tx.timestampMs) || 0) >= untilTimestamp)
  if (txsBeforeUntilTs.length === 0) {
    log.info(`[${fnSignature}] reached the until timestamp ${untilTimestamp}`)
    await writeToFile('./tmp/stats.json', Array.from(acc.entries()).join('\n'))
    return
  }

  for (const tx of txsBeforeUntilTs) {
    const address = getOwner(tx.balanceChanges[0])
    if (address) {
      acc.set(address, (acc.get(address) ?? 0) + 1)
    }
  }

  try {
    log.info(
      `[${fnSignature}] page: ${cursor ?? 'initial'}, tx from ${new Date(
        Number(res.data.at(-1)?.timestampMs)
      ).toLocaleString('sg')} to ${new Date(Number(res.data.at(1)?.timestampMs)).toLocaleString(
        'sg'
      )}, pecentile 50: ${internalPercentile(acc.values(), 0.5)}, 90: ${internalPercentile(
        acc.values(),
        0.9
      )}`
    )

    if (Math.random() > 0.75) {
      await writeToFile('./tmp/stats.json', Array.from(acc.entries()).join('\n'))
    }
  } catch (err) {
    log.error(err)
  }
  if (res.hasNextPage) {
    return aggregateNumberOfTx(fnSignature, untilTimestamp, acc, res.nextCursor)
  }
}

const ONE_DAY = 24 * 60 * 60 * 1000
const until = Date.now() - ONE_DAY
const sharedAccumulator = new Map()

Promise.all(DEFI_FN.map(fnsig => 
  aggregateNumberOfTx(
    fnsig,
    until,
    sharedAccumulator
  ),
))
  .then(() => log.info('done'))
  .catch(log.error)

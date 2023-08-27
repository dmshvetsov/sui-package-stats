import * as fs from 'fs/promises'
import * as percentile from 'just-percentile'
import log from './log'

function internalPercentile(acc: number[] | IterableIterator<number>, p: number) {
  const arr = Array.isArray(acc) ? acc : Array.from(acc)
  return Math.round((percentile as unknown as (acc: number[], p: number) => number)(arr, p))
}

;(async () => {
  const acc: number[] = []
  // stats in USDC token, 6 decimals
  const file = await fs.open('./tmp/stats.json')
  for await (const line of file.readLines()) {
    const [_address, amount] = line.split(',')
    const value = Number(amount)
    if (!isNaN(value)) {
      acc.push(value)
    }
  }
  log.info(`top traders, mumber of tx on defis`)
  log.info(`p50: ${internalPercentile(acc, 0.5)}`)
  log.info(`p90: ${internalPercentile(acc, 0.9)}`)
})()

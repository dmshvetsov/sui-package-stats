## usage

Clone repository, enter the cloned directory and run commands:

    $ pnpm install

    $ pnpm start

On the screen you will see agregated stats updated in real time. By default the script is collecting stats for the last 24 hours

Collected data is cached. To aggregate over the collected data once again and get the stats values run:

    $ pnpm stats


## for reference

```javascript
client
  .getTransactionBlock({
    digest: '9VFEXApF2QeyJWqrPN5r7FJZgJHvY9ZTNzsL9VzWKuAF',
    options: {
      showEffects: true,
      showInput: true,
      showEvents: true,
      showObjectChanges: true,
      showBalanceChanges: true,
      showRawInput: true
    }
  })
  .then(log.info)
/* console log output:
{
  digest: '9VFEXApF2QeyJWqrPN5r7FJZgJHvY9ZTNzsL9VzWKuAF',
  transaction: {
    data: {
      messageVersion: 'v1',
      transaction: {
        kind: 'ProgrammableTransaction',
        inputs: [
          {
            type: 'object',
            objectType: 'sharedObject',
            objectId: '0x2c6fc12bf0d093b5391e7c0fed7e044d52bc14eb29f6352a3fb358e33e80729e',
            initialSharedVersion: '2550517',
            mutable: true
          },
          {
            type: 'object',
            objectType: 'immOrOwnedObject',
            objectId: '0xc7d70a1d475f14c9fa1d39253dc8b5c987484d7b3bada454dc42d3ae8da333a3',
            version: '24820456',
            digest: '9oJqebz11xUsMYFzDpxfCpkfvJpYByKPzsNt31hbFGhs'
          },
          { type: 'pure', valueType: 'u64', value: '40799282448961' },
          { type: 'pure', valueType: 'u64', value: '97614745088' },
          {
            type: 'pure',
            valueType: 'u128',
            value: '903199733890064726'
          },
          { type: 'pure', valueType: 'bool', value: true },
          {
            type: 'pure',
            valueType: 'address',
            value: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214'
          },
          { type: 'pure', valueType: 'u64', value: '1693081598871' },
          {
            type: 'object',
            objectType: 'sharedObject',
            objectId: '0x0000000000000000000000000000000000000000000000000000000000000006',
            initialSharedVersion: '1',
            mutable: false
          },
          {
            type: 'object',
            objectType: 'sharedObject',
            objectId: '0xf1cf0e81048df168ebeb1b8030fad24b3e0b53ae827c25053fff0779c1445b6f',
            initialSharedVersion: '1621135',
            mutable: false
          }
        ],
        transactions: [
          {
            MakeMoveVec: [ null, [ { Input: 1 } ] ]
          },
          {
            MoveCall: {
              package: '0xeb9210e2980489154cc3c293432b9a1b1300edd0d580fe2269dd9cda34baee6d',
              module: 'swap_router',
              function: 'swap_a_b',
              type_arguments: [
                '0x5d1f47ea69bb0de31c313d7acf89b890dbb8991ea8e03c6c355171f84bb1ba4a::turbos::TURBOS',
                '0x2::sui::SUI',
                '0x91bfbc386a41afcfd9b2533058d7e915a1d3829089cc268ff4333d54d6339ca1::fee3000bps::FEE3000BPS'
              ],
              arguments: [
                { Input: 0 }, { Result: 0 },
                { Input: 2 }, { Input: 3 },
                { Input: 4 }, { Input: 5 },
                { Input: 6 }, { Input: 7 },
                { Input: 8 }, { Input: 9 }
              ]
            }
          }
        ]
      },
      sender: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214',
      gasData: {
        payment: [
          {
            objectId: '0x0749c670a649fe8c376ac975ae2c3615e81dd4cf3bd2eb5244ee1d322bd8a101',
            version: 24820456,
            digest: '12NSxUMciQ6QiFqdKAX1JhJsBjFVKsh2eBSNx57dQuuF'
          }
        ],
        owner: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214',
        price: '755',
        budget: '2955384'
      }
    },
    txSignatures: [
      'AJichqv+wxSSMMxsWRtPYGpNTyKaBmIMNBLWMGuQq1us3BYNwna3+k58i/UwNV4eTKiZrUvCdCz1/KxMcb+qiQfll3tU6yq8DRY+P/6qO6Vn6Vlj/0o7tKZhLhZZ/NWj+w=='
    ]
  },
  rawTransaction: 'AQAAAAAACgEBLG/BK/DQk7U5HnwP7X4ETVK8FOsp9jUqP7NY4z6Acp716iYAAAAAAAEBAMfXCh1HXxTJ+h05JT3ItcmHSE17O62kVNxC066NozOj6Lp6AQAAAAAggrpiCzL3OI2SESWaqyVI7yh+sRF1SGIodjiFFL2h064ACEHKvFIbJQAAAAgAzkq6FgAAAAAQVqG+Y1/PiAwAAAAAAAAAAAABAQAgoYxoLPNt1xxmc2LKXCapNIlrqqa9yg3oau3IWZMi8hQACJf7hjOKAQAAAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgEAAAAAAAAAAAEB8c8OgQSN8Wjr6xuAMPrSSz4LU66CfCUFP/8HecFEW2+PvBgAAAAAAAACBQABAQEAAOuSEOKYBIkVTMPCk0MrmhsTAO3Q1YD+ImndnNo0uu5tC3N3YXBfcm91dGVyCHN3YXBfYV9iAwddH0fqabsN4xwxPXrPibiQ27iZHqjgPGw1UXH4S7G6SgZ0dXJib3MGVFVSQk9TAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgNzdWkDU1VJAAeRv7w4akGvz9myUzBY1+kVodOCkInMJo/0Mz1U1jOcoQpmZWUzMDAwYnBzCkZFRTMwMDBCUFMACgEAAAIAAAECAAEDAAEEAAEFAAEGAAEHAAEIAAEJAKGMaCzzbdccZnNiylwmqTSJa6qmvcoN6GrtyFmTIvIUAQdJxnCmSf6MN2rJda4sNhXoHdTPO9LrUkTuHTIr2KEB6Lp6AQAAAAAgAFnU49+6cWp/OvEyZcHMmIKv3WxgJ3k/SOrBLNJB4j6hjGgs823XHGZzYspcJqk0iWuqpr3KDehq7chZkyLyFPMCAAAAAAAAeBgtAAAAAAAAAWEAmJyGq/7DFJIwzGxZG09gak1PIpoGYgw0EtYwa5CrW6zcFg3Cdrf6TnyL9TA1Xh5MqJmtS8J0LPX8rExxv6qJB+WXe1TrKrwNFj4//qo7pWfpWWP/Sju0pmEuFln81aP7',
  effects: {
    messageVersion: 'v1',
    status: { status: 'success' },
    executedEpoch: '136',
    gasUsed: {
      computationCost: '1510000',
      storageCost: '7341600',
      storageRebate: '7629336',
      nonRefundableStorageFee: '77064'
    },
    modifiedAtVersions: [
      {
        objectId: '0x0749c670a649fe8c376ac975ae2c3615e81dd4cf3bd2eb5244ee1d322bd8a101',
        sequenceNumber: '24820456'
      },
      {
        objectId: '0x2c6fc12bf0d093b5391e7c0fed7e044d52bc14eb29f6352a3fb358e33e80729e',
        sequenceNumber: '24819477'
      },
      {
        objectId: '0xc7d70a1d475f14c9fa1d39253dc8b5c987484d7b3bada454dc42d3ae8da333a3',
        sequenceNumber: '24820456'
      }
    ],
    sharedObjects: [
      {
        objectId: '0x2c6fc12bf0d093b5391e7c0fed7e044d52bc14eb29f6352a3fb358e33e80729e',
        version: 24819477,
        digest: 'Cei8hNi21GiMrr98rkKWhjPdR527SLYrqfauHJsZMhaj'
      },
      {
        objectId: '0x0000000000000000000000000000000000000000000000000000000000000006',
        version: 11377097,
        digest: '8GT34iNyK1Ftndz2pvfv91rmj14BvFSuQ9CnzzWLMxwJ'
      },
      {
        objectId: '0xf1cf0e81048df168ebeb1b8030fad24b3e0b53ae827c25053fff0779c1445b6f',
        version: 6173949,
        digest: 'CUmtHSGpzDgMe5KCDn7UQX7A3ojmP4mrkcuT1n95SXJP'
      }
    ],
    transactionDigest: '9VFEXApF2QeyJWqrPN5r7FJZgJHvY9ZTNzsL9VzWKuAF',
    created: [
      {
        owner: {
          AddressOwner: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214'
        },
        reference: {
          objectId: '0x829a6401fe490ad260efe7355ca7b7a05bc2b4eae5c26aa3a635543ef47b4bae',
          version: 24820457,
          digest: '2McBbpzQ8qK1pWi8DeATjFyzwA9fS3gpVprW4U4X8tFo'
        }
      }
    ],
    mutated: [
      {
        owner: {
          AddressOwner: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214'
        },
        reference: {
          objectId: '0x0749c670a649fe8c376ac975ae2c3615e81dd4cf3bd2eb5244ee1d322bd8a101',
          version: 24820457,
          digest: '7pXKQwzSurcakySFawguibqG8LRaxCtrqZ7dLzLzoh8m'
        }
      },
      {
        owner: { Shared: { initial_shared_version: 2550517 } },
        reference: {
          objectId: '0x2c6fc12bf0d093b5391e7c0fed7e044d52bc14eb29f6352a3fb358e33e80729e',
          version: 24820457,
          digest: 'DpSoxpdp67AyLjdRLQCt8JJa2AieNZrELTK87Rcbvn4a'
        }
      }
    ],
    deleted: [
      {
        objectId: '0xc7d70a1d475f14c9fa1d39253dc8b5c987484d7b3bada454dc42d3ae8da333a3',
        version: 24820457,
        digest: '7gyGAp71YXQRoxmFBaHxofQXAipvgHyBKPyxmdSJxyvz'
      }
    ],
    gasObject: {
      owner: {
        AddressOwner: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214'
      },
      reference: {
        objectId: '0x0749c670a649fe8c376ac975ae2c3615e81dd4cf3bd2eb5244ee1d322bd8a101',
        version: 24820457,
        digest: '7pXKQwzSurcakySFawguibqG8LRaxCtrqZ7dLzLzoh8m'
      }
    },
    eventsDigest: '5VMdqtXxhkycdmrTwGHVdySfGteoEfnjAGTXYYtng2FL',
    dependencies: [
      'Bm87zN7Yvtp2zt6gnaX2RknsUb3ojZYJ8LEJhTA39us',
      'ACKQVv64dXCmpxE1QPU2QMLxVpmtbzrFGMtWYY6szJrQ',
      'BR52E84DffDkkLgrCNMVqQihUawF3voKV9P52dWmD8Pq',
      'CE2nTz6Rc7JdNPQ25yJdugSsjUQMLERfNEwzCKH72Qsw',
      'FhLGjLHU93dKhhjak8kXcMiV5SKxjWc2swGRt2BAEVDB',
      'GAJe98it9U6UW4nrLGQcmjoCtr1CwwAJYnZGt92aiGzR',
      'HKLxwLkgj6K428r93QmYAsZyakQjiBYM3mEjXuL3FKiT',
      'HPBPMJP2TTxrytpSXqtGTqGxUNWQ74NToQKKuJV6dD9c'
    ]
  },
  events: [
    {
      id: {
        txDigest: '9VFEXApF2QeyJWqrPN5r7FJZgJHvY9ZTNzsL9VzWKuAF',
        eventSeq: '0'
      },
      packageId: '0x91bfbc386a41afcfd9b2533058d7e915a1d3829089cc268ff4333d54d6339ca1',
      transactionModule: 'swap_router',
      sender: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214',
      type: '0x91bfbc386a41afcfd9b2533058d7e915a1d3829089cc268ff4333d54d6339ca1::pool::SwapEvent',
      parsedJson: {
        a_to_b: true,
        amount_a: '40799282448961',
        amount_b: '97712457546',
        fee_amount: '122397847347',
        is_exact_in: true,
        liquidity: '2065659282819267',
        pool: '0x2c6fc12bf0d093b5391e7c0fed7e044d52bc14eb29f6352a3fb358e33e80729e',
        protocol_fee: '36719354204',
        recipient: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214',
        sqrt_price: '903672927087067931',
        tick_current_index: { bits: 4294906969 },
        tick_pre_index: { bits: 4294906988 }
      },
      bcs: '28QE6XajgRZWFDVsKVZLSBn1q9FTKoSEWye1EAVwKt9Us4rnN2fDNYphCpVqD84U9CwX9bAY97NCMTJeCXWzR4naoyBNea87S4pFRPvZdAjCKCQpbiA7KfgKnQg1KjwoqrmRPMabZPd3TZsRRhw9P2rPUvGXd4SAUiMo95driLJ5Npgj3te9YB1ocMJVv'
    }
  ],
  objectChanges: [
    {
      type: 'mutated',
      sender: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214',
      owner: {
        AddressOwner: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214'
      },
      objectType: '0x2::coin::Coin<0x2::sui::SUI>',
      objectId: '0x0749c670a649fe8c376ac975ae2c3615e81dd4cf3bd2eb5244ee1d322bd8a101',
      version: '24820457',
      previousVersion: '24820456',
      digest: '7pXKQwzSurcakySFawguibqG8LRaxCtrqZ7dLzLzoh8m'
    },
    {
      type: 'mutated',
      sender: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214',
      owner: { Shared: { initial_shared_version: 2550517 } },
      objectType: '0x91bfbc386a41afcfd9b2533058d7e915a1d3829089cc268ff4333d54d6339ca1::pool::Pool<0x5d1f47ea69bb0de31c313d7acf89b890dbb8991ea8e03c6c355171f84bb1ba4a::turbos::TURBOS, 0x2::sui::SUI, 0x91bfbc386a41afcfd9b2533058d7e915a1d3829089cc268ff4333d54d6339ca1::fee3000bps::FEE3000BPS>',
      objectId: '0x2c6fc12bf0d093b5391e7c0fed7e044d52bc14eb29f6352a3fb358e33e80729e',
      version: '24820457',
      previousVersion: '24819477',
      digest: 'DpSoxpdp67AyLjdRLQCt8JJa2AieNZrELTK87Rcbvn4a'
    },
    {
      type: 'created',
      sender: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214',
      owner: {
        AddressOwner: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214'
      },
      objectType: '0x2::coin::Coin<0x2::sui::SUI>',
      objectId: '0x829a6401fe490ad260efe7355ca7b7a05bc2b4eae5c26aa3a635543ef47b4bae',
      version: '24820457',
      digest: '2McBbpzQ8qK1pWi8DeATjFyzwA9fS3gpVprW4U4X8tFo'
    }
  ],
  balanceChanges: [
    {
      owner: {
        AddressOwner: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214'
      },
      coinType: '0x2::sui::SUI',
      amount: '97711235282'
    },
    {
      owner: {
        AddressOwner: '0xa18c682cf36dd71c667362ca5c26a934896baaa6bdca0de86aedc8599322f214'
      },
      coinType: '0x5d1f47ea69bb0de31c313d7acf89b890dbb8991ea8e03c6c355171f84bb1ba4a::turbos::TURBOS',
      amount: '-40799282448961'
    }
  ],
  timestampMs: '1693081427697',
  checkpoint: '11377096'
}
*/

client
  .queryTransactionBlocks({
    filter: {
      MoveFunction: {
        package: '0xeb9210e2980489154cc3c293432b9a1b1300edd0d580fe2269dd9cda34baee6d',
        module: 'swap_router',
        function: 'swap_a_b'
      }
    },
    options: {
      showBalanceChanges: true
    },
    order: 'descending'
  })
  .then(log.info)
/* console log output:
{
  data: [
    {
      digest: '6XPBFiJ1gGJYnDDTydm3FiHZuELVCxDbSu9VQy4jbKdv',
      balanceChanges: [
        {
          owner: {
            AddressOwner: '0xdd5bc97d0d198a48f7d1d358e158825b14e7b52db505d30ffcb33d018570b38f'
          },
          coinType: '0x2::sui::SUI',
          amount: '-1701948824'
        },
        {
          owner: {
            AddressOwner: '0xdd5bc97d0d198a48f7d1d358e158825b14e7b52db505d30ffcb33d018570b38f'
          },
          coinType: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN',
          amount: '987843'
        }
      ],
      timestampMs: '1693128951784',
      checkpoint: '11423885'
    },
    ...
  ]
}

SUI amount 1701948824 is equal to 1.701948824
USDC amount 987843 is equal to 0.987843
*/
```

# Your first spore-sdk example

## Introduction

This is a `hello world` example of [Spore SDK](https://github.com/sporeprotocol/spore-sdk) showing you how to create a spore on [Nervos CKB](https://www.nervos.org/).

From the example, you can learn how to:

1. Generate a lock script and address with the [CKB Default Lock](https://github.com/nervosnetwork/ckb-system-scripts/blob/master/c/secp256k1_blake160_sighash_all.c)
2. Build your first spore creation transaction with the [Spore SDK](https://github.com/sporeprotocol/spore-sdk)
3. Sign the transaction with the [CKB Default Lock](https://github.com/nervosnetwork/ckb-system-scripts/blob/master/c/secp256k1_blake160_sighash_all.c)

## Run

### Run in a web browser

You can follow the step-by-step tutorial on Spore Docs: [Creating your first Spore](https://docs.spore.pro/tutorials/create-first-spore).

Or, you can run and play with the example on [StackBlitz](https://stackblitz.com/github/sporeprotocol/spore-first-example?file=src%2Findex.ts&view=editor).

### Run in local

Clone the example to your local environment: 

```shell
git clone https://github.com/sporeprotocol/spore-first-example.git
```

Install node dependencies via npm:

```shell
npm install
```

Run it:

```shell
npm run example
```

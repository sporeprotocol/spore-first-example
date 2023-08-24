# Your first spore-sdk example

## About

This is a simple example for beginners to try creating a spore on Nervos CKB.
From the example, you should learn how to:

1. Construct a transaction to create a spore on-chain with the [spore-sdk](https://github.com/sporeprotocol/spore-sdk)
2. Sign the transaction with a [Secp256k1Blake160 Sign-all](https://github.com/nervosnetwork/ckb-system-scripts/blob/master/c/secp256k1_blake160_sighash_all.c) lock Wallet

## Run

Clone the example to your local environment: 

```shell
git clone https://github.com/sporeprotocol/spore-first-example.git
```

Install node dependencies via NPM:

```shell
npm install
```

Run the example:

```shell
npm run example
```
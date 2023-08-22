import { SporeConfig, defaultEmptyWitnessArgs, updateWitnessArgs, isScriptValueEquals } from '@spore-sdk/core';
import { hd, helpers, HexString, RPC } from '@ckb-lumos/lumos';
import { secp256k1Blake160 } from '@ckb-lumos/common-scripts';
import { Address, Hash, Script } from '@ckb-lumos/base';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export interface Wallet {
  lock: Script;
  address: Address;
  signMessage(message: HexString): Hash;
  signTransaction(txSkeleton: helpers.TransactionSkeletonType): helpers.TransactionSkeletonType;
  signAndSendTransaction(txSkeleton: helpers.TransactionSkeletonType): Promise<Hash>;
}

/**
 * Create a Secp256k1Blake160 Sign-all Wallet by a private key and a SporeConfig,
 * providing lock/address, and functions to sign message/transaction and send the transaction on-chain.
 */
export function createSecp256k1Wallet(privateKey: HexString, config: SporeConfig): Wallet {
  const Secp256k1Blake160 = config.lumos.SCRIPTS['SECP256K1_BLAKE160'];

  // Generate a lock script from the private key
  const lock: Script = {
    codeHash: Secp256k1Blake160.CODE_HASH,
    hashType: Secp256k1Blake160.HASH_TYPE,
    args: hd.key.privateKeyToBlake160(privateKey),
  };

  // Generate address from the lock script
  const address = helpers.encodeToAddress(lock, {
    config: config.lumos,
  });

  // Sign for a message
  function signMessage(message: HexString): Hash {
    return hd.key.signRecoverable(message, privateKey);
  }

  // Sign prepared signing entries,
  // and then fill signatures into Transaction.witnesses
  function signTransaction(txSkeleton: helpers.TransactionSkeletonType): helpers.TransactionSkeletonType {
    const signingEntries = txSkeleton.get('signingEntries');
    const signatures = new Map<HexString, Hash>();
    const inputs = txSkeleton.get('inputs');

    let witnesses = txSkeleton.get('witnesses');
    for (let i = 0; i < signingEntries.size; i++) {
      const entry = signingEntries.get(i)!;
      if (entry.type === 'witness_args_lock') {
        // Skip if the input's lock does not match to the wallet's lock
        const input = inputs.get(entry.index);
        if (!input || !isScriptValueEquals(input.cellOutput.lock, lock)) {
          continue;
        }

        // Sign message
        if (!signatures.has(entry.message)) {
          const sig = signMessage(entry.message);
          signatures.set(entry.message, sig);
        }

        // Update signature to Transaction.witnesses
        const signature = signatures.get(entry.message)!;
        const witness = witnesses.get(entry.index, defaultEmptyWitnessArgs);
        witnesses = witnesses.set(entry.index, updateWitnessArgs(witness, 'lock', signature));
      }
    }

    return txSkeleton.set('witnesses', witnesses);
  }

  // Sign the transaction and send it via RPC
  async function signAndSendTransaction(txSkeleton: helpers.TransactionSkeletonType): Promise<Hash> {
    // 1. Sign transaction
    txSkeleton = secp256k1Blake160.prepareSigningEntries(txSkeleton, { config: config.lumos });
    txSkeleton = signTransaction(txSkeleton);

    // 2. Convert TransactionSkeleton to Transaction
    const tx = helpers.createTransactionFromSkeleton(txSkeleton);

    // 3. Send transaction
    const rpc = new RPC(config.ckbNodeUrl);
    return await rpc.sendTransaction(tx, 'passthrough');
  }

  return {
    lock,
    address,
    signMessage,
    signTransaction,
    signAndSendTransaction,
  };
}

/**
 * Fetch an image file from local and return an ArrayBuffer.
 * This function is only available in the Node environment.
 */
export async function fetchLocalImage(src: string) {
  const buffer = readFileSync(resolve(__dirname, src));
  return new Uint8Array(buffer).buffer;
}
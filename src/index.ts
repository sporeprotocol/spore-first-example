import { createSpore, predefinedSporeConfigs } from '@spore-sdk/core';
import { createSecp256k1Wallet, fetchLocalImage } from './helpers';

(async function main() {
  // 1. Select a predefined SporeConfig
  const config = predefinedSporeConfigs.Aggron4;

  // 2. Create a Secp256k1Blake160 Sign-all lock Wallet from privateKey for signing transaction,
  // to understand the lock: https://github.com/nervosnetwork/ckb-system-scripts/blob/master/c/secp256k1_blake160_sighash_all.c
  const wallet = createSecp256k1Wallet('0xc153ee57dc8ae3dac3495c828d6f8c3fef6b1d0c74fc31101c064137b3269d6d', config);

  // 3. Fetch the `./image.jpg` image file from local, as the content of the new spore
  const content = await fetchLocalImage('./image.jpg');

  // 4. The new spore's contentType should be paired with its content based on MIME types,
  // refer to https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  const contentType = 'image/jpeg';

  // 5. Construct a transaction to create a spore on-chain
  const { txSkeleton } = await createSpore({
    // The new spore's cell data
    data: {
      contentType,
      content,
    },
    // The new spore's owner
    toLock: wallet.lock,
    // Specify where to collect capacity to construct the transaction
    fromInfos: [wallet.address],
    // Specify a SporeConfig, which provides chain info and more to the SDK
    config,
  });

  // 6. Sign the transaction and send it via RPC
  const hash = await wallet.signAndSendTransaction(txSkeleton);
  console.log('CreateSpore transaction has been sent:', hash);
  console.log(`Review the transaction: https://pudge.explorer.nervos.org/transaction/${hash}`);
})();

import { createSpore } from '@spore-sdk/core';
import { createDefaultLockWallet, fetchLocalFile } from './helpers';
import { ALICE } from "./test-keys";

async function main() {
  // Note: ALICE.PRIVATE_KEY is a test key, please DO NOT use it in production environments!
  const wallet = createDefaultLockWallet(ALICE.PRIVATE_KEY);

  const { txSkeleton, outputIndex } = await createSpore({
    data: {
      contentType: 'image/jpeg',
      content: await fetchLocalFile('./image.jpg'),
    },
    toLock: wallet.lock,
    fromInfos: [wallet.address],
  });

  const hash = await wallet.signAndSendTransaction(txSkeleton);
  console.log(`Spore created at: https://pudge.explorer.nervos.org/transaction/${hash}`);
  console.log(`Spore ID: ${txSkeleton.get('outputs').get(outputIndex)!.cellOutput.type!.args}`);
}

main();

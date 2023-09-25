import { createSpore } from '@spore-sdk/core';
import { createDefaultLockWallet, fetchLocalFile } from './helpers';

async function main() {
  const wallet = createDefaultLockWallet('0xc153ee57dc8ae3dac3495c828d6f8c3fef6b1d0c74fc31101c064137b3269d6d');

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

import { createSpore, predefinedSporeConfigs } from '@spore-sdk/core';
import { createSecp256k1Wallet, fetchLocalImage } from './helpers';

async function main() {
  const config = predefinedSporeConfigs.Aggron4;
  const wallet = createSecp256k1Wallet('0xc153ee57dc8ae3dac3495c828d6f8c3fef6b1d0c74fc31101c064137b3269d6d', config);

  const { txSkeleton } = await createSpore({
    data: {
      contentType: 'image/jpeg',
      content: await fetchLocalImage('./image.jpg'),
    },
    toLock: wallet.lock,
    fromInfos: [wallet.address],
    config,
  });

  const hash = await wallet.signAndSendTransaction(txSkeleton);
  console.log(`CreateSpore transaction has been sent, review on: https://pudge.explorer.nervos.org/transaction/${hash}`);
}

main();

import { createSpore, predefinedSporeConfigs } from '@spore-sdk/core';
import { createSecp256k1Wallet, fetchLocalImage } from './helpers';

(async function main() {
  const config = predefinedSporeConfigs.Aggron4;
  const wallet = createSecp256k1Wallet('0xc153ee57dc8ae3dac3495c828d6f8c3fef6b1d0c74fc31101c064137b3269d6d', config);

  const { txSkeleton } = await createSpore({
    data: {
      // The new spore's contentType should be paired with its content based on MIME types,
      // refer to: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
      contentType: 'image/jpeg',
      // Fetch the `./image.jpg` image file from local, as the content of the new spore
      content: await fetchLocalImage('./image.jpg'),
    },
    toLock: wallet.lock,
    fromInfos: [wallet.address],
    config,
  });

  const hash = await wallet.signAndSendTransaction(txSkeleton);
  console.log(`CreateSpore transaction has been sent, review on: https://pudge.explorer.nervos.org/transaction/${hash}`);
})();

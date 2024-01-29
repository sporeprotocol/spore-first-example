// Note:
// The private keys here are for demo purposes only, please DO NOT use them in production
// environments!

export const ALICE = {
  PRIVATE_KEY: "0xfd686a48908e8caf97723578bf85f746e1e1d8956cb132f6a2e92e7234a2a245",
  ADDRESS: "ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsq0rjr2tndx8vdlvspuehkhkgjhxyhxmjgsqw8hsk",
  ARGS: "0xe390d4b9b4c7637ec80799bdaf644ae625cdb922",
};

export const BOB = {
  PRIVATE_KEY: "0x5368b818f59570b5bc078a6a564f098a191dcb8938d95c413be5065fd6c42d32",
  ADDRESS: "ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqdkmkag0w667hc98vdwt09u0ax7qdre7lsgje9su",
  ARGS: "0xb6ddba87bb5af5f053b1ae5bcbc7f4de03479f7e",
};

export const CHARLIE = {
  PRIVATE_KEY: "0xd6013cd867d286ef84cc300ac6546013837df2b06c9f53c83b4c33c2417f6a07",
  ADDRESS: "ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqtvmzh9r7gm4ntezqfxlzqp8zes43wnq9gkrpcj0",
  ARGS: "0x6cd8ae51f91bacd7910126f880138b30ac5d3015",
};

// TODO: you could use this function to generate your own PrivateKey
// export const generatePrivateKey = () => {
//   const myMnemonic = mnemonic.generateMnemonic();
//   const seed = mnemonic.mnemonicToSeedSync(myMnemonic);
//   console.log("my mnemonic ", seed);

//   const extendedPrivKey = ExtendedPrivateKey.fromSeed(seed);
//   return extendedPrivKey.privateKeyInfo(AddressType.Receiving, 0).privateKey;
// }

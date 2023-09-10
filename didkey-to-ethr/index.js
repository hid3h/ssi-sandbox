const ethers = require("ethers");

const main = async () => {
  const wallet = ethers.Wallet.createRandom();
  console.log("publicKey", wallet.publicKey);
  console.log("address", wallet.address);

  // publicKeyからaddressを生成する
  const address = ethers.utils.computeAddress(wallet.publicKey);
  console.log("address", address);
};

main();

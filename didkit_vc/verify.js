const DIDKit = require("./didkit-wasm-node");
const fs = require("fs");

async function main() {
  const signedVc = fs.readFileSync("signed-vc.json").toString()

  const proofOptions = {};
  const result = await DIDKit.verifyCredential(
    signedVc,
    JSON.stringify(proofOptions)
  )

  console.log("result", result)
}

main().then((res) => {

}).catch((err) => {
  console.log("err", err)
})

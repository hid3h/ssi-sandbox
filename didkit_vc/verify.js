const DIDKit = require("./didkit/lib/web/pkg");
const fs = require("fs");

async function main() {
  const signedVc = fs.readFileSync("signed-vc.json").toString()
  // console.log("signedVc", signedVc)

  const proofOptions = {
    checks: ["credentialStatus"],
    proofPurpose: "assertionMethod",
  };
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

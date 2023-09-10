const DIDKit = require("./didkit-wasm-node");
const fs = require("fs");
const crypto = require("crypto")

async function main() {
  // generateKey()

  const key = fs.readFileSync("issuer_key.jwk").toString()
  const issuerDid = DIDKit.keyToDID("key", key)

  const unsignedVc = {
    "@context": "https://www.w3.org/2018/credentials/v1",
    "id": `urn:uuid:${crypto.randomUUID()}`,
    "type": ["VerifiableCredential"],
    "issuer": issuerDid,
    "issuanceDate": "2023-01-08T18:23:56Z",
    "credentialSubject": {
      "id": "did:example:my-data-subject-identifier"
    }
  }

  const proofOptions = {};
  const signedVc = await DIDKit.issueCredential(
    JSON.stringify(unsignedVc),
    JSON.stringify(proofOptions),
    key
  )

  fs.writeFileSync("signed-vc.json", signedVc)
}

function generateKey() {
  const key = DIDKit.generateEd25519Key()
  fs.writeFileSync("issuer_key.jwk", key)
}

main().then((res) => {

}).catch((err) => {
  console.log("err", err)
})

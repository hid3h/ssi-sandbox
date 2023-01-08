import { issueCredential } from "@pitpa/didkit/didkit-wasm-node"

async function main() {
  const unsignedVc = `{
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/vc/status-list/2021/v1"
    ],
    "id": "urn:uuid:",
    "type": [
      "VerifiableCredential"
    ],
    "credentialSubject": {
      "id": "did:example:my-data-subject-identifier"
    },
    "issuer": "did:key:z6MkwV2x9zJd7i5TKmuiGVEgyDNHJSEtZob41sYg31KQLT2z",
    "issuanceDate": "2022-12-22T02:33:25Z",
    "credentialStatus": {
      "id": "https://812f-2400-2411-2282-6300-1d3c-e1ba-6510-36d9.jp.ngrok.io/schema.json#9456",
      "type": "StatusList2021Entry",
      "statusPurpose": "revocation",
      "statusListIndex": "9456",
      "statusListCredential": "https://812f-2400-2411-2282-6300-1d3c-e1ba-6510-36d9.jp.ngrok.io/test.json"
    }
  }`
  const proofOptions = `{}`
  const fs = require('fs');
  const key = JSON.parse(fs.readFileSync('./issuer_jwk.json', 'utf8'));
  console.log("key", key)
  const result = await issueCredential(unsignedVc, proofOptions, key)
  console.log("result", result)
  return result;
}

main().then((res) => {
  console.log("res", res)
}).catch((err) => {
  console.log("err", err)
})

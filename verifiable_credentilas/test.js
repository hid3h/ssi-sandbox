// Import the module
const DIDKit = require('@spruceid/didkit-wasm-node');

console.log(DIDKit.getVersion());

async function main() {
  const vc = `{
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
    "proof": {
      "type": "Ed25519Signature2018",
      "proofPurpose": "assertionMethod",
      "verificationMethod": "did:key:z6MkwV2x9zJd7i5TKmuiGVEgyDNHJSEtZob41sYg31KQLT2z#z6MkwV2x9zJd7i5TKmuiGVEgyDNHJSEtZob41sYg31KQLT2z",
      "created": "2022-12-23T00:10:43.154Z",
      "jws": "eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..fTrJDSz2hTHAZ324fQ6EIMPILd-C1x8WC9M1NpBg_NVp0UGlkVlQN49PAAuDchbXue_TSDJeg7xYy0Zp5L_QDA"
    },
    "credentialStatus": {
      "id": "https://example.com/credentials/status/3#94567",
      "type": "StatusList2021Entry",
      "statusListCredential": "https://example.com/credentials/status/3",
      "statusListIndex": "9456",
      "statusPurpose": "revocation"
    }
  }`
  const proofOptions = "{}"
  const result = await DIDKit.verifyCredential(vc, proofOptions)
  return result;
}

main().then((res) => {
  console.log("res", res)
}).catch((err) => {
  console.log("err", err)
})

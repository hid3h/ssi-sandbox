const DIDKit = require('@spruceid/didkit-wasm-node');

console.log(DIDKit.getVersion());

const key = `{
  "kty": "OKP",
  "crv": "Ed25519",
  "x": "_QsIxPPAyXTk0xLwFBF9s8oY_X2c-AuO9mKYkavU0sM",
  "d": "NZxlUg4gtVLEusMqWKILsNYHb6gYs69VqdJSntUJSYE"
}`

const credential = `{
  "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/vc/status-list/2021/v1"
  ],
  "id": "urn:uuid:",
  "type": [
      "VerifiableCredential"
  ],
  "issuer": "did:key:z6MkwV2x9zJd7i5TKmuiGVEgyDNHJSEtZob41sYg31KQLT2z",
  "issuanceDate": "2022-12-22T02:33:25Z",
  "credentialSubject": {
      "id": "did:example:my-data-subject-identifier"
  },
  "credentialStatus": {
      "id": "http://localhost:3000/schema.json#9456",
      "type": "StatusList2021Entry"
  }
}
`
async function main() {
  const vm = await DIDKit.keyToVerificationMethod("key", key)
  console.log("vm", vm)

  const proof_options = `{}`
  const vc = await DIDKit.issueCredential(
    credential,
    proof_options,
    key
  )

  console.log("vc", vc)
}

main().then((res) => {
  console.log("res", res)
}).catch((err) => {
  console.log("err", err)
})

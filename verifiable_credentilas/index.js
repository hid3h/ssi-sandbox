const DIDKit = require('didkit-wasm-node');

console.log(DIDKit.getVersion());

// To issue credentials and presentations, you need a key.
// The library provides a function to generate one.
const key = DIDKit.generateEd25519Key();
console.log("key", key)

// There are two helpful functions to obtain a DID and the `did:key`
// `verificationMethod` from the key.
const did = DIDKit.keyToDID('key', key);
console.log("did", did)

const verificationMethod = DIDKit.keyToVerificationMethod('key', key);
console.log("verificationMethod", verificationMethod)

const vc = `{
  "@context": [
    "https://www.w3.org/2018/credentials/v1"
  ],
  "type": "VerifiableCredential",
  "credentialSubject": {
    "id": "urn:uuid:bd198dcf-1034-4a11-9e5b-571afb1225a1"
  },
  "issuer": "did:web:demo.spruceid.com",
  "issuanceDate": "2022-11-16T01:46:04Z",
  "proof": {
    "type": "Ed25519Signature2018",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:web:demo.spruceid.com#_t-v-Ep7AtkELhhvAzCCDzy1O5Bn_z1CVFv9yiRXdHY",
    "created": "2022-11-16T01:46:04.550Z",
    "jws": "eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..W5S3KEhAWDOExWIeZ9LZrmcrEABO5AmmczYZMvgZWAQjL4u_8tPnmNDPsQ-Hw82lfcRviezSUc18tlPM77GpCQ"
  },
  "expirationDate": "2022-12-16T01:46:04Z"
}`
DIDKit.verifyCredential(vc, "{}").then((value) => {
  console.log("value", value)
})

import { compactVerify } from "jose"
import { createPublicKey } from "crypto"

// 以下のjwsの検証をしたい

// https://demo.spruceid.com/get-example-vc から取得
// const vc = {
//   "@context": [
//     "https://www.w3.org/2018/credentials/v1"
//   ],
//   "type": "VerifiableCredential",
//   "credentialSubject": {
//     "id": "urn:uuid:bd198dcf-1034-4a11-9e5b-571afb1225a1"
//   },
//   "issuer": "did:web:demo.spruceid.com",
//   "issuanceDate": "2022-11-16T01:46:04Z",
//   "proof": {
//     "type": "Ed25519Signature2018",
//     "proofPurpose": "assertionMethod",
//     "verificationMethod": "did:web:demo.spruceid.com#_t-v-Ep7AtkELhhvAzCCDzy1O5Bn_z1CVFv9yiRXdHY",
//     "created": "2022-11-16T01:46:04.550Z",
//     "jws": "eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..W5S3KEhAWDOExWIeZ9LZrmcrEABO5AmmczYZMvgZWAQjL4u_8tPnmNDPsQ-Hw82lfcRviezSUc18tlPM77GpCQ"
//   },
//   "expirationDate": "2022-12-16T01:46:04Z"
// }
// const proofOption = {
//   "type": "Ed25519Signature2018",
//   "proofPurpose": "assertionMethod",
//   "verificationMethod": "did:web:demo.spruceid.com#_t-v-Ep7AtkELhhvAzCCDzy1O5Bn_z1CVFv9yiRXdHY",
//   "created": "2022-11-16T01:46:04.550Z",
// }


// 参考: https://stackoverflow.com/questions/68612396/sign-and-verify-jws-json-web-signature-with-ed25519-keypair
const key = createPublicKey({
  key: {
    "kty": "OKP",
    "crv": "Ed25519",
    "x": "2yv3J-Sf263OmwDLS9uFPTRD0PzbvfBGKLiSnPHtXIU"
  },
  format: "jwk"
})

const jws = "eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..W5S3KEhAWDOExWIeZ9LZrmcrEABO5AmmczYZMvgZWAQjL4u_8tPnmNDPsQ-Hw82lfcRviezSUc18tlPM77GpCQ"
const option = {
  algorithms: ["EdDSA"]
}
compactVerify(jws, key, option).then((res) => {
  console.log("res", res)
}).catch((err) => {
  console.log("err", err)
})

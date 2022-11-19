import { compactVerify, CompactSign } from "jose"
import { createPrivateKey, createPublicKey } from "crypto"
import bs58 from "bs58"

// 以下のjwsの検証をしたい
// なぜか検証できない
async function main() {
// jwsの元ネタ
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

  // 参考: https://stackoverflow.com/questions/68612396/sign-and-verify-jws-json-web-signature-with-ed25519-keypair
  // publickKeyはここから取得: https://demo.spruceid.com/.well-known/did.json
  const publicKey = createPublicKey({
    key: {
      kty: "OKP",
      crv: "Ed25519",
      x: "2yv3J-Sf263OmwDLS9uFPTRD0PzbvfBGKLiSnPHtXIU"
    },
    format: "jwk"
  })
  console.log("publicKey", publicKey)

  const jws = "eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..W5S3KEhAWDOExWIeZ9LZrmcrEABO5AmmczYZMvgZWAQjL4u_8tPnmNDPsQ-Hw82lfcRviezSUc18tlPM77GpCQ"
  const option = {
    algorithms: ["EdDSA"]
  }
  // compactVerify: https://github.com/panva/jose/blob/main/docs/functions/jws_compact_verify.compactVerify.md#readme
  const result = await compactVerify(jws, publicKey, option)
  console.log("result", result)
}

// 試しに署名して検証してみたもの。
// これは正常に動作する。
// 参考: https://stackoverflow.com/questions/68612396/sign-and-verify-jws-json-web-signature-with-ed25519-keypair
async function signAndVerifyExample() {
  const publicKeyUint = bs58.decode("A77GCUCZ7FAuXVMKtwwXyFhMa158XsaoGKHYNnJ1q3pv");
  const privateKeyUint = bs58.decode("BE1VM7rTRJReLsTLLG4JMNX5ozcp7qpmMuRht9zB1UjU");

  const publicKey = createPublicKey({
    key: {
      kty: "OKP",
      crv: "Ed25519",
      x: btoa(String.fromCharCode(...publicKeyUint))
    },
    format: "jwk"
  });
  console.log("publicKey", publicKey, btoa(String.fromCharCode(...publicKeyUint)))

  const privateKey = createPrivateKey({
    key: {
      kty: "OKP",
      crv: "Ed25519",
      x: btoa(String.fromCharCode(...publicKeyUint)),
      d: btoa(String.fromCharCode(...privateKeyUint)),
    },
    format: "jwk"
  })
  console.log("privateKey", privateKey)

  const jws = await new CompactSign(
    new TextEncoder().encode(""),
  )
  .setProtectedHeader({ alg: "EdDSA" })
  .sign(privateKey);

  console.log("jws", jws)

  const option = {
    algorithms: ["EdDSA"]
  }
  // compactVerify: https://github.com/panva/jose/blob/main/docs/functions/jws_compact_verify.compactVerify.md#readme
  const result = await compactVerify(jws, publicKey, option)
  console.log("result", result)
}

// signAndVerifyExample();
main();

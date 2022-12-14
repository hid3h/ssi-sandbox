import { Inter } from '@next/font/google'
import { issueCredential } from "@pitpa/didkit/didkit-wasm-node"
import { verifyCredential } from "@pitpa/didkit/didkit-wasm"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
      "created": "2022-12-23T02:56:04.893Z",
      "jws": "eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..RCftchP9z2iOOHcIzh9dEMUJozPWqoUSxnL2JxOXzQnFmGmFadFc8FSvPBwkgZgrzIhEfArDwB8HBOdrmKvABQ"
    },
    "credentialStatus": {
      "id": "https://812f-2400-2411-2282-6300-1d3c-e1ba-6510-36d9.jp.ngrok.io/schema.json#9456",
      "type": "StatusList2021Entry",
      "statusPurpose": "revocation",
      "statusListIndex": "9456",
      "statusListCredential": "https://812f-2400-2411-2282-6300-1d3c-e1ba-6510-36d9.jp.ngrok.io/test.json"
    }
  }`
  const proofOptions = `{"checks": ["credentialStatus"]}`
  verifyCredential(vc, proofOptions).then((res) => console.log("res", res))


  return (
    <>
      とりあえずトップ
    </>
  )
}

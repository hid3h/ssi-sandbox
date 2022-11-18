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

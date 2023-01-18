## コンテナ起動して入る
```
docker-compose up
docerk-compose exec app bash
```

https://www.npmjs.com/package/@spruceid/didkit-wasm-node はバージョンが最新に追従していない。

ソースからwasmをビルドする必要がある。


https://github.com/spruceid/didkit/tree/main/lib/web#web-frameworks-bundled
```
cd /myapp/didkit/lib/web
wasm-pack build

```

https://www.spruceid.dev/quickstart
```
/myappで

./didkit/target/debug/didkit generate-ed25519-key > issuer_key.jwk

vm=$(./didkit/target/debug/didkit key-to-verification-method key --key-path issuer_key.jwk)

./didkit/target/debug/didkit vc-issue-credential --key-path issuer_key.jwk -v “${vm}” -p assertionMethod <unsigned-vc.json
```
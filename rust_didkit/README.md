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

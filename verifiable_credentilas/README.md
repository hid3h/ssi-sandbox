## コンテナ起動
```sh
docker-compose up
```

## コンテナに入る
```sh
docker-compose exec app sh
```

## didkitコマンドの確認
```sh
/./didkit help
```

## VCの署名と検証
以下、コンテナ内でのコマンド実行

https://www.spruceid.dev/quickstart を参考

### issuer用意

```
/ # cd myapp/
/myapp # /./didkit generate-ed25519-key > issuer_key.jwk
/myapp # issuer_did=$(/./didkit key-to-did key -k issuer_key.jwk)
/myapp # echo $issuer_did
did:key:z6MkuVz5yJSq6UVUieZbRZ6S19QWnHutM8Lx5HW7uJ1KBnqo
/myapp #
```

### 署名前のVCのjsonファイルを作成
```
cat > unsigned-vc.json <<EOF
{
    "@context": "https://www.w3.org/2018/credentials/v1",
    "id": "urn:uuid:`uuidgen`",
    "type": ["VerifiableCredential"],
    "issuer": "${issuer_did}",
    "issuanceDate": "$(date -u +%FT%TZ)",
    "credentialSubject": {
        "id": "did:example:my-data-subject-identifier"
    }
}
EOF
```
issuer, issuanceDateの変数が展開されたjsonファイルが生成される。

### 署名
```
vm=$(/./didkit key-to-verification-method key --key-path issuer_key.jwk)
/./didkit vc-issue-credential --key-path issuer_key.jwk -v "${vm}" -p assertionMethod <unsigned-vc-with-status.json > signed-vc-with-status.json
```
署名された`signed-vc.json`が生成される。

### 検証
```
/myapp # /./didkit vc-verify-credential < signed-vc.json
{"checks":["proof"],"warnings":[],"errors":[]}/myapp #
```
OK

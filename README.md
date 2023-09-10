コンテナ内では
```
/usr/local/cargo/bin/cargo --version
```
で実行できた。

一時的にパスを通す
```
export PATH=$PATH:/usr/local/cargo/bin
```

```
root@ee14487676f5:/myapp/didkit/lib/web# wasm-pack build --target nodejs
```
これは、/myapp/didkit/lib/web/pkgにwasmファイルが生成される。

以下のようにwasmでnodeで実行したときにコンソールにprintされるように。
rustの処理がどう進んでいくかとか変数の中身を見るために。
もっといい方法ない？
```
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[cfg(any(
    all(feature = "verify", feature = "credential"),
    all(feature = "verify", not(feature = "presentation")),
    all(
        feature = "credential",
        not(feature = "issue"),
        not(feature = "verify")
    )
))]
async fn verify_credential(vc_string: String, proof_options: String) -> Result<String, Error> {
    log(&format!("Hello, {}!", proof_options));
```
ssiの方だと動かなくて、Caro.tomlに
[dependencies]
wasm-bindgen = "0.2.68"
を追加したら動いた。

```
log(&format!("proofs, {:?}", proofs));
```
配列？これで出力できた
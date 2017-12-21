# _sを使用したwordpressテンプレートです。
## 前提
wp-cliが入っている事が前提となります。

## 使用方法
git clone してフォルダ内で
`sh init.sh`
`npm install`
### init.sh
wordpressの更新やプラグインのインストールなどが書かれています。
必要に応じて書き換えて下さい。

### npm install

gulpのインストールなどが行われます。

#### Gulp
gulpfile.jsの File Destinationsに様々なpathを書いていく事ができます。
brawsersyncのアドレスなどをここで設定して下さい。

##### 基本コマンド
gulpインストール完了後`gulp`で実行可能です。
#### その他のコマンド
###### gulp image
`src/img`内の画像ファイルを圧縮し、`assets/img`に保存します。

###### gulp test-sass
sass lint を走らせます。

## Sass
CSS設計にFLOCSSを採用。
style.scssで、Bootstarp/FontAwesomeが読み込まれるようになってます。
必要なければコメントアウトして下さい。

## phpmd及びphp code sniffer
ルールファイルをフォルダに入れてますので必要に応じて使用して下さい。

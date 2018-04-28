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

## Gulp
gulpfile.jsの File Destinationsに様々なpathを書いていく事ができます。  
brawsersyncのアドレスなどをここで設定して下さい。

### コマンド
#### gulp
brawsersyncが起動。  
※使用前にgulpfile.js要設定  
※imgフォルダは監視対象外  

#### gulp image
`src/img`内の画像ファイルを圧縮し、`assets/img`に保存します。  
`src/img/svgSprite`内に設置したSVGファイルをSVGスプライトとして`assets/svg`に保存します。  
その際、fillは全て削除され、圧縮されます。
SVGスプライトのID名、画像は`doc/svg/template.html`に保存されています。

#### gulp test-sass
sass lint を走らせます。

#### gulp style
style guideを作成します。  
sc5-styleguideを走らせてます。  

## wordpressテンプレートタグ
`<?php echo twentyseventeen_get_svg( array( 'icon' => 'twitter' ) ); ?>`  
上記タグで、SVGスプライトを呼び出し可能。
シンボルは全て`doc/svg/template.html`で確認可能。

## functions.php

ACF Options Pagesの設定を追加しています。
不要であれば削除して下さい。

## コード規約
### Sass
CSS設計にFLOCSSを採用。  
style.scssで、Bootstarp/FontAwesomeが読み込まれるようになってます。  
必要なければコメントアウトして下さい。  
### phpmd及びphp code sniffer  
ルールファイルをフォルダに入れてますので必要に応じて使用して下さい。  

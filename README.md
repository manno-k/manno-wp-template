# _sを使用したwordpressテンプレートです。
## 前提条件
`npm`がインストールされていることが条件となります。

### インストール方法

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

### utility
`display:none`を付与するクラスを作成しています。
`.u-hidden-xs-down`等で使用可能です。
下記の仕様に準拠しています。
- [Responsive utilities](https://v4-alpha.getbootstrap.com/layout/responsive-utilities/)  
※Bootstrap4では削除されたため追加しています。

### mixin
#### 特定ブラウザにスタイルをあてる
safari
```scss
@include safari_only{
  display: block;
}
```
IE
```scss
@include ie_only{
display: block;
}
```

#### link color

```scss
@include link_color($black){
  text-decoration: none;
}
```

### phpmd及びphp code sniffer  
ルールファイルをフォルダに入れてますので必要に応じて使用して下さい。  

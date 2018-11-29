# _sを使用したwordpressテンプレートです。
## 前提条件
`npm`がインストールされていることが条件となります。

## Gulp
`gulpfileconfig.js`に様々なpathを書いていく事ができます。  
brawsersyncのアドレスなどをここで設定して下さい。

### コマンド
#### gulp
brawsersyncが起動。  
※使用前に`gulpfileconfig.js`要設定  
※imgフォルダは監視対象外  

#### gulp image
`src/img`内の画像ファイルを圧縮し、`assets/img`に保存します。  

## functions.php

- ACF Options Pagesの設定を追記しコメントアウトしています。
- ACF JSONが追加されています。

## JSについて
### 初期インストールプラグイン
#### スライダー
[slick][]

#### ハンバーガーメニュー
[hiraku](https://www.appleple.com/blog/javascript/hiraku-js.html)
    - レイアウトによっては [drawer][]を使用しても良い。
    
#### polyfill
- [object-fit-images](https://github.com/bfred-it/object-fit-images)
- [smooth scroll behavior polyfill](http://iamdustan.com/smoothscroll/)

## CSSについて

### フレームワーク
- [Bootstrap][]

### CSSアーキテクチャ
  - [FLOCSS][]
  - [参考](https://qiita.com/Atsss/items/4f9d98fb1d0546539c09)
  - サイトの継続的な運用が見込まれるためFLOCSSで作成します。
  - プレフィックスとフォルダ・ファイル構成はFLOCSSに準拠します。

#### プレフィックス
- [FLOCSS][]に準拠
- jsが絡むクラスに関しては.jsを使用

```
Component - .c-*
Project - .p-*
Utility - .u-*
JS - .js-*
SVG - .svg-*
```

####  クラス命名規則

- [FLOCSS][]では[MindBEMding][]を採用している。
- [RSCSS](https://qiita.com/kk6/items/760efba180ec526903db)の命名でもよい、RSCSSもセパレータや詳細度が異なるが基本は[MindBEMding][]である。
- BEMに従って命名する場合は `block-name_element-name`
  - Block - Elementのセパレータはアンダースコア(`_`)

##### pc/spの分割について
レスポンシブデザインではないため、以下のルールを設けます。

- sp用のクラスにはblockに`sp`をつける
    - 例:`.l-block-sp_element-name`
- 可読性を高めるため、pc/spの記述は分離させる。

```
.l-header{
    pc用
}

.l-header-sp{
    SP用
}
```


### utility
`display:none`を付与するクラスを作成しています。
`.u-hidden-xs-down`等で使用可能です。
下記の仕様に準拠しています。
- [Responsive utilities](https://v4-alpha.getbootstrap.com/layout/responsive-utilities/)  
※Bootstrap4では削除されたため追加しています。

`.col-12 .col-md-12`といった書き方で、純粋な12分割のグリッドが使用できます。

```sass
@each $size in xs, sm, md, lg, xl {
  @for $i from 1 through 12 {
    .u-col-#{$i} {
      flex-basis: 8.333333333% * $i;
      min-width: 8.333333333% * $i;
    }

    .u-col-#{$size}-#{$i} {
      @include media-breakpoint-up(#{$size}) {
        flex-basis: 8.333333333% * $i!important;
        min-width: 8.333333333% * $i!important;
      }
    }
  }
}
```

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

### object-fit

IE対策用の以下のライブラリを使用する際のmixin

- [object-fit-images](https://github.com/bfred-it/object-fit-images)

```sass
// object-fit-imagesの指定も行えるようにmixin化
@mixin object-fit($properties) {
    object-fit: $properties;
    /* stylelint-disable */
    font-family: 'object-fit: #{$properties};';
    /* stylelint-enable */
}
```

#### link color

```scss
@include link_color($black){
  text-decoration: none;
}
```

## 画像の取扱に関して
### 画像保存先

`src/img`内の画像ファイルを圧縮し、`assets/img`に保存します。  


### SVG取扱に関する注意事項

- `<xml>`等の不要なタグが含まれている場合は予期せぬ不具合の原因となるため、削除しておく。
- `<text>`で囲まれているテキスト要素はブラウザによってフォントが異なるため、アウトライン化して使用する。
    - デザイナーに依頼する。
- IEでの表示バグを防ぐため`<svg>`に以下の要素を指定する。
    - ` width="123.88" height="133" preserveAspectRatio="xMinYMid" `

### phpmd及びphp code sniffer  
ルールファイルをフォルダに入れてますので必要に応じて使用して下さい。  


<!-- 以下、各種リンク -->

[FLOCSS]: https://github.com/hiloki/flocss
[MindBEMding]: https://github.com/juno/bem-methodology-ja/blob/master/definitions.md
[Bootstarp]: https://getbootstrap.com/
[slick]: http://kenwheeler.github.io/slick/
[drawer]: https://github.com/blivesta/drawer

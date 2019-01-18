## CSSコーディングガイド
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

#### 定義

##### Component
再利用できるパターンとして、小さな単位のモジュールを定義します。
一般的によく使われるパターンであり、例えばBootstrapのComponentカテゴリなどに見られるbuttonなどが該当します。
出来る限り、最低限の機能を持ったものとして定義されるべきであり、それ自体が固有の幅や色などの特色を持つことは避けるのが望ましいです。

##### Project
プロジェクト固有のパターンであり、いくつかのComponentと、それに該当しない要素によって構成されるものを定義します。
例えば、記事一覧や、ユーザープロフィール、画像ギャラリーなどコンテンツを構成する要素などが該当します。

複数回再利用される場合は、Componentに移行して下さい

##### Utility
ComponentとProjectレイヤーのObjectのモディファイアで解決することが難しい・適切では無い、わずかなスタイルの調整のための便利クラスなどを定義します。
Utilityは、Component、ProjectレイヤーのObjectを無尽蔵に増やしてしまうことを防いだり、またこれらのObject自体が持つべきではないmarginの代わりに.mbs { margin-bottom: 10px; }のようなUtility Objectを用いて、隣接するモジュールとの間隔をつくるといった役割を担います。
またclearfixテクニックのためのルールセットが定義されているヘルパークラスも、このレイヤーに含めます。

#### ディレクトリ構造

ファイル分割を行う際は下記のディレクトリ構造を参考にしてください。

```
├── foundation
│   ├── _base.scss
│   └── _reset.scss
├── layout
│   ├── _footer.scss
│   ├── _header.scss
│   ├── _main.scss
│   └── _sidebar.scss
└── object
    ├── component
    │   ├── _button.scss
    │   ├── _dialog.scss
    │   ├── _grid.scss
    │   └── _media.scss
    ├── project
    │   ├── _articles.scss
    │   ├── _comments.scss
    │   ├── _gallery.scss
    │   └── _profile.scss
    └── utility
        ├── _align.scss
        ├── _clearfix.scss
        ├── _margin.scss
        ├── _position.scss
        ├── _size.scss
        └── _text.scss
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

#### media query
保守性の観点からmedia queryは原則としてBootstrapの[Responsive breakpoints](https://getbootstrap.com/docs/4.1/layout/overview/#responsive-breakpoints)の`media-breakpoint-up`に統一します。
デザインの兼ね合いで止む終えない場合は`min-width`で定義するようにしてください。
※`min-width`と`max-width`を混同して使用しないこと

```sass
// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)
@media (min-width: 992px) { ... }

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }

// No media query necessary for xs breakpoint as it's effectively `@media (min-width: 0) { ... }`
@include media-breakpoint-up(sm) { ... }
@include media-breakpoint-up(md) { ... }
@include media-breakpoint-up(lg) { ... }
@include media-breakpoint-up(xl) { ... }
```

##### 記述ルール

クラスに対して入れ子にする形でmedia-queryを指定してください。
複数指定するクラスがある場合はその都度指定して下さい。

```scss
/* OK */
.custom-class {
  display: none;
  @include media-breakpoint-up(sm) {
      display: block;
  }
}

.custom-class-2 {
  display: none;
  @include media-breakpoint-up(sm) {
      display: block;
  }
}

/* NG */
@include media-breakpoint-up(sm) {
    .custom-class {
           display: none;
    }
    .custom-class-2 {
           display: none;
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

#### svg icon
backgroundにいSVGを使用するためのmixinです。
`sass/foundation/_svg.scss`に記載しています。

##### 使用方法
`background-image:inline-svg`内に`svg`のコードを入力する。
```sass
background-image: inline-svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.431 29.418"><path fill="#{$color}" data-name="Path 216" d="M33.766,5.5l-.258-.352-.117-1.41-.47-.47L32.568.5,32.1.782l-.587.775-1.879.4.235.258L28.5,5.621l-2.678.517L25.567,7.36l-.822.94-1.1.587-1.057.282L21.244,9l-.493.634h-.4s.94.4.7,1.01a.989.989,0,0,1-.893.634l-1.5.376s-.963.7-1.01.94-1.457.752-1.457.752l-.47-.587-1.2-.094-.164-.305v-.7H12.74l-1.269-.7-.423-.752h-.94l-.423-.681L9.31,9.192l-.752.329-.7-.446S7.43,8.723,7.1,8.84a9.139,9.139,0,0,1-1.2.235v-1.1l-.728-.188H4.141l.188.7.423,1.879H2.826l-.235.587h-.94v.893H2.8v.634l-.658.587-.752.752H.5V16.17l1.245-1.457v1.175l-.329,1.668A16.192,16.192,0,0,1,3.39,19.529c.117.282.658.47.658.47l1.034-.117.493-.047s-.47.7,0,1.222a7.362,7.362,0,0,0,.987.893h.987l.282-.423s.164.07.376.164a2.9,2.9,0,0,0,.681.235c.188,0-.822.658-.822.658v.47l1.222.282v-.822h.94s-.587.47-.423.822c.023.023.023.07.047.094.211.352.658.916.658.916l.517-.423s-.117-.47.517-.188,1.527.141,1.527.611a6.036,6.036,0,0,0,.235,1.269s.047-.8,1.222-.094A15.4,15.4,0,0,1,17.462,27.4a4.3,4.3,0,0,0,2.114,1.057c.258.047,2.161.023,2.631,0h.117a2.065,2.065,0,0,1,1.292.376,4.817,4.817,0,0,0,2.349,1.081,4.84,4.84,0,0,0,1.762-1.081s.423-.117.752-.211a1.034,1.034,0,0,1,.235-.047c.282-.047,1.457-.235,1.457-.235l1.809-.047-.282-.658.822-.446-.822-.752-.7-1.245-.47-1.222-.07-.141-.634-1.1-.517-.752-1.363-.188V21.5l-.7-.987h1.222l-.7-2.913h-.587l-.117-.446-1.269.446v-.446h-.047l1.363-1.386h.987l.352-.681s-2-1.692-1.832-2.114a4.574,4.574,0,0,1,.517-.893l1.292-.7-.282-.446h.752l.235-.728.658-.423s.587.117.752.423a3.291,3.291,0,0,0,.987.728h.47l.587-.728.47-.423V6.491l.893-.587Z" transform="translate(-0.5 -0.5)"/></svg>')
```
fillの色を変更できるように、pathやgなどに`fill="#{$color}"`を追記

##### 呼び出し方法
```sass
@include svg-icon-map(red,30px,center center no-repeat);
```

<!-- 以下、各種リンク -->

[FLOCSS]: https://github.com/hiloki/flocss
[MindBEMding]: https://github.com/juno/bem-methodology-ja/blob/master/definitions.md
[Bootstrap]: https://getbootstrap.com/

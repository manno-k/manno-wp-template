# wordpress starter theme
## 前提条件
`npm`がインストールされていることが条件となります。

## Gulp v4
`gulpfileconfig.js`に様々なpathを書いていく事ができます。  
`brawsersync`のアドレスなどをここで設定して下さい。

### コマンド
#### gulp
brawsersyncが起動。  
※使用前に`gulpfileconfig.js`要設定  

##### 起動しない場合
以下のエラーが出た場合`npx gulp`で解消される場合があります。

```javascript
gulpInst.start.apply(gulpInst, toRun);                   

TypeError: Cannot read property 'apply' of undefined

```

#### gulp image
`src/img`内の画像ファイルを圧縮し、`assets/img`に保存します。  

## functions.php
`inc/`以下に以下の設定ファイルが保存されています。

```
inc/enqueue-scripts.php : css/scriptsの読み込み
inc/widget-init.php : widget 設定
inc/acf-functions.php : ACF関連
inc/custom-posts.php : カスタム投稿の設定
```

※カスタム投稿は初期状態では`functions.php`内でコメントアウトされています。

## コーディング規約

`doc/`以下に下記のコーディング規約を保存しているため確認してください。

## 更新履歴

### 2021/05/28
可能なものについては、node_modulesより読み込むように変更。

```
coding_guide.md: コーディング規約
css_guide.md: cssコーディング規約
img_guide.md: 画像ファイルの規約
js_guide.md: javascriptに関する規約
wordpress_guide.md: wordpressに関する規約&スニペット
```

<!-- 以下、各種リンク -->

[FLOCSS]: https://github.com/hiloki/flocss
[MindBEMding]: https://github.com/juno/bem-methodology-ja/blob/master/definitions.md
[Bootstarp]: https://getbootstrap.com/
[slick]: http://kenwheeler.github.io/slick/
[drawer]: https://github.com/blivesta/drawer

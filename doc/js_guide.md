# JSについて
## インストール先

`src/js/*`以下に保存し、gulpでコンパイル後、`assets/js/*`に保存すること。
 
## ファイル命名規則
JSファイルの作成する場合、必ずどこの箇所で使用するか分かるように命名すること。
例：`contact_form_custom.js`

## class命名規則

jsで使用するclassの接頭詞は原則として`js-*`を使用することとする。  
※`active`,`is-show`等の状態を表すclassを除く。

## Gulpの設定
`gulpconfig.js`の以下の箇所でJSの管理をしています。
表記の順番で`assets/js/minified.min.js`に圧縮されて保存されます。
JSを追加する場合は以下に追記する。
※使用箇所が限られている、圧縮させたくないスクリプトは記入しなくて良い。

```javascript
script: {
  	// 圧縮時のファイル名
	filename:'minified.js',
	// まとめたいファイルをまとめたい順番に指定していく。
	// 指定していないファイルはminified.jsに圧縮されない。
	concat: [
		// ハンバーガーメニュー
		'src/js/hiraku.js',
		'src/js/hiraku-init.js',
		// スライダー
		'src/js/slick.js',
		'src/js/slick-init.js',
		// smooth scroll
		'src/js/smoothscroll.js',
		// object-fit polyfill
		'src/js/ofi.js',
		'src/js/ofi-init.js',
		// scroll監視プラグイン
		// 'src/js/ScrollTrigger.js',
		// 'src/js/ScrollTrigger-init.js',
	]
}
```

## 初期インストールプラグイン
### スライダー
[slick][]

### ハンバーガーメニュー
[hiraku](https://www.appleple.com/blog/javascript/hiraku-js.html)
    - レイアウトによっては [drawer][]を使用しても良い。
    
### polyfill
- [object-fit-images](https://github.com/bfred-it/object-fit-images)
- [smooth scroll behavior polyfill](http://iamdustan.com/smoothscroll/)

### スクロール管理

- [ScrollTrigger](https://github.com/terwanerik/ScrollTrigger)

### バグ対策

wordpressの実装でjsが動かないときは下記で囲むと解消されることがあります。

```js
jQuery(function ($){
// ここにコードを書く
});
```

[slick]: http://kenwheeler.github.io/slick/
[drawer]: https://github.com/blivesta/drawer

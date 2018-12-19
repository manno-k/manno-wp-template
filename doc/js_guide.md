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

#### バグ対策

wordpressの実装でjsが動かないときは下記で囲むと解消されることがあります。

```js
jQuery(function ($){
// ここにコードを書く
});
```

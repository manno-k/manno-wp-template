##  Wordpress 必須プラグイン
### カスタムフィールド作成
- [ACF PRO](https://www.advancedcustomfields.com/resources/)
 ※PROアカウントはAWESOMEで所有

### SEO対策用
- [Yoast SEO](https://ja.wordpress.org/plugins/wordpress-seo/)

### コンタクトフォーム
- [Contact Form7](https://ja.wordpress.org/plugins/contact-form-7/)

### バックアッププラグイン
- [All in One WP Migration](https://wordpress.org/plugins/all-in-one-wp-migration/)
 ※開発データの受け渡し等でも使用します。

## 外部サービス
  - [Google Maps](https://goo.gl/maps/voAb3VKKewj) : HTMLタグでの埋め込み

## コーディング規約

- WordPressコーディングスタイル
  - [WordPress コーディング規約](https://wpdocs.osdn.jp/WordPress_%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%E8%A6%8F%E7%B4%84)
  - Standard準拠
- Sass
  - npm stylelint-scss
  - recommended準拠
  - no-descending-specificity:null

### phpmd及びphp code sniffer  
ルールファイルをフォルダに入れてますので必要に応じて使用して下さい。  

## フォルダ構成
圧縮前のファイルは `src` に保存する。
圧縮後のファイルは `assets`に保存する。

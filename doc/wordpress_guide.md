# wordpressに関する規約＆スニペット

## Wordpressベーステンプレート

[_s](https://underscores.me/)

##  Wordpress 必須プラグイン
### カスタムフィールド作成
- [ACF PRO](https://www.advancedcustomfields.com/resources/)
 ※PROアカウントは弊社で所有

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

## wordpressの初期設定に関して
### wp-cliを使用した初期設定
wp-cliを使用して初期設定を行う際のスニペットです。
[wp-cliインストール方法](https://wp-cli.org/ja/#%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E6%96%B9%E6%B3%95)

以下のことを行います。

1. 言語パックのインストール
2. 言語を日本語に設定
3. テーマ開発に使用する主要なプラグインのインストール
4. 開発用のテストデータのインストール
5. テストデータで不要なメニューの削除
6. タイムゾーンの設定
7. wordpress、プラグインのアップデート

```
wp core language install ja
wp core language activate ja
wp plugin install wp-multibyte-patch \
      theme-check \
      debug-bar \
      debug-bar-extender \
      contact-form-7 \
      show-current-template \
      tinymce-advanced \
      wp-total-hacks \
      wp-mail-smtp \
      wordpress-seo \
      wordpress-importer \
      broken-link-checker \
      jetpack \
      wp-pagenavi \
      breadcrumb-navxt \
      all-in-one-wp-migration \
      classic-editor \
      all-in-one-wp-security-and-firewall  \
      flamingo \
      duracelltomi-google-tag-manager  \
      pubsubhubbub  --activate
apt-get install -y wget
wget https://raw.githubusercontent.com/jawordpressorg/theme-test-data-ja/master/wordpress-theme-test-date-ja.xml --no-check-certificate  &&  wp import wordpress-theme-test-date-ja.xml --authors=create && rm wordpress-theme-test-date-ja.xml
wp menu delete all-pages   all-pages-flat empty-menu foot_navi head_navi short testing-menu widget_page_menu
wp option update timezone_string 'Asia/Tokyo'
wp option update date_format 'Y年n月j日'
wp option update time_format 'H:i'
wp plugin update-all
wp theme update-all
wp core language update
wp core update --locale=ja --force
wp core update-db
```

### 納品前に実行するスニペット

以下の事を実行しています。

1. twentynineteen twentyseventeen twentysixteen の削除
2. デバック用プラグインの削除
3. プラグイン、テーマ、コア、言語パックの更新

```
wp theme delete twentynineteen twentyseventeen twentysixteen 
wp plugin delete debug-bar debug-bar-extender show-current-template 
wp plugin update-all
wp theme update-all
wp core language update
wp core update 
wp core update-db
```

#### 記事を全て削除する。
テストデータを含む全ての投稿記事が削除されます。
※固定ページは削除されません

```
wp post delete $(wp post list --post_type='post' --format=ids)
wp post delete $(wp post list --post_type='post' --post_type='page' --post_status=trash --format=ids)
```

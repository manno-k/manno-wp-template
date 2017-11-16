#!/bin/bash
shopt -s expand_aliases
source ~/.bash_profile
npm install
## 日本語化
wp core language install ja
wp core language activate ja
## 不用なThemeフォルダの削除
wp theme delete twentyfifteen twentysixteen

## いろいろなプラグインをインストール
echo "いろいろなプラグインをインストールしますか?  [Y/N]"
read ANSWER1

case $ANSWER1 in
    "" | "Y" | "y" | "yes" | "Yes" | "YES" )
      wocker wp plugin install wp-multibyte-patch \
      theme-check \
      debug-bar \
      debug-bar-extender \
      contact-form-7 \
      contact-form-7-to-database-extension \
      contact-form-7-add-confirm \
      category-posts \
      lightweight-social-icons \
      show-current-template \
      google-analytics-dashboard-for-wp \
      arconix-faq \
      bwp-google-xml-sitemaps \
      siteorigin-panels \
      so-widgets-bundle \
      tinymce-advanced \
      wp-total-hacks \
      wp-mail-smtp \
      wordpress-seo \
      wordpress-importer \
      wp-social-bookmarking-light \
      broken-link-checker \
      jetpack \
      syntaxhighlighter \
      wp-pagenavi \
      advanced-custom-fields \
      advanced-post-slider \
      breadcrumb-navxt \
      custom-post-type-ui \
      smart-slider-3 \
      show-current-template \
      all-in-one-wp-migration \
      --activate
      ;;
    * ) echo "plugin Done!";;
esac

## オプション
wp option update timezone_string 'Asia/Tokyo'
wp option update date_format 'Y年n月j日'
wp option update time_format 'H:i'

## プラグインとテーマのアプデ
wp plugin update-all
wp theme update-all

## 翻訳ファイルのアプデ
wp core language update

## 日本語コアファイルのアプデ
wp core update --locale=ja --force
wp core update-db

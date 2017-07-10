#!/bin/bash
shopt -s expand_aliases
source ~/.bash_profile

## 日本語化
wocker wp core language install ja
wocker wp core language activate ja

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

## テーマユニットテストデータのインストール
echo "テーマユニットテストデータをインストールしますか?  [Y/N]"
read ANSWER2

case $ANSWER2 in
    "" | "Y" | "y" | "yes" | "Yes" | "YES" ) wocker theme-test ja && echo "Theme Test Data install Done!!";;
    * ) echo "init Done!";;
esac

## オプション
wocker wp option update timezone_string 'Asia/Tokyo'
wocker wp option update date_format 'Y年n月j日'
wocker wp option update time_format 'H:i'

## プラグインとテーマのアプデ
wocker wp plugin update-all
wocker wp theme update-all

## 翻訳ファイルのアプデ
wocker wp core language update

## 日本語コアファイルのアプデ
wocker wp core update --locale=ja --force
wocker wp core update-db

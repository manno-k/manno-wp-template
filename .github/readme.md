# Github action 自動deploy
- [参考サイト](https://kahoo.blog/github-actions-php-deploy/)

## 変数
以下をレポジトリの `setting >Secrets > Actions`に登録する

- SSH_PRIVATE_KEY:サーバーの秘密鍵
- SSH_PORT:ポート番号 ※さくらは22
- SSH_USERNAME:ユーザー名
- SSH_HOST:ホスト名
- SSH_PATH_MASTER: masterブランチにpushされた時のコピー先のフォルダ
- SSH_PATH_DEV:develop ブランチにpushされた時のフォルダ

## ファイルの指定・除外
### rsync_include.txt
記入されているファイルがコピー対象となる。
デフォルトでは、全てのファイルが対象。

### rsync_exclude.txt
除外するファイルを指定する。

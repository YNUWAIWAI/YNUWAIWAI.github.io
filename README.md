# YNUWAIWAIのホームページ [![Build Status](https://travis-ci.org/YNUWAIWAI/YNUWAIWAI.github.io.svg?branch=src)](https://travis-ci.org/YNUWAIWAI/YNUWAIWAI.github.io)

# ディレクトリ構造

```

.
├── .editorconfig       # ref: http://editorconfig.org/
├── .eslintrc.js        # ESlintの設定
├── .gitignore          # Gitの設定
├── .travis.yml         # Travis CIの設定
├── Gemfile             # Gemの依存関係のリスト
├── Gemfile.lock        # 実際にインストールしたGemのバージョン
├── README.md
├── _config.yml         # Jekyllの設定
├── _site/              # Jekyllでビルドしたときの出力先
├── deploy_key.enc      # Travis CIでdeployするためのSSH鍵
├── package.json        # node_modulesの依存関係やnpm scriptsなどの設定
├── postcss.config.js   # PostCSSで使うモジュールの設定
├── src/                # Jekyllのビルドで使うフォルダ
│   ├── _includes/      # コンポーネント
│   ├── _layouts/       # テンプレート
│   ├── _posts/         # テキスト
│   ├── about/          # /about/ページ
│   ├── assets/         # Webpackでbundleしたファイルの出力先
│   │   ├── css/
│   │   └── js/
│   ├── contact/        # /contact/ページ
│   ├── index.html      # /ページ
│   └── news/           # /news/ページ
├── stylelint.config.js # Stylelintの設定
├── tools/              # シェルスクリプトなど
├── webpack/            # Webpackでビルドされるファイル
│   ├── entry.js
│   ├── js/
│   └── postcss/
├── webpack.config.js   # Webpackの設定ファイル
└── yarn.lock           # 実際にインストールしたnode_modulesのバージョン
```

# 開発準備

## Dockerを使う

```bash
$ ./start.sh
```
[DockerHub](https://hub.docker.com/r/ynuwaiwai/ynuwaiwai.github.io/)
から`ynuwaiwai/ynuwaiwai.github.io`というDockerイメージをとってきて，それをもとにDockerコンテナを作る．
`docker run`のオプション`--rm`によりDockerコンテナは実行終了後破棄される．

## Mac OSX or Linux

### このリポジトリをローカルにコピーする。

```bash
$ git clone git@github.com:YNUWAIWAI/YNUWAIWAI.github.io.git
```

### Rubyをインストールする。
RubyGemsを使うため。詳しくは[Rubyのインストール手順](https://www.ruby-lang.org/ja/documentation/installation/)

macOS

```bash
$ brew install ruby
```

Ubuntu or Debian

```
$ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
$ git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
$ rbenv install 2.3.3
$ rbenv local 2.3.3
```

Arch Linux

```bash
$ sudo pacman -S ruby
```

### [Bundler](http://bundler.io/)をインストールする。

```bash
$ sudo gem install bundler
```

### `Gemfile.lock`にある必要なファイルをインストールする。

```bash
$ bundle install
```

### [Yarn](https://yarnpkg.com/)のインストール

詳しくは
https://yarnpkg.com/en/docs/install

インストール後プロジェクトルートで
```
$ yarn
```

# ローカルでの開発

## テスト

```bash
#リポジトリのルートに移動する
$ cd path/to/repo
$ yarn test
```

## localhostでプレビューする

```bash
#リポジトリのルートに移動する
$ cd path/to/repo
$ yarn start
```
<http://127.0.0.1:4000/>を開く

# 記事を書く

```bash
yarn post hoge
```
で`src/_post/`に`YYYY-MM-DD-hoge.md`が作られるので，これをベースにして書く．

# ツール

## ホスティングサービス

### [GitHub Pages](https://pages.github.com/)

タダ．管理しやすい．

## 静的ページジェネレータ

### [Jekyll](https://jekyllrb.com/)

GitHub Pagesなどもっとも広く利用されている静的コンテンツジェネレータ。

## ビルドツール

## [Webpack](https://webpack.github.io/)

CSSとJavaScriptをまとめて，minifyする．

## テスティングフレームワーク

### [TravisCI](https://travis-ci.org/)

CI（継続的インテグレーション）ツール．
これで自動てテストを行って全部通ったらmasterにデプロイする形にしている．
他のホスティングサービスに乗り換えやすいような作りにしている．

### [textlint](https://textlint.github.io/)

自然言語のLinter.
コンテンツの品質を保つため．
ルールは自分で設定する．

### [PostCSS](http://postcss.org/)

CSSのトランスパイラー．
現行のブラウザで使えるCSSの規格よりも先の機能（CSS4のプロポーザルなど）を使える.
使いたいのは主に[CSS nesting](http://tabatkins.github.io/specs/css-nesting/)。

### [StyleLint](http://stylelint.io/)

CSSのLinter.

## [ESLint](http://eslint.org/)

JavaScriptのLinter.

# FAQ
## RubyGemsで入れたパッケージ（`bundle` `jekyll` ...etc）が動かないんだけど？
実行できるようにパス（環境変数）を通しましょう．
ターミナルを起動したときに読み込まれるファイル（`.bash_profile` `.zshenv`など。なければ作成する。）に下のように追加することで解決できます．

```bash:.bash_profile
PATH="$HOME/.gem/ruby/2.3.0/bin:$PATH"
```

追加した後にターミナルを再起動するか`. ~/.bash_profile`するのを忘れないでください．

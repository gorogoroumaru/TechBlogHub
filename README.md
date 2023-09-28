サイトURL：　https://techbloghub.net/

テストアカウント：
メールアドレス techbloghubtest@gmail.com
パスワード test

# 制作概要
制作時期：2023年6月~ （開発途中）

サイト構成：トップ、検索ページ、ユーザー登録／ログインページ、投稿ページ、投稿詳細ページ

技術スタック：Sveltekit, Cloudflare pages, planetscale (MySQL), supabase (認証), zod, flowbite, tailwind CSS

# こだわった点
## 技術選定

- 仮想DOMを使用せずにコンパイルによってレンダリングに必要なコードを生成するという思想に興味を惹かれてSvelteを使用しました。
- edge computingが最近盛り上がっているのでcloudflare workersにdeployしました


## 機能面

- 投稿された技術ブログのURLからHTMLをフェッチし、OGP画像のURLを自動で抽出してデータベースに登録するようにしました。
- 投稿を検索できるようにタイトル、コメントにfulltext indexを設定しました 
- ブログ一覧画面の各エントリに表示されているOGP画像はそのままのものを使用するとデータサイズが大きくなってしまうのでsupabase storageに保存して適切なサイズへ圧縮を行いました。
- タグ入力欄に自動補完機能を搭載しました

## 非機能面

- データベース参照のパフォーマンスを意識して、インデックスを設定しました。
- zodを使用して投稿フォームのvalidationを行いました。
- メモを参照する際には認証情報を確認して、他人のメモを参照できないようにしました。
- LightHouseを使用してパフォーマンス、アクセシビリティ項目を確認し、可能な範囲で対応しました。
- supabaseのユーザー登録時のメール送信がデフォルトだと非常に厳しいrate limitに設定されているためSendGridを活用し、一度に多くのユーザー登録があっても対応可能にしました
- パフォーマンスや精度上の観点で検索機能をMySQLの全文検索からAlgoriaへ切り替えを行いました

## 苦労したこと
- Svelteのエコシステムが発展途上であり、ツール群や情報量などがReactなどと比較して貧弱だと感じました
- Svelteを初めて使用したので、独特の表記に慣れるまで苦労しました

# 今後の課題

## 機能面

- 設定できるタグの粒度が粗いのでより細かなタグを設定できるようにしてユーザーがピンポイントで探したい領域の技術ブログを提示できるようにします。
- ユーザーが投稿された記事を評価できるようにして、分野ごとに投稿のランキングを閲覧できるようにします。
- 投稿された技術ブログでわからない部分があれば他のユーザーに質問できるようにします

# テーブル定義
＊planetscaleでは外部キー制約が使えないため、外部キー制約を使わずにテーブルを作成しました

## 投稿テーブル
```
CREATE TABLE `Resources` (

    `id` int unsigned NOT NULL AUTO_INCREMENT,

    `title` varchar(255),

    `description` text,

    `url` text,

    `user_id` varchar(36),

    `created_at` timestamp NULL DEFAULT current_timestamp(),

    `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),

    `image_url` text,

    `user_name` varchar(50),

    PRIMARY KEY (`id`),

    KEY `userid_index` (`user_id`),

    FULLTEXT KEY `TitleAndDesc` (`title`, `description`) WITH PARSER ngram

)
```

## ブックマークテーブル
```
CREATE TABLE `Bookmarks` (

    `id` int unsigned NOT NULL AUTO_INCREMENT,

    `user_id` varchar(36),

    `resource_id` int unsigned NOT NULL,

    `created_at` timestamp NULL DEFAULT current_timestamp(),

    PRIMARY KEY (`id`)

)
```

## メモテーブル
```
CREATE TABLE `Memos` (

    `id` int unsigned NOT NULL AUTO_INCREMENT,

    `content` text,

    `user_id` varchar(36),

    `resource_id` int unsigned NOT NULL,

    `created_at` timestamp NULL DEFAULT current_timestamp(),

    `updated_at` timestamp NULL ON UPDATE current_timestamp(),

    PRIMARY KEY (`id`),

    KEY `userid_index` (`user_id`)

)
```

## タグテーブル
```
CREATE TABLE `Tags` (

    `id` int unsigned NOT NULL AUTO_INCREMENT,

    `resource_id` int unsigned NOT NULL,

    `tag_name` text,

    PRIMARY KEY (`id`),

    KEY `resourceid_index` (`resource_id`)

)
```


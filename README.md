# netkeiba CLI

[netkeiba.com](https://db.netkeiba.com) から過去のレース情報をスクレイピングする CLI アプリです。

- 有料会員として**ログイン**することで**タイム指数**等が取得可能です。
- クライアント側で javascript が動作しないので**軽量かつ高速**です。
- HTML のパースが**非常に高速**です。(中央競馬 10 年分 40000 万レースを 3 分でパース可能)
- 現在は中央競馬のみ対応

## Installation

### Git

#### global

```bash
npm install -g masan4444/node-netkeiba-cli
netkeiba-cli
```

#### local

```bash
mkdir workspace
cd workspace
npm init -y
npm install masan4444/node-netkeiba-cli
npx netkeiba-cli
```

### NPM

working...

## Usage

```bash
netkeiba-cli crawl 2021/7 2021/9 -o url_list.txt #2021年7月から8月のレースURLをurl_list.txtにダウンロード
netkeiba-cli fetch url_list.txt -o output_html_dir # URLをもとにHTMLをダウンロード
netkeiba-cli parse output_html_dir -o parsed.json # HTMLをパースしてJSON化
netkeiba-cli save parsed.json #JSONをもとにSQLiteに保存
```

### Detail

```bash
netkeiba-cli [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  login           login netkeiba.com
  crawl           collect race urls
  fetch [file]    download html based on [file]
  parse [dir]     parse html files in [dir]
  save [file]     save parsed data to DB
  help [command]  display help for command
```

| SubCommand    | Description                                                                     |
| ------------- | ------------------------------------------------------------------------------- |
| **~~login~~** | [netkeiba.com](https://regist.netkeiba.com/account/?pid=login) にログインします |
| **crawl**     | レースの URL (https://db.netkeiba.com/race/*) を収集します                      |
| **fetch**     | URL リストを元に HTML ファイルをダウンロードします                              |
| **parse**     | HTML ファイルを JSON データにパースします                                       |
| **~~save~~**  | JSON データを SQLite データベースに保存します                                   |
| **help**      | ヘルプを表示します.                                                             |

## Requirements

|      | version  |
| ---- | -------- |
| node | >=12.9.0 |
| npm  | >=6.10.2 |

## Update

### Git

#### global

```bash
npm install -g masan4444/node-netkeiba-cli
```

#### local

```bash
cd workspace
npm install masan4444/node-netkeiba-cli
```

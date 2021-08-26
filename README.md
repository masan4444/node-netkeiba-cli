# netkeiba CLI

[netkeiba.com](https://db.netkeiba.com) から過去のレース情報をスクレイピングする CLI アプリです。

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
| **crawl**     | レースの URL(https://db.netkeiba.com/race/**)を収集します                       |
| **~~fetch~~** | URL リストを元に HTML ファイルをダウンロードします                              |
| **~~parse~~** | HTML ファイルを JSON データにパースします                                       |
| **~~save~~**  | JSON データを SQLite データベースに保存します                                   |
| **help**      | ヘルプを表示します.                                                             |

## Requirements

| SubCommand | Description |
| ---------- | ----------- |
| node       | >=12.9.0    |
| npm        | >=6.10.2    |

## Update

#### global

```bash
npm install -g masan4444/node-netkeiba-cli
```

#### local

```bash
cd workspace
npm install masan4444/node-netkeiba-cli
```

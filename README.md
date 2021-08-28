# netkeiba CLI

[db.netkeiba.com](https://db.netkeiba.com) から過去のレース情報をスクレイピングする CLI アプリです。

- 有料会員として**ログイン**することで**タイム指数**等が取得可能です。
- クライアント側で javascript が動作しないので**軽量**です。
- HTML のパースが**非常に高速**です。(中央競馬 10 年分 4 万レースを 3 分でパース可能)
- 現在は中央競馬のみ対応

## Supports

|              | descripttion       | exapmle                                                                                |
| ------------ | ------------------ | -------------------------------------------------------------------------------------- |
| course       | 競馬場             | 札幌,函館,福島,中山,東京<br>新潟,中京,京都,阪神,小倉                                   |
| raceNumber   | レース番号         | 1,2,3,,                                                                                |
| name         | レース名           | 第 56 回宝塚記念(G1)                                                                   |
| steeple?     | 障害               | 障                                                                                     |
| surf         | コース表面         | 芝,ダート,芝 ダート                                                                    |
| turn?        | 回転方向           | 右,左                                                                                  |
| line?        | コースライン       | 外,直線,外-内,内-外,内 2 周                                                            |
| dist         | 距離               | 2200                                                                                   |
| weter        | 天気               | 晴,曇,雨,小雨,雪,小雪                                                                  |
| trakCond     | コース状態         | 良,稍重,重,不良                                                                        |
| startTime    | 出走時間           | 2015-06-27T15:00:00.000Z                                                               |
| monthCount   | 何回開催           | 1,2,3,,                                                                                |
| dayCount     | 何日目             | 1,2,3,,                                                                                |
| age          | 馬歳               | 1,2,3,,                                                                                |
| ageHigher    | 歳以上             | true,false                                                                             |
| raceClass    | 階級               | オープン,3 勝クラス,2 勝クラス,1 勝クラス<br>1600 万下,1000 万下,500 万下 ,未勝利,新馬 |
| detail       | 詳細               | (国際)(指)(定量) etc                                                                   |
| raceResult   | 馬情報・レース結果 |                                                                                        |
| payoffResult | 払い戻し結果、人気 |                                                                                        |

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
netkeiba-cli crawl 2021/7 2021/9 -o url_list.txt # レースURLをurl_list.txtにダウンロード
netkeiba-cli fetch url_list.txt -o html_dir      # URLをもとにHTMLをダウンロード
netkeiba-cli parse html_dir -o parsed.json       # HTMLをパースしてJSON化
netkeiba-cli save parsed.json                    # JSONをもとにSQLiteに保存
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

| SubCommand   | Description                                                                     |
| ------------ | ------------------------------------------------------------------------------- |
| **login**    | [netkeiba.com](https://regist.netkeiba.com/account/?pid=login) にログインします |
| **logout**   | ログアウトします                                                                |
| **crawl**    | レースの URL (https://db.netkeiba.com/race/*) を収集します                      |
| **fetch**    | URL リストを元に HTML ファイルをダウンロードします                              |
| **parse**    | HTML ファイルを JSON データにパースします                                       |
| **~~save~~** | JSON データを SQLite データベースに保存します                                   |
| **help**     | ヘルプを表示します.                                                             |

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

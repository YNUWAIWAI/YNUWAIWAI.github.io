---
layout: post
title:  "Pythonでユニットテストを書く"
date:   2017-06-26 19:35:33 +0900
---
文責: @nimiusxp(Twitter)
# はじめに
## 書くこと，書かないこと
Pythonの標準ライブラリの使い方は[公式のドキュメント](https://docs.python.jp/3/library/index.html)を見ればいいので書きません．
また，サードパーティ製のテストライブラリ（[nose2](http://nose2.readthedocs.io/en/latest/)，[pytest](https://docs.pytest.org/en/latest/)など）については（詳しくないということもあり）書きません．

ここではユニットテストをどのように書くかの流れを書きます．

## 環境
```bash
$ python -V
Python 3.6.1 :: Continuum Analytics, Inc.

$ sw_vers
ProductName:    Mac OS X
ProductVersion: 10.12.5
BuildVersion:   16F73
```

# なぜユニットテストを書くのか

- バグ(実装のミス)を見つけやすくなる
- テストしやすい関数（単一機能しかもたない関数）を意識するようになる

# とりあえず書いてみる
Pythonの標準ライブラリにある[unittest](https://docs.python.jp/3/library/unittest.html)を使ってユニットテストを書く例を見せたいと思います．
今回は渡された文字列がURLかどうかを判断する関数(`is_url`{:.language-none})のテスト(`test_is_url`{:.language-none})を書くことにします．ここで`is_url`{:.language-none}関数は実装が不十分なのでテストを通して改善していくという方向でやります．

## ディレクトリ構造
```Markup
.
├── test
│   ├── __init__.py
│   └── test_util.py <= テストする関数
└── util
    ├── __init__.py
    └── util.py      <= 文字列がURLかどうかを判断する関数
```
## util.py
```python
import re
from typing import Match


def is_url(src: str) -> Match[str]:
    return re.fullmatch(r'^https://[0-9a-zA-Z/:%$&()~.=+\-_]+$', src)
```
## test_util.py
```python
import unittest
from util import util


class UtilTest(unittest.TestCase):
    def test_is_url(self):
        cases = [
            'http://example.com',
            'https://example.com',
            'https://e-ample.com',
            'https://e_ample.com',
            'https://ex/ample.com',
            'https://e%3ample.com',
            'http://example.com?q=hoge&p=fuga',
            'http://example.com#piyo',
        ]
        for case in cases:
            self.assertTrue(util.is_url(case))
```

# テストを実行する
[テストディスカバリ](https://docs.python.jp/3/library/unittest.html#test-discovery)の機能を使うと以下のように簡単に実行できます．
```bash
python -m unittest 
```

実行結果は以下のようになります．（`${PROJECT_ROOT}`{:.language-none}の部分は各自置き換えてください．）
```Markup
F
======================================================================
FAIL: test_is_url (test.test_util.UtilTest)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "${PROJECT_ROOT}/test/test_util.py", line 18, in test_is_url
    self.assertTrue(util.is_url(case))
AssertionError: None is not true

----------------------------------------------------------------------
Ran 1 test in 0.000s

FAILED (failures=1)
```
ここからわかるのは`self.assertTrue(util.is_url(case))`{:.language-none}の部分のテストが失敗したことだけで，具体的にどのケースが失敗したのかがわかりません．

# unittest.subTestを使う
[unittest.subTest](https://docs.python.jp/3/library/unittest.html#distinguishing-test-iterations-using-subtests)を使うことによりどのケースが失敗したかがわかるようになります．
`test_util.py`{:.language-none}を以下のように書き換えます．
```python
import unittest
from util import util


class UtilTest(unittest.TestCase):
    def test_is_url(self):
        cases = [
            'http://example.com',
            'https://example.com',
            'https://e-ample.com',
            'https://e_ample.com',
            'https://ex/ample.com',
            'https://e%3ample.com',
            'http://example.com?q=hoge&p=fuga',
            'http://example.com#piyo'
        ]
        for case in cases:
            with self.subTest(string=case):
                self.assertTrue(util.is_url(case))
```
テスト実行結果は以下のようになります．
```Markup
======================================================================
FAIL: test_is_url (test.test_util.UtilTest) (string='http://example.com')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "${PROJECT_ROOT}/test/test_util.py", line 19, in test_is_url
    self.assertTrue(util.is_url(case))
AssertionError: None is not true

======================================================================
FAIL: test_is_url (test.test_util.UtilTest) (string='http://example.com?q=hoge&p=fuga')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "${PROJECT_ROOT}/test/test_util.py", line 19, in test_is_url
    self.assertTrue(util.is_url(case))
AssertionError: None is not true

======================================================================
FAIL: test_is_url (test.test_util.UtilTest) (string='http://example.com#piyo')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "${PROJECT_ROOT}/test/test_util.py", line 19, in test_is_url
    self.assertTrue(util.is_url(case))
AssertionError: None is not true

----------------------------------------------------------------------
Ran 1 test in 0.001s

FAILED (failures=3)
```
`http://example.com`{:.language-none}と `http://example.com?q=hoge&p=fuga`{:.language-none}と`http://example.com#piyo`{:.language-none}のケースでテストが失敗していることがわかりました．
これは`util.py`{:.language-none}の`is_url`{:.language-none}関数の実装が間違っていることを示しています．

## 実装を修正する

通らないケースを見ると`http://`{:.language-none}で始まっている点で共通していることがわかります．
実装をみると
```python
r'^https://[0-9a-zA-Z/:%$&()~.=+\-_]+$'
```
となっており，`https://`{:.language-none}で始まるものしか通らないようになっています．
正規表現が間違っていることがわかったので以下のように修正します．
```python
r'^https?://[0-9a-zA-Z/:%$&()~.=+\-_]+$'
```
すると，テストの実行結果は以下のようになります．
```Markup
======================================================================
FAIL: test_is_url (test.test_util.UtilTest) (string='http://example.com?q=hoge&p=fuga')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "${PROJECT_ROOT}/test/test_util.py", line 19, in test_is_url
    self.assertTrue(util.is_url(case))
AssertionError: None is not true

======================================================================
FAIL: test_is_url (test.test_util.UtilTest) (string='http://example.com#piyo')
----------------------------------------------------------------------
Traceback (most recent call last):
  File "${PROJECT_ROOT}/test/test_util.py", line 19, in test_is_url
    self.assertTrue(util.is_url(case))
AssertionError: None is not true

----------------------------------------------------------------------
Ran 1 test in 0.001s

FAILED (failures=2)
```
まだ，実装が間違っているようなので，失敗したケースを見ると`?`{:.language-none}と`#`{:.language-none}が入ってるものが失敗していると予想できます．
そこで，正規表現を以下のように修正します．
```python
r'^https?://[0-9a-zA-Z/:%$&()~.=+\-_?#]+$'
```
すると，テストの実行結果は以下のようになります．
```Markup
.
----------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```
すべてのテストが通ったので`is_url`{:.language-none}関数は正しく実装されている可能性が高いということができます．

# まとめ
- ユニットテストを書こう
- unittest.subTestを使おう

# 参考
- Python標準ライブラリ
  - [re](https://docs.python.jp/3/library/re.html)
  - [unittest](https://docs.python.jp/3/library/unittest.html)
  - [typing](https://docs.python.jp/3/library/typing.html)
- [今回の記事のソースコード](https://github.com/nimiusrd/python-test)

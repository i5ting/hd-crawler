# hd-crawler

大主宰爬虫器

## Install


```
$ npm i -g hd-crawler
```

## Usages

```
$ crawler -h

  Usage: crawler [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -c, --category [type]  category
    -b, --book [type]      book
    -p, --path [type]      path default dist/
```

or

```
$ crawler -b 330 -c 0
```

## api

- category
- book
- processing = function(current, count) {{}
- path

## TODO

- 文档编写
- 如何编写node模块
- 如果编写二进制（bin）模块
- 如何编写爬虫功能
- 增加ava测试
- 增加travis-ci
- 增加测试覆盖率
- 增加各种badges
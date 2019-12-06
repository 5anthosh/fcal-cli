# fcal-cli

Cli for [fcal](https://github.com/5anthosh/fcal)

## Install

With npm

```sh
$ npm install -g fcal-cli
```

## Use

```sh
$ fcal
fcal > 4 + 6 cm
10 cm
```

### meta statements

`.exit` to exit

```sh
fcal > .exit
```

Get more info about expression

```sh
fcal> # 2342341234 + 234234

Evaluation time: 0.647ms

2342575468

AST
+ (0)BINARY  < + +  (12, 13)> 
|
+---- (1)LITERAL 2342341234
|
+---- (1)LITERAL 234234
```
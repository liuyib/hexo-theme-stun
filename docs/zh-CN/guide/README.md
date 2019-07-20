# 快速开始

## 安装

- 安装 stun

进入 hexo 根目录，执行指令。

``` bash
$ git clone https://github.com/liuyib/hexo-theme-stun.git themes/stun
```

- 安装 pug 和 stylus

主题依赖于 pug 和 stylus，请执行指令。

``` bash
$ npm install --save-dev hexo-render-pug hexo-renderer-stylus
```

## 使用

修改 hexo 根目录下的 `_config.yml` 文件。

``` yml
theme: stun
```

然后，启动 hexo 服务器即可。

``` bash
$ hexo clean && hexo s
```

## 更新

``` bash
$ cd themes/stun

$ git pull
```

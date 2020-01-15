# 快速开始

## 安装

- 安装 stun

  进入 hexo 根目录，执行指令。

  ``` bash
  $ git clone https://github.com/liuyib/hexo-theme-stun.git themes/stun
  ```

- 安装依赖 pug

  进入 hexo 根目录，执行指令。

  ``` bash
  $ npm install --save hexo-render-pug
  ```

## 使用

修改 hexo 根目录下的 `_config.yml` 文件。

``` yml
theme: stun
```

然后，启动 hexo 服务器。

``` bash
$ hexo clean && hexo s
```

## 更新

``` bash
$ cd themes/stun

# 更新到稳定版本（推荐）
$ git pull origin master

# 更新到最新功能（可能不稳定，不推荐）
$ git pull origin dev
```

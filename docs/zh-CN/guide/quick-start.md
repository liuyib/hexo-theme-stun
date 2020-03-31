# 快速开始

## 安装

- 安装 Stun

  在 Hexo 根目录下，执行指令：

  ``` bash
  $ git clone https://github.com/liuyib/hexo-theme-stun.git themes/stun
  ```

- 安装依赖 `hexo-render-pug`

  在 Hexo 根目录下，执行指令：

  ``` bash
  $ npm install --save hexo-render-pug
  ```

## 使用

修改 Hexo 根目录下的 `_config.yml` 文件：

``` yml
theme: stun
```

启动 Hexo 服务器：

``` bash
$ hexo clean && hexo s
```

## 更新

在 Hexo 根目录下，执行指令：

``` bash
$ cd themes/stun

# 更新到稳定版本（推荐）
$ git pull origin master

# 更新到最新功能（不推荐）
$ git pull origin dev
```

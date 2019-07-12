# 第三方支持

::: tip 期待 stun 变得更好
第三方支持正在不断加入中 (๑•̀ㅂ•́)و✧
:::

## 评论系统

### Gitment <Badge text="stable"/>

你首先需要获取 你的 OAuth 应用的 client ID 和 client secret。获取方法请看 [Gitment 的说明文档](https://github.com/imsun/gitment#2-register-an-oauth-application)。

然后修改 `stun.yml`：

``` yaml
# https://github.com/imsun/gitment
gitment:
  # 是否启用
  enable: false
  # Github 用户名
  owner: 
  # Github 仓库名（可以是任意一个公开的 Github 仓库）
  repo: 
  client_id: 
  client_secret: 
  # 是否启用懒加载（如果启用，只有手动点击显示按钮才会显示评论；否则，始终显示评论）
  lazy: false
```

## 统计与分析

### 卜蒜子统计 <Badge text="stable"/>

``` yaml
busuanzi:
  # 是否启用
  enable: true
  site:
    # 是否只显示图标
    icon_only: false
    # 统计站点 UV 数量
    # 关于 UV 和 PV 的概念：https://zhuanlan.zhihu.com/p/27672009
    uv:
      # 是否启用
      enable: true
      # FontAwesome 图标名称: https://fontawesome.com/v4.7.0/icons/
      icon: user
    # 统计站点 PV 数量
    pv:
      # 是否启用
      enable: true
      # FontAwesome 图标名称
      icon: eye
  # 统计每篇文章的 PV 数量
  post_pv:
    # 是否只显示图标
    icon_only: false
    # 是否启用
    enable: true
    # FontAwesome 图标名称
    icon: eye
```

## 搜索支持

### Algolia 搜索 <Badge text="stable"/>

如果你想使用 Algolia 搜索的话，并不会像其他配置那样，修改一下配置项就好了。你需要按照以下步骤进行配置：

1. 登录官网

访问 [Algolia 官网](https://www.algolia.com/)，可以注册一个账号登录，也可以使用 Github 账号或者 Google 账号登录。

2. 进入 `Indices` 页面

点击 `Create Index`，然后输入 `Index name`（可以是任意字符）。

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190711194035.png)

3. 进入 API Keys 页面

你会看到 `Application ID` 和 `Search-Only API Key`，将它们保存下来，在后面的设置中会用到。

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190711194037.png)

::: danger
注意，这里一定不要使用 `Admin API Key` 作为你的 API Key，更不要将其写入你的配置文件。
:::

点击 `ALL API KEYS` 和 `edit` 选项。这样会弹出一个框，在这个框中，你可以进行精确的授权和控制。

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190711194036.png)

在弹出框底部的 `ACl` 选项中，勾选 `search`，`addObject`，`deleteIndex`，`listIndexes`，`deleteObject`。最后，点击 `Update` 按钮。

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190711194038.png)

4. 修改 Hexo 配置

修改你的**站点**配置文件 `_config.yml`，添加 `applicationID` & `apiKey` & `indexName` 选项。

``` yaml
algolia:
  applicationID: '填入你的 Application ID'
  apiKey: '填入你的 Search-only API key'
  indexName: '填入你的 indexName'
```

5. 安装 Algolia 模块

Algolia 要求用户手动通过提供的 API 上传它们的搜索数据。在 Hexo 根目录中安装 `hexo-algolia`。这个插件将会搜索你的网站并将数据上传到 Algolia。

``` bash
$ cd hexo
$ npm install --save hexo-algolia
```

运行下面这些指令，上传索引数据。

``` bash
$ export HEXO_ALGOLIA_INDEXING_KEY=你的Search-Only API key # 在 Git Bash 中使用这条指令
# set HEXO_ALGOLIA_INDEXING_KEY=你的Search-Only API key    # 在 Windows 命令行中使用这条指令
$ hexo clean
$ hexo algolia
```

::: tip
每次添加新的文章后，都需要运行上面这三条指令来更新你的索引数据，否则，将无法搜索到。
:::

6. 修改 stun 配置

在你的主题配置文件 `stun.yml` 或 `_config.yml` 中，修改以下配置项。

``` yaml
algolia_search:
  # 是否启用
  enable: true
  hits:
    # 每一页显示的搜索结果数量
    per_page: 10
  labels:
    # 是否显示搜索结果的统计信息
    show_stats: true
```

到这里，不出意外的话，你就可以使用 Algolia 搜索网站里的文章标题了。

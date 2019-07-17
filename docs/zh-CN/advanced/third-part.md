# 第三方支持

::: tip 期待 stun 变得更好
第三方支持正在不断加入中 (๑•̀ㅂ•́)و✧
:::

## 评论系统

### Gitment <Badge text="stable"/>

首先，你需要注册一个新的 **GitHub Application** 来授权，点击[这里](https://github.com/settings/applications/new)注册。这样可以获取所需的 `client ID` 和 `client secret`。

::: warning 注意
您必须在 `Authorization callback URL` 字段中指定网站的 URL。
:::

然后修改 `stun.yml`：

``` yaml
gitment:
  # 是否启用
  enable: false
  # Github 用户名
  owner: 
  # Github 仓库名（需要是公开的仓库）
  repo: 
  # Github 应用程序客户端 ID
  client_id: 
  # Github 应用程序客户端密钥
  client_secret: 
  # 是否启用懒加载（如果启用，只有手动点击显示按钮才会显示评论）
  lazy: false
```

如果你遇到了问题，请查看 Gitment 的文档：[https://github.com/imsun/gitment](https://github.com/imsun/gitment)

### Gitalk <Badge text="stable"/> <Badge text="v1.1.0"/>

首先，你需要注册一个新的 **GitHub Application** 来授权，点击[这里](https://github.com/settings/applications/new)注册。这样可以获取所需的 `client ID` 和 `client secret`。

::: warning 注意
您必须在 `Authorization callback URL` 字段中指定网站的 URL。
:::

``` yaml
gitalk:
  # 是否启用
  enable: false
  # Github 用户名
  owner: 
  # Github 仓库名（需要是公开的仓库）
  repo: 
  # Github 应用程序客户端 ID
  client_id: 
  # Github 应用程序客户端密钥
  client_secret: 
  # GitHub 仓库所有者和合作者，只有这些人可以初始化 Gitalk
  admin: 
  # 类似于 B 站的关灯模式
  distraction_free_mode: true
  # 如果你想让每一个参观你网站的人看到统一的语言，你可以在这里设置，
  # 可选值：en, zh-CN, es-ES, fr, ru, zh-TW
  language: 
```

如果你遇到了问题，请查看 Gitalk 的文档：[https://github.com/gitalk/gitalk](https://github.com/gitalk/gitalk)

### Valine <Badge text="stable"/> <Badge text="v1.1.1"/>

Valine 评论系统依赖于 LeanCloud，所以你需要[登录](https://leancloud.cn/dashboard/login.html#/signin)或[注册](https://leancloud.cn/dashboard/login.html#/signup) LeanCloud，获取 `APP ID` 和 `APP Key`。详细步骤，请查看：[https://valine.js.org/quickstart.html](https://valine.js.org/quickstart.html)

``` yaml
valine:
  enable: false
  # 你的 LeanCloud app appid
  appid: 
  # 你的 LeanCloud app appkey
  appkey: 
  # 是否启用评论回复邮件提醒
  notify: true
  # 是否启用评论验证码
  verify: true
  # 评论框占位提示符
  placeholder: Just go go
  # Gravatar 头像展示方式
  avatar: mp
  # 评论者相关属性（默认：昵称、邮件、网址）
  meta: nick,mail,link
  # 评论列表分页，每页条数
  pageSize: 10
  # 是否启用文章访问量统计
  visitor: false
  # 是否记录评论者IP
  recordIP: false
  # 多语言支持，可选值：zh-cn, en
  language: 
```

完成上述步骤之后，你还需要在 LeanCloud 中新建 或 选择一个名为 `Comment` 的 Class 才能使用 Valine。详细步骤，请查看：[https://valine.js.org/quickstart.html#评论数据管理](https://valine.js.org/quickstart.html#评论数据管理)

### Livere（来必力）<Badge text="stable"/> <Badge text="v1.1.1"/>

进入来必力[官网](https://livere.com/)注册账号，登录，点击安装，选择合适的版本后，会显示安装代码，在代码中可以找到你的 `uid`，例如：

``` html
<div id="lv-container" data-id="city" data-uid="这里是你的 uid">
```

然后将 `uid` 填入主题的配置文件即可：

``` yaml
livere:
  enable: false
  uid: 
```

### Disqus <Badge text="stable"/> <Badge text="v1.1.1"/>

进入 Disqus [官网](https://disqus.com/)注册账号，登录，点击 `I want to install Disqus on my site`，在 `Website Name` 字段中，输入你的网站的名称（可以是任意的），然后选择好 `Category` 和 `Language` 字段后，点击 `Create Site`。

这里输入的网站名称，就是你的 `shortname`，将其填入主题的配置文件即可：

``` yaml
disqus:
  enable: false
  shortname: 
  # 是否显示文章的评论数
  count: true
```

## 统计与分析

### 卜蒜子统计 <Badge text="stable"/>

修改主题配置文件：

``` yaml
busuanzi:
  # 是否启用
  enable: false
  site:
    # 是否只显示图标
    icon_only: false
    # 统计站点 UV 数量
    # 关于 UV 和 PV 的概念：https://zhuanlan.zhihu.com/p/27672009/
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

### Algolia 搜索 <Badge text="stable"/> <Badge text="v1.0.3"/>

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

修改你 **Hexo 根目录**下的配置文件 `_config.yml`，添加 `applicationID` & `apiKey` & `indexName` 选项。

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
1. 每次添加新的文章后，都需要运行上面这三条指令来更新你的索引数据，否则，将无法搜索到。
2. 如果你发现搜索到的结果有重复的或者有旧的数据，你需要去 Algolia 官网，清除上传的数据，然后执行上面这三条指令，重新上传索引数据即可。
:::

6. 修改 stun 配置

修改你的主题配置文件：

``` yaml
algolia_search:
  # 是否启用
  enable: false
  hits:
    # 每一页显示的搜索结果数量
    per_page: 10
  labels:
    # 是否显示搜索结果的统计信息
    show_stats: true
```

到这里，不出意外的话，你就可以使用 Algolia 搜索网站里的文章标题了。

# 第三方支持

::: tip 期待 stun 变得更好
第三方支持正在不断加入中 (๑•̀ㅂ•́)و✧
:::

## 添加 Emoji 支持

如果想要使用 Emoji，你可以直接在[这里](http://emojihomepage.com/)复制粘贴使用。如果你更喜欢使用 Emoji 代码，例如：`:sparkles:` 将会显示为 :sparkles:, 那么你需要安装插件 [hexo-filter-github-emojis](https://github.com/crimx/hexo-filter-github-emojis) 来支持这种语法。

安装这个插件，请在 hexo 根目录下，执行指令：

``` bash
$ npm install hexo-filter-github-emojis --save
```

如果你不喜欢 `::` 的语法，你可以使用下面这种方法代替：

``` text
{% github_emoji sparkles %}
```

如果你需要某个 markdown 文件不解析这种语法，可以在 markdown 文件里的 `front-matter` 中，设置 `no-emoji: true`。这样 `::` 会保持原来的样子。

``` yaml
---
title: Hello World
no-emoji: true
---
```

有关该插件的更详尽的用法，请自行查阅其[文档](https://github.com/crimx/hexo-filter-github-emojis)。查看所有支持的 Emoji 请访问：[Github Emojis API](https://api.github.com/emojis) 或者 [Emoji Cheat Sheet](http://www.webpagefx.com/tools/emoji-cheat-sheet/)。

> 你也可以通过更换 markdown 渲染器 `hexo-renderer-markdown-it-plus` 来支持 Emoji。详情请看：[https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus](https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus)。

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

## 搜索系统

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

## 数学公式

想要解析页面中的数学公式，首先，你需要修改主题配置文件，启用该功能，并选择解析引擎（默认是 katex 引擎）。

``` yaml
math:
  # 是否启用
  enable: true

  # 如果设为 true，将会为每一个页面启用该功能
  # 如果设为 false，只有在 `Front-matter` 中设置了 `math: true` 的页面，才会启用该功能
  per_page: false

  # 解析引擎，可选值：mathjax 或 katex（全小写）
  engine: katex
```

然后，你需要根据下面 MathJax 或 KaTex 的说明进一步配置。

::: tip
MathJax 与 KaTex 相比之下，[KaTex 引擎速度更快](https://www.intmath.com/cg5/katex-mathjax-comparison.php)，但 [KaTex 支持的语法更少](https://github.com/KaTeX/KaTeX/wiki/Things-that-KaTeX-does-not-%28yet%29-support)，这里是 [KaTex 所支持的所有语法](https://katex.org/docs/supported.html)。
:::

### MathJax <Badge text="stable"/> <Badge text="v1.1.2"/>

使用 mathjax 作为引擎，首先，你需要更换一个支持 MathJax 的 markdown 渲染器：

- [hexo-renderer-kramed](https://github.com/sun11/hexo-renderer-kramed)
- [hexo-renderer-pandoc](https://github.com/wzpan/hexo-renderer-pandoc)

两者选择其一即可。

1. 安装，执行指令。

``` bash
# 卸载原来的渲染器
$ npm un hexo-renderer-marked --save
# 安装新的渲染器
$ npm i hexo-renderer-kramed --save # 或 npm i hexo-renderer-pandoc --save
```

2. 在主题配置文件中，选择 mathjax 引擎。

``` yaml
math:
  ...
  # 全小写
  engine: mathjax
```

3. 重启 hexo 服务器。

``` bash
$ hexo clean && hexo s
```

### KaTex <Badge text="stable"/> <Badge text="v1.1.2"/>

使用 katex 作为引擎，不需要引入 `katex.min.js`。相应的，你只需要更换一个支持 KaTex 的 markdown 渲染器。

首先，卸载原来的 markdown 渲染器，例如：

``` bash
$ npm un hexo-renderer-marked --save
# 或
$ npm un hexo-renderer-kramed --save
# 或
$ npm un hexo-renderer-pandoc --save

# 以及
$ npm un hexo-math --save
```

如果你安装过这些，都需要卸载。你可以到 hexo 根目录下的 `package.json` 文件中，查看安装了哪些插件。然后，安装新的 markdown 渲染器：

- [hexo-renderer-markdown-it-plus](https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus)
- [hexo-renderer-markdown-it](https://github.com/hexojs/hexo-renderer-markdown-it)

两者选择其一即可。

- 如果你选择 `hexo-renderer-markdown-it-plus` 作为渲染器。

1. 安装，执行指令。

``` bash
$ npm i hexo-renderer-markdown-it-plus --save
```

2. 在主题配置文件中，选择 katex 引擎。

``` yaml
math:
  ...
  engine: katex
```

3. 重启 hexo 服务器。

``` bash
$ hexo clean && hexo s
```

- 如果你选择 `hexo-renderer-markdown-it` 作为渲染器。

你需要额外安装 `markdown-it-katex`。

1. 安装，执行指令。

``` bash
$ npm i hexo-renderer-markdown-it --save
$ npm i markdown-it-katex --save
```

2. 修改站点配置文件

添加 或 修改 `hexo-renderer-markdown-it` 的配置项。

``` yaml
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: true
    linkify: true
    typographer: true
    quotes: '“”‘’'
  plugins:
    - markdown-it-katex
```

有关 `hexo-renderer-markdown-it` 所有的配置项，在[这里](https://github.com/hexojs/hexo-renderer-markdown-it/wiki/Advanced-Configuration#all-options-configuration)查看。

3. 选择 katex 引擎 和 重启 hexo 服务器的步骤同上。

### 相关插件

Stun 主题默认提供了一些 MathJax 和 Katex 的插件。

- mhchem

mhchem 是 MathJax 的插件，你可以使用这个插件来渲染化学方程式。详情请看：[MathJax/mhchem Manual](https://mhchem.github.io/MathJax-mhchem/)。

- Copy-tex

Copy-tex 是 KaTex 的插件，当启用这个插件之后，你只需要单击公式即可复制其源码。详情请看：[Copy-tex extension](https://github.com/KaTeX/KaTeX/tree/master/contrib/copy-tex)。

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190720153859.gif)

### 如何使用

按照上述步骤配置之后，你就可以在 markdown 源文件中，使用数学公式了。使用 `$$...$$` 包裹的字符，即可被识别为数学公式，但是会另起一行来显示。如果想要公式和文字在同一行显示，需要使用 `$...$` 来包括字符。

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190720160555.png)

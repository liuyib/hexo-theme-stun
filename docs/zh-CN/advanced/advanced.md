# 新手进阶

## 平滑升级 <Badge text="Stable"/>

更新 Hexo 主题时，一般都会有这样的经历：先将主题目录下的 `_config.yml` 文件备份，更新完主题后，再将备份的数据复制粘贴还原回去。

这个过程繁琐又浪费时间，因此我们需要一种友好的更新方式。如果你也经历着这样的痛苦，那么不妨尝试 Hexo 3.0 新增的功能 -- [数据文件](https://hexo.io/zh-cn/docs/data-files)。

Stun 主题利用该功能实现了平滑升级的特性，使用步骤如下：将主题目录下的 `_config.yml` 文件复制到博客根目录下的 `/source/_data/` 中，并重命名为主题名称。例如使用 `stun` 主题，那么就叫做 `stun.yml` 。如果 `source` 目录下没有 `_data` 文件夹请自行创建。

这两个文件的关系为 `stun.yml` 覆盖 `_config.yml`，也就是说，想要修改配置时，只需要修改 `stun.yml` 里的即可（修改 `_config.yml` 里的不会生效）。这样就实现了平滑升级，更新时 `_config.yml` （可能）会更新，而你的配置数据保留在 `stun.yml` 中。

::: warning 注意 ！！！
**主题更新后，如果主题目录下的 `_config.yml` 文件里出现了新的选项，那么你必须从该文件中将它们复制到 `/source/_data/stun.yml` 中，并设置它们的值为你想要的选项。**

如果你使用了平滑升级这一特性，那么 `/themes/stun/_config.yml` 和 `/source/_data/stun.yml` 这两个文件里的选项没有同步，是更新主题后，启动报错的最主要的原因！
:::

> 有时候，同步 `/themes/stun/_config.yml` 和 `/source/_data/stun.yml` 两个配置文件里的内容也比较麻烦。因此，推荐使用代码对比工具进行查看，这样再进行同步就方便多了。例如，VS Code 自带的代码对比工具：
>
> ![Stun | code diff by vscode](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200331233853.png)

## 国际化（i18n）<Badge text="Stable"/>

修改 Hexo 根目录下的 `_config.yml` 文件：

``` yaml
language: zh-CN # 可选值 zh-CN 或 en-US
```

语言文件在主题文件夹的 `languages` 目录下。Stun 主题默认有 `zh-CN.yml` 和 `en.yml` 两种语言文件，如果需要支持其他语言，请自行编写语言文件。语言文件的命名请参考：[https://github.com/theme-next/hexo-theme-next/tree/master/languages](https://github.com/theme-next/hexo-theme-next/tree/master/languages)

## 网站布局设置 <Badge text="Beta" type="warning"/> <Badge text="v1.6.0"/>

::: warning
该功能从 `v1.6.0` 版本开始支持，在 `v1.7.0` 版本中对配置项进行了更改。
:::

主题提供了对布局的一些常用设置。修改主题配置文件：

`v1.6.0`：

``` yaml
layout:
  # 网站内容区域宽度
  content: 768px
  # 侧边栏宽度
  sidebar: 300px
  # 内容区域和侧边栏之间的间隙
  content_sidebar_gap: 30px
  # 网站主体区域和页面两侧的间隙
  main_side_gap: 20px
```

`v1.7.0 ~ Latest`：

``` yaml
layout:
  # 网站内容区域宽度（显示文章的区域）
  content: 760px
  # 侧边栏宽度
  sidebar: 300px
  # 内容区域和侧边栏之间的间隙
  content_sidebar_gap: 30px
  # 网站中 "main" 标签的 padding 属性
  # 你可以像使用 CSS 中的 padding 属性一样进行设置。例如：
  # 设置                     实际效果
  # 20px                     padding: 20px
  # 10px 20px                padding: 10px 20px
  # 30px 20px 10px           padding: 30px 20px 10px
  # 30px 20px 10px 20px      padding: 30px 20px 10px 20px
  main_padding:
    # 屏幕宽度在 [768px, 无穷) 之间时生效
    default: 20px
    # 屏幕宽度在 [576px, 768px) 之间时生效
    tablet: 15px
    # 屏幕宽度在 [0px, 576px) 之间时生效
    mobile: 10px
```

上面的属性所对应的地方，示意图如下：

![Stun | site layout demo 1](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200115162037.jpg)
![Stun | site layout demo 2](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200203174507.jpg)

## 夜晚模式 <Badge text="Beta" type="warning"/> <Badge text="v1.6.0"/>

修改主题配置文件：

``` yaml
night_mode:
  enable: true
  # 切换夜晚模式的按钮
  button:
    # 按钮块的颜色（请使用引号包裹值）
    color: "#fafafa"
    # 按钮的背景颜色（请使用引号包裹值）
    bg_color: "#8c8a8a"
  # 代表白天和夜晚的图标（目前仅支持文本和 emoji）
  icon:
    dark: 🌜
    light: 🌞
```

## Front-Matter

Front-Matter 在 Hexo 主题中，占据了极其重要的地位。如果你还不了解 Front-Matter，可以查看这里：[https://hexo.io/zh-cn/docs/Front-Matter](https://hexo.io/zh-cn/docs/Front-Matter)。

下面是 Hexo 中默认提供的几种 Front-Matter 属性。

- `title` <Badge text="Stable"/> - 标题
- `date` <Badge text="Stable"/> - 文件建立日期
- `updated` <Badge text="Stable"/> - 文件更新日期

例如：

```
---
title: Hello Stun
date: 2019-5-15 22:54:49
updated: 2019-5-16 10:23:46
---
```

效果如下：

![Stun | article date](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190722105740.png)

::: tip
Hexo 会使用 git commit 中，文件的最新提交时间作为更新日期，所以一般不需要手动指定 `updated` 属性。并且当你使用 `hexo new xxx` 指令生成文件时，Hexo 会帮你添加好 `title` 和 `date` 属性。因此这三个属性一般不需要手动设置。
:::

- `comments` <Badge text="Stable"/> - 是否开启评论功能

  在 Stun 主题中，如果你启用了某个评论系统，默认是对所有通过 Markdown 文件生成的页面（除首页，归档页，单个分类页，单个标签页以外的所有页面）生效。因此，你可以使用该属性单独设置某个页面 / 文章是否启用评论。例如：

  ```
  ---
  title: Hello Stun
  comments: false
  ---
  ```

- `excerpt` <Badge text="Hexo v4.0.0"/> - 指定文章摘要

  Hexo 3.9.0 及以前的版本中，只能通过添加 `<!-- more -->` 标记来保留文章摘要。在 Hexo 4.0.0 及以后的版本中，可以通过在 Front-Matter 中使用 `excerpt` 来设置文章摘要。例如：

  ```
  ---
  title: Hello Stun
  excerpt: 这是一段文章摘要，是通过 Front-Matter 的 excerpt 属性设置的。
  ---
  ```

- `permalink` <Badge text="Stable"/> - 覆盖 Markdown 文件名

  例如，你有两篇文章：`https://xxx/2020/02/03/foo` 和 `https://xxx/2020/02/03/bar`，它们分别由 `foo.md` 和 `bar.md` 文件生成。如果你在 `bar.md` 的 Front-Matter 中设置了 `permalink`：

  ```
  ---
  title: I'm bar, but link to foo
  date: 2020-02-03 15:39:40
  permalink: /foo
  ---
  ```

  这样，`foo.md` 和 `bar.md` 文件都会被解析为：`https://xxx/2020/02/03/foo`。

- `categories` <Badge text="Stable"/> - 设置文章分类

  文章分类有顺序性和层次性。下面是一些例子：

  - 嵌套分类

    ```
    ---
    categories:
      - Diary
      - Life
    ---
    ```

    这样会使分类 `Life` 成为 `Diary` 的子分类。

  - 并列分类

    ```
    ---
    categories:
      - [Diary]
      - [Life]
    ---
    ```

    这样会使 `Life` 和 `Diary` 成为并列分类。

  - 并列嵌套分类

    ```
    ---
    categories:
      - [Diary, PlayStation]
      - [Diary, Games]
      - [Life]
    ---
    ```

    这样会使 `PlayStation` 和 `Games` 同为 `Diary` 的子分类，而 `Life` 和 `Diary` 是并列分类。

- `tags` <Badge text="Stable"/> - 设置文章标签

  标签没有顺序性和层次性，**只能设置为同级的**。也就是说，标签只有一种用法：

  ```
  ---
  tags:
    - PlayStation
    - Games
    - [Diary, Life]
  ---
  ```

  这样会被解析为 `PlayStation`、`Games`、`Diary,Life` 三个并列标签。

- `layout` <Badge text="Stable"/> - 是否对文章或页面应用布局样式
  
  - 在 Front-Matter 中设置了 `layout: false`

    ![Stun | Front-Matter - layout](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190820175118.png)

    可以看到，设置了 `layout: false` 后，只将 Markdown 解析成 HTML，不做其他处理。

  - 在 Front-Matter 中设置了 `layout: true` 等价于 默认

---

下面几种 Front-Matter 属性在 Hexo 文档中并没有出现（也许是 Hexo 的文档没有更新吧），但在 Hexo 提供的主题单元测试库中出现。按照测试文件的要求，一个合格的 Hexo 主题都应该支持它们。这些属性如下：

- `link` <Badge text="Stable"/> <Badge text="v1.1.3"/> - 链接

  如果指定该属性，当点击该文章标题时，应该在新窗口或新的标签页中，打开所指定的链接地址。

- `photos` <Badge text="Stable"/> <Badge text="v1.1.4"/> - 图片

  用于指定一些图片，这些图片会显示在文章中（Stun 主题将其显示在文章最顶部）。使用如下：

  ``` yaml
  photos:
    - http://xxxxx1.jpg
    - http://xxxxx2.jpg
    - http://xxxxx3.jpg
  ```

  默认情况下，这些图片会按照文档流的方式显示，效果如下：

  ![Stun | Front-Matter - photos](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190724170139.png)

  为了优化这些图片的显示效果，Stun 主题提供了**瀑布流布局** <Badge text="Stable"/> <Badge text="v1.1.4"/>，如果想启用这一布局，你需要修改主题配置文件：

  ``` yaml
  gallery_waterfall:
    enable: false
    # 瀑布流中每一列的宽度
    col_width: 220px
    # 图片之间的水平间隙
    gap_x: 10px
    # 图片之间的垂直间隙
    gap_y: 10px
  ```

  效果如下：

  ![Stun | gallery_waterfall demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190724170138.png)

  ::: tip
  - 启用瀑布流效果后，还可以再启用 [fancybox 效果](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/assist.html#fancybox)。
  - 可以利用这个属性，来建立一个**相册页面**或**展示图片的文章**。例如：[https://liuyib.github.io/gallery/](https://liuyib.github.io/gallery/)
  :::

---

下面是 Stun 主题中，特有的几种 Front-Matter 属性。

- `top_image: https://xxxx.jpg` <Badge text="Stable"/>

  用于设置某篇文章顶部的大图。详情：[指定顶部图](https://liuyib.github.io/hexo-theme-stun/zh-CN/guide/primary-setting.html#指定顶部图)

- `toc: true` <Badge text="Stable"/> <Badge text="v1.2.0"/>

  文章是否启用目录。会覆盖主题配置文件中的全局设置。详情：[文章目录](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/advanced-setting.html#文章目录)

- `toc_min_depth: 1` <Badge text="Stable"/> <Badge text="v1.7.0"/> <Badge text="Hexo v4.2.0"/> 

  用于设置某篇文章中，解析标题生成目录的最小深度。取值 1 ~ 6，默认为 1。

  例如：`toc_min_depth: 3`，只会解析文中的 `h3, h4, h5, h6` 标签来生成目录。详情：[文章目录](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/advanced-setting.html#文章目录)

- `toc_max_depth: 6` <Badge text="Stable"/> <Badge text="v1.2.0"/>

  用于设置某篇文章中，解析标题生成目录的最大深度。取值 1 ~ 6，默认为 6。

  例如：`toc_max_depth: 4`，只会解析文中的 `h1, h2, h3, h4` 标签来生成目录。详情：[文章目录](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/advanced-setting.html#文章目录)

- `quicklink: true` <Badge text="Stable"/> <Badge text="v1.2.3"/>

  是否在浏览器空闲时间预取可视区内的链接，以加快后续页面的加载速度。详情：[启用 Quicklink](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/third-part.html#启用-quicklink)

- `math: true` <Badge text="Stable"/> <Badge text="v1.1.2"/>

  是否需要解析数学公式。详情：[数学公式](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/third-part.html#数学公式)

- `reward: true` <Badge text="Stable"/> <Badge text="v1.2.0"/>

  文章是否启用打赏功能。会覆盖主题配置文件中的全局设置。详情：[启用赞赏码](https://liuyib.github.io/hexo-theme-stun/zh-CN/guide/primary-setting.html#启用赞赏码)

- `copyright: true` <Badge text="Stable"/> <Badge text="v1.2.0"/>

  文章是否启用版权信息。会覆盖主题配置文件中的全局设置。详情：[知识共享许可协议（cc）](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/advanced-setting.html#知识共享许可协议（cc）)

---

下面是安装某些插件后，可以设置的几种 Front-Matter 属性。

- `top: true` <Badge text="Stable"/>

  文章是否置顶。详情：[文章置顶](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/advanced-setting.html#文章置顶)

- `no-emoji: true` <Badge text="Disrelated" type="warning"/>

  是否解析文章中的 emoji 代码。详情：[添加-emoji-支持](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/third-part.html#添加-emoji-支持)

## 二级导航菜单 <Badge text="Stable"/> <Badge text="v1.2.4"/>

启用二级导航菜单，需要修改主题配置文件：

1. 修改 `menu` 配置项

    ``` yaml
    menu:
      # `||` 分隔符之前是占位符，`||` 分隔符之后是图标
      # 用法（有图标）: `Key: javascript:; || fa(s|r|l|d|b) fa-图标名称`
      # 用法（无图标）: `Key: javascript:;`
      # fas far fal fad fab 是 FontAwesome 5.x 中图标的前缀，你需要根据具体图标自行设置
      xxx1: javascript:; || fa(s|r|l|d|b) fa-xxx
    ```

2. 修改 `submenu` 配置项

    ``` yaml
    submenu:
      # 这里的 xxx1 与上述名称对应
      xxx1:
        xxx1-1: /xxx1-1/ || fa(s|r|l|d|b) fa-xxx
        xxx1-2: /xxx1-2/ || fa(s|r|l|d|b) fa-xxx
    ```

3. 国际化设置

    找到 `languages` 目录下的语言文件，根据你网站使用的语言选择对应的语言文件，例如：

    `zh-CN.yml`：

    ``` yaml
    xxx1: 这是 xxx1 对应的中文
    xxx1-1: 这是 xxx1-1 对应的中文
    xxx1-2: 这是 xxx1-2 对应的中文
    ```

例如，添加一个友情链接的二级菜单：

1. 修改主题配置文件

    ``` yaml
    menu:
      friends: javascript:; || fas fa-users

    submenu:
      friends:
        aaa: /aaa/ || fas fa-male
        bbb: /bbb/ || fas fa-female
    ```

2. 国际化设置

    `zh-CN.yml`：

    ``` yaml
    menu:
      friends: 朋友
      aaa: 小 A
      bbb: 小 B
    ```

    效果如下：

    ![Stun | submenu demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190826161817.png)

## 启用赞赏码 <Badge text="Stable"/>

如果你想要在文章页面启用赞赏码，修改主题配置文件：

``` yaml
# Reward
reward:
  enable: false
  # 支付宝
  alipay: https://xxxxx.png
  # 微信
  wechat: https://xxxxx.png
```

效果如下：

![Stun | reward demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175556.png)

::: tip
1. 你可以在 Front-Matter 中，设置 `reward: true/false` 来指定某文章或页面是否启用赞赏码。
2. 如果你在配置文件中启用了赞赏码，则默认所有文章页面启用这一功能，其他页面不启用。因此你可以在文章页面中设置 `reward: false` 禁用赞赏码，在其他页面中设置 `reward: true` 启用赞赏码。
:::

## 知识共享许可协议（cc）<Badge text="Stable"/>

用于设置你的文章的版权信息，不启用则表示无版权限制。修改主题配置文件：

``` yaml
creative_commons:
  enable: true
  # 可选值: BY | BY-SA | BY-ND | BY-NC | BY-NC-SA | BY-NC-ND
  # 详情请访问: https://creativecommons.org/share-your-work/licensing-types-examples/
  license: BY-NC-SA
  # 是否在侧边栏中显示
  sidebar: true
  # 是否在文章底部显示
  post: true
  # 可选值：
  #   id | ms | ca | da | de | en | es | es_ES | eo | eu | fr | gl | hr
  #   it | lv | lt | hu | nl | no | pt | pt_BR | pl | ro | sl | fi | sv
  #   tr | is | cs | el | be | ru | zh | zh_TW | uk | ar | fa | bn | ja | ko
  # 不设置默认为：en（当用户查看许可协议时，会以你设置的语言进行显示）
  language:
```

效果如下：

![Stun | creative_commons demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619210339.png)

::: tip
知识共享许可协议启用后，默认对所有文章页面生效。你可以在 Front-Matter 中，设置 `copyright: false` 来指定某文章不启用该功能。
:::

## 文章目录 <Badge text="Stable"/>

修改主题配置文件：

``` yaml
toc:
  enable: true
  # 是否自动添加列表序号
  list_number: true
  # 是否文本溢出时换行
  wrap: true
  # 是否始终展开所有文章目录
  # true ：始终展开
  # false：默认折叠，滚动到对应位置时自动展开
  expand_all: false
  # 生成目录时，解析 `<h1~6>` 的最小深度
  # 你可以在 Front-Matter 中，通过添加 `toc_min_depth` 属性，来为某篇文章指定该配置
  min_depth: 1
  # 生成目录时，解析 `<h1~6>` 的最大深度
  # 你可以在 Front-Matter 中，通过添加 `toc_max_depth` 属性，来为某篇文章指定该配置
  max_depth: 6
```

::: tip
启用文章目录后，默认对所有文章页面生效。你可以在 Front-Matter 中，设置 `toc: false` 来指定某篇文章不启用该功能。
:::

## 订阅设置 <Badge text="Stable"/>

设置邮件订阅和 RSS 订阅，修改主题配置文件：

``` yaml
feed:
  enable: false
  # 邮件订阅地址 (例如：http://eepurl.com/guAE6j)
  email:
  # RSS 订阅地址 (例如：/atom.xml)
  rss:
```

想要使用邮件订阅，你需要自己构建 或 使用第三方提供的邮件订阅服务。例如我的邮件订阅地址：[http://eepurl.com/guAE6j](http://eepurl.com/guAE6j)

开启 RSS 订阅之前，你需要安装 hexo 插件：[hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)。然后在 Hexo 根目录下的 `_config.yml` 文件中添加配置项（关于各个配置项的具体含义，请查看插件的[文档](https://github.com/hexojs/hexo-generator-feed)）：

``` yaml
feed:
  type: atom
  # 这是 RSS 订阅的地址（可以随意设置，和上面 rss 配置项对应）
  path: atom.xml
  limit: 20
  hub:
  content:
  content_limit: 140
  content_limit_delim: " "
  order_by: -date
  icon: icon.png
```

配置完成之后，访问你设置的订阅地址，如：`https://yoursite.com/atom.xml`，即可看到 RSS 订阅信息。

## 文章阅读进度条 <Badge text="Stable"/>

修改主题配置文件：

``` yaml
reading_progress:
  enable: true
  # 请使用引号包裹值（支持所有 CSS 颜色单位）
  color: "#fc6423"
  # 进度条高度（支持所有 CSS 长度单位）
  height: 1px
```

侧边栏所有效果如下：

![Stun | sidebar demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619211446.png)

## 文章头部信息 <Badge text="Stable"/>

修改主题配置文件：

``` yaml
post_meta:
  # 是否只显示图标
  icon_only: false
  # 文章创建时间
  created:
    enable: true
    # 查找图标名称，请访问：https://fontawesome.com/icons
    icon: far fa-calendar-plus
  # 文章更新时间
  updated:
    enable: true
    # 查找图标名称，请访问：https://fontawesome.com/icons
    icon: far fa-calendar-check
  # 文章预计的阅读时间
  # 启用这个功能之前，你首先需要在 Hexo 根目录安装依赖：
  # `npm install hexo-wordcount --save`，然后重启 hexo 服务器
  reading_time:
    enable: false
    # 查找图标名称，请访问：https://fontawesome.com/icons
    icon: far fa-clock
    # 设置文章的阅读速度（阅读时间会根据这个设置来计算）
    speed:
      # 中文的阅读速度
      zh: 200
      # 英文的阅读速度
      en: 80
  # 文章字数统计
  # 启用这个功能之前，你首先需要在 Hexo 根目录安装依赖：
  # `npm install hexo-wordcount --save`，然后重启 hexo 服务器
  word_count:
    enable: false
    # 查找图标名称，请访问：https://fontawesome.com/icons
    icon: far fa-file-word
```

效果如下：![Stun | post_meta demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619210334.png)

## 文章列表分页 <Badge text="Stable"/> <Badge text="v1.0.3"/>

::: warning
该功能从 `v1.0.1` 版本开始支持，在 `v1.0.3` 版本中对配置项进行了更改。
:::

如果你想设置**首页**或**归档页**的文章列表是否分页，可以修改主题配置文件：

`v1.0.1 ~ v1.0.2`：

``` yaml
# 分页设置
post_list_paged:
  # 首页的文章列表是否分页
  home: true
  # 归档页面的文章列表是否分页
  archives: false
```

`v1.0.3 ~ Latest`：

``` yaml
post_list:
  # 是否分页
  paginate:
    # 首页的文章列表是否分页
    home: true
    # 归档页面的文章列表是否分页
    archives: false
```

> 默认情况下，网站首页的文章列表启用分页，归档页面的文章列表不启用分页。

分页效果如下：

![Stun | pagination demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190713173927.png)

## 文章列表封面图片 <Badge text="Stable"/> <Badge text="v1.1.2"/>

::: warning
该功能从 `v1.0.3` 版本开始支持，在 `v1.1.2` 版本中对配置项进行了更改。
:::

如果你为一篇文章单独设置了顶部图，并且想使用这个顶部图作为文章列表的封面图片来显示，可以修改主题配置文件：

`v1.0.3 ~ v1.1.1`：

``` yaml
post_list:
  # 文章列表里的文章的封面图片
  top_image:
    home: false
```

`v1.1.2 ~ Latest`：

``` yaml
post_list:
  # 文章列表里的文章的封面图片
  cover_image:
    home: false
```

封面图片效果如下：

![Stun | cover_image demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190713173929.jpg)

## 文章标签 <Badge text="Stable"/> <Badge text="v1.0.3"/>

::: warning
该功能从 `v1.0.0-beta.1` 版本开始支持，在 `v1.0.3` 版本中对配置项进行了更改。
:::

在文章末尾显示文章的所有标签，修改主题配置文件：

`v1.0.0-beta.1 ~ v1.0.2`：

``` yaml
# 是否在文章末尾显示文章标签
post_tags: true
```

`v1.0.3 ~ Latest`：

``` yaml
post_widget:
  # 是否在文章末尾显示文章标签
  tags: true
```

效果如下：

![Stun | tags of article](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190713173926.png)

## 文章结束提示信息 <Badge text="Stable"/> <Badge text="v1.0.3"/>

::: warning
该功能从 `v1.0.0-beta.1` 版本开始支持，在 `v1.0.3` 版本中对配置项进行了更改。
:::

在文章末尾自动添加文章结束的提示信息，修改主题配置文件：

`v1.0.0-beta.1 ~ v1.0.2`：

``` yaml
# 在文章底部显示 “本文结束” 的提示信息
post_end:
  enable: true
  # 是否在提示信息之前显示水平分割线
  horizon_line: true
```

`v1.0.3 ~ Latest`：

``` yaml
post_widget:
  # 在文章底部显示 “本文结束” 的提示信息
  end_text:
    enable: true
    # 是否在提示信息之前显示水平分割线
    horizon_line: true
```

效果如下：![Stun | end_text demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619210335.png)

## 文章置顶 <Badge text="Stable"/>

想要使用文章置顶功能，首先你需要安装 hexo 插件 [hexo-generator-index-pin-top](https://github.com/netcan/hexo-generator-index-pin-top)，然后执行命令：

``` bash
$ npm uninstall hexo-generator-index --save
$ npm install hexo-generator-index-pin-top --save
```

最后，在文章的 Front-Matter 中，使用 `top: true` 来实现置顶。

设置文章置顶后，在文章列表中可以看到表示置顶的图标。你可以对图标进行设置，修改主题配置文件：

``` yaml
stick_top:
  # 图标的位置（可选值为：left 和 right）
  position: right
    # 查找图标名称，请访问：https://fontawesome.com/icons
  icon: fas fa-thumbtack
  # 图标的旋转角度（角度的单位是：deg）
  rotate: 45deg
  # 请使用引号包裹值（支持所有 CSS 颜色单位）
  color: "#999"
```

效果如下：

![Stun | stick_top demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190713174424.jpg)

## 代码高亮 <Badge text="Stable"/>

::: warning
该配置项从 `v1.0.0` 开始支持，在 `v1.6.0` 版本中进行了修改。
:::

设置代码高亮样式，修改主题配置文件：

`v1.0.0 ~ v1.5.4`：

``` yaml
# 设置代码高亮
highlight_theme: light
```

`v1.6.0 ~ Latest`：

``` yaml
codeblock:
  # 设置代码高亮
  highlight: light
```

有三种可供选择的代码高亮样式：`light`、`drak`、`ocean`。默认是 `light`。效果分别如下：

- `light`

  ![Stun | code highlight - light](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175153.png)

- `dark`

  ![Stun | code highlight - dark](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175155.png)

- `ocean`

  ![Stun | code highlight - ocean](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175154.png)

::: warning
如果代码没有高亮样式，请确保 Hexo 根目录下的 `_config.yml` 文件中 `highlight.hljs` 设为 `false`。
:::

## 代码块样式 <Badge text="Beta" type="warning"/> <Badge text="v1.6.0"/>

设置代码块样式，修改主题配置文件：

``` yaml
codeblock:
  # 设置代码块样式
  style: carbon
```

有三个可选值：`default`、`simple`、`carbon`。默认为：`default`。效果分别如下：

- `default`

  默认样式。具有**显示语言**、**显示行号**和**启用复制按钮**的功能。

  > 下图中的代码高亮样式（从左至右，从上至下）分别为：`light`、`light`（开启夜间模式）、`dark`、`ocean`。

  ![Stun | codeblock style - default](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200115133041.png)

- `simple`

  极简样式，只显示代码。

  ![Stun | codeblock style - simple](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200115133056.png)

- `carbon`

  仿 carbon 样式，只显示代码。

  ![Stun | codeblock style - carbon](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200115134022.png)

## 代码溢出换行 <Badge text="Stable"/>

::: warning
该配置项从 `v1.0.0` 开始支持，在 `v1.6.0` 版本中进行了修改。
:::

修改主题配置文件：

`v1.0.0 ~ v1.5.4`：

``` yaml
# 代码溢出是否换行
code_word_wrap: false
```

`v1.6.0 ~ Latest`：

``` yaml
codeblock:
  # 代码溢出是否换行
  word_wrap: false
```

可选值为：`true`、`false`。默认是 `false`。效果分别如下：

- `true`（代码溢出换行）

  ![Stun | code wrap - true](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608214540.png)

- `false`（代码溢出不换行）

  ![Stun | code wrap - false](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608214539.png)

## 图片水平对齐方式 <Badge text="Abandon" type="error"/>

::: danger
该配置项，即 `img_horizonal_align` 在 `v1.4.0` 版本废弃。
:::

## 文字与图片的垂直对齐方式 <Badge text="Abandon" type="error"/>

::: danger
该配置项，即 `text_vertical_align_with_img` 在 `v1.2.0` 版本废弃。
:::

## 标签云 <Badge text="Stable"/>

如果你启用了 `tags` 页面，想要对其进行设置，修改主题配置文件：

``` yaml
tag_cloud:
  # 请使用引号包裹颜色值（只支持十六进制的颜色值）
  start_color: "#a4d8fa"
  end_color: "#49b1f5"
  # 标签最大、最小的尺寸（例如：设置为 20 表示 字体大小 20px）
  min_size: 16
  max_size: 26
  # 最大显示标签数量
  max_amount: 200
```

效果如下：![Stun | tag_cloud demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619210337.png)

## 其他设置

### 设置图片

- 设置图片大小

  1. 使用 HTML 中的 `img` 标签，通过 `style` 属性控制图片大小。
  2. 使用 hexo 提供的语法 `{% https://xxxxx.png width height %}`，填入宽、高即可设置大小。
  3. Stun 主题提供了一个便捷的方法，你可以在图片路径后面使用查询参数：`?size=宽度x高度` <Badge text="Stable"/> <Badge text="v1.0.0"/> 来控制图片显示大小。例如：

      ``` md
      ![](https://xxxxx.png?size=200x100)
      ```

- 使用行内图片

  默认情况下，文章中的图片水平居中显示。如果你想使用**行内图片**，你可以在图片路径后面使用查询参数：`?show=inline` <Badge text="Beta" type="warning"/> <Badge text="v2.0.0-rc.0"/>，使得图片显示为行内图片。例如：

  ``` md
  ![](https://xxxxx.png?show=inline)
  ```

  当然，你可以同时控制**图片的大小**和**是否显示为行内图片**：

  ``` md
  ![](https://xxxxx.png?size=200x100&show=inline)
  ```

  它们的用法和 URL 中的查询参数完全相同！

### 自定义样式 <Badge text="Stable"/> <Badge text="v1.0.3"/>

如果你想修改主题的样式，推荐将样式代码添加到 `source/css/_custom` 目录下的 `index.styl` 文件中。这样，当主题更新时，不会覆盖你已经修改了的样式代码。

> 当然，你也可以进行模块化分类：在该目录下新建样式文件，然后通过 `@import xxx` 语句在同目录下的 `index.styl` 文件中引入你新建的样式文件。

### 标识外部链接 <Badge text="Stable"/> <Badge text="v1.1.3"/>

从 `v1.1.3` 版本开始，除了侧边栏，顶部栏以外的区域，Stun 主题会在外链后面加上一个 Icon，用于标识这是一个外部链接。

你可以通过修改主题配置文件，来设置 Icon 以及是否启用这一功能：

``` yaml
external_link:
  icon:
    enable: true
    # 查找图标名称，请访问：https://fontawesome.com/icons
    name: fas fa-external-link-alt
    # 请使用引号包裹值（支持所有 CSS 颜色单位）
    color: "#aaa"
```

### FancyBox <Badge text="Stable"/> <Badge text="v1.1.4"/>

如果想要使用 FancyBox 功能，只需要修改主题配置文件即可：

``` yaml
fancybox: true
```

效果如下：

![Stun | FancyBox demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190724173526.png)

可以去官网在线体验：[http://fancyapps.com/fancybox/3/](http://fancyapps.com/fancybox/3/)

### 图片放大效果 <Badge text="Stable"/> <Badge text="v1.2.0"/>

从 `v1.2.0` 版本开始，Stun 主题内置了图片放大的功能（无第三方依赖，默认启用）。想要配置该功能，请修改主题配置文件：

``` yaml
zoom_image:
  enable: true
  # 遮罩的颜色（请使用引号包裹值）
  mask_color: "rgba(0,0,0,0.6)"
  # 图片放大时，距离屏幕边缘的间隙（只支持 px 单位）
  gap_aside: 20px
```

::: warning
FancyBox 功能也具有图片放大的效果，如果你启用了 FancyBox，那么 FancyBox 会优先生效（`zoom_image` 功能不会生效）。
:::

### 图片懒加载 <Badge text="Stable"/> <Badge text="v1.2.0"/>

从 `v1.2.0` 版本开始，Stun 主题支持图片懒加载的功能，但是**该功能只对文章页面起作用**。想要配置该功能，请修改主题配置文件：

``` yaml
lazyload:
  enable: true
  # 图片未加载前的占位符。可选值有：gif 或 block
  placeholder: gif
```

占位符取不同的值效果如下：

- `gif`

  ![Stun | lazyload placeholder - gif](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190801204631.png)

- `block`

  ![Stun | lazyload placeholder - block](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190801204629.png)

::: warning 注意 ！！！
下面是启用 lazyload 之后，已知的一些问题。

- 不兼容使用 Front-Matter 的 `photos` 属性进行展示的图片（即这些图片不会懒加载）。
:::

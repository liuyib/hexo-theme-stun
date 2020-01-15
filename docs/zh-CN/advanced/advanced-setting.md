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

## 国际化（i18n）<Badge text="Stable"/>

修改 Hexo 根目录下的 `_config.yml` 文件：

``` yaml
language: zh-CN # 可选值 zh-CN 或 en-US
```

语言文件在主题文件夹的 `languages` 目录下。Stun 主题默认有 `zh-CN.yml` 和 `en.yml` 两种语言文件，如果需要支持其他语言，请自行编写语言文件。语言文件的命名请参考：[https://github.com/theme-next/hexo-theme-next/tree/master/languages](https://github.com/theme-next/hexo-theme-next/tree/master/languages)

## 网站布局设置 <Badge text="Beta" type="warning"/> <Badge text="v1.6.0"/>

Stun 提供了对网站布局的配置，修改主题配置文件：

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

上面的属性所对应的地方，示意图如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200115162037.jpg)
![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200115162221.png)

## 夜晚模式 <Badge text="Beta" type="warning"/> <Badge text="v1.6.0"/>

修改主题配置文件：

``` yaml
night_mode:
  # 是否启用
  enable: true
  # 切换夜晚模式的按钮
  button:
    # 按钮块的颜色
    color: "#fafafa"
    # 按钮的背景颜色
    bg_color: "#8c8a8a"
  # 代表白天和夜晚的图标（目前仅支持文本和 emoji）
  icon:
    dark: 🌜
    light: 🌞
```

## Front-Matter

`Front-Matter` 在 Hexo 主题中，占据了极其重要的地位。如果你还不了解 `Front-Matter`，可以查看这里：[https://hexo.io/zh-cn/docs/Front-Matter](https://hexo.io/zh-cn/docs/Front-Matter)。

下面是 Hexo 中默认提供的几种 `Front-Matter` 属性。

- `title` <Badge text="Stable"/> - 标题
- `date` <Badge text="Stable"/> - 文件建立日期
- `updated` <Badge text="Stable"/> - 文件更新日期

例如：

``` yaml
title: Hello Stun
date: 2019-5-15 22:54:49
updated: 2019-5-16 10:23:46
```

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190722105740.png)

::: tip
Hexo 会帮你记录文件的更新日期，所以一般不需要手动指定 `updated` 属性。并且当你使用 `hexo new xxx` 指令生成文件时，Hexo 会帮你添加好 `title` 和 `date` 属性。因此这三个属性一般不需要手动设置。
:::

- `comments` <Badge text="Stable"/> - 是否开启评论功能

  在 Stun 主题中，如果你启用了某个评论系统，默认是对所有通过 Markdown 文件生成的页面（除首页，归档页，单个分类页，单个标签页以外的所有页面）生效。因此，你可以使用该属性单独设置某个页面 / 文章是否启用评论。

- `excerpt` <Badge text="Hexo 4.0"/> - 指定文章摘要

  Hexo 3.9 及以前的版本中，只能通过添加 `<!-- more -->` 标记来保留文章摘要（当然 Stun 主题也提供了[自动保留摘要](http://liuyib.github.io/hexo-theme-stun/zh-CN/guide/primary-setting.html#文章摘要)的功能）。在 Hexo 4.0 及以后的版本中，可以通过在 Front-Matter 中使用 `excerpt` 来设置文章摘要。

- `permalink` <Badge text="Stable"/> - 覆盖文章网址

  为某篇文章单独指定一个网址。

- `categories` <Badge text="Stable"/> - 设置文章分类

  你可以同时设置几个同级分类，例如：

  ``` yaml
  categories:
    - foo
    - bar
    - baz
  ```

  也可以设置层级分类，例如：

  ``` yaml
  categories:
    - [foo, bar, baz]
  ```

- `tags` <Badge text="Stable"/> - 设置文章标签

  标签**只能设置为同级的**。也就是说，如果你将标签设置为：

  ``` yaml
  tags:
    - [foo, bar, baz]
  ```

  那么它会被解析为 `foo,bar,baz`，也就是一个标签。

- `layout` <Badge text="Stable"/> - 是否处理 Markdown 源文件

  如果你不想你的文章或页面被处理，可以将 `Front-Matter` 中的 `layout` 设为 `false`。例如：

  设置了 `layout: false`：

  ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190820175118.png)

  > 可以看到，设置了 `layout: false` 后，不对 Markdown 文件做任何处理，直接将文件的原始内容显示出来。

  没有设置 `layout: false` 的默认情况下或设置了 `layout: true`：

  ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190820175119.png)

---

下面几种 `Front-Matter` 属性在 Hexo 文档中并没有出现（也许是 Hexo 的文档没有更新吧），但在 Hexo 官方提供的主题开发测试文件中出现。按照测试文件的要求，一个合格的 Hexo 主题都应该支持它们。这些属性如下：

- `link` <Badge text="Stable"/> <Badge text="v1.1.3"/> - 链接

  如果指定该属性，当点击该文章标题时，应该在新窗口或新的标签页中，打开所指定的链接地址。

- `photos` <Badge text="Stable"/> <Badge text="v1.1.4"/> - 图片

  用于指定一些图片，这些图片会显示在文章中，Stun 主题将其显示在文章最顶部。使用如下：

  ``` yaml
  photos:
    - http://xxxxx1.jpg
    - http://xxxxx2.jpg
    - http://xxxxx3.jpg
  ```

  默认情况下，这些图片会按照文档流的方式显示，效果如下：

  ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190724170139.png)

  为了优化这些图片的显示效果，Stun 主题提供了**瀑布流布局** <Badge text="Stable"/> <Badge text="v1.1.4"/>，如果想启用这一布局，你需要修改主题配置文件：

  ``` yaml
  gallery_waterfall:
    # 是否启用
    enable: false
    # 瀑布流中每一列的宽度
    col_width: 220px
    # 图片之间的水平间隙
    gap_x: 10px
    # 图片之间的垂直间隙
    gap_y: 10px
  ```

  效果如下：

  ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190724170138.png)

  ::: tip

  - 启用瀑布流效果后，还可以再启用 [fancybox 效果](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/assist.html#fancybox)。
  - 通常利用 `photos` 这个属性，来建立一个**相册页面**或**专门展示图片的文章**。例如：[https://liuyib.github.io/gallery/](https://liuyib.github.io/gallery/)
  :::

---

下面是 Stun 主题中，特有的几种 `Front-Matter` 属性。

> 这些属性在后面的文档中会有详细说明，这里可以跳过。

- `top_image: https://xxxx.jpg` <Badge text="Stable"/>

  用于设置文章顶部的大图。详情：[指定顶部图](https://liuyib.github.io/hexo-theme-stun/zh-CN/guide/primary-setting.html#指定顶部图)

- `toc_max_depth: 6` <Badge text="Stable"/>

  用于设置文章中，解析标题生成目录的最大深度。取值 `1 ~ 6`。例如：`toc_max_depth: 3`，只会解析文中的 `h1`, `h2`, `h3` 来生成目录。详情：[文章目录](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/advanced-setting.html#文章目录)

- `quicklink: true` <Badge text="Stable"/> <Badge text="v1.2.3"/>

  是否在浏览器空闲时间预取可视区内的链接，以加快后续页面的加载速度。详情：[启用 Quicklink](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/third-part.html#启用-quicklink)

- `math: true` <Badge text="Stable"/> <Badge text="v1.1.2"/>

  是否需要解析数学公式。详情：[数学公式](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/third-part.html#数学公式)

- `toc: true` <Badge text="Stable"/> <Badge text="v1.2.0"/>

  文章是否启用目录。会覆盖主题配置文件中的全局设置。详情：[文章目录](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/advanced-setting.html#文章目录)

- `reward: true` <Badge text="Stable"/> <Badge text="v1.2.0"/>

  文章是否启用打赏功能。会覆盖主题配置文件中的全局设置。详情：[启用赞赏码](https://liuyib.github.io/hexo-theme-stun/zh-CN/guide/primary-setting.html#启用赞赏码)

- `copyright: true` <Badge text="Stable"/> <Badge text="v1.2.0"/>

  文章是否启用版权信息。会覆盖主题配置文件中的全局设置。详情：[知识共享许可协议（cc）](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/advanced-setting.html#知识共享许可协议（cc）)

---

下面是安装某些插件后，可以设置的几种 `Front-Matter` 属性。

> 这些属性在后面的文档中会有详细说明，这里可以跳过。

- `top: true` <Badge text="Stable"/>

  文章是否置顶。详情：[文章置顶](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/advanced-setting.html#文章置顶)

- `no-emoji: true` <Badge text="Disrelated" type="warning"/>

  是否解析文章中的 emoji 代码。详情：[添加-emoji-支持](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/third-part.html#添加-emoji-支持)

## 二级导航栏菜单 <Badge text="Stable"/> <Badge text="v1.2.4"/>

如果想要使用二级导航栏菜单，你需要修改主题配置文件：

1. 修改 `menu` 字段

``` yaml
menu:
  # 格式如下
  # 名称: javascript:; || 图标
  xxx: javascript:; || xxx
```

注意！在 `||` 符号之前，你必须使用 `javascript:;` 作为占位符。

2. 修改 `submenu` 字段

``` yaml
submenu:
  xxx: # 这里的 xxx 与上述名称对应
    xx1: /xx1/ || xx1 # 这里是子项，填写的值是：路径 || 图标
    xx2: /xx2/ || xx2 # 这里是子项，填写的值是：路径 || 图标
```

3. 国际化设置

找到 `languages` 目录下的语言文件，选择你网站使用的那种语言进行修改，这里以中文作为举例：

`zh-CN.yml`：

``` yaml
xxx: 这是xxx对应的中文
xx1: 这是xx1对应的中文
xx2: 这是xx2对应的中文
```

举例：

1. 修改主题配置文件

``` yaml
menu:
  friends: javascript:; || users

submenu:
  friends:
    aaa: /aaa/ || male
    bbb: /bbb/ || female
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

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190826161817.png)

## 启用赞赏码 <Badge text="Stable"/>

如果想要在文章底部启用打赏的二维码，需要修改主题配置文件：

``` yaml
# Reward
reward:
  # 是否启用
  enable: true
  # 支付宝
  alipay: https://xxxxx.png
  # 微信
  wechat: https://xxxxx.png
```

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175556.png)

你可以在文章 Markdown 源文件中的 `Front-Matter` 里，设置 `reward: false` 来指定某篇文章不启用赞赏码。

::: warning 注意
如果主题配置文件中没有启用 `reward`，那么单独设置文章 `reward: true` 是没有效果的。
:::

## 知识共享许可协议（cc）<Badge text="Stable"/>

用于设置你的文章的版权信息，不启用则表示无版权限制。修改主题配置文件：

``` yaml
creative_commons:
  # 是否启用
  enable: true
  # 可选值: BY | BY-SA | BY-ND | BY-NC | BY-NC-SA | BY-NC-ND
  # 详情请访问: https://creativecommons.org/share-your-work/licensing-types-examples/
  license: BY-NC-SA
  # 是否在侧边栏中显示
  sidebar: true
  # 是否在文章底部显示
  post: true
  # 设置许可协议的显示语言，不设置默认为：en（当用户查看许可协议时，会以你设置的语言进行显示）
  language:
```

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619210339.png)

你可以在文章 Markdown 源文件中的 `Front-Matter` 里，设置 `copyright: false` 来指定某篇文章不启用知识共享许可协议。

::: warning 注意
如果主题配置文件中没有启用 `creative_commons`，那么单独设置文章的 `copyright: true` 不会生效。
:::

## 文章目录 <Badge text="Stable"/>

修改主题配置文件：

``` yaml
toc:
  # 是否启用
  enable: true
  # 显示列表序号
  number: true
  # 文本溢出是否换行
  wrap: true
  # 是否始终展开所有文章目录。true：始终展开，false：当文章中对应的标题到达顶部时自动展开
  expand_all: false
  # 生成目录时，解析 h 标签的最大深度
  # 你可以在文章 Markdown 源文件的 Front-Matter 中，通过添加 `toc_max_depth` 属性，
  #   来指定某篇文章生成目录时，解析 h 标签的最大深度
  max_depth: 4
```
你可以在文章 Markdown 源文件中的 `Front-Matter` 里，设置 `toc: false` 来指定某篇文章不启用目录。

::: warning 注意
- 其中 `expand_all` 属性从 `v1.0.2` 开始支持。
- 如果主题配置文件中没有启用 `toc`，那么单独设置文章 `toc: true` 是没有效果的。
:::

## 订阅设置 <Badge text="Stable"/>

设置邮件订阅和 RSS 订阅，修改主题配置文件：

``` yaml
feed:
  # 是否启用
  enable: false
  # 邮件订阅地址 (例如：http://eepurl.com/guAE6j)
  email:
  # RSS 订阅地址 (例如：/atom.xml)
  rss:
```

想要使用邮件订阅，你需要自己构建 或 使用第三方提供的邮件订阅服务。例如我的邮件订阅地址：[http://eepurl.com/guAE6j](http://eepurl.com/guAE6j)

开启 RSS 订阅之前，你需要安装 hexo 插件：[hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)。然后在 Hexo 根目录下的 `_config.yml` 文件中添加配置项（关于各个配置项的具体含义，请自行查看插件的文档）：

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
  # 是否启用
  enable: true
  # 请使用引号包裹颜色值（支持所有 CSS 颜色单位）
  color: "#fc6423"
  # 进度条高度（支持所有 CSS 长度单位）
  height: 1px
```

侧边栏所有效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619211446.png)

## 文章头部信息 <Badge text="Stable"/>

修改主题配置文件：

``` yaml
post_meta:
  # 是否只显示图标
  icon_only: false
  # 文章创建时间
  created:
    # 是否启用
    enable: true
    # 图标名称在这里查找：https://fontawesome.com/v4.7.0/icons/
    icon: calendar-o
  # 文章更新时间
  updated:
    # 是否启用
    enable: true
    # 图标名称在这里查找
    icon: calendar-check-o
  # 文章预计的阅读时间
  # 启用这个功能之前，你首先需要在 Hexo 根目录安装依赖：
  # `npm install hexo-wordcount --save`，然后重启 hexo 服务器
  reading_time:
    # 是否启用
    enable: false
    # 图标名称在这里查找
    icon: clock-o
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
    # 是否启用
    enable: false
    # 图标名称在这里查找
    icon: file-word-o
```

效果如下：![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619210334.png)

## 文章列表分页 <Badge text="Stable"/> <Badge text="v1.0.3"/>

::: warning
该功能从 `v1.0.1` 版本开始支持，在 `v1.0.3` 版本中对配置项进行了更改。
:::

如果你想设置 `首页` 或 `归档页` 的文章列表是否分页，可以修改主题配置文件：

`v1.0.1 ~ v1.0.2`：

``` yaml
# 分页设置
post_list_paged:
# 首页的文章列表是否分页
  home: true
# 归档页面的文章列表是否分页
  archives: false
```

`v1.0.3` 以及之后：

``` yaml
post_list:
  # 是否分页
  paginate:
    # 首页的文章列表是否分页
    home: true
    # 归档页面的文章列表是否分页
    archives: false
```

默认是：网站首页的文章列表开启分页，归档页面的文章列表不开启分页。

分页效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190713173927.png)

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

`v1.1.2` 以及之后：

``` yaml
post_list:
  # 文章列表里的文章的封面图片
  cover_image:
    home: false
```

封面图片效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190713173929.jpg)

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

`v1.0.3` 以及之后：

``` yaml
post_widget:
  # 是否在文章末尾显示文章标签
  tags: true
```

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190713173926.png)

## 文章结束提示信息 <Badge text="Stable"/> <Badge text="v1.0.3"/>

::: warning
该功能从 `v1.0.0-beta.1` 版本开始支持，在 `v1.0.3` 版本中对配置项进行了更改。
:::

在文章末尾自动添加文章结束的提示信息，修改主题配置文件：

`v1.0.0-beta.1 ~ v1.0.2`：

``` yaml
# 在文章底部显示 “本文结束” 的提示信息
post_end:
  # 是否启用
  enable: true
  # 是否在提示信息之前显示水平分割线
  horizon_line: true
```

`v1.0.3` 以及之后：

``` yaml
post_widget:
  # 在文章底部显示 “本文结束” 的提示信息
  end_text:
    # 是否启用
    enable: true
    # 是否在提示信息之前显示水平分割线
    horizon_line: true
```

效果如下：![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619210335.png)

## 文章置顶 <Badge text="Stable"/>

想要使用文章置顶功能，首先你需要安装 hexo 插件 [hexo-generator-index-pin-top](https://github.com/netcan/hexo-generator-index-pin-top)，然后执行命令：

``` bash
$ npm uninstall hexo-generator-index --save
$ npm install hexo-generator-index-pin-top --save
```

最后，在文章的 `Front-Matter` 中，使用 `top: true` 来实现置顶。

设置文章置顶后，在文章列表中可以看到表示置顶的图标。你可以对图标进行设置，修改主题配置文件：

``` yaml
stick_top:
  # 图标的位置（可选值为：left 和 right）
  position: right
  # 建议使用名为 `thumb-tack` 的图标
  # 图标名称在这里查找：https://fontawesome.com/v4.7.0/icons/
  icon: thumb-tack
  # 图标的旋转角度（角度的单位是：deg）
  rotate: 45deg
  # 请使用引号包裹颜色值（支持所有 CSS 颜色单位）
  color: "#999"
```

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190713174424.jpg)

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

`v1.6.0` 以及之后：

``` yaml
codeblock:
  # 设置代码高亮
  highlight: light
```

有三种可供选择的代码高亮样式：`light`、`drak`、`ocean`。默认是 `light`。效果分别如下：

- `light`

  ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175153.png)

- `dark`

  ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175155.png)

- `ocean`

  ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175154.png)

## 代码块样式 <Badge text="Beta" type="warning"/> <Badge text="v1.6.0"/>

设置代码块样式，修改主题配置文件：

``` yaml
codeblock:
  # 设置代码块样式
  style: carbon
```

有三个可选值：`default`、`simple`、`carbon`。默认为：`default`。效果分别如下：

- `default`

> 默认样式。具有`显示语言`、`显示行号`和`复制按钮`的功能。
> 
> 下面代码高亮样式分别为：`light`、`light`（开启夜间模式）、`dark`、`ocean`。

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200115133041.png)

- `simple`

> 极简样式，只显示代码块。

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200115133056.png)

- `carbon`

> 仿 carbon 样式，也只显示代码块。

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200115134022.png)

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

`v1.6.0` 以及之后：

``` yaml
codeblock:
  # 代码溢出是否换行
  word_wrap: false
```

可选值为：`true`、`false`。默认是 `false`。效果分别如下：

- `true`（代码溢出换行）

  ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608214540.png)

- `false`（代码溢出不换行）

  ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608214539.png)

## 图片水平对齐方式 <Badge text="Deprecated" type="error"/>

::: danger
该配置项，即 `img_horizonal_align` 在 `v1.4.0` 版本开始废弃。
:::

## 文字与图片的垂直对齐方式 <Badge text="Deprecated" type="error"/>

::: danger
该配置项，即 `text_vertical_align_with_img` 在 `v1.2.0` 版本开始废弃。
:::

## 标签云 <Badge text="Stable"/>

如果你启用了 `tags` 页面，想要对其进行设置，修改主题配置文件：

``` yaml
tag_cloud:
  # 请使用引号包裹颜色值（只支持十六进制的颜色值）
  start_color: "#a4d8fa"
  end_color: "#49b1f5"
  # 标签最大、最小的尺寸
  min_size: 24
  max_size: 34
  # 最大显示标签数量
  max_amount: 200
```

效果如下：![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619210337.png)

## 其他设置

### 设置图片大小

1. 使用 HTML 中的 `img` 标签，通过 `style` 属性控制图片大小。
2. 使用 hexo 提供的语法 `{% https://xxxxx.png width height %}`，填入宽、高即可设置大小。
3. Stun 主题提供了一个便捷的方法来指定图片大小，你只需要在图片路径后面添加 `?size=宽度x高度` <Badge text="Stable"/> 后缀即可。例如：

``` markdown
![](https://xxxxx.png?size=200x100)
```

### 自定义样式 <Badge text="Stable"/> <Badge text="v1.0.3"/>

如果你想修改主题的样式，推荐将样式代码添加到 `source/css/_custom` 目录下的 `index.styl` 文件中。这样，当主题更新时，不会覆盖你已经修改了的样式代码。

> 当然，你也可以进行模块化分类：在该目录下新建样式文件，然后通过 `@import xxx` 语句在同目录下的 `index.styl` 文件中引入你新建的样式文件。

### 标识外部链接 <Badge text="Stable"/> <Badge text="v1.1.3"/>

从 `v1.1.3` 版本开始，除了侧边栏，顶部栏以外的区域，Stun 主题会在外链后面加上一个 Icon，用于标识这是一个外部链接。

你可以通过修改主题配置文件，来设置 Icon 以及是否启用这一功能：

``` yaml
external_link:
  icon:
    # 是否启用
    enable: true
    # 建议使用名为 `external-link` 的图标
    # 图标名称在这里查找：https://fontawesome.com/v4.7.0/icons/
    name: external-link
    # 请使用引号包括值（支持所有 CSS 单位）
    color: "#aaa"
```

### FancyBox <Badge text="Stable"/> <Badge text="v1.1.4"/>

如果想要使用 fancybox 功能，只需要修改主题配置文件即可：

``` yaml
fancybox: true
```

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190724173526.png)

可以去官网在线体验：[http://fancyapps.com/fancybox/3/](http://fancyapps.com/fancybox/3/)

### 图片放大效果 <Badge text="Stable"/> <Badge text="v1.2.0"/>

Stun 主题从 `v1.2.0` 版本开始支持图片点击放大的效果（无第三方依赖）。你可以配置该功能，修改主题配置文件：

``` yaml
zoom_image:
  # 是否启用
  enable: true
  # 遮罩的颜色
  mask_color: "rgba(0,0,0,0.6)"
```

::: tip
如果你启用了 fancybox，那么主题会优先使用 fancybox 效果。
:::

### 图片懒加载 <Badge text="Stable"/> <Badge text="v1.2.0"/>

Stun 主题从 `v1.2.0` 版本开始支持图片懒加载，但是**该功能只对文章页面起作用**。你可以配置该功能，修改主题配置文件：

``` yaml
lazyload:
  # 是否启用
  enable: true
  # 图片未加载前的占位符。可选值有：gif 或 block
  placeholder: gif
```

占位符取不同的值效果如下：

- `gif`

  ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190801204631.png)

- `block`

  ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190801204629.png)

::: warning 注意
下面是启用 lazyload 之后，已知的一些问题。

- 不兼容使用 Front-Matter 的 `photos` 属性进行展示的图片（即这些图片不会懒加载）。
:::

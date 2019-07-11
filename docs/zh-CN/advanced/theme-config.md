# 主题配置

::: tip 前言
- 修改配置文件、安装新的依赖等，都需要重启 hexo 服务器。
- 没有特别说明最早开始支持的版本的配置项，默认从 `v1.0.0` 版本开始支持。
- 稳定的配置项使用 <Badge text="stable"/> 标明，表示基本不会变动；不稳定的配置项使用 <Badge text="beta" type="warn"/> 标明，表示未来可能会变动甚至删除。
:::

## 配置文件

首先，你需要分清下面这两个配置文件的作用：

- hexo 根目录下的 `_config.yml`。这是站点配置文件，里面的配置作用于整个网站。
- stun 根目录下的 `_config.yml`。这是主题配置文件，里面的配置只对当前主题生效。

## 保留主题配置数据

如果你不想每次升级主题时，都要进行如下重复的操作：先将主题配置文件复制一份，等主题升级后再复制回去。那么你可以进行以下操作：将主题配置文件复制到 hexo 根目录下的 `source/_data/stun.yml` 文件中（没有此目录和文件就新建。目录名称不能改变，文件名称可以是任意的）。

> 如果你进行了上述操作，当你需要修改主题配置时，只需要修改 `stun.yml` 文件即可。更新主题时，主题根目录下的 `_config.yml` 文件（可能）会更新，而你对主题配置的数据仍保留在 `stun.yml` 文件中。

::: warning 注意
上面这种做法虽然方便你保留主题的配置数据，但是当主题 `_config.yml` 文件的配置项更改时，如果你不及时手动更新 `stun.yml` 文件，主题很可能会报错。
:::

## 国际化（i18n）

修改**站点**配置文件（不是主题配置文件）：

``` yaml
language: zh-CN # 可选值 zh-CN 或 en-US
```

语言文件在主题文件夹的 languages 目录下。stun 主题默认有 `zh-CN.yml` 和 `en.yml` 两种语言文件，如果需要支持其他语言，请自行编写语言文件。语言文件的命名规则要求符合 [RFC 4646](http://www.ietf.org/rfc/rfc4646.txt) 标准，你可以在[这里](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)找到各种语言的缩写。

## 顶部菜单栏 <Badge text="stable"/>

网站顶部菜单栏默认有 `/` 和 `/archives` 两个路径，它们分别对应于网站首页和归档页。如果你想添加：`categories`、`tags`、`about` 页面，你需要进行以下操作：

- 添加路径

修改 `stun.yml` 文件：

``` yaml
menu:
  home: /
  archives: /archives/
  categories: /categories/
  tags: /tags/
  about: /about/
```

- 添加图标 

修改 `stun.yml` 文件：

``` yaml
menu:
  home: / || home
  archives: /archives/ || folder-open
  categories: /categories/ || th
  tags: /tags/ || tags
  about: /about/ || user
```

在路径后面添加 `||` 分隔符，然后添加你想要显示的图标名称。图标名称在这里获取：[https://fontawesome.com/v4.7.0/icons/](https://fontawesome.com/v4.7.0/icons/)

> 如果只添加路径，没有添加图标名称，会使用默认图标进行显示。

你可以通过修改 `menu_settings` <Badge text="stable"/> 配置项来控制菜单项的图标或文字是否显示：

``` yaml
menu_settings:
  # 是否只显示图标
  icon_only: false
  # 是否只显示文字
  text_only: false
```

- 新建页面

在 hexo 根目录执行命令：

``` bash
$ hexo new page xxx # xxx 表示页面名称
```

执行这条命令后，会在如下目录生成文件：`source/xxx/index.md`

::: warning 注意
新建的页面名称，需要和 `stun.yml` 文件中添加的页面路径名称保持一致。

e.g. 你在 `stun.yml` 中设置了如下路径：
``` yaml
menu:
  about: /about-me
```

那么你应该执行命令：`hexo new page about-me`，这样才能在访问该路径时，找到对应的文件。
:::

## 自定义页面 <Badge text="stable"/>

如果你想在网站顶部菜单栏中添加自定义页面，请进行以下操作：

- 添加路径
- 添加图标
- 执行命令，新建页面

这三步的操作步骤[同上](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/theme-config.html#%E9%A1%B6%E9%83%A8%E8%8F%9C%E5%8D%95%E6%A0%8F)。

- 国际化设置

找到 languages 目录下的语言文件进行修改。例如，自定义页面名称为 `read`，修改如下：

`zh-CN.yml`

``` yaml
nav:
  read: 阅读
```

`en.yml`

``` yaml
nav:
  read: Read
```

这样就完成了自定义页面的添加。

## Favicon <Badge text="stable"/>

设置网站图标（favicon），修改 `stun.yml` 文件：

``` yaml
favicon:
  small: /imgs/favicon-16x16-stun.png
  medium: /imgs/favicon-32x32-stun.png
  # apple_touch_icon: /imgs/apple-touch-icon-stun.png
  # safari_pinned_tab: /imgs/logo-stun.svg
```

有关 favicon 的详细介绍，请访问：[https://developers.google.com/web/fundamentals/design-and-ux/browser-customization/](https://developers.google.com/web/fundamentals/design-and-ux/browser-customization/)

## 网站顶部栏信息 <Badge text="stable"/>

修改 `stun.yml` 文件：

``` yaml
header:
  # 网站顶部的高度（设置为百分数，表示所占屏幕高度的百分比。支持所有 CSS 长度单位）
  height: 80%
  # 顶部导航栏的高度（支持所有 CSS 长度单位）
  nav_height: 50px
  # 顶部背景图片
  bg_image:
    enable: true
    # 填写图片路径或链接
    url: https://xxxxx.png
  # 模糊滤镜效果（对网站顶部图片进行模糊）
  blur_effect:
    enable: false
    # 模糊程度（支持所有 CSS 长度单位）
    level: 15px
```

其中 `blur_effect` <Badge text="beta" type="warn"/>，效果如下（没有启用模糊滤镜效果）：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619210340.jpg)

## 指定顶部图 <Badge text="stable"/>

如果想要为某个页面或某篇文章单独指定顶部图，你只需要在页面或文章 markdown 源文件的 [front-matter](https://hexo.io/zh-cn/docs/front-matter) 中，添加 `top_image` 项，然后填入的图片 url 或路径即可。例如：


``` yaml
---
title: Hello Stun
date: 2019-05-15 22:54:49
top_image: https://xxxxx.jpg
tags:
  - hexo-theme
  - stun
---
```

## 知识共享许可协议（cc） <Badge text="stable"/>

修改 `stun.yml` 文件：

``` yaml
creative_commons:
  enable: true
  # 可选值: BY | BY-SA | BY-ND | BY-NC | BY-NC-SA | BY-NC-ND
  # 详情请访问: https://creativecommons.org/share-your-work/licensing-types-examples
  license: BY-NC-SA
  # 在侧边栏中显示
  sidebar: true
  # 在文章底部显示
  post: true
  # 设置许可协议的显示语言（当用户点击查看许可协议时，会以你设置的语言进行显示）
  language: zh # zh 或 en 等等，支持 30 多种语言。
```

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619210339.png)

## 返回顶部 <Badge text="stable"/>

修改 `stun.yml` 文件：

``` yaml
back2top:
  enable: true
  icon:
    # 建议使用名为 `rocket` 的图标
    # 图标名称在这里查找：https://fontawesome.com/v4.7.0/icons/
    name: rocket
    # 火箭发射动画
    animation: true
    # 图标的旋转角度（角度的单位是：deg）
    rotate: -45deg
    # 请使用引号包裹颜色值（支持所有 CSS 颜色单位）
    color: "#49b1f5"
    hover_color: "#fc6423"
```

## 网站底部栏信息 <Badge text="stable"/>

修改 `stun.yml` 文件：

``` yaml
footer:
  # 顶部背景图
  bg_image:
    enable: true
    # 填写图片路径或链接
    url: https://xxxxx.png
  # 版权信息
  copyright:
    enable: true
    # 显示的文字信息，例如：xxx All Rights Reserved.
    # 如果不设置，将显示 hexo 配置文件中的 author 字段的内容
    text: 
    # 开始时间（如果不设置，将显示最新的年份）
    since: 
    # 结束时间（如果不设置，将显示最新的年份）
    end: 
  # 时间和文字信息之间的图标
  icon:
    enable: true
    # 建议使用名为 `heart` 的图标
    # 图标名称在这里查找：https://fontawesome.com/v4.7.0/icons/
    name: heart
    # 心跳动画
    animation: true
    # 请使用引号包裹颜色值（支持所有 CSS 颜色单位）
    color: "#ff0000"
  # Hexo 链接（Powered by Hexo）
  powered:
    enable: true
    # 显示版本号（例如：vX.X.X）
    version: true
  # 主题链接（Theme - stun）
  theme:
    enable: true
    # 显示版本号（例如：vX.X.X）
    version: true
  # 备案信息（只有中国开发者会用到）详情: http://www.miitbeian.gov.cn
  beian:
    enable: false
    # 备案 XXXXXXXX 号
    icp: 
  # 任何自定义文本，支持 HTML（例如：托管于 <a href="https://pages.github.com/" rel="noopener" target="_blank">Github Pages</a>）
  custom:
    enable: false
    text: 
```

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190623192514.png)

## 侧边栏设置 <Badge text="beta" type="warn"/>

修改 `stun.yml` 文件：

``` yaml
sidebar:
  enable: true
  # 侧边栏位置，可选值有：left 或 right
  position: right
  # 侧边栏距离顶部的距离（只支持 px 单位）
  offsetTop: 20px
  # 侧边栏的宽度（建议：260px ~ 360px。支持所有 CSS 长度单位）
  width: 300px
  # 是否显示水平分割线
  horizon_line: true
```

## 侧边栏作者信息 <Badge text="stable"/>

修改 `stun.yml` 文件：

``` yaml
author:
  enable: true
  # 侧边栏头像
  avatar:
    # 填写图片路径或链接
    url: https://xxxxx.png
    # 是否显示为圆形
    rounded: true
    # 头像透明度（取值：0 ~ 1）
    opacity: 1
    # 鼠标 hover 动画，可选值：trun 或 shake
    animation: shake
  # 格言（也可以是任意一句想写的话）
  motto: hello world
```

## 友链 <Badge text="stable"/>

修改 `stun.yml` 文件：

``` yaml
# `||` 分隔符前面表示友链的链接或信息，后面表示友链图标。
# 图标的名称在这里查找：https://fontawesome.com/v4.7.0/icons/
# 如果你找不到想要的图标，可以考虑用文字来代替图标显示。
# 通过添加 `origin:` 前缀即可显示文字。例如：`origin:知` 会以 `知` 代替图标显示。
social:
  github: https://github.com/ || github
  google: https://plus.google.com/ || google
  twitter: https://twitter.com/ || twitter
  youtube: https://youtube.com/ || youtube
  segmentfault: https://segmentfault.com/ || origin:sf
  zhihu: https://www.zhihu.com/ || origin:知
  weibo: https://weibo.com/ || weibo
  wechat: yournumber || weixin
  telegram: yournumber || telegram
  qq: yournumber || qq
  # 你可以手动添加这里没有的友链
  # xxx: xxx || (origin:)xxx

# 友链的一些设置
social_setting:
  # 是否启用友链
  enable: true
  # 是否只显示图标
  icon_only: true
  # 友链之间的排列方式，取值同 CSS 的 "justify-content" 属性。
  # 可选值：flex-start | center | flex-end | space-between 等。
  # 更多取值请查看：https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content
  text_align: center
```

## 文章目录 <Badge text="stable"/>

修改 `stun.yml` 文件：

``` yaml
toc:
  enable: true
  # 显示列表序号
  number: true
  # 文本溢出是否换行
  wrap: true
  # 是否始终展开所有文章目录。true：始终展开，false：当文章中对应的标题到达顶部时自动展开。
  expand_all: false
  # 生成目录时，解析 h 标签的最大深度。
  # 你可以在文章的 markdown 源文件的 front-matter 中，通过添加 `toc_max_depth` 字段，
  #   来指定某篇文章生成目录时，解析 h 标签的最大深度。
  max_depth: 6
```

其中 `expand_all` <Badge text="v1.0.2"/>

## 订阅设置 <Badge text="stable"/>

设置邮件订阅和 RSS 订阅，修改 `stun.yml` 文件：

``` yaml
feed:
  enable: false
  # 邮件订阅地址 (例如：http://eepurl.com/guAE6j).
  email: 
  # RSS 订阅地址 (例如：/atom.xml)
  rss: 
```

开启 RSS 订阅之前，你需要安装 hexo 插件：[hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)。然后在**站点**的 `_config.yml` 文件中添加配置项（关于各个配置项的具体含义，请自行查看插件的文档）：

``` yaml
feed:
  type: atom
  # 这是 RSS 订阅的地址（可以随意设置，和上面 rss 配置项对应）
  path: atom.xml
  limit: 20
  hub:
  content:
  content_limit: 140
  content_limit_delim: ' '
  order_by: -date
  icon: icon.png
```

配置完成之后，访问你设置的订阅地址即可看到 RSS 订阅信息。

## 文章阅读进度条 <Badge text="stable"/>

修改 `stun.yml` 文件：

``` yaml
reading_progress:
  enable: true
  # 请使用引号包裹颜色值（支持所有 CSS 颜色单位）
  color: "#fc6423"
  # 进度条高度（支持所有 CSS 长度单位）
  height: 1px
```

默认启用。

侧边栏所有效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619211446.png)

## 文章顶部信息 <Badge text="beta" type="warn"/>

修改 `stun.yml` 文件：

``` yaml
post_meta:
  # 是否只显示图标
  icon_only: false
  # 文章创建时间
  created:
    enable: true
    # 图标名称在这里查找：https://fontawesome.com/v4.7.0/icons/
    icon: calendar-o
  # 文章更新时间
  updated:
    enable: true
    # 图标名称在这里查找
    icon: calendar-check-o
  # 文章预计的阅读时间
  # 启用这个功能之前，你首先需要在 hexo 根目录安装依赖：
  # `npm install hexo-wordcount --save`，然后重启 hexo 服务器。
  reading_time:
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
  # 启用这个功能之前，你首先需要在 hexo 根目录安装依赖：
  # `npm install hexo-wordcount --save`，然后重启 hexo 服务器。
  word_count:
    enable: false
    # 图标名称在这里查找
    icon: file-word-o
```

效果如下：![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619210334.png)

## 文章摘要 <Badge text="stable"/>

如果想要保留文章摘要，需要**手动**在文章的 markdown 源文件中添加 `<!-- more -->` 标记。标记之前的部分都会被保留为文章摘要，显示在文章列表中。

如果想要自动保留文章摘要，可以通过修改 `stun.yml` 文件：

``` yaml
auto_excerpt:
  enable: false
  # 自动保留的字数
  length: 150
```

由于自动保留摘要的效果并不理想，所以这里不建议开启。

## 文章置顶 <Badge text="beta" type="warn"/>

想要使用文章置顶功能，首先你需要安装 hexo 插件 [hexo-generator-index-pin-top](https://github.com/netcan/hexo-generator-index-pin-top)，然后执行命令：

``` bash
$ npm uninstall hexo-generator-index --save
$ npm install hexo-generator-index-pin-top --save
```

最后，在文章的 `front-matter` 中，使用 `top: true` 来实现置顶。

设置文章置顶后，在文章列表中，可以看到表示置顶的图标。你可以对图标进行设置，修改 `stum.yml` 文件：

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

## 代码高亮 <Badge text="stable"/>

设置代码高亮以及高亮样式，修改 `stun.yml` 文件：

``` yaml
highlight_theme: light
```

有三种可供选择的代码高亮样式：`light`、`drak`、`ocean`。默认是 `light`。效果分别如下：

- `highlight_theme: light`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175153.png)

- `highlight_theme: dark`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175155.png)

- `highlight_theme: ocean`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175154.png)

## 代码换行 <Badge text="stable"/>

设置代码溢出时，是否换行，修改 `stun.yml` 文件：

``` yaml
code_word_wrap: true
```

默认换行。如果设为不换行，当代码溢出时，显示水平滚动条。

效果分别如下：

- `code_word_wrap: true`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608214540.png)

- `code_word_wrap: false`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608214539.png)

## 图片水平对齐方式 <Badge text="beta" type="warn"/>

设置文章中图片的水平对齐方式，修改 `stun.yml` 文件：

``` yaml
img_horizonal_align: 
```

可选的值有：`left`, `center`, `right`。默认值为空，即不设置。

> 默认情况下，图片显示居左，支持行内显示。如果你手动设置了图片的水平对齐方式，则图片不再支持行内显示。

效果分别如下：

- 设为默认值，即 `img_horizonal_align: ` 设为空。

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608220937.png)

- `img_horizonal_align: left`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608215836.png)

- `img_horizonal_align: center`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608215837.png)

- `img_horizonal_align: right`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608215838.png)

## 文字与图片的垂直对齐方式 <Badge text="beta" type="warn"/>

如果你没有手动设置**图片的水平对齐方式**（手动设置了请忽略此配置项），那么图片将支持和文字在同一行内显示。此时，如果你想设置文字与图片的垂直对齐方式，修改 `stun.yml` 文件：

``` yaml
text_vertical_align_with_img: bottom
```

可选的值有：`top`, `middle`, `bottom`。默认值为 `bottom`。

效果分别如下：

- `text_vertical_align_with_img: top`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608232755.png)

- `text_vertical_align_with_img: middle`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608232756.png)

- `text_vertical_align_with_img: bottom`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608232754.png)

## 文章标签 <Badge text="beta" type="warn"/>

在文章末尾显示文章的所有标签，修改 `stun.yml` 文件：

``` yaml
post_tags: true
```

默认启用。

## 文章结束提示信息 <Badge text="stable"/>

在文章末尾自动加上提示文章结束的信息，修改 `stun.yml` 文件：

``` yaml
post_end_text:
  enable: true
  # 是否显示水平分割线
  horizon_line: true
```

效果如下：![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190619210335.png)

默认启用。

## 赞赏码 <Badge text="stable"/>

设置文章的赞赏码，修改 `stun.yml` 文件：

``` yaml
# Reward
reward:
  enable: false
  # 支付宝
  alipay: https://xxxxx.png
  # 微信
  wechat: https://xxxxx.png
```

默认不启用，启用后效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175556.png)


## 文章列表分页 <Badge text="stable"/> <Badge text="v1.0.1"/>

如果你想设置首页 或 归档页的文章列表是否分页，可以修改 `stun.yml` 文件：

``` yaml
post_list_paged:
  home: true
  archives: true
```

默认都开启分页。

> 通常推荐首页开启分页，防止摘要图片过多，影响页面加载速度（目前 stun 还不支持图片懒加载，所以存在这个问题，以后的版本会进行支持）。推荐归档页面关闭分页，方便快速查找文章。

## 标签云 <Badge text="beta" type="warn"/>

如果你启用了 `tags` 页面，想要对其进行设置，修改 `stun.yml` 文件：

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
2. 使用 hexo 提供的语法 `{% https://xxxxx.png width height %}`，填入图片地址和宽、高即可。
3. stun 提供了一个便捷的方法来指定图片大小，你只需要在图片路径后面添加 `?size=宽度x高度` <Badge text="stable"/> 后缀即可。例如：

``` markdown
![](https://xxxxx.png?size=200x100)
```

<!-- ### 自定义样式 <Badge text="stable"/> <Badge text="v1.0.3"/> -->
### 自定义样式

如果你想修改主题的样式，推荐在 `source/css/_custom` 目录下，新建样式文件，然后通过 `@import xxx` 语句在同目录下的 `index.styl` 中引入你新建的样式文件。当然你也可以直接将样式代码写在该目录下的 `index.styl` 文件中。如果你要自定义的样式有很多的话，还是建议按文件分类，这样更方便以后管理。

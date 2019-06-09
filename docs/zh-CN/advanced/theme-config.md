# 主题配置

::: warning
如果修改了主题配置后没有效果，请尝试重启 hexo 服务器。
:::

## 配置文件

首先，你需要分清下面这两个配置文件的作用：

- hexo 根目录下的 `_config.yml`。这是站点配置文件，里面的配置作用于整个网站。
- stun 根目录下的 `_config.yml`。这是主题配置文件，里面的配置只对当前主题生效。

## 平滑升级


如果你不想每次升级主题时，都要进行如下重复的操作：先将主题配置文件复制一份，等主题升级后再复制回去。那么你可以进行以下操作：将主题配置文件复制到 hexo 根目录下的 `source/_data/stun.yml` 文件中（没有此目录和文件就新建。目录名称不能改变，文件名称可以是任意的）。

> 如果你进行了上述操作，当你需要修改主题配置时，只需要修改 `stun.yml` 文件即可。而且这样做，在更新主题时，主题根目录下的 `_config.yml` 文件会更新，而你对主题配置的数据仍保留在 `stun.yml` 文件中，从而实现主题平滑升级。支持这种平滑升级功能的 hexo 主题有 [next](https://github.com/theme-next/hexo-theme-next), [melody](https://github.com/Molunerfinn/hexo-theme-melody), [stun](https://github.com/liuyib/hexo-theme-stun) 等。

## 语言

修改**站点**配置文件（不是主题配置文件）：

``` yaml
language: zh-CN # 可选值为 zh-CN 和 en
```

> 该文件夹下默认有 `zh-CN.yml` 和 `en.yml` 两种语言文件，如果需要支持其他语言，请自行编写语言文件。语言文件的命名规则要求符合 [RFC 4646](http://www.ietf.org/rfc/rfc4646.txt) 标准，你可以在[这里](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)找到各种语言的缩写。

## 导航菜单

网站顶部导航栏菜单默认有 `/` 和 `/archives` 两个路径，它们分别对应于网站首页和归档页。如果你想添加：`categories`、`tags`、`about` 页面，你需要进行以下操作：

- 添加路径，修改 `stun.yml` 文件

``` yaml
menu:
  home: /
  archives: /archives
  categories: /categories
  tags: /tags
  about: /about
```

- 新建页面

在 hexo 根目录执行指令。

``` bash
hexo new page xxx # xxx 表示页面名称
```

执行这条指令后，会在 `source/xxx` 目录下生成 `index.md` 文件。

::: warning
这里新建的页面名称，需要和 `stun.yml` 文件中添加的页面路径名称保持一致。

e.g. 你在 `stun.yml` 中进行了如下设置：
``` yaml
menu:
  about: /about-me
```

那么你应该执行指令：`hexo new page about-me`
:::

## 自定义页面

如果你想在顶部导航栏菜单中添加自定义页面，请进行以下操作：

- 修改 `stun.yml` 文件和新建页面

步骤同上。

- 添加语言支持

找到 languages 目录下的语言文件，修改 `nav` 字段。例如，自定义页面名称为 `read`，那么需要进行如下修改：

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

- 添加图标

::: warning
如果你不熟悉如何使用图标字体文件，那么接下来的操作对你来说可能是困难的，建议先去了解[相关知识](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.16&helptype=code)。
:::

- 通过在线网站获取图标字体文件。

推荐的网站有：[fontello](http://fontello.com/)、[iconfont](https://www.iconfont.cn/)

- 引入字体文件。

找到文件 `stun/source/css/_global/font.styl`，修改：

``` stylus
@font-face
  font-family: $font-icon-family
  font-weight: normal
  font-style: normal
  src:
    url('../../fonts/font.woff') format('woff'),
    url('图标字体文件的路径') format('图标字体文件的类型')
```

- 定义图标类名

``` stylus
.icon-read::before
  content: '\xxxx' // 你的字体图标的编码
```

::: warning
这里类名的命名规则是 `.icon-` + 你新建页面的名称。
:::

## Favicon

修改 `stun.yml` 文件：

``` yaml
favicon: # 填写图片路径或链接
```

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608225424.png)

## 头像

修改 `stun.yml` 文件：

``` yaml
avatar: # 填写图片路径或链接
```

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608225634.png)

## 头像 hover 动画

设置鼠标经过头像时的动画，修改 `stun.yml` 文件：

``` yaml
avatar_animation: turn
```

可选值有：`turn`, `shake`。

## 顶部导航栏高度

修改 `stun.yml` 文件：

``` yaml
header_nav_height: 50px
```

## 网站头部高度

修改 `stun.yml` 文件：

``` yaml
header_height: 80%
```

支持任意 CSS 单位的数值，默认值为屏幕高度的 80%。

## 顶部图

设置网站顶部图片，修改 `stun.yml` 文件：

``` yaml
header_bg_img: # 填写图片路径或链接
```

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190609105301.jpg)

当你设置了顶部图之后，所有页面都会使用这张图片作为顶部图。如果想要为某个页面或某篇文章单独指定顶部图，在页面或文章的 `md` 文件头部，添加 `top_img` 项，填入你想要的图片 url 或路径即可。例如：

``` yaml
---
title: Hello Stun
date: 2019-05-15 22:54:49
top_img: https://xxxx.jpg
tags:
  - hexo-theme
  - stun
---
```

## 顶部图模糊滤镜

某些情况下，你可能需要顶部图具有模糊滤镜效果，那么你只需要修改 `stun.yml` 文件：

``` yaml
top_img_blur:
  enable: true # 设为 false 表示不启用
  level: '15px'
```

其中 `level` 表示模糊程度，支持任意 CSS 单位的数值。效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190609164629.jpg)

## 底部图

修改 `stun.yml` 文件：

``` yaml
footer_bg_img: # 填写图片路径或链接
```

## 友链

修改 `stun.yml` 文件：

``` yaml
social:
  github: 
  segmentfault: 
  twitter: 
  weibo: 
  wechat: 
  qq: 
  telegram: 
```

填写相应的 url 链接即可，效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608230959.png)

## 订阅

- 添加 Email 订阅

修改 `stun.yml` 文件：

``` yaml
feed:
  mail: # url
```

- 添加 RSS 订阅

TODO

## 代码高亮

修改 `stun.yml` 文件：

``` yaml
highlight_theme: light
```

有三种可供选择的代码高亮样式：

- light
- drak
- ocean

默认是 light。效果分别如下：

- `highlight_theme: light`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175153.png)

- `highlight_theme: dark`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175155.png)

- `highlight_theme: ocean`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175154.png)

## 赞赏码

启用或关闭赞赏码，修改 `stun.yml` 文件：

``` yaml
reward:
  enable: true # 设为 false 表示不启用
  qr_img_url:
    alipay: # 填写图片路径或链接
    wechat: # 填写图片路径或链接
```

默认不启用。启用效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175556.png)

## 菜单图标

启用或关闭导航栏菜单图标，修改 `stun.yml` 文件：

``` yaml
header_menu_icon_show: # true or false
```

默认启用。

## 代码换行

设置代码溢出时，是否换行，修改 `stun.yml` 文件：

``` yaml
code_word_wrap: # true or false
```

默认换行。如果设为不换行，当代码溢出时，显示水平滚动条。

效果分别如下：

- `code_word_wrap: true`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608214540.png)

- `code_word_wrap: false`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608214539.png)

## 图片水平对齐方式

如果你想设置文章中，图片的水平对齐方式，修改 `stun.yml` 文件：

``` yaml
img_horizonal_align: # left or center or right
```

可选的值有：`left`, `center`, `right`。默认值为空，即不设置。

> 默认情况下，图片显示居左，支持行内显示。如果你手动设置了图片的水平对齐方式，则图片不再支持行内显示。

效果分别如下：

- 设为默认值，即 `img_horizonal_align: `

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608220937.png)

- `img_horizonal_align: left`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608215836.png)

- `img_horizonal_align: center`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608215837.png)

- `img_horizonal_align: right`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608215838.png)

## 文字与图片的垂直对齐方式

如果你没有手动设置**图片的水平对齐方式**（否则请忽略此配置项），那么图片将支持和文字在同一行内显示。此时，如果你想设置文字与图片的垂直对齐方式，修改 `stun.yml` 文件：

``` yaml
text_vertical_align_with_img: # top or middle or bottom
```

可选的值有：`top`, `middle`, `bottom`。默认值为 `bottom`。

效果分别如下：

- `text_vertical_align_with_img: top`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608232755.png)

- `text_vertical_align_with_img: middle`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608232756.png)

- `text_vertical_align_with_img: bottom`

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608232754.png)

## 返回顶部

启用或关闭返回顶部按钮，修改 `stun.yml` 文件：

``` yaml
back_to_top: # true or false
```

默认启用。

## 文章版权声明

设置文章末尾的版权声明，修改 `stun.yml` 文件：

``` yaml
post_copyright:
  enable: true # 设为 false 表示不启用
  license: CC BY-NC-SA 4.0
  license_url: https://creativecommons.org/licenses/by-nc-sa/4.0/
```

默认启用并采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议，效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190609092406.png)

## 站点年份

设置网站底部的年份，修改 `stun.yml` 文件：

``` yaml
site_copyright:
  enable: true # 设为 false 表示不启用
  start: 2019
  # 如果不设置，默认是最新的年份
  end: 
```

其中开始时间必须设置，截止时间不设置默认为最新的年份。效果分别如下：

- 设置开始、截止时间

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190609170802.png)

- 设置开始时间，不设置截止时间

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190609170803.png)

- 开始时间和截止时间相同

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190609170801.png)

## 底部自定义文字

设置网站底部自定义文字（支持 HTML 语法），修改 `stun.yml` 文件：

``` yaml
footer_custom_text: 
```

你可以填写任意信息，通常用于填写 ICP 备案号，网站采用的服务等等。

例如，设置为 `Hello there. 博客托管于 <a href="https://github.com/">Github</a>.<br>备案 xxxxxxxxx 号.`，效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190609101330.png)

# 新手上路

::: tip 前言
- 修改配置文件、安装新的依赖等，都需要重启 Hexo 服务器。
- 没有特别说明，配置项从 `v1.0.0` 版本开始支持。
- 稳定的配置使用 <Badge text="Stable"/> 标明，表示基本不会变动。不稳定的配置使用 <Badge text="Beta" type="warn"/> 标明，表示未来可能会变动甚至删除。目前还不支持的配置使用 <Badge text="Not Support" type="error"/> 标明。被废弃的配置使用 <Badge text="Abandon" type="error"/> 标明。最早开始支持的版本号使用 <Badge text="v x.x.x"/> 标明。与主题无关的配置项使用 <Badge text="Disrelated" type="warning"/> 标明。
:::

## 配置文件

首先，你需要分清下面这两个配置文件的作用：

- Hexo 根目录下的 `_config.yml`。这是 Hexo 配置文件，里面的配置作用于整个网站。
- Stun 根目录下的 `_config.yml`。这是主题配置文件，里面的配置只对当前主题生效。

至于配置的时候，需要修改哪一个配置文件，文档里会指出。

## 添加新页面 <Badge text="Stable"/>

Stun 主题内置有：分类页、标签页。默认没有启用。想启用这些页面，需要按照如下步骤操作：

1. 在 Hexo 根目录下执行命令

    ``` bash
    # 启用分类页，执行这条指令
    $ hexo new page categories

    # 启用标签页，执行这条指令
    $ hexo new page tags
    ```

2. 修改 Front-Matter

    找到 Hexo 根目录下的 `source/categories` 或 `source/tags` 文件夹中的 Markdown 文件，添加 Front-Matter：

    ```
    ---
    # 如果是分类页，添加这个
    type: "categories"

    # 如果是标签页，添加这个
    type: "tags"
    ---
    ```

3. 然后修改主题配置文件，将 `categories` 或 `tags` 对应项取消注释

    ``` yaml
    menu:
      # `||` 分隔符前面表示路径，后面表示 Font Awesome 图标名称
      # 如果不需要使用图标，直接填写路径即可
      home: / || home
      archives: /archives/ || folder-open
      # categories: /categories/ || th
      # tags: /tags/ || tags
      # xxx: /xxx/ || xxx
    ```

除了使用上述内置页面外，如果你想使用自定义页面，需要执行如下步骤：

以添加**阅读**页面为例。

1. 修改主题配置文件，添加相应的菜单项

    ``` yaml
    menu:
      # 格式如下
      # 名称: 路径 || 图标名称
      reading: /reading/ || book
    ```

    > 图标的名称在这里获取：[https://fontawesome.com/v4.7.0/icons/](https://fontawesome.com/v4.7.0/icons/)。

2. 创建页面文件

    在 Hexo 根目录下执行指令：

    ``` bash
    $ hexo new page reading # 这里的 reading 对应上一步你设置的路径名称
    ```

3. 国际化设置

    找到 `languages` 目录下的语言文件，选择你网站使用的语言进行修改，这里以中文作为举例：

    `zh-CN.yml`：

    ``` yaml
    menu:
      reading: 阅读
    ```

这样就完成了自定义页面的添加。

另外，你可以通过修改主题配置文件里的 `menu_settings` 字段，来设置图标和文字是否显示：

``` yaml
menu_settings:
  # 是否只显示图标
  icon_only: false
  # 是否只显示文字
  text_only: false
```

## Favicon <Badge text="Stable"/>

刚开始，主题默认使用 Stun 的 Logo 作为网站图标，你需要换成自己的。

建议你在 **Hexo 根目录**下的 `source` 目录中，新建一个文件夹用于放置图片，例如 `assets`，然后你可以通过 `/assets/xxx.png` 这样的路径使用图片。将图片路径填入你的主题配置文件：

``` yaml
favicon:
  small: /assets/favicon-16x16.png                  # 16x16 像素大小的图片
  medium: /assets/favicon-32x32.png                 # 32x32 像素大小的图片
  # 下面这些配置项默认不启用，你需要准备好相应的图片后再开启，也可以直接忽略。
  # apple_touch_icon: /assets/apple-touch-icon.png  # 180x180 像素大小的图片
  # safari_pinned_tab: /assets/stun-logo.svg        # SVG 格式的图片
  # msapplication: /assets/favicon-144x144.png      # 144x144 像素大小的图片
```

## 网站顶部设置

修改主题配置文件：

``` yaml
header:
  # 是否启用
  enable: true
  show_on:
    # 在文章页面是否显示网站顶部
    post: true
  # 网站顶部的高度（设置为百分数，表示所占屏幕高度的百分比。支持所有 CSS 长度单位）
  height: 80%
  # 顶部背景图片
  bg_image:
    # 是否启用
    enable: false
    # 填写图片路径或链接
    url: https://xxxxx.png
  # 顶部背景图的遮罩效果
  mask:
    # 是否启用
    enable: false
    # 透明度（取值：0 ~ 1）
    opacity: 0.5
  nav:
    # 顶部导航栏的高度（支持所有 CSS 长度单位）
    height: 50px
    # 导航栏的背景颜色（吸顶时）
    bg_color: "#333"
  # 提示向下滚动的图标
  scroll_down_icon:
    # 是否启用
    enable: false
    # 是否启用动画
    animation: true
```

其中 `header.enable` 和 `header.show_on.post` 选项，默认都为 `true`。

- 如果设置 `header.enable: false`，则所有页面中都不显示 header（只显示顶部导航栏），效果如下：

  ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200203194337.jpg)

- 如果设置 `header.enable: true` 和 `header.show_on.post: false`，则文章页不显示 header，其他页面仍会显示 header，效果如下：

    **文章页：**

    ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200203194337.jpg)

    **首页（其他页面）：**

    ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200203194338.jpg)

::: warning
- `mask` 选项 <Badge text="v1.1.1"/>
- `blur_effect` 选项 <Badge text="Abandon" type="error"/> <Badge text="v1.1.1" type="error"/> 
- `scroll_down_icon` 选项 <Badge text="v1.5.4"/>
- `nav_height` 选项 <Badge text="v1.0.0"/>，在 `v1.7.0` 版本修改为 `nav`。
- `header.enable` 和 `show_on` 选项 <Badge text="v1.7.0"/>

  > 当 `header.enable` 和 `show_on` 两者之一设为 `false` 或都设为 `false` 时，不兼容 Pjax 功能中的 `scrollTo2screen` 选项。
:::

### 指定顶部图 <Badge text="Stable"/>

如果想要为某个页面或某篇文章单独指定顶部图，你需要在页面或文章 Markdown 源文件的 [Front-Matter](https://hexo.io/zh-cn/docs/Front-Matter) 中，添加 `top_image` 项，然后填入的图片 url 或路径即可。例如：

```
---
title: Hello Stun
top_image: https://xxxxx.jpg
---
```

## 网站主体设置 <Badge text="Beta" type="warning"/> <Badge text="v1.7.0"/>

修改主题配置文件：

``` yaml
body:
  # 网站主体背景图片
  bg_image:
    # 是否启用
    enable: false
    # 填写图片路径或链接
    url: https://xxxxx.png
    # 是否固定背景图片（相当于设置 position: fixed）
    fixed: true
    # 图片无法占满空间时，是否重复显示（相当于设置 background-repeat: repeat/no-repeat）
    repeat: false
  # 网站主体背景图片的遮罩效果
  mask:
    # 是否启用
    enable: false
    # 透明度（取值：0 ~ 1）
    opacity:
      # 默认情况下，网站主体背景图片的透明度
      default: 0.1
      # 夜晚模式下，网站主体背景图片的透明度
      night_mode: 0.6
```

## 侧边栏设置

修改主题配置文件：

``` yaml
sidebar:
  # 是否启用
  enable: true
  # 侧边栏位置，可选值有：left 或 right
  position: right
  # 侧边栏吸顶时，距离页面顶部的距离（只支持 px 单位）
  offsetTop: 20px
  # 是否显示水平分割线
  horizon_line: false
```

::: danger <Badge text="Abandon" type="error"/>
其中的 `width` 属性在 `v1.6.0` 版本废弃。替代的设置是 `layout.sidebar` 属性。
:::

### 作者信息 <Badge text="Stable"/>

侧边栏默认头像是 Stun 的 Logo，你需要换成自己的，修改主题配置文件：

``` yaml
author:
  # 是否启用
  enable: true
  # 侧边栏头像
  avatar:
    # 填写图片路径或链接
    url: https://xxx.png
    # 是否显示为圆形
    rounded: true
    # 头像透明度（取值：0 ~ 1）
    opacity: 1
    # 鼠标 hover 动画，可选值：trun或 shake
    animation: trun
  # 格言（可以是任意一句想写的话）
  motto: hello world
```

### 社交链接 <Badge text="Stable"/>

修改主题配置文件：

``` yaml
# `||` 分隔符前面表示社交链接的 URL 或信息，后面表示 Font Awesome 图标
# 如果你找不到想要的图标，可以考虑用文字来代替图标显示
# 通过添加 `origin:` 前缀即可显示文字。例如：`origin:知` 会以 `知` 代替图标显示
social:
  github: https://github.com/ || github
  google: https://plus.google.com/ || google
  # twitter: https://twitter.com/ || twitter
  # youtube: https://youtube.com/ || youtube
  # segmentfault: https://segmentfault.com/ || origin:sf
  # weibo: https://weibo.com/ || weibo
  # zhihu: https://www.zhihu.com/ || origin:知
  # wechat: yournumber || weixin
  # telegram: yournumber || telegram
  # qq: yournumber || qq
  # 你可以自行添加这里没有的社交链接，格式如下：
  # xxx: xxx || (origin:)xxx

# 社交链接的设置
social_setting:
  # 是否启用社交链接
  enable: true
  # 是否只显示图标
  icon_only: true
```

> 如果不想启用某个社交链接，直接注释掉即可。
>
> 图标的名称在这里查找：[https://fontawesome.com/v4.7.0/icons/](https://fontawesome.com/v4.7.0/icons/)

::: danger <Badge text="Abandon" type="error"/>
其中，配置项 `social_setting` 的 `text_align` 属性在 `v1.2.0` 版本废弃。
:::

当你添加一个默认没有的社交链接时，需要进行国际化设置。这里以添加链接 `掘金` 为例，步骤如下：

1. 修改主题配置文件

    ``` yaml
    social:
      juejin: https://juejin.im/timeline || origin:掘
    ```

    > 由于 Font Awesome 4.0 中找不到掘金的 logo，所以这里使用 `掘` 字来代替显示。

2. 国际化设置

    找到 `languages` 目录下的语言文件，选择你网站使用的语言进行修改，这里以中文作为举例：

    `zh-CN.yml`：

    ``` yaml
    social:
      juejin: 掘金
    ```

    > 这里的国际化设置，对应鼠标经过图标时，显示的文字。

    效果如下：

    ![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190717165333.png)

## 网站底部设置 <Badge text="Stable"/>

修改主题配置文件：

``` yaml
footer:
  # 背景图片
  bg_image:
    # 是否启用
    enable: false
    # 填写图片路径或链接
    url: https://xxxxx.png
  # 遮罩效果（目前只有黑色遮罩）
  mask:
    # 是否启用
    enable: false
    # 遮罩透明度 (取值: 0 ~ 1).
    opacity: 0.5
  # 版权信息
  copyright:
    # 是否启用
    enable: true
    # 显示的文字信息，例如：xxx All Rights Reserved.
    # 如果不设置，将显示 hexo 配置文件中的 author 属性的内容
    text:
    # 开始时间（如果不设置，将显示最新的年份）
    since:
    # 结束时间（如果不设置，将显示最新的年份）
    end:
  # 时间和文字信息之间的图标
  icon:
    # 是否启用
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
    # 是否启用
    enable: true
    # 显示版本号（例如：vX.X.X）
    version: true
  # 主题链接（Theme - stun）
  theme:
    # 是否启用
    enable: true
    # 显示版本号（例如：vX.X.X）
    version: true
  # 备案信息（只有中国开发者会用到）详情: http://www.miitbeian.gov.cn/
  beian:
    # 是否启用
    enable: false
    # 备案 XXXXXXXX 号
    icp:
  # 任何自定义文本，支持 HTML（例如：托管于 <a href="https://pages.github.com/" rel="noopener" target="_blank">Github Pages</a>）
  custom:
    # 是否启用
    enable: false
    # 自定义文本内容
    text:
```

效果如下：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190623192514.png)

## 返回顶部 <Badge text="Beta" type="warning"/>

修改主题配置文件：

``` yaml
back2top:
  # 是否启用
  enable: true
  # 显示的图标
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

## 文章摘要 <Badge text="Stable"/>

如果想要保留文章摘要，需要**手动**在文章的 Markdown 源文件中添加 `<!-- more -->` 标记。标记之前的部分都会被保留为文章摘要，显示在文章列表中。

如果想要自动保留文章摘要，可以通过修改主题配置文件：

``` yaml
auto_excerpt:
  # 是否启用
  enable: false
  # 自动保留的字数
  length: 150
```

> 由于自动保留摘要的效果并不理想，所以这里不建议开启。

---

到这里就完成了最基本的配置，如果你还想更详细的配置主题，请向后继续阅读文档。

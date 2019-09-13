# 常见问题

这里收录使用 `hexo-theme-stun` 中一些常见的问题。很多是没有阅读文档或阅读文档不仔细导致的。所以建议养成阅读文档，查找已有的 issue 后，再提问的习惯。

## 首页中，如何保留部分文章内容

> 参见 Issue：[关于首页的 ReadMore 按钮](https://github.com/liuyib/hexo-theme-stun/issues/8)

这是所有 Hexo 都会有的常见问题，在没有进行任何设置时，Stun 主题默认在首页显示文章的所有内容。

在文章的 Markdown 文件中添加 `<!-- more -->` 标记，标记之前的部分会被当做文章摘要显示在首页（这个标记是 Hexo 的一个功能，与主题无关）。

当然，你也可以修改主题的配置，让主题自动保留文章的前几百字作为文章摘要。详参见：[文章摘要](https://liuyib.github.io/hexo-theme-stun/zh-CN/guide/primary-setting.html#%E6%96%87%E7%AB%A0%E6%91%98%E8%A6%81)。

## 使用 Stun 主题后运行不起来

> 参考 Issue：[初次使用 stun 运行不起来](https://github.com/liuyib/hexo-theme-stun/issues/2)

使用 Stun 主题运行后，浏览器里显示**类似**如下信息：

`
n/layout.pug block content include ./_mixins/post-timeline.pug include ./_mixins/post-header.pug div.content.code-highlight if theme.post_list_paged.home include ./_components/recent-posts.pug include ./_components/pagination.pug else include ./_components/recent-posts.pug
`

原因是没有安装依赖 `pug`。

## 文章解析的一些问题

- 代码高亮，无法识别 C# 代码

  > 参见 Issue：[“代码高亮”无法识别C#代码](https://github.com/liuyib/hexo-theme-stun/issues/12)

- 无法渲染 LaTex 公式

  > 参见 Issue：[MathJax 配置不成功，不进行渲染](https://github.com/liuyib/hexo-theme-stun/issues/6)

类似这种问题，都是因为 Markdown 渲染器引起的。Hexo 默认安装的 Markdown 渲染器是 `hexo-renderer-marked`，这个渲染器功能很少，已经满足不了大多数用户的需求，所以推荐将其卸载换成 `hexo-renderer-markdown-it-plus`。

## 文章置顶失效

文章置顶功能依赖于 `hexo-generator-index-pin-top` 插件，并且需要将原有的 `hexo-generator-index` 插件卸载。如果你设置了文章置顶，但没有生效，很可能是因为没有卸载原有的插件。

执行下面这条指令将其卸载，然后重启服务器即可：

``` bash
$ npm uninstall hexo-generator-index --save
```

## 如何设置每次切换页面后，滚动到第二屏

这是一个启用 Pjax 后才能设置的功能。如果想设置这个功能，需要修改主题配置文件：

``` yaml
pjax:
  scrollTo2screen: true
```

> 注意：启用上述功能后，Pjax 的配置项 `scrollTo` 将失效。
> > `scrollTo` 配置项用于设置启用 Pjax 时，每次切换页面后，滚动的距离。

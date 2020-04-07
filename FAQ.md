# 常见问题

这里收录了使用主题 Stun 时一些常见的问题。很多是没有阅读文档或阅读文档不仔细导致的。所以建议提出新的 issue 之前，阅读[文档](https://liuyib.github.io/hexo-theme-stun)、阅读[常见问题](https://github.com/liuyib/hexo-theme-stun/blob/master/FAQ.md)、参考已有的 [issue](https://github.com/liuyib/hexo-theme-stun/issues?q=is%3Aissue+is%3Aclosed)，上述途径可以解决你绝大部分问题。

## 首页中，如何保留文章摘要

> 参见 issue：[关于首页的 ReadMore 按钮](https://github.com/liuyib/hexo-theme-stun/issues/8)

这是所有 Hexo 都会有的常见问题，在没有进行任何设置时，Stun 主题默认在首页显示文章的所有内容。

在文章的 Markdown 文件中添加 `<!-- more -->` 标记，标记之前的部分会被当做文章摘要显示在首页（这个标记是 Hexo 的一个功能，与主题无关）。

> 当然，Stun 主题也提供了自动保留文章摘要的功能。详参见：[文章摘要](https://liuyib.github.io/hexo-theme-stun/zh-CN/guide/primary-setting.html#%E6%96%87%E7%AB%A0%E6%91%98%E8%A6%81)

## 各种控制台报错问题

- 主题版本升级之后，启动时控制台报错

  > 参见 issue：[版本升级之后控制台报错](https://github.com/liuyib/hexo-theme-stun/issues/33)

  如果你没有更新主题版本之前可以正常运行，更新之后控制台就会报错，那么这样的错误都是和**配置文件**相关，分为以下两种情况：

  - 你使用了[平滑升级](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/advanced-setting.html#%E5%B9%B3%E6%BB%91%E5%8D%87%E7%BA%A7)这一特性来备份配置文件

    由于主题在新的版本中**可能会**更改配置项（如果有更改，会在[版本发布的文档](https://github.com/liuyib/hexo-theme-stun/releases)中进行说明），你**必须**保持 `stun.yml` 和 主题的 `_config.yml` 里的配置项同步，否则就会出现报错。

  - 你通过修改主题的 `_config.yml` 文件来配置主题

    这种情况下，在升级主题版本之前，为了保留原来配置好的数据，你可能会将该文件复制一份，然后等版本更新之后再复制回去。

    这种做法正常情况下没有问题，但是如果主题在新的版本中更改了配置项，你的这种 “复制粘贴” 的做法会使得新的配置项被覆盖，从而引起报错。

- Hexo 版本更新后，启动时控制台报错

  当你更新 Hexo 版本后，使用 Stun 主题启动时控制台报错，这是因为 Stun 在较早的版本中，依赖于 `cheerio` 这个库，具体参见：[#25](https://github.com/liuyib/hexo-theme-stun/issues/25)，将主题版本更新到 `v1.6.0` 之后即可解决该问题。

## 使用或更换到 Stun 主题后运行出错

> 参考 issue：[初次使用 stun 运行不起来](https://github.com/liuyib/hexo-theme-stun/issues/2)

使用 Stun 主题并运行后，浏览器里显示**类似**如下信息：

`
extends ./_layout.pug block content include ./_partials/post/post-list.pug if theme.post_list.paginate.home include ./_partials/widgets/paginator.pug
`

原因是没有安装依赖 `hexo-renderer-pug`，在 Hexo 根目录执行下面这条指令，然后重启服务器即可：

```bash
$ npm install hexo-renderer-pug --save
```

## 文章解析的一些问题

- 代码高亮，无法识别 C# 代码

  > 参见 issue：[“代码高亮”无法识别C#代码](https://github.com/liuyib/hexo-theme-stun/issues/12)

- 无法渲染 LaTex 公式

  > 参见 issue：[MathJax 配置不成功，不进行渲染](https://github.com/liuyib/hexo-theme-stun/issues/6)

类似这种问题，都是因为 Markdown 渲染器引起的。Hexo 默认安装的 Markdown 渲染器是 `hexo-renderer-marked`，这个渲染器功能很少，已经满足不了大多数用户的需求，所以推荐将其卸载换成 `hexo-renderer-markdown-it-plus`。在 Hexo 根目录执行下面这些指令，然后重启服务器即可：

``` bash
# 卸载原来的渲染器
$ npm uninstall hexo-renderer-marked --save

# 安装新的渲染器
$ npm install hexo-renderer-markdown-it-plus --save
```

## 文章置顶失效

文章置顶功能依赖于 `hexo-generator-index-pin-top` 插件，并且需要将原有的 `hexo-generator-index` 插件卸载。如果你设置了文章置顶，但没有生效，很可能是因为没有卸载原有的插件。在 Hexo 根目录执行下面这条指令，然后重启服务器即可：

``` bash
$ npm uninstall hexo-generator-index --save
```

## 如何设置每次切换页面后，滚动到顶部大图下方

这个功能需要启用 Pjax 后才能使用。如果想设置这个功能，需要修改主题配置文件：

``` yaml
pjax:
  enable: true
  avoid_banner: true
```

> 注意：启用上述功能后，Pjax 的配置项 `scrollTo` 将失效。详参见：[启用 Pjax](https://liuyib.github.io/hexo-theme-stun/zh-CN/advanced/third-part.html#%E5%90%AF%E7%94%A8-pjax)

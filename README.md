<strong>警告：目前该项目年久失修，请尽量不要使用，建议使用一直处于维护状态的 [NexT](https://github.com/next-theme/hexo-theme-next) 主题，祝好</strong>

<p align="center">
  <a href="https://theme-stun.github.io/docs/zh-CN/" target="_blank" rel="noopener noreferrer">
    <img src="./source/images/icons/stun-logo.svg" alt="Stun Logo" width="100">
  </a>
</p>

<h3 align="center">一个漂亮、简洁的 Hexo 主题</h3>

<p align="center">
  <a href="http://standardjs.com" target="_blank" rel="noopener noreferrer">
    <img alt="js-standard-style" src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg">
  </a>
  <a href="http://commitizen.github.io/cz-cli/" target="_blank" rel="noopener noreferrer">
    <img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg">
  </a>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fliuyib%2Fhexo-theme-stun?ref=badge_shield">
    <img alt="FOSSA Status" src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fliuyib%2Fhexo-theme-stun.svg?type=shield"/>
  </a>
  <a href="https://depfu.com/github/liuyib/hexo-theme-stun?project_id=17221" target="_blank" rel="noopener noreferrer">
    <img alt="Dependencies status" src="https://badges.depfu.com/badges/c063484513939d540c95c0a824e5606f/count.svg">
  </a>
  <a href="https://github.com/liuyib/hexo-theme-stun/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">
    <img alt="GitHub LICENSE" src="https://img.shields.io/github/license/liuyib/hexo-theme-stun.svg">
  </a>
  <br>
  <a href="https://hexo.io/zh-cn/" target="_blank" rel="noopener noreferrer">
    <img alt="Hexo version" src="https://img.shields.io/badge/hexo-%3E%3D4.0-blue.svg">
  </a>
  <a href="https://github.com/liuyib/hexo-theme-stun/releases" target="_blank" rel="noopener noreferrer">
    <img alt="GitHub release" src="https://img.shields.io/github/release/liuyib/hexo-theme-stun.svg">
  </a>
  <a href="https://github.com/liuyib/hexo-theme-stun/discussions" target="_blank" rel="noopener noreferrer">
    <img alt="Github Discussions" src="https://img.shields.io/badge/Github-Discussions-4fb999.svg">
  </a>
</p>

语言: [English](https://github.com/liuyib/hexo-theme-stun/blob/master/README_en-US.md) | [中文简体](https://github.com/liuyib/hexo-theme-stun/blob/master/README.md)

## :sparkles: 演示

- [Liuyib's Blog](https://liuyib.github.io/)
- [Cheeks's Blog](https://www.cheeks.top/)
- [lingan1996's Blog](https://www.lingan1996.top)
- [MikyMing's Blog](https://mikyming.online/)
- [Gemini's Blog](https://geminiplanet.cn/)
- [TimeMachine's Blog](https://timemachine.icu/)

如果你准备长期使用 «Stun» 主题，并希望展示在这里，你只需在 [README](https://github.com/liuyib/hexo-theme-stun/edit/master/README.md) 中填入你的网站，然后提交 PR 即可。

## :crystal_ball: 特性

- 简洁 & 快速 & 易用 & **可定制性高**
- 响应式设计
- [二级导航菜单](https://theme-stun.github.io/docs/zh-CN/advanced/advanced.html#二级导航菜单)
- 支持[图片懒加载](https://theme-stun.github.io/docs/zh-CN/advanced/advanced.html#图片懒加载)
- 支持 [Pjax](https://github.com/defunkt/jquery-pjax)
- 支持 [PWA](https://developers.google.com/web/progressive-web-apps)
- 支持 [Fancybox](https://github.com/fancyapps/fancybox)
- 支持 [Quicklink](https://github.com/GoogleChromeLabs/quicklink)
- 支持 [MathJax](https://www.mathjax.org/)、[KaTex](https://katex.org/)
- 支持 [Gitalk](https://github.com/gitalk/gitalk)、[Valine](https://valine.js.org/)、[Livere](https://livere.com/)、[Disqus](https://disqus.com/)、[Utterances](https://github.com/utterance/utterances) 评论
- 瀑布流式的[相册页面](https://liuyib.github.io/gallery/)
- 内置[谷歌广告](https://www.google.cn/adsense/start/)，一键开启
- 代码高亮，[多种配色](https://theme-stun.github.io/docs/zh-CN/advanced/advanced.html#代码高亮)可选
- 好看的[背景特效](https://theme-stun.github.io/docs/zh-CN/advanced/third-part.html#ribbon)
- 超详细[配置文档](https://theme-stun.github.io/docs/zh-CN/)

## :package: 安装

- 安装 «Stun»

  进入 Hexo 根目录，执行指令：

  ```bash
  $ git clone https://github.com/liuyib/hexo-theme-stun.git themes/stun
  ```

  > 该指令会将本仓库中的所有文件克隆下来，其中有很多文件仅用于项目开发，对于普通用户来说完全用不到。因此，如果你想仅克隆主题运行所必需的文件，请用下面的指令代替上面的指令：
  >
  > ```bash
  > $ git clone -b dist https://github.com/liuyib/hexo-theme-stun.git themes/stun
  > ```
  >
  > 注意：这样做不方便以后更新，请谨慎使用。

- 安装依赖 `hexo-renderer-pug`

  进入 Hexo 根目录，执行指令：

  ```bash
  $ npm install --save hexo-renderer-pug
  ```

## :hammer: 使用

修改 Hexo 根目录下的 `_config.yml` 文件：

```yml
theme: stun
```

然后，启动 Hexo 服务器：

```bash
$ hexo clean && hexo s
```

## :art: 更新

```bash
$ cd themes/stun

$ git pull
```

## :page_facing_up: 文档

请查看：[https://theme-stun.github.io/docs/zh-CN/](https://theme-stun.github.io/docs/zh-CN/)

## :question: 问题

如果遇到问题，首先请仔细阅读[文档](https://theme-stun.github.io/docs/zh-CN/)，或者查看[常见问题](https://github.com/liuyib/hexo-theme-stun/blob/master/FAQ.md)。当以上的方法都无法帮助你时，再去提出 `issue`:hugs:。

## :handshake: 贡献

在提出 Pull request 之前，请务必先阅读[贡献指南](https://theme-stun.github.io/docs/zh-CN/contribute/contribute.html)。

感谢所有为 «Stun» 做出贡献的人！

<a href="https://github.com/liuyib/hexo-theme-stun/graphs/contributors">
  <img src="https://opencollective.com/hexo-theme-stun/contributors.svg?width=980">
</a>

## :computer: 浏览器支持

| <img src="https://raw.githubusercontent.com/liuyib/picBed/master/collection/20190723235410.png" alt="IE" width="32px" height="32px" /></br> IE | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/edge/edge_64x64.png" alt="Edge" width="32px" height="32px" /></br> Edge | <img src="https://raw.githubusercontent.com/liuyib/picBed/master/collection/20190723235406.png" alt="Firefox" width="32px" height="32px" /></br> Firefox | <img src="https://raw.githubusercontent.com/liuyib/picBed/master/collection/20190723235407.png" alt="Chrome" width="32px" height="32px" /></br> Chrome | <img src="https://raw.githubusercontent.com/liuyib/picBed/master/collection/20190723235409.png" alt="Safari" width="32px" height="32px" /></br> Safari | <img src="https://raw.githubusercontent.com/liuyib/picBed/master/collection/20190723235411.png" alt="Opera" width="32px" height="32px" /></br> Opera |
| :---: | :---: | :---: |:---: | :---: | :---: |
| Not Supported | 12+ | 41+ | 45+ | 10+ | 32+ |

## :star: Star 历史趋势

[![Stargazers over time](https://starchart.cc/liuyib/hexo-theme-stun.svg)](https://starchart.cc/liuyib/hexo-theme-stun.svg)

## :page_with_curl: 开源协议

[MIT](https://github.com/liuyib/hexo-theme-stun/blob/master/LICENSE) Copyright (c) 2019-present liuyib

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fliuyib%2Fhexo-theme-stun.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fliuyib%2Fhexo-theme-stun?ref=badge_large)

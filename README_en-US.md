<strong>WARNING: The project is deprecated, please do not use it. You can try [NexT](https://github.com/next-theme/hexo-theme-next) that is maintains actively, good luck.</strong>

<p align="center">
  <a href="https://theme-stun.github.io/docs/" target="_blank" rel="noopener noreferrer">
    <img src="./source/images/icons/stun-logo.svg" alt="Stun Logo" width="100">
  </a>
</p>

<h3 align="center">A beautiful & simple theme for Hexo</h3>

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

Language: [English](https://github.com/liuyib/hexo-theme-stun/blob/master/README_en-US.md) | [中文简体](https://github.com/liuyib/hexo-theme-stun/blob/master/README.md)

## :sparkles: Demo

- [Liuyib's Blog](https://liuyib.github.io/)
- [Cheeks's Blog](https://www.cheeks.top/)
- [lingan1996's Blog](https://www.lingan1996.top)
- [MikyMing's Blog](https://mikyming.online/)
- [Gemini's Blog](https://geminiplanet.cn/)
- [TimeMachine's Blog](https://timemachine.icu/)

If you plan to use «Stun» theme for a long time and want to show it here, you just need to modify the [README_en-US](https://github.com/liuyib/hexo-theme-stun/edit/master/README_en-US.md) to fill in your website and submit PR.

## :crystal_ball: Feature

- Simple & Fast & Easy to Use & **Highly Customizable**
- Responsive design
- [Secondary navigation menu](https://theme-stun.github.io/docs/zh-CN/advanced/advanced.html#二级导航菜单)
- Support [image lazy loading](https://theme-stun.github.io/docs/zh-CN/advanced/advanced.html#图片懒加载)
- Support [Pjax](https://github.com/defunkt/jquery-pjax)
- Support [PWA](https://developers.google.com/web/progressive-web-apps)
- Support [Fancybox](https://github.com/fancyapps/fancybox)
- Support [Quicklink](https://github.com/GoogleChromeLabs/quicklink)
- Support [MathJax](https://www.mathjax.org/)、[KaTex](https://katex.org/)
- Support [Gitalk](https://github.com/gitalk/gitalk)、[Valine](https://valine.js.org/)、[Livere](https://livere.com/)、[Disqus](https://disqus.com/)、[Utterances](https://github.com/utterance/utterances) comments
- [Album page](https://liuyib.github.io/gallery/) of waterfall streaming
- Built-in [Google ads](https://www.google.cn/adsense/start/)
- Multiple code [highlighting themes](https://theme-stun.github.io/docs/zh-CN/advanced/advanced.html#代码高亮)
- Beautiful [background effects](https://theme-stun.github.io/docs/zh-CN/advanced/third-part.html#ribbon)
- Detailed [documentation](https://theme-stun.github.io/docs/)

## :package: Install

- Install `Stun`

  Enter your hexo directory, run this:

  ```bash
  $ git clone https://github.com/liuyib/hexo-theme-stun.git themes/stun
  ```

  > This command will clone all the files in this repository, many of which are only used for project development and are not used by ordinary users at all. Therefore, if you want to clone only the files necessary for the theme to run, please use the following command instead of the above command:
  >
  > ```bash
  > $ git clone -b dist https://github.com/liuyib/hexo-theme-stun.git themes/stun
  > ```
  >
  > Note: It is not convenient to update in the future, please use with caution.

- Install dependency `hexo-renderer-pug`

  Enter your hexo directory, run this:

  ```bash
  $ npm install --save hexo-renderer-pug
  ```

## :hammer: Usage

Change the `_config.yml` file in your hexo root directory:

```yml
theme: stun
```

Run your hexo server:

```bash
$ hexo clean && hexo s
```

## :art: Update

```bash
$ cd themes/stun

$ git pull
```

## :page_facing_up: Documentation

Please see: [https://theme-stun.github.io/docs/](https://theme-stun.github.io/docs/)

## :question: Question

If you have problems, please read [documentation](https://theme-stun.github.io/docs/) firstly, or check [FAQ](https://github.com/liuyib/hexo-theme-stun/blob/master/FAQ.md). You can open an `issue` when the above methods can't help you :hugs:.

## :handshake: Contribution

Please make sure to read the [Contributing Guide](https://theme-stun.github.io/docs/contribute/contribute.html) before making a pull request.

Thank you to all the people who have already contributed to «Stun»!

<a href="https://github.com/liuyib/hexo-theme-stun/graphs/contributors">
  <img src="https://opencollective.com/hexo-theme-stun/contributors.svg?width=980">
</a>

## :computer: Browser Support

| <img src="https://raw.githubusercontent.com/liuyib/picBed/master/collection/20190723235410.png" alt="IE" width="32px" height="32px" /></br> IE | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/edge/edge_64x64.png" alt="Edge" width="32px" height="32px" /></br> Edge | <img src="https://raw.githubusercontent.com/liuyib/picBed/master/collection/20190723235406.png" alt="Firefox" width="32px" height="32px" /></br> Firefox | <img src="https://raw.githubusercontent.com/liuyib/picBed/master/collection/20190723235407.png" alt="Chrome" width="32px" height="32px" /></br> Chrome | <img src="https://raw.githubusercontent.com/liuyib/picBed/master/collection/20190723235409.png" alt="Safari" width="32px" height="32px" /></br> Safari | <img src="https://raw.githubusercontent.com/liuyib/picBed/master/collection/20190723235411.png" alt="Opera" width="32px" height="32px" /></br> Opera |
| :--------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                 Not Supported                                                                  |                                                                      12+                                                                      |                                                                           41+                                                                            |                                                                          45+                                                                           |                                                                          10+                                                                           |                                                                         32+                                                                          |

## :star: Trend of Star

[![Stargazers over time](https://starchart.cc/liuyib/hexo-theme-stun.svg)](https://starchart.cc/liuyib/hexo-theme-stun.svg)

## :page_with_curl: License

[MIT](https://github.com/liuyib/hexo-theme-stun/blob/master/LICENSE) Copyright (c) 2019-present liuyib

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fliuyib%2Fhexo-theme-stun.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fliuyib%2Fhexo-theme-stun?ref=badge_large)

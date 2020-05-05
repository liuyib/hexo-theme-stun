# 优化建议

## 打包、压缩资源文件 <Badge text="Disrelated" type="warning"/>

::: danger
由于我在使用过程中，发现了该插件的很多问题，例如：[#93](https://github.com/chenzhutian/hexo-all-minifier/issues/93)，所以暂时不再推荐使用！
:::

Stun 主题的源码中，`HTML`, `CSS`, `JavaScript`, `图片` 等资源文件是没有打包压缩的。绝大部分的 Hexo 主题也是如此。庆幸的是，可以找到相关的插件来解决这一问题。

这里可以使用 [hexo-all-minifier](https://github.com/chenzhutian/hexo-all-minifier) 插件，它集成了 `html-minifier`, `clean-css`, `uglify` 和 `imagemin`，只需安装和简单的配置即可使用。

- 安装

  在 Hexo 根目录下执行指令。

  > 一定要在 Git Bash 中执行，在 Window 的 PowerShell 或 CMD 中执行可能会失败。建议养成在 Git Bash 中执行 npm 指令的好习惯！

  ``` bash
  $ npm install hexo-all-minifier --save
  ```

  如果是 Mac 用户，你还需要执行下面的指令。

  ``` bash
  $ brew install libtool automake autoconf nasm
  ```

- 使用

  在 Hexo 根目录下的 `_config.yml` 文件中，添加以下字段即可使用。

  ``` yaml
  all_minifier: true
  ```

如果你使用插件时**遇到了问题** 或者 想进行**更详细的设置**，请查看插件的[文档](https://github.com/chenzhutian/hexo-all-minifier/blob/master/README.md)。

> ~~安装这个插件后，不管使用哪一个主题，都可以生效，所以强烈推荐使用。~~

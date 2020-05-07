# 贡献准则 <!-- omit in toc -->

<div align="center" style="color: #73c8ff;font-size: 36px;"><a title="Go to homepage" href="https://github.com/liuyib/hexo-theme-stun"><img align="center" width="60" height="60" src="https://raw.githubusercontent.com/liuyib/hexo-theme-stun/master/source/images/icons/stun-logo.svg?sanitize=true"></a> t u n</div>

嗨！我很高兴您有兴趣为 «Stun» 做贡献。在进行贡献之前，请务必花一些时间通读以下准则：

- [Pull request 准则](#pull-request-%e5%87%86%e5%88%99)
- [开发之前的准备](#%e5%bc%80%e5%8f%91%e4%b9%8b%e5%89%8d%e7%9a%84%e5%87%86%e5%a4%87)
- [提交信息规范](#%e6%8f%90%e4%ba%a4%e4%bf%a1%e6%81%af%e8%a7%84%e8%8c%83)

## Pull request 准则

要知道，`master` 分支只是最新稳定版本的一个快照。所有的开发都应该在专门的分支中进行，**不要向 `master` 分支提交 PRs**。

- 将仓库 fork 到你的 Github，并 clone 到本地
- 切换到**新分支**（例如 `patch-1`）上开发
- 将本地修改进行提交（如果你修改了源代码，请执行 `npm run lint:fix`）
- 将提交 push 到 fork 的仓库下
- 创建一个 Pull request 到 Stun 主题仓库的 **dev 分支**

## 开发之前的准备

你需要安装 [Node.js](http://nodejs.org/) 和 [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)。

在 clone 该仓库后，执行:

```bash
$ npm install
```

## 提交信息规范

我们对项目的 git 提交信息格式进行统一格式约定，每条提交信息由 `type` + `subject` 组成，这将提升项目日志的可读性。

- `type` 用于描述此次提交信息的意义，全小写，仅包括如下类型：
  - `feat`：新功能
  - `fix`：Bug 修复
  - `refactor`：重构（既不是新增功能，也不是修改 Bug 的代码变动）
  - `docs`：文档变化
  - `style`：代码格式变化（空格、缩进、换行、分号等）
  - `test`：代码测试相关
  - `chore`：基础构建工具或依赖库的变化（不涉及源码）
  - `revert`：代码回滚（回退已经存在的 `commit`）
- `subject` 用于简要描述修改变更的内容，如 `Update quick start in readme.md`
  - 句尾不要使用符号
  - 使用现在时、祈使句语气

<!-- omit in toc -->
## 贡献人员

感谢所有为 «Stun» 做出贡献的人！

<a href="https://github.com/liuyib/hexo-theme-stun/graphs/contributors">
  <img src="https://opencollective.com/hexo-theme-stun/contributors.svg?width=980">
</a>

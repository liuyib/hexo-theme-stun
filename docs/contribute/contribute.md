# Contribution <!-- omit in toc -->

<div align="center" style="color: #73c8ff;font-size: 36px;"><a title="Go to homepage" href="https://github.com/liuyib/hexo-theme-stun"><img align="center" width="60" height="60" src="https://raw.githubusercontent.com/liuyib/hexo-theme-stun/master/source/images/icons/stun-logo.svg?sanitize=true"></a> t u n</div>

Hi! I'm really excited that you are interested in contributing to «Stun». Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
- [Commit Messages Rules](#commit-messages-rules)

## Pull Request Guidelines

The `master` branch is just a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch**.

- Fork the repository to your Github and clone it.
- Switch to a **new branch** (e.g. `patch-1`) to develop.
- Submit changes locally (If you modified source code, please run `npm run lint:fix`).
- Push the commit to the repository of fork.
- Create a Pull request to the **dev branch** of the Stun theme repository.

## Development Setup

You need to install [Node.js](http://nodejs.org/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

After cloning the repo, run:

```bash
$ npm install
```

## Commit Messages Rules

We agree on the format of Git commit information, and each commit information is composed of `type` + `subject`, which will improve the readability of the project log.

- `type` Describes the meaning of this submission, all lowercase, including only the following types:
  - `feat`: A new feature
  - `fix`: A bug fix
  - `refactor`: A code change that neither adds a feature nor fixes a bug
  - `docs`: Documentation only changes
  - `style`: Code format changes (white-space, indentation, line breaks, semicolons, etc.)
  - `test`: Code test correlation
  - `chore`: Changes to basic build tools or dependent libraries (no source code involved)
  - `revert`: Revert some existing commits
- `subject` contains a succinct description of the change, like `Update quick start in readme.md`
  - No dot (`.`) at the end
  - Use the imperative, present tense ("change" not "changed" nor "changes")

<!-- omit in toc -->
## Contributors

Thank you to all the people who have already contributed to «Stun»!

<a href="https://github.com/liuyib/hexo-theme-stun/graphs/contributors">
  <img src="https://opencollective.com/hexo-theme-stun/contributors.svg?width=980">
</a>

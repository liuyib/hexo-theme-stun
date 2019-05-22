module.exports = {
  scopes: [],
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  types: [
    {
      value: 'feat',
      name : '✨  feat:        A new feature'
    },
    {
      value: 'fix',
      name : '🐞  fix:         A bug fix'
    },
    {
      value: 'refactor',
      name : '🔨  refactor:    A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'docs',
      name : '📚  docs:        Documentation only changes'
    },
    {
      value: 'style',
      name : '🎨  style:       Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
    },
    {
      value: 'test',
      name : '✅  test:        Add missing tests or correcting existing tests'
    },
    {
      value: 'chore',
      name : '📦  chore:       Other changes that don\'t modify src or test files. Such as updating build tasks, package manager'
    },
    {
      value: 'revert',
      name:  '⏪  revert:      Revert to a commit'
    }
  ]
};

module.exports = {
  scopes: [],
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  types: [
    {
      value: 'feat',
      name : 'feat:        A new feature'
    },
    {
      value: 'fix',
      name : 'fix:         A bug fix'
    },
    {
      value: 'pref',
      name: 'pref:        A code change that improves performance',
    },
    {
      value: 'refactor',
      name : 'refactor:    A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'test',
      name : 'test:        Add missing tests or correcting existing tests'
    },
    {
      value: 'style',
      name : 'style:       Changes that do not affect the meaning of the code \n               (white-space, formatting, missing semi-colons, etc)'
    },
    {
      value: 'ci',
      name: 'ci:          Add or Modify the configuration of Continuous Integration(CI)',
    },
    {
      value: 'docs',
      name : 'docs:        Documentation only changes'
    },
    {
      value: 'chore',
      name : 'chore:       Other changes that don\'t modify src or test files. Such as updating build tasks, package manager'
    },
    {
      value: 'revert',
      name:  'revert:      Revert to a commit'
    }
  ]
};

module.exports = {
  title: 'hexo-theme-stun',
  description: 'A beautiful & simple theme for Hexo',
  head: [
    ['link', { rel: 'icon', href: '/icons/favicon-32x32.png' }],
  ],
  base: '/hexo-theme-stun/',
  serviceWorker: false,
  locales: {
    '/': {
      lang: 'en-US',
      title: 'hexo-theme-stun',
      description: 'A beautiful & simple theme for Hexo',
    },
    '/zh-CN/': {
      lang: 'zh-CN',
      title: 'hexo-theme-stun',
      description: '一个漂亮、简洁的 Hexo 主题',
    },
  },
  themeConfig: {
    repo: 'liuyib/hexo-theme-stun',
    logo: '/icons/favicon-192x192.png',
    editLinks: true,
    // 如果你的文档不在仓库的根部，请指定 docsRepo 元字符
    docsDir: 'docs',
    docsBranch: 'master',
    sidebarDepth: 3,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        sidebar: {
          '/': [
            {
              title: 'Guide',
              collapsable: false,
              children: [
                '/guide/quick-start',
                '/guide/primary',
              ],
            },
            {
              title: 'Advanced',
              collapsable: false,
              children: [
                '/advanced/advanced',
                '/advanced/third-part',
                '/advanced/assist',
                '/advanced/optimize',
              ],
            },
            {
              title: 'Contribution',
              collapsable: false,
              children: [
                '/contribute/contribute',
              ],
            },
          ],
        },
        nav: [
          {
            text: 'Guide',
            items: [
              {
                text: 'Quick start',
                link: '/guide/quick-start',
              },
              {
                text: 'Primary setting',
                link: '/guide/primary',
              },
            ],
          },
          {
            text: 'Advanced',
            items: [
              {
                text: 'Advanced setting',
                link: '/advanced/advanced',
              },
              {
                text: 'Third part',
                link: '/advanced/third-part',
              },
              {
                text: 'Assist function',
                link: '/advanced/assist',
              },
              {
                text: 'Optimization',
                link: '/advanced/optimize',
              },
            ],
          },
          {
            text: 'Contribute',
            link: '/contribute/contribute',
          },
        ],
      },
      '/zh-CN/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新"
          }
        },
        sidebar: {
          '/zh-CN/': [
            {
              title: '配置指南',
              collapsable: false,
              children: [
                '/zh-CN/guide/quick-start',
                '/zh-CN/guide/primary',
              ],
            },
            {
              title: '高级设置',
              collapsable: false,
              children: [
                '/zh-CN/advanced/advanced',
                '/zh-CN/advanced/third-part',
                '/zh-CN/advanced/assist',
                '/zh-CN/advanced/optimize',
              ],
            },
            {
              title: '参与贡献',
              collapsable: false,
              children: [
                '/zh-CN/contribute/contribute',
              ],
            },
          ],
        },
        nav: [
          {
            text: '配置指南',
            items: [
              {
                text: '快速开始',
                link: '/zh-CN/guide/quick-start',
              },
              {
                text: '新手上路',
                link: '/zh-CN/guide/primary',
              },
            ],
          },
          {
            text: '高级设置',
            items: [
              {
                text: '新手进阶',
                link: '/zh-CN/advanced/advanced',
              },
              {
                text: '第三方支持',
                link: '/zh-CN/advanced/third-part',
              },
              {
                text: '辅助功能',
                link: '/zh-CN/advanced/assist',
              },
              {
                text: '优化建议',
                link: '/zh-CN/advanced/optimize',
              },
            ],
          },
          {
            text: '参与贡献',
            link: '/zh-CN/contribute/contribute',
          },
        ],
      },
    },
  },
};

module.exports = {
  title: 'hexo-theme-stun',
  description: 'A beautiful & simple theme for Hexo',
  base: '/hexo-theme-stun/',
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
  head: [
    ['link', { rel: 'icon', href: `/stun-logo.ico` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  themeConfig: {
    repo: 'liuyib/hexo-theme-stun',
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
          '/': getEnSidebar('guide'),
        },
        nav: [
          {
            text: 'Guide',
            link: '/guide/',
          },
          {
            text: 'Advanced',
            items: [
              {
                text: 'Theme Config',
                link: '/advanced/theme-config',
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
          '/zh-CN/': getZhSidebar('指南'),
        },
        nav: [
          {
            text: '指南',
            link: '/zh-CN/guide/',
          },
          {
            text: '高级设置',
            items: [
              {
                text: '主题配置',
                link: '/zh-CN/advanced/theme-config',
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
        ],
      },
    },
  },
};

function getEnSidebar(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '/guide/',
        '/advanced/theme-config',
        '/advanced/third-part',
        '/advanced/assist',
        '/advanced/optimize',
      ],
    },
  ];
}

function getZhSidebar(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '/zh-CN/guide/',
        '/zh-CN/advanced/theme-config',
        '/zh-CN/advanced/third-part',
        '/zh-CN/advanced/assist',
        '/zh-CN/advanced/optimize',
      ],
    },
  ];
}

这里收录使用 `hexo-theme-stun` 中一些常见的问题。很多是没有阅读文档或阅读文档不仔细导致的。所以建议养成阅读文档，查找已有的 issue 后，再提问的习惯。

## 常见问题

### 使用 `stun` 主题后运行不起来。

> 参考 `issue`：[初次使用 stun 运行不起来](https://github.com/liuyib/hexo-theme-stun/issues/2)

使用 `stun` 主题运行后，浏览器里显示：

`
n/layout.pug block content include ./_mixins/posts-sort.pug include ./_mixins/post-header.pug div.home-content.code-highlight if theme.post_list_paged.home include ./_components/recent-posts.pug include ./_components/pagination.pug else include ./_components/recent-posts.pug
`

原因是没有安装对 `pug` 的支持。文档和 READMD 都有提到：

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/FAQ/20190629092535.png)

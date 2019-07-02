# 第三方支持

::: tip 期待 stun 变得更好
第三方支持正在不断加入中 (๑•̀ㅂ•́)و✧
:::

## 评论系统

### Gitment <Badge text="stable"/>

你首先需要获取 你的 OAuth 应用的 client ID 和 client secret。获取方法请看 [Gitment 的说明文档](https://github.com/imsun/gitment#2-register-an-oauth-application)。

然后修改 `stun.yml`：

``` yaml
# https://github.com/imsun/gitment
gitment:
  enable: false
  # Github 用户名
  owner: 
  # Github 仓库名（可以是任意一个公开的 Github 仓库）
  repo: 
  client_id: 
  client_secret: 
  # 是否启用懒加载（如果启用，只有手动点击显示按钮才会显示评论；否则，始终显示评论）
  lazy: false
```

## 统计与分析

### 卜蒜子统计 <Badge text="stable"/>

``` yaml
busuanzi:
  enable: true
  site:
    # 是否只显示图标
    icon_only: false
    # 统计站点 UV 数量
    # 关于 UV 和 PV 的概念：https://zhuanlan.zhihu.com/p/27672009
    uv:
      enable: true
      # FontAwesome 图标名称: https://fontawesome.com/v4.7.0/icons/
      icon: user
    # 统计站点 PV 数量
    pv:
      enable: true
      # FontAwesome 图标名称
      icon: eye
  # 统计每篇文章的 PV 数量
  post_pv:
    # 是否只显示图标
    icon_only: false
    enable: true
    # FontAwesome 图标名称
    icon: eye
```
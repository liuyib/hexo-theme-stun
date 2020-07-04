# 第三方支持

## PWA <Badge text="Stable"/> <Badge text="v1.2.2"/>

如果你想要使网站支持 PWA 特性，需要安装插件 [hexo-pwa](https://github.com/lavas-project/hexo-pwa)。该插件可以使你的网站具有以下功能：

- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) - 用户可以将您的站点添加到桌面上。
- [Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers/) - 让您的网站中，已访问过的页面离线可用。

::: warning
您的博客必须全站支持 HTTPS，这是使用 PWA 的前提条件。
:::

使用步骤如下：

1. 安装插件

   ```bash
   $ npm install hexo-pwa --save
   ```

2. 配置插件

   找到 Hexo 根目录下的 `_config.yml` 文件，添加以下字段：

   ```yaml
   pwa:
     manifest:
       # Manifest 文件名和路径
       path: /manifest.json
     serviceWorker:
       # Service Worker 的文件名和路径
       path: /sw.js
       # 在 xxx 路径下，预加载的文章数
       preload:
         urls:
           - /
         posts: 5
       # 有关以下配置项，具体请查看：https://googlechromelabs.github.io/sw-toolbox/api.html#options
       opts:
         # 网络请求超时自动返回到缓存过的响应的时间
         networkTimeoutSeconds: 5
       routes:
         # 缓存你的静态资源，例如你使用了 webp 格式的图片，将其添加进来
         - pattern: !!js/regexp /.*\.(js|css|html|jpg|jpeg|png|svg|gif|json|xml|eot|ttf|woff|woff2)$/
           # 缓存策略，可选值：cacheFirst, networkFirst, cacheOnly, networkOnly, fastest
           # 每个值的具体含义请查看：https://googlechromelabs.github.io/sw-toolbox/api.html#handlers
           strategy: cacheFirst
         - pattern: !!js/regexp /\//
           strategy: networkFirst
         # 如果你想缓存 CDN 资源，请像下面这样进行设置
         - pattern: !!js/regexp /cdn.jsdelivr.net/
           strategy: cacheFirst
     # Hexo 插件的执行优先级（一般不用修改）
     priority: 5
   ```

   上面的配置中，引用了 `manifest.json` 和 `sw.js` 文件。其中 `sw.js` 文件是 `hexo-pwa` 插件自动生成的。`manifest.json` 文件需要用户手动创建。

3. 创建 `manifest.json` 文件

   你可以借助 [Web App Manifest](https://app-manifest.firebaseapp.com/) 网站来快速生成 `manifest.json` 文件，生成的文件内容如下所示：

   ```json
   {
     // 应用全称。例如：liuyib's blog
     "name": "xxx",
     // 应用简称。例如：liuyib
     "short_name": "xxx",
     // 定义首次启动时要打开哪个页面
     "start_url": "/",
     // 应用的显示模式。详见：https://developer.mozilla.org/zh-CN/docs/Web/Manifest#display
     "display": "standalone",
     // 匹配浏览器的地址栏颜色
     "theme_color": "#ffffff",
     // 加载应用时的开屏背景色
     "background_color": "#ffffff",
     // 指定图标参数，用来适配不同设备
     // ！！！至少提供 192x192px 图标和 512x512px 图标 ！！！
     "icons": [
       {
         "src": "images/icons/favicon-192x192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "images/icons/favicon-512x512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ]
   }
   ```

   你需要将 `manifest.json` 文件放在 Hexo 根目录下的 source 文件夹中。

4. 修改主题配置文件

   ```yaml
   pwa:
     enable: true
     # manifest 文件的路径
     manifest: /manifest.json
     # 浏览器导航栏的背景颜色（只在安装的 PWA 离线应用中生效）
     theme_color: "#ffffff"
   ```

5. 重启 Hexo 服务器

   ```bash
   $ hexo clean && hexo s
   ```

::: warning
如果你不想使用 `hexo-pwa` 插件，那么你需要自己编写 `sw.js` 文件的相关代码，并在主题的模板文件（`.pug`）中，所有的页面里引入你的 `sw.js` 文件。`manifest.json` 文件的创建方法和放置位置同上。
:::

::: danger
`hexo-pwa` 插件的 `0.1.3` 及以下的版本，不兼容 Hexo `4.2.0` 版本。因此如果你使用了该插件，并且 Hexo 版本升级到了 `v4.2.0`，会遇到启动 Hexo 服务时报错的问题。
:::

## 启用 Quicklink <Badge text="Stable"/> <Badge text="v1.2.3"/>

如果想要使用 [quicklink](https://github.com/GoogleChromeLabs/quicklink/)，使浏览器在空闲时间预取可视区内的链接，以加快后续页面的加载速度。你需要按照如下步骤设置：

1. 修改主题配置文件

   ```yaml
   quicklink:
     # 是否启用。这里启用之后并不会对所有页面生效，你还需要进行下面的设置
     enable: true
     # 设置 home 页面和 archive 页面是否启用
     home: true
     archive: true
     # 当浏览器 DOMContentLoaded 事件触发后，开始初始化 quicklink
     delay: true
     # requestIdleCallback 超时时间（浏览器执行预取的时间（以毫秒为单位））
     timeout: 10000
     # 启用 fetch() 或回退到 XHR
     priority: true
     # 设置忽略预取的链接类型
     # ！！如果你不了解如何使用，请忽略这一项（默认即可）！！
     ignores:
       - /\/api\/?/
       - uri => uri.includes('.xml')
       - uri => uri.includes('.zip')
       - (uri, el) => el.hasAttribute('nofollow')
       - (uri, el) => el.hasAttribute('noprefetch')
   ```

2. 添加 Front-Matter

   上一步只是设置了 home 页面和 archive 页面是否启用 quicklink，对于其他页面或文章，你必须手动在页面或文章的 Markdown 文件的 Front-Matter 中，添加 `quicklink: true`。例如：

   ```md
   ---
   title: hello stun
   tags:
     - hello stun
   quicklink: true
   ---
   ```

## 启用 Pjax <Badge text="Stable"/> <Badge text="v1.4.0"/>

启用 Pjax 可以让你的博客在页面之间跳转时，只进行局部刷新。这样不仅可以改善用户浏览体验，更能提高页面的加载速度。如果想启用这一功能，你需要修改主题配置文件：

```yaml
pjax:
  enable: true
  # 是否在切换页面时，滚动到顶部大图的底部
  avoid_banner: false
  # ！！如果你不了解如何使用，请忽略下面的配置项（默认即可）！！
  # 下面配置项的用法，请参见: https://github.com/MoOx/pjax/#options
  elements:
  selectors:
  switches:
  switchesOptions:
  history: true
  # 如果启用这个配置项，必须设置 `avoid_banner: false`
  scrollTo: false
  scrollRestoration: false
  cacheBust: false
  debug: false
  currentUrlFullReload: false
  timeout: 0
```

::: warning 已知问题
- 不兼容 MathJax（必须手动刷新页面一次后，MathJax 才能正常使用（KaTex 可以正常使用））。
- 有些 JS、CSS 文件只会在特定的页面加载，如果启用了 Pjax，则会在所有页面加载。
:::

## 添加 Emoji 支持 <Badge text="Disrelated" type="warning"/>

如果想要使用 Emoji，你可以直接在[这里](http://emojihomepage.com/)复制粘贴使用。

如果你更喜欢使用 Emoji 代码，例如：将 `:sparkles:` 解析为 :sparkles:, 那么你需要安装插件 [hexo-filter-github-emojis](https://github.com/crimx/hexo-filter-github-emojis) 来支持这种语法。

使用步骤如下：

1. 安装插件

   在 Hexo 根目录下，执行指令：

   ```bash
   $ npm install hexo-filter-github-emojis --save
   ```

2. 重启 Hexo 服务器

   ```bash
   $ hexo clean && hexo s
   ```

如果你不喜欢 `::` 的语法，你可以使用下面这种方法代替：

```
{% github_emoji sparkles %}
```

如果你需要某个 Markdown 文件不解析这种语法，可以在 Markdown 文件里的 `front-matter` 中，设置 `no-emoji: true`，这样 `::` 会保持原来的样子。例如：

```md
---
title: hello stun
tags:
  - hello stun
no-emoji: true
---
```

有关该插件的更详尽的用法，请自行查阅其[文档](https://github.com/crimx/hexo-filter-github-emojis)。查看所有支持的 Emoji 请访问：[Github Emojis API](https://api.github.com/emojis) 或者 [Emoji Cheat Sheet](http://www.webpagefx.com/tools/emoji-cheat-sheet/)。

> 你也可以通过更换 Markdown 渲染器 `hexo-renderer-markdown-it-plus` 来支持 Emoji。详见：[https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus](https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus)。

## 评论系统

### Gitalk <Badge text="Stable"/> <Badge text="v1.1.0"/>

Gitalk 是一个基于 Github issues 的评论系统。使用之前需要确保你指定的 Github 仓库是公开的，并开启了 issues 功能。

首先，你需要注册一个新的 **GitHub Application** 来授权，点击[这里](https://github.com/settings/applications/new)注册。这样可以获取所需的 `client ID` 和 `client secret`。

::: warning
注册 GitHub Application 时，必须在 `Authorization callback URL` 字段中指定网站的 URL。
:::

```yaml
gitalk:
  # 是否启用
  enable: false
  # Github 用户名
  owner:
  # Github 仓库名（需要是公开的仓库）
  repo:
  # Github 应用程序客户端 ID
  client_id:
  # Github 应用程序客户端密钥
  client_secret:
  # GitHub 仓库所有者和合作者，只有这些人可以初始化 Gitalk
  admin:
  # 类似于 B 站的关灯模式
  distraction_free_mode: true
  # 如果你想让每一个参观你网站的人看到统一的语言，你可以在这里设置，
  # 可选值：en, zh-CN, es-ES, fr, ru, zh-TW
  language:
```

如果你遇到了问题，请查看 Gitalk 的文档：[https://github.com/gitalk/gitalk](https://github.com/gitalk/gitalk)。

### Valine <Badge text="Stable"/> <Badge text="v1.1.1"/>

Valine 评论系统依赖于 LeanCloud，所以你需要[登录](https://leancloud.cn/dashboard/login.html#/signin)或[注册](https://leancloud.cn/dashboard/login.html#/signup) LeanCloud，获取 `APP ID` 和 `APP Key`。详细步骤，请查看：[https://valine.js.org/quickstart.html](https://valine.js.org/quickstart.html)。

```yaml
valine:
  enable: false
  # 你的 LeanCloud app appid
  appid:
  # 你的 LeanCloud app appkey
  appkey:
  # 是否启用评论回复邮件提醒
  notify: true
  # 是否启用评论验证码
  verify: true
  # 评论框占位提示符
  placeholder: Just go go
  # Gravatar 头像展示方式
  avatar: mp
  # 评论者相关属性（默认：昵称、邮件、网址）
  meta: nick,mail,link
  # 评论列表分页，每页条数
  pageSize: 10
  # 是否启用文章访问量统计
  visitor: false
  # 是否记录评论者IP
  recordIP: false
  # 多语言支持，可选值：zh-cn, en
  language:
```

完成上述步骤之后，你还需要在 LeanCloud 中新建 或 选择一个名为 `Comment` 的 Class 才能使用 Valine。详细步骤，请查看：[https://valine.js.org/quickstart.html#评论数据管理](https://valine.js.org/quickstart.html#评论数据管理)。

### Livere（来必力）<Badge text="Stable"/> <Badge text="v1.1.1"/>

进入来必力[官网](https://livere.com/)注册账号，登录，点击安装，选择合适的版本后，会显示安装代码，在代码中可以找到你的 `uid`，例如：

```html
<div id="lv-container" data-id="city" data-uid="这里是你的 uid"></div>
```

然后将 `uid` 填入主题的配置文件即可：

```yaml
livere:
  enable: false
  uid:
```

### Disqus <Badge text="Stable"/> <Badge text="v1.1.1"/>

进入 Disqus [官网](https://disqus.com/)注册账号，登录，点击 `I want to install Disqus on my site`，在 `Website Name` 字段中，输入你的网站的名称（可以是任意的），然后选择好 `Category` 和 `Language` 字段后，点击 `Create Site`。

这里输入的网站名称，就是你的 `shortname`，将其填入主题的配置文件即可：

```yaml
disqus:
  enable: false
  shortname:
  # 是否显示文章的评论数
  count: true
```

### Utterances <Badge text="Stable"/> <Badge text="v1.6.0"/>

Utterances 是一个基于 Github issues 的评论系统。使用之前需要确保你指定的 Github 仓库是公开的，并开启了 issues 功能。

首先，将 [utterances app](https://github.com/apps/utterances) 安装在了你的 Github 仓库中。然后，修改以下配置项（如果你不想麻烦，只需设置 `owner` 和 `repo` 即可正常使用）：

```yaml
utterances:
  # 是否启用
  enable: false
  # Github 用户名
  owner:
  # Github 仓库名（需要是公开的仓库）
  repo:
  # 选择 GitHub issues 和博客文章之间的映射关系
  # 可选值: pathname | url | title | og:title
  #   pathname: 使用博客 URL 中的 pathname 来新建 issues
  #        url: 使用博客的 URL 来新建 issues
  #      title: 使用博客的标题来新建 issues
  #   og:title: 使用页面中的 Open Graph title meta 来新建 issues（如果你不了解 Open Graph 协议，请查看：https://ogp.me/）
  # （确保博客文章的 url path、url、标题、og:title 不重复，否则评论可能会冲突）
  mapping: title
  # 选择 Utterances 创建 issues 时，使用的 label 名称（支持 Emoji）
  label: utterances
  # 选择 Utterances 评论的主题配色
  # 可选值: github-light | github-dark | github-dark-orange | icy-dark | dark-blue | photon-dark
  theme: github-light
  # ! --------------------------------------------------------------------------------
  # ! Utterances 依赖的脚本地址，不要随意修改。如果官网提供的地址和下面不同，你才需要手动设置
  # ! --------------------------------------------------------------------------------
  script_url: https://utteranc.es/client.js
```

想要预览 Utterances 的 `theme` 配置项的效果，你可以去官网查看：[https://utteranc.es/](https://utteranc.es/)。

::: tip
从 Gitalk 迁移到 Utterances，你只需要修改 Utterances 的配置选项，将 `mapping` 选项的值改为 `title`：

```yaml
utterances:
  mapping: title
```

同理，如果你使用 Utterances 时，是通过博客标题生成的 issues，那么默认就是兼容 Gitalk 的。
:::

## 统计与分析

### 卜蒜子统计 <Badge text="Stable"/>

修改主题配置文件：

```yaml
busuanzi:
  # 是否启用
  enable: false
  # 是否只显示图标
  icon_only: false
  # 统计站点 UV 数量
  site_uv:
    enable: true
    # 查找图标名称，请访问：https://fontawesome.com/icons
    icon: fas fa-user
  # 统计站点 PV 数量
  site_pv:
    enable: true
    # 查找图标名称，请访问：https://fontawesome.com/icons
    icon: fas fa-eye
  # 统计每篇文章的 PV 数量
  post_pv:
    enable: true
    # 查找图标名称，请访问：https://fontawesome.com/icons
    icon: fas fa-eye
```

### 谷歌分析 <Badge text="Stable"/> <Badge text="v1.2.4"/>

1. 访问谷歌分析[官网](https://analytics.google.com/)
2. 找到你的跟踪 ID

   ![Stun | google_analytics demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190826162345.png)

3. 修改主题配置文件

   ```yaml
   google_analytics: # 填入你的跟踪 ID
   ```

### 百度分析 <Badge text="Stable"/> <Badge text="v1.2.4"/>

1. 访问百度分析[官网](https://tongji.baidu.com/)
2. 找到你百度分析的统计代码

   ![Stun | baidu_analytics demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190826162702.jpg)

3. 修改主题配置文件

   ```yaml
   baidu_analytics: # 填入你的统计代码
   ```

### 腾讯分析 <Badge text="Stable"/> <Badge text="v1.2.4"/>

1. 访问腾讯分析[官网](https://v2.ta.qq.com/)
2. 找到你腾讯分析的统计代码

   ![Stun | tencent_analytics demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190826162701.png)

3. 修改主题配置文件

   ```yaml
   tencent_analytics: # 填入你的统计代码
   ```

## 添加站长管理工具

用于优化 SEO，让你的网站内容更好的被搜索引擎抓取到。

### 谷歌站长 <Badge text="Stable"/> <Badge text="v1.2.4"/>

1. 访问谷歌站长[官网](https://www.google.com/webmasters/)
2. 根据提示将你的网站添加进去
3. 在【验证所有权】步骤中，选择【HTML 标记】，找到 `meta` 标签里的 `content`。例如：

   ![Stun | google_site_verification demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20191222192304.jpg)

4. 修改主题配置文件

   ```yaml
   google_site_verification: # 填入 meta 标签中 content 属性的值
   ```

5. 更新发布你的网站
6. 验证是否添加成功

   > 打开浏览器控制台，查看元素，确保你网站的 `head` 标签中已经包含了：`<meta name="google-site-verification" content="******">`（`content` 的值就是你在配置文件中填写的那个）。

   回到验证页面，点击【验证】。如果验证失败，你需要根据失败信息自行解决。

7. 提交 sitemap 文件

   > sitemap 文件，即站点地图文件，使搜索引擎抓取你的网站更方便，这样会大大提高被收录的概率。

   > 想要生成 sitemap 文件，你需要安装插件 `hexo-generator-sitemap`，在 Hexo 根目录执行指令：
   >
   > ```bash
   > $ npm install hexo-generator-sitemap --save
   > ```
   >
   > 默认情况下，该插件会在你网站更新发布的过程中，在根目录生成 `sitemap.xml` 文件。你可以验证一下该文件是否能访问到：`https://你的网站域名/sitemap.xml`。
   >
   > 你也可以对该插件进行配置，请查看插件的[文档](https://github.com/hexojs/hexo-generator-sitemap)。

   在【站点地图】中，提交你的 sitemap 文件网址即可。

### 必应站长 <Badge text="Stable"/> <Badge text="v1.2.4"/>

1. 访问必应站长[官网](https://www.bing.com/webmaster/)
2. 根据提示将你的网站添加进去（最好把 sitemap 的网址也添加上，也可以稍后添加）
3. 在验证页面，找到 `meta` 标签里的 `content`。例如：

   ![Stun | bing_site_verification demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20191222192305.jpg)

4. 修改主题配置文件

   ```yaml
   bing_site_verification: # 填入 meta 标签中 content 属性的值
   ```

5. 更新发布你的网站
6. 验证是否添加成功

   > 打开浏览器控制台，查看元素，确保你网站的 `head` 标签中已经包含了：`<meta name="msvalidate.01" content="******">`（`content` 的值就是你在配置文件中填写的那个）。

   回到验证页面，点击【验证】。如果验证失败，你需要根据失败信息自行解决。

7. 提交 sitemap 文件

   > 如果在第二步你已经提交了 sitemap，请忽略这一步。

   在【配置“我的网站”】->【Sitemaps】中，提交你的 sitemap 文件网址即可。

   > 如果不知道你的 sitemap 文件网址，请查看上述文档中**谷歌站长的第 7 步**。

### 百度站长 <Badge text="Stable"/> <Badge text="v1.2.4"/>

1. 访问百度站长[官网](https://ziyuan.baidu.com/site/)
2. 点击【添加网站】，根据提示将你的网站添加进去
3. 在【验证网站】步骤中，选择 【HTML 标签验证】，找到 `meta` 标签里的 `content`。例如：

   ![Stun | baidu_site_verification demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20191222192302.jpg)

4. 修改主题配置文件

   ```yaml
   baidu_site_verification: # 填入 meta 标签中 content 属性的值
   ```

5. 更新发布你的网站
6. 验证是否添加成功

   > 打开浏览器控制台，查看元素，确保你网站的 `head` 标签中已经包含了：`<meta name="baidu-site-verification" content="******">`（`content` 的值就是你在配置文件中填写的那个）。

   回到验证页面，点击【完成验证】。如果验证失败，你需要根据失败信息自行解决。

7. 提交 sitemap 文件

   在【链接提交】->【sitemap】中，提交你的 sitemap 文件网址即可。

   > 如果不知道你的 sitemap 文件网址，请查看上述文档中**谷歌站长的第 7 步**。

### 360 站长 <Badge text="Beta" type="warning"/> <Badge text="v1.2.4"/>

1. 访问 360 网站站长[官网](http://zhanzhang.so.com/)
2. 点击【添加网站】，根据提示将你的网站添加进去
3. 点击【请验证】->【代码验证】，找到 `meta` 标签里的 `content`。例如：

   ![Stun | qihu_site_verification demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20191222192303.jpg)

4. 修改主题配置文件

   ```yaml
   qihu_site_verification: # 填入 meta 标签中 content 属性的值
   ```

5. 更新发布你的网站
6. 验证是否添加成功

   > 打开浏览器控制台，查看元素，确保你网站的 `head` 标签中已经包含了：`<meta name="360-site-verification" content="******">`（`content` 的值就是你在配置文件中填写的那个）。

   回到验证页面，点击【点击验证】。如果验证失败，你需要根据失败信息自行解决。

7. 提交 sitemap 文件

   在【数据提交】->【Sitemap 提交】中，提交你的 sitemap 文件网址即可。

   > 如果不知道你的 sitemap 文件网址，请查看上述文档中**谷歌站长的第 7 步**。

### 搜狗站长 <Badge text="Beta" type="warning"/> <Badge text="v1.7.0"/>

1. 访问搜狗网站站长[官网](http://zhanzhang.sogou.com/)
2. 点击【用户中心】->【添加网站】，根据提示将你的网站添加进去
3. 点击【验证网站】->【HTML 标签验证】，找到 `meta` 标签里的 `content`。例如：

   ![Stun | sougou_site_verification demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200202181610.jpg)

4. 修改主题配置文件

   ```yaml
   sougou_site_verification: # 填入 meta 标签中 content 属性的值
   ```

5. 更新发布你的网站
6. 验证是否添加成功

   > 打开浏览器控制台，查看元素，确保你网站的 `head` 标签中已经包含了：`<meta name="sogou_site_verification" content="******">`（`content` 的值就是你在配置文件中填写的那个）。

   回到验证页面，点击【完成验证】。如果验证失败，你需要根据失败信息自行解决。

> 搜狗站长不支持提交 sitemap 文件，只能手动提交网址。

## 搜索系统

### Algolia 搜索 <Badge text="Stable"/> <Badge text="v1.0.3"/>

启用 Algolia 搜索功能，你需要按照以下步骤进行配置：

1. 登录官网

   访问 [Algolia 官网](https://www.algolia.com/)，可以注册一个账号登录，也可以使用 Github 账号或者 Google 账号登录。

2. 进入 Indices 页面

   点击 Create Index，然后填写输入框：

   ![Stun | Algolia - Create Index](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190711194035.png)

3. 进入 API Keys 页面

   你会看到 `Application ID` 和 `Search-Only API Key`，将它们保存下来，在后面的设置中会用到：
   ![Stun | Algolia - API Keys](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190711194037.png)

   ::: danger
   注意，这里一定不要使用 `Admin API Key` 作为你的 API Key，更不要将其写入你的配置文件。
   :::

   点击 `ALL API KEYS` 和 `edit` 选项。这样会弹出一个框，在这个框中，你可以进行精确的授权和控制：

   ![Stun | Algolia - ALL API KEYS](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190711194036.png)

   在弹出框底部的 `ACL` 选项中，勾选 `search`，`addObject`，`deleteIndex`，`listIndexes`，`deleteObject`。最后，点击 `Update` 按钮:

   ![Stun | Algolia - ACL](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190711194038.png)

4. 修改 Hexo 配置

   修改 Hexo 根目录下的 `_config.yml` 文件，添加 `applicationID`、`apiKey`、`indexName` 选项:

   ```yaml
   algolia:
     applicationID: "填入你的 Application ID"
     apiKey: "填入你的 Search-only API key"
     indexName: "填入你的 indexName"
   ```

5. 安装 Algolia 插件

   > Algolia 要求用户手动通过提供的 API 上传它们的搜索数据。

   在 Hexo 根目录中安装 `hexo-algolia`，这个插件将会搜索你的网站并将数据上传到 Algolia：

   ```bash
   $ npm install hexo-algolia --save
   ```

   运行下面这些指令，上传索引数据：

   ```bash
   $ export HEXO_ALGOLIA_INDEXING_KEY=你的Search-Only API key # 在 Git Bash 中使用这条指令
   # set HEXO_ALGOLIA_INDEXING_KEY=你的Search-Only API key    # 在 Windows 命令行中使用这条指令
   $ hexo clean
   $ hexo algolia
   ```

   ::: tip
   1. 每次添加新的文章后，都需要运行上面这三条指令来更新你的索引数据，否则，将无法搜索到。
   2. 如果你发现搜索到的结果有重复的或者有旧的数据，你需要去 Algolia 官网，清除上传的数据，然后执行上面这三条指令，重新上传索引数据即可。
   :::

6. 修改主题配置文件

   ```yaml
   algolia_search:
     # 是否启用
     enable: false
     hits:
       # 每一页显示的搜索结果数量
       per_page: 10
     labels:
       # 是否显示搜索结果的统计信息
       show_stats: true
   ```

7. 重启 Hexo 服务器

   ```bash
   $ hexo clean && hexo s
   ```

到这里不出意外的话，你就可以使用 Algolia 搜索网站里的文章标题了。

### 本地搜索 <Badge text="Stable"/> <Badge text="v1.2.1"/>

从 `v1.2.1` 版本开始，Stun 原生支持本地搜索功能，和 Algolia 相比，该功能的好处如下：

- 搜索次数无限制
- 支持多关键词搜素（在搜索框中，用空格将关键词隔开）
- 既能搜索文章标题，又能搜索文章内容
- 搜索速度快

想启用这一功能，首先需要安装插件 [hexo-generator-search](https://github.com/wzpan/hexo-generator-search)，这个插件用来**将网站的文章信息生成索引数据**。

使用步骤如下：

1. 安装插件

   在 Hexo 根目录下执行指令：

   ```bash
   $ npm install hexo-generator-search --save
   ```

2. 配置插件

   找到 Hexo 根目录下的 `_config.yml` 文件，添加以下字段：

   ```yaml
   search:
     path: search.json
     field: post
     content: true
   ```

   有关插件的详尽信息和上述参数的含义，请查看插件的[文档](https://github.com/wzpan/hexo-generator-search)。

3. 生成数据

   安装上述插件后，在 Hexo 根目录下执行指令：

   ```bash
   $ hexo g
   ```

   这样会在你网站根目录下的 `public` 的文件夹中，生成 `search.json` 文件，Stun 主题的本地搜索功能就是利用这个文件里的数据实现的。

4. 修改主题配置文件

   ```yaml
   local_search:
     # 是否启用
     enable: true
   ```

5. 重启 Hexo 服务器

   ```bash
   $ hexo clean && hexo s
   ```

## 数学公式

想要解析页面中的数学公式，首先，你需要修改主题配置文件，启用该功能，并选择解析引擎（默认是 KaTeX 引擎）：

```yaml
math:
  # 是否启用
  enable: true
  # 如果设为 true，将会为每一个页面启用该功能
  # 如果设为 false，只有在 `Front-matter` 中设置了 `math: true` 的页面，才会启用该功能
  per_page: false
  # 解析引擎，可选值：mathjax 或 katex
  engine: katex
```

然后，你需要根据下面 MathJax 或 KaTeX 的说明**进一步配置**。

### MathJax <Badge text="Stable"/> <Badge text="v1.1.2"/>

想要解析 MathJax 公式，你需要更换一个支持 MathJax 的 Markdown 渲染器。请按以下步骤操作：

1. 安装新的渲染器，执行指令

   > 在 Hexo 根目录下的 `package.json` 文件的 dependencies/devDependencies 字段中，可以查看安装了哪些插件。

   ```bash
   # 如果安装以下插件，请全部卸载
   $ npm un hexo-renderer-marked      --save
   $ npm un hexo-renderer-kramed      --save
   $ npm un hexo-renderer-pandoc      --save
   $ npm un hexo-renderer-unified     --save
   $ npm un hexo-renderer-markdown    --save
   $ npm un hexo-renderer-markdown-it --save
   $ npm un hexo-math                 --save
   $ npm un hexo-inject               --save

   # 安装新的渲染器
   $ npm i hexo-renderer-markdown-it-plus --save
   ```

2. 在主题配置文件中，选择 MathJax 解析引擎

   ```yaml
   math:
     engine: mathjax # 字母全小写
   ```

3. 重启 Hexo 服务器

   ```bash
   $ hexo clean && hexo s
   ```

::: warning
在 Hexo 中，渲染器（名称带有 `hexo-renderer-` 前缀的）只能安装一个，否则可能会引起一些意想不到的问题。
:::

### KaTeX <Badge text="Stable"/> <Badge text="v1.1.2"/>

想要解析 KaTeX 公式，你需要更换一个支持 KaTeX 的 Markdown 渲染器。请按以下步骤操作：

1. 安装新的渲染器，执行指令

   > 在 Hexo 根目录下的 `package.json` 文件的 dependencies/devDependencies 字段中，可以查看安装了哪些插件。

   ```bash
   # 如果安装以下插件，请全部卸载
   $ npm un hexo-renderer-marked      --save
   $ npm un hexo-renderer-kramed      --save
   $ npm un hexo-renderer-pandoc      --save
   $ npm un hexo-renderer-unified     --save
   $ npm un hexo-renderer-markdown    --save
   $ npm un hexo-renderer-markdown-it --save
   $ npm un hexo-math                 --save
   $ npm un hexo-inject               --save

   # 安装新的渲染器
   $ npm i hexo-renderer-markdown-it-plus --save
   ```

2. 在主题配置文件中，选择 KaTeX 解析引擎

   ```yaml
   math:
     engine: katex # 字母全小写
   ```

3. 重启 hexo 服务器

   ```bash
   $ hexo clean && hexo s
   ```

### 相关插件

Stun 主题默认提供了一些 MathJax 和 Katex 的插件。

- mhchem <Badge text="Stable"/> <Badge text="v1.1.2"/>

  mhchem 是 MathJax 的插件，你可以使用这个插件来渲染化学方程式。详见：[MathJax/mhchem Manual](https://mhchem.github.io/MathJax-mhchem/)。

- Copy-tex <Badge text="Stable"/> <Badge text="v1.1.2"/>

  Copy-tex 是 KaTeX 的插件，当启用这个插件之后，你只需要单击公式即可复制其源码。详见：[Copy-tex extension](https://github.com/KaTeX/KaTeX/tree/master/contrib/copy-tex)。

  效果如下：

  ![Stun | Copy-tex demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190720153859.gif)

### 如何使用

按照上述步骤配置之后，就可以在 Markdown 中使用数学公式了。

- 使用 `$$...$$` 包裹公式代码，公式会另起一行显示
- 使用 `$.....$` 包裹公式代码，公式会和文本在同一行显示

使用示例：

```markdown
这是一个行内数学公式：$\begin{vmatrix} a & b \\ c & d \end{vmatrix}$

这个数学公式会换行显示：
$$\begin{vmatrix} a & b \\ c & d \end{vmatrix}$$
```

效果如下：

![Stun | MathJax/KaTeX demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190720160555.png)

## 广告

### 谷歌广告 <Badge text="Stable"/> <Badge text="v1.1.4"/>

首先登录谷歌广告[官网](https://www.google.com/adsense)，选择添加广告，在给你的一段代码中找到 `client_id`，通常以 `ca-pub-` 开头。然后修改主题配置文件：

```yaml
google_adsense:
  # 是否启用
  enable: false
  # 填写你的 client-id
  client: ca-pub-xxxxxx
  # 如果和你 AdSense 嵌入代码中的脚本地址不一样，请更换
  js_src: https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js
```

## 特效

### Ribbon <Badge text="Stable"/> <Badge text="v1.1.2"/>

修改主题配置文件：

```yaml
canvas_ribbon:
  # 是否启用
  enable: false
  # ribbon 的宽度
  size: 300
  # ribbon 的透明度
  alpha: 0.6
  # ribbon 的层级
  zIndex: -1
```

效果如下：

![Stun | canvas_ribbon demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190725220144.png)

### Particle / Nest <Badge text="Stable"/> <Badge text="v1.1.2"/>

修改主题配置文件：

```yaml
canvas_nest:
  # 是否启用
  enable: false
  # 线条的颜色（RGB 值，请使用 "," 分隔，并用引号包裹值）
  color: "0,0,0"
  # 线条的透明度
  opacity: 0.6
  # 线条数目
  count: 99
  # 效果的层级
  zIndex: -1
```

效果如下：

![Stun | canvas_nest demo](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190725220344.png)

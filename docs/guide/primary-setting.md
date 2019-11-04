# Primary Setting

::: tip Preface
- Restart the Hexo server by modifying the configuration file, installing new dependencies, and so on.
- Unless otherwise stated, configuration items are supported by default from the `v1.0.0` version.
- A stable configuration is marked with <Badge text="Stable"/>, indicating that it will not change substantially. Unstable configurations are marked with <Badge text="Beta" type="warn"/> to indicate that they may change or even be deleted in the future. Configurations that are not currently supported are marked with <Badge text="Not Support" type="error"/>. The obsolete configuration is marked with <Badge text="Deprecated" type="error"/>. The version number that was first supported is indicated by <Badge text="v x.x.x"/>. Configuration items that are not related to the topic are marked with <Badge text="Disrelated" type="warning"/>.
:::

## Configuration file

First, you need to distinguish between the following two configuration files:

- `_config.yml` in the root directory of Hexo. This is the Hexo configuration file, which is configured for the entire site.
- `_config.yml` in the root directory of Stun. This is the theme configuration file, and the configuration inside is only valid for the current theme.

As for the configuration, which configuration file needs to be modified, it will be pointed out in the documentation.

## Add new page <Badge text="Stable"/>

The Stun theme has built-in: category page, tag page. It is not enabled by default. To enable these pages, you need to follow these steps:

1. Execute the command in the Hexo root directory

``` bash
# Enable the category page, execute this command
$ hexo new page categories

# Enable the tag page, execute this command
$ hexo new page tags
```

2. Modify Front-Matter

Find the Markdown file in the `source/categories` or `source/tags` folder in the Hexo root directory and add Front-Matter:

``` yaml
# If it is a category page, add this
type: "categories"

# If it is a tag page, add this
type: "tags"
```

3. Then modify the theme configuration file to uncomment the `categories` or `tags` counterparts

``` yaml
menu:
  # `||` The separator is preceded by a path, followed by the Font Awesome icon name
  # If you don't need to use the icon, just fill in the path.
  home: / || home
  archives: /archives/ || folder-open
  # categories: /categories/ || th
  # tags: /tags/ || tags
  # xxx: /xxx/ || xxx
```

In addition to using the above built-in page, if you want to use a custom page, you need to perform the following steps:

Take the Add **Read** page as an example.

1. Modify the theme configuration file and add the corresponding menu item

``` yaml
menu:
  # Format is as follows
  # Name: Path || Icon Name
  reading: /reading/ || book
```

> The name of the icon is available here: [https://fontawesome.com/v4.7.0/icons/](https://fontawesome.com/v4.7.0/icons/).

2. Create a page file

Execute the command in the Hexo root directory:

``` bash
$ hexo new page reading # 'reading' is the path you set
```

1. Internationalization

Find the language files in the `languages` directory and select the language you use for your website. Here is an example of Engligh:

`en.yml`:

``` yaml
menu:
  reading: reading
```

This completes the addition of custom pages.

Alternatively, you can set whether the icon and text are displayed by modifying the `menu_settings` field in the theme configuration file:

``` yaml
menu_settings:
  # Only show by icon.
  icon_only: false
  # Only show by text.
  text_only: false
```

## Favicon <Badge text="Stable"/>

The theme uses Stun's Logo as the website icon by default, you need to switch to your own.

It is recommended that you create a new folder in the `source` directory under the **Hexo root directory** for placing images, such as `assets`, and then you can use the image with a path like `/assets/xxx.png`. Fill in the image path to your theme profile:


``` yaml
favicon:
  small: /images/icons/favicon-16x16.png
  medium: /images/icons/favicon-32x32.png
  # ! -----------------------------------------------------
  # ! If you don't understand, please ignore the following.
  # ! -----------------------------------------------------
  # apple_touch_icon: /images/icons/apple-touch-icon.png
  # safari_pinned_tab: /images/icons/logo-stun.svg
  # msapplication: /images/icons/favicon-144x144.png
```

> You can also place images in the `source` directory under the **Themes directory**, but this is not recommended as it may overwrite your files when updating the theme.

## Setting header

### Header <Badge text="Stable"/>

If you want to set the height of the top bar of the site, the height of the navigation bar, the background image, you need to modify the theme profile:

``` yaml
header:
  # Header height (Support for all types of CSS size units).
  height: 80%
  # Header navigation bar height (Support for all types of CSS size units).
  nav_height: 50px
  # Background image in the header.
  bg_image:
    enable: false
    # In theme directory (source/images): /images/avatar.png
    # In site directory (source/uploads): /uploads/avatar.png
    # You can also use a link of image.
    url:
  # Mask effect of the background image.
  mask:
    enable: false
    # Opacity of mask (value: 0 ~ 1).
    opacity: 0.5
  # The icon that prompt to scroll down.
  scroll_down_icon:
    enable: false
    animation: true
```

::: warning Note
- The `mask` option, the mask effect, is supported starting with the `v1.1.1` version. The `blur_effect` option, the blur filter effect, is deprecated starting with the `v1.1.1` version.
- The `scroll_down_icon` option is supported starting with the `v1.5.4` version.
:::

### Specify the top image <Badge text="Stable"/>

If you want to specify a top image for a page or an article separately, you need [Front-Matter](https://hexo.io/zh-cn/docs/Front-Matter) on the page or article Markdown source file. In the middle, add the `top_image` item, and then fill in the image url or path. e.g.:

``` yaml
---
title: Hello Stun
date: 2019-05-15 22:54:49
top_image: https://xxxxx.jpg
---
```

## Setting sidebar

### Author <Badge text="Stable"/>

The default avatar in the sidebar is Stun's Logo, you need to change it to your own, modify the theme configuration file:

``` yaml
author:
  enable: true
  # Avatar in the sidebar.
  avatar:
    # In theme directory (source/images): /images/avatar.png
    # In site directory (source/uploads): /uploads/avatar.png
    # You can also use a link of image.
    url: /images/avatar.png
    # If true, the avatar would be displayed in a circle.
    rounded: false
    # The value should be chosen from 0 to 1.
    opacity: 1
    # Mouse hover animation, available value: turn | shake.
    animation: turn
  # Your favorite motto.
  motto: hello world
```

### Social link <Badge text="Stable"/>

Modify the theme configuration file:

``` yaml
# Value before `||` delimiter is the target link.
# Value after `||` delimiter is the name of FontAwesome icon.
# See: https://fontawesome.com/v4.7.0/icons/
# If you can`t find a suitable icon, you can choose to display the original
#   text by adding the "origin" prefix (e.g. origin:sf, then "sf" will be show).
social:
  github: https://github.com/ || github
  google: https://plus.google.com/ || google
  # twitter: https://twitter.com/ || twitter
  # youtube: https://youtube.com/ || youtube
  # segmentfault: https://segmentfault.com/ || origin:sf
  # weibo: https://weibo.com/ || weibo
  # zhihu: https://www.zhihu.com/ || origin:知
  # wechat: yournumber || weixin
  # telegram: yournumber || telegram
  # qq: yournumber || qq
  # xxx: xxx || (origin:)xxx

social_setting:
  enable: false
  # Only show by icon.
  icon_only: true
```

> If you don't want to enable a social link, just comment it out.
>
> The name of the icon is found here: [https://fontawesome.com/v4.7.0/icons/](https://fontawesome.com/v4.7.0/icons/)

::: danger <Badge text="Deprecated" type="error"/>
The `text_align` attribute of the configuration item `social_setting` is removed in the `v1.2.0` version.
:::

When you add a social link that is not available by default, you need to set it internationally. Here to add the link `Nuggets' as an example, the steps are as follows:

1. Modify the theme configuration file

``` yaml
social:
  juejin: https://juejin.im/timeline || origin:Jue
```

2. Internationalization

Find the language files in the `languages` directory and select the language you use for your website. Here is an example of Engligh:

`en.yml`：

``` yaml
social:
  juejin: JueJin
```

The effect is as follows:

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190717165333.png)

## Article Summary <Badge text="Stable"/>

If you want to keep the article summary, you need to **manually** add the `<!-- more -->` tag to the article's Markdown source file. The part before the markup is retained as an article summary, which is displayed in the article list.

If you want to automatically keep the article summary, you can modify the theme profile:

``` yaml
auto_excerpt:
  enable: false
  length: 150
```

> Since the effect of automatically retaining the summary is not ideal, it is not recommended to open it here.

## Enable Appreciation Code <Badge text="Stable"/>

If you want to enable the rewarded QR code at the bottom of the article, you need to modify the theme profile:

``` yaml
reward:
  enable: true
  alipay: https://xxxxx.png
  wechat: https://xxxxx.png
```

The effect is as follows:

![](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190608175556.png)

You can set `reward: false` in `Front-Matter` in the article Markdown source file to specify that an article does not have the appreciation code enabled.

::: warning Note
If `reward` is not enabled in the theme configuration file, setting the article `reward: true` separately has no effect.
:::

---

The most basic configuration is done here. If you want to configure the theme in more detail, please check the [Advanced Settings] section.

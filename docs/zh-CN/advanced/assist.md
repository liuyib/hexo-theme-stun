# 辅助功能

## 快捷键

### 快速切换文章 <Badge text="Beta" type="warn"/> <Badge text="v1.1.3"/>

::: tip
该功能在 `v1.1.0` 版本中快捷键为（`←`：切换到上一篇文章，`→`：切换到下一篇文章），在 `v1.1.3` 版本中快捷键修改为（Ctrl + `←`，Ctrl + `→`）。
:::

当你浏览文章时，如果不想通过鼠标点击按钮来切换文章，那么你可以使用快捷键（Ctrl + `←`，Ctrl + `→`）来快速切换文章。

如果你想启用这一功能，请修改主题配置文件：

``` yaml
shortcuts:
  # 切换文章的快捷键
  # "Ctrl + ←" 切换到上一篇文章
  # "Ctrl + →" 切换到下一篇文章
  switch_post:
    # 是否启用
    enable: false
```

> 考虑到这里的快捷键可能会和用户系统或软件的冲突，所以在 Stun 主题 `v1.1.3` 版本中，这个功能加入了配置项，用户可以自己决定是否开启，默认不启用。并且在 Stun 主题以后的版本中，可能会留出配置项让用户自定义快捷键。

### 快速关闭搜索框 <Badge text="Stable"/> <Badge text="v1.0.3"/>

关闭搜索框有三种方式，1. 点击关闭按钮，2. 点击蒙版，3. 按下 `Esc` 键。

## 标签插件

该功能相当于 Hexo 对 Markdown 语法的一种扩展，用于快速在文章中插入指定的内容。你可以访问[这里](https://hexo.io/zh-cn/docs/tag-plugins)查看 Hexo 都支持哪些标签插件。

Hexo 主题一般都会扩展一些自己特有的标签插件，在这方面做得最好的是 NexT 主题，你可以查看 NexT 主题所特有的标签插件：[https://theme-next.org/docs/tag-plugins/](https://theme-next.org/docs/tag-plugins/)。

此外，Stun 主题也有自己扩展的一些标签插件，这些标签插件如下：

### 插入表格 <Badge text="Stable"/> <Badge text="v1.2.0"/>

如果想要在文章中显示一个表格，你可以使用 Markdown 原生支持的语法，但是如果你想要让表格里的数据存储在外部文件中，那么你可以使用下面这种语法：

```
{% table [path] [thead1,thead2,...] %}
```

参数：

`[path]`：数据文件的路径

`[thead1,thead2,...]`：表格头部的文字（用半角逗号分隔，逗号前后不要有空格）

::: warning
数据文件必须放在 `/source/` 目录下，建议放在 `/source/_data/` 目录下。
:::

举例：

在文章或页面中显示一个打赏列表。

1. 在 `/source/_data/` 目录下新建文件 `reward.json`，填入数据。

    ``` json
    [
      {
        "time": "2019-6-1",
        "sponsor": "张三",
        "money": "9.9",
        "remark": "支持一下~"
      },
      {
        "time": "2019-6-16",
        "sponsor": "李四",
        "money": "11",
        "remark": "前来支持，继续加油！"
      }
    ]
    ```

2. 在文章或页面的 Markdown 源文件中，插入如下标签。

    ```
    {% table _data/reward.json 时间,赞助人,金额,留言 %}
    ```

3. 重启 Hexo 服务器，效果如下。

    ![Stun | tag plugins - table](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190803141118.png)

### 插入注释 <Badge text="Stable"/> <Badge text="v1.2.0"/>

::: warning
**info** 类型的标注从 `v2.0.0-rc.0` 开始支持，其他类型的标注均从 `v1.2.0` 开始支持。
:::

语法如下：

```
{% note [type] [no-icon] %}
**header text**
Any text
{% endnote %}
```

> 标签内可以是任意文字，支持 Markdown 和 HTML 语法。

参数：

`[type]`：标注类型

`[no-icon]`：是否显示 ICON

举例：

``` markdown
<!-- With header, With icon -->
{% note success %}
**Success**
This is success note.
{% endnote %}

<!-- With header, No icon -->
{% note success no-icon %}
**Success**
This is success note.
{% endnote %}

<!-- No header, With icon -->
{% note success %}
This is success note.
{% endnote %}

<!-- No header, No icon -->
{% note success no-icon %}
This is success note.
{% endnote %}
```

全部效果如下：

![Stun | tag plugins - note](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20200225192132.jpg)

### 插入友链 <Badge text="Stable"/> <Badge text="v1.2.0"/>

语法如下：

```
{% friends [path] %}
```

参数：

`[path]`：数据文件的路径

::: warning
数据文件必须放在 `/source/` 目录下，建议放在 `/source/_data/` 目录下。
:::

举例：

1. 在 `/source/_data/` 目录下新建文件 `friends.json`，填入数据。

``` json
[
  {
    "avatar": "https://placehold.it/100x100.jpg",
    "name": "张三",
    "introduction": "李四是大佬，李四是大佬，李四是大佬，李四是大佬，李四是大佬",
    "url": "https://liuyib.github.io/"
  },
  {
    "avatar": "https://placehold.it/100x100.jpg",
    "name": "李四",
    "introduction": "我不是大佬，我不是大佬，我不是大佬，我不是大佬，我不是大佬",
    "url": "https://liuyib.github.io/"
  },
  {
    "avatar": "https://placehold.it/100x100.jpg",
    "name": "王五",
    "introduction": "我是小白",
    "url": "https://liuyib.github.io/"
  }
]
```

::: warning
数据的格式要和上面保持一致，即要有：`avatar`、`name`、`introduction`、`url` 几个字段。
:::

2. 在文章或页面的 Markdown 源文件中，插入如下标签。

```
{% friends _data/friends.json %}
```

3. 重启 Hexo 服务器，效果如下。

![Stun | tag plugins - friends](https://raw.githubusercontent.com/liuyib/picBed/master/hexo-theme-stun/doc/20190803141110.png)

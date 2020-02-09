module.exports = {
  title: '前端深入',
  description: 'Front-end in-depth',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  port: 10086,
  base: '/deep-web/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    nav: [
      { text: '前端深入', link: '/jsdeep/' }, // 内部链接 以docs为根目录
      { text: '随笔', link: '/mywrite/' }, // 
      { text: '掘金', link: 'http://obkoro1.com/' }, // 外部链接
      // 下拉列表
      {
        text: 'GitHub',
        items: [
          { text: 'GitHub地址', link: 'https://github.com/OBKoro1' },
          {
            text: '算法仓库',
            link: 'https://github.com/OBKoro1/Brush_algorithm'
          }
        ]
      }
    ],
    sidebar: {
      '/jsdeep/': [
        '/jsdeep/', // 文件夹的README.md 不是下拉框形式
        {
          title: 'echart',
          collapsable: false,
          children: [
            '/jsdeep/one', '/jsdeep/two'
          ]
        }
      ],
      // docs文件夹下面的mywrite文件夹 这是第二组侧边栏 跟第一组侧边栏没关系
      '/mywrite/': [
        '/mywrite/',
        {
          title: '第二组侧边栏下拉框的标题1',
          children: [
            '/mywrite/one', '/mywrite/two'
          ]
        }
      ]
    },
    serviceWorker: { //站点信息变更后提示用户刷新
      updatePopup: true, // Boolean | Object, 默认值是 undefined.
      updatePopup: {
        message: "该站点有新内容变更",
        buttonText: "立即刷新"
      }
    },
    //git相关开始
    repo: 'vuejs/vuepress',
    // 自定义项目仓库链接文字
    // 默认根据 `themeConfig.repo` 中的 URL 来自动匹配是 "GitHub"/"GitLab"/"Bitbucket" 中的哪个，如果不设置时是 "Source"。
    // repoLabel: 'GitHub',
    editLinks: true,
    editLinkText: '在GitHub上编辑此页',
    lastUpdated: '上次更新'
    //git相关结束
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': '/images'
      }
    }
  }
};

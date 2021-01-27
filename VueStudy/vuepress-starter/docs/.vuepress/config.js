module.exports = {
    title: '网站标题',
    description: '网站描述内容',
    keywrods: "vue 文档 教务",
    base: "/docs/",  // 部署在非根路径
    dist: ".vuepress/dist", // 输出目录
    locales: {
        "/": {
            lang: 'zh-CN',
        }
    },
    markdown: {
        lineNumbers: true, // 代码块显示行号
    },
    configureWepack: {
        resolve: {
            alias: {
                '@images': 'docs/assets/images'
            }
        }
    },
    themeConfig: {
        logo: "/logo.png",    
        sidebarDepth: 2, // 侧边栏显示2级
        nav: require("./nav"),
        sidebar: require("./sidebar"),
        // sidebar: auto, // 自动根据页面的标题生成侧边栏
        lastUpdated: '最后更新时间', // 基于git提交的时间戳
    }
}
# music-player

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 组件结构

```
|-- components
  |-- search
    |-- Search.vue
  |-- play
    |-- Play.vue
|-- views
  |-- top 
    |-- Top.vue --> Search
  |-- content
    |-- side-nav
      |-- SideNav.vue
    |-- main-content
      |-- MainContent.vue
      |-- children
        |-- Discovery.vue  发现音乐
        |-- RecommendPlaylist.vue 推荐歌单
        |-- NewSongs.vue 最新音乐
        |-- NewMvs.vue 最新mv
        |-- SearchContent.vue 搜索结果
      |-- details
        |-- PlaylistDetail.vue 歌单详情
        |-- MvDetail.vue MV详情
  |-- bottom
    |-- Bottom.vue --> Play
```

### 步骤

1. 搭建vue工程，配置环境

创建
```shell
vue create music-player
```

初始化路径配置
```js
vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
```

初始化基本样式
normalize.css --> base.css

进行结构布局

- 上下固定定位，中间flex

进行大致的组件划分，配置vue-router，实现跳转

具体内容的编写，进行细致的组件划分
> |-- Discovery 发现音乐
    |-- Carousel.vue 轮播图

轮播图 element-ui
```shell
npm i element-ui
```
在main.js应用
```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```

```js
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <img src="http://p1.music.126.net/v4CG9Mk3ESmzIb15zpkWmA==/109951165986574137.jpg" alt=""/>
      </el-carousel-item>
    </el-carousel>
```

在Discovery.vue 获取banners的数据，通过props进行父子之间的数据传递，传递给Carousel.vue


安装axios进行网络请求

```shell
npm install axios --save
```

```js
import axios from 'axios'
// 最终封装方案
export function request(config) {
    // 1. 创建axios的实例
    const instance = axios.create({
        baseURL: 'https://autumnfish.cn',
        // timeout: 5000,
        method: 'get'
    })
    // 2. 发送真正的网络请求
    return instance(config)
}
```

开发环境解决跨域问题

```js
devServer: {
  host: '0.0.0.0',
  port: 8080,
  disableHostCheck: true,
  proxy: {
    // 代理 用于解决跨域问题
    '/api': {
      target: 'https://autumnfish.cn',
      pathRewrite: { '/api': '' }
    }
  }
},
```

祖孙通讯
```
给中间的父亲添加
v-on="$listeners" 
v-bind="$attrs"
```

**发现音乐**
  --推荐歌单
  --推荐音乐
  --推荐MV

编写步骤基本一致
都是先axios请求数据，然后通过props进行组件通讯-父子或者祖孙之间的通讯，再把数据渲染都对应位置
至于当有点击事件或其它事件时，通过$emit发给最上面的组件
孙传祖的话用到 v-on="$listeners" 

在推荐音乐那里用到事件总线

```
main.js --> Vue.prototype.$bus = new Vue()

this.$bus.$emit('事件名称'，参数)  发送自定义事件

mounted --> this.$bus.$on('事件名称',function(参数){})  绑定自定义事件
```

**推荐音乐**

推荐音乐
  -- top-card
  -- tab-bar
  -- playlist-items
  -- pagination

一样的操作：请求数据，渲染页面

要注意的是组件之间的通讯


**最新音乐**

请求数据，渲染页面

**最新MV**

请求数据，渲染页面

**搜索结果**

因为之前已经封装了相应的组件，所有只要插入组件就行

然后请求数据，渲染页面

**歌单详情**

**MV详情**

总结：

> 这个项目基本就是向后端接口请求数据，然后在组件中渲染处理，没多少难点，最主要的就是维持好各个组件之间的通讯和数据传递，以及理清楚各个数据之间的关系

父传子：（props）
子传父：（$emit())

祖孙：v-bind="$attrs" v-on="$listeners"

兄弟：$bus  VueX

比如：在点击播放歌曲时就是使用$bus进行数据传递的

在发现音乐-推荐音乐中点击事件传递就用到了v-on="$listeners"
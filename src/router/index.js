import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Discovery = () => import("views/contents/main-content/children/Discovery")
const RecommendPlaylist = () => import("views/contents/main-content/children/RecommendPlaylist")
const NewSongs = () => import("views/contents/main-content/children/NewSongs")
const NewMvs = () => import("views/contents/main-content/children/NewMvs")
const SearchContent = () => import("views/contents/main-content/children/SearchContent")

const PlaylistDetail = () => import("views/contents/main-content/details/PlaylistDetail")
const MvDetail = () => import("views/contents/main-content/details/MvDetail")

const routes = [
  {
    path: '/',
    redirect: '/discovery'
  },
  {
    path: '/discovery',
    name: 'Discovery',
    component: Discovery
  },
  {
    path: '/playlists',
    name: 'RecommendPlaylist',
    component: RecommendPlaylist
  },
  {
    path: '/newsongs',
    name: 'NewSongs',
    component: NewSongs
  },
  {
    path: '/newmvs',
    name: 'NewMvs',
    component: NewMvs
  },
  {
    path: '/search',
    name: 'SearchContent',
    component: SearchContent
  },
  {
    path: '/playlistDetail',
    name: 'PlaylistDetail',
    component: PlaylistDetail
  },
  {
    path: '/mvDetail',
    name: 'MvDetail',
    component: MvDetail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, // ?? 基本的路由请求的路径 ??
  routes
})

export default router

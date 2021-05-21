import { request } from './request'

/* 请求轮播图数据 */
export function getBanner() {
  return request({
    url: '/banner',
  })
}

/* 请求发现音乐 -- 推荐歌单的数据 */
export function getRecommendPlaylists(limit){
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}

/* 请求发现音乐 -- 推荐歌曲的数据 */
export function getRecommendSongs(){
  return request({
    url: '/personalized/newsong',
  })
}

/* 请求歌曲的URL数据 */
export function getSongUrl(id){
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

/* 请求发现音乐 -- 推荐MV的数据 */
export function getRecommendMvs(){
  return request({
    url: '/personalized/mv',
  })
}

/* 请求歌单详情的数据 */
export function getPlaylistDetail(id){
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

/* 请求歌单 热门评论的数据 */
export function getHotComment(id){
  return request({
    url: '/comment/hot',
    params: {
      id,
      type: 2,
    }
  })
}

/* 请求歌单 评论的数据 */
export function getComment(id, offset){
  return request({
    url: 'comment/playlist',
    params: {
      id,
      limit: 10,
      offset,
    }
  })
}
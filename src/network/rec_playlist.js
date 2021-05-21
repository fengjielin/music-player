import { request } from './request'

/* 请求推荐歌单的歌单数据 */
export function getPlaylist(cat, offset){
  return request({
    url: '/top/playlist',
    params: {
      limit: 10,
      cat,
      offset //(this.page - 1) * limit
    }
  })
}

/* 请求推荐歌单的精品歌单数据 */
export function getHightQualityPlaylist(cat){
  return request({
    url: 'top/playlist/hightquality',
    params: {
      limit: 1,
      cat,
    }
  })
}

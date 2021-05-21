import { request } from './request'

/* 请求搜索结果 */
export function getSearch(keywords,type, limit, offset){
  return request({
    url: '/search',
    params: {
      keywords,
      type,
      limit,
      offset,
    }
  })
}
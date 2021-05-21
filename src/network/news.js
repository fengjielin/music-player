import { request } from "./request"

/* 请求最新音乐的歌曲数据 */
export function getNewsSongs(type) {
  return request({
    url: "/top/song",
    params: {
      type
    }
  })
}

/* 请求最新MV的mv数据 */
export function getNewsMvs(area, type, order, limit, offset) {
  return request({
    url: "/mv/all",
    params: {
      area,
      type,
      order,
      limit,
      offset,
    }
  })
}

export function getMvUrl(id) {
  return request({
    url: "/mv/url",
    params: {
      id
    }
  })
}

export function getMvDetail(mvid) {
  return request({
    url: "/mv/detail",
    params: {
      mvid
    }
  })
}

export function getArtistsDetail(id) {
  return request({
    url: "/artists",
    params: {
      id
    }
  })
}

export function getMvComment(id, limit, offset) {
  return request({
    url: "/comment/mv",
    params: {
      id,
      limit,
      offset
    }
  })
}

export function getSimiMv(mvid) {
  return request({
    url: "/simi/mv",
    params: {
      mvid
    }
  })
}


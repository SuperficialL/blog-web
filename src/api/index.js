import axios from '@/utils/axios'

// 获取站点信息
export function getSiteInfo (params) {
  return axios({
    url: `siteinfo`,
    params
  })
}

// 获取导航菜单
export function getMenu (params) {
  return axios({
    url: `api/categories`,
    params
  })
}

// 获取轮播
export function getIndexBanner (params) {
  return axios({
    url: `carousel`,
    params
  })
}

// 获取文章列表
export function getArticles (params) {
  return axios({
    url: `articles`,
    params
  })
}

// 获取分类下文章列表
export function getCateArticles (id) {
  return axios({
    url: `api/categories/${id}`,
  })
}

// 获取文章详情页
export function getArticleDetail (params) {
  return axios({
    url: `articles/${params.id}`
  })
}

// 获取友情链接
export function getFriendLink (params) {
  return axios({
    url: `friendLinks`,
    params
  })
}

// 获取标签集合
export function getTags (params) {
  if (params !== undefined) {
    return axios({
      url: `tags/${params.id}`,
      params
    })
  } else {
    return axios({
      url: `tags`,
      params
    })
  }
}

// 搜索
export function getSearch (params) {
  return axios({
    url: `articles/`,
    params
  })
}

// get评论
export function getComments (params) {
  return axios({
    url: `comments`,
    params
  })
}

// post评论
export function postComment (params) {
  return axios({
    url: `comments/`,
    method: 'POST',
    // params
    data: JSON.stringify(params)
  })
}

// 获取验证码

// 刷新验证码
export function refreshImg (params) {
  return axios({
    url: `verify_img`,
    params
  })
}

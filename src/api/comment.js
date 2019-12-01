/*
 * @Author: Superficial
 * @Date: 2019-11-19 22:41:34
 * @LastEditTime: 2019-11-19 22:43:05
 * @Description: 评论接口
 */

// get评论
export function getComments (params) {
  return request({
    url: "comments",
    params
  });
}

// post评论
export function postComment (data) {
  return request({
    url: "comments",
    method: "post",
    data
  });
}

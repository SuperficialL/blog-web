/*
 * @Author: Superficial
 * @Date: 2019-11-19 22:41:34
 * @LastEditTime: 2019-12-15 20:58:35
 * @Description: 评论接口
 */
import request from "@/utils/request";

// get评论
export function getComments(params) {
  return request({
    url: "comments",
    method: "get",
    params
  });
}

// post评论
export function postComment(data) {
  return request({
    url: "comments",
    method: "post",
    data
  });
}

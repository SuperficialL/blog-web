/*
 * @Author: Superficial
 * @Date: 2020-02-10 13:17:52
 * @LastEditTime : 2020-02-10 14:38:55
 * @Description: 赞api
 */
import request from "@/utils/request";

/**
 * @description: 文章点赞
 * @param {Object} type 点赞类型
 * @return {Boolean}  返回点赞状态
 */
export function addLike(params) {
  return request({
    url: "like",
    method: "post",
    params
  });
}

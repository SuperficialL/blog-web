/*
 * @Author: Superficial
 * @Date: 2019-12-15 21:09:42
 * @LastEditTime : 2019-12-22 00:15:39
 * @Description: 友链接口
 */
import request from "@/utils/request";

/**
 * @description: 获取所有友情连接
 * @param {Object} id 查询文章的id
 * @return {Object} friendsLink 返回友情连接和总数
 */
export function getFriendsLink(params) {
  return request({
    url: "friendslink",
    method: "get",
    params
  });
}

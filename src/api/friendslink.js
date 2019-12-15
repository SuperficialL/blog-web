/*
 * @Author: Superficial
 * @Date: 2019-12-15 21:09:42
 * @LastEditTime: 2019-12-15 21:11:20
 * @Description: 友链接口
 */
import request from "@/utils/request";

export function getFriendLink(params) {
  return request({
    url: "friendslink",
    method: "get",
    params
  });
}

/*
 * @Author: Superficial
 * @Date: 2019-11-19 22:40:40
 * @LastEditTime: 2019-12-15 17:38:29
 * @Description: 获取标签接口
 */
import request from "@/utils/request";

// 获取标签集合
export function getTags(params) {
  if (params !== undefined) {
    return request({
      url: `tags/${params.id}`,
      method: "get",
      params
    });
  } else {
    return request({
      url: "tags",
      method: "get",
      params
    });
  }
}

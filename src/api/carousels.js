/*
 * @Author: Superficial
 * @Date: 2019-12-25 23:02:11
 * @LastEditTime : 2019-12-25 23:03:36
 * @Description: 轮播图接口
 */

import request from "@/utils/request";

export function getCarousels(params) {
  return request({
    url: "carousels",
    method: "get",
    params
  });
}

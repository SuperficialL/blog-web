/*
 * @Author: Superficial
 * @Date: 2019-11-19 22:41:34
 * @LastEditTime: 2019-11-28 22:56:51
 * @Description: 导航接口
 */
import request from "@/utils/request";

// 获取导航菜单
export function getMenu(params) {
  return request({
    url: "categories",
    methods: "get",
    params
  });
}

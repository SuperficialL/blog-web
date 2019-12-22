/*
 * @Author: Superficial
 * @Date: 2019-12-22 16:24:13
 * @LastEditTime : 2019-12-22 16:28:25
 * @Description: 统计接口
 */

import request from "@/utils/request";

export function getStatistics() {
  return request({
    url: "siteinfo",
    method: "get"
  });
}

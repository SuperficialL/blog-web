/*
 * @Author: Superficial
 * @Date: 2019-12-25 12:53:26
 * @LastEditTime : 2019-12-25 12:56:33
 * @Description: 时间线接口
 */

import request from "@/utils/request";

/**
 * @description: 获取时间线数据
 * @param {Object} 时间线查询相关参数配置
 * @return {Object} timelines
 */
export function getTimeLines(params) {
  return request({
    url: "timelines",
    method: "get",
    params
  })
}

/*
 * @Author: Superficial
 * @Date: 2019-11-19 22:40:40
 * @LastEditTime: 2019-11-19 22:40:41
 * @Description: 获取标签接口
 */

// 获取标签集合
export function getTags (params) {
  if (params !== undefined) {
    return request({
      url: `tags/${params.id}`,
      params
    });
  } else {
    return request({
      url: "tags",
      params
    });
  }
}

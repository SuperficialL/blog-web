/*
 * @Author: Superficial
 * @Date: 2019-11-19 22:36:45
 * @LastEditTime : 2019-12-22 00:14:37
 * @Description: 文章接口
 */
import request from "@/utils/request";

/**
 * @description: 获取文章列表
 * @param {Object} params 查询文章的条件
 * @return {Object} articles 返回文章的列表数据和总数
 */
export function getArticles(params) {
  return request({
    url: "articles",
    method: "get",
    params
  });
}

/**
 * @description: 获取文章详情页
 * @param {String|Number} id 查询文章的id
 * @return {Object} article 返回文章详细信息
 */
export function getArticle(id) {
  return request({
    url: `articles/${id}`,
    method: "get"
  });
}

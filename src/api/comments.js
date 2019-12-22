/*
 * @Author: Superficial
 * @Date: 2019-11-19 22:41:34
 * @LastEditTime : 2019-12-22 01:17:50
 * @Description: 评论接口
 */
import request from "@/utils/request";

/**
 * @description: 获取评论信息
 * @param {Object} params 查询评论的条件
 * @return {Object} comments 返回评论的列表数据和总数
 */
export function getComments(params) {
  return request({
    url: "comments",
    method: "get",
    params
  });
}

/**
 * @description: 提交评论信息
 * @param {Object} data 评论的相关内容
 * @return {Boolean} 返回评论增加的状态
 */
export function postComment(data) {
  return request({
    url: "comments",
    method: "post",
    data
  });
}

/**
 * @description: 给评论点赞
 * @param {String|Number} id 评论id
 * @return {Boolean} 返回评论增加的状态
 */
export function likeComment(id) {
  return request({
    url: "comments/id",
    method: "post"
  });
}

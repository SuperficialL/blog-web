/*
 * @Author: Superficial
 * @Date: 2019-12-15 14:25:15
 * @LastEditTime : 2019-12-30 21:36:36
 * @Description: 工具函数
 */
import parser from 'ua-parser-js';

/**
 * @description: 把一维数组变为树结构
 * @param {Array} data 需要转换结构的数组
 * @return {Array} parents 返回结构化后的数组
 */
const arr2tree = function (data) {
  let parents = data.filter(
    item => item.parent === undefined || item.parent === null
  );
  let children = data.filter(
    item => item.parent !== undefined && item.parent !== null
  );
  parents.forEach(parent => {
    parent.children = [];
    children.forEach(child => {
      if (child.parent === parent._id) {
        parent.children.push(child);
      }
    });
  });
  return parents;
};

/**
 * @description: 通过userAgent获取操作系统和浏览器信息
 * @param {String} userAgent userAgent信息
 * @return {Object} parseResult 返回操作系统和浏览器信息
 */
const uaParser = function (userAgent) {
  const parseResult = parser(userAgent || '');
  return parseResult;
};

export { arr2tree, uaParser };

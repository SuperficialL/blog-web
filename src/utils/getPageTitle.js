/*
 * @Author: Superficial
 * @Date: 2020-01-01 14:34:10
 * @LastEditTime : 2020-01-01 23:39:25
 * @Description: 获取页面标题
 */


export default function getPageTitle(pageTitle) {
  const title = 'SuperficialL Blog';
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}

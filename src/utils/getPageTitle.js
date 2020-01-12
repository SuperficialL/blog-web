/*
 * @Author: Superficial
 * @Date: 2020-01-01 14:34:10
 * @LastEditTime : 2020-01-07 20:19:38
 * @Description: 获取页面标题
 */

export default function getPageTitle(pageTitle) {
  const title = 'SuperficialL Blog';
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}

/*
 * @Author: Superficial
 * @Date: 2019-12-15 14:25:15
 * @LastEditTime: 2019-12-15 14:26:23
 * @Description: 工具函数
 */
let arr2tree = function(data) {
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

export { arr2tree };

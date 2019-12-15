/*
 * @Author: Superficial
 * @Date: 2019-11-15 22:49:46
 * @LastEditTime: 2019-12-15 20:56:45
 * @Description: 工具函数
 */

const dateFormat = time => {
  if (time) {
    let date = new Date(time);
    let Y = date.getFullYear();
    let M = (date.getMonth() + 1).toString().padStart(2, "0");
    let D = date
      .getDate()
      .toString()
      .padStart(2, "0");
    const h = date
      .getHours()
      .toString()
      .padStart(2, "0");
    const m = date
      .getMinutes()
      .toString()
      .padStart(2, "0");
    const s = date
      .getSeconds()
      .toString()
      .padStart(2, "0");
    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
  }
};

export { dateFormat };

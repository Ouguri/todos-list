// 时间格式函数
export const changeOneToTwo = (str) => {
  if (str.valueOf() < 10) {
    return '0' + str
  }
  return str
}

export const setTime = (time) => {
  const dateObj = time
  return `${dateObj.getFullYear()}-${changeOneToTwo(dateObj.getMonth() + 1)}-${changeOneToTwo(dateObj.getDate())}, ${changeOneToTwo(dateObj.getHours())}:${changeOneToTwo(dateObj.getMinutes())}`
}

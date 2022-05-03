// 对外暴露token函数
export const setTodos = (todos) => {
  localStorage.setItem('TODOS', JSON.stringify(todos))
}

// 专门用来记录添加一项新todos的本地存储
// 打算在此装入----录入时间以及事件点（其实就是一个id记录第几件事件）
export const setEventPoint = (eventPoint) => {
  localStorage.setItem('EVPT', JSON.stringify(eventPoint))
}

export const getEventPoint = () => {
  const eventPointData = []
  const getPoint = JSON.parse(localStorage.getItem('EVPT'))
  for (const i in getPoint) eventPointData[i] = getPoint[i]
  return eventPointData
}

export const getTodos = () => {
  const todosData = []
  const getTodos = JSON.parse(localStorage.getItem('TODOS'))
  for (const i in getTodos) todosData[i] = getTodos[i]
  // const res = getTodos.map(i => i)
  return todosData
}

export const removeTodos = () => {
  localStorage.removeItem('TODOS')
}

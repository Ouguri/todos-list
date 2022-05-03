import { createStore } from 'vuex'
import { setTodos, getTodos, setEventPoint } from '../utils/Todos.js'

export default createStore({
  state: {
    todosValue: getTodos() || []
  },
  mutations: {
    TODOKEEP(state, value) {
      state.todosValue.unshift(value)
      const eventTag = state.todosValue.map((item) => {
        return { time: item.time, eventPoint: item.eventPoint }
      })
      setEventPoint(eventTag)
      setTodos(state.todosValue)
    },
    DELETETODO(state, value) {
      state.todosValue = value
      setTodos(state.todosValue)
    }
  },
  actions: {
    todoKeep({ commit }, value) {
      // 传过来的value是一个[{}]
      commit('TODOKEEP', value)
    },
    deleteTodo({ commit }, value) {
      commit('DELETETODO', value)
    }
  },
  modules: {
  }
})

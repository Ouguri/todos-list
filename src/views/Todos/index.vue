<template>
  <div class="container">
    <div class="addThing">
      <!-- v-model.trim 可以实现去除输入框的前后空格，中间内容多个空格会保留一个 -->
      <el-input class="el-input" v-model.trim="todoThings.todos" placeholder="记录一件事..." @keyup.enter="showing()"></el-input>
      <el-button type="primary" @click="showing()" :disabled="todoThings.todos == ''?true:false">确定</el-button>
    </div>
      <div class="thingsShow">
        <!-- 未完成 -->
        <TodosListData :newGetTodo="getTodo" :ifShow="ifShow" :active="false"></TodosListData >
        <div class="hrr"></div>
        <!-- 完成 -->
        <TodosListData :newGetTodo="getTodo" :ifShow="ifShow" :active="true"></TodosListData >
        <transition enter-active-class="animated animate__fadeIn">
          <div v-show="ifShow" class="delFinish">
            <button @click="ifShow = !ifShow">完成</button>
            <span style="width: 10px"></span>
            <button @click="batchDel(getTodo)">确认删除</button>
          </div>
        </transition>
      </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
// vuex仓库
import { useStore } from 'vuex'
// 时间展示函数
import { setTime } from './time.js'
// 本地存储的获取函数
import { getTodos, getEventPoint } from '../../utils/Todos.js'
import { nanoid } from 'nanoid'
import TodosListData from '../../components/todosListData/index.vue'
// 引入全局事件总线
import emitter from '../../utils/eventbus.js'
export default {
  name: 'Todos',
  components: {
    TodosListData
  },
  setup() {
    // 拿到仓库
    const store = useStore()
    const todoThings = reactive({
      todos: '',
      time: setTime(new Date()),
      newTodos: [],
      isDisable: true
    })
    // mapState接收todos的数据
    const getTodo = ref(getTodos())
    const ifShow = ref(false)
    // 点击整理todos数据，将todos事件提交给仓库
    const showing = () => {
      const res = ref(getEventPoint())
      todoThings.time = setTime(new Date())
      getTodo.value = ''
      store.dispatch('todoKeep', { todos: todoThings.todos, time: todoThings.time, eventPoint: res.value[0] ? res.value[0].eventPoint + 1 : 1, id: nanoid(), isChecked: false })
      todoThings.todos = ''
      getTodo.value = getTodos()
    }
    // 批量删除
    const batchDel = (todos) => {
      todoThings.newTodos = []
      todoThings.newTodos = todos.filter(todo => todo.isChecked !== true)
      getTodo.value = ''
      store.dispatch('deleteTodo', todoThings.newTodos)
      getTodo.value = getTodos()
    }
    // 显示批量操作checkbox
    emitter.on('openCheckbox', (value) => {
      ifShow.value = value
    })

    emitter.on('updataPage', () => {
      getTodo.value = getTodos()
    })
    return {
      todoThings,
      getTodo,
      ifShow,
      showing,
      batchDel
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../public/basicWH.less";
  @border: 1px solid white;
  @boxShadow: grey 0px 0px 4px 0px;
  .container{
    .hrr {
      background-color: lightgrey;
      width: 99%;
      height: 1px;
      padding: 0;
      margin: 0 auto;
    }
    .addThing{
      border: @border;
      border-radius: 7px;
      box-shadow: @boxShadow;
      height: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .el-input {
      width: 95%;
    }
    .thingsShow {
      width: 100%;
      border: @border;
      border-radius: 12px;
      box-shadow: @boxShadow;
      margin: 20px 0 0 0;
      font-size: 20px;
      .delFinish {
        display: flex;
        flex-direction: row-reverse;
        margin: 0 auto;
        width: 99%;
        border-top: 1px solid lightgrey;
        padding: 10px 0;
        button {
          width: 70px;
          height: 30px;
          font-size: 14px;
          background-color: #409eff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          transition: 0.3s all;
        }
        button:hover {
          background-color: #7cbcfc;
        }
      }
    }
  }
</style>

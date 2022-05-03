<template>
  <ul>
    <el-scrollbar max-height="500px">
      <transition-group name="custom-classes-transition" enter-active-class="animated animate__fadeInDown" leave-active-class="animated animate__fadeOutDown">
        <li v-show="todos.isChecked == active" class="thingLi" v-for="(todos) in newGetTodo" :key="todos.id">
          <div>
              <input v-show="ifShow" :class="{checkbox1: !todos.isChecked, checkbox2: todos.isChecked}" type="checkbox" :checked="todos.isChecked" @click="changeStatusOfThing(todos.isChecked, todos, newGetTodo)">
              <span id="normalStatus" :class="{thingsStatus: todos.isChecked == true}">{{ todos.todos }}</span>
              <div :class="ifShow ? 'timeStyle' : 'timeStyle2'">
                <calendar class="calendar" /> {{ todos.time }}
              </div>
          </div>
          <span @click="deleteTodo(todos.id, newGetTodo)">
            <delete style="width: 14px; height: 14px; margin-right: 8px; cursor: pointer;" />
          </span>
        </li>
      </transition-group>
    </el-scrollbar>
  </ul>
</template>

<script>
import { Delete, Calendar } from '@element-plus/icons-vue'
import { reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { setTime } from '../../views/Todos/time.js'
// import { setTodos } from '../../utils/Todos.js'
import emitter from '../../utils/eventbus.js'
export default {
  components: {
    Delete,
    Calendar
  },
  props: ['newGetTodo', 'ifShow', 'active'],
  setup() {
    // 拿到仓库
    const store = useStore()
    // mapState接收todos的数据
    const getTodo = ref([])
    const todoThings = reactive({
      todos: '',
      time: setTime(new Date()),
      newTodos: []
    })
    // 删除todos
    const deleteTodo = (id, newGetTodo) => {
      todoThings.newTodos = []
      todoThings.newTodos = newGetTodo.filter(todo => todo.id !== id)
      store.dispatch('deleteTodo', todoThings.newTodos)
    }
    // 改变事件的选中状态
    const changeStatusOfThing = (status, todos, newGetTodo) => {
      todos.isChecked = !status
      // 通知本地存储改变选中状态再次渲染页面
      store.dispatch('deleteTodo', newGetTodo)
      getTodo.value = newGetTodo
    }
    watch(getTodo.value, () => {
      emitter.emit('updataPage')
    })
    watch(
      () => todoThings.newTodos,
      () => {
        emitter.emit('updataPage')
      }
    )
    return {
      getTodo,
      todoThings,
      deleteTodo,
      changeStatusOfThing
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../public/basicWH.less';
@border: 1px solid white;
@checkBox: 20px;
#buttonStyle() {
  .button {
    -webkit-appearance: none;
    -moz-appearance: none;
    width: @checkBox;
    height: @checkBox;
    border-radius: 50%;
    position: relative;
    transition: 0.5s all;
    top: 3px;
  }
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
ul {
  width: 100%;
  margin: 10px 10px 10px 0;
  #thingShowH();
}
.thingLi {
  height: 60px;
  background-color: rgb(243, 243, 243);
  margin: 0px 10px 13px 10px;
  padding: 5px 5px 0px 8px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  transition: all .3s linear;
}
#normalStatus {
  margin-left: 10px;
}
.thingsStatus {
  text-decoration: line-through;
}
.checkbox1 {
  #buttonStyle.button();
  background-color: white;
  border: 2px solid #409eff;
}
.checkbox2 {
  #buttonStyle.button();
  background-color: #409eff;
  border: 2px solid white;
  box-shadow: #409eff 0 0 0 1.5px;
}
.checkbox1:hover {
  border: 2px solid white !important;
  background-color: #409eff;
  box-shadow: #409eff 0 0 0 1.5px;
  transition: 0.5s all;
}
.timeStyle {
  margin: 8px 0 0 31px;
  font-size: 10px;
}
.timeStyle2 {
  margin: 8px 0 0 10px;
  font-size: 10px;
}
.calendar {
  vertical-align: -2px;
  width: 14px;
  height: 14px;
}
</style>

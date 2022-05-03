<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <Headers></Headers>
      </el-header>
      <el-container>
        <!-- 左侧功能 -->
        <el-aside width="200px" class="aside">
          <FnList></FnList>
        </el-aside>
        <el-container>
          <!-- todoslist功能 -->
          <el-main class="main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import Todos from './Todos/index.vue'
import FnList from '../components/Fnlist/index.vue'
// import Headers from '../components/Headers/index.vue'
export default ({
  components: {
    // Todos,
    FnList
    // Headers
  },
  setup() {
    return {
    }
  }
})
</script>

<style lang="less" scoped>
  .common-layout {
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      overflow: hidden;
      padding: 0;
    }
    .aside{
      width: 220px;
    }
    .main {
      padding: 40px;
      margin-right: 20px;
    }
  }
</style>


<template>
<div class="nav">
  <el-row class="tac">
    <el-col :span="12">
      <!-- <h4 class="mb-2">menu</h4> -->
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <el-menu-item index="" v-show="isShow.show==true"  @click="finishOrDel">
          <el-icon><Location /></el-icon>
          <span>批量操作</span>
        </el-menu-item>
        <el-menu-item index="/home/echart" @click="isShow.show = false">
          <!-- <router-link to="/home/echart"> -->
            <el-icon><icon-menu /></el-icon>
            <span>数据展示</span>
          <!-- </router-link> -->
        </el-menu-item>
        <el-menu-item index="/home/todos" @click="isShow.show = true">
          <!-- <router-link to="/home/todos"> -->
            <el-icon><Document /></el-icon>
            <span>返回首页</span>
          <!-- </router-link> -->
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</div>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location
} from '@element-plus/icons-vue'
import { reactive } from '@vue/reactivity'
// 全局事件总线
import emitter from '../../utils/eventbus.js'

const isShow = reactive({ show: true })

const finishOrDel = () => {
  emitter.emit('openCheckbox', true)
}
const handleOpen = () => {}
const handleClose = () => {}
</script>

<style lang="less">
@import '../../../public/basicWH.less';
  .el-menu-vertical-demo {
    width: 200px;
    min-height: 76vh;
    #FnlistH()
  }
  .nav{
    margin-top: 20px;
    width: 200px;
    // min-height: 770px;
    display: flex;
    justify-content: center;
  }
</style>

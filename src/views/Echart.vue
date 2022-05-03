<template>
  <div class="container">
      <div id="main"></div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive } from 'vue'
import { getEventPoint } from '../utils/Todos.js'
import * as echarts from 'echarts'

const todoDatas = reactive(getEventPoint())
// 基于准备好的dom，初始化echarts实例
let myChart = null
const initchart = () => {
  // 绘制图表
  myChart = echarts.init(document.getElementById('main'))
  myChart.setOption({
    title: {
      text: `至今为止，你已经记录了${todoDatas.map((item) => item.eventPoint)[0]}个事件啦`,
      left: 'center'
    },
    tooltip: {},
    xAxis: {
      // data: ['一', '二', '三', '四', '五', '六', '七']
      data: todoDatas.reverse().map((item) => item.time),
      axisLabel: {
        showMaxLabel: true,
        interval: 4
      }
    },
    yAxis: {
      // 显示y轴线
      axisLine: {
        show: true
      },
      // 显示y轴刻度
      axisTick: {
        show: true
      }
    },
    series: [
      {
        name: '销量',
        type: 'line',
        smooth: true,
        data: todoDatas.map((item) => item.eventPoint)
      }
    ]
  })
  window.onresize = myChart.resize
}
onMounted(() => {
  initchart()
})
// 声明echarts示例。并在beforeUnmount生命周期里，对资源进行释放。
onBeforeUnmount(() => {
  if (!myChart) {
    return
  }
  myChart.dispose()
  myChart = null
})
</script>

<style lang="less" scoped>
  #main{
    width: 100%;
    height: 767px;
  }
  .container {
    height: 99%;
    display: flex;
    align-items: center;
  }
</style>

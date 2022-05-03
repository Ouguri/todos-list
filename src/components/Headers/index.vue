<template>
  <div class="container">
    <img class="bgc" src="../../../public/images/bgc.jpg" alt="">
    <h1>hello VUE TodoList!</h1>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  h1 {
    font-size: 40px;
    position: absolute;
    top: 7%;
    left: 50%;
    transform: translate(-50%, -7%);
    color: rgb(255, 255, 255);
    text-shadow: 0px 0px 4px black;
  }
  .container {
    width: 100%;
 }
 .bgc{
   width: 100%;
   position: relative;
   opacity: 0.8;
   bottom: 120px;
 }
</style>

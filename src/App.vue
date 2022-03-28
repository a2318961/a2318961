<template>
  <div>
    <div><li v-for="i in 10" :key="i"></li></div>
    <router-view />
    <div style="text-align: center; padding: 20px; font-size: 12px">
      redesign by css7
    </div>
    <van-tabbar v-model="active" v-if="isShow" active-color="#53e3a6">
      <van-tabbar-item name="/" replace to="/" icon="home-o"
        >站台1</van-tabbar-item
      >
      <van-tabbar-item
        name="/lineSearch"
        replace
        to="/lineSearch"
        icon="exchange"
        >线路</van-tabbar-item
      >
      <van-tabbar-item name="/setting" replace to="/setting" icon="setting-o"
        >设置</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const active = ref(0);
const isShow = ref(true);
const route = useRoute();

watch(route, val => {
  isShow.value = ["Home", "LineSearch", "Setting"].includes(route.name);
  if (isShow.value) {
    active.value = route.path;
  }
});
</script>

<style lang="less">
#app {
  color: #fff !important;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom right, #50a3a2, #53e3a6);
  position: relative;
}
#app {
  // 使气泡背景充满整个屏幕；
  // 如果元素内容超出给定的宽度和高度，overflow 属性可以确定是否显示滚动条等行为；
  li {
    position: fixed;
    // bottom 的设置是为了营造出气泡从页面底部冒出的效果；
    bottom: -160px;
    // 默认的气泡大小；
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    list-style: none;
    // 使用自定义动画使气泡渐现、上升和翻滚；
    animation: square 15s infinite;
    transition-timing-function: linear;
    // 分别设置每个气泡不同的位置、大小、透明度和速度，以显得有层次感；
    &:nth-child(1) {
      left: 10%;
    }
    &:nth-child(2) {
      left: 20%;
      width: 90px;
      height: 90px;
      animation-delay: 2s;
      animation-duration: 7s;
    }
    &:nth-child(3) {
      left: 25%;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 40%;
      width: 60px;
      height: 60px;
      animation-duration: 8s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(5) {
      left: 70%;
    }
    &:nth-child(6) {
      left: 80%;
      width: 120px;
      height: 120px;
      animation-delay: 3s;
      background-color: rgba(255, 255, 255, 0.2);
    }
    &:nth-child(7) {
      left: 32%;
      width: 160px;
      height: 160px;
      animation-delay: 2s;
    }
    &:nth-child(8) {
      left: 55%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
      animation-duration: 15s;
    }
    &:nth-child(9) {
      left: 25%;
      width: 10px;
      height: 10px;
      animation-delay: 2s;
      animation-duration: 12s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(10) {
      left: 85%;
      width: 160px;
      height: 160px;
      animation-delay: 5s;
    }
  }
  // 自定义 square 动画；
  @keyframes square {
    0% {
      opacity: 0.5;
      transform: translateY(0px) rotate(45deg);
    }
    25% {
      opacity: 0.75;
      transform: translateY(-400px) rotate(90deg);
    }
    50% {
      opacity: 1;
      transform: translateY(-600px) rotate(135deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-1000px) rotate(180deg);
    }
  }
  .van-loading__text,
  .van-pull-refresh__head {
    color: #fff !important;
    z-index: 10;
  }
}
</style>

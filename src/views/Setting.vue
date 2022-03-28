<template>
  <div class="setting-wrap">
    <van-nav-bar title="设置" />
    <van-cell title="站台管理" is-link to="/stationList" />
    <van-cell title="收藏线路" is-link to="/collection" />
    <van-cell title="清除缓存" @click="clearCache" />
    <van-cell title="版本信息" :value="version" />
  </div>
</template>
<script setup>
import { Toast, Dialog } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const version = ref("2022.2.23.02");
const clearCache = () => {
  Dialog.confirm({
    message: "确认删除所有缓存数据吗"
  }).then(() => {
    localStorage.clear();
    Toast("清除成功");
  });
};

const handleBack = () => {
  router.back();
};
</script>
<style lang="less" scoped>
:deep(.van-cell__right-icon),
:deep(.van-cell__value) {
  color: #fff !important;
}
:deep(.van-cell) {
  background: rgba(255, 255, 255, 0) !important;
  color: #fff !important;
}
</style>

<template>
  <div class="setting-wrap">
    <van-nav-bar title="收藏线路" left-arrow @click-left="handleBack" />
    <div>
      <van-swipe-cell v-for="item in lineList" :key="item.lineNo">
        <van-cell
          @click="handleView(item.lineId)"
          :border="true"
          :title="`${item.lineNo} ${item.lineDirection}`"
        />
        <template #right>
          <van-button
            square
            type="danger"
            text="删除"
            @click.stop="handleDelete(item)"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";

const router = useRouter();
const lineList = ref([]);

const getList = () => {
  let lineList = null;
  lineList = localStorage.getItem("lineList");
  lineList = JSON.parse(lineList);
  if (!lineList) {
    localStorage.setItem("lineList", JSON.stringify([]));
    lineList = [];
  }
  return lineList;
};

const handleBack = () => {
  router.back();
};
const handleDelete = item => {
  const lineList = getList().filter(v => v.lineId != item.lineId);
  Toast("取消成功");
  updateList(lineList);
};

const updateList = list => {
  localStorage.setItem("lineList", JSON.stringify(list));
  lineList.value = getList();
};

const handleView = id => {
  router.push(`/line/${id}`);
};

lineList.value = getList();
</script>
<style lang="less" scoped>
:deep(.van-cell__right-icon),
:deep(.cell__value) {
  color: #fff !important;
}
:deep(.van-cell) {
  background: rgba(255, 255, 255, 0) !important;
  color: #fff !important;
}
</style>

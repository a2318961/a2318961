<template>
  <van-icon v-if="!isCollect" @click="handleCollect" name="star-o" size="18" />
  <van-icon v-else @click="cancelCollect" name="star" size="18" />
</template>
<script setup>
import { Toast } from "vant";
import { ref, watch } from "vue";

const props = defineProps({
  line: {
    type: Object,
    default: () => ({})
  }
});

const isCollect = ref(false);

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

const handleCollect = v => {
  const lineList = getList();
  const maxLenth = 10;
  if (lineList.length >= maxLenth) {
    Toast(`添加失败，线路最多只能添加${maxLenth}个`);
    return;
  }
  lineList.push({
    lineNo: props.line.lineNo,
    lineId: props.line.lineId,
    lineDirection: props.line.lineDirection
  });
  updateList(lineList);
  Toast("收藏成功");
};

const cancelCollect = v => {
  const lineList = getList().filter(v => v.lineId != props.line.lineId);
  Toast("取消成功");
  updateList(lineList);
};

const updateList = list => {
  localStorage.setItem("lineList", JSON.stringify(list));
  const lineList = getList();
  isCollect.value = lineList.some(v => v.lineId == props.line.lineId);
};

watch(
  () => props.line.lineId,
  () => {
    const lineList = getList();
    isCollect.value = lineList.some(v => v.lineId == props.line.lineId);
  },
  { immediate: true }
);
</script>

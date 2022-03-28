<template>
  <div class="setting-wrap">
    <van-nav-bar title="站台管理" left-arrow @click-left="handleBack" />
    <van-button type="primary" block text="添加站台" @click="show = true" />
    <van-overlay :show="show" @click="show = false">
      <div class="search-box" @click.stop>
        <van-search
          v-model="value"
          @update:model-value="handleChange"
          placeholder="请输入搜索关键词"
        />
        <div class="search-list" v-if="searchList.length > 0">
          <van-tag
            v-for="item in searchList"
            :key="item.stopName"
            plain
            size="medium"
            type="primary"
            @click="handlePush(item)"
            >{{ item.stopName }}</van-tag
          >
        </div>
      </div>
    </van-overlay>

    <div>
      <van-swipe-cell v-for="item in stationList" :key="item.name">
        <van-cell :border="true" :title="item.name" />
        <template #right>
          <van-button
            square
            type="danger"
            text="删除"
            @click="handleDelete(item)"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>
<script setup>
import { Toast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { searchStopList } from "../js/api";
import { debounce } from "../js/utils";

const show = ref(false);
const value = ref("");
const router = useRouter();
const stationList = ref([]);
const searchList = ref([]);
let list = null;

const getList = () => {
  list = localStorage.getItem("stationList");
  list = JSON.parse(list);
  if (!list) {
    localStorage.setItem("stationList", JSON.stringify([]));
    list = [];
  } else {
    stationList.value = list;
  }
  console.log("list", list);
};

getList();

const handleChange = debounce(value => {
  console.log("handleChange", value);
  if (!value || value.length < 2) {
    searchList.value = [];
    return;
  }
  searchStopList(value).then(res => {
    const { stops = [] } = res.data.data;
    searchList.value = stops;
  });
}, 300);

const handlePush = v => {
  const maxLenth = 8;
  if (list.length >= maxLenth) {
    Toast(`添加失败，站台最多只能添加${maxLenth}个`);
    return;
  }
  if (list.some(j => j.stopId == v.stopId)) {
    Toast("站台已存在");
    return;
  }
  list.push({ name: v.stopName, stopId: v.stopId });
  updateList();
  Toast("添加成功");
};

const handleDelete = v => {
  list = list.filter(item => v.stopId != item.stopId);
  Toast("删除成功");
  updateList();
};

const updateList = () => {
  localStorage.setItem("stationList", JSON.stringify(list));
  getList();
};

const clearCache = () => {
  localStorage.clear();
  Toast("清除成功");
};

const handleBack = () => {
  router.back();
};
</script>
<style lang="less" scoped>
.setting-wrap {
  .search-box {
    position: relative;
  }
  .search-list {
    position: absolute;
    z-index: 10;
    background: #fff;
    width: auto;
    overflow-y: scroll;
    padding: 5px 10px 10px;
    max-height: calc(100vh - 54px);
    // top:54px;
    left: 0;
    // bottom:0;
    right: 0;
  }
  .van-tag {
    margin: 0 3px 3px 0;
  }
}

:deep(.van-cell) {
  background: rgba(255, 255, 255, 0) !important;
  color: #fff !important;
}
</style>

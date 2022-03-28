<template>
  <div
    style="
      padding: 20px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
    "
  >
    到站查询工具
  </div>

  <div v-if="options.length == 0">
    <van-empty image="search">
      <van-button
        type="danger"
        icon="plus"
        to="/stationList"
        class="bottom-button"
        >暂无站台，去添加</van-button
      >
    </van-empty>
  </div>
  <div v-else>
    <van-pull-refresh v-model="isSpin" @refresh="onRefresh">
      <van-tabs
        v-model:active="active"
        @change="handleTabChange"
        :ellipsis="false"
      >
        <van-tab
          v-for="item in options"
          :key="item.stopId"
          :name="item.stopId"
          :title="item.name"
        />
      </van-tabs>
      <div style="padding: 10px; min-height: calc(100vh - 175px)">
        <div v-for="(v, i) in groupList" :key="i" class="bus-item">
          线路{{ i }}
          <van-row
            v-for="(j, k) in v"
            :key="k"
            style="margin-top: 5px"
            justify="space-between"
            @click="handleView(j.lineId)"
          >
            <div>开往{{ j.nextStop }}方向</div>
            <div>
              <span v-if="j.nearBus > 0">{{ j.nearBus }}站</span>
              <span v-else-if="j.nearBus == 0">即将到站</span>
              <span v-else>暂无信息</span>
              <van-icon style="margin-left: 10px" name="arrow" />
            </div>
          </van-row>
        </div>
        <div
          v-if="updateTime"
          style="font-size: 12px; text-align: center; padding: 15px 0"
        >
          更新时间：{{ updateTime }}
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { Toast } from "vant";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { searchStopDetail } from "../js/api";
import { formatDate } from "../js/utils";

const router = useRouter();
const active = ref("");
const isSpin = ref(true);
const groupList = ref([]);
const options = ref([]);
const updateTime = ref("");
const init = () => {
  let stationList = JSON.parse(localStorage.getItem("stationList")) || [];
  options.value = stationList;
  const tabIndex = localStorage.getItem("tabIndex");
  setTabIndex(tabIndex);
};

const updateList = list => {
  localStorage.setItem("stationList", JSON.stringify(list));
  options.value = list;
  setTabIndex(null);
};

const setTabIndex = stopId => {
  if (stopId) {
    active.value = stopId;
    localStorage.setItem("tabIndex", stopId);
  } else {
    const firstStopId = options.value[0]?.stopId;
    firstStopId && (active.value = firstStopId);
  }
};
const getData = (showMessage = false) => {
  console.log("showMessage", showMessage);
  // return;
  if (options.value.length == 0 || !active.value) return;
  const item = options.value.find(v => v.stopId == active.value);
  isSpin.value = true;
  searchStopDetail(item.stopId)
    .then(res => {
      const list = res.data.data || [];
      const obj = {};

      list.forEach(e => {
        e.lines.forEach(v => {
          if (!obj[v.lineNo]) {
            obj[v.lineNo] = [];
          }
          v.nextStop = e.nextStop;
          obj[v.lineNo].push(v);
        });
      });
      groupList.value = obj;
      console.log("obj", obj);
      updateTime.value = formatDate(new Date());
      setTimeout(() => {
        showMessage && Toast("刷新成功");
        isSpin.value = false;
      }, 600);
    })
    .catch(err => {
      setTimeout(() => {}, 600);
      Toast("刷新失败");
      isSpin.value = false;
    });
};

const onRefresh = () => {
  getData(true);
};

const handleView = id => {
  router.push(`/line/${id}`);
};

const handleTabChange = e => {
  console.log("handleTabChange", e);
  localStorage.setItem("tabIndex", e);
};

init();

watchEffect(() => getData(false));
</script>
<style lang="less">
.refreash {
  position: fixed;
  font-size: 24px;
  .spin {
    animation: spin 1s;
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(720deg);
  }
}
.van-tabs__nav {
  background: rgba(255, 255, 255, 0) !important;
  .van-tab {
    color: #fff !important;
    font-size: 16px;
  }
}

.van-cell,
.van-collapse-item__content {
  background: rgba(255, 255, 255, 0) !important;
  color: #fff !important;
}
.bus-item {
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.3) !important;
  border-radius: 10px;
  padding: 10px;
}
</style>

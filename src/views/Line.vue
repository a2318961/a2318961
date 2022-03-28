<template>
  <van-nav-bar
    v-if="!isComponent"
    title="线路详情"
    left-arrow
    @click-left="handleBack"
  >
    <template #right>
      <van-icon
        style="margin-right: 15px"
        @click="handleExchange"
        name="exchange"
        size="18"
        v-if="!isSpin"
      />
      <LineStar v-if="!isSpin" :line="{ lineId: id, lineNo, lineDirection }" />
    </template>
  </van-nav-bar>

  <div class="line-wrap">
    <div style="font-size: 13px; margin-bottom: 20px">
      <div>{{ title }}</div>
    </div>
    <van-pull-refresh v-model="isSpin" @refresh="onRefresh">
      <div class="line-scroll">
        <div
          class="line-item"
          :class="{ arrive: item.flag }"
          v-for="(item, index) in stopList"
          :key="index"
        >
          <div class="bus-icon" v-if="item.show">
            <van-icon name="logistics" size="20" />
          </div>
          {{ index + 1 }}
          {{ item.stopName }}
        </div>
      </div>
      <div
        v-if="updateTime"
        style="font-size: 12px; text-align: center; padding: 15px 0"
      >
        更新时间：{{ updateTime }}
      </div>
    </van-pull-refresh>
  </div>
</template>
<script setup>
import { Toast } from "vant";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getLineLineDetail } from "../js/api";
import { formatDate } from "../js/utils";
import LineStar from "./LineStar.vue";

const props = defineProps({
  isComponent: {
    type: Boolean,
    default: false
  },
  lineId: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(["getStatus"]);

const route = useRoute();
const router = useRouter();
const stopList = ref([]);
const title = ref("");
const tips = ref("");
const isSpin = ref(false);
console.log("isComponent", props.isComponent);
const id = ref("");
const lineNo = ref("");
const lineDirection = ref("");
const updateTime = ref("");
const getData = (lineId, showMessage = false) => {
  isSpin.value = true;
  emit("getStatus", isSpin.value);
  getLineLineDetail(lineId)
    .then(res => {
      const {
        stops = [],
        buses = [],
        startStopName,
        endStopName,
        firstTime,
        lastTime,
        lineName
      } = res.data.data;
      title.value = `线路${lineName} ${startStopName} -> ${endStopName}`;
      lineNo.value = lineName;
      lineDirection.value = `${startStopName} -> ${endStopName}`;
      tips.value = `${firstTime}~${lastTime}`;
      buses.forEach(v => {
        const index = v.split("|")[2];
        const flag = v.split("|")[3];
        stops[index - 1].show = true;
        stops[index - 1].flag = +flag;
        stops[index - 1].count = stops[index - 1].count
          ? stops[index - 1].count++
          : 1;
      });
      stopList.value = stops;
      updateTime.value = formatDate(new Date());
      setTimeout(() => {
        showMessage && Toast("刷新成功");
        isSpin.value = false;
        emit("getStatus", isSpin.value);
      }, 600);
    })
    .catch(err => {
      Toast("刷新失败");
      isSpin.value = false;
    });
};

const handleExchange = () => {
  console.log("handleExchange", id.value);
  const [city, line, direction] = id.value.split("-");
  id.value = `${city}-${line}-${+!+direction}`;
  getData(id.value);
};

const onRefresh = () => {
  getData(id.value, true);
};

const handleBack = () => {
  router.back();
};
watch(
  () => props.lineId,
  () => {
    id.value = props.isComponent ? props.lineId : route.params.id;
    getData(id.value);
  },
  { immediate: true }
);
</script>
<style lang="less" scoped>
.line-wrap {
  padding: 20px;
}
.line-scroll {
  font-size: 13px;
  overflow: scroll;
  padding: 40px 15px 15px 30px;
  white-space: nowrap;

  .line-item {
    display: inline-block;
    width: 22px;
    padding-right: 20px;
    vertical-align: top;
    white-space: normal;
    position: relative;
    padding-top: 10px;
    .bus-icon {
      position: absolute;
      top: -23px;
      left: -25px;
    }
    .van-badge {
      position: absolute;
      top: -30px;
      left: -30px;
      width: 16px;
      height: 16px;
    }
    &.arrive {
      .bus-icon {
        left: -8px;
        .van-icon {
          color: #1989fa;
        }
      }
      .van-badge {
        left: -15px;
      }
    }

    &:last-of-type {
      padding-right: 0px;
      &::after {
        display: none;
      }
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 42px;
      height: 2px;
      background: #fff;
      top: 0px;
      left: 0px;
    }
    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
      top: -3px;
      left: 0px;
    }
  }
}
</style>

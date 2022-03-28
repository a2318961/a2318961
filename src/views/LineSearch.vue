<template>
  <div class="line-search-wrap">
    <van-nav-bar title="线路查询">
      <template #right>
        <van-icon
          style="margin-right: 15px"
          @click="handleExchange"
          v-if="lineId && !isSpin"
          name="exchange"
          size="18"
        />
        <LineStar
          v-if="lineId && !isSpin"
          :line="{ lineId, lineNo, lineDirection }"
        />
      </template>
    </van-nav-bar>
    <van-search
      v-show="!show"
      placeholder="请输入搜索关键词"
      readonly
      @click="handleOpen"
    />
    <!-- <van-button type="danger" block text="查询线路" @click="show = true" /> -->
    <van-overlay :lock-scroll="false" :show="show" @click="handleClose">
      <div class="search-box" @click.stop>
        <van-search
          ref="search"
          v-model="value"
          @update:model-value="handleChange"
          placeholder="请输入搜索关键词"
        />
        <div class="search-list" v-if="searchList.length > 0">
          <van-cell
            v-for="item in searchList"
            :key="item.lineId"
            :title="`${item.lineNo} ${item.startStopName}->${item.endStopName}`"
            @click="handleSelect(item)"
          />
        </div>
      </div>
    </van-overlay>

    <div v-if="lineId">
      <Line :isComponent="true" :lineId="lineId" @getStatus="getStatus" />
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { searchLineList } from "../js/api";
import Line from "./Line.vue";
import LineStar from "./LineStar.vue";
import { debounce } from "../js/utils";

const show = ref(false);
const isSpin = ref(false);
const value = ref("");
const lineId = ref("");
const lineNo = ref("");
const lineDirection = ref("");
const router = useRouter();
const searchList = ref([]);
const search = ref(null);

const handleSelect = item => {
  lineId.value = item.lineId;
  lineNo.value = item.lineNo;
  lineDirection.value = `${item.startStopName} -> ${item.endStopName}`;
  handleClose();
};

const handleOpen = () => {
  show.value = true;
  nextTick(() => {
    search.value.focus();
  });
};
const handleClose = () => {
  show.value = false;
  searchList.value = [];
  value.value = "";
};

const handleChange = debounce(value => {
  if (!value || value.length < 1) {
    searchList.value = [];
    return;
  }
  searchLineList(value).then(res => {
    const { lines = [] } = res.data.data;
    searchList.value = lines.splice(0, 10);
  });
}, 800);

const getStatus = flag => {
  isSpin.value = flag;
};

const handleExchange = () => {
  console.log("handleExchange", lineId.value);
  const [city, line, direction] = lineId.value.split("-");
  lineId.value = `${city}-${line}-${+!+direction}`;
};

const handleBack = () => {
  router.back();
};
</script>
<style lang="less" scoped>
.line-search-wrap {
  .van-cell {
    font-size: 13px;
  }
}
.search-list {
  overflow: scroll;
  height: calc(100vh - 54px);
}
</style>

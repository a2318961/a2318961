<template>
  <div id="bus-map"></div>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  lineData: {
    type: Object,
    default: {}
  }
});

onMounted(() => {
  initMap();
  console.log("lineData", props.lineData);
});
function initMap() {
  var map = new AMap.Map("bus-map", {
    resizeEnable: true,
    // mapStyle: "amap://styles/blue", //设置地图的显示样式
    center: [114.32880689118193, 30.57820691136083], //地图中心点
    zoom: 16 //地图显示的缩放级别
  });

  var linesearch;
  /*公交线路查询*/
  function lineSearch() {
    var busLineName = props.lineData.lineName;
    if (!busLineName) return;
    //实例化公交线路查询类，只取回一条路线
    if (!linesearch) {
      linesearch = new AMap.LineSearch({
        pageIndex: 1,
        city: "武汉",
        pageSize: 1,
        extensions: "all"
      });
    }
    //搜索“536”相关公交线路
    linesearch.search(busLineName, function (status, result) {
      map.clearMap();
      if (status === "complete" && result.info === "OK") {
        lineSearch_Callback(result);
        console.log("result", result);
      } else {
        alert(result);
      }
    });
  }
  /*公交路线查询服务返回数据解析概况*/
  function lineSearch_Callback(data) {
    var lineArr = data.lineInfo;
    var lineNum = data.lineInfo.length;
    if (lineNum == 0) {
    } else {
      for (var i = 0; i < lineNum; i++) {
        var pathArr = lineArr[i].path;
        var stops = lineArr[i].via_stops;
        console.log("stops", stops);
        var startPot = stops[0].location;
        var endPot = stops[stops.length - 1].location;
        if (i == 0)
          //作为示例，只绘制一条线路
          drawbusLine(stops, pathArr);
      }
    }
  }
  /*绘制路线*/
  function drawbusLine(stops, BusArr) {
    const buses = props.lineData.buses.map(v => {
      const arr = v.split("|");
      const len = arr.length;
      const lng = arr[len - 1];
      const lat = arr[len - 2];
      return {
        position: [lat, lng]
      };
    });
    console.log("buses", buses);
    // 绘制实时公交
    for (var i = 0; i < buses.length; i += 1) {
      var center = buses[i].position;
      var circleMarker = new AMap.CircleMarker({
        center: center,
        radius: 6, //3D视图下，CircleMarker半径不要超过64px
        strokeColor: "white",
        strokeWeight: 2,
        strokeOpacity: 0.5,
        fillColor: "rgba(0,0,255,1)",
        fillOpacity: 0.5,
        zIndex: 10,
        bubble: true
      });
      circleMarker.setMap(map);
    }

    //绘制乘车的路线
    var busPolyline = new AMap.Polyline({
      map: map,
      path: BusArr,
      strokeColor: "#07c160", //线颜色
      strokeOpacity: 0.8, //线透明度
      isOutline: false,
      outlineColor: "white",
      strokeWeight: 6 //线宽
    });
    // 将 busPolyline 显示在地图中心并自动缩放地图到合适级别。
    // true表示需要动画过程，[60,200,60,60]表示上下左右避让像素
    map.setFitView(busPolyline, true, [30, 30, 30, 30]);
  }
  lineSearch();
}
</script>
<style lang="less" scoped>
#bus-map {
  width: calc(100% + 40px);
  height: 50vh;
  margin-left: -20px;
}
/deep/.stops-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4a9aff;
}
</style>

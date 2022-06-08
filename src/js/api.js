import axios from "axios";

const baseUrl = "http://real-time-bus.whgjzt.com:9087/website//web/420100";
//线路详情
export const getLineLineDetail = lineId => {
  return axios.get(`${baseUrl}/line/${lineId}.do?Type=LineDetail`);
};
//线路列表
export const searchLineList = line => {
  return axios.get(`${baseUrl}/search.do?keyword=${line}&type=line`);
};
//站台详情
export const searchStopDetail = stopId => {
  return axios.get(`${baseUrl}/stop/group/${stopId}.do?stopId=${stopId}`);
};
//站台列表
export const searchStopList = keyword => {
  return axios.get(`${baseUrl}/search.do?type=stop&keyword=${keyword} `);
};

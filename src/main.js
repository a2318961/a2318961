import App from "./App.vue";
import router from "./js/router";
import { createApp } from "vue";

import {
  Button,
  Tabbar,
  TabbarItem,
  NavBar,
  Cell,
  SwipeCell,
  Toast,
  Empty,
  PullRefresh,
  Tabs,
  Tab,
  Icon,
  Row,
  Search,
  Overlay,
  Dialog,
  Tag
} from "vant";

createApp(App)
  .use(router)
  .use(Button)
  .use(Tabbar)
  .use(TabbarItem)
  .use(NavBar)
  .use(Cell)
  .use(SwipeCell)
  .use(Toast)
  .use(Empty)
  .use(PullRefresh)
  .use(Tabs)
  .use(Tab)
  .use(Icon)
  .use(Row)
  .use(Search)
  .use(Overlay)
  .use(Dialog)
  .use(Tag)
  .mount("#app");

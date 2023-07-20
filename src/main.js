import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import axios from "axios";

// import { Input, Button } from "ant-design-vue";

Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  axios,
  router,
  render: (h) => h(App),
}).$mount("#app");

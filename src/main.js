import Vue from "vue";

import { createPinia, PiniaVuePlugin } from "pinia";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import ApiService from "./common/api.service";
import DateFilter from "./common/date.filter";
import ErrorFilter from "./common/error.filter";

Vue.use(VueCompositionApi);
Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);
ApiService.init();
Vue.use(PiniaVuePlugin);
const pinia = createPinia();
// Ensure we checked auth before each page load.

// router.beforeEach((to, from, next) => {
//   // const storeAuth = useAuthStore();
//   // Promise.all([storeAuth[CHECK_AUTH]()]).then(next);
// });

new Vue({
  pinia,
  router,
  render: (h) => h(App)
}).$mount("#app");

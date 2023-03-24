import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import L from 'leaflet';
import "leaflet/dist/leaflet.css"
// 插件-加载国内地图
import "leaflet.chinatmsproviders/src/leaflet.ChineseTmsProviders.js"
// 插件-海量点位插件
import '@/utils/leaflet/leaflet.canvas-markers.js'
// 插件-实时定位
import "@/utils/leaflet/leaflet-coordinates/Control.Coordinates.js"
import "@/utils/leaflet/leaflet-coordinates/Control.Coordinates.css"
import leafletUtils from '@/utils/leaflet/leaflet-utils.js'
Vue.prototype.leafletUtils = leafletUtils;
Vue.use(L)

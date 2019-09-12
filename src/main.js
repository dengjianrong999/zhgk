// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from "jquery";
import "../plugins/zTree_v3-master/js/jquery.ztree.core.min.js"
import "../plugins/zTree_v3-master/js/jquery.ztree.excheck.min.js"
import "../plugins/zTree_v3-master/js/jquery-1.4.4.min.js"
// import 'swiper/dist/css/swiper.css';

Vue.use(ElementUI);
//过滤时间
Vue.filter('time', function(value) {
  if(!value)return;
  return value.slice(0,10);
});
// /axios配置/
import axios from 'axios'
Vue.prototype.$http = axios,

 //正式环境-begin
  // Vue.prototype.baseurl = 'http://117.121.97.120:9001/bjsy-zhgk/',
  // Vue.prototype.baseurl2= 'http://117.121.97.120:9001/bjsy-zhgkfx/',
  // Vue.prototype.baseurl3 = 'http://117.121.97.120:9001/bjsy-dc/',
  // Vue.prototype.baseurl4='http://117.121.97.120:9001/'
  //正式环境-end
// Vue.prototype.baseurl = 'http://192.168.3.209:10000/bjsy-zhgk/',
// Vue.prototype.baseurl2= 'http://192.168.3.209:10000/bjsy-zhgkfx/',
// Vue.prototype.baseurl3='http://192.168.3.209:10000/bjsy-dc/'
// Vue.prototype.baseurl4='http://192.168.3.209:10000/'
// //测试环境-begin
Vue.prototype.baseurl = 'http://192.168.100.83:8091/bjsy-zhgk/',
Vue.prototype.baseurl2= '../',
Vue.prototype.baseurl3='http://192.168.100.83:8092/bjsy-dc/',
Vue.prototype.baseurl4='http://117.121.97.120:9001/',

//测试环境-end
axios.defaults.withCredentials = true ,
Vue.config.productionTip = false,

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

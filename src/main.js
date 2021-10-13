// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created () {
    router.beforeEach((to, from, next) => {
      if (to.meta.isSeller) {
        //页面是否登录
        if (localStorage.getItem("account")) {
          //本地存储中是否有token(uid)数据
          next(); //表示已经登录
        } else {
          //next可以传递一个路由对象作为参数 表示需要跳转到的页面
          next({
            name: "Home"
          });
        }
      } else {
        //表示不需要登录
        next(); //继续往后走
      }
    })
  }
})

import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import './assets/filter/time'
Vue.config.productionTip = false
Vue.use(VueResource)
  /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
  /* router.beforeEach((to, from, next) => {
    let flag = true
    let goindex = false
    let username = localStorage.getItem('username')
    if (username === null) {
      flag = false
    }
    if (to.path === '/offer_success' || to.path === '/inquiry' || to.path === '/inquiry/:id' || to.path === '/inquiry/detail/:id' || to.path === '/msg' || to.path === '/account' || to.path === '/change_pwd') {
      goindex = true
    }
    if (goindex && !flag) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }) */
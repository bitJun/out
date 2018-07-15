import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Reset from '@/components/resetpwd/resetpwd.vue'
import AgreeMent from '@/components/common/agreement.vue'
import OfferSuccess from '@/components/offer/success.vue'
import Inquiry from '@/components/Inquiry/inquiry.vue'
import Waitinquiry from '@/components/Inquiry/wait.vue'
import Detail from '@/components/Inquiry/detail.vue'
import Msg from '@/components/msg/msg.vue'
import Account from '@/components/account/my.vue'
import Settled from '@/components/settled/settled.vue'
import About from '@/components/about/about.vue'
import ChangePwd from '@/components/change_pwd/change_pwd.vue'
import Quotation from '@/components/Inquiry/quotation.vue'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '',
    name: 'index',
    component: Index
  }, {
    path: '/resetpwd',
    name: 'reset',
    component: Reset
  }, {
    path: '/agreement',
    name: 'agreement',
    component: AgreeMent
  }, {
    path: '/offer_success',
    name: 'offer_success',
    component: OfferSuccess
  }, {
    path: '/inquiry',
    name: 'inquiry',
    component: Inquiry
  }, {
    path: '/inquiry/wait',
    name: 'wait_inquiry',
    component: Waitinquiry
  }, {
    path: '/inquiry/detail/:id',
    name: 'inquiry_detail',
    component: Detail
  }, {
    path: '/inquiry/quotation/:id',
    name: 'quotation',
    component: Quotation
  }, {
    path: '/msg',
    name: 'msg',
    component: Msg
  }, {
    path: '/account',
    name: 'Myaccount',
    component: Account
  }, {
    path: '/settled',
    name: 'Settled',
    component: Settled
  }, {
    path: '/about',
    name: 'About',
    component: About
  }, {
    path: '/change_pwd',
    name: 'change_pwd',
    component: ChangePwd
  }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  mode: 'history'
})
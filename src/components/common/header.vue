<template>
	<header class="header clearfix">
		<!-- <router-link to="/" class="pull-left logo" v-if="logo==true">
			<div class="clearfix">
        <h3 class="pull-left">出柜么</h3>
        <div class="pull-left">
          <span>ChuGuiMe</span>
          <p>.com</p>
        </div>
      </div>
		</router-link> -->
    <ul class="nav_tabs list-inline pull-left" v-if="navgation==true">
      <li>
        <!--<router-link to="/" class="nav_item" exact>首页</router-link>-->
        <router-link to="/" class="nav_item" exact v-on:click.native="index()">首页</router-link>
      </li>
      <li>
        <!--router-link to="/inquiry" class="nav_item" exact>我的询盘</router-link>-->
        <router-link to="/inquiry" class="nav_item" v-on:click.native="inquiry()">我的询盘</router-link>
      </li>
      <li>
        <!--<router-link to="/msg" class="nav_item" exact>我的消息</router-link>-->
        <router-link to="/msg" class="nav_item" exact v-on:click.native="mymsg()">
        我的消息
        <span class="redPoint" v-if="isLogin && messageCount">{{messageCount > 99 ? 99 : messageCount}}</span>
        </router-link>
      </li>
    </ul>
    <ul class="pull-right" v-if="navtab==false">
      <li class="operate gologin">
        <a class="login" @click="login()">登录</a>
      </li>
      <li class="operate">
        <a class="register" @click="register()">免费注册</a>
      </li>
    </ul>
    <ul class="pull-right" v-if="navtab==true">
      <li class="person_info">
        <a>
          {{username}}
          <img src="../../assets/images/icon_down.png" class="icon_down">
          <img src="../../assets/images/icon_up.png" class="icon_up">
        </a>
        <ul class="submenu">
          <li>
            <router-link to="/account">我的账户</router-link>
          </li>
          <li>
            <router-link to="/change_pwd">修改密码</router-link>
          </li>
          <li>
            <a @click="login_out()">退出</a>
          </li>
        </ul>
      </li>
      <li class="Manager">
        <a>我的客服</a>
        <div class="Manager_detail">
          <ul>
            <li class="clearfix">
              <div class="who pull-left">
                <img src="../../assets/images/icon_kehujingli.png">
                我的客服
              </div>
              <p class="Contact pull-left">手机：{{mobile || admin.mobile}}</p>
            </li>
            <li class="clearfix">
              <div class="who pull-left text-center" v-bind:title="kefunameCn + '-' +kefunameEn">
                {{kefunameCn || admin.kefunameCn}}
              </div>
              <p class="Contact pull-left" v-bind:title="email">邮箱：{{email || admin.email}}</p>
            </li>
            <li class="clearfix">
              <div class="who pull-left" @click="chat()" style="cursor: pointer;">
                <img src="../../assets/images/icon_qq.gif"/>
              </div>
              <p class="Contact pull-left" v-bind:title="weixin">微信：{{weixin || admin.weixin}}</p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <keep-alive>
      <component :is="currentView" :size="size"></component>
    </keep-alive>
    <div class="popup-overlay" v-if="marsk == true" @click="close()"></div>
    <div class="save_tips text-center" v-if="save_true == true">
      <img src="../../assets/images/icon_zhucechenggong.png"> 恭喜您, 注册成功
    </div>
	</header>
</template>
<script>
let $that = ''
import Login from './login.vue'
import Register from './register.vue'
import swal from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'
import {loginHandle, errorRequestHandle} from '../../assets/js/tools'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      marsk: false,
      navgation: true,
      currentView: '',
      // logo: true,
      isLogin: false,
      navtab: false,
      username: '',
      weixin: '',
      qq: '',
      email: '',
      kefunameCn: '',
      kefunameEn: '',
      mobile: '',
      messageCount: 0,
      router: this.$route.path,
      wait: 2,
      save_true: false,
      admin: {
        username: '',
        weixin: '',
        qq: '',
        email: '',
        kefunameCn: '',
        kefunameEn: ''
      },
      size: {
        height: '',
        width: ''
      },
      registersize: {
        height: '',
        width: ''
      }
    }
  },
  components: {
    'Login': Login,
    'Register': Register
  },
  created () {
    $that = this
    let username = localStorage.getItem('username')
    if (username) {
      $that.getUser()
      $that.login_info($that)
    }
    window.appEvent.on('login', $that.login)
    window.appEvent.on('logout', $that.logout)
    window.appEvent.on('updateMessage', $that.updateMessage)
    setInterval(function() {
      window.appEvent.emit('updateMessage')
    }, 60*1000)
    $that.updateMessage()
    $that.getAdmin()
  },
  'methods': {
    'getAdmin': function () {
        $that.$http.get('/chugui-web/baseData/superAdmin',
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            },
            emulateJSON: true
          }).then(loginHandle).then((response) => {
            let jsondata = response.body
            if (jsondata.success === true) {
              $that.admin.weixin = jsondata.body.weixin
              $that.admin.qq = jsondata.body.qq
              $that.admin.email = jsondata.body.email
              $that.admin.mobile = jsondata.body.mobile
              $that.admin.nameCn = jsondata.body.nameCn
              $that.admin.nameEn = jsondata.body.nameEn
            }
          }).catch(errorRequestHandle)
    },
    'updateMessage': function() {
      if(!$that.isLogin) return 
      $that.$http.get('/chugui-web/userMessage/countNewMessage',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          emulateJSON: true
        }).then((response) => {
          let jsondata = response.body
          if (jsondata.success === true) {
            $that.messageCount = jsondata.body
          } else {
          }
        }).catch(function (response) {
        })
    },
    'login_info': function () {
      if ($that.username !== '') {
        $that.navtab = true
      }
      /* if ($that.router === '/' && $that.username === '') {
        $that.navgation = false
      }
      if ($that.router === '/' && $that.username !== '') {
        $that.navgation = true
      } */
      if ($that.router !== '/') {
        $that.logo = false
      }
      if ($that.router === '/agreement') {
        $that.navgation = false
      }
    },
    'update': function () {
      $that.iscode = true
      if ($that.wait <= 0) {
        $that.wait = 60
        $that.iscode = false
        clearInterval(this.Interval)
      } else {
        $that.wait--
      }
    },
    'loginUser': function (user) {
      $that.username = user.nameCn
      $that.weixin = user.applySaleDto.weixin
      $that.qq = user.applySaleDto.qq
      $that.email = user.applySaleDto.email
      $that.mobile = user.applySaleDto.mobile
      $that.kefunameCn = user.applySaleDto.nameCn
      $that.kefunameEn = user.applySaleDto.nameEn
      $that.isLogin = true
      window.appEvent.emit('updateMessage')
    },
    'getUser': function () {
      $that.$http.get('/chugui-web/account/myAccount',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          emulateJSON: true
        }).then((response) => {
          let jsondata = response.body
          if (jsondata.success === true) {
            $that.loginUser(jsondata.body)
          } else {
            $that.username = ''
          }
        }).catch(function (response) {
        })
    },
    'login': function () {
      // let windowHeight = document.documentElement.clientHeight
      // let logintop = windowHeight - 382
      // logintop = logintop / 2
      // let windowWidth = document.documentElement.clientWidth
      // let loginleft = windowWidth - 400
      // loginleft = loginleft / 2
      // let top = logintop
      // let left = loginleft
      // $that.size = {
      //   height: top,
      //   width: left
      // }
      $that.marsk = true
      $that.currentView = 'Login'
      $that.$router.push('/')
    },
    'register': function () {
      if ($that.registersize.height !== '') {
        $that.size = {
          height: $that.registersize.height,
          width: $that.registersize.width
        }
      } else {
        let windowHeight = document.documentElement.clientHeight
        let logintop = windowHeight - 508
        logintop = logintop / 2
        let windowWidth = document.documentElement.clientWidth
        let loginleft = windowWidth - 620
        loginleft = loginleft / 2
        let top = logintop
        let left = loginleft
        $that.size = {
          height: top,
          width: left
        }
        $that.registersize = {
          height: top,
          width: left
        }
      }
      this.marsk = true
      this.currentView = 'Register'
    },
    'login_out': function () {
      swal({
        title: '确定退出吗?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1054FF',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnConfirm: false
      },
      function() {
        window.appEvent.emit('logout')
      })
    },
    'logout': function () {
        $that.$http.get('/chugui-web/user/doLogout',
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            },
            emulateJSON: true
          }).then(loginHandle).then((response) => {
            if (response.body.success === true) {
              $that.navtab = false
              sessionStorage.clear()
              $that.username = ''
              localStorage.clear()
              $that.$router.replace('/')
              swal.close()
              // $that.getUser()
              $that.login_info()
              $that.isLogin = false
            }
          }).catch(errorRequestHandle)
    },
    'close': function () {
      this.currentView = ''
      this.marsk = false
      $that.navgation = true
    },
    'chat': function () {
      let qq = this.qq
      window.open('http://wpa.qq.com/msgrd?v=3&uin=' + qq + '&site=qq&menu=yes')
    },
    'inquiry': function () {
      let username = localStorage.getItem('username')
      if (!username) {
        $that.login()
      } else {
        $that.$router.push({name: 'inquiry'})
      }
    },
    'index': function () {
      $that.$router.push({name: 'index'})
    },
    'mymsg': function () {
      let username = localStorage.getItem('username')
      if (username === null) {
        $that.login()
      } else {
        $that.$router.push({name: 'msg'})
      }
    }
  },
  'watch': {
    'username': {
      handler: (val, oldVal) => {
        if (val !== oldVal) {
          $that.username = val
          this.default.methods.login_info()
        }
      },
      deep: true
    },
    'save_true': {
      handler: (val, oldVal) => {
        if (val !== oldVal && val === true) {
          $that.Interval = setInterval(() => {
            $that.save_true = false
          }, 2000)
        }
      }
    }
  }
}
</script>
<style scoped>
@import "../../assets/css/header.css";
</style>

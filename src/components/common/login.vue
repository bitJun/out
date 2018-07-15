<template>
  <div class="login_dialog">
    <div class="dialog">
      <img src="../../assets/images/icon_guanbi_1.png" class="close" @click="close()"/>
      <ul class="clearfix">
        <li @click="gologin()" data-pid="1">
          <a class="active">登录</a>
          <img src="../../assets/images/icon_triangle.png">
        </li>
        <li @click="toregister()" data-pid="2">
          <a>注册</a>
        </li>
      </ul>
      <form class="form">
        <div class="form-group">
          <input type="text" :placeholder="placeholderMobile" v-model="mobile" v-if="!!placeholder['mobile']" v-bind:ref="'mobile'" @blur="placeholderBlur('mobile', $event)"/>
  				<input v-bind:class="'placeholder'" type="text" v-model='placeholderMobile' v-if="!placeholder['mobile']" @focus="placeholderFocus('mobile')"/>
        </div>
        <div class="form-group">
          <input type="password" :placeholder="placeholderPassword" v-model="pwd" v-if="!!placeholder['password']" v-bind:ref="'password'" @blur="placeholderBlur('password', $event)"/>
  				<input v-bind:class="'placeholder'" type="text" v-model='placeholderPassword' v-if="!placeholder['password']" @focus="placeholderFocus('password')"/>
          <div class="error text-right" v-if="error!=''">{{error}}</div>
        </div>
        <div class="login_operate clearfix">
          <div class="pull-left automatic">
            <label>
              <input type="checkbox" v-model="rememberMe" v-bind:true-value="a" v-bind:false-value="b"/>下次自动登录
            </label>
          </div>
          <a @click="resetpwd()" class="pull-right forget_pwd">忘记密码?</a>
        </div>
        <a class="login_submit text-center" @click="login_submit()">登录</a>
      </form>
    </div>
  </div>
</template>
<script>
  import {loginHandle, errorRequestHandle} from '../../assets/js/tools'
  export default{
    props: {
      size: {
        type: Object // 类型按需求
      }
    },
    data () {
      return {
        mobile: '',
        pwd: '',
        a: true,
        b: false,
        rememberMe: false,
        error: '',
        placeholder:{},
        placeholderMobile: '请输入手机号',
        placeholderPassword: '请输入密码'
      }
    },
    created: function () {
    },
    /* mounted () {
      let $self = this
      window.onresize = function () {
        let windowHeight = document.documentElement.clientHeight
        let logintop = windowHeight - 508
        logintop = logintop / 2
        let windowWidth = document.documentElement.clientWidth
        let loginleft = windowWidth - 620
        loginleft = loginleft / 2
        let top = logintop
        let left = loginleft
        $self.size = {
          height: top,
          width: left
        }
      }
    }, */
    'methods': {
      'placeholderFocus': function (type) {
        let $self = this
        $self.$set($self.placeholder, type, true)
        setTimeout(function() {
          if($self.$refs[type].click) $self.$refs[type].click()
          if($self.$refs[type].focus) $self.$refs[type].focus()
        }, 200)
      },
      'placeholderBlur': function (type, e) {
        let $self = this
        if (e.target.value == '') {
        $self.$set($self.placeholder, type, false)
        }
      },
      'resetpwd': function () {
        this.$router.push('/resetpwd')
        this.close()
      },
      'changeMobile': function () {
      },
      'close': function () {
        this.$parent.currentView = false
        this.$parent.marsk = false
      },
      'goligin': function () {
        this.$parent.login()
      },
      'toregister': function () {
        this.$parent.register()
      },
      'login_submit': function () {
        // if (!this.mobile) this.mobile = this.$refs.mobile.value
        // if (!this.pwd) this.pwd = this.$refs.password.value
        let mobile = this.mobile.trim()
        let pwd = this.pwd.trim()
        if (mobile === '') {
          this.error = '手机号不能为空！'
          return false
        }
        if (pwd === '') {
          this.error = '密码不能为空！'
          return false
        } else {
          let $self = this
          let params = {
            mobile: $self.mobile,
            password: $self.pwd,
            rememberMe: $self.rememberMe
          }
          $self.$http.post('/chugui-web/user/doLogin',
            params,
            {
              headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
              },
              emulateJSON: true
            }).then((response) => {
              let json = response.body
              if (json.success === true) {
                return $self.$http.get('/chugui-web/account/myAccount',
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'charset': 'utf-8'
                    },
                    emulateJSON: true
                  }).then((response) => {
                    let jsondata = response.body
                    if (jsondata.success === true) {
                      // $self.$parent.username = jsondata.body.nameCn
                      $self.$parent.currentView = false
                      $self.$parent.marsk = false
                      $self.$parent.loginUser(jsondata.body)
                      localStorage.setItem('username', jsondata.body.nameCn)
                      // $self.$router.push({name: 'index'})
                    } else {
                      $self.error = json.message
                    }
                  })
              } else {
                $self.error = json.message
              }
            }).catch(errorRequestHandle)
        }
      }
    }
  }
</script>
<style scoped="">
@import "../../assets/css/login.css";
</style>

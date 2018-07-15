<template>
  <div class="change_dialog" v-bind:style="{top:size.height+'px',left:size.width+'px'}">
    <div class="dialog">
      <div class="title text-center">修改手机号</div>
      <img src="../../assets/images/icon_guanbi_1.png" class="close" @click="close()"/>
      <form class="change_form">
        <div class="form-group clearfix">
          <label class="form-label pull-left">手机号<span class="must">*</span></label>
          <input v-bind:class="error.mobile ? 'error' : ''" type="text" class="input_phone pull-left" placeholder="请输入新手机号" v-model="data.mobile"/>
          <div class="error-input-text" v-if="error.mobile!=''">
            {{error.mobile}}
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="form-label pull-left">验证码<span class="must">*</span></label>
          <input v-bind:class="error.code ? 'error' : ''" type="text" class="input_code pull-left" placeholder="请输入验证码" v-model="data.smsCode"/>
          <a class="send_code able_send text-center pull-left" v-if="iscode == false" @click="getcode()">获取验证码</a>
          <a class="send_code text-center pull-left disabled" v-if="iscode == true">{{wait}}秒后可重发</a>
          <div class="error-input-text" v-bind:style="{right: '150px'}" v-if="error.code!=''">
            {{error.code}}
          </div>
        </div>
        <div class="form-group clearfix">
          <a class="sure pull-left" @click='change()'>确定</a>
          <a class="cancel pull-left" @click="close()">取消</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  let $self = ''
  import {loginHandle, errorRequestHandle} from '../../assets/js/tools'
  export default{
    props: {
      size: {
        type: Object // 类型按需求
      }
    },
    data () {
      return {
        data: {
          mobile: '',
          smsCode: '',
          userAccount: {
            mobile: ''
          }
        },
        error: {
          mobile: '',
          code: ''
        },
        wait: 60,
        iscode: false
      }
    },
    created: function () {
      $self = this
      let username = localStorage.getItem('username')
      if (username === null) {
        $self.$router.push({name: 'index'})
      }
      let windowHeight = document.documentElement.clientHeight
      let logintop = windowHeight - 382
      logintop = logintop / 2
      let windowWidth = document.documentElement.clientWidth
      let loginleft = windowWidth - 400
      loginleft = loginleft / 2
      $self.top = logintop
      $self.left = loginleft
    },
    'methods': {
      'close': function () {
        $self.$parent.currentView = false
        $self.$parent.marsk = false
      },
      'goligin': function () {
        $self.$parent.currentView = 'Login'
      },
      'toregister': function () {
        $self.$parent.currentView = 'Register'
      },
      'login_submit': function () {
        let mobile = $self.data.mobile.trim()
        let smsCode = $self.data.smsCode.trim()
        let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|7]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        let flag = true
        if (mobile === '') {
          $self.error.mobile = '请输入手机号'
          flag = false
        }
        if (mobile !== '' && reg.test(mobile)) {
          $self.error.mobile = '请输入正确的手机号'
          flag = false
        }
        if (smsCode === '') {
          $self.error.code = '请输入验证码'
          flag = false
        }
        if (!flag) return
      },
      'update': function () {
        $self.iscode = true
        if ($self.wait <= 0) {
          $self.wait = 60
          $self.iscode = false
          clearInterval(this.Interval)
        } else {
          $self.wait--
        }
      },
      'getcode': function () {
        if ($self.data.mobile === '') {
          return false
        } else {
          let mobile = $self.data.mobile.trim()
          let reg = /^\d{11}$/
          let flag = reg.test(mobile)
          if (flag === false) {
            $self.error.mobile = '请输入正确的手机号'
            return false
          } else {
            $self.Interval = setInterval($self.update, 1000)
            $self.$http.get('/chugui-web/user/checkMobile/' + $self.mobile + '',
              {
                headers: {
                  'Content-Type': 'application/json',
                  'charset': 'utf-8'
                },
                emulateJSON: true
              }).then(loginHandle).then((response) => {
                if (response.ok && response.body.body === true) {
                  $self.Interval = setInterval($self.update, 1000)
                  $self.$http.get('/chugui-web/user/sendSms/' + $self.data.mobile + '',
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        'charset': 'utf-8'
                      },
                      emulateJSON: true
                    }).then(loginHandle).then((response) => {
                      /* if (response.body.success === false) {
                        $self.error.code = '验证码' + response.body.message
                        $self.wait = 60
                        $self.iscode = false
                        clearInterval(this.Interval)
                        return false
                      } */
                    }).catch(errorRequestHandle)
                } else {
                  $self.error.mobile = '该手机好已经注册，请重新输入'
                  return false
                }
              }).catch(errorRequestHandle)
          }
        }
      },
      'change': function () {
        let mobile = $self.data.mobile.trim()
        let smsCode = $self.data.smsCode.trim()
        let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|7]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        let flag = true
        $self.error.mobile = ''
        $self.error.code = ''
        if (mobile === '') {
          $self.error.mobile = '请输入手机号'
          flag = false
        }
        if (mobile !== '' && reg.test(mobile)) {
          $self.error.mobile = '请输入正确的手机号'
          flag = false
        }
        if (smsCode === '') {
          $self.error.code = '请输入验证码'
          flag = false
        }
        if (!flag) return
        $self.$http.post('/chugui-web/account/modifyAccount',
          $self.data,
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            }
          }).then(loginHandle).then((response) => {
            let json = response.body
            if (json.success === true) {
              $self.close()
              $self.$parent.getaccount()
            }
          }).catch(errorRequestHandle)
      }
    },
    'watch': {
      'data': {
        handler: (val, oldVal) => {
          if (val.mobile !== oldVal.mobile) {
            $self.data.mobile = val
            $self.data.userAccount.mobile = val
          }
        },
        deep: true
      }
    }
  }
</script>
<style scoped="">
  @import "../../assets/css/change_phone.css";
</style>

<template>
	<div class="checkphone">
		<form class="checkphone_form">
			<div class="form-group">
				<input v-bind:class="error.mobile ? 'error' : ''" type="text" :placeholder="placeholderMobile" v-model='mobile' @keyup="inputChange('mobile')" v-if="!!placeholder['mobile']" v-bind:ref="'mobile'" @blur="placeholderBlur('mobile', $event)"/>
				<input v-bind:class="error.mobile ? 'error placeholder' : 'placeholder'" type="text" v-model='placeholderMobile' v-if="!placeholder['mobile']" @focus="placeholderFocus('mobile')"/>
        <div class="error-input-text" v-if="error.mobile!=''">
          {{error.mobile}}
        </div>
			</div>
			<div class="form-group clearfix">
				<input v-bind:class="error.code ? 'error' : ''" type="text" class="code pull-left" :placeholder="placeholdCode" v-model='code' @keyup="inputChange('code')" v-if="!!placeholder['code']" v-bind:ref="'code'" @blur="placeholderBlur('code', $event)"/>
				<input v-bind:class="error.code ? 'error placeholder' : 'placeholder'" type="text" class="code pull-left" v-model='placeholdCode' v-if="!placeholder['code']" @focus="placeholderFocus('code')"/>
        <a class="send_code text-center pull-left able_send" v-if="iscode == false" @click="smsCode()">获取验证码</a>
        <a class="send_code text-center pull-left disabled" v-if="iscode == true">{{wait}}秒后可重发</a>
        <div class="error-input-text" v-bind:style="{right: '150px'}" v-if="error.code!=''">
          {{error.code}}
        </div>
			</div>
		</form>
      	<a class="submit" @click="checkphone()">确定</a>
	</div>
</template>
<script>
let $self = ''
import {loginHandle, errorRequestHandle} from '../../assets/js/tools'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      wait: 60,
      iscode: false,
      error: {
        mobile: '',
        code: ''
      },
      placeholder:{},
      placeholderMobile: '请输入手机号',
      placeholdCode: '请输入验证码'
    }
  },
  created () {
    $self = this
  },
  'methods': {
    'placeholderFocus': function (type) {
      $self.$set($self.placeholder, type, true)
      setTimeout(function() {
        if($self.$refs[type].click) $self.$refs[type].click()
        if($self.$refs[type].focus) $self.$refs[type].focus()
      }, 200)
    },
    'placeholderBlur': function (type, e) {
      if (e.target.value == '') {
      $self.$set($self.placeholder, type, false)
      }
    },
    'inputChange': function (type) {
      $self.error[type] = ''
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
    'smsCode': function () {
      if ($self.mobile === '') {
        return false
      } else {
        let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|7]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        let flag = reg.test($self.mobile)
        if (flag === false) {
          $self.error.mobile = '请输入正确的手机号'
          return false
        } else {
          $self.error.mobile = ''
          $self.$http.get('/chugui-web/user/checkMobile/' + $self.mobile + '',
            {
              headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
              },
              emulateJSON: true
            }).then(loginHandle).then((response) => {
              if (response.body.body === false) {
                $self.Interval = setInterval($self.update, 1000)
                $self.$http.get('/chugui-web/user/sendSms/' + $self.mobile + '',
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'charset': 'utf-8'
                    },
                    emulateJSON: true
                  }).then(loginHandle).then((response) => {
                    if (response.body.success === false) {
                      // $self.error.code = '验证码' + response.body.message
                      $self.wait = 60
                      $self.iscode = false
                      clearInterval(this.Interval)
                      throw response
                    }
                  }).catch(errorRequestHandle)
              } else {
                $self.error.mobile = '该手机号未注册，请重新输入'
                return false
              }
            }).catch(errorRequestHandle)
        }
      }
    },
    'checkphone': function () {
      let params = {
        mobile: $self.mobile,
        code: $self.code
      }
      let flag = true
      if ($self.mobile === '' || $self.code === '') {
        if ($self.mobile === '') {
          $self.error.mobile = '手机号不能为空'
        }
        if ($self.mobile !== '') {
          $self.error.mobile = ''
        }
        if ($self.code === '') {
          $self.error.code = '验证码不能为空'
        }
        flag = false
      }
      if (flag === true) {
        $self.$http.post('/chugui-web/user/verifySmsCode',
          params,
          {
            headers: {
              Accept: 'application/json'
            },
            emulateJSON: true
          }).then(loginHandle).then((response) => {
            if (response.ok && response.body.body === true) {
              $self.$parent.currentStep = 'SetPwd'
            } else {
              $self.error.code = '请输入正确的验证码'
              return false
            }
          }).catch(errorRequestHandle)
      }
    }
  },
  'watch': {
    'mobile': {
      handler: (val, oldVal) => {
        if (val !== oldVal) {
          $self.$parent.data.mobile = val
        }
      },
      deep: true
    },
    'code': {
      handler: (val, oldVal) => {
        if (val !== oldVal) {
          $self.$parent.data.code = val
        }
      }
    }
  }
}
</script>
<style scoped>
	@import "../../assets/css/checkphone.css";
</style>

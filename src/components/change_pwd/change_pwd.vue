<template>
  <div class="index">
    <div class="change_pwd">
    	<div class="change_header">
    		<h4>修改密码</h4>
    	</div>
    	<div class="change_main">
	    	<form>
	    		<div class="form-group clearfix">
	    			<label class="control_label pull-left">原密码<span class="must">*</span></label>
	    			<input v-bind:class="error.oldPassword ? 'error' : ''" type='password' class="control_input pull-left" v-model='data.oldPassword' @keyup="inputChange('oldPassword')">
	    			<div class="error-input-text" v-if="error.oldPassword != ''" style="right:145px;top:8px;">{{error.oldPassword}}</div>
            <router-link to="/resetpwd" class="resetpwd">忘记密码?</router-link>
	    		</div>
	    		<div class="form-group clearfix">
	    			<label class="control_label pull-left">新密码<span class="must">*</span></label>
	    			<input v-bind:class="error.newPassword ? 'error' : ''" type='password' class="control_input pull-left" v-model='data.newPassword' @keyup="inputChange('newPassword')">
	    			<div class="error-input-text" v-if="error.newPassword != ''" style="right:145px;top:8px;">{{error.newPassword}}</div>
	    		</div>
	    		<div class="form-group clearfix">
	    			<label class="control_label pull-left">确认密码<span class="must">*</span></label>
	    			<input v-bind:class="error.surePassword ? 'error' : ''" type='password' class="control_input pull-left" v-model='surePassword' @keyup="inputChange('surePassword')">
	    			<div class="error-input-text" v-if="error.surePassword != ''" style="right:145px;top:8px;">{{error.surePassword}}</div>
	    		</div>
	    		<a class="submit" @click='submit()'>确认修改</a>
	    	</form>
    	</div>
    </div>
  </div>
</template>
<script>
  let $self = ''
  import HeaderBar from '../common/header.vue'
  import FooterView from '../common/footer.vue'
  import swal from 'sweetalert'
  import 'sweetalert/dist/sweetalert.css'
  import {loginHandle, errorRequestHandle} from '../../assets/js/tools'
  export default {
    name: 'change_pwd',
    data () {
      return {
        data: {
          oldPassword: '',
          newPassword: ''
        },
        surePassword: '',
        error: {
          oldPassword: '',
          newPassword: '',
          surePassword: ''
        }
      }
    },
    components: {
      'HeaderBar': HeaderBar,
      'FooterView': FooterView
    },
    created () {
      $self = this
      let username = localStorage.getItem('username')
      if (username === null) {
        $self.$router.push({name: 'index'})
      }
    },
    'methods': {
      'inputChange': function (type) {
        this.error[type] = ''
      },
      'submit': function () {
        let flag = true
        let reg = /^[a-zA-Z0-9]{6,18}$/
        if ($self.data.oldPassword === '') {
          $self.error.oldPassword = '原密码不能为空'
          flag = false
        }
        if ($self.data.newPassword === '') {
          $self.error.newPassword = '请输入新的密码'
          flag = false
        }
        if ($self.data.newPassword !== '') {
          if (!reg.test($self.data.newPassword)) {
            $self.error.newPassword = '请输入6~15位密码'
            flag = false
          }
        }
        if ($self.surePassword !== $self.data.newPassword) {
          $self.error.surePassword = '两次密码不一致，请重新输入'
          flag = false
        }
        if (flag === false) {
          return false
        } else {
          let params = {
            oldPassword: $self.data.oldPassword
          }
          $self.$http.post('/chugui-web/account/validatePassword',
            params,
            {
              headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
              },
              emulateJSON: true
            }).then(loginHandle).then((response) => {
              let json = response.body
              if (json.body === true) {
                $self.$http.post('/chugui-web/account/modifyPassword',
                  $self.data,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'charset': 'utf-8'
                    },
                    emulateJSON: true
                  }).then(loginHandle).then((res) => {
                    if (res.body.body === true) {
                      swal({
                        type: 'success',
                        title: '修改成功!',
                        text: '请重新登录',
                        closeOnConfirm: false
                      }, function () {
                        window.appEvent.emit('logout')
                      })
                    } else {
                      swal({
                        type: 'error',
                        title: '修改失败!',
                        timer: 2000
                      })
                    }
                  }).catch(errorRequestHandle)
              } else {
                $self.error.oldPassword = '原密码错误'
              }
            }).catch(errorRequestHandle)
        }
      }
    }
  }
</script>
<style scoped>
  @import '../../assets/css/change_pwd.css'
</style>

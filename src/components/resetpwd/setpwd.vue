<template>
	<div class="checkphone">
		<form class="checkphone_form">
			<div class="form-group">
				<input v-bind:class="error.password ? 'error' : ''" type="password" :placeholder="placeholderPassword" v-model='password' @keyup="inputChange('password')" v-if="!!placeholder['password']" v-bind:ref="'password'" @blur="placeholderBlur('password', $event)"/>
				<input v-bind:class="error.password ? 'error placeholder' : 'placeholder'" type="text" v-model='placeholderPassword' v-if="!placeholder['password']" @focus="placeholderFocus('password')"/>
        <div class="error-input-text" v-if="error.password!=''">
          {{error.password}}
        </div>
			</div>
			<div class="form-group clearfix">
				<input v-bind:class="error.repwd ? 'error' : ''" type="password" :placeholder="placeholderRepwd" v-model='repwd' @keyup="inputChange('repwd')" v-if="!!placeholder['repwd']" v-bind:ref="'repwd'" @blur="placeholderBlur('repwd', $event)"/>
				<input v-bind:class="error.repwd ? 'error placeholder' : 'placeholder'" type="text" v-model='placeholderRepwd' v-if="!placeholder['repwd']" @focus="placeholderFocus('repwd')"/>
        <div class="error-input-text" v-if="error.repwd!=''">
          {{error.repwd}}
        </div>
			</div>
		</form>
		<a class="submit" @click="submit()">确定</a>
	</div>
</template>
<script>
  let $self = ''
  import swal from 'sweetalert'
  import 'sweetalert/dist/sweetalert.css'
  import {loginHandle, errorRequestHandle} from '../../assets/js/tools'
  export default {
    data () {
      return {
        password: '',
        repwd: '',
        error: {
          password: '',
          repwd: ''
        },
        placeholder:{},
        placeholderPassword: '请输入密码(密码为6~15位字符)',
        placeholderRepwd: '请再次输入密码'
      }
    },
    created () {
      $self = this
      // let username = localStorage.getItem('username')
      // if (username === null) {
      //   $self.$router.push({name: 'index'})
      // }
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
      'submit': function () {
        let reg = /^[a-zA-Z0-9]{6,18}$/
        $self.error.password = ''
        $self.error.repwd = ''
        if ($self.password === '') {
          $self.error.password = '请输入密码'
          return false
        }
        if ($self.password !== '') {
          if (!reg.test($self.password)) {
            $self.error.password = '请输入6~15位密码'
            return false
          }
        }
        if ($self.repwd !== $self.password) {
          $self.error.repwd = '两次密码输入不一致'
          return false
        } else {
          swal({
            title: '确定修改吗?',
            text: '',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }, function () {
            $self.$http.post('/chugui-web/user/resetPassword',
              $self.$parent.data,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'charset': 'utf-8'
                },
                emulateJSON: true
              }).then(loginHandle).then((response) => {
                if (response.body.body === true) {
                  swal({
                    title: response.body.message,
                    text: '',
                    type: 'success'
                  }, function () {
                    $self.$router.push({name: 'index'})
                  })
                }
              }).catch(errorRequestHandle)
          })
        }
      }
    },
    'watch': {
      'password': {
        handler: (val, oldVal) => {
          if (val !== oldVal) {
            $self.$parent.data.password = val
          }
        },
        deep: true
      }
    }
  }
</script>
<style scoped>
	@import "../../assets/css/setpwd.css";
</style>

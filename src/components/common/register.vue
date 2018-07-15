<template>
  <div class="register_dialog">
    <div class="dialog">
      <img src="../../assets/images/icon_guanbi_1.png" class="close" @click="close()"/>
      <ul class="clearfix">
        <li @click="goligin()" data-pid="1">
          <a>登录</a>
        </li>
        <li @click="toregister()" data-pid="2">
          <a class="active">注册</a>
          <img src="../../assets/images/icon_triangle.png">
        </li>
      </ul>
      <form class="form first_step" v-if="first_step == true">
        <div class="form-group">
          <p class="pull-left">手机号<span class="must">*</span></p>
          <input class="pull-left mobile" type="text" :placeholder="placeholderMobile" v-bind:class="tips.mobile" v-model="data.userAccount.mobile" v-on:blur="checkphone()" @keyup="inputChange('mobile')" v-if="!!placeholder['mobile_r']" v-bind:ref="'mobile_r'" @blur="placeholderBlur('mobile_r', $event)"/>
          <input class="pull-left mobile placeholder" v-bind:class="tips.mobile" type="text" v-model='placeholderMobile' v-if="!placeholder['mobile_r']" @focus="placeholderFocus('mobile_r')"/>
          <span class="error" v-if="error.mobile!=''">{{error.mobile}}</span>
        </div>
        <div class="form-group smsCode">
          <p class="pull-left">验证码<span class="must">*</span></p>
          <input class="code pull-left" type="text" :placeholder="placeholderSmsCode" v-model="data.smsCode" v-bind:class="tips.smsCode" @keyup="inputChange('smsCode')" v-if="!!placeholder['smsCode']" v-bind:ref="'smsCode'" @blur="placeholderBlur('smsCode', $event)"/>
          <input class="pull-left code placeholder" v-bind:class="tips.smsCode" type="text" v-model='placeholderSmsCode' v-if="!placeholder['smsCode']" @focus="placeholderFocus('smsCode')"/>
          <span class="error" v-if="error.smsCode!=''">{{error.smsCode}}</span>
          <a class="send_code able_send text-center pull-left" v-if="iscode == false" @click="getsms()">获取验证码</a>
          <a class="send_code text-center pull-left disabled" v-if="iscode == true">{{wait}}秒后可重发</a>
        </div>
        <div class="form-group">
          <p class="pull-left">设定密码<span class="must">*</span></p>
          <input class="pull-left" type="password" :placeholder="placeholderPassword" v-bind:class="tips.password" v-model="data.userAccount.password" @keyup="inputChange('password')" v-if="!!placeholder['password_r']" v-bind:ref="'password_r'" @blur="placeholderBlur('password_r', $event)"/>
          <input class="pull-left placeholder" v-bind:class="tips.password" type="text" v-model='placeholderPassword' v-if="!placeholder['password_r']" @focus="placeholderFocus('password_r')"/>
          <span class="error" v-if="error.password!=''">{{error.password}}</span>
        </div>
        <div class="form-group">
          <p class="pull-left">确认密码<span class="must">*</span></p>
          <input class="pull-left" type="password" :placeholder="placeholderRepwd" v-bind:class="tips.repwd" v-model="repwd" @keyup="inputChange('repwd')" v-if="!!placeholder['repwd_r']" v-bind:ref="'repwd_r'" @blur="placeholderBlur('repwd_r', $event)"/>
          <input class="pull-left placeholder" v-bind:class="tips.repwd" type="text" v-model='placeholderRepwd' v-if="!placeholder['repwd_r']" @focus="placeholderFocus('repwd_r')"/>
          <span class="error" v-if="error.repwd!=''">{{error.repwd}}</span>
        </div>
        <div class="form-group">
          <p class="pull-left">邀请码</p>
          <input class="pull-left" type="text" :placeholder="placeholderInviteCode" v-bind:class="tips.inviteCode" v-model="data.userAccount.inviteCode" @keyup="inputChange('inviteCode')" v-if="!!placeholder['inviteCode']" v-bind:ref="'inviteCode'" @blur="placeholderBlur('inviteCode', $event)"/>
          <input class="pull-left placeholder" v-bind:class="tips.inviteCode" type="text" v-model='placeholderInviteCode' v-if="!placeholder['inviteCode']" @focus="placeholderFocus('inviteCode')"/>
          <span class="error" v-if="error.inviteCode!=''">{{error.inviteCode}}</span>
        </div>
        <a class="next_step text-center" @click="next()">下一步</a>
      </form>
      <form class="form last_step" v-if="next_step == true">
        <div class="form-group">
          <p class="pull-left">姓名<span class="must">*</span></p>
          <input class="pull-left" type="text" :placeholder="placeholderNameCn" v-model="data.nameCn" v-bind:class="tips.nameCn" @keyup="inputChange('nameCn')" v-if="!!placeholder['nameCn']" v-bind:ref="'nameCn'" @blur="placeholderBlur('nameCn', $event)"/>
          <input class="pull-left placeholder" v-bind:class="tips.nameCn" type="text" v-model='placeholderNameCn' v-if="!placeholder['nameCn']" @focus="placeholderFocus('nameCn')"/>
          <span class="error" v-if="error.nameCn!=''">{{error.nameCn}}</span>
        </div>
        <!-- <div class="form-group">
          <p class="pull-left">英文名<span class="must">*</span></p>
          <input class="pull-left" type="text" placeholder="怎么称呼您" v-model="data.nameEn" v-bind:class="tips.nameEn"/>
          <span class="error" v-if="error.nameEn!=''">{{error.nameEn}}</span>
        </div> -->
        <div class="form-group">
          <p class="pull-left">公司全称<span class="must">*</span></p>
          <input class="pull-left" type="text" :placeholder="placeholderCompanyFullName" v-model="data.companyFullName" v-bind:class="tips.companyFullName" @keyup="inputChange('companyFullName')" v-if="!!placeholder['companyFullName']" v-bind:ref="'companyFullName'" @blur="placeholderBlur('companyFullName', $event)"/>
          <input class="pull-left placeholder" v-bind:class="tips.companyFullName" type="text" v-model='placeholderCompanyFullName' v-if="!placeholder['companyFullName']" @focus="placeholderFocus('companyFullName')"/>
          <span class="error" v-if="error.companyFullName!=''">{{error.companyFullName}}</span>
        </div>
        <div class="form-group">
          <p class="pull-left">公司地址</p>
          <input class="pull-left" type="text" :placeholder="placeholderCompanyAddress" v-model="data.companyAddress" v-bind:class="tips.companyAddress" v-if="!!placeholder['companyAddress']" v-bind:ref="'companyAddress'" @blur="placeholderBlur('companyAddress', $event)"/>
          <input class="pull-left placeholder" v-bind:class="tips.companyAddress" type="text" v-model='placeholderCompanyAddress' v-if="!placeholder['companyAddress']" @focus="placeholderFocus('companyAddress')"/>
          <span class="error" v-if="error.companyAddress!=''">{{error.companyAddress}}</span>
        </div>
        <div class="form-group">
          <p class="pull-left">邮箱<span class="must">*</span></p>
          <input class="pull-left" type="text" :placeholder="placeholderEmail" v-model="data.email" v-bind:class="tips.email" @keyup="inputChange('email')" v-if="!!placeholder['email']" v-bind:ref="'email'" @blur="placeholderBlur('email', $event)"/>
          <input class="pull-left placeholder" v-bind:class="tips.email" type="text" v-model='placeholderEmail' v-if="!placeholder['email']" @focus="placeholderFocus('email')"/>
          <span class="error" v-if="error.email!=''">{{error.email}}</span>
        </div>
        <div class="form-group">
          <p class="pull-left">座机号码</p>
          <input type="text" class="pull-left zone" :placeholder="placeholderZone" v-model="zone" v-bind:class="error.zone" v-if="!!placeholder['zone']" v-bind:ref="'zone'" @blur="placeholderBlur('zone', $event)"/>
          <input class="pull-left zone placeholder" v-bind:class="tips.zone" type="text" v-model='placeholderZone' v-if="!placeholder['zone']" @focus="placeholderFocus('zone')"/>
          <input type="text" class="pull-left number" :placeholder="placeholderNumber" v-model="number" v-bind:class="error.number" v-if="!!placeholder['number']" v-bind:ref="'number'" @blur="placeholderBlur('number', $event)"/>
          <input class="pull-left number placeholder" v-bind:class="tips.number" type="text" v-model='placeholderNumber' v-if="!placeholder['number']" @focus="placeholderFocus('number')"/>
          <input type="text" class="pull-left extension" :placeholder="placeholderExtension" v-model="extension" v-bind:class="error.extension" v-if="!!placeholder['extension']" v-bind:ref="'extension'" @blur="placeholderBlur('extension', $event)"/>
          <input class="pull-left extension placeholder" v-bind:class="tips.extension" type="text" v-model='placeholderExtension' v-if="!placeholder['extension']" @focus="placeholderFocus('extension')"/>
        </div>
        <div class="form-group">
          <p class="pull-left">QQ</p>
          <input class="pull-left" type="text" :placeholder="placeholderQQ" v-model="data.qq" v-if="!!placeholder['qq']" v-bind:ref="'qq'" @blur="placeholderBlur('qq', $event)"/>
          <input class="pull-left placeholder" type="text" v-model='placeholderQQ' v-if="!placeholder['qq']" @focus="placeholderFocus('qq')"/>
        </div>
        <div class="form-group">
          <p class="pull-left">微信</p>
          <input class="pull-left" type="text" :placeholder="placeholderWeiXin" v-model="data.weixin" v-if="!!placeholder['weixin']" v-bind:ref="'weixin'" @blur="placeholderBlur('weixin', $event)"/>
          <input class="pull-left placeholder" type="text" v-model='placeholderWeiXin' v-if="!placeholder['weixin']" @focus="placeholderFocus('weixin')"/>
        </div>
        <a class="next_step text-center" @click="register()">注册</a>
        <p class="agree text-center">
          点击立即注册，即表示您同意
          <router-link to="/agreement" target="_blank" class="agreement">《出柜么用户服务协议》</router-link>
        </p>
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
        wait: 60,
        iscode: false,
        data: {
          companyAddress: '',   // 公司地址
          companyFullName: '',  // 公司名称
          email: '',            // 邮件
          emailMsgStatus: 0,    // 是否邮件提醒 0否,1是
          mobile: '',           // 手机号
          nameCn: '',           // 中文名
          nameEn: '',           // 英文名
          qq: '',               // QQ
          smsCode: '',          // 手机验证码
          smsMsgStatus: 0,      // 是否短信提醒 0否,1是
          telephone: '',        // 座机号码
          userAccount: {        // 用户对象
            inviteCode: '',     // 邀请码
            mobile: '',         // 手机号
            password: ''
          },
          weixin: ''            // 微信
        },
        dialogsize: {
          height: '',
          width: ''
        },
        first_step: true,
        next_step: false,
        resgiterheight: 508,
        error: {
          mobile: '',
          smsCode: '',
          password: '',
          repwd: '',
          nameCn: '',
          nameEn: '',
          companyFullName: '',
          companyAddress: '',
          email: '',
          zone: '',
          number: '',
          extension: '',
          inviteCode: ''
        },
        tips: {
          mobile: '',
          smsCode: '',
          password: '',
          repwd: '',
          nameCn: '',
          nameEn: '',
          companyFullName: '',
          companyAddress: '',
          email: '',
          inviteCode: ''
        },
        repwd: '',
        zone: '',
        number: '',
        extension: '',
        placeholder:{},
        placeholderMobile: '请输入手机号',
        placeholderSmsCode: '请输入验证码',
        placeholderPassword: '密码为6-15位字符',
        placeholderRepwd: '请再输入一次密码',
        placeholderInviteCode: '邀请码为4位数字(选填)',
        placeholderNameCn: '怎么称呼您',
        placeholderCompanyFullName: '请填写公司全称',
        placeholderCompanyAddress: '有时，我们会寄出一些惊喜，希望您能收到',
        placeholderEmail: '请输入您的邮箱',
        placeholderZone: '区号',
        placeholderNumber: '号码',
        placeholderExtension: '分机',
        placeholderQQ: '工作时间段内，希望与您QQ联系',
        placeholderWeiXin: '有时候，总有些话想微信和您说'
      }
    },
    created: function () {
      $self = this
      // $self.dialogsize = {
      //   height: $self.size.height,
      //   width: $self.size.width
      // }
    },
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
      'inputChange': function (type) {
        $self.error[type] = ''
        $self.tips[type] = ''
      },
      'close': function () {
        $self.$parent.currentView = false
        $self.$parent.marsk = false
        $self.first_step = true
        $self.next_step = false
      },
      'goligin': function () {
        $self.$parent.login()
      },
      'toregister': function () {
        $self.$parent.register()
      },
      'autoheight': function (height, width) {
        // let windowHeight = document.documentElement.clientHeight
        // let logintop = windowHeight - height
        // logintop = logintop / 2
        // let windowWidth = document.documentElement.clientWidth
        // let loginleft = windowWidth - width
        // loginleft = loginleft / 2
        // let top = logintop
        // let left = loginleft
        // $self.size = {
        //   height: top,
        //   width: left
        // }
        // $self.$parent.registersize = {
        //   height: top,
        //   width: left
        // }
      },
      'next': function () {
        let reg = /^[a-zA-Z0-9]{6,18}$/
        let flag = true
        if ($self.tips.mobile === 'tiperror') {
          flag = false
        }
        if ($self.data.userAccount.mobile === '') {
          $self.error.mobile = '请输入手机号'
          $self.tips.mobile = 'tiperror'
          flag = false
        }
        if ($self.data.userAccount.mobile) {
          $self.error.mobile = ''
          $self.tips.mobile = ''
        }
        if ($self.data.smsCode === '') {
          $self.error.smsCode = '验证码不能为空'
          $self.tips.smsCode = 'tiperror'
          flag = false
        }
        if (!reg.test($self.data.userAccount.password)) {
          $self.error.password = '请输入6~15位密码'
          $self.tips.password = 'tiperror'
          flag = false
        }
        if (reg.test($self.data.userAccount.password)) {
          $self.error.password = ''
          $self.tips.password = ''
        }
        if ($self.repwd !== $self.data.userAccount.password) {
          $self.error.repwd = '两次填写的密码不一致'
          $self.tips.repwd = 'tiperror'
          flag = false
        }
        if ($self.repwd === $self.data.userAccount.password) {
          $self.error.repwd = ''
          $self.tips.repwd = ''
        }
        if (!flag) return false
        if ($self.data.smsCode !== '') {
          let params = {
            mobile: $self.data.mobile,
            code: $self.data.smsCode
          }
          $self.$http.post('/chugui-web/user/verifySmsCode',
            params,
            {
              headers: {
                Accept: 'application/json'
              },
              emulateJSON: true
            }).then(loginHandle).then((res) => {
              if (res.body.body === true) {
                $self.error.smsCode = ''
                $self.tips.smsCode = ''
                return true
              }
              if (res.body.body === false) {
                $self.error.smsCode = '验证码错误'
                $self.tips.smsCode = 'tiperror'
                return false
              }
            }).then((result) => {
              if (!$self.data.userAccount.inviteCode) {
                return result
              }
              return $self.$http.post('/chugui-web/user/verifyInviteCode',
                {inviteCode: $self.data.userAccount.inviteCode},
                {
                  headers: {
                    Accept: 'application/json'
                  },
                  emulateJSON: true
                }).then(loginHandle).then((res) => {
                  if (res.body.body === true) {
                    $self.error.inviteCode = ''
                    $self.tips.inviteCode = ''
                  }
                  if (res.body.body === false) {
                    $self.error.inviteCode = '邀请码错误'
                    $self.tips.inviteCode = 'tiperror'
                    result = false
                  }
                  return result
                })
            }).then((result) => {
              if (result) {
                $self.next_step = true
                $self.first_step = false
              }
            }).catch(errorRequestHandle)
        }
      },
      'update': function () {
        $self.iscode = true
        if ($self.wait <= 0) {
          $self.wait = 60
          $self.iscode = false
          clearInterval($self.Interval)
        } else {
          $self.wait--
        }
      },
      'getsms': function () {
        if ($self.data.mobile === '') {
          return false
        } else {
          $self.Interval = setInterval($self.update, 1000)
          $self.$http.get('/chugui-web/user/sendSms/' + $self.data.mobile + '',
            {
              headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
              },
              emulateJSON: true
            }).then(loginHandle).then((response) => {
              if (response.body.success === false) {
                throw response
              }
            }).catch(errorRequestHandle)
        }
      },
      'checkphone': function () {
        let reg = /^\d{11}$/
        let flag = reg.test($self.data.userAccount.mobile)
        if (flag === false) {
          $self.error.mobile = '请输入正确的手机号'
          $self.tips.mobile = 'tiperror'
          return false
        } else {
          $self.error.mobile = ''
          $self.$http.get('/chugui-web/user/checkMobile/' + $self.data.userAccount.mobile + '',
            {
              headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
              },
              emulateJSON: true
            }).then(loginHandle).then((response) => {
              if (response.body.body === false) {
                $self.error.mobile = '手机号已注册'
                $self.tips.mobile = 'tiperror'
              } else {
                $self.data.mobile = $self.data.userAccount.mobile
                $self.error.mobile = ''
                $self.tips.mobile = ''
              }
            }).catch(errorRequestHandle)
        }
      },
      'register': function () {
        if ($self.number) {
          $self.data.telephone = $self.number
          if ($self.zone) {
            $self.data.telephone = $self.zone + '-' + $self.data.telephone
          }
          if ($self.extension) {
            $self.data.telephone = $self.data.telephone + '-' + $self.extension
          }
        }
        let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
        // let telreg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/
        let flagemail = reg.test($self.data.email)
        let flag = true
        if ($self.data.nameCn === '') {
          $self.error.nameCn = '请输入姓名'
          $self.tips.nameCn = 'tiperror'
          flag = false
        }else if ($self.data.nameCn.length > 20) {
          $self.error.nameCn = '姓名不能超过20个字符'
          $self.tips.nameCn = 'tiperror'
          flag = false
        }else {
          $self.error.nameCn = ''
          $self.tips.nameCn = ''
        }
        // if ($self.data.nameEn === '') {
        //   $self.error.nameEn = '请输入英文姓名'
        //   $self.tips.nameEn = 'tiperror'
        //   flag = false
        // }
        // if ($self.data.nameEn !== '') {
        //   $self.error.nameEn = ''
        //   $self.tips.nameEn = ''
        // }
        if ($self.data.companyFullName === '') {
          $self.error.companyFullName = '请输入公司名全称'
          $self.tips.companyFullName = 'tiperror'
          flag = false
        }
        if ($self.data.companyFullName !== '') {
          $self.error.companyFullName = ''
          $self.tips.companyFullName = ''
        }
        // if ($self.data.companyAddress === '') {
        //   $self.error.companyAddress = '请输入公司详细地址'
        //   $self.tips.companyAddress = 'tiperror'
        //   flag = false
        // }
        if ($self.data.companyAddress !== '') {
          $self.error.companyAddress = ''
          $self.tips.companyAddress = ''
        }
        if ($self.data.email === '') {
          $self.error.email = '请输入邮箱'
          $self.tips.email = 'tiperror'
          flag = false
        }
        if ($self.data.email !== '') {
          $self.error.email = ''
          $self.tips.email = ''
        }
        if ($self.data.email !== '' && flagemail === false) {
          $self.error.email = '邮箱格式不正确'
          $self.tips.email = 'tiperror'
          flag = false
        }
        if ($self.data.email !== '' && flagemail === true) {
          $self.error.email = ''
          $self.tips.email = ''
        }
        // if ($self.data.telephone !== '') {
        //   if (telreg.test($self.data.telephone) === false) {
        //     $self.error.zone = 'tiperror'
        //     $self.error.number = 'tiperror'
        //     $self.error.extension = 'tiperror'
        //     flag = false
        //   } else {
        //     $self.error.zone = 'tiperror'
        //     $self.error.number = 'tiperror'
        //     $self.error.extension = 'tiperror'
        //   }
        // }
        // if ($self.data.telephone === '') {
        //   $self.error.zone = 'tiperror'
        //   $self.error.number = 'tiperror'
        //   $self.error.extension = 'tiperror'
        // }
        if (flag === false) {
          return false
        }
        if (flag === true) {
          $self.$http.post('/chugui-web/user/doRegister',
            $self.data,
            {
              headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
              }
            }).then(loginHandle).then((response) => {
              if (response.ok && response.body.body === true) {
                $self.$parent.currentView = false
                $self.$parent.marsk = false
                $self.$parent.save_true = true
                $self.Rlogin()
              }
            }).catch((res) => {
            if(res && res.body && res.body.message == '手机验证码错误！') {
                $self.error.smsCode = '验证码错误'
                $self.tips.smsCode = 'tiperror'
                $self.first_step = true
                $self.next_step = false
            } else {
              throw res
            }
          }).catch(errorRequestHandle)
        }
      },
      'Rlogin': function () {
        let params = {
          mobile: $self.data.userAccount.mobile,
          password: $self.data.userAccount.password,
          rememberMe: false
        }
        $self.$http.post('/chugui-web/user/doLogin',
          params,
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            },
            emulateJSON: true
          }).then(loginHandle).then((response) => {
            let json = response.body
            if (json.success === true) {
              $self.$http.get('/chugui-web/account/myAccount',
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'charset': 'utf-8'
                  },
                  emulateJSON: true
                }).then(loginHandle).then((response) => {
                  let jsondata = response.body
                  if (jsondata.success === true) {
                    $self.$parent.username = jsondata.body.nameCn
                    localStorage.setItem('username', jsondata.body.nameCn)
                  } else {
                    $self.error = json.message
                  }
                }).catch(errorRequestHandle)
              $self.$parent.currentView = false
              $self.$parent.marsk = false
            } else {
              $self.error = json.message
            }
          }).catch(errorRequestHandle)
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/register.css";
</style>

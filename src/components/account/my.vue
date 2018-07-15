<template>
<div class="index">
  <div class="account_view">
    <h4 class="title">
      我的账户
      <p class="Permissions">您当前的询盘权限为：<span>每天{{data.askPermissions}}条</span></p>
      <p class="tips">完善资料、询盘详实、踊跃订舱，都有助于提升您的询盘权限</p>
    </h4>
    <div class="account_main">
      <div class="account_info clearfix">
        <div class="information pull-left">
          <form class="personal_info">
            <section>
              <div class="form-group info_title">
                <img src="../../assets/images/icon_wd_xiaoxitixing.png"/>
                消息提醒
              </div>
              <div class="form-group email_info clearfix">
                <label class="form_label pull-left">邮箱</label>
                <p class="email pull-left">{{email}}</p>
                <a class="kaiguan" @click="emailMsg()">
                  <img src="../../assets/images/icon_wd_guan.png" v-if="data.emailMsgStatus == 0"/>
                  <img src="../../assets/images/icon_wd_kai.png" v-if="data.emailMsgStatus == 1"/>
                </a>
              </div>
              <div class="form-group phone_info clearfix">
                <label class="form_label pull-left">手机</label>
                <p class="phone pull-left">{{data.mobile}}</p>
                <a class="change" @click="change()">修改</a>
                <a class="kaiguan" @click="smsMsg()">
                  <img src="../../assets/images/icon_wd_guan.png" v-if="data.smsMsgStatus == 0"/>
                  <img src="../../assets/images/icon_wd_kai.png" v-if="data.smsMsgStatus == 1"/>
                </a>
              </div>
            </section>
            <section>
              <div class="edit-user"><a @click="edit_account()"><img src="../../assets/images/edit_user.png"/>编辑</a></div>
              <div class="form-group info_title">
                <img src="../../assets/images/icon_wd_jibenxinxi.png">基本信息
              </div>
              <div class="form-group clearfix" v-bind:class="error.nameCn">
                <label class="form_label pull-left">姓名<span class="must">*</span></label>
                <input type="text" class="form_input input_name" v-model="data.nameCn" v-bind:readonly="isReadOnly" v-bind:class="onlyread" @keyup="inputChange('nameCn')">
              </div>
              <!-- <div class="form-group clearfix" v-bind:class="error.nameEn">
                <label class="form_label pull-left">英文名<span class="must">*</span></label>
                <input type="text" class="form_input input_name" v-model="data.nameEn" v-bind:readonly="isReadOnly" v-bind:class="onlyread">
              </div> -->
              <div class="form-group clearfix" v-bind:class="error.companyFullName">
                <label class="form_label pull-left">公司名称<span class="must">*</span></label>
                <input type="text" class="form_input input_company" v-model="data.companyFullName" v-bind:readonly="isReadOnly" v-bind:class="onlyread" @keyup="inputChange('companyFullName')">
              </div>
              <div class="form-group clearfix">
                <label class="form_label pull-left">公司地址</label>
                <input type="text" class="form_input input_company" v-model="data.companyAddress" v-bind:readonly="isReadOnly" v-bind:class="onlyread">
              </div>
            </section>
            <section>
              <div class="form-group info_title">
                <img src="../../assets/images/icon_wd_lianxifangshi.png">联系方式
              </div>
              <div class="form-group clearfix" v-bind:class="error.email">
                <label class="form_label pull-left">邮箱<span class="must">*</span></label>
                <input type="text" class="form_input input_connect" v-model="data.email" v-bind:readonly="isReadOnly" v-bind:class="onlyread" @keyup="inputChange('email')">
              </div>
              <div class="form-group clearfix" v-bind:class="error.telephone">
                <label class="form_label pull-left">座机号码</label>
                <input type="text" class="form_input input_zone" v-model="zone" v-bind:readonly="isReadOnly" v-bind:class="onlyread">
                <input type="text" class="form_input input_number" v-model="number" v-bind:readonly="isReadOnly" v-bind:class="onlyread">
                <input type="text" class="form_input input_extension" v-model="extension" v-bind:readonly="isReadOnly" v-bind:class="onlyread">
              </div>
              <div class="form-group clearfix">
                <label class="form_label pull-left">QQ</label>
                <input type="text" class="form_input input_connect" v-model="data.qq" v-bind:readonly="isReadOnly" v-bind:class="onlyread">
              </div>
              <div class="form-group clearfix">
                <label class="form_label pull-left">微信号</label>
                <input type="text" class="form_input input_connect" v-model="data.weixin" v-bind:readonly="isReadOnly" v-bind:class="onlyread">
              </div>
            </section>
          </form>
          <!-- <a class="edit_account" v-if="!is_edit" @click="edit_account()">编辑账户信息</a> -->
          <a class="edit_account" v-if="is_edit" @click="save()">保存</a>
        </div>
        <div class="personal_card pull-right" style="display:none;">
          <h4 class="card_title">
            <img src="../../assets/images/icon_wd_wodemingpian.png">
            我的名片
          </h4>
          <div class="card_detail">
            <h4 class="name">{{data.nameCn}}</h4>
            <p class="company_name">{{data.companyFullName}}</p>
            <ul class="info_list clearfix">
              <li class="clearfix">
                <p class="pull-left">手机</p>
                {{data.mobile}}
              </li>
              <li class="clearfix">
                <p class="pull-left">微信</p>
                {{weixin}}
              </li>
              <li class="clearfix">
                <p class="pull-left">座机</p>
                {{data.telephone}}
              </li>
              <li class="clearfix">
                <p class="pull-left">QQ</p>
                {{qq}}
              </li>
              <li class="clearfix" style="width: 200px;">
                <p class="pull-left">邮箱</p>
                {{email}}
              </li>
            </ul>
            <p class="company_address">{{data.companyAddress}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="popup-overlay" v-if="marsk == true"></div>
  <keep-alive>
    <component :is="currentView" :size="size"></component>
  </keep-alive>
  <div class="save_tips text-center" v-if="save_true == true">
    <img src="../../assets/images/icon_zhucechenggong.png"> 保存成功
  </div>
</div>
</template>
<script>
  let $self = ''
  import HeaderBar from '../common/header.vue'
  import FooterView from '../common/footer.vue'
  import ChangePhone from '../common/change_phone.vue'
  import {loginHandle, errorRequestHandle} from '../../assets/js/tools'
  export default {
    namne: 'Myaccount',
    data () {
      return {
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
        zone: '',
        extension: '',
        number: '',
        isReadOnly: true,
        onlyread: 'readonly',
        is_edit: false,
        marsk: false,
        currentView: '',
        save_true: false,
        wait: 2,
        error: {
          nameCn: '',
          nameEn: '',
          companyFullName: '',
          email: '',
          telephone: ''
        },
        email: '',
        qq: '',
        weixin: '',
        footClass: '',
        size: {
          height: '',
          width: ''
        }
      }
    },
    created () {
      $self = this
      let username = localStorage.getItem('username')
      if (username === null) {
        $self.$router.push({name: 'index'})
      }
      $self.getaccount()
    },
    updated () {
      $self.autofooter()
    },
    components: {
      'HeaderBar': HeaderBar,
      'FooterView': FooterView,
      'ChangePhone': ChangePhone
    },
    'methods': {
      'inputChange': function (type) {
        this.error[type] = ''
      },
      'update': function () {
        $self.iscode = true
        if ($self.wait <= 0) {
          $self.wait = 2
          $self.save_true = false
          clearInterval(this.Interval)
        } else {
          $self.wait--
        }
      },
      'getaccount': function () {
        $self.$http.get('/chugui-web/account/myAccount',
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            },
            emulateJSON: true
          }).then(loginHandle).then((response) => {
            let json = response.body
            if (json.success === true) {
              $self.data = json.body
              let telephone = json.body.telephone.split('-')
              if (telephone.length <= 1) {
                $self.number = telephone[0] || ''
                $self.extension = telephone[2] || ''
              } else {
                $self.zone = telephone[0] || ''
                $self.number = telephone[1] || ''
                $self.extension = telephone[2] || ''
              }
              $self.qq = json.body.qq
              $self.email = json.body.email
              $self.weixin = json.body.weixin
            } else {
              $self.error = json.message
            }
          }).catch(errorRequestHandle)
      },
      'edit_account': function () {
        $self.onlyread = 'can_edit'
        $self.isReadOnly = false
        $self.is_edit = true
      },
      'change': function () {
        let windowHeight = document.documentElement.clientHeight
        let logintop = windowHeight - 334
        logintop = logintop / 2
        let windowWidth = document.documentElement.clientWidth
        let loginleft = windowWidth - 580
        loginleft = loginleft / 2
        let top = logintop
        let left = loginleft
        $self.size = {
          height: top,
          width: left
        }
        $self.currentView = ChangePhone
        $self.marsk = true
      },
      'smsMsg': function () {
        if ($self.data.smsMsgStatus === '0') {
          $self.data.smsMsgStatus = '1'
        } else {
          $self.data.smsMsgStatus = '0'
        }
        let params = {
          smsMsgStatus: $self.data.smsMsgStatus
        }
        $self.$http.post('/chugui-web/account/modifyAccount',
          params,
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            }
          }).then(loginHandle).then((response) => {
            let json = response.body
            if (json.success === true) {
              $self.getaccount()
            }
          }).catch(errorRequestHandle)
      },
      'emailMsg': function () {
        if ($self.data.emailMsgStatus === '0') {
          $self.data.emailMsgStatus = '1'
        } else {
          $self.data.emailMsgStatus = '0'
        }
        let params = {
          emailMsgStatus: $self.data.emailMsgStatus
        }
        $self.$http.post('/chugui-web/account/modifyAccount',
          params,
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            }
          }).then(loginHandle).then((response) => {
            let json = response.body
            if (json.success === true) {
              $self.getaccount()
            }
          }).catch(errorRequestHandle)
      },
      'save': function () {
        let params = $self.data
        let flag = true
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        let isemail = reg.test($self.data.email)
        delete params.smsCode
        delete params.userAccount
        delete params.mobile
        if ($self.data.nameCn === '') {
          $self.error.nameCn = 'error'
          flag = false
        }
        // if ($self.data.nameEn === '') {
        //   $self.error.nameEn = 'error'
        //   flag = false
        // }
        if ($self.data.companyFullName === '') {
          $self.error.companyFullName = 'error'
          flag = false
        }
        if ($self.data.email === '') {
          $self.error.email = 'error'
          flag = false
        }
        if ($self.data.email !== '' && isemail === false) {
          $self.error.email = 'error'
          flag = false
        }
        // if ($self.zone === '' || $self.number === '' || $self.extension === '') {
        //   $self.error.telephone = 'error'
        //   flag = false
        // }
        if (flag === false) {
          return false
        } else {
          if ($self.number) {
            $self.data.telephone = $self.number
            if ($self.zone) {
              $self.data.telephone = $self.zone + '-' + $self.data.telephone
            }
            if ($self.extension) {
              $self.data.telephone = $self.data.telephone + '-' + $self.extension
            }
          }
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
                $self.getaccount()
                $self.error.nameCn = ''
                $self.error.nameEn = ''
                $self.error.companyFullName = ''
                $self.error.email = ''
                $self.error.telephone = ''
                $self.onlyread = 'readonly'
                $self.isReadOnly = true
                $self.is_edit = false
                $self.save_true = true
                $self.Interval = setInterval($self.update, 1000)
              }
            }).catch(errorRequestHandle)
        }
      },
      'autofooter': function () {
        let LQHeight = document.documentElement.clientHeight
        let BHeight = document.body.offsetHeight
        let ceil = LQHeight - BHeight
        if (ceil > 50) {
          $self.footClass = 'footer_fixed'
        } else {
          $self.footClass = 'footer_absolute'
        }
      }
    }
  }
</script>
<style scoped>
@import '../../assets/css/account.css'
</style>

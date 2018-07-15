<template>
  <div class="index">
    <div class="reset_pwd">
      <h3 class="text-center">找回密码</h3>
      <ul class="reset_tab clearfix">
        <li>
          <img src="../../assets/images/icon_shouji.png">
        </li>
        <li v-if="currentStep == 'CheckPhone'">
          <img src="../../assets/images/icon_jt_1.png">
        </li>
        <li v-if="currentStep == 'CheckPhone'">
          <img src="../../assets/images/icon_mima_1.png">
        </li>
        <li v-if="currentStep == 'SetPwd'">
          <img src="../../assets/images/icon_jt_2.png">
        </li>
        <li v-if="currentStep == 'SetPwd'">
          <img src="../../assets/images/icon_mima_2.png">
        </li>
        <li>
          <img src="../../assets/images/icon_jt_1.png">
        </li>
        <li>
          <img src="../../assets/images/icon_chongzhichenggong.png">
        </li>
      </ul>
      <keep-alive>
        <component :is="currentStep"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  import HeaderBar from '../common/header.vue'
  import Login from '../common/login.vue'
  import Register from '../common/register.vue'
  import CheckPhone from './checkphone.vue'
  import SetPwd from './setpwd.vue'
  import FooterView from '../common/footer.vue'
  export default {
    name: 'reset',
    data () {
      return {
        marsk: false,
        currentStep: 'CheckPhone',
        step: 1,
        data: {
          mobile: '',
          password: '',
          code: ''
        }
      }
    },
    components: {
      'HeaderBar': HeaderBar,
      'Login': Login,
      'Register': Register,
      'CheckPhone': CheckPhone,
      'SetPwd': SetPwd,
      'FooterView': FooterView
    },
    beforeCreate: function () {
      /* let username = localStorage.getItem('username')
      if (username === null) {
        this.$router.push({name: 'index'})
      } */
      // localStorage.setItem('userId', 'reset_pwd')
    }
  }
</script>
<style scoped>
  @import "../../assets/css/resetpwd.css";
</style>

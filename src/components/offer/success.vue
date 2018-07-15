<template>
  <div class="index">
    <div class="offer_view text-center">
      <img src="../../assets/images/icon_chenggong.png"/>
      <h4>提交成功!</h4>
      <p class="send_mg">我们将尽快给您报价，请保持关注<span>站内信/短信/邮件</span>通知。</p>
      <p class="tips">{{time}}秒后自动跳转到我的询盘</p>
      <a class="sure" @click="sure()">立即跳转</a>
    </div>
  </div>
</template>
<script>
  let $self = ''
  import HeaderBar from '../common/header.vue'
  import FooterView from '../common/footer.vue'
  export default {
    name: 'offer_success',
    data () {
      return {
        time: 5
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
      $self.timer()
    },
    'methods': {
      'update': function () {
        if ($self.time <= 0) {
          $self.$router.replace({name: 'wait_inquiry'})
          clearInterval($self.Interval)
        } else {
          $self.time--
        }
      },
      'timer': function () {
        $self.Interval = setInterval($self.update, 1000)
      },
      'sure': function () {
        clearInterval($self.Interval)
        $self.$router.replace({name: 'wait_inquiry'})
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/offer.css";
</style>

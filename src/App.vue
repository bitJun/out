<template>
  <div id="app">
    <HeaderBar></HeaderBar>
    <div class="current-page" v-bind:style="height ? `min-height: ${height}px`: ''">
    <router-view></router-view>
    </div>
    <FooterView></FooterView>
  </div>
</template>
<script>
let fromRoute = ['inquiry', 'wait_inquiry', 'inquiry_detail', 'quotation']
import HeaderBar from './components/common/header.vue'
import FooterView from './components/common/footer.vue'
import * as events from 'events'
import 'sweetalert/dist/sweetalert.css'
window.appEvent = new events.EventEmitter()
export default {
  name: 'app',
  data () {
    return {
      height: 0
    }
  },
  'methods': {
    'contains': function (arr, obj) {
      let i = arr.length
      while (i--) {
        if (arr[i] === obj) {
          return true
        }
      }
      return false
    }
  },
  created () {
    this.height = document.documentElement.clientHeight - 64 - 200
  },
  watch: {
    '$route' (to, from) {
      _czc.push([ "_trackPageview",to.path,from.path]);
      let frompath = from.name
      let flag = this.contains(fromRoute, frompath)
      if (flag === false) {
        // localStorage.setItem('palletDates', '')
      }
    }
  },
  components: {
    'HeaderBar': HeaderBar,
    'FooterView': FooterView
  }
}
</script>

<style scoped>
  @import "./assets/css/common.css";
</style>

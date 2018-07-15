<template>
  <div class="index">
    <div class="msg_view">
      <div class="title">
        <p>我的消息</p>
      </div>
      <div class="msg_main">
        <div class="msg_filter clearfix">
          <div class="select_all pull-left">
            <input type="checkbox" name="checkall" @click="selectAll($event)" v-model="checkAll">
            全选
          </div>
          <ul class="quick_operate list-inline pull-left">
            <li @click="read()">
              <a>
                <img src="../../assets/images/icon_wdxx_bj.png">
                标为已读
              </a>
            </li>
            <li @click="allread()">
              <a>
                <img src="../../assets/images/icon_wdxx_qbbj.png">
                全部标为已读
              </a>
            </li>
            <li @click="deletemsg()">
              <a>
                <img src="../../assets/images/icon_wdxx_schu.png">
                删除
              </a>
            </li>
          </ul>
        </div>
        <div class="msg_list">
          <ul>
            <li v-for="(item,index) in message" :class="{'active':item.readStatus == 0}">
                <input type="checkbox" name="checkbox" :value="item.id" v-model="ids" @click="select(item.id, $event)">
              <div class="item" @click="readMessage(item.id, index)">
              <h4>
                <span>{{item.messageTitle}}</span>
                <img src="../../assets/images/icon_wdxx_new.png" v-if="item.readStatus == 0">
              </h4>
              <p v-html="item.content">{{item.content}}</p>
              <p class="time">{{item.time}}</p>
              </div>
            </li>
          </ul>
        </div>
        <PageNav :pages="pages" v-if="pageshow == true & pages.totalnum != 0"></PageNav>
      </div>
    </div>
  </div>
</template>
<script>
  let $self = ''
  let pages = {
    totalnum: 0,
    current: 0,
    totalpage: 0,
    size: 10
  }
  import swal from 'sweetalert'
  import 'sweetalert/dist/sweetalert.css'
  import HeaderBar from '../common/header.vue'
  import FooterView from '../common/footer.vue'
  import PageNav from '../common/page.vue'
  import {loginHandle, errorRequestHandle} from '../../assets/js/tools'
  export default {
    name: 'msg',
    data () {
      return {
        message: [],
        ids: [],
        pages: pages,
        pageshow: false,
        start: 0,
        condition: {},
        footClass: '',
        checkAll: false
      }
    },
    created () {
      $self = this
      let username = localStorage.getItem('username')
      if (username === null) {
        $self.$router.push({name: 'index'})
      }
      window.appEvent.emit('updateMessage')
      $self.mgslist()
    },
    updated () {
      $self.autofooter()
    },
    'methods': {
      'mgslist': function () {
        let params = {
          condition: $self.condition,
          size: $self.pages.size,
          start: $self.start
        }
        $self.$http.post('/chugui-web/userMessage/findPage',
          params,
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            }
          }).then(loginHandle).then((response) => {
            let json = response.body
            if (json.success === true) {
              if (json.body.list.length <= 0 && $self.start > 0) {
                $self.start = $self.start-$self.pages.size
                return
              }
              $self.message = json.body.list
              $self.handleMessage(json.body.list)
              $self.pages = {
                totalnum: json.body.total,
                current: json.body.currentPage,
                totalpage: json.body.totalPage,
                size: $self.pages.size
              }
              if (json.body.total > 0) {
                $self.pageshow = true
              }
            }
          }).catch(errorRequestHandle)
      },
      'readMessage': function (id, index) {
        let url = $self.message[index].url
        if ($self.message[index].readStatus == '0') {
          $self.read(id)
        }
        if (url) {
          $self.$router.push(url)
        }
      },
      'handleMessage': function (list) {
        for (let i in list) {
          list[i].content = $self.formatMessage(list[i].messageContent)
          list[i].url = $self.getMessageUrl(list[i].messageContent)
        }
        $self.message = list
      },
      'getMessageUrl': function(content) {
        let formatMap = {
          inquiryUrl: {
            formatUrl: '/inquiry/detail/:value',
            exp: new RegExp("#inquiryUrl#(.*?)#inquiryUrl#","g")
          },
          offerUrl: {
            formatUrl: '/inquiry/quotation/:value',
            exp: new RegExp("#offerUrl#(.*?)#offerUrl#","g")
          }
        }
        for(let i in formatMap) {
          let result = formatMap[i].exp.exec(content)
          let value = result ? result[1] : ''
          if (value) {
            return formatMap[i].formatUrl.replace(":value", value)
          }
        }
        return null
      },
      'formatMessage': function (content) {
        let formatMap = {
          inquiryUrl: {
            exp: new RegExp("#inquiryUrl#(.*?)#inquiryUrl#","g"),
            format: null
          },
          offerUrl: {
            exp: new RegExp("#offerUrl#(.*?)#offerUrl#","g"),
            format: null
          },
          inquiryNo: {
            exp: new RegExp("#inquiryNo#(.*?)#inquiryNo#","g"),
            format: 'strong'
          },
          offerNo: {
            exp: new RegExp("#offerNo#(.*?)#offerNo#","g"),
            format: 'strong'
          },
          pol: {
            exp: new RegExp("#pol#(.*?)#pol#","g"),
            format: 'strong'
          },
          pod: {
            exp: new RegExp("#pod#(.*?)#pod#","g"),
            format: 'strong'
          }
        }
        for(let i in formatMap) {
          let result = formatMap[i].exp.exec(content)
          let value = result ? result[1] : ''
          if (formatMap[i].format) {
            content = content.replace(formatMap[i].exp,`<span class="${formatMap[i].format}">${value}</span>`)
          } else {
            content = content.replace(formatMap[i].exp,"")
          }
        }
        return content
      },
      'select': function (id, event) {
        if (event.currentTarget.checked) {
          if($self.ids.length == $self.message.length) {
            $self.checkAll = true
          }
        }else {
          $self.checkAll = false
        }
      },
      'selectAll': function (event) {
        if (!event.currentTarget.checked) {
          $self.ids = []
        } else {
          $self.ids = []
          $self.message.forEach(function (item, i) {
            $self.ids.push(item.id)
          })
        }
      },
      'deletemsg': function () {       // 删除
        if ($self.ids.length === 0) {
          swal({
            title: '请选择需要删除的消息',
            text: '',
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#DD6B55',
            timer: 2000,
            confirmButtonText: '好的',
            closeOnConfirm: false
          })
          return false
        } else {
          $self.readIds($self.ids).then((response) => {
            let json = response.body
            if (json.success === true) {
              window.appEvent.emit('updateMessage')
              $self.$http.post('/chugui-web/userMessage/deleteByIds',
                $self.ids,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'charset': 'utf-8'
                  }
                }).then(loginHandle).then((response) => {
                  let json = response.body
                  if (json.success === true) {
                    $self.mgslist()
                  }
                }).catch(errorRequestHandle)
            }
          })
        }
      },
      'allread': function () {       // 标记为全部已读
        $self.$http.post('/chugui-web/userMessage/markAllRead',
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            }
          }).then(loginHandle).then((response) => {
            let json = response.body
            if (json.success === true) {
              $self.mgslist()
              window.appEvent.emit('updateMessage')
            }
          }).catch(errorRequestHandle)
      },
      'readIds': function (ids) {
          return $self.$http.post('/chugui-web/userMessage/markReadByIds',
            ids,
            {
              headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
              }
            }).then(loginHandle).catch(errorRequestHandle)
      },
      'read': function (id) {       // 标记为已读
        if ($self.ids.length === 0 && !id) {
          swal({
            title: '请选择需要标记为已读的消息',
            text: '',
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#DD6B55',
            timer: 2000,
            confirmButtonText: '好的',
            closeOnConfirm: false
          })
          return Promise.reject()
        } else {
          let ids = id ? [id] : $self.ids
          return $self.readIds(ids).then((response) => {
              let json = response.body
              if (json.success === true) {
                $self.mgslist()
                $self.ids = []
              }
            })
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
    },
    components: {
      'HeaderBar': HeaderBar,
      'FooterView': FooterView,
      'PageNav': PageNav
    },
    'watch': {
      start: {
        handler: (val, oldVal) => {
          if (val !== oldVal) {
            $self.start = val
            $self.mgslist()
          }
        },
        deep: true
      },
      ids: {
        handler: (val, oldVal) => {
        },
        deep: true
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/msg.css";
</style>

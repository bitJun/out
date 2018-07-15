<template>
  <div class="index">
    <div class="inquiry_view">
      <ul class="inquiry_tab clearfix">
        <li>
          <router-link :to="{name:'inquiry'}">已报价询盘<span>({{Quoted}})</span></router-link>
        </li>
        <li class="active">
          <a @click="reset()">待报价询盘<span>({{wait_Quoted}})</span></a>
        </li>
      </ul>
    </div>
    <div class="inquiry_main">
      <div class="inquiry">
        <div class="inquiry_filter clearfix">
          <!-- <label class="pull-left">询价时间:</label> -->
          <ul class="list-inline pull-left">
            <li @click="timeselect($event, 0)">
              <a class="active">全部</a>
            </li>
            <li @click="timeselect($event, 1)">
              <a>最近一周</a>
            </li>
            <li @click="timeselect($event, 2)">
              <a>最近一月</a>
            </li>
            <li @click="timeselect($event, 3)">
              <a>最近半年</a>
            </li>
          </ul>
          <div class="pull-right key_search clearfix">
            <input type="text" class="search_key pull-left" @click="showpod()" no="search_key" @keyup="getSearchPod()" placeholder="请输入目的港" @keyup.enter="search" v-model="search_pod"/>
            <a class="search pull-left" @click="search()">
               <img src="../../assets/images/icon_sousuo.png"/> 
            </a>
            <div class="allPodWithRoute" v-if="pod_show == true">
              <div class="end_search">
                <p class="end_router">支持中/英文输入</p>
              </div>
              <ul class="clearfix router_area">
                <li v-for="(item,index) in RouteArea" v-bind:class="{'actived':index==0}">
                  <a @click="chooseRoute(index,$event)" no="pod_item">{{item.routeName}}</a>
                </li>
              </ul>
              <div class="area_ditail clearfix">
                <ul class="pull-left area">
                  <li v-for="(data,index) in area" @click="choosearea(index)" no="pod_item">
                    {{data.routeName}}
                  </li>
                </ul>
                <ul class="pull-left item clearfix">
                  <li v-for="(item,index) in area_item" @click="enditem(item.id,item.portEn,item.portCn)" v-bind:title="item.portEn" no="pod_item">
                    {{item.portEn}}({{item.portCn}})
                  </li>
                </ul>
              </div>
            </div>
            <div class="searchPod" v-if="pod_search == true">
              <p class="text-center">
                <img src="../../assets/images/icon_up.png">
                支持中/英文输入
              </p>
              <ul id="searchPodlist">
                <li v-for="(item,index) in pod_result" @click="searchitem(item.id,item.portEn,item.portCn)" no="pod_item">{{item.portEn}}({{item.portCn}})</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="inquiry_list">
          <ul vi-if="jsondata.length>0">
            <li v-for="(item,index) in jsondata" class="item">
              <div class="title clearfix">
                <p class="order pull-left">
                  询盘编号: <span style="margin-left: 5px;margin-right: 20px;">{{item.inquiryNo}}</span>
                </p>
                <p class="time pull-left">
                  询盘时间: <span style="margin-left: 5px;margin-right: 20px;">{{item.inquiryTime | time}}</span>
                </p>
                <ul class="list-inline pull-right">
                  <li>
                    <router-link :to="{ name: 'inquiry_detail', params: { id: item.id }}">
                      询盘详情
                    </router-link><span style="margin: 0 10px;">|</span>
                  </li>
                  <li>
                    <a @click="apply(index)">再次询价</a>
                  </li>
                </ul>
              </div>
              <div class="item_main clearfix">
                <div class="process pull-left">
                  <img src="../../assets/images/icon_jiantou_2.png">
                  <p class="from">{{item.pol.portEn}}({{item.pol.portCn}})</p>
                  <p class="to">{{item.pod.portEn}}({{item.pod.portCn}})</p>
                </div>
                <div class="rules pull-left">
                  <p>
                    <span v-if="item.palletDatas[0].cabinetType == '2'">
                      {{item.palletDatas[0].boxQuantity}} x {{item.palletDatas[0].boxType}}/
                      {{item.palletDatas[0].length}}{{item.palletDatas[0].lengthUnit}}*
                      {{item.palletDatas[0].width}}{{item.palletDatas[0].widthUnit}}*
                      {{item.palletDatas[0].height}}{{item.palletDatas[0].heightUnit}}/
                      {{item.palletDatas[0].weightPerOne}}{{item.palletDatas[0].weightUnit}}
                    </span>
                    <span v-if="item.palletDatas[0].cabinetType == '1'">
                      {{item.palletDatas[0].boxQuantity}}*{{item.palletDatas[0].boxType}}
                    </span>
                  </p>
                  <p v-if="item.palletDatas.length>1">
                    <span v-if="item.palletDatas[1].cabinetType == '2'">
                      {{item.palletDatas[1].boxQuantity}} x {{item.palletDatas[1].boxType}}/
                      {{item.palletDatas[1].length}}{{item.palletDatas[1].lengthUnit}}*
                      {{item.palletDatas[1].width}}{{item.palletDatas[1].widthUnit}}*
                      {{item.palletDatas[1].height}}{{item.palletDatas[1].heightUnit}}/
                      {{item.palletDatas[1].weightPerOne}}{{item.palletDatas[1].weightUnit}}
                    </span>
                    <span v-if="item.palletDatas[1].cabinetType == '1'">
                      {{item.palletDatas[1].boxQuantity}} x {{item.palletDatas[1].boxType}}
                    </span>
                  </p>
                  <p v-if="item.palletDatas.length>2">...</p>
                </div>
                <div class="when pull-left">
                  {{item.shipmentTime | datetime}}出运
                </div>
                <div class="operate pull-right">
                  <div class="In_quotation text-center" v-if="item.inquiryStatus == 1">
                    <img src="../../assets/images/icon_loudou_xz.gif">
                    <p>船公司报价中，请稍等...</p>
                  </div>
                  <div class="edit_quotation" v-if="item.inquiryStatus == 2">
                    <router-link :to="{ name: 'quotation', params: { id: item.id }}">
                      <img src="../../assets/images/icon_bjd_chakan.png">
                      查看报价单
                    </router-link>
                    <a>
                      <img src="../../assets/images/icon_bjd_xiazai.png"/>
                      下载报价单
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <PageNav :pages="pages" v-if="pageshow == true"></PageNav>
      </div>
      <div class="inquiry_empty" v-if="loaded && pages.totalnum == 0">
        <h4 class="text-center">暂无询盘信息</h4>
        <p class="text-center">洛阳亲友如相问，就说我在出柜么</p>
        <router-link to="/" class="want">我要出柜</router-link>
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
    size: 8
  }
  import HeaderBar from '../common/header.vue'
  import FooterView from '../common/footer.vue'
  import PageNav from '../common/page.vue'
  import {loginHandle, errorRequestHandle} from '../../assets/js/tools'
  import $ from 'jquery'
  export default {
    name: 'wait_inquiry',
    data () {
      return {
        loaded: false,
        jsondata: [],
        pages: pages,
        pageshow: false,
        start: 0,
        condition: {},
        search_pod: '',
        search_tmp_pod: '',
        Quoted: '',
        wait_Quoted: '',
        footClass: '',
        pod_show: false,
        pod_search: false,
        RouteArea: [],
        area: [],
        area_item: [],
        pod_result: [],
        searchid: []
      }
    },
    created () {
      $self = this
      let username = localStorage.getItem('username')
      if (username === null) {
        $self.$router.push({name: 'index'})
      }
      $self.condition.inquiryStatus = 1
      $self.$http.get('/chugui-web/inquiry/inquiryCount',
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          emulateJSON: true
        }).then(loginHandle).then((res) => {
          $self.Quoted = res.body.body[1] || 0
          $self.wait_Quoted = res.body.body[0] || 0
        }).catch(errorRequestHandle)
      $self.inquirylist()
      localStorage.setItem('palletDates', '')
    },
    updated () {
      $self.autofooter()
    },
    'methods': {
      'showpod': function () {
        if ($self.search_pod !== '') {
          $self.pod_show = false
          $self.pod_search = true
          $self.getpod($self.search_pod)
          return false
        } else {
          return false
          // $self.RouteArea = JSON.parse(localStorage.getItem('RouteArea'))
          // $self.area = $self.RouteArea[0].subRoutes
          // $self.area_item = $self.RouteArea[0].subRoutes[0].pods
          // $self.pod_show = true
          // $self.pod_search = false
          // return false
        }
      },
      'getSearchPod': function () {
        if ($self.search_pod !== '') {
          $self.pod_show = false
          $self.pod_search = true
          // $self.getallPodWithRoute()
          $self.getpod($self.search_pod)
          return false
        } else {
          return false
          // $self.RouteArea = JSON.parse(localStorage.getItem('RouteArea'))
          // $self.area = $self.RouteArea[0].subRoutes
          // $self.area_item = $self.RouteArea[0].subRoutes[0].pods
          // $self.pod_show = true
          // $self.pod_search = false
          // return false
        }
      },
      'searchend': function () {
        $self.getpod($self.search_pod)
      },
      'chooseRoute': function (index, event) {
        let $div = $(event.currentTarget)
        $div.parent().addClass('actived')
        $div.parent().siblings().removeClass('actived')
        $self.area = $self.RouteArea[index].subRoutes
        $self.area_item = $self.area[0].pods
      },
      'choosearea': function (index) {
        $self.area_item = $self.area[index].pods
      },
      'getpod': function (name) {           //  查询目的港接口
        let params = {
          name: name
        }
        $self.$http.post('/chugui-web/baseData/pod',
          params,
          {
            headers: {
              Accept: 'application/json'
            },
            emulateJSON: true
          }).then(loginHandle).then((res) => {
            if (res.body.success === true) {
              $self.pod_result = []
              $self.pod_result = res.body.body
            }
          }).catch(errorRequestHandle)
      },
      'enditem': function (id, portEn, portCn) {          // 选择目的港
        $self.searchid = id
        $self.search_pod = portEn + '(' + portCn + ')'
        $self.search_tmp_pod = $self.search_pod
        $self.pod_show = false
        $self.pod_search = false
      },
      'searchitem': function (id, portEn, portCn) {
        $self.searchid = id
        $self.search_pod = portEn + '(' + portCn + ')'
        $self.search_tmp_pod = $self.search_pod
        $self.pod_search = false
      },
      'getallPodWithRoute': function () {
        if (localStorage.getItem('allPodWithRoute') === null) {
          $self.$http.get('/chugui-web/baseData/allPodWithRoute',   // 查询目的港与航线
            {
              headers: {
                'Content-Type': 'application/json',
                'charset': 'utf-8'
              },
              emulateJSON: true
            }).then(loginHandle).then((response) => {
              let json = response.body
              if (json.success === true) {
                $self.allPodWithRoute = json.body
                $self.RouteArea = $self.allPodWithRoute
                $self.area = $self.RouteArea[0].subRoutes
                $self.area_item = $self.RouteArea[0].subRoutes[0].pods
                localStorage.setItem('RouteArea', JSON.stringify($self.RouteArea))
              }
            }).catch(errorRequestHandle)
        } else {
          $self.RouteArea = JSON.parse(localStorage.getItem('RouteArea'))
          $self.area = $self.RouteArea[0].subRoutes
          $self.area_item = $self.RouteArea[0].subRoutes[0].pods
        }
      },
      'reset': function () {
        $self.condition = {}
        $self.condition.inquiryStatus = 1
        $self.inquirylist()
      },
      'inquirylist': function () {
        let params = {
          condition: $self.condition,
          size: $self.pages.size,
          start: $self.start
        }
        $self.$http.post('/chugui-web/inquiry/find',
          params,
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            }
          }).then(loginHandle).then((response) => {
            let json = response.body
            if (json.success === true) {
              $self.jsondata = $self.formatInquiry(json.body.list)
              $self.pages = {
                totalnum: json.body.total,
                current: json.body.currentPage,
                totalpage: json.body.totalPage,
                size: $self.pages.size
              }
              $self.loaded = true
              if (json.body.total > 0) {
                $self.pageshow = true
              }
            }
          }).catch(errorRequestHandle)
      },
      'formatInquiry': function (list) {
        for(let i in list) {
          list[i].palletDatas = list[i].palletDatas.sort((a, b) => {
            return a.cabinetType == 1 
          })
        }
        return list
      },
      'timeselect': function (event, type) {
        let $div = $(event.currentTarget)
        $div.find('a').addClass('active')
        $div.siblings().find('a').removeClass('active')
        switch (type) {
          case 0:
            $self.condition.dateType = ''
            $self.inquirylist()
            break
          case 1:
            $self.condition.dateType = '1'
            $self.inquirylist()
            break
          case 2:
            $self.condition.dateType = '2'
            $self.inquirylist()
            break
          case 3:
            $self.condition.dateType = '3'
            $self.inquirylist()
            break
          default:
            $self.condition.dateType = ''
            $self.inquirylist()
            break
        }
      },
      'search': function () {
        $self.condition.podIds = $self.searchid ? [$self.searchid] : null
        $self.condition.podNameLike = !$self.searchid || $self.search_pod != $self.search_tmp_pod ? $self.search_pod : null
        $self.inquirylist()
      },
      'autofooter': function () {
        let LQHeight = document.documentElement.clientHeight
        let BHeight = document.body.offsetHeight
        let ceil = LQHeight - BHeight
        if (ceil > 0) {
          $self.footClass = 'footer_fixed'
        } else {
          $self.footClass = 'footer_absolute'
        }
      },
      'apply': function (index) {
        if ($self.jsondata[index]) {
          sessionStorage.setItem('inquiry', JSON.stringify($self.jsondata[index]))
          $self.$router.push({name: 'index'})
        }
      }
    },
    components: {
      'HeaderBar': HeaderBar,
      'FooterView': FooterView,
      'PageNav': PageNav
    },
    mounted () {
      document.getElementsByTagName('body')[0].addEventListener('click', function (event) {
        if (event.target.getAttribute('no') === 'search_key') {
          return false
        }
        if (event.target.getAttribute('no') !== 'pod_item') {
          $self.placeholder = '请输入目的港'
          $self.pod_show = false
          $self.pod_search = false
        }
      }, false)
    },
    watch: {
      'search_pod': {
        handler: (val, oldVal) => {
          if (val !== oldVal && val === '') {
            delete $self.condition.podIds
            $self.inquirylist()
          }
        },
        deep: true
      },
      'start': {
        handler: (val, oldVal) => {
          if (val !== oldVal) {
            $self.start = val
            $self.inquirylist()
          }
        },
        deep: true
      }
    }
  }
</script>
<style scoped>
  @import '../../assets/css/inquiry.css';
</style>

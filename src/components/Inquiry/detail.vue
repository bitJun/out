<template>
  <div class="index">
    <ChooseShipCompany v-bind:show="selectShipCompanyShow" v-bind:list="selectShipCompanyList" v-bind:close="closeSelectShipCompany"  v-bind:item="selectShipCompanyItem"></ChooseShipCompany>
    <div class="inquiry_detail">
      <div class="title">
        <p>
          {{status}}
          <span> > </span>
          询盘详情
          <a @click="back()">返回</a>
        </p>
      </div>
      <div class="detail_main">
        <div class="base_info">
          询盘编号: {{cabinet.inquiryNo}}
          <span>询盘时间: {{cabinet.inquiryTime | time}}</span>
        </div>
        <h4 class="line" v-if="pod.portEn != ''">
          {{pol.portEn}}&nbsp;({{pol.portCn}})
          <span>→</span>
          {{pod.portEn}}&nbsp;({{pod.portCn}})
        </h4>
        <ul>
          <li>
            <div class="Special_cabinet">
              <p>特种柜</p>
              <ul v-for="item in specail">
                <li>
                  {{item.boxQuantity}}&nbsp;*&nbsp;{{item.boxType}}&nbsp;/
                  &nbsp;长&nbsp;{{item.length}}{{item.lengthUnit}}&nbsp;*
                  &nbsp;宽&nbsp;{{item.width}}{{item.widthUnit}}&nbsp;*
                  &nbsp;高&nbsp;{{item.height}}{{item.heightUnit}}&nbsp;
                  &nbsp;/&nbsp;重{{item.weightPerOne}}{{item.weightUnit}}
                </li>
              </ul>
            </div>
            <div class="normal_cabinet" v-if="normal.length>0">
              <p>普柜</p>
              <ul class="clearfix">
                <li v-for="(item,index) in normal">
                  {{item.boxQuantity}}*{{item.boxType}}
                  <span v-if="index != (normal.length - 1)">+</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <div class="service" v-if="cabinet.trailerStatus==1 || cabinet.lashingStatus==1">
          <p>港前服务</p>
          <ul>
            <li v-if="cabinet.trailerStatus==1">
              到厂拖车:&nbsp;&nbsp;{{cabinet.trailerAddress}}
            </li>
            <li v-if="cabinet.lashingStatus==1">
              上门绑扎:&nbsp;&nbsp;{{cabinet.lashingAddress}}
            </li>
            <li v-if="cabinet.warehouseLoadingStatus==1">
              仓库装柜
            </li>
            <li v-if="cabinet.customBrokerStatus==1">
              代理报关
            </li>
          </ul>
        </div>
        <div class="Arrival_time">
          <p>预计出运时间</p>
          <p class="time">{{cabinet.shipmentTime | datetime}}</p>
        </div>
        <ul class="operate_btns list-inline" v-if="!!status">
          <li v-if="cabinet.inquiryStatus!=1">
            <router-link :to="{ name: 'quotation', params: { id: id }}" class="active" target="_blank">查看报价单</router-link>
          </li>
          <li v-if="cabinet.inquiryStatus!=1">
            <a @click="download(item)">下载报价单</a>
          </li>
          <li>
            <!-- <router-link to="/">再次询价</router-link> -->
            <a @click="apply()">再次询价</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  let $self = ''
  import HeaderBar from '../common/header.vue'
  import FooterView from '../common/footer.vue'
  import ChooseShipCompany from '../common/chooseShipCompany.vue'
  import {loginHandle, errorRequestHandle} from '../../assets/js/tools'
  export default {
    name: 'inquiry_detail',
    data () {
      return {
        item: {},
        cabinet: {},
        specail: [],
        pol: {},
        pod: {},
        normal: [],
        footClass: '',
        status: '',
        selectShipCompanyShow: false,
        selectShipCompanyList: [],
        selectShipCompanyItem: {}
      }
    },
    created () {
      $self = this
      let username = localStorage.getItem('username')
      if (username === null) {
        $self.$router.push({name: 'index'})
      }
      let id = this.$route.params.id
      $self.id = id
      $self.$http.post('/chugui-web/inquiry/findById',
        {
          inquiryId: $self.id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
          },
          emulateJSON: true
        }).then(loginHandle).then((response) => {
          let json = response.body
          if (json.success === true) {
            if (json.body.inquiryStatus === '1') {
              $self.status = '待报价询盘'
            }
            if (json.body.inquiryStatus === '2') {
              $self.status = '已报价询盘'
            }
            $self.cabinet = json.body
            $self.pol = json.body.pol
            $self.pod = json.body.pod
            $self.specail = []
            $self.normal = []
            $self.item = json.body
            for (let i = 0; i < json.body.palletDatas.length; i++) {
              let data = json.body.palletDatas[i]
              if (data.cabinetType === '2') {
                $self.specail.push(data)
              } else if (data.cabinetType === '1') {
                $self.normal.push(data)
              }
            }
          }
        }).catch(errorRequestHandle)
      $self.autofooter()
    },
    components: {
      'HeaderBar': HeaderBar,
      'FooterView': FooterView,
      'ChooseShipCompany': ChooseShipCompany
    },
    updated () {
      $self.autofooter()
    },
    'methods': {
      'closeSelectShipCompany': function () {
        $self.selectShipCompanyShow = false
      },
      'back': function () {
        this.$router.go(-1)
      },
      'apply': function () {
        if ($self.cabinet) {
          sessionStorage.setItem('inquiry', JSON.stringify($self.cabinet))
          $self.$router.push({name: 'index'})
        }
      },
      'download': function (item) {
        $self.$http.post('/chugui-web/inquiry/findShippingCompanyOfferByInquiryId',
          {
            inquiryId: item.id
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            },
            emulateJSON: true
          }).then(loginHandle).then((res) => {
            if (res.ok) {
              $self.selectShipCompanyShow = true
              $self.selectShipCompanyList = res.body.body
              $self.selectShipCompanyItem = item
            }
          }).catch(errorRequestHandle)
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
  @import "../../assets/css/inquiry_detail.css";
</style>

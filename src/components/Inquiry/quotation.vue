<template>
  <div class="index quotation_main">
    <div class="quotation_title clearfix">
      <div class="title pull-left">
        <h3>报价单</h3>
        <p>有{{num}}份报价单,请查看或下载</p>
      </div>
      <div class="manager pull-right">
        <ul>
          <li class="clearfix">
            <p class="position pull-left">
              <img src="../../assets/images/icon_kehujingli.png">客户经理
            </p>
            <p class="mobile pull-left">
              手机:{{manager.mobile}}
            </p>
            <p class="qq pull-left">
              QQ:{{manager.qq}}
            </p>
          </li>
          <li class="clearfix">
            <p class="name pull-left">
              {{manager.nameCn}}{{manager.nameEn}}
            </p>
            <p class="email pull-left">
              邮箱:{{manager.email}}
            </p>
            <p class="wechat pull-left">
              微信:{{manager.wechat}}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="quotation_item">
      <ul class="clearfix">
        <li class="pull-left" v-for="(item,index) in offeringLists" @click="changeoffer(index,$event)" v-bind:class="{'active':index==0}">
          <h4>{{item.shippingCompany.companyEn}}</h4>
          <div class="price">
            <p><span>$</span>{{item.feeCountUsd}}</p>
            <p><span>￥</span>{{item.feeCountCny}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="quotation_detail">
      <h3>
        {{pol.portEn}} ({{pol.portCn}}) -> {{pod.portEn}} ({{pod.portCn}})
        <div class="quotation_baseinfo clearfix">
          <p class="pull-left">报价时间: {{offer.offerTime | time_Ymd}}</p>
          <p class="pull-right">
            <span>询盘编号:{{inquiry.inquiryNo}}</span>
            <span>报价单号:{{offer.offeringNo}}</span>
          </p>
        </div>
      </h3>
      <div class="ship_info info_detail">
        <h4 class="title">船舶信息</h4>
        <table>
          <thead>
            <tr>
              <td class="text-center">船公司</td>
              <td class="text-center">开船日</td>
              <td class="text-center">直达或中转港</td>
              <td class="text-center">航程(天)</td>
              <td class="text-center">起运港码头</td>
              <td class="text-center">价格有效期(截止时间)</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in offer.shippingInfos">
              <td class="text-center">{{offer.shippingCompany.companyEn}}</td>
              <td class="text-center">
                {{data.shippingDate}}
              </td>
              <td class="text-center">{{data.shippingMethod == "1" ? '直达' : data.transitPortDto
 ? data.transitPortDto.portCn : ''}}</td>
              <td class="text-center">{{data.voyage}}</td>
              <td class="text-center">{{data.pierDto ? data.pierDto.pierNameCn : ''}}</td>
              <td class="text-center">{{offer.termValidity | time_Ymd}}</td>
            </tr>
          </tbody>
        </table>
        <section>
          <h4 class="title">海运费用</h4>
          <table>
            <thead>
            <tr>
              <td class="text-center">柜型</td>
              <td class="text-center">柜量</td>
              <td class="text-center">长(MM)</td>
              <td class="text-center">宽(MM)</td>
              <td class="text-center">高(MM)</td>
              <td class="text-center">单柜货重(KG)</td>
              <td class="text-center">币种</td>
              <td class="text-center">单柜运费</td>
              <td class="text-center">费用小计</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in offer.shippingFees">
              <td class="text-center">{{item.boxType}}</td>
              <td class="text-center">{{item.boxQuantity}}</td>
              <td class="text-center">
                  {{item.length ? item.length +'mm': ''}}
              </td>
              <td class="text-center">
                  {{item.length ? item.width +'mm': ''}}
              </td>
              <td class="text-center">
                  {{item.length ? item.height +'mm': ''}}
              </td>
              <td class="text-center">
                  {{item.length ? item.weight +'kg': ''}}
              </td>
              <td class="text-center">{{item.currency}}</td>
              <td class="text-center"><span>{{item.feePerCabinet}}</span></td>
              <td class="text-center">{{item.feeCount}}</td>
            </tr>
            </tbody>
          </table>
           <p class="total_fee" v-if="total.shippingFees">海运费用合计:<span>￥{{total.shippingFees.CNY}}</span><span>${{total.shippingFees.USD}}</span></p> 
        </section>
        <section v-if="offer.localFees && offer.localFees.length>0">
          <h4 class="title">本地费用</h4>
          <table>
            <thead>
            <tr>
              <td class="text-center">费用名称</td>
              <td class="text-center">计费方式</td>
              <td class="text-center">20OT {{number['20OT'] ? '('+number['20OT']+')' : 0}}</td>
              <td class="text-center">20FR {{number['20FR'] ? '('+number['20FR']+')' : 0}}</td>
              <td class="text-center">40OT {{number['40OT'] ? '('+number['40OT']+')' : 0}}</td>
              <td class="text-center">40FR {{number['40FR'] ? '('+number['40FR']+')' : 0}}</td>
              <td class="text-center">20GP {{number['20GP'] ? '('+number['20GP']+')' : 0}}</td>
              <td class="text-center">40GP {{number['40GP'] ? '('+number['40GP']+')' : 0}}</td>
              <td class="text-center">40HC {{number['40HC'] ? '('+number['40HC']+')' : 0}}</td>
              <td class="text-center">币种</td>
              <td class="text-center">费用小计</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in offer.localFees">
              <td class="text-center">{{item.feeNameCn}}</td>
              <td class="text-center">{{item.pricingMethod == 1 ? '按票' : '按柜'}}</td>
              <td class="text-center" colspan="7" v-if="item.pricingMethod == 1">{{item.charges}}</td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '20OT'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '20FR'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '40OT'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '40FR'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '20GP'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '40GP'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '40HC'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center">{{item.currency}}</td>
              <td class="text-center">{{item.feeCount}}</td>
            </tr>
            </tbody>
          </table>
           <p class="total_fee" v-if="total.localFees">本地费用合计:<span>￥{{total.localFees.CNY}}</span><span>${{total.localFees.USD}}</span></p> 
        </section>
        <section v-if="offer.packingFees && offer.packingFees.length>0">
          <h4 class="title">装柜费用</h4>
          <table>
            <thead>
              <tr>
                <td class="text-center">柜型</td>
                <td class="text-center">柜量</td>
                <td class="text-center">服务项目</td>
                <td class="text-center">长(MM)</td>
                <td class="text-center">宽(MM)</td>
                <td class="text-center">高(MM)</td>
                <td class="text-center">单柜货重(KG)</td>
                <td class="text-center">币种</td>
                <td class="text-center">单柜费用</td>
                <td class="text-center">费用小计</td>
              </tr>
            </thead>
            <tbody>
            <tr v-for="item in offer.packingFees">
              <td class="text-center">{{item.boxType}}</td>
              <td class="text-center">{{item.boxQuantity}}</td>
              <td class="text-center">{{item.serviceItem}}</td>
              <td class="text-center">
                  {{item.length ? item.length +'mm': ''}}
              </td>
              <td class="text-center">
                  {{item.length ? item.width +'mm': ''}}
              </td>
              <td class="text-center">
                  {{item.length ? item.height +'mm': ''}}
              </td>
              <td class="text-center">
                  {{item.length ? item.weight +'kg': ''}}
              </td>
              <td class="text-center">{{item.currency}}</td>
              <td class="text-center">{{item.feePerCabinet}}</td>
              <td class="text-center">{{item.feeCount}}</td>
            </tr>
            </tbody>
          </table>
           <p class="total_fee" v-if="total.packingFees">装柜费用合计:<span>￥{{total.packingFees.CNY}}</span><span>${{total.packingFees.USD}}</span></p> 
           <p class="address" v-if="offer.trailerAddress">拖车地址:{{offer.trailerAddress}}</p>
           <p class="address" v-if="offer.lashingAddress">绑扎地址:{{offer.lashingAddress}}</p>
        </section>
        <section v-if="offer.otherFees && offer.otherFees.length>0">
          <h4 class="title">其他费用</h4>
          <table>
            <thead>
            <tr>
              <td class="text-center">费用名称</td>
              <td class="text-center">计费方式</td>
              <td class="text-center">20OT {{number['20OT'] ? '('+number['20OT']+')' : 0}}</td>
              <td class="text-center">20FR {{number['20FR'] ? '('+number['20FR']+')' : 0}}</td>
              <td class="text-center">40OT {{number['40OT'] ? '('+number['40OT']+')' : 0}}</td>
              <td class="text-center">40FR {{number['40FR'] ? '('+number['40FR']+')' : 0}}</td>
              <td class="text-center">20GP {{number['20GP'] ? '('+number['20GP']+')' : 0}}</td>
              <td class="text-center">40GP {{number['40GP'] ? '('+number['40GP']+')' : 0}}</td>
              <td class="text-center">40HC {{number['40HC'] ? '('+number['40HC']+')' : 0}}</td>
              <td class="text-center">币种</td>
              <td class="text-center">费用小计</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in offer.otherFees">
              <td class="text-center">{{item.feeName}}</td>
              <td class="text-center">{{item.pricingMethod == 1 ? '按票' : '按柜'}}</td>
              <td class="text-center" colspan="7" v-if="item.pricingMethod == 1">{{item.charges}}</td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '20OT'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '20FR'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '40OT'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '40FR'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '20GP'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '40GP'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center" v-if="item.pricingMethod == 2">
                <span v-if="data.boxType == '40HC'" v-for="data in item.cabinetFees">{{data.feePerCabinet}}</span>
              </td>
              <td class="text-center">{{item.currency}}</td>
              <td class="text-center">{{item.feeCount}}</td>
            </tr>
            </tbody>
          </table>
           <p class="total_fee" v-if="total.otherFees">其他费用合计:<span>￥{{total.otherFees.CNY}}</span><span>${{total.otherFees.USD}}</span></p> 
        </section>
        <div class="total text-center">美金费用合计:<span>USD&nbsp;{{offer.feeCountUsd}}</span>&nbsp;&nbsp;人民币费用合计:<span>CNY&nbsp;{{offer.feeCountCny}}</span></div>
        <div class="remark">
          <p>备注信息:</p>

          <ul>
            <pre>{{offer.remarks}}</pre>
          </ul>
        </div>
      </div>
    </div>
    <ul class="clearifx operate">
      <li class="pull-left">
        <a class="download" @click="download()">下载报价单</a>
      </li>
      <li class="pull-left">
        <a @click="copy()">一键复制报价</a>
      </li>
      <li class="pull-left">
        <a @click="apply()">再次询价</a>
      </li>
    </ul>
    <textarea style="position:fixed;bottom:-100px;" ref="hiddenText" ></textarea>
  </div>
</template>
<script>
  let $self = ''
  import $ from 'jquery'
  import configs from '../../assets/js/index_config'
  import swal from 'sweetalert'
  import 'sweetalert/dist/sweetalert.css'
  import {loginHandle, errorRequestHandle} from '../../assets/js/tools'
  export default {
    name: 'show_inquiry_detail',
    data () {
      return {
        num: 1,
        manager: {
          nameCn: '',
          nameEn: '',
          mobile: '',
          qq: '',
          email: '',
          wechat: ''
        },
        quotation: [
        ],
        pol: {},
        pod: {},
        offeringLists: [],
        offer: {},
        inquiry: {},
        downloadId: '',
        total: {},
        number: {}
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
      $self.$http.post('/chugui-web/inquiry/findOfferlingList',
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
            $self.cabinet = json.body
            $self.pol = json.body.inquiry.pol
            $self.pod = json.body.inquiry.pod
            $self.inquiry = json.body.inquiry
            $self.offeringLists = json.body.offeringLists
            $self.num = json.body.offeringLists.length
            $self.chooseOffer(0)
          }
          if (response.success === false) {
            swal({
              type: 'error',
              title: '',
              text: response.message
            }, function () {
              window.close()
            })
          }
        }).catch(errorRequestHandle)
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
            $self.manager.nameCn = jsondata.body.applySaleDto.nameCn
            $self.manager.nameEn = jsondata.body.applySaleDto.nameEn
            $self.manager.mobile = jsondata.body.applySaleDto.mobile
            $self.manager.email = jsondata.body.applySaleDto.email
            $self.manager.qq = jsondata.body.applySaleDto.qq
            $self.manager.wechat = jsondata.body.applySaleDto.weixin
          }
        }).catch(errorRequestHandle)
    },
    'methods': {
      'download': function () {
        let params = {
          url: '/chugui-web/inquiry/download',
          data: {
            shippingCompanyOfferId: $self.downloadId
          }
        }
        $self.DownLoadFile(params)
      },
      'DownLoadFile': function (options) {
        var config = $.extend(true, { method: 'post' }, options)
        var $iframe = $('<iframe id="down-file-iframe" />')
        var $form = $('<form target="down-file-iframe" method="' + config.method + '" />')
        $form.attr('action', config.url)
        for (var key in config.data) {
          $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />')
        }
        $iframe.append($form)
        $(document.body).append($iframe)
        $form[0].submit()
        $iframe.remove()
      },
      'changeoffer': function (index, event) {
        let $div = $(event.currentTarget)
        $div.addClass('active')
        $div.siblings().removeClass('active')
        $self.chooseOffer(index)
      },
      'chooseOffer': function (index) {
        $self.offer = $self.offeringLists[index]
        $self.downloadId = $self.offer.id
        let total = {
          CNY: 0,
          USD: 0,
          shippingFees: {
            CNY: 0,
            USD: 0
          },
          localFees: {
            CNY: 0,
            USD: 0
          },
          packingFees: {
            CNY: 0,
            USD: 0
          },
          otherFees: {
            CNY: 0,
            USD: 0
          }
        }
        for (let i = 0; i < $self.offer.shippingFees.length; i++) {
          let item = $self.offer.shippingFees[i]
          if (item.currency) {
            total.shippingFees[item.currency] += item.feeCount
            total[item.currency] += item.feeCount
          }
        }
        for (let i = 0; i < $self.offer.packingFees.length; i++) {
          let item = $self.offer.packingFees[i]
          if (item.currency) {
            total.packingFees[item.currency] += item.feeCount
            total[item.currency] += item.feeCount
          }
        }
        for (let i = 0; i < $self.offer.localFees.length; i++) {
          let item = $self.offer.localFees[i]
          if (item.currency) {
            total.localFees[item.currency] += item.feeCount
            total[item.currency] += item.feeCount
          }
        }
        for (let i = 0; i < $self.offer.otherFees.length; i++) {
          let item = $self.offer.otherFees[i]
          if (item.currency) {
            total.otherFees[item.currency] += item.feeCount
            total[item.currency] += item.feeCount
          }
        }
        $self.total = total
        let number = {
          '20OT': 0,
          '20FR': 0,
          '40OT': 0,
          '40FR': 0,
          '20GP': 0,
          '40GP': 0,
          '40HC': 0
        }
        for (let i = 0; i < $self.offer.shippingFees.length; i++) {
          let item = $self.offer.shippingFees[i]
          number[item.boxType] += item.boxQuantity
        }
        $self.number = number
      },
      'apply': function (index) {
        if ($self.inquiry) {
          sessionStorage.setItem('inquiry', JSON.stringify($self.inquiry))
          $self.$router.push({name: 'index'})
        }
      },
      'copy': function () {
        var text = `POL/POD: ${$self.inquiry.pol.portEn}/${$self.inquiry.pod.portEn}\n\n`
        text += `Carrier: ${$self.offer.shippingCompany.companyEn} `
        for (let i = 0; i < $self.offer.shippingInfos.length; i++) {
          let info = $self.offer.shippingInfos[i]
          let date = info.shippingDate.split(',')
          date = date.map(function (item, index) {
            return configs.week[item]
          })
          date = date.join(',')
          let shippingMethod = info.shippingMethod === '1' ? ' Via: Direct; ' : ` Via: ${info.transitPortDto ? info.transitPortDto.portEn: ''};`
          text += `ETD: ${date}; ${shippingMethod} T/T:${info.voyage}Days;  Terminal: ${info.pierDto ? info.pierDto.pierNameEn : ''}\n\n`
        }
        text += `Ocean freight:\n`
        for (let i = 0; i < $self.offer.shippingFees.length; i++) {
          let ship = $self.offer.shippingFees[i]
          text += `${ship.boxQuantity}x${ship.boxType}`
          if(ship.length || ship.width || ship.height || ship.weight) {
            text += `/L${ship.length}*W${ship.width}*H${ship.height}mm/${ship.weight}kg`
          }
          text += `/Ocean freight:${ship.currency}${ship.feePerCabinet}x${ship.boxQuantity}\n`
        }
        let timeDate = new Date($self.offer.termValidity)
        text += `Valid until ${timeDate.getDate()} ${configs.monthEn[timeDate.getMonth()]} ${timeDate.getFullYear()}\n\n`
        text += `Local charge:\n`
        for (let i = 0; i < $self.offer.localFees.length; i++) {
          let local = $self.offer.localFees[i]
          text += `${configs.changeText[local.feeNameCn] ? configs.changeText[local.feeNameCn] : local.feeNameCn}: `
          if (local.pricingMethod == '1') {
            text += `${local.currency}${local.charges}x1`
          } else {
            for (let ii = 0; ii < local.cabinetFees.length; ii++) {
              let cabinet = local.cabinetFees[ii]
              text += ` ${local.currency}${cabinet.feePerCabinet}x${cabinet.quantity} `
            }
          }
          text += '\n'
        }
        for (let i = 0; i < $self.offer.otherFees.length; i++) {
          let other = $self.offer.otherFees[i]
          text += `${configs.changeText[other.feeName] ? configs.changeText[other.feeName] : other.feeName}: `
          if (other.pricingMethod == '1') {
            text += `${other.currency}${other.charges}x1`
          } else {
            for (let ii = 0; ii < other.cabinetFees.length; ii++) {
              let cabinet = other.cabinetFees[ii]
              text += ` ${other.currency}${cabinet.feePerCabinet}x${cabinet.quantity} `
            }
          }
          text += '\n'
        }
        var hiddenText = this.$refs.hiddenText
        hiddenText.value = text
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
          var el = hiddenText
          var editable = el.contentEditable
          var readOnly = el.readOnly
          el.contentEditable = true
          el.readOnly = false
          var range = document.createRange()
          range.selectNodeContents(el)
          var sel = window.getSelection()
          sel.removeAllRanges()
          sel.addRange(range)
          el.setSelectionRange(0, 999999)
          el.contentEditable = editable
          el.readOnly = readOnly
        } else {
          hiddenText.select()
        }
        document.execCommand('copy')
        swal({
          title: '已复制',
          text: '',
          type: 'info',
          timer: 2000
        })
        setTimeout(() => {
          hiddenText.blur()
        }, 1)
      }
    }
  }
</script>
<style scoped>
@import "../../assets/css/quotation.css";
</style>

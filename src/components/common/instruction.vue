<template>
  <div class="instruction_view" v-bind:style="{top:data.height+'px',left:data.width+'px'}">
    <img src="../../assets/images/water_img.png" class="water-img" />
    <div class="Special_cabinet">
      <img src="../../assets/images/icon_guanbi_1.png" class="close" @click="close()"/>
      <div class="title text-center">
        <h4>特种柜的尺寸标准及载重负荷</h4>
        <p>OOG’s Standard Specification</p>
      </div>
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <td rowspan="2" class="text-center">
              箱型<br/>Type
            </td>
            <td colspan="3" class="text-center">箱体内部尺寸<br/>Internal dimension(mm)</td>
            <td colspan="2" class="text-center">箱门开度尺寸<br/>Door Opening(mm)</td>
            <td colspan="2" class="text-center">顶部开度尺寸<br/>Roof Opening(mm)</td>
            <td colspan="3" class="text-center">载重负荷<br/>Peyload(kg)</td>
          </tr>
          <tr>
            <td class="text-center">
              长<br/>
              Length
            </td>
            <td class="text-center">
              宽<br/>
              Width
            </td>
            <td class="text-center">
              高<br/>
              Height
            </td>
            <td class="text-center">
              宽<br/>
              Width
            </td>
            <td class="text-center">
              高<br/>
              Height
            </td>
            <td class="text-center">
              长<br/>
              Length
            </td>
            <td class="text-center">
              宽<br/>
              Width
            </td>
            <td class="text-center">
              货箱总重<br/>
              Max gross
            </td>
            <td class="text-center">
              箱重<br/>
              Tare
            </td>
            <td class="text-center">
              可载重量<br/>
              Max payload
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center">20'OT</td>
            <td class="text-center">5,800</td>
            <td class="text-center">2,330</td>
            <td class="text-center">2,300</td>
            <td class="text-center">2,330</td>
            <td class="text-center">2,260</td>
            <td class="text-center">5,430</td>
            <td class="text-center">2,100</td>
            <td class="text-center">27,480</td>
            <td class="text-center">2,250</td>
            <td class="text-center">25,230</td>
          </tr>
          <tr>
            <td class="text-center">40'OT</td>
            <td class="text-center">11,800</td>
            <td class="text-center">2,330</td>
            <td class="text-center">2,300</td>
            <td class="text-center">2,330</td>
            <td class="text-center">2,260</td>
            <td class="text-center">11,530</td>
            <td class="text-center">2,100</td>
            <td class="text-center">30,480</td>
            <td class="text-center">3,900</td>
            <td class="text-center">26,580</td>
          </tr>
          <tr>
            <td class="text-center">20'FR</td>
            <td class="text-center">5,500</td>
            <td class="text-center">2,350</td>
            <td class="text-center">2,210</td>
            <td class="text-center" colspan="4">/</td>
            <td class="text-center">27,750</td>
            <td class="text-center">2,750</td>
            <td class="text-center">25,000</td>
          </tr>
          <tr>
            <td class="text-center">40'FR</td>
            <td class="text-center">11,650</td>
            <td class="text-center">2,350</td>
            <td class="text-center">1,955</td>
            <td class="text-center" colspan="4">/</td>
            <td class="text-center">39,900</td>
            <td class="text-center">4,900</td>
            <td class="text-center">35,000</td>
          </tr>
        </tbody>
      </table>
      <div class="how_to clearfix">
        <div class="kefu pull-left">
          <h4>看完以上尺寸标准，还是不知道箱子怎么配?</h4>
          <p>可咨询您的专属客户经理，为您提供合理的配箱方案<br/>服务时间(工作日)09:00-18:00</p>
        </div>
        <div class="kefu_tel pull-left">
          <ul>
            <li class="clearfix">
              <div class="who pull-left">
                <img src="../../assets/images/icon_kehujingli.png">
                客户经理
              </div>
              <p class="Contact pull-left">手机：{{mobile}}</p>
            </li>
            <li class="clearfix">
              <div class="who pull-left text-center" v-bind:title="nameCn + '-' +nameEn">
                {{nameCn}}
              </div>
              <p class="Contact pull-left" v-bind:title="email">邮箱：{{email}}</p>
            </li>
            <li class="clearfix">
              <div class="who pull-left" style="cursor: pointer;" @click="chat()">
                <img src="../../assets/images/icon_qq.gif"/>
              </div>
              <p class="Contact pull-left" v-bind:title="weixin">微信：{{weixin}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  let $self = ''
  import {loginHandle, errorRequestHandle} from '../../assets/js/tools'
  export default {
    props: {
      data: {
        type: Object // 类型按需求
      }
    },
    data () {
      return {
        weixin: '',
        email: '',
        mobile: '',
        nameCn: '',
        nameEn: '',
        qq: ''
      }
    },
    created: function () {
      $self = this
      let windowHeight = document.documentElement.clientHeight
      let logintop = windowHeight - 382
      logintop = logintop / 2
      let windowWidth = document.documentElement.clientWidth
      let loginleft = windowWidth - 920
      loginleft = loginleft / 2
      $self.top = logintop
      $self.left = loginleft
      if (!$self.data.username) {
        $self.$http.get('/chugui-web/baseData/superAdmin',
          {
            headers: {
              'Content-Type': 'application/json',
              'charset': 'utf-8'
            },
            emulateJSON: true
          }).then(loginHandle).then((response) => {
            let jsondata = response.body
            if (jsondata.success === true) {
              $self.weixin = jsondata.body.weixin
              $self.qq = jsondata.body.qq
              $self.email = jsondata.body.email
              $self.mobile = jsondata.body.mobile
              $self.nameCn = jsondata.body.nameCn
              $self.nameEn = jsondata.body.nameEn
            }
          }).catch(errorRequestHandle)
      } else {
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
              $self.weixin = jsondata.body.applySaleDto.weixin
              $self.qq = jsondata.body.applySaleDto.qq
              $self.email = jsondata.body.applySaleDto.email
              $self.mobile = jsondata.body.applySaleDto.mobile
              $self.nameCn = jsondata.body.applySaleDto.nameCn
              $self.nameEn = jsondata.body.applySaleDto.nameEn
            }
          }).catch(errorRequestHandle)
      }
    },
    'methods': {
      'close': function () {
        $self.$parent.instructionview = ''
        $self.$parent.marsk = false
      },
      'chat': function () {
        let qq = $self.qq
        window.open('http://wpa.qq.com/msgrd?v=3&uin=' + qq + '&site=qq&menu=yes')
      }
    }
  }
</script>
<style scoped>
@import "../../assets/css/instruction.css";
</style>

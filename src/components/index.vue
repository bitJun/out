<template>
  <div class="index">
    <div class="main">
      <div class="logo text-center">
        <img src="../assets/images/img_logo_1.jpg" style="width: 240px;height: 107px;">
      </div>
      <div class="select_departure">
        <ul class="clearfix">
          <li v-bind:class="{active: data.polId}">
            <a class="start_pol" @click="showpol()" v-bind:class="{errors_pol: error.pol}">
              {{start_port}}
            </a>
            <div class="start_departure" v-show="pol_show == true">
              <p>
                选择起运港
                <img src="../assets/images/icon_up.png">
              </p>
              <ul>
                <li v-for="(item,index) in start_departure" v-bind:class="{'fisrtpol':index==0}">
                  <a v-if="item.frontStatus == '1'" @click="choosepod(item.id, item.portEn, item.portCn, $event)" no="pol_item">
                    {{item.portEn}}({{item.portCn}})
                  </a>
                  <a v-if="item.frontStatus == '2'" class="disable" no="pol_item">
                    {{item.portEn}}({{item.portCn}})
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="to_departure">
            <a>
              <img src="../assets/images/icon_jiantou_1.png"/>
            </a>
          </li>
          <li>
            <input class="end_departure" type="text" v-if="!!placeholder.search_end" ref="search_end" @blur="placeholderBlur('search_end', $event)"  @click="showpod()" @keyup="getSearchPod()" v-bind:class="error.pod" v-model="search_end" v-bind:placeholder="placeholderSearchEnd">
             <input class="end_departure placeholder" type="text" v-if="!placeholder.search_end" @focus="placeholderFocus('search_end')" v-bind:class="error.pod" v-model="placeholderSearchEnd"> 
            <div class="allPodWithRoute" v-if="pod_show == true">
              <div class="end_search">
                <p class="end_router">
                  支持中/英文输入
                  <img src="../assets/images/icon_up.png">
                </p>
              </div>
              <ul class="clearfix router_area">
                <li v-for="(item,index) in RouteArea" v-bind:class="{'actived':index==0}">
                  <a @click="chooseRoute(index,$event)" no="pod_item">{{item.routeName}}</a>
                </li>
              </ul>
              <div class="area_ditail clearfix">
                <ul class="pull-left area">
                  <li v-for="(data,index) in area" @click="choosearea(index,$event)" no="pod_item"  v-bind:class="{'actived':index==0}">
                    {{data.routeName}}
                    <img src="../assets/images/icon_jt_2.png"/>
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
              <div class="content">
                <p class="text-center">
                  <img src="../assets/images/icon_up.png">
                  支持中/英文输入
                </p>
                <ul id="searchPod_list">
                  <li v-for="(item,index) in pod_result" @click="searchitem(item.id,item.portEn,item.portCn)" no="pod_item">{{item.portEn}}({{item.portCn}})</li>
              </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="clearfix Match_box">
        <div class="pull-left">
          <img src="../assets/images/icon_tongzhi.png"/>至少要有一行特种柜信息哦!
        </div>
        <a class="pull-right" @click="instruction()">配箱指导</a>
      </div>
      <ul class="Match_box_list">
        <li class="clearfix list_item_title">
          <div class="pull-left Cabinet_type">
            <p class="title text-center">柜型</p>
          </div>
          <div class="pull-left Cabinet_num">
            <p class="title text-center">柜量</p>
          </div>
          <div class="pull-left Cabinet_size">
            <p class="title text-center">尺寸</p>
          </div>
          <div class="pull-left Cabinet_Weight">
            <p class="title text-center">货重</p>
          </div>
        </li>
        <li class="clearfix list_item" v-for="(item,index) in palletDatas">
          <div class="pull-left plus" @click="addMatch()" v-if="index == 0"></div>
          <div class="pull-left mine" @click="removeMatch(index)" v-if="index!=0"></div>
          <div class="pull-left Cabinet_type">
            <ul class="clearfix" v-bind:class="errortips[index].boxType">
              <li class="pull-left" v-bind:class="boxType[index].first" @click="BoxType(index,'20OT','first')">
                <p>20'OT</p>
                <p>小开顶</p>
              </li>
              <li class="pull-left" v-bind:class="boxType[index].second" @click="BoxType(index,'40OT','second')">
                <p>40'OT</p>
                <p>大开顶</p>
              </li>
              <li class="pull-left" v-bind:class="boxType[index].third" @click="BoxType(index,'20FR','third')">
                <p>20'FR</p>
                <p>小框架</p>
              </li>
              <li class="pull-left" v-bind:class="boxType[index].four" @click="BoxType(index,'40FR','four')">
                <p>40'FR</p>
                <p>大框架</p>
              </li>
            </ul>
          </div>
          <div class="pull-left Cabinet_num" v-bind:class="errortips[index].boxQuantity">
            <input max = '99999' min = '0' v-model="item.boxQuantity"  @keyup="cabinetSizeChange(index, 'boxQuantity', $event)" type="text"/>
          </div>
          <div class="pull-left Cabinet_size clearfix">
            <div class="pull-left Cabinet_item clearfix" v-bind:class="errortips[index].length">
              <input class="Cabinet_length" :placeholder="placeholderLength" v-model="item.length" type="text" max = '99999' min = "0"  @keyup="cabinetSizeChange(index, 'length', $event)" v-if="!!placeholder['length'+index]" v-bind:ref="'length'+index" @blur="placeholderBlur('length'+index, $event)"/>
              <input class="Cabinet_length placeholder" v-model="placeholderLength" type="text" max = '99999' min = "0" v-if="!placeholder['length'+index]" @focus="placeholderFocus('length'+index)"/>
              <div class="Company" v-bind:class="errortips[index].lengthUnit">
                <p @click="showUnit($event)" no="unit">
                  <span no="unit">{{item.lengthUnit || '单位'}}</span>
                  <i class="iconfont icon-sanjiaoxing-copy-copy" no="unit"></i>
                  <img src="../assets/images/icon_triangle.png" no="unit">
                </p>
                <ul class="Company_list">
                  <li @click="chooseCompany($event,'lengthUnit',index)" no="unit">mm</li>
                  <li @click="chooseCompany($event,'lengthUnit',index)" no="unit">cm</li>
                  <li @click="chooseCompany($event,'lengthUnit',index)" no="unit">m</li>
                </ul>
              </div>
            </div>
            <div class="pull-left Cabinet_item clearfix" v-bind:class="errortips[index].width">
              <input class="Cabinet_width" :placeholder="placeholderWidth" v-model="item.width" type="text" max = '99999' min = "0"  @keyup="cabinetSizeChange(index, 'width', $event)" v-if="!!placeholder['width'+index]" v-bind:ref="'width'+index" @blur="placeholderBlur('width'+index, $event)"/>
              <input class="Cabinet_width placeholder" v-model="placeholderWidth" type="text" max = '99999' min = "0" v-if="!placeholder['width'+index]" @focus="placeholderFocus('width'+index)"/>
              <div class="Company" v-bind:class="errortips[index].widthUnit">
                <p @click="showUnit($event)" no="unit">
                  <span no="unit">{{item.widthUnit || '单位'}}</span>
                  <i class="iconfont icon-sanjiaoxing-copy-copy" no="unit"></i>
                  <img src="../assets/images/icon_triangle.png" no="unit">
                </p>
                <ul class="Company_list">
                  <li @click="chooseCompany($event,'widthUnit',index)" no="unit">mm</li>
                  <li @click="chooseCompany($event,'widthUnit',index)" no="unit">cm</li>
                  <li @click="chooseCompany($event,'widthUnit',index)" no="unit">m</li>
                </ul>
              </div>
            </div>
            <div class="pull-left Cabinet_item clearfix" v-bind:class="errortips[index].height">
              <input class="Cabinet_height" :placeholder="placeholderHeight" v-model="item.height" type="text" max = '99999' min = "0"  @keyup="cabinetSizeChange(index, 'height', $event)" v-if="!!placeholder['height'+index]" v-bind:ref="'height'+index" @blur="placeholderBlur('height'+index, $event)"/>
              <input class="Cabinet_height placeholder" v-model="placeholderHeight" type="text" max = '99999' min = "0" v-if="!placeholder['height'+index]" @focus="placeholderFocus('height'+index)"/>
              <div class="Company" v-bind:class="errortips[index].heightUnit">
                <p @click="showUnit($event)" no="unit">
                  <span no="unit">{{item.heightUnit || '单位'}}</span>
                  <i class="iconfont icon-sanjiaoxing-copy-copy" no="unit"></i>
                  <img src="../assets/images/icon_triangle.png" no="unit">
                </p>
                <ul class="Company_list">
                  <li @click="chooseCompany($event,'heightUnit',index)" no="unit">mm</li>
                  <li @click="chooseCompany($event,'heightUnit',index)" no="unit">cm</li>
                  <li @click="chooseCompany($event,'heightUnit',index)" no="unit">m</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="pull-left Cabinet_Weight clearfix" v-bind:class="errortips[index].weight">
              <input class="pull-left" :placeholder="placeholderWeight" v-model="item.weightPerOne" type="text" max = '99999' min = "0"  @keyup="cabinetSizeChange(index, 'weight', $event)" v-if="!!placeholder['weight'+index]" v-bind:ref="'weight'+index" @blur="placeholderBlur('weight'+index, $event)"/>
              <input class="pull-left placeholder" v-model="placeholderWeight" type="text" max = '99999' min = "0" v-if="!placeholder['weight'+index]" @focus="placeholderFocus('weight'+index)"/>
            <div class="pull-right Company" v-bind:class="errortips[index].weightUnit">
              <p @click="showUnit($event)" no="unit">
                <span no="unit">{{item.weightUnit || '单位'}}</span>
                <i class="iconfont icon-sanjiaoxing-copy-copy" no="unit"></i>
                <img src="../assets/images/icon_triangle.png" no="unit">
              </p>
              <ul class="Company_list">
                <li @click="chooseCompany($event,'weightUnit',index)" no="unit">kg</li>
                <li @click="chooseCompany($event,'weightUnit',index)" no="unit">t</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <div class="other">
        <div class="title clearfix">
          <p class="pull-left">还有普通货柜？</p>
          <p class="pull-left">还需港前服务？</p>
          <p class="pull-left"><span class="must">*</span>出运时间</p>
        </div>
        <div class="other_content clearfix">
          <div class="normal_Cabinet pull-left">
            <ul class="clearfix">
              <li class="clearfix">
                <input :placeholder="placeholderSize" v-model='normal1.boxQuantity' type="text" max = '99999' min = "0" v-if="!!placeholder['normal1']" v-bind:ref="'normal1'" @blur="placeholderBlur('normal1', $event)">
                <input class="placeholder" v-model="placeholderSize" type="text" max = '99999' min = "0" v-if="!placeholder['normal1']" @focus="placeholderFocus('normal1')"/>
                <p>x 20'GP</p>
              </li>
              <li class="clearfix">
                <input :placeholder="placeholderSize" v-model='normal2.boxQuantity' type="text" max = '99999' min = "0" v-if="!!placeholder['normal2']" v-bind:ref="'normal2'" @blur="placeholderBlur('normal2', $event)">
                <input class="placeholder" v-model="placeholderSize" type="text" max = '99999' min = "0" v-if="!placeholder['normal2']" @focus="placeholderFocus('normal2')"/>
                <p>x 40'GP</p>
              </li>
              <li class="clearfix">
                <input :placeholder="placeholderSize" v-model='normal3.boxQuantity' type="text" max = '99999' min = "0" v-if="!!placeholder['normal3']" v-bind:ref="'normal3'" @blur="placeholderBlur('normal3', $event)">
                <input class="placeholder" v-model="placeholderSize" type="text" max = '99999' min = "0" v-if="!placeholder['normal3']" @focus="placeholderFocus('normal3')"/>
                <p>x 40'HC</p>
              </li>
            </ul>
          </div>
          <div class="hongkong pull-left">
            <ul class="list-inline">
              <li>
                <label>
                  <input type="checkbox" name="checkbox" v-model="data.trailerStatus" v-bind:true-value="a" v-bind:false-value="b"/>
                  到厂拖车
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name="checkbox" v-model="data.warehouseLoadingStatus" v-bind:true-value="a" v-bind:false-value="b"/>
                  仓库装柜
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name="checkbox" v-model="data.lashingStatus" v-bind:true-value="a" v-bind:false-value="b"/>
                  上门绑扎
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name="checkbox" v-model="data.customBrokerStatus" v-bind:true-value="a" v-bind:false-value="b"/>
                  代理报关
                </label>
              </li>
            </ul>
          </div>
          <div class="calendar pull-right">
            <a class="shipmentTime" v-bind:class="{errortime: errortime, active: data.shipmentTime}" @click= 'showcalendar()' no="time">{{shipmentTime}}</a>
            <div class="kalendar" v-if="timechoose == true">
              <p class="text-center tli">
                <img src="../assets/images/icon_triangle.png">
              </p>
              <ul class="clearfix year_type">
                <li v-bind:class="calendar[1] ? 'w-2 active': 'w-1 active'">
                  <a @click="chooseYear($event,0)" no="time">{{calendar[0].year}}</a>
                </li>
                <li v-bind:class="calendar[1] ? 'w-2': 'w-1'" v-if="calendar[1]">
                  <a @click="chooseYear($event,1)" no="time">{{calendar[1].year}}</a>
                </li>
              </ul>
              <div class="months">
                <ul class="clearfix actived">
                  <li v-bind:class="`w-${calendar[0].month.length}`" v-for="item in calendar[0].month">
                    <a v-bind:data-pid='item.id' @click="chooseTime($event)" no="time">{{item.name}}</a>
                  </li>
                </ul>
                <ul class="clearfix" v-if="calendar[1]">
                  <li v-bind:class="`w-${calendar[1].month.length}`" v-for="item in calendar[1].month">
                    <a v-bind:data-pid='item.id' @click="chooseTime($event)" no="time">{{item.name}}</a>
                  </li>
                </ul>
              </div>
              <ul class="clearfix time_ranage">
                <li><a @click="chooseTime($event)" title="上旬" data-pid='01' no="time">上旬</a></li>
                <li><a @click="chooseTime($event)" title="中旬" data-pid='11' no="time">中旬</a></li>
                <li><a @click="chooseTime($event)" title="下旬" data-pid='21' no="time">下旬</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="address" v-if="data.lashingStatus == 1 || data.trailerStatus == 1">
          <ul>
            <li v-if="data.trailerStatus == 1">
              拖车地址: <input type="text" v-model="data.trailerAddress" v-bind:class="trailererror" @keyup="inputChange('trailererror')"/>
            </li>
            <li v-if="data.lashingStatus == 1">
              绑扎地址: <input type="text" v-model="data.lashingAddress" v-bind:class="lashingerror" @keyup="inputChange('lashingerror')"/>
            </li>
          </ul>
        </div>
      </div>
      <p v-if="error_Tip==true" class="text-center" v-bind:style="{color:'#ff0000','font-size':'12px','line-height':'15px','margin-bottom':'15px'}">
        您有必填项未填写，请完善！
      </p>
      <a class="offer" @click="offer()">立即获取报价</a>
    </div>
    <Instruction v-if="instructionview == 'Instruction'" :data="windowsize"></Instruction>
    <!-- <keep-alive>
      <component :is="instructionview" :data="windowsize"></component>
    </keep-alive> -->
    <div class="popup-overlay" v-if="marsk == true"></div>
  </div>
</template>
<script>
    let $self = ''
    import HeaderBar from './common/header.vue'
    import FooterView from './common/footer.vue'
    import Instruction from './common/instruction.vue'
    import $ from 'jquery'
    import Config from '../assets/js/index_config'
    import swal from 'sweetalert'
    import {
        loginHandle,
        errorRequestHandle
    } from '../assets/js/tools'
    export default {
        name: 'index',
        data() {
            return {
                a: '1',
                b: '0',
                instructionview: '',
                marsk: false,
                end_departure: '',
                placeholder: {},
                data: {
                    customBrokerStatus: '0', // 是否代理报关0否，1是
                    lashingAddress: '', // 上门绑扎地址
                    lashingStatus: '0', // 是否上门绑扎0否，1是
                    palletDatas: [],
                    podId: '', // 起运港
                    polId: '', // 目的地
                    shipmentTime: '', // 出运时间
                    trailerAddress: '', // 门点拖车地址
                    trailerStatus: '0', // 是否门点拖车0否，1是
                    warehouseLoadingStatus: '0' // 是否仓库装柜0否，1是
                },
                allPodWithRoute: [],
                start_departure: [],
                start_port: '请选择起运港',
                search_start: '',
                search_end: '',
                calendar: [],
                shipmentTime: '请选择时间',
                palletDatas: [],
                normal1: {
                    boxQuantity: '', // 箱量
                    boxType: '20GP', // 箱型
                    cabinetType: '1' // 柜类型 1普柜 2特种柜
                },
                normal2: {
                    boxQuantity: '', // 箱量
                    boxType: '40GP', // 箱型
                    cabinetType: '1' // 柜类型 1普柜 2特种柜
                },
                normal3: {
                    boxQuantity: '', // 箱量
                    boxType: '40HC', // 箱型
                    cabinetType: '1' // 柜类型 1普柜 2特种柜
                },
                RouteArea: [],
                area: [],
                area_item: [],
                boxType: [],
                typechoose: '',
                errortips: [{
                    boxType: '',
                    height: '',
                    heightUnit: '',
                    length: '',
                    lengthUnit: '',
                    width: '',
                    widthUnit: '',
                    weight: '',
                    weightUnit: ''
                }],
                errortime: '',
                error: {
                    pol: '',
                    pod: ''
                },
                timechoose: false,
                trailererror: '',
                lashingerror: '',
                pol_show: false,
                pod_show: false,
                pod_search: false,
                pod_result: [],
                placeholderSearchEnd: '请输入目的港',
                placeholderHeight: '装柜高度',
                placeholderWidth: '装柜宽度',
                placeholderLength: '装柜长度',
                placeholderWeight: '单柜货重',
                placeholderSize: '0',
                windowsize: {
                    width: '',
                    height: '',
                    username: ''
                },
                error_Tip: false
            }
        },
        created() {
            $self = this
            $self.pod_search = false
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth()
            $self.calendar = [{
                year: year,
                month: []
            }]
            let months = Config.months
            for (let i = month; i <= month + 2; i++) {
                if (months[i]) {
                    $self.calendar[0].month.push(months[i])
                }
            }
            if ($self.calendar[0].month.length < 3) {
                $self.calendar.push({
                    year: year + 1,
                    month: []
                })
                for (let i = 0; i < 3 - $self.calendar[0].month.length; i++) {
                    if (months[i]) {
                        $self.calendar[1].month.push(months[i])
                    }
                }
            }

            let inquiry = sessionStorage.getItem('inquiry')
            if (inquiry) {
                try {
                    inquiry = JSON.parse(inquiry)
                } catch (error) {
                    console.log('json error')
                }
                $self.getInquiry(inquiry.id)
                sessionStorage.removeItem('inquiry')
            } else {
                $self.palletDatas.push(Config.palletItem)
                $self.boxType.push(Config.boxTypeItem)
            }
            $self.getallPodWithRoute()
        },
        components: {
            'HeaderBar': HeaderBar,
            'FooterView': FooterView,
            'Instruction': Instruction
        },
        'methods': {
            'getInquiry': function(id) {
                $self.$http.post('/chugui-web/inquiry/findById', {
                    inquiryId: id
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'charset': 'utf-8'
                    },
                    emulateJSON: true
                }).then(loginHandle).then((res) => {
                    if (!res.ok) return
                    let inquiry = res.body.body
                    let errortip = {
                        boxType: '',
                        height: '',
                        heightUnit: '',
                        length: '',
                        lengthUnit: '',
                        width: '',
                        widthUnit: '',
                        weight: '',
                        weightUnit: ''
                    }
                    let date = new Date(inquiry.shipmentTime)
                    let Y = date.getFullYear()
                    let m = date.getMonth() + 1
                    let d = date.getDate()
                    $self.data = {
                        customBrokerStatus: inquiry.customBrokerStatus, // 是否代理报关0否，1是
                        lashingAddress: inquiry.lashingAddress, // 上门绑扎地址
                        lashingStatus: inquiry.lashingStatus, // 是否上门绑扎0否，1是
                        palletDatas: [],
                        podId: inquiry.pod.id, // 起运港
                        polId: inquiry.pol.id, // 目的地
                        shipmentTime: `${Y}-${m}-${d}`, // 出运时间
                        trailerAddress: inquiry.trailerAddress, // 门点拖车地址
                        trailerStatus: inquiry.trailerStatus, // 是否门点拖车0否，1是
                        warehouseLoadingStatus: inquiry.warehouseLoadingStatus // 是否仓库装柜0否，1是
                    }
                    if (d < 11) {
                        d = '上旬'
                    }
                    if (d >= 11 && d < 21) {
                        d = '中旬'
                    }
                    if (d >= 21) {
                        d = '下旬'
                    }
                    let t = `${Y}年${m}月${d}`
                    $self.start_port = `${inquiry.pol.portEn}(${inquiry.pol.portCn})`
                    $self.search_end = `${inquiry.pod.portEn}(${inquiry.pod.portCn})`
                    $self.placeholder['search_end'] = true
                    $self.shipmentTime = t
                    let localpalletDates = inquiry.palletDatas
                    for (let i = 0; i < localpalletDates.length; i++) {
                        delete localpalletDates[i].id
                        delete localpalletDates[i].inquiryId
                        if (localpalletDates[i].cabinetType === '2') {
                            switch (localpalletDates[i].boxType) {
                                case '20OT':
                                    $self.boxType.push({
                                        first: 'active',
                                        second: '',
                                        third: '',
                                        four: ''
                                    })
                                    break
                                case '40OT':
                                    $self.boxType.push({
                                        first: '',
                                        second: 'active',
                                        third: '',
                                        four: ''
                                    })
                                    break
                                case '20FR':
                                    $self.boxType.push({
                                        first: '',
                                        second: '',
                                        third: 'active',
                                        four: ''
                                    })
                                    break
                                case '40FR':
                                    $self.boxType.push({
                                        first: '',
                                        second: '',
                                        third: '',
                                        four: 'active'
                                    })
                                    break
                                default:
                                    $self.boxType.push({
                                        first: '',
                                        second: '',
                                        third: '',
                                        four: ''
                                    })
                                    break
                            }
                            $self.palletDatas.push(localpalletDates[i])
                            $self.errortips.push(errortip)
                            $self.placeholder['height' + i] = true
                            $self.placeholder['width' + i] = true
                            $self.placeholder['weight' + i] = true
                            $self.placeholder['length' + i] = true
                        }
                        if (localpalletDates[i].cabinetType === '1') {
                            let boxType = localpalletDates[i].boxType
                            switch (boxType) {
                                case '20GP':
                                    $self.normal1 = localpalletDates[i]
                                    $self.placeholder['normal1'] = true
                                    break
                                case '40GP':
                                    $self.normal2 = localpalletDates[i]
                                    $self.placeholder['normal2'] = true
                                    break
                                case '40HC':
                                    $self.normal3 = localpalletDates[i]
                                    $self.placeholder['normal3'] = true
                                    break
                                default:
                                    break
                            }
                        }
                    }
                }).catch(errorRequestHandle)
            },
            'placeholderFocus': function(type) {
                $self.$set($self.placeholder, type, true)
                setTimeout(function() {
                    if ($self.$refs[type].click) $self.$refs[type].click()
                    if ($self.$refs[type].focus) $self.$refs[type].focus()
                }, 200)
            },
            'placeholderBlur': function(type, e) {
                if (e.target.value == '') {
                    $self.$set($self.placeholder, type, false)
                }
            },
            'inputChange': function(type) {
                $self[type] = ''
                $self.checkError()
            },
            'checkError': function() {
                if ($self.errortime) return
                if ($self.error.pol) return
                if ($self.error.pod) return
                if ($self.trailererror) return
                if ($self.lashingerror) return
                for (let i = 0; i < $self.errortips.length; i++) {
                    let item = $self.errortips[i]
                    if (item.boxType) return
                    if (item.height) return
                    if (item.heightUnit) return
                    if (item.length) return
                    if (item.lengthUnit) return
                    if (item.width) return
                    if (item.widthUnit) return
                    if (item.weight) return
                    if (item.weightUnit) return
                }
                $self.error_Tip = false
            },
            'getallPodWithRoute': function() {
                if (localStorage.getItem('allPodWithRoute') === null) {
                    $self.$http.get('/chugui-web/baseData/allPodWithRoute', // 查询目的港与航线
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'charset': 'utf-8'
                            },
                            emulateJSON: true
                        }).then(loginHandle).then((response) => {
                        let json = response.body
                        if (json.success === true) {
                            // let RouteArea = []
                            // for (let i = 0; i < $self.allPodWithRoute.length; i++) {
                            //   if (i === 0) {
                            //     $self.RouteArea.push($self.allPodWithRoute[i])
                            //   } else {
                            //     let j = i - 1
                            //     if ($self.allPodWithRoute[i].routeName.length > $self.RouteArea[j].routeName.length) {
                            //       $self.RouteArea.unshift($self.allPodWithRoute[i])
                            //     } else {
                            //       $self.RouteArea.push($self.allPodWithRoute[i])
                            //     }
                            //   }
                            // }
                            // let tem1 = $self.RouteArea[1]
                            // let tem2 = $self.RouteArea[2]
                            // $self.RouteArea.splice(1, 1, tem2)
                            // $self.RouteArea.splice(2, 1, tem1)
                            $self.allPodWithRoute = json.body
                            $self.RouteArea = $self.allPodWithRoute
                            $self.area = $self.RouteArea[0].subRoutes
                            $self.area_item = $self.RouteArea[0].subRoutes[0].pods
                            localStorage.setItem('RouteArea', JSON.stringify($self.RouteArea))
                        }
                    }).catch(errorRequestHandle)
                } else {
                    // $self.allPodWithRoute = JSON.parse(localStorage.getItem('RouteArea'))
                    $self.RouteArea = JSON.parse(localStorage.getItem('RouteArea'))
                    $self.area = $self.RouteArea[0].subRoutes
                    $self.area_item = $self.RouteArea[0].subRoutes[0].pods
                }
            },
            'getSearchPod': function() {
                if ($self.search_end !== '') {
                    $self.pod_show = false
                    $self.pod_search = true
                    // $self.getallPodWithRoute()
                    $self.getpod($self.search_end)
                    return false
                } else {
                    $self.RouteArea = JSON.parse(localStorage.getItem('RouteArea'))
                    $self.area = $self.RouteArea[0].subRoutes
                    $self.area_item = $self.RouteArea[0].subRoutes[0].pods
                    $self.pod_show = true
                    $self.pod_search = false
                    return false
                }
            },
            'getpol': function(name) { //  查询起运港接口
                let params = {
                    name: name
                }
                $self.$http.post('/chugui-web/baseData/pol',
                    params, {
                        headers: {
                            Accept: 'application/json'
                        },
                        emulateJSON: true
                    }).then(loginHandle).then((res) => {
                    if (res.body.success === true) {
                        $self.start_departure = res.body.body
                    }
                }).catch(errorRequestHandle)
            },
            'getpod': function(name) { //  查询目的港接口
                let params = {
                    name: name.indexOf("(") >= 0 ? name.match(/(.*?)\(/)[1] : name
                }
                $self.$http.post('/chugui-web/baseData/pod',
                    params, {
                        headers: {
                            Accept: 'application/json'
                        },
                        emulateJSON: true
                    }).then(loginHandle).then((res) => {
                    if (res.body.success === true) {
                        $self.pod_result = []
                        $self.pod_result = res.body.body
                        if ($self.pod_result.length > 0) {
                            $self.pod_search = true
                        } else {
                            $self.pod_search = false
                        }
                    }
                }).catch(errorRequestHandle)
                return false
            },
            'showpol': function() {
                $self.error.pol = ''
                $('.Company_list').hide()
                $self.getpol('')
                $self.timechoose = false
                $self.pol_show = true
                $self.pod_show = false
                $self.pod_search = false
            },
            'showpod': function() {
                $self.timechoose = false
                $self.pol_show = false
                $self.error.pod = ''
                $self.placeholderSearchEnd = ''
                $('.Company_list').hide()
                if ($self.search_end !== '') {
                    $self.pod_show = false
                    $self.pod_search = true
                    $self.getpod($self.search_end)
                } else {
                    $self.pod_show = true
                    $self.pod_search = false
                    // $self.getallPodWithRoute()
                    $self.area = $self.RouteArea[0].subRoutes
                    $self.area_item = $self.area[0].pods
                }
            },
            'chooseBoxType': function(index, boxType, event) { // 选择柜型
                let $div = $(event.currentTarget)
                $div.addClass('active')
                $div.siblings().removeClass('active')
                $self.palletDatas[index].boxType = boxType
            },
            'BoxType': function(index, boxType, type) {
                if (index === 0) {
                    $self.typechoose = type
                }
                $self.palletDatas[index].boxType = boxType
                $self.boxType[index].first = ''
                $self.boxType[index].second = ''
                $self.boxType[index].third = ''
                $self.boxType[index].four = ''
                switch (type) {
                    case 'first':
                        $self.boxType[index].first = 'active'
                        break
                    case 'second':
                        $self.boxType[index].second = 'active'
                        break
                    case 'third':
                        $self.boxType[index].third = 'active'
                        break
                    case 'four':
                        $self.boxType[index].four = 'active'
                        break
                    default:
                        $self.boxType[index].first = 'active'
                        break
                }
                $self.errortips[index].boxType = ''
                $self.checkError()
            },
            'cabinetSizeChange': function(index, type, event) {
                if (event.target.value !== '' && event.target.value > 0) {
                    console.log(event.target.value)
                    $self.errortips[index][type] = ''
                }
            },
            'searchstart': function() { // 搜索起运港
                $self.getpol($self.search_start)
            },
            'searchend': function() {
                $self.getpod($self.search_end)
            },
            'addMatch': function() { // 增加配置
                let data = {
                    boxQuantity: '1', // 箱量
                    boxType: '', // 箱型
                    cabinetType: '2', // 柜类型 1普柜 2特种柜
                    height: '', // 装柜高度
                    heightUnit: '', // 装柜高度单位
                    length: '', // 装柜长度
                    lengthUnit: '', // 装柜长度单位
                    overrunMark: '', // 超限标识
                    weightPerOne: '', // 单柜货重
                    weightUnit: '', // 单柜货重单位
                    width: '', // 装柜宽度
                    widthUnit: '' // 装柜宽度单位
                }
                data.cabinetType = $self.palletDatas[0].cabinetType
                data.heightUnit = $self.palletDatas[0].heightUnit
                data.lengthUnit = $self.palletDatas[0].lengthUnit
                data.overrunMark = $self.palletDatas[0].overrunMark
                data.weightUnit = $self.palletDatas[0].weightUnit
                data.widthUnit = $self.palletDatas[0].widthUnit
                let json = {
                    'first': '',
                    'second': '',
                    'third': '',
                    'four': ''
                }
                let errortip = {
                    boxType: '',
                    boxQuantity: '',
                    height: '',
                    heightUnit: '',
                    length: '',
                    lengthUnit: '',
                    width: '',
                    widthUnit: '',
                    weight: '',
                    weightUnit: ''
                }
                $self.boxType.push(json)
                $self.palletDatas.push(data)
                $self.errortips.push(errortip)
            },
            'removeMatch': function(index) { // 减少配置
                $self.palletDatas.splice(index, 1)
                $self.boxType.splice(index, 1)
                $self.errortips.splice(index, 1)
            },
            'instruction': function() { // 显示配箱指导
                let windowHeight = document.documentElement.clientHeight
                let logintop = windowHeight - 466
                logintop = logintop / 2
                let windowWidth = document.documentElement.clientWidth
                let loginleft = windowWidth - 920
                loginleft = loginleft / 2
                let top = logintop
                let left = loginleft
                let username = localStorage.getItem('username')
                $self.windowsize = {
                    height: top,
                    width: left,
                    username: username
                }
                this.instructionview = 'Instruction'
                this.marsk = true
            },
            'showUnit': function(event) {
                let $div = $(event.currentTarget)
                $('.Company_list').hide()
                $div.find('.iconfont').removeClass('icon-sanjiaoxing')
                $div.find('.iconfont').addClass('icon-sanjiaoxing-copy-copy')
                $div.parent().find('.Company_list').show()
                $div.find('.iconfont').removeClass('icon-sanjiaoxing-copy-copy')
                $div.find('.iconfont').addClass('icon-sanjiaoxing')
                $('.Company').find('p').find('img').css('display', 'none')
                $div.find('img').show()
            },
            'hideUnit': function(event) {
                let $div = $(event.currentTarget)
                $('.Company_list').hide()
                $('.Company').find('.iconfont').removeClass('icon-sanjiaoxing-copy-copy')
                $('.Company').find('.iconfont').addClass('icon-sanjiaoxing')
                $div.find('.iconfont').removeClass('icon-sanjiaoxing')
                $div.find('.iconfont').addClass('icon-sanjiaoxing-copy-copy')
                $div.find('p').find('img').css('display', 'none')
            },
            'chooseYear': function(event, index) {
                let $div = $(event.currentTarget)
                $div.parent().addClass('active')
                $div.parent().siblings().removeClass('active')
                $('.months ul').removeClass('actived')
                $('.months ul').eq(index).addClass('actived')
                $('.months ul li a').removeClass('active')
                $self.sure_kalendar()
            },
            'chooseTime': function(event) {
                let $div = $(event.currentTarget)
                $div.addClass('active')
                $div.parent().siblings().find('a').removeClass('active')
                $self.sure_kalendar()
            },
            'sure_kalendar': function() {
                let year = $('.year_type .active a').text()
                let month = $('.months .actived .active').text()
                let range = $('.time_ranage .active').attr('title')
                if (range === undefined || month === '') {
                    return false
                }
                let date = $('.time_ranage .active').data('pid')
                let Cmonth = $('.months .actived .active').data('pid')
                $self.shipmentTime = year + '年' + month + range
                $self.data.shipmentTime = year + '-' + Cmonth + '-' + date
                $('.shipmentTime').addClass('active')
                $self.errortime = ''
                $self.timechoose = false
                $self.checkError()
            },
            'showcalendar': function() {
                $self.timechoose = true
            },
            'hidecalendar': function() {
                $self.timechoose = false
            },
            'chooseCompany': function(event, type, index) {
                let palletData = $self.palletDatas[index]
                let $div = $(event.currentTarget)
                $('.Company_list').hide()
                let unit = $div.text()
                $div.parent().hide()
                // $div.parent().parent().find('span').html(unit)
                $div.parent().parent().find('img').css('display', 'none')
                $div.parent().parent().find('.iconfont').removeClass('icon-sanjiaoxing')
                $div.parent().parent().find('.iconfont').addClass('icon-sanjiaoxing-copy-copy')
                if (type !== 'weightUnit' && palletData.heightUnit === '' && palletData.lengthUnit === '' && palletData.widthUnit === '') {
                    $self.palletDatas[index].heightUnit = unit
                    $self.palletDatas[index].lengthUnit = unit
                    $self.palletDatas[index].widthUnit = unit
                    $self.errortips[index].heightUnit = ''
                    $self.errortips[index].lengthUnit = ''
                    $self.errortips[index].widthUnit = ''
                }
                switch (type) {
                    case 'heightUnit':
                        palletData.heightUnit = unit
                        break
                    case 'lengthUnit':
                        palletData.lengthUnit = unit
                        break
                    case 'widthUnit':
                        palletData.widthUnit = unit
                        break
                    case 'weightUnit':
                        palletData.weightUnit = unit
                        $self.errortips[index].weightUnit = ''
                        break
                    default:
                        break
                }
                $self.$set($self.palletDatas, index, palletData)
                $self.checkError()
            },
            'chooseRoute': function(index, event) {
                let $div = $(event.currentTarget)
                $div.parent().addClass('actived')
                $div.parent().siblings().removeClass('actived')
                $self.area = $self.RouteArea[index].subRoutes
                $self.area_item = $self.area[0].pods
                $('.area_ditail .area li')[0].click()
            },
            'choosearea': function(index, event) {
                let $div = $(event.currentTarget)
                $div.addClass('actived')
                $div.siblings().removeClass('actived')
                $self.area_item = $self.area[index].pods
            },
            'choosepod': function(id, portEn, portCn, event) { // 选择起运港
                let $div = $(event.currentTarget)
                $div.addClass('active')
                $div.parent().siblings().find('a').removeClass('active')
                $self.$set($self.data, 'polId', id)
                $self.pol_show = false
                $self.start_port = portEn + '(' + portCn + ')'
            },
            'enditem': function(id, portEn, portCn) { // 选择目的港
                $self.end_departure = portEn + '(' + portCn + ')'
                $self.data.podId = id
                $self.pod_show = false
                $self.pod_search = false
            },
            'searchitem': function(id, portEn, portCn) {
                $self.end_departure = portEn + '(' + portCn + ')'
                $self.data.podId = id
                $self.pod_search = false
            },
            'offer': function() { // 获取报价
                $self.error_Tip = false
                $self.errortips = []
                let flag = true
                if ($self.data.podId === '') {
                    $self.error.pod = 'errors_pod'
                    flag = false
                }
                if ($self.data.polId === '') {
                    $self.error.pol = 'errors_pol'
                    flag = false
                }
                $self.data.palletDatas = []
                for (let i = 0; i < $self.palletDatas.length; i++) {
                    let error = {
                        boxType: '',
                        height: '',
                        length: '',
                        width: '',
                        weight: ''
                    }
                    if ($self.palletDatas[i].boxType === '') {
                        error.boxType = 'boxerrors'
                        flag = false
                    }
                    if ($self.palletDatas[i].boxQuantity === '' || $self.palletDatas[i].boxQuantity <= 0) {
                        error.boxQuantity = 'boxQuantityerrors'
                        flag = false
                    }
                    if ($self.palletDatas[i].height === '' || $self.palletDatas[i].height <= 0) {
                        error.height = 'errors'
                        flag = false
                    }
                    if ($self.palletDatas[i].heightUnit === '') {
                        error.heightUnit = 'errors'
                        flag = false
                    }
                    if ($self.palletDatas[i].length === '' || $self.palletDatas[i].length <= 0) {
                        error.length = 'errors'
                        flag = false
                    }
                    if ($self.palletDatas[i].lengthUnit === '') {
                        error.lengthUnit = 'errors'
                        flag = false
                    }
                    if ($self.palletDatas[i].width === '' || $self.palletDatas[i].width <= 0) {
                        error.width = 'errors'
                        flag = false
                    }
                    if ($self.palletDatas[i].widthUnit === '') {
                        error.widthUnit = 'errors'
                        flag = false
                    }
                    if ($self.palletDatas[i].weightPerOne === '' || $self.palletDatas[i].weightPerOne <= 0) {
                        error.weight = 'errors'
                        flag = false
                    }
                    if ($self.palletDatas[i].weightUnit === '') {
                        error.weightUnit = 'errors'
                        flag = false
                    }
                    $self.data.palletDatas.push($self.palletDatas[i])
                    $self.errortips.push(error)
                }
                if ($self.data.shipmentTime === '') {
                    $self.errortime = 'errortime'
                    flag = false
                }
                if ($self.data.shipmentTime !== '') {
                    $self.errortime = ''
                }
                if (Number($self.normal1.boxQuantity) !== 0) {
                    $self.data.palletDatas.push($self.normal1)
                }
                if (Number($self.normal2.boxQuantity) !== 0) {
                    $self.data.palletDatas.push($self.normal2)
                }
                if (Number($self.normal3.boxQuantity) !== 0) {
                    $self.data.palletDatas.push($self.normal3)
                }
                if ($self.data.trailerStatus === '1' && $self.data.trailerAddress === '') {
                    $self.trailererror = 'errors'
                    flag = false
                }
                if ($self.data.lashingStatus === '1' && $self.data.lashingAddress === '') {
                    $self.lashingerror = 'errors'
                    flag = false
                }
                if (flag === false) {
                    $self.error_Tip = true
                    return false
                } else {
                    $self.$http.post('/chugui-web/inquiry/doSubmit',
                        $self.data, {
                            headers: {
                                Accept: 'application/json'
                            }
                        }).then(loginHandle).then((res) => {
                        if (res.body.success === true) {
                            $self.$router.push('/offer_success')
                        }
                    }).catch(errorRequestHandle)
                }
            },
            'inputtab': function() {
                // $('input[type="text"]:first').focus()
                let $inp = $('input[type="text"]')
                $inp.bind('keydown', function(e) {
                    var key = e.which
                    if (key === 13) {
                        e.preventDefault()
                        let nxtIdx = $inp.index(this) + 1
                        $('input[type="text"]:eq(' + nxtIdx + ')').focus()
                    }
                })
            }
        },
        update() {
            $self.inputtab()
        },
        mounted() {
            $self.inputtab()
            document.getElementsByTagName('body')[0].addEventListener('click', function(event) {
                if (event.target.className === 'start_pol') {
                    return false
                }
                if (event.target.className === 'end_departure') {
                    return false
                }
                if (event.target.className === 'Company') {
                    return false
                }
                if (event.target.getAttribute('no') !== 'pol_item') {
                    $self.pol_show = false
                }
                if (event.target.getAttribute('no') !== 'pod_item') {
                    $self.placeholderSearchEnd = '请输入目的港'
                    $self.pod_show = false
                    $self.pod_search = false
                }
                if (event.target.getAttribute('no') !== 'unit') {
                    $('.Company_list').hide()
                    $('.Company').find('img').css('display', 'none')
                    $('.Company').find('.iconfont').removeClass('icon-sanjiaoxing')
                    $('.Company').find('.iconfont').addClass('icon-sanjiaoxing-copy-copy')
                }
                if (event.target.getAttribute('no') !== 'time') {
                    $self.timechoose = false
                }
            }, false)
        },
        watch: {
            'search_start': {
                handler: (val, oldVal) => {
                    if (val !== oldVal && val === '') {
                        $self.getpol('')
                    }
                },
                deep: true
            },
            'end_departure': {
                handler: (val, oldVal) => {
                    if (val) {
                        $self.search_end = val
                        $self.placeholder['search_end'] = true
                    }
                    $self.end_departure = ''
                },
                deep: true
            },
            'data.lashingStatus': {
                handler: (val, oldVal) => {
                    if (val !== oldVal && val === '1') {
                        if ($self.data.trailerStatus === '1' && !$self.data.lashingAddress) {
                            $self.data.lashingAddress = $self.data.trailerAddress
                        }
                    }
                }
            }
        }
    }
</script>
<style scoped>
    @import "../assets/css/icon.css";
    @import "../assets/css/index.css";
</style>
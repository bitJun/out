const configs = {
  months: [{
    id: '01',
    name: '1月'
  }, {
    id: '02',
    name: '2月'
  }, {
    id: '03',
    name: '3月'
  }, {
    id: '04',
    name: '4月'
  }, {
    id: '05',
    name: '5月'
  }, {
    id: '06',
    name: '6月'
  }, {
    id: '07',
    name: '7月'
  }, {
    id: '08',
    name: '8月'
  }, {
    id: '09',
    name: '9月'
  }, {
    id: '10',
    name: '10月'
  }, {
    id: '11',
    name: '11月'
  }, {
    id: '12',
    name: '12月'
  }],
  week: {
    '周一': 'MON',
    '周二': 'TUE',
    '周三': 'WED',
    '周四': 'THU',
    '周五': 'FRI',
    '周六': 'SAT',
    '周日': 'SUN'
  },
  monthEn: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  palletItem: {
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
  },
  boxTypeItem: {
    'first': '',
    'second': '',
    'third': '',
    'four': ''
  },
  changeText: {
    '订舱费': 'BOOKING FEE',
    '文件费': 'DOC',
    '设备管理费': 'SEAL',
    '安保费': 'ISPS',
    '操作费': 'HANDLING CHARGE',
    '拖车费': 'INLAND HAULAGE CHARGE',
    '装柜费': 'WAREHOUSE CHARGE',
    '绑扎费': 'LASHING CHARGE',
    '报关费': 'CUSTOM CLEARANCE CHARGE',
    '雨布费': 'TARPAULIN CHARGE',
    '提货费': 'PICKING UP CHARGE'
  }
}
export default configs
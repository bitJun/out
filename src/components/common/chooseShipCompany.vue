<template>
<div>
  <div class="login_dialog choose-ship-company" v-if="show">
    <div class="dialog">
      <img src="../../assets/images/icon_guanbi_1.png" class="close" @click="close()"/>
    </div>
    <div class="dialog-content">
      <select v-model="id">
        <option value="0">全部船公司</option>
        <option v-if="list" v-for="item in list" v-bind:value="item.id">{{item.shippingCompany.companyCn}}/{{item.shippingCompany.companyEn}}</option>
      </select>
      <a @click="download">下载报价单</a>
    </div>
  </div>
    <div v-if="show" class="popup-overlay" @click="close()"></div>
  </div>
</template>
<style>
.choose-ship-company {

}
.choose-ship-company .dialog-content {
  padding: 20px;
  text-align: center;
}
.choose-ship-company .dialog-content a {
  text-align: center;
  width: 110px;
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  background: #FF6600;
  display: block;
  margin: 0px auto;
  font-size: 16px;
}
.choose-ship-company .dialog-content select {
  margin-bottom: 30px;
  height: 40px;
  line-height: 40px;
  width: 250px;
}
</style>
<script>
  let $self = ''
  import $ from 'jquery'
  export default{
    data () {
      return {
        id: 0
      }
    },
    props: ['show', 'list', 'close', 'item'],
    created: function () {
      $self = this
    },
    'methods': {
      'download': function () {
        let params = {}
        if ($self.id) {
          params = {
            url: '/chugui-web/inquiry/download?shippingCompanyOfferId='+$self.id,
            data: {
              shippingCompanyOfferId: $self.id
            }
          }
        } else {
          params = {
            url: '/chugui-web/inquiry/downloadMultiple?inquiryId='+$self.item.id,
            data: {
              inquiryId: $self.item.id
            }
          }
        }
        $self.DownLoadFile(params)
        $self.id = 0
        $self.close()
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
      }
    }
  }
</script>
<style scoped="">
@import "../../assets/css/login.css";
</style>

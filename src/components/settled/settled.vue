<template>
  <div class="index">
    <div class="settled">
      <div class="Shipping">
        <h4 class="text-center">船公司入驻</h4>
        <p class="text-center">
          成为出柜么海运供应商 把船装满！<br/>
          <span>船公司入驻，发邮件至：Victor@91oog.com</span>
        </p>
      </div>
      <div class="get">
        <h4 class="text-center">入驻出柜么您将获得</h4>
        <ul class="list clearfix">
          <li class="list_item pull-left">
            <img src="../../assets/images/icon_1.png">
            <h5 class="text-center">口碑品牌，值得信赖</h5>
            <p class="text-center">
              与广大发货人信赖的特种柜品牌合作<br/>已有数百家客户选择了出柜么
            </p>
          </li>
          <li class="list_item pull-left">
            <img src="../../assets/images/icon_2.png">
            <h5 class="text-center">契约精神，准时结款</h5>
            <p class="text-center">
              难以置信的，我们真的做到了<br/>运费准时结款率100%
            </p>
          </li>
          <li class="list_item pull-left">
            <img src="../../assets/images/icon_3.png">
            <h5 class="text-center">舱位价值，在此实现</h5>
            <p class="text-center">
              不仅能接到合适自身优势的货物<br/>更能弥补淡季空置的舱位
            </p>
          </li>
        </ul>
      </div>
      <div class="how">
        <h4 class="text-center">如何使用好出柜么?</h4>
        <ul>
          <li class="clearfix">
            <img class="pull-left" src="../../assets/images/icon_4.png">
            <div class="content">
              <h5>明确自身航线优势</h5>
              <p>与甲壳虫商务团队充分沟通，他们会将您的航线优势描述整理成文，并注入出柜么系统中，有利于更加精准的向您推送目标询盘，从而提升成交率。</p>
            </div>
          </li>
          <li class="clearfix">
            <img class="pull-left" src="../../assets/images/icon_5.png">
            <div class="content">
              <h5>认真对待每个询盘</h5>
              <p>当获取了贵司的航线优势，我们会根据智能算法以及经过人工过滤，为您推送合适的询盘，看到询盘后，就马上报价吧！认真诚恳的报价，会让您的公司和服务在出柜么客户眼里更受欢迎。</p>
            </div>
          </li>
          <li class="clearfix">
            <img class="pull-left" src="../../assets/images/icon_6.png">
            <div class="content">
              <h5>信息准确至关重要</h5>
              <p>在您提供的报价中，我们希望除了报价外，能明确价格有效期、附加费用、舱位情况、箱源情况等具体信息，这些信息对于出柜么客户的订舱决策极为重要。</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="right_now">
        <h4 class="text-center">马上入驻“出柜么”，发邮件至：Victor@91oog.com</h4>
      </div>
    </div>
  </div>
</template>
<script>
  import HeaderBar from '../common/header.vue'
  import FooterView from '../common/footer.vue'
  export default {
    name: 'Settled',
    components: {
      'HeaderBar': HeaderBar,
      'FooterView': FooterView
    }
  }
</script>
<style scoped>
@import "../../assets/css/settled.css";
</style>

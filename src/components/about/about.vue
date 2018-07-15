<template>
  <div class="index">
    <div class="about_view">
      <div class="about_us">
        <h1>关于我们</h1>
        <p>
          出柜么[ChuGuiMe.com]是「上海甲壳虫供应链管理有限公司」旗下特种柜网站。<br/>
          出柜么直接与船公司在线对接，致力于为广大客户提供“价格好、报价快、够专业”的特种柜在线询价体验，<br/>
          并由甲壳虫公司承接配箱、订舱、装柜、绑扎、拖柜等出运服务。
        </p>
      </div>
      <div class="team">
        <h4>管理团队</h4>
        <p class="discribe">
          甲壳虫管理团队有近十年的特种柜、大件货操作经验, <br/>
          具备专业的配箱水平和绑扎能力，与船公司、仓库、车队、码头等上下游伙伴关系良好, <br/>
          能为客户设计最经济、最安全的运输方案，并提供专业而真诚的服务。
        </p>
        <center>
          <ul class="clearfix">
            <li class="pull-left">
              <img src="../../assets/images/img_tx_1.png">
              <p class="name">李斌 Victor</p>
              <p class="position">总经理 联合创始人</p>
            </li>
            <li class="pull-left">
              <img src="../../assets/images/img_tx_2.png">
              <p class="name">孙俊涛 Troy</p>
              <p class="position">项目总监 联合创始人</p>
            </li>
            <li class="pull-left">
              <img src="../../assets/images/img_tx_3.png">
              <p class="name">刘天俊 Jerry</p>
              <p class="position">港前总监 联合创始人</p>
            </li>
            <li class="pull-left">
              <img src="../../assets/images/img_tx_4.png">
              <p class="name">龚光鑫 Robin</p>
              <p class="position">营销总监 联合创始人</p>
            </li>
          </ul>
        </center>
      </div>
      <div class="values">
        <h4 class="text-center">价值观</h4>
        <p class="value text-center">甲壳虫的三个价值观对于我们如何经营业务、招揽人才、考核员工扮演着重要的角色：</p>
        <ul class="clearfix">
          <li class="values_item pull-left">
            <img src="../../assets/images/img_jzg_1.png"/>
            <p class="text-center">专心致志，滴水穿石</p>
          </li>
          <li class="values_item pull-left">
            <img src="../../assets/images/img_jzg_2.png"/>
            <p class="text-center">反思过往，精益求精</p>
          </li>
          <li class="values_item pull-left">
            <img src="../../assets/images/img_jzg_3.png"/>
            <p class="text-center">敬天爱人，利他之心</p>
          </li>
        </ul>
      </div>
      <div class="Brand">
        <h4 class="text-center">品牌理念</h4>
        <p class="text-center">珍惜品牌声誉，倾听每一位客户的声音，力争打造一个“有品质、有气质，受人喜欢、受人尊敬”的品牌。</p>
        <ul class="brand_list clearfix">
          <li class="brand_item pull-left">
            <img src="../../assets/images/img_ppln_1.png">
          </li>
          <li class="brand_item pull-left">
            <img src="../../assets/images/img_ppln_2.png">
          </li>
          <li class="brand_item pull-left">
            <div class="imgs clearfix">
              <img src="../../assets/images/img_ppln_3.png">
              <img src="../../assets/images/img_ppln_4.png">
              <img src="../../assets/images/img_ppln_5.png" v-bind:style="{'margin-top':'12px'}">
              <img src="../../assets/images/img_ppln_6.png" v-bind:style="{'margin-top':'12px'}">
            </div>
          </li>
        </ul>
      </div>
      <div class="Business">
        <h4>经营理念</h4>
        <p class="text-center">对客户负责，总归是对的！</p>
        <div class="idea">
          <ul class="idea_item">
            <li>
              <h5>我们不仅考核销售人员的业绩，还考核客户对销售人员的满意度！</h5>
              <p>我们十分关心每一位销售人员经验的积累和专业性的提升，通过业务培训、展会锻炼、现场学习等方式培养他们，因为专业性也是客户必不可少的关切点。</p>
            </li>
            <li>
              <h5>我们力求整合最佳服务资源，为客户降低成本而服务不打折！</h5>
              <p>我们始终把更多时间花在构建一个有实力有节操的供应商体系上，的确，这样的供应商组合，很多时候费用并不是市场上最低的，但我们始终坚信：客户是识货的！</p>
            </li>
            <li>
              <h5>如果我是客户，我希望得到什么样的服务？</h5>
              <p>从运输方案的设计，到货物到达收货人手中，在服务的各个环节上，我们常常追问自己：如果我是客户，我希望得到什么样的服务？如果你有不满意的地方，请一定要告诉我们！
                客户意见箱：<span>Service@91oog.com</span></p>
            </li>
          </ul>
          <img src="../../assets/images/img_jlln_1.png"/>
        </div>
      </div>
      <div class="commitment">
        <h4>100%服务承诺</h4>
        <ul class="service clearfix">
          <li v-for="item in service">
            <h5>{{item.title}}</h5>
            <p>{{item.content}}</p>
          </li>
        </ul>
      </div>
      <div class="show">
        <ul class="show_item clearfix">
          <li class="pull-left big">
            <img src="../../assets/images/img_zp_1.png" class="big"/>
          </li>
          <li class="pull-left small clearfix">
            <img src="../../assets/images/img_zp_2.png"/>
            <img src="../../assets/images/img_zp_3.png" v-bind:style="{'margin-left':'10px'}"/>
            <img src="../../assets/images/img_zp_4.png" v-bind:style="{'margin-top':'12px'}"/>
            <img src="../../assets/images/img_zp_5.png" v-bind:style="{'margin-left':'10px','margin-top':'12px'}"/>
          </li>
          <li class="pull-left big">
            <img src="../../assets/images/img_zp_6.png"/>
          </li>
        </ul>
      </div>
      <div class="join">
        <div class="join_us clearfix">
          <div class="address pull-left">
            <h4>我们的地址</h4>
            <p>上海甲壳虫供应链管理有限公司</p>
            <p>[客服中心] 上海市虹口区四川北路1688号福德大厦南楼1309</p>
            <p>[营销中心] 江苏省昆山市花桥经济开发区商务大道99号中信广场3号楼4F</p>
          </div>
          <div class="welcome pull-left">
            <h4>欢迎加入我们</h4>
            <p>我们乐意与对未知拥有极强探索欲、能快速接受并学习新事物、对感兴趣的事情能大胆尝试的人共<br/>
              事，我们相信一个简单、热情且善于沟通的人总是充满了无限能量和可能。</p>
            <p>操作、销售、市场等职位尚有空缺，简历投递至：HR@91oog.com</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  let service = [
    {
      title: '专业配箱：提供专业的配箱方案',
      content: '客户不需为纷繁复杂的货物配箱而烦恼，只需提供货物清单和货物照片，我们会给到客户一个既经济实惠又符合吊装、绑扎、运输规范的配箱方案。'
    },
    {
      title: '报价详实：报价信息详细准确',
      content: '我们深知客户所需要的不仅仅是一个运费数字，数字背后的船期、航程、挂靠码头以及本地费用、订舱要求等信息也同等重要，而这些信息我们都会以正式的报价单完整的提供给客户。'
    },
    {
      title: '到场监装：项目经理到场监装',
      content: '当客户不便亲自到工厂或仓库指导装箱的，可向我们申请委派专业的项目经理到现场监装，项目经理将会拍照或录制视频提供给客户。'
    },
    {
      title: '全程跟踪：专业客服全程跟踪',
      content: '对于放舱、开港、提箱、装柜、进港、放关、配船等操作环节，我们会安排专业客服时刻关注，并在可能出现问题的环节给予客户提示，以便做好应对策略，让客户省心、放心。'
    }
  ]
  import HeaderBar from '../common/header.vue'
  import FooterView from '../common/footer.vue'
  export default {
    name: 'About',
    components: {
      'HeaderBar': HeaderBar,
      'FooterView': FooterView
    },
    data () {
      return {
        service: service
      }
    }
  }
</script>
<style scoped>
@import "../../assets/css/about.css";
</style>

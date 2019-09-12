<!--
	辐射许可证副本第一页
-->
<template>
    <div class="fs-window License-window">
        <!--输入框-->
        <div class="block">
            <div class="name">
                <span>单位名称：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="unitName">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>单位地址：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="unitAddress">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>法定代表人：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="legalReprese">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>身份证号码：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="identityCardNumber">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>许可证号：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="certificateNo">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>许可证条件：</span>
            </div>
            <div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="licenceConditions">
                </div>
            </div>
        <div class="block">
        <div class="name">
            <span>发证日期：</span>
                </div>
            <div class="value">
				<i class="el-input__icon el-icon-date"></i>
                <input type="text" placeholder="--请选择--" class="myinput" :disabled="disabledFlag" v-model="issuingTime" readonly="readonly"  id="">
            </div>
        </div>
        <div class="block">
        </div>
        <div class="foot">
			<div class="btn_wrap">				
				<span class="btn_m btn_printing" @click="printing()">打印</span>
			</div>
        </div>

    </div>
</template>

<script>
// 引入子组件
export default {
  name: "app",
  props: ["id"],
  data() {
    return {
      addPerson: "",
      addTime: "",
      unitAddress: "",
      certificateNo: "",
      issuingOrgan: "",
      issuingTime: "",
      legalReprese: "",
      pkid: "",
      remarks: "",
      typeRange: "",
      unitName: "",
      validityPeriod: "",
      identityCardNumber: "",
      licenceConditions: "",
      operateNum: 999, //操作类型 0查看详情 1修改
      disabledFlag: false,
      burl:'',
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.searchDetial();
    });
  },
  methods: {
    //             fixedHeight(){
    //                 // 适应 内容高度
    //                 let fs_window = document.querySelector('.fs-window');
    //                 let myIframe = window.parent.document;
    //                 if(fs_window.offsetHeight <= 458){
    //                     window.frameElement.style.height = fs_window.offsetHeight + 'px';
    //                     myIframe.querySelector('.layui-layer-iframe').style.height = fs_window.offsetHeight + 42 + 'px';
    //                     myIframe.querySelector('.layui-layer-iframe').style.top = '50%';
    //                     myIframe.querySelector('.layui-layer-iframe').style.marginTop = -((fs_window.offsetHeight + 42)/2)+'px' ;
    //                 }
    //             },
    printing() {
      let _this = this;
      _this.pkids = _this.$route.params.id;
      _this.burl = "xkzfb2Word";
      window.top.layer.open({
        title: "打印预览",
        type: 2,
        area: ["80%", "100%"],
        maxmin: true,
        resize: false,
        // anim: [parseInt(6 * Math.random())],
        content: [
          "#/QueryRadiationLicPrintBase/" +
            _this.id +
            "/" +
            _this.pkids +
            "/" +
            _this.burl
        ],
        success: function(layero,index) {
          layero.find(".layui-layer-min").remove();
					window.top.layer.full(index)

        }
      });
    },
    cancle() {
      this.closeIframe();
    },
    closeIframe() {
      this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
      parent.layer.close(this.frameIndex); //再执行关闭
    },
    searchDetial() {
      // 操作 operateNum0详情 1修改
      // this.fixedHeight(); //适应高度
      let id = this.$route.params.id;
      let _this = this;
      if (id !== "save") {
        // 不是新增
        this.operateNum = JSON.parse(sessionStorage.getItem("operateNum")); // 操作类型 0详情 1修改
        id = id + "";
        if (this.operateNum === 0) {
          //0详情
          this.disabledFlag = true;
        } else {
          // 修改
          this.disabledFlag = false;
        }
        this.$http({
          method: "get",
          url: `${this.baseurl}unitInfo/xkzfb1ck/${id}`
        }).then(function(res) {
          if (res.status === 200) {
            let datas = res.data.data.list[0];
            _this.certificateNo = datas.FS_LICENSE_NO;
            _this.issuingOrgan = datas.CERTIFYING_AUTHORITY;
            _this.issuingTime = datas.OPENING_DATE.slice(0,10);
            _this.legalReprese = datas.LEGAL_PERSON;
            _this.identityCardNumber = datas.IDENTITY_CARD_NUMBER;
            _this.unitName = datas.UNIT_NAME;
            _this.licenceConditions = datas.LICENCE_CONDITIONS;
            _this.unitAddress = datas.UNIT_ADDRESS;
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.name {
  width: 90px;
}
</style>

<!--
	辐射许可证打印正本
-->
<template>
      <div class="fs-window License-window">
        <!--输入框-->
        <div class="block">
            <div class="name">
                <span>申请单位：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="unitName">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>申请地址：</span>
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
								<span>发证机关：</span>
						</div>
						<div class="value">
								<input type="text" class="myinput" :disabled="disabledFlag" v-model="certifyingAuthority">
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
      unitName: "",
      unitAddress: "",
      legalReprese: "",
      certificateNo: "",
      typeRange: "",
			certifyingAuthority:"",
      validityPeriod: "",
			identityCardNumber:"",
      issuingOrgan: "",
      openingDate: "",
      remarks: "",
      pkids: "",
      operateNum: 999, //操作类型 0查看详情 1修改
      disabledFlag: false,
      burl: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.searchDetial();
    });
  },
  methods: {
    printing() {
      let _this = this;
      _this.pkids = _this.$route.params.id;
      //导出word路由变量
      _this.burl = "dwjbqkWord";
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
      // this.$http({
      //     method:'get',
      //     url:'/api/bjsy-jdc/fs/unitInfo/exportxkz',
      //     responseType: 'blob'
      // }).then(res => {
      //     this.download(res);
      // });
    },
    download(data) {
      if (!data) return;
      const fileName = decodeURI(
        data.headers["content-disposition"].slice(
          data.headers["content-disposition"].indexOf("=") + 1
        )
      );
      if ("download" in document.createElement("a")) {
        // 非IE下载
        const link = document.createElement("a");
        link.download = fileName;
        link.style.display = "none";
        link.href = URL.createObjectURL(new Blob([data.data]));
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href); // 释放URL 对象
        document.body.removeChild(link);
      } else {
        // IE10+下载
        navigator.msSaveBlob(new Blob([data.data]), fileName);
      }
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
          url: `${this.baseurl}unitInfo/xkzzb/${id}`
        }).then(function(res) {
          if (res.status === 200) {
            let datas = res.data.data.list[0];
            _this.certificateNo = datas.FS_LICENSE_NO;
            _this.issuingOrgan = datas.CERTIFYING_AUTHORITY;
            _this.issuingTime = datas.OPENING_DATE;
            _this.legalReprese = datas.LEGAL_PERSON;
            _this.remarks = datas.remarks;
            _this.typeRange = datas.TYPE_RANGE;
            _this.unitName = datas.UNIT_NAME;
            _this.validityPeriod = datas.PERIOD_VALIDITY;
            _this.unitAddress = datas.UNIT_ADDRESS;
						_this.certifyingAuthority = datas.CERTIFYING_AUTHORITY;
						_this.identityCardNumber = datas.CERTIFYING_AUTHORITY
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

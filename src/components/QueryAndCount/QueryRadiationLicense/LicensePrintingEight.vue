<!--
	辐射许可证台账(射线装置)
-->
<template>
    <div class="fs-window License-window">
        <!--输入框-->
        <div class="block">
            <div class="name">
                <span>装置名称：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" :value="!currentData?'':currentData.DEVICE_NAME">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>规格型号：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" :value="!currentData?'':currentData.SPECIFICATION_MODEL">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>射线种类：</span>
            </div>
            <div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="!currentData?'':currentData.RADIAL_TYPE">

            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>类别：</span>
            </div>
            <div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="!currentData?'':currentData.CATEGORY">

            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>用途：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" :value="!currentData?'':currentData.PURPOSE">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>来源/去向：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" :value="!currentData?'':currentData.SOURCE_DIRECTION">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>记录人：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" :value="!currentData?'':currentData.RECORD_PERSON">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>记录日期：</span>
            </div>
            <div class="value">
                <i class="el-input__icon el-icon-date"></i>
                <input type="text" class="myinput" :disabled="disabledFlag" :value="!currentData?'':currentData.RECORD_DATE.slice(0,10)" readonly="readonly"
                    id="">
            </div>
        </div>
		<div class="block">
			<div class="name">
				<span>审核人：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" :value="!currentData?'':currentData.AUDITOR">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>审核日期：</span>
			</div>
			<div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="myinput" :disabled="disabledFlag" :value="!currentData?'':currentData.AUDIT_DATE.slice(0,10)" readonly="readonly"
					id="">
			</div>
		</div>
        <div class="foot">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size='1'
          @current-change="handleCurrentChange"
          :total="datas.length">
        </el-pagination>
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
  props:['id'],
  data() {
    return {
      deviceName: "",
      specificationModel: "",
      category: "",
      purpose: "",
      radialType: "",
      sourceDirection: "",
      recordPerson: "",
      recordDate: "",
      auditor: "",
      auditDate: "",
      remarks: "",
      operateNum: 999, //操作类型 0查看详情 1修改
      disabledFlag: false,
      page: 0,
      currentData: [],
      datas: [],
      burl:'',
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
      _this.burl  = 'xkzfbWord';
      window.top.layer.open({
        title: "打印预览",
        type: 2,
        area: ["80%", "100%"],
				// anim: [parseInt(6 * Math.random())],
        maxmin: true,
				resize :false,
        content: [
          "#/QueryRadiationLicPrintBase/" + _this.id + "/" + _this.pkids+'/'+_this.burl
        ],
				success: function (layero,index) {
                    layero.find('.layui-layer-min').remove()
					window.top.layer.full(index)
				},
      });
    },
    handleCurrentChange(val) {
      return (this.currentData = this.datas[val - 1]);
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
          url: `${this.baseurl}unitInfo/xkzfb7ck/${id}`
        }).then(function(res) {
          if (res.status === 200) {
            _this.datas = res.data.data.list;
            _this.currentData = _this.datas[_this.page];
            // _this.deviceName = datas.DEVICE_NAME;
            // _this.specificationModel = datas.SPECIFICATION_MODEL;
            // _this.category = datas.CATEGORY;
            // _this.purpose = datas.PURPOSE;
            // _this.radialType = datas.RADIAL_TYPE;
            // _this.sourceDirection = datas.SOURCE_DIRECTION;
            // _this.recordPerson = datas.RECORD_PERSON;
            // _this.recordDate = datas.RECORD_DATE;
            // _this.auditor = datas.AUDITOR;
            // _this.auditDate = datas.AUDIT_DATE;
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.name {
  width: 100px;
}
</style>

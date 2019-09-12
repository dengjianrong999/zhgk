<!--
	辐射许可证台账(非密封放射性物质)
-->
<template>
    <div class="fs-window License-window">
        <!--输入框-->
        <div class="block">
            <div class="name">
                <span>核素名称：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag"
                :value="!currentData?' ':currentData.NUCLIDE_NAME">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>出厂日期：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag"
                :value="!currentData?' ':currentData.PRODUCT_TIME.slice(0,10)">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>出厂活度(贝可)：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag"
                :value="!currentData?' ':currentData.FACTORY_MODERATION">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>用途：</span>
            </div>
            <div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag"
                :value="!currentData?' ':currentData.PURPOSE">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>来源/去向：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag"
                :value="!currentData?' ':currentData.SOURCE_DIRECTION">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>记录人：</span>
            </div>
            <div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="myinput" :disabled="disabledFlag"
                :value="!currentData?' ':currentData.RECORD_PERSON">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>记录日期：</span>
            </div>
            <div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" placeholder="--请选择有效期--" class="myinput" :disabled="disabledFlag"
                :value="!currentData?' ':currentData.RECORD_DATE.slice(0,10)" readonly="readonly" id="">
            </div>
        </div>
		<div class="block">
			<div class="name">
				<span>审核人：</span>
			</div>
			<div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" class="myinput" :disabled="disabledFlag"
                :value="!currentData?' ':currentData.AUDITOR">
			</div>
		</div>
        <div class="block">
            <div class="name">
                <span>审核日期：</span>
            </div>
            <div class="value">
				<i class="el-input__icon el-icon-date"></i>
                <input type="text" placeholder="--请选择发证时间--" class="myinput" :disabled="disabledFlag"
                :value="!currentData?' ':currentData.AUDIT_DATE.slice(0,10)" readonly="readonly" id="">
            </div>
        </div>
		<div class="block">
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
      nuclideName: "",
      productTime: "",
      factoryModeration: "",
      label: "",
      radiationsourceCode: "",
      sourceDirection: "",
      recordPerson: "",
      recordDate: "",
      auditor: "",
      auditDate: "",
      purpose: "",
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
      _this.burl  = 'xkzfb7Word';
      window.top.layer.open({
        title: "打印预览",
        type: 2,
        area: ["80%", "100%"],
        maxmin: true,
				resize :false,
				// anim: [parseInt(6 * Math.random())],
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
          url: `${this.baseurl}unitInfo/xkzfb6ck/${id}`
        }).then(function(res) {
          if (res.status === 200) {
            _this.datas = res.data.data.list;
            _this.currentData = _this.datas[_this.page];
            console.log(_this.datas);
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.name {
  width: 110px;
}
.block:nth-child(2n) .name {
  width: 80px;
}
</style>

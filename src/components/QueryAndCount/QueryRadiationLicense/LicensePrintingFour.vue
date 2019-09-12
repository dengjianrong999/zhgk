<!--
	辐射许可证第三页(非密封放射性物质)
-->
<template>
	<div class="fs-window License-window">
		<!--输入框-->
		<div class="block">
			<div class="name">
				<span>工作场所名称：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag"
				:value="!currentData?' ':currentData.WORKPLACE_NAME">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>工作场所地址：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag"
				:value="!currentData?' ':currentData.WORKPLACE_SITE">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>工作场所等级：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag"
				:value="!currentData?' ':currentData.WORKPLACE_GRADE">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>批准的日等效最大操作量：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag"
				:value="!currentData?' ':currentData.RATIFY_MAXIMUM_NUMBER">
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>活动种类：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag"
				:value="!currentData?' ':currentData.ACTIVITIES_TYPE">
			</div>
		</div>
		<div class="block">
		</div>
		<div class="foot">
			<el-pagination background layout="prev, pager, next" :page-size='1' @current-change="handleCurrentChange" :total="datas.length">
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
		props: ['id'],
		data() {
			return {
				workplaceName: "",
				workplaceSite: "",
				workplaceGrade: "",
				activitiesType: "",
				ratifyMaximumNumber: "",
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
				_this.burl  = 'xkzfb4Word';
				window.top.layer.open({
					title: "打印预览",
					type: 2,
					// anim: [parseInt(6 * Math.random())],
					area: ["80%", "100%"],
					maxmin: true,
					resize: false,
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
						url: `${this.baseurl}unitInfo/xkzfb3ck/${id}`
					}).then(function (res) {
						if (res.status === 200) {
							_this.datas = res.data.data.list;
							_this.currentData = _this.datas[_this.page];
// 							_this.workplaceName = datas.WORKPLACE_NAME;
// 							_this.workplaceSite = datas.WORKPLACE_SITE;
// 							_this.workplaceGrade = datas.WORKPLACE_GRADE;
// 							_this.activitiesType = datas.ACTIVITIES_TYPE;
// 							_this.ratifyMaximumNumber = datas.RATIFY_MAXIMUM_NUMBER;
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

	.block:nth-child(2n) .name {
		width: 160px;
	}
</style>

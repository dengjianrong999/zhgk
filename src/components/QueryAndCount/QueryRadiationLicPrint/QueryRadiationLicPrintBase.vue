<template>
	<div class="print-base">
		<div class="foot-t">
			<div class="input">
				<el-select v-model="selected" v-on:change='select()'>
					<el-option v-for="(item,index) in printData" :key='index' :label='item.name' :value="item.componentName">
						<!-- {{item.name}} -->
					</el-option>
				</el-select>
			</div>
			<div class="btn_wrap btn-print">
				<span class="btn_m btn_printing" @click="printpage('printpage')">打印</span>
				<span class="btn_m btn_printing" @click="Export()">单表导出</span>
				<span class="btn_m btn_printing" @click="ExportAll()">一键导出</span>
			</div>
		</div>
		<!-- <select name="" id="" v-model="selected" @change='select()'>
            <option v-for="(item,index) in printData" :value="item.componentName">{{item.name}}</option>
        </select> -->
		<component :is="componentName" :landscape="hiddenFlag"></component>

	</div>
</template>

<script>
	import QueryRadiationLicPrintOne from "./QueryRadiationLicPrintOne";
	import QueryRadiationLicPrintTwo from "./QueryRadiationLicPrintTwo";
	import QueryRadiationLicPrintThree from "./QueryRadiationLicPrintThree";
	import QueryRadiationLicPrintFour from "./QueryRadiationLicPrintFour";
	import QueryRadiationLicPrintFive from "./QueryRadiationLicPrintFive";
	import QueryRadiationLicPrintSix from "./QueryRadiationLicPrintSix";
	import QueryRadiationLicPrintSeven from "./QueryRadiationLicPrintSeven";
	import QueryRadiationLicPrintEight from "./QueryRadiationLicPrintEight";
	import QueryRadiationLicPrintHome from "./QueryRadiationLicPrintHome";
	import QueryRadiationLicPrintBasic from "./QueryRadiationLicPrintBasic";
	export default {
		data() {
			return {
				printId: "",
				selected: "",
				basur: '',
				hiddenFlag:{},
				componentName: "QueryRadiationLicPrintHome",
				printData: [{
						title: "0",
						name: "辐射许可证封面",
						componentName: "QueryRadiationLicPrintHome",

					},
					{
						title: "1",
						name: "辐射许可证单位基本情况",
						componentName: "QueryRadiationLicPrintBasic",

					},
					{
						title: "2",
						name: "辐射许可证打印正本",
						componentName: "QueryRadiationLicPrintOne",
					},
					{
						title: "3",
						name: "辐射许可证副本第一页",
						componentName: "QueryRadiationLicPrintTwo",

					},
					{
						title: "4",
						name: "辐射许可证第二页",
						componentName: "QueryRadiationLicPrintThree"
					},
					{
						title: "5",
						name: "辐射许可证第三页",
						componentName: "QueryRadiationLicPrintFour"
					},
					{
						title: "6",
						name: "辐射许可证第四页",
						componentName: "QueryRadiationLicPrintFive"
					},
					{
						title: "7",
						name: "台账辐射许可证",
						componentName: "QueryRadiationLicPrintSix"
					},
					{
						title: "8",
						name: "台账非密封放射性物质",
						componentName: "QueryRadiationLicPrintSeven"
					},
					{
						title: "9",
						name: "台账射线装置",
						componentName: "QueryRadiationLicPrintEight"
					},
				]
			};
		},
		mounted() {
			this.printId = this.$route.params.id; //序号
			this.componentName = this.printData[this.printId].componentName;
			this.selected = this.printData[this.printId].componentName;
			this.basur = this.$route.params.burl;
		},
		components: {
			QueryRadiationLicPrintOne,
			QueryRadiationLicPrintTwo,
			QueryRadiationLicPrintThree,
			QueryRadiationLicPrintFour,
			QueryRadiationLicPrintFive,
			QueryRadiationLicPrintSix,
			QueryRadiationLicPrintSeven,
			QueryRadiationLicPrintEight,
			QueryRadiationLicPrintHome,
			QueryRadiationLicPrintBasic,
		},
		methods: {
			printpage(myDiv) {
				// var newstr = document.getElementById(myDiv).innerHTML;
				// var oldstr = document.body.innerHTML;
				var topStr = document.querySelector('.print-base');
				var node = document.querySelector('.foot-t');
				topStr.removeChild(node);
				// document.body.innerHTML = newstr;
				this.$set(this.hiddenFlag,"hidden",true);
				setTimeout(() => {
					window.print();
					window.location.reload();	
					topStr.appendChild(node);
				}, 20);
				// document.body.innerHTML = oldstr;
				return false;
			},
			//单表导出
			Export() {
				var _this = this;
				var id = _this.$route.params.pkids;
				this.$http({
						method: "get",
						url: `${this.baseurl}unitInfo/${_this.basur}/${id}`,
						responseType: 'blob'
					})
					.then(function (res) {
						_this.deriveAll(res);
					})
					.catch(function (res) {
						console.log('err****', res)
					});
			},
			ExportAll() {
				var _this = this;
				var id = _this.$route.params.pkids;
				this.$http({
						method: "get",
						url: `${this.baseurl}unitInfo/oneKeyExportWord/${id}`,
						responseType: 'blob'
					})
					.then(function (res) {
						_this.deriveAll(res);
					})
					.catch(function (res) {
						console.log('err****', res)
					});
			},
			deriveAll(data) {
				if (!data) return;
				// const fileName = decodeURI(data.headers['content-disposition'].slice(data.headers['content-disposition'].indexOf(
				// 	'=') + 1));
				const fileName = '许可证.doc';
				if ('download' in document.createElement('a')) { // 非IE下载
					const link = document.createElement('a')
					link.download = fileName;
					link.style.display = 'none';
					link.href = URL.createObjectURL(new Blob([data.data]));
					document.body.appendChild(link);
					link.click();
					URL.revokeObjectURL(link.href); // 释放URL 对象
					document.body.removeChild(link);
				} else { // IE10+下载
					navigator.msSaveBlob(new Blob([data.data]), fileName)
				}
			},
			select() {
				let _this = this;
				this.componentName = this.selected;
				switch (this.componentName) {
					case 'QueryRadiationLicPrintBasic':
						_this.basur = 'dwjbqkWord';
						break;
					case 'QueryRadiationLicPrintHome':
						_this.basur = 'xkzsqbWord';
						break;
					case 'QueryRadiationLicPrintOne':
						_this.basur = 'xkzfbWord';
						break;
					case 'QueryRadiationLicPrintTwo':
						_this.basur = 'xkzfb1Word';
						break;
					case 'QueryRadiationLicPrintThree':
						_this.basur = 'xkzfb2Word';
						break;
					case 'QueryRadiationLicPrintFour':
						_this.basur = 'xkzfb3Word';
						break;
					case 'QueryRadiationLicPrintFive':
						_this.basur = 'xkzfb4Word';
						break;
					case 'QueryRadiationLicPrintSix':
						_this.basur = 'xkzfb5Word';
						break;
					case 'QueryRadiationLicPrintSeven':
						_this.basur = 'xkzfb6Word';
						break;
					case 'QueryRadiationLicPrintEight':
						_this.basur = 'xkzfb7Word';
						break;

				}
			}
		}
	};
</script>
<style scoped>
	.base-message {
		/* height: 100%; */
		padding: 20px 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.base-message p {
		width: 650px;
		text-indent: 3em;
		font-size: 14px;
		letter-spacing: 3px;
	}

	table {
		border-collapse: collapse;
		/*边框会合并为一个单一的边框*/
		width: 650px;
		border: 1px solid #333;
	}

	table tr td {
		height: 45px;
		text-align: center;
		border: 1px solid #000;
	}

	table tr td span {
		display: inline-block;
		width: 50px;
	}

	.left-text {
		text-align: left;
		padding-left: 5px;
	}

	.input {
		width: 200px;
		display: inline-block;
		margin-left: 20px;
		margin-right: 50px;
	}

	.foot-t {
		width: 100%;
		height: 80px;
		padding-top: 20px;
		text-align: left;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
	}
</style>

<template>
	<div id="printpage" class="print-portrait">
		<table :class='["table-printBasic",{"landscape":landscape.hidden}]'>
			<tr class="tr-one">
				<td colspan="8">辐射工作单位基本情况</td>
			</tr>
			<tr class="tr-none">
				<td width="100px"></td>
				<td width="60px"></td>
				<td width="180px"></td>
				<td width="60px"></td>
				<td width="50px"></td>
				<td width="65px"></td>
				<td width="80px"></td>
			</tr>
			<tr class="tr-two">
				<td colspan="2">申请单位名称</td>
				<td class="td-value" colspan="6">{{datas.UNIT_NAME}}</td>
			</tr>
			<tr class="tr-three">
				<td colspan="2">申请单位地址</td>
				<td class="td-value" colspan="4">{{datas.UNIT_ADDRESS}}</td>
				<td>邮编</td>
				<td class="td-value"></td>
			</tr>
			<tr  v-for="(item,index) in listS" :key='index' class="tr-four">
				<td rowspan="item.length()">工作场所</td>
				<td>名 称</td>
				<td class="td-value" >{{item.workplaceName}}</td>
				<td>地 址</td>
				<td class="td-value"  colspan="2">{{item.workplaceSite}}</td>
				<td>负责人</td>
				<td class="td-value" >{{item.responsible}}</td>
			</tr>	
			<tr class="tr-five">
				<td colspan="2">法定代表人</td>
				<td class="td-value">{{datas.LEGAL_PERSON}}</td>
				<td colspan="2">身份证号码</td>
				<td class="td-value" colspan="3">{{datas.IDENTITY_CARD_NUMBER}}</td>
			</tr>
			<tr class="tr-five">
				<td colspan="2">辐射安全与环境保护管理机构</td>
				<td class="td-value"></td>
				<td colspan="2">负责人</td>
				<td class="td-value" colspan="3">{{datas.responsible}}</td>
			</tr>
			<tr class="tr-five">
				<td colspan="2">联 系 人</td>
				<td class="td-value">{{datas.contacts}}</td>
				<td colspan="2">联系电话</td>
				<td class="td-value" colspan="3">{{datas.responsiblePhone}}</td>
			</tr>
			<tr class="tr-six">
				<td colspan="2">申请活动的种类和范围</td>
				<td class="td-value" colspan="6">{{datas.typeRange}}</td>
			</tr>
			<tr>
				<td colspan="8">
					<table class="table-table">
						<tr>
							<td>所附材料：（请在所提供材料前的□内打“√”）</td>
						</tr>
						<tr>
							<td>□1.企业法人营业执照或事业单位法人证正本复印件及法定代表人身份证复印件；</td>
						</tr>
						<tr>
							<td>□2.经审批的环境影响评价文件；</td>
						</tr>
						<tr>
							<td>□3.已有或拟有放射源和射线装置明细表；</td>
						</tr>
						<tr>
							<td>□4.满足《放射性同位素与射线装置安全许可管理办法》第十三条至第十六条相应规定</td>
						</tr>
						<tr>
							<td>的证明材料；</td>
						</tr>
						<tr>
							<td>□5.环境保护主管部门要求提供的其他资料：</td>
						</tr>
						<tr>
							<td><div></div></td>
						</tr>
						<tr>
							<td><div></div>。</td>
						</tr>
						<tr>
							<td>所附申报材料应按以上顺序排列，使用明显的标志区分，并装订成册。</td>
						</tr>
						<tr>
							<td style="text-indent: 2em;">法定代表人声明：本申请表所提供的全部资料均为真实信息。本人已熟悉《放射性</td>
						</tr>
						<tr>
							<td>同位素与射线装置安全和防护条例》（国务院令第449号）的要求，愿依法对本申请表的</td>
						</tr>
						<tr>
							<td>申请事项的安全和防护工作负责，并依法对其造成的放射性危害承担责任。</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
</template>
<style scoped>
	@media print {
		.table-printBasic {
			height: 100%;
		}
	}
	table.landscape td{
		border: none !important;
		visibility: hidden !important;
	}

	table.landscape td.td-value {
		visibility: visible !important;
	}


	.table-printBasic {
		width: 715px;
		height: 1040px;
		text-align: left;
		border: none;
		display: table-cell;
	}
	.table-printBasic tr td{
		height: 36px;
		line-height: 36px;
		border: 1px solid black;
		vertical-align: middle;
	}
	.print-portrait {
		width: 750px;
		margin: 80px auto;
		z-index: -999;
	}
	.tr-one td,
	.tr-none td{
		text-align: center;
		font: bold 30px 'simsun';
		border: none !important;
	}
	.tr-two td,
	.tr-three td,
	.tr-four td,
	.tr-five td,
	.tr-six td{
		font-size: 20px;
		font-family: 'simsun';
	}
	.tr-two td:nth-child(1),
	.tr-three td:nth-child(1),
	.tr-three td:nth-child(3),
	.tr-four td:nth-child(4),
	.tr-four td:nth-child(6),
	.tr-five td:nth-child(1),
	.tr-five td:nth-child(3),
	.tr-six td:nth-child(1){
		text-align: center;
	}
	.table-table{
		width: -moz-calc(100% - 20px);
		width: -webkit-calc(100% - 20px);
		width: calc(100% - 20px);
		height: -moz-calc(100% - 20px);
		height: -webkit-calc(100% - 20px);
		height: calc(100% - 20px);
		margin: 10px;
	}
	.table-table tr td{
		font: 18px 'simsun';
		border: none;
	}
	.table-table tr td div{
		width: 60%;
		height: 36px;
		display: inline-block;
		border-bottom: 1px solid;
	}
</style>
<script>
	export default {
		props:['landscape'],
		data() {
			return {
				datas: [],
				listS: [],
				Year: "",
				mounth: "",
				data: "",
				Year2: "",
				mounth2: "",
				data2: "",
				Index: '',
			};
		},
		mounted() {
			this.getdata();
		},
		methods: {
			getdata() {
				var _this = this;
				var id = _this.$route.params.pkids;
				this.$http({
						method: "get",
						url: `${this.baseurl}unitInfo/xkzfb1dy/${id}`,

						// url: `${this.baseurl}unitInfo/xkzzb/${id}`,
					})
					.then(function (res) {
						if (res.data.status == 1) {

							_this.datas = res.data.data.maplist.dw[0];
							_this.listS = res.data.data.maplist.gzcs[0];
							//发证日期
							_this.Year = _this.datas.OPENING_DATE.slice(0, 4);
							_this.mounth = _this.datas.OPENING_DATE.slice(5, 7);
							_this.data = _this.datas.OPENING_DATE.slice(8, 10);
							//有效期
							_this.Year2 = _this.datas.PERIOD_VALIDITY.slice(0, 4);
							_this.mounth2 = _this.datas.PERIOD_VALIDITY.slice(5, 7);
							_this.data2 = _this.datas.PERIOD_VALIDITY.slice(8, 10);
							_this.unitName = datas.UNIT_NAME;
							_this.unitAddress = datas.UNIT_ADDRESS;
						}
					})
					.catch(function (res) {});
			}
		}
	};
</script>

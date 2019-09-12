<template>
	<div class="print-portrait" id="printpage">
		<table class="table-printOne">
			<tr>
				<td colspan="2" class="td-fj">附件一：</td>
			</tr>
			<tr class="tr-two">
				<td class="td-two">
					<img src="../../../assets/images/ZHB.png" ondragstart='return false;'>
				</td>
				<td>
					<table class="table-table">
						<tr>
							<td colspan="2"></td>
						</tr>
						<tr>
							<td>受理编号：</td>
							<td></td>
						</tr>
						<tr>
							<td colspan="2"></td>
						</tr>
						<tr>
							<td>受理日期：</td>
							<td>{{Year}} 年 {{mounth}} 月 {{data}} 日</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td colspan="2"></td>
			</tr>
			<tr class="tr-three">
				<td colspan="2">辐射安全许可证</td>
			</tr>
			<tr class="tr-four">
				<td colspan="2"> 申请表</td>
			</tr>
			<tr class="tr-five">
				<td colspan="2">
					<span>申请文号：</span>
					<span></span>
				</td>
			</tr>
			<tr class="tr-six">
				<td colspan="2">
					<span>申请单位</span>
					<div>
						{{datas.UNIT_NAME}}
						<span>（盖章）</span>
					</div>
				</td>
			</tr>
			<tr class="tr-seven">
				<td colspan="2">
					<span>申请日期</span>
					<div>{{Year}} 年 {{mounth}} 月 {{data}} 日</div>
				</td>
			</tr>
			<tr class="tr-eight">
				<td colspan="2">环境保护部制</td>
			</tr>
		</table>
	</div>
</template>
<style scoped>
	@media print {
		.table-printOne {
			height: 100%;
		}
	}
	/*一 */

	.print-portrait {
		width: 750px;
		margin: 80px auto;
		z-index: -999;
	}

	.table-printOne {
		width: 750px;
		height: 1040px;
		text-align: left;
		border: none;
	}

	.td-fj {
		font: bold 20px "microsoft yahei";
		color: #333;
	}

	.table-printOne>tr>td:nth-child(1) {
		width: 181px;
		box-sizing: border-box;
	}

	.tr-two>td {
		height: 160px;
	}

	.td-two img {
		display: inline-block;
		float: left;
		padding-left: 20px;
		height: 160px;
	}

	.table-table {
		float: right;
		width: 400px;
		height: 160px;
		text-align: center;
		border: 1px solid black;
		margin-right: 20px;
	}

	.table-table,
	.table-table>tr,
	.table-table>tr>td {
		font: bold 24px "SimSun";
	}

	.table-table>tr>td:nth-child(1) {
		width: 130px;
		box-sizing: border-box;
	}

	.table-table>tr>td:nth-child(2) {
		width: 270px;
		padding-right: 10px;
	}

	.tr-three,
	.tr-three td {
		height: 80px;
		font: bold 48px "SimSun";
		text-align: center;
	}

	.tr-four,
	.tr-four td {
		height: 80px;
		letter-spacing: 30px;
		font: bold 48px "SimSun";
		text-align: center;
	}

	.tr-four td:after {
		content: '';
		margin-left: -30px;
	}

	.tr-five td {
		height: 200px;
	}

	.tr-five td span {
		float: left;
		display: inline-block;
		font: bold 24px "SimSun";
	}

	.tr-five td span:nth-child(1) {
		width: 45%;
		text-align: right;
	}

	.tr-five td span:nth-child(2) {
		width: 55%;
	}

	.tr-six td,
	.tr-seven td {
		height: 80px;
	}

	.tr-six td>span,
	.tr-seven td>span,
	.tr-six td>div,
	.tr-seven td>div {
		float: left;
	}

	.tr-six td>span,
	.tr-seven td>span {
		display: inline-block;
		width: 160px;
		font: bold 24px "SimSun";
		text-align: right;
	}

	.tr-six td>div>span {
		float: right;
	}

	.tr-six td>div,
	.tr-seven td>div {
		width: 500px;
		margin: 0 20px;
		text-indent: 20px;
		height: 30px;
		font: bold 24px "SimSun";
		border-bottom: 1px solid black;
	}

	.tr-eight td {
		text-align: center;
		font: bold 24px "SimSun";
	}
</style>
<script>
	export default {
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
			printpage(myDiv) {
				var newstr = document.getElementById(myDiv).innerHTML;
				var oldstr = document.body.innerHTML;
				document.body.innerHTML = newstr;
				window.print();
				document.body.innerHTML = oldstr;
				return false;
			},
			getdata() {
				var _this = this;
				var id = _this.$route.params.pkids;
				this.$http({
						method: "get",
						url: `${this.baseurl}unitInfo/xkzfb1dy/${id}`,
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
						}
					})
					.catch(function (res) {});
			}
		}
	};
</script>

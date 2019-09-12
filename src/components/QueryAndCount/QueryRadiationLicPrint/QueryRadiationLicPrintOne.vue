<template>
	<div class="print-portrait" id="printpage">
		<table :class='["table-printOne",{"landscape":landscape.hidden}]'> 
			<thead>
				<tr>
					<td colspan="4">
						<div class="title-one">辐射安全许可证</div>
					</td>
				</tr>
			</thead>
			<tr>
				<td colspan="4">
					<div class="text-content-one" style="text-indent: 2em;">根据《中华人民共和国放射性污染防治法》和《放射</div>
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<div class="text-content-one">性同位素与射线装置安全和防护条例》等法律法规的规定</div>
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<div class="text-content-one">经审查准予在许可种类和范围内从事活动。</div>
				</td>
			</tr>
			<tr>
				<td colspan="4" class="nonesss"></td>
			</tr>
			<tr>
				<td class="text-title">
					<div class="text-title-div">单位名称：</div>
				</td>
				<td colspan="3" class="text-p">{{datas.UNIT_NAME}}</td>
			</tr>
			<tr>
				<td class="text-title">
					<div class="text-title-div">地&nbsp;&nbsp;址：</div>
				</td>
				<td colspan="3" class="text-p">{{datas.UNIT_ADDRESS}} </td>
			</tr>
			<tr>
				<td class="text-title">
					<div class="text-title-div">法定代表人：</div>
				</td>
				<td colspan="3" class="text-p">{{datas.LEGAL_PERSON}}</td>
			</tr>
			<tr>
				<td class="text-title">
					<div class="text-title-div">证书编号：</div>
				</td>
				<td colspan="3" class="text-p">{{datas.FS_LICENSE_NO}}</td>
			</tr>
			<tr>
				<td colspan="4" class="nonesss"></td>
			</tr>
			<tr>
				<td class="text-title">
					<div class="text-title-div">有效期：</div>
				</td>
				<td class="text-td" colspan="3">
					至 <span class="span-value">{{Year}}</span> 年 <span class="span-value">{{mounth}}</span> 月 <span class="span-value">{{data}}</span> 日
				</td>
			</tr>
			<tr>
				<td class="text-title">
					<div class="text-title-div">发证机关：</div>
				</td>
				<td colspan="3" class="text-p">{{datas.CERTIFYING_AUTHORITY}}</td>
			</tr>
			<tr>
				<td>
					<div class="text-title-div">发证日期：</div>
				</td>
				<td class="td-value"></td>
				<td colspan="2">
					<div class="text-p-div" style='margin-left: -30px !important;'><span class="span-value">{{Year2}}</span> 年 <span class="span-value">{{mounth2}}</span> 月 <span class="span-value">{{data2}}</span> 日</div>
				</td>
			</tr>
			<tr>
				<td colspan="4" class="nonesss"></td>
			</tr>
		</table>
		<div class="foot-table">环境保护部制</div>

	</div>
</template>
<style scoped>
	@media print {
		.table-printOne{
			height: 1000000px;
		}
	}
	
	table.landscape td{
		border: none !important;
		visibility: hidden !important;
	}

	table.landscape td.text-p, td .span-value,td.td-value{
		visibility: visible !important;
	}
	.table-printOne.landscape{
		border: none !important;
	}
	table.landscape + .foot-table{
		visibility: hidden;
	}
	
</style>
<script>
	export default {
		props:['landscape'],
		data() {
			return {
				datas: [],
				Year: "",
				mounth: "",
				data: "",
				Year2: "",
				mounth2: "",
				data2: ""
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
						url: `${this.baseurl}unitInfo/xkzzb/${id}`
					})
					.then(function (res) {
						if (res.status === 200) {
							_this.datas = res.data.data.list[0];
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

<template>
	<div class="print-portrait" id="printpage">
		<table class="table-printOne">
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
				<td colspan="4"></td>
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
				<td colspan="4"></td>
			</tr>
			<tr>
				<td class="text-title">
					<div class="text-title-div">有效期：</div>
				</td>
				<td class="text-p" colspan="3">
					至 {{Year}} 年 {{mounth}} 月 {{data}} 日
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
				<td></td>
				<td colspan="2">
					<div class="text-p-div">{{Year2}} 年 {{mounth2}} 月 {{data2}} 日</div>
				</td>
			</tr>
			<tr>
				<td colspan="4"></td>
			</tr>
		</table>
		<div class="foot-table">环境保护部制</div>

	</div>
</template>
<style scoped>
	@page {
		size: A4 portrait;
	}
</style>
<script>
	export default {
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
				console.log('www', id)
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

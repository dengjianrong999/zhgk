<template>
	<div id="printpage" class="print-landscape">
		<table :class='["table-printSSE",{"landscape":landscape.hidden}]'>
			<thead>
				<tr>
					<td colspan="12" class="Positive-head">台&nbsp;&nbsp;账&nbsp;&nbsp;明&nbsp;&nbsp;细&nbsp;&nbsp;登&nbsp;&nbsp;记</td>
				</tr>
				<tr>
					<td colspan="12" class="Vice-head">（一）放射源</td>
				</tr>
				<tr>
					<td width="45px">序号</td>
					<td width="80px">核素名称</td>
					<td width="100px">出厂日期</td>
					<td width="80px">出厂活度<br>（贝可）</td>
					<td width="80px">标号</td>
					<td width="100px">编码</td>
					<td>来源/去向</td>
					<td width="80px">记录人</td>
					<td width="100px">记录日期</td>
					<td width="80px">审核人</td>
					<td width="100px">审核日期</td>
				</tr>
			</thead>
			<template v-if="datas.length != 0">
				<tbody v-for="(item,index) in datas" :key='index'>
					<tr>
						<td class="td-value" rowspan="2">{{index+1}}</td>
						<td class="td-value" rowspan="2">{{item.NUCLIDE_NAME}}</td>
						<td class="td-value" rowspan="2">{{item.PRODUCT_TIME|time}}</td>
						<td class="td-value" rowspan="2">{{item.FACTORY_MODERATION}}</td>
						<td class="td-value" rowspan="2">{{item.RADIATIONSOURCE_CODE}}</td>
						<td class="td-value" rowspan="2">{{item.LABEL}}</td>
						<td class="td-value">{{item.SOURCE_DIRECTION}}</td>
						<td class="td-value">{{item.RECORD_PERSON}}</td>
						<td class="td-value">{{item.RECORD_DATE| time}}</td>
						<td class="td-value">{{item.AUDITOR}}</td>
						<td class="td-value">{{item.AUDIT_DATE | time}}</td>
					</tr>
				</tbody>
			</template>
			<template v-else>
				<tbody v-for="(item,index) in 3" :key='index'>
					<tr>
						<td class="td-value" rowspan="2">{{index+1}}</td>
						<td class="td-value" rowspan="2"></td>
						<td class="td-value" rowspan="2"></td>
						<td class="td-value" rowspan="2"></td>
						<td class="td-value" rowspan="2"></td>
						<td class="td-value" rowspan="2"></td>
						<td class="td-value" colspan="2"></td>
						<td class="td-value"></td>
						<td class="td-value"></td>
						<td class="td-value"></td>
						<td class="td-value"></td>
					</tr>
				</tbody>
			</template>
		</table>
	</div>
</template>
<style scoped>
	/* 默认A4横屏打印 */
    	/* @page  {
		size: A4 landscape;
	} */
table.landscape td{
		border: none !important;
		visibility: hidden !important;
	}

	table.landscape td.td-value, div.td-value{
		visibility: visible !important;
	}
</style>
<script>
	export default {
		props:['landscape'],
		data() {
			return {
				datas: [],
				source: '',
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
						url: `${this.baseurl}unitInfo/xkzfb5ck/${id}`,
					})
					.then(function (res) {
						if (res.data.status == 1) {
							_this.datas = res.data.data.list;
						}
					})
					.catch(function (res) {});
			}
		}
	};
</script>

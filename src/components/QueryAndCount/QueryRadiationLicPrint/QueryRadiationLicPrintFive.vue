<template>
	<div id="printpage" class="print-portrait">
		<table :class='["table-printTFF",{"landscape":landscape.hidden}]'>
			<thead>
				<tr>
					<td colspan="5" class="Positive-head">活&nbsp;动&nbsp;种&nbsp;类&nbsp;和&nbsp;范&nbsp;围</td>
				</tr>
				<tr>
					<td colspan="5" class="Vice-head">（三）射线装置</td>
				</tr>
			</thead>
			<tbody v-for="(item,index) in datalists" :key="index">
				<tr>
					<td colspan="5" class="Workplace-text">
						工作场所名称:
						<div class="td-value">{{item.ncdz.WORKPLACE_NAME}}</div>
					</td>
				</tr>
				<tr>
					<td colspan="5" class="Workplace-text">
						工作场所地址:
						<div class="td-value">{{item.ncdz.WORKPLACE_SITE}}</div>
					</td>
				</tr>
				<tr class="straight-matter">
					<td>序号</td>
					<td>射线装置名称</td>
					<td>射线装置类别</td>
					<td>射线装置数量</td>
					<td>活动种类</td>
				</tr>
				<template v-if="item.fsyxx.length != 0">
					<tr class="straight-matter" v-for="(ite,inde) in  item.fsyxx" :key='inde'>
						<td class="td-value">{{inde+1}}</td>
						<td class="td-value">{{ite.DEVICE_NAME}}</td>
						<td class="td-value">{{ite.CATEGORY}}</td>
						<td class="td-value">{{ite.DEVICE_NUMBER}}</td>
						<td class="td-value">{{ite.ACTIVITIES_TYPE}}</td>
					</tr>
				</template>
				<template v-else>
					<tr class="straight-matter" v-for="(ite,inde) in  3" :key='inde'>
						<td class="td-value">{{inde+1}}</td>
						<td class="td-value"></td>
						<td class="td-value"></td>
						<td class="td-value"></td>
						<td class="td-value"></td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>


</template>
<style scoped>
.Workplace-text div{
		margin-bottom: 0 !important;
	}
	table tbody tr:nth-child(2) td{
		box-sizing: content-box;
		padding-bottom: 10px;
	}

	table.landscape td{
		border: none !important;
		visibility: hidden !important;
	}

	table.landscape td.td-value,table.landscape div.td-value{
		visibility: visible !important;
		border-bottom: 0 !important;
	}
</style>
<script>
	export default {
		props:['landscape'],
		data() {
			return {
				datalists: [],
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
						url: `${this.baseurl}unitInfo/xkzfb4dy/${id}`,
					})
					.then(function (res) {
						if (res.data.status == 1) {
							if(!res.data.data.listobject){
								_this.datalists = [
									{
										'ncdz':{
											'WORKPLACE_NAME':'',
											'WORKPLACE_SITE':'',
										},
										'fsyxx':[]
									}
								];
								return;
							}
							_this.datalists = res.data.data.listobject;
						}
					})
					.catch(function (res) {});
			}
		}
	};
</script>

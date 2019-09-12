<template>
   <div id="printpage" class="print-portrait">
   		<table :class='["table-printTwo",{"landscape":landscape.hidden}]'>
   			<tr>
   				<td colspan="4" class="text-content-two" style="text-indent: 2em;">根据《中华人民共和国放射性污染防治法》和《放射性同位素</td>
   			</tr>
   			<tr>
   				<td colspan="4" class="text-content-two">与射线装置安全和防护条例》等法律法规的规定，经审查准予在许</td>
   			</tr>
   			<tr>
   				<td colspan="4" class="text-content-two">可种类和范围内从事活动。</td>
   			</tr>
   			<tr>
   				<td width="225px">单位名称</td>
   				<td class="td-value" colspan='3' width="525px">{{datas.UNIT_NAME}}</td>
   			</tr>
   			<tr>
   				<td>地&nbsp; &nbsp; &nbsp;址</td>
   				<td class="td-value" colspan='3'>{{datas.UNIT_ADDRESS}}</td>
   			</tr>
   			<tr>
   				<td>法定代表人</td>
   				<td class="td-value" colspan='3'>{{datas.LEGAL_PERSON}}</td>
   			</tr>
   			<tr>
   				<td>身份证号码</td>
   				<td class="td-value" colspan='3'>{{datas.IDENTITY_CARD_NUMBER}}</td>
   			</tr>
   			<tr>
   				<td>联系电话</td>
   				<td class="td-value" colspan='3'>{{datas.LEGAL_PER_PHONE}}</td>
   			</tr>
   			<tr>
   				<td :rowspan='listS.length+1 == 1?4:listS.length'>工作场所</td>
   				<td>名 称</td>
   				<td style='width:80px'>地 址</td>
   				<td>负责人</td>
   			</tr>
   			<template v-if="listS.length != 0">
					<tr v-for="(item,index) in listS" :key='index'>
						<td class="td-value">{{item.workplaceName}}</td>
						<td class="td-value">{{item.unitName}}</td>
						<td class="td-value">{{item.workplaceSite}}</td>
						<td class="td-value">{{item.responsible}}</td>
					</tr>
				</template>
				<template v-else>
					<tr v-for="(item,index) in 3" :key='index'>
						<td class="td-value"></td>
						<td class="td-value"></td>
						<td class="td-value"></td>
						<td class="td-value"></td>
					</tr>
				</template>
   			<tr>
   				<td>证书编号</td>
   				<td class="td-value" colspan='3'>{{datas.FS_LICENSE_NO}}</td>
   			</tr>
   			<tr>
   				<td style="height: 150px">许可证条件</td>
   				<td class="td-value" colspan='3' style="height: 150px">{{datas.LICENCE_CONDITIONS}}</td>
   			</tr>
   			<tr>
   				<td>发证日期</td>
   				<td colspan='3'>
   					<span class="span-value">{{Year}}</span>年
   					<span class="span-value">{{mounth}}</span>月
   					<span class="span-value">{{data}}</span>日（发证机关章）</td>
   			</tr>
   			<tr>
   				<td>有效期</td>
   				<td colspan='3' class="left-text"> 至
   					<span class="span-value">{{Year2}}</span>年
   					<span class="span-value">{{mounth2}}</span>月
   					<span class="span-value">{{data2}}</span>日</td>
   			</tr>
   
   		</table>
   	</div>
</template>
<style scoped>
	table.landscape td{
		border: none !important;
		visibility: hidden !important;
	}

	table.landscape td.td-value,td .span-value {
		visibility: visible !important;
	}

</style>
<script>
export default {
	props:['landscape'],
  data() {
    return {
      datas: [],
      listS:[],
      Year: "",
      mounth: "",
      data: "",
      Year2: "",
      mounth2: "",
      data2: "",
      Index:'',
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
      })
        .then(function(res) {
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
        .catch(function(res) {});
    }
  }
};
</script>


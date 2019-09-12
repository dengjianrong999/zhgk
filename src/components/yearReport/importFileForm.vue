<template>
   <div class=" animated fadeIn " id="frame">
		<div class="col-xs-12 ">
			<form id="fileForm" action="" method="post" enctype="multipart/form-data">
				<table class="table table-bordered" style="font-size: 15px;width: 90%;margin-top: 40px;">
					<tr>
					<!-- 	<td style="text-align:right">
							请选择污染源
						</td>
						<td>
							<select id="pollutiontype" name="pollutiontype" class="form-control" style="width: 200px; ">
								<option value="">**请选择**</option>
								<option value="1">工业源</option>
								<option value="2">扬尘源</option>
								<option value="3">移动源</option>
								<option value="4">餐饮源</option>
							</select>
						</td> -->
						<td colspan="5">
							<input type="file" id="file" name="file" class="btn">
							<input type="button" @click="uploadExecl()" value="导入" class="btn btn-primary"
							style="height:32px;width:105px;border-radius:32px;
							background-color: #008FCE;border-color: #008FCE;color: #FFFFFF;outline:none">
						</td>
					</tr>
					<tr>
						<td colspan="5">
							<label class="control-label" style="font-size: 15px;">EXECL导入模板下载:</label>
							
								<label class="control-label" style="font-size: 15px;">
								    <a v-if="fileType=='zdwry'" style="color: blue;text-decoration: underline;" href="static/importExcelFiles/污染源名单.xls" download="污染源名单.xls">污染源名单信息导入模板</a> 
                                    <a v-if="fileType=='wrypks'" style="color: blue;text-decoration: underline;" href="static/importExcelFiles/污染源排口（废水）.xls" download="污染源排口（废水）.xls">污染源排口（废水）信息导入模板</a>
									<a v-if="fileType=='wrypkq'" style="color: blue;text-decoration: underline;" href="static/importExcelFiles/污染源排口（废气）.xls" download="污染源排口（废气）.xls">污染源排口（废气）信息导入模板</a>
                                    <!-- <a v-if="fileType=='gfjcx'" style="color: blue;text-decoration: underline;" href="static/importExcelFiles/固废监测项.xls" download="固废监测项.xls">固废监测项信息导入模板</a> -->
                                    <a v-if="fileType=='pjxmq'" style="color: blue;text-decoration: underline;" href="static/importExcelFiles/评价项目（废气监测因子）.xls" download="评价项目（废气监测因子）.xls">评价项目（废气）信息导入模板</a> 
                                    <a v-if="fileType=='pjxms'" style="color: blue;text-decoration: underline;" href="static/importExcelFiles/评价项目（废水监测因子）.xls" download="评价项目（废水监测因子）.xls">评价项目（废水）信息导入模板</a> 
                                    <a v-if="fileType=='pjbz'" style="color: blue;text-decoration: underline;" href="static/importExcelFiles/评价标准.xls" download="评价标准.xls">评价标准信息导入模板</a> 
                                    <a v-if="fileType=='jcsjs'" style="color: blue;text-decoration: underline;" href="static/importExcelFiles/监测数据（废水）.xls" download="监测数据（废水）.xls">监测数据（废水）信息导入模板</a> 
									<a v-if="fileType=='jcsjq'" style="color: blue;text-decoration: underline;" href="static/importExcelFiles/监测数据（废气）.xls" download="监测数据（废气）.xls">监测数据（废气）信息导入模板</a>
									<a v-if="fileType=='gfjcsjcjdq'" style="color: blue;text-decoration: underline;" href="static/importExcelFiles/监测数据（固废厂界大气）.xls" download="监测数据（固废厂界大气）.xls">监测数据（固废厂界大气）信息导入模板</a>
									<a v-if="fileType=='gfjcsjstyAndDxs'" style="color: blue;text-decoration: underline;" href="static/importExcelFiles/监测数据（固废地下水、渗透液）.xls" download="监测数据（固废地下水、渗透液）.xls">监测数据（固废地下水、渗透液）信息导入模板</a>
                                    <a v-if="fileType=='pfqx'" style="color: blue;text-decoration: underline;" href="static/importExcelFiles/受纳水体.xls" download="受纳水体.xls">受纳水体信息导入模板</a> 
                                </label>

						</td>
					</tr>	
					<tr id="fontId" style="display: none;">
						<td colspan="5">
							<label class="control-label" style="font-size: 24px;color: red">数据导入成功...</label>
						</td>
					</tr>	
					<tr id="fontId1" style="display: none;">
						<td colspan="5">
							<label class="control-label" style="font-size: 24px;color: red">数据导入失败，请联系管理员...</label>
						</td>
					</tr>	
				</table>
			</form>	
		</div>
	</div>
</template>
<script>
export default {
     data() {
            return {
           
            fileType:""
            };
     },
     mounted(){
         this.fileType=JSON.parse(sessionStorage.getItem('type'));
     },
     methods:{
         uploadExecl(){
                 let url="";
                 let _this=this;
                let param = new FormData();
                param.append("file", document.getElementById("file").files[0]);
                //  let paramData={file:document.getElementById("file").files[0]};
                 let headers = {headers: {"Content-Type": "multipart/form-data"}};
                
                 if(this.fileType=='zdwry'){
                     url=_this.baseurl+"wrynb/importexcel/uploadExeclCompany";
                 }else if(this.filetype=='wrypks'){
                     url=_this.baseurl+"wrynb/importexcel/uploadExeclOutlet";
				 }else if(this.fileType=='wrypkq'){
					 url=_this.baseurl+"wrynb/importexcel/uploadExeclOutletGas";
				 }
				 else if(this.filetype=='pjxmq'){
                     url=_this.baseurl+"wrynb/importexcel/uploadExeclLimitFactorG";
                 }else if(this.filetype=='pjxms'){
                     url=_this.baseurl+"wrynb/importexcel/uploadExeclLimitFactorW";
                 }else if(this.filetype=='pjbz'){
                     url=_this.baseurl=='wrynb/importexcel/uploadExeclEvaluationStandard';
                 }else if(this.filetype=='jcsjs'){
                     url=_this.baseurl+'wrynb/importexcel/uploadExeclMonitorWater';
				 }else if(this.filetype=='jcsjq'){
					 url=_this.baseurl+'wrynb/importexcel/uploadExeclMonitorGas';
				 }else if(this.filetype='gfjcsjcjdq'){
					 url=_this.baseurl+'wrynb/importexcel/uploadExeclGfFborder';
				 }else if(this.filetype=='gfjcsjstyAndDxs'){
					 url=_this.baseurl+'/wrynb/importexcel/uploadExeclGfPentrant';
				 }
				 else if(this.filetype=='pfqx'){
                     url=_this.baseurl+'wrynb/importexcel/uploadExeclOutwhereWater';
                 }
                 this.$http({
                     url:url,
                     method:'post',
                     data:param,
                     headers:headers
                 }).then(function(res){
                    // console.log(res);
                     if(res.status==200){
                          layer.msg('保存成功！', {
                                    icon: 1
                         });
                         $("#fontId").show();
						$("#fontId1").hide();
                     }else{
                           layer.msg('保存失败！', {
                                icon: 2
                            });
                            $("#fontId").hide();
						$("#fontId1").show();
                     }
                 })
           
            
             
         }
     }
}
</script>

<style scoped>
#searchForm {
    	margin-bottom: 3px;
    	margin-left: 3px;
   		margin-top: 5px;
    }
	.ui-jqgrid tr.ui-row-ltr td {
 		 white-space: nowrap;overflow: hidden;text-overflow:ellipsis;
	}
	input[type=file] {
    	display: inline;
	}
	.table > thead > tr > th,
	.table > tbody > tr > th,
	.table > tfoot > tr > th,
	.table > thead > tr > td,
	.table > tbody > tr > td,
	.table > tfoot > tr > td {
	  padding: 8px;
	  line-height: 1.42857143;
	  text-align:center;
	  vertical-align: middle;
	  border-top: 1px solid #ddd;
	}
</style>


<!--
放射源信息
-->
<template>
	<!--右-->
	<div class="fs-right">
		<!--输入框-->
		<div class="input-box">
			<div class="input-group">
				<span class="input-group-addon">标题名称：</span>
				<input type="text" class="form-control" v-model='title'>
			</div>

            <div class="input-group">
				<span class="input-group-addon">管控类型：</span>
				<!-- <input type="text" class="form-control" v-model='type'> -->
                <el-select filterable placeholder="--请选择--"  v-model="type">
					<el-option v-for="item in gktype" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
                
			</div>
            <div class="input-group">
				<span class="input-group-addon">管控效果：</span>
				<!-- <input type="text" class="form-control" v-model='effect'> -->
                 <el-select filterable placeholder="--请选择--"  v-model="effect">
					<el-option v-for="item in gkeffect" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
			</div>
			
			<div class="input-group">
			</div>
			<!--按钮-->
			<div class="input-group">
				<span class="btn_content btn_query" @click="openTimeDiv()" >
					<i class="iconfont icon-daochu2"></i>
					<span>日报</span>
				</span>
				<span class="btn_content btn_query" @click="openWeekDiv()">
					<i class="iconfont icon-daochu2"></i>
					<span>周报</span>
				</span>
				<span class="btn_content btn_query" @click="openMonthDiv()" >
					<i class="iconfont icon-daochu2"></i>
					<span>月报</span>
				</span>
				<span class="btn_content btn_query" @click="openQuarterDiv()">
					<i class="iconfont icon-daochu2"></i>
					<span>季报</span>
				</span>
				<span class="btn_content btn_query" @click="openYearDiv()" >
					<i class="iconfont icon-daochu2"></i>
					<span>年报</span>
				</span>
				
				<span class="btn_content btn_query" @click="getpage()">
					<i class="iconfont icon-chaxun2"></i>
					<span>查询</span>
				</span>
				<span class="btn_content btn_empty" @click='empty()'>
					<i class="iconfont icon-xunhuan"></i>
					<span>清空</span>
				</span>
			</div>
		</div>
		<!--表格内容-->
		<el-main v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.5)" element-loading-text="数据正在加载中" >
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">序号</th>
						<th scope="col">会签类型</th>
						<th scope="col">会签时间</th>
						<th scope="col">标题</th>
						<th scope="col">描述</th>
						<th scope="col">添加人员</th>
						<th scope="col">流程图</th>
						<th scope="col">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) of items" :key='index'>
						<td v-if="page == 1 ">{{index+1}}</td>
						<td v-else-if="rows == 10">{{index+1+(10*(page-1))}}</td>
						<td v-else-if="rows == 20">{{index+1+(20*(page-1))}}</td>
						<td v-else-if="rows == 50">{{index+1+(50*(page-1))}}</td>
						<td v-else-if="rows == 100">{{index+1+(100*(page-1))}}</td>
						<td :title="item.type">{{item.type}}</td>
						<td :title="item.signtime">{{item.signtime}}</td>
						<td :title="item.title">{{item.title}}</td>
						<td :title="item.describe">{{item.describe}}</td>
						<td :title="item.addperson">{{touserName(item.addperson)}}</td>
						<td ><a @click="openProcess(item.processid)">流程图</a></td>
						<td>
                            <span></span>
							<span title="查看" @click="openSignForm(item.pkid,'0')"> 
								[<i class="iconfont icon-chakan"></i>]	
							</span>
							<!-- <span title="审核" @click="examineSign(item.pkid)">
								[<i class="iconfont icon-shenhe"></i>]	
							</span> -->
							<span title="删除" @click="deleteById(item.pkid)">
							[<i class="iconfont icon-shanchu"></i>]	
							</span>
							
                            
						</td>
					</tr>
				</tbody>
			</table>
		</el-main>
		<!--分页-->
		<panigation :page='page' :rows='rows' :total='total' :options="options" @changePage="toPage" @changeRows='toRows' @operatePage='optPage'></panigation>
		<!-- 日报弹窗 -->
		<div id="showDateDiv" style="padding:10px;display:none">
			<div style=" display: inline-flex;">
				<div>日期：</div>
				<div>
					<input type="text" id="dayChoose">
				</div>
			</div>
			<div style="margin-top:20px;">
				<span class="btn_content btn_query" @click="downloadDayReport()">
					<!-- <i class="iconfont icon-daochu2"></i> -->
					<span>确认</span>
				</span>
				<span class="btn_content btn_empty" @click="cancleMyLayer()">
					<!-- <i class="iconfont icon-daochu2"></i> -->
					<span>取消</span>
				</span>
			</div>
			
		</div>
		<!-- 周报弹窗 -->
		<div id="showWeekDateDiv" style="padding:10px;display:none">
			<div style=" display: inline-flex;">
				<div>日期范围：</div>
				<div>
					<input type="text" id="WeekChoose">
				</div>
			</div>
			<div style="margin-top:20px;">
				<span class="btn_content btn_query" @click="downloadWeekReport()">
					<!-- <i class="iconfont icon-daochu2"></i> -->
					<span>确认</span>
				</span>
				<span class="btn_content btn_empty" @click="cancleMyLayer()">
					<!-- <i class="iconfont icon-daochu2"></i> -->
					<span>取消</span>
				</span>
			</div>
			
		</div>
		<!-- 月报弹窗 -->
		<div id="showMonthDateDiv" style="padding:10px;display:none">
			<div style=" display: inline-flex;">
				<div>月份选择：</div>
				<div>
					<input type="text" id="monthChoose">
				</div>
			</div>
			<div style="margin-top:20px;">
				<span class="btn_content btn_query" @click="downloadMonthReport()">
					<!-- <i class="iconfont icon-daochu2"></i> -->
					<span>确认</span>
				</span>
				<span class="btn_content btn_empty" @click="cancleMyLayer()">
					<!-- <i class="iconfont icon-daochu2"></i> -->
					<span>取消</span>
				</span>
			</div>
			
		</div>
		<!-- 年份弹窗 -->
		<div id="showYearDateDiv" style="padding:10px;display:none">
			<div style=" display: inline-flex;">
				<div>年份选择：</div>
				<div>
					<input type="text" id="yearChoose">
				</div>
			</div>
			<div style="margin-top:20px;">
				<span class="btn_content btn_query" @click="downloadYearReport()">
					<!-- <i class="iconfont icon-daochu2"></i> -->
					<span>确认</span>
				</span>
				<span class="btn_content btn_empty" @click="cancleMyLayer()">
					<!-- <i class="iconfont icon-daochu2"></i> -->
					<span>取消</span>
				</span>
			</div>
			
		</div>

		<!-- 季度弹窗 -->
		<div id="showQuarterDateDiv" style="padding:10px;display:none">
			<div style=" display: inline-flex;">
				<div>年份季度选择：</div>
				<div>
					<input type="text" id="QuerterYearChoose" style="height:26px;text-align: center;width: 100px;">
					
				</div>
				<div>
				<!-- <el-select filterable placeholder="--请选择--"  v-model="type">
					<el-option v-for="item in quarterList" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select> -->
				<select style="height:26px;border: 1px solid rgba(235, 227, 227);" v-model="quartertime">
					<option>请选择</option>
					<option value="第一季度">第一季度</option>
					<option value="第二季度">第二季度</option>
					<option value="第三季度">第三季度</option>
					<option value="第四季度">第四季度</option>
				</select>
				</div>

			</div>
			
			<div style="margin-top:20px;">
				<span class="btn_content btn_query" @click="downloadQuarterReport()">
					<!-- <i class="iconfont icon-daochu2"></i> -->
					<span>确认</span>
				</span>
				<span class="btn_content btn_empty" @click="cancleMyLayer()">
					<!-- <i class="iconfont icon-daochu2"></i> -->
					<span>取消</span>
				</span>
			</div>
			
		</div>
		<div id="myCharts" style="width:300px;height:300px;display:none"></div>
		<div id="myCharts2" style="width:300px;height:300px;display:none"></div>
			
			
	</div>
</template>

<script>
	// 引入子组件
	import panigation from './../component/panigation'
	export default {
		name: 'app',
		data() {
			return {
				items: [],
				userList:[],
                title:"",
                type:"",
                effect:"",
				pkid: 0,
				page: 1,
				rows: 10,
				total: 0,
				options: [{
						text: '10',
						value: '10'
					},
					{
						text: '20',
						value: '20'
					},
					{
						text: '50',
						value: '50'
					},
					{
						text: '100',
						value: '100'
					}
				],
                fullscreenLoading: false,
                gktype:[{value:"日常管控"},{value:"专家管控"}],
				gkeffect:[{value:"优级管控效果"},{value:"一般管控效果"},{value:"较差管控效果"}],
				quarterList:[{value:"1",label:"第一季度"},{value:"2",label:"第二季度"},{value:"3",label:"第三季度"},{value:"4",label:"第四季度"}],
				dayTime:"",
				quartertime:"",
			};
		},
		mounted() {
			this.getpage();
			this.tableResize(); // 初始化计算table等高度
			this.resizeCall(); // 监听resize
			let _this=this;
			layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#dayChoose",
						type: "date",
						done: function (value) {
								_this.dayTime=value;
						}
					});
				});
			layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#WeekChoose",
						type: "date",
						range: "~",
						done: function (value) {
								_this.dayTime=value;
						}
					});
				});	
				layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#monthChoose",
						type: "month",
						// range: "~",
						done: function (value) {
								_this.dayTime=value;
						}
					});
				});	
				layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#yearChoose",
						type: "year",
						// range: "~",
						done: function (value) {
								_this.dayTime=value;
						}
					});
				});	
				layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#QuerterYearChoose",
						type: "year",
						// range: "~",
						done: function (value) {
								_this.dayTime=value;
						}
					});
				});	
				
		},
		components: {
			panigation
		},
		watch: {
			page: function (newval, oldval) {
				this.getpage();
			},
			rows: function (newval, oldval) {
				this.page = 1; //改变行数，重置页数
				this.getpage();
			}
		},
		methods: {
			toRows(rows) { // 子组件panigation 触发改变rows
				this.rows = rows;
			},
			toPage(page) { // 子组件panigation 触发改变page
				this.page = page;
			},
			optPage(opt) { //翻页
				if (opt === 1) { // opt = 1 下一页  
					this.page < this.total ? this.page++ : this.page = this.total;
				} else if (opt === 0) { // opt = 0 上一页 
					this.page > 1 ? this.page-- : this.page = 1;
				}
			},
			downloadDayReport(){
				let _this=this;
				var typeImg;
				var typeImg2;
				_this.cancleMyLayer();
				_this.$http({
					method:'post',
					url:_this.baseurl+"zhgkhq/getSignCount?daytime="+_this.dayTime
				}).then(function(res){
					if(res.status==200){
						var ImgData=_this.getEchartImgByData(res.data);
						// $.post(_this.baseurl+"zhgkhq/testbase64",{base64String:typeImg},function(msg){
						// 	alert("1111");
						// })
						_this.$http({
							url:_this.baseurl+"zhgkhq/changeBase64ToImg",
							method:'post',
							data:{base64String:ImgData.typeImg,base64String2:ImgData.typeImg2},
							  transformRequest:function(obj) {
	　　　　　　　　　　　　　　　　var str = [];
	　　　　　　　　　　　　　　　　for ( var p in obj) {
	　　　　　　　　　　　　　　　　str.push(encodeURIComponent(p) + "="
	　　　　　　　　　　　　　　　　+ encodeURIComponent(obj[p]));
	　　　　　　　　　　　　　　　　}
	　　　　　　　　　　　　　　　　return str.join("&");
	　　　　　　　　　　　　　　}
						}).then(function(res){
							if(res.status==200 && res.data.status==1){
								 window.open(_this.baseurl+"zhgkhq/downLoadDayReport?daytime="+_this.dayTime+"&typeImg1="+res.data.imgPath1+"&typeImg2="+res.data.imgPath2);
							}
						})
						//
					}
				})
				// window.open(_this.baseurl+"zhgkhq/downLoadDayReport?daytime="+_this.dayTime);
				
			},
			downloadWeekReport(){
				let _this=this;
				var typeImg;
				var typeImg2;
				_this.cancleMyLayer();
					_this.$http({
					method:'post',
					url:_this.baseurl+"zhgkhq/getSignCount?weektime="+_this.dayTime
				}).then(function(res){
					if(res.status==200){
						var ImgData=_this.getEchartImgByData(res.data);
						// $.post(_this.baseurl+"zhgkhq/testbase64",{base64String:typeImg},function(msg){
						// 	alert("1111");
						// })
						_this.$http({
							url:_this.baseurl+"zhgkhq/changeBase64ToImg",
							method:'post',
							data:{base64String:ImgData.typeImg,base64String2:ImgData.typeImg2},
							  transformRequest:function(obj) {
	　　　　　　　　　　　　　　　　var str = [];
	　　　　　　　　　　　　　　　　for ( var p in obj) {
	　　　　　　　　　　　　　　　　str.push(encodeURIComponent(p) + "="
	　　　　　　　　　　　　　　　　+ encodeURIComponent(obj[p]));
	　　　　　　　　　　　　　　　　}
	　　　　　　　　　　　　　　　　return str.join("&");
	　　　　　　　　　　　　　　}
						}).then(function(res){
							if(res.status==200 && res.data.status==1){
								 window.open(_this.baseurl+"zhgkhq/downLoadWeekReport?daytime="+_this.dayTime+"&typeImg1="+res.data.imgPath1+"&typeImg2="+res.data.imgPath2);
							}
						})
						//
					}
				})

			},
			downloadMonthReport(){
				let _this=this;
				var typeImg;
				var typeImg2;
				_this.cancleMyLayer();
				_this.$http({
					method:'post',
					url:_this.baseurl+"zhgkhq/getSignCount?monthtime="+_this.dayTime
				}).then(function(res){
					if(res.status==200){
						var ImgData=_this.getEchartImgByData(res.data);
						// $.post(_this.baseurl+"zhgkhq/testbase64",{base64String:typeImg},function(msg){
						// 	alert("1111");
						// })
						_this.$http({
							url:_this.baseurl+"zhgkhq/changeBase64ToImg",
							method:'post',
							data:{base64String:ImgData.typeImg,base64String2:ImgData.typeImg2},
							  transformRequest:function(obj) {
	　　　　　　　　　　　　　　　　var str = [];
	　　　　　　　　　　　　　　　　for ( var p in obj) {
	　　　　　　　　　　　　　　　　str.push(encodeURIComponent(p) + "="
	　　　　　　　　　　　　　　　　+ encodeURIComponent(obj[p]));
	　　　　　　　　　　　　　　　　}
	　　　　　　　　　　　　　　　　return str.join("&");
	　　　　　　　　　　　　　　}
						}).then(function(res){
							if(res.status==200 && res.data.status==1){
								 window.open(_this.baseurl+"zhgkhq/downLoadMonthReport?daytime="+_this.dayTime+"&typeImg1="+res.data.imgPath1+"&typeImg2="+res.data.imgPath2);
							}
						})
						//
					}
				})
			},
			downloadYearReport(){
				let _this=this;
				var typeImg;
				var typeImg2;
				_this.cancleMyLayer();
				_this.$http({
					method:'post',
					url:_this.baseurl+"zhgkhq/getSignCount?yeartime="+_this.dayTime
				}).then(function(res){
					if(res.status==200){
						var ImgData=_this.getEchartImgByData(res.data);
						// $.post(_this.baseurl+"zhgkhq/testbase64",{base64String:typeImg},function(msg){
						// 	alert("1111");
						// })
						_this.$http({
							url:_this.baseurl+"zhgkhq/changeBase64ToImg",
							method:'post',
							data:{base64String:ImgData.typeImg,base64String2:ImgData.typeImg2},
							  transformRequest:function(obj) {
	　　　　　　　　　　　　　　　　var str = [];
	　　　　　　　　　　　　　　　　for ( var p in obj) {
	　　　　　　　　　　　　　　　　str.push(encodeURIComponent(p) + "="
	　　　　　　　　　　　　　　　　+ encodeURIComponent(obj[p]));
	　　　　　　　　　　　　　　　　}
	　　　　　　　　　　　　　　　　return str.join("&");
	　　　　　　　　　　　　　　}
						}).then(function(res){
							if(res.status==200 && res.data.status==1){
								 window.open(_this.baseurl+"zhgkhq/downLoadYearReport?daytime="+_this.dayTime+"&typeImg1="+res.data.imgPath1+"&typeImg2="+res.data.imgPath2);
							}
						})
						//
					}
				})
			},
			downloadQuarterReport(){
						let _this=this;
						var typeImg;
						var typeImg2;
						_this.cancleMyLayer();
						_this.$http({
					method:'post',
					url:_this.baseurl+"zhgkhq/getSignCount?quarteryear="+_this.dayTime+"&quartertime="+_this.quartertime
				}).then(function(res){
					if(res.status==200){
						var ImgData=_this.getEchartImgByData(res.data);
						// $.post(_this.baseurl+"zhgkhq/testbase64",{base64String:typeImg},function(msg){
						// 	alert("1111");
						// })
							_this.$http({
							url:_this.baseurl+"zhgkhq/changeBase64ToImg",
							method:'post',
							data:{base64String:ImgData.typeImg,base64String2:ImgData.typeImg2},
							  transformRequest:function(obj) {
	　　　　　　　　　　　　　　　　var str = [];
	　　　　　　　　　　　　　　　　for ( var p in obj) {
	　　　　　　　　　　　　　　　　str.push(encodeURIComponent(p) + "="
	　　　　　　　　　　　　　　　　+ encodeURIComponent(obj[p]));
	　　　　　　　　　　　　　　　　}
	　　　　　　　　　　　　　　　　return str.join("&");
	　　　　　　　　　　　　　　}
						}).then(function(res){
							if(res.status==200 && res.data.status==1){
								 window.open(_this.baseurl+"zhgkhq/downLoadQuerterReport?daytime="+_this.dayTime+"&quartertime="+_this.quartertime+"&typeImg1="+res.data.imgPath1+"&typeImg2="+res.data.imgPath2);
							}
						})
						//
					}
				})
			},
			getEchartImgByData(data){
						var myCharts=echarts.init(document.getElementById('myCharts'));
						var option = {
							
							tooltip : {
								trigger: 'item',
								formatter: "{a} <br/>{b} : {c} ({d}%)"
							},
							legend: {
								orient: 'vertical',
								left: 'left',
								data: ['日常管控','专家管控']
							},
							animation:false,
							series : [
								{
									name: '管控会签',
									type: 'pie',
									radius : '55%',
									center: ['50%', '60%'],
									data:[
										{value:data.rcnum, name:'日常管控'},
										{value:data.zjnum, name:'专家管控'}
										
									],
									itemStyle: {
										emphasis: {
											shadowBlur: 10,
											shadowOffsetX: 0,
											shadowColor: 'rgba(0, 0, 0, 0.5)'
										}
									}
								}
							]
						};
						myCharts.setOption(option);

						var myChart2=echarts.init(document.getElementById('myCharts2'));
						var option2={
									tooltip : {
										trigger: 'item',
										formatter: "{a} <br/>{b} : {c} ({d}%)"
									},
									legend: {
										orient: 'vertical',
										left: 'left',
										data: ['优级管控效果','较差管控效果','一般管控效果']
									},
									animation:false,
									series : [
										{
											name: '管控会签',
											type: 'pie',
											radius : '55%',
											center: ['50%', '60%'],
											data:[
												{value:data.yjnum, name:'优级管控效果'},
												{value:data.jcnum, name:'较差管控效果'},
												{value:data.ybnum, name:'一般管控效果'},
												
											],
											itemStyle: {
												emphasis: {
													shadowBlur: 10,
													shadowOffsetX: 0,
													shadowColor: 'rgba(0, 0, 0, 0.5)'
												}
											}
										}
									]
								};
							
								myChart2.setOption(option2);
								var typeImg=myCharts.getDataURL({ pixelRatio: 2, backgroundColor: '#fff'});
								var typeImg2=myChart2.getDataURL({ pixelRatio: 2, backgroundColor: '#fff'});
								return {typeImg:typeImg,typeImg2:typeImg2}
			},
			openTimeDiv(){
				let layerIndex = top.layer.open({
                					type: 1,
                                    title: '选择',
                                    maxmin: true,
                                    resize: false,
                                    area: ['100', '100'],
                                    // anim: [parseInt(6 * Math.random())],
                                    content: $("#showDateDiv"),
                                    success: function (layero) {
                                        layero.find('.layui-layer-min').remove()
                                    },
                                    end: function () {
                                     $("#showDateDiv").hide();
                                    }
                                });
			},
			openWeekDiv(){
				let layerIndex = top.layer.open({
                					type: 1,
                                    title: '选择',
                                    maxmin: true,
                                    resize: false,
                                    area: ['100', '100'],
                                    // anim: [parseInt(6 * Math.random())],
                                    content: $("#showWeekDateDiv"),
                                    success: function (layero) {
                                        layero.find('.layui-layer-min').remove()
                                    },
                                    end: function () {
                                     $("#showWeekDateDiv").hide();
                                    }
                                });
			},
			openMonthDiv(){
				let layerIndex = top.layer.open({
                					type: 1,
                                    title: '选择',
                                    maxmin: true,
                                    resize: false,
                                    area: ['100', '100'],
                                    // anim: [parseInt(6 * Math.random())],
                                    content: $("#showMonthDateDiv"),
                                    success: function (layero) {
                                        layero.find('.layui-layer-min').remove()
                                    },
                                    end: function () {
                                     $("#showMonthDateDiv").hide();
                                    }
                                });
			},
			openYearDiv(){
				let layerIndex = top.layer.open({
                					type: 1,
                                    title: '选择',
                                    maxmin: true,
                                    resize: false,
                                    area: ['100', '100'],
                                    // anim: [parseInt(6 * Math.random())],
                                    content: $("#showYearDateDiv"),
                                    success: function (layero) {
                                        layero.find('.layui-layer-min').remove()
                                    },
                                    end: function () {
                                     $("#showYearDateDiv").hide();
                                    }
                                });
			},
			openQuarterDiv(){
					let layerIndex = top.layer.open({
                					type: 1,
                                    title: '选择',
                                    maxmin: true,
                                    resize: false,
                                    area: ['100', '100'],
                                    // anim: [parseInt(6 * Math.random())],
                                    content: $("#showQuarterDateDiv"),
                                    success: function (layero) {
										layero.find('.layui-layer-min').remove();
										
                                    },
                                    end: function () {
                                     $("#showQuarterDateDiv").hide();
                                    }
                                });
			},
			touserName(id){
				return this.userList[id];
			},
			getpage() { // 按页获取数据
				this.fullscreenLoading = true;
				let _this = this;
				let temData = {
					title:this.title,
					page: this.page,
                    rows: this.rows,
                    effect:this.effect,
                    type:this.type
                    
					
				};
				_this.$http({
					method: 'post',
					url:`${_this.baseurl}zhgkhq/getUserList`
				}).then(function(res){
					if(res.status==200){
						for(var i in res.data){
							_this.userList[res.data[i].id]=res.data[i].name
						}
					}
				})
				//console.log(_this.userList);
				setTimeout(() => {
					_this.$http({
							method: 'post',
							url: `${_this.baseurl}zhgkhq/getList`,
							params: temData
						})
						.then(function (res) {
							if (res.status == 200 ) {
								
								 _this.items = res.data.rows;
								 _this.total = res.data.total;
								_this.fullscreenLoading = false;
							}
						})
						.catch(function (err) {
							console.log(err);
							setTimeout(() => {
								layer.msg('数据加载异常！！！', {
									icon: 2
								});
								_this.fullscreenLoading = false;
							}, 5000);
						});
				}, 500);
				
			},
			// 清空
			empty() {
				
                this.title="";
                this.type="";
                this.effect="";
				//this.getpage();
			},
			// 删除
			deleteById(id) {

				let _this = this;
				// alert(id);
				// return ;			
				layer.confirm(
					"删除操作不可恢复，确定要删除该业务数据吗？", {
						icon: 2,
						title: "警告",
						btn: ["确定", "取消"]
					},
					function (index) {
						
						_this
							.$http({
								method: "post",
								url: _this.baseurl + "/zhgkhq/deleteSign?id="+id ,
							
							})
							.then(function (res) {
								_this.getpage();
							})
							.catch(function (err) {
								console.log("err", err);
							});
						layer.msg("删除成功");
					},
					function (index) {
						layer.msg("取消删除");
					}
				);
			},
			deployProcess(id){
					let _this = this;
					layer.confirm(
					"确认发布该流程模型吗111？", {
						icon: 2,
						title: "警告",
						btn: ["确定", "取消"]
					},
					function (index) {
						
							_this.$http({
								method: "post",
								url: _this.baseurl + "/act/modeler/model/deploy/" + id
							})
							.then(function (res) {
								_this.getpage();
							})
							.catch(function (err) {
								console.log("err", err);
							});
						layer.msg("发布成功");
					},
					function (index) {
						layer.msg("取消发布");
					}
				);
			},
			openProcess(id){
				
				let _this=this;
					_this.$http({
								method: "post",
								url: _this.baseurl + "act/processInstance/diagram2/signProcesss/"+id
							})
							.then(function (res) {
								let layerIndex = top.layer.open({
                                    type: 2,
                                    //title: '',
                                    maxmin: true,
                                    resize: false,
                                    area: ['100%', '100%'],
                                    // anim: [parseInt(6 * Math.random())],
                                    content: [_this.baseurl2+"static/diagram-viewer/index.html?processDefinitionId="+res.data.processDefinitionId+"&processInstanceId="+res.data.processInstanceId],
                                    success: function (layero) {
                                        layero.find('.layui-layer-min').remove()
                                    },
                                    end: function () {
                                        _this.getpage();
                                    }
                                });
							})
							.catch(function (err) {
								console.log("err", err);
							});
			},
			cancleMyLayer(){
				layer.closeAll();//关闭所有弹窗
			},
			// 自适应高度
			tableResize() {
				let contentRight = document.querySelector('.content'); // content-right
				let tableRight = document.querySelector('.fs-right'); // fs-right
				let inputBox = document.querySelector('.input-box'); // input-box
				let tableBox = document.querySelector('.el-main'); // panigation

				if (!contentRight) return;
				if (!tableRight) return;
				if (!inputBox) return;
				if (!tableBox) return;

				tableRight.style.height = contentRight.offsetHeight;
				tableBox.style.height = tableRight.offsetHeight - inputBox.offsetHeight - 66 + 'px';
			},
			// 监听resize
			resizeCall() {
				var optimizedResize = (function () {
					var callbacks = [],
						running = false;
					// fired on resize event
					function resize() {
						if (!running) {
							running = true;
							if (window.requestAnimationFrame) {
								window.requestAnimationFrame(runCallbacks);
							} else {
								setTimeout(runCallbacks, 66);
							}
						}
					}
					// run the actual callbacks
					function runCallbacks() {
						callbacks.forEach(function (callback) {
							callback();
						});
						running = false;
					}
					// adds callback to loop
					function addCallback(callback) {
						if (callback) {
							callbacks.push(callback);
						}
					}
					return {
						// public method to add additional callback
						add: function (callback) {
							if (!callbacks.length) {
								window.addEventListener('resize', resize);
							}
							addCallback(callback);
						}
					}
				}());

				// start process
				optimizedResize.add(this.tableResize);
            },
            openSignForm(id,num){
					sessionStorage.setItem('operateNum', JSON.stringify(num));
                	 let _this=this;
					 let layerIndex = top.layer.open({
                                    type: 2,
                                    title: '签到',
                                    maxmin: true,
                                    resize: false,
                                    area: ["75%", "70%"],
                                    // anim: [parseInt(6 * Math.random())],
                                    content: '#/bjtaskForm/'+id ,
                                    success: function (layero) {
                                        layero.find('.layui-layer-min').remove()
                                    },
                                    end: function () {
                                        _this.getpage();
                                    }
                                });
            },
			examineSign(id){
				let _this=this;
				layer.confirm(
					"确认审核该业务数据吗", {
						icon: 2,
						title: "警告",
						btn: ["确定", "取消"]
					},
					function (index) {
						

					_this.$http({
					method: "post",
					url: _this.baseurl + "zhgkhq/examineSignById?id="+id
				}).then(function (res){
					if(res.status==200 && res.data.status=='1'){
						layer.msg("审核成功");
						_this.getpage();
					}else{
						console.log(res.data.message);
						layer.msg("审核失败");
					}
				}).catch(function(err){
					console.log(err);
					layer.msg("审核失败");
				})
					},
					function (index) {
						layer.msg("取消审核");
					}
				);
			}
			
		},

	}
</script>
<style scoped>
	/*输入框*/

	.input-group-addon {
		width: 80px;
	}

	.input-group:nth-last-child(2) {
		display: none;
	}

	/* .input-group:nth-child(3) {
		border-left: none;
	} */

	

	select:invalid {
        color: #999;
    }

  
	@media screen and (min-width: 1921px) {
		/*输入框*/
		.input-group {
			width: 25%;
		}
	}

	@media screen and (min-width: 1030px) and (max-width: 1300px) {
		/*输入框*/
		.input-group:nth-last-child(2) {
			display: block;
			width: 66.6666666666%;
		}
		.input-group:nth-child(3) {
			border-left: none;
		}
		.input-group:nth-child(4) {
			border-left: 1px solid #ededed;
		}
		.input-group:nth-child(4),
		.input-group:nth-child(5) {
			border-top: none;
		}
	}

	@media screen and (max-width: 1024px) {
		/*输入框*/
		.input-group:nth-child(3) {
			border-left: 1px solid #dbdbdb;
		}
		.input-group:nth-child(3),
		.input-group:nth-child(4) {
			border-top: none;
		}
	}


	#map {
		width: 100%;
		margin: 10px 0;
		height: 350px;
		border: 1px solid #dbdbdb;
	}

	

</style>

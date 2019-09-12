<template>
	<div style="width:100%;height:100%">
		<div id="myMap" style="width:100%;height:100%;">

		</div>
		<div id="leftmuen" :class="['leftmuenClass',{'offsetLeft':changeflag}]">
			<div id="slide_btn" :class="{'slide':changeflag}" @click="toggleContent()">
				<img id="leftimg" v-bind:src="lefimgsrc">
			</div>
			<div id="leftcontent" class="leftContentClass">
				<div class="title">执法办结率排名</div>
				<div class="table">
					<div class="table-head">

					<table>
						<thead>
							<tr>
								<td>行政区划</td>
								<td>执法类型</td>
								<td>已办结</td>
								<td>未办结</td>
								<td>办结率</td>

							</tr>
						</thead>
						</table>
						</div>
						<div class="table-body">
<table>
						<tbody>
							<tr v-for="(item,index) in items " :key="index">
								<td>{{item.TOWN}}</td>
								<td :title="item.NAME">{{item.NAME}}</td>
								<td>{{item.YBJ}}</td>
								<td>{{item.SUM-item.YBJ}}</td>
								<td>{{(item.YBJ/item.SUM).toFixed(2)*100+"%"}}</td>
							</tr>
						</tbody>
					</table>
					</div>
				</div>

				<div class="echarts">
					<div id="echarts"></div>
				</div>

			</div>
			<!-- <div id="leftbutton" class="leftbuttonClass">
                <div style="background-color:#013148;height:50px;opacity:0.5"  @click="toggleContent()">
                    <img id="leftimg" style="margin-top:16.5px" v-bind:src="lefimgsrc">
                </div>
            </div> -->
		</div>

		<div class="myselect">
			<!-- <select name="" id="town" v-model="town" @change="changeListAndChart()">
				<option value="">行政区划</option>
				<option value="">全部</option>
				<option value="龙湾屯镇">龙湾屯镇</option>
				<option value="张镇">张镇</option>
				<option value="大孙各庄镇">大孙各庄镇</option>
				<option value="北务镇">北务镇</option>

				<option value="杨镇街道">杨镇街道</option>
				<option value="林木镇">林木镇</option>
				<option value="李遂镇">李遂镇</option>
				<option value="南彩镇">南彩镇</option>
				<option value="北小营镇">北小营镇</option>
				<option value="李桥镇">李桥镇</option>
				<option value="天竺镇">天竺镇</option>
				<option value="仁和镇">仁和镇</option>
				<option value="后沙峪镇">后沙峪镇</option>
				<option value="南法信镇">南法信镇</option>
				<option value="马坡镇">马坡镇</option>
				<option value="高丽营镇">高丽营镇</option>
				<option value="赵全营镇">赵全营镇</option>
				<option value="牛栏山镇">牛栏山镇</option>
				<option value="北石槽镇">北石槽镇</option>

			</select> -->

			<el-select filterable placeholder="行政区划" v-model="town" @change="changeListAndChart()" style="margin-right:10px;">
				<el-option v-for="item in streetList" :key="item.ID" :label="item.NAME" :value="item.OLD_NAME"></el-option>
			</el-select>

			<!-- <el-select v-model="town" filterable placeholder="--请选择--">
					<el-option v-for="item in option1" :key="item.value" :label="item.text" :value="item.value">
					</el-option>
				</el-select> -->
			<!-- <select name="" id="" v-model="name" @change="changeListAndChart()">
				<option value="">执法类型</option>
				<option value="">全部</option>
				<option value="行政处理">行政处理</option>
				<option value="行政督察检查">行政督察检查</option>
				<option value="行政处罚">行政处罚</option>
				<option value="行政强制执行">行政强制执行</option>

			</select> -->
			<el-select filterable  placeholder="执法类型" v-model="name" @change="changeListAndChart()" style="margin-right:10px;">
				<el-option v-for="item in typeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
			</el-select>

			<el-input v-model="btime" id="btime" placeholder="开始时间" style="margin-right:10px;"></el-input>
			<el-input v-model="etime" id="etime" placeholder="结束时间" ></el-input>
			<!-- <input v-model="btime" id="btime" placeholder="开始时间">
			<input v-model="etime" id="etime" placeholder="结束时间"> -->
			<!-- <div class="m-time">
          <select name="" id="">
             <option value="">时间</option>
          </select>
          <ul>
            <li>年均</li>
            <li>季均</li>
            <li>月均</li>
            <li>日均</li>
          </ul>
      </div> -->

		</div>
	</div>

</template>
<script>
	import { bjsyPolygon } from "./../../../static/json/bjsyPolygon.js";

	// zai zheli yinyong lib
	import L from "leaflet";
	import "./../../../static/Leaflet.ChineseTmsProviders/baiduMapAPI-2.0-min.js";
	import "./../../../static/Leaflet.ChineseTmsProviders/leaflet-baidu.js";
	//import "./../../../static/echarts.min.js"

	export default {
		data: function() {
			return {
				map: null,
				//  L:null,
				items: [],
				option1: [{
					value: "张镇",
					text: "张镇"
				}, {
					value: "2",
					text: "2"
				}],
				town: "",
				xdata: [],
				ydata: [],
				streetList:[],
				typeList:[{text:"全部"},{value:"行政处理",text:"行政处理"},{value:"行政督察检查",text:"行政督察检查"},{value:"行政处罚",text:"行政处罚"},{value:"行政强制执行",text:"行政强制执行"}],
				btime: null,
				etime: null,
				name: "",
				myChart: null,
				polygonLayer: null,
				petitionLetter: null,
				lefimgsrc: require("../../assets/images/zhixinag.png"),
				color: [
					"#359cde",
					"#7ea100",
					"#61a0a8",
					"#d48265",
					"#91c7ae",
					"#749f83",
					"#ca8622",
					"#bda29a",
					"#6e7074",
					"#546570",
					"#c4ccd3",
					"#359cde",
					"#7ea100",
					"#61a0a8",
					"#d48265",
					"#91c7ae",
					"#749f83",
					"#c23531",
					"#2f4554"
				],
				fixedPoints: [
					
                [40.174403, 116.666026],
                [40.156403, 116.746026],
                [40.206403, 116.746026],
                [40.246403, 116.806026],
                [40.236403, 116.876026],
                [40.236403, 116.876026],
                [40.156403, 116.936026],
                [40.086403, 116.936026],
                [40.156403, 116.836026],
                [40.056403, 116.836026],
                [40.106403, 116.786026],
                [40.106403, 116.686026], 
                [40.056403, 116.686026],
                [40.056403, 116.586026],
                [40.116403, 116.536026],
                [40.156403, 116.536026],
                [40.216403, 116.566026],
                [40.256403, 116.566026],
                [40.236403, 116.666026],
                [40.124403, 116.606026]
            ],
				changeflag: false
			}
		},

		mounted() {
			this.initMap();
			this.initList();
			// $(window).on("resize",this.resizeWindow);
			this.resetWindow();
			this.initCharts();
			this.getStreetList();
			let _this = this;
			layui.use("laydate", function() {
				var laydate = layui.laydate;
				//执行一个laydate实例
				laydate.render({
					elem: "#btime",
					type: "date",
					done: function(value) {
						_this.btime = value;
						//this.testmethods();
						_this.changeListAndChart();
					}
				});
			});

			layui.use("laydate", function() {
				var laydate = layui.laydate;
				//执行一个laydate实例
				laydate.render({
					elem: "#etime",
					type: "date",
					done: function(value) {
						_this.etime = value;
						_this.changeListAndChart()
					}
				});
			});

			//this.getData();
		},
		methods: {
			initList() {
				let _this = this;
				let paramData = {
					town: this.town,
					name: this.name
				};
				_this.$http({
						method: 'post',
						url: `${_this.baseurl3}zhgk/getZfInfo`,
						params: paramData
					})
					.then(function(res) {
						if(res.status == 200) {
							_this.items = res.data;
							// _this.total = res.data.data.total;
							// _this.fullscreenLoading = false;

						}

					})
					.catch(function(err) {
						console.log(err);
						setTimeout(() => {
							layer.msg('数据加载异常！！！', {
								icon: 2
							});
							_this.fullscreenLoading = false;
						}, 5000);
					});
			},
			getStreetList(){
				let _this=this;
				_this.$http({
					method:'POST',
					url:_this.baseurl+"zhgk/getStreetList"
				}).then(function(res){
					if(res.status==200){
						_this.streetList=res.data;
						_this.streetList.splice(0,0,{ID:0,NAME:'全部'});
					}
				})
			},
			changeListAndChart() {
				let _this = this;
				let paramData = {
					town: this.town,
					name: this.name,
					btime: this.btime,
					etime: this.etime
				};
				let paramData2 = {
					town: this.town
				};
				_this.$http({
						method: 'post',
						url: `${_this.baseurl3}zhgk/getZfInfo`,
						params: paramData
					})
					.then(function(res) {
						if(res.status == 200) {
							_this.items = res.data;
							// _this.total = res.data.data.total;
							// _this.fullscreenLoading = false;

						}

					})
					.catch(function(err) {
						console.log(err);
						setTimeout(() => {
							layer.msg('数据加载异常！！！', {
								icon: 2
							});
							_this.fullscreenLoading = false;
						}, 5000);
					});

				//图表
				_this.$http({
						method: 'post',
						url: `${_this.baseurl3}zhgk/getZfchartData`,
						params: paramData
					})
					.then(function(res) {
						if(res.status == 200) {
							//	_this.items = res.data;
							// _this.total = res.data.data.total;
							// _this.fullscreenLoading = false;
							_this.xdata = [];
							_this.ydata = [];
							for(var i in res.data) {
								_this.xdata.push(res.data[i].TOWN);
								_this.ydata.push((res.data[i].YBJ / res.data[i].SUM).toFixed(2) * 100);
							}
							_this.myChart = echarts.init(document.getElementById("echarts"));
							let option = {
								title: {
									textStyle: {
										fontSize: 14,
										paddingLeft: 10,
										color: "#c1ebfb"
									},
									left: 40,
									top: 10
								},

								tooltip: {
									trigger: "axis",
									axisPointer: {
										// 坐标轴指示器，坐标轴触发有效
										type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
									},
									formatter: '{b}:{c}%'
								},
								legend: {
									x: "right"
								},
								xAxis: {
									data: _this.xdata,
									//  data: ["龙湾屯镇", "张镇", "大孙各庄镇", "北务镇", "杨镇街道", "木林镇", "李遂镇","南彩镇", "北小营镇", "李桥镇", "仁和镇", "天竺镇", "后沙峪镇", "南法信镇","马坡镇","高丽营镇","赵全营镇","牛栏山镇","北石槽镇"],
									axisLabel: {
										interval: 0,
										rotate: 70
									}
								},
								yAxis: {
									name: "办结率(%)",
									x: "1",
									axisLabel: {
										formatter: '{value}%'
									},
								},
								grid: {
									y: 30,
									y2: 80,
									x: 40,
									x2: 20
								},
								series: [{
									type: "bar",
									//barWidth: 5,
									// data: [20, 10, 20, 30, 40, 10, 50, 20, 20, 30, 10, 30, 50, 40, 20,56,70,80,90],
									data: _this.ydata,
									right: ["70%", "100%"], //图的位置
									itemStyle: {
										normal: {

											color: function(params) {
												if(params.value >= 80 && params.value <= 100) {
													return "#00e528";
												} else if(params.value >= 60 && params.value < 80) {
													return "#ffff00";
												} else if(params.value >= 40 && params.value < 60) {
													return "#ff7e00"
												} else if(params.value >= 20 && params.value < 40) {
													return "#f50606"
												} else if(params.value >= 0 && params.value < 20) {
													return "#99004c"
												} else {
													return "#7c0024";
												}

											}
										}
									}
								}]
							};
							_this.myChart.setOption(option);
						}

					})
					.catch(function(err) {
						console.log(err);
						setTimeout(() => {
							layer.msg('数据加载异常！！！', {
								icon: 2
							});
							_this.fullscreenLoading = false;
						}, 5000);
					});

			},
			initMap() {

				this.map = L.map("myMap", {
					center: [40.159662, 116.661427],
					//center: [40.130201,116.66643],
					zoom: 12,
					//layers: [BaiDuMap],
					minZoom: 11,
					maxZoom: 18,
					crs: L.CRS.EPSGB3857,
					zoomControl: false,
					//renderer : labelTextCollision
					// measureControl: true 
				});
				this.polygonLayer = new L.featureGroup();
				this.polygonLayer.addTo(this.map);
				var BaiDuMap = L.tileLayer.baiduLayer("Normal.Map")
				BaiDuMap.addTo(this.map);
				for(var i in bjsyPolygon.rings) {

					L.polygon(bjsyPolygon.rings[i].latlngs, {
						color: this.color[i]
					}).addTo(this.polygonLayer).bindPopup("超标企业：2");

				}

				for(var i in this.fixedPoints) {
					L.marker(this.fixedPoints[i], {
						icon: L.icon({
							iconUrl: require("../../assets/images/土壤_正常.png"),
							iconAnchor:   [30, 50],
						})
					}).addTo(this.polygonLayer);
					//  L.marker(this.fixedPoints[i]).addTo(this.polygonLayer);
				}

			},
			clearPolygonLayer() {
				this.polygonLayer.clearLayers();
			},
			resetWindow() {
				//alert($("#leftmuen").height());
				$("#leftmuen").height($(".content").height());
			},
			toggleContent() {
				//$("#leftcontent").fadeToggle();

				if(this.lefimgsrc == require("../../assets/images/zhixinag.png")) {
					this.lefimgsrc = require("../../assets/images/zhixinag2.png");
				} else {
					this.lefimgsrc = require("../../assets/images/zhixinag.png");
				}
				this.changeflag = !this.changeflag;
				//   if(this.changeflag){
				//    this.lefimgsrc = 'this.lefimgsrc==require("../../assets/images/zhixinag2.png")';
				//   }else{
				//     this.lefimgsrc = 'this.lefimgsrc==require("../../assets/images/zhixinag.png")';
				//   }

				// document.getElementById("leftimg").src="../../assets/images/VOC_正常.png";

			},
			initCharts() {
				let _this = this;
				let paramData = {
					town: this.town
				};
				_this.$http({
						method: 'post',
						url: `${_this.baseurl3}zhgk/getZfchartData`,
						params: paramData
					})
					.then(function(res) {
						if(res.status == 200) {
							//	_this.items = res.data;
							// _this.total = res.data.data.total;
							// _this.fullscreenLoading = false;
							_this.xdata = [];
							_this.ydata = [];
							for(var i in res.data) {
								_this.xdata.push(res.data[i].TOWN);
								_this.ydata.push((res.data[i].YBJ / res.data[i].SUM).toFixed(2) * 100);
							}
							_this.myChart = echarts.init(document.getElementById("echarts"));
							let option = {
								title: {
									textStyle: {
										fontSize: 14,
										paddingLeft: 10,
										color: "#c1ebfb"
									},
									left: 40,
									top: 10
								},

								tooltip: {
									trigger: "axis",
									axisPointer: {
										// 坐标轴指示器，坐标轴触发有效
										type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
									},
									formatter: '{b}:{c}%'
								},
								legend: {
									x: "right"
								},
								xAxis: {
									data: _this.xdata,
									//  data: ["龙湾屯镇", "张镇", "大孙各庄镇", "北务镇", "杨镇街道", "木林镇", "李遂镇","南彩镇", "北小营镇", "李桥镇", "仁和镇", "天竺镇", "后沙峪镇", "南法信镇","马坡镇","高丽营镇","赵全营镇","牛栏山镇","北石槽镇"],
									axisLabel: {
										interval: 0,
										rotate: 70
									}
								},
								yAxis: {
									name: "办结率(%)",
									x: "1",
									axisLabel: {
										formatter: '{value}%'
									},
								},
								grid: {
									y: 30,
									y2: 80,
									x: 40,
									x2: 20
								},
								series: [{
									type: "bar",
									//barWidth: 5,
									// data: [20, 10, 20, 30, 40, 10, 50, 20, 20, 30, 10, 30, 50, 40, 20,56,70,80,90],
									data: _this.ydata,
									right: ["70%", "100%"], //图的位置
									itemStyle: {
										normal: {

											color: function(params) {
												if(params.value >= 80 && params.value <= 100) {
													return "#00e528";
												} else if(params.value >= 60 && params.value < 80) {
													return "#ffff00";
												} else if(params.value >= 40 && params.value < 60) {
													return "#ff7e00"
												} else if(params.value >= 20 && params.value < 40) {
													return "#f50606"
												} else if(params.value >= 0 && params.value < 20) {
													return "#99004c"
												} else {
													return "#7c0024";
												}

											}
										}
									}
								}]
							};
							_this.myChart.setOption(option);
						}

					})
					.catch(function(err) {
						console.log(err);
						setTimeout(() => {
							layer.msg('数据加载异常！！！', {
								icon: 2
							});
							_this.fullscreenLoading = false;
						}, 5000);
					});

			}
		}
	}
</script>
<style scoped>
	.leftmuenClass {
		z-index: 99999;
		position: absolute;
		top: 96px;
		left: 0px;
		height: 100%;
		width: 400px;
		display: inline-flex;
		box-shadow: 1px 5px 5px #5d5d5d;
		transform: translate3d(0, 0, 0);
		transition: all 0.3s linear;
	}
	
	.leftContentClass {
		height: 100%;
		width: 400px;
		background-color: #ffffff;
	}
	
	.leftmuenClass.offsetLeft {
		left: -400px;
	}
	
	.leftbuttonClass {
		height: 100%;
		width: 20px;
		float: left;
		align-items: center;
		display: grid;
	}
	
	.myselect {
		display: flex;
		justify-content: center;
		box-shadow: 2px 2px 2px rgb(95, 95, 95);
		background-color: #ffffff;
		width: 500px;
		height: 40px;
		position: absolute;
		top: 165px;
		left: 50%;
		margin-left: -250px;
		z-index: 999;
		padding: 5px;
		border-radius: 3px;
	}
	
	.m-time {
		display: flex;
	}
	
	.m-time ul li {
	    float: left;
	    height: 30px;
	    line-height: 30px;
	    border: 1px solid #dbdbdb;
		border-left: none;
	    background-color: #fff;
	}
	.m-time ul li:nth-child(1) {
	    border-left: 1px solid #dbdbdb;
	}
	
	.myselect select {
		width: 115px;
		height: 30px;
		border-radius: 15px;
	}
	
	.myselect select:nth-child(2) {
		margin: 0px 10px;
	}
	
	.myselect input {
		width: 115px;
		height: 30px;
		margin-right: 10px;
		padding: 0px 2px 0px 6px;
		border-radius: 15px;
		border: #A9A9A9 solid 1px;
	}
	
	.myselect input:last-child {
		margin-right: 0px;
	}
	
	.title {
		height: 50px;
		line-height: 50px;
		color: #333;
		font-size: 16px;
		font-weight: 700;
		border-bottom: 1px solid #dbdbdb;
	}
	
	.table {
		height: calc(100vh - 446px);
		border-bottom: 1px solid #dbdbdb;
	}
	
	thead tr td {
		height: 45px;
		line-height: 45px;
		/* background-color: #dfe9ec; */
		background-image: linear-gradient(to bottom, #fafafa, #ecf4f8);
		font-weight: bold;
		border: 1px solid #dbdbdb;
	}
	
	tbody tr td {
		height: 35px;
		line-height: 35px;
		border: 1px solid #dbdbdb;
	}
	
	#echarts {
		width: 100%;
		height: 300px;
	}
	
	.echarts {
		height: 300px;
	}
	
	#slide_btn {
		position: absolute;
		right: 0;
		top: 50%;
		width: 22px;
		height: 54px;
		font-size: 20px;
		line-height: 54px;
		margin-top: -27px;
		background: rgba(1, 49, 72, 0.5);
		color: #fff;
		cursor: pointer;
	}
	
	#slide_btn.slide {
		right: -22px;
	}

</style>
<style>
.el-input__icon{
		line-height: 26px;
	}
</style>


<template>
	<div style="width:100%;height:100%">
		<div id="myMap" style="width:100%;height:100%;">

		</div>
		<div id="leftmuen" :class="['leftmuenClass',{'offsetLeft':changeflag}]">
			<div id="slide_btn" :class="{'slide':changeflag}" @click="toggleContent()">
				<img id="leftimg" v-bind:src="lefimgsrc">
			</div>
			<div id="leftcontent" class="leftContentClass">
				<div class="title">水环境质量等级排名</div>
				<div class="table">
					<div class="table-head">
					<table>
						<thead>
							<tr>
								<td style="width:90px">行政区划</td>
								<td style="width:120px">水质类型</td>
								<td style="width:100px">时间</td>
								<td>等级</td>
								<td>排名</td>
							</tr>
						</thead>
					</table>
					</div>
					<div class="table-body">
						<table>
						<tbody>
							<tr v-for="(item,key) in dataList">
								<td style="width:90px">{{item.XZQH}}</td>
								<td style="width:120px">{{item.SZLX}}</td>
								<td style="width:100px">{{item.SJ}}</td>
								<td>{{item.DJ}}</td>
								<td>{{key+1}}</td>
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
			

			
			<el-select filterable placeholder="行政区划" v-model="town" style="width:120px;margin-right:5px;" @change="changeListAndChar()">
				<el-option v-for="item in streetList" :key="item.ID" :label="item.NAME" :value="item.OLD_NAME"></el-option>
			</el-select>
			
			<el-select filterable placeholder="水质类型" v-model="type" style="width:120px;margin-right:5px " @change="changeListAndChar()">
				<el-option v-for="item in waterType" :key="item.value" :label="item.text" :value="item.value"></el-option>

			</el-select>
			<div class="m-time">
				
				<!-- <el-input v-model="time" id="time" placeholder="时间" style="width:120px;"></el-input> -->
				<ul>
						<li id="y" class="timeflag" @click="clicktime('y')">年均</li>
						<li id="q" class="timeflag" @click="clicktime('q')">季均</li>
						<li id="m" class="timeflag" @click="clicktime('m')">月均</li>
						<li id="d" class="timeflag" @click="clicktime('d')">日均</li>
				</ul>
			</div>
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
				waterType:[{text:"全部"},{text:"河流断面",value:"河流断面"},{text:"地表水市考核断面",value:"地表水市考核断面"},{text:"出入境断面",value:"出入境断面"},{text:"自动监测站",value:"自动监测站"},{text:"饮用水点位",value:"饮用水点位"}],
				streetList:[],
				town:"",
				type:"",
				time:"",
				sjflag:"",
				dataList:[],
				mychart:null,
				echartsXData:[],
				echartsYData:[],
				//  L:null,
				polygonLayer: null,
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
			// $(window).on("resize",this.resizeWindow);
			this.resetWindow();
			//this.initCharts();
			this.getStreetList();
			this.getData();
			setTimeout(() => {
			layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#time",
						type: "date",
						done: function (value) {
								_this.dayTime=value;
						}
					});
				});
		}, 1000);
			//this.getData();
		},
		methods: {
			clicktime(id){
			let _this=this;
			$(".timeflag").css('background','#ffffff');
			$("#"+id).css('background','#029ad1');
			_this.sjflag=id;
			_this.changeListAndChar();

			},
			changeListAndChar(){
				let _this=this;
				console.log(_this.sjflag)
				let paramdatas={xzqh:_this.town,szlx:_this.type,sj:_this.time,sjFlag:_this.sjflag};
				let paramdatas2={xzqh:_this.town};
				// alert(_this.town)
				
				_this.$http({
					url:_this.baseurl3+"zhgk/getShjInfo",
					method:'POST',
					params:paramdatas
					
				}).then(function(res){
					if(res.status==200){
						_this.dataList=res.data;
					}else{
						layer.msg("数据加载错误");
					}
				});
				_this.$http({
					url:this.baseurl3+"zhgk/getShjCharData",
					method:'POST',
					params:paramdatas2 
					
				}).then(function(res){
					if(res.status==200){
						_this.echartsYData=[];
						_this.echartsXData=[];
						for(var i in res.data){
							_this.echartsXData.push(res.data[i].XZQH);
							_this.echartsYData.push(res.data[i].DJ);
						}
						// _this.mychart.dispose();
						_this.mychart.clear();
						_this.initCharts();
						
					}
				})
			},
			getData(){
				let _this=this;
				_this.$http({
					url:_this.baseurl3+"zhgk/getShjInfo",
					method:'POST'
				}).then(function(res){
					if(res.status==200){
						_this.dataList=res.data;
					}else{
						layer,msg("数据加载错误");
					}
				});
				_this.$http({
					url:this.baseurl3+"zhgk/getShjCharData",
					method:'POST',
					
				}).then(function(res){
					if(res.status==200){
						for(var i in res.data){
							_this.echartsXData.push(res.data[i].XZQH);
							_this.echartsYData.push(res.data[i].DJ);
						}
						
						_this.initCharts()
					}
				})
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
					}).addTo(this.polygonLayer);

				}

				for(var i in this.fixedPoints) {
					L.marker(this.fixedPoints[i], {
						icon: L.icon({
							iconUrl: require("../../assets/images/地表水_正常.png"),
							iconAnchor:   [30, 50]
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
				let _this=this;
				setTimeout(function() {
					_this.mychart = echarts.init(document.getElementById("echarts"));
					
					var option = {
						//color: ["#3398DB"],
						tooltip: {
							trigger: "axis",
							axisPointer: {
								// 坐标轴指示器，坐标轴触发有效
								type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
							},
							//   formatter: function(params) {
							//     // for text color
							//     var color = colorList[params[0].dataIndex];
							//     var res = '<div style="color:' + color + '">';
							//     res += "<strong>" + params[0].name + "</strong>";
							//     for (var i = 0, l = params.length; i < l; i++) {
							//       res += "<br/>" + params[i].seriesName + " : " + params[i].value;
							//     }
							//     res += "</div>";
							//     return res;
							//   }
						},
						grid: {
							left: "3%",
							right: "4%",
							bottom: "3%",
							containLabel: true
						},
						legend: {
							show: false,
							emWidth: 20,
							itemHeight: 10,
							top: 10,
							data: ["水质等级"],
							textStyle: {
								fontSize: 12,
								color: "#666666"
							}
						},
						xAxis: [{
							type: "category",
							data: _this.echartsXData,
							axisTick: {
								alignWithLabel: true
							},
							axisLabel: {
								interval: 0,
								rotate: 70,

							},
						}],
						yAxis: [{
							name: "等级",
							type: ""
						}],
						grid: {
							y: 30,
							y2: 80,
							x: 40,
							x2: 20
						},
						series: [{
							name: "水质等级",
							type: "bar",
							// barWidth: "60%",
							data: _this.echartsYData,
							itemStyle: {
								normal: {
									color: function(params) {
										if(params.value == 1) {
											return "#00e528";
										} else if(params.value == 2) {
											return "#ffff00";
										} else if(params.value == 3) {
											return "#ff7e00"
										} else if(params.value == 4) {
											return "#f50606"
										} else {
											return "#7c0024";
										}
									}
								}
							}
						}]
					};
					_this.mychart.setOption(option);
				}, 500)
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
		/* position: absolute;
  width: 500px;
  height: 40px;
  background-color: rgba(225,225,225,.8);
  box-shadow: 1px 1px 1px #2c99e8;
  z-index: 999;
  position: absolute;
  left: 50%;
  margin-left: -250px;
  top: 166px;
  padding: 5px;
  display: flex;
  justify-content: center; */
		/* background-color: rgba(218,238,250,.8); */
		display: flex;
		justify-content: center;
		/* box-shadow: 2px 2px 2px #2c99e8; */
		box-shadow: 2px 2px 2px rgb(95, 95, 95);
		background-color: #ffffff;
		width: 400px;
		height: 40px;
		position: absolute;
		top: 165px;
		left: 50%;
		margin-left: -200px;
		z-index: 999;
		padding: 5px;
		border-radius: 3px;
	}
	
	.m-time {
		display: flex;
	}
	
	.m-time ul li {
	    float: left;
	    height: 26px;
	    line-height: 26px;
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
	.timeflag
	{
		cursor:pointer 
	}

</style>
<style>
.el-input__icon{
		line-height: 26px;
	}
</style>


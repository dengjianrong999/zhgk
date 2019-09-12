<template>
	<div style="width:100%;height:100%">
		<div id="myMap" style="width:100%;height:100%;">

		</div>
		<div id="leftmuen" :class="['leftmuenClass',{'offsetLeft':changeflag}]">
			<div id="slide_btn" :class="{'slide':changeflag}" @click="toggleContent()">
				<img id="leftimg" v-bind:src="lefimgsrc">
			</div>
			<div id="leftcontent" class="leftContentClass">
				<div class="titles">顺义土壤综合污染指数排名</div>
				<div class="bottom">
					<div id="soil"></div>
				</div>

				<div class="titles">顺义区域土壤质量评价</div>
				<div class="bottom">
					<div id="soil1"></div>
				</div>
				<div class="titles">顺义点位土壤利用类型</div>
				<div class="bottom">
					<div id="soil2">
						

					</div>
				</div>

			</div>
			<!-- <div id="leftbutton" class="leftbuttonClass">
                <div style="background-color:#013148;height:50px;opacity:0.5"  @click="toggleContent()">
                    <img id="leftimg" style="margin-top:16.5px" v-bind:src="lefimgsrc">
                </div>
            </div> -->
		</div>

		<div class="myselect">
			<el-select filterable placeholder="行政区划" v-model="town" style="width:120px" @change="getData()">
				<el-option v-for="item in streetList" :key="item.ID" :label="item.NAME" :value="item.OLD_NAME"></el-option>
			</el-select>
			
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
				town:"",
				streetList:[],
				polygonLayer: null,
				myChart: null,
				soil1: null,
				soil2:null,
				echart1Xdata:[],
				echart1Ydata:[],
				echart2Data:[],
				echart3Data:[],
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
				fixedPoints:  [
					
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
			// this.initCharts();
			// this.SoilCirinit();
			this.getStreetList();
			this.getData();
			// this.initchar2();
		},
		methods: {
			getData(){
				let _this=this;
				let paramdata={xzqh:_this.town};
				_this.$http({
					url:_this.baseurl3+"zhgk/getTrPmCharData",
					method:'post',
					params:paramdata
				}).then(function(res){
					if(res.status==200){
						_this.echart1Xdata=[];
						_this.echart1Ydata=[];
						for(var i in res.data){
							_this.echart1Xdata.push(res.data[i].XZQH);
							_this.echart1Ydata.push(res.data[i].PM);
						}
						_this.initCharts();
					}
				});
				_this.$http({
					url:_this.baseurl3+'zhgk/getTrPjCharData',
					method:'post',
					params:paramdata
				}).then(function(res){
					if(res.status==200){
						_this.echart2Data=[];
						for(var i in res.data){
							_this.echart2Data.push({name:res.data[i].WRDJ,value:res.data[i].WRSL})
						}
						_this.SoilCirinit();

					}
				});

				_this.$http({
					url:_this.baseurl3+'zhgk/getTrLxCharData',
					method:'post',
					params:paramdata
					
				}).then(function(res){
					if(res.status==200){
						_this.echart3Data=[];
						for(var i in res.data){
							_this.echart3Data.push({name:res.data[i].SOILTYPE,value:res.data[i].SOIULNUM});
						}
						_this.initchar2();
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
							iconUrl: require("../../assets/images/气象_正常.png"),
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
				let _this=this;
				this.myChart = echarts.init(document.getElementById("soil"));

				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							// 坐标轴指示器，坐标轴触发有效
							type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
						},
					},
					toolbox: {
						show: true,
						orient: "vertical",
						y: "center"
						//
					},
					calculable: true,
					grid: {
						y: 30,
						y2: 40,
						x: 40,
						x2: 20
					},
					xAxis: [{
						type: "category",
						data: _this.echart1Xdata,
						axisTick: {
							//---坐标轴 刻度
							show: true, //---是否显示
							inside: true, //---是否朝内
							lengt: 3, //---长度
							lineStyle: {
								//color:'red',          //---默认取轴线的颜色
								width: 1,
								type: "solid"
							}
						},
						axisLabel: {
							interval: 0,
							rotate: 70
						},
						axisLine: {
							lineStyle: {
								color: "#666666",
								width: 2
							}
						}
					}],

					yAxis: [{
						type: "value",
						axisLine: {
							lineStyle: {
								color: "#666666",
								width: 2
							}
						}
					}],
					grid: {
						y: 10,
						y2: 65,
						x: 40,
						x2: 20
					},
					series: [{
						name: "排名",
						type: "bar",
						barWidth: 8,
						color: "#67bd85",

						data: _this.echart1Ydata,
						itemStyle: {
							normal: {
								color: function(params) {
									if(params.value > 0 && params.value < 3) {
										return "#00e528";
									} else if(params.value >= 3 && params.value < 6) {
										return "#ffff00";
									} else if(params.value >= 6 && params.value < 9) {
										return "#ff7e00"
									} else if(params.value >= 9 && params.value < 12) {
										return "#f50606"
									} else if(params.value >= 12 && params.value < 16) {
										return "#99004c"
									} else {
										return "#7c0024";
									}

								}
							}
						}
					}]
				};

				// 使用刚指定的配置项和数据显示图表。
				this.myChart.setOption(option);
			},
			initchar2(){
				let _this=this;
				_this.soil2= echarts.init(document.getElementById("soil2"));
				var option = {
						// title : {
						// 	text: '某站点用户访问来源',
						// 	subtext: '纯属虚构',
						// 	x:'center'
						// },
						tooltip : {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						legend: {
							orient : 'vertical',
							x : 'left',
							data:['耕地','草地','林地','其他']
						},
						// toolbox: {
						// 	show : true,
						// 	feature : {
						// 		mark : {show: true},
						// 		dataView : {show: true, readOnly: false},
						// 		magicType : {
						// 			show: true, 
						// 			type: ['pie', 'funnel'],
						// 			option: {
						// 				funnel: {
						// 					x: '25%',
						// 					width: '50%',
						// 					funnelAlign: 'left',
						// 					max: 1548
						// 				}
						// 			}
						// 		},
						// 		restore : {show: true},
						// 		saveAsImage : {show: true}
						// 	}
						// },
						calculable : true,
						series : [
							{
								name:'土壤利用',
								type:'pie',
								radius : '60%',
								center: ['60%', '50%'],
								data:_this.echart3Data
							}
						],
						color: ["#cc76c8", "#e5b35c", "#e6e15c", "#029ad1", "#65b548"]
					};
					_this.soil2.setOption(option);

			},
			SoilCirinit() {
				let _this=this;
				this.soil1 = echarts.init(document.getElementById("soil1"));
				var option = {
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: "vertical",
						left: "5%",
						itemGap: 10,
						textStyle: {
							color: "#333"
						},
						data: ["重度污染", "中度污染", "轻度污染", "轻微污染", "无污染"]
					},
					series: [{
						name: "土壤质量评价",
						type: "pie",
						radius: ["50%", "60%"],
						center: ["60%", "50%"],
						avoidLabelOverlap: false,
						label: {
							// 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等.
							normal: {
								show: true, // 是否显示标签[ default: false ]
								position: "outside", // 标签的位置。'outside'饼图扇区外侧，通过视觉引导线连到相应的扇区。'inside','inner' 同 'inside',饼图扇区内部。'center'在饼图中心位置。
								formatter: "{d}%" // 标签内容
							}
						},
						labelLine: {
							// 标签的视觉引导线样式,在 label 位置 设置为'outside'的时候会显示视觉引导线。
							normal: {
								show: true, // 是否显示视觉引导线。
								length: 15, // 在 label 位置 设置为'outside'的时候会显示视觉引导线。
								length2: 10, // 视觉引导项第二段的长度。
								lineStyle: {
									// 视觉引导线的样式
									color: "#dbdbdb",
									width: 1
								}
							}
						},
						data: _this.echart2Data
					}],
					color: ["#cc76c8", "#e5b35c", "#e6e15c", "#029ad1", "#65b548"]
				};
				this.soil1.setOption(option);
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
		width: 140px;
		height: 40px;
		position: absolute;
		top: 165px;
		left: 50%;
		margin-left: -70px;
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
	
	.title {
		height: 50px;
		line-height: 50px;
		color: #333;
		font-size: 16px;
		font-weight: 700;
		border-bottom: 1px solid #dbdbdb;
	}
	/* #echarts{
  width:100%;
  height: 300px;
}
.echarts{
  height: 300px;
} */
	
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
	
	.bottom {
		border-bottom: 1px solid #dbdbdd;
	}
	
	.bottom:last-child {
		border-bottom: none;
	}
	
	.titles {
		height: 30px;
		line-height: 30px;
		text-align: left;
		text-indent: 10px;
		font-size: 14px;
	}
	
	#soil,
	#soil1,
	#soil2 {
		width: 100%;
		height: 25vh;
	}
	
	.pic1,
	.pic2,
	.pic3,
	.pic4 {
		float: left;
		width: 50%;
		height: 73px;
		position: relative;
	}
	
	#soil2 {
		padding-top: 8px;
	}
	
	.pic1 div,
	.pic2 div,
	.pic3 div,
	.pic4 div {
		float: left;
	}
	
	.pic1gd,
	.pic2cd,
	.pic3qt,
	.pic4ld {
		position: relative;
	}
	
	.pic1gd span,
	.pic2cd span,
	.pic3qt span,
	.pic4ld span {
		position: absolute;
		left: 16px;
		top: 19px;
		color: #fff;
	}
	
	.pic2 div:nth-child(1),
	.pic4 div:nth-child(1) {
		float: right;
		padding-right: 82px;
		margin-top: 11px;
	}
	
	.pic1gd img {
		margin-top: -12px;
	}
	
	.pic3qt img {
		margin-left: 135px;
	}
	
	.pic3 div:nth-child(1) {
		position: absolute;
		left: 86px;
	}
	
	.pic3qt span {
		left: 148px;
	}
	
	.pic1 {
		padding-left: 70px;
	}

</style>
<style>
.el-input__icon{
		line-height: 26px;
	}
</style>

<template>
	<div style="width:100%;height:100%">
		<div id="myMap" style="width:100%;height:100%;">

		</div>
		<div id="leftmuen" :class="['leftmuenClass',{'offsetLeft':changeflag}]">
			<div id="slide_btn" :class="{'slide':changeflag}" @click="toggleContent()">
				<img id="leftimg" v-bind:src="lefimgsrc">
			</div>
			<div id="leftcontent" class="leftContentClass">
				<div class="title">辐射放射源数量</div>
				<div class="table">
					<div class="table-head">
						<table>
							<thead>
								<tr>
									<td>行政区划</td>
									<td>类型</td>
									<td>数量</td>
									<!-- <td>转移量(吨)</td>
                            <td>排名</td> -->

								</tr>
							</thead>
						</table>
					</div>
					<div class="table-body">
						<table>
							<tbody>
								<tr v-for="(item,index) in items" :key="index">
									<td>{{item.NAME}}</td>
									<td>{{item.RADIATIOT_TYPE}}</td>
									<td>{{item.COUNT}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="FSecharts">
					<div id="FSecharts"></div>
				</div>
				<!-- <div class="FSecharts">
                        <div id="FSecharts2"></div>
                    </div> -->

			</div>

		</div>

		<div class="myselect">
			<el-select filterable placeholder="行政区划" v-model="town" @change="changeListAndChar()" style="width:140px;margin-right:10px">
				<el-option v-for=" item in streetList" :key="item.ID" :label="item.NAME" :value="item.OLD_NAME"></el-option>
			</el-select>
			<el-select filterable placeholder="类型" v-model="FsType" @change="changeListAndChar()" style="width:140px">
				<el-option v-for="item in typeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
			</el-select>
			<!-- <select name="" id="" v-model="FsType" @change="changeListAndChar()">
				<option value="">类型</option>
				<option value="">全部</option>
				<option value="固定">固定</option>
				<option value="移动">移动</option>

			</select> -->
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
				town: "",
				FsType: "",
				items: [],
				myChart: null,
				xAxis: [],
				yAxis: [],
				streetList:[],
				typeList:[{text:"全部"},{text:"固定",value:"固定"},{text:"移动",value:"移动"}],
				//  L:null,
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
			// $(window).on("resize",this.resizeWindow);
			this.resetWindow();
			this.initCharts();
			// this.initCharts2();
			this.getLsitData();
			this.getStreetList();

			//this.getData();
		},
		methods: {
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
			changeListAndChar() {
				let _this = this;
				let paramData = {
					town: this.town,
					FsType: this.FsType
				};
				let paramData2 = {
					town: this.town
				};
				_this.$http({
						method: 'post',
						url: `${_this.baseurl3}zhgk/getFsInfo`,
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

				_this.$http({
						method: 'post',
						url: `${_this.baseurl3}zhgk/getFsCharData`,
						params: paramData2
					})
					.then(function(res) {
						if(res.status == 200) {

							_this.xAxis = [];
							_this.yAxis = [];
							for(var i in res.data) {
								_this.xAxis.push(res.data[i].NAME);
								_this.yAxis.push(res.data[i].COUNT);
							}
							setTimeout(function() {
								_this.myChart = echarts.init(document.getElementById("FSecharts"));
								var option = {
									title: {
										textStyle: {
											fontSize: 14,
											paddingLeft: 10,
											color: "#c1ebfb"
										},
										// left: 10,
										// top: 10
									},
									grid: {
										y: 30,
										y2: 60,
										x: 40,
										x2: 30
									},

									tooltip: {},
									legend: {
										x: "right"
									},
									xAxis: {
										data: _this.xAxis,
										axisLabel: {
											interval: 0,
											rotate: 50
										}
									},
									yAxis: {
										name: "    放射源数量",
										//x: "1"
									},
									series: [{
										type: "bar",
										//barWidth: 5,
										// data: [12, 11, 21, 13, 14, 11, 15, 22, 22, 23, 21, 23, 25, 14, 22,50,45,12,32],
										data: _this.yAxis,
										color: '#ea6945',
										right: ["70%", "100%"], //图的位置
									}]
								};
								_this.myChart.setOption(option);
							}, 0)
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
			getLsitData() {
				let _this = this;
				let paramData = {
					town: _this.town,
					FsType: _this.FsType
				};
				_this.$http({
						method: 'post',
						url: `${_this.baseurl3}zhgk/getFsInfo`,
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
							iconUrl: require("../../assets/images/放射源_正常.png"),
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
				console.log(12312313)
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
					town: _this.town
				};
				_this.$http({
						method: 'post',
						url: `${_this.baseurl3}zhgk/getFsCharData`,
						params: paramData
					})
					.then(function(res) {
						if(res.status == 200) {

							_this.xAxis = [];
							_this.yAxis = [];
							for(var i in res.data) {
								_this.xAxis.push(res.data[i].NAME);
								_this.yAxis.push(res.data[i].COUNT);
							}
							setTimeout(function() {
								_this.myChart = echarts.init(document.getElementById("FSecharts"));
								var option = {
									title: {
										textStyle: {
											fontSize: 14,
											paddingLeft: 10,
											color: "#c1ebfb"
										},
										// left: 10,
										// top: 10
									},
									grid: {
										y: 30,
										y2: 60,
										x: 40,
										x2: 30
									},

									tooltip: {},
									legend: {
										x: "right"
									},
									xAxis: {
										data: _this.xAxis,
										axisLabel: {
											interval: 0,
											rotate: 50
										}
									},
									yAxis: {
										name: "    放射源数量",
										//x: "1"
									},
									series: [{
										type: "bar",
										//barWidth: 5,
										// data: [12, 11, 21, 13, 14, 11, 15, 22, 22, 23, 21, 23, 25, 14, 22,50,45,12,32],
										data: _this.yAxis,
										color: '#ea6945',
										right: ["70%", "100%"], //图的位置
									}]
								};
								_this.myChart.setOption(option);
							}, 0)
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
			initCharts2() {
				setTimeout(function() {
					var myChart = echarts.init(document.getElementById("FSecharts2"));
					var option = {
						title: {
							textStyle: {
								fontSize: 14,
								paddingLeft: 10,
								color: "#c1ebfb"
							},
							left: 10,
							top: 10
						},
						grid: {
							y: 30,
							y2: 60,
							x: 40,
							x2: 30
						},

						tooltip: {},
						legend: {
							x: "right"
						},
						xAxis: {
							data: ["龙湾屯镇", "张镇", "大孙各庄镇", "北务镇", "杨镇街道", "木林镇", "李遂镇", "南彩镇", "北小营镇", "李桥镇", "仁和镇", "天竺镇", "后沙峪镇", "南法信镇", "马坡镇", "高丽营镇", "赵全营镇", "牛栏山镇", "北石槽镇"],
							axisLabel: {
								interval: 0,
								rotate: 50
							}
						},
						yAxis: {
							name: "           许可证发放数量排名",
							x: "1"
						},
						series: [{
							type: "bar",
							//barWidth: 5,
							data: [12, 11, 21, 13, 14, 11, 15, 22, 22, 23, 21, 23, 25, 14, 22, 20, 40, 12, 31],
							color: '#67bd85',
							right: ["70%", "100%"], //图的位置
						}]
					};
					myChart.setOption(option, true);
				}, 0)
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
		width: 300px;
		height: 40px;
		position: absolute;
		top: 165px;
		left: 50%;
		margin-left: -150px;
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
	
	.table {
		height: calc(100vh - 446px);
		border-bottom: 1px solid #dbdbdb;
	}
	
	.table thead tr td {
		height: 45px;
		line-height: 45px;
		border: 1px solid #dbdbdb;
		/* background-color: #dfe9ec; */
		background-image: linear-gradient(to bottom, #fafafa, #ecf4f8);
		font-weight: bold;
	}
	
	.table tbody tr td {
		height: 35px;
		line-height: 35px;
		border: 1px solid #dbdbdb;
	}
	
	#FSecharts {
		width: 100%;
		height: 300px;
	}
	/* #FSecharts2{
  width:100%;
  height: 200px;
} */
	
	.FSecharts {
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

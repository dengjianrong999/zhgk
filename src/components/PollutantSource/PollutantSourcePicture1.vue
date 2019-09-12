<template>
	<div style="width:100%;height:100%">
		<div id="myMap" style="width:100%;height:100%;">
		</div>
		<!-- 头部echarts -->
		<div class="topEcharts" :class="{'istopEcharts':isshowtop}">
			<i class="isshowtop" @click="showTop" :class="[{' outtop  iconfont  icon-arr-down-double-copy-copy':this.Isshowtopicon=false},{'iconfont  icon-arr-down-double-copy-copy-copy':this.Isshowtopicon=true}]"></i>
			<div class="topcharts" :class="{'istopEcharts':isshowtop}">
				<div id='topecarts1'></div>
				<div id='topecarts2'></div>
				<div id='topecarts3'></div>
			</div>
			<div class="butecharts" :class="{'istopEcharts':isshowtop}">
				<div id='topecarts4'></div>
				<div id='topecarts5'></div>
				<div id='topecarts6'></div>
			</div>

		</div>
		<!-- 侧边栏 -->
		<div class="lists">
			<div v-for="(item,index) in data" :key='index' @click="showLeft(item,index)">{{item.title}}</div>
		</div>
		<div class="leftslide" :class="{'moveLeft':leftShow}">
			<i class="leftbut iconfont icon-arr-down-double-copy" @click="slideLeft" :class="{'leftbuts iconfont icon-right_double':isShowLeft}"></i>
			<div class="leftmenu">
				<div class="oneMenuTop" :class="{'slideDown':item.changeflag}" v-for="(item,index) in data" :key='index'>
					<div class="topTitle" @click="slide(item,index)">
						<span>{{item.title}}</span>
						<span>{{item.name}}</span>
						<label class="checkbox-inline check-box">
										   <input type="checkbox">全选  
								  </label>
						<span>{{item.flage}}</span>
					</div>
					<ul>
						<li v-for="(ite,inde) in item.chirden" :key='inde'>
							<label class="checkbox-inline">
										   <input type="checkbox">{{ite.name}}  
								    </label>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 底部侧边栏 -->
		<div class="butmenu" :class="{'isshowtb':moreTable}">
			<div class="tabletop">
				<table>
					<thead>
						<tr>
							<td colspan='3'>审核数据</td>
						</tr>
						<tr>
							<td>监测因子</td>
							<td>监测时间</td>
							<td>监测值</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in  6">
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
				<table>
					<thead>
						<tr>
							<td colspan='3'>手工监测数据</td>
						</tr>
						<tr>
							<td>监测因子</td>
							<td>监测时间</td>
							<td>监测值</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in 6">
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
				<table>
					<thead>
						<tr>
							<td colspan='5'>比较监测结果数据</td>
						</tr>
						<tr>
							<td>对比监测日期</td>
							<td>检测因子</td>
							<td>手动监测值</td>
							<td>自动监测值</td>
							<td>对比结果</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in 6">
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="tabEacharts">
				<div>
					<i class="iconfont icon-tubiaozhexiantu"></i>
					<i class="iconfont icon-sanjiaoxingxia" @click="lideecharts" :class="{'icon-arr-down-double':isshowtEcharts}"></i>
				</div>
			</div>
			<div class="tablebut" :class="{'butEcharts':isshowtEcharts}">
				<div id="echarts1" style="width:30%;height:175px"></div>
				<div id="echarts2" style="width:30%;height:175px"></div>
				<div id="echarts3" style="width:40%;height:175px"></div>
			</div>
		</div>
		<!-- 右侧表格 -->
		<div class="rightTable" :class="{'IsRightTable':rightTable}">
			<div class="more" @click="isshowTable">更多</div>
			<div class="butTable">
				<table>
					<thead>
						<tr>
							<td colspan='8'>综合达标评价</td>
						</tr>
						<tr>
							<td>监测点位</td>
							<td>企业类型</td>
							<td>排口名称</td>
							<td>总监测次数</td>
							<td>达标次数</td>
							<td>达标占比</td>
							<td>不达标次数</td>
							<td>不达标占比</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in 6">
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
				<table>
					<thead>
						<tr>
							<td colspan='8'>单项污染物达标评价</td>
						</tr>
						<tr>
							<td>监测点位</td>
							<td>企业类型</td>
							<td>排口名称</td>
							<td>总监测次数</td>
							<td>达标次数</td>
							<td>达标占比</td>
							<td>不达标次数</td>
							<td>不达标占比</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in 8">
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
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
	import "./../../../static/echarts.min.js";

	export default {
		data: function() {
			return {
				Topecarts1: null,
				Topecarts2: null,
				Topecarts3: null,
				Topecarts4: null,
				Topecarts5: null,
				Topecarts6: null,
				isshowtop: false,
				isshowtEcharts: false, //是否显示echarts
				rightTable: true,
				moreTable: true,
				myChart1: null,
				myChart2: null,
				myChart3: null,
				leftShow: true,
				map: null,
				polygonLayer: null,
				data: [{
						title: '水',
						name: '废水重点点位',
						changeflag: true,
						flage: '》',
						icon: 'iconfont icon-zhixiang-copy',
						chirden: [{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
						]
					},
					{
						title: '气',
						name: '废气重点点位',
						changeflag: true,
						icon: 'iconfont icon-zhixiang-copy',
						flage: '》',
						chirden: [{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
						]
					},
					{
						title: '污',
						name: '污水处理厂点位',
						changeflag: true,
						icon: 'iconfont icon-zhixiang-copy',
						flage: '》',
						chirden: [{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
						]
					},
					{
						title: '重',
						name: '重金属点位',
						changeflag: true,
						icon: 'iconfont icon-zhixiang-copy',
						flage: '》',
						chirden: [{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
						]
					},
					{
						title: '危',
						name: '危废点位',
						changeflag: true,
						icon: 'iconfont icon-zhixiang-copy',
						flage: '》',
						chirden: [{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
							{
								name: '北京海达利薄膜开关有限公司'
							},
						]
					},
				],
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
					[40.188403, 116.666026],
					[40.186639, 116.67235],
					[40.098833, 116.755713],
					[40.227195, 116.602211],
					[40.198544, 116.549318],
					[40.170322, 116.5062],
					[40.257595, 116.513674],
					[40.138117, 116.778029],
					[40.062618, 116.646479],
					[40.047875, 116.632681],

					[40.070569, 116.818971],
					[40.164147, 116.832177],
					[40.236448, 116.608535],
					[40.243498, 116.748814],
					[40.269928, 116.74019],
					[40.154222, 116.953772],
					[40.119802, 116.897717],
					[40.13547, 116.883919]
				]
			};
		},

		mounted() {
			this.initMap();
			// this.resetWindow();
			this.initecharts1();
			this.initecharts2();
			this.initecharts3();
			this.initTopecharts1();
			this.initTopecharts2();
			this.initTopecharts3();
			this.initTopecharts4();
			this.initTopecharts5();
			this.initTopecharts6();
			// window.onresize = this.resetWindow();
		},
		methods: {
			initMap() {
				var _this = this;
				this.map = L.map("myMap", {
					center: [40.159662, 116.661427],
					zoom: 12,
					minZoom: 11,
					maxZoom: 18,
					crs: L.CRS.EPSGB3857,
					zoomControl: false
				});
				this.polygonLayer = new L.featureGroup();
				this.polygonLayer.addTo(this.map);
				var BaiDuMap = L.tileLayer.baiduLayer("Normal.Map");
				BaiDuMap.addTo(this.map);
				for(var i in bjsyPolygon.rings) {
					L.polygon(bjsyPolygon.rings[i].latlngs, {
							color: this.color[i]
						})
						.addTo(this.polygonLayer)
						.bindPopup("超标企业：2");
				}

				for(var i in this.fixedPoints) {
					L.marker(this.fixedPoints[i], {
							icon: L.icon({
								iconUrl: require("../../assets/images/大气监测_正常.png")
							})
						})
						.addTo(this.polygonLayer)
						.on('mouseover ', function(e) {
							e.target.bindPopup(_this.contentData()).openPopup();
						})
						.on('click', function() {
							_this.moreTable = !_this.moreTable;
							if(_this.moreTable == false) {
								_this.isshowtEcharts = false;
								console.log('11', _this.moreTable)
							}
						})

				}
			},
			// 点位  mark 信息
			contentData() {
				return '<div class="markcontetn">' +
					"<h4>XXXXXXX企业</h4>" +
					"<span>当前状态:开启</span><span>监测时间：2018.10.21</span>" +
					"<div class='marktables'>" +
					'<table class="marktable">' +
					'<thead>' +
					'<tr>' +
					'<td>污染物</td>' +
					'<td>检测值</td>' +
					'<td>是否超标</td>' +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					'<tr>' +
					'<td></td>' +
					'<td></td>' +
					'<td></td>' +
					'</tr>' +
					'<tr>' +
					'<td></td>' +
					'<td></td>' +
					'<td></td>' +
					'</tr>' +
					'<tr>' +
					'<td></td>' +
					'<td></td>' +
					'<td></td>' +
					'</tr>' +
					'<tr>' +
					'<td></td>' +
					'<td></td>' +
					'<td></td>' +
					'</tr>' +
					'<tr>' +
					'<td></td>' +
					'<td></td>' +
					'<td></td>' +
					'</tr>' +
					'</tbody>' +
					'</table>' +
					'</div>' +
					'</div>'
			},

			//菜单栏的收起展开
			slide(item, index) {
				item.changeflag = !item.changeflag;
				if(item.flage == "》") {
					item.flage = "《"
				} else {
					item.flage = "》"
				};
				if(item.icon == 'iconfont icon-zhixiang-copy') {
					item.icon = 'iconfont icon-guanbi1'
				} else {
					item.icon = 'iconfont icon-zhixiang-copy'
				}
			},
			//左侧菜单栏的收起展开
			slideLeft() {
				this.leftShow = !this.leftShow;
				this.isShowLeft = !this.isShowLeft;
				if(this.leftShow) {
					this.data.map(function(item) {
						item.changeflag = true;
						console.log('sss', item.changeflag)
					})
				} else {

				}

			},
			initecharts1() {
				this.myChart1 = echarts.init(document.getElementById("echarts1"));
				var option = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['监测点位', '监测因子', '检测值']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['20181011', '20181011', '20181011', '20181011']
					},
					yAxis: {
						type: 'value',
						name: '监测值(ug/m3)'
					},
					series: [{
							name: '监测点位',
							type: 'line',
							stack: '总量',
							data: [120, 132, 101, 134]
						},
						{
							name: '监测因子',
							type: 'line',
							stack: '总量',
							data: [220, 182, 191, 234]
						},
						{
							name: '检测值',
							type: 'line',
							stack: '总量',
							data: [150, 232, 201, 154]
						},
					]
				};

				this.myChart1.setOption(option);
			},
			initecharts2() {
				this.myChart2 = echarts.init(document.getElementById("echarts2"));
				var option = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['监测点位', '监测因子', '检测值']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['20181011', '20181011', '20181011', '20181011']
					},
					yAxis: {
						type: 'value',
						name: '监测值(ug/m3)'
					},
					series: [{
							name: '监测点位',
							type: 'line',
							stack: '总量',
							data: [120, 132, 101, 134]
						},
						{
							name: '监测因子',
							type: 'line',
							stack: '总量',
							data: [220, 182, 191, 234]
						},
						{
							name: '检测值',
							type: 'line',
							stack: '总量',
							data: [150, 232, 201, 154]
						},
					]
				};

				this.myChart2.setOption(option);
			},
			initecharts3() {
				this.myChart3 = echarts.init(document.getElementById("echarts3"));
				var option = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['所属街镇', '企业名称', '监测点名称', '对比监测日期', '检测因子', '手动监测值', '自动监测值', '对比结果']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['20181011', '20181011', '20181011', '20181011']
					},
					yAxis: {
						type: 'value',
						name: '监测值(ug/m3)'
					},
					series: [{
							name: '所属街镇',
							type: 'line',
							stack: '总量',
							data: [120, 132, 101, 134]
						},
						{
							name: '企业名称',
							type: 'line',
							stack: '总量',
							data: [220, 182, 191, 234]
						},
						{
							name: '监测点名称',
							type: 'line',
							stack: '总量',
							data: [150, 232, 201, 154]
						},
						{
							name: '对比监测日期',
							type: 'line',
							stack: '总量',
							data: [150, 232, 201, 154]
						},
						{
							name: '检测因子',
							type: 'line',
							stack: '总量',
							data: [150, 232, 201, 154]
						},
						{
							name: '手动监测值',
							type: 'line',
							stack: '总量',
							data: [150, 232, 201, 154]
						},
						{
							name: '自动监测值',
							type: 'line',
							stack: '总量',
							data: [150, 232, 201, 154]
						},
						{
							name: '对比结果',
							type: 'line',
							stack: '总量',
							data: [150, 232, 201, 154]
						}
					]
				};

				this.myChart3.setOption(option);
			},
			//点击  水  气  。。显示左边栏
			showLeft(item, index) {
				this.leftShow = !this.leftShow
				for(var i in this.data) {
					if(index == i) {
						this.data[i].changeflag = false;
						console.log('ssssssss', this.data[i].flage)
						this.data[i].flage = "《";
						this.isShowLeft = false;

					}
				};
			},
			isshowTable() {
				this.rightTable = !this.rightTable
			},
			lideecharts() {
				this.isshowtEcharts = !this.isshowtEcharts;
			},
			// 头部echarts
			showTop() {
				this.isshowtop = !this.isshowtop;
				this.Isshowtopicon = !this.Isshowtopicon;
			},
			initTopecharts1() {
				this.Topecarts1 = echarts.init(document.getElementById("topecarts1"));
				var option = {
					title: {
						text: '污染源分析',
						x: 'left',
						textStyle: {
							fontSize: 14,
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 15,
						top: 20,
						data: ['废水重点污染源', '废弃重点污染源', '城镇污水处理厂', '重金属重点污染源', '危险废物重点污染源']
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: ['40%', '60%'],
						center: ["65%", "50%"],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: true,
								position: 'outside',
								formatter: "{d}%"
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: true,
								length: 8, // 在 label 位置 设置为'outside'的时候会显示视觉引导线。
								length2: 12, // 视觉引导项第二段的长度。
							}
						},
						data: [{
								value: 335,
								name: '废水重点污染源'
							},
							{
								value: 310,
								name: '废弃重点污染源'
							},
							{
								value: 234,
								name: '城镇污水处理厂'
							},
							{
								value: 135,
								name: '重金属重点污染源'
							},
							{
								value: 1548,
								name: '危险废物重点污染源'
							}
						]
					}]
				};

				this.Topecarts1.setOption(option);

			},
			initTopecharts2() {
				this.Topecarts2 = echarts.init(document.getElementById("topecarts2"));
				var option = {
					title: {
						text: '具备监测条件分析',
						x: 'left',
						textStyle: {
							fontSize: 14,
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						x: 15,
						y: 20,
						orient: 'vertical',
						data: ['废水重点污染源', '废弃重点污染源', '城镇污水处理厂', '重金属重点污染源', '危险废物重点污染源']
					},
					calculable: true,
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['65%', '50%'],
						label: {
							normal: {
								show: true,
								position: 'outside',
								formatter: "{d}%"
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						data: [{
								value: 335,
								name: '废水重点污染源'
							},
							{
								value: 310,
								name: '废弃重点污染源'
							},
							{
								value: 234,
								name: '城镇污水处理厂'
							},
							{
								value: 135,
								name: '重金属重点污染源'
							},
							{
								value: 1548,
								name: '危险废物重点污染源'
							}
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				this.Topecarts2.setOption(option);

			},
			initTopecharts3() {
				this.Topecarts3 = echarts.init(document.getElementById("topecarts3"));
				var option = {
					title: {
						text: '监测条件分析',
						x: 'left',
						textStyle: {
							fontSize: 14,
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 15,
						top: 20,
						data: ['实际监测', '未监测']
					},

					series: [{
						name: '访问来源',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: true,
						label: {
							normal: {
								show: true,
								position: 'outside',
								formatter: "{d}%"
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: true
							}
						},
						data: [{
								value: 580,
								name: '实际监测'
							},
							{
								value: 420,
								name: '未监测'
							}
						]
					}]
				};

				this.Topecarts3.setOption(option);

			},
			initTopecharts4() {
				this.Topecarts4 = echarts.init(document.getElementById("topecarts4"));
				var option = {
					title: {
						text: '污染类型达标率统计',
						x: 'left',
						textStyle: {
							fontSize: 14,
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						x: 15,
						y: 20,
						orient: 'vertical',
						data: ['废水重点污染源', '废弃重点污染源', '城镇污水处理厂', '重金属重点污染源', '危险废物重点污染源']
					},
					calculable: true,
					series: [{
						name: '面积模式',
						type: 'pie',
						radius: [30, 80],
						center: ['65%', '50%'],
						roseType: 'area',
						label: {
							normal: {
								show: true,
								position: 'outside',
								formatter: "{d}%"
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: true,
								length: 8, // 在 label 位置 设置为'outside'的时候会显示视觉引导线。
								length2: 10, // 视觉引导项第二段的长度。
							}
						},
						data: [{
								value: 8,
								name: '废水重点污染源'
							},
							{
								value: 6,
								name: '废弃重点污染源'
							},
							{
								value: 5,
								name: '城镇污水处理厂'
							},
							{
								value: 4,
								name: '重金属重点污染源'
							},
							{
								value: 5,
								name: '危险废物重点污染源'
							}
						]
					}]
				};

				this.Topecarts4.setOption(option);

			},
			initTopecharts5() {
				this.Topecarts5 = echarts.init(document.getElementById("topecarts5"));
				var option = {
					title: {
						text: '污染源因子达标率统计分析',
						x: 'left',
						textStyle: {
							fontSize: 14,
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						x: 15,
						y: 20,
						orient: 'vertical',
						data: ['COD', '氨氮', 'SO2', '氮氧化物']
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['60%', '50%'],
						label: {
							normal: {
								show: true,
								position: 'outside',
								formatter: "{d}%"
							}
						},
						data: [{
								value: 335,
								name: 'COD'
							},
							{
								value: 310,
								name: '氨氮'
							},
							{
								value: 234,
								name: 'SO2'
							},
							{
								value: 135,
								name: '氮氧化物'
							}
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				this.Topecarts5.setOption(option);

			},
			initTopecharts6() {
				this.Topecarts6 = echarts.init(document.getElementById("topecarts6"));
				var option = {
					title: {
						text: '每个季度污染因子平均值占比',
						x: 'left',
						textStyle: {
							fontSize: 14,
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 15,
						y: 20,
						data: ['SO2', '氮氧化物', '氨氮', 'COD']
					},
					series: [{
							name: '访问来源',
							type: 'pie',
							selectedMode: 'single',
							radius: [0, '50%'],
							label: {
								normal: {
									show: true,
									position: 'inside',
									formatter: "{d}%"
								}
							},
							data: [{
									value: 335,
									name: '第一季度',
									selected: true
								},
								{
									value: 679,
									name: '第二季度'
								},
								{
									value: 1548,
									name: '第三季度'
								},
								{
									value: 1548,
									name: '第四季度'
								},
							]
						},
						{
							name: '访问来源',
							type: 'pie',
							radius: ['60%', '75%'],
							label: {
								normal: {
									show: false,
								},
							},
							data: [{
									value: 335,
									name: 'SO2'
								},
								{
									value: 310,
									name: '氮氧化物'
								},
								{
									value: 234,
									name: '氨氮'
								},
								{
									value: 135,
									name: 'COD'
								}
							]
						}
					]
				};
				this.Topecarts6.setOption(option);

			},
		}
	};
</script>
<style>
	.oneMenuTop ul {
		margin-bottom: 0px !important;
	}
	
	.leaflet-control {
		display: none;
	}
	
	.lists {
		position: absolute;
		z-index: 555;
		left: 10px;
		top: 120px;
	}
	
	.lists>div {
		width: 55px;
		height: 30px;
		line-height: 30px;
		border-radius: 30px;
		color: #333;
		font-size: 16px;
		margin-top: 30px;
		background-color: #fff;
		box-shadow: 1px 1px 1px rgb(95, 95, 95);
	}
	
	.leftmenu {
		overflow-y: scroll;
		overflow-x: hidden;
		height: 100%;
		border: 1px solid #dbdbdb;
		background-color: #fff;
		padding-top: 15px;
	}
	
	.leftslide {
		z-index: 666;
		position: absolute;
		top: 96px;
		left: 0px;
		width: 300px;
		background-color: #fff;
		padding: 12px 12px 12px 15px;
		height: calc(100% - 96px);
		transform: translate3d(0, 0, 0);
		transition: all 0.3s linear;
	}
	
	.leftslide.moveLeft {
		width: 0;
		padding: 0;
	}
	
	.leftbut {
		width: 20px;
		height: 40px;
		line-height: 40px;
		position: absolute;
		top: 50%;
		right: -20px;
		background-color: rgba(0, 0, 0, 0.3);
		display: none;
	}
	
	.leftslide:hover .leftbut {
		display: block;
		cursor: pointer;
	}
	
	.leftbuttonClass {
		height: 100%;
		width: 20px;
		float: left;
		align-items: center;
		display: grid;
	}
	
	.leftbuts {
		right: 0px;
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
		z-index: 99999;
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
		background-color: #fff;
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
		text-align: left;
		text-indent: 10px;
		border-bottom: 1px solid #dbdbdb;
	}
	
	.table {
		height: calc(100vh - 446px);
		padding: 10px;
		border-bottom: 1px solid #dbdbdb;
		overflow: scroll;
	}
	
	thead tr td {
		height: 27px;
		line-height: 27px;
		border: 1px solid #dbdbdb;
		background-color: #dfe9ec;
		font-weight: bold;
	}
	
	tbody tr td {
		height: 26px;
		line-height: 26px;
		border: 1px solid #dbdbdb;
		border-top: none;
	}
	
	#echarts1 {
		width: 100%;
		height: 300px;
	}
	
	.echarts {
		height: 300px;
	}
	
	.main-left:nth-child(1) {
		background-color: red;
	}
	/* //mark偏移量 */
	
	.leaflet-popup {
		position: absolute;
		text-align: center;
		bottom: -2px !important;
		left: -99px !important;
	}
	
	.leaflet-pane img {
		z-index: 666 !important;
		position: absolute;
	}
	
	.leaflet-popup-tip-container {
		height: 12px !important;
	}
	
	.leaflet-popup-content {
		margin: 0px !important;
	}
	
	.leaflet-popup-content-wrapper {
		border-radius: 5px !important;
	}
	
	.leaflet-container a.leaflet-popup-close-button {
		top: 0px;
		right: 0px;
		color: #fff;
	}
	
	.leaflet-container a.leaflet-popup-close-button:hover {
		color: #fff;
	}
	
	.oneMenuTop.slideDown {
		height: 30px;
		margin-bottom: 15px;
	}
	
	.topTitle {
		height: 30px;
		line-height: 30px;
		padding-left: 26px;
		border-radius: 12px;
		background-color: #dfe9ec;
		border-right: 1px solid #dbdbdb;
		cursor: pointer;
		position: relative;
	}
	
	.topTitle i {
		float: left;
		padding-right: 10px;
	}
	
	.oneMenuTop {
		overflow: hidden;
	}
	
	.oneMenuTop span:nth-child(1) {
		display: inline-block;
		width: 45px;
		height: 25px;
		line-height: 25px;
		border-radius: 30px;
		color: #333;
		font-size: 16px;
		position: absolute;
		left: 3px;
		top: 2px;
		background-color: #fff;
		-webkit-box-shadow: 1px 1px 12px #4e9bcc;
		box-shadow: 1px 1px 12px #4e9bcc;
	}
	
	.oneMenuTop span:nth-child(1).moveLefts {
		position: absolute;
		left: 20px;
		top: 80px;
		z-index: 9999;
		background-color: red;
	}
	
	.oneMenuTop span:nth-child(2) {
		width: 166px;
		display: inline-block;
		color: #333;
		font-size: 14px;
		float: left;
		padding-left: 40px;
		text-align: left;
	}
	
	.oneMenuTop span:nth-child(4) {
		position: absolute;
		right: 10px;
		top: 0px;
	}
	
	.oneMenuTop ul li {
		cursor: pointer;
		height: 27px;
		line-height: 27px;
		color: #666;
		text-align: left;
		text-indent: 20px;
		background-color: #fff;
	}
	
	.oneMenuTop ul li:nth-child(1) {}
	/* 底部菜单 */
	
	.butmenu {
		width: 100%;
		background: #fff;
		position: absolute;
		z-index: 888;
		bottom: 0;
		left: 0;
		transform: translate3d(0, 0, 0);
		transition: all 0.3s linear;
	}
	
	.isshowtbs {
		height: 10px;
		transform: translate3d(0, 0, 0);
		transition: all 0.3s linear;
	}
	
	.tabletop {
		display: flex;
		height: 240px;
		transition: all 0.3s linear;
		padding: 10px 10px 10px 0px;
		border: 1px solid #dbdbdb;
	}
	
	.isshowtb {
		height: 0px;
		padding: 0;
		margin-top: -24px;
		transform: translate3d(0, 0, 0);
		transition: all 0.3s linear;
	}
	
	.tabletop table {
		width: 30%;
		margin-left: 10px;
	}
	
	.tabletop table thead tr:nth-child(1) td,
	.butTable table thead tr:nth-child(1) td {
		background-color: #fff;
		border: none;
	}
	
	.tabletop table:nth-child(3) {
		width: 40%;
	}
	
	table thead tr:nth-child(1) {
		width: 100%;
		height: 28px;
		background-color: red;
	}
	
	.tablebut {
		height: 0px;
		display: flex;
		justify-content: center;
		align-content: center;
	}
	
	.butEcharts {
		height: 180px;
		transform: translate3d(0, 0, 0);
		transition: all 0.3s linear;
	}
	
	.icon-arr-down-double {
		transform: translate3d(0, 0, 0);
		transition: all 0.3s linear;
	}
	
	.tabEacharts>div {
		width: 100%;
		height: 30px;
		text-align: right;
	}
	/* //mark  信息 */
	
	h4 {
		margin-top: 0px;
		margin-bottom: 0px;
		text-align: left;
		color: #fff;
		height: 25px;
		line-height: 25px;
		background-color: #02adea;
		padding: 0px 8px;
		font-size: 14px;
		margin: -2px -1px 0px -1px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
	
	.marktables {
		padding: 5px 0px 5px 5px;
	}
	
	.markcontetn {
		background-color: #fff;
	}
	
	.markcontetn>span {
		display: inline-block;
		height: 20px;
		line-height: 20px;
		padding-left: 5px;
	}
	
	.markcontetn thead tr td {
		width: 70px;
		height: 24px !important;
		line-height: 24px !important;
		text-align: center;
		background-color: #dfe9ec;
	}
	
	.markcontetn tbody tr td {
		text-align: center;
		width: 70px;
		height: 20px;
	}
	
	thead tr td {
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.markcontetn thead,
	.tabletop thead,
	.butTable thead,
	.markcontetn tbody tr,
	.tabletop tbody tr,
	.butTable tbody tr {
		display: table;
		width: 100%;
		table-layout: fixed;
	}
	
	.markcontetn thead {
		width: calc(100% - 8px);
	}
	
	.tabletop thead {
		width: calc(100% - 9px);
	}
	
	.butTable thead {
		width: calc(100% - 9px);
	}
	
	tbody {
		display: block;
		overflow-y: scroll;
	}
	
	.markcontetn tbody {
		height: 100px;
	}
	
	.tabletop tbody,
	.butTable tbody {
		height: 162px;
	}
	/* // 右侧侧边栏 */
	
	.rightTable {
		position: absolute;
		right: 0;
		top: 120px;
		background-color: #fff;
		z-index: 666;
		padding: 10px;
		width: 600px;
		transform: translate3d(0, 0, 0);
		transition: all 0.3s linear;
		border: 1px solid #bdbdbd;
	}
	
	.rightTable table {
		width: 100%;
		margin-bottom: 10px;
	}
	
	.butTable tbody {
		width: 100% !important;
	}
	
	.IsRightTable {
		width: 0;
		padding: 0;
		transform: translate3d(0, 0, 0);
		transition: all 0.3s linear;
	}
	
	.more {
		width: 30px;
		height: 50px;
		line-height: 50px;
		background-color: aquamarine;
		position: absolute;
		left: -30px;
		top: 50%;
	}
	/* //input 美化 */
	
	.checkbox-inline {
		position: relative;
		padding-left: 8px;
		margin-right: 30px;
		vertical-align: middle;
	}
	
	.checkbox-inline:before {
		content: '';
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 1px solid #dbdbdb;
		background: #FFF;
		border-radius: 3px;
		position: absolute;
		top: 4px;
		left: 5px;
	}
	
	input[type=checkbox]:checked:before {
		content: '';
		display: inline-block;
		box-sizing: border-box;
		width: 6px;
		height: 12px;
		transform: rotate(45deg);
		border-width: 2px;
		border-style: solid;
		border-color: #00acea;
		border-top: 0;
		border-left: 0;
		position: absolute;
		top: 5px;
		left: 10px;
	}
	
	.checkbox-inline input[type=checkbox] {
		position: static !important;
		margin-right: 10px;
	}
	
	.check-box:before {
		left: -13px;
		top: 6px;
	}
	
	.check-box input[type=checkbox]:checked:before {
		left: -8px;
	}
	/* //input 美化 */
	/* // 头部echarts */
	
	.topEcharts {
		width: 100%;
		height: 450px;
		z-index: 777;
		background-color: #fff;
		position: absolute;
		top: 96px;
		left: 0px;
	}
	
	.istopEcharts {
		top: -450px;
	}
	
	.topEcharts .topcharts,
	.topEcharts .butecharts {
		width: 100%;
		height: 225px;
		display: flex;
	}
	
	#topecarts1,
	#topecarts2,
	#topecarts3,
	#topecarts4,
	#topecarts5,
	#topecarts6 {
		width: 33.3%;
		height: 100%;
		border: 1px solid #dbdbdb;
	}
	
	.isshowtop {
		width: 40px;
		height: 20px;
		line-height: 20px;
		background-color: rgba(0, 0, 0, 0.3);
		position: absolute;
		bottom: 0px;
		left: 50%;
		margin-left: -40px;
		z-index: 888;
	}
	
	.outtop {
		bottom: -116px;
	}
</style>
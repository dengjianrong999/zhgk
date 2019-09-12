<template>
	<div style="width:100%;height:100%">
		<div id="myMap" style="width:100%;height:100%;">
		</div>
		<div id="leftmuen" :class="['leftmuenClass',{'offsetLeft':changeflag}]">
			<div id="slide_btn" :class="['slde_button',{'slide':changeflag}]" @click="toggleContent()">
				<img id="leftimg" v-bind:src="lefimgsrc">
			</div>
			<div id="leftcontent" class="leftContentOne">
				<!-- 图表 -->
				<div class="lefts left-One">
					<div id="ecology-echarts"></div>
				</div>
				<!-- tab表格 -->
				<el-tabs type="border-card">
					<el-tab-pane label="指数(EI)排名">
						<div class="lefts left-Two">
							<div class="table-head">
								<table>
									<thead>
										<tr>
											<th width="90px">镇街名称</th>
											<th width="90px">时间</th>
											<th width="90px">El值</th>
											<th>排名</th>
										</tr>
									</thead>
								</table>
							</div>
							<div class="table-body">
								<table>
									<tbody>
										<tr v-for="item in indexRankList">
											<td width="90px">{{item.JDMC}}</td>
											<td width="90px">{{item.SJ}}</td>
											<td width="90px">{{item.EI}}</td>
											<td>{{item.PM}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="变化指数(EI)排名">
						<div class="lefts left-Three">
							<div class="table-head">
								<table>
									<thead>
										<tr>
											<th width="90px">镇街名称</th>
											<th width="90px">El值</th>
											<th width="90px">去年排名</th>
											<th>今年排名</th>
										</tr>
									</thead>
								</table>
							</div>
							<div class="table-body">
								<table>
									<tbody>
										<tr v-for="item in changeIndexRankList">
											<td width="90px">{{item.JDMC}}</td>
											<td width="90px">{{item.EI}}</td>
											<td width="90px">{{item.QNPM}}</td>
											<td>{{item.JNPM}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="生态质量考核排名">
						<div class="lefts left-Four">
							<div class="table-head">
								<table>
									<thead>
										<tr>
											<th width="90px">镇街名称</th>
											<th width="90px">El值</th>
											<th width="90px">考核指标El值</th>
											<th>排名</th>
										</tr>
									</thead>
								</table>
							</div>
							<div class="table-body">
								<table>
									<tbody>
										<tr v-for="item in stzlkhRankList">
											<td width="90px">{{item.JDMC}}</td>
											<td width="90px">{{item.EI}}</td>
											<td width="90px">{{item.KZBEI}}</td>
											<td>{{item.PM}}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>

			</div>
		</div>
		<!-- 跑马灯 -->
		<div class="horseRaceLamp">
			<ul id="con1" ref="con1" :class="{anim:animate==true}">
				<li v-for="ite in RaceLamp">
					<span>{{ite.name}}</span>
					<span>等级:<i>{{ite.Grade}}</i></span>
					<span>El值:<i>{{ite.El}}</i></span>
				</li>
			</ul>
		</div>
		<!-- 优良————右下角 -->
		<div class="rightCorner">
			<div class="right-Grade">
				<span>优</span>
				<span>良</span>
				<span>一般</span>
				<span>较差</span>
				<span>严重</span>
			</div>
			<div class="colour">
				<span id="excellent"></span>
				<span id="good"></span>
				<span id="commonly"></span>
				<span id="poor"></span>
				<span id="serious"></span>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
	import { bjsyPolygon } from './../../../static/json/bjsyPolygon.js';
	import './../../../static/echarts.min.js';

	export default {
		data: function() {
			return {
				map: null,
				//  L:null,
				polygonLayer: null,
				echartsPieDate:[],
				lefimgsrc: require('../../assets/images/zhixinag.png'),
				color: [
					'#359cde',
					'#7ea100',
					'#61a0a8',
					'#d48265',
					'#91c7ae',
					'#749f83',
					'#ca8622',
					'#bda29a',
					'#6e7074',
					'#546570',
					'#c4ccd3',
					'#359cde',
					'#7ea100',
					'#61a0a8',
					'#d48265',
					'#91c7ae',
					'#749f83',
					'#c23531',
					'#2f4554'
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
				],
				changeflag: false,
				indexRankList:[],
				changeIndexRankList:[],
				stzlkhRankList:[],
				
				// 跑马灯假数据
				animate: false,
				RaceLamp: []
			};
		},

		mounted() {
			//this.initMap();
			this.ecologys();
			this.getData();
			setInterval(this.scroll, 2500); // 跑马灯
		},
		methods: {
			getData(){
				let _this=this;
				//el指数排名
				_this.$http({
					url:_this.baseurl3+"zhgk/sthjzt/getEiInfo",
					method:'POST'
				}).then(function(res){
					if(res.status==200){
						_this.indexRankList=res.data;
						for(var i in res.data){
							var grade='';
							if(res.data[i].EI>=75){
								grade='优';
							}else if(res.data[i].EI>=55 && res.data[i].EI<75){
								grade='良';
							}else if(res.data[i].EI>=35 && res.data[i].EI<55){
								grade='一般';
							}else if(res.data[i].EI>=20 && res.data[i].EI<35){
								grade='较差';
							}else {
								grade='严重';
							}
							_this.RaceLamp.push({name:res.data[i].JDMC,El:res.data[i].EI,Grade:grade});
						}
						_this.initMap();
					}else{
						layer.msg("数据加载错误");
					}
				});
				//el指数变化排名
				_this.$http({
					url:_this.baseurl3+"zhgk/sthjzt/getChangeEiInfo",
					method:'POST'
				}).then(function(res){
					if(res.status==200){
						_this.changeIndexRankList=res.data;
					}else{
						layer.msg("数据加载错误");
					}
				});
				_this.$http({
					url:_this.baseurl3+"zhgk/sthjzt/getStzlkhInfo",
					method:'POST'
				}).then(function(res){
					if(res.status==200){
						_this.stzlkhRankList=res.data;
					}else{
						layer.msg("数据加载错误");
					}
				})
			},
			initMap() {
				this.map = L.map('myMap', {
					center: [40.159662, 116.661427],
					//center: [40.130201,116.66643],
					zoom: 12,
					//layers: [BaiDuMap],
					minZoom: 11,
					maxZoom: 18,
					crs: L.CRS.EPSGB3857,
					zoomControl: false
					//renderer : labelTextCollision
					// measureControl: true
				});
				this.polygonLayer = new L.featureGroup();
				this.polygonLayer.addTo(this.map);
				var BaiDuMap = L.tileLayer.baiduLayer('Normal.Map');
				BaiDuMap.addTo(this.map);
				
				for(var i in bjsyPolygon.rings) {
					var mycolor='';
					for(var n in this.RaceLamp){
						if(bjsyPolygon.rings[i].name== this.RaceLamp[n].name){
							console.log(this.RaceLamp[n]);
							if(this.RaceLamp[n].El>=75){
								mycolor='#6ace05';
							}else if(this.RaceLamp[n].El>=55 && this.RaceLamp[n].El<75){
								mycolor='#c2d57e';
							}else if(this.RaceLamp[n].El>=35 && this.RaceLamp[n].El<55){
								mycolor='#fad22d';
							}else if(this.RaceLamp[n].El>=20 && this.RaceLamp[n].El<35){
								mycolor='#fc8a00';
							}else {
								mycolor='#b05e4b';
							}
							
						}
					}

				
					L.polygon(bjsyPolygon.rings[i].latlngs, {
							color: mycolor
						})
						.addTo(this.polygonLayer);
						
				}

				for(var i in this.fixedPoints) {
					L.marker(this.fixedPoints[i], {
						icon: L.icon({
							iconUrl: require('../../assets/images/大气监测_正常.png'),
							iconAnchor:   [30, 50],
						})
					}).addTo(this.polygonLayer);
					//  L.marker(this.fixedPoints[i]).addTo(this.polygonLayer);
				}
			},
			toggleContent() {
				//$("#leftcontent").fadeToggle();

				if(this.lefimgsrc == require('../../assets/images/zhixinag.png')) {
					this.lefimgsrc = require('../../assets/images/zhixinag2.png');
				} else {
					this.lefimgsrc = require('../../assets/images/zhixinag.png');
				}
				this.changeflag = !this.changeflag;
			},
			// 图表
			ecologys() {
				var myChart = echarts.init(document.getElementById('ecology-echarts'));
				let _this=this;
				_this.$http({
					url:_this.baseurl3+'zhgk/sthjzt/getSthjdjCharData',
					method:'POST'
				}).then(function(res){
					if(res.status==200){
						for(var i in res.data){
							_this.echartsPieDate.push({name:res.data[i].DJ,value:res.data[i].NUM});
						}
						var option = {
					title: {
						text: '生态环境等级统计示意图',
						x: '15',
						textStyle: {
							color: '#333',
							fontSize: 14,
							fontWeight: 0
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					color: ['#b05e4b', '#fc8a00', '#fad22d', '#c2d57e','#6ace05'],
					legend: {
						orient: 'vertical',
						x: '15',
						y: '25',
						data: ['优', '良', '一般', '较差', '严重']
					},
					series: [{
						name: '生态环境等级',
						type: 'pie',
						radius: ['50%', '70%'],
						center: ['68%', '55%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: true,
								position: 'outside',
								formatter: '{d}%'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '12'
								}
							}
						},
						labelLine: {
							normal: {
								show: true,
								length: 8, // 在 label 位置 设置为'outside'的时候会显示视觉引导线。
								length2: 12 // 视觉引导项第二段的长度。
							}
						},

						data: _this.echartsPieDate
					}]
				};
				myChart.setOption(option);
					}else{
						layer.msg("数据加载错误");
					}
				});
				
				window.addEventListener('resize', function() {
					myChart.resize();
				});
			},
			// 跑马灯
			scroll() {
				this.animate = true;
				setTimeout(() => {
					this.RaceLamp.push(this.RaceLamp[0]);
					this.RaceLamp.shift();
					this.animate = false;
				}, 1500);
			}
		}
	};
</script>
<style scoped>
	.leftmuenClass{
		z-index: 99999;
		position: absolute;
		top: 96px;
		left: 0;
		height: 100%;
		width: 425px;
		display: -ms-inline-flexbox;
		display: inline-flex;
		box-shadow: 1px 5px 5px #5d5d5d;
		transform: translateZ(0);
		transition: all .3s linear;
	
	}
	.leftmuenClass.offsetLeft{
		left:-425px;
	}
	.MyLegendClass {
		position: absolute;
		top: 0;
		left: 0px;
		z-index: 100000;
		font-size: 12px;
		display: inline-flex;
		width: 400px;
		transition: all 0.3s linear;
	}
	
	.MyLegendClass.offsetLeft {
		left: -400px;
	}
	
	#slide_btn {
		position: absolute;
		right: 0;
		top: 50%;
		width: 22px;
		height: 54px;
		font-size: 20px;
		line-height: 54px;
		background: rgba(1, 49, 72, 0.5);
		color: #fff;
		cursor: pointer;
		z-index: 99999;
	}
	.slde_button{
		margin-top: -75px !important;
	}
	#slide_btn.slide {
		right: -22px;
	}
	/* 左侧高度 */
	
	.leftContentOne {
		height: -moz-calc(100% - 96px);
		height: -webkit-calc(100% - 96px);
		height: calc(100% - 96px);
		width: 425px;
		background-color: #ffffff;
	}
	
	#ecology-echarts {
		width: 100%;
		height: 100%;
	}
	/* 高度分四 */
	
	.left-One {
		width: 100%;
		height: 25%;
	}
	.left-Two,
	.left-Three,
	.left-Four{
		height: 100%;
	}
	.el-tab-pane{
		height: 100%;
	}
	.lefts span {
		width: 370px;
		height: 30px;
		line-height: 30px;
		margin: 0 15px;
		display: inline-block;
		text-align: left;
		font-size: 14px;
		color: #333;
		box-sizing: border-box;
	}
	
	.leftContentOne .el-tabs__nav {
		width: 100%;
	}
	
	.el-tabs--border-card>.el-tabs__content {
		height: 100%;
		padding: 0px !important;
	}
	
	.leftContentOne .el-tabs--border-card {
		border: none;
		height: 75%;
		box-shadow: none;
		overflow: auto;
	}
	
	.leftContentOne .el-tabs--border-card>.el-tabs__header {
		background: #ffffff;
		border-bottom: 1px solid #dedfdf;
	}
	
	.leftContentOne .el-tabs--border-card>.el-tabs__header .el-tabs__item {
		width: 33%;
		height: 30px;
		line-height: 30px;
		transition: none;
		border-bottom: 1px solid #dedfdf;
		font-size: 12px;
		color: #111;
	}
	
	.leftContentOne .el-tabs--border-card>.el-tabs__header .el-tabs__item:hover {
		color: #069adf;
	}
	
	.leftContentOne .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
		border-right: none;
		border-left: none;
		font-size: 12px;
		font-weight: 600;
		color: #069adf;
	}
	/* 表格 */
	.lefts table {
		width: 370px !important;
		height: 80%;
		/* margin: 0 15px !important; */
		vertical-align: middle !important;
		box-sizing: border-box !important;
	}
	
	.lefts thead,
	.lefts thead,
	.lefts thead,
	.lefts tbody tr,
	.lefts tbody tr,
	.lefts tbody tr {
		display: table;
		width: 100%;
		table-layout: fixed;
	}
	
	.lefts tbody {
		width: 100%;
		height: -moz-calc(100% - 31px);
		height: -webkit-calc(100% - 31px);
		height: calc(100% - 31px);
		display: block;
		
	}
	
	.lefts table tbody tr {
		height: 26px !important;
	}
	
	.lefts table tr th {
		height: 30px !important;
		/* background: #dfe9ec; */
		background-image: linear-gradient(to bottom, #fafafa, #ecf4f8);
		font-weight: bold;
	}
	
	.lefts table tr th,
	.lefts table tr td {
		border: 1px solid #dbdbdb;
		text-align: center !important;
		vertical-align: middle !important;
		font-size: 12px;
	}
	
	.lefts table tbody tr td {
		border-top: none !important;
	}
	
	.lefts table tr th {
		color: #333;
	}
	
	.lefts table tr td {
		color: #666;
	}
	
	.lefts table tbody tr:nth-child(even) {
		/* background: #f6fbfc; */
		background: #f9f9f9;
	}

	.lefts table tbody tr:hover {
	background-color: #edf5f9;
}
	
	.lefts table {
		height: 100%;
	}
	/* 跑马灯 */
	
	.horseRaceLamp {
		width: 384px;
		height: 34px;
		line-height: 34px;
		background-color: #ffffff;
		position: absolute;
		top: 106px;
		left: 50%;
		margin-left: -192px;
		z-index: 999999;
		border-radius: 50px;
		box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.35);
		display: -webkit-inline-box;
		display: -ms-inline-flexbox;
		display: inline-flex;
		overflow: hidden;
		transition: all 0.5s;
	}
	
	.anim {
		transition: all 1.5s;
		margin-top: -34px;
	}
	
	#con1 {
		width: 384px;
	}
	
	.anim li {
		list-style: none;
		line-height: 34px;
		height: 34px;
	}
	
	#con1 li span {
		width: 30%;
		height: 100%;
		display: inline-block;
		font-size: 16px;
		color: #00acea;
	}
	
	#con1 li span:nth-child(1) {
		text-align: right;
	}
	
	#con1 li span:nth-last-child(1) {
		text-align: left;
	}
	
	#con1 li span i {
		font-weight: bold;
		margin-left: 5px;
	}
	/* 右下角 */
	
	.rightCorner {
		width: 200px;
		height: 30px;
		position: absolute;
		bottom: 20px;
		right: 20px;
		z-index: 99999;
	}
	
	.right-Grade {
		width: 100%;
		height: 20px;
		font-size: 14px;
		color: #111;
	}
	
	.right-Grade span {
		width: 20%;
		height: 20px;
		display: inline-block;
		float: left;
	}
	
	.colour {
		width: 100%;
		height: 10px;
	}
	
	.colour span {
		width: 20%;
		height: 10px;
		display: inline-block;
		float: left;
	}
	
	#excellent {
		background: #6ace05;
	}
	
	#good {
		background: #c2d57e;
	}
	
	#commonly {
		background: #fad22d;
	}
	
	#poor {
		background: #fc8a00;
	}
	
	#serious {
		background: #b05e4b;
	}
</style>
<template>
	<div style="width:100%;height:100%" class="Pollut">
		<div id="myMap" style="width:100%;height:100%;">
		</div>
		<!-- 头部echarts -->
		<div class="topEcharts" :class="{'istopEcharts':isshowtop}">
			<i class="isshowtop " @click="showTop" :class="Isshowtopicon?'iconfont outtop icon-arr-down-double-copy-copy-copy' :' iconfont icon-arr-down-double-copy-copy   '"></i>
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
			<i class="leftbut" @click="slideLeft" :class="isShowLeft?'iconfont  icon-right_double':'leftbuts iconfont icon-arr-down-double-copy'"></i>
			<div class="leftmenu">
				<div class="oneMenuTop" :class="{'slideDown':item.changeflag}" v-for="(item,index) in data" :key='index'>
					<div class="topTitle" :style="item.isCheckedAll?item.contentStyle:''"  @click="slide(item,index)">
						<i :class="item.icon" :style="item.isCheckedAll?item.contentStyle:''" ></i>
						<span :style="item.isCheckedAll?item.contentStyle1:''">{{item.title}}</span>
						<label class="checkbox-inline check-box">
							<input type='checkbox' class='input-checkbox' :checked="item.isCheckedAll" @click='checkedAll(item,index)'>
						</label>
					</div>
					<ul>
						<li v-for="(ite,inde) in item.children" :key='inde'>
							<label class="checkbox-inline">
								<input  type='checkbox'  v-model='item.selectedData' :value ='ite.POLLUTION_NAME' @click="check(index,inde)"  name='checkboxinput' class='input-checkbox'>
								<a class="selectTwo">{{ite.POLLUTION_NAME}}</a>
							 </label>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 底部侧边栏 -->
		<div class="butmenu" :class="[{'isshowtb':moreTable},{'butEcharts':isshowtEcharts}]">
			<i ref='iconttop' class="isshowbut" @click="isshowbut" :class="Isshowbuticon?'iconfont  icon-arr-down-double-copy-copy' :' iconfont  buticon icon-arr-down-double-copy-copy-copy'"></i>
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
						<tr v-for="(item,index) in  shList">
							<td>{{item.JCYZ}}</td>
							<td>{{item.JCSJ}}</td>
							<td>{{item.JCZ}}</td>
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
						<tr v-for="(item,index) in sgjcList">
							<td>{{item.SDJCZ}}</td>
							<td>{{item.JCSJ}}</td>
							<td>{{item.JCYZ}}</td>
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
						<tr v-for="(item,index) in bjjcjgList">
							<td>{{item.DBJCRQ}}</td>
							<td>{{item.JCYZ}}</td>
							<td>{{item.SDJCZ}}</td>
							<td>{{item.JCZ}}</td>
							<td>{{item.DBJG}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="tabEacharts">
				<div>
					<i class="iconfont icon-tubiaozhexiantu"></i>
					<i @click="lideecharts" :class="isshowtEcharts ?'iconfont icon-arr-down-double-copy-copy' :'iconfont icon-arr-down-double-copy-copy-copy'"></i>
				</div>
			</div>
			<div class="tablebut">
				<div id="echarts1" style="width:30%;height:175px"></div>
				<div id="echarts2" style="width:30%;height:175px"></div>
				<div id="echarts3" style="width:40%;height:175px"></div>
			</div>
		</div>
		<!-- 右侧表格 -->
		<div class="rightTable" :class="{'IsRightTable':rightTable}">
			<i class="rightShow" @click="isshowTable" :class="isrightShow?'rightshows iconfont icon-right_double':'iconfont icon-arr-down-double-copy'"></i>
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
						
						<tr v-for="(item,index) in zhpjdbList">
							<td :title='item.JCDW'>{{item.JCDW}}</td>
							<td :title='item.QYLX'>{{item.QYLX}}</td>
							<td :title='item.PKMC'>{{item.PKMC}}</td>
							<td :title='item.ZJCCS'>{{item.ZJCCS}}</td>
							<td :title='item.DB'>{{item.DB}}</td>
							<td :title='item.DBZB'>{{item.DBZB.toFixed(2)*100+"%"}}</td>
							<td :title='item.BDB'>{{item.BDB}}</td>
							<td :title='item.BDBZB'>{{item.BDBZB.toFixed(2)*100+"%"}}</td>
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
						<tr v-for="(item,index) in zhpjdbList">
							<td :title='item.JCDW'>{{item.JCDW}}</td>
							<td :title='item.QYLX'>{{item.QYLX}}</td>
							<td :title='item.PKMC'>{{item.PKMC}}</td>
							<td :title='item.ZJCCS'>{{item.ZJCCS}}</td>
							<td :title='item.DB'>{{item.DB}}</td>
							<td :title='item.DBZB'>{{item.DBZB.toFixed(2)*100+"%"}}</td>
							<td :title='item.BDB'>{{item.BDB}}</td>
							<td :title='item.BDBZB'>{{item.BDBZB.toFixed(2)*100+"%"}}</td>
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
				isshowtop: true,
				Isshowtopicon: false, //头部是否显示
				isShowLeft: false, //左边栏是否显示
				isrightShow: false, //右侧是否显示
				Isshowbuticon: false, //底部是否显示
				isshowtEcharts: false, //是否显示echarts
				rightTable: true,
				moreTable: true,
				myChart1: null,
				myChart2: null,
				myChart3: null,
				leftShow: true,
				echartsXdata2:[],
				seriesData2:[],
				contentList:[], //用来显现点位hover；
				timeList:[], //用来显现点位hover；
				zhpjdbList:[], //右边综合评价达标
				dxwrwdbList:[], //右边单项污染物达标
				map: null,
				polygonLayer: null,
				pollutionName: [
					[],
					[],
					[],
					[],
					[]
				], // 名字 经纬度
				checkPollutionName: [
					[],
					[],
					[],
					[],
					[]
				], // 勾选
				pollutionMarkers: [
					[],
					[],
					[],
					[],
					[]
				], //点
				tableArr: [{
						"UNIT_CODE": "123456",
						"MONIORFACTOR": "cod",
						"MEASUREVALUE": 13,
						"TIME": "2018-06-01 00:00:00"
					},
					{
						"UNIT_CODE": "123456",
						"MONIORFACTOR": "氨氮",
						"MEASUREVALUE": 23,
						"TIME": "2018-06-01 00:00:00"
					}
				],
				tableHandMadeArr: [{
						"UNIT_CODE": "12345",
						"CY_TIME": "2018-10-19 00:00:00",
						"MEASUREVALUE": "22",
						"MONITOR_PROJECT": "COD"
					},
					{
						"UNIT_CODE": "12345",
						"CY_TIME": "2018-10-19 00:00:00",
						"MEASUREVALUE": "18",
						"MONITOR_PROJECT": "氨氮"
					}
				],
				shList:[],
				sgjcList:[],
				bjjcjgList:[],
				isCheckedAll: false,
				data: [{
						title: '水',
						changeflag: true,
						isCheckedAll: false,
						icon: 'iconfont icon-shui1',
						contentStyle:{'color':'#fff','background-image':'-webkit-linear-gradient(90deg, #00acea 0%, #75d4f6 100%)'},
						contentStyle1:{'color':'#fff'},
						children: [],
						selectedData: []
					},
					{
						title: '气',
						changeflag: true,
						isCheckedAll: false,
						icon: 'iconfont icon-kongqiwu',
						contentStyle:{'color':'#fff','background-image':'-webkit-linear-gradient(90deg, #00acea 0%, #75d4f6 100%)'},
						contentStyle1:{'color':'#fff'},
						children: [],
						selectedData: []
					},
					{
						title: '污',
						changeflag: true,
						isCheckedAll: false,
						icon: 'iconfont icon-turang1',
						contentStyle:{'color':'#fff','background-image':'-webkit-linear-gradient(90deg, #00acea 0%, #75d4f6 100%)'},
						contentStyle1:{'color':'#fff'},
						children: [],
						selectedData: []
					},
					{
						title: '重',
						changeflag: true,
						isCheckedAll: false,
						icon: 'iconfont icon-leijinshucailiaox',
						contentStyle:{'color':'#fff','background-image':'-webkit-linear-gradient(90deg, #00acea 0%, #75d4f6 100%)'},
						contentStyle1:{'color':'#fff'},
						children: [],
						selectedData: []
					},
					{
						title: '危',
						changeflag: true,
						isCheckedAll: false,
						icon: 'iconfont icon-weixianwupin-',
						contentStyle:{'color':'#fff','background-image':'-webkit-linear-gradient(90deg, #00acea 0%, #75d4f6 100%)'},
						contentStyle1:{'color':'#fff'},
						children: [],
						selectedData: []
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
			// this.initecharts1();
			// this.initecharts2();
			// this.initecharts3();
			this.initTopecharts1();
			this.initTopecharts2();
			this.initTopecharts3();
			this.initTopecharts4();
			this.initTopecharts5();
			this.initTopecharts6();
			// this.initrighttable();
			
			// this.getTableInfo();
			// window.onresize = this.resetWindow();
			
			//setTimeout(this.checkedAll(this.data[0],0),5000);
			
		
		
			
		},
		watch: {
			data: {
				handler: function(val, oldVal) {
					let _this = this;
					this.data.map((item, index) => {
						if(item.children.length && item.selectedData.length == item.children.length) {
							item.isCheckedAll = true;
						} else {
							item.isCheckedAll = false;
						}
						console.log(item.selectedData)
						_this.checkPollutionName[index] = item.selectedData;
					});

					this.removePoint();
					this.addPoint();
				},
				deep: true
			}
		},
		methods: {
			check(firstIndex, secondIndex) { // 点击每一项（第一层数组的序号，第二层数组的序号）
				let _this = this;
				this.pollutionName.map((item, index) => {
					if(index == firstIndex) {
						item.map((point, idx) => {
							if(secondIndex == idx) {
								let pointLATLON = [];
								pointLATLON.push(point.LATITUDE, point.LONGITUDE);
								_this.map.flyTo(pointLATLON, 12);
							}
						})
					}
				});
			},
			initrighttable(){
				let _this = this;
				_this.$http({
					url:_this.baseurl3+"wryzt/getDxpjData",
					method:'post'
				}).then(function(res){
					if(res.status==200){
						_this.dxwrwdbList=res.data;
					}
				});
				_this.$http({
					url:_this.baseurl3+"wryzt/getZhpjData",
					method:'post'
				}).then(function(res){
					if(res.status==200){
						_this.zhpjdbList=res.data;
					}
				})
			},
			checkedAll(item, index) {
				 console.log(item);
				let _this = this;
				_this.checkPollutionName[index] = [];
				if(!item.isCheckedAll) { //全选
				     _this.leftMemuShowFlag = true;
					item.selectedData = [];
					item.children.map(function(water, idx) {
						item.selectedData.push(water.POLLUTION_NAME);
					})
					_this.checkPollutionName[index] = item.selectedData;
					
				} else { //全不选
					item.selectedData = [];
				}
			},
			initMap() {
				var _this = this;
				this.map = L.map("myMap", {
					center: [40.159662, 116.661427],
					zoom: 12,
					zoomSnap: 0.2,
					wheelPxPerZoomLevel: 120,
					worldCopyJump: true,
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
						.addTo(this.polygonLayer);
				}

				/*
				 *  mark
				 */
				// for (var i in this.fixedPoints) {
				// L.marker(this.data[3].children[0].Lon, {
				//   icon: L.icon({
				//     iconUrl: require("../../assets/images/大气监测_正常.png")
				//   })
				// })
				//   .addTo(this.polygonLayer)
				//   .on('mouseover ',function(e){
				//     e.target.bindPopup(_this.contentData()).openPopup();
				//   })
				//   .on('mouseout',function(e){
				//    e.target.closePopup();
				//   })
				//   .on('click',function(){
				//      _this.moreTable = !_this.moreTable;
				//      _this.Isshowbuticon = !_this.Isshowbuticon;
				//     if(_this.moreTable == true){
				//         _this.isshowtEcharts = false;
				//       }
				//       if( _this.moreTable == true && _this.isshowtEcharts  == false ){
				//         _this.$refs.iconttop.style.top =  -200+'px';
				//       }else if(_this.moreTable == false && _this.isshowtEcharts  == false){
				//         _this.$refs.iconttop.style.top =  0+'px';
				//       }else if(_this.moreTable == true && _this.isshowtEcharts  == true){
				//         _this.$refs.iconttop.style.top =  0+'px';
				//       }
				//   })
				// }

				this.getWaterInfo();
			},
			addPoint() { //循环 添加点
				let _this = this;
				this.checkPollutionName.map(function(classify, i) { //checkPollutionName[[],[],[],[],[]] 选中的点的信息
					_this.pollutionName.map(function(name, j) { // pollutionName[[],[],[],[],[]]  所有点的信息 名字 经纬度
						_this.point(classify, name, _this, i, j);
					})
				})
			},
			point(classify, name, _this, i, j) {
				if(i == j) {
					classify.map(function(item, idx) {
						name.map(function(water, index) {
							let timer = null;
							if(item == water.POLLUTION_NAME) {
								let pointLATLON = [];
								pointLATLON.push(water.LATITUDE, water.LONGITUDE);
								let picName = '';
								switch(i) {
									case 0:
										picName = '水';
										break;
									case 1:
										picName = '气';
										break;
									case 2:
										picName = '污';
										break;
									case 3:
										picName = '重';
										break;
									case 4:
										picName = '危';
										break;
								}
								let aMarker = L.marker(pointLATLON, {
										icon: L.icon({
											iconUrl: require("../../assets/images/" + picName + ".png"),
											iconAnchor:   [30, 50],
											popupAnchor: [0, -50],
										})
									})
									.addTo(_this.polygonLayer)
									.on('mouseover', function(e) {
										_this.getTableInfo(name[index].UNITCODE);
										setTimeout(function(){
											e.target.bindPopup(_this.contentData(water.POLLUTION_NAME,_this.contentList,_this.timeList)).openPopup();
										},500);
										// for(var i=0;i<5000;i++){
										// 	if(i=4999){
										// 		e.target.bindPopup(_this.contentData(water.POLLUTION_NAME,_this.contentList,_this.timeList)).openPopup();
										// 	}
										// };
										
									})
									.on('mouseout', function(e) {
										setTimeout(function(){e.target.closePopup();},1000)
										// timer = setTimeout(function() {
										// 	e.target.closePopup();
										// 	clearTimeout(timer);
										// }, 1000)
										// e.target.closePopup();
									})
									.on('click', function() {
										console.log("jjjjjjjjj")
										_this.moreTable = !_this.moreTable;
										_this.Isshowbuticon = !_this.Isshowbuticon;
										if(_this.moreTable == true) {
											_this.isshowtEcharts = false;
										}
										if(_this.moreTable == true && _this.isshowtEcharts == false) {
											_this.$refs.iconttop.style.top = -200 + 'px';
										} else if(_this.moreTable == false && _this.isshowtEcharts == false) {
											_this.$refs.iconttop.style.top = 0 + 'px';
										} else if(_this.moreTable == true && _this.isshowtEcharts == true) {
											_this.$refs.iconttop.style.top = 0 + 'px';
										}
										
										// _this.getTableInfo(name[index].UNITCODE);
									})
								_this.pollutionMarkers[index].push({
									'name': item,
									'marker': aMarker
								});
							}
						})
					});

				}
			},
			removePoint() { // 删除所有地图的marker
				let _this = this;
				this.checkPollutionName.map(function(item, idx) {
					if(_this.pollutionMarkers[idx].length == 0) return;
					_this.pollutionMarkers.map(function(pointArr, index) {
						pointArr.map(function(point, i) {
							point.marker.remove();
						});
					});
					_this.pollutionMarkers[idx] = [];
				})
			},
			getTableInfo(id) { // 下方表格数据
				let _this = this;
				
				_this.$http({
					url:_this.baseurl3+'wryzt/getShData',
					method:'post',
					params:{unitcode:id}
					
				}).then(function(res){
					if(res.status==200){
						let legendData=[];
						let echartsXdata=[];
						let seriesData=[];
						_this.shList=res.data
						for(var i in res.data){
							if(legendData.indexOf(res.data[i].JCYZ)==-1){
								legendData.push(res.data[i].JCYZ)
							}
							if(echartsXdata.indexOf(res.data[i].JCSJ)==-1){
								echartsXdata.push(res.data[i].JCSJ);
							}
						}
						let temp;
						for(var i=0;i<echartsXdata.length;i++){//时间从小到大排序
							for(var j=0;j<echartsXdata.length;j++){
								if(echartsXdata[i]<echartsXdata[j]){
									temp=echartsXdata[i];
									echartsXdata[i]=echartsXdata[j];
									echartsXdata[j]=temp;
								}
							}
						}
						
						for(var i in legendData){
							seriesData.push({name:legendData[i],type:"line",data:[]})
						}
						//根据时间和监测因子给series赋值
						for(var i in echartsXdata){
							for(var j in res.data){
								if(echartsXdata[i]==res.data[j].JCSJ){
									for(var k in seriesData){
										if(seriesData[k].name==res.data[j].JCYZ){
											seriesData[k].data.push(res.data[j].JCZ);
										}
									}
								}
							}
						}
						if(_this.myChart1!=null && _this.myChart1!=""){
							_this.myChart1.clear();
						}
						_this.initecharts1(legendData,echartsXdata,seriesData);
						
					}else{
						layer.msg("数据加载错误");
					}
				});
				//手工监测数据图表
				_this.$http({
					url:_this.baseurl3+"wryzt/getSgjcData",
					method:'post',
					params:{unitcode:id}
				}).then(function(res){
					if(res.status==200){
						let legendData2=[];
						 _this.echartsXdata2=[];
						 _this.seriesData2=[];
						
						_this.sgjcList=res.data;
						//console.log(res.data);
						for(var i in res.data){
							if(legendData2.indexOf(res.data[i].JCYZ)==-1){
								legendData2.push(res.data[i].JCYZ);
							}
							if(_this.echartsXdata2.indexOf(res.data[i].JCSJ)==-1){
								_this.echartsXdata2.push(res.data[i].JCSJ)
							}
						}

						let temp2;
						for(var i=0;i<_this.echartsXdata2.length;i++){//时间从小到大排序
							for(var j=0;j<_this.echartsXdata2.length;j++){
								if(_this.echartsXdata2[i]<_this.echartsXdata2[j]){
									temp2=_this.echartsXdata2[i];
									_this.echartsXdata2[i]=_this.echartsXdata2[j];
									_this.echartsXdata2[j]=temp2;
								}
							}
						}
						 
						for(var i in legendData2){
							_this.seriesData2.push({name:legendData2[i],type:"line",data:[]});
							
						}
						
						for(var i in _this.echartsXdata2){
							for(var j in res.data){
								if(_this.echartsXdata2[i]==res.data[j].JCSJ){
									for(var k=0 ;k<_this.seriesData2.length;k++){
										if(_this.seriesData2[k].name==res.data[j].JCYZ){
											_this.seriesData2[k].data.push(res.data[j].SDJCZ);
											
										}
										
									}
								}
							}
						}
						 
						if(_this.myChart2!=null && _this.myChart2!=""){
							_this.myChart2.clear();
						}
						
						
						 _this.initecharts2(legendData2,_this.echartsXdata2,_this.seriesData2);

					}
				});
				_this.$http({
					url:_this.baseurl3+"wryzt/getBjjcData",
					method:'post',
					params:{unitcode:id}
				}).then(function(res){
					if(res.status=200){
						let legendData3=[];
						let echartsXdata3=[];
						let seriesData3=[];
						_this.contentList=[];
						_this.bjjcjgList=res.data;
						for(var i in res.data){
							if(legendData3.indexOf(res.data[i].JCYZ)==-1){
								legendData3.push(res.data[i].JCYZ);
							}
							if(echartsXdata3.indexOf(res.data[i].DBJCRQ)==-1){
								echartsXdata3.push(res.data[i].DBJCRQ);
							}
						}
						for(var i in legendData3){
							seriesData3.push({name:legendData3[i],type:"line",data:[]});
							_this.contentList.push({name:legendData3[i],data:[],stauts:[]});
						}
						let temp3;
						for(var i=0;i<echartsXdata3.length;i++){//时间从小到大排序
							for(var j=0;j<echartsXdata3.length;j++){
								if(echartsXdata3[i]<echartsXdata3[j]){
									temp3=echartsXdata3[i];
									echartsXdata3[i]=echartsXdata3[j];
									echartsXdata3[j]=temp3;
								}
							}
						}
						_this.timeList=echartsXdata3;
						for(var i in echartsXdata3){
							for(var j in res.data){
								if(echartsXdata3[i]==res.data[j].DBJCRQ){
									for(var k=0 ;k<seriesData3.length;k++){
										if(seriesData3[k].name==res.data[j].JCYZ){
											seriesData3[k].data.push(res.data[j].JCZ);
											_this.contentList[k].data.push(res.data[j].JCZ);
											_this.contentList[k].stauts.push(res.data[i].DBJG=="正常"?"否":"是");
										}
									}
								}
							}
						}
						if(_this.myChart3!=null && _this.myChart3!=""){
							_this.myChart3.clear();
						}
						_this.initecharts3(legendData3,echartsXdata3,seriesData3);
					}
				})
				
			},
			getWaterInfo() { // 获取第一个污水数据
				let _this = this;
				this.$http({
					url: _this.baseurl3 + 'wryzt/getWaterInfo',
					// url:`${this.baseurl}wryzt/water/getWaterUnitInfo`,
					method: 'post',
					data: {},
				}).then(res => {
					
					if(res.status === 200) {
						_this.data[0].children = res.data;
						_this.data[0].children.map(function(water, index) {
							let allInfo = {
								POLLUTION_NAME: water.POLLUTION_NAME,
								LATITUDE: parseFloat(water.LAT),
								LONGITUDE: parseFloat(water.LON),
								UNITCODE: water.UNITCODE
							};
							_this.pollutionName[0].push(allInfo);
							_this.checkedAll(_this.data[0],0);
						})
					}
				}).catch(function(error) {
					console.log(error);
				});

				_this.$http({
					url:_this.baseurl3+"wryzt/getGasInfo",
					method:'post',					
				}).then(function(res){
					if(res.status==200){
						_this.data[1].children=res.data;
						_this.data[1].children.map(function(gas,index){
							let allInfo={
								POLLUTION_NAME: gas.POLLUTION_NAME,
								LATITUDE: parseFloat(gas.LAT),
								LONGITUDE: parseFloat(gas.LON),
								UNITCODE: gas.UNITCODE
							}
							_this.pollutionName[1].push(allInfo);
							_this.checkedAll(_this.data[1],1);
						})
					}
				});

				_this.$http({
					url:_this.baseurl3+"wryzt/getSewageInfo",
					method:'post'
				}).then(function(res){
					if(res.status==200){
						_this.data[2].children=res.data;
						_this.data[2].children.map(function(sewage,index){
							let allInfo={
								POLLUTION_NAME: sewage.POLLUTION_NAME,
								LATITUDE: parseFloat(sewage.LAT),
								LONGITUDE: parseFloat(sewage.LON),
								UNITCODE: sewage.UNITCODE
							}
							_this.pollutionName[2].push(allInfo);
							_this.checkedAll(_this.data[2],2);
						})
					}
				});

				_this.$http({
					url:_this.baseurl3+"wryzt/getMetalInfo",
					method:'post'
				}).then(function(res){
					if(res.status==200){
						_this.data[3].children=res.data;
						_this.data[3].children.map(function(metal,index){
							let allInfo={
								POLLUTION_NAME: metal.POLLUTION_NAME,
								LATITUDE: parseFloat(metal.LAT),
								LONGITUDE: parseFloat(metal.LON),
								UNITCODE: metal.UNITCODE
							}
							_this.pollutionName[3].push(allInfo);
							_this.checkedAll(_this.data[3],3);
						})
					}
				});
				_this.$http({
					url:_this.baseurl3+"wryzt/getWasteInfo",
					method:'post'
				}).then(function(res){
					if(res.status==200){
						_this.data[4].children=res.data;
						_this.data[4].children.map(function(Waste,index){
							let allInfo={
								POLLUTION_NAME: Waste.POLLUTION_NAME,
								LATITUDE: parseFloat(Waste.LAT),
								LONGITUDE: parseFloat(Waste.LON),
								UNITCODE: Waste.UNITCODE
							}
							_this.pollutionName[4].push(allInfo);
							_this.checkedAll(_this.data[4],4);
						})
					}
				})

				// this.data.map(function(item, index) {
				// 	if(index != 0) {
				// 		_this.data[index].children = [{
				// 				POLLUTION_NAME: '污染源' + index + '1',
				// 				LATITUDE: 40.160226 + Math.random() / 10,
				// 				LONGITUDE: 116.732211 + Math.random() / 10,
				// 				UNITCODE: 123123
				// 			},
				// 			{
				// 				POLLUTION_NAME: '污染源' + index + 2,
				// 				LATITUDE: 40.166404 + Math.random() / 10,
				// 				LONGITUDE: 116.774685 + Math.random() / 10,
				// 				UNITCODE: 112233
				// 			}
				// 		];
				// 		_this.data[index].children.map(function(water) {
				// 			let allInfo = {
				// 				POLLUTION_NAME: water.POLLUTION_NAME,
				// 				LATITUDE: water.LATITUDE,
				// 				LONGITUDE: water.LONGITUDE,
				// 				UNITCODE: water.UNITCODE
				// 			};
				// 			_this.pollutionName[index].push(allInfo);
				// 		})
				// 	}
				// })
			},
			// 点位  mark 信息
			contentData(name,seriesData,echartsXData) {
				// console.log(name);
				// console.log(seriesData);
				// console.log(echartsXData);
				var contentString="";
				contentString='<div class="markcontetn">' +
					"<h4>" + name + "</h4>" +
					"<span>当前状态:开启</span><span>监测时间：" +  echartsXData[echartsXData.length-1] + "</span>" +
					"<div class='marktables'>" +
					'<table class="marktable">' +
					'<thead>' +
					'<tr>' +
					'<td>污染物</td>' +
					'<td>检测值</td>' +
					'<td>是否超标</td>' +
					'</tr>' +
					'</thead>' +
					'<tbody>';
				    for(var i in seriesData){
						contentString=contentString+ '<tr>' +
									'<td>' + seriesData[i].name + '</td>' +
									'<td>' + seriesData[i].data[seriesData[i].data.length-1] + '</td>' +
									'<td>' + seriesData[i].stauts[seriesData[i].stauts.length-1] + '</td>' +
									'</tr>' ;
									
					}
					contentString=contentString+'</tbody>' +
												'</table>' +
												'</div>' +
												'</div>';
					// '<tr>' +
					// '<td>' + name + '</td>' +
					// '<td>' + ((index + 1) + parseFloat((Math.random()).toFixed(1))) + '</td>' +
					// '<td>' + (Math.random() >= 0.5 ? "是" : "否") + '</td>' +
					// '</tr>' +
					// '<tr>' +
					// '<td>' + name + '</td>' +
					// '<td>' + ((index + 1) + parseFloat((Math.random()).toFixed(1))) + '</td>' +
					// '<td>' + (Math.random() >= 0.5 ? "是" : "否") + '</td>' +
					// '</tr>' +
					// '<tr>' +
					// '<td>' + name + '</td>' +
					// '<td>' + ((index + 1) + parseFloat((Math.random()).toFixed(1))) + '</td>' +
					// '<td>' + (Math.random() >= 0.5 ? "是" : "否") + '</td>' +
					// '</tr>' +
					// '<tr>' +
					// '<td>' + name + '</td>' +
					// '<td>' + ((index + 1) + parseFloat((Math.random()).toFixed(1))) + '</td>' +
					// '<td>' + (Math.random() >= 0.5 ? "是" : "否") + '</td>' +
					// '</tr>' +
					// '<tr>' +
					// '<td>' + name + '</td>' +
					// '<td>' + ((index + 1) + parseFloat((Math.random()).toFixed(1))) + '</td>' +
					// '<td>' + (Math.random() >= 0.5 ? "是" : "否") + '</td>' +
					// '</tr>' +
					return contentString;
			},

			//菜单栏的收起展开
			slide(item, index) {
				item.changeflag = !item.changeflag;
				// if(item.icon == 'iconfont icon-bottom') {
				// 	item.icon = 'iconfont icon-bottom-copy-copy'
				// } else {
				// 	item.icon = 'iconfont icon-bottom'
				// }
			},
			//左侧菜单栏的收起展开
			slideLeft() {
				this.leftShow = !this.leftShow;
				this.isShowLeft = !this.isShowLeft;
				if(this.leftShow) {
					this.data.map(function(item) {
						item.changeflag = true;
					})
				}
			},
			initecharts1(legendData,echartsXdata,seriesData) {
				
				this.myChart1 = echarts.init(document.getElementById("echarts1"));
				var option = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						type:'scroll',//就这一个属性 设置legend滚动轴的出现
                        show: true,
						data: legendData,
						
					},
					grid: {
						// left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					// toolbox: {
					// 	feature: {
					// 		saveAsImage: {}
					// 	}
					// },
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: echartsXdata
					},
					yAxis: {
						type: 'value',
						name: '监测值(ug/m3)'
					},
					series: seriesData
				};

				this.myChart1.setOption(option);
			},
			initecharts2(legendData,echartsXdata,seriesData) {
			

				this.myChart2 = echarts.init(document.getElementById("echarts2"));
				var option = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						type:'scroll',//就这一个属性 设置legend滚动轴的出现
                        show: true,
						data: legendData,
						
					},
					grid: {
						// left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					// toolbox: {
					// 	feature: {
					// 		saveAsImage: {}
					// 	}
					// },
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: echartsXdata
					},
					yAxis: {
						type: 'value',
						name: '监测值(ug/m3)'
					},
					series: seriesData
				};

				this.myChart2.setOption(option);
			},
			initecharts3(legendData,echartsXdata,seriesData) {
				// console.log(seriesData);
				this.myChart3 = echarts.init(document.getElementById("echarts3"));
				var option = {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						
						type:'scroll',//就这一个属性 设置legend滚动轴的出现
                        show: true,
						data: legendData,
						
					},
					grid: {
						// left: '3%',
						right: '4%',
						bottom: '3%',
						// width:'90%',
						containLabel: true
					},
					// toolbox: {
					// 	feature: {
					// 		saveAsImage: {}
					// 	}
					// },
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data:echartsXdata
					},
					yAxis: {
						type: 'value',
						name: '监测值(ug/m3)'
					},
					series: seriesData
				};

				this.myChart3.setOption(option);
			},
			//点击  水  气  。。显示左边栏
			showLeft(item, index) {
				this.leftShow = !this.leftShow
				for(var i in this.data) {
					if(index == i) {
						this.data[i].changeflag = false;
						// this.data[i].icon = "iconfont icon-bottom-copy-copy";
						this.isShowLeft = false;
					}
				};
			},
			isshowTable() {
				this.rightTable = !this.rightTable;
				this.isrightShow = !this.isrightShow;
			},
			lideecharts() {
				this.isshowtEcharts = !this.isshowtEcharts;
			},
			//点击是否显示底部
			isshowbut() {
				this.Isshowbuticon = !this.Isshowbuticon;
				this.moreTable = !this.moreTable;
				if(this.moreTable == true) {
					this.isshowtEcharts = false;
				}
				if(this.moreTable == true && this.isshowtEcharts == false) {
					this.$refs.iconttop.style.top = -200 + 'px';
				} else if(this.moreTable == false && this.isshowtEcharts == false) {
					this.$refs.iconttop.style.top = 0 + 'px';
				} else if(this.moreTable == true && this.isshowtEcharts == true) {
					this.$refs.iconttop.style.top = 0 + 'px';
				}
			},
			// 头部echarts
			showTop() {
				this.isshowtop = !this.isshowtop;
				this.Isshowtopicon = !this.Isshowtopicon;
			},
			initTopecharts1() {
				let _this=this;
				let echartsData=[];
				let legendData=[];
				_this.Topecarts1 = echarts.init(document.getElementById("topecarts1"));
				_this.$http({
					url:_this.baseurl3+"wryzt/getWryChart",
					method:'post',

				}).then(function(res){
					if(res.status==200){
						for(var i in res.data){
							echartsData.push({name:res.data[i].WRY,value:res.data[i].NUM});
							legendData.push(res.data[i].WRY);
						}
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
											data: legendData
										},
										series: [{
											name: '污染源分析',
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
											data: echartsData
										}]
									};

								_this.Topecarts1.setOption(option);
					}
				})
				

			},
			initTopecharts2() {
				let _this=this;
				let echartData=[];
				let legendData=[];
				_this.Topecarts2 = echarts.init(document.getElementById("topecarts2"));
				_this.$http({
					url:_this.baseurl3+"wryzt/getJbjctjChart",
					method:'post'
			}).then(function(res){
				if(res.status==200){
					for(var i in res.data){
						echartData.push({name:res.data[i].WRYTYPE,value:res.data[i].NUM});
						legendData.push(res.data[i].WRYTYPE);
					}
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
						data: legendData
					},
					calculable: true,
					series: [{
						name: '具备监测条件分析',
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
						data: echartData,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
				_this.Topecarts2.setOption(option);

				}
			})
				
			},
			initTopecharts3() {
				let _this=this;
				let legendData=[];
				let echartsData=[];
				_this.Topecarts3 = echarts.init(document.getElementById("topecarts3"));
				_this.$http({
					url:_this.baseurl3+"wryzt/getJctjChart",
					method:'post'
				}).then(function(res){
					if(res.status==200){
						for(var i in res.data){
							legendData.push(res.data[i]["'实际监测'"]);
							echartsData.push({value:res.data[i].NUM,name:res.data[i]["'实际监测'"]});
						}
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
									data: legendData
								},

								series: [{
									name: '监测条件分析',
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
									data: echartsData
								}]
							};

							_this.Topecarts3.setOption(option);
					}
				})
				

			},
			initTopecharts4() {
				let _this=this;
				let legendData=[];
				let echartData=[];
				_this.Topecarts4 = echarts.init(document.getElementById("topecarts4"));
				_this.$http({
					url:_this.baseurl3+"wryzt/getWrlxdblChart",
					method:'post',
				}).then(function(res){
					if(res.status==200){
						for(var i in res.data){
							legendData.push(res.data[i].WRYTYPE);
							echartData.push({name:res.data[i].WRYTYPE,value:res.data[i].NUM});
						}

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
										data:legendData
									},
									calculable: true,
									series: [{
										name: '污染类型达标率统计',
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
										data: echartData
									}]
								};

								_this.Topecarts4.setOption(option);
					}

				})
			

			},
			initTopecharts5() {
				let _this=this;
				_this.Topecarts5 = echarts.init(document.getElementById("topecarts5"));
				let legendData=[];
				let echartData=[];
				_this.$http({
					url:_this.baseurl3+"wryzt/getWryzdblChart",
					method:'post'
				}).then(function(res){
					if(res.status==200){
						for(var i in res.data){
							legendData.push(res.data[i].JCYZ);
							echartData.push({name:res.data[i].JCYZ,value:res.data[i].NUM})
						}

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
										data: legendData
									},
									series: [{
										name: '污染源因子达标率统计分析',
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
										data: echartData,
										itemStyle: {
											emphasis: {
												shadowBlur: 10,
												shadowOffsetX: 0,
												shadowColor: 'rgba(0, 0, 0, 0.5)'
											}
										}
									}]
								};
								_this.Topecarts5.setOption(option);
					}
				})
				

			},
			initTopecharts6() {
				let _this=this;
				_this.Topecarts6 = echarts.init(document.getElementById("topecarts6"));
				
				let firstvalue=0;
				let secondvalue=0;
				let threevalue=0;
				let fourvalue=0;
				let echartData=[];
				_this.$http({
					url:_this.baseurl3+'wryzt/getQuartAvgChart',
					method:'post'
				}).then(function(res){
					if(res.status==200){
						for(var i in res.data){
							if(res.data[i].JDNAME=='第一季度'){
								firstvalue=firstvalue+res.data[i].NUM;
							}else if(res.data[i].JDNAME=='第二季度'){
								secondvalue=secondvalue+res.data[i].NUM;
							}else if(res.data[i].JDNAME=="第三季度"){
								threevalue=threevalue+res.data[i].NUM;
							}else if(res.data[i].JDNAME=="第四季度"){
								fourvalue=fourvalue+res.data[i].NUM;
							}
						}
						
						echartData.push({name:"第一季度",value:firstvalue});
						echartData.push({name:"第二季度",value:secondvalue});
						echartData.push({name:"第三季度",value:threevalue});
						echartData.push({name:"第四季度",value:fourvalue});
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
										formatter: "{a} <br/>{b} : {c} ({d}%)"
									},
									legend: {
										x: 15,
										y: 20,
										orient: 'vertical',
										data: ["第一季度","第二季度","第三季度","第四季度"]
									},
									series: [{
										name: '每个季度污染因子平均值占比',
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
										data: echartData,
										itemStyle: {
											emphasis: {
												shadowBlur: 10,
												shadowOffsetX: 0,
												shadowColor: 'rgba(0, 0, 0, 0.5)'
											}
										}
									}]
								};
								_this.Topecarts6.setOption(option);
					}
				})
				
				
				
				

			},
		}
	};
</script>
<style scoped>
	.Pollut i {
		color: #fff;
		background: rgba(1, 49, 72, 0.5) !important;
	}
	
	.oneMenuTop i {
		font-size: 25px;
		padding-left: 5px;
		color: #00a1e0;
		background: rgba(255, 255, 255, 0) !important;
	}
	
	.tabEacharts i {
		color: #333;
	}
	
	.oneMenuTop ul {
		margin: 18px auto;
		padding: 0 10px 0 0;
		background-color:#f2f2f2; 
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
		color: #2a99e5;
		font-size: 16px;
		margin-top: 30px;
		cursor: pointer;
		background-color: #fff;
		box-shadow: 1px 1px 2px rgb(51, 51, 51, 0.6);
	}
	
	.leftmenu {
		overflow-y: scroll;
		overflow-x: hidden;
		height: 100%;
		border: 1px solid #dbdbdb;
		background-color: #fff;
		padding-top: 10px;
	}
	
	.leftslide {
		z-index: 666;
		position: absolute;
		top: 96px;
		left: 0px;
		width: auto;
		background-color: #fff;
		height: calc(100% - 96px);
		transform: translate3d(0, 0, 0);
		transition: all 0.3s linear;
	}
	
	.leftslide.moveLeft {
		width: 0;
		padding: 0;
	}
	
	.leftbut {
		width: 22px;
		height: 54px;
		line-height: 54px;
		position: absolute;
		top: calc(50% - 27px);
		right: -22px;
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
		height: 45px;
		line-height: 45px;
		border: 1px solid #dbdbdb;
		/* background-color: #dfe9ec; */
		background-image: linear-gradient(to bottom, #fafafa, #ecf4f8);
		font-weight: bold;
	}
	
	tbody tr td {
		height: 35px;
		line-height: 35px;
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
		left: -84px !important;
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
	
	.oneMenuTop.slideDown {
		height: 55px;
	}
	
	.topTitle {
		height: 40px;
		width: 80px;
		line-height: 40px;
		border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
		cursor: pointer;
		position: relative;
		display: flex;
		top: 2px;
		-webkit-box-shadow: 2px 0px 5px 0px #4e9bcc;
		box-shadow: 2px 0px 5px 0px #4e9bcc;
	}
	
	.topTitle i {
		float: left;
		padding-right: 10px;
	}
	
	.oneMenuTop {
		overflow: hidden;
	}
	.oneMenuTop span{
         
		  width: 80px;
	}
	.oneMenuTop span:nth-child(1) {
		display: inline-block;
	
		height: 40px;
		line-height: 40px;
		color: #333;
		font-size: 16px;
		position: absolute;
		left: 0px;
		top: 5px;
		background-color: #FFF;
	
	}
	
	.oneMenuTop span:nth-child(1).moveLefts {
		position: absolute;
		left: 20px;
		top: 80px;
		z-index: 9999;
		background-color: red;
	}
	
	.oneMenuTop span:nth-child(2) {
		display: inline-block;
		color: #2a99e5;
		font-size: 14px;
		padding-left: 40px;
		text-align: left;
		z-index: 666;
		position: absolute;
		left: -6px;
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
	}
	
	.oneMenuTop ul li:nth-child(1) {}
	
	.downicon {
		color: #333;
		position: absolute;
		right: -2px;
		top: 2px;
	}
	/* 底部菜单 */
	
	.butmenu {
		height: 450px;
		width: 100%;
		background: #fff;
		position: absolute;
		z-index: 888;
		bottom: -180px;
		left: 0;
		transform: translate3d(0, 0, 0);
		transition: all 0.3s linear;
	}
	
	.isshowbut {
		width: 54px;
		height: 22px;
		line-height: 22px;
		background-color: rgba(0, 0, 0, 0.3);
		position: absolute;
		top: 0px;
		left: 50%;
		margin-left: -11px;
		z-index: 888;
		transition: all 0.3s linear;
	}
	
	.buticon {
		top: -200px;
	}
	
	.isshowtbs {
		bottom: 0px;
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
	}
	
	.tablebut {
		height: 180px;
		display: flex;
		justify-content: center;
		align-content: center;
	}
	
	.butEcharts {
		bottom: 0px;
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
		padding-right: 10px;
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
		width: 300px;
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
	
	.tabletop thead tr td {
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	tbody tr:nth-child(even) td {
		background: #f9f9f9;
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
	
	.Pollut tbody {
		display: block;
		overflow-y: scroll;
	}
	
	.markcontetn tbody {
		height: 100px;
	}
	
	.tabletop tbody,
	.butTable tbody {
		height: 136px;
	}
	/* // 右侧侧边栏 */
	
	.rightTable {
		position: absolute;
		right: 0;
		top: 120px;
		background-color: #fff;
		z-index: 666;
		padding: 10px;
		width: 900px;
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
	
	.rightShow {
		width: 22px;
		height: 54px;
		line-height: 54px;
		background-color: rgba(0, 0, 0, 0.3);
		position: absolute;
		left: -22px;
		top: 50%;
		margin-top: -27px;
	}
	
	.rightshows {
		left: 0px;
	}
	/* //input 美化 */
	input{
		cursor: pointer;
	}
	.checkbox-inline {
		position: relative;
		padding-left: 8px;
		vertical-align: middle;
		font-size: 12px;
		color: #999;
		z-index: 999;
	}
	.check-box{
	    left: 30px;
	}
	
	
	input[type=checkbox]::after {
		content: '';
		display: inline-block;
		width: 20px;
		height:20px;
		border: 1px solid #dbdbdb;
		background: rgb(170, 185, 196);
		border-radius: 10px;
		position: absolute;
		top: 2px;
		left: 3px;
	}
	.check-box input[type=checkbox]::after {
		content: '';
		display: inline-block;
		width: 20px;
		height:20px;
		border: 1px solid #2a99e5;
		background: #fff;
		border-radius: 10px;
		position: absolute;
		top: 10px;
		left: -15px;
	}
	input[type=checkbox]:before {
		content: '';
		display: inline-block;
		box-sizing: border-box;
		width: 6px;
		height: 12px;
		transform: rotate(45deg);
		border-width: 2px;
		border-style: solid;
		border-color: #FFF;
		border-top: 0;
		border-left: 0;
		position: absolute;
		top: 5px;
        left: 10px;
		z-index: 9;
}	
input[type=checkbox]:before {
	color: red;
}
	.check-box input[type=checkbox]:before {
		content: '';
		display: inline-block;
		box-sizing: border-box;
		width: 6px;
		height: 12px;
		transform: rotate(45deg);
		border-width: 2px;
		border-style: solid;
		border-color: #FFF;
		border-top: 0;
		border-left: 0;
		position: absolute;
		top: 13px;
		left: -8px;
		z-index: 9;
}	

	input[type=checkbox]:checked::after {
		background: #2a99e5;
		position: absolute;
		top: 2px;
        left: 3px;
	}
	.selectTwo{
		color: #999;
	}
	input[type=checkbox]:checked+.selectTwo{
         color: #2a99e5;
	}
	.check-box input[type=checkbox]:checked::after {
		background: #FFF;
		position: absolute;
		top: 10px;
        left: -15px;
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
	border-color: #FFF;
	border-top: 0;
	border-left: 0;
	position: absolute;
	top: 5px;
	left: 10px;
	z-index: 9;
}	

	.checkbox-inline input[type=checkbox] {
		position: static !important;
		margin-right: 5px;
	}
	
	.check-box:before {
		left: -16px;
		top: 9px;
	}
	
	.check-box input[type=checkbox]:checked:before {
		content: '';
		display: inline-block;
		box-sizing: border-box;
		width: 6px;
		height: 12px;
		transform: rotate(45deg);
		border-width: 2px;
		border-style: solid;
		border-color: #2a99e5;
		border-top: 0;
		border-left: 0;
		position: absolute;
		z-index: 9;
		left: -8px;
		top: 13px;
	}
	.topEcharts {
		width: 100%;
		height: 450px;
		z-index: 777;
		background-color: #fff;
		position: absolute;
		top: 96px;
		left: 0px;
		z-index: 99999999;
		transition: all 0.3s linear;
	}
	
	.topEcharts .topcharts,
	.topEcharts .butecharts {
		width: 100%;
		height: 225px;
		display: flex;
	}
	
	.istopEcharts {
		top: -450px;
		transition: all 0.3s linear;
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
		width: 54px;
		height: 22px;
		line-height: 22px;
		background-color: rgba(0, 0, 0, 0.3);
		position: absolute;
		bottom: -116px;
		left: 50%;
		margin-left: -11px;
		z-index: 888;
		transition: all 0.3s linear;
	}
	
	.outtop {
		bottom: 0px;
		transition: all 0.3s linear;
	}
	
	.tabletop table tbody tr td,
	.butTable table tbody tr td {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
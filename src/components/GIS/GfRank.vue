<template>
	<div style="width:100%;height:100%">
		<div id="myMap" style="width:100%;height:100%;">

		</div>
		<div id="leftmuen" :class="['leftmuenClass',{'offsetLeft':changeflag}]">
			<div id="slide_btn" :class="{'slide':changeflag}" @click="toggleContent()">
				<img id="leftimg" v-bind:src="lefimgsrc">
			</div>
			<div id="leftcontent" class="leftContentClass">
				<div class="title">危废申报量、转移量排名</div>
				<div class="table">
					<div class="table-head">
						<table>
							<thead>
								<tr>
									<td width="60px">行政区划</td>
									<td>年份</td>
									<td>产生量(吨)</td>
									<td>遗留量(吨)</td>
									<td>处置量(吨)</td>
									<td>贮存量(吨)</td>
									<td>转移量(吨)</td>
								</tr>
							</thead>
						</table>
					</div>
					<div class="table-body">
						<table>
							<tbody>
								<tr v-for="(item,index) in items " :key="index">
									<td width="60px" :title="item.NAME">{{item.NAME}}</td>
									<td>{{item.NF}}</td>
									<td>{{item.CSZL}}</td>
									<td>{{item.YLZCL}}</td>
									<td>{{item.WTCZ+item.CZSL}}</td>
									<td>{{item.ZCSL}}</td>
									<td>{{item.QRFWSL}}</td>
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

			<!-- <select name="" id="town" v-model="town" @change="changeListAndChar()">
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
			<el-select filterable placeholder="行政区划" v-model="town" @change="changeListAndChar()" style="width:140px;margin-right:10px">
				<el-option v-for=" item in streetList" :key="item.ID" :label="item.NAME" :value="item.OLD_NAME"></el-option>
			</el-select>
			<el-select filterable placeholder="年份" v-model="nf" @change="changeListAndChar()" style="width:140px">
				<el-option v-for="item in yearList" :key="item.value" :label="item.value" :value="item.value"></el-option>
			</el-select>
			<!-- <select name="" id="nf" v-model="nf" @change="changeListAndChar()">
				<option value="">年份</option>
				<option value="">全部</option>
				<option value="2014">2014年</option>
				<option value="2015">2015年</option>
				<option value="2016">2016年</option>
				<option value="2017">2017年</option>
				<option value="2018">2018年</option>
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
	import { bjsyPolygon } from './../../../static/json/bjsyPolygon.js';

	// zai zheli yinyong lib
	import L from 'leaflet';
	import './../../../static/Leaflet.ChineseTmsProviders/baiduMapAPI-2.0-min.js';
	import './../../../static/Leaflet.ChineseTmsProviders/leaflet-baidu.js';
	//import "./../../../static/echarts.min.js"

	export default {
		data: function() {
			return {
				map: null,
				items: [],
				town: '',
				nf: '',
				xAxis: [],
				yAxis: [
					[],
					[],
					[],
					[],
					[]
				],
				myChart: null,
				streetList:[],
				yearList:[],
				//  L:null,
				polygonLayer: null,
				petitionLetter: null,
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
			};
		},

		mounted() {
			this.initMap();
			// $(window).on("resize",this.resizeWindow);
			this.resetWindow();
			this.initCharts();
			this.getListData();
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
						let _date=new Date();
						for(var i=0;i<4;i++){
							var year=_date.getFullYear()-i;
							_this.yearList.push({value:year});
						}
					}
				})
			},
			changeListAndChar() {
				//列表
				let _this = this;
				let paramData = {
					town: this.town,
					nf: this.nf
				};
				let paramData2 = {
					town: this.town
				};
				_this
					.$http({
						method: 'post',
						url: `${_this.baseurl3}zhgk/getGfInfo`,
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
				_this
					.$http({
						method: 'post',
						url: `${_this.baseurl3}zhgk/getGfCharData`,
						params: paramData2
					})
					.then(function(res) {
						if(res.status == 200) {
							_this.xAxis = [];
							_this.yAxis = [
								[],
								[],
								[],
								[],
								[]
							];
							for(var i in res.data) {
								_this.xAxis.push(res.data[i].NAME);
								_this.yAxis[0].push(res.data[i].CSZL);
								_this.yAxis[1].push(res.data[i].YLZCL);
								_this.yAxis[2].push(res.data[i].WTCZ + res.data[i].CZSL);
								_this.yAxis[3].push(res.data[i].ZCSL);
								_this.yAxis[4].push(res.data[i].QRFWSL);
							}

							setTimeout(function() {
								this.myChart = echarts.init(document.getElementById('echarts'));
								var option = {
									tooltip: {
										trigger: 'axis',
										axisPointer: {
											// 坐标轴指示器，坐标轴触发有效
											type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
										}
									},
									legend: {
										data: ['产生量', '遗留量', '处置量', '贮存量', '转移量']
									},
									xAxis: [{
										type: 'category',
										data: _this.xAxis,
										axisLabel: {
											interval: 0,
											rotate: 70
										}
									}],
									yAxis: [{
										type: 'value'
									}],
									series: [{
											name: '产生量',
											type: 'bar',
											data: _this.yAxis[0]
											// color:'#ea6945',
										},
										{
											name: '遗留量',
											type: 'bar',
											data: _this.yAxis[1]
											// color:'#c1d378',
										},
										{
											name: '处置量',
											type: 'bar',
											data: _this.yAxis[2]
											// color:'#c1d378',
										},
										{
											name: '贮存量',
											type: 'bar',
											data: _this.yAxis[3]
											// color:'#c1d378',
										},
										{
											name: '转移量',
											type: 'bar',
											data: _this.yAxis[4]
											// color:'#c1d378',
										}
									]
								};
								this.myChart.setOption(option);
							}, 0);
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
			getListData() {
				let _this = this;
				let paramData = {
					town: this.town,
					nf: this.nf
				};
				_this
					.$http({
						method: 'post',
						url: `${_this.baseurl3}zhgk/getGfInfo`,
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
					L.polygon(bjsyPolygon.rings[i].latlngs, {
							color: this.color[i]
						})
						.addTo(this.polygonLayer);
				}

				for(var i in this.fixedPoints) {
					L.marker(this.fixedPoints[i], {
						icon: L.icon({
							iconUrl: require('../../assets/images/危废_正常.png'),
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
				$('#leftmuen').height($('.content').height());
			},
			toggleContent() {
				//$("#leftcontent").fadeToggle();

				if(this.lefimgsrc == require('../../assets/images/zhixinag.png')) {
					this.lefimgsrc = require('../../assets/images/zhixinag2.png');
				} else {
					this.lefimgsrc = require('../../assets/images/zhixinag.png');
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
					town: this.town,
					nf: this.nf
				};
				_this
					.$http({
						method: 'post',
						url: `${_this.baseurl3}zhgk/getGfCharData`,
						params: paramData
					})
					.then(function(res) {
						if(res.status == 200) {
							_this.xAxis = [];
							_this.yAxis = [
								[],
								[],
								[],
								[],
								[]
							];
							for(var i in res.data) {
								_this.xAxis.push(res.data[i].NAME);
								_this.yAxis[0].push(res.data[i].CSZL);
								_this.yAxis[1].push(res.data[i].YLZCL);
								_this.yAxis[2].push(res.data[i].WTCZ + res.data[i].CZSL);
								_this.yAxis[3].push(res.data[i].ZCSL);
								_this.yAxis[4].push(res.data[i].QRFWSL);
							}

							setTimeout(function() {
								this.myChart = echarts.init(document.getElementById('echarts'));
								var option = {
									tooltip: {
										trigger: 'axis',
										axisPointer: {
											// 坐标轴指示器，坐标轴触发有效
											type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
										}
									},
									legend: {
										data: ['产生量', '遗留量', '处置量', '贮存量', '转移量']
									},
									xAxis: [{
										type: 'category',
										data: _this.xAxis,
										axisLabel: {
											interval: 0,
											rotate: 70
										}
									}],
									yAxis: [{
										type: 'value'
									}],
									series: [{
											name: '产生量',
											type: 'bar',
											data: _this.yAxis[0]
											// color:'#ea6945',
										},
										{
											name: '遗留量',
											type: 'bar',
											data: _this.yAxis[1]
											// color:'#c1d378',
										},
										{
											name: '处置量',
											type: 'bar',
											data: _this.yAxis[2]
											// color:'#c1d378',
										},
										{
											name: '贮存量',
											type: 'bar',
											data: _this.yAxis[3]
											// color:'#c1d378',
										},
										{
											name: '转移量',
											type: 'bar',
											data: _this.yAxis[4]
											// color:'#c1d378',
										}
									]
								};
								this.myChart.setOption(option);
							}, 0);
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
	};
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
		/* background: url('../assets/images/噪声_正常.png') no-repeat right center; */
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
		border: 1px solid #dbdbdb;
		font-weight: bold;
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

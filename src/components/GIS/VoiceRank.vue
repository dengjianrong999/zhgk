<template>
	<div style="width:100%;height:100%">
		<div id="myMap" style="width:100%;height:100%;">
		</div>
		<div id="leftmuen" :class="['leftmuenClass',{'offsetLeft':changeflag}]">
			<div id="slide_btn" :class="{'slide':changeflag}" @click="toggleContent()">
				<img id="leftimg" v-bind:src="lefimgsrc">
			</div>
			<div id="leftcontent" class="leftContentClass">
				<div class="title">噪声LEQ均值排名</div>
				<div class="table">
					<div class="table-head">
					<table>
						<thead>
							<tr>
								<td>行政区划</td>
								<td style="width:100px">站点名称</td>
								<td>功能区划</td>
								<td>LEQ</td>
								<td>排名</td>
							</tr>
						</thead>
					</table>
					</div>
					<div class="table-body">
						<table>
							<tbody>
								<tr v-for="item in dataList">
									<td>{{item.XZQH}}</td>
									<td style="width:100px">{{item.ZDMC}}</td>
									<td>{{item.GNQH}}</td>
									<td>{{item.LEQ}}</td>
									<td>{{item.PM}}</td>
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

		<div class="ZSselect">
			
			<el-select filterable placeholder="行政区划" v-model="town" style="width:120px;margin-right:10px;" @change="getData()">
				<el-option v-for="item in streetList" :key="item.ID" :label="item.NAME" :value="item.OLD_NAME"></el-option>
			</el-select>
			
			<el-select filterable placeholder="站点名称" v-model="stationName" style="width:120px;margin-right:10px;" @change="getData()">
				<el-option v-for="item in stationNameList" :key="item.text" :label="item.text" :value="item.value"></el-option>
			</el-select>
			<div class="m-time">
			
				<el-select filterable placeholder="功能区划" v-model="pointType" style="width:120px" @change="getData()" >
					<el-option v-for="item in pointTypeList" :key="item.text" :label="item.text" :value="item.value"></el-option>
				</el-select>
			
			</div>
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
            //  L:null,
			polygonLayer: null,
			streetList:[],
			stationNameList:[{text:"全部"},{text:"顺义区榆阳路",value:"顺义区榆阳路"},{text:"裕龙花园小区",value:"裕龙花园小区"},{text:"西辛南区",value:"西辛南区"},{text:"顺和路东",value:"顺和路东"}],
			pointTypeList:[{text:"全部"},{text:"1类",value:"1类"},{text:"2类",value:"2类"},{text:"4a类",value:"4a类"}],
			town:"",
			stationName:null,
			pointType:null,
			dataList:[],
			echartXXData:[],
			myChart:null,
			echartYdata:[],
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
            fixedPoints:[
					
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
        // this.initCharts();
		this.getStreetList();
        this.getData();
    },
    methods: {
		getData(){
			let _this=this;
			let paramdata={glqh:_this.pointType,xzqh:_this.town,zdmc:_this.stationName};
			let paramdata2={xzqh:_this.town};
			_this.$http({
				url:_this.baseurl3+"zhgk/getZsInfo",
				method:'post',
				params:paramdata
			}).then(function(res){
				if(res.status==200){
					_this.dataList=res.data;
				}else{
					layer.msg("数据加载错误");
				}
			});
			_this.$http({
				url:_this.baseurl3+"zhgk/getZsCharData",
				method:'post',
				params:paramdata2
			}).then(function(res){
				if(res.status==200){
					_this.echartYdata=[];
					_this.echartXXData=[];
					
					for(var i in res.data){
						// _this.echartXData.push(res.data[i].XZQH);
						_this.echartYdata.push(res.data[i].LEQ);
						_this.echartXXData.push(res.data[i].XZQH);
					}
					
					_this.initCharts();
				}else{
					layer.msg("数据加载错误");
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
            for (var i in bjsyPolygon.rings) {
                L.polygon(bjsyPolygon.rings[i].latlngs, {
                    color: this.color[i]
                })
                    .addTo(this.polygonLayer);
            }

            for (var i in this.fixedPoints) {
                L.marker(this.fixedPoints[i], {
                    icon: L.icon({
						iconUrl: require('../../assets/images/噪声_正常.png'),
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

            if (this.lefimgsrc == require('../../assets/images/zhixinag.png')) {
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
			let _this=this;
			// _this.echartXData=[],
			// console.log(this.echartXData);
            setTimeout(function() {
               _this.myChart = echarts.init(document.getElementById('echarts'));
                var colorList = [
                    '#65b548',
                    '#029ad1',
                    '#e6e15c',
                    '#e6b35c',
                    '#cc76c8',
                    '#b67ee6',
                    '#65b548',
                    '#029ad1',
                    '#e6e15c',
                    '#e6b35c',
                    '#cc76c8',
                    '#b67ee6',
                    '#65b548',
                    '#029ad1',
                    '#e6e15c',
                    '#e6b35c',
                    '#cc76c8',
                    '#b67ee6'
                ];
                var option = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
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
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    legend: {
                        show: false,
                        emWidth: 20,
                        itemHeight: 10,
                        top: 10,
                        data: ['水质等级'],
                        textStyle: {
                            fontSize: 12,
                            color: '#666666'
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: _this.echartXXData,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                interval: 0,
                                rotate: 70
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: 'LEQdB(A)均值',
                            type: 'value'
                        }
                    ],
                    grid: {
                        y: 30,
                        y2: 80,
                        x: 40,
                        x2: 20
                    },
                    series: [
                        {
                            name: 'LEQdB(A)均值',
                            type: 'bar',
                            barWidth: '60%',
                            data:_this.echartYdata
                        }
                    ]
                };
                _this.myChart.setOption(option);
            }, 0);
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

.ZSselect {
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
    height: 30px;
    line-height: 30px;
    border: 1px solid #dbdbdb;
	border-left: none;
    background-color: #fff;
}
.m-time ul li:nth-child(1) {
    border-left: 1px solid #dbdbdb;
}

.ZSselect select {
    width: 115px;
    height: 30px;
    border-radius: 15px;
}

.ZSselect select:nth-child(2) {
    margin: 0px 10px;
}

.ZSselect select:last-child {
    width: 210px;
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


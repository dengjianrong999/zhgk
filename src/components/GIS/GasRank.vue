<template>
	<div style="width:100%;height:100%">
		<div id="myMap" style="width:100%;height:100%;">

		</div>
		<div id="MyLegend" :class="['MyLegendClass',{'offsetLeft':changeflag}]">
			<div style="display: inline-flex;align-items: center;margin-left: 100px;">
				<div style="width:8px;height:8px;border-radius:3.5px;background-color:#00e528"></div>&nbsp;优&nbsp;&nbsp;&nbsp;</div>
			<div style="display: inline-flex;align-items: center">
				<div style="width:8px;height:8px;border-radius:3.5px;background-color:#ffff00"></div>&nbsp;良&nbsp;&nbsp;&nbsp;</div>
			<div style="display: inline-flex;align-items: center">
				<div style="width:8px;height:8px;border-radius:3.5px;background-color:#ff7e00"></div>&nbsp;轻度&nbsp;&nbsp;&nbsp;</div>
			<div style="display: inline-flex;align-items: center">
				<div style="width:8px;height:8px;border-radius:3.5px;background-color:#f50606"></div>&nbsp;中度&nbsp;&nbsp;&nbsp;</div>
			<div style="display: inline-flex;align-items: center">
				<div style="width:8px;height:8px;border-radius:3.5px;background-color:#99004c"></div>&nbsp;重度&nbsp;&nbsp;&nbsp;</div>
			<div style="display: inline-flex;align-items: center">
				<div style="width:8px;height:8px;border-radius:3.5px;background-color:#7c0224"></div>&nbsp;严重</div>
		</div>
		<div id="leftmuen" :class="['leftmuenClass',{'offsetLeft':changeflag}]">
			<div id="slide_btn" :class="{'slide':changeflag}" @click="toggleContent()">
				<img id="leftimg" v-bind:src="lefimgsrc">
			</div>
			<div id="leftcontent" class="leftContentClass">
				<div class="title">大气AQI指数排名</div>
				<div class="table">
					<div class="table-head">
						<table>
							<thead>
								<tr>
									<td>站点</td>
									<td style="width:100px">时间</td>
									<td style="width:100px">首要污染物</td>
									<td>AQI</td>
									<td>排名</td>
								</tr>
							</thead>
						</table>
					</div>
					<div class="table-bodys">
					<table>
						<tbody>
							<tr v-for="(item,key) in dataList">
								<td>{{item.ZD}}</td>
								<td :title="item.SJ" style="width:100px">{{item.SJ.slice(0,10)}}</td>
								<td style="width:100px">{{item.SYWRW}}</td>
								<td>{{item.AQI}}</td>
								<td>{{key+1}}</td>
							</tr>
						</tbody>
					</table>
					</div>
				</div>

				<div class="echarts">
					<div id="echarts1"></div>
				</div>

			</div>
			<!-- <div id="leftbutton" class="leftbuttonClass">
                <div style="background-color:#013148;height:50px;opacity:0.5"  @click="toggleContent()">
                    <img id="leftimg" style="margin-top:16.5px" v-bind:src="lefimgsrc">
                </div>
            </div> -->
		</div>

		<div class="outMySelect">
			<div class="myselect">
				<!-- <select name="" id="">
					<option value="">站点</option>
					<option value="">怀柔区</option>
					<option value="">密云</option>
					<option value="">云冈</option>
					<option value="">延庆</option>
					<option value="">大兴</option>
					<option value="">奥体中心</option>
					<option value="">房山</option>
					<option value="">站点</option>
					<option value="">官园</option>
					<option value="">通州</option>

				</select> -->
				<el-select filterable placeholder="站点" v-model="stationName" style="width:120px;margin-right:5px" @change="changeListAndecharts()">
					<el-option v-for="item in stationList" :key="item.value" :label="item.text" :value="item.value"></el-option>
				</el-select>
				<!-- <select name="" id="">
					<option value="">检测项</option>
					<option value="">AQI</option>
					<option value="">O3</option>
					<option value="">CO2</option>
					<option value="">SO2</option>
					<option value="">NO2</option>
					<option value="">PM2.5</option>
					<option value="">PM10</option>
				</select> -->
				<el-select filterable placeholder="检测项" v-model="checkItem" style="width:120px;margin-right:5px" @change="changeListAndecharts()">
					<el-option v-for="item in checkItemList" :key="item.value" :label="item.text" :value="item.value"></el-option>
				</el-select>
				<div class="m-time">
					<!-- <select name="" id="">
						<option value="">时间</option>
					</select> -->
					<el-input id="gastime" v-model='gastime' style="width:120px" placeholder="时间" ></el-input>
					<ul>
						<li id="y" class="timeflag" @click="clicktime('y')">年均</li>
						<li id="q" class="timeflag" @click="clicktime('q')">季均</li>
						<li id="m" class="timeflag" @click="clicktime('m')">月均</li>
						<li id="d" class="timeflag" @click="clicktime('d')">日均</li>
					</ul>
				</div>
			</div>
		</div>
        <div data-role="popup" id="popupArrow" data-arrow="true">

        </div>
	</div>
</template>
<script>
import { bjsyPolygon } from './../../../static/json/bjsyPolygon.js';
import { bjsyGrid }    from './../../../static/json/grid.js';

// zai zheli yinyong lib
import L from 'leaflet';
import './../../../static/Leaflet.ChineseTmsProviders/baiduMapAPI-2.0-min.js';
import './../../../static/Leaflet.ChineseTmsProviders/leaflet-baidu.js';
import {projCood} from './../../../static/json/lnglatchangelbt.js'
// import "./../../../static/echarts.min.js"

export default {
    data: function() {
        return {
            map: null,
            //  L:null,
            polygonLayer: null,
			stationList:[{text:"全部"},{text:"怀柔区",value:"怀柔区"},{text:"密云",value:"密云"},{text:"云冈",value:"云冈"},{text:"延庆",value:"延庆"},{text:"大兴",value:"大兴"},{text:"奥体中心",value:"奥体中心"},{text:"房山",value:"房山"},{text:"官洲",value:"官洲"},{text:"通州",value:"通州"}],
			checkItemList:[{text:"全部"},{text:"AQI",value:"AQI"},{text:"PM2.5",value:"PM2.5"},{text:"PM10",value:"PM10"},{text:"O3",value:"O3"},{text:"SO2",value:"SO2"},{text:"CO2",value:"CO2"},{text:"NO2",value:"NO2"}],
			stationName:"",
			checkItem:"",  
			time:'',
			gastime:'',
			sjFlag:'',
            echartsXData:[],
            jd:"",
			echartsYData:[],
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
			dataList:[],
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
        };
    },

    mounted() {
		this.initMap();
		this.getdata();
        // $(window).on("resize",this.resizeWindow);
		this.resetWindow();
		let _this=this;
		//this.initCharts();
		setTimeout(() => {
			layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#gastime",
						type: "date",
						done: function (value) {
                              _this.gastime=value;
                              _this.changeListAndecharts();
						}
					});
				});
		}, 1000);
		

		window.onresize = this.resetWindow();
			
        //this.getData();
    },
    methods: {
		clicktime(id){
			let _this=this;
			$(".timeflag").css('background','#ffffff');
			$("#"+id).css('background','#029ad1');
            _this.sjFlag=id;
            _this.jd=id;
            // _this.changeListAndecharts();
            _this.changeListAndecharts();
            
		},
		getdata(){
			let _this=this;
			_this.$http({
				url:_this.baseurl3+'zhgk/getDqInfo',
				method:'POST'
			}).then(function(res){
				 if(res.status==200){
                     if(_this.dataList.length>0){
                         _this.dataList=res.data;
                     }else{ //第一次加载时，只显示每个站点的最新数据
                         for(var i in res.data){
                             if(_this.dataList.length==0){
                             _this.dataList.push(res.data[i]);
                            //  console.log(_this.dataList.indexOf(res.data[i+1]));
                            }else{
                                for(var k in _this.dataList){
                                    if(_this.dataList[k].ZD==res.data[i].ZD){
                                        if(_this.dataList[k].SJ<res.data[i].SJ){
                                            _this.dataList.splice(k,1,res.data[i]);
                                        }
                                    }else{
                                       var state=0;
                                       for(var b in _this.dataList){
                                           if(_this.dataList[b].ZD==res.data[i].ZD){
                                               state=-1;
                                               break;
                                           }
                                       }
                                       if(state==0){
                                           _this.dataList.push(res.data[i]);
                                       }
                                    }

                                }
                            }
                         }
                        
                        //  for(var i in res.data){
                        //      for(var k in _this.dataList){
                        //          if(_this.dataList.length>0){
                        //              if(_this.dataList[k].ZD==res.data[i].ZD){

                        //             if(_this.dataList[k].SJ<res.data[i].SJ){
                        //                 _this.dataList.splice(k,1,res.data[i]);
                        //             }
                        //          }else{
                        //              alert("1111");
                        //              _this.dataList.push(res.data[i]);
                        //          }
                        //          }else{
                        //              _this.dataList.push(res.data[i]);
                        //          }
                                
                            //  }
                            //  if(_this.dataList.indexOf(res.data[i])==-1){//初始化是  如果数组没有这个元素就直接添加
                            //       _this.dataList.push(res.data[i]);
                            //  } else if(_this.dataList.indexOf(res.data[i])!=-1 && _this.dataList[_this.dataList[indexOf(res.data[i])]].SJ<res.data[i].SJ){
                            //     //  _this.dataList.splice(_this.dataList.indexOf(res.data[i].ZD),1,res.data[i]);
                            //     alert("111")
                            //  }
                        //  }
                        //  console.log(_this.dataList);
                     }
					
				 }else{
					 layer.msg("数据加载错误");
				 }
			});
			_this.$http({
				url:_this.baseurl3+'zhgk/getDqCharData',
				method:'POST'
			}).then(function(res){
				if(res.status==200){
					for(var i in res.data){
						_this.echartsXData.push(res.data[i].ZD);
						_this.echartsYData.push(res.data[i].AQI);
						//console.log(_this.echartsXData);
					}
					_this.initCharts();	
				}else{
					layer.msg("数据加载错误")
				}
			})
		},
		changeListAndecharts(){
			let _this=this;
			let paramDatas={jcx:_this.checkItem,sj:_this.gastime,zd:_this.stationName,sjFlag:_this.sjFlag};
            let paramDatas2={zd:_this.stationName};
            if(_this.jd!=null && _this.jd!=""){
                _this.gastime="";
                if(_this.jd=='y'){
                    _this.$http({
                        url:_this.baseurl3+"zhgk/getDqInfoByYear",
                        method:'post',
                        params:paramDatas
                    }).then(function(res){
                        if(res.status==200){
                            _this.dataList=res.data;
                        }else{
                            layer.msg("数据加载错误");
                        }
                            
                    }).catch(function(err){
                        layer.msg("数据加载错误");
                    });
            }else if(_this.jd=='q'){
                _this.$http({
                    url:_this.baseurl3+"zhgk/getDqInfoByQuarter",
                    method:'post',
                    params:paramDatas
                }).then(function(res){
                    if(res.status==200){
                        _this.dataList=res.data;
                    }else{
                        layer.msg("数据加载错误");
                    }
                }).catch(function(err){
                    layer.msg("数据加载错误")
                });
            }else if(_this.jd=='m'){
                _this.$http({
                    url:_this.baseurl3+"zhgk/getDqInfoByMonth",
                    method:"post",
                    params:paramDatas
                }).then(function(res){
                    if(res.status==200){
                        _this.dataList=res.data;
                    }else{
                        layer,msg("数据加载错误");
                    }
                }).catch(function (err){
                    layer.msg("数据加载错误");
                    console.log(err);
                })
            }else{
                _this.$http({
                    url:_this.baseurl3+"zhgk/getDqInfoByDay",
                    method:'post',
                    params:paramDatas
                }).then(function(res){
                    if(res.status==200){
                        _this.dataList=res.data;
                    }else{
                        layer.msg("数据加载错误");
                    }
                }).catch(function(err){
                    layer.msg("数据加载错误");
                    console.log(err);
                })
            }

            }else{
                _this.$http({
				url:_this.baseurl3+"zhgk/getDqInfo",
				method:'POST',
				params:paramDatas
			}).then(function(res){
				if(res.status==200){
					_this.dataList=res.data;
				}else{
					layer.msg("数据加载错误");
				}
			});
            }
			
			_this.$http({
				method:'POST',
				url:_this.baseurl3+"zhgk/getDqCharData",
				params:paramDatas2
			}).then(function(res){
				if(res.status==200){
					_this.echartsXData=[];
					_this.echartsYData=[];
					for(var i in res.data){
						_this.echartsXData.push(res.data[i].ZD);
						_this.echartsYData.push(res.data[i].AQI);
						//console.log(_this.echartsXData);
					}
					_this.initCharts();	
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
                minZoom: 8,
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
            let _this=this;
            var gridsLineList=[];
            
            // let gridPolygon=L.polygon(bjsyGrid.grids,{color:'#ff0000'})
            //  gridPolygon.addTo(this.polygonLayer);
        
            for (var i in bjsyPolygon.rings) {
              let  polygon=  L.polygon(bjsyPolygon.rings[i].latlngs, {
                    color: this.color[i]
                });
               
                polygon.addTo(this.polygonLayer).bindPopup("<p>超标企业："+i+"</p>");
               
            }

            for (var i in this.fixedPoints) {
                L.marker(this.fixedPoints[i], {
                    icon: L.icon({
						iconUrl: require('../../assets/images/大气监测_正常.png'),
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

            $('#MyLegend').css({
                top: $('.table').height() + 96 + 50 + 35
            });
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
            setTimeout(function() {
                var myChart = echarts.init(document.getElementById('echarts1'));
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
                    // color: ["#3398DB"],
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
                        top: 10
                        //   data:[{name:"AQI",icon:"none"}],
                        //  formatter(name){
                        //      return "优 良 轻度 中度 重度 严重";
                        //  }
                        // data: ["优","良","轻度","中度","重度","严重"],
                        //  data:[{name:"优",icon:"circle"}],
                        //   textStyle: {
                        //     fontSize: 12,
                        //     // color: "#666666"
                        //   }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: _this.echartsXData,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                interval: 0,
                                rotate: 40
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: ['AQI'],
                            type: 'bar',
                            barWidth: '60%',
                            data: _this.echartsYData,
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        if (params.value > 0 && params.value < 50) {
                                            return '#00e528';
                                        } else if (params.value >= 50 && params.value < 100) {
                                            return '#ffff00';
                                        } else if (params.value >= 100 && params.value < 150) {
                                            return '#ff7e00';
                                        } else if (params.value >= 150 && params.value < 200) {
                                            return '#f50606';
                                        } else if (params.value >= 200 && params.value < 300) {
                                            return '#99004c';
                                        } else {
                                            return '#7c0024';
                                        }
                                    }
                                }
                            }
                        }
                    ]
                };
                myChart.setOption(option);
            }, 500);
        }
    }
};
</script>
<style scoped>
.leftmuenClass {
    z-index: 999;
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
    /* background: url(\assets\images\sanjiaoxing.png) no-repeat right center; */
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
    border-bottom: 1px solid #dbdbdb;
}
.table-bodys {
    height: calc(100% - 12px);
		padding: 0 0 10px 10px;
		overflow-y: scroll;
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
}

#echarts1 {
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
.leaflet-popup-pane {
    z-index: 7000;
}

.MyLegendClass.offsetLeft {
    left: -400px;
}
.timeflag
{
    cursor:pointer 
}
</style>
<style>
.el-input__icon{
		line-height: 26px !important;
	}
</style>






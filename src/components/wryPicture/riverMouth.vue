<template>
	<div style="width:100%;height:100%">
		<div id="myMap" style="width:100%;height:100%;">

		</div>
	

		<div class="outMySelect">
			<div class="myselect">
				
				<!-- <el-select filterable placeholder="站点" v-model="stationName" style="width:120px;margin-right:5px" @change="changeListAndecharts()">
					<el-option v-for="item in stationList" :key="item.value" :label="item.text" :value="item.value"></el-option>
				</el-select>
				
				<el-select filterable placeholder="检测项" v-model="checkItem" style="width:120px;margin-right:5px" @change="changeListAndecharts()">
					<el-option v-for="item in checkItemList" :key="item.value" :label="item.text" :value="item.value"></el-option>
				</el-select>
				<div class="m-time">
					
					<el-input id="gastime" v-model='gastime' style="width:120px" placeholder="时间" ></el-input>
					<ul>
						<li id="y" class="timeflag" @click="clicktime('y')">年均</li>
						<li id="q" class="timeflag" @click="clicktime('q')">季均</li>
						<li id="m" class="timeflag" @click="clicktime('m')">月均</li>
						<li id="d" class="timeflag" @click="clicktime('d')">日均</li>
					</ul>
				</div> -->
                <!-- <el-input id="time" v-model="time" style="width:120px;margin-right:5px" placeholder="审批时间" @change="getdata()"></el-input> -->
                <!-- <el-input  v-model="town" style="width:120px" placeholder="区域"></el-input> -->
                <el-select filterable placeholder="流域名称" v-model="town" style="width:150px;" @change="getdata()">
					<el-option v-for="item in dataList" :key="item.RECEIVING_WATER_NAME" :label="item.RECEIVING_WATER_NAME" :value="item.RECEIVING_WATER_NAME"></el-option>
				</el-select>
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
            pointLayer: new L.featureGroup(),
            town:"",
            time:"",
            
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
            fixedPoints: [],
            
            changeflag: false
        };
    },

    mounted() {
	 this.initMap();
		this.getdata();
        // $(window).on("resize",this.resizeWindow);
        this.resetWindow();
        this.getTownList();
		let _this=this;
		//this.initCharts();
		// setTimeout(() => {
		// 	layui.use("laydate", function () {
		// 			var laydate = layui.laydate;
		// 			//执行一个laydate实例
		// 			laydate.render({
		// 				elem: "#time",
		// 				type: "date",
		// 				done: function (value) {
                          
        //                       _this.time=value;
        //                       _this.getdata();
		// 				}
		// 			});
		// 		});
		// }, 1000);
		

	//	window.onresize = this.resetWindow();
			
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
                url:_this.baseurl+"wryPicture/getRiverMouthList",
                method:"POST",
                params:{town:_this.town,time:_this.time}
           }).then(function(res){
               if(res.status==200){
                   _this.fixedPoints=[];
                   for(var i in res.data){
                       var lng=res.data[i].LONGITUDE;
                       var lat=res.data[i].LATITUDE;
                       var latTransform,lngTrandsform;
                       if(lng!=null && lng!="" && lat!=null && lat!=""){
                            var lngd=Number(lng.split("°")[0]);
                            var lngf=Number(lng.split("°")[1].split("′")[0]);
                            var lngm=Number(lng.split("°")[1].split("′")[1].split("″")[0]);
                          lngTrandsform=((lngf/60)+(lngm/60/60)+lngd).toFixed(8);
                            var latd=Number(lat.split("°")[0]);
                            var latf=Number(lat.split("°")[1].split("′")[0]);
                            var latm=Number(lat.split("°")[1].split("′")[1].split("″")[0]);
                            latTransform=((latf/60)+(latm/60/60)+latd).toFixed(8);

                       }
                      
                       _this.fixedPoints.push({name:res.data[i].SEWAGE_OUTLET_NAME,lat:latTransform,lng:lngTrandsform,type:res.data[i].SEWAGE_OUTLET_CATEGORY,InMethod:res.data[i].LAKE_INLET_WAY,pwklx:res.data[i].SEWAGE_OUTLET_TYPE,code:res.data[i].SEWAGE_OUTLET_CODE});
                   }
                  _this.addPoint();
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
            this.pointLayer.addTo(this.map);
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
               
                polygon.addTo(this.polygonLayer);
               
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
      
      addPoint(){
          this.pointLayer.clearLayers();
            for (var i in this.fixedPoints) {
                L.marker([this.fixedPoints[i].lat,this.fixedPoints[i].lng], {
                    icon: L.icon({
						iconUrl: require('../../assets/images/入河口.png'),
						iconAnchor:   [10, 0],
                    })
                }).addTo(this.pointLayer).bindPopup("<div class='markcontetn'><div class='marktables'><table class='marktable'><tbody><tr><td></td><td></td></tr><tr><td>排污口名称：</td><td>"+this.fixedPoints[i].name+"</td></tr>"
                                                  +"<tr><td>排污口类别:</td><td>"+this.fixedPoints[i].type+"</td></tr>"
                                                  +"<tr><td>排污口编码:</td><td>"+this.fixedPoints[i].code+"</td></tr>"
                                                  +"<tr><td>排污口类型:</td><td>"+this.fixedPoints[i].pwklx+"</td></tr>"
                                                  +"<tr><td>入河方式:</td><td>"+this.fixedPoints[i].InMethod+"</td></tr>"
                                                  +"<tbody></table></div></div>");
                //  L.marker(this.fixedPoints[i]).addTo(this.polygonLayer);
            }
      },
      getTownList(){
          let _this=this;
          _this.$http({
              url:_this.baseurl+"wryPicture/getRiverList",
              method:"POST"
          }).then(function(res){
              if(res.status==200){
                  _this.dataList=res.data;
                  _this.dataList.splice(0,0,{RECEIVING_WATER_NAME:""});
              }
          })
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
    width: 200px;
    height: 40px;
    position: absolute;
    top: 165px;
    left: 50%;
    margin-left: -100px;
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
    .markcontetn tbody {
		height: 100px;
	}
    .marktable{
        border: 1px;
    }
</style>
<style>
.el-input__icon{
		line-height: 26px !important;
	}
</style>






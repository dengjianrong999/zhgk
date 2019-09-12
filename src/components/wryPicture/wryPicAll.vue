<template>
	<div style="width:100%;height:100%">
		<div id="myMap" style="width:100%;height:100%;">

		</div>
        <div class="rightmuenClass">
			<!-- <div id="slide_btn" :class="{'slide':changeflag}" @click="toggleContent()">
				<img id="leftimg" v-bind:src="lefimgsrc">
			</div> -->
			<div style="width:100%;height:100%;background-color:#ffffff;padding:20px 10px 10px 10px;color:#038fcf;border-radius: 8px;">
               
                <div class='rightCheck' @click='addPoint()'>
                   <div style="width:80%;float:left;display: -webkit-box;padding-left:5px;">
                    <img v-bind:src="qcimgsrc">
                    <span>禽畜</span>
                    </div>
                    <!-- <input type='checkbox' :checked="qcState" @click='addPoint()'>  -->
                    <span class="iconfont icon-gou" v-show="qcState"></span>

                </div>
                <div class='rightCheck' @click='addjzsPoint()'>
                    <div style="width:80%;float:left;display: -webkit-box;padding-left:5px;">
                        <img v-bind:src="jzsimgsrc">
                        <span>集中式</span>
                    </div>
                     <!-- <input type='checkbox'  :checked="jzsState" @click='addjzsPoint()'>  -->
                     <span class="iconfont icon-gou" v-show="jzsState"></span>
                </div>
                 <div class='rightCheck' @click='adddlbgqPoint()'>
                    <div style="width:80%;float:left;display: -webkit-box;padding-left:5px;">
                        <img v-bind:src="dlbgqimgsrc">
                        <span>独立办公区锅炉</span>
                    </div>
                    <span class="iconfont icon-gou" v-show="dlbgqState"></span>
                     <!-- <input type='checkbox' :checked="dlbgqState" @click='adddlbgqPoint()'>  -->
                </div>
                 <div class='rightCheck' @click='addgyqyPoint()'>
                    <div style="width:80%;float:left;display: -webkit-box;padding-left:5px;">
                        <img v-bind:src="gyqyimgsrc">
                        <span>工业企业</span>
                    </div>
                    <span class="iconfont icon-gou" v-show="gyqyState"></span>
                     <!-- <input type='checkbox' :checked="gyqyState" @click='addgyqyPoint()'>  -->
                </div>
                 <div class='rightCheck'  @click='addgyyPoint()'>
                    <div style="width:80%;float:left;display: -webkit-box;padding-left:5px;">
                        <img v-bind:src="gyyimgsrc">
                        <span>工业源</span>
                    </div>
                     <!-- <input type='checkbox' :checked="gyyState" @click='addgyyPoint()'>  -->
                     <span class="iconfont icon-gou" v-show="gyyState"></span>
                </div>
                 <div class='rightCheck'  @click='addshglpoint()'>
                    <div style="width:80%;float:left;display: -webkit-box;padding-left:5px;">
                        <img v-bind:src="shglimgsrc">
                        <span>生活锅炉</span>
                    </div>
                     <!-- <input type='checkbox' :checked="shglState" @click='addshglpoint()'>  -->
                     <span class="iconfont icon-gou" v-show="shglState"></span>
                </div>
                 <div class='rightCheck' @click='addrhkPoint()'>
                    <div style="width:80%;float:left;display: -webkit-box;padding-left:5px;">
                        <img v-bind:src="rhkimgsrc">
                        <span>入河口</span>
                    </div>
                    <span class="iconfont icon-gou" v-show="rhkState"></span>
                     <!-- <input type='checkbox' :checked="rhkState" @click='addrhkPoint()'>  -->
                </div>
            </div>

		</div>

		<div class="outMySelect">
			<div class="myselect">
				
				
                <el-select filterable placeholder="所属区域" v-model="town" style="width:150px;" @change="getdata()">
					<el-option v-for="item in dataList" :key="item.TOWN" :label="item.TOWN" :value="item.TOWN"></el-option>
				</el-select>
			</div>
		</div>
        <div data-role="popup" id="popupArrow" data-arrow="true">

        </div>
	</div>
</template>
<script>
import { bjsyPolygon,bjsyPolygon2 } from './../../../static/json/bjsyPolygon.js';
import { bjsyGrid }    from './../../../static/json/grid.js';

// zai zheli yinyong lib
import L from 'leaflet';
import './../../../static/Leaflet.ChineseTmsProviders/baiduMapAPI-2.0-min.js';
import './../../../static/Leaflet.ChineseTmsProviders/leaflet-baidu.js';
import './../../../static/BeautifyMarker-master/leaflet-beautify-marker-icon.js'
import './../../../static/BeautifyMarker-master/leaflet-beautify-marker-icon.css'
import {projCood} from './../../../static/json/lnglatchangelbt.js'
import {gcj02tobd09,wgs84togcj02} from './../../../static/json/latlngTransfer.js'
// import "./../../../static/echarts.min.js"

export default {
    data: function() {
        return {
            map: null,
            //  L:null,
            polygonLayer: null,
            pointLayer: new L.featureGroup(),
            jzsPointlayer:new L.featureGroup(),
            dlbgqPointLayer:new L.featureGroup(),
            gyqyPointPointLayer:new L.featureGroup(),
            gyyPointLayer:new L.featureGroup(),
            shglPointLayer:new L.featureGroup(),
            rhkPointLayer:new L.featureGroup(),
            town:"",
            time:"",
            
            lefimgsrc: require('../../assets/images/zhixinag2.png'),
            qcimgsrc:require('../../assets/images/畜禽.png'),
            jzsimgsrc:require('../../assets/images/集中式.png'),
            dlbgqimgsrc:require('../../assets/images/办公区锅炉.png'),
            gyqyimgsrc:require('../../assets/images/工业企业.png'),
            gyyimgsrc:require('../../assets/images/工业园锅炉.png'),
            shglimgsrc:require('../../assets/images/生活锅炉.png'),
            rhkimgsrc:require('../../assets/images/入河口.png'),
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
            jzsfixedPoints:[],
            dlbgqfixedPoints:[],
            gyqyfixedPoints:[],
            gyyfixedPoints:[],
            shglfixedPoints:[],
            rhkfixedPoints:[],
            qcState:false,
            jzsState:false,
            dlbgqState:false,
            gyqyState:false,
            gyyState:false,
            shglState:false,
            rhkState:false,
            changeflag: false
        };
    },

    mounted() {
	 this.initMap();
		this.getdata(1);
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
		getdata(type){
            let _this=this;
             _this.fixedPoints=[];
            _this.$http({
                url:_this.baseurl+"wryPicture/getLivestockList",
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
                          lngTrandsform=((lngf/60)+(lngm/60/60)+lngd);
                            var latd=Number(lat.split("°")[0]);
                            var latf=Number(lat.split("°")[1].split("′")[0]);
                            var latm=Number(lat.split("°")[1].split("′")[1].split("″")[0]);
                            latTransform=((latf/60)+(latm/60/60)+latd);

                       }
                       let myLatLng=wgs84togcj02(lngTrandsform,latTransform);
                       let myLatLng2=gcj02tobd09(myLatLng[0],myLatLng[1]);
                    //    for(var k=0;k<1;k++){
                    //        myLatLng2=gcj02tobd09(myLatLng2[0],myLatLng2[1]);
                    //    }
                       _this.fixedPoints.push({name:res.data[i].FARM_NAME,lat:myLatLng2[1],lng:myLatLng2[0],town:res.data[i].TOWN,state:res.data[i].RUNNING_STATE,code:res.data[i].UNIFORM_CREDIT_CODE,linkman:res.data[i].LINKMAN,href:_this.baseurl3+"sjzx/zyml?zhgkLjlink=wry_decxq"});
                   }
                  if(type=='1' || type==1){
                        _this.addPoint();
                  }else{
                      if(_this.qcState){
                          _this.pointLayer.clearLayers();
                          _this.drawqcPoint();
                      }
                      
                  }
                  
               }
           })
            //集中式
            _this.jzsfixedPoints=[];
           _this.$http({
                url:_this.baseurl+"wryPicture/getCentralizedList",
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
                       let myLatLng=wgs84togcj02(lngTrandsform,latTransform);
                       let myLatLng2=gcj02tobd09(myLatLng[0],myLatLng[1]);
                    //    for(var k=0;k<1;k++){
                    //        myLatLng2=gcj02tobd09(myLatLng2[0],myLatLng2[1]);
                    //    }
                       _this.jzsfixedPoints.push({name:res.data[i].UNIT_NAME,lat:myLatLng2[1],lng:myLatLng2[0],code:res.data[i].ORGANIZING_INSTITUTION_CODE,state:res.data[i].OPERATING_STATE,linkman:res.data[i].LINKMAN,town:res.data[i].TOWN,href:_this.baseurl3+"sjzx/zyml?zhgkLjlink=wry_jzs"});
                   }
                   if(type==1 || type=='1'){
                        _this.addjzsPoint();
                   }else{
                       if(_this.jzsState){
                           _this.jzsPointlayer.clearLayers();
                       _this.drawjzsPoint();
                       }
                       
                   }
                
               }
           });
            //独立办公区
            _this.dlbgqfixedPoints=[];
            _this.$http({
                url:_this.baseurl+"wryPicture/getIndepBoilerList",
                method:"POST",
                params:{town:_this.town,time:_this.time}
           }).then(function(res){
               if(res.status==200){
                  
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
                      
                       _this.dlbgqfixedPoints.push({name:res.data[i].UNIT_NAME,lat:latTransform,lng:lngTrandsform,code:res.data[i].ORGANIZING_INSTITUTION_CODE,industryType:res.data[i].INDUSTRY_CATEGORY,linkman:res.data[i].LINKMAN,town:res.data[i].TOWN,href:_this.baseurl3+"sjzx/zyml?zhgkLjlink=wry_dlglz"});
                   }
                   if(type==1 || type=='1'){
                        _this.adddlbgqPoint();
                   }else{
                       if(_this.dlbgqState){
                        _this.dlbgqPointLayer.clearLayers();
                        _this.drawdlbgqPoint();
                        }
                   }
                  
               }
           })
            //工业企业
            _this.gyqyfixedPoints=[];
             _this.$http({
                url:_this.baseurl+"wryPicture/getIndustrialList",
                method:"POST",
                params:{town:_this.town,time:_this.time}
           }).then(function(res){
               if(res.status==200){
                 
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
                      let myLatLng=wgs84togcj02(lngTrandsform,latTransform);
                       let myLatLng2=gcj02tobd09(myLatLng[0],myLatLng[1]);
                    //    for(var k=0;k<1;k++){
                    //        myLatLng2=gcj02tobd09(myLatLng2[0],myLatLng2[1]);
                    //    }
                      var unitname=res.data[i].UNIT_NAME;
                     
                        _this.gyqyfixedPoints.push({name:res.data[i].UNIT_NAME,lat:myLatLng2[1],lng:myLatLng2[0],code:res.data[i].ORGANIZING_INSTITUTION_CODE,industryType:res.data[i].INDUSTRY_CATEGORY,linkman:res.data[i].LINKMAN,town:res.data[i].TOWN,href:_this.baseurl3+"sjzx/zyml?zhgkLjlink=wry_gyqy"});
                   }
                  
                   if(type==1 || type=='1'){
                        _this.addgyqyPoint();
                   }else{
                       if(_this.gyqyState){
                        _this.gyqyPointPointLayer.clearLayers();
                        _this.drawgyqyPoint();
                        }
                   }
                  
               }
           })
           //工业源锅炉
           _this.gyyfixedPoints=[];
           _this.$http({
                url:_this.baseurl+"wryPicture/getInduBoilerList",
                method:"POST",
                params:{town:_this.town,time:_this.time}
           }).then(function(res){
               if(res.status==200){
                 
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
                       let myLatLng=wgs84togcj02(lngTrandsform,latTransform);
                       let myLatLng2=gcj02tobd09(myLatLng[0],myLatLng[1]);
                    //    for(var i=0;i<1;i++){
                    //        myLatLng2=gcj02tobd09(myLatLng2[0],myLatLng2[1]);
                    //    }
                       _this.gyyfixedPoints.push({name:res.data[i].UNIT_NAME,lat:myLatLng2[1],lng:myLatLng2[0],code:res.data[i].ORGANIZING_INSTITUTION_CODE,industryType:res.data[i].INDUSTRY_CATEGORY,linkman:res.data[i].LINKMAN,town:res.data[i].TOWN,href:_this.baseurl3+"sjzx/zyml?zhgkLjlink=wry_gyglz"});
                   }
                   if(type==1 || type=='1'){
                       _this.addgyyPoint();
                   }else{
                       if(_this.gyyState){
                        _this.gyyPointLayer.clearLayers();
                        _this.drawgyyPoint();
                        }
                   }
                  
               }
           })
           //生活锅炉
           _this.shglfixedPoints=[];
           _this.$http({
                url:_this.baseurl+"wryPicture/getLifeBoilerList",
                method:"POST",
                params:{town:_this.town,time:_this.time}
           }).then(function(res){
               if(res.status==200){
                  
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
                       let myLatLng=wgs84togcj02(lngTrandsform,latTransform);
                       let myLatLng2=gcj02tobd09(myLatLng[0],myLatLng[1]);
                    //    for(var k=0;k<2;k++){
                    //        myLatLng2=gcj02tobd09(myLatLng2[0],myLatLng2[1]);
                    //    }
                        _this.shglfixedPoints.push({name:res.data[i].UNIT_NAME,lat:myLatLng2[1],lng:myLatLng2[0],code:res.data[i].ORGANIZING_INSTITUTION_CODE,industryType:res.data[i].INDUSTRY_CATEGORY,linkman:res.data[i].LINKMAN,town:res.data[i].TOWN,href:_this.baseurl3+"sjzx/zyml?zhgkLjlink=wry_shglz"});
                   }
                   if(type==1 || type=='1'){
                        _this.addshglpoint();
                   }else{
                       if(_this.shglState){
                        _this.shglPointLayer.clearLayers();
                        _this.drawshglPoint();
                        }
                   }
                 
               }
           })
           //入河口
           _this.rhkfixedPoints=[];
           _this.$http({
                url:_this.baseurl+"wryPicture/getRiverMouthList",
                method:"POST",
                params:{town:_this.town,time:_this.time}
           }).then(function(res){
               if(res.status==200){
                  
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
                      let myLatLng=wgs84togcj02(lngTrandsform,latTransform);
                       let myLatLng2=gcj02tobd09(myLatLng[0],myLatLng[1]);
                    //    for(var k=0;k<1;k++){
                    //        myLatLng2=gcj02tobd09(myLatLng2[0],myLatLng2[1]);
                    //    }
                       _this.rhkfixedPoints.push({name:res.data[i].SEWAGE_OUTLET_NAME,lat:myLatLng2[1],lng:myLatLng2[0],type:res.data[i].SEWAGE_OUTLET_CATEGORY,InMethod:res.data[i].LAKE_INLET_WAY,pwklx:res.data[i].SEWAGE_OUTLET_TYPE,code:res.data[i].SEWAGE_OUTLET_CODE,href:_this.baseurl3+"sjzx/zyml?zhgkLjlink=wry_rhk"});
                   }
                 
                 if(type==1 || type=='1'){
                     _this.addrhkPoint();
                 }else{
                     if(_this.rhkState){
                    _this.rhkPointLayer.clearLayers();
                    _this.drawrhkPoint();
                    }
                 }
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
            this.jzsPointlayer.addTo(this.map);
            this.dlbgqPointLayer.addTo(this.map);
            this.gyqyPointPointLayer.addTo(this.map);
            this.gyyPointLayer.addTo(this.map);
            this.shglPointLayer.addTo(this.map);
            this.rhkPointLayer.addTo(this.map);
            var BaiDuMap = L.tileLayer.baiduLayer('Normal.Map');
            BaiDuMap.addTo(this.map);
            let _this=this;
            var gridsLineList=[];
            
            // let gridPolygon=L.polygon(bjsyGrid.grids,{color:'#ff0000'})
            //  gridPolygon.addTo(this.polygonLayer);
        
         
              let  polygon=  L.polygon(bjsyPolygon2, {
                    color: this.color[0]
                });
               
                polygon.addTo(this.polygonLayer);
               
           

          
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
         if(this.qcState){
             this.pointLayer.clearLayers();
             this.qcState= !this.qcState;
         }else{
            this.drawqcPoint();
            this.qcState=!this.qcState;
         }
      },
      addjzsPoint(){
          if(this.jzsState){
              this.jzsPointlayer.clearLayers();
              this.jzsState=!this.jzsState;
          }else{
            this.drawjzsPoint();
            this.jzsState=!this.jzsState;
            }
      },
      adddlbgqPoint(){
          if(this.dlbgqState){
              this.dlbgqPointLayer.clearLayers();
              this.dlbgqState=!this.dlbgqState;
          }else{
         
                this.drawdlbgqPoint();
                this.dlbgqState=!this.dlbgqState;
          }
      },
      addgyqyPoint(){
          if(this.gyqyState){
              this.gyqyPointPointLayer.clearLayers();
              this.gyqyState=!this.gyqyState;
          }else{
                this.drawgyqyPoint();
                this.gyqyState=!this.gyqyState;
          }
      },
      addgyyPoint(){
          if(this.gyyState){
              this.gyyPointLayer.clearLayers();
              this.gyyState=!this.gyyState;
          }else{
          
                this.drawgyyPoint();
                this.gyyState=!this.gyyState;
          }
      },
      addshglpoint(){
          if(this.shglState){
              this.shglPointLayer.clearLayers();
              this.shglState=!this.shglState;
          }else{
         
                this.drawshglPoint();
                this.shglState=!this.shglState;
          }
      },
      addrhkPoint(){
          if(this.rhkState){
              this.rhkPointLayer.clearLayers();
              this.rhkState=!this.rhkState;
          }else{
          
                 this.drawrhkPoint()
                 this.rhkState=!this.rhkState;
          }
      },
      getTownList(){
          let _this=this;
          _this.$http({
              url:_this.baseurl+"wryPicture/getTownList",
              method:"POST"
          }).then(function(res){
              if(res.status==200){
                  _this.dataList=res.data;
                  _this.dataList.splice(0,0,{TOWN:""});
              }
          })
      },
      	toggleContent() {
				//$("#leftcontent").fadeToggle();
				
				if(this.lefimgsrc == require("../../assets/images/zhixinag2.png")) {
					this.lefimgsrc = require("../../assets/images/zhixinag.png");
				} else {
					this.lefimgsrc = require("../../assets/images/zhixinag2.png");
				}
				this.changeflag = !this.changeflag;
				//   if(this.changeflag){
				//    this.lefimgsrc = 'this.lefimgsrc==require("../../assets/images/zhixinag2.png")';
				//   }else{
				//     this.lefimgsrc = 'this.lefimgsrc==require("../../assets/images/zhixinag.png")';
				//   }

				// document.getElementById("leftimg").src="../../assets/images/VOC_正常.png";

            },
        drawqcPoint(){
            for (var i in this.fixedPoints) {
                L.marker([this.fixedPoints[i].lat,this.fixedPoints[i].lng], {
                    icon: L.icon({
						iconUrl: require('../../assets/images/畜禽.png'),
						iconAnchor:   [10, 0],
                    })
                }).addTo(this.pointLayer).bindPopup("<div><div style='width:350px'>"
                                                  +"<h4 style='margin-top: 0px;margin-bottom: 0px;text-align: left;color: #fff;height: 25px;line-height: 25px;background-color: #02adea;padding: 0px 8px;font-size: 14px;margin: -2px -1px 0px -1px;border-top-left-radius: 5px;border-top-right-radius: 5px;'>"
                                                  +this.fixedPoints[i].name+"</h4>"
                                                  +"</div>"
                                                  +"<div style='padding:5px;' ><table style='width:100%;font-size:13px;'><tbody>"
                                                  +"<tr style='text-align:center'><td style='width:50%;border: 1px solid #dbdbdb;'>所属镇街:</td><td style='border: 1px solid #dbdbdb;'>"+this.fixedPoints[i].town+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>统一信用代码:</td><td style='border: 1px solid #dbdbdb;'>"+this.fixedPoints[i].code+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>运行状态:</td><td style='border: 1px solid #dbdbdb;'>"+this.fixedPoints[i].state+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>联系人:</td><td style='border: 1px solid #dbdbdb;'>"+this.fixedPoints[i].linkman+"</td></tr>"
                                                  +"<tr><td style='text-align:center' colspan='2'><a href='javascript:window.open(\""+this.fixedPoints[i].href+"\");' >数据管理页面</a></td></tr>"
                                                  +"</tbody></table></div>"
                                                 
                                                  +"</div>",{minWidth:350});
            }
        },
        drawjzsPoint(){
            for (var i in this.jzsfixedPoints) {
                L.marker([this.jzsfixedPoints[i].lat,this.jzsfixedPoints[i].lng], {
                    icon: L.icon({
						iconUrl: require('../../assets/images/集中式.png'),
						iconAnchor:   [10, 0],
                    })
                }).addTo(this.jzsPointlayer).bindPopup("<div><div style='width:350px'>"
                                                  +"<h4 style='margin-top: 0px;margin-bottom: 0px;text-align: left;color: #fff;height: 25px;line-height: 25px;background-color: #02adea;padding: 0px 8px;font-size: 14px;margin: -2px -1px 0px -1px;border-top-left-radius: 5px;border-top-right-radius: 5px;'>"
                                                  +this.jzsfixedPoints[i].name+"</h4>"
                                                  +"</div>"
                                                  +"<div style='padding:5px;' ><table style='width:100%;font-size:13px;'>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;width:50%'>所属镇街:</td><td style='border: 1px solid #dbdbdb;'>"+this.jzsfixedPoints[i].town+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>统一信用代码:</td><td style='border: 1px solid #dbdbdb;'>"+this.jzsfixedPoints[i].code+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>运营状态:</td><td style='border: 1px solid #dbdbdb;'>"+this.jzsfixedPoints[i].state+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>联系人:</td><td style='border: 1px solid #dbdbdb;'>"+this.jzsfixedPoints[i].linkman+"</td></tr>"
                                                  +"<tr ><td style='text-align:center' colspan='2'><a href='javascript:window.open(\""+this.jzsfixedPoints[i].href+"\");' >数据管理页面</a></td></tr>"
                                                  +"</table></div>"
                                                  +"</div>",{minWidth:350});
                //  L.marker(this.fixedPoints[i]).addTo(this.polygonLayer);
            }
        },
        drawdlbgqPoint(){
            for (var i in this.dlbgqfixedPoints) {
                L.marker([this.dlbgqfixedPoints[i].lat,this.dlbgqfixedPoints[i].lng], {
                    icon: L.icon({
						iconUrl: require('../../assets/images/办公区锅炉.png'),
						iconAnchor:   [10, 0],
                    })
                }).addTo(this.dlbgqPointLayer).bindPopup("<div><div style='width:350px'>"
                                                  +"<h4 style='margin-top: 0px;margin-bottom: 0px;text-align: left;color: #fff;height: 25px;line-height: 25px;background-color: #02adea;padding: 0px 8px;font-size: 14px;margin: -2px -1px 0px -1px;border-top-left-radius: 5px;border-top-right-radius: 5px;'>"
                                                  +this.dlbgqfixedPoints[i].name+"</h4>"
                                                  +"</div>"
                                                  +"<div style='padding:5px;' ><table style='width:100%;font-size:13px;'>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;width:50%'>所属镇街:</td><td style='border: 1px solid #dbdbdb;'>"+this.dlbgqfixedPoints[i].town+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>统一信用代码:</td><td style='border: 1px solid #dbdbdb;'>"+this.dlbgqfixedPoints[i].code+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>行业类别:</td><td style='border: 1px solid #dbdbdb;'>"+this.dlbgqfixedPoints[i].industryType+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>联系人:</td><td style='border: 1px solid #dbdbdb;'>"+this.dlbgqfixedPoints[i].linkman+"</td></tr>"
                                                  +"<tr><td style='text-align:center' colspan='2'><a href='javascript:window.open(\""+this.dlbgqfixedPoints[i].href+"\");' >数据管理页面</a></td></tr>"
                                                  +"</table></div>"
                                                  +"</div>",{minWidth:350});
                //  L.marker(this.fixedPoints[i]).addTo(this.polygonLayer);
            }
        },
        drawgyqyPoint(){
           
            for (var i in this.gyqyfixedPoints) {
                L.marker([this.gyqyfixedPoints[i].lat,this.gyqyfixedPoints[i].lng], {
                    icon: L.icon({
						iconUrl: require('../../assets/images/工业企业.png'),
						iconAnchor:   [10, 0],
                    })
                }).addTo(this.gyqyPointPointLayer).bindPopup("<div><div style='width:350px'>"
                                                  +"<h4 style='margin-top: 0px;margin-bottom: 0px;text-align: left;color: #fff;height: 25px;line-height: 25px;background-color: #02adea;padding: 0px 8px;font-size: 14px;margin: -2px -1px 0px -1px;border-top-left-radius: 5px;border-top-right-radius: 5px;'>"
                                                  +this.gyqyfixedPoints[i].name+"</h4>"
                                                  +"</div>"
                                                  +"<div style='padding:5px;' ><table style='width:100%;font-size:13px;'>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;width:50%'>所属镇街:</td><td style='border: 1px solid #dbdbdb;'>"+this.gyqyfixedPoints[i].town+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>统一信用代码:</td><td style='border: 1px solid #dbdbdb;'>"+this.gyqyfixedPoints[i].code+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>行业类别:</td><td style='border: 1px solid #dbdbdb;'>"+this.gyqyfixedPoints[i].industryType+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>联系人:</td><td style='border: 1px solid #dbdbdb;'>"+this.gyqyfixedPoints[i].linkman+"</td></tr>"
                                                  +"<tr><td style='text-align:center' colspan='2'><a href='javascript:window.open(\""+this.gyqyfixedPoints[i].href+"\");' >数据管理页面</a></td></tr>"
                                                  +"</table></div>"
                                                  +"</div>",{minWidth:350});
                //  L.marker(this.fixedPoints[i]).addTo(this.polygonLayer);
            }
        },
        drawgyyPoint(){
            for (var i in this.gyyfixedPoints) {
                L.marker([this.gyyfixedPoints[i].lat,this.gyyfixedPoints[i].lng], {
                    icon: L.icon({
						iconUrl: require('../../assets/images/工业园锅炉.png'),
						iconAnchor:   [10, 0],
                    })
                }).addTo(this.gyyPointLayer).bindPopup("<div><div style='width:350px'>"
                                                  +"<h4 style='margin-top: 0px;margin-bottom: 0px;text-align: left;color: #fff;height: 25px;line-height: 25px;background-color: #02adea;padding: 0px 8px;font-size: 14px;margin: -2px -1px 0px -1px;border-top-left-radius: 5px;border-top-right-radius: 5px;'>"
                                                  +this.gyyfixedPoints[i].name+"</h4>"
                                                  +"</div>"
                                                  +"<div style='padding:5px;' ><table style='width:100%;font-size:13px;'>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;width:50%'>所属镇街:</td><td style='border: 1px solid #dbdbdb;'>"+this.gyyfixedPoints[i].town+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>统一信用代码:</td><td style='border: 1px solid #dbdbdb;'>"+this.gyyfixedPoints[i].code+"</td ></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>行业类别:</td><td style='border: 1px solid #dbdbdb;'>"+this.gyyfixedPoints[i].industryType+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>联系人:</td><td style='border: 1px solid #dbdbdb;'>"+this.gyyfixedPoints[i].linkman+"</td></tr>"
                                                  +"<tr ><td style='text-align:center' colspan='2'><a href='javascript:window.open(\""+this.gyyfixedPoints[i].href+"\");' >数据管理页面</a></td></tr>"
                                                  +"</table></div>"
                                                  +"</div>",{minWidth:350});
                //  L.marker(this.fixedPoints[i]).addTo(this.polygonLayer);
            }
        },
        drawshglPoint(){
            for (var i in this.shglfixedPoints) {
                L.marker([this.shglfixedPoints[i].lat,this.shglfixedPoints[i].lng], {
                    icon: L.icon({
						iconUrl: require('../../assets/images/生活锅炉.png'),
						iconAnchor:   [10, 0],
                    })
                }).addTo(this.shglPointLayer).bindPopup("<div><div style='width:350px'>"
                                                  +"<h4 style='margin-top: 0px;margin-bottom: 0px;text-align: left;color: #fff;height: 25px;line-height: 25px;background-color: #02adea;padding: 0px 8px;font-size: 14px;margin: -2px -1px 0px -1px;border-top-left-radius: 5px;border-top-right-radius: 5px;'>"
                                                  +this.shglfixedPoints[i].name+"</h4>"
                                                  +"</div>"
                                                  +"<div style='padding:5px;' ><table style='width:100%;font-size:13px;'>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;width:50%'>所属镇街:</td><td style='border: 1px solid #dbdbdb;'>"+this.shglfixedPoints[i].town+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>统一信用代码:</td><td style='border: 1px solid #dbdbdb;'>"+this.shglfixedPoints[i].code+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>行业类别:</td><td style='border: 1px solid #dbdbdb;'>"+this.shglfixedPoints[i].industryType+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>联系人:</td><td style='border: 1px solid #dbdbdb;'>"+this.shglfixedPoints[i].linkman+"</td></tr>"
                                                  +"<tr><td style='text-align:center' colspan='2'><a href='javascript:window.open(\""+this.shglfixedPoints[i].href+"\");' >数据管理页面</a></td></tr>"
                                                  +"</table></div>"
                                                  +"</div>",{minWidth:350});
                //  L.marker(this.fixedPoints[i]).addTo(this.polygonLayer);
            }
        },
        drawrhkPoint(){
            for (var i in this.rhkfixedPoints) {
                var myPopup= L.popup({maxWidth:400}).setContent()
                L.marker([this.rhkfixedPoints[i].lat,this.rhkfixedPoints[i].lng], {
                    icon: L.icon({
						iconUrl: require('../../assets/images/入河口.png'),
						iconAnchor:   [10, 0],
                    })
                }).addTo(this.rhkPointLayer).bindPopup("<div><div style='width:350px'>"
                                                  +"<h4 style='margin-top: 0px;margin-bottom: 0px;text-align: left;color: #fff;height: 25px;line-height: 25px;background-color: #02adea;padding: 0px 8px;font-size: 14px;margin: -2px -1px 0px -1px;border-top-left-radius: 5px;border-top-right-radius: 5px;'>"
                                                  +this.rhkfixedPoints[i].name+"</h4>"
                                                  +"</div>"
                                                  +"<div style='padding:5px;' ><table style='width:100%;font-size:13px;'>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;width:50%'>排污口类别:</td><td style='border: 1px solid #dbdbdb;'>"+this.rhkfixedPoints[i].type+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'style='border: 1px solid #dbdbdb;'>排污口编码:</td><td style='border: 1px solid #dbdbdb;'>"+this.rhkfixedPoints[i].code+"</td ></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>排污口类型:</td><td style='border: 1px solid #dbdbdb;'>"+this.rhkfixedPoints[i].pwklx+"</td></tr>"
                                                  +"<tr style='text-align:center'><td style='border: 1px solid #dbdbdb;'>入河方式:</td><td style='border: 1px solid #dbdbdb;'>"+this.rhkfixedPoints[i].InMethod+"</td></tr>"
                                                  +"<tr><td style='text-align:center' colspan='2'><a href='javascript:window.open(\""+this.rhkfixedPoints[i].href+"\");' >数据管理页面</a></td></tr>"
                                                  +"</table></div>"
                                                  +"</div>",{minWidth:350});
                //  L.marker(this.fixedPoints[i]).addTo(this.polygonLayer);
            }
        },
       
        
    }
};
</script>
<style scoped>
.rightmuenClass {
    z-index: 999;
    position: absolute;
    top: 116px;
    right: 20px;
    height: 375px;
    width: 200px;
    display: inline-flex;
    box-shadow: 1px 5px 5px #5d5d5d;
    border-radius: 8px;
    /* transform: translate3d(0, 0, 0);
    transition: all 0.3s linear; */
}

.leftContentClass {
    height: 100%;
    width: 400px;
    background-color: #ffffff;
}

.rightmuenClass.offsetRight {
    right: -200px;
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
    top: 116px;
    left: 230px;
    /* margin-left: -100px; */
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
    left: 0;
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
    left: -22px;
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

.MyLegendClass.offsetRight {
    left: -400px;
}
.timeflag
{
    cursor:pointer 
}

.rightCheck{
    height: 40px;
    border: 1px solid #A7D1FB;
    border-radius: 3px;
    line-height: 40px;
    font-size: 14px;
    background-color: rgb(233, 243, 252);
    margin-bottom: 10px;
    box-shadow: 0px 1px 7px 0px rgba(51, 180, 236, 0.35);
    padding: 0 0 8px 8px;
    cursor: pointer;
}
.rightCheck input[type=checkbox]{
    zoom:120%;
}
.rightCheck img{
    width:25px;
}


</style>
<style>
.el-input__icon{
		line-height: 26px !important;
	}
</style>






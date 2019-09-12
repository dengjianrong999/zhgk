<template>
	<div style="width:100%;height:100%">
		
		<div id="leftmuen" :class="['leftmuenClass',{'offsetLeft':changeflag}]">
			<div id="slide_btn" :class="['slde_button',{'slide':changeflag}]" @click="toggleContent()">
				<img id="leftimg" v-bind:src="lefimgsrc">
			</div>
            <div id="leftcontent" class="leftContentOne">
                
				<div id="pjbz" :class="['chooseItem',{'isIt':isChoose=='pjbz'}]" @click="cahngeItem('pjbz')">评价标准</div>
				<div id="pfqx" :class="['chooseItem',{'isIt':isChoose=='pfqx'}]" @click="cahngeItem('pfqx')">受纳水体</div>
				<div>
					<div id="pjxm" :class="['chooseItem',{'isIt':isChoose=='pjxm'}]" @click="cahngeItem('pjxm')">评价项目<i class="iconfont icon-bottom"></i></div>
					<ul id="pjxmUl" style="display:none">
						<li :class="['liItemClass',{'isIt':isChoose=='pjxms'}]"  @click="cahngeItem('pjxms')">废水</li>
						<li :class="['liItemClass',{'isIt':isChoose=='pjxmq'}]"  @click="cahngeItem('pjxmq')">废气</li>
					</ul>
					<!-- <div id="pjxmq" :class="['chooseItem',{'isIt':isChoose=='pjxmq'}]" @click="cahngeItem('pjxmq')">评价项目（废气）</div>
               		<div id="pjxms" :class="['chooseItem',{'isIt':isChoose=='pjxms'}]" @click="cahngeItem('pjxms')">评价项目（废水）</div> -->
				</div>
				<div id="zdwry" :class="['chooseItem',{'isIt':isChoose=='zdwry'}]" @click="cahngeItem('zdwry')">污染源名单 </div>
				<div>
					<div id="pk" :class="['chooseItem',{'isIt':isChoose=='pk'}]" @click="cahngeItem('pk')">污染源排口<i class="iconfont icon-bottom"></i></div>
					<ul id="pkUl" style='display:none'>
						<li :class="['liItemClass',{'isIt':isChoose=='wrypk'}]"  @click="cahngeItem('wrypk')">废水</li>
						<li :class="['liItemClass',{'isIt':isChoose=='wrypkq'}]"  @click="cahngeItem('wrypkq')">废气</li>
					</ul>
					<!-- <div id="wrypk" :class="['chooseItem',{'isIt':isChoose=='wrypk'}]" @click="cahngeItem('wrypk')">污染源排口（废水）</div>
					<div id="wrypkq" :class="['chooseItem',{'isIt':isChoose=='wrypkq'}]" @click="cahngeItem('wrypkq')">污染源排口（废气）</div> -->
				</div>
                
                <!-- <div id="gfjcx" :class="['chooseItem',{'isIt':isChoose=='gfjcx'}]" @click="cahngeItem('gfjcx')">固废监测项</div> -->
                <div>
					<div id="sj" :class="['chooseItem',{'isIt':isChoose=='sj'}]" @click="cahngeItem('sj')">监测数据<i class="iconfont icon-bottom"></i></div>
					<ul id="sjUl" style="display:none"> 
						<li :class="['liItemClass',{'isIt':isChoose=='jcsj'}]"  @click="cahngeItem('jcsj')">废水</li>
						<li :class="['liItemClass',{'isIt':isChoose=='jcsjq'}]"  @click="cahngeItem('jcsjq')">废气</li>
						<li :class="['liItemClass',{'isIt':isChoose=='jcsjcjdq'}]"  @click="cahngeItem('jcsjcjdq')">固废厂界大气</li>
						<li :class="['liItemClass',{'isIt':isChoose=='gfsty'}]"  @click="cahngeItem('gfsty')">固废渗透液</li>
						<li :class="['liItemClass',{'isIt':isChoose=='gfdxs'}]"  @click="cahngeItem('gfdxs')">固废地下水</li>
					</ul>
					<!-- <div id="jcsj" :class="['chooseItem',{'isIt':isChoose=='jcsj'}]" @click="cahngeItem('jcsj')">监测数据（废水）</div>
					<div id="jcsjq" :class="['chooseItem',{'isIt':isChoose=='jcsjq'}]" @click="cahngeItem('jcsjq')">监测数据（废气）</div>
					<div id="jcsjcjdq" :class="['chooseItem',{'isIt':isChoose=='jcsjcjdq'}]" @click="cahngeItem('jcsjcjdq')">监测数据（固废厂界大气）</div>
					<div id="gfsty" :class="['chooseItem',{'isIt':isChoose=='gfsty'}]" @click="cahngeItem('gfsty')">监测数据（固废渗透液）</div>
					<div id="gfdxs" :class="['chooseItem',{'isIt':isChoose=='gfdxs'}]" @click="cahngeItem('gfdxs')">监测数据（固废地下水）</div> -->
				</div>
                
                
                
            </div>
		
		</div>
		<div class="content" style="width:100%;height:100%">
     
			<!-- <keep-alive> -->
				<component :is="componentData"></component>
			<!-- </keep-alive> -->
		</div>
	</div>
</template>
<script>
	import { bjsyPolygon } from './../../../static/json/bjsyPolygon.js';
	import './../../../static/echarts.min.js';
	 import zdwry from "./../yearReport/zdwry";
	 import wrypk from "./../yearReport/wrypkList";
	// import gfjcx from "./../yearReport/gfjcxList";
	 import pjxmq from "./../yearReport/pjxmqList";
	 import pjxms from "./../yearReport/pjxmsList";
	 import pjbz from "./../yearReport/pjbzList";
	 import jcsj from "./../yearReport/jcsjList";
	 import pfqx from "./../yearReport/pfqxList";
	 import wrypkq from "./../yearReport/wrypkqList";
	 import jcsjq from "./../yearReport/jcsjqList";
	 import jcsjcjdq from "./../yearReport/jcsjcjdqList";
	 import gfsty from "./../yearReport/gfstyList";
	 import gfdxs from "./../yearReport/gfdxsList"
	export default {
		data: function() {
			return {
			
                isChoose:"pjbz",
				lefimgsrc: require('../../assets/images/zhixinag.png'),
			
                componentData:'pjbz',
                changeflag: false,
                
				
			};
		},
        components:{
			zdwry,
			wrypk,
		//	gfjcx,
			pjxmq,
			pjxms,
			pjbz,
			jcsj,
			pfqx,
			wrypkq,
			jcsjq,
			jcsjcjdq,
			gfsty,
			gfdxs
        },
		mounted() {
		
		},
		methods: {
			
			cahngeItem(id){
				if(id!="pk" && id!="sj" && id!="pjxm"){
 					this.componentData=id;
				}else{
					if($("#"+id+"Ul").is(":hidden")){
						$("#"+id+"Ul").show();
					}else{
						$("#"+id+"Ul").hide();
					}
				}
               
                this.isChoose=id;

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
			
		}
	};
</script>
<style>
	.leftmuenClass{
		z-index: 99999;
		position: absolute;
		top: 96px;
		left: 0;
		height: 100%;
		width:300px;
		display: -ms-inline-flexbox;
		display: inline-flex;
		box-shadow: 1px 5px 5px #5d5d5d;
		transform: translateZ(0);
		transition: all .3s linear;
		background: #ffffff;
	}
	.leftmuenClass.offsetLeft{
		left:-300px;
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
		z-index: 999999999;
	}
	.slde_button{
		margin-top: -75px !important;
	}
	#slide_btn.slide {
		right: -22px !important;
	}
	/* 左侧高度 */
	
	.leftContentOne {
		height: -moz-calc(100% - 96px);
		height: -webkit-calc(100% - 96px);
		height: calc(100% - 96px);
		width: 300px;
		background-color: #ffffff;
        padding: 20px;
		overflow: auto;
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
    .chooseItem{
        height: 32px;
        line-height: 32px;
        border: 1px solid #dedfdf;
        border-radius: 16px;
        margin-bottom: 15px;
        cursor: pointer;
    }
    .chooseItem.isIt{
        background-color: #00acea;
    }
    .chooseItem:hover{
        background-color: #00acea;
    }
	.liItemClass{
		border: 1px #dedfdf solid;
		border-radius: 16px;
		height: 32px;
		width: 200px;
		line-height: 32px;
		margin-left: 30px;
		margin-top: 10px
	}
	.liItemClass:hover{
		background-color: #00acea;
	}
	.liItemClass.isIt{
		background-color: #00acea;
	}
</style>
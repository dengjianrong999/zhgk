<template>
  <div class="jdc-tabs">
    <!-- 头部 -->
    <!-- nav -->
    <div class="signBar">
      <!-- logo -->
      <div class="logo">
        <img src="../assets/images/logo_1920.png" alt ondragstart="return false;">
        <img src="../assets/images/guankong_1920.png" alt ondragstart="return false;">
      </div>
      <!-- 退出登录 -->
      <div class="logo-login">
        <a>
          <img src="../assets/images/user_1920.png" alt> 管理员
        </a>
        <a href="http://117.121.97.120:9001/bjsy-sys/">
          <i class="icon iconfont icon-shouye3"></i> 首页导航
        </a>
        <a @click="loginout()">
          <i class="icon iconfont icon-tuichu"></i> 退出
        </a>
      </div>
    </div>
    <!--导航菜单栏-->
    <div class="navigationBar">
      <ul class="First-navigationBar">
        <li v-for="(item,index) in datas" :key="index">
          <a href="#"  @click="tabInt(index,item)"  :class="{isChecked: currentIndex === item.currentIndex}">
            <i :class="item.icon"></i> {{item.name}}
            <div class="triangle" v-if="item.childList"></div>
          </a>
          <ul class="Second-navigationBar">
            <li @click="tabInter(item,index,itm)" v-for="(itm,index) in item.childList" :key="index">
              <a :class="{isChecke: currentIndex2 === itm.currentIndex}">{{itm.name}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <div class="Rankchoose" v-show="isShow">
        <div v-for="(item,index) in list" :key="index">
          <div
            class="RankchooseItem"
            @click="addChecked(index,item)"
            :class="{RankchooseItemCheck: currentnow === item.currentnow}"
          >{{item.title}}</div>
        </div>
      </div>
    </div>
    <!-- <div>
      <div class="weyPicChoose" v-show="wryPictureShow">
        <div v-for="(item,index) in wryPictureList" :key="index">
          <div
            class="wrypicChooseItem"
            @click="addChecked(index,item)"
            :class="{wrypicChooseItemCheck: wrypicCurrentnow === item.currentnow}"
          >{{item.title}}</div>
        </div>
      </div>
    </div> -->
    <!-- nav -->
    <div class="content" ref='homepage'>
      <!-- <keep-alive> -->
      <div :class="['leftmenu' ,{'offsetLeft':changeflag}]"  :style="leftMemuShowFlag?'':contentStyle">
         <div id="slide_btn" :class="{'slide':changeflag}" @click="toggleContent()">
            <img id="leftimg" v-bind:src="lefimgsrc">
          </div>
          <ul class="Three-navigationBar" v-show="leftMenu.childList.length">
          <li v-for="(item,index) in leftMenu.childList" :key="index" @click="tabInt3(item,index)">
            <a @click="toggle(item)" :class="{isChecked: currentIndex3 === item.currentIndex}">{{item.name}}  <div class="triangle" v-if="item.childList" ></div></a>
            <ul v-show="item.target" v-if="item.childList" class="Four-navigationBar">
              <li v-for="(itm4,index4) in item.childList" :key="index4" @click="tabInter4(item,index,itm4)">
                <a :class="{isChecke: currentIndex4 === itm4.currentIndex}">{{itm4.name}} </a>
              </li>
            </ul>
        </li>
      </ul>
      </div>
      <div class="conten-main">
         <component :is="componentData"></component>
      </div>
     
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
// 数据管理
// 引入数据管理子组件
import Picture from "./PollutantSource/PollutantSourcePicture1"; //污染源一张图；
import ecology from "./EcologicalEnvironment/ecology"; //生态环境专题；
import unitInfo0 from "./PollutantSource/PollutantSourcePicture"; //大气排名；
import unitInfo1 from "./GIS/WaterRank"; //水排名；
import unitInfo2 from "./GIS/SoilRank"; //土壤排名
import unitInfo3 from "./GIS/VoiceRank"; //噪声排名
import unitInfo4 from "./GIS/XfRank"; //信访排名
import unitInfo5 from "./GIS/ZfRank"; //执法排名
import unitInfo6 from "./GIS/GfRank"; //固废排名
import unitInfo7 from "./GIS/FsRank"; //辐射排名
import modelerList from "./activity/modelesList"; //流程模型List
import processDefinitionList from "./activity/processDefinitionList"; //流程定义list
import processInstanceList from "./activity/processInstanceList"; //流程实例List
import actxTaskDefinitionList from "./activity/actxTaskDefinitionList"; //流程节点List
import dbtaskList from "./sign/dbtaskList"; //待办任务List
import ybtaskList from "./sign/ybtaskList"; //已办任务list
import bjtaskList from "./sign/bjtaskList"; //办结任务List
import gkManageList from "./sign/gkManageList"; //管控决策管理
import concentration from "./EvaluateApicture/concentration"; //浓度分布图
import highValue from "./EvaluateApicture/HighPoint"; //浓度分布图
import police from "./EvaluateApicture/picture"; //浓度分布图
import controlAnalysis from "./EvaluateApicture/controlAnalysis";//管控分析
import createReport from "./yearReport/createReport"; //年报生成
import defData from "./yearReport/defData";//年报数据维护
import livestock from "./wryPicture/livestock";//污染源一张图-禽畜
import centralized from "./wryPicture/centralized"//污染源一张图-集中式
import indepBoiler from "./wryPicture/indepBoiler"//污染源一张图-独立办公区锅炉
import induBoiler from "./wryPicture/induBoiler"//污染源一张图-工业源锅炉
import industrial from "./wryPicture/industrial"//污染源一张图-工业企业
import lifeBoiler from "./wryPicture/lifeBoiler"//污染源一张图-生活锅炉
import riverMouth from "./wryPicture/riverMouth"//污染源一张图-入河口
import wryPicAll from "./wryPicture/wryPicAll"//污染源一张图-全部
export default {
  data() {
    return {
      menuname: "首页排行",
      currentIndex: 8,
      currentIndex2: 0,
      currentIndex3: 0,
      currentIndex4: 0,
      curr:0,
      currentnow: 0,
      wrypicCurrentnow:1,
      isShow: false,
      wryPictureShow:false,
      CurtIndex: 0,
      recordPage: "", //点击菜单切换保留当前页
      componentData: "unitInfo0",
      lefimgsrc:require("../assets/images/zhixinag.png"),
      contentStyle:{'width':'0px'},
      changeflag: false,
      isShowfour:true,
      leftMenu:{
        childList: []
      },
      //首页 的 大气 水环境 .. 辐射;
      list: [
        {
          title: "大气",
          currentnow: 0,
          componentsName: "unitInfo0"
        },
        {
          title: "水环境",
          currentnow: 1,
          componentsName: "unitInfo1"
        },
        {
          title: "土壤",
          currentnow: 2,
          componentsName: "unitInfo2"
        },
        {
          title: "噪声",
          currentnow: 3,
          componentsName: "unitInfo3"
        },
        {
          title: "信访",
          currentnow: 4,
          componentsName: "unitInfo4"
        },
        {
          title: "执法",
          currentnow: 5,
          componentsName: "unitInfo5"
        },
        {
          title: "固废",
          currentnow: 6,
          componentsName: "unitInfo6"
        },
        {
          title: "辐射",
          currentnow: 7,
          componentsName: "unitInfo7"
        }
      ],

      //污染源一张图 类型选择
     wryPictureList:[
       {
          title:"全部",
         currentnow:8,
         componentsName:"wryPicAll"
       },
       {
         title:"禽畜",
         currentnow:1,
         componentsName:"livestock"
       },{
         title:"集中式",
         currentnow:2,
         componentsName:"centralized"
       },{
          title:"独立办公区锅炉",
          currentnow:3,
          componentsName:"indepBoiler"
       },{
         title:"工业企业",
         currentnow:4,
         componentsName:"industrial"
       },{
         title:"工业源锅炉",
         currentnow:5,
         componentsName:"induBoiler"
       },{
         title:"生活锅炉",
         currentnow:6,
         componentsName:"lifeBoiler"
       },{
         title:"入河口",
         currentnow:7,
         componentsName:"riverMouth"
       }
     ],
      datas:[],
    };
  },
  components: {
    // 声明子组件
    Picture,
    unitInfo0,
    unitInfo1,
    unitInfo2,
    unitInfo3,
    unitInfo4,
    unitInfo5,
    unitInfo6,
    unitInfo7,
    modelerList,
    processDefinitionList,
    processInstanceList,
    actxTaskDefinitionList,
    ecology,
    dbtaskList,
    ybtaskList,
    bjtaskList,
    gkManageList,
    concentration,
    highValue,
    police,
     createReport,
     defData,
     livestock,
     centralized,
     indepBoiler,
     induBoiler,
     industrial,
     lifeBoiler,
     riverMouth,
     wryPicAll,
     controlAnalysis,

  },
  mounted() {
    this.getMenuList();
  },
  computed:{
  

  leftMemuShowFlag(){
    
    return this.leftMenu.childList.length;

  }
  },
  methods: {
      toggle:function(item){
            item.target = !item.target;
        },
    	toggleContent() {
				if(this.lefimgsrc == require("../assets/images/zhixinag.png")) {
					this.lefimgsrc = require("../assets/images/zhixinag2.png");
				} else {
					this.lefimgsrc = require("../assets/images/zhixinag.png");
				}
				this.changeflag = !this.changeflag;
			},
    getMenuList() {
      let _this=this;
      _this.$http({
        method:"post",
        // url:"http://117.121.97.120:9001/bjsy-zhgk/sys/menu/listJson"
        url:_this.baseurl+"zhgkhq/getMenuTreeByUserId"
      }).then(function(res){
        if(res.status==200){
          _this.datas=res.data;
         console.log( _this.datas);
         _this.datas.map((item)=>{
          if(item.currentIndex == 8){
            _this.isShow = true;
          }
         
        })
        }
      })
    },
    tabInter(item, index, itm) {
      this.isShow = false;
      this.currentIndex = item.currentIndex;
      this.currentIndex2 = itm.currentIndex;
      this.CurtIndex = itm.CurtIndex;
      this.componentData = itm.componentsName;
      if(itm.childList){
        this.leftMenu.childList = itm.childList;
        console.log(itm.childList)
        this.componentData = itm.childList[0].componentsName||itm.childList[0].childList[0].componentsName;
        this.currentIndex3 = itm.childList[0].currentIndex;
         this.currentIndex4 = itm.childList[0].childList[0].currentIndex;
      }else{
        this.leftMenu.childList = [];
      }

      
    },
    loginout() {
      let _this = this;
      this.$http
        .get(`${this.baseurl4}bjsy-sys/logout`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(function(res) {
          window.location.href =
            _this.baseurl4 + "bjsy-sys/loginPage/index.html";
        });
    },
    tabInt(index, item) {

       
       this.leftMenu.childList = [];
      if (item.childList) {

        return false;
      } else {
        this.componentData = item.componentsName;
        this.currentIndex = item.currentIndex;
        // this.wryPictureShow=false;
        if (index == 0) {
          this.isShow = true;
          this.componentData = this.recordPage ? this.recordPage : "unitInfo0";
        } else {
          this.componentData = item.componentsName;
          this.isShow = false;
        }
      }
    },
    tabInt3(item,index){

      console.log(item)
      if(item.childList!=null && item.childList!=''){
        return;
      }else{
        this.componentData = item.componentsName;
        this.currentIndex3 = item.currentIndex;
      }
      
    },
    tabInter4(item,index,itm4){
        this.componentData = itm4.componentsName;
        this.currentIndex3 = item.currentIndex;
        this.currentIndex4 = itm4.currentIndex;
        
    },
    addChecked(index, item) {
      this.recordPage = item.componentsName;
      this.componentData = item.componentsName;
      this.currentnow = item.currentnow;
      this.wrypicCurrentnow=item.currentnow;
      //     var arr = document.getElementsByClassName("RankchooseItem");
      //     for (var k=0;k<arr.length;k++){
      //        arr[k].classList.remove("RankchooseItemCheck");
      //     }
      //      arr[index].classList.add("RankchooseItemCheck");
      //     this.componentData="unitInfo"+index;
    },
  }
};
</script>
<style scoped lang="less">
.jdc-tabs {
  min-width: 1000px;
}
.logo-login {
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-login a {
  display: block;
  padding: 5px 8px;
  line-height: 35px;
  background: none;
  border: none;
  margin-right: 5px;
  color: #038fcf;
  font-size: 14px !important;
}

// .logo-login a:nth-child(2) {
// }

.logo-login a img {
  width: 30px;
  height: 30px;
}

.logo-login a .icon {
  font-size: 14px;
}

.logo-login a:hover {
  color: #ffffff;
  border-radius: 3px;
  background: rgba(3, 143, 207, 0.5);
}
///////头部背景
.signBar {
  width: 100%;
  height: 60px;
  background: url(../assets/images/cloud2.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
} // 导航栏
.navigationBar {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 36px;
  z-index: 1;
  border-bottom: 1px solid #029ad1;
  overflow: hidden;
  background-color: #fff;
  background-image: -moz-linear-gradient(
    90deg,
    rgb(241, 241, 241) 0%,
    rgb(248, 248, 248) 49%,
    rgb(255, 255, 255) 100%
  );
  background-image: -webkit-linear-gradient(
    90deg,
    rgb(241, 241, 241) 0%,
    rgb(248, 248, 248) 49%,
    rgb(255, 255, 255) 100%
  );
}

.navigationBar ul {
  position: absolute;
  z-index: 99999;
}
.navigationBar .Second-navigationBar {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
.navigationBar ul,
.navigationBar li {
  list-style: none;
  margin: 0;
  padding: 0;
  float: left;
}
.First-navigationBar > li {
  position: relative;
  height: 35px;
  margin-left: 10px;
}

.First-navigationBar li:hover ul {
  display: inline-block;
}

.First-navigationBar > li > a {
  width: 100%;
  padding: 0 10px;
  line-height: 35px;
  color: #333 !important;
  text-align: center;
  display: inline-block;
}

.Second-navigationBar {
  width: 100%;
  left: 0;
  display: none;
  background: #fff;
}
 .Second-navigationBar li{
  float: none;
  border-bottom: 1px solid #dbdbdb;
  border-top: none;
 }
.Three-navigationBar li a  {
  float: none;
  // height: 32px;
  border-bottom: 1px solid #dbdbdb;
  border-top: none;
}

.Second-navigationBar li a , .Three-navigationBar li a {
  width: 100%;
  line-height: 32px;
  color: #333 !important;
  text-align: left;
  border-top: none;
  display: block;
  padding: 0 10px;
}
.Four-navigationBar li a  {
 padding-left: 17px;
}
.First-navigationBar > li:hover > a,
.Second-navigationBar > li:hover > a,
.First-navigationBar .isChecked,
.First-navigationBar > li .isChecke,
.Second-navigationBar .isChecked,
.Second-navigationBar .isChecked a,

.Three-navigationBar > li:hover > a,
.Four-navigationBar > li:hover > a,
.Three-navigationBar .isChecked,
.Three-navigationBar > li .isChecke,
.Four-navigationBar .isChecked,
.Four-navigationBar .isChecked a{
  color: #fff !important;
  height: 100%;
  background-color: rgb(0, 172, 234);
  background-image: -webkit-linear-gradient(
    90deg,
    rgb(0, 172, 234) 0%,
    rgb(117, 212, 246) 100%
  );
} //  小三角
.triangle {
  display: inline-block;
  width: 0px;
  height: 0px;
  border-width: 5px;
  border-top-width: 5px;
  border-bottom-width: 0;
  margin-bottom: 2px;
  border-style: solid;
  border-color: #999 transparent transparent transparent;
}

.First-navigationBar li:hover .triangle,
.First-navigationBar .isChecked .triangle, 
.Three-navigationBar li:hover .triangle,
.Three-navigationBar .isChecked .triangle{
  border-color: #fff transparent transparent transparent;
}

.content {
  height: calc(100% - 96px);
  width: 100%;
}
.Rankchoose {
  width: 500px;
  height: 40px;
  background-color: #ffffff;
  position: absolute;
  top: 106px;
  left: 50%;
  margin-left: -250px;
  z-index: 33333;
  border-radius: 15px;
  display: inline-flex;
  padding: 5px 0px 5px 0px;
}
.weyPicChoose{
  width: 900px;
  height: 40px;
  background-color: #ffffff;
  position: absolute;
  top: 106px;
  left: 50%;
  margin-left: -450px;
  z-index: 33333;
  border-radius: 15px;
  display: inline-flex;
  padding: 5px 0px 5px 0px;
}
.RankchooseItem {
  width: 50px;
  line-height: 30px;
  margin-left: 12px;
  border-radius: 20px;
}
.wrypicChooseItem{
   width: 100px;
  line-height: 30px;
  margin-left: 12px;
  border-radius: 20px;
}
.wrypicChooseItem:hover{
  background-color: #029ad1;
  color: #ffffff;
  cursor: pointer;
}
.wrypicChooseItemCheck{
 background-color: #029ad1;
  color: #ffffff; 
}
.RankchooseItem:hover {
  background-color: #029ad1;
  color: #ffffff;
  cursor: pointer;
}
.RankchooseItemCheck {
  background-color: #029ad1;
  color: #ffffff;
}
.triangle {
  display: inline-block;
  width: 0;
  height: 0;
  border-width: 5px;
  border-top-width: 5px;
  border-bottom-width: 0;
  margin-bottom: 2px;
  border-style: solid;
  border-color: #999 transparent transparent;
}

.leftmenu{
  width: 200px;
  height: 100%;
  float: left;
  background: #fff;
  position: relative;
  border-right:1px solid #ebebeb;
}
.leftmenu.offsetLeft {
 width: 0px;

}
.leftmenu.offsetLeft .Three-navigationBar{
  display: none;
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
  

 .conten-main{
  height: 100%;
  overflow: auto;
 }
 ul li:hover{
   cursor: pointer;
 }
</style>

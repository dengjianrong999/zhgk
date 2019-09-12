<!--测试一下-->
<template>

	<div class="jdc-tabs">
		<!-- 头部 -->
		<!-- nav -->
		<div class="signBar">
			<!-- logo -->
			<div class="logo">
				<img src="../assets/images/logo_1920.png" alt="" ondragstart='return false;'>
				<img src="../assets/images/fushe1_1920.png" alt="" ondragstart='return false;'>
			</div>
			<!-- 退出登录 -->
			<div class="logo-login">

        	<a>
						<img src="../assets/images/user_1920.png" alt=""> 管理员</a>
        	<a href='http://124.42.41.43:9001/bjsy-sys/'>
						<i class="icon iconfont icon-shouye3"></i> 首页导航</a>
					<a href='http://124.42.41.43:9001/bjsy-sys/loginPage/index.html'>
						<i class="icon iconfont icon-tuichu"></i> 退出</a>
			</div>
		</div>
		<!--导航菜单栏-->
		<div class="navigationBar">
			<ul class="First-navigationBar">
				<li v-for='(item,index) in data' :key="index">
					<a href="#" @click="tabInt(index,item)" :class="{isChecked: index === currentIndex}">
						<i :class="item.icon"></i>
						{{item.name}}
						<div class="triangle"></div>
					</a>
					<ul class="Second-navigationBar">
						<li @click="tabInter(item,index,itm)" v-for='(itm,index) in item.childList' :key="index">
							<a :class="{isChecke: CurtIndex === itm.CurtIndex}">{{itm.name}}</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>

		<!-- nav -->
		<div class="content">
			<keep-alive>
				<component :is="componentData"></component>
			</keep-alive>
		</div>
	</div>

</template>

<script>
// 数据管理
// 引入数据管理子组件
import unitInfo0 from "./GIS/GISFixedMap";//固定源
import unitInfo1 from "./GIS/GISMobileMap";//移动源
import unitInfo2 from "./GIS/GISGPSMap";//gis
import rediationsource3 from "./QueryAndCount/QueryRadioactiveSourceInfo";//查询统计
import unitInfo4 from "./QueryAndCount/QueryRadiationLicense";//放射源查询
import unitInfo5 from "./QueryAndCount/StatisticalAnalysis";//统计分析
export default {
  name: "app",
  isShow: false,
  data() {
    return {
      currentIndex: 0,
      CurtIndex: 0,
      componentData: "unitInfo0",
      data: []
    };
  },
  components: {
    // 声明子组件
    unitInfo0,//固定源
    unitInfo1,//移动源
    unitInfo2,//gis
    rediationsource3,//查询统计
    unitInfo4,//许可证查询
    unitInfo5,//统计分析
  },
  mounted() {
    //加载菜单页
    var _this = this;
    _this
      .$http({
        method: "get",
        url: `${_this.baseurl.slice(0, 33)}/sys/menu/listJson`
      })
      .then(function(res) {
        if (res.status === 200 && res.data.status === "1") {
          _this.data = res.data.data[1].childList;
          console.log("this.data", _this.data);
          //组件和背景颜色
          _this.data.map((item, index) => {
            item.currentIndex = index;
            item.childList.map((ite, idx) => {
              ite.componentsName = ite.href.split("/")[2]+ite.target;
              ite.CurtIndex = ite.target;
            });
          });
        }
      })
      .catch(function(err) {
        console.log(err);
        setTimeout(() => {
          layer.msg("加载异常", {
            icon: 2
          });
        }, 5000);
      });
  },
  methods: {
    tabInter(item, index, itm) {
      this.currentIndex = item.currentIndex;
      this.CurtIndex = itm.CurtIndex;
      this.componentData = itm.componentsName;
    },
    tabInt(index, item) {
      // this.componentData = item.componentsName;
      // this.currentIndex = item.currentIndex;
      // console.log(item.currentIndex);
      // if (item.currentIndex == 4) {
      //     return;
      // } else {
      //     this.CurtIndex = item.items[0].CurtIndex;
      // }
    }
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
  z-index: 999;
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

.Second-navigationBar li {
  float: none;
  height: 32px;
  border-bottom: 1px solid #dbdbdb;
  border-top: none;
}

.Second-navigationBar li a {
  width: 100%;
  line-height: 32px;
  color: #333 !important;
  text-align: left;
  border-top: none;
  display: block;
  padding: 0 10px;
}

.First-navigationBar > li:hover > a,
.Second-navigationBar > li:hover a,
.First-navigationBar .isChecked,
.First-navigationBar > li .isChecke,
.Second-navigationBar .isChecked,
.Second-navigationBar .isChecked a {
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
.First-navigationBar .isChecked .triangle {
  border-color: #fff transparent transparent transparent;
}

.content {
  height: calc(100% - 96px);
}
</style>

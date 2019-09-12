<!--台账生成弹窗-->
<template>
    <div class="main">
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>单位名称：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="companyName" >
            </div>
        </div>
        
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>污染源类型：</span>
            </div>
            <div class="value">
			   <!-- <input class="myinput" v-model="typeId" > -->
               <el-select filterable placeholder="--请选择--"  v-model="typeId" :disabled="disabledFlag">
					<el-option v-for="item in companyTypeList" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
            </div>
        </div>
        <!-- <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>实际类型：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="typeReal" >
            </div>
        </div> -->
        <div class="block">
            <div class="name">
               
                <span>行业类别：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="industryTypeName" @click="opentree()">
            </div>
        </div>
        <div class="block">
            <div class="name">
               
                <span>经度：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="longitude" >
            </div>
        </div>
        <div class="block">
            <div class="name">
               
                <span>纬度：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="latitude" >
            </div>
        </div>
        
        <!-- <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>监控类别：</span>
            </div>
            <div class="value">
			 
               <el-select filterable placeholder="--请选择--"  v-model="controllerId" :disabled="disabledFlag">
					<el-option v-for="item in controlTypeList" :key="item.value" :label="item.text" :value="item.value">
					</el-option>
				</el-select>
            </div>
        </div> -->
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>年份：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="years" id="years">
            </div>
        </div>
        <div class="block" v-show="typeId=='污水处理厂重点源'">
            <div class="name">
              
                <span>处理工艺：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="process" >
            </div>
        </div>
       <div class="block" v-show="typeId=='污水处理厂重点源'">
            <div class="name">
              
                <span>处理量（万吨）（日/设计）：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="processVolume" >
            </div>
        </div>
        <div class="block" v-show="typeId=='污水处理厂重点源' || typeId=='废水重点污染源' || typeId=='重金属废水重点污染源'">
            <div class="name">
               
                <span>受纳水体：</span>
            </div>
            <div class="value">
			   <!-- <input class="myinput" v-model="outwhereId" > -->

               <el-select filterable placeholder="--请选择--"  v-model="outwhereId" :disabled="disabledFlag">
					<el-option v-for="item in outwhereList" :key="item.value" :label="item.text" :value="item.value">
					</el-option>
				</el-select>
            </div>
        </div>
        <!-- <div class="block" v-show="typeId=='污水处理厂重点源'">
            <div class="name">
                <i class="red_star">*</i>
                <span>处理量（日/实际）：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="processVolumeActual" >
            </div>
        </div> -->
        <div class="block" style="display:none">
           
            <div class="value">
              
				<input class="myinput"  v-model="id">
            </div>
        </div>
        <div class="foot22" v-if="isShow">
            <div class="btn_wrap">
                <span class="btn_m btn_cancle2" @click="cancle">取消</span>
            </div>

             <!-- <div class="btn_wrap">
                <span class="btn_m btn_confirm2" @click="openUserTree()">提交</span>
            </div> -->
            
            <div class="btn_wrap">
                <span class="btn_m btn_confirm2" @click='saves()'>保存</span>
            </div>
           
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
           
             disabledFlag:false,
             isShow:true,
             id:"",
             typeId:"",
             companyName:"",
             process:"",
             processVolume:"",
             processVolumeActual:"",
             industryTypeName:"",
             industryTypeId:"",
             controllerId:"",
             outwhereId:"",
             outwhereList:[],
             years:"",
             typeReal:"",
             longitude:"",
             latitude:"",
             controlTypeList:[],
             companyTypeList:[{value:"废水重点污染源"},{value:"废气重点污染源"},{value:"废气重金属废气重点污染源"},{value:"挥发性有机物污染源"},
                              {value:"污水处理厂重点源"},{value:"固废重点源"},{value:"重金属废水重点污染源"}],
            
            };
        },
        mounted() {
          this.getDetailData();
          setTimeout(() => {
			layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#years",
						type: "year",
						done: function (value) {
                              _this.years=value;
                            
						}
					});
				});
		}, 1000);
		
		
			
        },
        methods: {
			cancle() { // 关闭弹窗
				this.closeIframe();
			},
			closeIframe() { // 关闭弹窗
				this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
				parent.layer.close(this.frameIndex); //再执行关闭
			},
			
            showToggle: function (item) {
                item.isSubShow = !item.isSubShow;
            },
            saves() {
                if(this.companyName=="" || this.years=="" || this.typeId==""){
                    layer.msg("请填完必填项");
                    return;
                }else{
                let _this=this;
                let paramData={
                        id:_this.id,
                        typeId:_this.typeId,
                        process:_this.process,
                        processVolume:_this.processVolume,
                        // processVolumeActual:_this.processVolumeActual,
                        companyName:_this.companyName,
                        outwhereId:_this.outwhereId,
                        industryType:_this.industryTypeId,
                        years:_this.years,
                        longitude:_this.longitude,
                        latitude:_this.latitude,
                        //typeReal:_this.typeReal

                }
             
               
                this.$http({
                            method: 'post',
                            url: `${this.baseurl}/wrynb/company/save`,
                            data:paramData
                        })
                        .then(function (res) {
                            if (res.status === 200) {
                               layer.msg('保存成功！', {
                                icon: 1
                            });
                            _this.id=res.data.data.id;
                            }else{
                                layer.msg('保存失败！', {
                                icon: 2
                            });
                            }
                        });
                }
                    
            },
            
            getDetailData() {
               
                 let id = this.$route.params.id;
                 let _this = this;
                  let operateNum = JSON.parse(sessionStorage.getItem('operateNum')); // 操作类型 0详情 1修改
                    if (operateNum === '0') { //0详情
                        _this.disabledFlag = true;
						_this.isShow = false;
                    } else { // 修改
                        this.disabledFlag = false;
                    }
                    
                    if(id!='111'){
                        this.$http({
                            method: 'post',
                            url: _this.baseurl + "wrynb/company/data/"+id ,
                            
                        })
                        .then(function (res) {
                           
                         _this.id=res.data.data.id;
                         _this.typeId=res.data.data.typeId;
                         _this.companyName=res.data.data.companyName;
                         _this.process=res.data.data.process;
                         _this.processVolume=res.data.data.processVolume;
                        //  _this.processVolumeActual=res.data.data.processVolumeActual;
                        _this.controllerId=res.data.data.controllerId;
                        _this.industryTypeId=res.data.data.industryType;
                        _this.years=res.data.data.years;
                        _this.typeReal=res.data.data.typeReal;
                        _this.longitude=res.data.data.longitude;
                        _this.latitude=res.data.data.latitude;
                        // console.log(res.data.data.industryType);
                        if(res.data.data.industryType!=null && res.data.data.industryType!=''){
                                _this.$http({
                                    method:'post',
                                    url:_this.baseurl+"/wrynb/company/getIndustryTypeById?id="+res.data.data.industryType
                                }).then(function(res){
                                     _this.industryTypeName=res.data.NAME
                                    //console.log(res.data)
                                })
                        }
                        
                        });
                    }
                    this.$http({
                        method:'get',
                        url:_this.baseurl+"wrynb/OutwhereWater/listJson"
                    }).then(function(res){
                         _this.outwhereList.push({value:"",text:"--请选择--"});
                        for(var i in res.data.data){
                            _this.outwhereList.push({value:res.data.data[i].id,text:res.data.data[i].names});
                        }
                     
                        
                    })

                  
            },
            opentree(){
                  let _this=this;
              top.layer.open({
                                    type: 2,
                                    title: '选择',
                                    maxmin: true,
                                    resize: false,
                                    area: ["500px", "350px"],
                                    // anim: [parseInt(6 * Math.random())],
                                    content: _this.baseurl2+'#/industryTypeTree' ,
                                    success: function (layero) {
                                        layero.find('.layui-layer-min').remove()
                                    },
                                    end: function () {
                                    
                                  var node=JSON.parse(sessionStorage.getItem('industryTypeNode'));
                                
                                  _this.industryTypeName=node[0].name;
                                  _this.industryTypeId=node[0].id;
                                    }
                                });
            }
        }
    };
</script>

<style scoped="scoped" lang="less">
    .main {
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        max-height: 90vh;
        overflow: auto;
    }

    .main .block {
        display: flex;
        align-items: center;
        width: 50%;
        height: 50px;
        border: 1px solid #eee;
        border-top: 0;
    }

    .main .block:nth-of-type(1) {
        border-top: 1px solid #eee;
    }

    .main .block:nth-of-type(2) {
        border-top: 1px solid #eee;
    }

    .main .block:nth-of-type(2n) {
        border-left: 0;
    }

    .main .name,
    .value {
        display: inline-block;
    }

    .main .value {
        position: relative;
        flex: auto;
        height: 100%;
        padding: 10px 6px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .main input,
    .main select {
        border: 1px solid #dbdbdb;
        border-radius: 3px;
        color: #666;
    }

    .main select:disabled {
        color: #999;
    }

    select:invalid {
        color: #999;
    }

    .main select {
        /*很关键：将默认的select选择框样式清除*/
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        /*为下拉小箭头留出一点位置，避免被文字覆盖*/
        padding-right: 22px;
    }

    .main .name {
        border-right: 1px solid #ededed;
        width: 100px;
        height: 100%;
        color: #333;
        font-weight: 700;
        font-size: 12px;
        color: #333;
        padding: 0px 1px;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .main .myinput,
    .main select {
        width: 100%;
        height: 26px;
        text-indent: 10px;
    }

    .main .red_star {
        color: #ff0000;
        margin-right: 3px;
        margin-top: 3px;
    }

    .remark {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border: 1px solid #ededed;
    }

    .remark .value {
        display: flex;
    }

    .remark .value textarea {
        height: 80px;
        resize: none;
        padding-top: 5px;
    }

    .foot22 {
			width: 100%;
			height: 76px;
			display: flex;
			align-items: center;
			padding: 10px;
			position: fixed;
			bottom: 0px;
			background-color: #fff;
		}

    .btn_wrap {
       text-align: center;
       width:50%;
       align-items: center;
        // text-align: right;
    }

    // .btn_wrap.left {
    //     text-align: left;
    // }

    .btn_m {
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 3px;
        cursor: pointer;
    }

    .btn_m:hover {
        opacity: 0.8;
        filter: alpha(opacity=80);
    }

    .btn_cancle2 {
        // margin-right: 110px;
        height: 30px;
        width: 100px;
        border-color: #db9554;
        color: #db9554;
        line-height: 30px;
        text-align: center;
    }

    .btn_cancle2:active {
        background: #db9554;
        color: #fff;
    }

    .btn_confirm2 {
        // margin-left: 110px;
        height: 30px;
        width: 100px;
        border-color: #029ad1;
        color: #029ad1;
        line-height: 30px;
        text-align: center;
    }

    .btn_confirm2:active {
        background: #029ad1;
        color: #fff;
    }
    /* 滚动条 */

     ::-webkit-scrollbar-thumb {
        background-color: #018ee8;
        outline-offset: -2px;
        outline: 2px solid #fff;
        -webkit-border-radius: 4px;
        border: 2px solid #fff;
    }

     ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

     ::-webkit-scrollbar-track-piece {
        background-color: #fff;
        -webkit-border-radius: 0;
    }
    /* triangle_down  三角形 下*/

    .triangle_down {
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        border-color: #666 transparent transparent transparent;
        position: absolute;
        top: 50%;
        margin-top: -3px;
        right: 16px;
    }

    span {
        overflow: hidden;
        position: relative;
        .upload {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            cursor: pointer;
        }
    }
    .topnone{
        border-top:none;
    }
</style>
<style>
.el-input__icon{
		line-height: 26px;
	}
</style>

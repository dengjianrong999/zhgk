<!--台账生成弹窗-->
<template>
    <div class="main">
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>排口名称：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="outletName">
            </div>
        </div>
        
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>排口类型：</span>
            </div>
            <div class="value">
			   <!-- <input class="myinput" v-model="outletType" > -->
               <el-select filterable placeholder="--请选择--"  v-model="outletType" :disabled="disabledFlag" required>
					<el-option v-for="item in outletTypeList" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
            </div>
        </div>
        <div class="block">
            <div class="name">
              
                <span>排气筒高度：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="outletHeight" >
                <!-- <el-select filterable placeholder="--请选择--"  v-model="outwhereId" :disabled="disabledFlag">
					<el-option v-for="item in outWhereList" :key="item.value" :label="item.text" :value="item.value">
					</el-option>
				</el-select> -->
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>评价标准：</span>
            </div>
            <div class="value">
			   <!-- <input class="myinput" v-model="standardId" > -->
               <el-select filterable placeholder="--请选择--"  v-model="standardId" :disabled="disabledFlag" required>
					<el-option v-for="item in standardList" :key="item.value" :label="item.text" :value="item.value">
					</el-option>
				</el-select>
            </div>
        </div>
        <div class="block">
            <div class="name">
               
                <span>排放口代码：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="outletCode" >
            </div>
        </div>
        <div class="block">
            <div class="name">
               
                <span>监测频率：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="monitorRate" >
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>单位名称：</span>
            </div>
            <div class="value">
			   <!-- <input class="myinput" v-model="companyId" > -->
                <el-select filterable placeholder="--请选择--"  v-model="companyId" :disabled="disabledFlag">
					<el-option v-for="item in companyList" :key="item.value" :label="item.text" :value="item.value">
					</el-option>
				</el-select>
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>监测项目：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="factorName" @click="opentree()">
               
                <!-- <el-select filterable placeholder="--请选择--"  v-model="companyId" :disabled="disabledFlag">
					<el-option v-for="item in companyList" :key="item.value" :label="item.text" :value="item.value">
					</el-option>
				</el-select> -->
            </div>
        </div>
        <div class="remark">
            <div class="name">
                
                <span>备注：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="remarks" >
            </div>
        </div>
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
             companyId:"",
             outletName:"",
             outletType:"",
             outletTypeList:[{value:"VOC"},{value:"重金属废气"},{value:"锅炉废气"}],
             outletHeight:"",
            //  codeWaterarea:"",
            //  monitorFactor:"",
           //  outLimit:"",
             outletCode:"",
             standardId:"",
             monitorRate:"",
             remarks:"",
             companyList:[],
             standardList:[],
             factorId:"",
             factorName:"",
            };
        },
        mounted() {
          this.getDetailData();
		
			
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
                if(outletName=="" || outletType=="" || standardId=="" || companyId=="" || factorId==""){
                    layer.msg("请必填完必填项");
                    return;
                }else{
                let _this=this;
                let paramData={
                        id:_this.id,
                        companyId:_this.companyId,
                        outletName:_this.outletName,
                        outletType:_this.outletType,
                        outletHeight:_this.outletHeight,
                        // codeWaterarea:_this.codeWaterarea,
                        // monitorFactor:_this.monitorFactor,
                        // outLimit:_this.outLimit,
                        outletCode:_this.outletCode,
                        standardId:_this.standardId,
                        monitorRate:_this.monitorRate,
                        remarks:_this.remarks,
                        factorId:_this.factorId
                }
                // console.log(paramData);
                // return;
               
                this.$http({
                            method: 'post',
                            url: `${this.baseurl}/wrynb/outletGas/save
`,
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
                            url: _this.baseurl + "wrynb/outletGas/data/"+id ,
                            
                        })
                        .then(function (res) {
                           
                         _this.id=res.data.data.id;
                         _this.companyId=res.data.data.companyId;
                         _this.outletName=res.data.data.outletName;
                         _this.outletType=res.data.data.outletType;
                         _this.outletHeight=res.data.data.outletHeight;
                        //  _this.codeWaterarea=res.data.data.codeWaterarea;
                        //  _this.monitorFactor=res.data.data.monitorFactor;
                        //  _this.outLimit=res.data.data.outLimit;
                         _this.outletCode=res.data.data.outletCode;
                         _this.standardId=res.data.data.standardId;
                         _this.monitorRate=res.data.data.monitorRate;
                         _this.remarks=res.data.data.remarks;
                         _this.factorId=res.data.data.factorId;
                          _this.$http({
                             url:_this.baseurl+"wrynb/outletGas/getFactorNameListByIds?factorId="+res.data.data.factorId,
                             method:'post'
                         }).then(function(res1){
                             if(res1.status==200){
                            //    console.log(res1)
                               _this.factorName=res1.data.NAME
                             }
                         })
                        
                        
                        });
                    }
                  
                    _this.$http({
                        method:'post',
                        url:_this.baseurl+"wrynb/company/getConpanyNameByType?type=气"
                    }).then(function(res){
                        console.log()
                        for(var i in res.data){
                            _this.companyList.push({value:res.data[i].ID,text:res.data[i].COMPANY_NAME+"("+res.data[i].YEARS+")"})
                        }
                        console.log(_this.companyList);
                    })
                    _this.$http({
                        url:_this.baseurl+"wrynb/evaluationStandard/listJson?types=气",
                        method:'get'
                    }).then(function(res){
                        for(var i in res.data.data){
                            _this.standardList.push({value:res.data.data[i].id,text:res.data.data[i].name})
                        }
                        // console.log(_this.standardList)
                    })
                  
            },
             opentree(){
                 if(this.standardId==null || this.standardId==""){
                     layer.msg("请选择评价标准！");
                 }else{

                
                  let _this=this;
                  sessionStorage.setItem('standardId',_this.standardId);
                  sessionStorage.setItem('factorIds',_this.factorId);
                  sessionStorage.setItem('types','fq');
              top.layer.open({
                                    type: 2,
                                    title: '选择',
                                    maxmin: true,
                                    resize: false,
                                    area: ["500px", "350px"],
                                    // anim: [parseInt(6 * Math.random())],
                                    content: _this.baseurl2+'#/fsjczbTree' ,
                                    success: function (layero) {
                                        layero.find('.layui-layer-min').remove()
                                    },
                                    end: function () {
                                        if(sessionStorage.getItem('confirmState')=='1'){
                                            var node=JSON.parse(sessionStorage.getItem('factorNodes'));
                                            let idList=[];
                                            let nameList=[];
                                            for(var i in node){
                                            idList.push(node[i].id);
                                            nameList.push(node[i].name);
                                            
                                            }
                                            _this.factorId=idList.join(';');
                                            _this.factorName=nameList.join(';');
                                        }
                                
                                    }
                                });
            }
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

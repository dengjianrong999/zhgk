<!--台账生成弹窗-->
<template>
    <div class="main">
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>因子名称：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="name" >
            </div>
        </div>
        
        <div class="block">
            <div class="name">
               
                <span>排放限值：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="limitValue" >
            </div>
        </div>
        <div class="block">
            <div class="name">
              
                <span>单位：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="unit" >
            </div>
        </div>
        <div class="block">
            <div class="name">
               
                <span>是否特征污染物：</span>
            </div>
            <div class="value">
			   <!-- <input class="myinput" v-model="isTzxfactors" > -->
               <el-select filterable placeholder="--请选择--"  v-model="isTzxfactors" :disabled="disabledFlag">
					<el-option v-for="item in isTzxfactorsList" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>

            </div>
        </div>
        <!-- <div class="block">
            <div class="name">
                
                <span>水体执行标准：</span>
            </div>
            <div class="value">
			
               <el-select filterable placeholder="--请选择--"  v-model="executiveStandard" :disabled="disabledFlag">
					<el-option v-for="item in executiveStandardList" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
            </div>
        </div> -->

        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>评价标准：</span>
            </div>
            <div class="value">
			   <!-- <input class="myinput" v-model="standardId" > -->
               <el-select filterable placeholder="--请选择--"  v-model="standardId" :disabled="disabledFlag">
					<el-option v-for="item in standardIdList" :key="item.value" :label="item.text" :value="item.value">
					</el-option>
				</el-select>
            </div>
        </div>

        <!-- <div class="block">
            <div class="name">
               
                <span>联审标准：</span>
            </div>
            <div class="value">
			   <input class="myinput" v-model="checkStandard" >
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
             name:"",
             limitValue:"",
             checkStandard:"",
             unit:"",
             isTzxfactors:"",
             isTzxfactorsList:[{value:"是"},{value:"否"}],
             executiveStandard:"",
             executiveStandardList:[{value:"Ⅰ类水"},{value:"Ⅱ类水"},{value:"Ⅲ类水"},{value:"Ⅳ类水"},{value:"Ⅴ类水"}],
             standardId:"",
             standardIdList:[],
             
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
                if(this.name=="" || this.limitValue=="" ||this.standardId==""){
                    layer.msg("请填完必填项");
                    return ;
                }else{
                let _this=this;
                let paramData={
                        id:_this.id,
                        name:_this.name,
                        limitValue:_this.limitValue,
                        unit:_this.unit,
                        standardId:_this.standardId,
                       // executiveStandard:_this.executiveStandard,
                        isTzxfactors:_this.isTzxfactors,
                     //   checkStandard:_this.checkStandard,
                        
                }
                // console.log(paramData);
                // return;
               
                this.$http({
                            method: 'post',
                            url: `${this.baseurl}/wrynb/LimitFactorW/save`,
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
                            url: _this.baseurl + "wrynb/LimitFactorW/data/"+id ,
                            
                        })
                        .then(function (res) {
                            // console.log(res.data.data);
                         _this.id=res.data.data.id;
                         _this.name=res.data.data.name;
                         _this.limitValue=res.data.data.limitValue;
                         _this.unit=res.data.data.unit;
                         _this.isTzxfactors=res.data.data.isTzxfactors;
                         _this.standardId=res.data.data.standardId;
                         //_this.executiveStandard=res.data.data.executiveStandard;
                        // _this.checkStandard=res.data.data.checkStandard;
                       
                        });

                       
                    }
                     _this.$http({
                        url:_this.baseurl+"wrynb/evaluationStandard/listJson?types=水",
                        method:'get'
                        }).then(function(res1){
                        for(var i in res1.data.data){
                            _this.standardIdList.push({value:res1.data.data[i].id,text:res1.data.data[i].name})
                        }
                        // console.log(_this.standardList)
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

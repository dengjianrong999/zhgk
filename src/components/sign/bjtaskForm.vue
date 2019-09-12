<!--台账生成弹窗-->
<template>
    <div class="main">
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>会签类型：</span>
            </div>
            <div class="value">
			    <!-- <el-select filterable placeholder="--请选择--"  v-model="type">
					<el-option v-for="item in gktype" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select> -->
                <input class="myinput" v-model="type" readonly="readonly">
            </div>
        </div>
        

        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>会签时间：</span>
            </div>
            <div class="value">
                <i class="el-input__icon el-icon-date"></i>
				<input class="myinput"  v-model="signtime" readonly="readonly">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>审核人员：</span>
            </div>
            <div class="value">
				<input class="myinput"  v-model="examineName" readonly="readonly">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>审核时间：</span>
            </div>
            <div class="value">
				<input class="myinput"  v-model="examinetime" readonly="readonly">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>发布人员：</span>
            </div>
            <div class="value">
				<input class="myinput"  v-model="deployName" readonly="readonly">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>发布时间：</span>
            </div>
            <div class="value">
				<input class="myinput"  v-model="deploytime" readonly="readonly">
            </div>
        </div>
        <div class="remark">
            <div class="name">
                <i class="red_star">*</i>
                <span>标题：</span>
            </div>
            <div class="value">
				<input class="myinput" v-model="title" readonly="readonly">
            </div>
        </div>
        <div class="remark">
            <div class="name">
                <i class="red_star">*</i>
                <span>描述：</span>
            </div>
            <div class="value">
				<textarea class="myinput" v-model="describe"></textarea>
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>管控效果：</span>
            </div>
            <div class="value">
			    <el-select filterable placeholder="--请选择--"  v-model="effect" :disabled="disabledFlag">
					<el-option v-for="item in effectType" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
                
            </div>
        </div>
        <div class="block" style="display:none">
           
            <div class="value">
              
				<input class="myinput"  v-model="pkid">
            </div>
        </div>
        <div class="foot" v-if="isShow">
            <div class="btn_wrap">
                <span class="btn_m btn_cancle" @click="cancle">取消</span>
            </div>
            <div class="btn_wrap left">
                <span class="btn_m btn_confirm" @click='saves()'>评价</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                    disabledFlag:false,
                    type:"",
                    pkid:"",
                    signtime:"",
                    title:"",
                    describe:"",
                    state:"",
                    examinetime:"",
                    examineperson:"",
                    examineName:"",
                    deploytime:"",
                    deployperson:"",
                    deployName:"",
                    processid:"",
                    effect:"",
                    isShow:true,
                    effectType:[{value:"优级管控效果"},{value:"一般管控效果"},{value:"较差管控效果"}]
				

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
                let _this=this;
                let paramData={
                        pkid:_this.pkid,
                        type:_this.type,
                        signtime:_this.signtime,
                        title:_this.title,
                        describe:_this.describe,
                        signtime:_this.signtime,
                        examinetime:_this.examinetime,
                        examineperson:_this.examineperson,
                        deploytime:_this.deploytime,
                        deployperson:_this.deployperson,
                        processid:_this.processid,
                        effect:_this.effect

                }
                // console.log(paramData);
                // return;
                
                layer.confirm(
					"确认评价该业务数据吗", {
						icon: 2,
						title: "警告",
						btn: ["确定", "取消"]
					},
					function (index) {
				     _this.$http({
                            method: 'post',
                            url: `${_this.baseurl}/zhgkhq/assessSign`,
                            data:paramData
                        })
                        .then(function (res) {
                            if (res.status === 200 && res.data.status === 1) {
                               layer.msg('评价成功！', {
                                icon: 1
                            });
                            // let timer = setTimeout(function () {
                            //         _this.closeIframe();
                            //         clearTimeout(timer);
                            //     }, 1000);
                            }else{
                                layer.msg('评价失败！', {
                                icon: 2
                            });
                            }
                        });

					},
					function (index) {
						layer.msg("取消评价");
					}
				);
                    
            },
            getDetailData() {
                 let id = this.$route.params.id;
                 let _this = this;
                  let  userinfo=[];
                  let operateNum = JSON.parse(sessionStorage.getItem('operateNum')); // 操作类型 0详情 1修改
                    if (operateNum === '0') { //0详情
                        _this.disabledFlag = true;
						_this.isShow = false;
                    } else { // 修改
                        this.disabledFlag = false;
                    }
                     
                       
                      this.$http({
                            method: 'post',
                            url: _this.baseurl + "/zhgkhq/getSignById?id="+id ,
                            
                        })
                        .then(function (res) {
                         _this.type=res.data.type;
                         _this.pkid=res.data.pkid;
                         _this.title=res.data.title;
                         _this.describe=res.data.describe;
                         _this.signtime=res.data.signtime;
                         _this.examinetime=res.data.examinetime;
                         _this.examineperson=res.data.examineperson;
                         _this.deploytime=res.data.deploytime;
                         _this.deployperson=res.data.deployperson;
                         _this.processid=res.data.processid;
                         _this.effect=res.data.effect;
                        _this.$http({
                              method: 'post',
                            url: _this.baseurl + "/zhgkhq/getUserList",
                         }).then(function(res){
                             if(res.status==200){
                                
                                for(var i in res.data){
                                    if(_this.deployperson==res.data[i].id){
                                        _this.deployName=res.data[i].name;
                                    }
                                    if(_this.examineperson==res.data[i].id){
                                        _this.examineName=res.data[i].name;
                                    }
                                }
                             }
                         });
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

    .foot {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px;
        position: fixed;
        bottom: 2%;
    }

    .btn_wrap {
        display: inline-block;
        width: 50%;
        padding: 4px 10px;
        text-align: right;
    }

    .btn_wrap.left {
        text-align: left;
    }

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

    .btn_cancle {
        margin-right: 110px;
        height: 30px;
        width: 100px;
        border-color: #db9554;
        color: #db9554;
    }

    .btn_cancle:active {
        background: #db9554;
        color: #fff;
    }

    .btn_confirm {
        margin-left: 110px;
        height: 30px;
        width: 100px;
        border-color: #029ad1;
        color: #029ad1;
    }

    .btn_confirm:active {
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

<!--台账生成弹窗-->
<template>
    <div class="main">
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>主键：</span>
            </div>
            <div class="value">
				<i class="el-input__icon el-icon-date"></i>
                <input type="text"  class="myinput" v-model="pkid">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>任务节点定义ID：</span>
            </div>
            <div class="value">
				<input class="myinput" v-model="taskKey">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>任务节点名称：</span>
            </div>
            <div class="value">
				<input class="myinput" v-model="taskName">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>流程定义ID：</span>
            </div>
            <div class="value">
				<input class="myinput" v-model="procDefKey">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>流程发布id：</span>
            </div>
            <div class="value">
				<input class="myinput" v-model="deploymentId">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>是否绑定角色：</span>
            </div>
            <div class="value">
				<input class="myinput" v-model="roleId">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>是否需要选择用户</span>
            </div>
            <div class="value">
				<input class="myinput" v-model="isSelectUser">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>是否可以多选用户</span>
            </div>
            <div class="value">
				<input class="myinput" v-model="isMultiUser">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>用户作用域</span>
            </div>
            <div class="value">
				<input class="myinput" v-model="userDomain">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>实体索引</span>
            </div>
            <div class="value">
				<input class="myinput" v-model="activeEntityKeys">
            </div>
        </div>

        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>表单类型</span>
            </div>
            <div class="value">
				<input class="myinput" v-model="formType">
            </div>
        </div>

        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>表单参数</span>
            </div>
            <div class="value">
				<input class="myinput" v-model="formParam">
            </div>
        </div>

        <div class="foot" v-if="isShow">
            <div class="btn_wrap">
                <span class="btn_m btn_cancle" @click="cancle">取消</span>
            </div>
            <div class="btn_wrap left">
                <span class="btn_m btn_confirm" @click='saves()'>确认</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              pkid:"",
              taskKey:"",
              taskName:"",
              procDefKey:"",
              deploymentId:"",
              roleId:"",
              isSelectUser:"",
              isMultiUser:"",
              userDomain:"",
              activeEntityKeys:"",
              formType:"",
              formParam:"",
              isShow:true,
				

            };
        },
        mounted() {
            this.getDetailData();
			//时间插件 
			// let _this = this;
			// setTimeout(function () {
			// 	layui.use("laydate", function () {
			// 		var laydate = layui.laydate;
			// 		//执行一个laydate实例
			// 		laydate.render({
			// 			elem: "#surface1",
			// 			type: "datetime",
			// 			done: function (value) {
			// 					_this.time = value;
			// 			}
			// 		});
			// 	});
			// }, 0);
			// 上传附件
			// $(function () {
			// 	layui.use('upload', function () {
			// 		var upload = layui.upload;
			// 		//执行实例
			// 		var uploadInst = upload.render({
			// 			elem: '#test1',
			// 			url: 'carCheckInfo/save',
			// 			accept: 'file',
			// 			auto: false,
			// 			bindAction: '#saves',
			// 			multiple: true,
			// 			done: function (res) {
			// 				//上传完毕回调
			// 			},
			// 			error: function () {
			// 				//请求异常回调
			// 			}
			// 		});
			// 	});
			// })
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
                            taskKey:_this.taskKey,
                            taskName:_this.taskName,
                            procDefKey:_this.procDefKey,
                            deploymentId:_this.deploymentId,
                            roleId:_this.roleId,
                            isSelectUser:_this.isSelectUser,
                            isMultiUser:_this.isMultiUser,
                            userDomain:_this.userDomain,
                            activeEntityKeys:_this.activeEntityKeys,
                            formType:_this.formType,
                            formParam:_this.formParam
                }
                let myParamData=JSON.stringify(paramData);
                $.post(_this.baseurl +"act/processXml/actxTaskDefinition/save",{data:myParamData},function(msg){
                    if(msg.status==1){
                         layer.msg('保存成功！', {
                                icon: 1
                            });
                        let timer = setTimeout(function () {
								_this.closeIframe();
								clearTimeout(timer);
							}, 1000);
                    }else{
                        console.log(msg.message);
                        layer.msg('数据加载异常！！！', {
								icon: 2
							});
                    }
                });
                // console.log(myParamData);
                // // return;
				//   _this.$http({
                //         method: "POST",
                //         url: `${_this.baseurl}act/processXml/actxTaskDefinition/save2`,
                //         data: {data:myParamData},
                //     }).then(function (res) {
                //         if (res.status === 200 && res.data.status === '1') {
                //             layer.msg('保存成功！', {
                //                 icon: 1
                //             });
				// 			let timer = setTimeout(function () {
				// 				_this.closeIframe();
				// 				clearTimeout(timer);
				// 			}, 1000);
                //         }
                //     }).catch(function (err) {
				// 			console.log(err);
				// 			layer.msg('数据加载异常！！！', {
				// 				icon: 2
				// 			});
						
				// 		});
                    
            },
            getDetailData() {
                // 操作 operateNum0详情 1修改
                let id = this.$route.params.id;
                let _this = this;
				
                    this.$http({
                            method: 'get',
                            url: `${this.baseurl}act/processXml/actxTaskDefinition/data/${id}`
                        })
                        .then(function (res) {
                            if (res.status === 200 && res.data.status === '1') {
                               // console.log(res.data.data)
                                let datas = res.data.data;
                                _this.taskName=datas.taskName;
                                _this.taskKey=datas.taskKey;
                                _this.deploymentId=datas.deploymentId;
                                _this.pkid=datas.pkid;
                                _this.procDefKey=datas.procDefKey;
                              
                            }
                        });
                
            },
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

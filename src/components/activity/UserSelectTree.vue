<!--台账生成弹窗-->
<template>
<div>
 <div id="treeDemo" class="ztree" style="width:480px;height:250px; overflow:auto;"></div>
 <div class="foot">
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
    // import "../plugins/zTree_v3-master/css/zTreeStyle/zTreeStyle.css"
    export default {
        data() {
            return {
                zNodes:[],
                zTreeObj:null,
                setting : {
                            data : {
                                    simpleData : {
                                    enable : true,
                                    idKey : "id",
                                    pIdKey : "parentid",
                                    rootPid : "null"
                                }
                            },
                            view:{
                                selectedMulti:true
                            },
                            check:{
                                chkboxType:{ "Y": "ps", "N": "ps" },
                                chkStyle:"checkbox",
                                enable: true,

                            }
                },
                
				callback:{
                    beforeCheck : function(treeId, treeNode) {
                        if (treeNode.ischeck=='false') {
                            return false;
                        }
                    }
                }

            };
        },
        mounted() {
          this.initTree();
        //   $(".ztree").html("1111s")
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
            initTree(){
                // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
               let _this=this;
               _this.$http({
                    method: 'post',
                    url: _this.baseurl + "/zhgkhq/getUserTree",
               }).then(function(res){
                //    console.log(res);
                //    for(var i in res.data){
                //        _this.zNodes[i].name=res.data[i].NAME;
                //        _this.zNodes[i].id=res.data[i].ID;
                //        _this.zNodes[i].parentId=res.data[i].PARENTID
                //    }
               
                     _this.zNodes=res.data;
                    
                   _this.zTreeObj = $.fn.zTree.init($("#treeDemo"), _this.setting,_this.zNodes);
               })
               

                 
            },saves(){
               let _this=this;
               let CheckedNodes=_this.zTreeObj.getCheckedNodes(true);
               let userNode=[];
               for(var i in CheckedNodes){
                   if(CheckedNodes[i].type==2){
                       userNode.push(CheckedNodes[i].id);
                   }
               }
                sessionStorage.setItem('UserNodes', JSON.stringify(userNode));
                this.closeIframe();
                // console.log(CheckedNodes);
                // console.log(userNode);
            }
           
          
        }
    };
</script>
<style scoped="scoped" lang="less">
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
    .btn_wrap.left {
        text-align: left;
    }
    /* 设置文字对齐 */
	.ztree * {
	  padding-top: 10px;
	}
	/* 设置图标 */
	.ztree li span.button.ico_close::before {
		content: "\f067";
	}
	.ztree li span.button.ico_open::before {
    	content: "\f068";
	}
	.ztree li span.button.ico_docu::before {
   	 	content: "\f007";
	}
</style>



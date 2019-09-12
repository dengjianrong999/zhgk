<!--台账生成弹窗-->
<template>
<div style="width:100%;height:100%;">
 <div id="treeDemo" class="ztree" style="width:100%;height:80%;">
            <table class="table table-bordered">
				<thead>
					<tr>
                        <th scope="col">选择</th>
						<th scope="col">因子名称</th>
                        <th scope="col">因子ID</th>
                        <th scope="col">单位</th>
                        <th scope="col">因子限值</th>
                        <th scope="col">评价标准</th>
					</tr>
				</thead>
                <tbody>
                   
                    <tr v-for="(item,index) of zNodes" :key='index'>
                        <td><input type="radio"  name="choose" :checked="checkList==item.ID" @click="getCheckedList(item.ID,item.NAME)"></td>
                        <td>{{item.NAME}}</td>
                        <td>{{item.ID}}</td>
                        <td>{{item.UNIT}}</td>
                        <td>{{item.LIMIT_VALUE}}</td>
                         <td :title="item.STANDARDNAME">{{item.STANDARDNAME}}</td>
                    </tr>
                    
                </tbody>
            </table>

 </div>
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
                checkList:"",
                checknameList:"",
                factorId:sessionStorage.getItem('factorIds'),
                
               

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
               
                var outletId=sessionStorage.getItem("outletId");
                var standardId=sessionStorage.getItem("standardId");
                let _this=this;
                sessionStorage.setItem('confirmState','0');
                var myurl="";
                if(sessionStorage.getItem('types')=='fs'){
                    myurl=_this.baseurl + "/wrynb/outletWater/getFactorByOutletId?outletId="+outletId;
                }else if(sessionStorage.getItem('types')=='fq'){
                    myurl=_this.baseurl + "/wrynb/outletGas/getFactorByOutletId?outletId="+outletId;
                }else if(sessionStorage.getItem('types')=='cjdq') {
                    myurl=_this.baseurl + "/wrynb/gfFborder/getFactorTree?standardId="+standardId;
                }else{
                    myurl=_this.baseurl + "/wrynb/outletWater/getFactorTree?standardId="+standardId
                }
                
               
               _this.$http({
                    method: 'post',
                    url: myurl,
               }).then(function(res){
                 
                //    console.log();
                //    for(var i in res.data){
                //        _this.zNodes[i].name=res.data[i].NAME;
                //        _this.zNodes[i].id=res.data[i].ID;
                //        _this.zNodes[i].parentId=null
                //    }
               // console.log(res);
                     _this.zNodes=res.data;
                     for(var i in res.data){
                         if(_this.factorId==res.data[i].ID){
                             _this.checkList=res.data[i].ID;
                             _this.checknameList=res.data[i].NAME;
                         }
                     }
                    
                //    _this.zTreeObj = $.fn.zTree.init($("#treeDemo"), _this.setting,_this.zNodes);
                //    let factorIds=sessionStorage.getItem('factorIds').split(";");
                //    for(var i in factorIds){
                //        let node=_this.zTreeObj.getNodeByParam('id',factorIds[i]);
                //        _this.zTreeObj.checkNode(node);

                //    }
               })
               

                 
            },saves(){
               
            //    let _this=this;
            //    let CheckedNodes=_this.zTreeObj.getCheckedNodes(true);
              
                let factorNodes="";
            //    for(var i in CheckedNodes){
                 
            //            factorNodes.push({id:CheckedNodes[i].id,name:CheckedNodes[i].name});
                   
            //    }
            //    console.log(factorNodes);
                // sessionStorage.setItem('factorNodes', JSON.stringify(factorNodes));
                 sessionStorage.setItem('confirmState','1');
                
                 factorNodes={id:this.checkList,name:this.checknameList};
                
                  sessionStorage.setItem('factorNodes', JSON.stringify(factorNodes));
                 //console.log(factorNodes);
                 this.closeIframe();
                // console.log(CheckedNodes);
                // console.log(userNode);
            },
            getCheckedList(id,name){
                if(this.checkList!=id){
                     this.checkList=id;
                     this.checknameList=name;
                }
             
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
	// .ztree * {
	//   padding-top: 10px;
	// }
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



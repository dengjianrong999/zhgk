<!--
放射源信息
-->
<template>
	<!--右-->
	<div class="fs-right">
		<!--输入框-->
		<div class="input-box">
			<div class="input-group">
				<span class="input-group-addon">流程实例名称：</span>
				<input type="text" class="form-control" v-model='keyname'>
			</div>
			
			<div class="input-group">
			</div>
			<!--按钮-->
			<div class="input-group">
				<span class="btn_content btn_query" @click="getpage()">
					<i class="iconfont icon-chaxun2"></i>
					<span>查询</span>
				</span>
                
				<span class="btn_content btn_empty" @click='empty()'>
					<i class="iconfont icon-xunhuan"></i>
					<span>清空</span>
				</span>
			</div>
		</div>
		<!--表格内容-->
		<el-main v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.5)" element-loading-text="数据正在加载中" >
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">id</th>
						<th scope="col">流程定义id</th>
						<th scope="col">名称</th>
						<th scope="col">启动人</th>
                        <th scope="col">流程图</th>
                        <th scope="col">实例变量</th>
                        <th scope="col">描述</th>
                        <th scope="col">状态</th>
						<th scope="col">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) of items" :key='index'>
						
						<td :title="item.processInstanceId">{{item.processInstanceId}}</td>
						<td :title="item.processDefinitionId">{{item.processDefinitionId}}</td>
						<td :title="item.name">{{item.name}}</td>
						<td :title="item.tenantId">{{item.tenantId}}</td>
                        <td :title="item.diagramResourceName"><a @click="openDiagram(item.processDefinitionId,item.name)">流程图</a></td>
                        <td :title="item.processVariables">{{item.processVariables}}</td>
                        <td :title="item.description">{{item.description}}</td>
                        <td :title="item.suspended">{{item.suspended}}</td>
						<td>
							<span v-if="!item.suspended"  title="挂起" @click="updateflag(item.id,item.name,'0')"> 
								[<i class="iconfont icon-quxiao3"></i>]
								
							</span>
							<span v-else title="激活" @click="updateflag(item.id,item.name,'1')">
								[<i class="iconfont icon-xuanze1"></i>]
							</span>
                            <span title="迁移流程" >
                                [<i class="iconfont icon-tubiaozhexiantu"></i>]
                            </span>
                           <span title="删除" @click="deleteById(item.id)">
							[<i class="iconfont icon-shanchu"></i>]	
							</span> 
						</td>
					</tr>
				</tbody>
			</table>
		</el-main>
		<!--分页-->
		<panigation :page='page' :rows='rows' :total='total' :options="options" @changePage="toPage" @changeRows='toRows' @operatePage='optPage'></panigation>
	</div>
</template>

<script>
	// 引入子组件
	import panigation from './../component/panigation'
	export default {
		name: 'app',
		data() {
			return {
				items: [],
				keyname:"",
				pkid: 0,
				page: 1,
				rows: 10,
				total: 0,
				options: [{
						text: '10',
						value: '10'
					},
					{
						text: '20',
						value: '20'
					},
					{
						text: '50',
						value: '50'
					},
					{
						text: '100',
						value: '100'
					}
				],
				fullscreenLoading: false
			};
		},
		mounted() {
			this.getpage();
			this.tableResize(); // 初始化计算table等高度
			this.resizeCall(); // 监听resize
		},
		components: {
			panigation
		},
		watch: {
			page: function (newval, oldval) {
				this.getpage();
			},
			rows: function (newval, oldval) {
				this.page = 1; //改变行数，重置页数
				this.getpage();
			}
		},
		methods: {
			toRows(rows) { // 子组件panigation 触发改变rows
				this.rows = rows;
			},
			toPage(page) { // 子组件panigation 触发改变page
				this.page = page;
			},
			optPage(opt) { //翻页
				if (opt === 1) { // opt = 1 下一页  
					this.page < this.total ? this.page++ : this.page = this.total;
				} else if (opt === 0) { // opt = 0 上一页 
					this.page > 1 ? this.page-- : this.page = 1;
				}
			},
			getpage() { // 按页获取数据
				this.fullscreenLoading = true;
				let _this = this;
				let temData = {
					name:this.keyname,
					page: this.page,
					rows: this.rows
				};
				setTimeout(() => {
					_this.$http({
							method: 'get',
							url: `${_this.baseurl}act/processInstance/list?jqgrid`,
							params: temData
						})
						.then(function (res) {
							if (res.status == 200 ) {
								
								 _this.items = res.data.rows;
								 _this.total = res.data.total;
								_this.fullscreenLoading = false;
							}
						})
						.catch(function (err) {
							console.log(err);
							setTimeout(() => {
								layer.msg('数据加载异常！！！', {
									icon: 2
								});
								_this.fullscreenLoading = false;
							}, 5000);
						});
				}, 500);
				
			},
			//激活或者挂起
			updateflag(itemId,name,flag){
				let _this = this;
				let opName=(flag==0?"挂起":"激活");
				let baseUrl=_this.baseurl+"act/processInstance/"+(flag==0?"suspend/":"active/")+itemId;
				
				layer.confirm(
					"确认"+opName+"流程定义："+name+"?", {
						icon: 2,
						title: "警告",
						btn: ["确定", "取消"]
					},
					function (index) {
						

						_this
							.$http({
								method: "post",
								url: baseUrl,
							})
							.then(function (res) {
								_this.getpage();
							})
							.catch(function (err) {
								console.log("err", err);
							});
						layer.msg(opName+"成功");
					},
					function (index) {
						layer.msg("取消"+opName);
					}
				);
			},
			// 删除
			deleteById(id) {

				let _this = this;
				
				layer.confirm(
					"删除操作不可恢复，确定要删除该数据吗？", {
						icon: 2,
						title: "警告",
						btn: ["确定", "取消"]
					},
					function (index) {
						

						_this
							.$http({
								method: "post",
								url: _this.baseurl + "/act/processInstance/delete/" + id
							})
							.then(function (res) {
								_this.getpage();
							})
							.catch(function (err) {
								console.log("err", err);
							});
						layer.msg("删除成功");
					},
					function (index) {
						layer.msg("取消删除");
					}
				);
			},
			//清空
			empty(){
				this.keyname="";
			},
			openDiagram(id,name){
							let dex = id.lastIndexOf(":");
						  	let pp=id.substring(0,dex);
							let processKey=pp.substring(0,pp.indexOf(":"));
							let processId=id.substring(dex+1);
							let _this=this;
							alert(processKey);
							_this.$http({
								method: "post",
								url: _this.baseurl + "/act/processInstance/diagram2/" + processKey+"/"+processId
							})
							.then(function (res) {
								let layerIndex = top.layer.open({
                                    type: 2,
                                    //title: '',
                                    maxmin: true,
                                    resize: false,
                                    area: ['100%', '100%'],
                                    // anim: [parseInt(6 * Math.random())],
                                    content: [_this.baseurl2+"static/diagram-viewer/index.html?processDefinitionId="+res.data.processDefinitionId+"&processInstanceId="+res.data.processInstanceId],
                                    success: function (layero) {
                                        layero.find('.layui-layer-min').remove()
                                    },
                                    end: function () {
                                        _this.getpage();
                                    }
                                });
							})
							.catch(function (err) {
								console.log("err", err);
							});
					
			},
			// 自适应高度
			tableResize() {
				let contentRight = document.querySelector('.content'); // content-right
				let tableRight = document.querySelector('.fs-right'); // fs-right
				let inputBox = document.querySelector('.input-box'); // input-box
				let tableBox = document.querySelector('.el-main'); // panigation

				if (!contentRight) return;
				if (!tableRight) return;
				if (!inputBox) return;
				if (!tableBox) return;

				tableRight.style.height = contentRight.offsetHeight;
				tableBox.style.height = tableRight.offsetHeight - inputBox.offsetHeight - 66 + 'px';
			},
			// 监听resize
			resizeCall() {
				var optimizedResize = (function () {
					var callbacks = [],
						running = false;
					// fired on resize event
					function resize() {
						if (!running) {
							running = true;
							if (window.requestAnimationFrame) {
								window.requestAnimationFrame(runCallbacks);
							} else {
								setTimeout(runCallbacks, 66);
							}
						}
					}
					// run the actual callbacks
					function runCallbacks() {
						callbacks.forEach(function (callback) {
							callback();
						});
						running = false;
					}
					// adds callback to loop
					function addCallback(callback) {
						if (callback) {
							callbacks.push(callback);
						}
					}
					return {
						// public method to add additional callback
						add: function (callback) {
							if (!callbacks.length) {
								window.addEventListener('resize', resize);
							}
							addCallback(callback);
						}
					}
				}());

				// start process
				optimizedResize.add(this.tableResize);
            }
				
				
            

		},

	}
</script>
<style scoped>
/*输入框*/

.input-group-addon {
    width: 92px;
}

.input-group:nth-last-child(2) {
    width: 75%;
    border-top: 1px solid #ededed;
}

@media screen and (min-width: 1921px) {
    /*输入框*/
    .input-group {
        width: 25%;
    }
}

@media screen and (min-width: 1030px) and (max-width: 1300px) {
    /*输入框*/
    .input-group:nth-last-child(2) {
        width: 66.6666666666%;
    }
}

@media screen and (max-width: 1024px) {
    /*输入框*/
    .input-group:nth-last-child(2) {
        width: 50%;
    }
}

#map {
    width: 100%;
    margin: 10px 0;
    height: 350px;
    border: 1px solid #dbdbdb;
}
</style>

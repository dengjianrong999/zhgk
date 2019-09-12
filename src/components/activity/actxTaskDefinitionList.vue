
<template>
	<!--右-->
	<div class="fs-right">
		<!--输入框-->
		<div class="input-box">
			<div class="input-group">
				<span class="input-group-addon">任务节点定义ID：</span>
				<input type="text" class="form-control" v-model='taskNodeID'>
			</div>
            <div class="input-group">
				<span class="input-group-addon">流程定义ID：</span>
				<input type="text" class="form-control" v-model='taskID'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">流程发布ID：</span>
				<input type="text" class="form-control" v-model='taskDeployID'>
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
						<th scope="col">任务节点定义ID</th>
						<th scope="col">任务节点名称</th>
						<th scope="col">流程定义ID</th>
						<th scope="col">流程发布id</th>
                        <th scope="col">用户</th>
                        <th scope="col">是否需要选择用户</th>
                        <th scope="col">表单类型</th>
                        <th scope="col">表单参数</th>
                        <th scope="col">绑定实体索引</th>
						<th scope="col">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) of items" :key='index'>
						
						<td :title="item.taskKey">{{item.taskKey}}</td>
						<td :title="item.taskName">{{item.taskName}}</td>
						<td :title="item.procDefKey">{{item.procDefKey}}</td>
						<td :title="item.deploymentId">{{item.deploymentId}}</td>
                        <td :title="item.users">{{item.users}}</td>
                        <td :title="item.isSelectUser">{{item.isSelectUser}}</td>
                        <td :title="item.formType">{{item.formType}}</td>
                        <td :title="item.formParam">{{item.formParam}}</td>
                        <td :title="item.activeEntityKeys">{{item.activeEntityKeys}}</td>
						<td>
                           <span title="修改" @click="updatebyId(item.pkid)">
							[<i class="iconfont icon-xiugai"></i>]	
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
                taskNodeID:"",
                taskID:"",
                taskDeployID:"",
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
					taskKey:this.taskNodeID,
					procDefKey:this.taskID,
					deploymentId:this.taskDeployID,
					page: this.page,
					rows: this.rows
				};
				setTimeout(() => {
					_this.$http({
							method: 'get',
							url: `${_this.baseurl}act/processXml/actxTaskDefinition/list?pageJson`,
							params: temData
						})
						.then(function (res) {
							if (res.status == 200 ) {
								
								 _this.items = res.data.data.rows;
								 _this.total = res.data.data.total;
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
			
		
			//清空
			empty(){
				this.taskNodeID="";
				this.taskID="";
				this.taskDeployID="";
			},
			updatebyId(id){
			
					let _this=this;
					 let layerIndex = top.layer.open({
                                    type: 2,
                                    title: '修改',
                                    maxmin: true,
                                    resize: false,
                                    area: ['100%', '100%'],
                                    // anim: [parseInt(6 * Math.random())],
                                    content: '#/actxTaskDefinitionForm/' + id,
                                    success: function (layero) {
                                        layero.find('.layui-layer-min').remove()
                                    },
                                    end: function () {
                                        _this.getpage();
                                    }
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
		width: 80px;
	}

	.input-group:nth-last-child(2) {
		display: none;
	}

	.input-group:nth-child(3) {
		border-left: none;
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
			display: block;
			width: 66.6666666666%;
		}
		.input-group:nth-child(3) {
			border-left: none;
		}
		.input-group:nth-child(4) {
			border-left: 1px solid #ededed;
		}
		.input-group:nth-child(4),
		.input-group:nth-child(5) {
			border-top: none;
		}
	}

	@media screen and (max-width: 1024px) {
		/*输入框*/
		.input-group:nth-child(3) {
			border-left: 1px solid #dbdbdb;
		}
		.input-group:nth-child(3),
		.input-group:nth-child(4) {
			border-top: none;
		}
	}


	#map {
		width: 100%;
		margin: 10px 0;
		height: 350px;
		border: 1px solid #dbdbdb;
	}
</style>

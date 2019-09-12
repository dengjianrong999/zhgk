<!--
放射源信息
-->
<template>
	<!--右-->
	<div class="fs-right">
		<!--输入框-->
		<div class="input-box">
			<div class="input-group">
				<span class="input-group-addon">单位名称：</span>
				<input type="text" class="form-control" v-model='zsgcValue1'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">单位地址：</span>
				<input type="text" class="form-control" v-model='zsgcValue2'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">法人：</span>
				<input type="text" class="form-control" v-model='zsgcValue3'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">联系电话：</span>
				<input type="text" class="form-control" v-model='zsgcValue4'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">工作场所：</span>
				<input type="text" class="form-control" v-model='zsgcValue5'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">负责人：</span>
				<input type="text" class="form-control" v-model='zsgcValue6'>
			</div>
			<div class="input-group">
				<span class="input-group-addon">总数（枚）：</span>
				<input type="text" class="form-control" v-model='zsgcValue7'>
			</div>
			<div class="input-group">
			</div>
			<!--按钮-->
			<div class="input-group">
				<span class="btn_content btn_query" @click="getpage()">
					<i class="iconfont icon-chaxun2"></i>
					<span>查询</span>
				</span>
				<!-- <span class="btn_content btn_add" @click='update()'>
                    <i class="iconfont icon-tianjia-"></i>
                    <span>新增</span>
                </span> -->
				<span class="btn_content btn_empty" @click='empty()'>
					<i class="iconfont icon-xunhuan"></i>
					<span>清空</span>
				</span>
			</div>
		</div>
		<!-- 图标 -->
		<div id="map">
		</div>
		<!--表格内容-->
		<el-main v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.5)" element-loading-text="数据正在加载中">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">序号</th>
						<th scope="col">单位名称</th>
						<th scope="col">单位地址</th>
						<th scope="col">法人</th>
						<th scope="col">联系电话</th>
						<th scope="col">工作场所</th>
						<th scope="col">负责人</th>
						<th scope="col">总数（枚）</th>
						<th scope="col">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) of items" :key='index'>
						<td v-if="page == 1 ">{{index+1}}</td>
						<td v-else-if="rows == 10">{{index+1+(10*(page-1))}}</td>
						<td v-else-if="rows == 20">{{index+1+(20*(page-1))}}</td>
						<td v-else-if="rows == 50">{{index+1+(50*(page-1))}}</td>
						<td v-else-if="rows == 100">{{index+1+(100*(page-1))}}</td>
						<td :title="item.UNITNAME">{{item.UNITNAME}}</td>
						<td :title="item.UNITADDRESS">{{item.UNITADDRESS}}</td>
						<td :title="item.LEGALPERSON">{{item.LEGALPERSON}}</td>
						<td :title="item.LEGALPERPHONE">{{item.LEGALPERPHONE}}</td>
						<td :title="item.WORKPLACE">{{item.WORKPLACE}}</td>
						<td :title="item.RESPONSIBLE">{{item.RESPONSIBLE}}</td>
						<td :title="item.NUMBERS">{{item.NUMBERS}}</td>
						<td>
							<span @click="SeeOrModify(item.PKID,0)"> [
								<i class="iconfont icon-chaxun">
									]
								</i>
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</el-main>
		<!--分页-->
		<!-- <panigation :page='page' :rows='rows' :total='total' :options="options" @changePage="toPage" @changeRows='toRows' @operatePage='optPage'></panigation> -->
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
				graph: [],
				fullscreenLoading:false,
				zsgcValue1: "",
				zsgcValue2: "",
				zsgcValue3: "",
				zsgcValue4: "",
				zsgcValue5: "",
				zsgcValue6: "",
				zsgcValue7: "",
				myChart: null,
				pkid: 0,
				page: 1,
				rows: 10,
				total: 0,
				myoption: {},
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
				]
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
				let _this = this;
				let temData = {
					unitName: this.zsgcValue1,
					unitAddress: this.zsgcValue2,
					legalPerson: this.zsgcValue3,
					legalPerPhone: this.zsgcValue4,
					workplace: this.zsgcValue5,
					responsible: this.zsgcValue6,
					numbers: this.zsgcValue7,
					page: this.page,
					rows: this.rows
				};
				_this.$http({
						method: 'get',
						url: `${_this.baseurl}unitInfo/administrativeCount`,
						params: temData
					})
					.then(function (res) {
						if (res.status == 200)
							_this.items = res.data.data.map.table;
						_this.graph = res.data.data.map.graph;

						// this.myoption.xAxis[0].data
						_this.myoption.xAxis[0].data.forEach(function (val, idx) {
							_this.graph.forEach(function (value, index) {
								if (value.NAME === val) {
									_this.myoption.series[0].data[idx] = value.GDY;
									_this.myoption.series[1].data[idx] = value.YDY;
								}
							});
						});
						_this.myChart.setOption(_this.myoption);
					})
					.catch(function (err) {
						console.log(err);
					});

				// 基于准备好的dom，初始化echarts实例
				this.myChart = echarts.init(document.getElementById('map'));

				// 绘制图表
				this.myoption = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					toolbox: {
						left: '10',
						top: '10',
						showTitle: true,
						itemSize: 16,
						itemGap: 20,
						feature: {
							dataView: {
								show: false,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar'],
								iconStyle: {
									borderColor: '#333'
								}
							},
							restore: {
								show: false
							},
							saveAsImage: {
								show: false
							},
						}
					},
					legend: {
						data: ['固定源', '移动源'],
						top: '5%'
					},
					grid: {
						x: '5%',
						y: '80',
						x2: '3%',
						y2: '30'
					},
					xAxis: [{
						type: 'category',
						// type: 'time',
						data: ['北石槽镇', '李桥镇', '马坡镇', '杨镇', '北务镇', '南法信镇', '南彩镇', '北小营镇', '牛山镇', '大山各庄镇', '天竺镇', '后沙峪镇', '高丽营镇', '胜利街道',
							'光明街道', '木林镇', '仁和镇', '赵全营镇', '张镇', '北湾屯镇'
						],
						axisPointer: {
							type: 'shadow'
						},
						splitLine: {
							show: false
						},
						axisTick: {
							show: true,
							alignWithLabel: true, //对齐x每项
							interval: 0 //每个都显示
						},
						axisLabel: {
							interval: 0 //每个都显示
						}
					}],
					yAxis: [{
						type: 'value',
						name: '数量',
						min: 0,
						max: 25,
						interval: 5,
						axisLabel: {
							formatter: '{value}'
						}
					}],
					// 全局调色盘。
					color: ['#359cde', '#7ea100', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074',
						'#546570', '#c4ccd3'
					],
					series: [{
							name: '固定源',
							type: 'bar',
							// data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 76.7, 135.6, 162.2,76.7, 135.6, 162.2, 25.6, 76.7, 135.6, 162.2],
							data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
							barGap: 0,
							// barWidth:20

						},
						{
							name: '移动源',
							type: 'bar',
							// data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 175.6, 182.2, 48.7, 18.8, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7],
							data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
							barGap: 0,
							// barWidth:20
						}
					]
				};



				this.myChart.setOption(this.myoption);

			},
			//获取数据 
			getData() {
				let _this = this;
				_this.$http
					.get(_this.baseurl + "rediationsource/listJson")
					.then(function (res) {
						if (res.status == 200 || res.data.data.status == 1)
							_this.items = res.data.data;
					})
					.catch(function (err) {
						console.log(err);
					});
			},
			// 查询
			select() {
				let _this = this;
				let temData = {
					unitAddress: this.zsgcValue1,
					unitName: this.zsgcValue2,
					legalPerson: this.zsgcValue3,
					legalPerPhone: this.zsgcValue4,
					workplace: this.zsgcValue5,
					responsible: this.zsgcValue6,
					numbers: this.zsgcValue7,
					page: this.page,
					rows: this.rows
				};
				_this.$http({
						method: 'get',
						url: `${_this.baseurl}unitInfo/administrativeCount`,
						// url: `http://183.6.158.26:8090/bjsy-jdc/fs/unitInfo/administrativeCount`,
						params: temData
					})
					.then(function (res) {
						if (res.status === 200) {
							_this.items = res.data.data.rows;
							_this.total = res.data.data.total;
						}
					})
					.catch(function (err) {
						console.log(err)
					})

				// myoption
				let dateArr = [];
				let dayNow = new Date();
				let oneDayMilSec = 24 * 3600 * 1000;
				let formattedDate = '';

				function addDay() {
					formattedDate = [dayNow.getMonth() + 1, dayNow.getDate()].join('-');
					dateArr.push(formattedDate);
					dayNow = new Date(+new Date(dayNow) + oneDayMilSec);
				}
				for (let i = 0; i < 20; i++) {
					addDay();
				}

				// this.myoption.xAxis[0].data = ['6-20','6-21','6-22','6-23','6-24','6-25','6-26','6-27','6-28','6-29','6-30','7-1','7-2','7-3','7-4','7-5','7-6','7-7','7-8','7-9'];
				this.myoption.xAxis[0].data = dateArr;
				this.myoption.series[0].data = [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 175.6, 182.2, 48.7, 18.8, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7 ];
				this.myoption.series[1].data = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 76.7, 135.6, 162.2, 76.7, 135.6, 162.2, 25.6, 76.7, 135.6, 162.2 ];
				this.myChart.setOption(this.myoption);
			},

			// 清空
			empty() {
				(this.zsgcValue1 = ""),
				(this.zsgcValue2 = ""),
				(this.zsgcValue3 = ""),
				(this.zsgcValue4 = ""),
				(this.zsgcValue5 = ""),
				(this.zsgcValue6 = ""),
				(this.zsgcValue7 = ""),
				this.getpage();
			},
			// 新增
			update() {
				let _this = this;
				let id = 'save';
				let layerIndex = layer.open({
					type: 2,
					title: '新增',
					maxmin: true,
					resize: false,
					// anim: [parseInt(6 * Math.random())],
					area: ['75%', '70%'],
					content: ['#/StatisticalAnalysisWD/' + id],
					success: function (layero,index) {
						layero.find('.layui-layer-min').remove()
						layer.full(index)
					},
					end: function () {
						_this.getpage();
					}
				});
				sessionStorage.setItem('layerIndex', JSON.stringify(layerIndex));
			},
			// 查看
			SeeOrModify(id, num) {
				let _this = this;
				sessionStorage.setItem('operateNum', JSON.stringify(num));
				let title = '';
				if (!num) {
					title = '详情';
				} else {
					title = '修改';
				}
				let layerIndex = layer.open({
					type: 2,
					title: title,
					maxmin: true,
					// anim: [parseInt(6 * Math.random())],
					resize: false,
					area: ['75%', '70%'],
					content: '#/StatisticalAnalysisWD/' + id,
					success: function (layero,index) {
						layero.find('.layui-layer-min').remove()

					},
					// btn:['确认','取消'],     
					end: function () {
						if (num) {
							_this.getpage();
						}
					}
				});
			},
			// 删除
			deleted(item) {

				let _this = this;
				let id = item.pkid;
				layer.confirm(
					"删除操作不可恢复，确定要删除该业务数据吗？", {
						icon: 2,
						title: "警告",
						btn: ["确定", "取消"]
					},
					function (index) {

						_this
							.$http({
								method: "post",
								url: _this.baseurl + "rediationsource/delete/" + id
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
			// 自适应高度
			tableResize() {
				let contentRight = document.querySelector('.content'); // content-right
				let tableRight = document.querySelector('.fs-right'); // fs-right
				let inputBox = document.querySelector('.input-box'); // input-box
				let tableBox = document.querySelector('.el-main'); // panigation
				let map = document.querySelector('#map'); // map

				if (!contentRight) return;
				if (!tableRight) return;
				if (!inputBox) return;
				if (!tableBox) return;

				let tableHeight = tableRight.offsetHeight - inputBox.offsetHeight - 30 - 342;

				tableRight.style.height = contentRight.offsetHeight + 'px';
				if (tableHeight < 200) {
					map.style.height = (tableRight.offsetHeight - inputBox.offsetHeight - 6) / 2 + 'px';
					tableBox.style.height = (tableRight.offsetHeight - inputBox.offsetHeight - 6) / 2 + 'px';
				} else {
					tableBox.style.height = tableHeight + 'px';
				}

				this.mapResize();
			},
			mapResize() {
				this.myChart.resize();
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
		width: 25%;
	}

	.input-group:nth-child(3),
	.input-group:nth-child(7) {
		border-left: none;
	}

	.input-group:nth-child(5),
	.input-group:nth-child(6),
	.input-group:nth-child(7) {
		border-top: none;
	}


	@media screen and (min-width: 1921px) {
		/*输入框*/
		.input-group:nth-last-child(2) {
			width: 80%;
		}
		.input-group:nth-child(5) {
			border-top: 1px solid #ededed;
			border-left: none;
		}
		.input-group:nth-child(6) {
			border-left: 1px solid #ededed;
		}
	}

	@media screen and (min-width: 1030px) and (max-width: 1300px) {
		/*输入框*/
		.input-group:nth-last-child(2) {
			display: block;
			width: 66.6666666666666666666666%;
		}
		.input-group:nth-child(3),
		.input-group:nth-child(5) {
			border-left: none;
		}
		.input-group:nth-child(4),
		.input-group:nth-child(7) {
			border-left: 1px solid #ededed;
		}
		.input-group:nth-child(4),
		.input-group:nth-child(5),
		.input-group:nth-child(6) {
			border-top: none;
		}
	}

	@media screen and (max-width: 1024px) {
		/*输入框*/
		.input-group:nth-last-child(2) {
			display: block;
			width: 50%;
		}
		.input-group:nth-child(3),
		.input-group:nth-child(7) {
			border-left: 1px solid #ededed;
		}
		.input-group:nth-child(3),
		.input-group:nth-child(4),
		.input-group:nth-child(5),
		.input-group:nth-child(6) {
			border-top: none;
		}
	}


	#map {
		width: 100%;
		margin-bottom:6px;
		height: 330px;
		border: 1px solid #dbdbdb;
	}
</style>

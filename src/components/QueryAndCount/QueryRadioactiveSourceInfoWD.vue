<!--
放射源信息弹窗 
-->
<template>
	<div class="fs-window">
		<!--输入框-->
		<div class="block">
			<div class="name">
				
				<span>工作场所：</span>
			</div>
			<div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="belongWorkplace">
					<el-option v-for="item in Interface" :key="item.pkid" :label="item.workplaceName" :value="item.pkid">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>放射源名称：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="radiationName">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>放射源类别：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="category">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>活动种类：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="activitiesType">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>批准的总活度：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="totalApprovedActivity">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>批准的日等效最大操作量：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="ratifyMaximumNumber">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>核素名称：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="nuclideName">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>生产厂家：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="manufacturer">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>出厂日期：</span>
			</div>
			<div class="value">
				<i class="el-input__icon el-icon-date"></i>
				<input type="text" style="background:transparent;" class="myinput" placeholder="--请选择出厂日期--" :disabled="disabledFlag" readonly="readonly"
				    v-model="productTime" id="surface1">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>出厂适度(贝可)：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="factoryModeration">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>放射源编码：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="radiationsourceCode">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>类型：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="radiatiotType">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>标号：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="label">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>密封程度：</span>
			</div>
			<div class="value">
				<div class="radio">
					<label>
						<input type="radio" name="types" id="fixed" value="" :checked="sealDegree == '密封' ? true : false" />
						<div class="option"></div>
						<label>密封</label>
					</label>
				</div>
				<div class="radio">
					<label>
						<input type="radio" name="types" :checked="sealDegree == '非密封' ? true : false" id="move" value="" />
						<div class="option"></div>
						<label>非密封</label>
					</label>
				</div>
			</div>
		</div>
		<div class="block">
			<div class="name">
				<span>经纬度：</span>
			</div>
			<div class="value">
				<span class="warp-weft">经度</span>
				<input type="text" class="myinput inp-one" :disabled="disabledFlag" v-model="latitude">
				<span class="warp-weft">纬度</span>
				<input type="text" class="myinput inp-two" :disabled="disabledFlag" v-model="longitude">
			</div>
		</div>
		<div class="block">
			<div class="name">
				
				<span>用途：</span>
			</div>
			<div class="value">
				<input type="text" class="myinput" :disabled="disabledFlag" v-model="purpose">
			</div>
		</div>
		<div class="remark">
			<div class="name">
				<span>备注：</span>
			</div>
			<div class="value">
				<textarea type="text" class="myinput" :disabled="disabledFlag" v-model="remarks"></textarea>
			</div>
		</div>
		<!-- <div class="foot" v-if="operateNum">
            <div class="btn_wrap">
                <span class="btn_m btn_cancle" @click='cancle'>取消</span>
            </div>
            <div class="btn_wrap left">
                <span class="btn_m btn_confirm" @click="save()">保存</span>
            </div>
        </div> -->
	</div>
</template>

<script>
	// 引入子组件
	export default {
		name: 'app',
		data() {
			return {
				Interface: [],
				pkid: Date.parse(new Date()),
				places: "",
				belongWorkplace: "",
				radiationName: '',
				radiatiotType: '',
				activitiesType: "",
				totalApprovedActivity: '',
				ratifyMaximumNumber: '',
				nuclideName: "",
				manufacturer: "",
				factoryModeration: "",
				label: "",
				latitude: "",
				longitude: "",
				sealDegree: '',
				radiationsourceCode: "",
				category: "",
				purpose: "",
				sourceDirection: "",
				remarks: "",
				productTime: '',
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledFlag: false
			};
		},
		mounted() {
			this.getDetailData();
			this.lastInterface();
			//时间插件 
			let _this = this;
			setTimeout(function () {
				layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#surface1", //指定元素
						type: "datetime",
						done: function (value) {
							_this.productTime = value;
						}
					});
				});
			}, 0);
		},
		methods: {
			// fixedHeight() {
			//                 // 适应 内容高度
			//                 let fs_window = document.querySelector('.fs-window');
			//                 let myIframe = window.parent.document;
			//                 if (fs_window.offsetHeight <= 458) {
			//                     window.frameElement.style.height = fs_window.offsetHeight + 'px';
			//                     myIframe.querySelector('.layui-layer-iframe').style.height = fs_window.offsetHeight + 42 + 'px';
			//                     myIframe.querySelector('.layui-layer-iframe').style.top = '50%';
			//                     myIframe.querySelector('.layui-layer-iframe').style.marginTop = -((fs_window.offsetHeight + 42) / 2) +
			//                         'px';
			//                 }
			//             },
			cancle() {
				this.closeIframe();
			},
			closeIframe() {
				this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
				parent.layer.close(this.frameIndex); //再执行关闭
			},
			showToggle: function (item) {
				item.isSubShow = !item.isSubShow;
			},
			// 获取上一个接口数据
			lastInterface() {
				let _this = this;
				_this.$http
					.get(`${_this.baseurl}WorkplaceInfo/listJson`)
					.then(function (res) {
                        console.log('shuj,',res)
						if (res.status == 200 || res.data.status == 1)
							_this.Interface = res.data.data;
					})
			},
			save() {
				let _this = this;
				if (this.operateNum === 999) { // 新增
					this.pkid = Date.parse(new Date());
				}
				let submitFlag = true;
				let submitMC = true;
				console.log('pkid', this.pkid);
				var a = [
					this.nuclideName,
					this.manufacturer,
					this.productTime,
					this.factoryModeration,
					this.label,
					this.radiationsourceCode,
					this.category,
					this.purpose
				]
				var b = [
					'请填写核素名称',
					'请填写生产厂家',
					'请填写出厂日期',
					'请填写出厂适度',
					'请填写标号',
					'请填写放射源编码',
					'请填写类别',
					'请填写用途'
				]
				for (var i = 0, l = a.length; i < l; i++) {
					if (!a[i] || a[i].length == 0) {
						submitFlag = false;
						for (var j = i, len = b.length; j < len; j++) {
							if (b[j]) {
								submitMC = false;
								layer.msg(b[j], {
									icon: 2
								});
								break;
							}
						}
						break;
					}
				}
				if (submitFlag) {
					this.$http({
						method: "post",
						url: this.baseurl + "rediationsource/save",
						data: {
							pkid: this.pkid,
							belongWorkplace: this.belongWorkplace,
							nuclideName: this.nuclideName,
							manufacturer: this.manufacturer,
							productTime: this.productTime,
							factoryModeration: this.factoryModeration,
							label: this.label,
							radiationsourceCode: this.radiationsourceCode,
							category: this.category,
							purpose: this.purpose,
							places: this.places,
							sourceDirection: this.sourceDirection,
							remarks: this.remarks,
						}
					}).then(function (res) {
						if (res.status === 200 && res.data.status === '1') {
							layer.msg('保存成功！', {
								icon: 1
							});
							let timer = setTimeout(function () {
								_this.closeIframe();
								clearTimeout(timer);
							}, 1000);
						}
					});
				}
			},
			getDetailData() {

				// this.fixedHeight(); //适应高度

				// 操作 operateNum0详情 1修改
				let id = this.$route.params.id;
				let _this = this;
				if (id !== 'save') { // 不是新增 
					this.operateNum = JSON.parse(sessionStorage.getItem('operateNum')); // 操作类型 0详情 1修改
					id = id + '';
					if (this.operateNum === 0) { //0详情
						this.disabledFlag = true;
					} else { // 修改
						this.disabledFlag = false;
					}
					this.$http({
							method: 'get',
							url: `${this.baseurl}rediationsource/data/${id}`
						})
						.then(function (res) {
							if (res.status === 200 && res.data.status === '1') {
								console.log(res.data.data)
								let datas = res.data.data;
								_this.details = res.data.data;
								_this.places = _this.details.places;
								_this.belongWorkplace = _this.details.belongWorkplace;
								_this.radiationName = _this.details.radiationName;
								_this.details.radiatiotType = _this.details.radiatiotType == 67 ? '固定源' : '移动源'
								_this.radiatiotType = _this.details.radiatiotType;
								_this.activitiesType = _this.details.activitiesType;
								_this.totalApprovedActivity = _this.details.totalApprovedActivity;
								_this.ratifyMaximumNumber = _this.details.ratifyMaximumNumber;
								_this.nuclideName = _this.details.nuclideName;
								_this.manufacturer = _this.details.manufacturer;
								_this.factoryModeration = _this.details.factoryModeration;
								_this.label = _this.details.label;
								_this.latitude = _this.details.latitude;
								_this.longitude = _this.details.longitude;
								_this.sealDegree = _this.details.sealDegree;
								_this.radiationsourceCode = _this.details.radiationsourceCode;
								_this.category = _this.details.category;
								_this.purpose = _this.details.purpose;
								_this.sourceDirection = _this.details.sourceDirection;
								_this.productTime = _this.details.productTime;
								_this.remarks = _this.details.remarks;
								_this.pkid = _this.details.pkid;
							}
						});
				}
			}
		}
	}
</script>
<style scoped>
	.name {
		width: 100px;
	}

	.radio input[type="radio"]:checked+div {
		/*当radiuo被选中时，把input下边的div标签的背景图片替换掉*/
		background: url(../../assets/images/duigou.png) no-repeat;
	}
	.warp-weft{
		line-height: 25px;
	}
	.fs-window .value{
		width: 100px;
	}
    .remark .name{
		width: 100px;
	}
	.value .el-input__inner{
	margin: 0px !important; 
    width: calc(100% - 0px) !important; 
	}
</style>

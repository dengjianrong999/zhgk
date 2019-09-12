<!--
放射源信息弹窗 
-->
<template>
    <div class="fs-window">
        <div class="block">
            <div class="name">
				
                <span>单位名称：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="unitName">
            </div>
        </div>
        <div class="block">
            <div class="name">
				
                <span>单位地址：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="unitAddress">
            </div>
        </div>
        <div class="block">
            <div class="name">
				
                <span>法定代表人：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="legalPerson">
            </div>
        </div>
        <div class="block">
            <div class="name">
                
                <span>身份证号码：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="legalPerson">
            </div>
        </div>
        <div class="block">
            <div class="name">
				
                <span>许可证号：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="fsLicenseNo">
            </div>
        </div>
        <div class="block">
            <div class="name">
                
                <span>许可证条件：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="fsLicenseNo">
            </div>
        </div>
        <div class="block">
            <div class="name">
				
                <span>发证日期：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="periodValidity">
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
        <div class="foot" v-if="operateNum">
            <div class="btn_wrap">
                <span class="btn_m btn_cancle" @click='cancle'>取消</span>
            </div>
            <div class="btn_wrap left">
                <span class="btn_m btn_confirm" @click="save()">保存</span>
            </div>
        </div>
    </div>
</template>

<script>
    // 引入子组件
    export default {
        name: 'app',
        data() {

            return {
                pkid: Date.parse(new Date()),
                place:"",
                unitName: "",
                unitAddress: "",
                legalPerson: '',
                fsLicenseNo: "",
                periodValidity: "",
                remarks: "",
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledFlag: false
            };
        },
        mounted() {
            $(function () {
                layui.use(['laydate', 'layer'], function () {
                    var laydate = layui.laydate;
                    laydate.render({
                        elem: '#datetime', //指定元素
                        type: 'datetime',
                        trigger: 'click',
                        done: (value) => {
                            this.legalPerson = value
                        }
                    });
                });
            })
            this.getDetailData();

        },
        methods: {
            fixedHeight(){
                // 适应 内容高度
                let fs_window = document.querySelector('.fs-window');
                let myIframe = window.parent.document;
                if(fs_window.offsetHeight <= 458){
                    window.frameElement.style.height = fs_window.offsetHeight + 'px';
                    myIframe.querySelector('.layui-layer-iframe').style.height = fs_window.offsetHeight + 42 + 'px';
                    myIframe.querySelector('.layui-layer-iframe').style.top = '50%';
                    myIframe.querySelector('.layui-layer-iframe').style.marginTop = -((fs_window.offsetHeight + 42)/2)+'px' ;
                }
            },
            cancle(){
                this.closeIframe();
            },
            closeIframe(){
                this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
                parent.layer.close(this.frameIndex); //再执行关闭
            },
            showToggle: function (item) {
                item.isSubShow = !item.isSubShow;
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
                    this.unitName,
                    this.unitAddress,
                    this.legalPerson,
                    this.fsLicenseNo,
                    this.periodValidity
                ]
                var b = [
                    '请填写单位名称',
                    '请填写地址',
                    '请填写法定代表人',
                    '请填写证书编号',
                    '请填写有效期'
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
                            unitName: this.unitName,
                            unitAddress: this.unitAddress,
                            legalPerson: this.legalPerson,
                            fsLicenseNo: this.fsLicenseNo,
                            periodValidity: this.periodValidity,
                            remarks: this.remarks
                        }
                    }).then(function (res) {
                        if (res.status === 200 && res.data.status === '1') {
                            layer.msg('保存成功！', {
                                icon: 1
                            });
                            let timer = setTimeout(function(){
                             _this.closeIframe();
                             clearTimeout(timer);
                            },1000);
                        }
                    });
                }
            },
            getDetailData() {

                this.fixedHeight(); //适应高度

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
								url: `${this.baseurl}unitInfo/data/${id}`
							})
							.then(function (res) {
                                console.log(res)
								if (res.status === 200 && res.data.status === '1') {
									console.log(res.data.data)
									let datas = res.data.data;
									_this.details = res.data.data;
									_this.unitName = _this.details.unitName,
									_this.unitAddress = _this.details.unitAddress,
									_this.legalPerson = _this.details.legalPerson,
									_this.fsLicenseNo = _this.details.fsLicenseNo,
									_this.periodValidity = _this.details.periodValidity,
									_this.remarks = _this.details.remarks,
									_this.pkid = _this.details.pkid;
								}
							});
					}
            },
        }
    }
</script>
<style scoped>
	.name{
		width: 100px;
	}
</style>

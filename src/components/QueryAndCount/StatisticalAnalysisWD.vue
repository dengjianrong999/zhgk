<!--
放射源信息弹窗 
-->
<template>
    <div class="fs-window">
        <!--输入框-->
        <div class="block">
            <div class="name">
				<i class="red_star">*</i>
                <span>单位名称：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="unitName">
            </div>
        </div>
        <div class="block">
            <div class="name">
				<i class="red_star">*</i>
                <span>单位地址：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="unitAddress">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>法人：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="legalPerson">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>联系电话：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="legalPerPhone">
            </div>
        </div>
        <div class="block">
            <div class="name">
				<i class="red_star">*</i>
                <span>工作场所：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="workplace">
            </div>
        </div>
        <div class="block">
            <div class="name">
				<i class="red_star">*</i>
                <span>负责人：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="responsible">
            </div>
        </div>
        <div class="block">
            <div class="name">
				<i class="red_star">*</i>
                <span>总数（枚）：</span>
            </div>
            <div class="value">
                <input type="text" class="myinput" :disabled="disabledFlag" v-model="numbers">
            </div>
        </div>
<!--         <div class="remark">
            <div class="name">
                <span>备注：</span>
            </div>
            <div class="value">
                <textarea type="text" class="myinput" :disabled="disabledFlag" v-model="remarks"></textarea>
            </div>
        </div> -->
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
                unitName: "",
                unitAddress: "",
                legalPerson: "",
                legalPerPhone: "",
                workplace: "",
                responsible: "",
                numbers: "",
                remarks: "",
				operateNum: 999, //操作类型 0查看详情 1修改
				disabledFlag: false
            };
        },
        mounted() {
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
            cancle(){ // 关闭弹窗
                this.closeIframe();
            },
            closeIframe(){  // 关闭弹窗
                this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
                parent.layer.close(this.frameIndex); //再执行关闭
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
                    this.legalPerPhone,
                    this.workplace,
                    this.responsible,
                    this.numbers
                ]
                var b = [
                    '请填写单位名称',
                    '请填写单位地址',
                    '请填写法人',
                    '请填写联系电话',
                    '请填写工作场所',
                    '请填写负责人',
                    '请填写总数'
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
                        url: this.baseurl + "unitInfo/save",
                        data: {
                            pkid: this.pkid,
                            unitName:this.unitName,
                            unitAddress:this.unitAddress,
                            legalPerson:this.legalPerson,
                            legalPerPhone:this.legalPerPhone,
                            workplace:this.workplace,
                            responsible:this.responsible,
                            numbers :this.numbers,
                        }
                    }).then(function (res) {
                        if (res.status === 200) {
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
								if (res.status === 200 && res.data.status === '1') {
									let datas = res.data.data;
									_this.unitName = datas.unitName;
                                    _this.unitAddress = datas.unitAddress;
                                    _this.legalPerson = datas.legalPerson;
                                    _this.legalPerPhone = datas.legalPerPhone;
                                    _this.workplace = datas.workplace;
                                    _this.responsible = datas.responsible;
                                    _this.numbers = datas.numbers;
									// _this.remarks = _this.data.remarks;
									_this.pkid = datas.pkid;
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

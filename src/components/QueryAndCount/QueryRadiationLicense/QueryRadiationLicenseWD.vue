<!--
	辐射许可证弹窗
-->
<template>
    <div class="License">
        <!-- 导航 -->
        <div class="navigation-printing">
            <ul class="printing">
                <li v-for="(item,index) in this.Items" :key='index' :class="{isCheck: item.status === current}" @click="tabClick(item.status)">
                    {{item.title}}<br />
					<span>{{item.notes}}</span>
                </li>
            </ul>
        </div>
        <div class="License-content">
            <!--弹窗内容-->
            <keep-alive>
                <component :id="printId" :is="componentData"></component>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import LicensePrintingOne from './LicensePrintingOne'; // 辐射许可证打印正本
    import LicensePrintingTwo from './LicensePrintingTwo'; // 辐射许可证副本第一页
    import LicensePrintingThree from './LicensePrintingThree'; // 辐射许可证第二页(放射源)
    import LicensePrintingFour from './LicensePrintingFour'; // 辐射许可证第三页(非密封放射性物质)
    import LicensePrintingFive from './LicensePrintingFive'; // 辐射许可证第四页(射线装置)
    import LicensePrintingSix from './LicensePrintingSix'; // 辐射许可证台账(放射源)
    import LicensePrintingSeven from './LicensePrintingSeven'; // 辐射许可证台账(非密封放射性物质)
    import LicensePrintingEight from './LicensePrintingEight'; // 辐射许可证台账(射线装置)
    import LicensePrintingHome from './LicensePrintingHome'; // 辐射许可证封面
    import LicensePrintingBasic from './LicensePrintingBasic'; // 辐射许可证单位基本情况
    export default {
        name: 'app',
        data() {
            return {
                componentData: 'LicensePrintingHome',
                current: 0,
                printId:0,
                Items: [
                       {
                            title: '辐射许可证封面',
                            status: 0,
                            isCheck: true,
                            componentsName: 'LicensePrintingHome'
                        },
                        {
                            title: '辐射单位基本情况',
                            status: 1,
                            isCheck: false,
                            componentsName: 'LicensePrintingBasic'
                        },
                        {
                            title: '辐射许可证打印正本',
                            status: 2,
                            isCheck: false,
                            componentsName: 'LicensePrintingOne'
                        },
                        {
                            title: '辐射许可证副本第一页',
                            status: 3,
                            isCheck: false,
                            componentsName: 'LicensePrintingTwo'
                        },
                        {
                            title: '辐射许可证第二页',
    						notes: '(放射源)',
                            status: 4,
                            isCheck: false,
                            componentsName: 'LicensePrintingThree'
                        },
                        {
                            title: '辐射许可证第三页',
    						notes: '(非密封放射性物质)',
                            status: 5,
                            isCheck: false,
                            componentsName: 'LicensePrintingFour'
                        },
                        {
                            title: '辐射许可证第四页',
    						notes: '(射线装置)',
                            status: 6,
                            isCheck: false,
                            componentsName: 'LicensePrintingFive'
                        },
                        {
                            title: '辐射许可证台账',
    						notes: '(放射源)',
                            status: 7,
                            isCheck: false,
                            componentsName: 'LicensePrintingSix'
                        },
                        {
                            title: '辐射许可证台账',
    						notes: '(非密封放射性物质)',
                            status: 8,
                            isCheck: false,
                            componentsName: 'LicensePrintingSeven'
                        },
                        {
                            title: '辐射许可证台账',
    						notes: '(射线装置)',
                            status: 9,
                            isCheck: false,
                            componentsName: 'LicensePrintingEight'
                        }
                ],
                tempData: [{
                    title: '辐射许可证打印正本',
                    status: 0,
                    isCheck: true,
                    componentsName: 'LicensePrintingHome'
                }],
            };
        },
        components: { // 声明子组件
            LicensePrintingOne,
            LicensePrintingTwo,
            LicensePrintingThree,
            LicensePrintingFour,
            LicensePrintingFive,
            LicensePrintingSix,
            LicensePrintingSeven,
			LicensePrintingEight,
			LicensePrintingHome,
			LicensePrintingBasic,
        },
        mounted() {

        },
        methods: {
            // 标签页
            tabClick: function (index) {
                if (this.current === index) return;
                this.current = index;
                this.componentData = this.Items[index].componentsName;
                this.printId = this.Items[index].status;
                let componentData = this.componentData;
                let flag = true;
                this.tempData.forEach(function (val, inx) {
                    if (componentData === val.componentsName) {
                        flag = false;
                    }
                });
                if (flag) {
                    this.tempData.push(this.Items[index]);
                }
            },
        }
    }
</script>

<style scoped="scoped">
    .License {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
    }
    .navigation-printing {
		width: 250px;
		height: 100%;
	}
	.printing{
		height: 100%;
	}
	.printing li{
		text-align: left;
		border: 1px solid #EDEDED;
		border-top: none;
		padding-left: 20px;
		padding: 7.5px 10px;
        cursor: pointer;
	}
    .printing li:hover{
        color: #029AD1;
    }
	.printing li:nth-child(1){
		border-top: 1px solid #EDEDED;
	}
	.printing li:nth-child(1),
	.printing li:nth-child(2){
		padding: 14.5px 10px;
	}
	.isCheck{
		color: #029AD1;
	}
	.License-content{
		width: 100%;
		height: 100%;
		padding-left: 10px;
	}
</style>

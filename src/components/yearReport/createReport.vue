
<template>
	<!--右-->
	<div class="fs-right">
		<!--输入框-->
		<div class="input-box">
			<div class="input-group">
				<span class="input-group-addon">年份：</span>
				<input id="reportYear" v-model="reportYear" type="text" class="form-control">
			</div>
           
			
			<div class="input-group">
			</div>
			<!--按钮-->
			<div class="input-group">
				<span :class="['btn_content',{'unexport':nodataShow},{'btn_query':hasDataShow}]" @click="createReport()">
					<i class="iconfont icon-daochu2"></i>
					<span>导出</span>
				</span>
                
				<span class="btn_content btn_empty">
					<i class="iconfont icon-xunhuan"></i>
					<span>清空</span>
				</span>
			</div>
		</div>
		<!--表格内容-->
		<el-main id="myDiv">
			<div calss="reportDiv" style="font-family: STFangSong;font-size: 1.4em;line-height: 1.7em;" v-show="hasDataShow">
				<h3>顺义区{{reportYear}}污染源监测年报</h3>
				<p class="textClass">
					<span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一、概述</span><br>
					<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为加强对污染源的监督管理，及时了解和掌握全区重点污染源污染物排放情况，为污染监督和环境管理提供技术支持和科学依据，根据北京市环境保护局印发的《北京市年环境监测工作方案》的通知要求，顺义区环境保护局每月开展重点污染源监督性监测工作。</span><br>
					<span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二、污染源概况</span><br>
					<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据“北京市重点污染源名单”确定顺义区{{reportYear}}年重金属废气重点污染源{{firstData.zjsfq_num}}家，废气重点污染源{{firstData.fq_num}}家，挥发性有机物污染源{{firstData.hfxyjw_num}}家，废水重点污染源{{firstData.fs_num}}家，污水处理厂国控重点源{{firstData.wsclc_num}}家，固废重点源{{firstData.gf_num}}家。</span>
					<!-- <br>
					<span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二、污染源概况</span> -->
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;顺义区废气重点污染源主要污染物有：{{firstData.fq_factors}}等；重金属废气主要污染物有：{{firstData.zjsfq_factors}}等；挥发性有机物主要污染物有：{{firstData.hfxyjw_factors}}等；废水重点污染源主要污染物有：{{firstData.fs_factors}}等；特征污染物主要包括：{{firstData.tz_factors}}等。</span>
					<div style="width:100%;height:450px;"><img style="width:800px;height:450px;" v-bind:src="wrybfImg"></div>
				</p>
				<p class="textClass">
					<span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三、废气污染源</span><br>
					<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;污染源达标情况如下</span>
					<div id="fq_chart" style="width:400px;height:300px;margin-left:30%"></div>
				</p>
				<p class="textClass">
					<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）评价项目与评价标准</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.评价项目</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）二氧化硫、氮氧化物、烟气黑度、颗粒物</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）氮氧化物、氟化物、氯化氢和砷及其化合物</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）苯、甲苯、二甲苯、非甲烷总烃等</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.评价标准</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{firstData.fq_pjbz}}</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）评价方法</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{firstData.fq_pjff}}。根据污染源类型及时段选定标准值进行达标评价，详见表 1、表 2、表 3。</span>
					<br><span style="font-weight: bold;">表1  重金属废气排放执行标准</span>
					<div class="table">
						<div class="table-bodys" style="padding:0px 20% 0px 20%">
						<table style="width:100%">
							
							<tbody>
								<tr style="background-color:#CCFFCC">
										<td style="border-top: 1px solid #00ff00 !important;">污染源名称</td>
										<td style="border-top: 1px solid #00ff00 !important;">执行标准</td>
								
								</tr>
								<tr><td>国泰半导体材料有限公司(有研半导体材料有限公司)</td><td>大气污染物综合排放标准 （DB11/501-2017）</td></tr>
							</tbody>
						</table>
						</div>
					</div>
				</p>
				<p class="textClass">
				<br><span style="font-weight: bold;">表2   锅炉废气排放执行标准</span>
					<div >
						<div style="padding:0px 20% 0px 20%">
						<table style="width:100%">
							
							<tbody>
								<tr style="background-color:#CCFFCC">
										<td style="border-top: 1px solid #00ff00 !important;">污染源名称</td>
										<td style="border-top: 1px solid #00ff00 !important;">执行标准</td>
									</tr>
								<tr><td>北京信得威特科技有限公司</td><td  rowspan="11">锅炉大气污染物排放标准（DB11/139-2015）</td></tr>
								<tr><td>北京宝景泰克汽车零部件有限公司</td></tr>
								<tr><td>北京恩布拉科雪花压缩机有限公司</td></tr>
								<tr><td>北京汽车股份有限公司北京分公司</td></tr>
								<tr><td>北京现代汽车有限公司北京分公司（一、二、杨镇工厂）</td></tr>
								<tr><td>北京韩太汽车部件有限公司</td></tr>
								<tr><td>北京顺鑫农业股份有限公司牛栏山酒厂</td></tr>
								<tr><td>北京飞机维修工程有限公司</td></tr>
								<tr><td>北京首钢冷轧薄板有限公司</td></tr>
								<tr><td>北京燕京啤酒股份有限公司一分公司</td></tr>
								<tr><td>北京大龙城北供热中心</td></tr>
								<tr><td>北京汽车集团有限公司越野车分公司</td><td>锅炉大气污染物排放标准（DB11/139-2015）汽车维修业大气污染物排放标准 (DB11/1228-2015)</td></tr>
								
							</tbody>	
						</table>
						</div>
					</div>
				</p>
				<p class="textClass">
				<br><span style="font-weight: bold;">表3   挥发性有机物排放执行标准</span>
					<div >
						<div style="padding:0px 20% 0px 20%">
						<table style="width:100%">
							
							<tbody>
								<tr style="background-color:#CCFFCC">
										<td style="border-top: 1px solid #00ff00 !important;">污染源名称</td>
										<td style="border-top: 1px solid #00ff00 !important;">执行标准</td>
									</tr>
								<tr><td>北京现代汽车有限公司北京分公司（一、二、杨镇工厂）</td><td  rowspan="3">汽车整车制造业（涂装工序）大气污染物排放 标准(DB11/1227-2015)</td></tr>
								<tr><td>北京汽车集团有限公司越野车分公司</td></tr>
								<tr><td>北京汽车股份有限公司北京分公司</td></tr>

								<tr><td>延峰海纳川汽车饰件系统有限公司</td><td rowspan="11">大气污染物综合排放标准 (DB11/501-2017)</td></tr>
								<tr><td>北京燕京啤酒股份有限公司一分公司</td></tr>
								<tr><td>北京燕京啤酒股份有限公司</td></tr>
								<tr><td>北京顺鑫农业股份有限公司牛栏山酒厂</td></tr>
								<tr><td>北京恩布拉科雪花压缩机有限公司</td></tr>
								<tr><td>罗森伯格亚太电子有限公司</td></tr>
								<tr><td>北京韩美药品有限公司</td></tr>
								<tr><td>北京北一机床股份有限公司</td></tr>
								<tr><td>金刚化工（北京）有限公司</td></tr>
								<tr><td>蓝星东丽膜科技（北京）有限公司</td></tr>
								<tr><td>北京华新凯业物资再生有限公司</td></tr>

								<tr><td>北京双燕商标彩印有限公司</td><td rowspan="5">印刷业挥发性有机物排放标准 (DB11/1201-2015)</td></tr>
								<tr><td>北京雅昌艺术印刷有限公司</td></tr>
								<tr><td>北京市汉石桥印刷厂</td></tr>
								<tr><td>易兰德（北京）印务有限公司</td></tr>
								<tr><td>北京威廉顺塑胶制品有限公司（印刷工艺）</td></tr>

								<tr><td>曲美家居集团股份有限公司</td><td rowspan="3">木质家具制造业大气污染物排放标准 （DB11/1202-2015）</td></tr>
								<tr><td>曲美家居集团股份有限公司北京第一分公司</td></tr>
								<tr><td>北京鲁泽恒明家具厂</td></tr>
								
								<tr><td>北京现代摩比斯汽车零部件有限公司</td><td rowspan="3">工业涂装工序大气污染物排放标准 (DB11/1226-2015)</td></tr>
								<tr><td>北京韩太汽车部件有限公司</td></tr>
								<tr><td>北京宝景泰克汽车零部件有限公司</td></tr>

								<tr><td>北京飞机维修工程有限公司</td><td rowspan="3">大气污染物综合排放标准 (DB11/501-2017) 工业涂装工序大气污染物排放标准(DB11/ 1226-2015)</td></tr>
								<tr><td>SMC（北京）制造有限公司</td></tr>
								<tr><td>安泰科技股份有限公司北京空港新材分公司</td></tr>


							</tbody>	
						</table>
						</div>
					</div>
				</p>
				<p class="textClass">
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）排放达标评价</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.废气污染源监督性监测</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）重金属废气污染源</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{reportYear}}年我区重金属废气污染源为{{firstData.zjsfq_num2}}家：有{{firstData.zjsfq_names}}。全年共监测排口{{firstData.zjsfq_pknum}}个，监测频率{{firstData.jcpl}}，达标率{{firstData.zjsfq_dbl}}%。</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）废气重点污染源</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{reportYear}}年我区废气污染源为{{firstData.fq_num}}家，分别为：{{firstData.fq_names}} 。全年共监测锅炉{{firstData.fqzd_pknum}}台共{{firstData.fqjc_num}}次，烟尘达标率为{{firstData.fqdbl_klw}}%、二氧化硫达标率为{{firstData.fqdbl_eyhl}}%、氮氧化物达标率为{{firstData.fqdbl_dyhw}}%。存在{{firstData.fq_overpoofInfo}}。</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）挥发性有机物污染源</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{reportYear}}年我区典型行业挥发性有机物监测{{firstData.hfxyjw_num}}家，分别为：{{firstData.hfxyjw_names}} 。全年共监测排口{{firstData.hfxyjw_pknum}}个{{firstData.hfxyjw_pkcs}}次，达标率{{firstData.hfxyjwdbl}}%。存在{{firstData.hfxyjw_overpoofInnfo}}。</span>
					<br><span style="font-weight: bold;">表4  挥发性有机物排放超标情况</span>
					<div >
						<div style="padding:0px 20% 0px 20%">
						<table style="width:100%">
							
							<tbody>
								<tr style="background-color:#CCFFCC">
										<td style="border-top: 1px solid #00ff00 !important;">单位名称</td>
										<td style="border-top: 1px solid #00ff00 !important;">监测时间</td>
										<td style="border-top: 1px solid #00ff00 !important;">排口</td>
										<td style="border-top: 1px solid #00ff00 !important;">项目</td>
										<td style="border-top: 1px solid #00ff00 !important;">浓度</td>
										<td style="border-top: 1px solid #00ff00 !important;">标准限制</td>
										<td style="border-top: 1px solid #00ff00 !important;">超标倍数</td>
									</tr>
								<tr v-for="item in hfxyjwOverTableInfo">
									<td>{{item.COMPANY_NAME}}</td>
									<td>{{item.MONITOR_TIME}}</td>
									<td>{{item.OUTLET_NAME}}</td>
									<td>{{item.NAME+"（"+item.UNIT+"）"}}</td>
									<td>{{item.MONITOR_VALUE}}</td>
									<td>{{item.LIMIT_VALUE}}</td>
									<td>{{item.OVERMULTIPLE}}</td>
								</tr>
							</tbody>	
						</table>
						</div>
					</div>
				</p>
				<p>
					<br><span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;四、废水污染源</span>
					<div id="fs_chart" style="width:400px;height:300px;margin-left:30%"></div>
				</p>
				<p class="textClass">
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）评价项目与评价标准</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 评价项目</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）{{firstData.fs_factors}}</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）特征污染物</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{firstData.fs_tz_factors}}</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评价标准</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{firstData.fs_pjbz}}</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）评价方法</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{firstData.fs_pjff}}，详见表5</span>
					<br><span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;表5　　工业废水排放执行标准</span>
					<div >
						<div style="padding:0px 20% 0px 20%">
						<table style="width:100%">
							
							<tbody>
								<tr style="background-color:#CCFFCC">
										<td style="border-top: 1px solid #00ff00 !important;">污染源名称</td>
										<td style="border-top: 1px solid #00ff00 !important;">执行标准</td>
											
									</tr>
								<tr><td>北京燕京啤酒股份有限公司</td><td rowspan="21">水污染物综合排放标准（DB11/ 307-2013）排入城镇污水处理厂排放限值</td></tr>
								<tr><td>京现代汽车有限公司北京分公司（一、二、杨镇工厂）</td></tr>
								<tr><td>北京首钢冷轧薄板有限公司</td></tr>
								<tr><td>罗森伯格亚太电子有限公司</td></tr>
								<tr><td>北京韩美药品有限公司</td></tr>
								<tr><td>北京天福号食品有限公司</td></tr>
								<tr><td>北京市郎中屠宰厂</td></tr>
								<tr><td>北京市恒慧通肉类食品有限公司</td></tr>
								<tr><td>北京汽车股份有限公司北京分公司</td></tr>
								<tr><td>北京顺鑫农业股份有限公司鹏程食品分公司</td></tr>
								<tr><td>北京飞机维修工程有限公司</td></tr>
								<tr><td>北京燕京啤酒股份有限公司一分公司</td></tr>
								<tr><td>北京蓝星清洗有限公司</td></tr>
								<tr><td>北京光明键能乳业有限公司</td></tr>
								<tr><td>北京燕京饮料有限公司</td></tr>
								<tr><td>北京恩布拉科雪花压缩机有限公司</td></tr>
								<tr><td>安泰科技股份有限公司北京空港新材分公司</td></tr>
								<tr><td>北京汽车集团有限公司越野车分公司</td></tr>
								<tr><td>SMC（北京）制造有限公司</td></tr>
								<tr><td>国泰半导体材料有限公司(有研半导体材料有 限公司)</td></tr>
								<tr><td>蓝星东丽膜科技（北京）有限公司</td></tr>

								<tr><td>北京顺鑫农业股份有限公司牛栏山酒厂</td><td>水污染物综合排放标准（DB11/ 307-2013） 排入地表水Ⅱ、Ⅲ类水体 A 级排放限值</td></tr>
								
								<tr><td>北京牵手果蔬饮品股份有限公司</td><td rowspan="4">水污染物综合排放标准（DB11/ 307-2013） 排入地表水Ⅳ、Ⅴ类水体 B 级排放限值</td></tr>
								<tr><td>北京京日东大食品有限公司</td></tr>
								<tr><td>北京汇源食品饮料有限公司</td></tr>
								<tr><td>北京大发正大有限公司</td></tr>

								
							</tbody>
						</table>
						</div>
					</div>
				</p>
				<p class="textClass">
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）废水污染源排放达标评价</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1．废水污染源监督性监测</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{reportYear}}年我区废水污染源有{{firstData.fs_num}}家，分别为：{{firstData.fs_names}} 。以上{{firstData.fs_num}}家废水重点污染源主要污染物及特征污染物监测结果年均值见表5。</span>
					<br><span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;表6     年废水污染源监测结果汇总表（全年均值）</span>
					<div>
						<div  style="padding:0px 20% 0px 20%">
						<table style="width:100%">
							
							<tbody id="fstable" >
								<tr style="background-color:#CCFFCC">
										<td rowspan="2" style="border-top: 1px solid #00ff00 !important;">单位名称</td>
										<td rowspan="2" style="border-top: 1px solid #00ff00 !important;">排口名称</td>
										<td colspan="6" style="border-top: 1px solid #00ff00 !important;">监测项目</td>
											
								</tr>
								<tr style="background-color:#CCFFCC">
										
										<td>pH（无量纲）</td>
										<td>化学需氧量（mg/L）</td>
										<td>氨氮（mg/L）</td>
										<td>悬浮物（mg/L）</td>
										<td>总磷（mg/L）</td>
										<td>总氮（mg/L）</td>
								</tr>
								<tr v-for="item in fstable">
									<td :title="item.COMPANY_NAME">{{item.COMPANY_NAME}}</td>
									<td>{{item.OUTLET_NAME}}</td>
									<td>{{item.PH}}</td>
									<td>{{item.化学需氧量}}</td>
									<td>{{item.氨氮}}</td>
									<td>{{item.悬浮物}}</td>
									<td>{{item.总磷}}</td>
									<td>{{item.总氮}}</td>

								</tr>
								

							</tbody>
						</table>
						</div>
					</div>
					<div>
						<div  style="padding:0px 20% 0px 20%" v-for="item in fsDynamicheadList">
							<table style="width:100%"> 
								<tbody>
									<tr  style="background-color:#CCFFCC">
										<td style="width:500px;">单位名称</td>
										<td  v-for="(itemChild,key) in item.NAME.split(',')">{{itemChild}}</td>	
									</tr>
									<tr v-for=" itemData in fsDynamicTabInfo" v-if="item.NAME==itemData.NAME">
										<td>{{itemData.COMPANY_NAME}}</td>
										<td v-for="itemChildData in itemData.MONITOR_VALUE.split(',')">
											{{itemChildData}}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</p>
				<p class="textClass">
					<br><span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;经过统计分析，{{reportYear}}年我区废水污染源参评{{firstData.fs_num}}家共个{{firstData.fs_pknum}}排口，各类污染物总达标率为{{firstData.fs_jdxdbl}}%，存在{{firstData.fs_overpoofInfo}}。</span>
					<br><span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;表7　　工业废水排放超标情况</span>
					<div >
						<div style="padding:0px 20% 0px 20%">
						<table style="width:100%">
							
							<tbody>
								<tr style="background-color:#CCFFCC">
										<td style="border-top: 1px solid #00ff00 !important;">单位名称</td>
										<td style="border-top: 1px solid #00ff00 !important;">监测时间</td>	
										<td style="border-top: 1px solid #00ff00 !important;">排口</td>	
										<td style="border-top: 1px solid #00ff00 !important;">项目</td>
										<td style="border-top: 1px solid #00ff00 !important;">浓度</td>
										<td style="border-top: 1px solid #00ff00 !important;">标准限值</td>
										<td style="border-top: 1px solid #00ff00 !important;">超标倍数</td>
								</tr>
								<tr v-for="item in fsOverTableInfo">
									<td>{{item.COMPANY_NAME}}</td>
									<td>{{item.MONITOR_TIME}}</td>
									<td>{{item.OUTLET_NAME}}</td>
									<td>{{item.NAME+"（"+item.UNIT+"）"}}</td>
									<td>{{item.MONITOR_VALUE}}</td>
									<td>{{item.LIMIT_VALUE}}</td>
									<td>{{item.OVERMULTIPLE}}</td>
								</tr>
							</tbody>
						</table>
						</div>
					</div>
				</p>
				<p>
					<br><span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;五、污水处理厂</span>
					<div id="wsclc_chart" style="width:400px;height:300px;margin-left:30%"></div>
				</p>
				<p class="textClass">
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）评价项目与评价标准</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.评价项目</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{firstData.wsclc_pjxm}}</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.评价标准</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{firstData.wsclc_pjbz}}</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）评价方法</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{firstData.wsclc_pjff}}，根据废水排放去向选定相应级别标准进行达标评价，详见表5</span>
					<br ><span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;表8   污水厂排放执行标准</span>
					<div>
						<div style="padding:0px 20% 0px 20%">
						<table style="width:100%">
							
							<tbody>
								<tr style="background-color:#CCFFCC">
										<td style="border-top: 1px solid #00ff00 !important;">污水厂名称</td>
										<td style="border-top: 1px solid #00ff00 !important;">执行标准</td>
										<td style="border-top: 1px solid #00ff00 !important;">备注</td>
											
									</tr>
								<tr><td>北京首都国际机场股份有限公司</td><td rowspan="3">城镇污水处理厂水污染物排放标准（DB11/890-2012）现有城镇污水处理厂基本控制项目排放限值B标准</td><td rowspan="3">12月1日-3月31日氨氮执行15mg/L标准，其它月份执行8mg/L标准。</td></tr>
								<tr><td>北京同晟水净化有限公司</td></tr>
								<tr><td>北京首都机场动力能源有限公司水电分公司</td></tr>
								<tr><td>北京京禹顺环保有限公司</td><td>城镇污水处理厂水污染物排放标准（DB11/890-2012）新扩建城镇污水处理厂B标准</td><td>12月1日-3月31日氨氮执行2.5mg/L标准，其它月份执行1.5mg/L标准。</td></tr>
								<tr><td>北京市顺义新城温榆河水资源利用工程（二期）</td><td>北京市顺义新城温榆河水资源利用工程（二期）</td><td>总氮执行《北京市环保局关于顺义温榆河水资源利用工程地表水总氮指标意见的函》中的标准</td></tr>
								<tr><td>汉石桥湿地水质改善工程</td><td>地表水环境质量标准（GB3838-2002）Ⅳ类标准</td><td>总磷以湖、库计</td></tr>
							
								
							</tbody>
						</table>
						</div>
					</div>
				</p>
				<p class="textClass">
						<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）污水处理厂排放达标评价</span>
						<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.污水处理厂监督性监测</span>
						<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{reportYear}}年，我区污水处理厂中{{firstData.wsclc_gknames}}均为国控污染源。经统计分析，{{firstData.wsclc_num3}}家污水处理厂20个评价项目的达标率为{{firstData.wsclc_jdxdbl}}%。存在{{firstData.wsclc_overpoofInfo}}。</span>
						<br><span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;表9　污水处理厂排放超标情况</span>
					<div >
						<div style="padding:0px 20% 0px 20%">
						<table style="width:100%">
							
							<tbody>
								<tr style="background-color:#CCFFCC">
										<td style="border-top: 1px solid #00ff00 !important;">单位名称</td>
										<td style="border-top: 1px solid #00ff00 !important;">监测时间</td>	
										<td style="border-top: 1px solid #00ff00 !important;">排口</td>	
										<td style="border-top: 1px solid #00ff00 !important;">项目</td>
										<td style="border-top: 1px solid #00ff00 !important;">浓度</td>
										<td style="border-top: 1px solid #00ff00 !important;">标准限值</td>
										<td style="border-top: 1px solid #00ff00 !important;">超标倍数</td>
								</tr>
								<tr v-for="item in wsclcOverTableInfo">
									<td>{{item.COMPANY_NAME}}</td>
									<td>{{item.MONITOR_TIME}}</td>
									<td>{{item.OUTLET_NAME}}</td>
									<td>{{item.NAME+"（"+item.UNIT+"）"}}</td>
									<td>{{item.MONITOR_VALUE}}</td>
									<td>{{item.LIMIT_VALUE}}</td>
									<td>{{item.OVERMULTIPLE}}</td>
								</tr>
							</tbody>
						</table>
						</div>
					</div>
				</p>
				<p>
						<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;顺义区各污水处理厂各类污染物的基本情况和去除效率数据详见表6。</span>
						<br><span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;表10  污水处理厂去除效率总体情况</span>
						<div>
						<div style="padding:0px 20% 0px 20%">
						<table  style="word-break:break-all; word-wrap:break-all;width:100%">
							
							<tbody >
								<tr style="background-color:#CCFFCC">
									<td rowspan="2"  style="border-top: 1px solid #00ff00 !important;">单位名称</td>
									<td colspan="4"  style="border-top: 1px solid #00ff00 !important;">年均去除率（%）</td>
									<td rowspan="2"   style="border-top: 1px solid #00ff00 !important;">处理工艺</td>
									<td colspan="2"  style="border-top: 1px solid #00ff00 !important;">处理量（万吨））</td>
								</tr>
								<tr style="background-color:#CCFFCC">
									
									<td>氨氮</td>
									<td >化学需氧量</td>
									<td>总氮</td>
									<td >总磷</td>
								
									<td>设计（日）</td>
									<td>实际（日）</td>
								</tr>
								<tr v-for="item in quclInfo" >
									<td>{{item.COMPANY_NAME}}</td>
									<td>{{item.氨氮}}</td>
									<td>{{item.化学需氧量}}</td>
									<td>{{item.总氮}}</td>
									<td>{{item.总磷}}</td>
									<td>{{item.PROCESS}}</td>
									<td>{{item.PROCESS_VOLUME}}</td>
									<td>{{item.WSCLL}}</td>
									
								</tr>
							
								
							</tbody>
						</table>
						</div>
					</div>
				</p>
				<p class="textClass">
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;化学需氧量、氨氮、总磷和总氮的年均去除率与去年同比分别增加了{{firstData.RemoveRateTwoYearCODCompare}}%、{{firstData.RemoveRateTwoYearNH4Compare}}%、{{firstData.RemoveRateTwoYearZPCompare}}%和{{firstData.RemoveRateTwoYearZNCompare}}%。（注：{{reportYear-1}}年化学需氧量、氨氮、总磷和总氮的年均去除率分别是{{firstData.LastYearRemoveRateCOD}}%、{{firstData.LastYearRemoveRateNH4}}%、{{firstData.LastYearRemoveRateZP}}%、{{firstData.LastYearRemoveRateZN}}%。）。</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在分析过程中，发现如下原因导致去除效率不同：一是温度原因，冬季水温低时各项污染物去除率要低于夏季去除效率；二是实际污水处理量，当污水处理量较高但非超负荷运转时，各项污染物去除效率高；三是污泥负荷，当污泥负荷较高时，各项污染物去除效率高。</span>
					<br><span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;六、医疗废水重点源</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）评价项目与评价标准</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.评价项目</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pH值、化学需氧量、氨氮、生化需氧量、动植物油、悬浮物、总余氯、粪大肠菌群等</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.评价标准</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;《医疗机构水污染物排放标准》（GB18466-2005）</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）评价方法</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据医疗机构级别和规模执行表2综合医疗机构和其他医疗机构水污染物排放限值（预处理标准）。</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）医疗废水排放达标评价</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{reportYear}}年我区医疗废水污染源有1家，为北京中医院顺义医院。全年共检测2次，各项污染物达标率为100%。</span>
					<br><span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;七、固体废物集中处理设施</span>
					<div id="gf_chart" style="width:400px;height:300px;margin-left:30%"></div>
				</p>
				<p class="textClass">
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）评价项目与评价标准</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.评价项目</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）生活垃圾填埋场（堆肥场）</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;①渗滤液：{{firstData.sty_pjxm}}</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;②厂界大气：{{firstData.cjdq_pjxm}}</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;③地下水：{{firstData.dxs_pjxm}}</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）生活垃圾焚烧厂</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;颗粒物、烟气黑度、二氧化硫、氮氧化物、一氧化碳、氯化氢、汞及其化合物、镉、铊及其化合物、锑、砷、铅、铬、铜、钴、锰、镍及其化合物、二噁英。</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）评价标准</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{firstData.gf_pjbz}}</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）评价方法</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{firstData.gf_pjff}}</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（四）固体废物集中处理设施达标评价</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我区固体废物集中处理重点排污单位为{{firstData.gf_names}}{{firstData.gf_num}}家。</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.生活垃圾填埋处理设施</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）渗滤液</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;监测数据显示，{{reportYear}}年顺义区生活垃圾综合处理厂渗滤液监测15项指标达标率为{{firstData.gf_sty_dbl}}%。</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）场界大气</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;监测数据显示，年顺义区生活垃圾综合处理厂场界大气氨、硫化氢、臭气浓度三项指标达标率为{{firstData.gf_cjdq_fbl}}%。</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）地下水观测井</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;监测数据显示，{{reportYear}}年顺义区生活垃圾综合处理厂地下水观测井22项指标达标率为{{firstData.gf_dxs_dbl}}%。</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.生活垃圾或危险废物焚烧厂</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;监测数据显示，年顺义区生活垃圾综合处理厂全年停炉。</span>
					<br><span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;八、主要污染物达标排放情况分析。</span>
					<br><span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（一）区域污染源达标情况</span>
					<div id="region_chart" style="width:400px;height:300px;margin-left:30%"></div>
				</p>
				<p class="textClass">
					<br><span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{reportYear}}年顺义区内共有废气重点污染源{{firstData.fqAndZjsAndVoc_num}}家、废水重点污染源和污水处理厂共{{firstData.fs_wsclc_num}}家，对全年监测数据统计分析得出：废气重点污染源各类污染物排放达标率为{{firstData.fq_dbl}}%；废水重点污染源各类污染物排放达标率为{{firstData.fs_jdxdbl}}%；污水处理厂各类污染物排放达标率为{{firstData.wsclc_jdxdbl}}%。</span>
					<br><span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（二）各行业污染源排放达标情况</span>
					<div id="industry_chart" style="width:400px;height:300px;margin-left:30%"></div>
				</p>
				<p class="textClass">
					<br><span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{reportYear}}年顺义区重点废气、废水污染源主要分布于汽车整车和零部件及配件制造、啤酒和白酒制造等行业，数据统计结果显示啤酒和白酒制造行业达标率为{{firstData.bjzz_dbl}}%、汽车整车和零部件及配件制造{{firstData.qczz_dbl}}%、其它行业达标率为{{firstData.qthy_dbl}}%。</span>
					<br><span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（三）污染源排放去向情况</span>
					<div id="outWhere_chart" style="width:400px;height:300px;margin-left:30%"></div>
				</p>
				<p class="textClass">
					<br><span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;顺义区重点废水污染源主要排放于我区{{firstData.liu_yunames}} 。</span>
					<!-- <br><span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（四）达标率年际变化情况比较</span> -->
					<div id="dblChange_chart" style="width:400px;height:300px;margin-left:30%;display:none"></div>
				</p>
				<p class="textClass">
					<br><span style="font-weight: bold;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;九、主要结论</span>
					<br><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{reportYear}}年，废气监督性监测数据达标率为{{firstData.fq_dbl}}%，{{firstData.twoYearFqDblCompare}}；废水污染源监督性监测数据达标率为{{firstData.fs_jdxdbl}}%，{{firstData.twoYearFsDblCompare}}；污水处理厂监督性监测数据达标率为{{firstData.wsclc_jdxdbl}}%，{{firstData.twoYearWsclcDblCompare}}；医疗废水重点源监督性监测数据达标率为100%，与{{reportYear-1}}年（达标率 100%）持平；生活垃圾填埋厂渗滤液为{{firstData.gf_sty_dbl}}%，{{firstData.twoYearGfStyDblCompare}}；厂界大气为{{firstData.gf_cjdq_fbl}}%,{{firstData.twoYearGfCjdqDblCompare}}；地下水观测井数据达标率为{{firstData.gf_dxs_dbl}}%,{{firstData.twoYearGfDxsDblCompare}}。</span>
				</p>
				<p style="text-align:right;padding-right:20%">
					<span>顺义区环境保护局</span>
					<br><span>{{firstData.current_year}}年{{firstData.current_month}}月{{firstData.current_day}}</span>
				</p>
			</div>
			<div v-show="nodataShow">
				暂无数据
			</div>
		</el-main>
		
		
		
		
		
		
		
		
	</div>
</template>

<script>
	// 引入子组件
	import panigation from './../component/panigation';
	
	import saveAs from "file-saver";
	import "./../../../static/htmltoword/jquery.wordexport.js";	
	export default {
		name: 'app',
		data() {
			return {
				reportYear:"",
				reportMinYear:"",
				firstData:"",
				wrybfImg:require('../../assets/images/wryfb.png'),
				chartData:null,
				fstable:null,
				fsDynamicheadList:null,
				fsDynamicTabInfo:null,
				quclInfo:null,
				nodataShow:false,
				hasDataShow:true,
				hasDataNum:1,
				hfxyjwOverTableInfo:null,
				fsOverTableInfo:null,
				wsclcOverTableInfo:null,
			};
		},
		mounted() {
			let _this=this;
			setTimeout(() => {
			layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#reportYear",
						type: "year",
						// max: _this.reportYear+'-12-31',
						// min: _this.reportMinYear+'-01-01',
					
						done: function (value) {
							_this.reportYear=value;
							_this.$http({
								url:_this.baseurl+"wrynb/report/isHasData?daytime="+value,
								method:'post'
							}).then(function(res){
								
									if(res.status==200){
										_this.hasDataNum=res.data.NUM;
										if(res.data.NUM=='0' || res.data.NUM==0){
										_this.nodataShow=true;
										_this.hasDataShow=false;
									}else{
										_this.nodataShow=false;
										_this.hasDataShow=true;
										_this.getFristData();
										_this.initChartData();
										_this.getFsTable();
										_this.getfsTabHeadList();
										_this.getfsTabHeadDataInfo();
										_this.getqclInfo();
										_this.getFsOverTableInfo();
										_this.getHfxyjwOverTableInfo();
										_this.getwsclcOverTableInfo();
									}
								}else{
									layer.error("数据加载错误！")
								}
								
							})
							
                            
						}
					});
				});
				
		}, 1000);
		
		this.getMaxYear();
		//this.initChartData();
		
		},
		components: {
		
		},
		watch: {
		
		},
		methods: {
			createReport(){
				if(this.hasDataNum>0){
					var index = layer.load(1, {
				shade: [0.1,'#fff'] //0.1透明度的白色背景
				});
				let _this=this;
				//alert("1111");
			
				//window.open(_this.baseurl+"wrynb/report/downLoadYearReport?daytime="+_this.reportYear);
				_this.$http({
					url:_this.baseurl+"wrynb/report/getChartData?daytime="+_this.reportYear,
					method:'post'
				}).then(function(res){
					var typeImgs=_this.getChartImgByData(res.data);
					_this.$http({
						url:_this.baseurl+"wrynb/report/changeBase64ToImg",
						method:'post',
						data:{base64String:typeImgs.fq,gfbase64String:typeImgs.gf,wsclcbase64String:typeImgs.wsclc,regionbase64String:typeImgs.region,industrybase64String:typeImgs.industry,dblChangebase64String:typeImgs.dblChange,outWherebase64String:typeImgs.outWhere,fsbase64String:typeImgs.fs},
						transformRequest:function(obj) {
	　　　　　　　　　　　　　　　　var str = [];
	　　　　　　　　　　　　　　　　for ( var p in obj) {
	　　　　　　　　　　　　　　　　str.push(encodeURIComponent(p) + "="
	　　　　　　　　　　　　　　　　+ encodeURIComponent(obj[p]));
	　　　　　　　　　　　　　　　　}
	　　　　　　　　　　　　　　　　return str.join("&");
	　　　　　　　　　　　　　　}
					}).then(function(res){
						window.open(_this.baseurl+"wrynb/report/downLoadYearReport?daytime="+_this.reportYear+"&fqChartImg="+res.data.fqimgPath+"&gfChartImg="+res.data.gfimgPath+"&wsclcChartImg="+res.data.wsclcPath+"&regionChartImg="+res.data.regionPath+"&industryChartImg="+res.data.industryPath+"&dblChangeChartImg="+res.data.dblChangePath+"&outWhereChartImg="+res.data.outWherePath+"&fsChartImg="+res.data.fsimgPath);
						layer.close(index);
					})
				})
				}else{
					layer.msg("该年份暂无数据")
				}
				
				// $("#myDiv").wordExport("污染源年报");

			},
			initChartData(){
				let _this=this;
				_this.$http({
					url:_this.baseurl+"wrynb/report/getChartData?daytime="+_this.reportYear,
					method:'post'
				}).then(function(res){
					_this.chartData=res.data;
					// console.log(_this.chartData);
					// return;
					_this.getChartImgByData(_this.chartData);
				})
			
			},
			getChartImgByData(data){
				// console.log(data.fs);
				// return;
					let _this=this;
					var fqvalueList=[];
					var fqnameList=[];
					var gfvalueList=[];
					var gfnameList=[];
					var regionValueList=[];
					var regionNameList=[];
					var industryNameList=[];
					var industryValueList=[];
					var dblChangeNameList=[];
					var dblChangeValueList=[];	
					var outWhereNumList=[];
					var outWhereNameList=[];				
					for(var i in data.fq){
						fqvalueList.push(data.fq[i].dbl);
						fqnameList.push(data.fq[i].name);
					}
					for(var i in data.gf){
						gfvalueList.push(data.gf[i].dbl);
						gfnameList.push(data.gf[i].name);

					}
					for(var i in data.region){
						regionValueList.push(data.region[i].dbl);
						regionNameList.push(data.region[i].name);
					}
					for(var i in data.Industry){
						industryNameList.push(data.Industry[i].name);
						industryValueList.push(data.Industry[i].dbl);
					}
					for(var i in data.dblChange){
						dblChangeNameList.push(data.dblChange[i].name);
						dblChangeValueList.push(data.dblChange[i].dbl);
					}
					for(var i in data.outwhere){
						outWhereNumList.push(data.outwhere[i].num);
						outWhereNameList.push(data.outwhere[i].name);
					}
					var myCharts=echarts.init(document.getElementById('fq_chart'));
					var gfCharts=echarts.init(document.getElementById('gf_chart'));
					var wsclcCharts=echarts.init(document.getElementById('wsclc_chart'));
					var regionCharts=echarts.init(document.getElementById('region_chart'));
					var industryCharts=echarts.init(document.getElementById('industry_chart'));
					var dblChangeCharts=echarts.init(document.getElementById('dblChange_chart'));
					var outWhereCharts=echarts.init(document.getElementById('outWhere_chart'));
					var fsCharts=echarts.init(document.getElementById('fs_chart'));
				
					 var option = {
                    // color: ["#3398DB"],
						tooltip: {
							trigger: 'axis',
						},
						animation:false,
						grid: {
						},
						legend: {
							show: true,
						},
						xAxis: [
							{
								type: 'category',
								data: fqnameList,
								axisTick: {
									alignWithLabel: true
								},
								// axisLabel: {
								//     interval: 0,
								//     rotate: 10
								// }
							}
						],
						yAxis: [
							{
								type: 'value'
							}
						],
						series: [
							{
								name: ['达标率'],
								type: 'bar',
								barWidth: '60%',
								data: fqvalueList,
								itemStyle: {
									normal: {
										label: {
											show: true, //开启显示
											position: 'top', //在上方显示
											textStyle: { //数值样式
												color: 'black',
												fontSize: 16
											},
											formatter:'{c}%'
										}
									}

							
							}
							}
						]
				};
				var gfOption={
					 // color: ["#3398DB"],
                    tooltip: {
                        trigger: 'axis',
					},
					animation:false,
                    grid: {
					},
                    legend: {
                        show: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: gfnameList,
                            axisTick: {
                                alignWithLabel: true
                            },
                            // axisLabel: {
                            //     interval: 0,
                            //     rotate: 10
                            // }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: ['达标率'],
                            type: 'bar',
                            barWidth: '60%',
							data: gfvalueList,
							itemStyle: {
								normal: {
									label: {
										show: true, //开启显示
										position: 'top', //在上方显示
										textStyle: { //数值样式
											color: 'black',
											fontSize: 16
										},
										formatter:'{c}%'
									}
								}

                           
						}
						}
                    ]
				}
				var wsclcOption={
						// tooltip : {
						// 		trigger: 'item',
						// 		formatter: "{a} <br/>{b} : {c} ({d}%)"
						// 	},
							legend: {
								orient: 'vertical',
								left: 'left',
								data: ['达标率','未达标率'],
								show: true
							},
							animation:false,
							series : [
								{
									name: '污水处理厂达标情况',
									type: 'pie',
									radius : '55%',
									center: ['50%', '60%'],
									data:[
										{value:data.wsclc[0].dbl, name:'达标率'},
										{value:(100-data.wsclc[0].dbl).toFixed(2), name:'未达标率'}
										
									],
									itemStyle: {
										normal: {
											label: {
												show: true, //开启显示
												formatter:'{c}%'
											}
										}

									}
								}
							]
				}
				var regionOption={
					  tooltip: {
                        trigger: 'axis',
					},
					animation:false,
                    grid: {
					},
                    legend: {
                        show: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: regionNameList,
                            axisTick: {
                                alignWithLabel: true
                            },
                            // axisLabel: {
                            //     interval: 0,
                            //     rotate: 10
                            // }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: ['达标率'],
                            type: 'bar',
                            barWidth: '60%',
							data: regionValueList,
							itemStyle: {
								normal: {
									label: {
										show: true, //开启显示
										position: 'top', //在上方显示
										textStyle: { //数值样式
											color: 'black',
											fontSize: 16
										},
										formatter:'{c}%'
									}
								}

                           
						}
						}
                    ]
				};
				var industryOption={
 	 				tooltip: {
                        trigger: 'axis',
					},
					animation:false,
                    grid: {
					},
                    legend: {
                        show: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: industryNameList,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                interval: 0,
								rotate: 30,
								show: true,
									textStyle: {
									fontSize : 10      //更改坐标轴文字大小
       							}
							},
							
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: ['达标率'],
                            type: 'bar',
                            barWidth: '60%',
							data: industryValueList,
							itemStyle: {
								normal: {
									label: {
										show: true, //开启显示
										position: 'top', //在上方显示
										textStyle: { //数值样式
											color: 'black',
											fontSize: 16
										},
										formatter:'{c}%'
									}
								}

                           
						}
						}
                    ]
				};
				var dblChangeOption={
						tooltip: {
                        trigger: 'axis',
					},
					animation:false,
                    grid: {
					},
                    legend: {
						
						data:[(_this.reportYear-1).toString(),_this.reportYear]
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: dblChangeNameList,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                interval: 0,
								rotate: 30,
								show: true,
									textStyle: {
									fontSize : 10      //更改坐标轴文字大小
       							}
							},
							
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: [(_this.reportYear-1).toString()],
                            type: 'bar',
                            // barWidth: '60%',
							data: [0,0,0],
							itemStyle: {
								normal: {
									label: {
										show: true, //开启显示
										position: 'top', //在上方显示
										textStyle: { //数值样式
											color: 'black',
											fontSize: 12
										},
										formatter:'{c}%'
									}
								}

                           
						}
						},
						 {
                            name: [_this.reportYear],
                            type: 'bar',
                            // barWidth: '60%',
							data: dblChangeValueList,
							itemStyle: {
								normal: {
									label: {
										show: true, //开启显示
										position: 'top', //在上方显示
										textStyle: { //数值样式
											color: 'black',
											fontSize: 12
										},
										formatter:'{c}%'
									}
								}

                           
						}
						}
                    ]
				}
				var outWhereOption={
					tooltip: {
                        trigger: 'axis',
					},
					animation:false,
                    grid: {
					},
                    legend: {
                        show: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: outWhereNameList,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                interval: 0,
								rotate: 30,
								show: true,
									textStyle: {
									fontSize : 10      //更改坐标轴文字大小
       							}
							},
							
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: ['排放去向'],
                            type: 'bar',
                            barWidth: '60%',
							data: outWhereNumList,
							itemStyle: {
								normal: {
									label: {
										show: true, //开启显示
										position: 'top', //在上方显示
										textStyle: { //数值样式
											color: 'black',
											fontSize: 16
										},
										formatter:'{c}'
									}
								}

                           
						}
						}
                    ]
				}
				var fsOption={
					legend: {
								orient: 'vertical',
								left: 'left',
								data: ['达标率','未达标率'],
								show: true
							},
							animation:false,
							series : [
								{
									name: '废水重点污染源达标情况',
									type: 'pie',
									radius : '55%',
									center: ['50%', '60%'],
									data:[
										{value:data.fs.dbl, name:'达标率'},
										{value:(100-data.fs.dbl).toFixed(2), name:'未达标率'}
										
									],
									itemStyle: {
										normal: {
											label: {
												show: true, //开启显示
												formatter:'{c}%'
											}
										}

									}
								}
							]
				}
				myCharts.setOption(option);
				gfCharts.setOption(gfOption);
				wsclcCharts.setOption(wsclcOption);
				regionCharts.setOption(regionOption);
				industryCharts.setOption(industryOption);
				dblChangeCharts.setOption(dblChangeOption);
				outWhereCharts.setOption(outWhereOption);
				fsCharts.setOption(fsOption);
				var fqChartsImg=myCharts.getDataURL({ pixelRatio: 2, backgroundColor: '#fff'});
				var gfchartsImg=gfCharts.getDataURL({ pixelRatio: 2, backgroundColor: '#fff'});
				var wsclcChartsImg=wsclcCharts.getDataURL({ pixelRatio: 2, backgroundColor: '#fff'});
				var regionChartsImg=regionCharts.getDataURL({pixelRatio: 2, backgroundColor: '#fff'});
				var industryChartsImg=industryCharts.getDataURL({pixelRatio: 2, backgroundColor: '#fff'});
				var dblChangeChartsImg=dblChangeCharts.getDataURL({pixelRatio: 2, backgroundColor: '#fff'});
				var outWhereChartsImg=outWhereCharts.getDataURL({pixelRatio: 2, backgroundColor: '#fff'});
				var fsChartsImg=fsCharts.getDataURL({pixelRatio: 2, backgroundColor: '#fff'});
				return {fq:fqChartsImg,gf:gfchartsImg,wsclc:wsclcChartsImg,region:regionChartsImg,industry:industryChartsImg,dblChange:dblChangeChartsImg,outWhere:outWhereChartsImg,fs:fsChartsImg};
			},
			getFristData(){
				let _this=this;
				_this.$http({
					url:_this.baseurl+"wrynb/report/getFirstData?daytime="+_this.reportYear,
					method:'post'
				}).then(function(res){
					if(res.status==200){
						_this.firstData=res.data
						// console.log(res.data);
					}else{
						layer.msg('数据加载错误');
					}
				})
			},
			getMaxYear(){
				let _this=this;
				_this.$http({
					url:_this.baseurl+"wrynb/report/getMaxYear",
					method:'post'
				}).then(function(res){
					if(res.status==200){
						_this.reportYear=res.data.YEAR;
						_this.reportMinYear=res.data.MINYEAR;
						_this.getFristData();
						_this.initChartData();
						_this.getFsTable();
						_this.getfsTabHeadList();
						_this.getfsTabHeadDataInfo();
						_this.getqclInfo();
						_this.getwsclcOverTableInfo();
						_this.getFsOverTableInfo();
						_this.getHfxyjwOverTableInfo();
						
					}else{
						layer.msg('数据加载错误');
					}
				})
			},
			getFsTable(){
				let _this=this;
				_this.$http({
					url:_this.baseurl+"wrynb/report/getFillTable4Data?daytime="+_this.reportYear,
					method:'post',
				}).then(function(res){
					_this.fstable=res.data;
					
				})
			},
			getfsTabHeadList(){
				let _this=this;
				_this.$http({
					url:_this.baseurl+"wrynb/report/getFsDynamicHead",
					method:'post',
				}).then(function(res){
					_this.fsDynamicheadList=res.data;
					
				})
			},
			getfsTabHeadDataInfo(){
				let _this=this;
				_this.$http({
					url:_this.baseurl+"wrynb/report/tabHeadInfo?daytime="+_this.reportYear,
					method:'post',
				}).then(function(res){
					_this.fsDynamicTabInfo=res.data;
					
				})
			},
			getqclInfo(){
				let _this=this;
					_this.$http({
					url:_this.baseurl+"wrynb/report/getQclInfo?daytime="+_this.reportYear,
					method:'post',
				}).then(function(res){
					_this.quclInfo=res.data;
					// console.log(res.data);
				})
			},
			getHfxyjwOverTableInfo(){
				let _this=this;
					_this.$http({
					url:_this.baseurl+"wrynb/report/getHfxyjwOverTableData?daytime="+_this.reportYear,
					method:'post',
				}).then(function(res){
					_this.hfxyjwOverTableInfo=res.data;
					// console.log(res.data);
				})
			},
			getFsOverTableInfo(){
				let _this=this;
					_this.$http({
					url:_this.baseurl+"wrynb/report/getFsOverTableData?daytime="+_this.reportYear,
					method:'post',
				}).then(function(res){
					_this.fsOverTableInfo=res.data;
					// console.log(res.data);
				})
			},
			getwsclcOverTableInfo(){
				let _this=this;
					_this.$http({
					url:_this.baseurl+"wrynb/report/getwsclcOverTableData?daytime="+_this.reportYear,
					method:'post',
				}).then(function(res){
					_this.wsclcOverTableInfo=res.data;
					// console.log(res.data);
				})
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
	.reportDiv{
		font-family: STFangSong;
		font-size: 1.4em;
		line-height: 1.7em;
	}
	.textClass{
		text-align: left;
		padding: 0px 20% 0px 20%;
	}
	tbody tr td {
    height: 35px;
    line-height: 35px;
    border: 1px solid #00ff00;
}

#app {
	overflow-y:auto !important;
}

.unexport{
	color: #d0d0d0;
    border-color: #d0d0d0;
}


</style>

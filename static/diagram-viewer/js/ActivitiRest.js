var ActivitiRest = {
	options: {},
	getProcessDefinitionByKey: function(processDefinitionKey, callback) {
		var url = Lang.sub(this.options.processDefinitionByKeyUrl, {processDefinitionKey: processDefinitionKey});
		
		$.ajax({
			url: url,
			dataType: 'json',
			cache: false,
			async: true,
			success: function(data, textStatus) {
				var processDefinition = data;
				if (!processDefinition) {
					console.error("Process definition '" + processDefinitionKey + "' not found");
				} else {
				  callback.apply({processDefinitionId: processDefinition.id});
				}
			}
		}).done(function(data, textStatus) {
			console.log("ajax done");
		}).fail(function(jqXHR, textStatus, error){
			console.error('Get diagram layout['+processDefinitionKey+'] failure: ', textStatus, 'error: ', error, jqXHR);
		});
	},
	
	getProcessDefinition: function(processDefinitionId, callback) {
		var url = Lang.sub(this.options.processDefinitionUrl, {processDefinitionId: processDefinitionId});
		
		$.ajax({
			url: url,
			dataType: 'json',
			cache: false,
			async: true,
			success: function(data, textStatus) {
				var def=data.processDefinition;
				if (def.key=='pollutionSourceKey') {
					//污染源新增流程图显示，最后次环委会审核改成环委会审定、镇街人员补充污染源详细信息改成补充污染源详细信息
					var acts=data.activities;
					for (var i = 0; i < acts.length; i++) {
						if (acts[i].activityId=='completeInfo') {
							data.activities[i].properties.name='补充污染源详细信息';
						}else if (acts[i].activityId=='hwhCheckAgain') {
							data.activities[i].properties.name='环委会审定';
						}
					}
				}//结束
				var processDefinitionDiagramLayout = data;
				if (!processDefinitionDiagramLayout) {
					console.error("Process definition diagram layout '" + processDefinitionId + "' not found");
					return;
				} else {
					callback.apply({processDefinitionDiagramLayout: processDefinitionDiagramLayout});
				}
			}
		}).done(function(data, textStatus) {
			console.log("ajax done");
		}).fail(function(jqXHR, textStatus, error){
			console.log('Get diagram layout['+processDefinitionId+'] failure: ', textStatus, jqXHR);
		});
	},
	
	getHighLights: function(processInstanceId, callback) {
		var url = Lang.sub(this.options.processInstanceHighLightsUrl, {processInstanceId: processInstanceId});
		
		$.ajax({
			url: url,
			dataType: 'json',
			cache: false,
			async: true,
			success: function(data, textStatus) {
				console.log("ajax returned data");
				var highLights = data;
				if (!highLights) {
					console.log("highLights not found");
					return;
				} else {
					callback.apply({highLights: highLights});
				}
			}
		}).done(function(data, textStatus) {
			console.log("ajax done");
		}).fail(function(jqXHR, textStatus, error){
		  console.log('Get HighLights['+processInstanceId+'] failure: ', textStatus, jqXHR);
		});
	}
};
({
	doInittt : function(component, event)

{
		var pageSize = component.get("v.pageSize");
	var action = component.get("c.getOpportunities");
    action.setParams({
        recordId:component.get("v.selectRecordName")
    });
	action.setCallback(this, function(response)
{
	var state = response.getState();
	if (component.isValid() && state === "SUCCESS")
{
	component.set('v.opportunityList', response.getReturnValue());
	component.set("v.totalSize", component.get("v.opportunityList").length);
	component.set("v.start",0);
	component.set("v.end",pageSize-1);
	var paginationList = [];
	for(var i=0; i< pageSize; i++)
{
	paginationList.push(response.getReturnValue()[i]);
}
	component.set('v.paginationList', paginationList);
//console.log(paginationList);
}
});
	$A.enqueueAction(action);
}
})
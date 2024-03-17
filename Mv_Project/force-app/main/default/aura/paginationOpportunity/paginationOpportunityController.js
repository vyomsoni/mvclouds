({

doInit : function(component, event, helper)
{
     helper.doInittt(component,event);
},
	onSelectChange : function(component, event, helper) {
	var selected = component.find("records").get("v.value");
	var paginationList = [];
	var oppList = component.get("v.opportunityList");
	for(var i=0; i< selected; i++)
{
	paginationList.push(oppList[i]);
}
	component.set('v.paginationList', paginationList);

},
	searchKeyChange: function(component, event) {
	var searchKey =  component.find("input1").get("v.value");
	console.log(searchKey);
	var action = component.get("c.getByName");
	var keysize = component.get("v.totalSize");
	action.setParams({
	"searchKey": searchKey,
        "recordId": component.get("v.selectRecordName")
	});
	action.setCallback(this, function(response) {
	var state = response.getState();
	if (component.isValid() && state === "SUCCESS")
	{
	component.set('v.opportunityList', response.getReturnValue());
	component.set("v.totalSize", component.get("v.opportunityList").length);
	var paginationList = [];
	for(var i=0; i< keysize; i++)

	{
	paginationList.push(response.getReturnValue()[i]);
	}
	component.set('v.paginationList', paginationList);
	}
	});
	$A.enqueueAction(action);

	},

	first : function(component, event, helper)

	{
	var oppList = component.get("v.opportunityList");
	var pageSize = component.get("v.pageSize");
	var paginationList = [];
	for(var i=0; i< pageSize; i++)
	{
	paginationList.push(oppList[i]);
	}
	component.set('v.paginationList', paginationList);	
	},
	last : function(component, event, helper)
	{	
	var oppList = component.get("v.opportunityList");
	var pageSize = component.get("v.pageSize");
	var totalSize = component.get("v.totalSize");
	var paginationList = [];
	for(var i=totalSize-pageSize+1; i< totalSize; i++)
		{

	paginationList.push(oppList[i]);
	}
	component.set('v.paginationList', paginationList);

	},

	next : function(component, event, helper)
		{

	var oppList = component.get("v.opportunityList");
	var end = component.get("v.end");
	var start = component.get("v.start");
		var pageSize = component.get("v.pageSize");
	var paginationList = [];
	var counter = 0;

	for(var i=end+1; i<end+pageSize+1; i++)

	{

	if(oppList.length > end)

	{
	paginationList.push(oppList[i]);
	counter ++ ;
	}

}

		start = start + counter;
		end = end + counter;
		component.set("v.start",start);
		component.set("v.end",end);
		component.set('v.paginationList', paginationList);
},

previous : function(component, event, helper)

{

	var oppList = component.get("v.opportunityList");
	var end = component.get("v.end");
	var start = component.get("v.start");
	var pageSize = component.get("v.pageSize");
	var paginationList = [];
	var counter = 0;

for(var i= start-pageSize; i < start ; i++)
{

	if(i > -1)
	{
	paginationList.push(oppList[i]);
		counter ++;
	}

	else {
	start++;
	}
}

	start = start - counter;
	end = end - counter;
	component.set("v.start",start);
	component.set("v.end",end);
	component.set('v.paginationList', paginationList);
},
    getPickListValues : function(component, event, helper) {
    var newList=[];
    let list = [];
   
    	var action = component.get("c.getAccounts");
        action.setCallback(this,function(response){
            
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set("v.picklistValues",response.getReturnValue() );
                
            }
        });
    list = component.get("v.picklistValues");
    var resultBox = component.find('resultBox');
    if(component.get("v.currentText") != undefined) {
        for(var i=0;i<list.length;i++){
            var iterator= list[i];
            if(iterator.Name.toLowerCase().includes(component.get("v.currentText").toLowerCase())){
                newList.push(iterator);
            }
        }
        component.set("v.picklistValues", newList);               
        if(component.get("v.picklistValues").length == 0) {
            $A.util.removeClass(resultBox, 'slds-is-open');
        }else{
            $A.util.addClass(resultBox, 'slds-is-open');
        }
    }else{
        $A.util.addClass(resultBox, 'slds-is-open');
    }
     $A.enqueueAction(action);
},


searchField : function(component, event, helper) {
    let list = [];
     console.log(typeof list);
  	var action = component.get("c.getAccounts");
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
        
                
                   component.set("v.TempicklistValues",response.getReturnValue() );
                        
            }
        });
    
   $A.enqueueAction(action);
    list = component.get("v.TempicklistValues");
    var resultBox = component.find('resultBox');
    var currentText =event.getSource().get("v.value");
    component.set("v.currentText", currentText);
    component.set("v.selectRecordName", currentText);
    var newList=[];
           
    if(currentText.length >= 0) {
        for(var i=0;i<list.length&&currentText.length > 0;i++){
            var iterator= list[i];
            if(iterator.Name.toLowerCase().includes(currentText.toLowerCase())){
                newList.push(iterator);
                
            }
            
            
        }
        if(currentText.length==0){
             component.set("v.picklistValues", list);
        }else{
              component.set("v.picklistValues", newList);
        }

        
        if(component.get("v.picklistValues").length == 0) {
            $A.util.removeClass(resultBox, 'slds-is-open');
        }else{
            $A.util.addClass(resultBox, 'slds-is-open');
        }
    }
    else {
        $A.util.addClass(resultBox, 'slds-is-open');
    }
},


//When user selects a record, set it as selected
setSelectedRecord : function(component, event, helper) {
    console.log(event.currentTarget.dataset);
     console.log(typeof event.currentTarget.dataset);
    component.set("v.selectRecordName", event.currentTarget.dataset.name);
    component.set("v.currentText", event.currentTarget.dataset.name);
     helper.doInittt(component,event);
    var resultBox = component.find('resultBox');
    
    $A.util.removeClass(resultBox, 'slds-is-open');
    
}, 

//Function when user clicks outside Component to close the dropdown list
closeDropDown : function(component, event, helper) {
    var resultBox = component.find('resultBox');
    $A.util.removeClass(resultBox, 'slds-is-open');
},
})
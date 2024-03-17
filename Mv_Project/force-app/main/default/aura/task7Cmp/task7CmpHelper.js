({
	doEdit : function(component,event,helper) {
		console.log("Edit"+event.getParam('value'));
	},
    doDelete : function(component,event,helper) {
		console.log("Delete"+event.getParam('value'));
	},
    doInit : function(component,event,helper){
         var action=component.get("c.getContacts");
    action.setParams({recordId:component.get("v.currentText")});
      action.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state === 'SUCCESS'){
                   console.log(response.getReturnValue());
                   component.set("v.Wrapper",response.getReturnValue() );
                        
            }
        });
    $A.enqueueAction(action);
    }
})
({
	updateAccountDrag : function(cmp,event,helper,AccountId,retAccountId,ContactId) {
		
 
        var action = cmp.get("c.updateContact");
        action.setParams({  AccountId : AccountId,ContactId : ContactId,retAccountId : retAccountId });


        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
             cmp.set('v.contactWrapper',response.getReturnValue());
           //     alert("From server: " + response.getReturnValue());

            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

       
        $A.enqueueAction(action);
   
	},
    doInittt : function(component, event)
{
		
	var action = component.get("c.getContacts");
    action.setParams({
        recordId:component.get("v.selectRecordName"),
        recordId1:component.get("v.selectRecordName1")
    });
	action.setCallback(this, function(response)
	{
		var state = response.getState();
		if (component.isValid() && state === "SUCCESS")
    	{
		component.set('v.contactWrapper', response.getReturnValue());
	
   		}
  });
	$A.enqueueAction(action);
},
    
})
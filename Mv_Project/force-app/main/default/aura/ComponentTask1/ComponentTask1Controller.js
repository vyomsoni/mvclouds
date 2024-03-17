({
 
    CreateAccount : function(component, event, helper) {
      
        var action = component.get('c.createAcc');
       
        action.setParams({
            "acc": component.get('v.AccountList')
        });
        action.setCallback(this, function(response) {
           
            var state = response.getState();
            if (state === "SUCCESS") {
            
 
              //  var toastEvent = $A.get("e.force:showToast");
               // toastEvent.setParams({
                //    "title": "Success!",
                //    "message": "The record Created successfully."
              //  });
              //  toastEvent.fire();  --> 
                 
            }
        });
        $A.enqueueAction(action);
    },
   
    displayAccount : function(component, event, helper) {
       
        var action = component.get('c.displayAcc');
        action.setCallback(this, function(response) {
          
            var state = response.getState();
            if (state === "SUCCESS") {
              
                 component.set('v.AccListToDisplay', response.getReturnValue());               
            }
        });
        $A.enqueueAction(action);
    }})
({
	next : function(component, event, helper) {
	let num = parseInt(component.get("v.current"));
        
     num= num+1;
           // console.log(num);
     component.set("v.current",num.toString()); 
   //  component.set("v.visiblePrev",false);
    //   if(num==3){
     //       component.set("v.visibleNext",true);
     //   }
	},
    prev : function(component, event, helper) {
	  	let num = parseInt(component.get("v.current"));
       
        num= num-1;
           // console.log(num);
        component.set("v.current",num.toString()); 
      //  if(num==1){
      //      component.set("v.visiblePrev",true);
       //      component.set("v.visibleNext",false);
       // }
	},
    handleStepBlur1 : function (component, event, helper) {
        component.set("v.current",'1');
     
    },
     handleStepBlur2 : function (component, event, helper) {
          component.set("v.current",'2');
         
    },
     handleStepBlur3 : function (component, event, helper) {
        component.set("v.current",'3');
    },
     CreateAccount : function(component, event, helper) {
          var action = component.get('c.createAcc');
       
        action.setParams({
            "acc": component.get('v.AccountList'),
            "con": component.get('v.ContactList'),
            "evt":component.get('v.EventList')
        });
        action.setCallback(this, function(response) {
           
            var state = response.getState();
            if (state === "SUCCESS") {
            console.log(response.getReturnValue());
             component.set("v.accountId",response.getReturnValue());
              //  var toastEvent = $A.get("e.force:showToast");
               // toastEvent.setParams({
                //    "title": "Success!",
                //    "message": "The record Created successfully."
              //  });
              //  toastEvent.fire();  --> 
                 
            }
        });
        $A.enqueueAction(action);
       
    }
    
})
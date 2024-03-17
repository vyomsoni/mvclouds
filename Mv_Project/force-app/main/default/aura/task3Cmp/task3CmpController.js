({
	doInit : function(cmp, event, helper) {
	
 
        var action = cmp.get("c.getContacts");
      //  action.setParams({  recordId:component.get("v.selectRecordName"),
      //  recordId1:component.get("v.selectRecordName1")
     // });
    //    action.setParams({ firstName : cmp.get("v.firstName") });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
               cmp.set('v.contactWrapper',response.getReturnValue());
              // alert("From server: " + JSON.stringify(response.getReturnValue()));


            }
            else if (state === "INCOMPLETE") {
          
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
    
    dragStart: function(cmp,event,helper){
        console.log(event.target.id);
        event.dataTransfer.setData('Text',event.target.id);
        
    },
    
    allowDrop : function(cmp,event,helper){
        event.preventDefault();
    },
    
    onAcc1Drop : function(cmp,event,helper){
       // console.log(event.dataTransfer.getData('Text',event.target.id));
       
        helper.updateAccountDrag(cmp,event,helper,cmp.get("v.selectRecordName"),cmp.get("v.selectRecordName1"),event.dataTransfer.getData('Text',event.target.id));
       
    },
    
    onAcc2Drop : function(cmp,event,helper){
        console.log('001GC00003cOksiYAC');
		 helper.updateAccountDrag(cmp,event,helper,cmp.get("v.selectRecordName"),cmp.get("v.selectRecordName1"),event.dataTransfer.getData('Text',event.target.id));
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
       var action = component.get("c.getName");
    action.setParams({
        "recordId":event.currentTarget.dataset.name
       
    });
	action.setCallback(this, function(response)
	{
		var state = response.getState();
		if (component.isValid() && state === "SUCCESS")
    	{
		component.set('v.currentText', response.getReturnValue());
	
   		}
  });
     helper.doInittt(component,event);
    var resultBox = component.find('resultBox');
    
    $A.util.removeClass(resultBox, 'slds-is-open');
    
}, 

//Function when user clicks outside Component to close the dropdown list
closeDropDown : function(component, event, helper) {
    var resultBox = component.find('resultBox');
    $A.util.removeClass(resultBox, 'slds-is-open');
}, 
    getPickListValues1 : function(component, event, helper) {
    var newList=[];
    let list = [];
   
    	var action = component.get("c.getAccounts");
        
        action.setCallback(this,function(response){
            
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set("v.picklistValues1",response.getReturnValue() );
                
            }
        });
    list = component.get("v.picklistValues1");
    var resultBox = component.find('resultBox1');
    if(component.get("v.currentText1") != undefined) {
        for(var i=0;i<list.length;i++){
            var iterator= list[i];
            if(iterator.Name.toLowerCase().includes(component.get("v.currentText1").toLowerCase())){
                newList.push(iterator);
            }
        }
        component.set("v.picklistValues1", newList);               
        if(component.get("v.picklistValues1").length == 0) {
            $A.util.removeClass(resultBox, 'slds-is-open');
        }else{
            $A.util.addClass(resultBox, 'slds-is-open');
        }
    }else{
        $A.util.addClass(resultBox, 'slds-is-open');
    }
     $A.enqueueAction(action);
},


searchField1 : function(component, event, helper) {
    let list = [];
     console.log(typeof list);
  	var action = component.get("c.getAccounts");
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
        
                   component.set("v.TempicklistValues1",response.getReturnValue() );
                        
            }
        });
    
   $A.enqueueAction(action);
    list = component.get("v.TempicklistValues1");
    var resultBox = component.find('resultBox1');
    var currentText =event.getSource().get("v.value");
    component.set("v.currentText1", currentText);
    component.set("v.selectRecordName1", currentText);
    var newList=[];
           
    if(currentText.length >= 0) {
        for(var i=0;i<list.length&&currentText.length > 0;i++){
            var iterator= list[i];
            if(iterator.Name.toLowerCase().includes(currentText.toLowerCase())){
                newList.push(iterator);
                
            }
            
            
        }
        if(currentText.length==0){
             component.set("v.picklistValues1", list);
        }else{
              component.set("v.picklistValues1", newList);
        }

        
        if(component.get("v.picklistValues1").length == 0) {
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
setSelectedRecord1 : function(component, event, helper) {
  //  console.log(event.currentTarget.dataset);
    // console.log(typeof event.currentTarget.dataset);
    component.set("v.selectRecordName1", event.currentTarget.dataset.name);
      var action = component.get("c.getName");
    action.setParams({
        AccountId:event.currentTarget.dataset.name
       
    });
	action.setCallback(this, function(response)
	{
		var state = response.getState();
		if (component.isValid() && state === "SUCCESS")
    	{
		component.set('v.currentText1', response.getReturnValue());
	
   		}
  });
     helper.doInittt(component,event);
    var resultBox = component.find('resultBox1');
    
    $A.util.removeClass(resultBox, 'slds-is-open');
    
}, 


})
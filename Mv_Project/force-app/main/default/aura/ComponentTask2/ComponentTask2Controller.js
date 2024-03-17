({
//when clicking on field
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
    var resultBox = component.find('resultBox');
    $A.util.removeClass(resultBox, 'slds-is-open');
}, 

//Function when user clicks outside Component to close the dropdown list
closeDropDown : function(component, event, helper) {
    var resultBox = component.find('resultBox');
    $A.util.removeClass(resultBox, 'slds-is-open');
},
})
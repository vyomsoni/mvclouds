({
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
    var getname=component.get("c.getName");
    getname.setParams({recordId:event.currentTarget.dataset.name});
      getname.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state === 'SUCCESS'){
                   console.log(response.getReturnValue());
                   component.set("v.selectRecordName", response.getReturnValue());
                        
            }
        });
     $A.enqueueAction(getname);
    
    component.set("v.currentText", event.currentTarget.dataset.name);
    var resultBox = component.find('resultBox');
   helper.doInit(component,event,helper);
    $A.util.removeClass(resultBox, 'slds-is-open');
}, 

//Function when user clicks outside Component to close the dropdown list
closeDropDown : function(component, event, helper) {
    var resultBox = component.find('resultBox');
    $A.util.removeClass(resultBox, 'slds-is-open');
},
    
    handleSectionToggle : function(component,event,helper){
        console.log('hi');
    },
    
    
   contactAction: function(component, event, helper) {
        helper.doInit(component,event,helper);
       console.log(event.getParams('Value').value);
       component.set("v.isContactHidden",false);
        component.set("v.contactId",event.getParams('Value').value);
  },
     opportunityAction: function(component, event, helper) {
       console.log(event.getParams('Value').value);
          component.set("v.opportunityId",event.getParams('Value').value);
       component.set("v.isOppHidden",false);
  },
    
    
      openModal : function(component, event, helper) {
          
        component.set("v.isContactHidden", false);
              component.set("v.isOppHidden",false)
    },

    onConfirm1: function(component, event, helper) {
         var action=component.get("c.updateContact");
        console.log(component.get("v.contactId")+component.get("v.ContactList.FirstName")+component.get("v.ContactList.LastName")+component.get("v.ContactList.Email")+component.get("v.ContactList.Phone"));
        action.setParams({ids:component.get("v.contactId"),FirstName:component.get("v.ContactList.FirstName"),LastName:component.get("v.ContactList.LastName"),Email:component.get("v.ContactList.Email"),Phone:component.get("v.ContactList.Phone")});
      action.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state === 'SUCCESS'){
              console.log('changed');
                alert("changed successfully");
                 helper.doInit(component,event,helper);       
            }
        });
    $A.enqueueAction(action);
        component.set("v.isContactHidden", true);
         component.set("v.isOppHidden",true);
        
    },
    onConfirm2: function(component, event, helper) {
        console.log('Will be called when confirm button is clicked on modal');
        component.set("v.isContactHidden", true);
         component.set("v.isOppHidden",true);
        
    },

    onCancel: function(component, event, helper) {
        console.log('Will be called when cancel button is clicked on modal');
        component.set("v.isContactHidden", true);
          component.set("v.isOppHidden",true);
    }

})
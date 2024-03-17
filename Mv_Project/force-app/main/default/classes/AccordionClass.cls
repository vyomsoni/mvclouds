public with sharing class AccordionClass {
    
    public List < Account > listAccounts {get;set;}
    public String currentRecordId {get;set;}
    public List < Opportunity > newList {get;set;}
    public Apexpages.StandardSetController controller {get;set;}
    public List<Opportunity> getOpty(){
        List<Opportunity> newList = (List<Opportunity>)controller.getRecords();
        
        return newList;
    }
    public void save(){
        Id currentRecordId = System.currentPageReference().getParameters().get('abc');
        if(currentRecordId != null){
              newList = [SELECT Id,Name FROM Opportunity WHERE AccountId =: currentRecordId];
        controller = new Apexpages.StandardSetController(newList);
        controller.setPageSize(3);
        }else{
               newList = [SELECT Id,Name FROM Opportunity ];
        controller = new Apexpages.StandardSetController(newList);
        controller.setPageSize(3); 
        }
      
      System.debug('hi');
         
    }
    public AccordionClass() {
          save();
         listAccounts = [ SELECT Id, Name, Industry, ( SELECT Id, Name FROM Opportunities ) FROM Account ];
         
        
    }
    
}
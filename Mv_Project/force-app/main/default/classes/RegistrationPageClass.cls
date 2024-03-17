public class RegistrationPageClass {
    public String firstName{get;set;}
    public String lastName{get;set;}
    public String email{get;set;}
    public String phone {get;set;}
    public String password{get;set;}
    
    public RegistrationPageClass(){
        
    }
    
       public void saveTheRecord(String firstName,String lastName,String email,String phone,String password){
        VFaccounts__c a =new VFaccounts__c(Name = firstName , Name__c  = lastName, Email__c = email , Phone__c = phone , Password__c = password);
        insert a;
           
           if(a.Id != null){
               Apexpages.addMessage(new ApexPages.Message(ApexPages.SEVERITY.INFO, 'Record saved successfully'));
                
           }
        
    }
    public PageReference redirect(){
        	saveTheRecord(firstName,lastName,email,phone,password);
            PageReference pageRef = new PageReference('/apex/LoginPage');
            return pageRef;
      
}
    
   
}
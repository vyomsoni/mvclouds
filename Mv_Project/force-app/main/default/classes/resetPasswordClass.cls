public class resetPasswordClass {
    public static String NameEmail{get;set;}
    public static String loginPassword{get;set;}
     public static String reloginPassword{get;set;}
    
    
    public resetPasswordClass(){
        
    }
    
     public PageReference redirect(){
            PageReference pageRef = new PageReference('/apex/LoginPage');
            return pageRef;      
}
    
    public static void myMethod(String NameEmail,String loginPassword,String reloginPassword){
        if(loginPassword == reloginPassword){
  		VFaccounts__c acc ;
        acc = [SELECT Password__c FROM VFaccounts__c WHERE Email__c =:NameEmail ];
        if(acc!=null){
         acc.Password__c = loginPassword;
        update acc;
             Apexpages.addMessage(new ApexPages.Message(ApexPages.SEVERITY.INFO, 'reset succesfully..')); 
        }else{
           Apexpages.addMessage(new ApexPages.Message(ApexPages.SEVERITY.INFO, 'Email is wrong..')); 
        }
        }else{
            Apexpages.addMessage(new ApexPages.Message(ApexPages.SEVERITY.INFO, 'Password are not matched..')); 
        }
    }
}
public class LoginClass {
    
    public static String login{get;set;}
    public static String loginPassword{get;set;}
    public static Integer state= 0;
    public LoginClass(){
        
    }
    
     public PageReference redirect(){
            PageReference pageRef = new PageReference('/apex/resetPassword');
            return pageRef;
      
}
      public PageReference redirectReg(){
            PageReference pageRef = new PageReference('/apex/RegistrationPage');
            return pageRef;
      
}
    
    
    public static void myMethod(String login,String loginPassword){
      List<VFaccounts__c> listt = [Select Name,Email__c,Password__c from VFaccounts__c];
        for(Integer i=0;i<listt.size();i++){
            if(listt[i].Email__c == login){
                if(listt[i].Password__c == loginPassword){   
                    Apexpages.addMessage(new ApexPages.Message(ApexPages.SEVERITY.INFO, 'Login successfully'));
					state=1;
                    break;
                    
                }      
            }
        }
        if(state == 0){
             Apexpages.addMessage(new ApexPages.Message(ApexPages.SEVERITY.INFO, 'Check Email or Password...'));
        }
        
    }
    

    
}
@isTest
public class testClassTask2 {
    static testMethod void BeforeInsert(){
        String FirstName = 'Rahul';
         String LastName = 'vaniya';
      
        String company = 'mvclouds';
        Lead l = new Lead(FirstName=FirstName,LastName =LastName,Rating= 'Hot',Company=company );
        insert l;
        Lead le= [SELECT Id, FirstName,Rating,Name FROM Lead WHERE FirstName =: FirstName];
        if(le != null){
          if(le.Rating == 'Hot'){
            System.assertEquals(l.Rating , le.Rating);
             
            
        }  
        }
        
    }
}
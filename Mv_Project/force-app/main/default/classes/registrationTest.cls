@isTest
public class registrationTest {
    @isTest
    static void task(){
           String firstName = 'vyomm';
  		   String lastName = 'Soni';
   		  String email = 'vyom57ppsv2020@gmail.com';
    	  String phone = '9328713928';
          String password = '9328713928';
        
        RegistrationPageClass pag = new RegistrationPageClass();
        pag.saveTheRecord( firstName, lastName, email, phone, password);
           List<VFaccounts__c> listt = [SELECT Id,Name,Name__c,Email__c,Phone__c,Password__c FROM VFaccounts__c WHERE Name =: firstName];
        System.assertEquals(firstName,listt[0].Name);
          System.assertEquals(lastName,listt[0].Name__c);
          System.assertEquals(email,listt[0].Email__c);
          System.assertEquals(phone,listt[0].Phone__C);
          System.assertEquals(password,listt[0].Password__C);
          pag.redirect();
        
        
    }
}
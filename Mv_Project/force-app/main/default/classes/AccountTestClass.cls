@isTest
public class AccountTestClass {
    @isTest
    static void task7(){
    
        Account testAccount = new Account(
            Name = 'Smith'
        );
        
        insert testAccount;

        testAccount = [SELECT Id, Name FROM Account WHERE Id = :testAccount.Id];

        System.assertEquals('Mr. Smith', testAccount.Name, 'Name should be updated to Mr. Smith');
    }
    
    Static testMethod void task9(){
         List<Approval.ProcessSubmitRequest> submitApprovalList = new List<Approval.ProcessSubmitRequest>();
        Account testAcc = CreateTest();
        System.debug(testAcc);
          Approval.ProcessSubmitRequest submitReq = new Approval.ProcessSubmitRequest();
                submitReq.setComments('Automatically submitted for approval');
                submitReq.setObjectId(testAcc.Id);
                submitApprovalList.add(submitReq);
       
         List<Approval.ProcessResult> approvalResults = Approval.process(submitApprovalList);
         System.debug(approvalResults);
        System.assertEquals(approvalResults != null,True);
    }
    Static Account CreateTest(){
         Account L=New Account();
        L.Name='Midul';      
        insert L; 
        return L;
    }
    
   @isTest
    static void testAccountTrigger() {
        
        Account testAccount = new Account(
            Name = 'Test Account'
        );
        insert testAccount;

        
        Contact testContact = new Contact(
            FirstName = 'Vyom',
            LastName = 'Soni',
            Email = 'vyom57ppsv2020@gmail.com',
            AccountId = testAccount.Id
        );
        insert testContact;

        
        testAccount.Name = 'Updated Test Account';
        update testAccount;

      //  List<Messaging.SingleEmailMessage> sentEmails = [SELECT Id FROM Messaging.SingleEmailMessage];
       // System.assertEquals(1, sentEmails.size(), 'One email should be sent');
   System.assertEquals(1, Limits.getEmailInvocations(), 'Emails should be sent');
    }
    
    
      
    @isTest
    static void task10(){
        Account acc = CreateTest();
        List<Contact> con = [SELECT AccountId,Id, Name FROM Contact WHERE AccountId=:acc.Id];
        System.assertEquals(acc.Id,con[0].AccountId);
    }
    
    @isTest
    static void task12(){
        String Name = 'Ayushi';
        Account acc = new Account(Name = Name);
        insert acc;
        Account newAcc = new Account(Name = Name);
        insert newAcc;
        List<Account> oldAcc = [SELECT Id FROM Account WHERE Id=:acc.Id];
        System.assertEquals(0,oldAcc.size());
    }

}
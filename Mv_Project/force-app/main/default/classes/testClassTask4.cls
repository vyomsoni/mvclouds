@isTest
public class testClassTask4 {
    @isTest
    static void task8() {
       
        Account testAccount = new Account(
            Name = 'Test Account'
        );
        insert testAccount;

        Contact testContact = createContact(testAccount.Id);
        

        delete testContact;

        List<Account> deletedAccounts = [SELECT Id FROM Account WHERE Id = :testAccount.Id];
        System.assertEquals(0, deletedAccounts.size(), 'Associated Account should be deleted');
    }
    
    static Contact createContact(Id ids){
            Contact testContact = new Contact(
            FirstName = 'vyom',
            LastName = 'soni',
            Email = 'sonivyom84@gmail.com',
            AccountId = ids
        );
        insert testContact;
        return testContact;
    }
    
    @isTest
    static void task11(){
        String FirstName= 'vyom';
        String LastName = 'soni';
        String Email = 'vyom57ppsv2020@gmal.com';
        Contact con = new Contact( FirstName = 'vyom',
            LastName = 'soni',
            Email = 'sonivyom84@gmail.com');
        insert con;
        System.debug(con.Id);
        List<Event> newEvent = [SELECT Id FROM Event WHERE WhoId=:con.Id];
        System.debug(newEvent);
        System.assertEquals(1,newEvent.size());    
            
            }
    
  
}
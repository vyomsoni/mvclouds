@isTest
public class ContactTestClass {
    static testMethod void task8(){
        String LastName =  'Soni';
        String FirstName = 'Vyom';
        String Salutation = 'Mr.';
        Contact con = new Contact(AccountId='001GC00003cOgm0YAC',Salutation = Salutation,FirstName =FirstName,LastName = LastName);
		insert con;
        delete con;
        delete [Select Id from Account where Id='001GC00003cOgm0YAC'];
        if(con != null){
            System.assertEquals(con.Id == null,True);
        }
        
    }
}
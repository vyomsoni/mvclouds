@isTest
public class testClassRollupSummary {
	@isTest
    static void rollUpSummary(){
       String  Name = 'VyomAccount';
        Account acc = createAccount(Name);
        Contact firstCon =createContacts(acc.Id,'aayushi',20);
         Contact secondCon =createContacts(acc.Id,'visahl',30);
        List<Account> Acclist = [SELECT Id,TotalAmount__c FROM Account WHERE Id=:acc.Id];
        System.assertEquals(50,Acclist[0].TotalAmount__c);
        delete secondCon;
         List<Account> deleteAfter = [SELECT Id,TotalAmount__c FROM Account WHERE Id=:acc.Id];
        System.assertEquals(20,deleteAfter[0].TotalAmount__c);
    }
    
    static Account createAccount(String Name){
        
        Account newAcc = New Account(Name=Name);
        insert newAcc;
        return newAcc;
    }
    
    static Contact createContacts(Id ids,String name,Integer num){
        Contact con = new Contact();
        con.AccountId = ids;
        con.FirstName = name;
        con.LastName = 'soni';
        con.Amount__c = num;
        insert con;
        return con;
    }
}
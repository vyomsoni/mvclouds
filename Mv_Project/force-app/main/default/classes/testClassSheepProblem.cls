@isTest
public class testClassSheepProblem {
	 static Account createAccount(String Name){
        
        Account newAcc = New Account(Name=Name);
        insert newAcc;
        return newAcc;
    }
    
    static Contact createContacts(Id ids,String name){
        Contact con = new Contact();
        con.AccountId = ids;
        con.FirstName = name;
        con.LastName = 'soni';
        
        insert con;
        return con;
    }
    
    @isTest
    static void task(){
        Account acc1 = createAccount('vyom');
        Account acc2 = createAccount('Aayushi');
        Contact con1 = createContacts(acc1.Id,'testCon1');
        Contact con2 = createContacts(acc1.Id,'testCon2');
        Contact con3 = createContacts(acc1.Id,'testCon3');
        
        con1.AccountId = acc2.Id;
        update con1;
        
        Contact result1 = [SELECT Id,AccountId FROM Contact WHERE Id =: con1.Id];
        
        Contact result2 = [SELECT Id,AccountId FROM Contact WHERE Id =: con2.Id];
        
       Contact result3 = [SELECT Id,AccountId FROM Contact WHERE Id =: con3.Id];
       System.assertEquals(acc2.Id,result1.AccountId);
        System.assertEquals(acc2.Id,result2.AccountId);
        System.assertEquals(acc2.Id,result3.AccountId);
    }
}
@isTest
public class testClassBatch1 {
   @isTest
    static void task(){
         Account acc1= createAcc('testA1');
         Account acc2= createAcc('testA2');
         Account acc3= createAcc('testA3');
         Opportunity con1 =  create(acc1.Id,'test1');
         Opportunity con2 =   create(acc2.Id,'test2');
         Opportunity con3 =  create(acc3.Id,'test3');
        Test.startTest();
        BatchClass1 bat = new BatchClass1();
        Id batchId = Database.executeBatch(bat);
        Test.stopTest();
        Opportunity newCon1 = [SELECT Name FROM Opportunity WHERE Id =: con1.Id];
         Opportunity newCon2 = [SELECT Name FROM Opportunity WHERE Id =: con2.Id];
		 Opportunity newCon3 = [SELECT Name FROM Opportunity WHERE Id =: con3.Id];
        System.assertEquals(acc1.Name,newCon1.Name);
		System.assertEquals(acc2.Name,newCon2.Name);
        System.assertEquals(acc3.Name,newCon3.Name);
        
        
        
    }
    static Opportunity create(Id ids,String name){
        Opportunity opp = new Opportunity();
        opp.Name = name;
        opp.CloseDate = System.today();
        opp.StageName = 'Prospecting';
        opp.AccountId = ids;
        insert opp;
        return opp;
    }
    static Account createAcc(String name){
        Account acc = new Account();
        acc.Name = name;
        insert acc;
        return acc;
    }
}
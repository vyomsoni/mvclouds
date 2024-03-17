@isTest
public class testClassBatch2 {
 
     @isTest
    static void task() {
           Account acc1= createAcc('testA1');
         Account acc2= createAcc('testA2');
         Account acc3= createAcc('testA3');
        Test.startTest();
        BatchClass bat = new BatchClass();
        Id batchId = Database.executeBatch(bat);
        Test.stopTest();
        Datetime now = Datetime.now();
      Integer offset = UserInfo.getTimezone().getOffset(now);
      Datetime local = now.addSeconds(offset/1000);
        Account accc1 = [Select Description,Id  from Account WHERE Id=:acc1.Id];
          Account accc2 = [Select Description,Id  from Account WHERE Id=:acc2.Id];
          Account accc3 = [Select Description,Id  from Account WHERE Id=:acc3.Id];
        
            System.assertEquals('The Account is created when the date and the time is:'+local,accc1.Description);
           System.assertEquals('The Account is created when the date and the time is:'+local,accc2.Description);
           System.assertEquals('The Account is created when the date and the time is:'+local,accc3.Description);
               
    }
    static Account createAcc(String name){
        Account acc = new Account();
        acc.Name = name;
        insert acc;
        return acc;
    }
}
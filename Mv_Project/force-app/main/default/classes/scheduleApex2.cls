global class scheduleApex2 implements Database.Batchable<sObject>,schedulable {
     	 global void execute(SchedulableContext SC) {
       ScheduleApex app = new ScheduleApex();
         Database.executeBatch(app);
    }
     global Database.QueryLocator start(Database.BatchableContext BC){
        return Database.getQueryLocator([SELECT Id,Rating FROM Account]);
     }
     
     global void execute(Database.BatchableContext BC, List<Account> scope){
         for(Account acc:scope)
         {
            acc.Rating = 'Warm'; 
         }    
     }
      global void finish(Database.BatchableContext bc){
      System.debug('your process is the scheduled');
      
  }
}
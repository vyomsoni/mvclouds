global class ScheduleApex implements Database.Batchable<sObject>, schedulable {
	 global void execute(SchedulableContext SC) {
       ScheduleApex app = new ScheduleApex();
         Database.executeBatch(app);
    }
     global Database.QueryLocator start(Database.BatchableContext BC){
        return Database.getQueryLocator([SELECT Id from Opportunity]);
     }
     
     global void execute(Database.BatchableContext BC, List<sObject> scope){
         
        List<Opportunity> oop = new List<Opportunity>();
         for(Integer i=0;i<10;i++){           
             oop.add(new Opportunity(Name='SheduleApex',StageName='Closed Won',CloseDate=System.today().addDays(15)));          
         }
         insert oop;
     }
    global void finish(Database.BatchableContext bc){
	Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
      String[] toAddress = new String[]{'vyom57ppsv2020@gmail.com'};
        mail.setToAddresses(toAddress);
      mail.setSubject('Congrutulations!!');
      mail.setPlainTextBody('Hey the batch job activated');
      Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});
  }
}
global class BatchClass implements Database.Batchable<sObject>,Schedulable {


  
  

  global Database.Querylocator start(Database.BatchableContext bc){
   
    return Database.getQuerylocator([Select Description,Id  from Account]);
  } 
  
  global void execute(Database.BatchableContext bc, List<Account> llist){
      Datetime now = Datetime.now();

      Integer offset = UserInfo.getTimezone().getOffset(now);

      Datetime local = now.addSeconds(offset/1000);
      for(Account l:llist){
          if(l.Description == null){
              l.Description = 'The Account is created when the date and the time is:'+local;
          }    
      }
      update llist; 

  }
  
    global void execute(SchedulableContext sc){
        BatchClass bss = new BatchClass();
        Database.executeBatch(bss,100);
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
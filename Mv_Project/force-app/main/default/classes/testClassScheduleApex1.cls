@isTest
private class testClassScheduleApex1 {
    @isTest
    static void task() {
      String cronExpression = '0 0 0 * * ?';
        Test.startTest();
        String jobId = System.schedule('Test Schedule Apex', cronExpression, new ScheduleApex());
        Test.stopTest();

        System.assertNotEquals(null, jobId, 'Job ID should not be null');

      //  Long waitTime = 60000;
      //  Long endTime = System.currentTimeMillis() + waitTime;
      //  while (System.currentTimeMillis() < endTime) {
          
       //     Datetime nextFireTime = [SELECT NextFireTime FROM CronTrigger WHERE Id = :jobId].NextFireTime;
        //    if (nextFireTime == null) {
        //        break;
         //   }
          
          //  Test.isRunningTest(); 
       // }
      //  List<Opportunity> opportunities = [SELECT Id, Name, StageName, CloseDate FROM Opportunity WHERE Name LIKE 'SheduleApex'];
      //  System.assertEquals(10, opportunities.size(), 'There should be 10 new opportunities created');
      //  for (Opportunity opp : opportunities) {
       //     System.assertEquals('Closed Won', opp.StageName, 'Opportunity Stage should be Closed Won');
        //    System.assertEquals(System.today().addDays(15), opp.CloseDate, 'Close Date should be 15 days from today');
       // }
    }
}
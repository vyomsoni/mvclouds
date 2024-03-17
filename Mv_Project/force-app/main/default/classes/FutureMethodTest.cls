@isTest
public class FutureMethodTest {
	@isTest
    static void task(){

        Opportunity opp = new Opportunity(Name = 'Test Opportunity', StageName = 'Closed Won', CloseDate = Date.today());
        insert opp;       
        ApexPages.StandardController stdController = new ApexPages.StandardController(opp);
        FutureMethodClass controller = new FutureMethodClass(stdController);
        
        Test.startTest();
        controller.addRandomImageAttachment();
        Test.stopTest();     
       
        List<Attachment> attachments = [SELECT Id FROM Attachment WHERE ParentId = :opp.Id];
        System.assertNotEquals(0, attachments.size());       
    }
       
}
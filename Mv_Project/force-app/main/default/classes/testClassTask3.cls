@isTest
public class testClassTask3 {
    @isTest
    static void Task3() {

        Opportunity testOpp = new Opportunity(
            Name = 'Test Opportunity',
            StageName = 'Closed - Won',
            CloseDate = Date.today()
        );
        insert testOpp;

        testOpp.StageName = 'Some Other Stage';
        testOpp.CloseDate = Date.today().addDays(5);
        update testOpp;

        testOpp = [SELECT Id, StageName, CloseDate FROM Opportunity WHERE Id = :testOpp.Id];

        System.assertEquals('Prospecting', testOpp.StageName, 'StageName should be updated to Prospecting');
        System.assertEquals(Date.today().addDays(15), testOpp.CloseDate, 'CloseDate should be updated to 15 days from today');
    }
        @isTest
    static void Task4() {
 
        Opportunity test = new Opportunity(
            Name = 'Test Opportunity',
            StageName = 'Prospecting',
            CloseDate = Date.today()
        );
        insert test;

        Opportunity testNew = [SELECT Id, Type FROM Opportunity WHERE Id = :test.Id];
        System.assertEquals('New Customer', testNew.Type, 'Type should be updated to new customer');
    }
    
    
    @isTest
    static void Task6() {
       
        Opportunity testOpp = new Opportunity(
            Name = 'Test Opportunity',
            StageName = 'Prospecting',
            CloseDate = Date.today()
        );
        insert testOpp;
      
        testOpp.Name = 'Updated Test Opportunity';
        update testOpp;

        List<Task> createdTasks = [SELECT Id, Subject, WhatId, Status, Priority FROM Task WHERE WhatId = :testOpp.Id];

        System.assertEquals(1, createdTasks.size(), 'One task should be created');

        
    }
}
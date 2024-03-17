global class BatchClass1 implements Database.Batchable<sObject>{

List<Id> parentAccount = new List<Id>(); 
List<Opportunity> Opplist1 = new List<Opportunity>();




global Database.QueryLocator start(Database.BatchableContext BC) { 
  

    return DataBase.getQueryLocator([SELECT Name,AccountId FROM Opportunity ]); 

} 


global void execute(Database.BatchableContext BC , List <Opportunity> Opplist) { 
   Account accc;
    for(Opportunity defer:Opplist){
        System.debug('hi vyom');
        if(defer.AccountId != null){
         accc = [SELECT Name FROM Account WHERE Id =:defer.AccountId];
         defer.Name = accc.Name;
        }
        
    }
    update Opplist;
 



} 

global void finish(Database.BatchableContext BC){ 
	System.debug('accounts updated sucessfully');
} 

}
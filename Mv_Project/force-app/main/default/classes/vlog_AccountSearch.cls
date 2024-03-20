public class vlog_AccountSearch {
    
    @AuraEnabled(Cacheable = true)
    public static list<Account> getAccountData(String textkey) {
        textkey = '%' + textkey + '%';
        list<Account> accLst = [SELECT  Id, Name, Industry, Phone, Type From Account WHERE Name LIKE :textkey LIMIT 10];
        
        if(accLst.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return accLst; 
    }
    @AuraEnabled(Cacheable = true)
    public static list<Contact> getContactData(String textkey) {
        textkey = '%' + textkey + '%';
        list<Contact> accLst = [SELECT  Id, FirstName,LastName,Email,Phone From Contact WHERE Name LIKE :textkey LIMIT 10];
        
        if(accLst.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return accLst; 
    }
    @AuraEnabled(Cacheable = true)
    public static list<Opportunity> getOpportunityData(String textkey) {
        textkey = '%' + textkey + '%';
        list<Opportunity> accLst = [SELECT  Id, Name,StageName,CloseDate From Opportunity WHERE Name LIKE :textkey LIMIT 10];
        
        if(accLst.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return accLst; 
    }
    
}
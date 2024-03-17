public class OpportunityController {
@AuraEnabled

public static List<Contact> getOpportunities(String recordId)

{

return [SELECT Id, Name,Phone FROM Contact WHERE AccountId =: recordId];

}

// This method used for reterived  the list of opportunity records based on the search string

@AuraEnabled

public static List<Contact> getByName(String searchKey,String recordId) {

String name = '%' + searchKey + '%';

return [SELECT Id, Name,Phone FROM Contact WHERE Name LIKE :name AND AccountId=:recordId];

}
    
   	@AuraEnabled
    public static List<Account> getAccounts(){
        List<Account> listt = new List<Account>();
        listt = [SELECT Id,Name FROM Account ];
        return listt;
    } 

}
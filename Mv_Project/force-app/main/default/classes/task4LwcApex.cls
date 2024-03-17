public with sharing class task4LwcApex {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id recordId) {
      if(recordId!=null){
        List<Contact> conList = [SELECT Id,FirstName,LastName,Phone,Email FROM Contact WHERE accountId =: recordId];
        return conList ;
      }
      return null;
     }
     @AuraEnabled(cacheable=true)
     public static List<Opportunity> getOpp(Id recordId) {
       if(recordId!=null){
        List<Opportunity> oppList = [SELECT Id,Name,CloseDate,StageName FROM Opportunity WHERE accountId =: recordId];
        return oppList ;
       }
    return null;
      }
}
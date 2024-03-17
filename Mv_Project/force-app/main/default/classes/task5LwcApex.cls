public with sharing class task5LwcApex {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
      
        List<Contact> conList = [SELECT Id,FirstName,LastName,Phone,Email FROM Contact ];
        return conList ;

     }
     @AuraEnabled(cacheable=true)
     public static List<Lead> getLeads() {

        List<Lead> oppList = [SELECT Id,FirstName,LastName,Phone,Email FROM Lead ];
        return oppList ;
       
      }
      @AuraEnabled(cacheable=true)
      public static List<Account> getAccounts() {
       
         List<Account> accList = [SELECT Id,Name,Phone,Email__c,AccountNumber FROM Account ];
         return accList;
       }
      
}
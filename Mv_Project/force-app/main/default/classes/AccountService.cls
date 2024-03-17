public with sharing class AccountService {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
     
       List<Account> accList = [SELECT Id,Name FROM Account ];
       return accList;
     }
    }
public with sharing class ContactDataController { 

    // apex method to fetch contact records from salesforce database 
    @AuraEnabled(cacheable=true)
    public static list<Contact> fetchContacts(){        
            list<Contact> lstContact = new list<Contact>();
            for(Contact con : [SELECT id,name,email,phone,title FROM Contact LIMIT 200]){
                lstContact.add(con);
            } 
            return lstContact;        
    }
    
}
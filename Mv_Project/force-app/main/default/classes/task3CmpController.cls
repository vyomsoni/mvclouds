public class task3CmpController {
    

    @AuraEnabled 
    public static ContactWrapper getContacts(Id recordId,Id recordId1){
            List<Contact> newAccount1 = new List<Contact>();
        	List<Contact> newAccount2 = new List<Contact>();
        if(recordId!=null&&recordId1!=null){
                  List<Contact> ContactList1 = [SELECT Id,Name FROM Contact WHERE AccountId =: recordId];
            List<Contact> ContactList2 = [SELECT Id, Name FROM Contact WHERE AccountId =: recordId1];
        if(ContactList1 != null && ContactList2 != null){
                if(ContactList1 != null && ContactList1.size() > 0){
        	    newAccount1 = ContactList1;
       			 }
       			 if(ContactList2 != null && ContactList2.size()>0){
       		     newAccount2 = ContactList2;
       			 }
        ContactWrapper wp = new ContactWrapper();
        wp.Account1Contact = newAccount1;
        wp.Account2Contact = newAccount2;
        wp.ContactCount1 = ContactList1.size();
         wp.ContactCount2 = ContactList2.size();
        return wp;
        }
        return null;
        }
      return null;
        
    }
    public class ContactWrapper{
        @AuraEnabled 
        public List<Contact> Account1Contact;
        @AuraEnabled
        public List<Contact> Account2Contact;
        @AuraEnabled
        public Integer ContactCount1;
         @AuraEnabled
        public Integer ContactCount2;
        
    }
    @AuraEnabled
    public static ContactWrapper updateContact(Id AccountId,Id ContactId,Id retAccountId){
         System.debug(AccountId);
        System.debug(ContactId);
         Contact con = [SELECT Id,AccountId from Contact where Id=:ContactId];
     
        con.AccountId = AccountId;
        System.debug(con);
        update con;
        return getContacts(AccountId,retAccountId);
    }
    @AuraEnabled
    public static List<Account> getAccounts(){
        List<Account> listt = new List<Account>();
        listt = [SELECT Id,Name FROM Account ];
        return listt;
    }
   public static String getName(String recordId){
        List<Account> acc = [SELECT Id, Name FROM Account WHERE Id =: recordId];
        return acc[0].Name;
    }
}
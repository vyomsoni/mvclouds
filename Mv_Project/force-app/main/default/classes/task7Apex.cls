public class task7Apex {
    
      @AuraEnabled 
    public static AllWrapper getContacts(Id recordId){
        List<Account> newAccount1 = new List<Account>();
		List<Account> AccountList = [SELECT Id,Name FROM Account ];	
     //   List<Account> AccName  = [SELECT Id,Name FROM Account WHERE Id=:recordId];
        List<Contact> con;
        List<Opportunity> opp;
        if(recordId != null){
              con = [SELECT Id,FirstName,LastName,Phone,Email FROM Contact WHERE AccountId =: recordId];
              opp = [SELECT Id,Name,StageName,CloseDate,Amount FROM Opportunity WHERE AccountId =: recordId];
        }
    //    List<Contact> con = [SELECT Id,FirstName,LastName,Phone,Email WHERE AccountId =: recordId];
        AllWrapper wp = new AllWrapper();
        
        wp.AccountList = AccountList;       
        wp.ContactList = con;
        wp.OppList = opp;
        return wp;      
    }
    public class AllWrapper{
        @AuraEnabled
		public List<Account> AccountList;
        @AuraEnabled
        public List<Contact> ContactList;
        @AuraEnabled
        public List<Opportunity> OppList;

    }
    @AuraEnabled
    public static List<Account> getAccounts(){
        List<Account> listt = new List<Account>();
        listt = [SELECT Id,Name FROM Account ];
        return listt;
    }
    @AuraEnabled
    public static String getName(Id recordId){
       List<Account> AccName  = [SELECT Id,Name FROM Account WHERE Id=:recordId];
        return AccName[0].Name;
    }
    @AuraEnabled
    public static void updateContact(Id ids,String FirstName,String LastName, String Email, String Phone){
         Contact con = [SELECT Id,FirstName,LastName,Email,Phone FROM Contact WHERE Id=:ids];
        con.FirstName = FirstName;
        con.LastName  = LastName;
        con.Email = Email;
        con.Phone = Phone;
        update con;
    }
    @AuraEnabled
    public static void updateOpp(Opportunity opp){
        
    }
}
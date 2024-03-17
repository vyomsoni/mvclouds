public class CustomControllerClass {
    public String accName{get;set;}
    
    public Integer accEmployees{get;set;}
    
    public String conName{get;set;}
    
    public String conEmail{get;set;}
    
    public String oppName{get;set;}
    
    public Decimal oppAmount{get;set;}
    
    
    
  
    
    
    public CustomControllerClass(){
        
    }
    
    public void saveTheRecord(){
        Account a =new Account(Name = accName , NumberOfEmployees = accEmployees);
        insert a;
        
        Contact c = new Contact(lastName = conName , email= conEmail , accountid = a.id);
        
        Opportunity o = new Opportunity(Name = oppName,Amount = oppAmount,accountid = a.id, StageName = 'Prospecting', CloseDate = System.today());
        
        insert c;
        insert o;
    }
}
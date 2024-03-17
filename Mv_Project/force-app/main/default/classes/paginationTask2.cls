public class paginationTask2 {
 
     public List<Account> acclst { get; set; }
     public list<contact> conlst { get; set; }
    public list<account> accconts1 { get; set; }
    
    public PageReference selacc() {
        string getid=apexpages.currentpage().getparameters().get('conlst');
        accconts1=[select id,name, (select name from Opportunities ) from account where id=:getid ];
        system.debug(accconts1);
        return null;
    }
    
  
    public paginationTask2(){
         acclst=[select Name  from account ];
        system.debug(acclst);
    }

  public List<SelectOption> getMonths()

   {
          List<SelectOption> options = new List<SelectOption>();
           Schema.DescribeFieldResult fieldResult =  Account.Name.getDescribe();
          List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
           for( Schema.PicklistEntry f : ple)
           {
            options.add(new SelectOption(f.getLabel(), f.getValue()));
           }       
           return options;
        }
}
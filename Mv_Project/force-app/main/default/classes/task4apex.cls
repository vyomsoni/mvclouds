public class task4apex {
  @AuraEnabled
    public static Id createAcc(Account acc,Contact con,Event evt) {
        insert acc;
        con.AccountId = acc.Id;
        insert con;
        evt.WhoId = con.Id;
        evt.StartDateTime=System.today();
        evt.EndDateTime=System.today().addDays(10);
        evt.Description='this event finish after 10 day of created date';
        insert evt;
        return acc.Id;
    }
  
}
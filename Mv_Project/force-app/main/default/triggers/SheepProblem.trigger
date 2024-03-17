trigger SheepProblem on Contact (after update) {
    if(Trigger.isAfter &&Trigger.isUpdate){
         List<Id> oldd = new List<Id>();
        
    List<Id> neww = new List<Id>();
    for(Contact con : Trigger.new){
        neww.add(con.AccountId);
    }
    for(Contact con : Trigger.old){
        oldd.add(con.AccountId);
    }
        System.debug('old'+oldd[0]);
        System.debug('new'+neww[0]);
        if(oldd[0]!=neww[0]){
       List<Contact> con = [SELECT Id,Name FROM Contact WHERE AccountId =: oldd[0]];
        for(Contact c:con){
        c.AccountId = neww[0];
      // System.debug(neww[0]);
          }
      //  System.debug(con);
          update con;
            
        }

      
    }

}
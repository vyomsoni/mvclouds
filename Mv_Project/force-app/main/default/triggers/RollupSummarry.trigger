trigger RollupSummarry on Contact (after insert,after update,after delete) {
    
      if(Trigger.isAfter && Trigger.isInsert || Trigger.isAfter && Trigger.isUpdate){

          List<Id> ids = new List<Id>();
          List<Id> deletee = new List<Id>();
          Decimal result = 0 ;
                  for(Contact con:Trigger.new){
                      ids.add(con.AccountId);
                  }
                  List<Contact> con = [SELECT Id,Amount__c FROM Contact WHERE AccountId IN :ids];
                  for(Contact c:con){
                      result += c.Amount__c;
                  }
                  Account acc ;
                  acc = [SELECT Id,TotalAmount__c FROM Account WHERE Id IN:ids];
                  if(acc!=null){
                      acc.TotalAmount__c = result;
                  }
                  update acc;
      }
        if(Trigger.isDelete){
            if(Trigger.isAfter){

                for(Contact del :Trigger.old){
                   
                    Account accc ;
                    accc = [SELECT Id,TotalAmount__c FROM Account WHERE Id =:del.AccountId];
                    if(accc!=null){
                        accc.TotalAmount__c -= del.Amount__c ;
                    }
                    update accc;
                }
            }
            
        }
    

}
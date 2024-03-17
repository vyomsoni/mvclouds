trigger GreatProblem on Contact (before insert,before update) {
    List<Id> ids = new List<Id>();
    try{

        if(Trigger.isBefore && Trigger.isInsert || Trigger.isBefore && Trigger.isUpdate){
            for(Contact con: Trigger.new){
                ids.add(con.AccountId);
                Account acc ;
                acc = [SELECT Id,Name,Max_Amount__c FROM Account WHERE Id =: con.AccountId];
                if(acc.Max_Amount__c < con.Amount__c){
                    Id ids = acc.Id;
                    Decimal amu = con.Amount__c;
                    Decimal max = acc.Max_Amount__c;
                    for(Integer i=0;i<10;i++){
                        if(amu>max){
                            amu = amu-30;
                            System.debug(amu+''+i);
                            Contact newCon = new Contact(FirstName = 'Jimmy'+i,LastName='Carlo'+i,AccountId=ids,Amount__c = 30);
                        }
                    
                    }
                }
                
            }
           
        }
    }catch(Exception e){

        System.debug('Error is:::'+e.getMessage()+' at line no. ::: '+e.getLineNumber());

    }
}
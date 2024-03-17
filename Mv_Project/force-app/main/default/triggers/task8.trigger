trigger task8 on Contact (after delete) {
    List<Id> accId = new List<Id>();
    for(Contact c : Trigger.old){
        accId.add(c.AccountId);
    }
    List<Account> accdelete = [SELECT Id FROM Account WHERE Id IN :accId];
    if(accdelete.size() > 0){
        delete accdelete;
    }
}
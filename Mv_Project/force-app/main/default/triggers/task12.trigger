trigger task12 on Account (before insert) {
    List<String> count = new List<String>();

    for(Account acc:Trigger.new){
        count.add(acc.Name);
    }
    List<Account> accdelete = [SELECT Id FROM Account WHERE Name IN :count];
    delete accdelete;
    
}
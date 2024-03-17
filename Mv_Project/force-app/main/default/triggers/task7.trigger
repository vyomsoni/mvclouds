trigger task7 on Account (before insert) {
    for(Account acc : Trigger.new){
        acc.Name = 'Mr. '+acc.Name;
    }
}
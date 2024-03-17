trigger task3 on Opportunity (before update) {
    for(Opportunity opp:Trigger.new){
        opp.StageName = 'Prospecting';
        opp.CloseDate = System.today().addDays(15);
    }
}
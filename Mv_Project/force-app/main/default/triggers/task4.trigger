trigger task4 on Opportunity (before insert) {
    for(Opportunity acc:Trigger.new){
        acc.Type = 'new customer';
    }
}
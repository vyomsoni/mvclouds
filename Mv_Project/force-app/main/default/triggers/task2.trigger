trigger task2 on Lead (before insert) {
    if(Trigger.isBefore && Trigger.isInsert){
        for(Lead eachLead: Trigger.New){
            eachLead.Rating = 'Hot';
        }
    }
}
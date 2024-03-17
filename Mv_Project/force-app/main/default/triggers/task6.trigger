trigger task6 on Opportunity (after insert,after update) {
    List<Task> tasks = new List<Task>();
    for(Opportunity opp : Trigger.New){
        if(opp.Name != Trigger.oldmap.get(opp.Id).Name){
            tasks.add(new Task(OwnerId = opp.OwnerId,Subject = 'Follow Up Test Task',WhatId = opp.Id,Status= 'Not Started' , Priority = 'Normal' ));   
        } 
    }
    if(tasks.size() > 0){
        System.debug(tasks);
        insert tasks;
    }  
 }
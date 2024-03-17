trigger task13 on Account (after update) {
    if(trigger.isUpdate){

AccountShare a_Share_Record = new AccountShare ();
for(Account acc:Trigger.new){
    if(acc.Rating == 'Hot'){

        a_Share_Record.UserOrGroupId = '005GC00000kELuKYAW' ;
        a_Share_Record.AccountId = acc.Id;
        a_Share_Record.RowCause = Schema.AccountShare.RowCause.Manual;
        a_Share_Record.AccountAccessLevel = 'Edit';
        a_Share_Record.OpportunityAccessLevel = 'Read';  
        a_Share_Record.CaseAccessLevel = 'Read';         
        
    
        Insert a_Share_Record;
    }
}
    }
}
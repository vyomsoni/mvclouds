trigger task9 on Account (after insert) {
    public void task9(List<Account> newAccounts) {
        List<Approval.ProcessSubmitRequest> submitApprovalList = new List<Approval.ProcessSubmitRequest>();
        
        for (Account acc : newAccounts) {
         
            if (acc.Max_Amount__c> 10000) {  
                Approval.ProcessSubmitRequest submitReq = new Approval.ProcessSubmitRequest();
                submitReq.setComments('Automatically submitted for approval');
                submitReq.setObjectId(acc.Id);
                submitApprovalList.add(submitReq);
            }
        }

        List<Approval.ProcessResult> approvalResults = Approval.process(submitApprovalList);

    }

    public void afterInsert(List<Account> newAccounts) {
        if (newAccounts != null && newAccounts.size() > 0) {
            task9(newAccounts);
        }
    }
}
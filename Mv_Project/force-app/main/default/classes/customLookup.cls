public class customLookup {
    @AuraEnabled
    public static List<Account> fetchAcc() {
        return [SELECT Id,name,phone,AccountNumber,Website from Account limit 10];
    }
}
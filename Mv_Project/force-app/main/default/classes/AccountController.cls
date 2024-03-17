public class AccountController {
	@AuraEnabled
    public static List<Account> getAccounts(){
        List<Account> listt = new List<Account>();
        listt = [SELECT Id,Name FROM Account ];
        return listt;
    }
}
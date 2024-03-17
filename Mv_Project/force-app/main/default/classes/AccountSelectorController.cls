public with sharing class AccountSelectorController {

    @AuraEnabled
    public static List<Account> getAccounts(String searchTerm) {
        // Define a list to hold the accounts
        List<Account> accounts = new List<Account>();

        // Construct the SOQL query
        String soqlQuery = 'SELECT Id, Name FROM Account';

        // Add search term condition if available
        if (String.isNotBlank(searchTerm)) {
            soqlQuery += ' WHERE Name LIKE \'%' + String.escapeSingleQuotes(searchTerm) + '%\'';
        }

        // Execute the query
        accounts = Database.query(soqlQuery);

        return accounts;
    }
}
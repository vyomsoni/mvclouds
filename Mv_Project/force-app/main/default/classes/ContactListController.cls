public with sharing class ContactListController {

    @AuraEnabled
    public static List<Contact> getContacts(String accountId, String searchTerm, Integer currentPage, Integer pageSize) {
        // Define a list to hold the contacts
        List<Contact> contacts = new List<Contact>();

        // Construct the SOQL query
        String soqlQuery = 'SELECT Id, Name FROM Contact WHERE AccountId = :accountId';
        
        // Add search term condition if available
        if (String.isNotBlank(searchTerm)) {
            soqlQuery += ' AND Name LIKE \'%' + String.escapeSingleQuotes(searchTerm) + '%\'';
        }

        // Add pagination limits
        soqlQuery += ' LIMIT :pageSize OFFSET :currentPage';

        // Execute the query
        contacts = Database.query(soqlQuery);

        return contacts;
    }

    @AuraEnabled
    public static Integer getTotalContactCount(String accountId, String searchTerm) {
        // Define a variable to hold the total count
        Integer totalCount = 0;

        // Construct the SOQL query for total count
        String soqlQuery = 'SELECT COUNT() FROM Contact WHERE AccountId = :accountId';

        // Add search term condition if available
        if (String.isNotBlank(searchTerm)) {
            soqlQuery += ' AND Name LIKE \'%' + String.escapeSingleQuotes(searchTerm) + '%\'';
        }

        // Execute the query
        totalCount = Database.countQuery(soqlQuery);

        return totalCount;
    }
}
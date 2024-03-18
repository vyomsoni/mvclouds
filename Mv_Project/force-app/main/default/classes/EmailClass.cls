public with sharing class EmailClass {

    
    @AuraEnabled
    public static List<SObject> search(String searchString) {
        List<SObject> searchList = new List<SObject>();
        try {
            String searchStr = '*' + searchString + '*';
            String searchquery =
                'FIND\'' +
                searchStr +
                '\'IN ALL FIELDS RETURNING Contact(id, name, email where email != null), User(id, name, email where email != null AND isActive = true) LIMIT 10';
            List<List<SObject>> searchResult = search.query(searchquery);
            for (List<SObject> curList : searchResult) {
                searchList.addAll(curList);
            }
            system.debug('searchList:::' + searchList.size());
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return searchList;
    }


    @AuraEnabled
    public static void sendEmailController(String toAddress, String subject, String body, String file, String filename) {
        // EmailWrapper emailDetails = (EmailWrapper) JSON.deserialize(emailDetailStr, EmailWrapper.class);
      //  Messaging.reserveSingleEmailCapacity(1);
      System.debug(file);

        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Gmail_API/gmail/v1/users/vyom57ppsv2020@gmail.com/messages/send');
        req.setMethod('POST');
       // req.setHeader('Authorization', 'Bearer YOUR_ACCESS_TOKEN_HERE');
        req.setHeader('Content-Type', 'application/json');
        
        String MimeType = 'application/octet-stream'; 
        String Attachmentbase64 = EncodingUtil.base64Encode(Blob.valueOf(file));
        // String Attachmentbase64 = EncodingUtil.base64Encode(Blob.valueOf(files));
      
        String mimeBody = '';
        mimeBody += 'To: ' + toAddress + '\r\n';
        mimeBody += 'Subject: ' + subject + '\r\n';
        mimeBody += 'Content-Type: multipart/mixed; boundary=boundary_email\r\n';
        mimeBody += '\r\n--boundary_email\r\n';
        mimeBody += 'Content-Type: text/html\r\n\r\n';
        mimeBody += body + '\r\n';
        mimeBody += '\r\n--boundary_email\r\n';
        mimeBody += 'Content-Type: ' + MimeType + '; name='+filename+'\r\n';
        mimeBody += 'Content-Disposition: attachment\r\n';
        mimeBody += 'Content-Transfer-Encoding: base64\r\n\r\n';
        mimeBody += file + '\r\n';
        mimeBody += '\r\n--boundary_email--';

        req.setBody('{ "raw": "' + EncodingUtil.base64Encode(Blob.valueOf(mimeBody)) + '" }');

        Http http = new Http();
        HttpResponse res = http.send(req);
    
   
   }
       
    Class EmailWrapper {
        public List<String> toAddress;
        public List<String> ccAddress;
        public String subject;
        public String body;
        public List<String> files;
    }
}
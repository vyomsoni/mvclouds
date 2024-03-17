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
    public static void sendEmailController(String emailDetailStr) {
        EmailWrapper emailDetails = (EmailWrapper) JSON.deserialize(emailDetailStr, EmailWrapper.class);
        Messaging.reserveSingleEmailCapacity(1);
        try {
            // messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
            // mail.setToAddresses(emailDetails.toAddress);
            // mail.setCcAddresses(emailDetails.ccAddress);
            // mail.setReplyTo('vyom57ppsv2020@gmail.com');
            // mail.setSenderDisplayName('Vyom Soni');
            // mail.setSubject(emailDetails.subject);
            // mail.setHtmlBody(emailDetails.body);
            // mail.setEntityAttachments(emailDetails.files);
            // Messaging.sendEmail(new List<messaging.SingleEmailMessage>{ mail });
            HttpRequest req = new HttpRequest();
            String toAddress = emailDetails.toAddress[0];
            String subject = emailDetails.subject;
            String mailBody = emailDetails.body;
            String mimeBody='';
            // mimeBody += 'MIME-Version: 1.0\n';
            // mimeBody += 'To: ' + toAddress;
            // mimeBody += '\r\nContent-Type: multipart/mixed'+'boundary='+boundary+'\n';
            // mimeBody += '–'+boundary+'\n';
            // mimeBody += 'Content-Type: text/html; charset=UTF-8\n';
            // mimeBody +=' \r\nSubject: ' + subject + '\r\n\r\n' + mailBody ;
            String mbody = '{ "raw" : "' + EncodingUtil.base64Encode(Blob.valueof('MIME-Version: 1.0\n'+ 'To: ' + toAddress + '\r\nContent-Type:text/html; charset=utf-8;\r\nSubject: ' + subject + '\r\n\r\n' + mailBody )) + '"}';
            req.setHeader('Content-Length', mbody.length()+'');
            req.setHeader('Content-Type', 'application/json');
            
            req.setEndpoint('callout:Gmail_API/gmail/v1/users/vyom57ppsv2020@gmail.com/messages/send');
            //req.setEndpoint('https://gmail.googleapis.com');
            req.setMethod('POST');
            system.debug(mbody);
            req.setBody(mbody);
            // Send the request, and return a response
            Http h = new Http();
            HttpResponse res = h.send(req);




    //     String mimeBody = '';
   
    //     String nl = '\n';
   
    //     String boundary = '__ctrlq_dot_org__';   
   
    //     mimeBody += 'MIME-Version: 1.0\n';
   
    //     mimeBody += 'To:'+emailDetails.toAddress[0]+'\n';
   
    //     mimeBody += 'cc:'+emailDetails.ccAddress+'\n';
   
    //     mimeBody += 'Subject: Email_Testing \n';
   
    //     mimeBody += emailDetails.body+'\n';
   
    //     mimeBody += 'Content-Type: multipart/mixed; boundary='+boundary+'\n';
   
    //     mimeBody += '–'+boundary+'\n';
   
    //     mimeBody += 'Content-Type: text/html; charset=UTF-8\n';
   
    //     mimeBody += 'Content-Transfer-Encoding: base64\n';
   
    //     mimeBody += EncodingUtil.base64Encode(blob.valueOf('Testinggg'))+'\n\n';
   
    //     mimeBody += '–'+boundary+'\n';
   
    //     mimeBody += 'Content-Type: text/html; charset=UTF-8\n';
   
    //     mimeBody += 'Content-Transfer-Encoding: base64\n\n';
   
    //     mimeBody += EncodingUtil.base64Encode(blob.valueOf('Testinggg'))+'\n\n';
   
    //     mimeBody += '–'+boundary+'\n';

    //     mimeBody += 'Content-Disposition: attachment; filename="'+emailDetails.files[0]+'"\n';
   
    //     mimeBody += 'Content-Transfer-Encoding: base64\n\n';
   
   
        
   
    //     mimeBody += '–'+boundary+'–';
   
    //     Http http = new Http();
   
    //     HttpRequest req = new HttpRequest();  
   
    //    req.setEndpoint('callout:Gmail_API/upload/gmail/v1/users/vyovyom57ppsv2020@gmail.com/messages/send?uploadType=media');
   
   //(Gmail_API)API Name of Name credential
   
    //        req.setHeader('Authorization', 'Bearer ');
   
    //    req.setHeader('Content-Type', 'message/rfc822');
   
    //        req.setBody('{"raw":"'+ mimeBody +'"}');
   
    //        req.setMethod('POST');
   
    //        req.setTimeout(60 * 1000);
   
    //        system.debug('req——>>'+req);
   
    //     HttpResponse response = http.send(req);
   
    //        system.debug('response——>>'+response.getBody());
   
    //        System.debug(response);
   
    //     if (response.getStatusCode() != 201) {
   
    //            System.debug('The status code returned was not expected: ' +
   
    //                         response.getStatusCode() + ' ' + response.getStatus());  
   
    //     } else {
   
    //            System.debug(response.getBody());
   
    //     }  
   
        
   
   }
         catch (exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }



    Class EmailWrapper {
        public List<String> toAddress;
        public List<String> ccAddress;
        public String subject;
        public String body;
        public List<String> files;
    }
}
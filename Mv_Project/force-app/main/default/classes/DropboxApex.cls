public with sharing class DropboxApex {
    public DropboxApex() {
        String endPoint = 'https://api.dropboxapi.com/2/files/create_folder_v2';
        String accessToken = 'sl.BxzVT7Db-mROPtYMX97ZU1mfS2qAVeuwc0meteMoOQSAXGKUQ9Gr2B1X7RFrrCfqZcTYJ0sVSWL5jSgQktKYVaxdcfr9Q2Vz8sadoIjfsmcqFxnLj_Vak9qUxU_P_J8Q8dK6pE0W1xmM';
        String body ='{"path":"/NewFolder","autorename":false}';
        HttpRequest req = new HttpRequest();
        req.setEndPoint(endPoint);
        req.setHeader('Authorization','Bearer '+ accessToken);
        req.setHeader('Content-Type','application/json');
        req.setMethod('POST');
        req.setBody(body);
        Http http = new Http();
        HttpResponse res = new HttpResponse();
        res = http.send(req);
    }
}
String endPoint = 'https://api.dropboxapi.com/2/file_requests/create';
String accessToken = 'sl.BxzVT7Db-mROPtYMX97ZU1mfS2qAVeuwc0meteMoOQSAXGKUQ9Gr2B1X7RFrrCfqZcTYJ0sVSWL5jSgQktKYVaxdcfr9Q2Vz8sadoIjfsmcqFxnLj_Vak9qUxU_P_J8Q8dK6pE0W1xmM';
String body ='{"deadline":{"allow_late_uploads":"seven_days","deadline":"2020-10-12T17:00:00Z"},"destination":"/File Requests/NewFolder","open":true,"title":"Homework submission"}';
HttpRequest req = new HttpRequest();
req.setEndPoint(endPoint);
req.setHeader('Authorization','Bearer '+ accessToken);
req.setHeader('Content-Type','application/json');
req.setMethod('POST');
req.setBody(body);
Http http = new Http();
HttpResponse res = new HttpResponse();
res = http.send(req);

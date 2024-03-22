public with sharing class FileUploaderClass {
 
   @AuraEnabled
  public static String uploadFile(String base64, String filename, String recordId) {
        // ContentVersion cv = createContentVersion(base64, filename);
        System.debug('blob file'+base64);
        System.debug('file Name'+filename);
        System.debug('recordId'+recordId);


        String endPoint = 'https://api.dropboxapi.com/2/files/create_folder_v2';
        String accessToken = ''; //Paste the access token here
        String body ='{"path":"/'+recordId+'","autorename":false}';
        HttpRequest reqest = new HttpRequest();
        reqest.setEndPoint(endPoint);
        reqest.setHeader('Authorization','Bearer '+ accessToken);
        reqest.setHeader('Content-Type','application/json');
        reqest.setMethod('POST');
        reqest.setBody(body);
        Http https = new Http();
        HttpResponse res = new HttpResponse();
        res = https.send(reqest);

        
            HttpRequest req = new HttpRequest();
            req.setHeader('Content-Type','application/octet-stream');
            req.setMethod('POST');
            req.setEndpoint('callout:Dropbox/2/files/upload');
            req.setBodyAsBlob(EncodingUtil.base64Decode(base64));
            // string fileNamee=fileName;
            req.setHeader('Dropbox-API-Arg', createHeaderArgs(filename,recordId));
            req.setHeader('Authorization','Bearer '+accessToken);
            req.setTimeout(12000);
            Http http = new Http();
            HTTPResponse ress = http.send(req);
            // system.debug('Response:'+res.getBody());
            // return fileLocation(fileName);
       return getFiles(recordId);
  }


   @AuraEnabled
  public static String deleteItem(String filename, String recordId) {
        // ContentVersion cv = createContentVersion(base64, filename);
        // System.debug('blob file'+base64);
        System.debug('file Name'+filename);
        System.debug('recordId'+recordId);


        String endPoint = 'https://api.dropboxapi.com/2/files/delete';
        String accessToken = '';//Paste the access token here
        String body ='{"path": "' + '/'+recordId+'/'+filename+'" }';
        HttpRequest reqest = new HttpRequest();
        reqest.setEndPoint(endPoint);
        reqest.setHeader('Authorization','Bearer '+ accessToken);
        reqest.setHeader('Content-Type','application/json');
        reqest.setMethod('POST');
        reqest.setBody(body);
        Http https = new Http();
        HttpResponse res = new HttpResponse();
        res = https.send(reqest);
        System.debug(res);

       return getFiles(recordId);
  }
   @AuraEnabled
  public static String downloadItem(String filename, String recordId) {
        // ContentVersion cv = createContentVersion(base64, filename);
        // System.debug('blob file'+base64);
        System.debug('file Name'+filename);
        System.debug('recordId'+recordId);


        String endPoint = 'https://content.dropboxapi.com/2/files/download';
        String accessToken = '';//Paste the access token here
        String body ='{"path": "' + '/'+recordId+'/'+filename+'" }';
        HttpRequest reqest = new HttpRequest();
        reqest.setEndPoint(endPoint);
        reqest.setHeader('Authorization','Bearer '+ accessToken);
        reqest.setHeader('Content-Type','application/octet-stream');
        reqest.setHeader('Dropbox-API-Arg', body);
        //reqest.setHeader('Content-Type','application/json');
        reqest.setMethod('POST');
        //reqest.setBody(body);
        Http https = new Http();
        HttpResponse res = new HttpResponse();
        res = https.send(reqest);
        System.debug(res.getBody());

       return uploadFiled(res.getBody(),filename,recordId);
  }
@AuraEnabled
public static String getFiles(String recordId) {
    String accessToken = '';//Paste the access token here
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.dropboxapi.com/2/files/list_folder');
        request.setMethod('POST'); 
        
       
        request.setHeader('Authorization', 'Bearer ' + accessToken);
        request.setHeader('Content-Type', 'application/json');

        String requestBody = '{"path": "' + '/'+recordId + '"}';
        request.setBody(requestBody);

        try {
            HttpResponse response = http.send(request);
            System.debug(response.getBody());
           // System.debug(response.getFiles());
            return response.getBody();
        } catch (Exception e) {
            System.debug('Error sending request: ' + e.getMessage());
            return null;
        }
    }

  public class Header
  {
      public string path{get;set;}
      public string mode{get;set;}
      public boolean autorename{get;set;}
      public boolean mute{get;set;}
      public boolean strict_conflict{get;set;}
  }


  private static string createHeaderArgs(string file,string recordId)
  {
      Header header=new Header();
      header.path=fileLocation(file,recordId);
      header.mode='add';
      header.autorename=true;
      header.mute=false;
     header.strict_conflict=false;
      return JSON.serialize(header);
  
  }
 

   private static string fileLocation(string file,string recordId)
   {
       return '/'+recordId+'/'+file;  // Change Folder based on your requirement
   }
   @AuraEnabled
  public static String uploadFiled(String base64, String filename, String recordId) {
        ContentVersion cv = createContentVersion(base64, filename);
        ContentDocumentLink cdl = createContentLink(cv.Id, recordId);
        if (cv == null || cdl == null) { return null; }
        return cdl.Id;
  }
  private static ContentVersion createContentVersion(String base64, String filename) {
    ContentVersion cv = new ContentVersion();
    cv.VersionData = EncodingUtil.base64Decode(base64);
    cv.Title = filename;
    cv.PathOnClient = filename;
    try {
      insert cv;
      return cv;
    } catch(DMLException e) {
      System.debug(e);
      return null;
    }
  }
  private static ContentDocumentLink createContentLink(String contentVersionId, String recordId) {
    if (contentVersionId == null || recordId == null) { return null; }
    ContentDocumentLink cdl = new ContentDocumentLink();
    cdl.ContentDocumentId = [
    SELECT ContentDocumentId 
    FROM ContentVersion 
    WHERE Id =: contentVersionId
    ].ContentDocumentId;
    cdl.LinkedEntityId = recordId;
    // ShareType is either 'V', 'C', or 'I'
    // V = Viewer, C = Collaborator, I = Inferred
    cdl.ShareType = 'V';
    try {
    insert cdl;
    return cdl;
    }    catch(DMLException e) {
    System.debug(e);
    return null;
}
}

}
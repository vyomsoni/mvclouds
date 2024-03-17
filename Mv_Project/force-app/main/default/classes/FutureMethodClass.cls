public class FutureMethodClass {

    public Id opportunityId { get; set; }
    static Pattern anchors = Pattern.compile('<a.+<\\/a>');
    
    public FutureMethodClass(){
        
    }
    
    public FutureMethodClass(ApexPages.StandardController stdController) {
        this.opportunityId = stdController.getId();
    }

    public void addRandomImageAttachment() {
        addRandomImageAttachmentAsync(opportunityId);
    }

    @future(callout=true)
    public static void addRandomImageAttachmentAsync(Id opportunityId) {
        String imageUrl = makeWebServiceCallout();      
        Attachment attachment = createAttachment(opportunityId, imageUrl);       
        insert attachment;
    }

    private static String makeWebServiceCallout() {
   
        return 'https://source.unsplash.com/random';
    }

    private static Attachment createAttachment(Id opportunityId, String imageUrl) {
        Blob imageContent = makeHttpGet(imageUrl);

        Attachment attachment = new Attachment();
        attachment.ParentId = opportunityId;
        attachment.Name = 'RandomImage.jpg';
        attachment.Body = imageContent;
        attachment.ContentType = 'image/jpeg';
        return attachment;
    }

   public static Blob makeHttpGet(String url) {
    try {
        
        HttpRequest request = new HttpRequest();
        request.setEndpoint(url);
        request.setMethod('GET');
        HttpResponse response = new Http().send(request);
        Matcher m = anchors.matcher(response.getBody());
        List<String> links = new List<String>();
        while (m.find()) links.add(m.group());
        String Imagelink =String.join(links, '\n');
        List<String> str = Imagelink.split('"');
        String linkss = str[1];
        System.debug(linkss);
        HttpRequest req = new HttpRequest();
        req.setEndpoint(linkss);
        req.setMethod('GET');
        HttpResponse res = new Http().send(req);
        
        System.debug(Imagelink);
         
        System.debug(res.getBody());
        System.debug('response'+response);

        if (res.getStatusCode() == 200) {
            System.debug(response.getBody());
            return  res.getBodyAsBlob();
            
        } else {
            return Blob.valueOf('Placeholder image content');
        }
    } catch (Exception e) {
        return Blob.valueOf('Placeholder image content');
    }
    }
}
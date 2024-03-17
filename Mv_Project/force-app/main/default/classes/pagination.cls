public class pagination {
    public Apexpages.StandardSetController controller {get;set;}
    public List<Contact> getOpty(){
        List<Contact> optyList = (List<Contact>)controller.getRecords();
        return optyList;
    }
    public pagination(){
        List<Contact> optyList = [select Name,Phone,Email from Contact];
        controller = new Apexpages.StandardSetController(optyList);
        controller.setPageSize(10);
    }
}
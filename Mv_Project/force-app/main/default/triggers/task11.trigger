trigger task11 on Contact (after insert) {
    List<Event> nev = new  List<Event>();
     for(Contact con:Trigger.new){
        nev.add(new Event(Subject='Create contact event',WhoId=con.Id,StartDateTime=System.today(),EndDateTime=System.today().addDays(10),Description='this event finish after 10 day of created date'));
     }
     insert nev;
}
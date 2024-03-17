trigger task10 on Account (After insert) {
     List<Contact> con = new List<Contact>();
     // List<String> str = new List<String>();
     for(Account acc:Trigger.new){
          con.add(new Contact(Title='Created by account',AccountId=acc.Id,LastName=acc.Name,Email='vyom57ppsv2020@gmail.com'));
     }
     
     insert con;
}
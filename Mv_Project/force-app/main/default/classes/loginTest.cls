@isTest
public class loginTest {
  @isTest
    static void task(){
         String firstName = 'vyomm';
  		   String lastName = 'Soni';
   		  String email = 'vyom57ppsv2020@gmail.com';
    	  String phone = '9328713928';
          String password = '9328713928';
         RegistrationPageClass pag = new RegistrationPageClass();
        pag.saveTheRecord( firstName, lastName, email, phone, password);
        
        LoginClass.myMethod(email,password);
        LoginClass ls = new LoginClass();
        ls.redirect();
        ls.redirectReg();
        
    }
}
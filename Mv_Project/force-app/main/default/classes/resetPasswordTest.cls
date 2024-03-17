@isTest
public class resetPasswordTest {
  @isTest
    static void task(){
        String firstName = 'vyomm';
  		   String lastName = 'Soni';
   		  String email = 'vyom57ppsv2020@gmail.com';
    	  String phone = '9328713928';
          String password = '9328713928';
        
        RegistrationPageClass pag = new RegistrationPageClass();
        pag.saveTheRecord( firstName, lastName, email, phone, password);
        resetPasswordClass.myMethod(email, '123456789', '123456789');
        resetPasswordClass cla = new resetPasswordClass();
        cla.redirect();
      String newEmail =  resetPasswordClass.NameEmail;
       String loginPassword = resetPasswordClass.loginPassword;
      String resetPassword = resetPasswordClass.reloginPassword;
    }
}
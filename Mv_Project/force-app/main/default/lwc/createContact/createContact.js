import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import conObject from '@salesforce/schema/Contact';
import conFirstName from '@salesforce/schema/Contact.FirstName';
import conLastName from '@salesforce/schema/Contact.LastName';
import conBday from '@salesforce/schema/Contact.Birthdate';
import conEmail from '@salesforce/schema/Contact.Email';
import conDepartment from '@salesforce/schema/Contact.Department';
import conPhone from '@salesforce/schema/Contact.Phone'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class CreateContact extends LightningElement {

    firstName="";
    lastName="";
    emailId= "";
    phone="";
    bday = "";
    dept ="";
    contactChange(event) {
        console.log(event.target.label);
        console.log(event.target.value);
        if(event.target.label=='First Name'){
            this.firstName = event.target.value;
        }
        if(event.target.label=='Last Name'){
            this.lastName = event.target.value;
        }
        if(event.target.label=='Birth Date'){
            this.bday = event.target.value;
        }
        if(event.target.label=='Email'){
            this.emailId = event.target.value;
        }
        if(event.target.label=='Department'){
            this.dept = event.target.value;
        }
    }
    insertContact(){
        console.log(this.selectedAccountId);
        const fields = {};
        fields[conFirstName.fieldApiName] = this.firstName;
        fields[conLastName.fieldApiName] = this.lastName;
        fields[conBday.fieldApiName] = this.bday;
        fields[conEmail.fieldApiName] = this.emailId;
        fields[conDepartment.fieldApiName] = this.dept;
        fields[conPhone.fieldApiName] = this.phone;
        
        const recordInput = { apiName: conObject.objectApiName, fields };
        createRecord(recordInput)
            .then(contactobj=> {
                this.contactId = contactobj.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact record has been created',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}
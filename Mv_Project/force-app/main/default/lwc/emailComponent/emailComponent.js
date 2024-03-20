import { LightningElement, track ,api} from "lwc";
import sendEmailController from "@salesforce/apex/EmailClass.sendEmailController";

export default class emailComponent extends LightningElement {
    toAddress = [];
    ccAddress = [];
    subject = "";
    body = "";
    @track files = [];
    uploadResult = "";
    uploadedName = "";
    @api getValueFromLeads;
    @api getValueFromAccounts;
    @api getValueFromContacts;
    @track filesUploaded = [];
    get acceptedFormats() {

        return [
            '.jpeg', 
            '.png',
            '.pdf',
            '.mkv'
        ];

    }
    wantToUploadFile = false;
    noEmailError = false;
    invalidEmails = false;
    //  connectedCallback(){
    //     let combine = [];
    //     combine = [...combine,...this.getValueFromLeads,...this.getValueFromContacts,...this.getValueFromAccounts];
    //     console.log(this.getValueFromLeads);
    //     console.log(this.getValueFromAccounts);
    //     console.log(this.getValueFromContacts);
    //     console.log(JSON.stringify(combine));
    //  }

    removeEmail(e){
        console.log(e);
    }

    toggleFileUpload() {
        this.wantToUploadFile = !this.wantToUploadFile;
    }

    handleUploadFinished(event) {
        
        const uploadedFiles = event.detail.files;
        this.files = [...this.files, ...uploadedFiles];
        this.wantToUploadFile = false;
        console.log(this.files[0]);
        
        var reader = new FileReader();
        reader.onloadend = () => {
            var base64 = reader.result.split(',')[1];
            this.uploadResult = base64;
            this.uploadedName = this.files[0].name;
        }
        reader.readAsDataURL(this.files[0])
       
        const selectedEvent = new CustomEvent("filevaluechange", {
            detail: this.uploadedName,
           
          });
      
          // Dispatches the event.
          this.dispatchEvent(selectedEvent);
    }

    handleRemove(event) {
        const index = event.target.dataset.index;
        this.files.splice(index, 1);
    }
    RemoveLead(event) {
        const index = event.target.dataset.index;
        console.log(index);
       // this.getValueFromLeads.splice(index, 1);
    }
    RemoveAccount(event) {
        const index = event.target.dataset.index;
        console.log(index);
       // this.getValueFromAccounts.splice(index, 1);
    }
    RemoveContact(event) {
        const index = event.target.dataset.index;
        console.log(index);
       // this.getValueFromContacts.splice(index, 1);
    }

    handleToAddressChange(event) {
        this.toAddress = event.detail.selectedValues;
    }

    handleCcAddressChange(event) {
        this.ccAddress = event.detail.selectedValues;
    }

    handleSubjectChange(event) {
        this.subject = event.target.value;
  
        const selectedEvent = new CustomEvent("subjectvaluechange", {
            detail: this.subject,
        
          });
      
          // Dispatches the event.
          this.dispatchEvent(selectedEvent);
    }

    handleBodyChange(event) {
        this.body = event.target.value;
        const selectedEvent = new CustomEvent("progressvaluechange", {
            detail: this.body,

          });
      
          // Dispatches the event.
          this.dispatchEvent(selectedEvent);
    }

    validateEmails(emailAddressList) {
        let areEmailsValid;
        if(emailAddressList.length > 1) {
            areEmailsValid = emailAddressList.reduce((accumulator, next) => {
                const isValid = this.validateEmail(next);
                return accumulator && isValid;
            });
        }
        else if(emailAddressList.length > 0) {
            areEmailsValid = this.validateEmail(emailAddressList[0]);
        }
        return areEmailsValid;
    }

    validateEmail(email) {
        console.log("In VE");
        const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()s[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log("res", res);
        return res.test(String(email).toLowerCase());
    }

    handleReset() {
        console.log(JSON.stringify(this.getValueFromParent));
        this.toAddress = [];
        this.ccAddress = [];
        this.subject = "";
        this.body = "";
        this.files = [];
        this.template.querySelectorAll("c-email-input").forEach((input) => input.reset());
    }

    handleSendEmail() {
        this.noEmailError = false;
        this.invalidEmails = false;
        let combine = [];
        let combineEmail = [];
        combine = [...combine,...this.getValueFromLeads,...this.getValueFromContacts,...this.getValueFromAccounts];
        console.log(JSON.stringify(combine));
        for(let i=0;i<combine.length;i++){
            if(combine[i].Email != undefined){
                combineEmail.push(combine[i].Email);
            }
            if(combine[i].Email__c != undefined){
                combineEmail.push(combine[i].Email__c);
            }
            
        }
        combineEmail = [...combineEmail,...this.toAddress];
        console.log('newEmails'+combineEmail);
     
        // if (![...this.toAddress, ...this.ccAddress].length > 0) {
        //     this.noEmailError = true;
        //     return;
        // }
        
        // if (!this.validateEmails([...this.toAddress, ...this.ccAddress])) {
        //     this.invalidEmails = true;
        //     return;
        // }

        // let emailDetails = {
        //     toAddress: this.toAddress,
        //     ccAddress: this.ccAddress,
        //     subject: this.subject,
        //     body: this.body,
        //    files:this.files[0]
        // };
        console.log("Hi");
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     const attachmentData = reader.result.split(',')[1];
        //     sendEmailController({
        //         toAddress: this.toAddress.join(','),
        //         ccAddress: this.ccAddress.join(','),
        //         subject: this.subject,
        //         body: this.body,
        //         files: attachmentData
        //     })
        //         .then(() => {
        //             console.log('Email Sent');
        //         })
        //         .catch((error) => {
        //             console.error('Error in sendEmailController:', error);
        //         });
        // };
        // var reader = new FileReader()
        // reader.onload = () => {
        //     var base64 = reader.result.split(',')[1]
        //    this.uploadResult = base64;
        //     console.log(base64);
        // }
        // reader.readAsDataURL(file)
        sendEmailController({
            Address: combineEmail,
            ccAddress: this.ccAddress.join(','),
            subject: this.subject,
            body: this.body,
            file: this.uploadResult,
            filename : this.uploadedName
        })
            .then(() => {
                console.log('Email Sent');
            })
            .catch((error) => {
                console.error('Error in sendEmailController:', error);
            });

        // if (this.files.length > 0) {
        //     reader.readAsDataURL(this.files[0]);
        // } else {
        //     console.log("no");
        //     // Handle case where no file is selected
        // }
        console.log("end");
    }
}
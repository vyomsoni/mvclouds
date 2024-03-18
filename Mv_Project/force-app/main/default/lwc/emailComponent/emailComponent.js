import { LightningElement, track } from "lwc";
import sendEmailController from "@salesforce/apex/EmailClass.sendEmailController";

export default class emailComponent extends LightningElement {
    toAddress = [];
    ccAddress = [];
    subject = "";
    body = "";
    @track files = [];
    uploadResult = "";
    uploadedName = "";
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
    }

    handleRemove(event) {
        const index = event.target.dataset.index;
        this.files.splice(index, 1);
    }

    handleToAddressChange(event) {
        this.toAddress = event.detail.selectedValues;
    }

    handleCcAddressChange(event) {
        this.ccAddress = event.detail.selectedValues;
    }

    handleSubjectChange(event) {
        this.subject = event.target.value;
    }

    handleBodyChange(event) {
        this.body = event.target.value;
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
        if (![...this.toAddress, ...this.ccAddress].length > 0) {
            this.noEmailError = true;
            return;
        }
        
        if (!this.validateEmails([...this.toAddress, ...this.ccAddress])) {
            this.invalidEmails = true;
            return;
        }

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
            toAddress: this.toAddress.join(','),
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
import { LightningElement, track ,api} from 'lwc';
import getContacts from "@salesforce/apex/task5LwcApex.getContacts";
import getAccounts from "@salesforce/apex/task5LwcApex.getAccounts";
import getLeads from "@salesforce/apex/task5LwcApex.getLeads";
import sendEmailController from "@salesforce/apex/EmailClass.sendEmailController";



export default class task5LwcCmp extends LightningElement {

    @track selectedStep ='account';
    value="";
    @track displayAccount = true;
    @track displayopp = false;
    @track displaycon = false;
    @track leadData = false;
    @track accData = false;
    @track conData = false;
    @track leadList = [];
    @track accList = [];
    @track conList = [];
    @track newleadList = [];
    @track newaccList = [];
    @track newconList = [];
    @track selectedAccount =[];
    @track selectedContacts =[];
    @track selectedLeads =[];
    @track EmailAccount =[];
    @track EmailContacts =[];
    @track EmailLeads =[];
    @track body="";
    @track subject ="";
    @track fileName ="";
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
    showNext= true;
    showFinish = false;
    showEnd = false;
    combinedList = [];
    combinedList=this.newleadList.concat(this.newaccList, this.newconList);

    
   

    connectedCallback(){
        getContacts()
        .then((result) => {
            if (result != null) {
               // console.log('RESULT--> ' + JSON.stringify(result));
                this.conList = result;
                
            }
        })
        .catch((error) => {
            console.log('error while fetch contacts--> ' + JSON.stringify(error));
        });
        getAccounts()
         .then((result) => {
             if (result != null) {
                // console.log('RESULT--> ' + JSON.stringify(result));
                 this.accList = result;
                 
             }
         })
         .catch((error) => {
             console.log('error while fetch contacts--> ' + JSON.stringify(error));
         });
         getLeads()
         .then((result) => {
             if (result != null) {
                // console.log('RESULT--> ' + JSON.stringify(result));
                 this.leadList = result;
                 
             }
         })
         .catch((error) => {
             console.log('error while fetch contacts--> ' + JSON.stringify(error));
         });
   
        this.optionsDrop = [{
            label: 'Leads',
            value: 'Leads',
            
        },
        {
            label: 'Account',
            value: 'Account',
    
        }, {
            label: 'Contact',
            value: 'Contact',
       
        },
      
    ];
    this.contactColumns = [{
        label: 'First Name',
        fieldName: 'FirstName',
        
    },
    {
        label: 'Last Name',
        fieldName: 'LastName',
   
    }, {
        label: 'Phone',
        fieldName: 'Phone',
   
    }, {
        label: 'Email',
        fieldName: 'Email',
   
    },
  
];
this.accountColumns = [{
    label: 'Name',
    fieldName: 'Name',
    
},
{
    label: 'Account Number',
    fieldName: 'AccountNumber',

}, {
    label: 'Phone',
    fieldName: 'Phone',

},
{
    label: 'Email',
    fieldName : 'Email__c',
},
];
this.leadColumns = [{
    label: 'First Name',
    fieldName: 'FirstName',
    
},
{
    label: 'Last Name',
    fieldName: 'LastName',

}, {
    label: 'Phone',
    fieldName: 'Phone',

},  {
    label: 'Email',
    fieldName: 'Email',

}, 

];

    }

  

    handleRowAction(event){
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch(actionName){
      
                
        }
    }


    handleSelectAction(event){
        this.selectedLeads = [];
        this.newleadList=[];
        const selectedRow = event.detail.selectedRows;
      //  this.newleadList = event.detail.selectedRows;
        for( let j=0;j<selectedRow.length;j++){
            if(selectedRow[j].Email != undefined){
                this.newleadList.push(selectedRow[j]);
            }
        }
      //  console.log(selectedRow);
        for( let i=0;i<selectedRow.length;i++){
            if(selectedRow[i].Email != undefined){
        //        console.log(selectedRow[i].Email);
                this.EmailLeads.push(selectedRow[i].Email);
            }
           
           
        }
        for( let i=0;i<selectedRow.length;i++){
            if(selectedRow[i].Id != undefined){
        //        console.log(selectedRow[i].Email);
                this.selectedLeads.push(selectedRow[i].Id);
            }
           
           
        }
       
 
        console.log(JSON.stringify(this.selectedAccount));
        console.log(JSON.stringify(this.selectedContacts));
        console.log(this.combinedList);
        console.log(JSON.stringify(this.selectedLeads));
    }


    handleSelectAction1(event){
        this.selectedAccount = [];
        this.newaccList=[];
        const selectedRow = event.detail.selectedRows;
        //this.newaccList = event.detail.selectedRows;

        for( let j=0;j<selectedRow.length;j++){
            if(selectedRow[j].Email__c != undefined){
                this.newaccList.push(selectedRow[j]);
            }
        }
      //  console.log(selectedRow);
        for( let i=0;i<selectedRow.length;i++){
            if(selectedRow[i].Email__c != undefined){
        //        console.log(selectedRow[i].Email);
                this.EmailAccount.push(selectedRow[i].Email__c);
            }
           
           
        }
        for( let i=0;i<selectedRow.length;i++){
            if(selectedRow[i].Id != undefined){
        //        console.log(selectedRow[i].Email);
                this.selectedAccount.push(selectedRow[i].Id);
            }
           
           
        }
      
       
        console.log(JSON.stringify(this.selectedAccount));
        console.log(JSON.stringify(this.selectedContacts));
        
        console.log(JSON.stringify(this.selectedLeads));
    }
    handleSelectAction2(event){
        this.selectedContacts = [];
        this.newconList = [];
        const selectedRow = event.detail.selectedRows;
        //this.newconList = event.detail.selectedRows;
        for( let j=0;j<selectedRow.length;j++){
            if(selectedRow[j].Email != undefined){
                this.newconList.push(selectedRow[j]);
            }
        }
      //  console.log(selectedRow);
        for( let i=0;i<selectedRow.length;i++){
            if(selectedRow[i].Email != undefined){
        //        console.log(selectedRow[i].Email);
                this.EmailContacts.push(selectedRow[i].Email);
            }
           
           
        }
     
        for( let i=0;i<selectedRow.length;i++){
            if(selectedRow[i].Id != undefined){
        //        console.log(selectedRow[i].Email);
                this.selectedContacts.push(selectedRow[i].Id);
            }
           
           
        }
     
   
        console.log(JSON.stringify(this.selectedAccount));
        console.log(JSON.stringify(this.selectedContacts));
        
        console.log(JSON.stringify(this.selectedLeads));
    }
    Selected(record) {
        return this.selectedRows.some(row => row.id === record.id);
    }

    handleCombobox(event){
        console.log(event.detail.value);
        if(event.detail.value == 'Leads'){
            this.value='Leads';
            this.leadData  = true;
            this.accData = false;
            this.conData = false;
        }
        if(event.detail.value == 'Account'){
            this.value='Account';
            this.leadData  = false;
            this.accData = true;
            this.conData = false;
        }
        if(event.detail.value == 'Contact'){
            this.value='Contact';
            this.leadData  = false;
            this.accData = false;
            this.conData = true;
        }
    }

    nextStep(){

    var moveToNextStep = this.selectedStep;

    if(this.selectedStep == 'contact'){

        alert('Next step is STEP-3');

        this.selectedStep = 'opportunity';
        this.displayopp = true;
        this.displaycon = false;
        this.showNext = false;
        this.showFinish = true;
        
    }

    else if(this.selectedStep == 'account'){

        alert('Next step is STEP-2');

        this.selectedStep = 'contact';
        this.displaycon = true;
        this.displayAccount = false;
        this.showNext = true;
        this.showFinish = false;

    }

    }

    previousStep(){

        var moveToPreviousStep = this.selectedStep;

        if(this.selectedStep == 'contact'){

            alert('Previous step is STEP-1');

            this.selectedStep = 'account';
            this.displayAccount= true;
            this.displaycon = false;
            this.showNext = true;
        this.showFinish = false;

        }

        else if(this.selectedStep == 'opportunity'){

            alert('Previous step is STEP-3');

            this.selectedStep = 'contact';
            this.displaycon = true;
            this.displayopp = false;
            this.showNext = true;
        this.showFinish = false;

        }

    }

     selectStepAccount(){

        alert('Selected step is STEP-1');

        this.selectedStep = 'account';
        this.displayAccount = true;
        this.displayopp = false;
        this.displaycon = false;
        this.showNext = true;
        this.showFinish = false;

    }

     selectStepContact(){

        alert('Selected step is STEP-2');

        this.selectedStep = 'contact';
        this.displaycon = true;
        this.displayAccount = false;
        this.displayopp = false;
        this.showNext = true;
        this.showFinish = false;

    }

     selectStepOpportunity(){

        alert('Selected step is STEP-3');
        this.showNext = false;
        this.showFinish = true;
        this.displayopp = true;
        this.displaycon= false;
        this.displayAccount = false;
        this.selectedStep = 'opportunity';

    }






    // Email component js





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

    restart(){
        location.reload();
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
        combine = [...combine,...this.newleadList,...this.newaccList,...this.newconList];
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
               
                this.displayopp = false;
                this.showFinish = false;
                this.showEnd = true;
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
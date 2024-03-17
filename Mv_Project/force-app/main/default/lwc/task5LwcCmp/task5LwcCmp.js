import { LightningElement, track } from 'lwc';
import getContacts from "@salesforce/apex/task5LwcApex.getContacts"
import getAccounts from "@salesforce/apex/task5LwcApex.getAccounts"
import getLeads from "@salesforce/apex/task5LwcApex.getLeads"



export default class task5LwcCmp extends LightningElement {

    @track selectedStep ='account';
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
        const selectedRow = event.detail.selectedRows;
        this.newleadList = event.detail.selectedRows;;
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
        
        console.log(JSON.stringify(this.selectedLeads));
    }


    handleSelectAction1(event){
        this.selectedAccount = [];
        const selectedRow = event.detail.selectedRows;
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
        const selectedRow = event.detail.selectedRows;
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
            this.leadData  = true;
            this.accData = false;
            this.conData = false;
        }
        if(event.detail.value == 'Account'){
            this.leadData  = false;
            this.accData = true;
            this.conData = false;
        }
        if(event.detail.value == 'Contact'){
            this.leadData  = false;
            this.accData = false;
            this.conData = true;
        }
    }

    nextStep(){

    var moveToNextStep = this.selectedStep;

    if(this.selectedStep == 'contact'){

        alert('Next step is opportunity');

        this.selectedStep = 'opportunity';
        this.displayopp = true;
        this.displaycon = false;
        
    }

    else if(this.selectedStep == 'account'){

        alert('Next step is contact');

        this.selectedStep = 'contact';
        this.displaycon = true;
        this.displayAccount = false;

    }

    }

    previousStep(){

        var moveToPreviousStep = this.selectedStep;

        if(this.selectedStep == 'contact'){

            alert('Previous step is account');

            this.selectedStep = 'account';
            this.displayAccount= true;
            this.displaycon = false;

        }

        else if(this.selectedStep == 'opportunity'){

            alert('Previous step is contact');

            this.selectedStep = 'contact';
            this.displaycon = true;
            this.displayopp = false;

        }

    }

     selectStepAccount(){

        alert('Selected step is account');

        this.selectedStep = 'account';
        this.displayAccount = true;
        this.displayopp = false;
        this.displaycon = false;

    }

     selectStepContact(){

        alert('Selected step is contact');

        this.selectedStep = 'contact';
        this.displaycon = true;
        this.displayAccount = false;
        this.displayopp = false;

    }

     selectStepOpportunity(){

        alert('Selected step is opportunity');
        this.displayopp = true;
        this.displaycon= false;
        this.displayAccount = false;
        this.selectedStep = 'opportunity';

    }




}
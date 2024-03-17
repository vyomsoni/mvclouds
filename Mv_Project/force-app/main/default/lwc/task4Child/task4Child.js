import { MessageContext,subscribe,unsubscribe } from 'lightning/messageService';
import { LightningElement,wire } from 'lwc';
import passChannel from '@salesforce/messageChannel/passChannel__c';
import getContacts from "@salesforce/apex/task4LwcApex.getContacts"
import getOpp from "@salesforce/apex/task4LwcApex.getOpp"
import { refreshApex } from '@salesforce/apex';
export default class Task4Child extends LightningElement {
    
    recordId="";
    
    subscription=null;
    contactsList=[];
    oppList=[];
    
    @wire (MessageContext) messageContext;
    connectedCallback(){
         this.handleSubscribe();
         getContacts()
         .then((result) => {
             if (result != null) {
                // console.log('RESULT--> ' + JSON.stringify(result));
                 this.contactsList = result;
                 
             }
         })
         .catch((error) => {
             console.log('error while fetch contacts--> ' + JSON.stringify(error));
         });
         getOpp()
         .then((result) => {
             if (result != null) {
                // console.log('RESULT--> ' + JSON.stringify(result));
                 this.oppList = result;
                 
             }
         })
         .catch((error) => {
             console.log('error while fetch contacts--> ' + JSON.stringify(error));
         });

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
    this.oppColumns = [{
        label: 'Name',
        fieldName: 'Name',
        
    },
    {
        label: 'Stage',
        fieldName: 'StageName',

    }, {
        label: 'Close Date',
        fieldName: 'CloseDate',
   
    },
  
];
    }

   
    disconnectedCallback(){
        this.handleUnsubscribe();
    }

    handleSubscribe(){
        if(!this.subscription){
            this.subscription =subscribe(this.messageContext,passChannel,(parameter)=>{
                this.recordId = parameter.recordId;
                getContacts({recordId:this.recordId})
                .then((result) => {
                    if (result != null) {
                       // console.log('RESULT--> ' + JSON.stringify(result));
                        this.contactsList = result;
                        
                    }
                })
                .catch((error) => {
                    console.log('error while fetch contacts--> ' + JSON.stringify(error));
                });
                getOpp({recordId:this.recordId})
                .then((result) => {
                    if (result != null) {
                       // console.log('RESULT--> ' + JSON.stringify(result));
                        this.oppList = result;
                        
                    }
                })
                .catch((error) => {
                    console.log('error while fetch contacts--> ' + JSON.stringify(error));
                });
            });

        }
    }

    handleUnsubscribe(){
        unsubscribe(this.subscription);
            this.subscription = null;
    
    }

}
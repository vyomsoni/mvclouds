import { LightningElement,track,api } from 'lwc';
import getAccountData from '@salesforce/apex/vlog_AccountSearch.getAccountData';
import getContactData from '@salesforce/apex/vlog_AccountSearch.getContactData';
import getOpportunityData from '@salesforce/apex/vlog_AccountSearch.getOpportunityData';
export default class Task6LwcCmp extends LightningElement {
    value = '';
    @track accounts;
    @track contacts;
    @track opportunities;
    showAccount=false;
    showContact=false;
    showOpportunity=false;
    get options() {
        return [
            { label: 'Account', value: 'Account' },
            { label: 'Contact', value: 'Contact' },
            { label: 'Opportunity', value: 'Opportunity' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }

    handleValueChange(event){
        let values = event.detail;
        if(values.includes("Account")){
            this.showAccount = true;
        }else{
            this.showAccount = false;
        }
        if(values.includes("Contact")){
            this.showContact = true;
        }else{
            this.showContact = false;
        }
        if(values.includes("Opportunity")){
            this.showOpportunity = true;
        }else{
            this.showOpportunity = false;
        }
        // console.log(this.showAccount);
        // console.log(this.showContact);
        // console.log(this.showOpportunity);
    }


    // Search bar js



    //This Funcation will get the value from Text Input.
    handelSearchKey(event){
        this.searchKey = event.target.value;
    }

    //This funcation will fetch the Account Name on basis of searchkey
    SearchAccountHandler(){
        //call Apex method.
        getAccountData({textkey: this.searchKey})
        .then(result => {
                this.accounts = result;
        })
        .catch( error=>{
            this.accounts = null;
        });

        getContactData({textkey: this.searchKey})
        .then(result => {
                this.contacts = result;
        })
        .catch( error=>{
            this.contacts = null;
        });

        getOpportunityData({textkey: this.searchKey})
        .then(result => {
                this.opportunities = result;
        })
        .catch( error=>{
            this.opportunities = null;
        });

    }
    cols = [
        {label:'Account Name', fieldName:'Name' , type:'text'} ,
        {label:'Phone', fieldName:'Phone' , type:'Phone'} ,
        {label:'Industry', fieldName:'Industry' , type:'text'}
              
    ];
    colContact = [
        {
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
    conOpportuntiy = [
        {
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
    ]

    
}
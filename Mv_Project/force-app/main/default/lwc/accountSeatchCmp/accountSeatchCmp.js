import { LightningElement,track,wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountService.getAccounts';
import { MessageContext ,publish} from 'lightning/messageService';
import passChannel from '@salesforce/messageChannel/passChannel__c';
export default class accountSeatchCmp extends LightningElement {
    value = "";
   
    @wire (MessageContext) messageContext;
    @track options=[];
    @track newoptions =[];
	@track error;
	connectedCallback(){
		console.log("hi");
		getAccounts()
		.then(result => {
			this.options = result;
			this.error = undefined;
            console.log(result);
		})
		.catch(error => {
			this.error = error;
			this.options = undefined;
		})
        console.log(this.options);

	} 


    handleChange(event) {
       // this.value = event.detail.value;
        console.log(event.detail.recordId);
		let payload ={recordId:event.detail.recordId};
		publish(this.messageContext,passChannel,payload);
    }
  }
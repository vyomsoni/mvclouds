import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import uploadFile from '@salesforce/apex/FileUploaderClass.uploadFile'
import getFiles from '@salesforce/apex/FileUploaderClass.getFiles'
import deleteItem from '@salesforce/apex/FileUploaderClass.deleteItem'
import downloadItem from '@salesforce/apex/FileUploaderClass.downloadItem'

export default class Dropbox extends LightningElement {
    @api recordId;
    fileData;
    @api receiveData = [];
    name= '';
    openfileUpload(event) {
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log(this.fileData)
        }
        reader.readAsDataURL(file)
    }

    connectedCallback(){
        let recordId = this.recordId;
        getFiles({  recordId }).then(result=>{
            let newData = JSON.parse(result);
             this.receiveData = newData.entries;
            console.log(JSON.stringify(this.receiveData));
        });
    }
    
    handleClick(){
        const {base64, filename, recordId} = this.fileData
        uploadFile({ base64, filename, recordId }).then(result=>{
            this.fileData = null
            let title = `${filename} uploaded successfully!!`
            this.toast(title)
            let newData = JSON.parse(result);
            this.receiveData = newData.entries;
           console.log(JSON.stringify(this.receiveData));
        })
    }

    onreceive(event){
      console.log(event.target.value);
      console.log(event.target.dataset.id);
      this.name = event.target.dataset.id;
      let filename = this.name;
      let recordId = this.recordId;
      deleteItem({filename,recordId}).then(result=>{
        // this.fileData = null
            let title = `${filename} Deleted successfully!!`
            this.toast(title)
        let newData = JSON.parse(result);
         this.receiveData = newData.entries;
        console.log(JSON.stringify(this.receiveData));
    });;
    }

    onDownload(event){
      console.log(event.target.value);
      console.log(event.target.dataset.id);
      this.name = event.target.dataset.id;
      let filename = this.name;
      let recordId = this.recordId;
      downloadItem({filename,recordId}).then(result=>{
        // this.fileData = null
           
            this.toast(title)
            let title = `${filename} Download successfully!!`
    //         let downloadLink = document.createElement("a");
    //         downloadLink.href = result;
    //         downloadLink.download = filename;
    //         downloadLink.click();
    });;
    }

    toast(title){
        const toastEvent = new ShowToastEvent({
            title, 
            variant:"success"
        })
        this.dispatchEvent(toastEvent)
    }
}
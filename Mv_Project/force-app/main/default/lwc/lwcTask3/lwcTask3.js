import { LightningElement,api } from 'lwc';

export default class LwcTask3 extends LightningElement {
    @api recordId;
    fileName;
    strContentDocId;
    contacts=[];
    get acceptedFormats() {

        return [
            '.jpeg', 
            '.png',
            '.pdf',
            '.mkv'
        ];

    }

    handleUploadFinished( event ) {
        
        let uploadedFilesList = event.detail.files;
        let uploadedFile = uploadedFilesList[ 0 ];
        console.log(
            'uploadedFile is',
            JSON.stringify(
                this.contacts
            )
        );
        this.contacts.push(uploadedFilesList[0]);
        this.strContentDocId = uploadedFile.documentId;
        this.fileName = uploadedFile.name;

    }

}
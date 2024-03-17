import { LightningElement,track,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class parentCmp extends NavigationMixin( LightningElement ) {
   
   
    @api recordId;
    fileName;
    strContentDocId;
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
                uploadedFile
            )
        );
        this.strContentDocId = uploadedFile.documentId;
        this.fileName = uploadedFile.name;

    }

    previewImage() {

        this[ NavigationMixin.Navigate ] ( {
            type: 'standard__namedPage',
            attributes: {
                pageName: 'filePreview'
            },
            state:{ 
                selectedRecordId: this.strContentDocId
            }
        }, false );

    }    
}


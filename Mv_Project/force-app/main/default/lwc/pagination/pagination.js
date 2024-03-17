/*
API : 52
Source : lwcFactory.com
*/
import {LightningElement,api} from 'lwc';
//Import apex method 
import fetchContacts from '@salesforce/apex/ContactDataController.fetchContacts';
import { NavigationMixin } from 'lightning/navigation';

export default class pagination extends NavigationMixin( LightningElement ) {
    
    // JS Properties 
    @api recordId;
    fileName;
    strContentDocId;
    contacts=[];
    pageSizeOptions = [5, 10, 25, 50, 75, 100]; //Page size options
    records = []; //All records available in the data table
    columns = []; //columns information available in the data table
    totalRecords = 0; //Total no.of records
    pageSize; //No.of records to be displayed per page
    totalPages; 
    pageNumber = 1;   
    recordsToDisplay = [];
    
    get acceptedFormats() {

        return [
            '.jpeg', 
            '.png',
            '.pdf',
            '.mkv'
        ];

    }

    previewImage(event) {
        // const rowNode = event.toElement.closest('tr');
        //  console.log(rowNode.dataset.rowKeyValue+"hi");
        // this[ NavigationMixin.Navigate ] ( {
        //     type: 'standard__namedPage',
        //     attributes: {
        //         pageName: 'filePreview'
        //     },
        //     state:{ 
        //         selectedRecordId: rowNode.dataset.rowKeyValue
        //     }
        // }, false );
        console.log(event);
        console.log("hi");
       // event.currentTarget.data
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
        this.records = this.contacts;
        this.totalRecords = this.contacts.length; // update total records count                 
        this.pageSize = this.pageSizeOptions[0]; //set pageSize with default value as first option
        this.paginationHelper();

    }

    get bDisableFirst() {
        return this.pageNumber == 1;
    }

    get bDisableLast() {
        return this.pageNumber == this.totalPages;
    }
    
    // connectedCallback method called when the element is inserted into a document
    connectedCallback() {
        // set datatable columns info
        this.columns = [{
                label: 'name',
                fieldName: 'name',
                
            },
            {
                label: 'Id',
                fieldName: 'documentId',
                onclick: 'previewImage'
            },
          
        ];

        // fetch contact records from apex method 
        fetchContacts()
            .then((result) => {
                if (result != null) {
                   // console.log('RESULT--> ' + JSON.stringify(result));
                    this.records = this.contacts;
                    this.totalRecords = this.contacts.length; // update total records count                 
                    this.pageSize = this.pageSizeOptions[0]; //set pageSize with default value as first option
                    this.paginationHelper(); // call helper menthod to update pagination logic 
                }
            })
            .catch((error) => {
                console.log('error while fetch contacts--> ' + JSON.stringify(error));
            });
    }

    handleRecordsPerPage(event) {
        this.pageSize = event.target.value;
        this.paginationHelper();
    }

    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }

    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }

    firstPage() {
        this.pageNumber = 1;
        this.paginationHelper();
    }

    lastPage() {
        this.pageNumber = this.totalPages;
        this.paginationHelper();
    }


    // JS function to handel pagination logic 
    paginationHelper() {
        this.recordsToDisplay = [];
        // calculate total pages
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        // set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }

        // set records to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.recordsToDisplay.push(this.records[i]);
        }
    }
}
import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
export default class ChildCmp extends NavigationMixin( LightningElement ) {
    @api getValueFromParent;
    @api getNameFromParent;
    previewImage() {

        this[ NavigationMixin.Navigate ] ( {
            type: 'standard__namedPage',
            attributes: {
                pageName: 'filePreview'
            },
            state:{ 
                selectedRecordId: this.getValueFromParent
            }
        }, false );

    } 
}
({
    handleFileChange: function(component, event, helper) {
        var fileInput = component.find("fileInput").getElement();
        var file = fileInput.files[0];
        
 
        var fileSelectedEvent = component.getEvent("fileSelected");
        fileSelectedEvent.setParams({
            file: file
        });
        fileSelectedEvent.fire();
    }
})
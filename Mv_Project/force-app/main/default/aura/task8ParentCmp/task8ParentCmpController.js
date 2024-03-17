({
	  handleFileSelected: function(component, event, helper) {
        var file = event.getParam("file");
        
        var reader = new FileReader();
        reader.onload = function(e) {
            component.set("v.previewUrl", e.target.result);
        };
        reader.readAsDataURL(file);
    }
})
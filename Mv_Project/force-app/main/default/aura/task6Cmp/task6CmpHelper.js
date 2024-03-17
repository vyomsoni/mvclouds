({
	 fontcolorchangee : function(component, event, helper){
      //  var element = component.find("fontSizeClass").getElement();
        var element1 = component.find("fontSizeClass1").getElement();
        var element2 = component.find("fontSizeClass2").getElement();
           var element3 = component.find("fontSizeClass3").getElement();
           var element4 = component.find("fontSizeClass4").getElement();
            //  element.style.color = component.get("v.FontSize");
        element1.style.color = component.get("v.FontColor"); // Set your desired font size
        element2.style.color = component.get("v.FontColor");
               element3.style.color = component.get("v.FontColor");
               element4.style.color = component.get("v.FontColor");
        
    }
})
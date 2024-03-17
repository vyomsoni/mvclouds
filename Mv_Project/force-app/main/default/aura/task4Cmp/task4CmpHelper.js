({
	nextt : function() {
			let num = parseInt(component.get("v.current"));
        if(num==3){
            component.set("v.visibleNext",True);
        }else{
            num= num+1;
           // console.log(num);
            component.set("v.current",num.toString()); 
             component.set("v.visiblePrev",false);
        }
	},
    prevv : function(){
        	let num = parseInt(component.get("v.current"));
       if(num==1){
            component.set("v.visiblePrev",True);
        }else{
            num= num-1;
           // console.log(num);
            component.set("v.current",num.toString()); 
        }
    }
    
})
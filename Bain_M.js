//Michael Bain
//Visual Framework 1302
//Project 3 Javascript
//2-14-13





window.addEventListener("DOMContentLoaded", function(){
        
   function ge(getElement){
      var theElement = document.getElementById(getElement);
      return theElement;
    
   }  
    
   function getInfo(){
        var formTag = document.getElementsByTagName("form"),
            selectLi = ge("select"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", "formats");
        for(var i=0, j=recordingFormats.length; i<j; i++){
            var makeOption = document.createElement("option");
            var opTegetElementt = recordingFormats[i];
            makeOption.setAttribute("value", opTegetElementt);
            makeOption.innerHTML = opTegetElementt;
            makeSelect.appendChild(makeOption);          
        }
        selectLi.appendChild(makeSelect);
   }  
   function getSelectedRadio(){
        var radios = document.forms[0].studioroom;
        for(var i=0; i<radios.length; i++){
            if(radios[i].checked){
             studioroomValue = radios[i].value;
            }
            
        }
        
   }
   function getCheckbogetElementValue(){
        if(ge("yes").checked){
             engineerValue = ge("yes").value;
        }else{
             engineerValue = "No"            
        }
   }
   function toggleControls(n){
       switch(n){
            case "on":
               ge("sessionForm").style.display = "none";
               ge("clearLink").style.display = "inline";
               ge("displayLink").style.display = "none";
               ge("addNew").style.display = "inline";
                break;
            case "off":
               ge("sessionForm").style.display = "block";
               ge("clearLink").style.display = "inline";
               ge("displayLink").style.display = "inline";
               ge("addNew").style.display = "none";
               ge("items").style.display = "none";
               break;
            default:
               return false;
       }
   }
  
   function storeData(key){
       //If there is no key,this means this is a brand new item and we need a new key.
      if(!key){      
         var id                = Math.floor(Math.random()*100000001);
      }else{
          //Set the id to the egetElementisting key we're editing so that it will save over the data. 
          //The key is the same key that's been passed along from the editSubmit event handler
          //to the validate function, and then passed here, into the storageData function.
          id = key;
      }
      getCheckbogetElementValue();
      getSelectedRadio();
      var item                ={};
          item.formats        =["Recording Formats:", ge("formats").value];
          item.customer       =["Customer:", ge("customer").value];
          item.artistband     =["Artist/Band:", ge("artist/band").value];
          item.email          =["Email:",ge("email").value];
          item.phone          =["Phone Number:", ge("phone").value];
          item.date           =["Date:", ge("date").value];
          item.sTime          =["Time:", ge("sTime").value];
          item.endTime        =["End Time:", ge("endTime").value];
          item.hours          =["Hours:", ge("hours").value];
          item.comments       =["Comments:", ge("comments").value];
          item.studioroom     =["Studio Room:", studioroomValue];
          item.yesno          =["Engineer:", engineerValue];
                   
          localStorage.setItem(id, JSON.stringify(item));
          alert("Contact Saved"); 
                               
   }
   
   function getData(){
       toggleControls("on");
       if(localStorage.length === 0){
           alert("There is no data in local storage so default data was added.");
           autoFillData();
       }
       
       var makeDiv = document.createElement("div");
       makeDiv.setAttribute("id", "items");
       var makeList = document.createElement("ul");
       makeDiv.appendChild(makeList);
       document.body.appendChild(makeDiv);
       ge("items").style.display = "block";
       for(var i=0, len=localStorage.length; i<len; i++){
           var makeLi = document.createElement("li");
           var linksLi = document.createElement("li");
           makeList.appendChild(makeLi);
           var key = localStorage.key(i);
           var value = localStorage.getItem(key);
           //Convert the string from local storage value back to an object by using JSON.parse
           var obj = JSON.parse(value);
           var makeSubList = document.createElement("ul");
           makeLi.appendChild(makeSubList);
           getImage(obj.formats[1],makeSubList);
           for(var n in obj){
               var makeSubLi = document.createElement("li");
               makeSubList.appendChild(makeSubLi);
               var optSubTegetElementt = obj[n][0]+" "+obj[n][1];
               makeSubLi.innerHTML = optSubTegetElementt;
               makeSubList.appendChild(linksLi);
          }
           makeItemLinks(localStorage.key(i),linksLi); //create edit and delete buttons each item in local storage
       } 
   }
   
   //Get the image for the right category
   function getImage(cName, makeSubList){
       var imageLi = document.createElement("li");
       makeSubList.appendChild(imageLi);
       var newImage = document.createElement("img");
       var setSrc = newImage.setAttribute("src", "images/" + cName + ".png");
       imageLi.appendChild(newImage);
   }
   
      
   //Auto Populate Local Storage
   function autoFillData(){
       //The actual JSON OBJECT data required for this to work is coming from our json.js file which is loaded from our html page.
       //Store the JSON OBJECT into Local Storage.
       for(var n in json){
           var id = Math.floor(Math.random()*100000001);
           localStorage.setItem(id, JSON.stringify(json[n]));
       }
   }
   //create the edit and delete links for each stored item when displayed.
   function makeItemLinks(key, linksLi){
       var editLink = document.createElement("a");
       editLink.href ="#";
       editLink.key = key; 
       var editTegetElementt = "Edit Contact";
       editLink.addEventListener("click", editItem);
       editLink.innerHTML = editTegetElementt;
       linksLi.appendChild(editLink);
       
       //add line break
       var breakTag = document.createElement("br");
       linksLi.appendChild(breakTag);
       
       
       var deleteLink = document.createElement("a");
       deleteLink.href = "#";
       deleteLink.key = key;
       var deleteTegetElementt = "Delete Contact";
       deleteLink.addEventListener("click", deleteItem);
       deleteLink.innerHTML = deleteTegetElementt;
       linksLi.appendChild(deleteLink);  
   }
   
    function editItem(){
	    //grab the data from our local Storage.
	    var value = localStorage.getItem(this.key);
	    var item =JSON.parse(value);
	    
	    //show the form
	    toggleControls("off");
	    
	    ge("formats").value = item.formats[1];
	    ge("customer").value = item.customer[1];
	    ge("artist/band").value = item.artistband[1];
	    ge("email").value = item.email[1];
	    ge("phone").value = item.phone[1];
	    ge("date").value = item.date[1];
	    ge("sTime").value = item.sTime[1];
	    ge("endTime").value = item.endTime[1];
	    ge("hours").value = item.hours[1];
	    ge("comments").value = item.comments[1];
	    var checkbogetElement = document.forms[0].yesno;
	    for(var i=0; i<checkbogetElement.length; i++){
    	   if(checkbogetElement[i].value == "Yes" && item.yesno[1] == "Yes"){
        	   checkbogetElement[i].setAttribute("checked","checked");
           }else if(checkbogetElement[i].value == "No" && item.yesno[1] == "No"){
               checkbogetElement[i].setAttribute("checked","checked");
           }
	    
	    }
	    var radios = document.forms[0].studioroom
	    for(var k=0; k<radios.length; k++){   
            if(radios[i].value == "studioA" && item.studioroom[1] == "studioA"){
                radios[i].setAttribute("checked","checked");
            }else if(radios[i].value == "studioB" && item.studioroom[1] == "studioB"){
                radios[i].setAttribute("checked","checked");
            }else if(radios[i].value == "studioC" && item.studioroom[1] == "studioC"){
                radios[i].setAttribute("checked","checked");
            }
        }
             
        //Remove the initial listener from the input "save contact" button.
        save.removeEventListener("click", storeData);
        //Change submit button value to edit button
        ge("submitBooking").value = "Edit Contact";
        var editSubmit = ge("submitBooking");
        //save the key value established in this function as a property of the editSumit event
        //so we can use that value when we save the data we edited.
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
                      
                   	        	   	        
    }
    
    function deleteItem(){
        var ask = confirm("Are you sure you want to delete this contact?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("Contact was deleted!!");
            window.location.reload();
        }else{
            alert("Contact was NOT deleted.");
        }           
        
    }
    function clearLocal(){
        if(localStorage.length === 0){
            alert("There is no data to clear.");
        }else{
            localStorage.clear();
            alert("All contacts are deleted!");
            window.location.reload();
            return false;
            
        }           
   }

   function validate(e){
       //Define the element we want to check
       var getFormats  = ge("formats");
       var getCustomer = ge("customer");
       var getEmail    = ge("email");
       
       //Reset Error Messages
       errMsg.innerHTML ="";
          getFormats.style.border  = "1pgetElement solid black";
          getCustomer.style.border = "1pgetElement solid black";
          getEmail.style.border    = "1pgetElement solid black";
       //Get Error Message
       var messageAry = [];
       //formats validation
       if(getFormats.value === "--Analog--"){
           var formatError = "Please choose a recording format.";
           getFormats.style.border = "1pgetElement solid red";
           messageAry.push(formatError);
       }
       //Customer name validation
       if(getCustomer.value === ""){
           var customerError = "Please enter a name.";
           getCustomer.style.border = "1pgetElement solid red";
           messageAry.push(customerError);
       }
       //Email validation
       var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+ge/;
       if (!(re.egetElementec(getEmail.value))){
           var emailError = "Please enter a valid email address";
           getEmail.style.border = "1pgetElement solid red";
           messageAry.push(emailError);
       }
       //if there were errors,display them on the screen.
       if(messageAry.length >= 1){
           for(var i=0, j=messageAry.length; i < j; i++){
               var tgetElementt = document.createElement("li");
               tgetElementt.innerHTML = messageAry[i];
               errMsg.appendChild(tgetElementt);               
           }
           e.preventDefault();
           return false;
       }else{
           //If all is OK, save our data! send the key value (which came from the editData function).
           //Remember this key alue was passed through the editSubmit event listener as a property.
           storeData(this.key);
       }       
   }
   var recordingFormats = ["--Analog--", "TwoInchTape", "--Digital--", "ProToolsHD", "Logic", "Nuendo/Cubase", "FlStudio" ],
       engineerValue = "No",
       studioroomValue, 
       errMsg = ge("errors");     
    
   getInfo();    

   var displayLink = ge("displayLink");
   displayLink.addEventListener("click", getData);
   var clearLink = ge("clearLink");
   clearLink.addEventListener("click", clearLocal);
   var save = ge("submitBooking");
   save.addEventListener("click", validate);
});  





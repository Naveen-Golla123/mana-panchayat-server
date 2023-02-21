// Declaring Variables
let postSaveButtonEl = document.getElementById("postSaveButton"); //Save Button
let imageInputEl = document.getElementById("imageInput"); //Image Input Feild
let titleInputEl = document.getElementById("titleInput"); //Title Input Feild
let editor1El = document.getElementById("editor1"); //Editor Display Container
let validationAlertEl = document.getElementById("validationAlert"); //Validation Error Pop
let alertMessageEl = document.getElementById("alertMessage"); //Error Message Text

let uploadedFile = null; //Variable for Geting Name of Uploaded File.


// CK Editor Section
let em_string = "";

CKEDITOR.replace( 'editor1' );

let contentOutput = CKEDITOR.on( 'instanceReady', function( evt )
{
    var editor = evt.editor;

editor.on('change', function (e) {  
    var text =  editor.editable().getData();
    em_string = text;
        
    });
}); ;


//Getting Name of File on Upload
imageInputEl.addEventListener('change', function (event) {
  uploadedFile = event.target.files[0];
});


//On save Button Clicked
postSaveButtonEl.addEventListener("click", function (event) {

  //Validating Title is Empty
  if (titleInputEl.value === "") {
    alertMessageEl.innerHTML = "Pleas give your Title!"; //Assigning Alert Message
    validationAlertEl.classList.remove('d-none'); //Unhiding Error Pop
  } else if (contentOutput === "") {   //Validating News Content is Empty
    alertMessageEl.innerHTML = "Pleas write something on Post!"; //Assigning Alert Message
    validationAlertEl.classList.remove('d-none'); //Unhiding Error Pop

  } else {
    validationAlertEl.classList.add('d-none'); //Hiding Error Pop 

    //Assigning filename, TitleName, News to formdata
    var formdata = new FormData();
    formdata.append("file", uploadedFile, uploadedFile.name);
    formdata.append("title", titleInputEl.value);
    formdata.append("news", em_string);

    token = localStorage.getItem('jwtToken');
    //Request options
    var requestOptions = {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + token
      },
      body: formdata,
      redirect: 'follow'
    };

    //Fetching Data from Server
    fetch("https://mana-panchayat-server.vercel.app/news", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));    
  }
}); 











 
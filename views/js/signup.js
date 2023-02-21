// SignUp Related Elements
let signupFormContainerEl = document.getElementById("signupFormContainer");
let signupFormEl = document.getElementById("signupForm");
let signupClickEl = document.getElementById("signupClick");
// SignUp Input Elements
let firstNameEl = document.getElementById("firstName");
let lastNameEl = document.getElementById("lastName");
let signupUsernameEl = document.getElementById("signupUsername");
let signupPasswordEl = document.getElementById("signupPassword");
let signupMobileEl = document.getElementById("signupMobile");
// SignUp Error Message
let firstNameErrMsgEl = document.getElementById("firstNameErrMsg");
let lastNameErrMsgEl = document.getElementById("lastNameErrMsg");
let signupUsernameErrMsgEl = document.getElementById("signupUsernameErrMsg");
let signupPasswordErrMsgEl = document.getElementById("signupPasswordErrMsg");
let signupMobileErrMsgEl = document.getElementById("signupMobileErrMsg");
// SignUp Form Validation
firstNameEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        firstNameErrMsgEl.textContent = "Required*";
        firstNameEl.classList.add("border-danger");
    } else {
        firstNameErrMsgEl.textContent = "";
        firstNameEl.classList.remove("border-danger");
    }
});

lastNameEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        lastNameErrMsgEl.textContent = "Required*";
        lastNameEl.classList.add("border-danger");
    } else {
        lastNameErrMsgEl.textContent = "";
        lastNameEl.classList.remove("border-danger");
    }
});

signupUsernameEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        signupUsernameErrMsgEl.textContent = "Required*";
        signupUsernameEl.classList.add("border-danger");
    } else {
        signupUsernameErrMsgEl.textContent = "";
        signupUsernameEl.classList.remove("border-danger");
    }
});

signupPasswordEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        signupPasswordErrMsgEl.textContent = "Required*";
        signupPasswordEl.classList.add("border-danger");
    } else {
        signupPasswordErrMsgEl.textContent = "";
        signupPasswordEl.classList.remove("border-danger");
    }
});

signupMobileEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        signupMobileErrMsgEl.textContent = "Required*";
        signupMobileEl.classList.add("border-danger");
    } else {
        signupMobileErrMsgEl.textContent = "";
        signupMobileEl.classList.remove("border-danger");
    }
});


// SignUp Button Submit
let signUpButtonEl = document.getElementById("signUpButton");


// SignUp Onclick Functioning
signUpButtonEl.addEventListener("click", function(event){
    event.preventDefault();

    //SignUp (Posting Data to database)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "firstname": firstNameEl.value,
      "lastname": lastNameEl.value,
      "username": signupUsernameEl.value,
      "password": signupPasswordEl.value,
      "phone": signupMobileEl.value
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://mana-panchayat-server.vercel.app/register", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));    

});
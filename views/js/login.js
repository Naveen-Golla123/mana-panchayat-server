// Login Related Elements
let loginFormContainerEl = document.getElementById("loginFormContainer");
let loginFormEl = document.getElementById("loginForm");
let loginClickEl = document.getElementById("loginClick");
// Login Input Elements
let loginUsername = document.getElementById("loginUsername");
let loginPasswordEl = document.getElementById("loginPassword");
// Login Error Message
let loginUsernameErrMsg = document.getElementById("loginMailErrMsg");
let loginPasswordErrMsgEl = document.getElementById("loginPasswordErrMsg");
// Login Form Validation
loginUsername.addEventListener("blur", function (event) {
    if (event.target.value === "") {
        loginUsernameErrMsg.textContent = "Required*";
        loginUsername.classList.add("border-danger");
    } else {
        loginUsernameErrMsg.textContent = "";
        loginUsername.classList.remove("border-danger");
    }
});

loginPasswordEl.addEventListener("blur", function (event) {
    if (event.target.value === "") {
        loginPasswordErrMsgEl.textContent = "Required*";
        loginPasswordEl.classList.add("border-danger");
    } else {
        loginPasswordErrMsgEl.textContent = "";
        loginPasswordEl.classList.remove("border-danger");
    }
});
// Login Button Submit
let logInButtonEl = document.getElementById("logInButton");






// LogIn Onclick Functioning
logInButtonEl.addEventListener("click", function (event) {

    event.preventDefault();

    //Login (Posting Data & get token)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": loginUsername.value,
        "password": loginPasswordEl.value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://mana-panchayat-server.vercel.app/Auth/signIn", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result && result["access_token"]) {
                localStorage.setItem('jwtToken', result["access_token"])
                var mainURL = window.location.href;
                var baseURL = mainURL.substring(0, mainURL.lastIndexOf("/") + 1);
                var postUrlEl = baseURL + "create_newspost.html";
                //window.location.href = postUrlEl;
            }
        })
        .catch(error => console.log('error', error));
});







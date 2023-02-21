// Get Request Options
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };



// Declaring Variables of HTML elements  

let newsTitleEl = document.getElementById("newsTitle"); //News Post Title
let newsContentEl = document.getElementById("newsContent"); //News Post Content or Story
let imgContainerEl = document.getElementById("imgContainer"); // News Post Image
let authorNameEl = document.getElementById("authorName"); // News Post Image
let publishedDateEl = document.getElementById("publishedDate"); // News Post Image
let urlCopyEl = document.getElementById("urlCopy"); // Varible to store page url
let postUrlCopyButtonEl = document.getElementById("postUrlCopyButton"); // Button to copy post's URL
//Assigning Meta Details
let metaTitleEl = document.getElementById("metaTitle"); // Button to copy post's URL
let metaImageEl = document.getElementById("metaImage"); // Button to copy post's URL
let metaDescriptionEl = document.getElementById("metaDescription"); // Button to copy post's URL

//Collecting Url of Page
var mainURL = window.location.href;
var baseURL = mainURL.substring(0, mainURL.lastIndexOf("/")+1);
var postUrlEl = baseURL + "view_post.html";
console.log(postUrlEl);

//Formating Date to "DD MM YYYY" 
function dateToFormat(timeStamp){
  let dateString = timeStamp;
  dateString = dateString.slice(0, -5);
  let date = new Date(dateString);
  let formattedDate = `${("0" + date.getDate()).slice(-2)} ${(date.toLocaleString("en-US", { month: "long" }))} ${date.getFullYear()}`;
  return formattedDate;
}

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
console.log(id)

//Fetching data form the API
fetch("http://localhost:3000/news/"+id, requestOptions)
.then(response => response.json())
.then(result => {

    newsTitleEl.innerHTML = result[0].title; //Assigning Title to Post
    imgContainerEl.setAttribute("src", result[0].imgUrl); // Assigning Image to Post
    newsContentEl.innerHTML = result[0].newsDescription; //Assigning Content or Story to Post
    authorNameEl.textContent = result[0].author; //Assigning Author Name of Story to Post


    // // Url of Post
    postUrl = window.location.href +"?id="+result[0].id;
    urlCopyEl.value = postUrl;

    //Date to HTML Element
    let dateFormat = dateToFormat(result[0].createdOn);
    publishedDateEl.textContent = dateFormat;


    //Giving meta details to page
    metaTitleEl.content = result[0].title;
    metaImageEl.content = result[0].imgUrl;
    // metaDescriptionEl.content = ;

}

)
.catch(error => console.log('error', error));


//Post's Url coping to Clipboard


// Function to copy To Clipboard
// async function copyToClipboard(text) {
//   try {
//     await navigator.clipboard.writeText(text);
//     console.log("Text copied to clipboard successfully!");
//   } catch (error) {
//     console.error("Failed to copy text to clipboard: ", error);
//   }
// }

// var textToCopy = "postUrl";
// copyToClipboard(textToCopy);




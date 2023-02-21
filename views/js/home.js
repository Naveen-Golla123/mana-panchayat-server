

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


fetch("https://mana-panchayat-server.vercel.app/news/", requestOptions)
  .then(response => response.json())
  .then(result => {


    let allPostsEl = document.getElementById("allPosts");
    let holderEl = document.getElementById("holder");


    var mainURL = window.location.href;
    var baseURL = mainURL.substring(0, mainURL.lastIndexOf("/") + 1);
    var postUrlEl = baseURL + "view_post.html";
    console.log(postUrlEl);






    for (let each in result) {

      let divTag = document.createElement('div');
      divTag.setAttribute("id", result[each].id);
      divTag.classList.add("row", "border", "mt-3", "py-3");


      let allPostsCode = `
          <div id="news_${result[each].id}">
            <div class="col-3">
                <img class="w-100 h-auto" src="${result[each].imgUrl}" alt="" srcset="">
            </div>
            <div class="col-9">
                <h5 class="font-weight-bold">${result[each].title}</h5>
                <div class="mt-3" style="max-height:50px; overflow:hidden;">
                  <p class="" >${result[each].newsDescription}</p>
                </div>
                
                <div class="d-flex justify-content-between mt-3">
                  <a href="${postUrlEl}?id=${result[each].id}" target="_blank class="text-primary p-0">Read More 
                      <i class="fa-solid fa-angles-right ml-1"></i>
                  </a>

                  <div class="d-flex justify-content-between">
                    <small class="text-secondary mr-3"><i class="fa-solid fa-location-dot mr-2"></i>${result[each].location}</small>
                    <small class="text-secondary"><i class="fa-regular fa-clock mr-2"></i>${result[each].createdOn}</small>                    
                  </div>

                </div>
            </div>
          </div>           
        `;

      divTag.innerHTML = allPostsCode;
      allPostsEl.appendChild(divTag);
      document.getElementById("news_" + result[each].id).addEventListener('click', event => {
        window.location.href = postUrlEl + "?id=" + result[each].id;
      })
    }
  }

  )
  .catch(error => console.log('error', error));

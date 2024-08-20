const cl = console.log;

const userNameform = document.getElementById("userNameform");
const userNameControl = document.getElementById("userNameControl");
const postcontainer = document.getElementById("postcontainer");

const BASE_URL = `https://api.github.com/users`;

const makeApiCall = async (apiurl) => {
  const res = await fetch(apiurl);
  return await res.json();
};

const templatingofcard = (arr) => {
  let result = " ";
  let reposResult = " ";
  if (arr[0].message === "Not Found" && arr[1].message === "Not Found") {
    result = `<div class="alert alert-danger" role="alert">
    User is not found!!!
    </div>`;
  } else {
    arr[1].forEach((ele, i) => {
      if (i < 5) {
        reposResult += `
                         <a href="${ele.url}" target="_blank">${ele.name}</a>
                       `
      }
    });

    result = `<div class="row">
                 <div class="col-md-6 offset-md-3">
                  <div class="form-group urlcss">
                  <figure class="user-card">
                      <div class="avatar-img">
                       <img src="${arr[0].avatar_url}" alt="avatar" title="avatar">
                      </div>
                      <figcaption class="userinfo">
                      
                      <h3>${arr[0].name}</h3>
                      <p>
                          <span>${arr[0].following}</span>
                          <span>Following</span>
                          <span class="spancss">${arr[0].followers}</span>
                          <span>Followers</span>
                          <span class="spancss">${arr[0].public_repos}</span>
                          <span>Repo</span>
                      </p> 
                      <p>
                      ${reposResult}
                      </p>
               
                      </figcaption>
                  </figure>
              </div>
              </div>
              
          </div>`;
  }

  postcontainer.innerHTML = result;
};

const onAdduser = async (eve) => {
  eve.preventDefault();
  let username = userNameControl.value;

  let userurl = `${BASE_URL}/${username}`;
  let userRepourl = `${BASE_URL}/${username}/repos`;
  // cl(userRepourl);

  let arrofPromises = [makeApiCall(userurl), makeApiCall(userRepourl)];

  let data = await Promise.all(arrofPromises);
  templatingofcard(data);
  // cl(data)
};

userNameform.addEventListener("submit", onAdduser);

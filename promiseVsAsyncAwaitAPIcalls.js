//const fetch = require("node-fetch"); // importing fetch module for nodejs

//Using promise, API call gonna takes place
function search(){
  deleteChild();
  const githubuserAPIURL = (name) => `https://api.github.com/users/${name}`;  // Template Literal is used here " by (``) symbol." for concatination.

  const githubUserName = (name) => {

    const url = githubuserAPIURL(name);
    fetch(url)
    .then((res) => res.json())
    .then((user) => {
      console.log(user);
      document.getElementById("pr").innerHTML = user.name == null ? user.login:user.name;
      document.getElementById("profilepic").src = user.avatar_url;
      document.getElementById("bio").innerHTML = user.bio == null ? 'BIO : No Bio of you' : `BIO : ${user.bio}`;
      document.getElementById("locationinfo").innerHTML = user.location == null ? ' Location : No location update' : `Location : ${user.location}`;
      document.getElementById("emailid").innerHTML = user.email == null ? 'Email ID : No email of you' : `Email ID : ${user.email}`;
      document.getElementById("acctCreatedon").innerHTML = user.created_at == null ? 'Acct Created On : No created date of this Account.' : `Acct Created On : ${user.created_at.toString().slice(0,10)}`;
      document.getElementById("followers").innerHTML = `You have ${(user.followers)} followers.`;
      document.getElementById("repoCount").innerHTML = user.public_repos;
    })
    fetch(`https://api.github.com/users/${name}/repos`).then((res1)=>res1.json()).then((repouser) =>{
      console.log(repouser);
      const rootDiv = document.getElementById("repoList");
      for (var i = 0; i < repouser.length; i++) {
        const tdname = document.createElement('a');
        const tdDate = document.createElement('h6');
        const horizon = document.createElement('hr');
        const description = document.createElement('p');
        const repoViewers = document.createElement('p');
        const breaked = document.createElement('br');
        tdname.classList.add("w3-opacity");
        tdDate.classList.add("w3-text-teal");
        tdname.innerHTML = "<b>"+repouser[i].name+"</b>";
        tdname.href = repouser[i].html_url;
        tdname.target="_blank";
        tdDate.innerHTML = "Created on :"+repouser[i].created_at.toString().slice(0,10);
        description.innerHTML = repouser[i].description == null ? 'No Description provided for this Repo':repouser[i].description;
        repoViewers.innerHTML = `This Repo viewed by ${repouser[i].watchers}`;
        rootDiv.appendChild(horizon);
        rootDiv.appendChild(tdname);
        rootDiv.appendChild(tdDate);
        rootDiv.appendChild(description);
        rootDiv.appendChild(repoViewers);
        //rootDiv.appendChild(breaked);
      }
    })
  };
  githubUserName(document.getElementById("ip2").value);
  //githubUserName('richa2104')
}

function deleteChild() {
        var e = document.getElementById("repoList");
        var child = e.lastElementChild;
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
    }

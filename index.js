let username = "octocat";
const apiUrl = `https://api.github.com/users/${username}`;
const nameUser = document.querySelector('.name');
const repos = document.querySelector('.repos-nr');
const followers = document.querySelector('.followers-nr');
const following = document.querySelector('.following-nr');
const profilePic = document.querySelector('.profile-pic');
const userAround = document.querySelector('.username');
const search = document.querySelector('.search-btn');
const bio = document.querySelector('.bio');
const userLocation = document.querySelector('.location p');
const twitter = document.querySelector('.twitter p');
const site = document.querySelector('.site p');
const company = document.querySelector('.company p');
const joined = document.querySelector('.joined');
const noResults = document.querySelector('.no-results');
const theme = document.querySelector('.theme');
const monthNames = ["asd","Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        nameUser.innerHTML = data.name;
        repos.innerHTML = data.public_repos;
        followers.innerHTML = data.followers;
        following.innerHTML = data.following;
        profilePic.style.backgroundImage=`url(${data.avatar_url})`
        userAround.innerHTML=`@${data.login}`
        if(data.bio===null){
            bio.innerHTML = "This profile has no bio";
        }else{bio.innerHTML = data.bio;}
        if(data.twitter_username){
            twitter.innerHTML = data.twitter_username;
        }else{twitter.innerHTML="Not available"}

        userLocation.innerHTML = data.location;
        
        site.innerHTML = data.blog;
        company.innerHTML = data.company;

        let joinedMonth = parseInt(`${data.created_at[5]}`+`${data.created_at[6]}`);
        joined.innerHTML = `Joined at ${data.created_at[8]+data.created_at[9]} ${monthNames[joinedMonth]} ${data.created_at[0]+data.created_at[1]+data.created_at[2]+data.created_at[3]}`
        
    })
    .catch(error => console.error(error));


search.onclick=()=>{
    
    username = document.querySelector(".search-input-value").value;
    const apiUrl = `https://api.github.com/users/${username}`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if(data.name==undefined){
            error;
        }else{noResults.classList.add('hidden');}
        nameUser.innerHTML = data.name;
        repos.innerHTML = data.public_repos;
        followers.innerHTML = data.followers;
        following.innerHTML = data.following;
        profilePic.style.backgroundImage=`url(${data.avatar_url})`
        userAround.innerHTML=`@${data.login}`
        if(data.bio===null){
            bio.innerHTML = "This profile has no bio";
        }else{bio.innerHTML = data.bio;}
        if(data.twitter_username){
            twitter.innerHTML = data.twitter_username;
        }else{twitter.innerHTML="Not available"}
        if(data.location){
            userLocation.innerHTML = data.location;
        }else{userLocation.innerHTML="Not available"}
        if(data.blog){
            site.innerHTML = data.blog;
        }else{site.innerHTML="Not available"}
        if(data.company){
            company.innerHTML = data.company;
        }else{company.innerHTML="Not available"}
        

        let joinedMonth = parseInt(`${data.created_at[5]}`+`${data.created_at[6]}`);
        joined.innerHTML = `Joined at ${data.created_at[8]+data.created_at[9]} ${monthNames[joinedMonth]} ${data.created_at[0]+data.created_at[1]+data.created_at[2]+data.created_at[3]}`
        
    })
    .catch(error=>{
        console.error(error);
        noResults.classList.remove('hidden');
        

    })
    document.querySelector(".search-input-value").value="";
    
}



userAround.onclick =()=>{
    window.open(`https://github.com/${username}`, "_blank");
}

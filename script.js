console.log("started");
const searchbar=document.querySelector(".search-container");
const profileContainer=document.querySelector(".profile-container");

const root=document.documentElement.style; // selected root element
const get=(param)=> document.getElementById(`${param}`);

// Github API
const url="https://api.github.com/users/";


// Targeting elements
const noResults=get("no-result");
const btnMode = get("btn-mode");
const modeText = get("mode-text");
const modeIcon = get("mode-icon");
const btnSubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;


// Searching User data
btnSubmit.addEventListener("click",function(){
    // handling base case
    if(input.value!==""){
        getUserData(url + input.value);
    }
});

// switching dark and light mode ( for single line of code no need to use brackets )
btnMode.addEventListener("click",function(){
    if(darkMode==false) darkModeProperties();
    else lightModeProperties();
});

// What if user clicked enter while typing ( search the username entered till that time )
input.addEventListener("keydown",function(e){
    // explore below if statement
    if(!e){ // before this e has not been defined yet (You can remove this if condition and and define e directly as var e=window.event; TRY IT) and remember !undefined --> true
        var e=window.event;
    }
    if(e.key=="Enter"){
        if(input.value!==""){
            getUserData(url+input.value);
        }
    }
});


// fetching data
function getUserData(gitUrl){
    fetch(gitUrl).then((response) =>  response.json()).then((data)=>{
        console.log(data);
        updateUserProfile(data);
    }).catch((error)=>{
        throw error; // You can change this block for better UI for error handling.
    });
}

// Updating Data on Ui
function updateUserProfile(data){
    if(data.message!=="Not Found"){
        noResults.style.display="none";
        function checkNull(param1,param2){
            if(param1==="" || param1===null){
                // fading out element
                param2.style.opacity=0.5;
                // fading out the TagName
                param2.previousElementSibling.style.opacity=0.5;
                return false;
            }
            else{
                return true;
            }
        }
        
        // updating data
        avatar.src=`${data.avatar_url}`;
        userName.innerText = data.name===null ? data.login : data.name;
        user.innerText=`@${data.login}`;
        user.href=`${data.html_url}`;
        // The shift() method removes the first element from an array and returns that removed element.This method changes the length of the array.
        dateSegments=data.created_at.split("T").shift().split("-");
        date.innerText=`Joined ${dateSegments[2]} ${months[dateSegments[1]-1]} ${dateSegments[0]}`;
        bio.innerText= data.bio===null ? "This profile has no bio." : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
        page.href = checkNull(data.blog, page) ? data.blog : "#";
        user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available";


        // Redundant codes below
        // searchbar.classList.toggle("active");
        // profileContainer.classList.toggle("active");
    }
    else{
        noResults.style.display = "block";
    }
}


// darkMode Properties
function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modeText.innerText = "LIGHT";
    modeIcon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;

    // Setting variable in Local Storage
    localStorage.setItem("dark-mode", true);
}

//   lightMode properties
function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modeText.innerText = "DARK";
    modeIcon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;

    // Setting variable in Local Storage
    localStorage.setItem("dark-mode", false);
}


getUserData(url + "Rameez0216j");
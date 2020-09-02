var getUserRepos = function(users) {
    // To format GitHub API URL
    var apiURL = "https://api.github.com/users/" + users + "/repos";
    // To make a request to the URL
    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    });
};

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function() {
    event.preventDefault();
    // To get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputE1.value = "";
    }
    else {
        alert("Please enter a Github Username");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);
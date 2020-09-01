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

getUserRepos();
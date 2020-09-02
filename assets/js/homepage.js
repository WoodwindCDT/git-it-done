var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {
    // To format GitHub API URL
    var apiURL = "https://api.github.com/users/" + user + "/repos";
    // To make a request to the URL
    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayRepos(data, user);
            });
        } else {
            alert("Error: " + response.statusText);
        };
    })
    .catch(function(error) {
        // To notify user of connection issue to GitHub
        alert("Unable to connect to GitHub");
    });
};

var formSubmitHandler = function() {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
    }
    else {
    alert("Please enter a GitHub username");
    };
};

var displayRepos = function(repos, searchTerm) {
    // To check if API returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    };

    // To clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    
    // To loop over Repos
    for (var i = 0; i < repos.length; i++) {
      // To format repo name
      var repoName = repos[i].owner.login + "/" + repos[i].name;
      
      // To create a container for repo
      var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // To create a span element to hold span name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // To append to container
        repoEl.appendChild(titleEl);

        // To create status element
        var statusE1 = document.createElement("span");
        statusE1.classList = "flex-row align-center";

        // To check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusE1.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusE1.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        };

        repoEl.appendChild(statusE1);

        // To append container to dom
        repoContainerEl.appendChild(repoEl);
    };
};

userFormEl.addEventListener("submit", formSubmitHandler);
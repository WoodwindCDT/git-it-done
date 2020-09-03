var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function() {
    // To grab the repo name from URI/API
    var queryString = document.location.search;
    // To break repo name into an array at =
    var repoName = queryString.split("=")[1];
    if (repoName) {
        // To display repo name on the page and continue
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    }
    else {
        // To return user to the main page if no repo was given
        document.location.replace("./index.html");
    };
};

var getRepoIssues = function(repoName) {
    var apiUrl = "https://api.github.com/repos/" + repoName + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);

                // To check if API has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repoName);
                }
            });
        } 
        else {
            // If not successful, redirect to the homepage
            document.location.replace("./index.html");
        };
    });
};

// To display issues of repos
var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    };

    for (var i = 0; i < issues.length; i++) {
        // To create a link Element to take users to the issues
        // in their Github Repos
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // To create a span for Issue Title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // To append to container
        issueEl.appendChild(titleEl);

        // To create a type Element
        var typeEl = document.createElement("span");

        // To check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        };
        
        // To append to a
        issueEl.appendChild(typeEl);

        // To append to issues container
        issueContainerEl.appendChild(issueEl)
    };
};

var displayWarning = function(repoName) {
    // To add text to the warning container
    limitWarningEl.textContent = "This repo has more than 30 Issues!, visit ";

    // To create a link element 
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repoName + "/issues");
    linkEl.setAttribute("target", "_blank");

    // To append to issues container
    limitWarningEl.appendChild(linkEl);
};

getRepoName();
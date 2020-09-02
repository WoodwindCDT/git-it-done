var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
            });
        } 
        else {
            alert("There was a problem with your request!")
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

getRepoIssues("WoodwindCDT/codingQuiz");
function removeTask(button) {
    var li = button.parentElement;
    li.remove();
}

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        var li = document.createElement("li");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onchange = function() {
            toggleTaskCompletion(checkbox);
        };

        var span = document.createElement("span");
        span.textContent = taskInput.value;

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        // Bind the removeTask function to the click event of the remove button
        removeButton.onclick = function() {
            removeTask(this);
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(removeButton);

        taskList.appendChild(li);
        taskInput.value = "";
    } else {
        alert("Please enter a task.");
    }
}

function toggleTaskCompletion(checkbox) {
    var taskName = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskName.classList.add("completed");
        searchRelatedNews(taskName.textContent);
    } else {
        taskName.classList.remove("completed");
    }
}

function searchRelatedNews(query) {
    var apiKey = '02ac89c8b7cd477b82e4e05ebb0de140'; 
    var url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    console.log("API request URL:", url); // Log the API request URL

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("API response data:", data); // Log the API response data
        displayNewsResults(data.articles);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function displayNewsResults(articles) {
    var newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = ''; // Clear previous results

    articles.forEach(article => {
        var articleElement = document.createElement("div");
        articleElement.classList.add("article");

        var titleElement = document.createElement("h3");
        titleElement.textContent = article.title;

        var descriptionElement = document.createElement("p");
        descriptionElement.textContent = article.description;

        var linkElement = document.createElement("a");
        linkElement.textContent = "Read more";
        linkElement.href = article.url;
        linkElement.target = "_blank";

        articleElement.appendChild(titleElement);
        articleElement.appendChild(descriptionElement);
        articleElement.appendChild(linkElement);

        newsContainer.appendChild(articleElement);
    });
}

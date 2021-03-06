var questions = [
    {
        prompt: "JSON stands for: ",
        answer: "JavaScript Object Notation",
        wrongs: ["JavaScript Order Naming", "JavaScript Order Notation", "JavaScript Object Naming"],
    }, {
        prompt: "What is the value of 'x' after the following block of code is executed? <br><section class='code-prompt'><p>var x = 10;<br><br>function subtractor(y, x) {<br><span class='tabbed-code'>return x - y;</span><br>}<br><br>x = subtractor(x, 15);</section>",
        answer: "5",
        wrongs: ["-5", "-25", "25"],
    }, {
        prompt: "Unlike some other programming languages, JavaScript does not require you to specify the data type of variables when they're created. Because of this, JavaScript is reffered to as a ________ language.",
        answer: "Weakly-typed",
        wrongs: ["Strongly-typed", "Parametric", "Functional"],
    }, {
        prompt: "Which of the following shows the proper JavaScript syntax for a for-each loop over an array named 'arr'?",
        answer: "arr.forEach(function(element) {});",
        wrongs: ["for (var element in arr) {}", "for (element : arr) {}", "For Each element In arr ... Next"],
        formatAnswersAsCode: true
    }, {
        prompt: "Which of the following is the proper method to display something on the console in JavaScript?",
        answer: "console.log()",
        wrongs: ["System.out.println()", "cout << ", "console.print()"],
        formatAnswersAsCode: true,
    }, {
        prompt: "What is the value of x after the following block of code is executed? <br><section class='code-prompt'><p>var x = 3;<br>var y = 7;<br><br>function doISwap(v, w) {<br><span class='tabbed-code'>v = w;</span><br>}<br><br>doISwap(x, y);",
        answer: "3",
        wrongs: ["7"],
    }, {
        prompt: "What will be displayed in the console after the following block of code is executed?<br><section class='code-prompt'><p>var o = {<br><span class='tabbed-code'>name: 'Mark',</span><br><span class='tabbed-code'>age: 22,</span><br><span class='tabbed-code'>height: 67</span><br>};<br><br>console.log(`Type of 'o': ${typeof(o)} -- Type of 'o.age': ${typeof(o.age)}`);",
        answer: "Type of 'o': object -- Type of 'o.age': number",
        wrongs: ["Type of 'o': object -- Type of 'o.age': integer", "Type of 'o': array -- Type of 'o.age': number", "Type of 'o': string -- Type of 'o.age': integer"],
        formatAnswersAsCode: true,
    }, {
        prompt: "Which of the following correctly lists the elements of the box model from outside in?",
        answer: "Margin, border, padding, content",
        wrongs: ["Border, margin, padding, content", "Margin, padding, border, content", "Padding, border, margin, content"],
    }, {
        prompt: "HTML is most accurately described as a:",
        answer: "Markup language",
        wrongs: ["Programming language", "Scripting language", "Tagging language"],
    }, {
        prompt: "Select the option that shows the correct syntax for the opening tag of a 'div' element that has a class attribute of 'container'.",
        answer: "&lt;div class='container'&gt;",
        wrongs: ["&lt;div attribute='container'&gt;", "&lt;div container='class'&gt;", "div.container"],
        formatAnswersAsCode: true,
    }, {
        prompt: "A ________ is a keyword specifying which elements a group of CSS rules will apply to.",
        answer: "Selector",
        wrongs: ["Tag", "Attribute", "Property"],
    }
]; 

var startButton     = document.querySelector("#start-btn");
var hiscoreButton   = document.querySelector("#hiscore-btn");
var promptHeaderEl  = document.querySelector("#prompt-header");
var answerListEl    = document.querySelector("#answer-list");
var timerEl         = document.querySelector("#timer");

// Dom elements for the separate view sections
var endScreenSection    = document.querySelector("#end-screen");
var homeScreenSection   = document.querySelector("#home");
var hiscoreSection      = document.querySelector("#hiscore-view");
var questionFormSection = document.querySelector("#question-form");

var newHiscoreForm = document.querySelector("#new-hiscore-form");

var usedQuestions = [];
var thisQuestion;

var quizLength = 60 * 5;    // Quiz length (in seconds) (default: 5 minutes)
var questionCount = questions.length;      // Maximum number of questions in the quiz
var sessionProgress = 0;    // Counter for progress through a quiz session

var secondsLeft = quizLength; 

// Set all views to hidden
function hideAllViews() {
    endScreenSection.style.display = "none";
    homeScreenSection.style.display = "none";
    hiscoreSection.style.display = "none";
    questionFormSection.style.display = "none";

    // clear out question form
    promptHeaderEl.innerHTML = "";
    answerListEl.innerHTML = "";

    // clear out hiscore table
    document.querySelector("thead").innerHTML = "";
    document.querySelector("#hiscore-table-body").innerHTML = "";

    // clear score from end screen
    document.querySelector("#present-score").textContent = "";
}

// Show home view
function renderHomeView() {
    hideAllViews();
    homeScreenSection.style.display = "inline";
}

// Select a question at random and load the content into the question form
function showQuestion() {
    // clear the question header and list
    promptHeaderEl.innerHTML = "";
    answerListEl.innerHTML = ""; 
    sessionProgress++;

    // Select a random question from the question pool
    var qIdx;
    do {
        qIdx = Math.floor(Math.random() * questions.length)
    } while (usedQuestions.includes(qIdx));
    usedQuestions.push(qIdx);
    thisQuestion = questions[qIdx];

    promptHeaderEl.innerHTML = thisQuestion.prompt;

    var choices = [thisQuestion.answer];
    for (var i = 0; i < thisQuestion.wrongs.length; i++) {
        choices.push(thisQuestion.wrongs[i]);
    }

    var usedChoices = [];

    // for each possible answer choice: 
    //      - create a button element
    //      - create list item element
    //      - add button as child to list item element
    //      - add list item element as child to answer list such that choices are arranged randomly
    for (var i = 0; i < choices.length; i++) {
        var newBtnEl = document.createElement("button");
        if (thisQuestion.formatAnswersAsCode) {
            newBtnEl.setAttribute("class", "btn code-answer");
        } else {
            newBtnEl.setAttribute("class", "btn");
        }
        
        var idx;
        do {
            idx = Math.floor(Math.random() * choices.length)
        } while (usedChoices.includes(idx));

        usedChoices.push(idx);
        newBtnEl.innerHTML = choices[idx];

        var liEl = document.createElement("li");
        liEl.setAttribute("class", "list-group-item"); 
        liEl.appendChild(newBtnEl);
        answerListEl.appendChild(liEl);
    }
    
}

// Show section containing question form
function showQuestionFormSection() {
    hideAllViews();
    questionFormSection.style.display = "inline";
}

// Show the ending screen with form to submit user score
function showEndScreen() {

    if (secondsLeft <= 0) {
        document.querySelector("#times-up").textContent = "Time's up! ";
    } else {
        clearInterval(timerInterval)
    }

    hideAllViews();
    endScreenSection.style.display = "inline";
    document.querySelector("#present-score").textContent = `${sessionScore} / ${questions.length}`;
}

// Render list of high scores stored in localStorage
function showHiScores() {
    var scoresTable = document.querySelector("thead");
    var scoresTableBody = document.querySelector("#hiscore-table-body");

    hiscoreSection.style.display = "inline";

    var scoresListStr = localStorage.getItem("hiscores");
    if (!scoresListStr) {
        document.querySelector("#no-scores").innerHTML = "No scores to display";
        return;
    }
    document.querySelector("#no-scores").innerHTML = "";

    scoresTable.innerHTML = "<tr><th scope='col'>Name</th><th scope='col'>Score</th></tr>";

    var scoresList = JSON.parse(scoresListStr);
    for (var i = 0; i < scoresList.length; i++) {

        // Populate the hiscores table with new row and data element
        var newTableRow = document.createElement("tr");
        var newNameEntry = document.createElement("td");
        var newScoreEntry = document.createElement("td");
        newNameEntry.textContent = scoresList[i].name;
        newScoreEntry.textContent = scoresList[i].score;
        newTableRow.appendChild(newNameEntry);
        newTableRow.appendChild(newScoreEntry);
        scoresTableBody.appendChild(newTableRow);
    }

}

// Main quiz engine
var timerInterval;
function runQuiz() {
    hideAllViews();
    usedQuestions.length = 0; // clear list of used questions
    
    // Reset session progress, session score, and timer
    sessionScore = 0;
    sessionProgress = 0;
    secondsLeft = quizLength;

    var secondsStr = (secondsLeft % 60 >= 10) ? ("" + secondsLeft % 60) : ("0" + secondsLeft % 60);
    timerEl.textContent = `${Math.floor(secondsLeft / 60)}:${secondsStr} remaining`;

    // Start quiz timer
    timerInterval = setInterval(function () {
        secondsLeft--;
        var secondsStr = (secondsLeft % 60 >= 10) ? ("" + secondsLeft%60) : ("0" + secondsLeft%60);
        timerEl.textContent = `${Math.floor(secondsLeft / 60)}:${secondsStr} remaining`;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            showEndScreen();
        } 

    }, 1000);

    showQuestionFormSection();

    showQuestion();
}

// Start button on home view
startButton.addEventListener("click", function(event) {
    event.preventDefault();
    runQuiz();
});

// View High Scores button on home view
hiscoreButton.addEventListener("click", function (event) {
    event.preventDefault();
    hideAllViews();
    showHiScores();
});

// Clear High Scores button on high score view
document.querySelector("#clear-scores-btn").addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector("thead").innerHTML = "";
    document.querySelector("#hiscore-table-body").innerHTML = "";
    localStorage.clear();
    showHiScores();
});

// Go Back button on high score view
document.querySelector("#go-back-btn").addEventListener("click", function(event) {
    event.preventDefault();
    renderHomeView();
});

// Score submission form on end quiz view
newHiscoreForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    var submittedName = newHiscoreForm.children[0].children[1].value;
    newHiscoreForm.children[0].children[1].value = "";
    if (submittedName === "") {
        alert("Please enter a name or initials");
        return;
    }
    hideAllViews();

    var newScore = {
        name: submittedName,
        score: sessionScore
    };

    var scoresListStr = localStorage.getItem("hiscores");
    if (!scoresListStr) {
        var scores = [newScore];
        localStorage.setItem("hiscores", JSON.stringify(scores));
    } else {
        var scores = JSON.parse(scoresListStr);
        var i = 0;

        while (i < scores.length && newScore.score < scores[i].score) {
            i++;
        }

        scores.splice(i, 0, newScore);
        localStorage.setItem("hiscores", JSON.stringify(scores));
    }

    showHiScores();
});

// Event listener for list of answer buttons
answerListEl.addEventListener("click", function (event) {
    event.preventDefault();
    
    if (event.target.tagName.toLowerCase() !== "button") {
        return;
    }

    var message;
    if (event.target.innerHTML === thisQuestion.answer) {
        message = document.querySelector("#correct-msg");
        message.textContent = "Correct!";
        sessionScore++;
    } else {
        message = document.querySelector("#incorrect-msg")
        message.textContent = "Incorrect! (-20s)";
        secondsLeft -= 20;
    }

    message.style.visibiity = 0;
    message.style.opacity = 0;

    setTimeout(function () {
        message.textContent = "";
        message.style.visibiity = 1;
        message.style.opacity = 1;
    }, 750);

    if (sessionProgress < questionCount && secondsLeft > 0) {
        showQuestion();
    } else if (sessionProgress === questionCount) {
        showEndScreen();
    }
});
var questions = [
    {
        prompt: "JSON stands for: ",
        answer: "JavaScript Object Notation",
        wrongs: ["JavaScript Order Naming", "JavaScript Order Notation", "JavaScript Object Naming"],
    }, {
        prompt: "What is the value of 'x' after the following block of code is executed? <br><p><code>var x = 10;<br><br>function adder(x, y) {<br><span class='tabbed-code'>return x + y;</span><br>}<br><br>x = adder(x, 10);<code></p>",
        answer: "20",
        wrongs: ["10", "30", "11"],
    }, {
        prompt: "Unlike some other programming languages, JavaScript does not require you to specify the data type of variables when they're created. Because of this, JavaScript is reffered to as a ________ language.",
        answer: "Weakly-typed",
        wrongs: ["Strongly-typed", "Parametric", "Functional"],
    }, {
        prompt: "Hello, I love you, won't you tell me your name?",
        answer: "Fine, thanks.",
        wrongs: ["wrong1", "wrong2", "wrong3"],
    }// , {
    //     prompt: "",
    //     answer: "",
    //     wrongs: ["", "", ""],
    // }, {
    //     prompt: "",
    //     answer: "",
    //     wrongs: ["", "", ""],
    // }, {
    //     prompt: "",
    //     answer: "",
    //     wrongs: ["", "", ""],
    // }, {
    //     prompt: "",
    //     answer: "",
    //     wrongs: ["", "", ""],
    // }, {
    //     prompt: "",
    //     answer: "",
    //     wrongs: ["", "", ""],
    // }, {
    //     prompt: "",
    //     answer: "",
    //     wrongs: ["", "", ""],
    // }, {
    //     prompt: "",
    //     answer: "",
    //     wrongs: ["", "", ""],
    // }
]; 

var startButton     = document.querySelector("#start-btn");
var hiscoreButton   = document.querySelector("#hiscore-btn");
var promptHeaderEl  = document.querySelector("#prompt-header");
var answerListEl    = document.querySelector("#answer-list");
var timerEl         = document.querySelector("#timer");

var endScreenSection = document.querySelector("#end-screen");
var homeScreenSection = document.querySelector("#home");
var hiscoreSection = document.querySelector("#hiscore-view");
var questionFormSection = document.querySelector("#question-form");

var newHiscoreForm = document.querySelector("#new-hiscore-form");

var usedQuestions = [];
var thisQuestion;

function showQuestion() {
    // clear the question header and list
    promptHeaderEl.innerHTML = "";
    answerListEl.innerHTML = ""; 

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
    for (var i = 0; i < choices.length; i++) {
        // create a button element
        // create list item element
        // add button as child to list item element such that the choices are arranged randomly
        var newBtnEl = document.createElement("button");
        newBtnEl.setAttribute("class", "btn");
        
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

function hideAllViews() {
    endScreenSection.style.display = "none";
    homeScreenSection.style.display = "none";
    hiscoreSection.style.display = "none";
    questionFormSection.style.display = "none";
}

function renderHomeView() {
    hideAllViews();
    homeScreenSection.style.display = "inline";
}

function runQuiz() {
    hideAllViews();
    usedQuestions.length = 0; // clear list of used questions
    showQuestionFormSection();

    // Reset session progress, session score, and timer
    sessionScore = 0;
    sessionProgress = 0;
    secondsLeft = 120;

    // Start quiz timer
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = `${secondsLeft} seconds remaining`;

        if (secondsLeft <= 0 || sessionProgress === questionCount) {
            clearInterval(timerInterval);
            showEndScreen();
        } 

    }, 1000);

    showQuestion();
}

function showQuestionFormSection() {
    questionFormSection.style.display = "inline";
}

function showEndScreen() {
    if (secondsLeft <= 0) {
        document.querySelector("#times-up").innerHTML = "Time's up! ";
    }
    hideAllViews();
    endScreenSection.style.display = "inline";
    secondsLeft = 0;
    document.querySelector("#present-score").innerHTML = sessionScore;
    // show score
    // present form for initial enter

    

}

// Render list of high scores stored in localStorage
function showHiScores() {
    var scoresListEl = document.querySelector("#hiscore-list");
    scoresListEl.innerHTML = "";

    hiscoreSection.style.display = "inline";

    var scoresListStr = localStorage.getItem("hiscores");
    if (!scoresListStr) {
        document.querySelector("#no-scores").innerHTML = "No scores to display";
        return;
    }
    document.querySelector("#no-scores").innerHTML = "";

    var scoresList = JSON.parse(scoresListStr);
    for (var i = 0; i < scoresList.length; i++) {
        var newLi = document.createElement("li");
        newLi.innerHTML = `${scoresList[i].name} - ${scoresList[i].score}`;
        scoresListEl.appendChild(newLi);
    }
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


var secondsLeft = 120; // Quiz length (in seconds)
var questionCount = 4; // Maximum number of questions in the quiz
var sessionProgress = 0; // Counter for progress through a quiz session

answerListEl.addEventListener("click", function (event) {
    event.preventDefault();
    
    var targetTag = event.target.tagName.toLowerCase();

    if (targetTag !== "button") {
        return;
    }

    sessionProgress++;

    if (targetTag === 'button' && event.target.textContent === thisQuestion.answer) {
        // show "correct"
        sessionScore++;
        if (sessionProgress < questionCount && secondsLeft > 0) {
            showQuestion();
        } else if (sessionProgress === questionCount) {
            showEndScreen();
        }

    } else {
        // show "incorrect"
        secondsLeft -= 10;
        if (sessionProgress < questionCount && secondsLeft > 0) {
            showQuestion();
        } else if (sessionProgress === questionCount) {
            showEndScreen();
        }
    }
});
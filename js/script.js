var questions = [
    {
        prompt: "Hello, how are you?",
        answer: "Fine, thanks.",
        wrongs: ["wrong1", "wrong2", "wrong3"],
        used: false
    }, {
        prompt: "How's the weather?",
        answer: "It's raining",
        wrongs: ["wrong1", "wrong2", "wrong3"],
        used: false
    }, {
        prompt: "How old are you?",
        answer: "2222",
        wrongs: ["wrong1", "wrong2", "wrong3"],
        used: false
    }, {
        prompt: "Hello, I love you, won't you tell me your name?",
        answer: "Fine, thanks.",
        wrongs: ["wrong1", "wrong2", "wrong3"],
        used: false
    }
];

var startButton     = document.querySelector("#start-btn");
var hiscoreButton   = document.querySelector("#hiscore-btn");
var promptHeaderEl  = document.querySelector("#prompt-header");
var answerListEl    = document.querySelector("#answer-list");
var timerEl         = document.querySelector("#timer");

var endScreenSection = document.querySelector("#end-screen");
var homeScreenSection = document.querySelector("#home");

var newHiscoreForm = document.querySelector("#new-hiscore-form");

newHiscoreForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var newScore = {
        name: newHiscoreForm.children[0].children[1].value,
        score: -10
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

});

var usedQuestions = [];
var thisQuestion;

answerListEl.addEventListener("click", function (event) {
    if (event.target.textContent === thisQuestion.answer) {
        // show "correct"
        correct = true;
    } else {
        // show "incorrect"
        correct = false;
    }
});

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

    promptHeaderEl.textContent = thisQuestion.prompt;

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
        } while (used.includes(idx));

        usedChoices.push(idx);
        newBtnEl.innerHTML = choices[idx];

        var liEl = document.createElement("li");
        liEl.setAttribute("class", "list-group-item");
        liEl.appendChild(newBtnEl);
        answerListEl.appendChild(liEl);
    }

    return correct;
}

function runQuiz() {
    homeScreenSection.style.display = "none";
    hiscoreButton.style.justifyContent = "right";

    // Start quiz timer
    // var secondsLeft = 120;
    // var timerInterval = setInterval(function () {
    //     secondsLeft--;
    //     timerEl.textContent = `${secondsLeft} seconds remaining`;

    //     if (secondsLeft === 0) {
    //         clearInterval(timerInterval);
            
    //     }

    // }, 1000);


    endQuiz();
}

function endQuiz() {
    endScreenSection.style.display = "inline";
    // show score
    // present form for initial enter

    

}

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    runQuiz();
});

hiscoreButton.addEventListener("click", function (event) {
    event.preventDefault();
    showHiScores();
});

function showHiScores() {

}


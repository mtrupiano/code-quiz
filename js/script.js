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
        prompt: "How old are you",
        answer: "2222",
        wrongs: ["wrong1", "wrong2", "wrong3"],
        used: false
    }, {
        prompt: "Hello, how are you?",
        answer: "Fine, thanks.",
        wrongs: ["wrong1", "wrong2", "wrong3"],
        used: false
    }
];

var homeContainer = document

var startButton = document.querySelector("#start-btn");
var hiscoreButton = document.querySelector("#hiscore-btn");

var promptHeader = document.querySelector("#prompt-header");
var answerList = document.querySelector("#answer-list");

var timerElement = document.querySelector("#timer");

function showQuestion() {
    // clear the question header and list
    promptHeader.innerHTML = "";
    answerList.innerHTML = ""; 

    var thisQuestion = questions[0];

    promptHeader.textContent = thisQuestion.prompt;

    var choices = [thisQuestion.answer];
    for (var i = 0; i < thisQuestion.wrongs.length; i++) {
        choices.push(thisQuestion.wrongs[i]);
    }

    var used = [];
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

        used.push(idx);
        newBtnEl.innerHTML = choices[idx];

        var liEl = document.createElement("li");
        liEl.setAttribute("class", "list-group-item");
        liEl.appendChild(newBtnEl);
        answerList.appendChild(liEl);
    }

}

function runQuiz() {
    startButton.style.display = "none";
    hiscoreButton.style.justifyContent = "right";
    showQuestion();
    var secondsLeft = 120;
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = `${secondsLeft} seconds remaining`;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            
        }

    }, 1000);


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
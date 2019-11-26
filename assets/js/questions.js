var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    ///etc.
];

var question_titleEl = document.getElementById("question_title");
var resultEl = document.getElementById("result");
var buttonsDivEl = document.getElementById("buttons");
var timeValueEl = document.getElementById("timeValue");
var currentQNum = 0;
var secondsLeft = 0;

startTimer(secondsLeft);
displayQuestion(0);

var timerInterval;
function startTimer() {
    // initalize Time (15sec * NumOfQuestions)
    secondsLeft = 15 * questions.length;
    timeValueEl.textContent = secondsLeft;
    timerInterval = setInterval(function () {
        secondsLeft--;
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            displayFinalScore();
        }
        timeValueEl.textContent = secondsLeft;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function penalty() {
    secondsLeft = secondsLeft - 10;
}

// This function displays question and buttons for currentQNum. 
function displayQuestion() {
    var currentTitle = questions[currentQNum].title;
    var currentChoices = questions[currentQNum].choices;
    var currentAnswer = questions[currentQNum].answer;

    question_titleEl.textContent = "Q" + (currentQNum + 1) + ": " + currentTitle;
    // Add buttons
    for (var i = 0; i < currentChoices.length; i++) {
        var buttonEl = document.createElement("input");
        buttonEl.setAttribute("type", "button");
        buttonEl.setAttribute("id", i); // name = 0, 1, 2, 3...
        buttonEl.setAttribute("class", "button answerButton");
        buttonEl.setAttribute("value", (i + 1) + ". " + currentChoices[i]);
        buttonsDivEl.appendChild(buttonEl);
    }

    for (var i = 0; i < currentChoices.length; i++) {
        // 'i' is buttonID 
        document.getElementById(i).addEventListener("click", verifyAnswer)
    }
}

// This function verifys answer when a button is clicked.  
function verifyAnswer() {
    // alert("verifyAnswer: " + indexNum + ", " + event.target.id);
    // event.target.id is 'id' for the clicked button.
    var selectedButtonID = event.target.id;
    var selectedAnswer = questions[currentQNum].choices[selectedButtonID];
    var expectedAnswer = questions[currentQNum].answer;

    // Display result.
    if (selectedAnswer === expectedAnswer) {
        // Answer is correct
        // Play sound
        var correctSound = new Audio("./assets/sound/Quiz-Correct_Answer01-1.mp3");
        correctSound.play();
        // Display result
        resultEl.innerHTML = "<div class=\"line\"></div> <div class=\"correct\">Correct!</div>";
        // sleep 1 sec, then call goToNextQuestion()
        setTimeout(function () {
            goToNextQuestion();
        }, 1000);
    } else {
        // Answer is wrong
        resultEl.innerHTML = "<div class=\"line\"></div> <div class=\"wrong\">Wrong!</div>";
        var wrongSound = new Audio("./assets/sound/Quiz-Wrong_Buzzer01-1.mp3");
        wrongSound.play();
        penalty();
    }
}

function goToNextQuestion() {
    clearScreen();
    var nextQnum = currentQNum + 1;
    // Check if there is next Q, 
    if (nextQnum < questions.length) {
        // if yes, then display next question.
        currentQNum = currentQNum + 1;
        displayQuestion();
    } else {
        // if no, display all done page!
        console.log("All done!");
        displayFinalScore();
    }
}

function clearScreen() {
    // Clear previous Question 
    question_title.textContent = " "
    // Clear previous result.
    resultEl.innerHTML = " ";
    // Clear buttons
    // Must iterate backwards as the array is re-indexed while removing.
    var buttonsEl = buttonsDivEl.children;
    for (var i = buttonsEl.length - 1; i >= 0; i--) {
        buttonsEl[i].remove();
    }
}

function displayFinalScore() {
    var resultSound = new Audio("./assets/sound/Quiz-Results02-1.mp3");
    resultSound.play();


    // If time is negative value, reset to the time to 0 
    if (secondsLeft < 0) {
        secondsLeft = 0;
        timeValueEl.textContent = secondsLeft;
    }

    var allDoneText = "<h1>All done!</h1>" +
        "Your final score is " + secondsLeft + "<br>" +
        "Enter initals: <input type=\"text\" id=\"initial\">" +
        "<input type=\"submit\" id=\"submit\" value=\"submit\" class=\"button\" style=\"margin-left: 10px;\">";
    document.getElementById("quizContainer").innerHTML = allDoneText;
    stopTimer();
    // AddEventListener for Submit button
    document.getElementById("submit").addEventListener("click", processSubmit);
    // AddEventListener for pressing Enter key in textbox
    document.getElementById("initial").addEventListener("keyup", function (event) {
        //console.log(event);
        if (event.keyCode === 13) {
            // 13 is Enter key
            processSubmit();
        }
    }
    );
}


function processSubmit() {
    console.log("processSubmit()");
    var submitEl = document.getElementById("submit");
    //console.log(submitEl);
    var initalStr = document.getElementById("initial").value.trim();
    //console.log("initialStr: "+ initalStr);
    //Validate entry. 
    if (initalStr === "") {
        // Do not open Highscores page when text input is empty. 
        alert("Please enter initials.")
        return;
    }

    var initalsAndScore = new Array();
    var existingScores = new Array();
    var newScores = new Array();
    existingScores = JSON.parse(localStorage.getItem("scores"));

    console.log("existingScores: ", existingScores);
    console.log("existingScores typeof: ", typeof existingScores);

    newScoreJSON = { "initial": initalStr, "score": secondsLeft };

    // check null. You cannot push to existingScores if it's null. 
    if (existingScores == null) {
        newScores.push(newScoreJSON);
        localStorage.setItem("scores", JSON.stringify(newScores));
    } else {
        existingScores.push(newScoreJSON);
        localStorage.setItem("scores", JSON.stringify(existingScores));
    }

    //console.log(newScores);

    // Open the Highscores page.
    location.href = "highscores.html";
}

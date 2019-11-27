
setDropDown();
createTable();

function setDropDown() {
    var selectedQuiz = getCookie("selectedQuiz");
    console.log("selectedQuiz: " + selectedQuiz);
    document.getElementById("quizType").value = selectedQuiz;
}

function createTable() {
    console.log("createTable");
    clearTable();

    var quizType = document.getElementById("quizType").value;
    var localStorageKey = "";

    //console.log("quizType:" + quizType);

    if (quizType === "jsQuiz") {
        localStorageKey = "jsScores";
    } else if (quizType === "htmlQuiz") {
        localStorageKey = "htmlScores";
    }
    //console.log("localStorageKey:" + localStorageKey);

    // 'valuesArr' is array of JSON objects {"initial": "xx", "score": 15}
    var valuesArr = JSON.parse(localStorage.getItem(localStorageKey));
    // console.log("values: ", values);

    // If valuesArr is empty, it is not necessary to create table.
    if (valuesArr === null) {
        return;
    }

    // sort array by score 
    valuesArr.sort(function (a, b) {
        return (b.score - a.score)
    })

    // Add table
    var highscoresTableEl = document.createElement("TABLE");
    highscoresTableEl.setAttribute("id", "scoreTable")
    var stp = document.getElementById("scoreTableSpan");
    stp.appendChild(highscoresTableEl);
    for (var i = 0; i < valuesArr.length; i++) {
        // Add each row
        var str = i + ". " + valuesArr[i].initial + " - " + valuesArr[i].score;
        var row = highscoresTableEl.insertRow(i);
        var newCell = row.insertCell(0);
        newCell.innerHTML = str;
    }
}

function clearTable() {
    var scoreTable = document.getElementById("scoreTable");
    if (scoreTable != null) {
        scoreTable.parentElement.removeChild(scoreTable);
    }
}

var removeHighscores = function() {
    var quizType = document.getElementById("quizType").value;
    var localStorageKey = "";

    if (quizType === "jsQuiz") {
        localStorageKey = "jsScores";
    } else if (quizType === "htmlQuiz") {
        localStorageKey = "htmlScores";
    }

    localStorage.removeItem(localStorageKey);
    var st = document.getElementById("scoreTable");
    //console.log(st);
    st.parentNode.removeChild(st);
    createTable();
}

var clearHighscoresButtonEl = document.getElementById("clearHighscores");
clearHighscoresButtonEl.addEventListener("click", removeHighscores);


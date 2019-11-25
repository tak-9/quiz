
createTable();

function createTable() {
    // 'valuesArr' is array of JSON objects {"initial": "xx", "score": 15}
    var valuesArr = JSON.parse(localStorage.getItem("scores"));
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


var removeHighscores = function() {
    localStorage.removeItem("scores");
    var st = document.getElementById("scoreTable");
    console.log(st);
    st.parentNode.removeChild(st);
    createTable();
}

var clearHighscoresButtonEl = document.getElementById("clearHighscores");
clearHighscoresButtonEl.addEventListener("click", removeHighscores);


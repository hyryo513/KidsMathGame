//global vars
var quizArray = [
    {
        "question": "1+1=?",
        "correctAnswer": "2",
        "answers": [0, 1, 2, 3]
    },
    {
        "question": "2+3=?",
        "correctAnswer": "5",
        "answers": [6, 3, 4, 5]
    },
    {
        "question": "2+8=?",
        "correctAnswer": "10",
        "answers": [7, 10, 15, 16]
    },
    {
        "question": "1-1=?",
        "correctAnswer": "0",
        "answers": [0, 1, 2, 4]
    },
    {
        "question": "2-1=?",
        "correctAnswer": "1",
        "answers": [0, 1, 2, 4]
    },
    {
        "question": "10+10=?",
        "correctAnswer": "20",
        "answers": [10, 20, 30, 40]
    }
]

var intervalId;

var number = 10;

var quizNumber = 0;

var answerClicked = false;

var totalQuiz = 0;

var numberCorrectAnswer = 0;

var numberIncorrectAnswer = 0;

//functions
function initialization(){
    clearStart();
    clearTime();
    clearQuestion();
    clearAnswer();
    clearResult();
    totalQuiz = quizArray.length;
    numberCorrectAnswer = 0;
    numberIncorrectAnswer = 0;
    number = 10;
    quizNumber = 0;
    answerClicked = false;
    timer();
    showAnswers();

}


function timer(){
    number = 10;
    $("#time").html("<h2>Time Remaining: " + number + " Seconds</h2>");
    $("#question").html("<h3>" + quizArray[quizNumber].question + "</h3>");
    if(!intervalId){intervalId = setInterval(decrement, 1000);};
}

function decrement(){
    number--;
    $("#time").html("<h2>Time Remaining: " + number + " Seconds</h2>");
    if (number === 0) {
    timeout();
    }
}

function timeout() {
    answerClicked = true;
    stopTimer()
    if(quizNumber < totalQuiz - 1) {
        $("#result").html("<h2>Out of time! The correct answer is " + quizArray[quizNumber].correctAnswer + "</h2>");
        resultBtn()
    }
    else {
        $("#result").html("<h2>Out of time! The correct answer is " + quizArray[quizNumber].correctAnswer + "</h2>");
        resultOnlyBtn();
    }
}

function showAnswers(){
    $("#answer").html("");
    for(var i=0; i<quizArray[quizNumber].answers.length; i++){
        var answerBtn = $("<button>");
        answerBtn.addClass("clearfix answerBtn");
        answerBtn.attr("data-answer", quizArray[quizNumber].answers[i]);
        answerBtn.text(quizArray[quizNumber].answers[i]);
        $("#answer").append(answerBtn);
    }
    answerClicked = false;
}

function resultBtn(){
    var nextBtn = $("<button>");
    nextBtn.addClass("nextBtn");
    nextBtn.text("Next Question!");
    $("#result").append(nextBtn);
    var doneBtn = $("<button>");
    doneBtn.addClass("doneBtn");
    doneBtn.text("I'm Done!");
    $("#result").append(doneBtn);
}

function resultOnlyBtn(){
    $("#result").append("<h2>This is the last question. Click below button to see the final results!</h2>");
    var doneBtn = $("<button>");
    doneBtn.addClass("doneBtn");
    doneBtn.text("See Results");
    $("#result").append(doneBtn);
}

function stopTimer(){
    clearInterval(intervalId);
    intervalId = null;
}

function clearResult(){
    $("#result").html("");
}

function clearTime(){
    $("#time").html("");
}

function clearQuestion(){
    $("#question").html("");
}

function clearAnswer(){
    $("#answer").html("");
}

function clearStart(){
    $("#startUp").html("");
}

function showResult(){
    $("#result").append("<h3>All Done!</h3>");
    $("#result").append("<p>Correct Answers: " + numberCorrectAnswer + "</p>");
    $("#result").append("<p>Incorrect Answers: " + numberIncorrectAnswer + "</p>");
    $("#result").append("<p>Unanswers: " + (totalQuiz - numberCorrectAnswer - numberIncorrectAnswer) + "</p>");
    var startBtn = $("<button>");
    startBtn.addClass("startBtn");
    startBtn.text("Start Over?");
    $("#result").append(startBtn);
}

//script starts
$(document).on("click", ".answerBtn", function(){
    if(!answerClicked){
        stopTimer()
        if($(this).attr("data-answer") === quizArray[quizNumber].correctAnswer){             
            $("#result").html("<h2>You are correct!</h2>");
            if (quizNumber < totalQuiz - 1){
                resultBtn();
            }
            else {
                resultOnlyBtn();
            };
            numberCorrectAnswer++;
        }
        else{
            $("#result").html("<h2>You are wrong! The correct answer is " + quizArray[quizNumber].correctAnswer + "</h2>");
            if (quizNumber < totalQuiz - 1){
                resultBtn();
            }
            else {
                resultOnlyBtn();
            };
            numberIncorrectAnswer++;
        }
        answerClicked = true;
    }
});

$(document).on("click", ".nextBtn", function(){
    quizNumber++;
    timer();
    showAnswers();
    clearResult();
});

$(document).on("click", ".doneBtn", function(){
    clearTime();
    clearQuestion();
    clearAnswer();
    clearResult();
    showResult();
});

$(document).on("click", ".startBtn", function(){
    initialization();
});




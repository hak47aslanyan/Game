/** Variables */
let questBox = document.querySelector('.questions-box'), // Get Div For Questions screen
    ansBoxes = document.querySelectorAll('.answers-box__item'),
    // Get All Divs for screen Answers
    letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    quests = [], // Varibale for getting Letters with Index number and save it in Object
    questLetter, // Current Random Letter for Question
    curNumber, // Current Index
    questContent, // Question
    randAnsBox, // Div for answer
    curVal, // Number For Sum with Letter
    scoreBox = document.querySelector('.score-box'), // Div For Screening Score Value   
    biteFlag = false,
    bounce = 0,
    isWinner = false,
    score = +sessionStorage.getItem('score') || 0;
/**Cursor */
// Changing Cursor for Page
document.getElementsByTagName("body")[0].style.cursor = "url('http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur'), auto";

/** Logic */

console.log(quests);


setInterval(function(){
    scoreBox.textContent = score;
},0.1)

function createQuestObj() {
    for (let i = 0; i < letters.length; i++) {
        quests.push({
            keyCode: i, // Index Number
            value: letters[i], // Letter Value
        });
    }
}

function getRandomQuest() {
    questLetter = quests[Math.floor(Math.random() * quests.length)]; // Get Random Letter from Array
    console.log(questLetter);
}

function addQuestBoxContent() {
    let min = 2, // Minimum range for Random Generator
        max = quests.length - questLetter.keyCode; // Maximum range for Random Generator
    console.log("Min: " + min);
    console.log("Max: " + max);
    console.log(quests.length);
    curNumber = Math.floor(Math.random() * (max - min) + min - 1);
    console.log(curNumber);
    questContent = questLetter.value + " + " + curNumber;
    questBox.textContent = questContent;
    console.log(questLetter.value);
}

function addAnswerBoxContent() {
    randAnsBox = ansBoxes[Math.floor(Math.random() * ansBoxes.length)]; // Get Random Box For Answer
    curVal = quests[questLetter.keyCode + curNumber]; // Get the Current Answer
    console.log(curVal);
    randAnsBox.textContent = curVal.value;
}

function addFalseAnswersInBox() {
    for (let i = 0; i < ansBoxes.length; i++) {
        const element = ansBoxes[i];
        if (element.textContent == "") {
            element.textContent = quests[Math.floor(Math.random() * quests.length)].value;
        };
    };
};

function checkAnswer() {
    let isTrue = false;

    var check = setInterval(function () {
            ansBoxes.forEach((element) => {
                element.addEventListener('click', function () {
                    if (!isTrue) {
                        isTrue = true;
                        if (element.textContent == curVal.value) {
                            questBox.style.color = 'green';
                            questBox.textContent = "You Win!";
                            stopInterval()
                            calcScore(true);
                        } else {
                            questBox.style.color = 'red';
                            questBox.textContent = "You Lose!";
                            stopInterval()
                            calcScore(false);
                        };
                    } else {
                        clearInterval(check)
                    }
                });
            })
        },
    10);
};


function stopInterval() {
    setTimeout(() => {
        window.location.href = window.location.href
    }, 2000)
    clearInterval(this.check);
}

function timer() {
    let timer = 59;
    let timerBox = document.querySelector('.timer');
    let timerCalc = setInterval(function () {
        timerBox.style.color = 'green';
        if (timer == 0) {
            clearInterval(timerCalc);
            questBox.style.color = "orange";
            questBox.textContent = "Time Out";
            setTimeout(function () {
                window.location.href = window.location.href
            }, 2000)
        } else if (timer <= 5 && timer >= 3) {
            timerBox.style.color = 'orange';
        } else if (timer < 4) {
            timerBox.style.color = 'red';
        }
        timerBox.textContent = timer;
        timer--;
    }, 1000);
};

function bite() {
    console.log(ansBoxes);
    let bBox = document.querySelector('.bite');
    bBox.addEventListener('click', function () {
        for (let i = 0; i < ansBoxes.length; i++) {
            let curRandBox = ansBoxes[Math.floor(Math.random() * ansBoxes.length)]
            if (bounce == 2) {
                break;
            }
            if (curRandBox.innerHTML !== randAnsBox.innerHTML) {
                calcScoreForBite();
                bounce++;
                curRandBox.style.display = 'none';
            }
        }
    });
}

function win() {
    if (!isWinner) {
        let block = document.createElement('div');
        block.className = 'block';
        console.log(block);
        isWinner = true;
    }
}

function questChange() {
    let qcBox = document.querySelector('.change');
    qcBox.addEventListener('click', function () {
        calcScoreForChange();
        setTimeout(function(){
            window.location.href = window.location.href
        },1000)
    });
}

function calcScore(value){
    if(value){
        score++;
    }else{
        score--;
    }
    sessionStorage.setItem('score',score);
    scoreBox.textContent = sessionStorage.getItem('score')
}
function calcScoreForBite(){
    score = score - 1;
    sessionStorage.setItem('score',score);
    scoreBox.textContent = sessionStorage.getItem('score')
}
function calcScoreForChange(){
    score = score - 3;
    sessionStorage.setItem('score',score);
    scoreBox.textContent = sessionStorage.getItem('score')
}

/** Global Functions */

(function game() {
    timer();
    questChange();
    createQuestObj();
    getRandomQuest();
    addQuestBoxContent();
    addAnswerBoxContent();
    bite();
    addFalseAnswersInBox();
    checkAnswer();
})();
const numberInput = document.getElementById('numberInput');
const enteredNumbers = document.getElementById('enteredNumbers');
const remainingAttempts = document.getElementById('attempts');
const result = document.getElementById('result');
const digits = document.getElementById('digits');
const clearButton = document.getElementById('clearButton');
const submitButton = document.getElementById('submitButton');

let value;
let mainNumber;
let numberArray = [];
let attempts = 10;
let playGame = true;

let randomNumber = Math.floor(Math.random() * 100 + 1);

if (playGame) {
    digits.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            value = Number(event.target.innerHTML);

            mainNumber = numberInput.innerHTML += value;

        }
    })

    // clear Number
    clearButton.addEventListener('click', function (event) {
        numberInput.innerHTML = ''
    })

    submitButton.addEventListener('click', function (event) {
        if (mainNumber == undefined) {
            alert('Please Enter a Valid Number')
            numberInput.innerHTML = '';
            return;
        } else if (mainNumber < 1 || mainNumber > 100) {
            alert('Please Enter a Number between 1 to 100')
            numberInput.innerHTML = '';
            return;
        } else if (mainNumber < randomNumber) {
            printResult(`Special Number is Greater than ${mainNumber}`)
            cleanUpValues(mainNumber)
        } else if (mainNumber > randomNumber) {
            printResult(`Special Number is Lower than ${mainNumber}`)
            cleanUpValues(mainNumber)
        } else if (mainNumber == randomNumber) {
            printResult(`🎉 Correct! Your Special Number was ${randomNumber}`)
            cleanUpValues(mainNumber)
            document.body.classList.add('win');
            endGame();
        }

        // check agter guess
        if (attempts === 0) {
            if (mainNumber != randomNumber) {
                printResult(`😢 Try Again! Special Number was ${randomNumber}`)
                document.body.classList.add('lose');
            }
            endGame();
        }
    })

    // clean Up Values
    function cleanUpValues(mainNumber) {
        numberInput.innerHTML = '';
        numberArray.push(mainNumber);
        enteredNumbers.innerHTML = numberArray;
        attempts -= 1;
        remainingAttempts.innerHTML = attempts;

    }

    // function print Result
    function printResult(message) {
        result.innerHTML = `${message}`
    }

    // function endGame
    function endGame() {
        let allDigits = digits.querySelectorAll('button');
        allDigits.forEach((button) => {
            button.disabled = true;
        })
        clearButton.disabled = true;
        submitButton.disabled = true;
        playGame = false;

        const startAgain = document.createElement('button');
        startAgain.innerHTML = `Start Again`;
        document.getElementById('game').appendChild(startAgain);
        startAgain.addEventListener('click', function (event) {
            numberArray = [];
            attempts = 10;
            allDigits.forEach((button) => {
                button.disabled = false;
            })
            clearButton.disabled = false;
            submitButton.disabled = false;
            result.innerHTML = '';
            remainingAttempts.innerHTML = 10;
            randomNumber = Math.floor(Math.random() * 100 + 1);
            enteredNumbers.innerHTML = ''
            document.body.classList.remove('win', 'lose');
            mainNumber = undefined;
            startAgain.remove();
            playGame = true;

        })

    }
}

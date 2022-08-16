
const readlineSync = require('readline-sync');
let num;
let result = 0;
let noResult = 0;



function random(min, max) {
    return Math.floor(Math.random()*(max-min)) + min;
}

function genRandom() {
    let randNumber = '';
    let n;
    num = random(3,6);
    for(let i = 0; i < num; i++) {
        do {
            n = random(0,9)
        } while (randNumber.indexOf(n) >= 0);
        randNumber += n;
    }
    return randNumber
}

function getAnswer() {
    console.log('Введите число')
    return readlineSync.question();
}

function compareNumbers(num1, num2) {
    result = 0;
    noResult = 0;

    for(let i = 0; i < num; i++) {
        if(num1[i] === num2[i]) {
            result ++;
        } else if(num2.indexOf(num1[i]) >= 0) {
            noResult ++;
        }
    }
}

function game() {
    let num1 = genRandom();
    console.log(num1)

    if(num === 3) {
        console.log('Угадайте трехзначное число')
    } else if(num === 4) {
        console.log('Угадайте четырехзначное число')
    } else if(num === 5) {
        console.log('Угадайте пятизначное число')
    } else {
        console.log('Угадайте шестизначное число')
    }


    for(let i = 0; i < 10; i++) {
        let num2 = getAnswer()

        if (num1 === num2) {
            console.log('Вы выиграли')
            break;
        }

        compareNumbers(num1, num2)
        console.log(`Количество совпавших цифр на своих местах ${result} '\n' Количество совпавших цифр не на своих местах ${noResult}`)

    }

}

game();


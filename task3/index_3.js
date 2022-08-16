// Задача 3. Быки и коровы
// Компьютер загадывает число из нескольких различающихся цифр (от 3 до 6). Игроку дается несколько попыток на то, чтобы угадать это число.

// После каждой попытки компьютер сообщает количество совпавших цифр стоящих не на своих местах, а также количество правильных цифр на своих местах.

// Например загаданное число: 56478 предположение игрока: 52976

// ответ: совпавших цифр не на своих местах - 1 (6), цифр на своих местах - 2 (5 и 7)

// игра ведется до окончания количества ходов либо до отгадывания

// Кстати, в Fallout 3, Fallout New Vegas и Fallout 4 для взлома терминалов используется очень похожая мини игра.

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


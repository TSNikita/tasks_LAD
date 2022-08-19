const readlineSync = require('readline-sync');

monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}

player = {
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
}


let cooldownMag = 4; //очки действий
let cooldownMonster = 4; //очки действий


function actionMonster() {
    let moves = [];
    while(true) {
        if(cooldownMonster > 0 ) {
            let action = Math.floor(Math.random() * 3)
            if(monster.moves[action].cooldown <= cooldownMonster) {
                moves.push(action)
                cooldownMonster -= monster.moves[action].cooldown;
                console.log(`Компьютер делает ход: ${monster.moves[action].name}`);
                if(moves.length == 1) {
                    return moves;
                }
            }
        } else {
            return moves;
        }
    }
}


function actionPlayer() {
    let moves = [];
    while(true) {
        if(cooldownMag > 0) {
            for(key in player.moves) {
                if(player.moves[key].cooldown <= cooldownMag) {
                    console.log(`Доступные действия: ${key} - ${player.moves[key].name}`)
                }
            }
            let action = readlineSync.question('Delai xod: ')
            if(player.moves[action].cooldown <= cooldownMag) {
                moves.push(action)
                cooldownMag -= player.moves[action].cooldown;
                console.log(`Ход игрока Евстафия: ${player.moves[action].name}`)
                if(moves.length == 1) {
                    return moves;
                }
            }
        } else {
            return moves;
        }
    }
}


function game(health) {
    let player_health = health;
    let monster_health = monster.maxHealth;
    while(true) {
        if(player_health > 0 && monster_health > 0 ) {
            let monsterAction = actionMonster();
            let playerAction = actionPlayer();

            let temp_monster = {
                "physicalDmg": 3, // физический урон
                "magicDmg": 0,    // магический урон
                "physicArmorPercents": 20, // физическая броня
                "magicArmorPercents": 20,  // магическая броня
                "cooldown": 0     // ходов на восстановление
            }

            let temp_player = {
                "physicalDmg": 2,
                "magicDmg": 0,
                "physicArmorPercents": 0,
                "magicArmorPercents": 50,
                "cooldown": 0
            }

            for(let action of monsterAction) {
                temp_monster.physicalDmg += monster.moves[action].physicalDmg;
                temp_monster.magicDmg += monster.moves[action].magicDmg;
                temp_monster.physicArmorPercents += monster.moves[action].physicArmorPercents;
                temp_monster.magicArmorPercents += monster.moves[action].magicArmorPercents;
            }

            for(let action of playerAction) {
                temp_player.physicalDmg += monster.moves[action].physicalDmg;
                temp_player.magicDmg += monster.moves[action].magicDmg;
                temp_player.physicArmorPercents += monster.moves[action].physicArmorPercents;
                temp_player.magicArmorPercents += monster.moves[action].magicArmorPercents;
            }

            player_health = player_health - (temp_monster.physicalDmg - ((temp_monster.physicalDmg/100)*temp_player.physicArmorPercents) + temp_monster.magicDmg - ((temp_monster.magicDmg/100)*temp_player.magicArmorPercents));
            monster_health = monster_health - (temp_player.physicalDmg - ((temp_player.physicalDmg/100)*temp_monster.physicArmorPercents) + temp_player.magicDmg - ((temp_player.magicDmg/100)*temp_monster.magicArmorPercents));
            cooldownMonster += 1;
            cooldownMag += 1;
            console.log(`Осталось жизней: ${player_health}`);
            console.log(`Осталось жизней у врага: ${monster_health}`);

        } else {
            if (player_health > 0) {
                console.log('Вы победили!');
                break;
            } else if (monster_health > 0) {
                console.log('Вы проиграли!');
                break;
            }
            break;
        }
    }
}

console.log(`Компьютер управляет монстром: ${monster.name}`);
console.log(`Игрок управляет боевым магом: ${player.name}`);
const health = readlineSync.questionInt('Vvedite nachalnoe zdorovie: ');

game(health);
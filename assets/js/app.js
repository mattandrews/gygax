var app = angular.module('dmTool', []);
app.controller('adventureController', function($scope, $http) {

    var isDebug = true;

    var makeStatBlock = function (data) {
        return [
            {
                name: 'STR',
                value: data.strength,
                modifier: $scope.getAbilityScoreModifier(data.strength)
            },
            {
                name: 'DEX',
                value: data.dexterity,
                modifier: $scope.getAbilityScoreModifier(data.dexterity)
            },
            {
                name: 'CON',
                value: data.constitution,
                modifier: $scope.getAbilityScoreModifier(data.constitution)
            },
            {
                name: 'INT',
                value: data.intelligence,
                modifier: $scope.getAbilityScoreModifier(data.intelligence)
            },
            {
                name: 'WIS',
                value: data.wisdom,
                modifier: $scope.getAbilityScoreModifier(data.wisdom)
            },
            {
                name: 'CHA',
                value: data.charisma,
                modifier: $scope.getAbilityScoreModifier(data.charisma)
            }
        ];
    };

    $scope.getAbilityScoreModifier = function (score) {
        var modifier;
        if (score === 1) {
            modifier = -5;
        } else if (score <= 3) {
            modifier = -4;
        } else if (score <= 5) {
            modifier = -3;
        } else if (score <= 7) {
            modifier = -2;
        } else if (score <= 9) {
            modifier = -1;
        } else if (score <= 11) {
            modifier = 0;
        } else if (score <= 13) {
            modifier = 1;
        } else if (score <= 15) {
            modifier = 2;
        } else if (score <= 17) {
            modifier = 3;
        } else if (score <= 19) {
            modifier = 4;
        } else if (score <= 21) {
            modifier = 5;
        } else if (score <= 23) {
            modifier = 6;
        } else if (score <= 25) {
            modifier = 7;
        } else if (score <= 27) {
            modifier = 8;
        } else if (score <= 29) {
            modifier = 9;
        } else {
            modifier = 10;
        }

        if (modifier > 0) {
            modifier = '+' + modifier;
        }

        return modifier;
    };

    // get the monsters
    $http.get('/assets/data/monsters.json').success(function (data) {
        $scope.monsters = data.filter(d => d.name).map(d => {
            d.stats = makeStatBlock(d);
            d.type = d.type.replace(/ /g, '-');
            d.passivePerception = 10 + (d.perception  || parseInt($scope.getAbilityScoreModifier(d.wisdom)));
            d.initiative = 0;
            return {
                id: d.name,
                name: d.name + ' (' + d.hit_points + ' HP)',
                data: d
            }
        });
        if (isDebug) {
            [$scope.monsters[0].data, $scope.monsters[1].data, $scope.monsters[2].data].forEach($scope.addMonsterToEncounter);
        }
    });

    $scope.encounter = {
        monsters: []
    };

    $scope.addMonsterToEncounter = function (monster) {
        // make sure we don't reuse existing monsters
        var newMonster = jQuery.extend(true, {}, monster);
        
        if (newMonster.type === 'dragon') {
            $scope.aDragonAppeared = true;
        } else {
            delete $scope.aDragonAppeared;
        }
        
        var newMonsterName = newMonster.name;
        var counter = 2; // existing monster is #1

        var nameInUse = function (name) {
            return $scope.encounter.monsters.find(m => m.name === name);
        };

        var monsterNameExists = nameInUse(newMonsterName);
        if (monsterNameExists) {
            while (monsterNameExists) {
                newMonsterName = newMonster.name + ' #' + counter;
                monsterNameExists = nameInUse(newMonsterName);
                counter = counter + 1;
            }
        }
        newMonster.name = newMonsterName;
        $scope.encounter.monsters.push(newMonster);
    };

    $scope.classTypes = [
        {
            name: 'Barbarian',
            image: 'assets/img/classes/barbarian.jpg'
        },
        {
            name: 'Bard',
            image: 'assets/img/classes/bard.jpg'
        },
        {
            name: 'Cleric',
            image: 'assets/img/classes/cleric.jpg'
        },
        {
            name: 'Druid',
            image: 'assets/img/classes/druid.jpg'
        },
        {
            name: 'Fighter',
            image: 'assets/img/classes/fighter.jpg'
        },
        {
            name: 'Monk',
            image: 'assets/img/classes/monk.jpg'
        },
        {
            name: 'Paladin',
            image: 'assets/img/classes/paladin.jpg'
        },
        {
            name: 'Ranger',
            image: 'assets/img/classes/ranger.jpg'
        },
        {
            name: 'Rogue',
            image: 'assets/img/classes/rogue.jpg'
        },
        {
            name: 'Sorcerer',
            image: 'assets/img/classes/sorcerer.jpg'
        },
        {
            name: 'Warlock',
            image: 'assets/img/classes/warlock.jpg'
        },
        {
            name: 'Wizard',
            image: 'assets/img/classes/wizard.jpg'
        }
    ];

    $scope.races = [
        'Dragonborn',
        'Dwarf',
        'Elf',
        'Gnome',
        'Half-elf',
        'Half-orc',
        'Halfling',
        'Human',
        'Tiefling'
    ];

    $scope.party = [];

    if (isDebug) {
        $scope.party = [
            {
                name: 'Thoradin',
                race: 'Dwarf',
                classname: $scope.classTypes[0],
                hit_points: 18,
                armor_class: 18,
                passive_wisdom_perception: 12,
                dexterity_stealth: 10,
                level: 3,
                initiative: 0
            },
            {
                name: 'Thia',
                race: 'Elf',
                classname: $scope.classTypes[1],
                hit_points: 14,
                armor_class: 18,
                passive_wisdom_perception: 16,
                dexterity_stealth: 10,
                level: 3,
                initiative: 0
            },
            {
                name: 'Fighty Dave',
                race: 'Human',
                classname: $scope.classTypes[2],
                hit_points: 23,
                armor_class: 18,
                passive_wisdom_perception: 10,
                dexterity_stealth: 10,
                level: 3,
                initiative: 0
            },
            {
                name: 'Sgt. Bash',
                race: 'Human',
                classname: $scope.classTypes[3],
                hit_points: 25,
                armor_class: 18,
                passive_wisdom_perception: 9,
                dexterity_stealth: 10,
                level: 3,
                initiative: 0
            }
        ];
    }

    $scope.dice = [4, 6, 8, 10, 12, 20];

    // assumes 1-based dice
    var rollDice = function (max, numTimes) {
        var r;
        var total = 0;
        if (!numTimes) { numTimes = 1; }
        for (var i = 0; i < numTimes; i++) {
            r = Math.floor(Math.random() * max) + 1;
            total += r;
        }
        return total;
    };

    $scope.roll = function (d) {
        $scope.diceRoll = {
            dice: 'D' + d,
            roll: rollDice(d)
        };
    };
    
    $scope.currencies = [
        {
            name: 'Copper',
            abbreviation: 'c',
            worthInGold: 0.01,
            value: 0
        },
        {
            name: 'Silver',
            abbreviation: 's',
            worthInGold: 0.1,
            value: 0
        },
        {
            name: 'Electrum',
            abbreviation: 'e',
            worthInGold: 0.5,
            value: 0
        },
        {
            name: 'Gold',
            abbreviation: 'g',
            worthInGold: 1,
            value: 0
        },
        {
            name: 'Platinum',
            abbreviation: 'p',
            worthInGold: 10,
            value: 0
        }
    ];

    $scope.splitLoot = function () {
        $scope.currencies.forEach(c => {
            c.share = c.value / $scope.party.length;
        });
        $scope.xpShare = $scope.xp / $scope.party.length;
    };

    $scope.clearCurrency = function () {
        $scope.currencies.forEach(c => {
            delete c.share;
            c.value = 0;
        });
        delete $scope.xpShare;
    };

    $scope.showOverlay = function (overlayToShow) {
        $scope.showModal = overlayToShow
    };

    $scope.hideOverlay = function () {
        delete $scope.showModal;
    };

    // used to re-init edit form
    $scope.newPlayerTemplate = {};

    $scope.createPlayer = function (newPlayer) {
        newPlayer.initiative = 0;
        $scope.party.push(newPlayer);
        $scope.hideOverlay();
        // clear previously-created new player
        $scope.newPlayerTemplate = undefined;
    };

    $scope.editPlayer = function (player) {
        $scope.playerToEdit = player;
        $scope.showOverlay('edit-player');
    };

    $scope.doneEditing = function () {
        $scope.hideOverlay();
    };

    $scope.viewMonster = function (monster) {
        $scope.monsterToView = monster;
        $scope.showOverlay('view-monster');
    };

    $scope.getCombatants = function () {
        return $scope.party.concat($scope.encounter.monsters);
    };

    $scope.round = undefined;
    $scope.turn = undefined;

    $scope.beginRound = function () {
        $scope.round = 1;
        $scope.turn = 0; // 0-based for combat
    };

    var getNextUsablePlayerIndex = function (players, currentIndex) {
        var nextPlayer = players.slice(currentIndex).find(p => !p.surprised && p.hit_points > 0);
        return players.indexOf(nextPlayer);
    };

    $scope.nextTurn = function () {
        var combatants = $scope.getCombatants();
        // are we at the end
        if (($scope.turn + 1) === combatants.length) {
            $scope.round = $scope.round + 1;
            $scope.turn = 0;
        } else {
            $scope.turn = $scope.turn + 1;
            var nextPlayer = combatants[$scope.turn];

            // this will fail if next player is dead too
            if (nextPlayer.surprised || nextPlayer.hit_points <= 0) {
                var next = getNextUsablePlayerIndex(combatants, $scope.turn);
                if (next) {
                    $scope.turn = next;
                } else { // next usable player must be the next round
                    $scope.round = $scope.round + 1;
                    $scope.turn = 0;
                }
            }
        }
    };

    $scope.endRound = function () {
        $scope.encounter.monsters = [];
        delete $scope.round;
        delete $scope.turn;
    };

    $scope.saveState = function () {
        var data = JSON.stringify({
            game: $scope.party,
            time: new Date()
        });
        window.localStorage.setItem('gygax', data);
        alert('Data saved!')
    };

    $scope.loadState = function () {
        var data = window.localStorage.getItem('gygax');
        if (data) {
            var json = JSON.parse(data);
            var shouldRestore = confirm('Data found! Timestamp is ' + json.time + ' - do you want to import?');
            if (shouldRestore) {
                $scope.party = json.game;
            }
        }
    };

    $scope.toggleAction = function (action) {
        if (action.descfull) {
            delete action.descfull;
        } else {
            action.descfull = action.desc;
        }
    };

    $scope.damagePlayer = function (player) {
        var dmg = player.damageToApply;
        if (dmg) {
            player.hit_points = player.hit_points - dmg;
            delete player.damageToApply;
        }
    };

    $scope.removePlayer = function (player, isMonster) {
        var shouldRemove = confirm("Are you sure you want to remove " + player.name + "?");
        if (shouldRemove) {
            var i;
            if (isMonster) {
                i = $scope.encounter.monsters.findIndex(p => p === player);
                if (i > -1) {
                    $scope.encounter.monsters.splice(i, 1);
                }
            } else {
                i = $scope.party.findIndex(p => p === player);
                if (i > -1) {
                    $scope.party.splice(i, 1);
                }
            }
        }
    };

    $scope.rollInitiative = function (player) {
        var d20 = rollDice(20);
        var dex = parseInt($scope.getAbilityScoreModifier(player.dexterity));
        player.initiative = d20 + dex;
    };

    $scope.rollAttack = function (action) {
        var d20 = rollDice(20);
        var b = action.damage_bonus;
        // nat 1 or 20 means we ignore bonuses
        if (d20 === 1 || d20 === 20) { b = 0; }
        action.monsterAttackRoll = d20 + b;
    };

    $scope.rollDamage = function (action, damageDice, damageBonus) {
        var damageDice = action.damage_dice;
        var damageBonus = action.damage_bonus;
        var total = 0;
        var re = /(\d+)(d\d+) *\+* *(\d+)*(d\d+)*/;
        var damageParts = damageDice.match(re);
        if (damageParts) {
            // remove first item as it's the entire match
            if (damageParts[0] === damageDice) { damageParts.shift(); }

            var numFirstDice = damageParts[0]; // 1d6 + 2 => 1
            var firstDice = damageParts[1].replace('d', ''); // 1d6 + 2 => 6

            // is there a second dice / bonus?
            if (damageParts[2]) {
                var numSecondDice = damageParts[2]; // 1d6 + 2d4 => 2
                var secondDice = damageParts[3].replace('d', ''); // 1d6 + 2d4 => 4
            }

            // roll the first dice
            total += rollDice(firstDice, numFirstDice);
            // roll the second dice (if set)
            if (secondDice) {
                total += rollDice(secondDice, numSecondDice);
            }
            if (damageBonus) {
                total += damageBonus;
            }
            action.monsterDamageRoll = total;
        }
    };

});

app.directive('playerBar', function() {
    return {
        restrict: 'E',
        scope: {
            player: '=',
            human: '=',
            editPlayer: '=',
            viewMonster: '=',
            getAbilityScoreModifier: '=',
            damagePlayer: '=',
            removePlayer: '=',
            rollInitiative: '='
        },
        templateUrl: '/assets/templates/player-bar.html'
    };
});

app.directive('playerForm', function() {
    return {
        restrict: 'E',
        scope: {
            player: '=',
            races: '=',
            classTypes: '=',
            createPlayer: '=',
            doneEditing: '='
        },
        templateUrl: '/assets/templates/player-form.html'
    };
});

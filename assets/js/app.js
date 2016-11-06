var app = angular.module('dmTool', []);
app.controller('adventureController', function($scope, $http) {

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
        //[$scope.monsters[0].data, $scope.monsters[1].data, $scope.monsters[2].data].forEach($scope.addMonsterToEncounter);
    });

    $scope.encounter = {
        monsters: []
    };

    $scope.addMonsterToEncounter = function (monster) {
        // make sure we don't reuse existing monsters
        var newMonster = jQuery.extend(true, {}, monster);
        var newMonsterName = newMonster.name;
        var counter = 2; // existing monster is #1

        var nameInUse = function (name) {
            return $scope.encounter.monsters.find(m => m.name === name);
        };

        var monsterNameExists = nameInUse(newMonsterName);
        if (monsterNameExists) {
            console.log('that name exists');
            while (monsterNameExists) {
                newMonsterName = newMonster.name + ' #' + counter;
                console.log('trying new name', newMonsterName);
                monsterNameExists = nameInUse(newMonsterName);
                counter = counter + 1;
            }
        }
        newMonster.name = newMonsterName;
        $scope.encounter.monsters.push(newMonster);
        console.log($scope.encounter.monsters);
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

    $scope.dice = [4, 6, 8, 10, 12, 20];

    $scope.roll = function (d) {
        $scope.diceRoll = {
            dice: 'D' + d,
            roll: Math.floor(Math.random() * d) + 1
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
    };

    $scope.clearCurrency = function () {
        $scope.currencies.forEach(c => {
            delete c.share;
            c.value = 0;
        });
    };

    $scope.showOverlay = function (overlayToShow) {
        $scope.showModal = overlayToShow
    };

    $scope.hideOverlay = function () {
        delete $scope.showModal;
    };

    $scope.createPlayer = function (newPlayer) {
        $scope.party.push(newPlayer);
        $scope.hideOverlay();
    };

    $scope.editPlayer = function (player) {
        $scope.playerToEdit = player;
        $scope.showOverlay('edit-player');
    };

    $scope.doneEditing = function () {
        $scope.hideOverlay();
    };

    $scope.editMonster = function (monster) {
        $scope.monsterToEdit = monster;
        $scope.showOverlay('edit-monster');
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

});

app.directive('playerBar', function() {
    return {
        restrict: 'E',
        scope: {
            player: '=',
            human: '=',
            editPlayer: '=',
            editMonster: '=',
            getAbilityScoreModifier: '='
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

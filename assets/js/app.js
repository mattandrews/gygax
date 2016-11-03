var app = angular.module('dmTool', []);
app.controller('adventureController', function($scope, $http) {

    var makeStatBlock = function (data) {
        return [
            {
                name: 'STR',
                value: data.strength,
                modifier: getAbilityScoreModifier(data.strength)
            },
            {
                name: 'DEX',
                value: data.dexterity,
                modifier: getAbilityScoreModifier(data.dexterity)
            },
            {
                name: 'CON',
                value: data.constitution,
                modifier: getAbilityScoreModifier(data.constitution)
            },
            {
                name: 'INT',
                value: data.intelligence,
                modifier: getAbilityScoreModifier(data.intelligence)
            },
            {
                name: 'WIS',
                value: data.wisdom,
                modifier: getAbilityScoreModifier(data.wisdom)
            },
            {
                name: 'CHA',
                value: data.charisma,
                modifier: getAbilityScoreModifier(data.charisma)
            }
        ];
    };

    var getAbilityScoreModifier = function (score) {
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
            return {
                id: d.name,
                name: d.name + ' (' + d.hit_points + ' HP)',
                data: d
            }
        });
        [$scope.monsters[0].data, $scope.monsters[1].data, $scope.monsters[2].data].forEach($scope.addMonsterToEncounter);
    });

    $scope.encounter = {
        monsters: []
    };

    $scope.addMonsterToEncounter = function (monster) {
        $scope.encounter.monsters.push(monster);
    };

    var classTypes = {
        barbarian: {
            name: 'Barbarian',
            image: 'assets/img/classes/barbarian.jpg'
        },
        bard: {
            name: 'Bard',
            image: 'assets/img/classes/bard.jpg'
        },
        cleric: {
            name: 'Cleric',
            image: 'assets/img/classes/cleric.jpg'
        },
        druid: {
            name: 'Druid',
            image: 'assets/img/classes/druid.jpg'
        },
        fighter: {
            name: 'Fighter',
            image: 'assets/img/classes/fighter.jpg'
        },
        monk: {
            name: 'Monk',
            image: 'assets/img/classes/monk.jpg'
        },
        paladin: {
            name: 'Paladin',
            image: 'assets/img/classes/paladin.jpg'
        },
        ranger: {
            name: 'Ranger',
            image: 'assets/img/classes/ranger.jpg'
        },
        rogue: {
            name: 'Rogue',
            image: 'assets/img/classes/rogue.jpg'
        },
        sorcerer: {
            name: 'Sorcerer',
            image: 'assets/img/classes/sorcerer.jpg'
        },
        warlock: {
            name: 'Warlock',
            image: 'assets/img/classes/warlock.jpg'
        },
        wizard: {
            name: 'Wizard',
            image: 'assets/img/classes/wizard.jpg'
        }
    };
    
    $scope.party = [
        {
            name: 'Thoradin',
            race: 'dwarf',
            classname: classTypes.druid,
            hit_points: 18,
            armor_class: 18,
            passive_wisdom_perception: 12,
            dexterity_stealth: 10,
            level: 3
        },
        {
            name: 'Thia',
            race: 'elf',
            classname: classTypes.cleric,
            hit_points: 14,
            armor_class: 18,
            passive_wisdom_perception: 16,
            dexterity_stealth: 10,
            level: 3
        },
        {
            name: 'Fighty Dave',
            race: 'human',
            classname: classTypes.fighter,
            hit_points: 23,
            armor_class: 18,
            passive_wisdom_perception: 10,
            dexterity_stealth: 10,
            level: 3
        },
        {
            name: 'Sgt. Bash',
            race: 'human',
            classname: classTypes.paladin,
            hit_points: 25,
            armor_class: 18,
            passive_wisdom_perception: 9,
            dexterity_stealth: 10,
            level: 3
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
    
});

app.directive('playerBar', function() {
    return {
        restrict: 'E',
        scope: {
            player: '=player',
            human: '=human'
        },
        templateUrl: '/assets/templates/player-bar.html'
    };
});

angular.module('dmTool', []).controller('adventureController', function($scope) {

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
            hp: 18,
            passiveWisdom: 12,
            level: 3
        },
        {
            name: 'Thia',
            race: 'elf',
            classname: classTypes.cleric,
            hp: 14,
            passiveWisdom: 16,
            level: 3
        },
        {
            name: 'Fighty Dave',
            race: 'human',
            classname: classTypes.fighter,
            hp: 23,
            passiveWisdom: 10,
            level: 3
        },
        {
            name: 'Sgt. Bash',
            race: 'human',
            classname: classTypes.paladin,
            hp: 25,
            passiveWisdom: 9,
            level: 3
        }
    ];

    $scope.dice = [4, 6, 8, 10, 12, 20];

    $scope.roll = function (d) {
        $scope.diceRoll = {
            dice: 'D' + d,
            roll: Math.floor(Math.random() * d) + 1
        };
    }

});


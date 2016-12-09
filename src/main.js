var Ractive = require('ractive');
var _ = require('underscore');

var skills = require('./skills.json');
var spells = require('./spells.json');

var character = JSON.parse(window.localStorage.getItem('character')) || {
    stats: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10
    },
    proficiency: 1,
    proficiencies: _.reduce(skills, (o, item) => { o[item.name] = 0; return o; }, {}),
    savingThrows: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    }
}

var helpers = Ractive.defaults.data;
helpers.formatSpellLevel = (level, school) => {
    if (level === 0) {
        return school + ' Cantrip';
    } else {
        var suffixes = ['st', 'nd', 'rd']
        return level + (suffixes[level - 1] || 'th') + " level " + school;
    }
}

var ractive = new Ractive({
    el: '#container',
    template: require('html!./template.html'),
    data: {
        character: character,
        skills: skills,
        spells: spells,

        tabs: ['stats', 'spells'],
        selectedTab: 'stats'
    }
});

ractive.observe('character', (value) => {
    window.localStorage.setItem('character', JSON.stringify(value));
})

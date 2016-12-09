const Ractive = require('ractive');
const _ = require('underscore');

const skills = require('./skills.json');
const allSpells = require('./spells.json');
// TODO: get the classes from JSON?
const allClasses = [
    'Barbarian',
    'Bard',
    'Cleric',
    'Druid',
    'Fighter',
    'Monk',
    'Paladin',
    'Ranger',
    'Rogue',
    'Sorcerer',
    'Warlock',
    'Wizard'
];

const character = JSON.parse(window.localStorage.getItem('character')) || {
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
};

const defaultFilter = {
    name: '',
    class: [],
    level: {
        min: 0,
        max: 9
    }
};

const helpers = Ractive.defaults.data;
helpers.formatSpellLevel = (level, school) => {
    if (level === 0) {
        return school + ' Cantrip';
    } else {
        const suffixes = ['st', 'nd', 'rd']
        return level + (suffixes[level - 1] || 'th') + " level " + school;
    }
};

window.ractive = new Ractive({
    el: '#container',
    template: require('html!./template.html'),
    data: {
        character: character,
        skills: skills,
        spells: allSpells,
        classes: allClasses,

        filter: defaultFilter,
        tabs: ['stats', 'spells'],
        selectedTab: 'stats'
    }
});

ractive.observe('character', (value) => {
    window.localStorage.setItem('character', JSON.stringify(value));
});

ractive.observe('filter', (filter) => {
    ractive.set('spells',  allSpells
        .filter(spell => { //class
            return filter.class.length === 0 || _.intersection(spell.class, filter.class).length > 0
        }).filter(spell => { //name
            return spell.name
                .replace(/[.,\/#!$%\^&*;:{}=\-_`~()]/g, '')
                .replace(/\s{2,}/, '')
                .toLowerCase()
                .includes(filter.name.toLowerCase())
        }).filter(spell => { //level
            return spell.level >= +filter.level.min && spell.level <= +filter.level.max
        })
    );
});

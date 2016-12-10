const Ractive = require('ractive');
const _ = require('underscore');
const $ = require('jquery');
require('select2');

const skills = require('./skills.json');
const spells = require('./spells.json');

const spellLists = _.chain(spells).map(_.property('class')).flatten().uniq().sort().value();
const spellLevels = ['Cantrip'].concat(_.range(1, 10).map((i) => {
    const suffixes = ['st', 'nd', 'rd'];
    return i + (suffixes[i-1] || 'th') + ' level';
}));
const stats = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

const character = JSON.parse(window.localStorage.getItem('character')) || {
    stats: _.reduce(stats, (o, stat) => { o[stat] = 10; return o; }, {}),
    proficiency: 1,
    proficiencies: _.reduce(skills, (o, item) => { o[item.name] = 0; return o; }, {}),
    savingThrows: _.reduce(stats, (o, stat) => { o[stat] = 0; return o; }, {}),
};

const defaultFilter = {
    name: '',
    classes: [],
    level: {
        min: 0,
        max: 9
    }
};

const helpers = Ractive.defaults.data;
helpers.asModifier = (value) => {
    return value < 0 ? value : '+' + value
};

helpers.filterSpell = (spell, filter) => {
    return (spell.name
        .replace(/[.,\/#!$%\^&*;:{}=\-_`~()]/g, '')
        .replace(/\s{2,}/, '')
        .toLowerCase()
        .includes(filter.name.toLowerCase())) &&
        (filter.classes.length === 0 || _.intersection(spell.class, filter.classes).length > 0) &&
        spell.level >= +filter.level.min && spell.level <= +filter.level.max;
};

const ractive = new Ractive({
    el: '#container',
    template: require('html!./template.html'),
    data: {
        character: character,
        skills: skills,
        spells: spells,
        spellLists: spellLists,
        spellLevels: spellLevels,

        filter: defaultFilter,
        tabs: ['stats', 'spells'],
        selectedTab: 'stats'
    },
    decorators: {
        select2: (node, content) => {
            let box = $(node).select2({ theme: 'bootstrap' });
            box.change(() => ractive.updateModel());
            return { teardown: () => { } };
        }
    }
});

ractive.observe('character', (value) => {
    window.localStorage.setItem('character', JSON.stringify(value));
});

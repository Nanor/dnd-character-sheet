Ractive = require('ractive');

var helpers = Ractive.defaults.data;
helpers.formatSpellLevel = function (level, school) {
    if (level === 0) {
        return school + ' Cantrip';
    } else {
        var suffixes = ['st', 'nd', 'rd']
        return level + (suffixes[level-1] || 'th') + " level " + school;
    }
}

ractive = new Ractive({
    el: '#container',
    template: require('html!./template.html'),
    data: { 
        spells: require('./spells.json')
    }
});
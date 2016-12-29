import _ from 'underscore'
import Chance from 'chance'

import skills from './data/skills.json'

function blankCharacter() {
    let chance = new Chance()
    const stats = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
    return {
        id: chance.hash().slice(0, 6),
        name: chance.name(),
        stats: _.reduce(stats, (o, stat) => { o[stat] = chance.rpg('3d6', { sum: true }); return o; }, {}),
        proficiency: 1,
        proficiencies: _.reduce(skills, (o, item) => { o[item.name] = 0; return o; }, {}),
        savingThrows: _.reduce(stats, (o, stat) => { o[stat] = 0; return o; }, {}),
    }
}

function loadCharacters() {
    return JSON.parse(localStorage.getItem('characters')) || []
}

function newCharacter() {
    return saveCharacter(blankCharacter())
}

function latestCharacter() {
    return loadCharacters()[0]
}

function loadCharacter(id) {
    return _.find(loadCharacters(), (c) => c.id == id)
}

function saveCharacter(character) {
    let characters = _.filter(loadCharacters(), (c) => {
        return c.id !== character.id
    })
    characters.push(character)
    localStorage.setItem('characters', JSON.stringify(characters))
    return character
}

function characterNames() {
    return _.map(loadCharacters(), (character) => {
        return {
            name: character.name,
            id: character.id
        }
    })
}

module.exports = {
    newCharacter,
    latestCharacter,
    loadCharacter,
    saveCharacter,
    characterNames
}
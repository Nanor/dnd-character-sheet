<template>
    <div class="stats">
        <div class="col-xs-4">
            <div class="form-horizontal">
                <h3>Attributes</h3>
                <div class="form-group" v-for="(value, stat) in character.stats">
                    <label class="col-xs-4 control-label">{{ stat }}</label>
                    <div class="col-xs-4">
                        <input class="form-control" type="number" v-model="character.stats[stat]">
                    </div>
                    <p class="col-xs-4 form-control-static">{{ asModifier(Math.floor((value - 10) / 2)) }}</p>
                </div>
            </div>
            <label class="col-xs-9">Proficiency bonus</label>
            <div class="col-xs-3">
                <input class="form-control" type="number" v-model="character.proficiency">
            </div>
            <div class="form-horizontal">
                <h3>Saving Throws</h3>
                <div class="form-group" v-for="(value, stat) in character.savingThrows">
                    <label class="col-xs-4 control-label">{{ stat }}</label>
                    <div class="col-xs-4 btn-group" data-toggle="buttons">
                        <label class="btn btn-default" :class="{ active: !value }">
                        <input type="radio" value="0" v-model="character.savingThrows[stat]">+0
                    </label>
                        <label class="btn btn-default" :class="{ active: value }">
                        <input type="radio" value="1" v-model="character.savingThrows[stat]">+1
                    </label>
                    </div>
                    <p class="col-xs-4 form-control-static">{{ asModifier(Math.floor((character.stats[stat] - 10) / 2) + (character.proficiency * value)) }}</p>
                </div>
            </div>
        </div>

        <div class="col-xs-8">
            <h3>Skills</h3>
            <div class="form-horizontal">
                <div class="form-group" v-for="skill in skills">
                    <label class="col-xs-4 control-label">{{ skill.name }} <small>({{ skill.stat }})</small></label>
                    <div class="col-xs-4 btn-group" data-toggle="buttons">
                        <label class="btn btn-default" :class="character.proficiencies[skill.name] == 0 ? 'active' : ''">
                            <input type="radio" value="0" v-model="character.proficiencies[skill.name]">+0
                        </label>
                        <label class="btn btn-default" :class="character.proficiencies[skill.name] == 0.5 ? 'active' : ''">
                            <input type="radio" value="0.5" v-model="character.proficiencies[skill.name]">+&frac12;
                        </label>
                        <label class="btn btn-default" :class="character.proficiencies[skill.name] == 1 ? 'active' : ''">
                            <input type="radio" value="1" v-model="character.proficiencies[skill.name]">+1
                        </label>
                        <label class="btn btn-default" :class="character.proficiencies[skill.name] == 2 ? 'active' : ''">
                            <input type="radio" value="2" v-model="character.proficiencies[skill.name]">+2
                        </label>
                    </div>
                    <p class="col-xs-4 form-control-static">{{ asModifier(Math.floor((character.stats[skill.stat] - 10) / 2) + Math.floor(character.proficiency * character.proficiencies[skill.name])) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import skills from '../data/skills.json'
import _ from 'underscore'

const stats = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

const character = JSON.parse(window.localStorage.getItem('character')) || {
    stats: _.reduce(stats, (o, stat) => { o[stat] = 10; return o; }, {}),
    proficiency: 1,
    proficiencies: _.reduce(skills, (o, item) => { o[item.name] = 0; return o; }, {}),
    savingThrows: _.reduce(stats, (o, stat) => { o[stat] = 0; return o; }, {}),
};

export default {
    data () {
        return {
            character: character,
            skills: skills
        }
    },
    watch: {
        character: function (foo) {
            console.log("foo: "+ foo)
        }
    },
    methods: {
        asModifier (value) {
            return value < 0 ? value : '+' + value
        }
    }
}

</script>

<style lang="sass?indentedSyntax" scoped>

</style>
<template>
    <div class="stats container-fluid" v-on:change="saveCharacter(character)">
        <div class="col-md-6">
            <div class="form-horizontal">
                <div class="form-group">
                    <label class="control-label col-xs-4">Name</label>
                    <div class="col-xs-8">
                        <input class="form-control" v-model="character.name">
                    </div>
                </div>
                <h3>Attributes</h3>
                <div class="form-group" v-for="(value, stat) in character.stats">
                    <label class="col-xs-4 control-label">{{ stat }}</label>
                    <div class="col-xs-4">
                        <input class="form-control" type="number" v-model="character.stats[stat]">
                    </div>
                    <p class="col-xs-4 form-control-static">{{ asModifier(Math.floor((value - 10) / 2)) }}</p>
                </div>
            </div>
            <label class="col-xs-8">Proficiency bonus</label>
            <div class="col-xs-4">
                <input class="form-control" type="number" v-model="character.proficiency">
            </div>
            <div class="form-horizontal">
                <h3>Saving Throws</h3>
                <div class="form-group" v-for="(value, stat) in character.savingThrows">
                    <label class="col-xs-4 control-label">{{ stat }}</label>
                    <div class="col-xs-4">
                        <select class="form-control" v-model="character.savingThrows[stat]">
                            <option value="0">+0</option>
                            <option value="1">+1</option>
                        </select>
                    </div>
                    <p class="col-xs-4 form-control-static">{{ asModifier(Math.floor((character.stats[stat] - 10) / 2) + (character.proficiency * value)) }}</p>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <h3>Skills</h3>
            <div class="form-horizontal">
                <div class="form-group" v-for="skill in skills">
                    <label class="col-xs-6 control-label">{{ skill.name }} <small>({{ skill.stat }})</small></label>
                    <div class="col-xs-3">
                        <select class="form-control" v-model="character.proficiencies[skill.name]">
                            <option value="0">+0</option>
                            <option value="0.5">+&frac12</option>
                            <option value="1">+1</option>
                            <option value="2">+2</option>
                        </select>
                    </div>
                    <p class="col-xs-3 form-control-static">{{ asModifier(Math.floor((character.stats[skill.stat] - 10) / 2) + Math.floor(character.proficiency *
                        character.proficiencies[skill.name])) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import skills from '../data/skills.json'
    import api from '../api.js'

    export default {
        data() {
            return {
                character: null,
                skills: skills
            }
        },
        created() {
            this.fetchData()
        },  
        methods: {
            asModifier(value) {
                return value < 0 ? value : '+' + value
            },
            fetchData() {
                this.character = api.loadCharacter(this.$route.params.id)
            },
            saveCharacter(char) {
                return api.saveCharacter(char)
            }
        },
        watch: {
            '$route': 'fetchData'
        }
    }

</script>

<style lang="sass?indentedSyntax" scoped>
label
    text-transform: capitalize

.control-label
    text-align: right
</style>
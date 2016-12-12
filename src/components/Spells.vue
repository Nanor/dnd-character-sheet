<template>
    <div class="spells">
        <div class="row">
            <div class="col-xs-3 form-group">
                <label class="control-label" for="filter-text">Spell Name</label>
                <input type="text" class="form-control" id="filter-text" v-model="filter.name">
            </div>
            <div class="col-xs-4 form-group">
                <label class="control-label" for="filter-class">In Class List</label>
                <div class="select2-wrapper">
                    <select2 class="form-control" v-model="filter.classes" multiple>
                        <option v-for="spellList in spellLists">{{ spellList }}</option>
                    </select>
                </div>
            </div>
            <div class="col-xs-2 form-group">
                <label class="control-label">Between level</label>
                <select class="form-control" v-model="filter.level.min">
                    <option v-for="(item, index) in spellLevels" :value="index">{{ item }}</option>
                </select>
            </div>
            <div class="col-xs-2 form-group">
                <label class="control-label">and</label>
                <select class="form-control" v-model="filter.level.max">
                    <option v-for="(item, index) in spellLevels" :value="index">{{ item }}</option>
                </select>
            </div>
        </div>
        <div class="spell row" v-for="spell in spells" v-if="filterSpell(spell, filter)">
            <h3>{{ spell.name }}</h3>
            <div class="info">
                <em>{{ formatSpellLevel(spell.level, spell.school) }} <span v-if="spell.ritual">(ritual)</span></em>
                <div><label>Casting Time:</label> {{ spell.casting_time }}</div>
                <div><label>Range:</label> {{ spell.range }}</div>
                <div><label>Components:</label> {{ spell.components.join(', ') }} <em v-if="spell.material">({{ spell.material }})</em></div>
                <div><label>Duration:</label> <span v-if="spell.concentration">Concentration,</span> {{ spell.duration }}</div>
                <p v-html="spell.desc"></p>
                <span v-if="spell.higher_level"><label>At Higher Levels:</label></span> <span>{{ spell.higher_level }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import spells from '../data/spells.json'
import _ from 'underscore'

const spellLevels = ['Cantrip'].concat(_.range(1, 10).map((i) => {
    const suffixes = ['st', 'nd', 'rd'];
    return i + (suffixes[i-1] || 'th') + ' level';
}));
const spellLists = _.chain(spells).map(_.property('class')).flatten().uniq().sort().value();

export default {
    data () {  
        return {
            spells: spells,
            spellLists: spellLists,
            spellLevels: spellLevels,
            filter: {
                name: '',
                classes: [],
                level: {
                    min: 0,
                    max: 9
                }
            }
        }
    },
    methods: {
        formatSpellLevel (level, school) {
            return level === 0 ? school + ' ' + spellLevels[level] : spellLevels[level] + ' ' + school
        },
        filterSpell (spell, filter) {
            return (spell.name
                .replace(/[.,\/#!$%\^&*;:{}=\-_`~()]/g, '')
                .replace(/\s{2,}/, '')
                .toLowerCase()
                .includes(filter.name.toLowerCase())) &&
                (filter.classes.length === 0 || _.intersection(spell.class, filter.classes).length > 0) &&
                spell.level >= +filter.level.min && spell.level <= +filter.level.max;
        }
    }
}
</script>

<style lang="sass?indentedSyntax" scoped>
.spell
    .info
        max-height: 0
        overflow-y: hidden
        transition: max-height 1s
    
    &:nth-child(even)
        background-color: whitesmoke
    
    &:hover 
        .info
            max-height: 1000px
</style>
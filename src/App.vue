<template>
  <div id="app container">
    <div class="sidebar col-xs-2">
      <ul>
        <li>
          <div class="select2-wrapper">
            <select v-model="id">
              <option v-for="char in characterList" :value="char.id">{{ char.name }}</option>
              <option value="NEWCHARACTER">+ New character</option>
            </select>
          </div>
        </li>
        <li>
          <router-link :to="'/' + id + '/stats'">Stats</router-link>
        </li>
        <li>
          <router-link :to="'/' + id + '/spells'">Spells</router-link>
        </li>
      </ul>
    </div>
    <div class="main col-xs-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import api from './api.js'

  export default {
    data() {
      return {
        id: null,
        characterList: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      loadCharacter() {
        if (this.id === 'NEWCHARACTER') {
          this.$router.push('/' + api.newCharacter().id)
        }
        else if (this.id != this.$route.params.id) {
          this.$router.push('/' + this.id)
        }
      },
      fetchData() {
        this.id = this.$route.params.id
        this.characterList = api.characterNames()
      }
    },
    watch: {
      '$route': 'fetchData',
      id: 'loadCharacter'
    }
  }
</script>

<style lang="sass?indentedSyntax" scoped>

</style>
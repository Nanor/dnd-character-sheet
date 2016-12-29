<template>
  <div id="wrapper" :class="sidebarToggled ? 'toggled' : ''">
    <div id="sidebar-wrapper">
      <ul class="sidebar-nav">
        <li class="sidebar-brand">
          5e Character Sheet 
        </li>
        <span class="glyphicon glyphicon-align-justify sidebar-toggle btn btn-default btn-circle" v-on:click="toggleSidebar()"></span>
        <li>
          <select v-model="id" class="form-control">
            <option v-for="char in characterList" :value="char.id">{{ char.name }}</option>
            <option value="NEWCHARACTER">+ New character</option>
          </select>
        </li>
        <li>
          <router-link :to="'/' + id + '/stats'">Stats</router-link>
        </li>
        <li>
          <router-link :to="'/' + id + '/spells'">Spells</router-link>
        </li>
      </ul>
    </div>
    <span class="glyphicon glyphicon-align-justify sidebar-toggle-floating btn btn-default btn-circle" v-on:click="toggleSidebar()"></span>
    <div id="page-content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import api from './api.js'
  require('../node_modules/startbootstrap-simple-sidebar/css/simple-sidebar.css')

  export default {
    data() {
      return {
        id: null,
        characterList: [],
        sidebarToggled: false
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
      },
      toggleSidebar() {
        this.sidebarToggled = !this.sidebarToggled
      }
    },
    watch: {
      '$route': 'fetchData',
      id: 'loadCharacter'
    }
  }
</script>

<style lang="sass?indentedSyntax" scoped>
.sidebar-brand
  color: lightgrey

.sidebar-nav 
  select
    margin-left: 15px
    margin-bottom: 5px
    width: 90%

    background-color: black
    color: #999
    border-color: #444
    &:hover
      background-color: #333
      color: white
      border-color: #444

.sidebar-toggle
  font-size: 1.4em
  position: absolute
  top: 10px
  right: 10px
  background: black
  color: lightgrey
  border-color: lightgrey

  &:hover
    color: white
    background: #333
    border-color: lightgrey

.sidebar-toggle-floating
  font-size: 1.4em
  left: 10px
  top: 10px
  position: fixed
  z-index: 10

.btn-circle
  width: 40px
  height: 40px
  text-align: center
  padding: 5px 0
  line-height: 1.428571429
  border-radius: 20px
</style>
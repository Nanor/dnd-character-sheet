// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import $ from 'jquery'
import select2 from 'select2'

import App from './App'
import Stats from './components/Stats.vue'
import Spells from './components/Spells.vue'

import api from './api.js'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '',
      component: {
        template: '<div/>',
        mounted() {
          let latestCharacter = api.latestCharacter() || api.newCharacter()
          this.$router.push(latestCharacter.id)
        }
      }
    },
    {
      path: '/:id/stats',
      component: Stats,
      alias: '/:id'
    },
    {
      path: '/:id/spells',
      component: Spells
    }
  ]
})

Vue.component('select2', {
  props: ['options', 'value'],
  template: '#select2-template',
  mounted: function () {
    var vm = this
    $(this.$el)
      .val(this.value)
      // init select2
      .select2({
        width: '100%'
      })
      // emit event on change.
      .on('change', function () {
        vm.$emit('input', $(vm.$el).val())
      })
  },
  destroyed: function () {
    $(this.$el).off().select2('destroy')
  }
})

const vue = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
})

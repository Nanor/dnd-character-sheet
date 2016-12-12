<template>
  <div id="app container">
    <div class="sidebar col-xs-2">
      <ul>
        <li><router-link to='/stats'>stats</router-link></li>
        <li><router-link to='/spells'>spells</router-link></li>
      </ul>
    </div>
    <div class="main col-xs-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
</script>

<style lang="sass?indentedSyntax" scoped>

</style>

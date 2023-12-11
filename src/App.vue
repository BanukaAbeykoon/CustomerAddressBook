<template>
  <div id="app">
    <listCC/>
    <NavbarComponent/>
    
    
    <router-view />
  </div>
</template>

<script>

import listCC from './components/listCC.vue';
import NavbarComponent from './components/NavbarComponent.vue';


export default {
  name: 'App',
  components: { listCC, NavbarComponent },
  
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

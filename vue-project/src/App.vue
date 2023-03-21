<template>
  <!-- <SideNavBar v-if="!mobileView" /> -->
  <router-view></router-view>
</template>


<script>
  import SideNavBar from "./components/SideNavBar.vue"
  export default{
      name: 'App',
      // components:{
      //   SideNavBar
      // }
    
  }
</script>
<style scoped>


</style>

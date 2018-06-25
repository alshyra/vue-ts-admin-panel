<template>
  <div id="app">
    <router-view class="margin-top"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      isConnected: false,
    };
  },
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
#app {
  .inverted {
    color: #adb9c5;
  }
  .margin-top{
    margin-top: 30px;
  }
}
</style>

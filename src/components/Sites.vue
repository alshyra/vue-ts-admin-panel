<template>
    <div class="users ui main container text">
    <h1>This is sites page</h1>

    <div class="ui container grid">
        <div class="wide row">
            <div class="eight wide column">Name</div>
            <div class="six wide column">Id</div>
            <div class="two wide column">Action</div>
        </div>
        <div class="wide row alternback" v-for="site in sites" :key="site.id">
            <div class="eight wide column">{{site.siteName}}</div>
            <div class="six wide column noWrap">{{site.id}}</div>
            <button class="ui button" @click="add">Add</button>
        </div>
    </div>
    </div>
</template>


<style lang="scss">
.noWrap {
  white-space: nowrap;
}
</style>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Axios from 'axios';

@Component
export default class Sites extends Vue {
  public sites: Array<{ name: string }> = [];
  public created() {
    Axios.get(`https://api-itg.weaselspark.com/sites/all`).then((response) => {
      console.log(response);
      this.sites = response.data;
    });
  }
  public add(){
      console.log('called');
  }
}
</script>


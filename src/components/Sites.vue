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
            <router-link class="ui button" :to="{ name: 'users', params: { siteId: site.id }}">Add</router-link>
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

interface ISite {
  siteName: string;
  id: string;
}

@Component
export default class Sites extends Vue {
  public sites: ISite[] = [];
  public created() {
    Axios.get(`https://api-itg.weaselspark.com/sites/all`).then((response) => {
      console.log(response);
      this.sites = response.data.sort((a: ISite, b: ISite) => (a.siteName > b.siteName ? 1 : -1));
    });
  }
  public add(site: ISite) {
    this.$router.push(`users/${site.id}`);
  }
}
</script>


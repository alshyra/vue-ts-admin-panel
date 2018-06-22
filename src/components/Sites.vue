<template>
    <div class="users ui main container text">
      <h1>Sites</h1>
      <div v-if="isLoading"  class="ui active centered loader"></div>
      <div v-if="!isLoading">
          <div class="ui fluid icon input">
            <input v-model="search" type="text" placeholder="Search a website name">
            <i class="search icon"></i>
          </div>
          <div class="ui container grid">
            <div class="wide row">
                <div class="eight wide column">Name</div>
                <div class="six wide column">Id</div>
                <div class="two wide column">Action</div>
            </div>
            <div class="wide row alternback" v-for="site in searchedSite" :key="site.id">
                <div class="eight wide column">{{site.siteName}}</div>
                <div class="six wide column noWrap">{{site.id}}</div>
                <button class="ui button" @click="goToUsers(site)">Add</button>
            </div>
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
import SitesStore, { ISite } from '@/stores/SitesStore';
import Axios from 'axios';

@Component
export default class Sites extends Vue {
  public sites: ISite[] = [];
  public isLoading = true;
  public search: string = '';
  public created() {
    SitesStore.getSites().then((sites) => {
      this.isLoading = false;
      this.sites = sites.sort((a: ISite, b: ISite) => (a.siteName > b.siteName ? 1 : -1));
    });
  }
  public goToUsers(site: ISite) {
    SitesStore.site = site;
    this.$router.push({ name: 'users', params: { siteId: site.id } });
  }
  get searchedSite() {
    if (this.search && this.search !== '') {
      return this.sites.filter((site) => site.siteName.toLowerCase().search(this.search.toLowerCase()) >= 0);
    } else {
      return this.sites;
    }
  }
}
</script>


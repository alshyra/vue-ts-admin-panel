<template>
    <div>
      <transition name="fade">
        <div v-if="isLoading" class="ui active centered loader"></div>
      </transition>
      <transition name="fade">
        <div v-if="!isLoading">
            <div class="ui inverted large menu top fixed">
                <div class="header item">Sites</div>
                <div class="right item">
                  <div class="ui icon input">
                    <input class="inverted" v-model="search" type="text" placeholder="Search a website name">
                    <i class="search icon"></i>
                  </div>
                </div>
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
                  <button class="ui icon button" @click="goToUsers(site)">
                    <i class="user plus icon"></i>
                  </button>
                  <button class="ui icon button" @click="deleteSite(site)">
                    <i class="trash icon"></i>
                  </button>
              </div>
            </div>
        </div>
      </transition>
      <modal-confirm @close="close" bindedClass="trash" :content="confirmMessage" :active="showModal"></modal-confirm>
    </div>
</template>


<style lang="scss">
.noWrap {
  white-space: nowrap;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100px);
}
</style>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SitesStore, { ISite } from '@/stores/SitesStore';
import ModalConfirm from '@/components/ModalConfirm.vue';
import Axios from 'axios';
@Component({
  components: { ModalConfirm },
})
export default class Sites extends Vue {
  public sites: ISite[] = [];
  public siteToDelete: ISite = {
    siteName: '',
    id: '',
  };
  public isLoading = true;
  public showModal = false;
  public search: string = '';

  public created() {
    this.getSites();
  }

  public goToUsers(site: ISite) {
    SitesStore.site = site;
    this.$router.push({ name: 'users', params: { siteId: site.id } });
  }

  public deleteSite(site: ISite) {
    this.showModal = true;
    this.siteToDelete = site;
  }

  public close(res: boolean) {
    this.showModal = false;
    if (res) {
      SitesStore.deleteSite(this.siteToDelete.id).then(() => {
        this.isLoading = true;
        window.setTimeout(() => {
          this.getSites(true);
        }, 2000);
      });
    }
  }

  public async getSites(forceRefresh: boolean = false) {
    this.isLoading = true;
    this.sites = await SitesStore.getSites(forceRefresh);
    this.sites = this.sites.sort((a: ISite, b: ISite) => (a.siteName > b.siteName ? 1 : -1));
    this.isLoading = false;
  }

  get searchedSite() {
    if (this.search && this.search !== '') {
      return this.sites.filter((site) => site.siteName.toLowerCase().search(this.search.toLowerCase()) >= 0);
    } else {
      return this.sites;
    }
  }
  get confirmMessage() {
    return `Voulez vous supprimer le site ${this.siteToDelete.siteName}?`;
  }
}
</script>


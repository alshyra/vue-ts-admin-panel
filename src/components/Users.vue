<template>
  <div>
    <transition name="fade">
      <div class="ui centered loader active" v-if="isLoading"></div>
    </transition>
    <transition name="fade">
      <div v-if="!isLoading">
        <div class="ui large menu top fixed inverted">
          <div class="item">
            <button class="ui inverted labeled button icon" @click="back">
              <i class="inverted arrow left icon"></i>
              Back
            </button>
          </div>
          <div class="header item">Users of {{ site.siteName }}</div>
          <div class="right item">
            <button class="ui inverted action button icon red" @click="deleteSite(site)">
              <i class="trash icon inverted red"></i>
            </button>
          </div>
        </div>
        <div class="ui container">
          <user-detail class="sixteen wide column" @updateUsers="updateUsers" ></user-detail>
          <div class="ui inverted segment">
            <div class="ui inverted relaxed divided list">
              <div class="item" v-if="users && users.length" v-for="user in users" :key="user.email">
                  <div class="header">{{user.email}}</div>
                  {{user.role}} ({{user.id}})
              </div>
              <div class="item" v-if="!users || !users.length">
                <div class="header">Il n'y a pas d'utilisateurs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.alternback {
  color: white;
}
.alternback:nth-child(even) {
  background-color: rgb(87, 87, 87);
}

.alternback:nth-child(odd) {
  background-color: rgb(129, 129, 129);
}
</style>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Axios from 'axios';
import UsersStore, { IUser } from '@/stores/UsersStore';
import UserDetail from '@/components/UserDetail.vue';
import SitesStore, { ISite } from '@/stores/SitesStore';

@Component({
  components: { UserDetail },
})
export default class Users extends Vue {
  public isLoading = true;
  public users: IUser[] = [];
  public site: ISite = {
    siteName: '',
    id: '',
    collectActive: false,
  };

  public back() {
    this.$router.back();
  }

  public async created() {
    this.users = await UsersStore.getUsers(this.$route.params.siteId);
    this.isLoading = false;
    this.users = this.users.sort((a, b) => (a.email > b.email ? 1 : -1));
    this.site = SitesStore.site;
  }

  public async updateUsers() {
    this.isLoading = true;
    this.users = await UsersStore.getUsers(this.$route.params.siteId);
    this.isLoading = false;
  }

  public async deleteSite(site: ISite) {
    this.isLoading = true;
    await SitesStore.deleteSite(site.id);
    await SitesStore.getSites(true);
    this.$router.push({ name: 'sites' });
  }
}
</script>

<template>
  <div class="users ui main container text">
    <h1>This is users page</h1>
    <user-detail></user-detail>
    <div class="ui container grid">
      <div class="wide row">
        <div class="five wide column noWrap">Id:</div>
        <div class="five wide column">Email:</div>
        <div class="five wide column">Role:</div>
      </div>
      <div class="wide row alternback" v-for="user in users" :key="user.email">
        <div class="five wide column"> {{user.id}}</div>
        <div class="five wide column"> {{user.email}}</div>
        <div class="five wide column"> {{user.role}}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.users {
  padding-top: 50px;
}
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

@Component({
  components: { UserDetail },
})
export default class Users extends Vue {
  public users: IUser[] = [];
  public async created() {
    this.users = await UsersStore.getUsers(this.$route.params.siteId);
    this.users = this.users.sort((a, b) => (a.email > b.email ? 1 : -1));
  }
}
</script>

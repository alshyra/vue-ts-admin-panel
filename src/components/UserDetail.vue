<template>
    <form class="ui form" @submit.prevent="saveUser">
        <div>
            <div class="field ui fluid input">
                <input placeholder="Email" type="text" name="email" v-model="user.email">
            </div>
            <div class="ui field fluid action input">
                <select class="ui dropdown" v-model="user.role" name="role">
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                </select>
                <button class="ui primary right attached button" :class="{loading: isLoading}" type="submit">Ajouter</button>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Axios from 'axios';
import UsersStore, { IUser } from '@/stores/UsersStore';

@Component
export default class UserDetail extends Vue {
  public isLoading = false;
  public user: IUser = {
    email: '',
    language: 'FR',
    role: 'ADMIN',
    signupPending: false,
  };
  public async saveUser() {
    this.isLoading = true;
    if (this.user) {
      await UsersStore.saveUser(this.$route.params.siteId, this.user);
      this.isLoading = false;
      this.$emit('updateUsers');
    }
  }
}
</script>

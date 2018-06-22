<template>
    <div>
    <div class="ui centered inline loader active" v-if="isLoading"></div>
    <form class="ui form" v-if="!isLoading" @submit.prevent="saveUser">
        <div class="inline fields">
            <div class="ten wide field">
                <label for="email">Email</label>
                <input type="text" name="email" v-model="user.email">
            </div>
            <div class="six wide field">
                <select class="ui dropdown" v-model="user.role" name="role">
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                </select>
            </div>
            <button class="ui two wide button" type="submit">Ajouter</button>
        </div>
    </form>
    </div>
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
    }
  }
}
</script>

<template>
    <form class="ui form" @submit.prevent="saveUser">
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Axios from 'axios';
import UsersStore, { IUser } from '@/stores/UsersStore';

@Component
export default class UserDetail extends Vue {
  public user: IUser = {
    email: '',
    language: 'FR',
    role: 'ADMIN',
    signupPending: false,
  };
  public saveUser() {
    if (this.user) {
      UsersStore.saveUser(this.$route.params.siteId, this.user);
    }
  }
}
</script>

<template>
  <div>
    <transition name="fade">
      <div v-if="isLoading" class="ui active centered loader"></div>
    </transition>
    <transition name="fade">
      <div id="login-main" class="ui main container text" v-if="!isLoading">
        <div>
          <h1>WeaselSpark Administration</h1>
          <form class="form ui" @submit.prevent="checkForm" >
            <div v-if="error" class="ui vertical beg segment transition visible">
              <div class="ui red header">
                <i class="disabled warning sign icon"></i>
                <div class="content">
                  {{error}}
                </div>
              </div>
            </div>
            <div class="field">
              <label for="login">Login</label>
              <input v-model="login" type="text" name="login" id="login" autocomplete="off">
            </div>
            <div class="field">
              <label for="password">Password</label>
              <input v-model="password" type="password" name="password" id="password" autocomplete="off">
            </div>
            <button class="ui right floated primary button" type="submit">Envoyer</button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Axios from 'axios';
import jwtStore from '@/stores/JwtStore';
import Vuex from 'vuex';

@Component({
  components: {},
})
export default class Login extends Vue {
  public login: string = '';
  public password: string = '';
  public error: string = '';
  public isLoading: boolean = false;
  constructor() {
    super();
  }
  public async checkForm() {
    try {
      this.isLoading = true;
      const response = await jwtStore.loginUser(this.login, this.password);
      this.error = '';
      this.$router.push('/sites');
    } catch (error) {
      this.error = 'Bad Credentials';
      this.isLoading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
#login-main {
  padding-top: 50px;
}
.error {
  color: rgb(139, 28, 20);
}
</style>

<template>
  <div id="login-main" class="ui main container text">
    <div>
      <h1>Cette page vous permet d'administrer WeaselSpark</h1>
      <h3>Mais d'abord authentifie toi:</h3>
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
        <button class="ui button" type="submit">Envoyer</button>
      </form>
    </div>
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
  public login: string = 'antoine.savajols@gmail.com';
  public password: string = 'Alshyra123';
  public error: string = '';
  constructor() {
    super();
  }
  public async checkForm() {
    try {
      const response = await jwtStore.loginUser(this.login, this.password);
      this.error = '';
      this.$router.push('/sites');
    } catch (error) {
      this.error = 'Bad Credentials';
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

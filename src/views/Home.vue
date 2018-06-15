<template>
  <div id="login-main" class="ui main container text">
    <div>
      <h1>Cette page vous permet d'administrer WeaselSpark</h1>
      <h3>Mais d'abord authentifie toi:</h3>
      <form class="form ui" @submit.prevent="checkForm" >
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

@Component({
  components: {},
})
export default class Home extends Vue {
  public login: string = 'Login';
  public password: string = 'password';
  constructor() {
    super();
  }
  public checkForm() {
    if (this.login === 'antoine.savajols@gmail.com' && this.password === 'pass') {
      alert('succes');
    }
  }
}
</script>

<style lang="scss" scoped>
#login-main {
  padding-top: 50px;
}
</style>

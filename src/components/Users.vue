<template>
  <div class="users ui main container text">
    <h1>This is users page</h1>

    <div class="ui container grid">
      <div class="wide row">
        <div class="four wide column">Name:</div>
        <div class="four wide column">Username:</div>
        <div class="four wide column">Email:</div>
      </div>
      <div class="wide row alternback" v-for="user in users" :key="user.email">
        <div class="four wide column"> {{user.name}}</div>
        <div class="four wide column"> {{user.username}}</div>
        <div class="four wide column"> {{user.email}}</div>
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

@Component
export default class Users extends Vue {
  public users: Array<{ name: string }> = [];
  public created() {
    Axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      this.users = response.data;
    });
  }
}
</script>

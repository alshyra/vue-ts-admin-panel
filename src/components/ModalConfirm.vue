<template>
    <transition name="fader">
        <div class="ui dimmer modals page visible active" v-if="active">
            <div class="ui small basic modal visible active">
                <div class="ui icon header">
                    <i class="icon" :class="bindedClass"></i>
                    <h1>{{ title }}</h1>
                </div>
                <div class="content">
                    <p>{{content}}</p>
                </div>
                <div class="actions">
                    <button class="ui red basic cancel inverted button" @click="cancelModal">
                        <i class="icon remove"></i>
                        Non
                    </button>
                    <button class="ui green ok inverted button" @click="confirmModal">
                        <i class="icon checkmark"></i>
                        Oui
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss">
.fader-enter-active,
.fader-leave-active {
  transition: opacity 0.5s;
}
.fader-enter, .fader-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  props: {
    content: String,
    title: String,
    bindedClass: String,
    active: Boolean,
  },
})
export default class ModalConfirm extends Vue {
  public canceled: boolean = false;
  public cancelModal() {
    this.$emit('close', false);
  }
  public confirmModal() {
    this.$emit('close', true);
  }
}
</script>

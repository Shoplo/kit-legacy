<template>
  <div class="app-welcome">
    <div class="row align-center">
      <div class="sm-12 columns">
        <img :src="imgSrc" v-on:load="onLoaded = '1'" :style="{ opacity: onLoaded}">
        <h2>{{ title }}</h2>
        <router-link :to="action.url">
          <button class="sh-btn sh-btn-blue">{{ action.content }}</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  @Component({})
  export default class ShAppWelcome extends Vue {
    @Prop() private imgSrc!: string;
    @Prop() private title!: string;
    @Prop() private description!: string;
    @Prop() private action!: object;

    private onLoaded: string = '0';
  }
</script>


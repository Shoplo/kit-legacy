<template>
  <div class="app-navigation">
    <div class="tabs is-centered">
      <ul>
        <router-link v-for="link in links" :to="link.url" :key="link.url" tag="li">
          <a>
            {{ link.content }}
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component({})
  export default class ShAppNavigation extends Vue {
    @Prop() private links!: object[];
  }
</script>

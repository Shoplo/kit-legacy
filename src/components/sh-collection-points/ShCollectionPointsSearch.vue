<template>
  <div id="search">
    <b-autocomplete
      v-model="name"
      :data="data"
      :placeholder="placeholder"
      class="dropdown-fake-show sh-autocomplete"
      field="title"
      :loading="isFetching"
      @input="getAsyncData"
      @select="selectItem"
    ></b-autocomplete>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class ShCollectionPointsSearch extends Vue {
    @Prop({default: 'Search'}) public placeholder!: string;
    @Prop({default: 'No results found'}) public noResults!: string;

    public data: any[] = [];
    public name: string = '';
    public selected: any = null;
    public isFetching: boolean = false;
    public cancel: any;

    public getAsyncData () {
      console.log('getSync');
    }

    public selectItem () {
      console.log('selectItem');
    }
  }
</script>

<style>

</style>

<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <input @input="debounceInput" type="text"/>
    <ShCollectionPointsSearch></ShCollectionPointsSearch>
    <ShCollectionPointsMap :width="'100%'" :height="'400px'" :query="query"></ShCollectionPointsMap>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import HelloWorld from "./components/HelloWorld.vue";
  import ShCollectionPointsSearch from "./components/sh-collection-points/ShCollectionPointsSearch.vue";
  import ShCollectionPointsMap from "./components/sh-collection-points/ShCollectionPointsMap.vue";
  import _ from "lodash";

  @Component({
    components: {
      HelloWorld,
      ShCollectionPointsSearch,
      ShCollectionPointsMap
    },
  })
  export default class App extends Vue {
    public query: string = "11-042";

    public debounceInput(e: any) {
      setInterval(() => {
        this.query = e.target.value;
      }, 500);
    }

    public proccessSelected(value: any) {
      console.log('proccessSelected', value)
    }


  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

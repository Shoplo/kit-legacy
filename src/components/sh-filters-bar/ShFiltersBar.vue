<template>
  <div class="filters-bar">
    <div class="row">
      <slot name="left_column"></slot>
      <div class="sm-12 columns" :class="searchBarClass">
        <div class="search-wrapper">
          <input class="sh-form-control" :placeholder="$t(translations.filters_search_placeholder)" type="search" v-model="queryString">
        </div>
      </div>
      <slot name="right_column"></slot>
    </div>
  </div>
</template>


<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { EventBus } from '../../helpers/EventBus';

  @Component({})
  export default class ShFiltersBar extends Vue {
    public $t:any = this.$t.bind(this);
    @Prop() private showFilters!:boolean;
    @Prop() private filters!:object[];
    @Prop() private searchBarClass!: string;
    @Prop() private translations!: object;
    @Prop() private eventBus!: any;
    private filter: any = {};
    private queryString: string = '';
    private timeout: any = null;

    @Watch('queryString')
    public searchQuery(){
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.searchData();
      }, 500);
    }


    @Watch('filter', {deep: true})
    public searchData (filter?: any){
      const searchData: any = {};
      if (filter) {
        this.filter = filter;
      }
      if (this.queryString) {
        searchData.query = this.queryString;
      }
      if (this.filter) {
          searchData.filters = []
          for (let key in this.filter) {
            if (this.filter[key] !== '') {
              const index = this.filter[key].value.indexOf('=');
              const val = this.filter[key].value;

              searchData.filters.push({
                param: val.substring(0, index),
                value: val.substring(index + 1, val.length)
              });
            }

          }

      }
      this.$emit('getSearchData', searchData)
    }



    private mounted() {
      if (this.eventBus) {
        this.eventBus.$on('filterChange', (data: any) => {
          this.filter = data;
        });
      }
    }
  }
</script>

<style lang="scss">
  .filters-bar {
    padding: 20px 0;
  }
</style>

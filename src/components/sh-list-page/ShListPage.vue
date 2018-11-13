<template>
  <div class="sh-list-page" v-if="method">
    <div class="items-list" v-if="!showEmptyList" :class="hasActionBar ? 'has-actions-bar': ''">
      <ShFiltersBar
        v-if="showFilters || searchBar"
        @getSearchData="getSearchData"
        :filters="filters"
        :searchBarClass="searchBarClass"
        :eventBus="eventBus"
        :translations="translations"
      >
        <template slot="left_column" slot-scope="props">
          <slot name="filters_bar_left_column" :scope="props"></slot>
        </template>
        <template slot="right_column" slot-scope="props">
          <slot name="filters_bar_right_column" :scope="props"></slot>
        </template>
      </ShFiltersBar>
      <b-table
        :data="tableData"
        :columns="tableColumns"
        :checked-rows.sync="checkedRows"
        :checkable="checkable"
        :mobile-cards="hasMobileCards"
        backend-sorting
        @sort="onSort"
        :loading="loading"
        @check="checkRow"
        :default-sort-direction="defaultSortDirection"
        :default-sort="defaultSort"
      >
        <template slot-scope="props">
          <slot name="columns" :scope="props"></slot>
        </template>
        <template slot="empty">
          <div class="list-no-results" v-if="!loading">
            <img src="images/common/blankslate_no_results.svg">
            <p>{{ $t(translations.empty_search_results) }}</p>
          </div>
        </template>
      </b-table>

      <ShPaginationList
        v-show="tableData.length"
        :total="total"
        :limit="this.limit"
        :count="count"
        :current="page"
        :translations="translations"
        v-on:paginate="paginate"
      ></ShPaginationList>
      <ShActionBar
        v-if="hasActionBar && eventBus"
        :disabledSubmit="disabledSubmit"
        :show="showActionBar"
        :selectedItems="checkedRows"
        :allSelected="allSelected"
        :eventBus="eventBus"
        :translations="translations"
        @resetSelection="resetSelection"
        @actionBarSave="actionBarSaveHandler"
        @proccessAllChange="proccessAllChange"
      >
        <template slot="action_types">
          <slot name="action_bar_action_types"></slot>
        </template>
      </ShActionBar>
    </div>
    <slot name="empty_list" v-if="showEmptyList"></slot>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Inject, Watch, Prop} from 'vue-property-decorator';
  import ShPaginationList from '../sh-pagination-list'
  import ShFiltersBar from '../sh-filters-bar';
  import ShActionBar from '../sh-actions-bar';
  import _ from 'lodash';
  import axios from 'axios';

  interface ListOptions {
    page: number,
    limit: number
  }

  @Component({
    components: {
      ShPaginationList,
      ShFiltersBar,
      ShActionBar
    }
  })
  export default class ListPage extends Vue {
    public $t:any = this.$t.bind(this);
    @Prop({ required: true }) public method: string;
    @Prop({ default: 50 }) public limit: number;
    @Prop() public columns: any;
    @Prop({ default: false }) public searchBar: boolean;
    @Prop({ default: 'md-8'}) public searchBarClass: string;
    @Prop({ default: false }) public checkable: boolean;
    @Prop({ default: false }) public hasMobileCards: boolean;
    @Prop({ default: 'asc' }) public defaultSortDirection: string;
    @Prop({ default: '' }) public defaultSort: string;
    @Prop({default: function() {
        return {}
      }}) public filters: any;
    @Prop() public eventBus: any;
    @Prop({ default: axios }) public axios: any;
    @Prop({ default: function() {
        return {}
      }}) public actions: any;
    @Prop({
      default: function() {
        return {
          action_bar_submit: 'default.global.go',
          action_bar_cancel: 'default.global.cancel',
          action_bar_selected_items: 'default.action_bar.selected_items',
          action_bar_selected_many_items: 'default.action_bar.selected_many_items',
          filters_search_placeholder: 'default.global.search',
          filters_select_placeholder: 'default.global.select',
          pagination_go: 'default.global.go',
          empty_search_results: 'default.global.empty_search_results'
        }
      }
    }) public translations: object;
    @Prop() public selectedItems: any;
    public loading: boolean = false;
    public pages: number = 0;
    public page: number = 1;
    public count: number = 0;
    public total: any = 0;
    public tableData: any[] = [];
    public checkedRows: any[] = [];
    public tableColumns: any[] = [];
    public hasActionBar: boolean = Object.keys(this.actions).length > 0;
    public showFilters: boolean = Object.keys(this.filters).length > 0;
    public showActionBar: boolean = false;
    public disabledSubmit: boolean = true;
    public allSelected: boolean = false;
    public showEmptyList: boolean = false;
    public sortParams: any = {
      page: this.page,
      limit: this.limit
    };

    public paginate (page: any) {
      this.$emit('paginate', page);
      this.sortParams.page = page;
      this.getList(this.sortParams);
    }

    public onPageChange(page: any) {
      this.sortParams.page = page;
      this.getList(this.sortParams);
    }

    public onSort(field: any, order: any) {
      this.clearSorting();
      this.sortParams[field] = order;
      this.getList(this.sortParams)
    }

    private getList(params: object, first?: boolean) {
      this.loading = true;
      let appAxios = axios;
      if (this.axios) {
        appAxios = this.axios;
      }
      appAxios.get(this.method,
        {params: params}
      ).then((response: any) => {
        this.pages = response.data.pages;
        this.total = Number(response.data.total);
        this.tableData = response.data.items;
        if (first && this.total === 0) {
          this.showEmptyList = true;
        }
        if (this.checkedRows.length) {
          this.findSelectedRows();
        }

        this.loading = false;
      });

    }

    private getSearchData(data: any) {
      this.sortParams.page = 1;
      if (data.query) {
        this.sortParams.query = data.query;
      } else if (!data.query && this.sortParams.query) {
        delete this.sortParams.query;
      }
      if (data.filters) {
        let i = 0,
          length = data.filters.length;

          for (i; i < length; i++) {
            if (data.filters[i].value === 'none') {
              delete this.sortParams[data.filters[i].param];
            } else {
              this.sortParams[data.filters[i].param] = data.filters[i].value
            }
          }

      } else {
        this.clearFilters()
      }

      this.getList(this.sortParams);
    }

    private beforeMount() {
      console.log('emptty slot', Vue);
      if (typeof this.columns !== 'undefined') {
        this.tableColumns = this.columns
      }
      if (this.defaultSort) {
        this.sortParams[this.defaultSort] = this.defaultSortDirection;
      }
      this.getList(this.sortParams, true);
    }

    private clearFilters() {
      this.filters.forEach((e: any) => {
        e.value.forEach((elem: any) => {
          const val = elem.value;
          const index = val.indexOf('=');
          const param = val.substring(0, index);

          if (this.sortParams[param]) {
            delete this.sortParams[param];
          }
        });

      })
    }

    private checkRow(checkedList: any[], row: object) {
      if (checkedList.length) {
        this.showActionBar = true;
        this.changeAllSelected(checkedList);
      } else {
        this.resetSelection(null);
      }
    }


    private proccessAllChange(selectAll: boolean) {
      if (selectAll) {
        const selected = _.filter(this.checkedRows, (e: any) => {
          return _.find(this.tableData, ['id', e.id]);
        });


        if (selected.length === this.limit || selected.length === this.total) {
          this.checkedRows = _.filter(this.checkedRows, (e: any) => {
            return !_.find(selected, ['id', e.id]);
          });

          if (this.checkedRows.length === 0) {
            this.resetSelection(null);
          }
        } else {
          const tableDataUnique = _.filter(this.tableData, (e: any) => {
            return !_.find(selected, ['id', e.id]);
          });

          this.checkedRows = this.checkedRows.concat(tableDataUnique);
        }
      } else {
        this.showActionBar = false;
        this.allSelected = false;
        this.checkedRows = [];
        this.disabledSubmit = true;
      }

    }

    private clearSorting() {
      const sortKeys = _.filter(this.columns, ['sortable', true]);

      sortKeys.forEach((e: any) => {
        const sortName = e.field;
        if (this.sortParams[sortName]) {
          delete this.sortParams[sortName];
        }
      })
    }

    private resetSelection(actionBarData: any) {
      this.showActionBar = false;
      this.checkedRows = [];
      this.disabledSubmit = true;
      this.allSelected = false;
      this.$emit('saveActionBar', actionBarData);
    }

    private actionBarSaveHandler(data: any){
      const ids: string[] = [];
      data.items.forEach((e: any) => {
        ids.push(e.id);
      });

      const actionBarData = {
        ids,
        action: data
      };

      this.resetSelection(actionBarData);
    }

    private findSelectedRows() {
      let i = 0;
      const length = this.tableData.length;
      for (i; i < length; i++) {
        const find = _.findIndex(this.checkedRows, ['id', this.tableData[i].id]);
        console.log('find', find);
        if (find !== -1) {
          this.$set(this.checkedRows, find, this.tableData[i])
        }
      }
      this.changeAllSelected(this.checkedRows);
    }

    private changeAllSelected(checkedList: any[]) {
      const selected = _.filter(checkedList, (e: any) => {
        return _.find(this.tableData, ['id', e.id]);
      });

      if (selected.length === this.limit || selected.length === this.total) {
        this.allSelected = true;
      } else {
        this.allSelected = false;
      }
    }

    private toCamelCase(value: string) {
      value = value.toLowerCase().replace(/(?:(^.)|([-_\s]+.))/g, (match: any) => {
        return match.charAt(match.length - 1).toUpperCase();
      });
      return value.charAt(0).toLowerCase() + value.substring(1);
    }
  }
</script>

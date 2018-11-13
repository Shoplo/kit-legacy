<template>
  <div class="vue-pagination align-right" v-if="totalPages > 1">
    <paginate
      v-model="selectedPage"
      :page-count="totalPages"
      :click-handler="paginate"
      :next-class="'paginate-next'"
      :prev-class="'paginate-prev'"
      prev-text="<i class='sh-icon sh-icon-arrow-back'></i>"
      next-text="<i class='sh-icon sh-icon-arrow-back'></i>"
      :container-class="'pagination-pages'"
    >
    </paginate>
    <input id="paginator-page-param" class="sh-form-control" type="number" name="page" v-model="selectedPage" min="1"  :max="totalPages">
    <button type="button" id="paginator-page-submit" @click="goTo" class="go sh-btn sh-btn-narrow sh-btn-white">{{ $t(translations.pagination_go) }}</button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import paginate from 'vuejs-paginate';

  @Component({
    components: {
      paginate,
    },
  })
  export default class ShPaginationList extends Vue {
    @Prop() public count!: number;
    @Prop() public total!: number;
    @Prop() public current!: number;
    @Prop() public limit!: number;
    @Prop() private translations!: object;

    public selectedPage: number = 1;

    public paginate(page: any) {
      this.$emit('paginate', page);
    }

    public goTo() {
      this.$emit('paginate', this.selectedPage);
    }

    get totalPages() {
      let pages = (this.total - this.total % this.limit) / this.limit;

      if (pages === 0) {
        pages = 1
      } else if (this.total % this.limit > 0) {
        pages += 1;
      }
      return pages;
    }
  }
</script>

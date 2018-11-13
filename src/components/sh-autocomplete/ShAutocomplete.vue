<template>
  <section>
    <b-autocomplete
      v-model="name"
      :data="data"
      :placeholder="placeholder"
      class="dropdown-fake-show sh-autocomplete"
      field="title"
      :loading="isFetching"
      @input="getAsyncData"
      @select="selectItem"
    >
      <template slot-scope="props">
        <div class="sh-autocomplete-item align-middle" :class="{'unavailable': props.option.quantity === 0}">
          <div class="image thumb-40">
            <img width="40" :src="props.option.thumbnail">
          </div>
          <div class="sh-autocompleter-name">
            {{ props.option.name }}
            <br>
            <span v-for="(property, index) in props.option.activeProps" v-if="property.id !== 0"
                  v-bind:key="property.id">{{property.name}}<span
              v-if="index !== props.option.activeProps.length - 1">, </span></span>
          </div>
          <div class="sh-autocomplete-sku">
            <span>{{props.option.sku}}</span>
          </div>
          <div class="sh-autocomplete-price ">
            <span>{{props.option.price|money}}</span>
          </div>
        </div>
      </template>
      <template slot="empty">{{noResults}}</template>
    </b-autocomplete>
  </section>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import _ from 'lodash';
  import axios from 'axios';

  @Component({})
  export default class ShAutocomplete extends Vue {
    @Prop({default: 'Search'}) public placeholder!: string;
    @Prop({default: 'No results found'}) public noResults!: string;
    public data: any[] = [];
    public name: string = '';
    public selected: any = null;
    public isFetching: boolean = false;
    public cancel: any;

    public getAsyncData() {
      this.data = [];
      this.isFetching = true;

      const CancelToken = axios.CancelToken;
      const self = this;
      const searchParams = {
        method: 'admin.product.list',
        query: this.name,
      };

      if (this.cancel) {
        this.cancel();
      }
      axios.get('/ajax', {
        params: searchParams,
        cancelToken: new CancelToken(function executor(c) {
          self.cancel = c;
        })
      }).then(response => {
        this.isFetching = false;

        _.each(response.data.items, (o: any) => {
          _.each(o.variants, (v: any) => {
            this.data.push(this.setVariant(o, v))
          });
        });
      }).catch((thrown) => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown);
        } else {
          // handle error
        }
      });
    }
    public created () {
      console.log('placeholder', this.placeholder);
      console.log('noResults', this.noResults);
    }
    public selectItem(option: any) {
      this.selected = option;
      this.$emit('select-item', option);
    }

    private setVariant(product: any, variant: any) {
      variant.activeProps = [];
      _.each(variant.properties, (o: any) => {
        if (o.id !== 0) {
          variant.activeProps.push(o);
        }
      });
      variant.name = product.name;
      return variant;
    }
  }
</script>

<template>
  <input
    v-model="value"
    @change="change"
    :name="name"
    :class="{class}"
    :disabled="disabled"
    :required="required"
    :min="min"
    :max="max"
    :placeholder="placeholder"
    v-validate="validate"
  />
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  @Component({})
  export default class ShChecklist extends Vue {
    @Prop() public id!: string;
    @Prop() public name!: string;
    @Prop() public class!: string;
    @Prop() public disabled!: boolean;
    @Prop() public required!: boolean;
    @Prop() public readonly!: boolean;
    @Prop() public min!: number;
    @Prop() public max!: number;
    @Prop() public placeholder!: string;
    @Prop() public value!: string;
    @Prop() public validate!: any;

    public change() {
      this.$emit('change', this.value);
    }

  }
</script>


<template>
  <ul :class="['radio-group',
  vertical === true ? 'radio-group-vertical':'']">
    <li>
      <input
        type="radio"
        v-model="value"
        @change="change"
        :name="name"
        :id="id"
        :class="[
        'input-radio',
        { 'error': errors.has(name) },
        {class}
        ]"
        :disabled="disabled"
        :required="required"
        v-validate="validate"
      />
      <label :for="id">{{ label }}</label>
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  @Component({})
  export default class ShRadios extends Vue {
    @Prop() public id!: string;
    @Prop() public name!: string;
    @Prop() public class!: string;
    @Prop() public label!: string;
    @Prop() public disabled!: boolean;
    @Prop() public required!: boolean;
    @Prop() public readonly!: boolean;
    @Prop() public min!: number;
    @Prop() public max!: number;
    @Prop() public placeholder!: string;
    @Prop() public value!: string;
    @Prop() public validate!: any;
    @Prop() public vertical!: boolean;

    public change() {
      this.$emit('change', this.value);
    }

  }
</script>


<template>
  <section class="onoffswitch">
    <input
      type="checkbox"
      v-model="value"
      @change="change"
      :name="name"
      :id="id"
      :class="[
        'onoffswitch-checkbox',
        { 'error': errors.has(name) },
        {class}
        ]"
      :disabled="disabled"
      :required="required"
      v-validate="validate"
      />
    <label :for="id" class="onoffswitch-label"></label>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  @Component({})
  export default class ShSwitch extends Vue {
    @Prop() public id!: string;
    @Prop() public name!: string;
    @Prop() public class!: string;
    @Prop() public disabled!: boolean;
    @Prop() public required!: boolean;
    @Prop() public readonly!: boolean;
    @Prop() public placeholder!: string;
    @Prop() public value!: string;
    @Prop() public validate!: any;

    public change() {
      this.$emit('change', this.value);
    }

  }
</script>


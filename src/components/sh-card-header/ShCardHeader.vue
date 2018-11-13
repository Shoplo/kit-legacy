<template>
  <div class="card-header">
    <div class="row align-middle">
      <div class="sm-12 columns" :class="[{'md-8': slots['header-action'] && !labelClass}, labelClass]">
        <slot name="header-title">
          <!--<h4 class="card-title">Card title</h4>-->
        </slot>
        <slot name="header-subtitle">
          <!--<p class="card-subhead"></p>-->
        </slot>
      </div>
      <div class="sm-12 columns align-right" :class="[actionClass ? actionClass : 'md-4']" v-if="slots['header-action']">
        <slot name="header-action">
          <!--<a href="#" class="sh-btn sh-btn-narrow sh-btn-outline-blue">Button</a>-->
        </slot>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class BoxCardHeader extends Vue {
    @Prop() public labelClass!: string;
    @Prop() public actionClass!: string;

    get slots() {
      return this.$slots;
    }
  }
</script>

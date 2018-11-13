<template functional>
  <div class="card-box" :class="{'borderless': props.borderless, 'no-padding-top': props.paddingtop, 'no-padding-bottom': props.paddingbottom}">
    <div class="row align-top">
      <div v-if="props.label" class="sm-12 columns" :class="[props.labelClass ? props.labelClass : 'md-3']">
        <h4>{{props.label}}</h4>
      </div>
      <div class="sm-12 columns" :class="[props.contentClass ? props.contentClass : 'md-9']">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

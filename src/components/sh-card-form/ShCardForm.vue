<template functional>
  <div class="card card-form">
    <div class="card-header">
      <h4 class="card-title">{{props.title}}</h4>
    </div>
    <div class="card-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

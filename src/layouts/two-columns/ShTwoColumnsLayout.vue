<template functional>
  <div class="two-columns-layout">
    <slot name="header"></slot>
    <div class="container">
      <div class="row">
        <div class="sm-12 md-8 columns">
          <slot name="content"></slot>
        </div>
        <div class="sm-12 md-4 columns">
          <slot name="side"></slot>
        </div>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

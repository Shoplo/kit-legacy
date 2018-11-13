<template>
  <notifications group="notify" position="bottom right">
    <template slot="body" slot-scope="props">
      <div class="sh-notification" :class="{
          'sh-notification-green': props.item.type === 'success',
          'sh-notification-red': props.item.type === 'warning',
          'sh-notification-orange': props.item.type === 'info'
          }">
        <i class="sh-icon sh-icon-check-2" :class="{
          'sh-icon-check-2': props.item.type === 'success',
          'sh-icon-warning': props.item.type === 'warning',
          'sh-icon-info-2': props.item.type === 'info',
          }"></i>
        <span>
          {{props.item.title}}
          <div v-html="props.item.text"></div>
        </span>
      </div>
    </template>
  </notifications>
</template>

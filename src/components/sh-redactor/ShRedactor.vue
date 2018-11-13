<template>
  <div class="redactor">
    <textarea v-model="value" class="form-control wysiwyg" :id="name"></textarea>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class ShRedactor extends Vue {
    @Prop() public value!: string;
    @Prop() public name!: string;
    @Prop() public options!: any;
    private redactorCallbacks: any = {
      callbacks: {
        changed: (html: string) => {
          this.emitChanges(html.replace(/(\r\n|\n|\r)/gm, ''))
        }
      }
    };
    private redactorOptions: any = Object.assign(this.options, this.redactorCallbacks);

    private mounted() {
      $R('#' + this.name, this.redactorOptions);
    }

    private emitChanges(val: string) {
      this.$emit('input', val);
    }
  }
</script>


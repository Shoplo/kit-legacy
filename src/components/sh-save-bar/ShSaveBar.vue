<template>
  <div class="actions-bar buttons-bar" :class="{'active': formChanged}">
    <div class="row">
      <div class="sm-12 columns align-right">
        <a @click="resetModel" class="close-buttons-bar">{{ cancelButton }}</a>
        <button type="submit" class="sh-btn sh-btn-narrow sh-btn-blue" :disabled="disabled">
          {{ saveButton }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

  @Component
  export default class ShSaveBar extends Vue {
    @Prop({default: false}) private formChanged!: boolean;
    @Prop({default: false}) private disabledSubmit!: boolean;
    @Prop() private saveButton: string;
    @Prop() private cancelButton: string;
    private disabled: boolean = false;

    @Watch('disabledSubmit')
    public updateDisabled() {
      this.disabled = this.disabledSubmit;
    }

    public resetModel() {
      this.$emit('resetModel', true);
    }
  }
</script>


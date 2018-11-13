<template>
  <div class="actions-bar buttons-bar" :class="{'active': show}">
    <div class="row align-middle">
      <div class="sm-4 columns">
        <div class="actions-bar-checkall">
          <input
            type="checkbox"
            v-model="allSelect"
            @change="allSelectChange"
            id="action_bar_check_all"
            class="input-checkbox"
          />
          <label for="action_bar_check_all"></label>
          <label for="action_bar_check_all">
            <span v-if="selectedItems.length < 5" class="selected-info">
              {{ $tc(translations.action_bar_selected_items, selectedItems.length, { count: selectedItems.length}) }}
            </span>
            <span v-if="selectedItems.length >= 5" class="selected-info">
              {{ $tc(translations.action_bar_selected_many_items, selectedItems.length, { count: selectedItems.length}) }}
            </span>
          </label>
        </div>
      </div>
      <div class="sm-12 md-8 columns align-right">
        <div class="actions">
          <button @click="resetModel" class="close-buttons-bar">{{ $t(translations.action_bar_cancel) }}</button>
          <div class="action-types">
            <slot name="action_types"></slot>
          </div>
          <button type="button" @click="save" class="sh-btn sh-btn-narrow sh-btn-blue" :disabled="disabled">
            {{ $t(translations.action_bar_submit) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { EventBus } from '../../helpers/EventBus';

  @Component
  export default class ShActionsBar extends Vue {
    @Prop({default: false}) private show!: boolean;
    @Prop() private selectedItems!: object[];
    @Prop({default: false}) private disabledSubmit!: boolean;
    @Prop() private allSelected!: boolean;
    @Prop() private translations!: object;
    @Prop() private eventBus!: any;
    private disabled: boolean = true;
    private actionType: string = '';
    private allSelect: boolean = this.allSelected;

    @Watch('disabledSubmit')
    public updateDisabled(){
      this.disabled = this.disabledSubmit;
    }

    public allSelectChange() {
      if (this.allSelect) {
        this.$emit('proccessAllChange', true)
      } else {
        this.$emit('proccessAllChange', false)
      }
    }

    @Watch('allSelected')
    public updateAllSelected(){
        this.allSelect = this.allSelected;
    }

    public resetModel() {
      this.$emit('resetSelection', true)
    }


    private save(){
      this.disabled = true;
      const emitObject = {
        type: this.actionType,
        items: this.selectedItems
      };
      this.$emit('actionBarSave', emitObject);
    }

    private mounted() {
      if (this.eventBus) {
        this.eventBus.$on('actionChange', (data: any) => {
          console.log('actionChange eventBus', data)
          if (data) {
            this.disabled = false;
            this.actionType = data;
          } else {
            this.disabled = true;
            this.actionType = '';
          }
        });
      }
    }
  }
</script>


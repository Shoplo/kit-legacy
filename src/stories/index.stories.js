/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import '@shoplo/shoplo-design/dist/css/shoplo-design.css';

import ShSaveBar from '../components/sh-save-bar/ShSaveBar.vue'

storiesOf('SaveBar', module)
  .add('Basic', () => ({
    components: { ShSaveBar },
    template: `
        <ShSaveBar
        :formChanged="true"
                    :saveButton="'Zapusz'"
                    :cancelButton="'Zapusz'"
            ></ShSaveBar>
    `,
    methods: { action: action('clicked') }
  }));

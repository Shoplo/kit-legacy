import Vue from 'vue';
import ShCardBox from './components/sh-card-box';
import ShAutocomplete from './components/sh-autocomplete';
import ShCardHeader from './components/sh-card-header';
import ShAppWelcome from './components/sh-app-welcome';
import ShListPage from './components/sh-list-page';
import ShFiltersBar from './components/sh-filters-bar';
import ShActionBar from './components/sh-actions-bar';
import ShRedactor from './components/sh-redactor';
import ShSaveBar from './components/sh-save-bar';
import ShAppNavigation from './components/sh-app-navigation';
import ShCollectionPointsMap from './components/sh-collection-points';
import ShNotifications from './components/sh-notifications';

import ShSingleColumnLayout from './layouts/single-column';
import ShTwoColumnsLayout from './layouts/two-columns';

const components = {
  ShCardBox,
  ShTwoColumnsLayout,
  ShSingleColumnLayout,
  ShAutocomplete,
  ShCardHeader,
  ShAppWelcome,
  ShListPage,
  ShFiltersBar,
  ShActionBar,
  ShRedactor,
  ShCollectionPointsMap,
  ShSaveBar,
  ShAppNavigation,
  ShNotifications
};

// Components.install = (Vue, options = {}) => {
//
//   // Options
//   setOptions(Object.assign(config, options))
//
//   for (const componentName in Components) {
//     const component = Components[componentName];
//
//     if (component && componentName !== 'install') {
//       Vue.component(component.name, component);
//     }
//   }
// };
//
import en from './locale/en_US.json';
import pl from './locale/pl_PL.json';

const install = (Vue, opts = {}) => {
  if (opts.i18n) {
    opts.i18n.mergeLocaleMessage('en', en, false);
    opts.i18n.mergeLocaleMessage('pl', pl, false);
  }
  console.log('install 2 elo', opts.i18n)
  Object.keys(components).forEach((name) =>{
    // @ts-ignore
    Vue.component(name, components[name]);
  });
};

// Object.keys(components).forEach((name) =>{
//   // @ts-ignore
//   Vue.component(name, components[name]);
// });

export default install;


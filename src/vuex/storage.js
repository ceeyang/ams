import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import loginStore from './login/store';

export default new Vuex.Store({
  modules: {
      loginStore,
  }
})

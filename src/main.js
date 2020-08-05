import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import { store } from './store/index.js'

import * as firebase from 'firebase'
import Alert from '@/components/Alert'

Vue.config.productionTip = false
Vue.component('Alert', Alert)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyAZp5f_f2S6sRWEfZ6zEenu5akWZQ4HjqE",
      authDomain: "middle-earth-sandee-007.firebaseapp.com",
      databaseURL: "https://middle-earth-sandee-007.firebaseio.com",
      projectId: "middle-earth-sandee-007",
      storageBucket: "gs://middle-earth-sandee-007.appspot.com",
      messagingSenderId: "452174996557",
      appId: "1:452174996557:web:df47faf64dbb52e473a804"
    })
    // auto sign in user
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.$store.dispatch('autoSignin', user)
      }
    })
    this.$store.dispatch('loadSlides')
  }
}).$mount('#app')

<template>
  <div class="signup">
    <v-container>

      <v-row justify="center" v-if="error">
        <Alert @dismissed='OnDismissed' :text="error.message"></Alert>
      </v-row>

      <v-row justify="center"> <h2>Sign in with Middle Earth</h2></v-row>
      <v-row justify="center">
        <v-col sm="12" md="6" >
          <v-card>
            <v-form class="pa-5">
              <v-text-field
                label="Email"
                type="email"
                v-model="email"
                prepend-icon="mdi-email-outline"
                color="black"
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                prepend-icon="mdi-key-outline"
                color="black"
              ></v-text-field>
              <v-row justify="center">
                <v-btn 
                  class="ma-5 white--text" 
                  color="black"
                  @click="signin"
                  :loading="loading"
                >Sign In</v-btn>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      email: '',
      password: '',
    }
  },
  methods: {
    signin(){
      // Vuex
      // console.log({email:this.email})
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    OnDismissed(){
      this.$store.dispatch('clearError')
    }
  },
  computed: {
    user(){
      return this.$store.getters.user
    },
    error(){
      return this.$store.getters.error
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  watch: {
    user(value){
      if(value !== null && value !== undefined){
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>

</style>
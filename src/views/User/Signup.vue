<template>
  <div class="signup">
    <v-container>

      <v-row justify="center" v-if="error">
        <Alert @dismissed='OnDismissed' :text="error.message"></Alert>
      </v-row>

      <v-row justify="center"> <h2>Signup with Middle Earth</h2></v-row>
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
              <v-text-field
                label="Confirm Password"
                type="password"
                v-model="confirmPassword"
                prepend-icon="mdi-shield-key-outline"
                color="black"
                :rules="[comparePasswords]"
              ></v-text-field>
              <v-row justify="center">
                <v-btn 
                  class="ma-5 white--text" 
                  color="black"
                  @click="signup"
                  :loading="loading"
                >Signup</v-btn>
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
      confirmPassword: '',
    }
  },
  methods: {
    signup(){
      // Vuex
      // console.log({email:this.email})
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
    },
    OnDismissed(){
      console.log('dismissed')
      this.$store.dispatch('clearError')
    }
  },
  computed: {
    comparePasswords(){
      return this.password !== this.confirmPassword ? 'Passwords do not match' : true
    },
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
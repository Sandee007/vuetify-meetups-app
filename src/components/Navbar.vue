<template>
  <div class="navbar">

    <v-app-bar 
      app
      dark
      color="black darken-4"
      
    >

      <v-app-bar-nav-icon @click="drawer = !drawer" ></v-app-bar-nav-icon>
      <v-toolbar-title > 
        <v-btn 
        text
        x-large
        rounded
        to="/"
        class="white--text "
        >The Middle Earth</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn 
        text
        v-for="item in menuItems" :key="item.title"
        class="hidden-sm-and-down mx-1"
        rounded
        outlined
        small
        :to="item.link"
       > {{item.title}}
        <v-icon right >mdi-{{item.icon}}</v-icon>
      </v-btn>
      <v-btn text rounded outlined small
        v-if="userIsAuthenticated" @click="logout"
      >
                Log out
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer
      app
      dark
      v-model="drawer"
      color="blue darken-4"
      :src ="bg"
    >
      <v-list 
      rounded nav
      >
        <v-list-item 
          v-for="item in menuItems" :key="item.title"
          exact-active-class
          route :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>mdi-{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-title >{{item.title}}</v-list-item-title>
          
        </v-list-item>
        
        <v-list-item v-if="userIsAuthenticated" @click="logout" >
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-title >Log out</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

  </div>
</template>

<script>
export default {
  data(){
    return{
      // menuItems:[
      //   // {icon: 'home', title: 'Home', link:'/home'},
      //   {icon: 'walk', title: 'Explore ', link:'/meetups'},
      //   {icon: 'map-marker-radius', title: 'Organize ', link:'/meetup/create'},
      //   {icon: 'account', title: 'Profile', link:'/profile'},
      //   {icon: 'draw', title: 'Sign up', link:'/signup'},
      //   {icon: 'login', title: 'Sign in', link:'/signin'},
      // ],
      drawer: false,
      background: true
    }
  },
  computed:{
    
    bg() {
      // return this.background ? 'https://mcdn.wallpapersafari.com/medium/72/71/LkVQPT.jpg' : undefined
      return this.background ? 'https://cdn.vuetifyjs.com/images/cards/docks.jpg' : undefined
    },
    menuItems(){
      let menuItems = [
        {icon: 'draw', title: 'Sign up', link:'/signup'},
        {icon: 'login', title: 'Sign in', link:'/signin'},
      ]
      if(this.userIsAuthenticated){
        menuItems = [
          {icon: 'walk', title: 'Explore ', link:'/meetups'},
          {icon: 'map-marker-radius', title: 'Organize ', link:'/meetup/create'},
          {icon: 'account', title: 'Profile', link:'/profile'},
        ]
      }
      return menuItems
    },
    userIsAuthenticated(){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>

</style>
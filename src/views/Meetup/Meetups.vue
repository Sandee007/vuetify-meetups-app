<template>
  <div class="meetups">
    <v-container  >

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

      <v-row justify="center" >
        <v-col sm="6">
        <v-card  elevation="24"
          v-for="slide in slides" :key="slide.id" 
          class="ma-5 "
          tile
        >
          <v-img 
          class="white--text align-end "
          height="200px"
          :src="slide.imgUrl"
          >
            
          </v-img>
          <v-card-title >{{slide.title}}</v-card-title>
          <v-card-text>{{slide.date}}</v-card-text>
          <v-card-actions>
            <v-btn
              text outlined
              :to="'/meetup/' + slide.id"
            >
            <v-icon left>mdi-arrow-right-circle</v-icon>
            View Location</v-btn>
          </v-card-actions>
         </v-card>
         </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    slides(){
      return this.$store.getters.loadedSlides
    },
     loading(){
      return this.$store.getters.loading
    }
  }
}
</script>

<style>

</style>
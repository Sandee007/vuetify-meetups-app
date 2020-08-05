<template>
  <v-container>
    <v-row justify="center"> 
      <v-col sm="10" >
        <v-card >
          <v-card-title>{{slide.title}}</v-card-title>
          <v-img
          class="white--text align-end pa-5"
          height="400px"
          :src="slide.imgUrl"
          >
            <v-card-title class=" display-2">{{slide.title}}</v-card-title>
          </v-img>
          <v-card-text class="text--primary">
            {{slide.content}}
          </v-card-text>
          <v-card-subtitle> Travel available @{{slide.time}} on {{slide.date}} </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark >register to travel</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
         </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['meetup_id'], /** the same name as in route params */
  computed: {
    slide(){
      return this.$store.getters.loadedSlide(this.meetup_id)
    }
  }
}
</script>

<style>

</style>
<template>
 <div class="home">
   <v-container >

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    
     <v-row  justify="center" class="ma-5">
      <v-card sm="6" class="ma-2">
        <v-btn color="grey darken-4" dark
        large
        route :to="{name: 'Meetups'}"
        >Explore Middle Earth</v-btn>
      </v-card>
       <v-card sm="6"  class="ma-2">
        <v-btn color="grey darken-4" dark
        large
        route :to="{name: 'CreateMeetup'}"
        >Organize Middle Earth</v-btn>
       </v-card>
      </v-row>

      <v-tooltip bottom color="black" open-on-focus>
        <template v-slot:activator="{on, attrs}">
          <v-row>
            <v-carousel style="cursor: pointer" >
                <v-carousel-item 
                  v-bind="attrs" v-on="on"
                  v-for="slide in slides" 
                  :key="slide.id"
                  :src="slide.imgUrl"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                  @click="visit(slide.id)"
                ></v-carousel-item>
              </v-carousel>
          </v-row>
        </template>
        <span>Click to visit the location</span>
      </v-tooltip>

   </v-container>
 </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    slides(){
      return this.$store.getters.featuredSlides
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  data(){
    return {
      // slides: [
      //   {imgUrl:'https://wittyenglish.files.wordpress.com/2015/10/gandalf-at-the-shire.jpg' , title: 'The Shire', id:1},
      //   {imgUrl:'https://c4.wallpaperflare.com/wallpaper/335/429/69/rivendell-the-lord-of-the-rings-fantasy-art-waterfall-artwork-hd-wallpaper-preview.jpg' , title: 'Riverndell',  id:2},
      //   {imgUrl:'https://vignette.wikia.nocookie.net/lotr/images/7/79/Argonath.png/revision/latest?cb=20180902182809' , title: 'Arogonarth',  id:3},
      //   {imgUrl:'https://bookstr.com/wp-content/uploads/2019/03/0sMr-BCAuLfq4XmHY.gif' , title: 'BBARAD-DÛR',  id:4},


      //   // {imgUrl:'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' , title: 'Slide 1'},
      //   // {imgUrl:'https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' , title: 'Slide 2'},
      //   // {imgUrl:'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753' , title: 'Slide 3'}
      // ]
    }
  },
  methods: {
    visit(id){
      this.$router.push("/meetup/" + id)
    }
  },
}
</script>

<style>

</style>
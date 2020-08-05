<template>
  <div class="create-meetup">
    <v-container>
      <v-row justify="center" >
        <v-col sm="12" md="6">
            <h2 class="black--text">Add a new location</h2>
        </v-col>
      </v-row>
      <v-row justify="center" >
        <v-col sm="12" md="6">
          <v-card shaped>
            <v-form class="pa-5" >
              <v-text-field 
                v-model="title"
                color="black"
                label="Title"
                required
                prepend-icon="mdi-pencil"
              >
              </v-text-field>
              <v-textarea 
                v-model="description"
                color="black"
                label="Description"
                required
                prepend-icon="mdi-pencil-box-outline"
              >
              </v-textarea>
              <!-- <v-text-field 
                v-model="imgUrl"
                color="black"
                label="Image url"
                required
                prepend-icon="mdi-image-outline"
              >
              </v-text-field> -->
              <!-- <v-file-input
                label="Upload Image"
                prepend-icon="mdi-image-outline"
                @change="readFile"
                id="fileInput"
              ></v-file-input> -->
              

              <v-menu>
                <template v-slot:activator="{on, attrs}"> 
                  <v-text-field v-bind="attrs" v-on="on" label="Travel Date" color="black" prepend-icon="mdi-calendar" v-model="date" readonly ></v-text-field>
                </template>
                <v-date-picker v-model="date" color="black" > </v-date-picker>
              </v-menu>
              <v-menu>
                <template v-slot:activator="{on, attrs}"> 
                  <v-text-field v-bind="attrs" v-on="on" label="Pick a time" color="black"  prepend-icon="mdi-clock-outline" v-model="time" readonly ></v-text-field>
                </template>
                <v-time-picker 
                  v-model="time" landscape full-width ampm-in-title color="black"
                ></v-time-picker>
              </v-menu>

              <v-btn 
                class="black white--text ma-3" 
                @click="pickFile"
                small
              >Upload Image</v-btn>
              <input 
                type="file" 
                style="display: none" 
                ref="fileInput" 
                accept="image/*"
                @change="filePicked"
              >
              <v-img
                :src="imgUrl"
              ></v-img>
              
             <v-row justify="center">
                <v-btn 
                  class="ma-5 white--text" 
                  color="black"
                  :disabled="!formIsValid"
                  @click="submit"
                  :loading="loading"
                >
                Add Location</v-btn>
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
      title : '',
      description: '',
      imgUrl: '',
      date: '',
      time: '',
      image: null
    }
  },
  computed: {
    formIsValid(){
      return this.title !== '' && this.description !== '' && this.imgUrl !== '' && this.date !== '' && this.time !== ''
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  methods: {
    submit(){
      if(!this.formIsValid){
        return  /** just return */
      }
      if(!this.image){
        return
      }
      const slideData = {
        title: this.title,
        description: this.description,
        // imgUrl: this.imgUrl,
        date: this.date,
        time: this.time,
        image: this.image
      }
      // dispatch createSlide 'action'
      this.$store.dispatch('createSlide', slideData)
      // this.$router.push('/meetups')
    },
    // readFile(event){
    //   // const fileInput = document.querySelector('#fileInput')
    //   // const files = fileInput.target.files
    //   // let filename = files[0].filename
    //   console.log(event)

    //   const fileReader = new FileReader()
    //   fileReader.addEventListener('load', ()=>{
    //     this.imgUrl = fileReader.result
    //     console.log(this.imgUrl)
    //   })
    //   // fileReader.readAsDataURL(files[0])
    //   // this.image = files[0]
    // },
    pickFile(){
      this.$refs.fileInput.click()
    },
    filePicked(event){
      console.log(event)
      const files = event.target.files
      // let filename = files[0].name
      
      const fileReader = new FileReader()
      fileReader.addEventListener('load', ()=>{
        this.imgUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>

<style>

</style>
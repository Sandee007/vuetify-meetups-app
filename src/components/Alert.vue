<template>
 
    <v-alert 
      type="warning"
      dismissible
      @input="onClose"
    >  
    {{text}}
    </v-alert>
  
</template>

<script>
export default {
   methods: {
     onClose(){
       this.$emit('dismissed')
     }
   },
   props: ['text']
}
</script>

<style>

</style>
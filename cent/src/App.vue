<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  //引入jwt-decode解析Token
import  jwt_decode from 'jwt-decode'
export default {
    name:'app',
    components:{ }, 
    created(){
      if(localStorage.eleToken){
        const decoded=jwt_decode(localStorage.eleToken);
         //token存储到vuex
          this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded))
          this.$store.dispatch("setUser",decoded)

      }
    },
    methods:{
        //为空为true
        isEmpty(value){

            return(

                value===undefined||value===null||
                (typeof value==="object"&&Object.keys(value).length===0)||
                (typeof value==="string"&&value.trim().length===0)   
            );

        }

    }
}
</script>
}
</script>

<style>
html,
body,
#app {
  width:100%;
  height: 100%;
}
</style>

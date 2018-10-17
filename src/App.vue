<template>
  <div id="app">
    <router-view :carlist="list"/>
    <Loading/>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Loading from './views/loading.vue'
export default {
  name: 'app',
  data(){
    return{
      
    }
  },
  components:{
    Loading
  },
  computed: {
    ...mapState({
      list: state => state.index.list
    })
  },
  methods: {
    ...mapActions({
      getCarList: 'index/getCarList'
    })
  },
  mounted () {
    this.getCarList()
  }
}
</script>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body,#app{
    width: 100%;
    height: 100%;
  }

</style>

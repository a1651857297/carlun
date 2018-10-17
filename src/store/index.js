import Vue from 'vue';
import Vuex from 'vuex';
import Logger from 'vuex/dist/logger'


//引入modules
import index from './modules/index'

Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        show:true,
        current:0,
        showswiper:false
    },
    mutations:{
        showloading(state,payload){
            state.show = payload
        },
        changeswiper(state,payload){
            state.showswiper = payload.showswiper,
            state.current = payload.current
        }
    },
    modules:{
        index
    },
    plugins:[Logger()]
})
import Vue from 'vue';
import VueRouter from "vue-router"
import store from '../store'

//加载路由
const Index = ()=>import('../views/Index.vue')
const Img = ()=>import('../views/Img.vue')
const Detail = ()=>import('../views/Detail.vue')
const Allimg = ()=>import('../views/allimg.vue')
const CarType = ()=>import('../views/CarType.vue')
const Quotation = ()=>import('../views/Quotation.vue')

Vue.use(VueRouter)

let router = new VueRouter({
    routes:[{
        path:'/index',
        name:'Index',
        component:Index
    },{
        path:'/img',
        name:'Img',
        component:Img
    },{
        path:'/detail',
        name:'Detail',
        component:Detail
    },{
        path:'/allimg',
        name:'Allimg',
        component:Allimg
    },{
        path:'/carType',
        name:'CarType',
        component:CarType
    },{
        path:'/quotation',
        name:'Quotation',
        component:Quotation
    },{
        path:'*',
        redirect:'./index'
    },]
})

router.beforeEach((to,from,next)=>{
    store.commit('showloading',true)
    next()
})

router.afterEach(()=>{
    setTimeout(()=>{
        store.commit('showloading',false)
    },1000)
})

export default router
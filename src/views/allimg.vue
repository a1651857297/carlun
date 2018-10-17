

<template>
    <div>
        <ul>
            <li v-for="(item,index) in imgidList" :key="index">
                <img :src="item.Url.replace('{0}',item.LowSize)" alt="" :data-id="index" @click="changes">
            </li>
        </ul>
        <div class="swp" v-show="this.showswiper">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(item,index) in imgidList" :key="index">
                    <img :src="item.Url.replace('{0}',item.HighSize)" alt="">
                </swiper-slide>
                
            </swiper>
            <p class="coust">{{current}}/{{imgidList.length}}</p>
        </div>
    </div>

</template>

<script>
import {getCategoryImageList,getimgid} from "../api/index.js";
import store from '../store'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return{
            imgidList:[],
            current:1,
            cu:0
        }
    },
    mounted(){
        let Seriaid = this.$route.query.Seriaid;
        let imgid = this.$route.query.imgid
        getCategoryImageList(Seriaid,imgid).then(res=>{
            this.imgidList = res.data.List
        })
    },
    computed:{
        ...mapState({
            current:state=>state.current,
            showswiper:state=>state.showswiper
        }),
        
        swiperOption(){
            let that = this
            return {
                on:{
                    slideChange(){
                        that.current = this.activeIndex+1
                    }
                }
            }
        },
    },
    methods:{
        ...mapActions({

        }),
        ...mapMutations({
            changeswiper:'../store/index/changeswiper'
        }),
        changes(e){
            let current = e.target.dataset.id;
            let cu = e.target.dataset.id;
            this.current = current
            let obj = {
                current:current,
                showswiper:true
            }
            store.commit('changeswiper',obj)
        }
    },
    components:{
        swiper,
        swiperSlide
  }
}
</script>

<style>
    ul li{
        width: 33%;
        display: inline-block;
    }
    ul li img{
        width: 100%;
    }
    .swp{
        position: fixed;
        left: 0;
        top:0;
        background: #000;
        width: 100%;
        height: 100%;
        z-index: 101;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .swp img{
        width: 100%;
    }
    .coust{
        position: absolute;
        bottom: 40px;
        left: 0%;
        width: 100%;
        font-size: 20px;
        z-index: 102;
        text-align: center;
        color: #fff;
    }
</style>
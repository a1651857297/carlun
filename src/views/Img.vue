

<template>
    <div>
        <div class="imgbox" v-for="(item,index) in imglist" :key="index">
            <div class="type" @click="allimg(item.Id)">
                <p>{{item.Name}}</p>
                <p>{{item.Count}}></p>
            </div>
            <ul>
                <li v-for="(value,index) in item.List" :key="index">
                    <img :src="value.Url.replace('{0}',value.LowSize)" alt="" style="">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getimgid } from "../api/index.js";
//http://www.sucaijishi.com/uploadfile/2015/0210/20150210104951657.gif
export default {
    data(){
        return{
            imglist:[],
        }
    },
    methods:{
        allimg(imgid){
            this.$router.push({
                path:'/allimg',
                query:{
                    Seriaid:this.Seriaid,
                    imgid:imgid
                }
            })
        }
    },
    mounted(){
        let Seriaid = this.$route.query.Seriaid;
        this.Seriaid = Seriaid
       
        getimgid(Seriaid).then(res=>{
            this.imglist = res.data;
        })
        
    }
}
</script>


<style>
    ul{
        width: 100%;
    }
    ul li{
        width: 33.3339%;
        list-style: none;
        display: inline-block;
    }
    .type{
        position: absolute;
        left: 0%;
        width: 32.5%;
        text-align: center;
        color: #fff;
        height: 49%;
        background: rgba(56,90,130,.5);
    }
    .type p{
        margin-top: 30px;
    }
    .imgbox{
        position: relative;
    }
    ul li img{
        width: 135px;
        height: 135px;
    }
</style>
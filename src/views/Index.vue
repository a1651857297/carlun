

<template>
    <div class="dahezi">
      <!-- 渲染右侧列表 -->
        <div class="di">
            <div v-for="(item,index) in carlist" :key='index'>
                <p class="tit" :ref="index">{{item.title}}</p>
                <ul>
                    <li style="display:block" class="lis" v-for="carlist in item.list" :key="carlist.index" :id="carlist.MasterID" @click="detailxr(carlist.MasterID)">
                        <img :data-src="carlist.CoverPhoto" alt="" style="display:inline-block">
                        <span style="display:inline-block;margin-left:10px">{{carlist.Name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 渲染字母列表 -->
       <div class="letter"  @touchstart="touchstar" @touchmove="touchMove" @touchend="touchend" ref='letterdiv' @touchmove.prevent>
          <ul ref="letters">
              <li v-for="(item,index) in carlist" :key="index" class="lis3" :id="index">
                  {{item.title}}
              </li>
          </ul>
       </div>
        <!-- 渲染主页面数据 -->
        <div class="cardata" style="right: -77%;" ref="card" @touchstart="starindex" @touchmove="moveindex" @touchend="endindex">
            <div v-for="item in cardata" :key="item.index" ref="grouplist">
                <p class="carname">{{item.GroupName}}</p>
                <ul class="uls2">  
                    <li v-for="(evercar,index) in item.GroupList" :key="index" class="liss"  @click="todetail(evercar.SerialID)">
                        <img :src="evercar.Picture" alt="" class="shellcar">
                        <div>
                            <p>{{evercar.AliasName}}</p>
                            <p style="color:red">{{evercar.DealerPrice}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import { getMakeList,getDetailList } from "../api/index.js";
import {lazyLoad} from "../utils/lazyLoad";
export default {
  name: "index",
  props: ["carlist"],
  clientx: 0,
  clientx2: 0,
  data() {
    return {
      cardata: [],
      startY: 0,
      detaillist:[]
    };
  },
  computed: {},
  methods: {
    //获取点击li 的 index
    detailxr(index) {
      //获取二级渲染列表数据
      getMakeList(index).then(res => {
        this.cardata = res.data;
      });
      this.$refs.card.style.cssText = "right:0%";
    },
    //获取详情页的数据 
    todetail(ids){
        getDetailList(ids).then(res=>{
          //并跳转路由且传参
          this.$router.push({
              path:'/detail',
              query:{
                detailid:res.data
                }
             })
        })

        
    },
    //触摸的起始位置
    starindex(e) {
      this.clientx = e.changedTouches[0].pageX;
    },
    //触摸的移动距离
    moveindex(e) {
      this.clientx2 = e.changedTouches[0].pageX;
    },
    //判断移动距离
    endindex() {
      //判断临界值
      if (this.clientx2 - this.clientx > 50) {
        this.$refs.card.style.cssText = "right:-77%";
        this.clientx = 0;
        this.clientx2 = 0;
      } 
    },


    touchstar(e) {
        
    },
    touchMove(e) {
      //获取字母列表的下标
        let index = Math.floor((e.touches[0].pageY-this.offsetTop)/this.letterheight);
        //判断是否为0
        if(index<0){
            index = 0
            //判断是否超过字母的长度
        }else if(index>this.carlist.length-1){
            index = this.carlist.length-1
        }

        //获取字母对应的盒子距离顶部的高度
        let oft = this.$refs[index][0].offsetTop
        //获取父级的节点
        let dage = document.querySelector('.di');
        // 滚动到指定位置
        dage.scrollTop = oft

    },
    touchend() {}
  },
  updated(){
      //获取字母列表距离顶部的高度
      this.offsetTop = this.$refs.letterdiv.getBoundingClientRect().top;
        //获取盒子的高度
      this.letterheight = this.$refs.letters.children[0].getBoundingClientRect().height;
        //懒加载
      lazyLoad('.di');
  },
  mounted() {
      
  }
};
</script>

<style>
.tit {
  font-size: 16px;
  line-height: 23px;
  background: #f4f4f4;
  padding-left: 20px;
  color: #aaa;
}
.lis {
  width: 90%;
  margin: 0 5%;
  line-height: 54px;
  font-size: 18px;
  height: 3.5rem;
  border-bottom: 1px solid #ccc;
}
.lis div {
  display: inline-block;
}
.lis img {
  vertical-align: middle;
  width: 12%;
}
.letter {
  width: 20px;
  padding: 0 10px;
  position: fixed;
  right: 0%;
  top: 16%;

  z-index: 2;
}
.letter li {
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  list-style: none;
  color: #666;
}
.cardata {
  position: fixed;
  top: 0;
  width: 75%;
  height: 100%;
  z-index: 3;
  background: #fff;
  box-shadow: 3px 3px 30px #555;
  transition: all 0.5s ease;
  overflow-y: scroll;
}
.carname {
  font-size: 16px;
  line-height: 23px;
  background: #f4f4f4;
  padding-left: 20px;
  color: #aaa;
}
.liss {
  list-style: none;
  display: flex;
  flex-direction: row;
}
.liss img {
  display: inline-block;
  margin: 0 1%;
}
.liss div {
  display: inline-block;
}
.liss div p {
  line-height: 30px;
}
.shellcar {
  width: 99px;
  height: 77px;
}
.uls2 {
  margin-left: 10px;
}
.dahezi{
    width: 100%;
    height: 100%;
}
.di{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}
</style>
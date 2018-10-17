

<template>
    <div class="detailpage">

        <div class="topimg" @click="toimg()">
            <img :src='detaildata.CoverPhoto' alt="">
            <span class="allpic">{{detaildata.pic_group_count}}张照片</span>
        </div>

        <div class="info">
            <p>{{detaildata.market_attribute&&detaildata.market_attribute.dealer_price}}</p>
            <p>指导价 {{detaildata.market_attribute&&detaildata.market_attribute.official_refer_price}}</p>
            <div class="action">
                <button class="actionbtn" @click="tuotation">询问底价</button>
            </div>
        </div>

        <div class="nian">
            <ul>
                <li v-for="(item,index) in yearArr" :key="index" @click="getyear(index)" :class="index == idx?'active':''">{{item}}</li>
            </ul>
        </div>

        <div class="caryear">
            <div v-for="(item,index) in newList" :key='index'>
                <p class="cartype">{{item.title}}</p>
                <ul class="uls">
                    <li v-for="(value,index) in item.list" :key="index">
                        <p>{{value.market_attribute.year}}款 {{value.car_name}}</p>
                        <p>{{value.horse_power}}马力 {{value.gear_num}}档</p>
                         <p>
                           <span>指导价 {{value.market_attribute.official_refer_price}}</span>
                           <span> {{value.market_attribute.dealer_price_min}}起</span>
                         </p>
                         <button class="btns">询问底价</button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom">
            <p>询问底价</p>
            <p>本地经销商为你报价</p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      detaildata: [],
      yearArr: [],
      carList: [],
      newList: [],
      idx: 0
    };
  },
  methods:{
      getyear(index){
        this.idx = index;
        let newList = [];
            //获取点击年份的列表
        this.carList[index].list.forEach(value=>{
            let tit = value.exhaust_str + "/" + value.horse_power + "/" + value.inhale_type;
            //push年份列表
            newList.push({
                title:tit,
                list:[value]
            })
        });
        // 赋值
        this.newList = newList
      },
      toimg(){
          this.$router.push({
              path:'/img',
              query:{
                  Seriaid:this.detaildata.SerialID
              }
          })
      },
      tuotation(){
          let carlink = this.detaildata.BottomEntranceLink;
          let id = carlink.match(/car\/(\S*)/);
          this.$router.push({
              path:'/quotation',
              query:{
                  carid:id[1]
              }
          })
      }
  },
  mounted() {
      //获取路由参数
    this.detaildata = this.$route.query.detailid;
     //获取参数list下的数据
    let list = this.detaildata.list;
    let yearArr = ["全部"],
        carList = [{ year: "全部", list: [] }];
        //遍历list 筛选年份
     list.forEach((item, index) => {
          let year = item.market_attribute.year;
          if (yearArr.indexOf(year) === -1) {
            yearArr.push(year);
            carList.push({
              year: year,
              list: [item]
            });
          } else {
            carList.forEach(value => {
              if (value.year.indexOf(year) != -1) {
                value.list.push(item);
              }
            });
          } 
          //全部
          carList[0].list.push(item);
        });
        this.carList = carList;
        this.yearArr = yearArr;

        //默认显示全部
        let newList = [];
            //获取点击年份的列表
        this.carList[this.idx].list.forEach(value=>{
            let tit = value.exhaust_str + "/" + value.horse_power + "/" + value.inhale_type;
            //push年份列表
            newList.push({
                title:tit,
                list:[value]
            })
        });
        // 赋值
        this.newList = newList

  }
};
</script>


<style>
.detailpage{
    background: #f4f4f4;
}
.topimg {
  width: 100%;
  position: relative;
}
.topimg img {
  width: 100%;
  height: 260px;
}
.info {
    width: 96%;
    padding: 3% 2%;
    position: relative;
    margin-top: -40px;
    background: #fff;
}
.info p:first-child {
    font-size: 20px;
    color: red;
    font-weight: 500;
}
.info p:nth-child(2) {
    font-size: 14px;
    color: silver;
}
.action {
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 50%;
    position: absolute;
    right: 4px;
    top: 12px;
}
.actionbtn{
    width: 100%;
    height: 38px;
    color: #fff;
    background: #00afff;
    border-radius: 5px;
    font-size: 18px;
    border: none;
}
.nian{
    width: 100%;
    background: #fff;
    margin-top: 6px;
}
.nian ul li{
    display: inline-block;
    margin: 0 10px;
    font-size: 18px;
    line-height: 50px;
}
.canshu{
    background: #fff;
}
.active{
    color: #3aacff;
}

.btns {
    border: none;
    border-top: 1px solid #eee;
    width: 100%;
    height: 44px;
    font-size: 18px;
    color: #00afff;
    background: #fff;
    font-weight: 500;
}
.uls {
    background: #fff;
}
.uls li {
    padding: 0 10px;
    border-bottom: 1px solid #f4f4f4;
    overflow: hidden;
}
.uls li p:nth-child(1){
    padding: 10px 0 ;
    font-size: 16px;
    line-height: 16px;
    color: #3d3d3d;
}

.uls li p:nth-child(2) {
    color: #bdbdbd;
    font-size: 14px;
}
.uls li p:nth-child(3) {
    text-align: right;
    padding-bottom: 1px;
    color: #818181;
    padding: 10px 0;
}
          
.uls li p:nth-child(3) span {
    font-size: 12px;
}
.uls li p:nth-child(3) span:nth-child(2){
    font-size: 16px;
    color: #ff2336;
    margin-left: 10px;
}
.cartype {
    padding: 0 10px;
    height: 27px;
    line-height: 27px;
    font-size: 14px;
    color: #999;
    background: #f4f4f4;
}
.bottom {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 99;
    background: #3aacff;
    height: 60px;
    color: #fff;
    text-align: center;
}
.bottom p:first-child {
    font-size: 18px;
    padding-top: 10px;
    font-weight: 500;
}
.bottom p:nth-child(2) {
    font-size: 14px;
}
.caryear div{
    margin-bottom: 8px;
}
.allpic{
    position: absolute;
    right: 20px;
    bottom: 20%;
    display: block;
    width: 100px;
    background: rgba(0,0,0,.6);
    border-radius: 20px;
    text-align: center;
    color: #fff;
    font-size: 14px;
}
</style>
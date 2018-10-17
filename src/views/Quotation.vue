

<template>
<div class="box">
    <header>
        <div class="topp">
            <p>可向多个商家咨询最低价，商家及时回复</p>
            <img src="https://h5.chelun.com/2017/official/img/icon-help.png" alt="">
        </div>
    </header>
    <section>
        <div class="topcar">
            <img :src="carlistid.details&&carlistid.details.serial.Picture" alt="" style="width:126px;height:77px">
            <div class="carparameter">
                <p style="font-size:19px;line-height:28px;">{{carlistid.details&&carlistid.details.serial.AliasName}}</p>
                <p style="font-size:18px;color:#333">{{carlistid.details&&carlistid.details.market_attribute.year}} {{carlistid.details&&carlistid.details.car_name}}</p>
            </div>
        </div>
        <div>
            <p class="usmessage">个人信息</p>
            <ul class="uls">
                <li>
                    <span>姓名</span>
                    <input type="text" placeholder="输入你的真实中文姓名" maxlength="4">
                </li>
                <li>
                    <span>手机</span>
                    <input type="tel" placeholder="输入你的真实手机号码" maxlength="11">
                </li>
                <li>
                    <span>城市</span>
                    <span>北京</span>
                </li>
            </ul>
            <div class="quotation">
                <button>询最低价</button>
            </div>
        </div>
        <div class="dealers">
            <p style="padding:0 5px;">选择报价经销商</p>
            <ul class="uls2">
                <li v-for="(item,index) in site" :key="index">
                    <input class="check" type="checkbox" :checked="index == 0" style="vertical-align: middle;">
                    <label style="width:90%">
                        <p style="font-size:16px;width:100%;font-weight: 700">
                            <span>{{item.dealerShortName}}</span>
                            <span style="font-size:14px;float: right;color: red;">{{item.promotePrice}}.万元</span>
                        </p>
                        <p style="font-size:14px;color:#a2a2a2;width:78%">{{item.address}}</p>
                    </label>
                </li>
            </ul>
        </div>
    </section>
    <footer>
        <button>
            询最低价
        </button>
    </footer>
</div>
</template>

<script>
import { getcarid } from "../api/index.js";

export default {
  data() {
    return {
      carlistid: [],
      site:[]
    };
  },
  mounted() {
    let carid = this.$route.query.carid;
    //获取报价数据
    getcarid(carid).then(res => {
      this.carlistid = res.data;
      this.site = res.data.list;
    });
  }
};
</script>


<style>
.topp {
  height: 30px;
  line-height: 30px;
  background: #79cd92;
  text-align: center;
  z-index: 99;
  color: #fff;
}
.topp p {
  display: inline-block;
}
header img {
  display: inline-block;
  width: 16px;
  height: 16px;
}
.topcar{
    width: 90%;
    padding: 5%;
    display: flex;
    flex-direction: row;
}
.carparameter{
    padding-left: 16px;
}
.usmessage{
    color: #666;
    background: #eee;
    font-size: 13px;
    padding: 0 5px;
    line-height: 25px;
}
.uls{
    background: #fff;
    padding: 0 10px;
}
.uls li {
    font-size: 16px;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    color: #000;
}
.uls li input {
    font-size: 16px;
    padding-right: 10px;
    width: 88%;
    text-align: right;
    box-sizing: border-box;
    color: #555;
    border: none;
}
.uls li span:nth-child(2) {
    display: inline-block;
    width: 88%;
    color: #555;
    text-align: right;
    padding-right: 10px;
    box-sizing: border-box;
}
.quotation {
    background: #fff;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 14px;
}
.quotation button {
    font-size: 16px;
    color: #fff;
    width: 80%;
    background: #3aacff;
    height: 35px;
    border-radius: 5px;
    border: none;
}
.uls2{
    background: #fff;
    padding: 0 10px;
    margin-left: 0;
}
.uls2 li{
    list-style: none;
    display: flex;
    padding: 10px 0;
    height: 90px;
}
.dealers {
    color: #666;
    background: #eee;
    font-size: 13px;
    line-height: 25px;
}
.check{
    margin-top: 20px;
    width: 10%;
}
footer button {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #3aacff;
    text-align: center;
    font-size: 17px;
    color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    border: none;
}
</style>
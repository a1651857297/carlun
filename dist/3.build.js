webpackJsonp([3],{29:function(t,i,e){"use strict";function n(t){e(43)}Object.defineProperty(i,"__esModule",{value:!0});var l=e(35),a=e(45),r=e(5),s=n,o=r(l.a,a.a,!1,s,null,null);i.default=o.exports},35:function(t,i,e){"use strict";var n=e(9);i.a={data:function(){return{imglist:[]}},methods:{allimg:function(t){this.$router.push({path:"/allimg",query:{Seriaid:this.Seriaid,imgid:t}})}},mounted:function(){var t=this,i=this.$route.query.Seriaid;this.Seriaid=i,Object(n.f)(i).then(function(i){t.imglist=i.data})}}},43:function(t,i,e){var n=e(44);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e(4)("6adca44c",n,!0,{})},44:function(t,i,e){i=t.exports=e(3)(!1),i.push([t.i,"ul{width:100%}ul li{width:33.3339%;list-style:none;display:inline-block}.type{position:absolute;left:0;width:32.5%;text-align:center;color:#fff;height:49%;background:rgba(56,90,130,.5)}.type p{margin-top:30px}.imgbox{position:relative}ul li img{width:135px;height:135px}",""])},45:function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",t._l(t.imglist,function(i,n){return e("div",{key:n,staticClass:"imgbox"},[e("div",{staticClass:"type",on:{click:function(e){t.allimg(i.Id)}}},[e("p",[t._v(t._s(i.Name))]),t._v(" "),e("p",[t._v(t._s(i.Count)+">")])]),t._v(" "),e("ul",t._l(i.List,function(t,i){return e("li",{key:i},[e("img",{attrs:{src:t.Url.replace("{0}",t.LowSize),alt:""}})])}))])}))},l=[],a={render:n,staticRenderFns:l};i.a=a}});
//# sourceMappingURL=3.build.js.map
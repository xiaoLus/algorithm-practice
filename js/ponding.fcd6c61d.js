(function(t){function e(e){for(var n,a,o=e[0],c=e[1],s=e[2],h=0,f=[];h<o.length;h++)a=o[h],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&f.push(i[a][0]),i[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);p&&p(e);while(f.length)f.shift()();return u.push.apply(u,s||[]),r()}function r(){for(var t,e=0;e<u.length;e++){for(var r=u[e],n=!0,o=1;o<r.length;o++){var c=r[o];0!==i[c]&&(n=!1)}n&&(u.splice(e--,1),t=a(a.s=r[0]))}return t}var n={},i={ponding:0},u=[];function a(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=n,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(r,n,function(e){return t[e]}.bind(null,n));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/algorithm-practice/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var s=0;s<o.length;s++)e(o[s]);var p=c;u.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("690b")},"690b":function(t,e,r){"use strict";r.r(e);r("cadf"),r("551c"),r("f751"),r("097d");var n=r("2b0e"),i=r("7591"),u=r.n(i),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[t._m(0),r("v-stage",{attrs:{config:t.configStage}},[r("v-layer",t._l(t.rectList,function(t,e){return r("v-rect",{key:e,ref:"rect"+t.w+"_"+t.h,refInFor:!0,attrs:{config:t}})}),1)],1),r("input",{directives:[{name:"model",rawName:"v-model",value:t.inputStr,expression:"inputStr"}],domProps:{value:t.inputStr},on:{input:function(e){e.target.composing||(t.inputStr=e.target.value)}}}),r("button",{on:{click:t.start}},[t._v("start")]),r("p",[t._v("\n    water:\n    "+t._s(t.water_count)+"\n  ")])],1)},o=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("p",[t._v("\n    有一组不同高度的台阶，由一个整数数组表示，数组中每个数是台阶的高度，"),r("br"),t._v("\n    当开始下雨了(水足够多的)，台阶之间的水坑会积多少水？"),r("br"),t._v("\n    如[0,1,0,2,1,0,1,3,2,1,2,1] 返回积水量 6。\n  ")])}],c=(r("6c7b"),r("c5f6"),r("ac6a"),r("6b54"),r("28a5"),r("96cf"),r("3b8d")),s=50,p=50,h="#eee",f="#222",l="blue",g={name:"app",components:{},created:function(){this.inputStr="0,1,0,2,1,0,1,3,2,1,2,1",this.start()},computed:{configStage:function(){return{width:this.inputLength*s,height:this.inputMax*p}}},data:function(){return{inputStr:"",inputArr:[],inputMax:0,inputLength:null,rectList:[],water_count:null}},methods:{start:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.RectInit();case 2:return t.next=4,this.getStoneArr();case 4:return e=t.sent,t.next=7,this.drawStone(e);case 7:return t.next=9,this.getWaterArr();case 9:r=t.sent,this.drawWater(r);case 11:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),RectInit:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e,r,n,i,u=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(this.inputStr){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,this.resetData();case 4:for(this.inputArr=this.inputStr.split(","),console.log(this.inputArr.toString()),this.inputLength=this.inputArr.length,this.inputArr.forEach(function(t){var e=Number(t);u.inputMax<e&&(u.inputMax=e)}),e=[],r=0;r<this.inputMax;r++)for(n=0;n<this.inputLength;n++)i=this.createRect({w:n,h:r,color:"grey"}),e.push(i);this.rectList=e,this.$nextTick(function(){u.drawStage()});case 13:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),resetData:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.inputArr=[],this.inputMax=0,this.inputLength=null,this.rectList=[],this.water_count=null,t.abrupt("return",new Promise(function(t){e.$nextTick(function(){t()})}));case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),getStoneArr:function(){for(var t=[],e=0;e<this.inputMax;e++)for(var r=0;r<this.inputLength;r++)this.inputArr[r]>e&&t.push({x:r,y:e});return t},getWaterArr:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e,r,n,i,u=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:for(e=[],r=function(){var t=-1,r=-1,a=[];for(i=0;i<u.inputLength;i++)u.inputArr[i]>n?(-1==t&&(t=i),r=i):a.push(i);a.forEach(function(i){i>t&&i<r&&e.push({x:i,y:n})})},n=0;n<this.inputMax;n++)r();return this.water_count=e.length,t.abrupt("return",e);case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),createRect:function(t){return{w:t.w,h:t.h,x:t.w*s,y:(this.inputMax-t.h-1)*p,width:s,height:p,fill:t.color,stroke:"grey",strokeWidth:2}},getRect:function(t,e){return this.$refs["rect"+t+"_"+e][0].getNode()},drawStage:function(){for(var t=0;t<this.inputMax;t++)for(var e=0;e<this.inputLength;e++)this.getRect(e,t).fill(h)},drawStone:function(t){var e=this;t.forEach(function(t){e.getRect(t.x,t.y).fill(f)})},drawWater:function(t){var e=this;t.forEach(function(t){e.getRect(t.x,t.y).fill(l)})}}},d=g,v=r("2877"),w=Object(v["a"])(d,a,o,!1,null,"0cc27334",null),b=w.exports;n["default"].use(u.a),n["default"].config.productionTip=!1,new n["default"]({render:function(t){return t(b)}}).$mount("#app")}});
//# sourceMappingURL=ponding.fcd6c61d.js.map
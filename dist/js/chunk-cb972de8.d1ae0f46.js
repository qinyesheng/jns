(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cb972de8"],{"065d":function(t,e,s){},1343:function(t,e,s){"use strict";var i=s("8131"),a=s.n(i);a.a},"28a2":function(t,e,s){"use strict";var i=s("1988"),a=s("2b0e"),n=s("2638"),o=s.n(n),r=s("a142"),c=s("db78"),l=s("6605"),h=s("3875"),u=s("5596"),v=s("2bb1"),d=Object(r["j"])("image-preview"),m=d[0],p=d[1];function f(t){return Math.sqrt(Math.abs((t[0].clientX-t[1].clientX)*(t[0].clientY-t[1].clientY)))}var g,b=m({mixins:[l["a"],h["a"]],props:{images:Array,className:null,lazyLoad:Boolean,asyncClose:Boolean,startPosition:Number,showIndicators:Boolean,loop:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},showIndex:{type:Boolean,default:!0},minZoom:{type:Number,default:1/3},maxZoom:{type:Number,default:3},overlayClass:{type:String,default:"van-image-preview__overlay"},closeOnClickOverlay:{type:Boolean,default:!0}},data:function(){return{scale:1,moveX:0,moveY:0,moving:!1,zooming:!1,active:0}},computed:{imageStyle:function(){var t=this.scale,e={transition:this.zooming||this.moving?"":".3s all"};return 1!==t&&(e.transform="scale3d("+t+", "+t+", 1) translate("+this.moveX/t+"px, "+this.moveY/t+"px)"),e}},watch:{value:function(){this.active=this.startPosition},startPosition:function(t){this.active=t}},methods:{onWrapperTouchStart:function(){this.touchStartTime=new Date},onWrapperTouchEnd:function(t){Object(c["c"])(t);var e=new Date-this.touchStartTime,s=this.$refs.swipe||{},i=s.offsetX,a=void 0===i?0:i,n=s.offsetY,o=void 0===n?0:n;if(e<300&&a<10&&o<10){var r=this.active;this.resetScale(),this.$emit("close",{index:r,url:this.images[r]}),this.asyncClose||this.$emit("input",!1)}},startMove:function(t){var e=t.currentTarget,s=e.getBoundingClientRect(),i=window.innerWidth,a=window.innerHeight;this.touchStart(t),this.moving=!0,this.startMoveX=this.moveX,this.startMoveY=this.moveY,this.maxMoveX=Math.max(0,(s.width-i)/2),this.maxMoveY=Math.max(0,(s.height-a)/2)},startZoom:function(t){this.moving=!1,this.zooming=!0,this.startScale=this.scale,this.startDistance=f(t.touches)},onTouchStart:function(t){var e=t.touches,s=this.$refs.swipe||{},i=s.offsetX,a=void 0===i?0:i;1===e.length&&1!==this.scale?this.startMove(t):2!==e.length||a||this.startZoom(t)},onTouchMove:function(t){var e=t.touches;if((this.moving||this.zooming)&&Object(c["c"])(t,!0),this.moving){this.touchMove(t);var s=this.deltaX+this.startMoveX,i=this.deltaY+this.startMoveY;this.moveX=Object(r["i"])(s,-this.maxMoveX,this.maxMoveX),this.moveY=Object(r["i"])(i,-this.maxMoveY,this.maxMoveY)}if(this.zooming&&2===e.length){var a=f(e),n=this.startScale*a/this.startDistance;this.scale=Object(r["i"])(n,this.minZoom,this.maxZoom)}},onTouchEnd:function(t){if(this.moving||this.zooming){var e=!0;this.moving&&this.startMoveX===this.moveX&&this.startMoveY===this.moveY&&(e=!1),t.touches.length||(this.moving=!1,this.zooming=!1,this.startMoveX=0,this.startMoveY=0,this.startScale=1,this.scale<1&&this.resetScale()),e&&Object(c["c"])(t,!0)}},onChange:function(t){this.resetScale(),this.active=t,this.$emit("change",t)},resetScale:function(){this.scale=1,this.moveX=0,this.moveY=0}},render:function(t){var e=this;if(this.value){var s=this.active,i=this.images,a=this.showIndex&&t("div",{class:p("index")},[this.slots("index")||s+1+"/"+i.length]),n=t(u["a"],{ref:"swipe",attrs:{loop:this.loop,indicatorColor:"white",initialSwipe:this.startPosition,showIndicators:this.showIndicators},on:{change:this.onChange}},[i.map(function(i,a){var n={class:p("image"),style:a===s?e.imageStyle:null,on:{touchstart:e.onTouchStart,touchmove:e.onTouchMove,touchend:e.onTouchEnd,touchcancel:e.onTouchEnd}};return t(v["a"],[e.lazyLoad?t("img",o()([{directives:[{name:"lazy",value:i}]},n])):t("img",o()([{attrs:{src:i}},n]))])})]);return t("transition",{attrs:{name:"van-fade"}},[t("div",{class:[p(),this.className],on:{touchstart:this.onWrapperTouchStart,touchend:this.onWrapperTouchEnd,touchcancel:this.onWrapperTouchEnd}},[a,n])])}}}),w={images:[],loop:!0,value:!0,minZoom:1/3,maxZoom:3,className:"",lazyLoad:!1,showIndex:!0,asyncClose:!1,startPosition:0,showIndicators:!1},_=function(){g=new(a["default"].extend(b))({el:document.createElement("div")}),document.body.appendChild(g.$el)},C=function(t,e){if(void 0===e&&(e=0),!r["g"]){g||_();var s=Array.isArray(t)?{images:t,startPosition:e}:t;return Object(i["a"])(g,w,s),g.$once("input",function(t){g.value=t}),s.onClose&&g.$once("close",s.onClose),g}};C.install=function(){a["default"].use(b)};e["a"]=C},"2bb1":function(t,e,s){"use strict";var i=s("1988"),a=s("a142"),n=Object(a["j"])("swipe-item"),o=n[0],r=n[1];e["a"]=o({data:function(){return{offset:0}},beforeCreate:function(){this.$parent.swipes.push(this)},destroyed:function(){this.$parent.swipes.splice(this.$parent.swipes.indexOf(this),1)},render:function(t){var e=this.$parent,s=e.vertical,a=e.computedWidth,n=e.computedHeight,o={width:a+"px",height:s?n+"px":"100%",transform:"translate"+(s?"Y":"X")+"("+this.offset+"px)"};return t("div",{class:r(),style:o,on:Object(i["a"])({},this.$listeners)},[this.slots()])}})},4662:function(t,e,s){"use strict";s("68ef"),s("4d75"),s("8270"),s("786d"),s("504b")},"4b0a":function(t,e,s){"use strict";s("68ef"),s("786d")},"504b":function(t,e,s){},5596:function(t,e,s){"use strict";var i=s("a142"),a=s("db78"),n=s("3875"),o=Object(i["j"])("swipe"),r=o[0],c=o[1];e["a"]=r({mixins:[n["a"]],props:{width:Number,height:Number,autoplay:Number,vertical:Boolean,initialSwipe:Number,indicatorColor:String,loop:{type:Boolean,default:!0},touchable:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},duration:{type:Number,default:500}},data:function(){return{computedWidth:0,computedHeight:0,offset:0,active:0,deltaX:0,deltaY:0,swipes:[],swiping:!1}},mounted:function(){this.initialize(),this.$isServer||Object(a["b"])(window,"resize",this.onResize,!0)},activated:function(){this.rendered&&this.initialize(),this.rendered=!0},destroyed:function(){this.clear(),this.$isServer||Object(a["a"])(window,"resize",this.onResize,!0)},watch:{swipes:function(){this.initialize()},initialSwipe:function(){this.initialize()},autoplay:function(t){t?this.autoPlay():this.clear()}},computed:{count:function(){return this.swipes.length},delta:function(){return this.vertical?this.deltaY:this.deltaX},size:function(){return this[this.vertical?"computedHeight":"computedWidth"]},trackSize:function(){return this.count*this.size},activeIndicator:function(){return(this.active+this.count)%this.count},isCorrectDirection:function(){var t=this.vertical?"vertical":"horizontal";return this.direction===t},trackStyle:function(){var t,e=this.vertical?"height":"width",s=this.vertical?"width":"height";return t={},t[e]=this.trackSize+"px",t[s]=this[s]?this[s]+"px":"",t.transitionDuration=(this.swiping?0:this.duration)+"ms",t.transform="translate"+(this.vertical?"Y":"X")+"("+this.offset+"px)",t},indicatorStyle:function(){return{backgroundColor:this.indicatorColor}}},methods:{initialize:function(t){if(void 0===t&&(t=this.initialSwipe),clearTimeout(this.timer),this.$el){var e=this.$el.getBoundingClientRect();this.computedWidth=this.width||e.width,this.computedHeight=this.height||e.height}this.swiping=!0,this.active=t,this.offset=this.count>1?-this.size*this.active:0,this.swipes.forEach(function(t){t.offset=0}),this.autoPlay()},onResize:function(){this.initialize(this.activeIndicator)},onTouchStart:function(t){this.touchable&&(this.clear(),this.swiping=!0,this.touchStart(t),this.correctPosition())},onTouchMove:function(t){this.touchable&&this.swiping&&(this.touchMove(t),this.isCorrectDirection&&(Object(a["c"])(t,!0),this.move({offset:Math.min(Math.max(this.delta,-this.size),this.size)})))},onTouchEnd:function(){if(this.touchable&&this.swiping){if(this.delta&&this.isCorrectDirection){var t=this.vertical?this.offsetY:this.offsetX;this.move({pace:t>0?this.delta>0?-1:1:0,emitChange:!0})}this.swiping=!1,this.autoPlay()}},move:function(t){var e=t.pace,s=void 0===e?0:e,i=t.offset,a=void 0===i?0:i,n=t.emitChange,o=this.delta,r=this.active,c=this.count,l=this.swipes,h=this.trackSize,u=0===r,v=r===c-1,d=!this.loop&&(u&&(a>0||s<0)||v&&(a<0||s>0));d||c<=1||(l[0]&&(l[0].offset=v&&(o<0||s>0)?h:0),l[c-1]&&(l[c-1].offset=u&&(o>0||s<0)?-h:0),s&&r+s>=-1&&r+s<=c&&(this.active+=s,n&&this.$emit("change",this.activeIndicator)),this.offset=Math.round(a-this.active*this.size))},swipeTo:function(t){var e=this;this.swiping=!0,this.resetTouchStatus(),this.correctPosition(),setTimeout(function(){e.swiping=!1,e.move({pace:t%e.count-e.active,emitChange:!0})},30)},correctPosition:function(){this.active<=-1&&this.move({pace:this.count}),this.active>=this.count&&this.move({pace:-this.count})},clear:function(){clearTimeout(this.timer)},autoPlay:function(){var t=this,e=this.autoplay;e&&this.count>1&&(this.clear(),this.timer=setTimeout(function(){t.swiping=!0,t.resetTouchStatus(),t.correctPosition(),setTimeout(function(){t.swiping=!1,t.move({pace:1,emitChange:!0}),t.autoPlay()},30)},e))}},render:function(t){var e=this,s=this.count,i=this.activeIndicator,a=this.slots("indicator")||this.showIndicators&&s>1&&t("div",{class:c("indicators",{vertical:this.vertical})},[Array.apply(void 0,Array(s)).map(function(s,a){return t("i",{class:c("indicator",{active:a===i}),style:a===i?e.indicatorStyle:null})})]);return t("div",{class:c()},[t("div",{ref:"track",style:this.trackStyle,class:c("track"),on:{touchstart:this.onTouchStart,touchmove:this.onTouchMove,touchend:this.onTouchEnd,touchcancel:this.onTouchEnd}},[this.slots()]),a])}})},"65bd":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAi0lEQVRYR+2Vuw2AMAwFnydgFUbJCBmBldjAI7CZUYo0SOAPRZqXOs6dTrIiWHxkMR8UYAEWYAEWYAG3QGttF5ELwJb9uMzsVNX+NecKjOGKRAQ+3g4JZCWi8JRAVCIDTwt4Ell4SeBNogIvCzwlqvBfAlMCQFfVI7ui8354C6oAb44CLMACLLC8wA0ZLzwhIEUjEwAAAABJRU5ErkJggg=="},7844:function(t,e,s){"use strict";s("68ef"),s("8270")},"786d":function(t,e,s){},8131:function(t,e,s){},8270:function(t,e,s){},a70e:function(t,e,s){"use strict";var i,a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"usedCarDetection page"},[s("div",{staticClass:"inverse-bg-grey"}),s("div",{staticClass:"main-container"},[s("div",{staticClass:"solution"},[t.pointMsgShow?s("div",{staticClass:"tips"},[s("span",{staticClass:"text"},[t._v(t._s(t.data.orgPointsStatusMsg))]),s("van-icon",{staticClass:"closeIcon",attrs:{name:"close"},on:{click:function(e){t.pointMsgShow=!1}}})],1):t._e(),t.openMsgShow?s("div",{staticClass:"tips"},[s("span",{staticClass:"text"},[t._v(t._s(t.data.pushSmsStatusMsg))]),s("van-icon",{staticClass:"closeIcon",attrs:{name:"close"},on:{click:function(e){t.openMsgShow=!1}}})],1):t._e(),s("div",{staticClass:"head-icon"},[s("h3",[t._v(t._s(t.report.shopName))]),s("h2",[t._v(t._s(t.report.reportTitle))])]),s("div",{staticClass:"carInfo report-block"},[t.report.baseInfo.picList&&t.report.baseInfo.picList.length?s("div",{staticClass:"banner"},[s("van-swipe",{attrs:{autoplay:3e3,"show-indicators":!1,height:t.bannerHeight}},t._l(t.report.baseInfo.picList,function(e,i){return s("van-swipe-item",{key:i},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e,expression:"image"}],attrs:{width:"100%"},on:{click:function(e){return t.enlargeImage(t.report.baseInfo.picList,i)}}})])}),1)],1):t._e(),s("div",{staticClass:"carInfo-top"},[t.report.baseInfo.carBrandLogo?s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.carLogoPre+t.report.baseInfo.carBrandLogo+".jpg",expression:"carLogoPre + report.baseInfo.carBrandLogo +'.jpg'"}],staticClass:"car-icon"}):t._e(),s("span",{staticClass:"carName"},[t._v(t._s(t.report.baseInfo.carMemo))])]),s("ul",{staticClass:"carInfo-bottom"},[s("li",[s("span",{staticClass:"item-name"},[t._v("车架号（VIN码）")]),s("span",{staticClass:"item-data"},[t._v(t._s(t.report.baseInfo.carVinNo))])]),s("li",[s("span",{staticClass:"item-name"},[t._v("公里数")]),s("span",{staticClass:"item-data"},[t._v(t._s(t._f("mileTurn")(t.report.baseInfo.miles)))])])])]),s("div",{staticClass:"report-score report-block"},[s("div",{staticClass:"content"},[s("div",{staticClass:"leftside"},[s("div",{staticClass:"score-detail"},[t._v(t._s(t.report.baseInfo.totalScore))]),s("div",{staticClass:"score-text"},[t._v(t._s(t._f("scoreTurn")(t.report.baseInfo.totalScore)))]),s("div",{staticClass:"score-label"},[t._v("车况评分")])]),s("div",{staticClass:"rightside"},[s("div",{staticClass:"shop-name"},[t._v(t._s(t.report.baseInfo.createShopName))]),s("div",{staticClass:"create-username"},[t.report.baseInfo.techNumber?s("span",{staticClass:"prove"},[t._v("认证检测师")]):t._e(),s("span",[t._v(t._s(t.report.baseInfo.createUserName))])]),s("div",{staticClass:"create-time"},[t._v(t._s(t.report.baseInfo.detectionTime))])])]),s("div",{staticClass:"score-footer"},[t._v("根据已检测项目的检测结果计算健康状态")])]),s("div",[t.makeResultList.length?s("div",{staticClass:"report-block"},[t._m(0),s("div",{staticClass:"make-result"},t._l(t.makeResultList,function(t,e){return s("van-cell",{key:e,attrs:{value:t}})}),1)]):t._e(),s("div",{staticClass:"report-block system-list-block"},[t.systemList.length?s("div",{staticClass:"system-list"},[s("div",[t._m(1),t._l(t.systemList,function(e,i){return s("div",{key:i,staticClass:"system-list-item"},[s("div",{staticClass:"list-title"},[s("div",{staticClass:"list-status"},[s("h5",[t._v(t._s(t.bigSytemCode[e.code]))]),s("span",{staticClass:"list-status-detail",style:{color:"1"!=e.status&&"e"!=e.status?"#f2bc4e":""}},[t._v(t._s(t._f("systemStatusTurn")(e.status)))])]),t.showList.includes(e.code)?s("div",{staticClass:"arrow-btn",on:{click:function(s){return t.showListChange(e.code)}}},[s("span",[t._v("收起")]),t._m(2,!0)]):s("div",{staticClass:"arrow-btn",on:{click:function(s){return t.showListChange(e.code)}}},[s("span",[t._v("详情")]),t._m(3,!0)])]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showList.includes(e.code),expression:"showList.includes(item.code)"}],staticClass:"overall"},[s("div",{staticClass:"overall-title"},[t._v("\n                                        整体情况\n                                        "),e.faultNumber?s("span",{staticClass:"faultnum"},[t._v(t._s(e.faultNumber)+"项故障")]):t._e()]),"e"==e.status?s("div",{staticClass:"overall-content"},[t._v("未检测")]):s("div",{staticClass:"overall-content"},[t._v(t._s(e.promptDesc))])]),s("ul",{directives:[{name:"show",rawName:"v-show",value:t.showList.includes(e.code)&&"e"!=e.status,expression:"showList.includes(item.code) && item.status != 'e'"}]},t._l(e.subList,function(e,i){return s("li",{key:i},[s("div",{staticClass:"name"},[s("span",{staticClass:"text"},[t._v(t._s(e.itemName))]),"0"==e.level?s("span",{staticClass:"level level0"},[t._v("轻微")]):t._e(),"2"==e.level?s("span",{staticClass:"level level2"},[t._v("中度")]):t._e(),"3"==e.level?s("span",{staticClass:"level level3"},[t._v("严重")]):t._e()]),e.detectionResult||e.result?s("div",{staticClass:"result"},[s("span",{staticClass:"label result-label"},[t._v("检测结果")]),"1"==e.level?s("span",{staticClass:"text"},[t._v(t._s(e.result))]):t._e(),"0"==e.level||"2"==e.level||"3"==e.level?s("span",{staticClass:"text"},[t._v(t._s(e.detectionResult))]):t._e()]):t._e(),e.riskForecast?s("div",{staticClass:"result"},[s("div",{staticClass:"label airesult-label"},[t._v("AI诊断结果")]),s("span",{staticClass:"text"},[t._v(t._s(e.riskForecast))])]):t._e(),e.jnsExplanationList&&e.jnsExplanationList.length?s("div",{staticClass:"jnsRead"},[s("span",{staticClass:"label"},[t._v("JNS解读")]),1==e.jnsExplanationList.length?s("div",{staticClass:"jnsRead-list"},t._l(e.jnsExplanationList,function(e,i){return s("a",{key:i,staticClass:"text",attrs:{href:e.url}},[t._v(t._s(e.title))])}),0):s("div",{staticClass:"jnsRead-list"},t._l(e.jnsExplanationList,function(e,i){return s("a",{key:i,staticClass:"text",attrs:{href:e.url}},[t._v(t._s(i+1+"."+e.title))])}),0)]):t._e(),e.imgList&&e.imgList.length?s("div",{staticClass:"result-photo"},t._l(e.imgList,function(i,a){return s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i,expression:"item"}],key:a,on:{click:function(s){return t.enlargeImage(e.imgList,a)}}})}),0):t._e()])}),0)])})],2)]):t._e()]),t.report.maintenance.length?s("div",{staticClass:"report-block"},[t.maintainScheme.parts.length||t.maintainScheme.maintenanceMode.length?s("div",[t._m(4),t.report.maintenance.length>1?s("div",{staticClass:"selectBtn"},t._l(t.report.maintenance,function(e,i){return s("div",{key:i,staticClass:"btn",class:t.activeIndex==i?"active":"",on:{click:function(e){return t.selectMaintainScheme(i)}}},[t._v(t._s(0==i?"即时维修方式":"预案维修方式"))])}),0):t._e(),1==t.report.maintenance.length?s("div",{staticClass:"selectBtn selectBtnOnly"},[s("div",{staticClass:"btn active"},[t._v(t._s(t.hasLevel3?"即时维修方式":"预案维修方式"))])]):t._e(),s("div",{staticClass:"solution-parts"},[t.maintainScheme.parts.length?s("div",[s("div",{staticClass:"list-titlt"},[s("van-row",{attrs:{type:"flex",justify:"space-between"}},[s("van-col",{staticClass:"main-title",attrs:{span:"11"}},[t._v("配件耗材")]),t.brandTitleShow?s("van-col",{attrs:{span:"7"}},[t._v("品牌")]):t._e(),s("van-col",{staticClass:"text-right",attrs:{span:"7"}},[t._v("价格(元)")])],1)],1),s("ul",{staticClass:"content-list"},[t._l(t.maintainScheme.parts,function(e,i){return s("li",{key:e.name+i},[s("van-row",{attrs:{type:"flex",justify:"space-between"}},[s("van-col",{attrs:{span:"10"}},[t._v(t._s(e.name))]),s("van-col",{attrs:{span:"8"}},[t._v(t._s(e.brand))]),s("van-col",{staticClass:"text-right",attrs:{span:"4"}},[s("span",[t._v(t._s(e.subtotal>0?e.subtotal:"-"))])])],1)],1)}),s("li",[s("van-row",{attrs:{type:"flex",justify:"space-between"}},[s("van-col",{attrs:{span:"10"}},[t._v("合计")]),s("van-col",{attrs:{span:"8"}}),s("van-col",{staticClass:"text-right",attrs:{span:"6"}},[s("span",[t._v(t._s(t.maintainScheme.total))])])],1)],1)],2)]):t._e(),t.maintainScheme.maintenanceMode.length?s("div",[s("div",{staticClass:"list-titlt"},[s("van-row",{attrs:{type:"flex",justify:"space-between"}},[s("van-col",{staticClass:"main-title",attrs:{span:"11"}},[t._v("维修项目")]),s("van-col",{staticClass:"text-right",attrs:{span:"8"}},[t._v("计划工时(小时)")])],1)],1),s("ul",{staticClass:"content-list"},[t._l(t.maintainScheme.maintenanceMode,function(e,i){return s("li",{key:i},[s("van-row",{attrs:{type:"flex",justify:"space-between"}},[s("van-col",{attrs:{span:"14"}},[t._v(t._s(e.maintenanceName))]),s("van-col",{staticClass:"text-right",attrs:{span:"4"}},[s("span",[t._v(t._s(e.maintenanceTime>0?e.maintenanceTime:"-"))])])],1)],1)}),s("li",[s("van-row",{attrs:{type:"flex",justify:"space-between"}},[s("van-col",{attrs:{span:"14"}},[t._v("合计")]),s("van-col",{staticClass:"text-right",attrs:{span:"4"}},[s("span",[t._v(t._s(t.maintainScheme.maintenanceTimeTotal))])])],1)],1)],2)]):t._e()])]):t._e(),s("div",{staticClass:"statement"},[s("h3",[t._v("声明")]),s("ul",[s("li",[t._v("本报告内容最终解释权归："+t._s(t.report.shopName)+"所有")])])])]):t._e()])])])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("b",[t._v("诊断结果")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("b",[t._v("检测与诊断项目")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("i",{staticClass:"arrow"},[i("img",{attrs:{src:s("ce73")}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("i",{staticClass:"arrow"},[i("img",{attrs:{src:s("65bd")}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",[s("b",[t._v("维修方式")])])}],o=(s("4662"),s("28a2")),r=(s("4b0a"),s("2bb1")),c=(s("7844"),s("5596")),l=(s("e17b"),s("cf45"));function h(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var u={filters:{mileTurn:function(t){return t?(t=parseInt(t),t>1e4?(t=(t/1e4).toFixed(2)+"万",t.toString()):t.toString()+"公里"):""},scoreTurn:function(t){return t?t<35?"车况极差":t>=35&&t<60?"车况较差":t>=60&&t<85?"车况良好":t>=85?"车况优良":void 0:""},systemStatusTurn:function(t){return t?"e"==t?"未检测":"1"==t?"正常":"异常":""}},components:(i={},h(i,c["a"].name,c["a"]),h(i,r["a"].name,r["a"]),i),data:function(){return{bannerHeight:Object(l["a"])(),carLogoPre:"https://www.wanguoqiche.com/files/logo/",systemList:[],brandTitleShow:!1,maintainScheme:{parts:[],maintenanceMode:[]},makeResultList:[],bigSytemCode:{bodywk:"外观内饰",light:"灯光系统",elect:"车载电脑",supply:"供电系统",driver:"传动系统",cold:"空调系统",engine:"发动机系统",chas:"底盘系统",brake:"制动系统"},showList:[],activeIndex:0,pointMsgShow:!1,openMsgShow:!1,hasLevel3:!1}},props:{report:{type:Object,default:function(){return{}}},data:{type:Object,default:function(){return{}}}},created:function(){},mounted:function(){this.data&&this.msgHandle(),this.reportHandle()},methods:{msgHandle:function(){this.pointMsgShow=!!this.data.orgPointsStatusMsg,this.openMsgShow=!!this.data.pushSmsStatusMsg},selectMaintainScheme:function(t){this.report.maintenance.length&&(this.activeIndex=t,this.maintainScheme=this.report.maintenance[t])},reportHandle:function(){if(this.report.baseInfo.pic.length&&(this.report.baseInfo.picList=this.report.baseInfo.pic.split(",")),this.report.makeResult)for(var t=this.report.makeResult.split("<br>"),e=0;e<t.length;e++)t[e]&&this.makeResultList.push("".concat(e+1,".").concat(t[e]));this.selectMaintainScheme(0);for(var s=this.maintainScheme.parts||[],i=0;i<s.length;i++)if(s[i].brand){this.brandTitleShow=!0;break}this.systemList=this.report.sysInfo;var a=!0,n=!1,o=void 0;try{for(var r,c=this.systemList[Symbol.iterator]();!(a=(r=c.next()).done);a=!0){var l=r.value;l.faultNumber=0,l.subList=[],"0"!=l.status&&"2"!=l.status&&"3"!=l.status||this.showList.push(l.code);var h=!0,u=!1,v=void 0;try{for(var d,m=this.report.subSysInfo[Symbol.iterator]();!(h=(d=m.next()).done);h=!0){var p=d.value;p.code.startsWith(l.code)&&"e"!==p.level&&(l.subList.push(p),"1"!==p.level&&"e"!==p.level&&l.faultNumber++,"3"==p.level&&(this.hasLevel3=!0))}}catch(f){u=!0,v=f}finally{try{h||null==m.return||m.return()}finally{if(u)throw v}}}}catch(f){n=!0,o=f}finally{try{a||null==c.return||c.return()}finally{if(n)throw o}}this.report.baseInfo.totalScore>=96&&!this.makeResultList.length&&(this.report.baseInfo.totalScore=100)},enlargeImage:function(t,e){Object(o["a"])({images:t,loop:!1,startPosition:e,lazyLoad:!0,showIndicators:!0})},showListChange:function(t){var e=this.showList.indexOf(t);-1==e?this.showList.push(t):this.showList.splice(e,1)}}},v=u,d=(s("c189"),s("1343"),s("2877")),m=Object(d["a"])(v,a,n,!1,null,"502f5299",null);e["a"]=m.exports},b775:function(t,e,s){"use strict";s("e7e5");var i=s("d399"),a=s("bc3a"),n=s.n(a),o=s("4328"),r=s.n(o),c=s("e17b"),l=s("5f87"),h=s("cf45"),u=n.a.create({baseURL:"https://api.wanguoqiche.com",timeout:5e3,headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:[function(t){return t=r.a.stringify(t),t}]}),v={handle:function(t){Object(h["j"])()||!Object(l["a"])()?t&&t():setTimeout(function(){c["a"].backHome()},1e3)},40500:function(t){Object(i["a"])({type:"fail",message:t,duration:1e3}),this.handle()},40300:function(t){Object(i["a"])({type:"fail",message:t,duration:1e3}),this.handle()},40600:function(t){Object(i["a"])({type:"fail",message:t,duration:1e3}),this.handle()},40100:function(t){Object(i["a"])({type:"fail",message:t,duration:1e3}),setTimeout(function(){if(Object(l["b"])()&&Object(l["d"])(),Object(h["j"])())return location.reload(),!0;c["a"].jumpLogin()},1e3)},40400:function(t){Object(i["a"])({type:"fail",message:t,duration:1e3})},40000:function(){return!0}};u.interceptors.request.use(function(t){return void 0===t.data&&(t.data={}),t.data.token=Object(l["b"])(),t},function(t){return Promise.reject(t).catch(function(t){return t})}),u.interceptors.response.use(function(t){var e=t.data;return 2e4!==e.code?(v[e.code]&&v[e.code](e.msg),Promise.reject(e).catch(function(t){return t})):e},function(t){return Object(i["a"])({type:"fail",message:t.message}),Promise.reject(t).catch(function(t){return t})}),e["a"]=u},c189:function(t,e,s){"use strict";var i=s("065d"),a=s.n(i);a.a},ce73:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAkUlEQVRYR+3UwQ2EMAxEUbsDStlSpgPYzlLClLKlbAfhQi5IKLFziJCGuzVPXwpuiz9fvG8CqIAKqMD7CwA4SJbsH3WqAIDi7nuttZD8ZhBpQBtvo1lECnAfn0GEAU/jWUQI0BvPIIYBo+NRxBAgOh5BdAEANjP7ZJ7YdfMj+X+67wImhodOBVABFVABFVhe4ASbxEEhd9vH9AAAAABJRU5ErkJggg=="}}]);
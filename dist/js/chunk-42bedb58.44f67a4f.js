(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42bedb58"],{"0622":function(t,e,n){"use strict";var i=n("be18"),o=n.n(i);o.a},1354:function(t,e,n){"use strict";var i=n("305e"),o=n.n(i);o.a},"305e":function(t,e,n){},"3cd5":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("background"),n("headerOne",{attrs:{title:"报告详情",isFixed:!0,backgroundStatus:!0,rightText:this.qrCodeLink?"分享":"",onClickLeftStatus:t.onClickLeftStatus},on:{onClickRight:t.reportShare,onClickLeft:t.back}}),n("div",{staticClass:"main-container"},[t.report.baseInfo&&t.reportReady?n("carSecurityCheckReportV1",{attrs:{report:t.report,data:t.data}}):t._e(),t.reportReady?t._e():n("div",{staticClass:"reportNoReady"},[n("van-icon",{staticClass:"report-icon",attrs:{name:"todo-list-o"}}),n("div",[t._v("报告未生成，请稍候查看")])],1),t.qrCodeLink?n("qrCodeReport",{attrs:{qrCodeLink:t.qrCodeLink,isFixed:!0}}):t._e()],1),t.payBtnShow?n("pubButton",{attrs:{title:"生成报告",isFixed:!0},on:{buttonConfirm:t.pushCarOwner}}):t._e()],1)},o=[],r=n("87d9"),a=n("e62a"),s=n("97a4"),l=n("a70e"),c=n("7267"),u=n("e17b"),d=(n("9ef6"),n("cf45")),f=n("a7f8"),p="",h={components:{headerOne:r["a"],qrCodeReport:s["a"],carSecurityCheckReportV1:l["a"],pubButton:a["a"],background:c["a"]},data:function(){return{title:this.$route.meta.title,data:{},report:{},baseInfo:{},billId:"",qrCodeLink:"",carLogoPre:"https://www.wanguoqiche.com/files/logo/",payBtnShow:!1,leftText:"",onClickLeftStatus:!1,reportReady:!0}},created:function(){},mounted:function(){this.init(),p=this,window.appToH5=function(){p.getReportById(p.billId)}},computed:{},methods:{init:function(){var t=this.$route.query;if(t)if(this.billId=t.billId,this.billId&&this.getReportById(this.billId),t.jnsAppStep&&"J006_report"==t.jnsAppStep){var e=this;e.leftText="",e.onClickLeftStatus=!0,u["a"].androidCallback().cover(function(){e.back()})}else this.leftText="返回检测工单",this.onClickLeftStatus=!1},getReportById:function(t){var e=this,n={billId:this.billId||""};f["a"].getReportByBillId(n).then(function(t){2e4==t.code?(e.data=t.data,e.report=t.data.reportData,e.qrCodeLink=e.report.ownerReportUrl,e.report.title&&(e.title=e.report.title),Object(d["i"])(e.report.baseInfo)&&(e.reportReady=!1),"2"==t.data.pushStatus&&e.reportReady?e.payBtnShow=!0:e.payBtnShow=!1):e.$toast.fail(t.msg)})},reportShare:function(){var t={shareUrl:this.qrCodeLink,title:this.report.title,subtitle:this.report.baseInfo.carMemo,logo:Object(d["e"])(this.report.baseInfo.carBrandLogo),bill_id:this.billId,sms:1,bill_type:"J006"};u["a"].h5ToApp("share",t)},back:function(){u["a"].back()},pushCarOwner:function(){if(!this.data.orgPointsStatusMsg){var t={bill_id:this.billId,bill_type:"J006"};u["a"].h5ToApp("payOrder",t)}}}},b=h,g=(n("a40a"),n("2877")),y=Object(g["a"])(b,i,o,!1,null,"257b0cd4",null);e["default"]=y.exports},"60b4":function(t,e,n){},"70d1":function(t,e,n){},7267:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("div",{staticClass:"background",style:t.styleObject,attrs:{id:"pageBackground"}})])},o=[],r={data:function(){return{styleObject:{background:"#f2f2f2"}}},props:["background"],created:function(){},mounted:function(){this.init()},methods:{init:function(){this.background&&(this.styleObject.background=this.background)}}},a=r,s=(n("7dfe"),n("2877")),l=Object(s["a"])(a,i,o,!1,null,"76080968",null);e["a"]=l.exports},"7dfe":function(t,e,n){"use strict";var i=n("60b4"),o=n.n(i);o.a},"87d9":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header-one"},[n("van-nav-bar",{class:{"clear-background":t.backgroundStatus,"border-bottom":t.isborderBottom},attrs:{"z-index":999,fixed:t.isFixed,border:!0,title:t.title,"left-text":t.leftText,"right-text":t.rightText,"left-arrow":t.leftArrow},on:{"click-left":function(e){return t.onClickLeft()},"click-right":t.onClickRight}},["icon"==t.rightText?n("van-icon",{staticClass:"icon-right",attrs:{slot:"right",color:"#000",name:t.iconName},slot:"right"}):t._e()],1),n("van-row",{class:{"header-fixed-margin":t.isFixed,"header-fixed-margin-hide":!t.isFixed}})],1)},o=[],r=(n("c3a6"),n("ad06")),a=(n("68ef"),n("8a0b"),n("2638")),s=n.n(a),l=n("a142"),c=n("ba31"),u=Object(l["j"])("nav-bar"),d=u[0],f=u[1];function p(t,e,n,i){return t("div",s()([{class:[f({fixed:e.fixed}),{"van-hairline--bottom":e.border}],style:{zIndex:e.zIndex}},Object(c["b"])(i)]),[t("div",{class:f("left"),on:{click:i.listeners["click-left"]||l["h"]}},[n.left?n.left():[e.leftArrow&&t(r["a"],{class:f("arrow"),attrs:{name:"arrow-left"}}),e.leftText&&t("span",{class:f("text")},[e.leftText])]]),t("div",{class:[f("title"),"van-ellipsis"]},[n.title?n.title():e.title]),t("div",{class:f("right"),on:{click:i.listeners["click-right"]||l["h"]}},[n.right?n.right():e.rightText&&t("span",{class:f("text")},[e.rightText])])])}p.props={title:String,fixed:Boolean,leftText:String,rightText:String,leftArrow:Boolean,border:{type:Boolean,default:!0},zIndex:{type:Number,default:1}};var h,b=d(p),g=n("9ef6");function y(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var v={name:"HeaderOne",data:function(){return{}},components:(h={},y(h,b.name,b),y(h,r["a"].name,r["a"]),h),props:{title:{type:String,default:""},isFixed:{type:Boolean,default:!1},backgroundStatus:{type:Boolean,default:!1},leftText:{type:String,default:""},rightText:{type:String,default:""},leftArrow:{type:Boolean,default:!0},onClickLeftStatus:{type:Boolean,default:!1},isborderBottom:{type:Boolean,default:!1},iconName:{type:String,default:"share"}},mounted:function(){},methods:{onClickLeft:function(){this.onClickLeftStatus?this.$emit("onClickLeft"):g["a"].handle()},onClickRight:function(){this.$emit("onClickRight")}}},m=v,k=(n("0622"),n("2877")),x=Object(k["a"])(m,i,o,!1,null,null,null);e["a"]=x.exports},"8a0b":function(t,e,n){},"97a4":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("div",{staticClass:"main-container"},[n("div",{staticClass:"button-content",class:{buttonFixed:t.isFixed}},[n("van-button",{ref:"buttonSelector",style:t.styleButton,attrs:{"native-type":"button",type:"info",size:"large",block:!0},on:{click:t.qrCodeView}},[t._v("查看二维码")])],1),n("van-row",{class:{"bottom-fixed-hide":!t.isFixed},style:t.styleButtonFixed}),n("van-popup",{staticClass:"qr-code-canvas-popup",attrs:{"lazy-render":!1},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[n("canvas",{directives:[{name:"show",rawName:"v-show",value:1==t.show,expression:"show==true"}],staticClass:"qr-code-canvas",attrs:{id:"qrCodeCanvas"}})])],1)])},o=[],r=n("d055"),a=n.n(r),s={name:"qrCodeReport",data:function(){return{show:!1,styleButton:{},styleButtonFixed:{}}},props:{qrCodeLink:{type:String,default:""},background:{type:String,default:"#46aef7"},isFixed:{type:Boolean,default:!1}},mounted:function(){this.init(),this.styleButtonHandle(),this.useQrcode()},methods:{init:function(){var t=this.$refs.buttonSelector.offsetHeight+10;this.styleButtonFixed={height:t+"px"}},qrCodeView:function(){this.show?this.show=!1:this.show=!0},useQrcode:function(){var t=this,e=document.getElementById("qrCodeCanvas");a.a.toCanvas(e,t.qrCodeLink||"",{width:180,margin:1},function(t){})},styleButtonHandle:function(){this.styleButton={"background-color":this.background,border:"1px solid"+this.background}}}},l=s,c=(n("1354"),n("2877")),u=Object(c["a"])(l,i,o,!1,null,"022bfa90",null);e["a"]=u.exports},a40a:function(t,e,n){"use strict";var i=n("70d1"),o=n.n(i);o.a},a7f8:function(t,e,n){"use strict";var i=n("b775");e["a"]={getBillDetail:function(t){return i["a"].post("/Bill/Report/getReportByJ005",{billId:t})},getReportByBillIdV2:function(t){return i["a"].post("/Bill/Report/getReportByBillIdV2",{billId:t})},getReportByBillIdV3:function(t){return i["a"].post("/Bill/Report/getReportByBillIdV3",{bill_id:t})},getReportByBillId:function(t){return i["a"].post("/Bill/Report/getReportByBillId",t)}}},be18:function(t,e,n){},d5c9:function(t,e,n){},e62a:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("div",{staticClass:"button-content",class:{buttonFixed:t.isFixed}},[n("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showStatus,expression:"showStatus"}],ref:"buttonSelector",style:t.styleButton,attrs:{"native-type":"button",type:"info",size:"large",block:!0},on:{click:t.buttonConfirm}},[t._v(t._s(t.title))])],1),n("van-row",{class:{"bottom-fixed-hide":!t.isFixed},style:t.styleButtonFixed})],1)},o=[];function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,i)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(n,!0).forEach(function(e){s(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l={data:function(){return{showStatus:!0,styleButton:{},styleButtonFixed:{}}},props:{title:{type:String,default:""},background:{type:String,default:"#46aef7"},isFixed:{type:Boolean,default:!0},textColor:{type:String,default:"#fff"}},created:function(){},mounted:function(){this.init(),this.screenSizeControl(),this.styleButtonHandle()},methods:{init:function(){var t=this.$refs.buttonSelector.offsetHeight+10;this.styleButtonFixed={height:t+"px"}},buttonConfirm:function(){this.$emit("buttonConfirm")},screenSizeControl:function(){var t=this,e=document.documentElement.clientHeight||document.body.clientHeight;window.onresize=function(){var n=document.documentElement.clientHeight||document.body.clientHeight,i=e-n;t.showStatus=!(n<e&&i>100)}},styleButtonHandle:function(){this.styleButton={"background-color":this.background,border:"1px solid"+this.background,color:this.textColor}}},watch:{background:function(t,e){var n={"background-color":t,border:"1px solid"+t};this.styleButton=a({},this.styleButton,{},n)}}},c=l,u=(n("fc10"),n("2877")),d=Object(u["a"])(c,i,o,!1,null,"68d620b5",null);e["a"]=d.exports},fc10:function(t,e,n){"use strict";var i=n("d5c9"),o=n.n(i);o.a}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d77b7ec"],{"0622":function(t,e,i){"use strict";var n=i("be18"),a=i.n(n);a.a},1354:function(t,e,i){"use strict";var n=i("305e"),a=i.n(n);a.a},"305e":function(t,e,i){},"5cd7":function(t,e,i){"use strict";var n=i("dc09"),a=i.n(n);a.a},"60b4":function(t,e,i){},7267:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page"},[i("div",{staticClass:"background",style:t.styleObject,attrs:{id:"pageBackground"}})])},a=[],o={data:function(){return{styleObject:{background:"#f2f2f2"}}},props:["background"],created:function(){},mounted:function(){this.init()},methods:{init:function(){this.background&&(this.styleObject.background=this.background)}}},r=o,s=(i("7dfe"),i("2877")),l=Object(s["a"])(r,n,a,!1,null,"76080968",null);e["a"]=l.exports},"7dfe":function(t,e,i){"use strict";var n=i("60b4"),a=i.n(n);a.a},"87d9":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"header-one"},[i("van-nav-bar",{class:{"clear-background":t.backgroundStatus,"border-bottom":t.isborderBottom},attrs:{"z-index":999,fixed:t.isFixed,border:!0,title:t.title,"left-text":t.leftText,"right-text":t.rightText,"left-arrow":t.leftArrow},on:{"click-left":function(e){return t.onClickLeft()},"click-right":t.onClickRight}},["icon"==t.rightText?i("van-icon",{staticClass:"icon-right",attrs:{slot:"right",color:"#000",name:t.iconName},slot:"right"}):t._e()],1),i("van-row",{class:{"header-fixed-margin":t.isFixed,"header-fixed-margin-hide":!t.isFixed}})],1)},a=[],o=(i("c3a6"),i("ad06")),r=(i("68ef"),i("8a0b"),i("2638")),s=i.n(r),l=i("a142"),c=i("ba31"),d=Object(l["j"])("nav-bar"),u=d[0],f=d[1];function p(t,e,i,n){return t("div",s()([{class:[f({fixed:e.fixed}),{"van-hairline--bottom":e.border}],style:{zIndex:e.zIndex}},Object(c["b"])(n)]),[t("div",{class:f("left"),on:{click:n.listeners["click-left"]||l["h"]}},[i.left?i.left():[e.leftArrow&&t(o["a"],{class:f("arrow"),attrs:{name:"arrow-left"}}),e.leftText&&t("span",{class:f("text")},[e.leftText])]]),t("div",{class:[f("title"),"van-ellipsis"]},[i.title?i.title():e.title]),t("div",{class:f("right"),on:{click:n.listeners["click-right"]||l["h"]}},[i.right?i.right():e.rightText&&t("span",{class:f("text")},[e.rightText])])])}p.props={title:String,fixed:Boolean,leftText:String,rightText:String,leftArrow:Boolean,border:{type:Boolean,default:!0},zIndex:{type:Number,default:1}};var h,b=u(p),g=i("9ef6");function k(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var v={name:"HeaderOne",data:function(){return{}},components:(h={},k(h,b.name,b),k(h,o["a"].name,o["a"]),h),props:{title:{type:String,default:""},isFixed:{type:Boolean,default:!1},backgroundStatus:{type:Boolean,default:!1},leftText:{type:String,default:""},rightText:{type:String,default:""},leftArrow:{type:Boolean,default:!0},onClickLeftStatus:{type:Boolean,default:!1},isborderBottom:{type:Boolean,default:!1},iconName:{type:String,default:"share"}},mounted:function(){},methods:{onClickLeft:function(){this.onClickLeftStatus?this.$emit("onClickLeft"):g["a"].handle()},onClickRight:function(){this.$emit("onClickRight")}}},m=v,x=(i("0622"),i("2877")),C=Object(x["a"])(m,n,a,!1,null,null,null);e["a"]=C.exports},"8a0b":function(t,e,i){},"97a4":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page"},[i("div",{staticClass:"main-container"},[i("div",{staticClass:"button-content",class:{buttonFixed:t.isFixed}},[i("van-button",{ref:"buttonSelector",style:t.styleButton,attrs:{"native-type":"button",type:"info",size:"large",block:!0},on:{click:t.qrCodeView}},[t._v("查看二维码")])],1),i("van-row",{class:{"bottom-fixed-hide":!t.isFixed},style:t.styleButtonFixed}),i("van-popup",{staticClass:"qr-code-canvas-popup",attrs:{"lazy-render":!1},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[i("canvas",{directives:[{name:"show",rawName:"v-show",value:1==t.show,expression:"show==true"}],staticClass:"qr-code-canvas",attrs:{id:"qrCodeCanvas"}})])],1)])},a=[],o=i("d055"),r=i.n(o),s={name:"qrCodeReport",data:function(){return{show:!1,styleButton:{},styleButtonFixed:{}}},props:{qrCodeLink:{type:String,default:""},background:{type:String,default:"#46aef7"},isFixed:{type:Boolean,default:!1}},mounted:function(){this.init(),this.styleButtonHandle(),this.useQrcode()},methods:{init:function(){var t=this.$refs.buttonSelector.offsetHeight+10;this.styleButtonFixed={height:t+"px"}},qrCodeView:function(){this.show?this.show=!1:this.show=!0},useQrcode:function(){var t=this,e=document.getElementById("qrCodeCanvas");r.a.toCanvas(e,t.qrCodeLink||"",{width:180,margin:1},function(t){})},styleButtonHandle:function(){this.styleButton={"background-color":this.background,border:"1px solid"+this.background}}}},l=s,c=(i("1354"),i("2877")),d=Object(c["a"])(l,n,a,!1,null,"022bfa90",null);e["a"]=d.exports},a7f8:function(t,e,i){"use strict";var n=i("b775");e["a"]={getBillDetail:function(t){return n["a"].post("/Bill/Report/getReportByJ005",{billId:t})},getReportByBillIdV2:function(t){return n["a"].post("/Bill/Report/getReportByBillIdV2",{billId:t})},getReportByBillIdV3:function(t){return n["a"].post("/Bill/Report/getReportByBillIdV3",{bill_id:t})},getReportByBillId:function(t){return n["a"].post("/Bill/Report/getReportByBillId",t)}}},be18:function(t,e,i){},c741:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page"},[i("headerOne",{attrs:{title:"报告详情",isFixed:!0,backgroundStatus:!0,rightText:this.qrCodeLink?"分享":"",onClickLeftStatus:t.onClickLeftStatus},on:{onClickRight:t.reportShare,onClickLeft:t.back}}),i("Vbackground"),i("div",{staticClass:"main-container"},[t.report.base_info?i("usedCarDetectionReportV1",{attrs:{report:t.report,reportdata:t.reportdata,data:t.data,adList:t.adList}}):t._e(),t.qrCodeLink?i("qrCodeReport",{attrs:{isFixed:!0,qrCodeLink:t.qrCodeLink}}):t._e()],1)],1)},a=[],o=i("87d9"),r=i("e17b"),s=i("a7f8"),l=i("97a4"),c=i("f907"),d=i("7267"),u=i("cf45"),f=(i("5f87"),i("9ef6"),""),p={components:{headerOne:o["a"],qrCodeReport:l["a"],usedCarDetectionReportV1:c["a"],Vbackground:d["a"]},data:function(){return{data:{},report:{},baseInfo:{},makeResult:"",reportdata:{},billId:"",qrCodeLink:"",hederTitle:"",leftText:"",onClickLeftStatus:!1,adList:{}}},created:function(){},mounted:function(){this.init(),f=this,window.appToH5=function(){f.getReportById(f.billId)}},computed:{},methods:{init:function(){var t=this.$route.query;if(t)if(this.billId=t.billId,this.billId&&this.getReportById(this.billId),t.jnsAppStep&&"E002_report"==t.jnsAppStep){var e=this;e.leftText="",e.onClickLeftStatus=!0,r["a"].androidCallback().cover(function(){e.back()})}else this.leftText="返回检测工单",this.onClickLeftStatus=!1},getReportById:function(t){var e=this;s["a"].getReportByBillIdV2(t).then(function(t){2e4==t.code?(e.data=t.data,e.report=t.data.report,e.baseInfo=e.report.base_info,e.makeResult=e.report.check_result_info.make_result,e.qrCodeLink=e.report.owner_report_url,e.reportFormate(t.data.report)):e.$toast.fail(t.msg)})},reportFormate:function(t){var e=Object(u["b"])(t),i=e.system_list.filter(function(t,e){return"greatImpact"!=t.code&&"bubbleCar"!=t.code&&"burnCar"!=t.code});e.system_list=i,this.reportdata=e},reportShare:function(){var t={shareUrl:this.qrCodeLink,title:this.report.title,subtitle:this.baseInfo.car_model_full_name,logo:Object(u["e"])(this.baseInfo.car_icon),bill_id:this.billId,sms:1,bill_type:"E002"};r["a"].h5ToApp("share",t)},back:function(){r["a"].back()}}},h=p,b=(i("5cd7"),i("2877")),g=Object(b["a"])(h,n,a,!1,null,"f88c3b14",null);e["default"]=g.exports},dc09:function(t,e,i){}}]);
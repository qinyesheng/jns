(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2cb8aaac"],{"04ed":function(t,e,n){"use strict";var i=n("3500"),o=n.n(i);o.a},"0c02":function(t,e,n){t.exports=n.p+"img/report_head4.abc0451a.png"},1577:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("div",{staticClass:"main-container"},[t.report.base_info&&"1"==t.reportPay?n("tailAiDiagnosisReport",{attrs:{report:t.report,makeResultText:t.makeResultText,maintainSchemeStatus:t.maintainSchemeStatus}}):t._e(),"0"==t.reportPay?n("div",{staticClass:"noPay"},[t._v("报告暂未生成，请稍后查看。")]):t._e()],1)])},o=[],a=(n("e17b"),n("688f")),r=n("e62a"),s=n("a801"),c={components:{tailAiDiagnosisReport:s["a"],pubButton:r["a"]},data:function(){return{report:{},orderInfo:{},makeResultText:"",maintainSchemeStatus:"",reportPay:""}},created:function(){},mounted:function(){this.code=this.$route.query.code,this.code&&this.getReportV3(this.code)},methods:{vinEncode:function(t){return t.substring(0,4)+"*****"+t.substring(t.length-4)},getReportV3:function(t){var e=this;a["a"].getReportV3(t).then(function(t){if(2e4==t.code){var n=t.data.report,i=n.check_result_info.make_result;if(n&&n.base_info){var o=n.base_info.vin;n.base_info.vin=e.vinEncode(o)}if(e.report=n,e.reportPay=t.data.report_status,0==Object.keys(e.report))return;i||(e.makeResultText="AI尾气诊断结果良好，未发现异常情况，请继续保持。"),document.title=e.report.title}})}}},u=c,l=(n("04ed"),n("2877")),f=Object(l["a"])(u,i,o,!1,null,"2b2d317a",null);e["default"]=f.exports},3500:function(t,e,n){},"60b4":function(t,e,n){},"688f":function(t,e,n){"use strict";var i=n("b775");e["a"]={getDepthDiagnosisReport:function(t){return i["a"].post("/Common/Report/getDepthDiagnosisReport",t)},getAirConditionerReport:function(t){return i["a"].post("/Common/Report/getAirConditionerReport",t)},getWholeCarReport:function(t){return i["a"].post("/Common/Report/getWholeCarReport",t)},getReportV2:function(t){return i["a"].post("/Common/Report/getReportV2",{code:t})},getReportV3:function(t){return i["a"].post("/Common/Report/getReportV3",{code:t})},getAdList:function(t){return i["a"].post("/Adv/AdvUltimate/getReportAdList",t)},addClickLog:function(t){return i["a"].post("/Event/AdLog/addClickLog",t)}}},7267:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("div",{staticClass:"background",style:t.styleObject,attrs:{id:"pageBackground"}})])},o=[],a={data:function(){return{styleObject:{background:"#f2f2f2"}}},props:["background"],created:function(){},mounted:function(){this.init()},methods:{init:function(){this.background&&(this.styleObject.background=this.background)}}},r=a,s=(n("7dfe"),n("2877")),c=Object(s["a"])(r,i,o,!1,null,"76080968",null);e["a"]=c.exports},"7dfe":function(t,e,n){"use strict";var i=n("60b4"),o=n.n(i);o.a},"95f2":function(t,e,n){},a801:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page"},[i("background"),i("div",{staticClass:"main-container"},[i("div",{staticClass:"container-head"},[i("div",{staticClass:"container-head-top"},[i("img",{attrs:{src:n("0c02")},on:{click:function(t){t.preventDefault()}}})])]),i("reportBaseInfo",{attrs:{baseInfo:t.report.base_info}}),i("reportResultList",{attrs:{title:"检测与诊断结果",makeResult:t.makeResult}}),t.makeResultText?i("div",{staticClass:"none-result-list"},[t._m(0),i("p",[t._v(t._s(t.makeResultText))])]):t._e(),t.report.maintain_scheme.length?i("reportMaintainScheme",{attrs:{maintainScheme:t.maintainScheme,selectBtnName:t.selectBtnName,qualityStatus:"multiple"},on:{selectMaintainScheme:t.selectMaintainScheme}}):t._e(),t.maintainSchemeText?i("div",{staticClass:"none-maintain-scheme-list"},[t._m(1),i("P",[t._v(t._s(t.maintainSchemeText))])],1):t._e()],1)],1)},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h4",[n("b",[t._v("检测与诊断结果")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h4",[n("b",[t._v("维修方式")])])}],a=n("7267"),r=n("0894"),s=n("1213"),c=n("f733"),u={props:{report:Object,makeResultText:{type:String,default:""},maintainSchemeText:{type:String,default:""}},components:{reportResultList:s["a"],reportBaseInfo:r["a"],reportMaintainScheme:c["a"],background:a["a"]},data:function(){return{makeResult:"",maintainScheme:"",activeIndex:0,selectBtnName:[],maintainSchemeLength:""}},created:function(){var t=this.report.check_result_info.make_result;t&&!this.makeResultText&&(this.makeResult=t),this.report.maintain_scheme.length&&this.selectMaintainScheme(0)},mounted:function(){this.selectBtnName=this.maintainSchemeLength>1?["维修方式一","维修方式二"]:[]},methods:{selectMaintainScheme:function(t){this.activeIndex=t;var e=this.report.maintain_scheme.length;this.maintainSchemeLength=e,e-1>=t&&(this.maintainScheme=JSON.parse(JSON.stringify(this.report.maintain_scheme[t])),this.maintainScheme.quality_list||(this.maintainScheme.quality_list=[]))}}},l=u,f=(n("e610"),n("2877")),d=Object(f["a"])(l,i,o,!1,null,"faa7af36",null);e["a"]=d.exports},d5c9:function(t,e,n){},e610:function(t,e,n){"use strict";var i=n("95f2"),o=n.n(i);o.a},e62a:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("div",{staticClass:"button-content",class:{buttonFixed:t.isFixed}},[n("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showStatus,expression:"showStatus"}],ref:"buttonSelector",style:t.styleButton,attrs:{"native-type":"button",type:"info",size:"large",block:!0},on:{click:t.buttonConfirm}},[t._v(t._s(t.title))])],1),n("van-row",{class:{"bottom-fixed-hide":!t.isFixed},style:t.styleButtonFixed})],1)},o=[];function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,i)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(n,!0).forEach(function(e){s(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c={data:function(){return{showStatus:!0,styleButton:{},styleButtonFixed:{}}},props:{title:{type:String,default:""},background:{type:String,default:"#46aef7"},isFixed:{type:Boolean,default:!0},textColor:{type:String,default:"#fff"}},created:function(){},mounted:function(){this.init(),this.screenSizeControl(),this.styleButtonHandle()},methods:{init:function(){var t=this.$refs.buttonSelector.offsetHeight+10;this.styleButtonFixed={height:t+"px"}},buttonConfirm:function(){this.$emit("buttonConfirm")},screenSizeControl:function(){var t=this,e=document.documentElement.clientHeight||document.body.clientHeight;window.onresize=function(){var n=document.documentElement.clientHeight||document.body.clientHeight,i=e-n;t.showStatus=!(n<e&&i>100)}},styleButtonHandle:function(){this.styleButton={"background-color":this.background,border:"1px solid"+this.background,color:this.textColor}}},watch:{background:function(t,e){var n={"background-color":t,border:"1px solid"+t};this.styleButton=r({},this.styleButton,{},n)}}},u=c,l=(n("fc10"),n("2877")),f=Object(l["a"])(u,i,o,!1,null,"68d620b5",null);e["a"]=f.exports},fc10:function(t,e,n){"use strict";var i=n("d5c9"),o=n.n(i);o.a}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c15e06f"],{2839:function(t,e,o){"use strict";var r=o("62c1"),n=o.n(r);n.a},"62c1":function(t,e,o){},"688f":function(t,e,o){"use strict";var r=o("b775");e["a"]={getDepthDiagnosisReport:function(t){return r["a"].post("/Common/Report/getDepthDiagnosisReport",t)},getAirConditionerReport:function(t){return r["a"].post("/Common/Report/getAirConditionerReport",t)},getWholeCarReport:function(t){return r["a"].post("/Common/Report/getWholeCarReport",t)},getReportV2:function(t){return r["a"].post("/Common/Report/getReportV2",{code:t})},getReportV3:function(t){return r["a"].post("/Common/Report/getReportV3",{code:t})},getAdList:function(t){return r["a"].post("/Adv/AdvUltimate/getReportAdList",t)},addClickLog:function(t){return r["a"].post("/Event/AdLog/addClickLog",t)}}},f672:function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"page"},[o("div",{staticClass:"main-container"},[t.report.baseInfo?o("carDetectionReportV1",{attrs:{report:t.report}}):t._e()],1)])},n=[],a=(o("e17b"),o("688f")),i=o("78d0"),c={data:function(){return{report:{},buyBtnShow:!0,price:""}},components:{carDetectionReportV1:i["a"]},created:function(){},mounted:function(){this.code=this.$route.query.code,this.code&&this.getWholeCarReport(this.code)},methods:{vinEncode:function(t){return t.substring(0,4)+"*****"+t.substring(t.length-4)},getWholeCarReport:function(t){var e=this,o={code:t,version:6};a["a"].getWholeCarReport(o).then(function(t){if(2e4==t.code){if(t.data.reportData&&t.data.reportData.baseInfo){var o=t.data.reportData.baseInfo.carVinNo;t.data.reportData.baseInfo.carVinNo=e.vinEncode(o)}if(e.report=t.data.reportData,t.data.orderInfo.isPay&&(e.buyBtnShow=1!=t.data.orderInfo.isPay,e.price=t.data.orderInfo.reportPrice),0==Object.keys(e.report))return;document.title=e.report.title}})}}},p=c,s=(o("2839"),o("2877")),u=Object(s["a"])(p,r,n,!1,null,"43a0c0d8",null);e["default"]=u.exports}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-279c9810"],{3664:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"main-container"},[a("div",{staticClass:"deal-info"},[a("div",{staticClass:"deal-info-t"},[a("h2",[e._v(e._s(e.dealListInfo.deal_name))]),a("p",[e._v(e._s(e.dealListInfo.deal_points))])]),a("ul",{staticClass:"deal-info-b"},[a("li",{directives:[{name:"show",rawName:"v-show",value:e.orderNumber,expression:"orderNumber"}],staticClass:"deal-info-b-list order-number"},[a("span",[e._v("订单编号")]),a("span",[e._v(e._s(e.dealListInfo.order_number))])]),a("li",{staticClass:"deal-info-b-list"},[a("span",[e._v("创建时间")]),a("span",[e._v(e._s(e.dealListInfo.create_time))])]),a("li",{staticClass:"deal-info-b-list"},[a("span",[e._v("支付金额")]),a("span",{staticStyle:{"font-family":"Arial"}},[a("b",[e._v("￥")]),e._v("\n                        "+e._s(e.dealListInfo.pay_amount)+"\n                    ")])]),a("li",{staticClass:"deal-info-b-list"},[a("span",[e._v("支付时间")]),a("span",[e._v(e._s(e.dealListInfo.deal_time))])]),a("li",{staticClass:"deal-info-b-list"},[a("span",[e._v("支付方式")]),a("span",[e._v(e._s(e.dealListInfo.deal_way))])])]),a("p",{directives:[{name:"show",rawName:"v-show",value:e.reportDetail,expression:"reportDetail"}],staticClass:"report-detail",on:{click:e.toReportDetail}},[a("span",[e._v("查看报告详情")]),a("van-icon",{attrs:{name:"arrow"}})],1)])])])},s=[],r=a("77c2"),i={data:function(){return{title:this.$route.meta.title,showMenuStatus:!1,dealListInfo:{},reportDetail:!1,shortUrl:"",orderNumber:!1}},created:function(){},mounted:function(){this.getDealInfo()},methods:{getDealInfo:function(){var e=this,t=this.$route.query.id;r["a"].getDealInfo(t).then(function(t){2e4==t.code&&t.data&&("1"==t.data.deal_act?0!=Number(t.data.deal_points)&&(t.data.deal_points="+"+t.data.deal_points):"2"==t.data.deal_act&&0!=Number(t.data.deal_points)&&(t.data.deal_points="-"+t.data.deal_points),"小虎安检"==t.data.deal_name&&(e.reportDetail=!0,e.shortUrl=t.data.short_url),t.data.order_number&&(e.orderNumber=!0),e.dealListInfo=t.data,e.dealListInfo.orderNumber=Number(t.data.order_number))})},back:function(){this.$router.back()},toReportDetail:function(){location.href=this.shortUrl}}},o=i,d=(a("94db"),a("2877")),l=Object(d["a"])(o,n,s,!1,null,"c7362a3e",null);t["default"]=l.exports},"77c2":function(e,t,a){"use strict";var n=a("b775");t["a"]={getRechargeCenter:function(){return n["a"].post("CarOwner/UsersCenter/getRechargeCenter")},getDealList:function(e){return n["a"].post("CarOwner/UsersCenter/getDealList",e)},getDealInfo:function(e){return n["a"].post("CarOwner/UsersCenter/getDealInfo",{deal_detail_id:e})},getCardConsume:function(e){return n["a"].post("/CarOwner/UsersCenter/getCardConsume",{coupon_pwd:e})},saveCardConsume:function(e){return n["a"].post("/CarOwner/UsersCenter/saveCardConsume",{captcha:e})},getBindMobileSms:function(e){return n["a"].post("/CarOwner/UsersCenter/getBindMobileSms",e)},editCustomerBindMobile:function(e){return n["a"].post("/CarOwner/UsersCenter/editCustomerBindMobile",e)},getDividedStatistics:function(){return n["a"].post("/CarOwner/UsersCenter/getDividedStatistics")},getDividedList:function(e){return n["a"].post("/CarOwner/UsersCenter/getDividedList",e)}}},"94db":function(e,t,a){"use strict";var n=a("aa67"),s=a.n(n);s.a},aa67:function(e,t,a){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75c8419d"],{"0622":function(t,e,n){"use strict";var i=n("be18"),o=n.n(i);o.a},1146:function(t,e,n){},"1b10":function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i={title:String,loading:Boolean,showToolbar:Boolean,cancelButtonText:String,confirmButtonText:String,visibleItemCount:{type:Number,default:5},itemHeight:{type:Number,default:44}}},"24ca":function(t,e,n){"use strict";var i=n("b775");e["a"]={saveCreateDiagnosesBill:function(t){return i["a"].post("/Bill/createNew/saveCreateDiagnosesBill",t)},saveCreateBillJ007:function(t){return i["a"].post("/Bill/createNew/saveCreateBillJ007",t)},getCreateNew:function(t){return i["a"].post("/Bill/CreateNew",t)},getFaultPhenomenon:function(t){return i["a"].post("/Bill/CreateNew/getFaultPhenomenon",t)},addFaultPhenomenon:function(t){return i["a"].post("/Bill/CreateNew/addFaultPhenomenon",t)},checkRestrict:function(t){return i["a"].post("/Bill/CreateNew/checkRestrict",t)},checkCustomer:function(t){return i["a"].post("/Bill/CreateNew/checkCustomer",t)},getCarInfoByVin:function(t){return i["a"].post("/Bill/CreateNew/getCarInfoByVin",t)},getBillDetail:function(t){return i["a"].post("/Bill/Undisposed/getBillDetail",t)},getReferee:function(t){return i["a"].post("/Common/Bill/getReferee",t)},getReportPriceByBillType:function(t){return i["a"].post("/Common/Bill/getReportPriceByBillType",t)},addBillType:function(t){return i["a"].post("/Bill/CreateNew/addBillType",t)},delBillType:function(t){return i["a"].post("/Bill/Undisposed/delBillType",t)},saveCreateBill:function(t){return i["a"].post("/Bill/createNew/saveCreateBill",t)},saveConsulting:function(t){return i["a"].post("/Bill/Undisposed/saveConsulting",t)},getCarConditionByVin:function(t){return i["a"].post("/Bill/Report/getCarConditionByVin",t)},getNowOilList:function(t){return i["a"].post("/Common/InitialSurveyData/getNowOilList",t)}}},"423e":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"roll-list-selector"},[n("van-popup",{attrs:{position:"bottom","close-on-click-overlay":t.clickOverlayStatus},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[n("van-picker",{attrs:{"show-toolbar":"",columns:t.listInfo,title:t.title},on:{cancel:t.cancel,confirm:t.confirm}})],1)],1)},o=[],s=(n("5f5f"),n("f253"));function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var a={props:{title:{type:String,default:""},confirmButtonText:{type:String},cancelButtonText:{type:String},show:{type:Boolean,default:!1},listInfo:{type:Array,default:function(){return[]}}},components:r({},s["a"].name,s["a"]),data:function(){return{clickOverlayStatus:!1}},created:function(){},mounted:function(){},methods:{confirm:function(t){this.$emit("confirm",t)},cancel:function(){this.$emit("cancel")}}},c=a,l=(n("9929"),n("2877")),u=Object(l["a"])(c,i,o,!1,null,"d403b922",null);e["a"]=u.exports},"565f":function(t,e,n){"use strict";var i=n("2638"),o=n.n(i),s=n("1988"),r=n("ad06"),a=n("7744"),c=n("dfaf"),l=n("a142"),u=n("db78"),h=n("023d");function f(t){return/^\d+$/.test(t)}var d=Object(l["j"])("field"),m=d[0],p=d[1];e["a"]=m({inheritAttrs:!1,props:Object(s["a"])({},c["a"],{error:Boolean,leftIcon:String,rightIcon:String,readonly:Boolean,clearable:Boolean,labelWidth:[String,Number],labelAlign:String,inputAlign:String,onIconClick:Function,autosize:[Boolean,Object],errorMessage:String,errorMessageAlign:String,type:{type:String,default:"text"}}),data:function(){return{focused:!1}},watch:{value:function(){this.$nextTick(this.adjustSize)}},mounted:function(){this.format(),this.$nextTick(this.adjustSize)},computed:{showClear:function(){return this.clearable&&this.focused&&""!==this.value&&Object(l["c"])(this.value)&&!this.readonly},listeners:function(){return Object(s["a"])({},this.$listeners,{input:this.onInput,keypress:this.onKeypress,focus:this.onFocus,blur:this.onBlur})},labelStyle:function(){var t=this.labelWidth;if(t){var e=f(String(t))?t+"px":t;return{maxWidth:e,minWidth:e}}}},methods:{focus:function(){this.$refs.input&&this.$refs.input.focus()},blur:function(){this.$refs.input&&this.$refs.input.blur()},format:function(t){void 0===t&&(t=this.$refs.input);var e=t,n=e.value,i=this.$attrs.maxlength;return"number"===this.type&&Object(l["c"])(i)&&n.length>i&&(n=n.slice(0,i),t.value=n),n},onInput:function(t){this.$emit("input",this.format(t.target))},onFocus:function(t){this.focused=!0,this.$emit("focus",t),this.readonly&&this.blur()},onBlur:function(t){this.focused=!1,this.$emit("blur",t),Object(l["d"])()&&window.scrollTo(0,Object(h["b"])())},onClickLeftIcon:function(){this.$emit("click-left-icon")},onClickRightIcon:function(){this.$emit("click-icon"),this.$emit("click-right-icon"),this.onIconClick&&this.onIconClick()},onClear:function(t){Object(u["c"])(t),this.$emit("input",""),this.$emit("clear")},onKeypress:function(t){if("number"===this.type){var e=t.keyCode,n=-1===String(this.value).indexOf("."),i=e>=48&&e<=57||46===e&&n||45===e;i||Object(u["c"])(t)}"search"===this.type&&13===t.keyCode&&this.blur(),this.$emit("keypress",t)},adjustSize:function(){var t=this.$refs.input;if("textarea"===this.type&&this.autosize&&t){t.style.height="auto";var e=t.scrollHeight;if(Object(l["f"])(this.autosize)){var n=this.autosize,i=n.maxHeight,o=n.minHeight;i&&(e=Math.min(e,i)),o&&(e=Math.max(e,o))}e&&(t.style.height=e+"px")}},renderInput:function(){var t=this.$createElement,e={ref:"input",class:p("control",this.inputAlign),domProps:{value:this.value},attrs:Object(s["a"])({},this.$attrs,{readonly:this.readonly}),on:this.listeners};return"textarea"===this.type?t("textarea",o()([{},e])):t("input",o()([{attrs:{type:this.type}},e]))},renderLeftIcon:function(){var t=this.$createElement,e=this.slots("left-icon")||this.leftIcon;if(e)return t("div",{class:p("left-icon"),on:{click:this.onClickLeftIcon}},[this.slots("left-icon")||t(r["a"],{attrs:{name:this.leftIcon}})])},renderRightIcon:function(){var t=this.$createElement,e=this.slots,n=e("right-icon")||e("icon")||this.rightIcon||this.icon;if(n)return t("div",{class:p("right-icon"),on:{click:this.onClickRightIcon}},[e("right-icon")||e("icon")||t(r["a"],{attrs:{name:this.rightIcon||this.icon}})])}},render:function(t){var e,n=this.slots,i=this.labelAlign,o={icon:this.renderLeftIcon};return n("label")&&(o.title=function(){return n("label")}),t(a["a"],{attrs:{icon:this.leftIcon,size:this.size,title:this.label,center:this.center,border:this.border,isLink:this.isLink,required:this.required,titleStyle:this.labelStyle,titleClass:p("label",i)},class:p((e={error:this.error,disabled:this.$attrs.disabled},e["label-"+i]=i,e["min-height"]="textarea"===this.type&&!this.autosize,e)),scopedSlots:o},[t("div",{class:p("body")},[this.renderInput(),this.showClear&&t(r["a"],{attrs:{name:"clear"},class:p("clear"),on:{touchstart:this.onClear}}),this.renderRightIcon(),n("button")&&t("div",{class:p("button")},[n("button")])]),this.errorMessage&&t("div",{class:p("error-message",this.errorMessageAlign)},[this.errorMessage])])}})},"5f5f":function(t,e,n){"use strict";n("68ef"),n("a526")},"87d9":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header-one"},[n("van-nav-bar",{class:{"clear-background":t.backgroundStatus,"border-bottom":t.isborderBottom},attrs:{"z-index":999,fixed:t.isFixed,border:!0,title:t.title,"left-text":t.leftText,"right-text":t.rightText,"left-arrow":t.leftArrow},on:{"click-left":function(e){return t.onClickLeft()},"click-right":t.onClickRight}},["icon"==t.rightText?n("van-icon",{staticClass:"icon-right",attrs:{slot:"right",color:"#000",name:t.iconName},slot:"right"}):t._e()],1),n("van-row",{class:{"header-fixed-margin":t.isFixed,"header-fixed-margin-hide":!t.isFixed}})],1)},o=[],s=(n("c3a6"),n("ad06")),r=(n("68ef"),n("8a0b"),n("2638")),a=n.n(r),c=n("a142"),l=n("ba31"),u=Object(c["j"])("nav-bar"),h=u[0],f=u[1];function d(t,e,n,i){return t("div",a()([{class:[f({fixed:e.fixed}),{"van-hairline--bottom":e.border}],style:{zIndex:e.zIndex}},Object(l["b"])(i)]),[t("div",{class:f("left"),on:{click:i.listeners["click-left"]||c["h"]}},[n.left?n.left():[e.leftArrow&&t(s["a"],{class:f("arrow"),attrs:{name:"arrow-left"}}),e.leftText&&t("span",{class:f("text")},[e.leftText])]]),t("div",{class:[f("title"),"van-ellipsis"]},[n.title?n.title():e.title]),t("div",{class:f("right"),on:{click:i.listeners["click-right"]||c["h"]}},[n.right?n.right():e.rightText&&t("span",{class:f("text")},[e.rightText])])])}d.props={title:String,fixed:Boolean,leftText:String,rightText:String,leftArrow:Boolean,border:{type:Boolean,default:!0},zIndex:{type:Number,default:1}};var m,p=h(d),g=n("9ef6");function b(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var v={name:"HeaderOne",data:function(){return{}},components:(m={},b(m,p.name,p),b(m,s["a"].name,s["a"]),m),props:{title:{type:String,default:""},isFixed:{type:Boolean,default:!1},backgroundStatus:{type:Boolean,default:!1},leftText:{type:String,default:""},rightText:{type:String,default:""},leftArrow:{type:Boolean,default:!0},onClickLeftStatus:{type:Boolean,default:!1},isborderBottom:{type:Boolean,default:!1},iconName:{type:String,default:"share"}},mounted:function(){},methods:{onClickLeft:function(){this.onClickLeftStatus?this.$emit("onClickLeft"):g["a"].handle()},onClickRight:function(){this.$emit("onClickRight")}}},y=v,x=(n("0622"),n("2877")),C=Object(x["a"])(y,i,o,!1,null,null,null);e["a"]=C.exports},"8a0b":function(t,e,n){},9929:function(t,e,n){"use strict";var i=n("9c94"),o=n.n(i);o.a},"9c94":function(t,e,n){},a526:function(t,e,n){},b775:function(t,e,n){"use strict";n("e7e5");var i=n("d399"),o=n("bc3a"),s=n.n(o),r=n("4328"),a=n.n(r),c=n("e17b"),l=n("5f87"),u=n("cf45"),h=s.a.create({baseURL:"https://api.wanguoqiche.com",timeout:5e3,headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:[function(t){return t=a.a.stringify(t),t}]}),f={handle:function(t){Object(u["j"])()||!Object(l["a"])()?t&&t():setTimeout(function(){c["a"].backHome()},1e3)},40500:function(t){Object(i["a"])({type:"fail",message:t,duration:1e3}),this.handle()},40300:function(t){Object(i["a"])({type:"fail",message:t,duration:1e3}),this.handle()},40600:function(t){Object(i["a"])({type:"fail",message:t,duration:1e3}),this.handle()},40100:function(t){Object(i["a"])({type:"fail",message:t,duration:1e3}),setTimeout(function(){if(Object(l["b"])()&&Object(l["d"])(),Object(u["j"])())return location.reload(),!0;c["a"].jumpLogin()},1e3)},40400:function(t){Object(i["a"])({type:"fail",message:t,duration:1e3})},40000:function(){return!0}};h.interceptors.request.use(function(t){return void 0===t.data&&(t.data={}),t.data.token=Object(l["b"])(),t},function(t){return Promise.reject(t).catch(function(t){return t})}),h.interceptors.response.use(function(t){var e=t.data;return 2e4!==e.code?(f[e.code]&&f[e.code](e.msg),Promise.reject(e).catch(function(t){return t})):e},function(t){return Object(i["a"])({type:"fail",message:t.message}),Promise.reject(t).catch(function(t){return t})}),e["a"]=h},be18:function(t,e,n){},be7f:function(t,e,n){"use strict";n("68ef"),n("1146")},d5c9:function(t,e,n){},e62a:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("div",{staticClass:"button-content",class:{buttonFixed:t.isFixed}},[n("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showStatus,expression:"showStatus"}],ref:"buttonSelector",style:t.styleButton,attrs:{"native-type":"button",type:"info",size:"large",block:!0},on:{click:t.buttonConfirm}},[t._v(t._s(t.title))])],1),n("van-row",{class:{"bottom-fixed-hide":!t.isFixed},style:t.styleButtonFixed})],1)},o=[];function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,i)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(n,!0).forEach(function(e){a(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c={data:function(){return{showStatus:!0,styleButton:{},styleButtonFixed:{}}},props:{title:{type:String,default:""},background:{type:String,default:"#46aef7"},isFixed:{type:Boolean,default:!0},textColor:{type:String,default:"#fff"}},created:function(){},mounted:function(){this.init(),this.screenSizeControl(),this.styleButtonHandle()},methods:{init:function(){var t=this.$refs.buttonSelector.offsetHeight+10;this.styleButtonFixed={height:t+"px"}},buttonConfirm:function(){this.$emit("buttonConfirm")},screenSizeControl:function(){var t=this,e=document.documentElement.clientHeight||document.body.clientHeight;window.onresize=function(){var n=document.documentElement.clientHeight||document.body.clientHeight,i=e-n;t.showStatus=!(n<e&&i>100)}},styleButtonHandle:function(){this.styleButton={"background-color":this.background,border:"1px solid"+this.background,color:this.textColor}}},watch:{background:function(t,e){var n={"background-color":t,border:"1px solid"+t};this.styleButton=r({},this.styleButton,{},n)}}},l=c,u=(n("fc10"),n("2877")),h=Object(u["a"])(l,i,o,!1,null,"68d620b5",null);e["a"]=h.exports},f253:function(t,e,n){"use strict";var i=n("1988"),o=n("a142"),s=n("db78"),r=n("1128");function a(t){return Array.isArray(t)?t.map(function(t){return a(t)}):"object"===typeof t?Object(r["a"])({},t):t}var c=n("1b10"),l=n("543e"),u=200,h=Object(o["j"])("picker-column"),f=h[0],d=h[1],m=f({props:{valueKey:String,className:String,itemHeight:Number,defaultIndex:Number,initialOptions:Array,visibleItemCount:Number},data:function(){return{startY:0,offset:0,duration:0,startOffset:0,options:a(this.initialOptions),currentIndex:this.defaultIndex}},created:function(){this.$parent.children&&this.$parent.children.push(this),this.setIndex(this.currentIndex)},destroyed:function(){var t=this.$parent.children;t&&t.splice(t.indexOf(this),1)},watch:{defaultIndex:function(){this.setIndex(this.defaultIndex)}},computed:{count:function(){return this.options.length}},methods:{onTouchStart:function(t){this.startY=t.touches[0].clientY,this.startOffset=this.offset,this.duration=0},onTouchMove:function(t){Object(s["c"])(t);var e=t.touches[0].clientY-this.startY;this.offset=Object(o["i"])(this.startOffset+e,-this.count*this.itemHeight,this.itemHeight)},onTouchEnd:function(){if(this.offset!==this.startOffset){this.duration=u;var t=Object(o["i"])(Math.round(-this.offset/this.itemHeight),0,this.count-1);this.setIndex(t,!0)}},adjustIndex:function(t){t=Object(o["i"])(t,0,this.count);for(var e=t;e<this.count;e++)if(!this.isDisabled(this.options[e]))return e;for(var n=t-1;n>=0;n--)if(!this.isDisabled(this.options[n]))return n},isDisabled:function(t){return Object(o["f"])(t)&&t.disabled},getOptionText:function(t){return Object(o["f"])(t)&&this.valueKey in t?t[this.valueKey]:t},setIndex:function(t,e){t=this.adjustIndex(t)||0,this.offset=-t*this.itemHeight,t!==this.currentIndex&&(this.currentIndex=t,e&&this.$emit("change",t))},setValue:function(t){for(var e=this.options,n=0;n<e.length;n++)if(this.getOptionText(e[n])===t)return this.setIndex(n)},getValue:function(){return this.options[this.currentIndex]}},render:function(t){var e=this,n=this.itemHeight,i=this.visibleItemCount,o={height:n*i+"px"},s=n*(i-1)/2,r={transition:this.duration+"ms",transform:"translate3d(0, "+(this.offset+s)+"px, 0)",lineHeight:n+"px"},a={height:n+"px"};return t("div",{style:o,class:[d(),this.className],on:{touchstart:this.onTouchStart,touchmove:this.onTouchMove,touchend:this.onTouchEnd,touchcancel:this.onTouchEnd}},[t("ul",{style:r},[this.options.map(function(n,i){return t("li",{style:a,class:["van-ellipsis",d("item",{disabled:e.isDisabled(n),selected:i===e.currentIndex})],domProps:{innerHTML:e.getOptionText(n)},on:{click:function(){e.setIndex(i,!0)}}})})])])}}),p=Object(o["j"])("picker"),g=p[0],b=p[1],v=p[2];e["a"]=g({props:Object(i["a"])({},c["a"],{columns:Array,defaultIndex:{type:Number,default:0},valueKey:{type:String,default:"text"}}),data:function(){return{children:[]}},computed:{simple:function(){return this.columns.length&&!this.columns[0].values}},watch:{columns:function(){this.setColumns()}},methods:{setColumns:function(){var t=this,e=this.simple?[{values:this.columns}]:this.columns;e.forEach(function(e,n){t.setColumnValues(n,a(e.values))})},emit:function(t){this.simple?this.$emit(t,this.getColumnValue(0),this.getColumnIndex(0)):this.$emit(t,this.getValues(),this.getIndexes())},onChange:function(t){this.simple?this.$emit("change",this,this.getColumnValue(0),this.getColumnIndex(0)):this.$emit("change",this,this.getValues(),t)},getColumn:function(t){return this.children[t]},getColumnValue:function(t){var e=this.getColumn(t);return e&&e.getValue()},setColumnValue:function(t,e){var n=this.getColumn(t);n&&n.setValue(e)},getColumnIndex:function(t){return(this.getColumn(t)||{}).currentIndex},setColumnIndex:function(t,e){var n=this.getColumn(t);n&&n.setIndex(e)},getColumnValues:function(t){return(this.children[t]||{}).options},setColumnValues:function(t,e){var n=this.children[t];n&&JSON.stringify(n.options)!==JSON.stringify(e)&&(n.options=e,n.setIndex(0))},getValues:function(){return this.children.map(function(t){return t.getValue()})},setValues:function(t){var e=this;t.forEach(function(t,n){e.setColumnValue(n,t)})},getIndexes:function(){return this.children.map(function(t){return t.currentIndex})},setIndexes:function(t){var e=this;t.forEach(function(t,n){e.setColumnIndex(n,t)})},onConfirm:function(){this.emit("confirm")},onCancel:function(){this.emit("cancel")}},render:function(t){var e=this,n=this.itemHeight,i=this.simple?[this.columns]:this.columns,o={height:n+"px"},r={height:n*this.visibleItemCount+"px"},a=this.showToolbar&&t("div",{class:["van-hairline--top-bottom",b("toolbar")]},[this.slots()||[t("div",{class:b("cancel"),on:{click:this.onCancel}},[this.cancelButtonText||v("cancel")]),this.slots("title")||this.title&&t("div",{class:["van-ellipsis",b("title")]},[this.title]),t("div",{class:b("confirm"),on:{click:this.onConfirm}},[this.confirmButtonText||v("confirm")])]]);return t("div",{class:b()},[a,this.loading?t("div",{class:b("loading")},[t(l["a"])]):t(),t("div",{class:b("columns"),style:r,on:{touchmove:s["c"]}},[i.map(function(n,i){return t(m,{attrs:{valueKey:e.valueKey,className:n.className,itemHeight:e.itemHeight,defaultIndex:n.defaultIndex||e.defaultIndex,visibleItemCount:e.visibleItemCount,initialOptions:e.simple?n:n.values},on:{change:function(){e.onChange(i)}}})}),t("div",{class:["van-hairline--top-bottom",b("frame")],style:o})])])}})},fc10:function(t,e,n){"use strict";var i=n("d5c9"),o=n.n(i);o.a}}]);
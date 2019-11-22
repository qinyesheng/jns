((typeof self !== 'undefined' ? self : this)["webpackJsonp"] = (typeof self !== 'undefined' ? self : this)["webpackJsonp"] || []).push([[130],{

/***/ "./src/api/carOwner/guest.js":
/*!***********************************!*\
  !*** ./src/api/carOwner/guest.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ \"./src/utils/request.js\");\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  wxLogin: function wxLogin() {\n    var data = {\n      vtrId: '92842e5e0a2ab9bdc291e1998e7d33bf'\n    };\n    return _utils_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post('/CarOwner/Guest/wxLogin', data);\n  },\n  wxuserInfo: function wxuserInfo(data) {\n    data = _objectSpread({\n      vtrId: '92842e5e0a2ab9bdc291e1998e7d33bf'\n    }, data);\n    return _utils_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post('/CarOwner/Guest/wxuserInfo', data);\n  },\n  //获取车辆信息页面的数据\n  getCarInfoByVin: function getCarInfoByVin(params) {\n    return _utils_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post('/CarOwner/Guest/getCarInfoByVin', params);\n  },\n  //获取品牌车系的数据\n  getCarBrandList: function getCarBrandList() {\n    return _utils_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post('/CarOwner/Guest/getCarBrandList');\n  },\n  //获取车系的数据\n  getCarLineList: function getCarLineList(id) {\n    return _utils_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post('/CarOwner/Guest/getCarLineList', {\n      brandId: id\n    });\n  },\n  //获取延保报告详情接口\n  getExtendWarrantyDetail: function getExtendWarrantyDetail(code) {\n    return _utils_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post('/CarOwner/Guest/getExtendWarrantyDetail', code);\n  },\n  //新延保更新选择的系统，总价\n  updateExtendWarrantyPrice: function updateExtendWarrantyPrice(params) {\n    return _utils_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post('/CarOwner/Guest/updateExtendWarrantyPrice', params);\n  },\n  //新延保支付接口\n  extendWarrantyPay: function extendWarrantyPay(params) {\n    return _utils_request__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post('/CarOwner/Guest/extendWarrantyPay', params);\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBpL2Nhck93bmVyL2d1ZXN0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS9jYXJPd25lci9ndWVzdC5qcz8xZTE4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXF1ZXN0IGZyb20gJ0AvdXRpbHMvcmVxdWVzdCc7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHd4TG9naW4oKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHZ0cklkOiAnOTI4NDJlNWUwYTJhYjliZGMyOTFlMTk5OGU3ZDMzYmYnXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcmVxdWVzdC5wb3N0KCcvQ2FyT3duZXIvR3Vlc3Qvd3hMb2dpbicsIGRhdGEpO1xyXG4gICAgfSxcclxuICAgIHd4dXNlckluZm8oZGF0YSkge1xyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHZ0cklkOiAnOTI4NDJlNWUwYTJhYjliZGMyOTFlMTk5OGU3ZDMzYmYnLFxyXG4gICAgICAgICAgICAuLi5kYXRhLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3QucG9zdCgnL0Nhck93bmVyL0d1ZXN0L3d4dXNlckluZm8nLCBkYXRhKTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlui9pui+huS/oeaBr+mhtemdoueahOaVsOaNrlxyXG4gICAgZ2V0Q2FySW5mb0J5VmluKHBhcmFtcykge1xyXG4gICAgICAgIHJldHVybiByZXF1ZXN0LnBvc3QoJy9DYXJPd25lci9HdWVzdC9nZXRDYXJJbmZvQnlWaW4nLCBwYXJhbXMpO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+W5ZOB54mM6L2m57O755qE5pWw5o2uXHJcbiAgICBnZXRDYXJCcmFuZExpc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3QucG9zdCgnL0Nhck93bmVyL0d1ZXN0L2dldENhckJyYW5kTGlzdCcpO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+W6L2m57O755qE5pWw5o2uXHJcbiAgICBnZXRDYXJMaW5lTGlzdChpZCkge1xyXG4gICAgICAgIHJldHVybiByZXF1ZXN0LnBvc3QoJy9DYXJPd25lci9HdWVzdC9nZXRDYXJMaW5lTGlzdCcsIHtcclxuICAgICAgICAgICAgYnJhbmRJZDogaWRcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPluW7tuS/neaKpeWRiuivpuaDheaOpeWPo1xyXG4gICAgZ2V0RXh0ZW5kV2FycmFudHlEZXRhaWwoY29kZSkge1xyXG4gICAgICAgIHJldHVybiByZXF1ZXN0LnBvc3QoJy9DYXJPd25lci9HdWVzdC9nZXRFeHRlbmRXYXJyYW50eURldGFpbCcsIGNvZGUpO1xyXG4gICAgfSxcclxuICAgIC8v5paw5bu25L+d5pu05paw6YCJ5oup55qE57O757uf77yM5oC75Lu3XHJcbiAgICB1cGRhdGVFeHRlbmRXYXJyYW50eVByaWNlKHBhcmFtcykge1xyXG4gICAgICAgIHJldHVybiByZXF1ZXN0LnBvc3QoJy9DYXJPd25lci9HdWVzdC91cGRhdGVFeHRlbmRXYXJyYW50eVByaWNlJywgcGFyYW1zKTtcclxuICAgIH0sXHJcbiAgICAvL+aWsOW7tuS/neaUr+S7mOaOpeWPo1xyXG4gICAgZXh0ZW5kV2FycmFudHlQYXkocGFyYW1zKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3QucG9zdCgnL0Nhck93bmVyL0d1ZXN0L2V4dGVuZFdhcnJhbnR5UGF5JywgcGFyYW1zKTtcclxuICAgIH0sXHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF2Q0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/api/carOwner/guest.js\n");

/***/ })

}]);
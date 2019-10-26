# jns

## Project setup

```javascript

npm install

```

### Compiles and hot-reloads for development

```javascript

npm run development

```

### Compiles and minifies for production

```javascript

npm run build

```

### Run your tests

```javascript

npm run test

```

### Lints and fixes files

```javascript

npm run lint

```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

```javascript

├── dist                       // 生产打包目录  
├── dist_test                  // 测试打包目录  
├── dist_development           // 开发环境打包目录
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── mock                   // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── utils                  // 全局公用方法
│   ├── pages                  // 其他项目入口
│   │   ├──xhDetection         // 小虎检车
│   ├── vendor                 // 公用vendor
│   ├── views                  // view
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
│
├── public                     // 公共资源路径
│   ├── favicon.ico            // favicon图标
│   ├── xhDetection.html       // xhDetection.html
│   └── index.html             // index.html
├── .babelrc                   // babel-loader 配置
├── .eslintrc.js               // eslint 配置项
├── .gitignore                 // git 忽略项
├── .env.development           // 开发环境打包配置
├── .env.test                  // 测试环境打包配置
├── .env.production            // 生产环境打包配置
├── favicon.ico                // favicon图标
├── vue.config.js              // vue-cli 3.0 配置文件
├── package-lock.json          // package-lock.json
└── package.json               // package.json

```


### 新增项目配置流程

```javascript

1.修改 vue.config.js 配置文件
- pages选项新增项目相关配置
- 参照现有项目

```

#### 项目操作说明：

```javascript

1.先安装客户端 vue-cli3

2.clone 项目

3.npm install || yarn install

4.打开cmd 填写 vue ui

5.添加相关项目路径，vue会自动识别

6.vue.config.js 是vue3.0的配置文件，里面包含小虎检车以及jnsApp的配置项

小虎检车项目目录   h5_jns_mobile/src/pages/xhDetection

jnsApp项目目录    h5_jns_mobile/src

7.构建 参考 package.json

8.在 package.json 更新版本，在此文件下面进行版本更新迭代说明

```


### 版本说明：A.B.C

* A 主版本号：功能模块有大的变动，比如增加多个模块或者整体架构发生变化。

* B 子版本号：当功能有一定的增加或变化，比如增加了对权限控制、增加自定义视图等功能。此版本号由项目决定是否修改。

* C 阶段版本号：一般是 Bug 修复或是一些小的变动，要经常发布修订版，时间间隔不限，修复一个严重的bug即可发布一个修订版。此版本号由项目经理决定是否修改。

<!-- * 日期版本号: 用于记录修改项目的当前日期，每次项目上线做的修改都需要更改日期版本号。此版本号格式 20190529 -->

-----------------------------------

### version 1.1.3 20190605

* 84# 深度诊断新增【JNS认证技师诊断报告】
* 69#JNS安检及诊断计费调整
* 83# 深度诊断增加检测提醒
* 91#小虎检车预约单 工单状态优化(公众号显示)
* 优化部分报告样式
* 修复若干bug

### version 1.1.2 20190530

* 捕车二手车评估的检测报告-免责声明要固定放在下方，不管是买了基本信息还是完整报告，都要显示的修改
* 小虎检车定位后添加maker时未进行再次定位时删除之前的marker问题

-----------------------------------

### version 1.1.1 20190529

* 新增二手车评估报告
* 新增二手车评估的检测报告
* 跳转重定向路由跳转
* 汽车安检报告样式优化

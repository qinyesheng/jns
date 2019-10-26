// ESLint的规则有三种级别：

// "off"或者0，不启用这个规则
// "warn"或者1，出现问题会有警告
// "error"或者2，出现问题会报错
module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'parser': 'babel-eslint', // 必须指定解析器，否则错误难消
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        'no-console': 0,
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            0,
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ], //引号风格
        'semi': [
            'error',
            'always'
        ], //强制语句分号结尾
        'no-mixed-spaces-and-tabs': [2, 'smart-tabs'], //不允许混用tab和空格
        'no-var': 2, //使用let和const代替var

    }
};
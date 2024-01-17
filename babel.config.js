const presets = [
    [
        '@babel/preset-env',
        {
            modules: false
        }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
];

const plugins = [
    [
        '@babel/plugin-transform-runtime', // 以不污染全局，局部变量的方式垫平
        {
            corejs: {
                version: 3, // 既能编译全局变量和静态属性，又能编译实例方法
                proposals: true // 编译提案阶段的API
            }
        }
    ]
];

module.exports = {
    presets,
    plugins
}

/**
 * rollup build example config
 */
import alias from '@rollup/plugin-alias';
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import html from 'rollup-plugin-generate-html-template';
import {basename} from 'path';
import absPath from '../build/absPath.mjs';

const extensions = ['.js', 'jsx', '.ts', '.tsx'];
const plugins = [
    alias({
        entries: [
            {find: '~', replacement: absPath('src/')}
        ]
    }),
    commonjs(),
    nodeResolve({extensions}),
    typescript({declaration: false}),
    babel({
        extensions,
        babelHelpers: 'runtime', // 辅助函数转化为运行时的引用，配合 @babel/plugin-transform-runtime
        exclude: 'node_modules/**'
    }),
    replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        preventAssignment: true
    }),
    postcss({
        extract: 'style.css', // 将 CSS 提取到单独的文件中
        modules: true, // 启用 CSS 模块化
        autoModules: true // 自动为 CSS 文件启用模块化
    }),
    serve({
        open: true,
        contentBase: absPath('example/dist/'), // folder to serve files from
        verbose: true // show server address in console
    }),
    livereload({
        watch: absPath('example/dist/*'),
    }),
    html({
        template: 'public/index.html',
        target: 'example/dist/index.html'
    }),
];

const watch = {
    include: absPath('dist/**/*'),
    clearScreen: true
};

const exampleConfig = {
    input: absPath('example/index.jsx'),
    output: [
        {
            dir: absPath('example/dist/'),
            format: 'iife',
            sourcemap: true
        }
    ],
    watch,
    plugins
};

export default exampleConfig;

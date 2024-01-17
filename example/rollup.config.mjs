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
import html from 'rollup-plugin-generate-html-template';
import absPath from '../build/absPath.mjs';

const extensions = ['.js', 'jsx', '.ts', '.tsx'];
const plugins = [
    alias({
        entries: [
            {find: '~', replacement: absPath('../src/')}
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
    html({
        template: 'public/index.html',
        target: 'dist/index.html'
    }),
    serve({
        contentBase: 'dist', // folder to serve files from
        port: 5000,
        verbose: true // show server address in console
    }),
    livereload({
        watch: 'dist'
    })
];

const exampleConfig = {
    input: 'example/index.jsx',
    output: [
        {
            file: 'dist/_/index.js',
            format: 'iife',
            sourcemap: true
        }
    ],
    plugins
};

export default exampleConfig;

/**
 * rollup build basic config
 */
import alias from '@rollup/plugin-alias';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import absPath from './absPath.mjs';

import pkg from '../package.json' assert {type: 'json'};

const FORMAT = {
    ESM: 'esm',
    CJS: 'cjs',
    UMD: 'umd'
};
const extensions = ['.js', 'jsx', '.ts', '.tsx'];

const getPluginsOption = format => {
    return [
        alias({
            entries: [
                {find: '~', replacement: absPath('src/')}
            ]
        }),
        commonjs(),
        nodeResolve({extensions}),
        typescript(format ===FORMAT.ESM ? {declaration: true, declarationDir: absPath('dist/esm/types')} : {}),
        babel({
            extensions,
            babelHelpers: 'runtime', // 辅助函数转化为运行时的引用，配合 @babel/plugin-transform-runtime
            exclude: 'node_modules/**'
        })
    ];
};

const getOutputOption = format => {
    return {
        ...(format === FORMAT.UMD ? {name: pkg.name} : {}),
        dir: absPath(`dist/${format}`),
        format,
        globals: { // peerDependencies 依赖
            'react': 'react',
            'react-dom': 'react-dom'
        }
    };
};

const handler = format => {
    const input = absPath('src/index.ts');
    const plugins = getPluginsOption(format);
    const output = getOutputOption(format);
    const external = [...Object.keys({...pkg.dependencies, ...pkg.peerDependencies})];

    return {input, output, plugins, external};
};

const baseConfig = [
    handler(FORMAT.CJS), // commonjs 产物
    handler(FORMAT.ESM), // esm 产物
    handler(FORMAT.UMD), // umd 产物
];

export default baseConfig;

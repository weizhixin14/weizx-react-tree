/**
 * rollup build production config
 */
import {map, merge} from 'lodash-es';
import terser from '@rollup/plugin-terser';
import less from 'rollup-plugin-less';
import baseConfig from "./rollup.config.base.mjs";
import absPath from './absPath.mjs';

const plugins = format => {
    return [
        less({
            output: absPath(`dist/${format}/style.min.css`),
            option: {
                compress: true
            }
        }),
        terser({
            compress: {
                drop_console: true // discard calls to console.* functions.
            }
        })
    ];
};

const prodConfig = map(baseConfig, item => {
    const format = item.output.format;

    return merge(
        {plugins: plugins(format)},
        item
    );
});

export default prodConfig;

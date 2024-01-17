import {merge} from 'lodash-es';
import terser from '@rollup/plugin-terser';
import baseConfig from "./rollup.config.base.mjs";

const plugins = [
    terser({
        compress: {
            drop_console: true // discard calls to console.* functions.
        }
    }),
];

const prodConfig = merge(
    {
        plugins,
    },
    baseConfig
);

export default prodConfig;

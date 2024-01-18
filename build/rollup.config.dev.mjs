/**
 * rollup build development config
 */
import {map, merge} from 'lodash-es';
import less from 'rollup-plugin-less';
import baseConfig from './rollup.config.base.mjs';
import absPath from './absPath.mjs';

const plugins = format => {
    return [
        less({output: absPath(`dist/${format}/style.css`)})
    ];
};

const watch = {
    include: absPath('src/**'),
    clearScreen: true
};

const devConfig = map(baseConfig, item => {
    const format = item.output.format;

    return merge(
        {
            plugins: plugins(format),
            watch
        },
        item
    );
});

export default devConfig;

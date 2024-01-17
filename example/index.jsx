/**
 * 测试组件
 */
import React from 'react';
import {render} from 'react-dom';
import {Tree} from '../dist/esm/index.js';

const App = () => {
    return (
        <>
            <h1>Test!!!</h1>
            <Tree />
        </>
    );
};

render(<App />, document.getElementById('root'))

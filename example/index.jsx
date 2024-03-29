/**
 * 测试组件
 */
import React from 'react';
import {createRoot} from 'react-dom/client';
import {Tree} from '../dist/esm/index.js';

import '../dist/esm/style.css';

const App = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Test!!!!!</h1>
            <Tree />
        </div>
    );
};

const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(<App />);


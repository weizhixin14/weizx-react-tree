import React, { useState } from 'react';
import type { TreeComponent } from '~types/global';
import { _context } from '~constants/_context';

import './style.less';

const Entry: React.FC<TreeComponent> = ({ treeConfig }) => {
    const [tree, setTree] = useState(treeConfig);

    return (
        <_context.Provider value={[tree, setTree]}>
            <div>123412jaahahha4</div>
        </_context.Provider>
    );
};

export default Entry;

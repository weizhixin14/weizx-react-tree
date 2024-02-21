import React, { useState } from 'react';
import type { TreeComponent } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';
import { initialValue } from '~constants/tree';
import { context } from '~constants/context';
import { ErgodicRender } from '~common/render';

import './style.less';

const prefix = `${CLASS_PREFIX}`;

const Entry: React.FC<TreeComponent> = ({ tree = initialValue }) => {
    const [treeConfig, setTree] = useState(tree);

    const rootId = treeConfig?.rootId;

    return (
        <context.Provider value={[treeConfig, setTree] }>
            <div className={`${prefix}-container`}>
                <ErgodicRender {...{ parentId: null, nodeId: rootId }} />
            </div>
        </context.Provider>
    );
};

export default Entry;

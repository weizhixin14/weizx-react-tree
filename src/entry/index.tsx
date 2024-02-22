import React, { useState } from 'react';
import type { TreeComponent } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';
import { initialValue } from '~constants/tree';
import { basicContext, optionContext } from '~constants/context';
import { ErgodicRender } from '~common/render';

import './style.less';

const prefix = `${CLASS_PREFIX}`;

const Entry: React.FC<TreeComponent> = ({ tree = initialValue, ...props }) => {
    const [treeConfig, setTree] = useState(tree);
    const [curSelectedNodeId, setCurSelectedNodeId] = useState<null | number>(null);

    const rootId = treeConfig?.rootId;

    return (
        <basicContext.Provider value={[treeConfig, setTree]}>
            <optionContext.Provider value={{ options: props, curSelectedNodeId, setCurSelectedNodeId }}>
                <div className={`${prefix}-container`}>
                    <ErgodicRender {...{ parentId: null, nodeId: rootId }} />
                </div>
            </optionContext.Provider>
        </basicContext.Provider>
    );
};

export default Entry;

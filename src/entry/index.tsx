import React, { useState } from 'react';
import { isNumber, isEmpty } from 'lodash-es';
import type { TreeComponent } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';
import { initialValue } from '~constants/tree';
import { context } from '~constants/context';
import { _render as Render } from '~common/render';

import './style.less';

const prefix = `${CLASS_PREFIX}`;

const Entry: React.FC<TreeComponent> = ({ treeConfig = initialValue }) => {
    const [tree, setTree] = useState(treeConfig);

    const { rootId, nodeList } = treeConfig;
    const rootNode = nodeList.find(item => item.nodeId === rootId);

    if (!isNumber(rootId) || isNaN(rootId) || isEmpty(nodeList) || rootNode === undefined) {
        console.warn('Component props validated failed');
        return '';
    }

    return (
        <context.Provider value={[tree, setTree] }>
            <div className={`${prefix}-container`}>
                <Render {...{ parentId: null, ...rootNode }} />
            </div>
        </context.Provider>
    );
};

export default Entry;

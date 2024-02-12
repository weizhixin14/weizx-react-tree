import React, { useState } from 'react';
import type { TreeComponent } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';
import { initialValue } from '~constants/tree';
import { context } from '~constants/context';
import { _render as Render } from '~common/render';

import './style.less';

const prefix = `${CLASS_PREFIX}`;

const Entry: React.FC<TreeComponent> = ({ treeConfig = initialValue }) => {
    const [tree, setTree] = useState(treeConfig);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const rootNode = tree.nodeList.find(item => item.nodeId === tree.rootId)!;

    return (
        <context.Provider value={[tree, setTree] }>
            <div className={`${prefix}-container`}>
                <Render {...{ parentId: null, ...rootNode }} />
            </div>
        </context.Provider>
    );
};

export default Entry;

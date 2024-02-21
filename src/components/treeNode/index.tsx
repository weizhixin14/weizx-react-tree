import React from 'react';
import type { TreeNodeProps } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';
import useTree from '~hooks/useTree';

import './style.less';

const prefix = `${CLASS_PREFIX}-node`;

const TreeNode: React.FC<TreeNodeProps> = ({
    rootRendering,
    leafRendering,
    nodeId,
    nodeText,
    nodeTitle,
    disabled
}) => {
    const { insertNode } = useTree();

    const handleInsertButtonClick = (): void => {
        insertNode(nodeId);
    };

    return (
        <div className={`${prefix}-wrapper`}>
            {!rootRendering && <div className={`${prefix}-top-line`} />}
            <div className={`${prefix}-content ${disabled ? ` ${prefix}-content-disabled` : ''}`}>
                <div className={`${prefix}-content-title-wrapper`}>
                    {nodeTitle}
                </div>
                <div className={`${prefix}-content-word-wrapper`}>
                    {nodeText}
                </div>
                <div className={`${prefix}-content-insert`} onClick={handleInsertButtonClick} />
            </div>
            {!leafRendering && <div className={`${prefix}-bot-line`} />}
        </div>
    );
};

export default TreeNode;

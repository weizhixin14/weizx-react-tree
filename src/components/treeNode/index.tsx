import React from 'react';
import type { TreeNodeProps } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';

import './style.less';

const prefix = `${CLASS_PREFIX}-node`;

const TreeNode: React.FC<TreeNodeProps> = ({
    rootRendering,
    leafRendering,
    nodeText,
    nodeTitle,
    disabled
}) => {
    const contentCls = `${prefix}-content ${disabled ? ` ${prefix}-content-disabled` : ''}`;

    return (
        <div className={`${prefix}-wrapper`}>
            {!rootRendering && <div className={`${prefix}-top-line`} />}
            <div className={contentCls}>
                <div className={`${prefix}-content-title-wrapper`}>
                    {nodeTitle}
                </div>
                <div className={`${prefix}-content-word-wrapper`}>
                    {nodeText}
                </div>
                <div className={`${prefix}-insert`} />
            </div>
            {!leafRendering && <div className={`${prefix}-bot-line`} />}
        </div>
    );
};

export default TreeNode;

import React from 'react';
import type { TreeNodeProps } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';

const prefix = `${CLASS_PREFIX}-tree-node`;

const TreeNode: React.FC<TreeNodeProps> = (props) => {
    return (
        <div className={`${prefix}-wrapper`}>

        </div>
    );
};

export default TreeNode;

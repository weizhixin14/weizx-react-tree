import React from 'react';
import { head, last, isEmpty } from 'lodash-es';
import type { ErgodicRenderProps } from '~types/global';
import { AuxiliaryType } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';
import useTree from '~hooks/useTree';
import AuxiliaryLine from '~components/auxiliaryLine';
import TreeNode from '~components/treeNode';
import num2Array from '~utils/num2Array';

import './style.less';

const prefix = `${CLASS_PREFIX}`;

const ErgodicRender: React.FC<ErgodicRenderProps> = ({ parentId, nodeId }) => {
    const { searchNode } = useTree();
    const treeNode = searchNode(nodeId);
    const rootRendering = parentId === null;
    const leafRendering = isEmpty(treeNode.childrenId);

    const auxiliaryType: AuxiliaryType = (() => {
        if (rootRendering) {
            return AuxiliaryType.Null;
        }
        const curNode = searchNode(parentId);
        const childrenIdArr = num2Array(curNode.childrenId);

        if (childrenIdArr.length === 1) {
            return AuxiliaryType.Only;
        }
        if (head(childrenIdArr) === nodeId) {
            return AuxiliaryType.Head;
        }
        if (last(childrenIdArr) === nodeId) {
            return AuxiliaryType.Last;
        }

        return AuxiliaryType.Mid;
    })();

    return (
        <div className={`${prefix}-wrapper`} key={nodeId}>
            <AuxiliaryLine auxiliaryType={auxiliaryType} />
            <TreeNode
                rootRendering={rootRendering}
                leafRendering={leafRendering}
                {...treeNode}
            />
            <div className={`${prefix}-child-outer`}>
                {num2Array(treeNode.childrenId).map((id, key) => <ErgodicRender parentId={nodeId} nodeId={id} key={key} />)}
            </div>
        </div>
    );
};

export { ErgodicRender };

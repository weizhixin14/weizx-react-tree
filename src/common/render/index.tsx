import React from 'react';
import { head, last, isEmpty } from 'lodash-es';
import type { _RenderProps, _RenderPartProps } from '~types/global';
import { AuxiliaryType } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';
import useTree from '~hooks/useTree';
import AuxiliaryLine from '~components/auxiliaryLine';
import TreeNode from '~components/treeNode';
import num2Array from '~utils/num2Array';

import './style.less';

const prefix = `${CLASS_PREFIX}`;

const _renderPart: React.FC<_RenderPartProps> = ({
    nodeId,
    searchNode,
    childrenId
}) => {
    if (childrenId === undefined) {
        return '';
    }
    const curChildrenId = num2Array(childrenId);

    return (
        <div className={`${prefix}-child-outer`}>
            {
                curChildrenId.map(id => {
                    const childNode = searchNode(id);
                    if (childNode !== undefined) {
                        return _render({ parentId: nodeId, ...childNode });
                    }
                    return '';
                })
            }
        </div>
    );
};

/**
 * The core function of rendering trees
 */
function _render ({ parentId, ...treeNode }: _RenderProps): React.JSX.Element {
    const { searchNode } = useTree();
    const rootRendering = parentId === null;
    const leafRendering = isEmpty(treeNode.childrenId);

    /**
     * calculate the type of auxiliary lines between parent-child nodes
     */
    const auxiliaryType: AuxiliaryType = (() => {
        const curNode = searchNode(parentId);
        if (rootRendering || curNode === undefined) {
            return AuxiliaryType.Null;
        }
        const childrenIdArr = num2Array(curNode.childrenId);

        if (childrenIdArr.length === 1) {
            return AuxiliaryType.Only;
        }
        if (head(childrenIdArr) === treeNode.nodeId) {
            return AuxiliaryType.Head;
        }
        if (last(childrenIdArr) === treeNode.nodeId) {
            return AuxiliaryType.Last;
        }

        return AuxiliaryType.Mid;
    })();

    return (
        <div className={`${prefix}-wrapper`} key={treeNode.nodeId}>
            <AuxiliaryLine auxiliaryType={auxiliaryType} />
            <TreeNode
                rootRendering={rootRendering}
                leafRendering={leafRendering}
                {...treeNode}
            />
            {_renderPart({ searchNode, nodeId: treeNode.nodeId, childrenId: treeNode.childrenId })}
        </div>
    );
};

export { _render };

import React from 'react';
import { head, last } from 'lodash-es';
import type { _RenderProps, _RenderPartProps } from '~types/global';
import { AuxiliaryType } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';
import useTree from '~hooks/useTree';
import AssistLine from '~components/auxiliaryLine';
import TreeNode from '~components/treeNode';
import num2Array from '~utils/num2Array';

const prefix = `${CLASS_PREFIX}-tree`;

const _renderPart: React.FC<_RenderPartProps> = ({
    nodeId,
    searchNode,
    childrenId
}) => {
    if (childrenId === undefined) {
        return '';
    }
    const curChildrenId = num2Array(childrenId);

    curChildrenId.map(id => {
        const childNode = searchNode(id);
        return _render({ parentId: nodeId, ...childNode });
    });
};

/**
 * The core function of rendering trees
 */
function _render ({ parentId, ...node }: _RenderProps): React.JSX.Element {
    const { searchNode } = useTree();
    const rootRendering = parentId === null;

    /** calculate the type of auxiliary lines between parent-child nodes */
    const auxiliaryType: AuxiliaryType = (() => {
        if (rootRendering) {
            return AuxiliaryType.Null;
        }
        const curNode = searchNode(parentId);
        const childrenIdArr = num2Array(curNode.childrenId);

        if (childrenIdArr.length === 1) {
            return AuxiliaryType.Only;
        }
        if (head(childrenIdArr) === node.nodeId) {
            return AuxiliaryType.Head;
        }
        if (last(childrenIdArr) === node.nodeId) {
            return AuxiliaryType.Last;
        }

        return AuxiliaryType.Mid;
    })();

    return (
        <div className={`${prefix}-wrapper`}>
            <AssistLine auxiliaryType={auxiliaryType} />
            <TreeNode
                rootRendering={rootRendering}
                {...node}
            />
            {_renderPart({ searchNode, nodeId: node.nodeId, childrenId: node.childrenId })}
        </div>
    );
};

export { _render };

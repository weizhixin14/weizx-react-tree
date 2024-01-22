import React from 'react';
import { head, last } from 'lodash-es';
import type { _Render, _RenderPart } from '~types/global';
import { AssistLineType } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';
import useTree from '~hooks/useTree';
import AssistLine from '~components/assistLine';
import TreeNode from '~components/treeNode';
import num2Array from '~utils/num2Array';

const prefix = `${CLASS_PREFIX}-tree`;

const _renderPart: React.FC<_RenderPart> = ({
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
function _render ({ parentId, ...node }: _Render): React.JSX.Element {
    const { searchNode } = useTree();
    const rootRendering = parentId === null;

    const assistLineType: AssistLineType = (() => {
        if (rootRendering) {
            return AssistLineType.Null;
        }
        const curNode = searchNode(parentId);
        const childrenIdArr = num2Array(curNode.childrenId);

        if (childrenIdArr.length === 1) {
            return AssistLineType.Only;
        }
        if (head(childrenIdArr) === node.nodeId) {
            return AssistLineType.Head;
        }
        if (last(childrenIdArr) === node.nodeId) {
            return AssistLineType.Last;
        }

        return AssistLineType.Mid;
    })();

    return (
        <div className={`${prefix}-wrapper`}>
            <AssistLine assistLineType={assistLineType} />
            <TreeNode
                rootRendering={rootRendering}
                {...node}
            />
            {_renderPart({ searchNode, nodeId: node.nodeId, childrenId: node.childrenId })}
        </div>
    );
};

export { _render };

import type { NodeId, ChildrenId, TreeNode, TreeConfig } from '~types/global';

const treeNode = ({ nodeId, childrenId }: { nodeId: NodeId, childrenId: ChildrenId }): TreeNode => {
    return {
        nodeId,
        nodeTitle: '标题',
        nodeText: '内容',
        nodeType: 0,
        disabled: false,
        childrenId
    };
};

/**
 * treeConfig 初始值
 */
export const initialValue: TreeConfig = {
    rootId: 0,
    nodeList: [0, 1, 2].map((id, index, arr) => treeNode({
        nodeId: id,
        childrenId: index === 0 ? arr.slice(index + 1) : []
    }))
};

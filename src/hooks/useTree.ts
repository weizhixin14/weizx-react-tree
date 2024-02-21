import { useContext } from 'react';
import { max, set, cloneDeep } from 'lodash-es';
import { context } from '~constants/context';
import type { UseTree, CreateNode, InsertNode, UpdateNode, SearchNode, DeleteNode } from '~types/global';
import num2Array from '~utils/num2Array';

const useTree = (): UseTree => {
    const [tree, setTree] = useContext(context);

    /**
     * Create a new node, but it is not inserted into the tree.
     * If you want to insert into the tree, please use the insertNode method.
     * Otherwise, calling this method again may produce the same nodeId.
     */
    const createNode: CreateNode = ({
        nodeTitle = 'title',
        nodeText = 'content',
        nodeType = 0,
        disabled = false,
        childrenId
    }) => {
        const curMaxNodeId = max(tree.nodeList.map(({ nodeId }) => nodeId));
        return {
            nodeId: curMaxNodeId === undefined ? 0 : curMaxNodeId + 1,
            nodeType,
            nodeTitle,
            nodeText,
            disabled,
            ...(childrenId !== undefined ? { childrenId } : {})
        };
    };

    /**
     * Find the target node from the tree and return the node content.
     */
    const searchNode: SearchNode = targetId => {
        const node = tree.nodeList.find(item => item.nodeId === targetId);
        if (node === undefined) {
            throw new Error('The node is not in the tree, please check the input parameters.');
        }
        return node;
    };

    /**
     * Insert a new node under the target node and place it at the tail end.
     */
    const insertNode: InsertNode = (parentId, options = {}) => {
        const nNode = createNode(options);
        const nTreeConfig = cloneDeep(tree);
        const parentNodePosition = nTreeConfig.nodeList.findIndex(({ nodeId }) => nodeId === parentId);
        const parentNodeChildrenLength = num2Array(nTreeConfig.nodeList[parentNodePosition].childrenId).length;
        set(nTreeConfig, `nodeList[${parentNodePosition}].childrenId[${parentNodeChildrenLength}]`, nNode.nodeId);
        nTreeConfig.nodeList.push(nNode);
        setTree(nTreeConfig);
    };

    /**
     * Update target node content but does not include nodeId.
     */
    const updateNode: UpdateNode = (targetId, options = {}) => {
        const position = tree.nodeList.findIndex(({ nodeId }) => nodeId === targetId);
        if (position === -1) {
            throw new Error('The node is not in the tree, please check the input parameters.');
        }
        const nNode = { ...tree.nodeList[position], ...options };
        set(tree, `nodeList[${position}]`, nNode);
        setTree(tree);
    };

    /**
     * Delete target node from tree.
     */
    const deleteNode: DeleteNode = targetId => {
        // Delete the target child nodeId from the parent node's childrenId.
        for (let index = 0; index < tree.nodeList.length; index++) {
            const { childrenId } = tree.nodeList[index];
            const childrenIdArr = num2Array(childrenId);
            const position = childrenIdArr.indexOf(targetId);
            if (position === -1) {
                continue;
            }
            if (Array.isArray(childrenId)) {
                childrenId.splice(position, 1);
            }
            if (typeof childrenId === 'number') {
                delete tree.nodeList[index].childrenId;
            }
            break;
        }
        // Recursively delete the target node and its descendants.
        (function ergodic (id) {
            const position = tree.nodeList.findIndex(({ nodeId }) => nodeId === id);
            if (position === -1) {
                throw new Error('The node is not in the tree, please check the input parameters.');
            }
            const childrenIdArr = num2Array(tree.nodeList[position].childrenId);
            tree.nodeList.splice(position, 1);
            childrenIdArr.forEach((nodeId) => { ergodic(nodeId); });
        })(targetId);
        setTree(tree);
    };

    return {
        tree,
        setTree,
        createNode,
        insertNode,
        updateNode,
        searchNode,
        deleteNode
    };
};

export default useTree;

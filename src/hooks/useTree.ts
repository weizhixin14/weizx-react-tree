import { useContext, useCallback } from 'react';
import { max, set } from 'lodash-es';
import { context } from '~constants/context';
import type { UseTree, CreateNode, InsertNode, UpdateNode, SearchNode, DeleteNode } from '~types/global';
import num2Array from '~utils/num2Array';

const useTree = (): UseTree => {
    const [treeConfig, setTreeConfig] = useContext(context);

    /**
     * Create a new node, but it is not inserted into the tree.
     * If you want to insert into the tree, please use the insertNode method.
     * Otherwise, calling this method again may produce the same nodeId.
     */
    const createNode = useCallback<CreateNode>(
        ({
            nodeTitle = 'title',
            nodeText = 'content',
            nodeType = 0,
            disabled = false,
            childrenId
        }) => {
            const curMaxNodeId = max(treeConfig.nodeList.map(({ nodeId }) => nodeId));
            return {
                nodeId: curMaxNodeId === undefined ? 0 : curMaxNodeId + 1,
                nodeTitle,
                nodeText,
                nodeType,
                disabled,
                ...(childrenId !== undefined ? { childrenId } : {})
            };
        },
        [treeConfig]
    );

    /**
     * Find the target node from the tree and return the node content.
     */
    const searchNode = useCallback<SearchNode>(
        targetId => {
            const node = treeConfig.nodeList.find(item => item.nodeId === targetId);
            if (node === undefined) {
                throw new Error('The node is not in the tree, please check the input parameters.');
            }
            return node;
        },
        [treeConfig]
    );

    /**
     * Insert a new node under the target node and place it at the tail end.
     */
    const insertNode = useCallback<InsertNode>(
        (parentId, options = {}) => {
            const nNode = createNode(options);
            const parentNodePosition = treeConfig.nodeList.findIndex(({ nodeId }) => nodeId === parentId);
            const parentNodeChildrenLength = num2Array(treeConfig.nodeList[parentNodePosition].childrenId).length;
            set(treeConfig, `nodeList[${parentNodePosition}].children[${parentNodeChildrenLength}]'`, nNode.nodeId);
            treeConfig.nodeList.push(nNode);
            setTreeConfig(treeConfig);
        },
        [createNode, treeConfig]
    );

    /**
     * Update target node content but does not include nodeId.
     */
    const updateNode = useCallback<UpdateNode>(
        (targetId, options = {}) => {
            const position = treeConfig.nodeList.findIndex(({ nodeId }) => nodeId === targetId);
            if (position === -1) {
                throw new Error('The node is not in the tree, please check the input parameters.');
            }
            const nNode = { ...treeConfig.nodeList[position], ...options };
            set(treeConfig, `nodeList[${position}]`, nNode);
            setTreeConfig(treeConfig);
        },
        [treeConfig]
    );

    /**
     * Delete target node from tree.
     */
    const deleteNode = useCallback<DeleteNode>(
        targetId => {
            // Delete the target child nodeId from the parent node's childrenId.
            for (let index = 0; index < treeConfig.nodeList.length; index++) {
                const { childrenId } = treeConfig.nodeList[index];
                const childrenIdArr = num2Array(childrenId);
                const position = childrenIdArr.indexOf(targetId);
                if (position === -1) {
                    continue;
                }
                if (Array.isArray(childrenId)) {
                    childrenId.splice(position, 1);
                }
                if (typeof childrenId === 'number') {
                    delete treeConfig.nodeList[index].childrenId;
                }
                break;
            }
            // Recursively delete the target node and its descendants.
            (function bfsErgodic (id) {
                const position = treeConfig.nodeList.findIndex(({ nodeId }) => nodeId === id);
                if (position === -1) {
                    throw new Error('The node is not in the tree, please check the input parameters.');
                }
                const childrenIdArr = num2Array(treeConfig.nodeList[position].childrenId);
                treeConfig.nodeList.splice(position, 1);
                childrenIdArr.forEach((nodeId) => { bfsErgodic(nodeId); });
            })(targetId);
            setTreeConfig(treeConfig);
        },
        [treeConfig]
    );

    return {
        treeConfig,
        setTreeConfig,
        createNode,
        insertNode,
        updateNode,
        searchNode,
        deleteNode
    };
};

export default useTree;

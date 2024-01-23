import { useContext, useCallback } from 'react';
import { context } from '~constants/context';
import type { UseTree, InsertNode, UpdateNode, SearchNode, DeleteNode } from '~types/global';

const useTree = (): UseTree => {
    const [treeConfig, setTreeConfig] = useContext(context);

    const searchNode = useCallback<SearchNode>(
        nodeId => treeConfig.nodeList.find(item => item.nodeId === nodeId),
        [treeConfig]
    );

    const insertNode = useCallback<InsertNode>(
        parentId => {},
        []
    );

    const updateNode = useCallback<UpdateNode>(
        nodeId => {},
        []
    );

    const deleteNode = useCallback<DeleteNode>(
        nodeId => {
            return {
                nodeId: 1,
                nodeType: 1,
                nodeText: '123',
                nodeTitle: '123',
                disabled: false,
                childrenId: 2
            };
        },
        []
    );

    return {
        treeConfig,
        setTreeConfig,
        insertNode,
        updateNode,
        searchNode,
        deleteNode
    };
};

export default useTree;

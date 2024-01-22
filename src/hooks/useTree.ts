import { useContext, useCallback } from 'react';
import { _context } from '~constants/_context';
import type { UseTree, InsertNode, UpdateNode, SearchNode, DeleteNode } from '~types/global';

const useTree = (): UseTree => {
    const [treeConfig, setTreeConfig] = useContext(_context);

    const searchNode = useCallback<SearchNode>(
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

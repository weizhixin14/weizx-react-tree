import type { Tree } from '~types/global';

/**
 * Initial treeConfig value.
 */
export const initialValue: Tree = {
    rootId: 0,
    nodeList: [
        {
            nodeId: 0,
            nodeType: 0,
            nodeTitle: 'title',
            nodeText: 'content',
            disabled: false,
            childrenId: [1, 2]
        },
        {
            nodeId: 1,
            nodeType: 0,
            nodeTitle: 'title',
            nodeText: 'content',
            disabled: false
        },
        {
            nodeId: 2,
            nodeType: 0,
            nodeTitle: 'title',
            nodeText: 'content',
            disabled: false
        }
    ]
};

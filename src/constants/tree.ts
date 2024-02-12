import type { TreeConfig } from '~types/global';

/**
 * initial treeConfig value.
 */
export const initialValue: TreeConfig = {
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

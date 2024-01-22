export type NodeId = number;

export type ChildrenId = NodeId | NodeId[] | undefined;

export type TreeNode = {
    nodeId: NodeId
    nodeType: number
    nodeText: string
    nodeTitle: string
    disabled: boolean
    childrenId: ChildrenId
};

export type TreeConfig = {
    rootId?: number
    nodeList?: TreeNode[]
};

export type TreeComponent = { treeConfig: TreeConfig };

export type TreeNodeProps = TreeNode & { rootRendering: boolean };

export type _Render = TreeNode & { parentId: number | null };

export type _RenderPart = Pick<UseTree, 'searchNode'> & Pick<TreeNode, 'nodeId' | 'childrenId'>;

export type SetTreeConfig = (treeConfig: TreeConfig) => void;

export type ContextValue = [TreeConfig, SetTreeConfig];

export type SearchNode = (nodeId: NodeId) => TreeNode;

export type DeleteNode = (nodeId: NodeId) => TreeNode;

export type InsertNode = (parentId: NodeId) => void;

export type UpdateNode = (parentId: NodeId) => void;

export type UseTree = {
    setTreeConfig: SetTreeConfig
    treeConfig: TreeConfig
    insertNode: InsertNode
    updateNode: UpdateNode
    searchNode: SearchNode
    deleteNode: DeleteNode
};

export enum AssistLineType {
    Null,
    Only,
    Head,
    Mid,
    Last
};

export type AssistLine = {
    assistLineType: AssistLineType
};

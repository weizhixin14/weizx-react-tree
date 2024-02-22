export type NodeId = number;

export type ParentId = NodeId | null;

export type ChildrenId = NodeId | NodeId[] | undefined;

export type NodeType = number;

export type NodeText = string;

export type NodeTitle = string;

export type Disabled = boolean;

export type TreeNode = {
    nodeId: NodeId
    nodeType: NodeType
    nodeText: NodeText
    nodeTitle: NodeTitle
    disabled: Disabled
    childrenId?: ChildrenId
};

export type Tree = {
    rootId: number
    nodeList: TreeNode[]
};

export type UseTree = {
    tree: Tree
    setTree: SetTree
    createNode: CreateNode
    insertNode: InsertNode
    updateNode: UpdateNode
    searchNode: SearchNode
    deleteNode: DeleteNode
};

export enum AuxiliaryType { Null, Only, Head, Mid, Last };

export type BasicContext = [Tree, SetTree];

export type OptionContext = {
    options: Omit<TreeComponent, 'tree'>
    curSelectedNodeId: null | NodeId
    setCurSelectedNodeId: (nodeId: null | NodeId) => void
};

export type CreateNode = (options: Partial<Omit<TreeNode, 'nodeId'>>) => TreeNode;

export type SearchNode = (nodeId: NodeId) => TreeNode;

export type DeleteNode = (nodeId: NodeId) => void;

export type InsertNode = (parentId: ParentId, options?: Partial<Omit<TreeNode, 'nodeId'>>) => void;

export type UpdateNode = (nodeId: NodeId, options?: Partial<Omit<TreeNode, 'nodeId'>>) => void;

export type SetTree = (tree: Tree) => void;

export type ErgodicRenderProps = { parentId: ParentId, nodeId: NodeId };

export type AuxiliaryLineProps = { auxiliaryType: AuxiliaryType };

export type TreeNodeProps = {
    rootRendering: boolean
    leafRendering: boolean
    nodeId: NodeId
};

export type TreeComponent = {
    tree?: Tree
    onTreeNodeClick?: (params: TreeNode) => void
    treeNodeClassName?: 'string'
    treeNodeStyle?: React.CSSProperties
    insertNodeClick?: () => void
    deleteNodeClick?: (params: TreeNode) => void
};

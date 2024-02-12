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

export type TreeConfig = {
    rootId: number
    nodeList: TreeNode[]
};

export type UseTree = {
    setTreeConfig: SetTreeConfig
    treeConfig: TreeConfig
    createNode: CreateNode
    insertNode: InsertNode
    updateNode: UpdateNode
    searchNode: SearchNode
    deleteNode: DeleteNode
};

export enum AuxiliaryType { Null, Only, Head, Mid, Last };

export type ContextValue = [TreeConfig, SetTreeConfig];

export type CreateNode = (options: Partial<Omit<TreeNode, 'nodeId'>>) => TreeNode;

export type SearchNode = (nodeId: NodeId | null) => TreeNode;

export type DeleteNode = (nodeId: NodeId) => void;

export type InsertNode = (parentId: ParentId, options?: Partial<Omit<TreeNode, 'nodeId'>>) => void;

export type UpdateNode = (nodeId: NodeId, options?: Partial<Omit<TreeNode, 'nodeId'>>) => void;

export type SetTreeConfig = (treeConfig: TreeConfig) => void;

export type _RenderProps = TreeNode & { parentId: ParentId };

export type _RenderPartProps = Pick<UseTree, 'searchNode'> & Pick<TreeNode, 'nodeId' | 'childrenId'>;

export type AuxiliaryLineProps = { auxiliaryType: AuxiliaryType };

export type TreeNodeProps = TreeNode & {
    rootRendering: boolean
    leafRendering: boolean
};

export type TreeComponent = { treeConfig?: TreeConfig };

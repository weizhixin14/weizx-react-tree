/**
 * usually type
 */

/** nodeId type */
export type NodeId = number;

export type ParentId = NodeId | null | undefined;

/** 孩子节点 type */
export type ChildrenId = NodeId | NodeId[] | undefined;

/** 节点 type */
export type TreeNode = {
    nodeId: NodeId
    nodeType: number
    nodeText: string
    nodeTitle: string
    disabled: boolean
    childrenId?: ChildrenId
};

/** 节点树 type */
export type TreeConfig = {
    rootId: number
    nodeList: TreeNode[]
};

/** useTree hook type */
export type UseTree = {
    setTreeConfig: SetTreeConfig
    treeConfig: TreeConfig
    insertNode: InsertNode
    updateNode: UpdateNode
    searchNode: SearchNode
    deleteNode: DeleteNode
};

/** content value type */
export type ContextValue = [TreeConfig, SetTreeConfig];

/** 节点间辅助线 type */
export enum AuxiliaryType {
    Null,
    Only,
    Head,
    Mid,
    Last
};

/**
 * function type
 */

/** useTree hook searchNode function type */
export type SearchNode = (nodeId: NodeId | ParentId) => TreeNode | undefined;

/** useTree hook deleteNode function type */
export type DeleteNode = SearchNode;

/** useTree hook insertNode function type */
export type InsertNode = (parentId: ParentId) => void;

/** useTree hook updateNode function type */
export type UpdateNode = InsertNode;

/** set treeConfig action */
export type SetTreeConfig = (treeConfig: TreeConfig) => void;

/**
 * component props type
 */

/** _render function Props */
export type _RenderProps = TreeNode & { parentId: ParentId };

/** _renderPart function Props */
export type _RenderPartProps = Pick<UseTree, 'searchNode'> & Pick<TreeNode, 'nodeId' | 'childrenId'>;

/** assistLine component Props */
export type AuxiliaryLineProps = { auxiliaryType: AuxiliaryType };

/** TreeNode component Props */
export type TreeNodeProps = TreeNode & {
    rootRendering: boolean // 正在渲染的节点是否是根节点
    leafRendering: boolean // 正在渲染的节点是否是叶子节点
};

/** Tree component Props */
export type TreeComponent = { treeConfig?: TreeConfig };

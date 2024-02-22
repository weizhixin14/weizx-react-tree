import React, { useContext } from 'react';
import type { TreeNodeProps } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';
import { optionContext } from '~constants/context';
import useTree from '~hooks/useTree';

import './style.less';

const prefix = `${CLASS_PREFIX}-node`;

const TreeNode: React.FC<TreeNodeProps> = ({
    rootRendering,
    leafRendering,
    nodeId
}) => {
    const { searchNode, insertNode, deleteNode } = useTree();
    const { options, curSelectedNodeId, setCurSelectedNodeId } = useContext(optionContext);

    const treeNode = searchNode(nodeId);

    const { nodeText, nodeTitle, disabled } = treeNode;

    const isSelected = curSelectedNodeId === nodeId;

    const handleInsertButtonClick = (): void => {
        options?.insertNodeClick?.();
        insertNode(nodeId);
    };

    const handleDeleteButtonClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        if (isSelected) {
            setCurSelectedNodeId(null);
        }
        options?.deleteNodeClick?.(treeNode);
        deleteNode(nodeId);
    };

    const handleTreeNodeClick = (): void => {
        setCurSelectedNodeId(nodeId);
        options?.onTreeNodeClick?.(treeNode);
    };

    return (
        <div className={`${prefix}-wrapper`}>
            {!rootRendering && <div className={`${prefix}-top-line`} />}
            <div
                className={`${options.treeNodeClassName} ${prefix}-content ${disabled ? `${prefix}-content-disabled` : ''} ${isSelected ? `${prefix}-content-selected` : ''}`}
                style={options.treeNodeStyle}
                onClick={handleTreeNodeClick}
            >
                <div className={`${prefix}-content-title-wrapper`}>{nodeTitle}</div>
                <div className={`${prefix}-content-word-wrapper`}>{nodeText}</div>
                {isSelected &&
                    <>
                        <div className={`${prefix}-content-insert`} onClick={handleInsertButtonClick} />
                        {!rootRendering && <div className={`${prefix}-content-delete`} onClick={handleDeleteButtonClick}></div>}
                    </>
                }
            </div>
            {!leafRendering && <div className={`${prefix}-bot-line`} />}
        </div>
    );
};

export default TreeNode;

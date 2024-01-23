/**
 * 父子节点间连线
 */
import React, { memo } from 'react';
import { AuxiliaryType } from '~types/global';
import type { AuxiliaryLineProps } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';

import './style.less';

const prefix = `${CLASS_PREFIX}-auxiliary-line`;

const AuxiliaryLine: React.FC<AuxiliaryLineProps> = ({ auxiliaryType }) => {
    if (auxiliaryType === AuxiliaryType.Null) { // 根节点无父节点
        return '';
    }
    if (auxiliaryType === AuxiliaryType.Only) { // 父节点与唯一字节点间的辅助线
        return <div className={`${prefix}-only`}/>;
    }
    if (auxiliaryType === AuxiliaryType.Head) { // 父节点与第一个字节点间的辅助线
        return <div className={`${prefix}-head`} />;
    }
    if (auxiliaryType === AuxiliaryType.Last) { // 父节点与最后一个字节点间的辅助线
        return <div className={`${prefix}-last`} />;
    }
    return (
        <div className={`${prefix}-mid`}>
            <div className={`${prefix}-mid-inner`} />
        </div>
    );
};

export default memo(AuxiliaryLine);

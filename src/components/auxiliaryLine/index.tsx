import React, { memo } from 'react';
import { AuxiliaryType } from '~types/global';
import type { AuxiliaryLineProps } from '~types/global';
import { CLASS_PREFIX } from '~constants/global';

import './style.less';

const prefix = `${CLASS_PREFIX}-auxiliary-line`;

const AuxiliaryLine: React.FC<AuxiliaryLineProps> = ({ auxiliaryType }) => {
    if (auxiliaryType === AuxiliaryType.Null) {
        return '';
    }
    if (auxiliaryType === AuxiliaryType.Only) {
        return <div className={`${prefix}-only`}/>;
    }
    if (auxiliaryType === AuxiliaryType.Head) {
        return <div className={`${prefix}-head`} />;
    }
    if (auxiliaryType === AuxiliaryType.Last) {
        return <div className={`${prefix}-last`} />;
    }
    return (
        <div className={`${prefix}-mid`}>
            <div className={`${prefix}-mid-inner`} />
        </div>
    );
};

export default memo(AuxiliaryLine);

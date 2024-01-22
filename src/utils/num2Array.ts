/**
 * Number converted to Array<number>
 */
import { isNumber } from 'lodash-es';

const num2Array = (arg: number | number[] | undefined): number[] => {
    if (arg === undefined) {
        return [];
    }
    return isNumber(arg) ? [arg] : arg;
};

export default num2Array;

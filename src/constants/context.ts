import { createContext } from 'react';
import type { BasicContext, OptionContext } from '~types/global';
import { initialValue } from './tree';

const basicContext = createContext<BasicContext>(
    [
        initialValue,
        () => {}
    ]
);

const optionContext = createContext<OptionContext>(
    {
        options: {},
        curSelectedNodeId: null,
        setCurSelectedNodeId: () => {}
    }
);

export { basicContext, optionContext };

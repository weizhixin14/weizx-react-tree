import { createContext } from 'react';
import type { ContextValue } from '~types/global';

const context = createContext<ContextValue>(
    [
        { rootId: 0, nodeList: [] },
        () => {}
    ]);

export { context };

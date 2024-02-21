import { createContext } from 'react';
import type { ContextValue } from '~types/global';
import { initialValue } from './tree';

const context = createContext<ContextValue>(
    [
        initialValue,
        () => {}
    ]);

export { context };

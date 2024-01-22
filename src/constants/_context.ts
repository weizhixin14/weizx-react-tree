import { createContext } from 'react';
import type { ContextValue } from '~types/global';

const _context = createContext<ContextValue>([{}, () => {}]);

export { _context };

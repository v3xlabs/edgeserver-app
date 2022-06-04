import { useOutletContext } from 'react-router';
import { Application } from 'src/types/Application';

export const useApp = () => {
    const context = useOutletContext() as { app: Application };

    return context.app;
};

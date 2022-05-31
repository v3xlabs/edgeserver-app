// import { useJWT } from '@utils/useAuth';
import { useQuery } from 'react-query';

export const useApp = (app_id: string) => {
    // const { token } = useJWT();

    return useQuery('/app/' + app_id, {
        queryFn: async () => {
            // fetch();
        },
    });
};

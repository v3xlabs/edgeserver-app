import { environment } from '@utils/enviroment';
import { useJWT } from '@utils/useAuth';
import { useQuery } from 'react-query';
import { Application } from 'src/types/Application';

export const useApps = () => {
    const { token } = useJWT();

    return useQuery<Application[]>('/app/ls', {
        queryFn: async () => {
            return await fetch(environment.API_URL + '/api/apps/ls', {
                method: 'GET',
                headers: { Authorization: 'Bearer ' + token },
            }).then((data) => data.json());
        },
    });
};

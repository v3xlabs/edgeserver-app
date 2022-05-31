import { environment } from '@utils/enviroment';
import { useJWT } from '@utils/useAuth';
import { useQuery } from 'react-query';
import { Deployment } from 'src/types/Deployment';

export const useDeployments = (app_id: string | undefined) => {
    const { token } = useJWT();

    return useQuery<Deployment[]>(`/app/${app_id}/deploys/ls`, {
        queryFn: async () => {
            if (!app_id) return;

            return await fetch(
                environment.API_URL + '/api/apps/' + app_id + '/deploys/ls',
                {
                    method: 'GET',
                    headers: { Authorization: 'Bearer ' + token },
                }
            ).then((data) => data.json());
        },
    });
};

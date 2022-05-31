import { environment } from '@utils/enviroment';
import { useJWT } from '@utils/useAuth';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

const DeploymentList: FC = () => {
    const [data, setData] = useState<
        {
            deploy_id: string;
            app_id: string;
            cid: string;
            sid: string;
            timestamp: string;
        }[]
    >([]);

    const { app_id } = useParams<{ app_id: string }>();
    const { data: account } = useAccount();
    const token = useJWT((state) => state.token);

    const apiUrl = environment.API_URL;

    useEffect(() => {
        if (!account) {
            setData([]);

            return;
        }

        (async () => {
            const response = await fetch(
                apiUrl + '/api/apps/' + app_id + '/deploys/ls',
                {
                    method: 'GET',
                    headers: { Authorization: 'Bearer ' + token },
                }
            );

            setData(await response.json());
        })();
    }, [account]);

    return (
        <div className="gap-4 flex flex-col w-full">
            <h2 className="text-2xl">
                Deployments {data && data.length > 0 ? `(${data.length})` : ''}
            </h2>
            {data.map((deployments) => (
                <Link
                    key={app_id}
                    className="p-4 border-2 border-neutral-900 block"
                    to={
                        '/app/' +
                        app_id +
                        '/deployments/' +
                        deployments.deploy_id
                    }
                >
                    {app_id} {deployments.deploy_id}
                </Link>
            ))}
        </div>
    );
};

export const AppDeploymentsPage: FC = () => {
    const { app_id } = useParams<{ app_id: string }>();

    return (
        <div className="containerd pt-8">
            <DeploymentList />
        </div>
    );
};

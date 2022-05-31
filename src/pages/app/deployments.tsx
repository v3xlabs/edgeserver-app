import { useDeployments } from '@utils/queries/useDeployments';
import { FC } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const DeploymentList: FC = () => {
    const { app_id } = useParams<{ app_id: string }>();
    const { data, isLoading, isSuccess } = useDeployments(app_id);

    return (
        <div className="gap-4 flex flex-col w-full">
            <h2 className="text-2xl">
                Deployments {data && data.length > 0 ? `(${data.length})` : ''}
            </h2>
            {isLoading && <p>Loading Deployments...</p>}
            {data &&
                isSuccess &&
                data.map((deployments) => (
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
            {app_id}
            <DeploymentList />
        </div>
    );
};

import { Button } from '@components/Button';
import { useApp } from '@utils/queries/useApp';
import { useDeployments } from '@utils/queries/useDeployments';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Application } from 'src/types/Application';

import { DeploymentLink } from './deployments';

export const AppPage: FC = () => {
    const app = useApp();

    return (
        <div className="containerd pt-8 flex flex-col gap-4">
            <div className="flex">
                <h2 className="text-2xl flex-grow block">{app.name}</h2>
            </div>
            <p>
                Please ignore the following debug information <br />
                App ID: {app.app_id}
                <br />
                Owner: {app.owner_id}
                <br />
                Domain: {app.domain_id}
            </p>
            <AppDeploymentList app={app} />
        </div>
    );
};

const AppDeploymentList: FC<{ app: Application }> = ({ app }) => {
    const { deployments, error, loading } = useDeployments(app.app_id, 3);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between">
                <h2 className="text-2xl">Recent Deployments</h2>
                <Link to={`/app/${app.app_id}/deployments`}>
                    <Button label={'Deployments ➜'} />
                </Link>
            </div>
            {loading &&
                Array.from({ length: 3 }).map((_, index) => (
                    <div
                        className="p-4 border border-neutral-700 bg-neutral-700 card flex h-32 animate-pulse"
                        key={index}
                    />
                ))}
            {!loading &&
                deployments &&
                deployments.length > 0 &&
                deployments.map((deployment, index) => (
                    <DeploymentLink
                        app_id={app.app_id}
                        deployment={deployment}
                        key={index}
                    />
                ))}
        </div>
    );
};

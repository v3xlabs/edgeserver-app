import { FC } from 'react';
import { useParams } from 'react-router';

export const DeploymentPage: FC = () => {
    const { app_id, deploy_id } = useParams<{
        app_id: string;
        deploy_id: string;
    }>();

    return (
        <div className="containerd pt-8">
            {app_id} / deployment / {deploy_id}
        </div>
    );
};

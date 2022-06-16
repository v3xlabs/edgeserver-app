import { Button } from '@components/Button';
import { useApp } from '@utils/queries/useApp';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Application } from 'src/types/Application';

export const AppPage: FC<{ application: Application }> = () => {
    const app = useApp();

    return (
        <div className="containerd pt-8">
            <div className="flex">
                <h2 className="text-2xl flex-grow block">
                    Application {app.name}
                </h2>
            </div>
            <div className="card p-4 mt-4 flex">
                <div className="flex-1">
                    <h3 className="text-xl">Welcome to the Application Page</h3>
                    <p>
                        Click the button on the right to see the deployment log
                    </p>
                </div>
                <Link to={`/app/${app.app_id}/deployments`}>
                    <Button label={'Deployments ➜'} />
                </Link>
            </div>
        </div>
    );
};

import { FC } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const AppPage: FC = () => {
    const { app_id } = useParams<{ app_id: string }>();

    return (
        <div className="containerd pt-8">
            <h2 className="text-2xl">Application {app_id}</h2>
            <div className="card p-4 mt-4 flex">
                <div className="flex-1">
                    <h3 className="text-xl">Welcome to the Application Page</h3>
                    <p>
                        Click the button on the right to see the deployment log
                    </p>
                </div>
                <Link to={`/app/${app_id}/deployments`}>
                    <button className="px-4 py-2 bg-accent-blue-normal hover:brightness-75 text-white rounded-lg">
                        Deployments ➜
                    </button>
                </Link>
            </div>
        </div>
    );
};

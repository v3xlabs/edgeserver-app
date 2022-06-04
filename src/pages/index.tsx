import { useApps } from '@utils/queries/useApps';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const AppsList: FC = () => {
    const { data, isLoading, isSuccess } = useApps();

    return (
        <div className="gap-4 flex flex-col w-full">
            <h2 className="text-2xl">
                Apps {data && data.length > 0 ? `(${data.length})` : ''}
            </h2>
            {isLoading && <p>Loading Applications...</p>}
            {data && isSuccess && (
                <div className="flex flex-wrap gap-4">
                    {data.map((project) => (
                        <Link
                            key={project.app_id}
                            className="p-4 border-2 card hover:bg-black-700 block w-96"
                            to={'/app/' + project.app_id}
                        >
                            <h2 className="text-lg font-bold pb-2">
                                {project.name}
                            </h2>
                            <p className="text-sm">
                                {project.domain_id || 'No Domain Assigned'}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export const Home: FC = () => {
    return (
        <div className="containerd pt-8">
            <AppsList />
        </div>
    );
};

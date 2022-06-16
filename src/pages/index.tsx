import { Button } from '@components/Button';
import { CreateAppModal } from '@components/CreateAppModal/CreateAppModal';
import { useApps } from '@utils/queries/useApps';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

const AppsList: FC = () => {
    const { data, isLoading, isSuccess } = useApps();
    const [isCreatingApp, setCreatingApp] = useState(false);

    return (
        <div className="gap-4 flex flex-col w-full">
            <div className="flex">
                <h2 className="text-2xl block flex-grow">
                    Apps {data && data.length > 0 ? `(${data.length})` : ''}
                </h2>
                <Button
                    label={'Create an App!'}
                    onClick={() => {
                        console.log('click');
                        setCreatingApp(true);
                    }}
                />
                {isCreatingApp && (
                    <CreateAppModal
                        onClose={() => {
                            setCreatingApp(false);
                        }}
                    />
                )}
            </div>
            {isLoading && <p>Loading Applications...</p>}
            {data && isSuccess && (
                <div className="flex flex-wrap gap-4 grid grid-cols-1 lg:grid-cols-2">
                    {data.map((project) => (
                        <Link
                            key={project.app_id}
                            className="card"
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

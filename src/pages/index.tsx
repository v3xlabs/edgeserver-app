import { DisconnectButton } from '@components/DisconnectButton';
import { useApps } from '@utils/queries/useApps';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const ProjectList: FC = () => {
    const { data, isLoading, isSuccess } = useApps();

    return (
        <div className="gap-4 flex flex-col w-full">
            <h2 className="text-2xl">
                Projects {data && data.length > 0 ? `(${data.length})` : ''}
            </h2>
            {isLoading && <p>Loading Applications...</p>}
            {data &&
                isSuccess &&
                data.map((project) => (
                    <Link
                        key={project.app_id}
                        className="p-4 border-2 border-neutral-900 block"
                        to={'/app/' + project.app_id}
                    >
                        {project.app_id} {project.domain_id}
                    </Link>
                ))}
        </div>
    );
};

export const Home: FC = () => {
    return (
        <div className="containerd pt-8">
            <DisconnectButton />

            <ProjectList />
        </div>
    );
};

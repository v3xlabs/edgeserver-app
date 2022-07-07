import { Button } from '@components/Button';
import { CreateAppModal } from '@components/CreateAppModal/CreateAppModal';
import { environment } from '@utils/enviroment';
import { useApps } from '@utils/queries/useApps';
import { FC, useState } from 'react';
import { GitHub } from 'react-feather';
import { Link } from 'react-router-dom';
import { Application } from 'src/types/Application';

const ApplicationCard: FC<{
    application: Application & { preview_url?: string };
}> = ({ application }) => {
    const [previewImage, setPreviewImage] = useState(true);

    return (
        <Link
            className="card p-2 bg-neutral-50 dark:bg-black-800 border border-neutral-300 dark:border-neutral-700 shadow-lg hover:shadow-xl"
            to={'/app/' + application.app_id}
        >
            <div className="flex items-center">
                {/* <div className="w-full flex-grow aspect-video object-cover object-top shadow-lg rounded-md bg-neutral-700 flex items-center justify-center"> */}
                {(application['preview_url'] && previewImage && (
                    <img
                        src={
                            environment.API_URL +
                            application['preview_url'] +
                            '/256'
                        }
                        alt="website preview"
                        className="w-32 aspect-video object-cover object-top rounded-md border border-neutral-700"
                        onError={() => {
                            setPreviewImage(false);
                        }}
                    />
                )) || (
                    <div className="brightness-75 font-bold flex flex-col items-center justify-center border border-neutral-100 dark:border-0 dark:bg-neutral-700 rounded-md aspect-video w-32">
                        <span className="to-pink-800 from-blue-700 brightness-200 bg-gradient-to-tl bg-clip-text text-transparent">
                            No Render
                        </span>
                        <span>Preview</span>
                    </div>
                )}
                <div className="ml-4 h-full">
                    <h2 className="text-lg font-bold">{application.name}</h2>
                    <p className="text-sm opacity-50">
                        {application.domain_id || 'No Domain Assigned'}
                    </p>
                </div>
            </div>

            <div className="flex items-center pt-2 px-1 justify-end gap-2">
                <p className="opacity-50 w-fit">a minute ago</p>
                <GitHub size={'1em'} opacity={0.5} />
            </div>
        </Link>
    );
};

const AppsList: FC = () => {
    const { data, isLoading, isSuccess } = useApps();
    const [isCreatingApp, setCreatingApp] = useState(false);
    const [renderURLs, setRenderURLs] = useState({});

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
                <div className="flex flex-wrap gap-4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {data.map((project) => (
                        <ApplicationCard
                            key={project.app_id}
                            application={project}
                        />
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

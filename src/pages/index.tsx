import { Button } from '@components/Button';
import { CreateAppModal } from '@components/CreateAppModal/CreateAppModal';
import { environment } from '@utils/enviroment';
import { useApps } from '@utils/queries/useApps';
import { FC, useState } from 'react';
import { GitHub } from 'react-feather';
import { Link } from 'react-router-dom';
import { Application } from 'src/types/Application';

const ApplicationShadowCard: FC = () => {
    return (
        <div className="card p-2 h-64 bg-neutral-300 dark:bg-neutral-700 shadow-lg animate-pulse" />
    );
};

const ApplicationCard: FC<{
    application: Application & { preview_url?: string };
}> = ({ application }) => {
    const [previewImage, setPreviewImage] = useState(true);

    return (
        <Link
            className="card p-2 bg-neutral-50 dark:bg-black-800 border border-neutral-300 dark:border-neutral-700 shadow-lg hover:shadow-xl relative"
            to={'/app/' + application.app_id}
        >
            {(application['preview_url'] && previewImage && (
                <div className="">
                    <img
                        src={
                            environment.API_URL +
                            application['preview_url'] +
                            '/root'
                        }
                        alt="website preview"
                        className="w-full aspect-video object-cover left-0 right-0 top-0 bottom-0 z-10 rounded-lg border border-neutral-800"
                        onError={() => {
                            setPreviewImage(false);
                        }}
                    />
                </div>
            )) || (
                <div className="w-full aspect-video">
                    <div className="brightness-75 font-bold flex flex-col items-center justify-center border border-neutral-100 dark:border-0 dark:bg-neutral-700 w-full h-full rounded-lg">
                        <span className="to-pink-800 from-blue-700 brightness-200 bg-gradient-to-tl bg-clip-text text-transparent">
                            No Render
                        </span>
                        <span>Preview</span>
                    </div>
                </div>
            )}
            <div className="flex items-center px-2 pt-2 gap-4">
                <div className="h-full">
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
            <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {data &&
                    isSuccess &&
                    data.map((project) => (
                        <ApplicationCard
                            key={project.app_id}
                            application={project}
                        />
                    ))}
                {!data &&
                    isLoading &&
                    Array.from({ length: 4 }).map((_, index) => (
                        <ApplicationShadowCard key={index} />
                    ))}
            </div>
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

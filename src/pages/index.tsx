import { Button } from '@components/Button';
import { CreateAppModal } from '@components/CreateAppModal/CreateAppModal';
import { environment } from '@utils/enviroment';
import { useApps } from '@utils/queries/useApps';
import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Application } from 'src/types/Application';
import { Trash2 } from 'react-feather';
import { useJWT } from '@utils/useAuth';

const ApplicationCard: FC<{
    application: Application & { preview_url?: string };
}> = ({ application }) => {
    const [previewImage, setPreviewImage] = useState(true);

    const { token } = useJWT();

    const onClick = useCallback(async (data: { app_id: string }) => {
        const delete_response = await fetch(environment.API_URL + `/api/apps/delete/${data.app_id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                app_id: data.app_id,
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });

        if (delete_response.status == 200) return true;

        return false;
    }, []);

    return (
        <Link className="card p-2" to={'/app/' + application.app_id}>
            <div className="w-full flex-grow aspect-video object-cover object-top border rounded-md bg-neutral-700 flex items-center justify-center">
                {(application['preview_url'] && previewImage && (
                    <img
                        src={
                            environment.API_URL +
                            application['preview_url'] +
                            '/256'
                        }
                        alt="website preview"
                        className="w-full aspect-video object-cover object-top border rounded-md"
                        onError={() => {
                            setPreviewImage(false);
                        }}
                    />
                )) || <div className="brightness-75 font-bold">?</div>}
            </div>
            <div className="mt-4">
                <div className="row flex">
                    <h2 className="text-lg font-bold pb-2 mr-auto">{application.name}</h2>
                    <button
                        onClick={() => {
                            onClick({ app_id: application.app_id })
                        }}
                        className="hover:scale-110 hover:text-red-600 focus:text-red-600 active:text-red-600 text-red-800 float-end"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
                    <p className="text-sm">
                        {application.domain_id || 'No Domain Assigned'}
                    </p>
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
                <div className="flex flex-wrap gap-4 grid grid-cols-1 lg:grid-cols-3">
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

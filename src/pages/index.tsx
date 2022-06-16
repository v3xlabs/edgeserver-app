import { Button } from '@components/Button';
import { CreateAppModal } from '@components/CreateAppModal/CreateAppModal';
import { useApps } from '@utils/queries/useApps';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Application } from 'src/types/Application';

const ApplicationCard: FC<{ application: Application }> = ({ application }) => {
    const [previewURL, setPreviewURL] = useState('');

    useEffect(() => {
        fetch(
            'https://fuckcors.app/https://webshot.nodesite.eu:20122/render?url=' +
                encodeURIComponent(
                    'https://' + application.name.replace(/-/g, '.')
                ),
            { redirect: 'follow' }
        ).then(async (v) => {
            // console.log(v);
            const text = await v.text();

            const matches = new RegExp(/src="(?<yes>.*?)"/g).exec(text);

            if (!matches) {
                setPreviewURL('');

                return;
            }

            setPreviewURL(
                'https://webshot.nodesite.eu:20122' + matches?.groups?.yes
            );
        });
    }, [application]);

    return (
        <Link className="card" to={'/app/' + application.app_id}>
            <div className="w-full flex-grow aspect-video object-cover object-top border rounded-md bg-neutral-700">
                {previewURL && (
                    <img
                        src={previewURL}
                        alt="website preview"
                        className="w-full aspect-video object-cover object-top border rounded-md"
                    />
                )}
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-bold pb-2">{application.name}</h2>
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
    const [renderURLS, setRenderURLS] = useState({});

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

import { DeploymentLinkInfo } from '@components/DeploymentLinkInfo';
import { NoDeployments } from '@components/NoDeployments/NoDeployments';
import { environment } from '@utils/enviroment';
import { useApp } from '@utils/queries/useApp';
import { useDeployments } from '@utils/queries/useDeployments';
import { formatDistance, isValid } from 'date-fns';
import { FC, useMemo, useState } from 'react';
import { Activity } from 'react-feather';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Deployment } from 'src/types/Deployment';
import { decode } from 'sunflake';

const PAGE_MAX = 4;

const DeploymentLink: FC<{ deployment: Deployment; app_id: string }> = ({
    deployment,
    app_id,
}) => {
    const [previewImage, setPreviewImage] = useState(true);
    const timeDistance = useMemo(() => {
        const decoded = decode(deployment.deploy_id);
        const date_s = Number.parseInt(decoded.time.toString());

        if (!isValid(new Date(date_s))) return 'Unknown';

        if (!decoded.time) return 'Error';

        return formatDistance(new Date(), date_s) + ' ago';
    }, [deployment.timestamp]);

    return (
        <Link
            key={app_id}
            className="p-4 border border-neutral-700 card flex hover:bg-black-700"
            to={'/app/' + app_id + '/deployment/' + deployment.deploy_id}
        >
            <div className="flex mr-4">
                <div className="w-32 flex-grow aspect-video object-cover object-top border rounded-md bg-neutral-700 flex items-center justify-center h-fit">
                    {previewImage && (
                        <img
                            src={
                                environment.API_URL +
                                '/api/image/deploy/' +
                                deployment.deploy_id +
                                '/128'
                            }
                            className="w-32 rounded-lg"
                            alt="Deployment Preview Render"
                            onError={() => {
                                setPreviewImage(false);
                            }}
                        />
                    )}
                    {!previewImage && (
                        <div className="brightness-75 font-bold">?</div>
                    )}
                </div>
            </div>
            <DeploymentLinkInfo deployment={deployment} />
            <div className="text-sm text-neutral-400">{timeDistance}</div>
        </Link>
    );
};

const DeploymentList: FC = () => {
    const app = useApp();
    const { deployments, total, loading, loadingMore, fetchMoar } =
        useDeployments(app.app_id, PAGE_MAX);

    return (
        <div className="gap-4 flex flex-col w-full">
            <h2 className="text-2xl">
                Deployments{' '}
                {total > 0 ? `(${deployments.length} / ${total})` : ''}
            </h2>
            {loading &&
                Array.from({ length: 4 }).map((_, index) => (
                    <div
                        className="p-4 border border-neutral-700 bg-neutral-700 card flex h-32 animate-pulse"
                        key={index}
                    />
                ))}
            {!loading && (
                <>
                    {deployments &&
                        deployments.map((_deployments) => (
                            <DeploymentLink
                                deployment={_deployments}
                                app_id={app.app_id}
                                key={_deployments.deploy_id}
                            />
                        ))}
                    {total != deployments.length && (
                        <button
                            className="bg-blue-500 p-4 text-white"
                            onClick={() => {
                                fetchMoar();
                            }}
                        >
                            {loadingMore ? 'Loading...' : 'Load Moar'}
                        </button>
                    )}
                    {total == deployments.length && total > 0 && (
                        <div className="flex justify-center p-4 gap-2">
                            This is where it all began! <Activity />
                        </div>
                    )}
                    {total == 0 && <NoDeployments app_id={app.app_id} />}
                </>
            )}
        </div>
    );
};

export const AppDeploymentsPage: FC = () => {
    const app = useApp();

    return (
        <div className="containerd pt-8">
            <Helmet>
                <title>{app.name} / Deployments</title>
            </Helmet>
            <DeploymentList />
        </div>
    );
};

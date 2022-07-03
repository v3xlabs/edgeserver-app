import { environment } from '@utils/enviroment';
import { useApp } from '@utils/queries/useApp';
import { useDeployments } from '@utils/queries/useDeployments';
import { formatDistance, isValid } from 'date-fns';
import { FC, useMemo, useState } from 'react';
import { GitHub } from 'react-feather';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Deployment } from 'src/types/Deployment';
import { decode } from 'sunflake';

type GithubDeployContextType = {
    contextType: 'github-action';
    data: {
        event: string;
        sha: string;
        workflow: string;
        runNumber: number;
        runId: string;
        server_url: string;
        ref: string;
        actor: string;
        sender: string;
        commit: {
            author: {
                email: string;
                name: string;
                username: string;
            };
            committer: {
                email: string;
                name: string;
                username: string;
            };
            distinct: boolean;
            id: string;
            message: string;
            timestamp: string;
            tree_id: string;
            url: string;
        };
    };
};

type UnknownDeployContextType = {
    contextType: 'unknown';
};

type DeployContextType = GithubDeployContextType | UnknownDeployContextType;

const DeploymentLinkInfo: FC<{
    deployment: Deployment;
}> = ({ deployment }) => {
    const context: DeployContextType = useMemo(
        () =>
            deployment.context
                ? JSON.parse(deployment.context)
                : {
                      contextType: 'unknown',
                  },
        [deployment]
    );

    if (context.contextType === 'github-action') {
        return (
            <div className="flex-1">
                <h3>{context.data.commit.message} </h3>

                <p className="text-sm text-neutral-300">
                    🛠️ {context.data.workflow} #{context.data.runNumber}
                </p>

                <p className="text-sm text-neutral-300">
                    🧍 {context.data.actor}
                </p>

                <a
                    href={context.data.commit.url}
                    className="text-xs text-neutral-400 hover:text-neutral-500"
                    onClick={(event_) => {
                        event_.preventDefault();
                        window.open(context.data.commit.url);
                    }}
                >
                    <GitHub
                        size={'14px'}
                        style={{ display: 'inline', marginInlineEnd: '4px' }}
                    />
                    #{context.data.sha.slice(0, 7)}
                </a>
            </div>
        );
    }

    return (
        <div className="flex-1">
            <h3>{deployment.deploy_id}</h3>
            <p className="text-sm text-neutral-400">{deployment.sid}</p>
        </div>
    );
};

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
            className="p-4 border-2 card flex hover:bg-black-700"
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
    const { data, isLoading, isSuccess } = useDeployments(app.app_id);
    const sorted_deployments = useMemo(() => {
        if (!isSuccess) return [];

        if (!data) return [];

        return [...data].sort((a, b) => {
            if (BigInt(a.deploy_id) < BigInt(b.deploy_id)) return 1;

            // ids will never be equal to each other
            return -1;
        });
    }, [data, isSuccess]);

    return (
        <div className="gap-4 flex flex-col w-full">
            <h2 className="text-2xl">
                Deployments {data && data.length > 0 ? `(${data.length})` : ''}
            </h2>
            {isLoading && <p>Loading Deployments...</p>}
            {sorted_deployments &&
                sorted_deployments.map((deployments) => (
                    <DeploymentLink
                        deployment={deployments}
                        app_id={app.app_id}
                        key={deployments.deploy_id}
                    />
                ))}
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

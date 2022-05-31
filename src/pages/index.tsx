import { DisconnectButton } from '@components/DisconnectButton';
import { environment } from '@utils/enviroment';
import { useJWT } from '@utils/useAuth';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

const ProjectList: FC = () => {
    const [data, setData] = useState<
        {
            app_id: string;
            domain_id: string;
            owner_id: string;
            permissions: string;
        }[]
    >([]);

    const { data: account } = useAccount();
    const token = useJWT((state) => state.token);

    const apiUrl = environment.API_URL;

    useEffect(() => {
        if (!account) {
            setData([]);

            return;
        }

        (async () => {
            const response = await fetch(apiUrl + '/api/apps/ls', {
                method: 'GET',
                headers: { Authorization: 'Bearer ' + token },
            });

            setData(await response.json());
        })();
    }, [account]);

    return (
        <div className="gap-4 flex flex-col w-full">
            <h2 className="text-2xl">
                Projects {data && data.length > 0 ? `(${data.length})` : ''}
            </h2>
            {data.map((project) => (
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

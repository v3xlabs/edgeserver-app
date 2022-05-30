import { DisconnectButton } from '@components/DisconnectButton';
import { environment } from '@utils/enviroment';
import { useJWT } from '@utils/useAuth';
import { FC, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const ProjectList: FC = () => {
    const [data, setData] = useState<
        {
            site_id: string;
            cid: string | undefined;
            host: string;
            owner: string;
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
            const response = await fetch(apiUrl + '/api/domain/ls', {
                method: 'GET',
                headers: { Authorization: 'Bearer ' + token },
            });

            setData(await response.json());
        })();
    }, [account]);

    return (
        <div>
            {data.map((project) => (
                <div key={project.site_id}>
                    {project.site_id} {project.host}
                </div>
            ))}
        </div>
    );
};

export const Home: FC = () => {
    return (
        <div className="m-8">
            <DisconnectButton />

            <ProjectList />
        </div>
    );
};

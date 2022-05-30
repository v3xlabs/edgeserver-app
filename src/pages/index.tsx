import { FC, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { DisconnectButton } from '../components/DisconnectButton';
import { useJWT } from '../utils/useAuth';

const ProjectList: FC = () => {
    const [data, setData] = useState(
        [] as {
            site_id: string;
            cid: string | null;
            host: string;
            owner: string;
        }[]
    );
    const { data: account } = useAccount();
    const token = useJWT((state) => state.token);

    useEffect(() => {
        if (!account) {
            setData([]);

            return;
        }

        fetch((process.env.API_URL || '') + '/api/domain/ls', {
            method: 'GET',
            headers: { Authorization: 'Bearer ' + token },
        })
            .then((data) => data.json())
            .then(setData);
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

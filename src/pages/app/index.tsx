import { FC } from 'react';
import { useParams } from 'react-router';

export const AppPage: FC = () => {
    const { app_id } = useParams<{ app_id: string }>();

    return <div className="containerd pt-8">App {app_id}</div>;
};

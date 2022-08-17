import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { environment } from '@utils/enviroment';
import { ApplicationListData } from '@utils/queries/useApps';
import { useJWT } from '@utils/useAuth';
import { FC } from 'react';
import { useMutation } from 'react-query';

const DeleteButton: FC<{ app_id: string }> = ({ app_id }) => {
    const { token } = useJWT();
    const { data, mutate, isLoading, error } = useMutation(
        `/app/${app_id}/deploys/ls`,
        {
            mutationFn: async () => {
                if (!app_id) return;

                return await fetch(
                    environment.API_URL + '/api/apps/' + app_id + '/delete',
                    {
                        method: 'DELETE',
                        headers: { Authorization: 'Bearer ' + token },
                    }
                ).then((data) => data.json());
            },
        }
    );

    return (
        <Button
            onClick={() => mutate()}
            label="Yoink!"
            variant="delete"
        ></Button>
    );
};

export const CreateDeleteAppModal: FC<{
    app: ApplicationListData;
    onClose: () => void;
}> = ({ onClose, app }) => (
    <Modal label={'Sure u not drunk?'} onClose={() => onClose()}>
        Are you totally sure you wanna completely delete{' '}
        <span className="font-bold">{app.name}</span>?
        <DeleteButton app_id={app.app_id} />
    </Modal>
);

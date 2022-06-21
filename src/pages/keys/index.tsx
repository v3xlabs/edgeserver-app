// import { Button } from '@components/Button';
import { Button } from '@components/Button';
import { CreateKeyModal } from '@components/CreateKeyModal/CreateKeyModal';
import { DeleteKeyModal } from '@components/DeleteKeyModal/DeleteKeyModal';
import { useKeys } from '@utils/queries/useKeys';
import { formatDistance } from 'date-fns';
import { FC, useMemo, useReducer, useState } from 'react';
import { Trash2 } from 'react-feather';
import { AuthKey } from 'src/types/AuthKey';

const KeysTableRow: FC<{
    auth_key: AuthKey;
    onDelete: (_id: string) => void;
}> = ({ auth_key, onDelete }) => {
    const [hasDeleteOpen, setDeleteOpen] = useState(false);
    const lastUsed = useMemo(
        () =>
            auth_key.last_use != 0 && auth_key.last_use
                ? formatDistance(new Date(auth_key.last_use), new Date())
                : '',
        [auth_key]
    );
    const expiresIn = useMemo(
        () =>
            auth_key.exp && auth_key.exp != 1
                ? formatDistance(
                      new Date(Number.parseInt(auth_key.exp.toString())),
                      Date.now()
                  )
                : 'Never',
        [auth_key]
    );

    return (
        <tr key={auth_key.key} className="border border-neutral-600 h-12">
            <td className="pl-4">
                🔑&nbsp;&nbsp;{auth_key.key.slice(0, 4)}...
                {auth_key.key.slice(-2)}
            </td>
            <td>{auth_key.permissions}</td>
            <td>{auth_key.last_use && lastUsed}</td>
            <td className={auth_key.exp ? '' : 'text-neutral-500'}>
                {expiresIn}
            </td>
            <td className="text-center">
                {auth_key.state == 0 ? (
                    <span>Deactivated</span>
                ) : (
                    <div className={auth_key.exp ? 'text-purple-500' : ''}>
                        {auth_key.exp ? 'Volatile' : 'Active'}
                    </div>
                )}
            </td>
            <td className="text-center">
                <button
                    onClick={() => setDeleteOpen(true)}
                    className="hover:scale-110 hover:text-red-600 focus:text-red-600 active:text-red-600 text-red-800"
                >
                    <Trash2 size={18} />
                </button>
            </td>
            {hasDeleteOpen && (
                <DeleteKeyModal
                    key_id={auth_key.key}
                    onClose={() => setDeleteOpen(false)}
                    onDelete={onDelete}
                />
            )}
        </tr>
    );
};

const KeysTable: FC = () => {
    const { data, isLoading } = useKeys();
    const [optimisticDeletes, addOptimisticDelete] = useReducer(
        (state: string[], deleted_key: string) => [...state, deleted_key],
        [] as string[]
    );
    const keys = useMemo(
        // eslint-disable-next-line sonarjs/cognitive-complexity
        () =>
            !data
                ? []
                : data.keys
                      .filter((v) => !optimisticDeletes.includes(v.key))
                      .sort((a, b) => {
                          if (a.exp && b.exp) return a.key > b.key ? -1 : 1;

                          if (a.exp) return -1;

                          if (b.exp) return 1;

                          return a.last_use > b.last_use ? -1 : 1;
                      }),
        [data, optimisticDeletes]
    );

    return (
        <table className="w-full">
            <tr>
                <th className="p-4">Key ID</th>
                <th className="p-4">Permissions</th>
                <th className="p-4">Last Used</th>
                <th className="p-4">Expires In</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
            </tr>
            {keys.map((value) => (
                <KeysTableRow
                    key={value.key}
                    auth_key={value}
                    onDelete={addOptimisticDelete}
                />
            ))}
        </table>
    );
};

export const KeysPage: FC = () => {
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    return (
        <div className="containerd pt-8">
            <div className="flex">
                <h2 className="text-2xl flex-grow block">Keys</h2>
            </div>
            <div className="card p-4 mt-4 mb-4 flex">
                <div className="flex-1">
                    <h3 className="text-xl">Manage your keys</h3>
                    <p>
                        This page has all the keys that you have created,
                        browser keys, cli keys, and deployment keys. Use the
                        button on the right to create your own keys!
                    </p>
                </div>
                <div>
                    <Button
                        label={'Create Key ➜'}
                        onClick={() => setIsModalCreateOpen(true)}
                    />
                    {isModalCreateOpen && (
                        <CreateKeyModal
                            onClose={() => setIsModalCreateOpen(false)}
                        />
                    )}
                </div>
            </div>
            <div className="card mt-4 p-8">
                <KeysTable />
            </div>
        </div>
    );
};

/* eslint-disable sonarjs/no-duplicate-string */
import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { cx } from '@utils/cx';
import { environment } from '@utils/enviroment';
import { useJWT } from '@utils/useAuth';
import { decode } from 'jsonwebtoken';
import { FC, useCallback, useState } from 'react';
import { Clipboard } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useSignMessage } from 'wagmi';

export const CreateKeyModal: FC<{ onClose: () => void }> = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<{ permissions: string }>({
        reValidateMode: 'onChange',
        delayError: 100,
        mode: 'all',
        resolver: async (values) => {
            if (values.permissions.length === 0)
                return {
                    values: {},
                    errors: {
                        permissions: { type: 'minLength' },
                    },
                };

            return {
                values,
                errors: {},
            };
        },
    });
    const { data: signedData, signMessageAsync } = useSignMessage();
    const { token } = useJWT();
    const [generatedToken, setGeneratedToken] = useState('');
    const onSubmit = useCallback(async (data: { permissions: string }) => {
        const decodedToken = decode(token) as {
            exp?: number;
            iat: number;
            instance_id: string;
            key: string;
            owner_id: string;
        };

        console.log({ decodedToken });
        const payload = {
            action: 'CREATE_KEY',
            owner_id: decodedToken.owner_id,
            instance_id: decodedToken.instance_id,
            data: {
                permissions: data.permissions,
                expiresIn: '10h',
            },
        };
        const stringified_payload = JSON.stringify(payload, undefined, 2);
        const signed_key_request = await signMessageAsync({
            message: stringified_payload,
        });

        if (!signed_key_request) return;

        const domain_response = await fetch(environment.API_URL + '/api/keys', {
            method: 'POST',
            body: JSON.stringify({
                message: stringified_payload,
                payload,
                signature: signed_key_request,
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });

        // eslint-disable-next-line unicorn/no-await-expression-member
        setGeneratedToken((await domain_response.json())['token']);
    }, []);

    return (
        <Modal label="Key Creator" onClose={onClose}>
            {!generatedToken && (
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label
                            htmlFor="permissions"
                            className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 pt-4 mb-2"
                        >
                            Raw Permissions
                        </label>
                        <div className="flex items-center gap-2 text-neutral-500">
                            <input
                                type="text"
                                id="permissions"
                                className={cx(
                                    'text-sm rounded-lg block w-full p-2.5 border',
                                    errors.permissions
                                        ? 'bg-red-900 bg-opacity-20 border-red-500 focus-visible:outine-red-500'
                                        : 'focus:ring-blue-500 focus:border-blue-500 bg-neutral-50 border-neutral-300 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white'
                                )}
                                placeholder="32,11"
                                required
                                {...register('permissions')}
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        pending={isSubmitting}
                        variant="primary"
                        className="w-full whitespace-pre justify-center"
                        label={
                            isValid
                                ? isSubmitting
                                    ? 'Pending...'
                                    : 'Create 🔑'
                                : 'Select Permissions'
                        }
                    />
                </form>
            )}
            {generatedToken && (
                <div>
                    <p className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                        Here is your API Key, we will only show this once.
                    </p>
                    <div className="flex mt-2">
                        <input
                            id="generated_token"
                            className="p-2 bg-black-500 w-full block overflow-hidden"
                            value={generatedToken}
                        />
                        <button
                            className="w-10 h-10 border-neutral-400 border-2 flex items-center justify-center"
                            onClick={() => {
                                const copyText = document.querySelector(
                                    '#generated_token'
                                ) as HTMLInputElement;

                                copyText.select();
                                copyText.setSelectionRange(0, 99_999);
                                navigator.clipboard.writeText(copyText.value);

                                const c = copyText.value;

                                copyText.value = '-- Copied! --';

                                setTimeout(() => {
                                    copyText.value = c;
                                }, 500);
                            }}
                        >
                            <Clipboard />
                        </button>
                    </div>
                    <Button
                        className="w-full mt-4"
                        label="I wrote it down"
                        onClick={onClose}
                    />
                </div>
            )}
        </Modal>
    );
};

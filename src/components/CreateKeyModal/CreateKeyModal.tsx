/* eslint-disable sonarjs/no-duplicate-string */
import { Button } from '@components/Button';
import { cx } from '@utils/cx';
import { environment } from '@utils/enviroment';
import { useJWT } from '@utils/useAuth';
import { decode } from 'jsonwebtoken';
import { FC, useCallback } from 'react';
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
                expiresAt: '10h',
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

        onClose();
    }, []);

    return (
        <div>
            <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center bg-neutral-900 bg-opacity-80"
            >
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-neutral-800 border-white border">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-neutral-800 dark:hover:text-white"
                            data-modal-toggle="authentication-modal"
                            onClick={onClose}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                        <div className="py-6 px-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-neutral-900 dark:text-white">
                                Key Creator
                            </h3>
                            <form
                                className="space-y-6"
                                onSubmit={handleSubmit(onSubmit)}
                            >
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

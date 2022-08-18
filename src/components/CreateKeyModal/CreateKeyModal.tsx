/* eslint-disable sonarjs/no-duplicate-string */
import { Button } from '@components/Button';
import { Checkbox } from '@components/Checkbox';
import { Modal } from '@components/Modal';
import { cx } from '@utils/cx';
import { environment } from '@utils/enviroment';
import { KeyPerms } from '@utils/permissions';
import { useJWT } from '@utils/useAuth';
import { decode } from 'jsonwebtoken';
import ms from 'ms';
import { EMPTY_PERMISSIONS, grantPermission } from 'permissio';
import { FC, useCallback, useMemo, useState } from 'react';
import { Clipboard } from 'react-feather';
import { FieldErrors, useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useSignMessage } from 'wagmi';

const Perms = {
    'Read Applications': KeyPerms.APPS_READ,
    'Modify/Create Applications': KeyPerms.APPS_WRITE,
    'Delete Applications': KeyPerms.APPS_DELETE,

    'Read Domains': KeyPerms.DOMAINS_READ,
    'Modify/Create Domains': KeyPerms.DOMAINS_WRITE,
    'Delete Domains': KeyPerms.DOMAINS_DELETE,

    'Read Deployments': KeyPerms.DEPLOYMENTS_READ,
    'Modify/Create Deployments': KeyPerms.DEPLOYMENTS_WRITE,
    'Delete Deployments': KeyPerms.DEPLOYMENTS_DELETE,
};

type CreateKeyForm = {
    name: string;
    permanent: boolean;
    expiresIn: string;
    'Full Access': boolean;
} & Record<keyof typeof Perms, boolean>;

export const CreateKeyModal: FC<{ onClose: () => void }> = ({ onClose }) => {
    const [noPerms, setNoPerms] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<CreateKeyForm>({
        reValidateMode: 'onChange',
        delayError: 100,
        mode: 'all',
        resolver: async (values) => {
            const ValueErrors: FieldErrors<typeof values> = {};

            if (values.name.length === 0)
                ValueErrors.name = { type: 'minLength' };

            if (
                !values.permanent &&
                values.expiresIn &&
                !ms(values.expiresIn)
            ) {
                ValueErrors.expiresIn = {
                    type: 'pattern',
                    message: 'Not a valid timestamp',
                };
            }

            if (
                Object.keys(Perms).every(
                    (key) => !values[key as keyof typeof Perms]
                ) &&
                !values['Full Access']
            ) {
                // errors needs to be a part of the form, otherwise it will be ignored
                // Thus we create a state for when no perms have been selected.
                if (!noPerms) setNoPerms(true);
            } else {
                if (noPerms) setNoPerms(false);
            }

            if (Object.keys(ValueErrors).length > 0) {
                return { values: {}, errors: ValueErrors };
            }

            return {
                values,
                errors: {},
            };
        },
        defaultValues: {
            permanent: false,
            name: '',
            expiresIn: '10h',
        },
    });
    const { data: signedData, signMessageAsync } = useSignMessage();
    const { token } = useJWT();
    const [generatedToken, setGeneratedToken] = useState('');
    const onSubmit = useCallback(async (data: CreateKeyForm) => {
        const decodedToken = decode(token) as {
            exp?: number;
            iat: number;
            instance_id: string;
            key: string;
            owner_id: string;
        };

        const rawPerms = data['Full Access']
            ? [KeyPerms.FULL]
            : Object.keys(Perms)
                  .filter((key) => data[key as keyof typeof Perms])
                  .map((key) => Perms[key as keyof typeof Perms]);

        const permissions = grantPermission(EMPTY_PERMISSIONS, ...rawPerms);

        console.log({ decodedToken });
        const formData: {
            permissions: string;
            name: string;
            expiresIn?: string;
        } = {
            permissions: permissions.toString(),
            name: data.name,
            expiresIn: (!data.permanent && data.expiresIn) || '',
        };

        if (data.permanent) delete formData['expiresIn'];

        const payload = {
            action: 'CREATE_KEY',
            owner_id: decodedToken.owner_id,
            instance_id: decodedToken.instance_id,
            data: formData,
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

    const [expireDebounce] = useDebounce(watch('expiresIn'), 300);
    const expireString = useMemo(() => {
        if (expireDebounce === undefined) return '';

        try {
            return ms(ms(expireDebounce), { long: true });
        } catch {
            return '';
        }
    }, [expireDebounce]);

    return (
        <Modal label="Key Creator" onClose={onClose}>
            {!generatedToken && (
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2"
                        >
                            Name
                        </label>
                        <div className="flex items-center gap-2 text-neutral-500">
                            <input
                                type="text"
                                id="name"
                                className={cx(
                                    'text-sm rounded-lg block w-full p-2.5 border',
                                    errors.name
                                        ? 'bg-red-900 bg-opacity-20 border-red-500 focus-visible:outine-red-500'
                                        : 'focus:ring-blue-500 focus:border-blue-500 bg-neutral-50 border-neutral-300 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white'
                                )}
                                placeholder="My Awesome Key"
                                required
                                {...register('name')}
                            />
                        </div>
                    </div>
                    <div>
                        <span className="block text-base font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                            Key Permissions
                        </span>
                        <div className="grid items-center gap-2 text-neutral-500">
                            <Checkbox
                                id="Full Access"
                                label="Full Access"
                                register={register}
                            />
                            {Object.keys(Perms).map((perm) => (
                                <Checkbox
                                    id={perm}
                                    key={perm}
                                    label={perm}
                                    register={register}
                                    disabled={watch('Full Access')}
                                />
                            ))}

                            {noPerms && (
                                <span className="text-red-500">
                                    No permissions selected.
                                </span>
                            )}
                        </div>
                    </div>
                    <div>
                        <span className="block text-base font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                            Settings
                        </span>
                        <div className="block w-full">
                            <Checkbox
                                id="permanent"
                                label="Permanent Key"
                                // className="text-sm rounded-lg block p-2.5 border focus:ring-blue-500 focus:border-blue-500 bg-neutral-50 border-neutral-300 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white"
                                register={register}
                            />
                        </div>
                    </div>
                    {!watch('permanent') && (
                        <div>
                            <label htmlFor="expiresIn">Expires In</label>

                            <div className="flex items-center gap-2 text-neutral-500">
                                <input
                                    type="text"
                                    id="expiresIn"
                                    className={cx(
                                        'text-sm rounded-lg block w-full p-2.5 border',
                                        errors.expiresIn
                                            ? 'bg-red-900 bg-opacity-20 border-red-500 focus-visible:outine-red-500'
                                            : 'focus:ring-blue-500 focus:border-blue-500 bg-neutral-50 border-neutral-300 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white'
                                    )}
                                    placeholder="10h"
                                    required
                                    {...register('expiresIn')}
                                />
                            </div>

                            {expireString && (
                                <div className="mt-2 text-neutral-500">
                                    {expireString}
                                </div>
                            )}
                        </div>
                    )}
                    <Button
                        type="submit"
                        disabled={isSubmitting || !isValid || noPerms}
                        pending={isSubmitting}
                        variant="primary"
                        className="mt-4 w-full whitespace-pre justify-center"
                        label={
                            isValid && !noPerms
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
                            className="p-2 dark:bg-black-500 bg-slate-300 w-full block overflow-hidden"
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

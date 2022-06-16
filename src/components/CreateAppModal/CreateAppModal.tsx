/* eslint-disable sonarjs/no-duplicate-string */
import { Button } from '@components/Button';
import { cx } from '@utils/cx';
import { environment } from '@utils/enviroment';
import { useJWT } from '@utils/useAuth';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';

export const CreateAppModal: FC<{ onClose: () => void }> = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<{ domain: string }>({
        reValidateMode: 'onChange',
        delayError: 100,
        mode: 'all',
        resolver: async (values) => {
            console.log('validating');

            if (
                !/^((?!-))(xn--)?[\da-z][\d_a-z-]{0,61}[\da-z]{0,1}\.(xn--)?([\da-z-]{1,61}|[\da-z-]{1,30}\.[a-z]{2,})$/.test(
                    values.domain
                )
            ) {
                console.log('inv domain');

                return {
                    values: {},
                    errors: {
                        domain: { type: 'value', message: 'not-domain' },
                    },
                };
            }

            return {
                values,
                errors: {},
            };
        },
    });
    const { token } = useJWT();
    const onSubmit = useCallback(async (data: { domain: string }) => {
        console.log(data);
        await new Promise<void>((accept) => setTimeout(accept, 1000));

        let domain_id;

        try {
            const domain_response = await fetch(
                environment.API_URL + '/api/domains/create',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        host: data.domain,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                }
            );

            const { domain_id: _domain_id } = await domain_response.json();

            domain_id = _domain_id as string;
        } catch {
            alert('Error while creating domain');
            console.log('error');

            return;
        }

        let application_id: string;

        try {
            const application_response = await fetch(
                environment.API_URL + '/api/apps/create',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        name: data.domain.replace('.', '-'),
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                }
            );

            const { site_id: _application_id } =
                await application_response.json();

            application_id = _application_id;
        } catch {
            alert('Error while creating application');
            console.log('error');

            return;
        }

        try {
            const _link_response = await fetch(
                environment.API_URL + '/api/apps/' + application_id + '/link',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        domain_id,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                }
            );
        } catch {
            alert('Error while linking application');
            console.log('error');

            return;
        }

        console.log('Successfully created', application_id, domain_id);
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
                                App Creator
                            </h3>
                            <form
                                className="space-y-6"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div>
                                    <label
                                        htmlFor="domain"
                                        className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 pt-4 mb-2"
                                    >
                                        Where will this app be available?
                                    </label>
                                    <div className="flex items-center gap-2 text-neutral-500">
                                        <div>https://</div>
                                        <input
                                            type="text"
                                            id="domain"
                                            className={cx(
                                                'text-sm rounded-lg block w-full p-2.5 border',
                                                errors.domain
                                                    ? 'bg-red-900 bg-opacity-20 border-red-500 focus-visible:outine-red-500'
                                                    : 'focus:ring-blue-500 focus:border-blue-500 bg-neutral-50 border-neutral-300 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white'
                                            )}
                                            placeholder="edgeserver.app"
                                            required
                                            {...register('domain')}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                                        And update your DNS records to include
                                    </p>
                                    <code className="p-2 bg-black-500 w-full block mt-2">
                                        {(watch('domain') || 'yoursite.here') +
                                            ' CNAME web.lvk.sh'}
                                    </code>
                                </div>
                                <div className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                                    DNS Records may take up to 24 hours to
                                    update. Yes, the system is archaic. I&apos;m
                                    impatient too
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !isValid}
                                    pending={isSubmitting}
                                    className="w-full whitespace-pre justify-center"
                                    label={
                                        isValid
                                            ? isSubmitting
                                                ? 'Pending...'
                                                : 'Launch  🚀'
                                            : 'Incorrect URL'
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

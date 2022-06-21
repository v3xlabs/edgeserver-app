/* eslint-disable sonarjs/no-duplicate-string */
import { Button } from '@components/Button';
import { cx } from '@utils/cx';
import { environment } from '@utils/enviroment';
import { useJWT } from '@utils/useAuth';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';

export const DeleteKeyModal: FC<{
    onClose: () => void;
    key_id: string;
    onDelete: (key_id: string) => void;
}> = ({ onClose, onDelete, key_id }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<{ slider: number }>({
        reValidateMode: 'onChange',
        delayError: 100,
        mode: 'all',
        resolver: async (values) => {
            console.log('validating');

            if (values.slider < 99) {
                console.log('inv slider');

                return {
                    values: {},
                    errors: {
                        slider: { type: 'value', message: 'not-enough' },
                    },
                };
            }

            return {
                values,
                errors: {},
            };
        },
        defaultValues: {
            slider: 0,
        },
    });
    const { token } = useJWT();
    const onSubmit = useCallback(async () => {
        const delete_response = await fetch(environment.API_URL + '/api/keys', {
            method: 'DELETE',
            body: JSON.stringify({
                key_id,
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });

        onClose();
        onDelete(key_id);

        if (delete_response.status == 200) return true;

        return false;
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
                                <div className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 mb-2">
                                    Please drag this cute slider to the right to
                                    confirm the destruction of this auth key.
                                </div>
                                <div>
                                    <label
                                        htmlFor="slider"
                                        className="block text-sm font-medium text-neutral-900 dark:text-neutral-300 pt-4 mb-2"
                                    >
                                        Verify Deletion
                                    </label>
                                    <div className="flex items-center gap-2 text-neutral-500">
                                        <input
                                            type="range"
                                            id="slider"
                                            step={1}
                                            min={1}
                                            max={100}
                                            className={cx(
                                                'text-sm rounded-lg block w-full p-2.5 border human-slider'
                                            )}
                                            placeholder="32,11"
                                            required
                                            {...register('slider')}
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !isValid}
                                    pending={isSubmitting}
                                    variant="delete"
                                    className="w-full whitespace-pre justify-center"
                                    label={
                                        isValid
                                            ? isSubmitting
                                                ? 'Pending...'
                                                : 'Anihilate 💥'
                                            : 'Drag Slider'
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

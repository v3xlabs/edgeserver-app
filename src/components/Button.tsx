import { cx } from '@utils/cx';
import { ButtonHTMLAttributes, FC } from 'react';
import { Loader } from 'react-feather';

export const Button: FC<
    ButtonHTMLAttributes<HTMLButtonElement> & {
        label: string;
        pending?: boolean;
    }
> = ({
    className,
    children: _children,
    label,
    disabled,
    pending = false,
    ...properties
}) => {
    return (
        <button
            {...properties}
            className={cx(
                className || '',
                disabled
                    ? 'bg-neutral-700 text-neutral-400'
                    : 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                'flex items-center gap-2 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center'
            )}
            disabled={disabled}
        >
            {pending && (
                <Loader className="animate-spin -mt-2 -mb-2" height={'1.5em'} />
            )}
            {label}
        </button>
    );
};

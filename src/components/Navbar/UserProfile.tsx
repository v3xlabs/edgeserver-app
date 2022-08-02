import { Listbox } from '@headlessui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { cx } from '@utils/cx';
import { formatAddress } from '@utils/formatAddress';
import { gradientAvatar } from '@utils/gradientAvatar';
import { useENS } from '@utils/queries/useENS';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export const UserProfile: FC = () => {
    const { data: userData, isSuccess } = useAccount();
    const { disconnect } = useDisconnect({});

    const { activeConnector } = useConnect();

    const { Name, Avatar } = useENS();

    if (!isSuccess || !userData || !userData.address) return <></>;

    return (
        <Listbox value="1" onChange={() => {}} as="div" className="yess">
            <Listbox.Button as="div" className="h-full">
                <ConnectButton.Custom>
                    {({ openAccountModal }) => {
                        return (
                            <button
                                className="flex items-center h-full pr-4 pl-4 gap-2"
                                // onClick={openAccountModal}
                            >
                                <div className="">
                                    <div className="text-2 font-bold text-right leading-tight">
                                        {Name
                                            ? `${Name}`
                                            : formatAddress(userData.address!)}
                                    </div>
                                    <div className="text-1 opacity-50 text-right text-xs leading-3">
                                        {Name &&
                                            formatAddress(userData.address!)}
                                        {/* Logged in with{' '}
                                    <b>
                                        {capitalizeFirstLetter(
                                            activeConnector?.id || 'unknown'
                                        )}
                                    </b> */}
                                    </div>
                                </div>
                                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-neutral-700">
                                    {Avatar ? (
                                        <img
                                            src={Avatar}
                                            className="w-10 h-10 rounded-full"
                                            alt="ENSavatar"
                                        />
                                    ) : (
                                        <div
                                            className="w-10 h-10 rounded-full overflow-hidden"
                                            dangerouslySetInnerHTML={{
                                                __html: gradientAvatar(
                                                    userData.address!
                                                ),
                                            }}
                                        />
                                    )}
                                </div>
                            </button>
                        );
                    }}
                </ConnectButton.Custom>
            </Listbox.Button>
            <Listbox.Options
                as="div"
                className="bg-neutral-800 border border-neutral-700"
            >
                {[
                    { link: '/settings', label: 'Settings' },
                    { link: '/keys', label: 'Auth Keys', icon: '🔑' },
                ].map((link, index) => (
                    <Listbox.Option value="1" className="list-none" key={index}>
                        <NavLink
                            to={link.link}
                            className={({ isActive }) =>
                                cx(
                                    'p-2 w-full block',
                                    (isActive &&
                                        'border-l-4 border-blue-500') ||
                                        'hover:bg-neutral-700'
                                )
                            }
                        >
                            {link.label}
                        </NavLink>
                    </Listbox.Option>
                ))}
                <Listbox.Option value="1" className="list-none">
                    <button
                        className={
                            'p-2 w-full block bg-red-500 hover:bg-red-800'
                        }
                        onClick={() => disconnect()}
                    >
                        Logout
                    </button>
                </Listbox.Option>
            </Listbox.Options>
        </Listbox>
    );
};

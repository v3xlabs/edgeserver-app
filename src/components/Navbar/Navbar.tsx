import { FC } from 'react';
import icon from 'url:../../../assets/signal.svg';

import { NavbarLink } from './NavLink';
import { ProjectSelector } from './ProjectSelector';
import { UserProfile } from './UserProfile';

const links: {
    name: string;
    path: string;
}[] = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Projects',
        path: '/projects',
    },
];

export const Navbar: FC = () => {
    return (
        <div
            className="w-full pt-4
            bg-black-900 border-b-2 border-neutral-700"
        >
            <div
                className="w-full max-w-4xl mx-auto
                flex flex-col gap-4"
            >
                <div
                    className="flex gap-4 items-center flex-wrap
                    container
                    mx-auto w-full"
                >
                    <img src={icon} alt="Signal Icon" className="flex-0 w-10" />
                    <ProjectSelector />
                    <div className="ml-auto">
                        <UserProfile />
                    </div>
                </div>

                <div className="flex container mx-auto w-full justify-between">
                    <div className="flex gap-4">
                        {links.map((link) => (
                            <NavbarLink
                                key={link.name}
                                name={link.name}
                                path={link.path}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

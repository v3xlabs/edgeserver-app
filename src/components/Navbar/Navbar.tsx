import { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import icon from 'url:../../../assets/signal.svg';

import { NavbarLink } from './NavLink';
import { ProjectSelector } from './ProjectSelector';
import { UserProfile } from './UserProfile';

const links: {
    name: string;
    path: string;
    end?: boolean;
}[] = [
    {
        name: 'Dashboard',
        path: '/',
        end: true,
    },
    {
        name: 'Settings',
        path: '/settings',
    },
];
const app_links: {
    name: string;
    path: string;
    end?: boolean;
}[] = [
    {
        name: 'Application',
        path: '/app/:app_id',
        end: true,
    },
    {
        name: 'Deployments',
        path: '/app/:app_id/deployments',
    },
    {
        name: 'Settings',
        path: '/app/:app_id/settings',
    },
];

export const Navbar: FC = () => {
    // const app_id = useAppData((state) => state.app_id);
    const { pathname } = useLocation();
    const { app_id, deploy_id } = useMemo(() => {
        const app_id_matches = pathname.match(/^\/app\/(?<app_id>\d+)/);
        const deploy_id_matches = pathname.match(
            /^\/app\/(\d+)\/deployments\/(\d+)/
        );

        return {
            app_id:
                (app_id_matches &&
                    app_id_matches.length == 2 &&
                    app_id_matches.at(1)) ||
                undefined,
            deploy_id:
                (deploy_id_matches &&
                    deploy_id_matches.length == 3 &&
                    deploy_id_matches.at(2)) ||
                undefined,
        };
    }, [pathname]);

    return (
        <div
            className="w-full pt-4
            bg-black-900 border-b-2 border-neutral-700"
        >
            <div
                className="w-full max-w-4xl mx-auto
                flex flex-col gap-4"
            >
                <div className="flex gap-4 items-center flex-wrap containerd">
                    <Link to={'/'}>
                        <img
                            src={icon}
                            alt="Signal Icon"
                            className="flex-0 w-10"
                        />
                    </Link>
                    <ProjectSelector />
                    <div className="ml-auto">
                        <UserProfile />
                    </div>
                </div>
                <div className="flex container mx-auto w-full justify-between">
                    {!app_id && (
                        <div className="flex gap-4">
                            {links.map((link) => (
                                <NavbarLink
                                    key={link.name}
                                    name={link.name}
                                    path={link.path}
                                    end={link.end || false}
                                />
                            ))}
                        </div>
                    )}
                    {app_id && (
                        <div className="flex gap-4">
                            <NavbarLink
                                name="Application"
                                path={'/app/' + app_id}
                                end
                            />
                            {deploy_id ? (
                                <NavbarLink
                                    name={'Deployments ' + deploy_id}
                                    path={
                                        '/app/' +
                                        app_id +
                                        '/deployments/' +
                                        deploy_id
                                    }
                                />
                            ) : (
                                <NavbarLink
                                    name="Deployments"
                                    path={'/app/' + app_id + '/deployments'}
                                />
                            )}
                            <NavbarLink
                                name="Settings"
                                path={'/app/' + app_id + '/settings'}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const NavbarLink: FC<{ name: string; path: string; end?: boolean }> = ({
    name,
    path,
    end = false,
}) => {
    return (
        <NavLink
            to={path}
            className={({ isActive }) =>
                `px-8 ${
                    isActive
                        ? 'text-neutral-100 border-b-4'
                        : 'text-neutral-600'
                }`
            }
            end={end}
        >
            {name}
        </NavLink>
    );
};

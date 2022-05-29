import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const NavbarLink: FC<{ name: string; path: string }> = ({
    name,
    path,
}) => {
    return (
        <NavLink
            to={path}
            className={({ isActive }) =>
                `px-8 ${
                    isActive ? 'text-neutral-100 border-b-4' : 'text-neutral-600'
                }`
            }
        >
            {name}
        </NavLink>
    );
};

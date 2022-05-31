import { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NavbarLink: FC<{
    name: string;
    path: string;
    path_match?: string;
    end?: boolean;
}> = ({ name, path, end = false, path_match }) => {
    const { pathname } = useLocation();

    const isActive = useMemo(() => {
        if (path_match) return pathname.match(path_match);

        if (end) return pathname == path;

        return pathname.startsWith(path);
    }, [path, path_match, pathname]);

    return (
        <Link
            to={path}
            className={`px-8 ${
                isActive ? 'text-neutral-100 border-b-4' : 'text-neutral-600'
            }`}
        >
            {name}
        </Link>
    );
};

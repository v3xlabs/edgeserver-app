import { FC } from 'react';

import { UserProfile } from './UserProfile';

export const Navbar: FC = () => {
    return (
        <div className="w-full bg-black-900 border-b-2 border-neutral-700 p-4">
            <div className="flex container mx-auto w-full justify-between">
                <div>Information</div>
                <div>
                    <UserProfile />
                </div>
            </div>
        </div>
    );
};

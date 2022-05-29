import { FC } from 'react';

import { useAuth } from '../../utils/useAuth';
import { LoginStepOne } from './StepOne';
import { LoginStepTwo } from './StepTwo';
import { Whitelist } from './Whitelist';

export const Login: FC = () => {
    const { state } = useAuth();

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            {state == 'no-wallet' && <LoginStepOne />}
            {state == 'no-token' && <LoginStepTwo />}
            {state == 'not-whitelisted' && <Whitelist />}
        </div>
    );
};

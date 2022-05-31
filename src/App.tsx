import { AppPage } from '@pages/app';
import { DeploymentPage } from '@pages/app/deploy/deployment';
import { AppDeploymentsPage } from '@pages/app/deployments';
import { AppSettingsPage } from '@pages/app/settings';
import { SettingsPage } from '@pages/settings';
import { FC } from 'react';
import { Route, Routes } from 'react-router';

import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages';

export const App: FC = () => {
    return (
        <div className="w-full max-w-full overflow-y-auto overflow-x-hidden max-h-screen min-h-screen">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="app/:app_id">
                    <Route path="" element={<AppPage />} />
                    <Route path="deployments">
                        <Route path="" element={<AppDeploymentsPage />} />
                        <Route path=":deploy_id" element={<DeploymentPage />} />
                    </Route>
                    <Route path="settings" element={<AppSettingsPage />} />
                </Route>
            </Routes>
        </div>
    );
};

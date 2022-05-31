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
        <div className="w-full max-w-full min-h-screen">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="app/:app_id">
                    <Route path="" element={<AppPage />} />
                    <Route
                        path="deployments"
                        element={<AppDeploymentsPage />}
                    />
                    <Route
                        path="deployment/:deploy_id"
                        element={<DeploymentPage />}
                    />
                    <Route path="settings" element={<AppSettingsPage />} />
                </Route>
            </Routes>
        </div>
    );
};

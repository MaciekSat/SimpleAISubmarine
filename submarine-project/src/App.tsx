import { MainMenu } from './MainMenu.tsx';
import { Dashboard } from './Dashboard.tsx';
import { useState } from 'react';

export default function App() {
    const [active, setActive] = useState('dashboard');

    return (
        <main>
            {active === 'main' && <MainMenu onNext={() => setActive('dashboard')} />}
            {active === 'dashboard' && <Dashboard />}
        </main>
    );
}

import { MainMenu } from './MainMenu.tsx';
import { Dashboard } from './Dashboard.tsx';
import { Simulation } from './sim/Simulation.tsx';
import { useState } from 'react';

export default function App() {
    const [active, setActive] = useState('simulation');

    return (
        <main className="overflow-hidden">
            {active === 'main' && <MainMenu onNext={() => setActive('dashboard')} />}
            {active === 'dashboard' && <Dashboard onNext={() => setActive('simulation')} />}
            {active === 'simulation' && <Simulation />}
        </main>
    );
}

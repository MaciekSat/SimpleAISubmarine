import { Button } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';

import { Submarine } from './Submarine.tsx';
import { Environment } from './Environment.tsx';

export function Simulation() {
    const [labels, setLabels] = useState<string[]>(['10000.00', '0.00', '100000000.00', '5000.00', '20000.00', '10.00']);
    const [measurements, setMeasurements] = useState(['', '', '', '', 0, 0, '', '']);
    const [moduleCrew, setModuleCrew] = useState([0, 0, 0, 0, 0]);

    const environmentRef = useRef<Environment | null>(null);
    const submarineRef = useRef<Submarine | null>(null);

    const initializedRef = useRef(false);

    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        const sky = document.getElementById('sky');
        const ocean = document.getElementById('ocean');

        const environment = new Environment(sky, ocean);
        environmentRef.current = environment;

        const submarine = new Submarine(setLabels);
        submarineRef.current = submarine;

        submarine.spawnSubmarine(document.querySelector('.simulation') as HTMLDivElement);
        submarine.updateStatus(0, 0);

        // Main loop
        let mainLoop = setInterval(
            () => {
                const env = environmentRef.current;
                const sub = submarineRef.current;
                if (!env || !sub) return;

                sub.updateStatus(mainLoop, movementLoop);
                env.updateTimer();
            },
            (60 / 60) * 1000
        ); // 60 FPS

        let movementLoop = setInterval(() => {
            const env = environmentRef.current;
            const sub = submarineRef.current;
            if (!env || !sub) return;

            env.moveEnvironment(sub.speed);
            env.increaseDepth(sub.depth);
            updateMeasurements(env, sub);
        }, 1000 / 60); // 60 FPS
    }, []);

    // console.log(submarineRef.current);

    function updateMeasurements(env: Environment, sub: Submarine) {
        let newMeasurements: [string, string, string, string, number, number, string, string] = ['', '', '', '', 0, 0, '', ''];

        newMeasurements[0] = sub.speed.toFixed(1);
        newMeasurements[1] = sub.maxSpeed.toFixed(1);
        newMeasurements[2] = Math.floor(env.timer / 60)
            .toString()
            .padStart(2, '0');
        newMeasurements[3] = (env.timer % 60).toString().padStart(2, '0');
        newMeasurements[4] = env.days;
        newMeasurements[5] = sub.depth / 10;
        newMeasurements[6] = sub.bank1.toFixed(0);
        newMeasurements[7] = sub.bank2.toFixed(0);

        setMeasurements(newMeasurements);

        let bank1Class: HTMLProgressElement | null = document.querySelector('.bank1');
        let bank2Class: HTMLProgressElement | null = document.querySelector('.bank2');
        if (!bank1Class) return;
        bank1Class.value = sub.bank1;
        if (!bank2Class) return;
        bank2Class.value = sub.bank2;

        let submarineBox: HTMLDivElement | null = document.querySelector('.submarine');
        if (!submarineBox) return;
        submarineBox.style.transform = `translate(-50%, -50%) scale(25%) rotate(${-0.09 * (sub.bank1 - 50) + 0.09 * (sub.bank2 - 50)}deg)`;

        if (sub.depth > 0) {
            sub.depth = 0;
        } else {
            sub.depth += sub.buoyancy * 1.5;
        }
    }

    function setModulesEfficiency(index: number) {
        const submarine = submarineRef.current;
        if (!submarine) return;

        submarine.modulesEfficiency[index] = 1;
    }

    function setCrewCount(index: number, value: number) {
        const submarine = submarineRef.current;
        if (!submarine) return;

        let crewCount: number = submarine.crew;

        let newModuleCrew = [...moduleCrew];

        if (crewCount - value < 0 || crewCount - value > submarine.maxCrew) return;
        if (moduleCrew[index] + value >= 0 && moduleCrew[index] + value <= 3) {
            newModuleCrew[index] += value;
            submarine.crew -= value;
        }
        setModuleCrew(() => newModuleCrew);
        submarine.modulesCrew = newModuleCrew;
    }

    return (
        <section className="simulation fixed h-screen w-screen overflow-hidden bg-slate-900">
            <div id="sky"></div>
            <div id="ocean"></div>
            <div className="absolute flex h-screen w-screen flex-col justify-between">
                <div className="m-4 w-fit rounded-3xl border-2 border-gray-500 bg-gray-600 p-2">
                    <div className="flex flex-col gap-2 font-mono text-green-400 text-shadow-green-500 text-shadow-sm *:rounded-2xl *:border-2 *:border-green-700 *:bg-green-800 *:px-6 *:py-2 *:text-center">
                        <div>Labels</div>
                        <div>Oxygen: {labels[0]} l</div>
                        <div>C02: {labels[1]} l</div>
                        <div>Energy: {labels[2]} W</div>
                        <div>Fuel: {labels[3]} l</div>
                        <div>Food: {labels[4]} kg</div>
                        <div>Crew: {labels[5]} members</div>
                    </div>
                </div>
                <div className="flex w-full gap-1 bg-gray-700 p-2">
                    <div className="flex w-full gap-1 rounded-[calc(var(--radius-3xl)-var(--spacing))] bg-gray-900 p-1 text-white">
                        <div className="grid grid-cols-3 gap-2 rounded-2xl rounded-r-none border-2 border-gray-500 bg-gray-600 p-2">
                            <Button color="dark" onClick={() => setModulesEfficiency(0)}>
                                Co2 scrubber
                            </Button>
                            <Button color="dark" onClick={() => setModulesEfficiency(1)}>
                                Generator
                            </Button>
                            <Button color="dark" onClick={() => setModulesEfficiency(2)}>
                                Reactor
                            </Button>
                            <Button color="dark" onClick={() => setModulesEfficiency(3)}>
                                Control
                            </Button>
                            <Button color="dark" onClick={() => setModulesEfficiency(4)}>
                                Radar
                            </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 border-2 border-gray-500 bg-gray-600 p-2">
                            <div className="flex gap-2">
                                <div>Scrubber crew</div>
                                <Button color="dark" className="flex h-6 w-6 p-0" disabled={!submarineRef.current} onClick={() => setCrewCount(0, -1)}>
                                    -
                                </Button>
                                <div>{moduleCrew[0]}/3</div>
                                <Button color="dark" className="flex h-6 w-6 p-0" disabled={!submarineRef.current} onClick={() => setCrewCount(0, 1)}>
                                    +
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <div>Generator crew</div>
                                <Button color="dark" className="flex h-6 w-6 p-0" disabled={!submarineRef.current} onClick={() => setCrewCount(1, -1)}>
                                    -
                                </Button>
                                <div>{moduleCrew[1]}/3</div>
                                <Button color="dark" className="flex h-6 w-6 p-0" disabled={!submarineRef.current} onClick={() => setCrewCount(1, 1)}>
                                    +
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <div>Reactor crew</div>
                                <Button color="dark" className="flex h-6 w-6 p-0" disabled={!submarineRef.current} onClick={() => setCrewCount(2, -1)}>
                                    -
                                </Button>
                                <div>{moduleCrew[2]}/3</div>
                                <Button color="dark" className="flex h-6 w-6 p-0" disabled={!submarineRef.current} onClick={() => setCrewCount(2, 1)}>
                                    +
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <div>Control crew</div>
                                <Button color="dark" className="flex h-6 w-6 p-0" disabled={!submarineRef.current} onClick={() => setCrewCount(3, -1)}>
                                    -
                                </Button>
                                <div>{moduleCrew[3]}/3</div>
                                <Button color="dark" className="flex h-6 w-6 p-0" disabled={!submarineRef.current} onClick={() => setCrewCount(3, 1)}>
                                    +
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <div>Sensors crew</div>
                                <Button color="dark" className="flex h-6 w-6 p-0" disabled={!submarineRef.current} onClick={() => setCrewCount(4, -1)}>
                                    -
                                </Button>
                                <div>{moduleCrew[4]}/3</div>
                                <Button color="dark" className="flex h-6 w-6 p-0" disabled={!submarineRef.current} onClick={() => setCrewCount(4, 1)}>
                                    +
                                </Button>
                            </div>
                        </div>
                        <div className="grid flex-1 grid-cols-2 gap-2 rounded-2xl rounded-l-none border-2 border-gray-500 bg-gray-600 p-2 text-xl">
                            <div className="flex gap-2">
                                <div>Speed</div>
                                <div>{measurements[0]} knots</div>
                                <div>Max Speed</div>
                                <div>{measurements[1]} knots</div>
                            </div>
                            <div className="flex gap-2">
                                <div>Timer</div>
                                <div>
                                    {measurements[2]}:{measurements[3]}
                                </div>
                                <div>{measurements[4]} days</div>
                            </div>
                            <div className="flex gap-2">
                                <div>Depth</div>
                                <div>{measurements[5]} AMSL</div>
                            </div>
                            <div className="flex gap-2">
                                <div>Bank fill</div>
                                <div>B1: {measurements[6]} %</div>
                                <div>B2: {measurements[7]} %</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

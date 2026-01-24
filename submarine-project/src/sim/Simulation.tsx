import { Button } from 'flowbite-react';

export function Simulation() {
    return (
        <section className="h-screen w-screen bg-slate-900">
            <div className="flex h-screen w-screen flex-col justify-between">
                <div className="m-4 w-fit rounded-3xl border-2 border-gray-500 bg-gray-600 p-2">
                    <div className="flex flex-col gap-2 font-mono text-green-400 text-shadow-green-500 text-shadow-sm *:rounded-2xl *:border-2 *:border-green-700 *:bg-green-800 *:px-6 *:py-2 *:text-center">
                        <div>Labels</div>
                        <div>Oxygen: {10000} l</div>
                        <div>C02: {0} l</div>
                        <div>Energy: {100000000} W</div>
                        <div>Fuel: {5000} l</div>
                        <div>Food: {20000} kg</div>
                        <div>Crew: {10} members</div>
                    </div>
                </div>
                <div className="flex w-full gap-1 bg-gray-700 p-2">
                    <div className="flex w-full gap-1 rounded-[calc(var(--radius-3xl)-var(--spacing))] bg-gray-900 p-1 text-white">
                        <div className="grid grid-cols-3 gap-2 rounded-2xl border-2 border-gray-500 bg-gray-600 p-2">
                            <Button color="dark">Co2 scrubber</Button>
                            <Button color="dark">Generator</Button>
                            <Button color="dark">Reactor</Button>
                            <Button color="dark">Control</Button>
                            <Button color="dark">Radar</Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 rounded-2xl border-2 border-gray-500 bg-gray-600 p-2">
                            <div className="flex gap-2">
                                <div>Scrubber crew</div>
                                <Button color="dark" className="flex h-6 w-6 p-0">
                                    -
                                </Button>
                                <div>{0}/3</div>
                                <Button color="dark" className="h-6 w-6 p-0">
                                    +
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <div>Generator crew</div>
                                <Button color="dark" className="flex h-6 w-6 p-0">
                                    -
                                </Button>
                                <div>{0}/3</div>
                                <Button color="dark" className="h-6 w-6 p-0">
                                    +
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <div>Reactor crew</div>
                                <Button color="dark" className="flex h-6 w-6 p-0">
                                    -
                                </Button>
                                <div>{0}/3</div>
                                <Button color="dark" className="h-6 w-6 p-0">
                                    +
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <div>Control crew</div>
                                <Button color="dark" className="flex h-6 w-6 p-0">
                                    -
                                </Button>
                                <div>{0}/3</div>
                                <Button color="dark" className="h-6 w-6 p-0">
                                    +
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <div>Sensors crew</div>
                                <Button color="dark" className="flex h-6 w-6 p-0">
                                    -
                                </Button>
                                <div>{0}/3</div>
                                <Button color="dark" className="h-6 w-6 p-0">
                                    +
                                </Button>
                            </div>
                        </div>
                        <div className="grid flex-1 grid-cols-2 gap-2 rounded-2xl border-2 border-gray-500 bg-gray-600 p-2 text-xl">
                            <div className="flex gap-2">
                                <div>Speed</div>
                                <div>{0} knots</div>
                                <div>Max Speed</div>
                                <div>{0} knots</div>
                            </div>
                            <div className="flex gap-2">
                                <div>Timer</div>
                                <div>
                                    {12}:{30}
                                </div>
                                <div>{0} days</div>
                            </div>
                            <div className="flex gap-2">
                                <div>Depth</div>
                                <div>{0} AMSL</div>
                            </div>
                            <div className="flex gap-2">
                                <div>Bank fill</div>
                                <div>B1: {0} %</div>
                                <div>B2: {0} %</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

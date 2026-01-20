import { TextInput, Label, Button } from 'flowbite-react';
import { basesList } from './bases.ts';
import { useState } from 'react';

type MainMenuProps = {
    onNext: () => void;
};

type Base = {
    name: string;
    location: string;
    coords: string;
    Distances: number[];
};

export function Dashboard({ onNext }: MainMenuProps) {
    const allBases = Object.values(basesList) as Base[];

    const [tab, setTab] = useState('distance');

    const [startDest, setStartDest] = useState('');
    const [finalDest, setFinalDest] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [activeInput, setActiveInput] = useState<'start' | 'final'>('start');
    const [fullDest, setFullDest] = useState(false);
    const [distanceDispl, setDistance] = useState(0);
    const [missionDur, setMissionDur] = useState(0);

    const [icbBtn, setIcbBtn] = useState('low');
    const [crewCount, setCrewCount] = useState(10);
    const [stlhBtn, setStlhBtn] = useState('vis');

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('Loading ...');

    return (
        <section className={`h-screen w-screen items-center bg-gray-700 ${!loading && 'p-2'}`}>
            {!loading && (
                <div className="mx-auto flex w-7xl flex-col gap-1 rounded-2xl bg-gray-900 p-1">
                    <div className="flex items-center justify-start gap-8 rounded-xl bg-gray-700 p-4 text-3xl text-white">
                        <svg className="h-[48px] w-[48px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                            />
                        </svg>
                        <button className="cursor-pointer" onClick={() => setTab('distance')}>
                            Distance
                        </button>
                        <button className="cursor-pointer" onClick={() => setTab('duration')}>
                            Duration
                        </button>
                        <button className="cursor-pointer" onClick={() => setTab('difficulty')}>
                            Difficulty
                        </button>
                    </div>
                    {tab === 'distance' && (
                        <div className="h-190 rounded-xl bg-gray-700">
                            <div className="p-4">
                                <div className="flex rounded-xl border-2 border-gray-600 bg-gray-800 text-lg text-white">
                                    <div className="flex w-1/2 items-center justify-between border-r border-gray-600 p-3">
                                        <TextInput
                                            placeholder="Start location"
                                            className="w-full"
                                            id="startDest"
                                            onFocus={() => {
                                                if (fullDest && startDest) {
                                                    setFullDest(false);
                                                }
                                                setActiveInput('start');
                                                updateDestinations('');
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                updateDestinations(value);
                                                setStartDest(value);
                                            }}
                                        />
                                        <div className="ml-2 rounded-3xl border border-gray-600 bg-gray-700 p-2.5">
                                            <svg className="h-[18px] w-[18px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex w-1/2 items-center justify-between border-l border-gray-600 p-3">
                                        <TextInput
                                            placeholder="Final destination"
                                            className="w-full"
                                            id="finalDest"
                                            onFocus={() => {
                                                if (fullDest && finalDest) {
                                                    setFullDest(false);
                                                }
                                                setActiveInput('final');
                                                updateDestinations('');
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                updateDestinations(value);
                                                setFinalDest(value);
                                            }}
                                        />
                                        <div className="ml-2 rounded-3xl border border-gray-600 bg-gray-700 p-2.5">
                                            <svg className="h-[18px] w-[18px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {!fullDest && results.length > 0 && (
                                <div className="=mt-1 mx-2 rounded bg-gray-800 p-2 text-white">
                                    {results.map((name, i) => (
                                        <div
                                            key={i}
                                            className="cursor-pointer p-1 hover:bg-gray-600"
                                            onMouseDown={() => {
                                                if (activeInput === 'start') {
                                                    setStartDest(name);
                                                } else {
                                                    setFinalDest(name);
                                                }

                                                const startIndex = allBases.findIndex((b) => b.name === (activeInput === 'start' ? name : startDest));
                                                const finalIndex = allBases.findIndex((b) => b.name === (activeInput === 'final' ? name : finalDest));

                                                if (startIndex !== -1 && finalIndex !== -1) {
                                                    setDistance(allBases[startIndex].Distances[finalIndex]);
                                                    setFullDest(true);
                                                    setResults([]); // hide suggestions
                                                }
                                            }}
                                        >
                                            {activeInput === 'final' && startDest
                                                ? (() => {
                                                      const startIndex = allBases.findIndex((b) => b.name === startDest);
                                                      const finalIndex = allBases.findIndex((b) => b.name === name);
                                                      const distance = startIndex !== -1 && finalIndex !== -1 ? allBases[startIndex].Distances[finalIndex] : 'N/A';
                                                      return `${startDest} -> ${name} : ${distance}`;
                                                  })()
                                                : name}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {fullDest && (
                                <div className="flex flex-col gap-2">
                                    <div className="mx-4 mt-1 flex gap-1 rounded-xl bg-gray-800 p-4 text-white">
                                        <div>{startDest}</div>
                                        <svg className="h-6 w-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>

                                        <div>{finalDest} : Distance</div>
                                        <div>{distanceDispl} nautical miles</div>
                                    </div>
                                    <div>{retrieveBasesInfo()}</div>
                                </div>
                            )}
                        </div>
                    )}
                    {tab === 'duration' && (
                        <div className="h-190 rounded-xl bg-gray-700">
                            <div className="p-4 text-white">{calculateEstDuration(Number(null))}</div>
                            <div className="m-4 mb-10 bg-gray-700">
                                <div className="mb-5 block">
                                    <Label htmlFor="mission-range" className="text-2xl">
                                        Specify mission duration
                                    </Label>
                                </div>
                                <input
                                    onChange={(e) => setMissionDur(Number(e.target.value))}
                                    type="range"
                                    id="mission-range"
                                    min={Math.round(distanceDispl / 25) + 1}
                                    max={Math.round(distanceDispl / 10) - 1}
                                    className="slider rounded-2xl bg-gray-600"
                                />
                            </div>
                            <div>{calculateEstDuration(missionDur)}</div>
                        </div>
                    )}
                    {tab === 'difficulty' && (
                        <div className="h-190 rounded-xl bg-gray-700">
                            <div className="flex h-full flex-col gap-6 p-4 text-white">
                                <div className="flex flex-col gap-3">
                                    <div className="text-4xl">Iceberg intensity</div>
                                    <div className="text-xl">Specifies quantities and distribution of icebergs in the ocean</div>
                                    <div className="flex gap-3">
                                        <Button className="p-7 text-2xl" onClick={() => setIcbBtn('low')} color={icbBtn !== 'low' ? 'dark' : 'default'} outline>
                                            Low
                                        </Button>
                                        <Button className="p-7 text-2xl" onClick={() => setIcbBtn('mid')} color={icbBtn !== 'mid' ? 'dark' : 'default'} outline>
                                            Medium
                                        </Button>
                                        <Button className="p-7 text-2xl" onClick={() => setIcbBtn('high')} color={icbBtn !== 'high' ? 'dark' : 'default'} outline>
                                            High
                                        </Button>
                                        <Button className="p-7 text-2xl" onClick={() => setIcbBtn('extr')} color={icbBtn !== 'extr' ? 'dark' : 'default'} outline>
                                            Extreme
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="text-4xl">Crew members</div>
                                    <div className="text-xl">Specifies number of your crew, the more members you have the more you can assign to modules to boost it’s efficiency at cost of increased oxygen and food usage</div>
                                    <input onChange={(e) => setCrewCount(Number(e.target.value))} type="range" id="mission-range" defaultValue={10} min={5} max={20} className="slider rounded-2xl bg-gray-600" />
                                    <div className="text-xl">Crew count : {crewCount}</div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="text-4xl">Stealth requirements</div>
                                    <div className="text-xl">Specifies how stealthy your submarine should behave, including resurface, radar usage and speed limits</div>
                                    <div className="flex gap-3">
                                        <Button className="p-7 text-2xl" onClick={() => setStlhBtn('vis')} color={stlhBtn !== 'vis' ? 'dark' : 'default'} outline>
                                            Visible
                                        </Button>
                                        <Button className="p-7 text-2xl" onClick={() => setStlhBtn('caut')} color={stlhBtn !== 'caut' ? 'dark' : 'default'} outline>
                                            Cautious
                                        </Button>
                                        <Button className="p-7 text-2xl" onClick={() => setStlhBtn('stlh')} color={stlhBtn !== 'stlh' ? 'dark' : 'default'} outline>
                                            Stealth
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex w-full flex-1 items-end justify-end p-2">
                                    <Button className="flex items-center p-7 text-2xl" onClick={loadingScreen} color="dark" outline>
                                        <div>Start the operation</div>
                                        <svg className="h-8 w-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {loading && (
                <div className="bg-[url(/img/Submarine.jpg)] bg-cover bg-center">
                    <div className={`flex h-screen w-screen items-center justify-center text-7xl text-white ${loadingText !== 'Happy voyage!' ? 'backdrop-blur-sm' : ''}`}>{loadingText}</div>
                </div>
            )}
        </section>
    );

    function updateDestinations(query: string) {
        const q = query.toLowerCase().trim();

        const matches = q === '' ? allBases.map((b) => b.name) : allBases.filter((b) => b.name && b.name.toLowerCase().includes(q)).map((b) => b.name);

        setResults(matches); // store only the actual names
    }

    function retrieveBasesInfo() {
        const startIndex = allBases.findIndex((b) => b.name === startDest);
        const finalIndex = allBases.findIndex((b) => b.name === finalDest);

        return (
            <div className="mx-4 flex justify-evenly gap-4 rounded-2xl bg-gray-800 p-4 text-2xl text-gray-400">
                <div className="flex w-1/2 flex-col gap-8">
                    <div>
                        <span className="text-white">Codebase:</span> {allBases[startIndex].name}
                    </div>
                    <div>
                        <span className="text-white">Location:</span> {allBases[startIndex].location}
                    </div>
                    <div>
                        <span className="text-white">Coords:</span> {allBases[startIndex].coords}
                    </div>
                </div>
                <div className="flex w-1/2 flex-col gap-8">
                    <div>
                        <span className="text-white">Codebase:</span> {allBases[finalIndex].name}
                    </div>
                    <div>
                        <span className="text-white">Location:</span> {allBases[finalIndex].location}
                    </div>
                    <div>
                        <span className="text-white">Coords:</span> {allBases[finalIndex].coords}
                    </div>
                </div>
            </div>
        );
    }

    function calculateEstDuration(time: number) {
        if (time === null) {
            // const distance = distanceDispl;
            const maxSpeed = distanceDispl / 25;
            const maxDays = (maxSpeed - (maxSpeed % 24)) / 24;
            const maxHours = Math.round(maxSpeed % 24);

            const minSpeed = distanceDispl / 10;
            const minDays = (minSpeed - (minSpeed % 24)) / 24;
            const minHours = Math.round(minSpeed % 24);

            return (
                <div className="flex justify-evenly gap-4 text-3xl">
                    <div className="flex w-1/2 flex-col gap-2">
                        <div>Estimated time on highest velocity</div>
                        <div className="flex gap-4 rounded-2xl border-2 border-gray-600 bg-gray-800">
                            <div className="w-1/3 p-4">{maxDays} Days</div>
                            <div className="w-1/3 p-4">{maxHours} Hours</div>
                            <div className="w-1/3 border-l-2 border-gray-600 p-4">{25} knots</div>
                        </div>
                    </div>
                    <div className="flex w-1/2 flex-col gap-2">
                        <div>Estimated time on lowest velocity</div>
                        <div className="flex gap-4 rounded-2xl border-2 border-gray-600 bg-gray-800">
                            <div className="w-1/3 p-4">{minDays} Days</div>
                            <div className="w-1/3 p-4">{minHours} Hours</div>
                            <div className="w-1/3 border-l-2 border-gray-600 p-4">{10} knots</div>
                        </div>
                    </div>
                </div>
            );
        } else {
            const days = (time - (time % 24)) / 24;
            const hours = Math.round(time % 24);
            return (
                <div className="m-4 flex flex-col gap-4 rounded-2xl bg-gray-800 p-4 text-4xl text-gray-400">
                    <div>
                        Operational time : {days} days {hours} hours
                    </div>
                    <div>Advised average speed : {Math.round(distanceDispl / time)} knots</div>
                </div>
            );
        }
    }

    function loadingScreen() {
        setLoading(true);
        setTimeout(() => setLoadingText('Happy voyage!'), 10000);
        setTimeout(() => onNext(), 15000);
    }
}

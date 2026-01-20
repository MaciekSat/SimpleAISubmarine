import { Button } from 'flowbite-react';

type MainMenuProps = {
    onNext: () => void;
};

export function MainMenu({ onNext }: MainMenuProps) {
    return (
        <section className="flex h-screen w-screen items-center bg-[url(/img/EarthRoute.png)] bg-cover bg-center px-4 py-8">
            <figure className="mx-auto max-w-5xl flex-col gap-y-3 text-center">
                <blockquote className="m-16">
                    <p className="text-8xl font-medium text-white">AI operated submarine project</p>
                </blockquote>
                <div className="flex justify-center">
                    <Button className="flex items-center p-7 text-2xl" onClick={onNext} color="light">
                        <div>Head to planning operation</div>
                        <svg className="h-12 w-12 p-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                        </svg>
                    </Button>
                </div>
            </figure>
        </section>
    );
}

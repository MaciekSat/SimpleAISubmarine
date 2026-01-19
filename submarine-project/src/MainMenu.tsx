type MainMenuProps = {
    onNext: () => void;
};

export function MainMenu({ onNext }: MainMenuProps) {
    return (
        <section className="flex h-screen w-screen items-center bg-[url(/img/EarthRoute.png)] bg-cover bg-center px-4 py-8">
            <figure className="mx-auto max-w-5xl flex-col gap-y-3 text-center">
                <blockquote className="m-16">
                    <p className="text-8xl font-medium text-white">
                        AI operated submarine project
                    </p>
                </blockquote>
                <button
                    className="mx-auto flex w-md cursor-pointer items-center justify-around rounded-2xl p-4 text-white hover:bg-slate-900"
                    onClick={onNext}
                >
                    <p className="flex items-center text-3xl font-light">
                        Head to planning operations
                    </p>
                    <svg
                        className="flex h-9 w-9 items-center"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                    </svg>
                </button>
            </figure>
        </section>
    );
}

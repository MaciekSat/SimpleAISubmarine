/** @type {import('prettier').Config} */
export default {
    plugins: ['prettier-plugin-tailwindcss'],
    // tailwindcss
    tailwindAttributes: ['theme'],
    tailwindFunctions: ['twMerge', 'createTheme'],
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    printWidth: 160,
};

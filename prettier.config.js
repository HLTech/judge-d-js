module.exports = {
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'es5',
    overrides: [
        {
            files: ['.github/**/*.yml'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};

module.exports = {
    overrides: [
        {
            files: ['*.js', '*.ts'],
            extends: 'eslint-config-love',
            parserOptions: {
                project: './tsconfig.json'
            },
            
        }
    ]
}
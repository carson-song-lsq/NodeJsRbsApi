module.exports = {
    projects: [
        {
            displayName: 'test',
            testEnvironment: 'node' // Your main Jest test environment
        },
        {
            displayName: 'lint',
            runner: 'jest-runner-eslint',
            testMatch: ['/tests/**/*.test.js'], // Specify files to lint
        }
    ]
};
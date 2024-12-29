module.exports = {
    testEnvironment: 'jsdom', // Simulates a browser environment
    moduleNameMapper: {
        "^react-router-dom$": "<rootDir>/node_modules/react-router-dom",
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Runs before every test
    moduleDirectories: ['node_modules', 'src'], // Simplifies imports
};
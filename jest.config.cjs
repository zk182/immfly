module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFiles: ['<rootDir>/src/tests/setup.ts'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/']
};

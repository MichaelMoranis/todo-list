module.exports = {
    // preset: 'vite-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/.jest/setup-test.ts'],
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: [
        "/node_modules/"
      ],
      moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  };
  
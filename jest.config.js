/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './junit',
        outputName: 'junit-TEST.xml',
      },
    ],
  ],
  "transform": {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "coverageReporters": ["json", "lcov", "text", "clover", "cobertura"],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 80,
      functions: 80,
      lines: 70,
    },
  }
  // setupFiles: ['./jest.setup-file.ts'],
}
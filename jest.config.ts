import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const customConfig: Config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testMatch: ['<rootDir>/tests/unit/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^framer-motion$': '<rootDir>/src/__mocks__/framer-motion.tsx',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/__mocks__/**',
    '!src/app/layout.tsx',
    '!src/app/icon.tsx',
    '!src/app/robots.ts',
    '!src/app/sitemap.ts',
  ],
  coverageThreshold: {
    global: { statements: 80 },
  },
}

export default createJestConfig(customConfig as Parameters<typeof createJestConfig>[0])

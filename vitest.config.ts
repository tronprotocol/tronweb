import { defineConfig } from 'vitest/config';
import path from 'node:path';

// Always resolve the test SUT entry (`../setup/TronWeb.js`) to the TypeScript
// source re-export, never to a stale generated `test/setup/TronWeb.js` shim
// (which the old mocha flow pointed at the webpack `dist/` bundle). This
// guarantees tests exercise `src`, not a prebuilt bundle.
const sutEntry = path.resolve(import.meta.dirname, 'test/setup/TronWeb.ts');

export default defineConfig({
    resolve: {
        alias: [{ find: /^(?:\.\.?\/)+setup\/TronWeb\.js$/, replacement: sutEntry }],
    },
    test: {
        coverage: {
            provider: 'v8',
            include: ['src/**'],
            exclude: [
                'src/protocol/**',
                'src/types/**',
                'src/utils/fragments.ts',
                'src/utils/interface.ts',
                'test/**',
                'scripts/**',
            ],
            reporter: ['text', 'html'],
        },
        projects: [
            {
                extends: true,
                test: {
                    name: 'node',
                    globals: true,
                    environment: 'node',
                    include: ['test/**/*.test.ts'],
                    testTimeout: 120000,
                    hookTimeout: 120000,
                    fileParallelism: false,
                    pool: 'forks',
                    poolOptions: { forks: { singleFork: true } },
                    globalSetup: ['./test/setup/globalSetup.ts'],
                },
            },
        ],
    },
});

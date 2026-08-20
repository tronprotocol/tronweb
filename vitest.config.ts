import { defineConfig } from 'vitest/config';
import path from 'node:path';

// Always resolve the test SUT entry (`../setup/TronWeb.js`) to the TypeScript
// source re-export, never to a stale generated `test/setup/TronWeb.js` shim
// (which the old mocha flow pointed at the webpack `dist/` bundle). This
// guarantees tests exercise `src`, not a prebuilt bundle.
const sutEntry = path.resolve(import.meta.dirname, 'test/setup/TronWeb.ts');

// Node test config. The browser project lives in its own standalone config
// (`vitest.browser.config.ts`) because browser-only vite settings — process
// stubs via `define`, node-builtin polyfills, the protocol `.cjs`→ESM and
// Buffer plugins — must NOT apply to the node run (they break it), and vitest
// does not apply per-project `define` to browser bundling. Two separate config
// files keep the two environments cleanly isolated.
export default defineConfig({
    resolve: {
        alias: [{ find: /^(?:\.\.?\/)+setup\/TronWeb\.js$/, replacement: sutEntry }],
    },
    test: {
        globals: true,
        environment: 'node',
        include: ['test/**/*.test.ts'],
        testTimeout: 120000,
        hookTimeout: 120000,
        pool: 'forks',
        globalSetup: ['./test/setup/globalSetup.ts'],
        coverage: {
            provider: 'v8',
            // Restrict to TS sources: vitest globs untested files with `dot: true`,
            // so a bare `src/**` also picks up binary junk like `src/.DS_Store`
            // and fails to parse it when synthesizing 0%-coverage entries.
            include: ['src/**/*.ts'],
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
    },
});

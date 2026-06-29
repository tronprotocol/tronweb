import { defineConfig } from 'vitest/config';
import path from 'node:path';

// Always resolve the test SUT entry (`../setup/TronWeb.js`) to the TypeScript
// source re-export, never to a stale generated `test/setup/TronWeb.js` shim
// (which the old mocha flow pointed at the webpack `dist/` bundle). This
// guarantees tests exercise `src`, not a prebuilt bundle.
const sutEntry = path.resolve(import.meta.dirname, 'test/setup/TronWeb.ts');

export default defineConfig({
    resolve: {
        alias: [
            { find: /^(?:\.\.?\/)+setup\/TronWeb\.js$/, replacement: sutEntry },
            // Browser polyfill: replace Node's `querystring` with the browser-compatible shim
            { find: 'querystring', replacement: 'querystring-es3' },
        ],
    },
    define: {
        // Expose the two env vars that test helpers read at runtime (browser has no process.env)
        'process.env.PRIVATE_KEY': JSON.stringify(process.env.PRIVATE_KEY ?? ''),
        'process.env.HOST_PORT': JSON.stringify(process.env.HOST_PORT ?? ''),
        // Vite's browser transform strips process.env.* (above) but leaves other
        // process.* references bare. Stub the ones the test helpers use:
        //   - process.stdout.write (chalk / waitChainData.ts logging)
        //   - process.platform (chalk level detection)
        //   - process.env.TERM (chalk color support)
        'process.stdout': '({ write: () => {}, isTTY: false })',
        'process.platform': JSON.stringify('browser'),
        'process.env.TERM': JSON.stringify(''),
    },
    // The pre-generated google-protobuf `.cjs` files (in src/protocol/) use `require()`.
    // Vite's dep optimizer handles node_modules CJS→ESM automatically, but for local
    // `.cjs` source files it does not. We solve this with:
    //   1. optimizeDeps.include: pre-bundle google-protobuf and its sub-files
    //   2. A transform plugin that converts local `.cjs` files to ESM by:
    //      - Extracting `require(...)` calls and converting them to ESM imports
    //      - Wrapping the CJS body in a factory that provides `module`/`exports`
    //      - Exporting `module.exports` as the default
    //   This is equivalent to webpack's `{ test: /\.cjs$/, type: 'javascript/auto' }` rule.
    //
    // Buffer polyfill: some tests use `Buffer` directly (Node.js global not available in
    // browsers). The `buffer` npm package provides a browser-compatible implementation.
    // We pre-bundle it and inject it as a global via the plugin below.
    optimizeDeps: {
        include: [
            'google-protobuf',
            'google-protobuf/google/protobuf/any_pb.js',
            'buffer',
        ],
    },
    plugins: [
        {
            name: 'vitest-browser-cjs-protocol',
            enforce: 'pre',
            transform(code, id) {
                // Only handle local (non-node_modules) .cjs files
                if (!id.endsWith('.cjs') || id.includes('node_modules')) return null;

                // Extract all require() calls, convert to ESM imports.
                // These files have the form:  var <name> = require('<specifier>');
                const requireRe = /^var\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\);$/gm;
                const imports: string[] = [];
                const seen = new Set<string>();
                let match: RegExpExecArray | null;
                while ((match = requireRe.exec(code)) !== null) {
                    const [, varName, specifier] = match;
                    if (!seen.has(specifier)) {
                        seen.add(specifier);
                        imports.push(`import ${varName} from ${JSON.stringify(specifier)};`);
                    }
                }

                // Remove all `var <name> = require(...)` lines from the code body
                const body = code.replace(/^var\s+\w+\s*=\s*require\(['"][^'"]+['"]\);$/gm, '');

                // Provide CJS globals (module, exports) and run the body
                const esm = [
                    ...imports,
                    '',
                    'var module = { exports: {} };',
                    'var exports = module.exports;',
                    '',
                    body,
                    '',
                    'export default module.exports;',
                ].join('\n');

                return { code: esm, map: null };
            },
        },
        {
            // Inject Buffer global into every test file so tests that call `Buffer.from(...)`
            // directly (a Node.js global) work in the browser context.
            name: 'vitest-browser-buffer-global',
            enforce: 'pre',
            transform(code, id) {
                // Only inject into test files (not src, not node_modules, not .cjs protocol)
                if (!id.includes('/test/') || id.includes('node_modules') || id.endsWith('.cjs')) {
                    return null;
                }
                return {
                    code: `import { Buffer } from 'buffer';\nglobalThis.Buffer = Buffer;\n${code}`,
                    map: null,
                };
            },
        },
    ],
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
            {
                extends: true,
                test: {
                    name: 'browser',
                    globals: true,
                    include: ['test/**/*.test.ts'],
                    exclude: [
                        // ABI/typed-data encoding relies on Node internals (ethers/ABI codegen)
                        'test/utils/abi.test.ts',
                        'test/utils/typedData.test.ts',
                        // Uses disk-utils (fs/path/zlib) to load test fixtures — Node-only APIs
                        'test/utils/address.test.ts',
                    ],
                    testTimeout: 120000,
                    hookTimeout: 120000,
                    // Run test files one at a time: the integration tests are very long
                    // (up to 4+ minutes each) and running them concurrently causes the
                    // chromium browser connection to time out and crash.
                    fileParallelism: false,
                    globalSetup: ['./test/setup/globalSetup.ts'],
                    browser: {
                        enabled: true,
                        provider: 'playwright',
                        headless: true,
                        instances: [{ browser: 'chromium' }],
                    },
                },
            },
        ],
    },
});

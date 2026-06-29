import { defineConfig } from 'vitest/config';
import path from 'node:path';

// Standalone browser-mode config (chromium via playwright). Kept separate from
// the node config so its browser-only vite settings (process stubs, polyfills,
// the protocol `.cjs`→ESM and Buffer plugins) never apply to the node run.
const sutEntry = path.resolve(import.meta.dirname, 'test/setup/TronWeb.ts');

export default defineConfig({
    resolve: {
        alias: [
            // Same SUT→src guard as the node config (resolve `../setup/TronWeb.js` to source).
            { find: /^(?:\.\.?\/)+setup\/TronWeb\.js$/, replacement: sutEntry },
            // Browser polyfill: replace Node's `querystring` with the browser-compatible shim.
            { find: 'querystring', replacement: 'querystring-es3' },
        ],
    },
    define: {
        // Expose the two env vars the test helpers read at runtime (browser has no process.env).
        'process.env.PRIVATE_KEY': JSON.stringify(process.env.PRIVATE_KEY ?? ''),
        'process.env.HOST_PORT': JSON.stringify(process.env.HOST_PORT ?? ''),
        // Stub the bare `process.*` references the test helpers use (chalk / waitChainData.ts).
        'process.stdout': '({ write: () => {}, isTTY: false })',
        'process.platform': JSON.stringify('browser'),
        'process.env.TERM': JSON.stringify(''),
    },
    // The pre-generated google-protobuf `.cjs` files (src/protocol/) use require().
    // Pre-bundle google-protobuf + buffer for the browser; the cjs-protocol plugin
    // below converts the LOCAL `.cjs` files to ESM.
    optimizeDeps: {
        include: ['google-protobuf', 'google-protobuf/google/protobuf/any_pb.js', 'buffer'],
    },
    plugins: [
        {
            // Convert local (non-node_modules) `.cjs` protocol files to ESM —
            // equivalent to webpack's `{ test: /\.cjs$/, type: 'javascript/auto' }` rule.
            name: 'vitest-browser-cjs-protocol',
            enforce: 'pre',
            transform(code, id) {
                if (!id.endsWith('.cjs') || id.includes('node_modules')) return null;

                // Extract `var <name> = require('<specifier>');` lines → ESM imports.
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

                const body = code.replace(/^var\s+\w+\s*=\s*require\(['"][^'"]+['"]\);$/gm, '');

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
        // Run test files one at a time: the integration tests are very long and
        // running them concurrently causes the chromium connection to time out.
        fileParallelism: false,
        globalSetup: ['./test/setup/globalSetup.ts'],
        browser: {
            enabled: true,
            provider: 'playwright',
            headless: true,
            instances: [{ browser: 'chromium' }],
        },
    },
});

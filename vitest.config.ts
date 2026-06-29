import { defineConfig } from 'vitest/config';

export default defineConfig({
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

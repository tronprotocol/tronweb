import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['test/**/*.test.ts'],
        testTimeout: 120000,
        hookTimeout: 120000,
        fileParallelism: false,
        pool: 'forks',
        poolOptions: { forks: { singleFork: true } },
    },
});

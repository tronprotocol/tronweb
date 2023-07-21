import HttpProvider from './HttpProvider.js';
export interface Providers {
    HttpProvider: typeof HttpProvider;
}
export default {
    HttpProvider,
} as Providers;

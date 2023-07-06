import HttpProvider from './HttpProvider';
export interface Providers {
    HttpProvider: typeof HttpProvider;
}
export default {
    HttpProvider,
} as Providers;

import HttpProvider from './HttpProvider.js';
export interface Providers {
    HttpProvider: typeof HttpProvider;
}
export const providers: Providers = { HttpProvider };
export { HttpProvider };

declare function parseInt(string: string | number, radix?: number | undefined): number;
declare type Optional<T> = {
    [k in keyof T]?: T[k];
};

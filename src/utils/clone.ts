export interface ClonePlainDataOptions {
    /** Name of the root value; error paths start with it (`transaction.raw_data.contract[0]`). */
    root: string;
    /** Builds the error thrown for a value that cannot be cloned. */
    invalid: (reason: string, path: string) => Error;
    /** Copy `Uint8Array` values into fresh `Uint8Array`s instead of rejecting them. */
    bytes?: boolean;
}

/**
 * Deep-clones JSON-shaped data — primitives, `bigint`, arrays and plain objects, plus
 * `Uint8Array` when `bytes` is set — into fresh plain objects and arrays. Unlike a JSON
 * round-trip it keeps `bigint` and `undefined` values as they are.
 *
 * Anything else (functions, symbols, class instances, `Date`, `Map`, ...), circular
 * references and nesting deeper than `MAX_DEPTH` levels are rejected with the error built
 * by `options.invalid(reason, path)`. Values from another realm (an iframe, a vm context)
 * are accepted like local ones.
 */
export function clonePlainData<T>(value: T, options: ClonePlainDataOptions): T {
    return clone(value, options.root, 1, new Set(), options) as T;
}

/**
 * Deep-clones a transaction into fresh plain objects and arrays. Unlike a JSON round-trip
 * it keeps `bigint` and `undefined` values as they are.
 *
 * Transaction data is JSON-shaped plus `bigint`: primitives, arrays and plain objects.
 * Anything else (functions, symbols, `Date`, `Map`, typed arrays, ...) and circular
 * references are rejected with `Invalid transaction provided: <reason> at <path>`.
 */
export function cloneTransaction<T>(transaction: T): T {
    return clonePlainData(transaction, {
        root: 'transaction',
        invalid: (reason, path) => new Error(`Invalid transaction provided: ${reason} at ${path}`),
    });
}

/** Objects and arrays are copied up to this many levels deep, the root counting as one. */
const MAX_DEPTH = 64;

function clone(value: unknown, path: string, depth: number, ancestors: Set<object>, options: ClonePlainDataOptions): unknown {
    switch (typeof value) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'bigint':
        case 'undefined':
            return value;
        case 'object':
            if (value === null) return null;
            break;
        default:
            // function, symbol
            throw options.invalid(`unsupported ${typeof value}`, path);
    }

    const isArray = Array.isArray(value);
    if (!isArray) {
        const tag = Object.prototype.toString.call(value);
        if (options.bytes && ArrayBuffer.isView(value) && tag === '[object Uint8Array]') {
            return new Uint8Array(value as Uint8Array);
        }
        if (tag !== '[object Object]') {
            throw options.invalid(`unsupported ${tag.slice(8, -1)}`, path);
        }
        if (!isPlainObject(value)) {
            throw options.invalid('not a plain object', path);
        }
    }

    if (depth > MAX_DEPTH) {
        throw options.invalid(`nesting deeper than ${MAX_DEPTH} levels`, path);
    }
    if (ancestors.has(value)) {
        throw options.invalid('circular reference', path);
    }
    ancestors.add(value);

    let copy: unknown;
    if (isArray) {
        const source = value as unknown[];
        const out: unknown[] = [];
        for (let i = 0, length = source.length; i < length; i++) {
            out.push(clone(source[i], `${path}[${i}]`, depth + 1, ancestors, options));
        }
        copy = out;
    } else {
        const source = value as Record<string, unknown>;
        const out: Record<string, unknown> = {};
        for (const key of Object.keys(source)) {
            const item = clone(source[key], `${path}.${key}`, depth + 1, ancestors, options);
            if (key === '__proto__') {
                // Assigning an own `__proto__` key would re-target the copy's prototype instead
                // of adding a data property. Define it so it stays a key of the copy, as it was
                // of the source (typed-data `types` may name a struct `__proto__`).
                Object.defineProperty(out, key, { value: item, writable: true, enumerable: true, configurable: true });
            } else {
                out[key] = item;
            }
        }
        copy = out;
    }

    ancestors.delete(value);
    return copy;
}

// A plain object's prototype is `null` or a realm's `Object.prototype`, which has no
// prototype of its own. Checked by shape rather than against this realm's `Object.prototype`
// so that objects from another realm (an iframe, a vm context) are recognised too.
function isPlainObject(value: object): boolean {
    const proto = Object.getPrototypeOf(value);
    return proto === null || Object.getPrototypeOf(proto) === null;
}

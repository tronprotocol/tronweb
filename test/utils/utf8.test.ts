import { describe, expect, it } from 'vitest';
import { bytesToString } from '../../src/utils/bytes.js';
import { bin2String, stringToBytes } from '../../src/utils/code.js';

const strings = [
    '',
    'ASCII\0\n',
    '\u007f',
    '\u0080',
    '\u0100',
    '\u07ff',
    '\u0800',
    '中文',
    'привет',
    'Ελλάδα',
    '😀',
    '\u{10000}',
    '\u{10ffff}',
    'a😀б中\0z',
];

describe('UTF-8 utility conversions', () => {
    it.each(strings)('encodes %j as standard UTF-8', (text) => {
        expect(stringToBytes(text)).toEqual(Array.from(new TextEncoder().encode(text)));
    });

    it.each(strings)('decodes UTF-8 for %j', (text) => {
        const encoded = new TextEncoder().encode(text);
        expect(bytesToString(encoded)).toBe(text);
        expect(bytesToString(Array.from(encoded))).toBe(text);
        expect(bin2String(encoded)).toBe(text);
    });

    it('round trips valid code points across the Unicode range', () => {
        for (let point = 0; point <= 0x10ffff; point += 997) {
            if (point >= 0xd800 && point <= 0xdfff) continue;
            const text = String.fromCodePoint(point);
            const encoded = stringToBytes(text);
            expect(encoded).toEqual(Array.from(new TextEncoder().encode(text)));
            expect(bytesToString(encoded)).toBe(text);
        }
    });

    it('preserves the legacy handling of code-unit arrays', () => {
        expect(bytesToString([1178, 2112, 1087, 969])).toBe('Қࡀпω');
    });
});

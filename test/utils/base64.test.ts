import { assert } from 'vitest';
import { Base64 } from '../../src/utils/base64.js';

// Reference encoders built on btoa/TextEncoder (not Node's Buffer) so this
// suite also runs in the browser project.
const bytesOf = (s: string) => Array.from(s, (c) => c.charCodeAt(0));
const bytesToBase64 = (bytes: ArrayLike<number>) => btoa(String.fromCharCode(...Array.from(bytes)));
const utf8Latin1 = (s: string) => String.fromCharCode(...new TextEncoder().encode(s));

describe('utils.base64', function () {
    const b64 = new Base64();

    describe('#encode()', function () {
        it('should match the standard encoding for every padding length', function () {
            for (const s of ['', 'a', 'ab', 'abc', 'abcd', 'hello world']) {
                assert.equal(b64.encode(s), btoa(s));
            }
        });
    });

    describe('#encodeIgnoreUtf8()', function () {
        it('should encode raw bytes, including values above 0x7f', function () {
            const bytes = [0x00, 0xff, 0x10, 0x80, 0x7f];
            for (let n = 0; n <= bytes.length; n++) {
                const slice = bytes.slice(0, n);
                assert.equal(b64.encodeIgnoreUtf8(slice), bytesToBase64(slice));
            }
        });
    });

    describe('#decode()', function () {
        it('should round-trip ascii input', function () {
            for (const s of ['a', 'ab', 'abc', 'TRON network']) {
                assert.equal(b64.decode(btoa(s)), s);
            }
        });

        it('should utf8-decode two- and three-byte sequences', function () {
            const s = 'é中文';
            assert.equal(b64.decode(btoa(utf8Latin1(s))), s);
        });

        it('should ignore characters outside the base64 alphabet', function () {
            assert.equal(b64.decode('aGVs\nbG8=*'), 'hello');
        });
    });

    describe('#decodeToByteArray()', function () {
        it('should return the raw decoded bytes', function () {
            const bytes = [0x00, 0xff, 0x10, 0x80];
            assert.deepEqual(b64.decodeToByteArray(bytesToBase64(bytes)), bytes);
            assert.deepEqual(b64.decodeToByteArray('YWI='), bytesOf('ab'));
        });
    });

    describe('#_utf8_encode()', function () {
        it('should produce utf8 byte strings and normalise CRLF', function () {
            assert.equal(b64._utf8_encode('a\r\nb'), 'a\nb');
            assert.equal(b64._utf8_encode('é'), utf8Latin1('é'));
            assert.equal(b64._utf8_encode('中'), utf8Latin1('中'));
        });
    });
});

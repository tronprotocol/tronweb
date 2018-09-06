webpackHotUpdate(4,{

/***/ "../node_modules/aes-js/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function(root) {

    function checkInt(value) {
        return (parseInt(value) === value);
    }

    function checkInts(arrayish) {
        if (!checkInt(arrayish.length)) { return false; }

        for (var i = 0; i < arrayish.length; i++) {
            if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
                return false;
            }
        }

        return true;
    }

    function coerceArray(arg, copy) {

        // ArrayBuffer view
        if (arg.buffer && ArrayBuffer.isView(arg) && arg.name === 'Uint8Array') {

            if (copy) {
                if (arg.slice) {
                    arg = arg.slice();
                } else {
                    arg = Array.prototype.slice.call(arg);
                }
            }

            return arg;
        }

        // It's an array; check it is a valid representation of a byte
        if (Array.isArray(arg)) {
            if (!checkInts(arg)) {
                throw new Error('Array contains invalid value: ' + arg);
            }

            return new Uint8Array(arg);
        }

        // Something else, but behaves like an array (maybe a Buffer? Arguments?)
        if (checkInt(arg.length) && checkInts(arg)) {
            return new Uint8Array(arg);
        }

        throw new Error('unsupported array-like object');
    }

    function createArray(length) {
        return new Uint8Array(length);
    }

    function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
        if (sourceStart != null || sourceEnd != null) {
            if (sourceArray.slice) {
                sourceArray = sourceArray.slice(sourceStart, sourceEnd);
            } else {
                sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
            }
        }
        targetArray.set(sourceArray, targetStart);
    }



    var convertUtf8 = (function() {
        function toBytes(text) {
            var result = [], i = 0;
            text = encodeURI(text);
            while (i < text.length) {
                var c = text.charCodeAt(i++);

                // if it is a % sign, encode the following 2 bytes as a hex value
                if (c === 37) {
                    result.push(parseInt(text.substr(i, 2), 16))
                    i += 2;

                // otherwise, just the actual byte
                } else {
                    result.push(c)
                }
            }

            return coerceArray(result);
        }

        function fromBytes(bytes) {
            var result = [], i = 0;

            while (i < bytes.length) {
                var c = bytes[i];

                if (c < 128) {
                    result.push(String.fromCharCode(c));
                    i++;
                } else if (c > 191 && c < 224) {
                    result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
                    i += 2;
                } else {
                    result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
                    i += 3;
                }
            }

            return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();

    var convertHex = (function() {
        function toBytes(text) {
            var result = [];
            for (var i = 0; i < text.length; i += 2) {
                result.push(parseInt(text.substr(i, 2), 16));
            }

            return result;
        }

        // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
        var Hex = '0123456789abcdef';

        function fromBytes(bytes) {
                var result = [];
                for (var i = 0; i < bytes.length; i++) {
                    var v = bytes[i];
                    result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
                }
                return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();


    // Number of rounds by keysize
    var numberOfRounds = {16: 10, 24: 12, 32: 14}

    // Round constant words
    var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

    // S-box and Inverse S-box (S is for Substitution)
    var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
    var Si =[0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];

    // Transformations for encryption
    var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
    var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
    var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
    var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];

    // Transformations for decryption
    var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
    var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
    var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
    var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];

    // Transformations for decryption key expansion
    var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
    var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
    var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
    var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];

    function convertToInt32(bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 4) {
            result.push(
                (bytes[i    ] << 24) |
                (bytes[i + 1] << 16) |
                (bytes[i + 2] <<  8) |
                 bytes[i + 3]
            );
        }
        return result;
    }

    var AES = function(key) {
        if (!(this instanceof AES)) {
            throw Error('AES must be instanitated with `new`');
        }

        Object.defineProperty(this, 'key', {
            value: coerceArray(key, true)
        });

        this._prepare();
    }


    AES.prototype._prepare = function() {

        var rounds = numberOfRounds[this.key.length];
        if (rounds == null) {
            throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
        }

        // encryption round keys
        this._Ke = [];

        // decryption round keys
        this._Kd = [];

        for (var i = 0; i <= rounds; i++) {
            this._Ke.push([0, 0, 0, 0]);
            this._Kd.push([0, 0, 0, 0]);
        }

        var roundKeyCount = (rounds + 1) * 4;
        var KC = this.key.length / 4;

        // convert the key into ints
        var tk = convertToInt32(this.key);

        // copy values into round key arrays
        var index;
        for (var i = 0; i < KC; i++) {
            index = i >> 2;
            this._Ke[index][i % 4] = tk[i];
            this._Kd[rounds - index][i % 4] = tk[i];
        }

        // key expansion (fips-197 section 5.2)
        var rconpointer = 0;
        var t = KC, tt;
        while (t < roundKeyCount) {
            tt = tk[KC - 1];
            tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
                      (S[(tt >>  8) & 0xFF] << 16) ^
                      (S[ tt        & 0xFF] <<  8) ^
                       S[(tt >> 24) & 0xFF]        ^
                      (rcon[rconpointer] << 24));
            rconpointer += 1;

            // key expansion (for non-256 bit)
            if (KC != 8) {
                for (var i = 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }

            // key expansion for 256-bit keys is "slightly different" (fips-197)
            } else {
                for (var i = 1; i < (KC / 2); i++) {
                    tk[i] ^= tk[i - 1];
                }
                tt = tk[(KC / 2) - 1];

                tk[KC / 2] ^= (S[ tt        & 0xFF]        ^
                              (S[(tt >>  8) & 0xFF] <<  8) ^
                              (S[(tt >> 16) & 0xFF] << 16) ^
                              (S[(tt >> 24) & 0xFF] << 24));

                for (var i = (KC / 2) + 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }
            }

            // copy values into round key arrays
            var i = 0, r, c;
            while (i < KC && t < roundKeyCount) {
                r = t >> 2;
                c = t % 4;
                this._Ke[r][c] = tk[i];
                this._Kd[rounds - r][c] = tk[i++];
                t++;
            }
        }

        // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
        for (var r = 1; r < rounds; r++) {
            for (var c = 0; c < 4; c++) {
                tt = this._Kd[r][c];
                this._Kd[r][c] = (U1[(tt >> 24) & 0xFF] ^
                                  U2[(tt >> 16) & 0xFF] ^
                                  U3[(tt >>  8) & 0xFF] ^
                                  U4[ tt        & 0xFF]);
            }
        }
    }

    AES.prototype.encrypt = function(plaintext) {
        if (plaintext.length != 16) {
            throw new Error('invalid plaintext size (must be 16 bytes)');
        }

        var rounds = this._Ke.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(plaintext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Ke[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T1[(t[ i         ] >> 24) & 0xff] ^
                        T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
                        T3[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T4[ t[(i + 3) % 4]        & 0xff] ^
                        this._Ke[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Ke[rounds][i];
            result[4 * i    ] = (S[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (S[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (S[ t[(i + 3) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }

    AES.prototype.decrypt = function(ciphertext) {
        if (ciphertext.length != 16) {
            throw new Error('invalid ciphertext size (must be 16 bytes)');
        }

        var rounds = this._Kd.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(ciphertext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Kd[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T5[(t[ i          ] >> 24) & 0xff] ^
                        T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
                        T7[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T8[ t[(i + 1) % 4]        & 0xff] ^
                        this._Kd[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Kd[rounds][i];
            result[4 * i    ] = (Si[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (Si[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (Si[ t[(i + 1) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }


    /**
     *  Mode Of Operation - Electonic Codebook (ECB)
     */
    var ModeOfOperationECB = function(key) {
        if (!(this instanceof ModeOfOperationECB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Electronic Code Block";
        this.name = "ecb";

        this._aes = new AES(key);
    }

    ModeOfOperationECB.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);
            block = this._aes.encrypt(block);
            copyArray(block, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);
            copyArray(block, plaintext, i);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Block Chaining (CBC)
     */
    var ModeOfOperationCBC = function(key, iv) {
        if (!(this instanceof ModeOfOperationCBC)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Block Chaining";
        this.name = "cbc";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastCipherblock = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);

            for (var j = 0; j < 16; j++) {
                block[j] ^= this._lastCipherblock[j];
            }

            this._lastCipherblock = this._aes.encrypt(block);
            copyArray(this._lastCipherblock, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);

            for (var j = 0; j < 16; j++) {
                plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
            }

            copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Feedback (CFB)
     */
    var ModeOfOperationCFB = function(key, iv, segmentSize) {
        if (!(this instanceof ModeOfOperationCFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Feedback";
        this.name = "cfb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 size)');
        }

        if (!segmentSize) { segmentSize = 1; }

        this.segmentSize = segmentSize;

        this._shiftRegister = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
        if ((plaintext.length % this.segmentSize) != 0) {
            throw new Error('invalid plaintext size (must be segmentSize bytes)');
        }

        var encrypted = coerceArray(plaintext, true);

        var xorSegment;
        for (var i = 0; i < encrypted.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);
            for (var j = 0; j < this.segmentSize; j++) {
                encrypted[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return encrypted;
    }

    ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
        if ((ciphertext.length % this.segmentSize) != 0) {
            throw new Error('invalid ciphertext size (must be segmentSize bytes)');
        }

        var plaintext = coerceArray(ciphertext, true);

        var xorSegment;
        for (var i = 0; i < plaintext.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);

            for (var j = 0; j < this.segmentSize; j++) {
                plaintext[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return plaintext;
    }

    /**
     *  Mode Of Operation - Output Feedback (OFB)
     */
    var ModeOfOperationOFB = function(key, iv) {
        if (!(this instanceof ModeOfOperationOFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Output Feedback";
        this.name = "ofb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastPrecipher = coerceArray(iv, true);
        this._lastPrecipherIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._lastPrecipherIndex === 16) {
                this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
                this._lastPrecipherIndex = 0;
            }
            encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;


    /**
     *  Counter object for CTR common mode of operation
     */
    var Counter = function(initialValue) {
        if (!(this instanceof Counter)) {
            throw Error('Counter must be instanitated with `new`');
        }

        // We allow 0, but anything false-ish uses the default 1
        if (initialValue !== 0 && !initialValue) { initialValue = 1; }

        if (typeof(initialValue) === 'number') {
            this._counter = createArray(16);
            this.setValue(initialValue);

        } else {
            this.setBytes(initialValue);
        }
    }

    Counter.prototype.setValue = function(value) {
        if (typeof(value) !== 'number' || parseInt(value) != value) {
            throw new Error('invalid counter value (must be an integer)');
        }

        for (var index = 15; index >= 0; --index) {
            this._counter[index] = value % 256;
            value = value >> 8;
        }
    }

    Counter.prototype.setBytes = function(bytes) {
        bytes = coerceArray(bytes, true);

        if (bytes.length != 16) {
            throw new Error('invalid counter bytes size (must be 16 bytes)');
        }

        this._counter = bytes;
    };

    Counter.prototype.increment = function() {
        for (var i = 15; i >= 0; i--) {
            if (this._counter[i] === 255) {
                this._counter[i] = 0;
            } else {
                this._counter[i]++;
                break;
            }
        }
    }


    /**
     *  Mode Of Operation - Counter (CTR)
     */
    var ModeOfOperationCTR = function(key, counter) {
        if (!(this instanceof ModeOfOperationCTR)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Counter";
        this.name = "ctr";

        if (!(counter instanceof Counter)) {
            counter = new Counter(counter)
        }

        this._counter = counter;

        this._remainingCounter = null;
        this._remainingCounterIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._remainingCounterIndex === 16) {
                this._remainingCounter = this._aes.encrypt(this._counter._counter);
                this._remainingCounterIndex = 0;
                this._counter.increment();
            }
            encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;


    ///////////////////////
    // Padding

    // See:https://tools.ietf.org/html/rfc2315
    function pkcs7pad(data) {
        data = coerceArray(data, true);
        var padder = 16 - (data.length % 16);
        var result = createArray(data.length + padder);
        copyArray(data, result);
        for (var i = data.length; i < result.length; i++) {
            result[i] = padder;
        }
        return result;
    }

    function pkcs7strip(data) {
        data = coerceArray(data, true);
        if (data.length < 16) { throw new Error('PKCS#7 invalid length'); }

        var padder = data[data.length - 1];
        if (padder > 16) { throw new Error('PKCS#7 padding byte out of range'); }

        var length = data.length - padder;
        for (var i = 0; i < padder; i++) {
            if (data[length + i] !== padder) {
                throw new Error('PKCS#7 invalid padding byte');
            }
        }

        var result = createArray(length);
        copyArray(data, result, 0, 0, length);
        return result;
    }

    ///////////////////////
    // Exporting


    // The block cipher
    var aesjs = {
        AES: AES,
        Counter: Counter,

        ModeOfOperation: {
            ecb: ModeOfOperationECB,
            cbc: ModeOfOperationCBC,
            cfb: ModeOfOperationCFB,
            ofb: ModeOfOperationOFB,
            ctr: ModeOfOperationCTR
        },

        utils: {
            hex: convertHex,
            utf8: convertUtf8
        },

        padding: {
            pkcs7: {
                pad: pkcs7pad,
                strip: pkcs7strip
            }
        },

        _arrayTest: {
            coerceArray: coerceArray,
            createArray: createArray,
            copyArray: copyArray,
        }
    };


    // node.js
    if (true) {
        module.exports = aesjs

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else if (typeof(define) === 'function' && define.amd) {
        define(aesjs);

    // Web Browsers
    } else {

        // If there was an existing library at "aesjs" make sure it's still available
        if (root.aesjs) {
            aesjs._aesjs = root.aesjs;
        }

        root.aesjs = aesjs;
    }


})(this);


/***/ }),

/***/ "../node_modules/axios/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../node_modules/axios/lib/axios.js");

/***/ }),

/***/ "../node_modules/axios/lib/adapters/xhr.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
var settle = __webpack_require__("../node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__("../node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__("../node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__("../node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__("../node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__("../node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__("../node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/axios.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
var bind = __webpack_require__("../node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__("../node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__("../node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__("../node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__("../node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__("../node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__("../node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/Cancel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/CancelToken.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__("../node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/isCancel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "../node_modules/axios/lib/core/Axios.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__("../node_modules/axios/lib/defaults.js");
var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__("../node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__("../node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "../node_modules/axios/lib/core/InterceptorManager.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "../node_modules/axios/lib/core/createError.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__("../node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "../node_modules/axios/lib/core/dispatchRequest.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
var transformData = __webpack_require__("../node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__("../node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__("../node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__("../node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__("../node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/core/enhanceError.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "../node_modules/axios/lib/core/settle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__("../node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "../node_modules/axios/lib/core/transformData.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "../node_modules/axios/lib/defaults.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__("../node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__("../node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__("../node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__("../node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/axios/lib/helpers/bind.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/btoa.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "../node_modules/axios/lib/helpers/buildURL.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/combineURLs.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/cookies.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isAbsoluteURL.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isURLSameOrigin.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "../node_modules/axios/lib/helpers/normalizeHeaderName.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/parseHeaders.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/spread.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "../node_modules/axios/lib/utils.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("../node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__("../node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "../node_modules/bignumber.js/bignumber.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;(function (globalObject) {
  'use strict';

/*
 *      bignumber.js v7.2.1
 *      A JavaScript library for arbitrary-precision arithmetic.
 *      https://github.com/MikeMcl/bignumber.js
 *      Copyright (c) 2018 Michael Mclaughlin <M8ch88l@gmail.com>
 *      MIT Licensed.
 *
 *      BigNumber.prototype methods     |  BigNumber methods
 *                                      |
 *      absoluteValue            abs    |  clone
 *      comparedTo                      |  config               set
 *      decimalPlaces            dp     |      DECIMAL_PLACES
 *      dividedBy                div    |      ROUNDING_MODE
 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
 *      exponentiatedBy          pow    |      RANGE
 *      integerValue                    |      CRYPTO
 *      isEqualTo                eq     |      MODULO_MODE
 *      isFinite                        |      POW_PRECISION
 *      isGreaterThan            gt     |      FORMAT
 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
 *      isInteger                       |  isBigNumber
 *      isLessThan               lt     |  maximum              max
 *      isLessThanOrEqualTo      lte    |  minimum              min
 *      isNaN                           |  random
 *      isNegative                      |
 *      isPositive                      |
 *      isZero                          |
 *      minus                           |
 *      modulo                   mod    |
 *      multipliedBy             times  |
 *      negated                         |
 *      plus                            |
 *      precision                sd     |
 *      shiftedBy                       |
 *      squareRoot               sqrt   |
 *      toExponential                   |
 *      toFixed                         |
 *      toFormat                        |
 *      toFraction                      |
 *      toJSON                          |
 *      toNumber                        |
 *      toPrecision                     |
 *      toString                        |
 *      valueOf                         |
 *
 */


  var BigNumber,
    isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,

    mathceil = Math.ceil,
    mathfloor = Math.floor,

    bignumberError = '[BigNumber Error] ',
    tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

    BASE = 1e14,
    LOG_BASE = 14,
    MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
    // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
    POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
    SQRT_BASE = 1e7,

    // EDITABLE
    // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
    // the arguments to toExponential, toFixed, toFormat, and toPrecision.
    MAX = 1E9;                                   // 0 to MAX_INT32


  /*
   * Create and return a BigNumber constructor.
   */
  function clone(configObject) {
    var div, convertBase, parseNumeric,
      P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
      ONE = new BigNumber(1),


      //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


      // The default values below must be integers within the inclusive ranges stated.
      // The values can also be changed at run-time using BigNumber.set.

      // The maximum number of decimal places for operations involving division.
      DECIMAL_PLACES = 20,                     // 0 to MAX

      // The rounding mode used when rounding to the above decimal places, and when using
      // toExponential, toFixed, toFormat and toPrecision, and round (default value).
      // UP         0 Away from zero.
      // DOWN       1 Towards zero.
      // CEIL       2 Towards +Infinity.
      // FLOOR      3 Towards -Infinity.
      // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
      // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
      // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
      // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
      // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
      ROUNDING_MODE = 4,                       // 0 to 8

      // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

      // The exponent value at and beneath which toString returns exponential notation.
      // Number type: -7
      TO_EXP_NEG = -7,                         // 0 to -MAX

      // The exponent value at and above which toString returns exponential notation.
      // Number type: 21
      TO_EXP_POS = 21,                         // 0 to MAX

      // RANGE : [MIN_EXP, MAX_EXP]

      // The minimum exponent value, beneath which underflow to zero occurs.
      // Number type: -324  (5e-324)
      MIN_EXP = -1e7,                          // -1 to -MAX

      // The maximum exponent value, above which overflow to Infinity occurs.
      // Number type:  308  (1.7976931348623157e+308)
      // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
      MAX_EXP = 1e7,                           // 1 to MAX

      // Whether to use cryptographically-secure random number generation, if available.
      CRYPTO = false,                          // true or false

      // The modulo mode used when calculating the modulus: a mod n.
      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
      // The remainder (r) is calculated as: r = a - n * q.
      //
      // UP        0 The remainder is positive if the dividend is negative, else is negative.
      // DOWN      1 The remainder has the same sign as the dividend.
      //             This modulo mode is commonly known as 'truncated division' and is
      //             equivalent to (a % n) in JavaScript.
      // FLOOR     3 The remainder has the same sign as the divisor (Python %).
      // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
      // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
      //             The remainder is always positive.
      //
      // The truncated division, floored division, Euclidian division and IEEE 754 remainder
      // modes are commonly used for the modulus operation.
      // Although the other rounding modes can also be used, they may not give useful results.
      MODULO_MODE = 1,                         // 0 to 9

      // The maximum number of significant digits of the result of the exponentiatedBy operation.
      // If POW_PRECISION is 0, there will be unlimited significant digits.
      POW_PRECISION = 0,                    // 0 to MAX

      // The format specification used by the BigNumber.prototype.toFormat method.
      FORMAT = {
        decimalSeparator: '.',
        groupSeparator: ',',
        groupSize: 3,
        secondaryGroupSize: 0,
        fractionGroupSeparator: '\xA0',      // non-breaking space
        fractionGroupSize: 0
      },

      // The alphabet used for base conversion.
      // It must be at least 2 characters long, with no '.' or repeated character.
      // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
      ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';


    //------------------------------------------------------------------------------------------


    // CONSTRUCTOR


    /*
     * The BigNumber constructor and exported function.
     * Create and return a new instance of a BigNumber object.
     *
     * n {number|string|BigNumber} A numeric value.
     * [b] {number} The base of n. Integer, 2 to ALPHABET.length inclusive.
     */
    function BigNumber(n, b) {
      var alphabet, c, caseChanged, e, i, isNum, len, str,
        x = this;

      // Enable constructor usage without new.
      if (!(x instanceof BigNumber)) {

        // Don't throw on constructor call without new (#81).
        // '[BigNumber Error] Constructor call without new: {n}'
        //throw Error(bignumberError + ' Constructor call without new: ' + n);
        return new BigNumber(n, b);
      }

      if (b == null) {

        // Duplicate.
        if (n instanceof BigNumber) {
          x.s = n.s;
          x.e = n.e;
          x.c = (n = n.c) ? n.slice() : n;
          return;
        }

        isNum = typeof n == 'number';

        if (isNum && n * 0 == 0) {

          // Use `1 / n` to handle minus zero also.
          x.s = 1 / n < 0 ? (n = -n, -1) : 1;

          // Faster path for integers.
          if (n === ~~n) {
            for (e = 0, i = n; i >= 10; i /= 10, e++);
            x.e = e;
            x.c = [n];
            return;
          }

          str = n + '';
        } else {
          if (!isNumeric.test(str = n + '')) return parseNumeric(x, str, isNum);
          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
        }

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

        // Exponential form?
        if ((i = str.search(/e/i)) > 0) {

          // Determine exponent.
          if (e < 0) e = i;
          e += +str.slice(i + 1);
          str = str.substring(0, i);
        } else if (e < 0) {

          // Integer.
          e = str.length;
        }

      } else {

        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
        intCheck(b, 2, ALPHABET.length, 'Base');
        str = n + '';

        // Allow exponential notation to be used with base 10 argument, while
        // also rounding to DECIMAL_PLACES as with other bases.
        if (b == 10) {
          x = new BigNumber(n instanceof BigNumber ? n : str);
          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
        }

        isNum = typeof n == 'number';

        if (isNum) {

          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
          if (n * 0 != 0) return parseNumeric(x, str, isNum, b);

          x.s = 1 / n < 0 ? (str = str.slice(1), -1) : 1;

          // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
            throw Error
             (tooManyDigits + n);
          }

          // Prevent later check for length on converted number.
          isNum = false;
        } else {
          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
        }

        alphabet = ALPHABET.slice(0, b);
        e = i = 0;

        // Check that str is a valid base b number.
        // Don't use RegExp so alphabet can contain special characters.
        for (len = str.length; i < len; i++) {
          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
            if (c == '.') {

              // If '.' is not the first character and it has not be found before.
              if (i > e) {
                e = len;
                continue;
              }
            } else if (!caseChanged) {

              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
              if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
                  str == str.toLowerCase() && (str = str.toUpperCase())) {
                caseChanged = true;
                i = -1;
                e = 0;
                continue;
              }
            }

            return parseNumeric(x, n + '', isNum, b);
          }
        }

        str = convertBase(str, b, 10, x.s);

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
        else e = str.length;
      }

      // Determine leading zeros.
      for (i = 0; str.charCodeAt(i) === 48; i++);

      // Determine trailing zeros.
      for (len = str.length; str.charCodeAt(--len) === 48;);

      str = str.slice(i, ++len);

      if (str) {
        len -= i;

        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
        if (isNum && BigNumber.DEBUG &&
          len > 15 && (n > MAX_SAFE_INTEGER || n !== mathfloor(n))) {
            throw Error
             (tooManyDigits + (x.s * n));
        }

        e = e - i - 1;

         // Overflow?
        if (e > MAX_EXP) {

          // Infinity.
          x.c = x.e = null;

        // Underflow?
        } else if (e < MIN_EXP) {

          // Zero.
          x.c = [x.e = 0];
        } else {
          x.e = e;
          x.c = [];

          // Transform base

          // e is the base 10 exponent.
          // i is where to slice str to get the first element of the coefficient array.
          i = (e + 1) % LOG_BASE;
          if (e < 0) i += LOG_BASE;

          if (i < len) {
            if (i) x.c.push(+str.slice(0, i));

            for (len -= LOG_BASE; i < len;) {
              x.c.push(+str.slice(i, i += LOG_BASE));
            }

            str = str.slice(i);
            i = LOG_BASE - str.length;
          } else {
            i -= len;
          }

          for (; i--; str += '0');
          x.c.push(+str);
        }
      } else {

        // Zero.
        x.c = [x.e = 0];
      }
    }


    // CONSTRUCTOR PROPERTIES


    BigNumber.clone = clone;

    BigNumber.ROUND_UP = 0;
    BigNumber.ROUND_DOWN = 1;
    BigNumber.ROUND_CEIL = 2;
    BigNumber.ROUND_FLOOR = 3;
    BigNumber.ROUND_HALF_UP = 4;
    BigNumber.ROUND_HALF_DOWN = 5;
    BigNumber.ROUND_HALF_EVEN = 6;
    BigNumber.ROUND_HALF_CEIL = 7;
    BigNumber.ROUND_HALF_FLOOR = 8;
    BigNumber.EUCLID = 9;


    /*
     * Configure infrequently-changing library-wide settings.
     *
     * Accept an object with the following optional properties (if the value of a property is
     * a number, it must be an integer within the inclusive range stated):
     *
     *   DECIMAL_PLACES   {number}           0 to MAX
     *   ROUNDING_MODE    {number}           0 to 8
     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
     *   CRYPTO           {boolean}          true or false
     *   MODULO_MODE      {number}           0 to 9
     *   POW_PRECISION       {number}           0 to MAX
     *   ALPHABET         {string}           A string of two or more unique characters which does
     *                                       not contain '.'.
     *   FORMAT           {object}           An object with some of the following properties:
     *      decimalSeparator       {string}
     *      groupSeparator         {string}
     *      groupSize              {number}
     *      secondaryGroupSize     {number}
     *      fractionGroupSeparator {string}
     *      fractionGroupSize      {number}
     *
     * (The values assigned to the above FORMAT object properties are not checked for validity.)
     *
     * E.g.
     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
     *
     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
     *
     * Return an object with the properties current values.
     */
    BigNumber.config = BigNumber.set = function (obj) {
      var p, v;

      if (obj != null) {

        if (typeof obj == 'object') {

          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            DECIMAL_PLACES = v;
          }

          // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
            v = obj[p];
            intCheck(v, 0, 8, p);
            ROUNDING_MODE = v;
          }

          // EXPONENTIAL_AT {number|number[]}
          // Integer, -MAX to MAX inclusive or
          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
            v = obj[p];
            if (isArray(v)) {
              intCheck(v[0], -MAX, 0, p);
              intCheck(v[1], 0, MAX, p);
              TO_EXP_NEG = v[0];
              TO_EXP_POS = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
            }
          }

          // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
          if (obj.hasOwnProperty(p = 'RANGE')) {
            v = obj[p];
            if (isArray(v)) {
              intCheck(v[0], -MAX, -1, p);
              intCheck(v[1], 1, MAX, p);
              MIN_EXP = v[0];
              MAX_EXP = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              if (v) {
                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
              } else {
                throw Error
                 (bignumberError + p + ' cannot be zero: ' + v);
              }
            }
          }

          // CRYPTO {boolean} true or false.
          // '[BigNumber Error] CRYPTO not true or false: {v}'
          // '[BigNumber Error] crypto unavailable'
          if (obj.hasOwnProperty(p = 'CRYPTO')) {
            v = obj[p];
            if (v === !!v) {
              if (v) {
                if (typeof crypto != 'undefined' && crypto &&
                 (crypto.getRandomValues || crypto.randomBytes)) {
                  CRYPTO = v;
                } else {
                  CRYPTO = !v;
                  throw Error
                   (bignumberError + 'crypto unavailable');
                }
              } else {
                CRYPTO = v;
              }
            } else {
              throw Error
               (bignumberError + p + ' not true or false: ' + v);
            }
          }

          // MODULO_MODE {number} Integer, 0 to 9 inclusive.
          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
            v = obj[p];
            intCheck(v, 0, 9, p);
            MODULO_MODE = v;
          }

          // POW_PRECISION {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            POW_PRECISION = v;
          }

          // FORMAT {object}
          // '[BigNumber Error] FORMAT not an object: {v}'
          if (obj.hasOwnProperty(p = 'FORMAT')) {
            v = obj[p];
            if (typeof v == 'object') FORMAT = v;
            else throw Error
             (bignumberError + p + ' not an object: ' + v);
          }

          // ALPHABET {string}
          // '[BigNumber Error] ALPHABET invalid: {v}'
          if (obj.hasOwnProperty(p = 'ALPHABET')) {
            v = obj[p];

            // Disallow if only one character, or contains '.' or a repeated character.
            if (typeof v == 'string' && !/^.$|\.|(.).*\1/.test(v)) {
              ALPHABET = v;
            } else {
              throw Error
               (bignumberError + p + ' invalid: ' + v);
            }
          }

        } else {

          // '[BigNumber Error] Object expected: {v}'
          throw Error
           (bignumberError + 'Object expected: ' + obj);
        }
      }

      return {
        DECIMAL_PLACES: DECIMAL_PLACES,
        ROUNDING_MODE: ROUNDING_MODE,
        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
        RANGE: [MIN_EXP, MAX_EXP],
        CRYPTO: CRYPTO,
        MODULO_MODE: MODULO_MODE,
        POW_PRECISION: POW_PRECISION,
        FORMAT: FORMAT,
        ALPHABET: ALPHABET
      };
    };


    /*
     * Return true if v is a BigNumber instance, otherwise return false.
     *
     * v {any}
     */
    BigNumber.isBigNumber = function (v) {
      return v instanceof BigNumber || v && v._isBigNumber === true || false;
    };


    /*
     * Return a new BigNumber whose value is the maximum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.maximum = BigNumber.max = function () {
      return maxOrMin(arguments, P.lt);
    };


    /*
     * Return a new BigNumber whose value is the minimum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.minimum = BigNumber.min = function () {
      return maxOrMin(arguments, P.gt);
    };


    /*
     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
     * zeros are produced).
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
     * '[BigNumber Error] crypto unavailable'
     */
    BigNumber.random = (function () {
      var pow2_53 = 0x20000000000000;

      // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
      // Check if Math.random() produces more than 32 bits of randomness.
      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
      var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
       ? function () { return mathfloor(Math.random() * pow2_53); }
       : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
         (Math.random() * 0x800000 | 0); };

      return function (dp) {
        var a, b, e, k, v,
          i = 0,
          c = [],
          rand = new BigNumber(ONE);

        if (dp == null) dp = DECIMAL_PLACES;
        else intCheck(dp, 0, MAX);

        k = mathceil(dp / LOG_BASE);

        if (CRYPTO) {

          // Browsers supporting crypto.getRandomValues.
          if (crypto.getRandomValues) {

            a = crypto.getRandomValues(new Uint32Array(k *= 2));

            for (; i < k;) {

              // 53 bits:
              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
              //                                     11111 11111111 11111111
              // 0x20000 is 2^21.
              v = a[i] * 0x20000 + (a[i + 1] >>> 11);

              // Rejection sampling:
              // 0 <= v < 9007199254740992
              // Probability that v >= 9e15, is
              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
              if (v >= 9e15) {
                b = crypto.getRandomValues(new Uint32Array(2));
                a[i] = b[0];
                a[i + 1] = b[1];
              } else {

                // 0 <= v <= 8999999999999999
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 2;
              }
            }
            i = k / 2;

          // Node.js supporting crypto.randomBytes.
          } else if (crypto.randomBytes) {

            // buffer
            a = crypto.randomBytes(k *= 7);

            for (; i < k;) {

              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
              // 0x100000000 is 2^32, 0x1000000 is 2^24
              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
              // 0 <= v < 9007199254740992
              v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
                 (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
                 (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

              if (v >= 9e15) {
                crypto.randomBytes(7).copy(a, i);
              } else {

                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 7;
              }
            }
            i = k / 7;
          } else {
            CRYPTO = false;
            throw Error
             (bignumberError + 'crypto unavailable');
          }
        }

        // Use Math.random.
        if (!CRYPTO) {

          for (; i < k;) {
            v = random53bitInt();
            if (v < 9e15) c[i++] = v % 1e14;
          }
        }

        k = c[--i];
        dp %= LOG_BASE;

        // Convert trailing digits to zeros according to dp.
        if (k && dp) {
          v = POWS_TEN[LOG_BASE - dp];
          c[i] = mathfloor(k / v) * v;
        }

        // Remove trailing elements which are zero.
        for (; c[i] === 0; c.pop(), i--);

        // Zero?
        if (i < 0) {
          c = [e = 0];
        } else {

          // Remove leading elements which are zero and adjust exponent accordingly.
          for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

          // Count the digits of the first element of c to determine leading zeros, and...
          for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

          // adjust the exponent accordingly.
          if (i < LOG_BASE) e -= LOG_BASE - i;
        }

        rand.e = e;
        rand.c = c;
        return rand;
      };
    })();


    // PRIVATE FUNCTIONS


    // Called by BigNumber and BigNumber.prototype.toString.
    convertBase = (function () {
      var decimal = '0123456789';

      /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
       */
      function toBaseOut(str, baseIn, baseOut, alphabet) {
        var j,
          arr = [0],
          arrL,
          i = 0,
          len = str.length;

        for (; i < len;) {
          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

          arr[0] += alphabet.indexOf(str.charAt(i++));

          for (j = 0; j < arr.length; j++) {

            if (arr[j] > baseOut - 1) {
              if (arr[j + 1] == null) arr[j + 1] = 0;
              arr[j + 1] += arr[j] / baseOut | 0;
              arr[j] %= baseOut;
            }
          }
        }

        return arr.reverse();
      }

      // Convert a numeric string of baseIn to a numeric string of baseOut.
      // If the caller is toString, we are converting from base 10 to baseOut.
      // If the caller is BigNumber, we are converting from baseIn to base 10.
      return function (str, baseIn, baseOut, sign, callerIsToString) {
        var alphabet, d, e, k, r, x, xc, y,
          i = str.indexOf('.'),
          dp = DECIMAL_PLACES,
          rm = ROUNDING_MODE;

        // Non-integer.
        if (i >= 0) {
          k = POW_PRECISION;

          // Unlimited precision.
          POW_PRECISION = 0;
          str = str.replace('.', '');
          y = new BigNumber(baseIn);
          x = y.pow(str.length - i);
          POW_PRECISION = k;

          // Convert str as if an integer, then restore the fraction part by dividing the
          // result by its base raised to a power.

          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
           10, baseOut, decimal);
          y.e = y.c.length;
        }

        // Convert the number as integer.

        xc = toBaseOut(str, baseIn, baseOut, callerIsToString
         ? (alphabet = ALPHABET, decimal)
         : (alphabet = decimal, ALPHABET));

        // xc now represents str as an integer and converted to baseOut. e is the exponent.
        e = k = xc.length;

        // Remove trailing zeros.
        for (; xc[--k] == 0; xc.pop());

        // Zero?
        if (!xc[0]) return alphabet.charAt(0);

        // Does str represent an integer? If so, no need for the division.
        if (i < 0) {
          --e;
        } else {
          x.c = xc;
          x.e = e;

          // The sign is needed for correct rounding.
          x.s = sign;
          x = div(x, y, dp, rm, baseOut);
          xc = x.c;
          r = x.r;
          e = x.e;
        }

        // xc now represents str converted to baseOut.

        // THe index of the rounding digit.
        d = e + dp + 1;

        // The rounding digit: the digit to the right of the digit that may be rounded up.
        i = xc[d];

        // Look at the rounding digits and mode to determine whether to round up.

        k = baseOut / 2;
        r = r || d < 0 || xc[d + 1] != null;

        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
              : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
               rm == (x.s < 0 ? 8 : 7));

        // If the index of the rounding digit is not greater than zero, or xc represents
        // zero, then the result of the base conversion is zero or, if rounding up, a value
        // such as 0.00001.
        if (d < 1 || !xc[0]) {

          // 1^-dp or 0
          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0))
              : alphabet.charAt(0);
        } else {

          // Truncate xc to the required number of decimal places.
          xc.length = d;

          // Round up?
          if (r) {

            // Rounding up may mean the previous digit has to be rounded up and so on.
            for (--baseOut; ++xc[--d] > baseOut;) {
              xc[d] = 0;

              if (!d) {
                ++e;
                xc = [1].concat(xc);
              }
            }
          }

          // Determine trailing zeros.
          for (k = xc.length; !xc[--k];);

          // E.g. [4, 11, 15] becomes 4bf.
          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

          // Add leading zeros, decimal point and trailing zeros as required.
          str = toFixedPoint(str, e, alphabet.charAt(0));
        }

        // The caller will add the sign.
        return str;
      };
    })();


    // Perform division in the specified base. Called by div and convertBase.
    div = (function () {

      // Assume non-zero x and k.
      function multiply(x, k, base) {
        var m, temp, xlo, xhi,
          carry = 0,
          i = x.length,
          klo = k % SQRT_BASE,
          khi = k / SQRT_BASE | 0;

        for (x = x.slice(); i--;) {
          xlo = x[i] % SQRT_BASE;
          xhi = x[i] / SQRT_BASE | 0;
          m = khi * xlo + xhi * klo;
          temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
          x[i] = temp % base;
        }

        if (carry) x = [carry].concat(x);

        return x;
      }

      function compare(a, b, aL, bL) {
        var i, cmp;

        if (aL != bL) {
          cmp = aL > bL ? 1 : -1;
        } else {

          for (i = cmp = 0; i < aL; i++) {

            if (a[i] != b[i]) {
              cmp = a[i] > b[i] ? 1 : -1;
              break;
            }
          }
        }

        return cmp;
      }

      function subtract(a, b, aL, base) {
        var i = 0;

        // Subtract b from a.
        for (; aL--;) {
          a[aL] -= i;
          i = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i * base + a[aL] - b[aL];
        }

        // Remove leading zeros.
        for (; !a[0] && a.length > 1; a.splice(0, 1));
      }

      // x: dividend, y: divisor.
      return function (x, y, dp, rm, base) {
        var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
          yL, yz,
          s = x.s == y.s ? 1 : -1,
          xc = x.c,
          yc = y.c;

        // Either NaN, Infinity or 0?
        if (!xc || !xc[0] || !yc || !yc[0]) {

          return new BigNumber(

           // Return NaN if either NaN, or both Infinity or 0.
           !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
         );
        }

        q = new BigNumber(s);
        qc = q.c = [];
        e = x.e - y.e;
        s = dp + e + 1;

        if (!base) {
          base = BASE;
          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
          s = s / LOG_BASE | 0;
        }

        // Result exponent may be one less then the current value of e.
        // The coefficients of the BigNumbers from convertBase may have trailing zeros.
        for (i = 0; yc[i] == (xc[i] || 0); i++);

        if (yc[i] > (xc[i] || 0)) e--;

        if (s < 0) {
          qc.push(1);
          more = true;
        } else {
          xL = xc.length;
          yL = yc.length;
          i = 0;
          s += 2;

          // Normalise xc and yc so highest order digit of yc is >= base / 2.

          n = mathfloor(base / (yc[0] + 1));

          // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
          if (n > 1) {
            yc = multiply(yc, n, base);
            xc = multiply(xc, n, base);
            yL = yc.length;
            xL = xc.length;
          }

          xi = yL;
          rem = xc.slice(0, yL);
          remL = rem.length;

          // Add zeros to make remainder as long as divisor.
          for (; remL < yL; rem[remL++] = 0);
          yz = yc.slice();
          yz = [0].concat(yz);
          yc0 = yc[0];
          if (yc[1] >= base / 2) yc0++;
          // Not necessary, but to prevent trial digit n > base, when using base 3.
          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

          do {
            n = 0;

            // Compare divisor and remainder.
            cmp = compare(yc, rem, yL, remL);

            // If divisor < remainder.
            if (cmp < 0) {

              // Calculate trial digit, n.

              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

              // n is how many times the divisor goes into the current remainder.
              n = mathfloor(rem0 / yc0);

              //  Algorithm:
              //  product = divisor multiplied by trial digit (n).
              //  Compare product and remainder.
              //  If product is greater than remainder:
              //    Subtract divisor from product, decrement trial digit.
              //  Subtract product from remainder.
              //  If product was less than remainder at the last compare:
              //    Compare new remainder and divisor.
              //    If remainder is greater than divisor:
              //      Subtract divisor from remainder, increment trial digit.

              if (n > 1) {

                // n may be > base only when base is 3.
                if (n >= base) n = base - 1;

                // product = divisor * trial digit.
                prod = multiply(yc, n, base);
                prodL = prod.length;
                remL = rem.length;

                // Compare product and remainder.
                // If product > remainder then trial digit n too high.
                // n is 1 too high about 5% of the time, and is not known to have
                // ever been more than 1 too high.
                while (compare(prod, rem, prodL, remL) == 1) {
                  n--;

                  // Subtract divisor from product.
                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
                  prodL = prod.length;
                  cmp = 1;
                }
              } else {

                // n is 0 or 1, cmp is -1.
                // If n is 0, there is no need to compare yc and rem again below,
                // so change cmp to 1 to avoid it.
                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                if (n == 0) {

                  // divisor < remainder, so n must be at least 1.
                  cmp = n = 1;
                }

                // product = divisor
                prod = yc.slice();
                prodL = prod.length;
              }

              if (prodL < remL) prod = [0].concat(prod);

              // Subtract product from remainder.
              subtract(rem, prod, remL, base);
              remL = rem.length;

               // If product was < remainder.
              if (cmp == -1) {

                // Compare divisor and new remainder.
                // If divisor < new remainder, subtract divisor from remainder.
                // Trial digit n too low.
                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                while (compare(yc, rem, yL, remL) < 1) {
                  n++;

                  // Subtract divisor from remainder.
                  subtract(rem, yL < remL ? yz : yc, remL, base);
                  remL = rem.length;
                }
              }
            } else if (cmp === 0) {
              n++;
              rem = [0];
            } // else cmp === 1 and n will be 0

            // Add the next digit, n, to the result array.
            qc[i++] = n;

            // Update the remainder.
            if (rem[0]) {
              rem[remL++] = xc[xi] || 0;
            } else {
              rem = [xc[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] != null) && s--);

          more = rem[0] != null;

          // Leading zero?
          if (!qc[0]) qc.splice(0, 1);
        }

        if (base == BASE) {

          // To calculate q.e, first get the number of digits of qc[0].
          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

        // Caller is convertBase.
        } else {
          q.e = e;
          q.r = +more;
        }

        return q;
      };
    })();


    /*
     * Return a string representing the value of BigNumber n in fixed-point or exponential
     * notation rounded to the specified decimal places or significant digits.
     *
     * n: a BigNumber.
     * i: the index of the last digit required (i.e. the digit that may be rounded up).
     * rm: the rounding mode.
     * id: 1 (toExponential) or 2 (toPrecision).
     */
    function format(n, i, rm, id) {
      var c0, e, ne, len, str;

      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      if (!n.c) return n.toString();

      c0 = n.c[0];
      ne = n.e;

      if (i == null) {
        str = coeffToString(n.c);
        str = id == 1 || id == 2 && ne <= TO_EXP_NEG
         ? toExponential(str, ne)
         : toFixedPoint(str, ne, '0');
      } else {
        n = round(new BigNumber(n), i, rm);

        // n.e may have changed if the value was rounded up.
        e = n.e;

        str = coeffToString(n.c);
        len = str.length;

        // toPrecision returns exponential notation if the number of significant digits
        // specified is less than the number of digits necessary to represent the integer
        // part of the value in fixed-point notation.

        // Exponential notation.
        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

          // Append zeros?
          for (; len < i; str += '0', len++);
          str = toExponential(str, e);

        // Fixed-point notation.
        } else {
          i -= ne;
          str = toFixedPoint(str, e, '0');

          // Append zeros?
          if (e + 1 > len) {
            if (--i > 0) for (str += '.'; i--; str += '0');
          } else {
            i += e - len;
            if (i > 0) {
              if (e + 1 == len) str += '.';
              for (; i--; str += '0');
            }
          }
        }
      }

      return n.s < 0 && c0 ? '-' + str : str;
    }


    // Handle BigNumber.max and BigNumber.min.
    function maxOrMin(args, method) {
      var m, n,
        i = 0;

      if (isArray(args[0])) args = args[0];
      m = new BigNumber(args[0]);

      for (; ++i < args.length;) {
        n = new BigNumber(args[i]);

        // If any number is NaN, return NaN.
        if (!n.s) {
          m = n;
          break;
        } else if (method.call(m, n)) {
          m = n;
        }
      }

      return m;
    }


    /*
     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
     * Called by minus, plus and times.
     */
    function normalise(n, c, e) {
      var i = 1,
        j = c.length;

       // Remove trailing zeros.
      for (; !c[--j]; c.pop());

      // Calculate the base 10 exponent. First get the number of digits of c[0].
      for (j = c[0]; j >= 10; j /= 10, i++);

      // Overflow?
      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

        // Infinity.
        n.c = n.e = null;

      // Underflow?
      } else if (e < MIN_EXP) {

        // Zero.
        n.c = [n.e = 0];
      } else {
        n.e = e;
        n.c = c;
      }

      return n;
    }


    // Handle values that fail the validity test in BigNumber.
    parseNumeric = (function () {
      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
        dotAfter = /^([^.]+)\.$/,
        dotBefore = /^\.([^.]+)$/,
        isInfinityOrNaN = /^-?(Infinity|NaN)$/,
        whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

      return function (x, str, isNum, b) {
        var base,
          s = isNum ? str : str.replace(whitespaceOrPlus, '');

        // No exception on ±Infinity or NaN.
        if (isInfinityOrNaN.test(s)) {
          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
          x.c = x.e = null;
        } else {
          if (!isNum) {

            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
            s = s.replace(basePrefix, function (m, p1, p2) {
              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
              return !b || b == base ? p1 : m;
            });

            if (b) {
              base = b;

              // E.g. '1.' to '1', '.1' to '0.1'
              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
            }

            if (str != s) return new BigNumber(s, base);
          }

          // '[BigNumber Error] Not a number: {n}'
          // '[BigNumber Error] Not a base {b} number: {n}'
          if (BigNumber.DEBUG) {
            throw Error
              (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
          }

          // NaN
          x.c = x.e = x.s = null;
        }
      }
    })();


    /*
     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
     * If r is truthy, it is known that there are more digits after the rounding digit.
     */
    function round(x, sd, rm, r) {
      var d, i, j, k, n, ni, rd,
        xc = x.c,
        pows10 = POWS_TEN;

      // if x is not Infinity or NaN...
      if (xc) {

        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
        // n is a base 1e14 number, the value of the element of array x.c containing rd.
        // ni is the index of n within x.c.
        // d is the number of digits of n.
        // i is the index of rd within n including leading zeros.
        // j is the actual index of rd within n (if < 0, rd is a leading zero).
        out: {

          // Get the number of digits of the first element of xc.
          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
          i = sd - d;

          // If the rounding digit is in the first element of xc...
          if (i < 0) {
            i += LOG_BASE;
            j = sd;
            n = xc[ni = 0];

            // Get the rounding digit at index j of n.
            rd = n / pows10[d - j - 1] % 10 | 0;
          } else {
            ni = mathceil((i + 1) / LOG_BASE);

            if (ni >= xc.length) {

              if (r) {

                // Needed by sqrt.
                for (; xc.length <= ni; xc.push(0));
                n = rd = 0;
                d = 1;
                i %= LOG_BASE;
                j = i - LOG_BASE + 1;
              } else {
                break out;
              }
            } else {
              n = k = xc[ni];

              // Get the number of digits of n.
              for (d = 1; k >= 10; k /= 10, d++);

              // Get the index of rd within n.
              i %= LOG_BASE;

              // Get the index of rd within n, adjusted for leading zeros.
              // The number of leading zeros of n is given by LOG_BASE - d.
              j = i - LOG_BASE + d;

              // Get the rounding digit at index j of n.
              rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
            }
          }

          r = r || sd < 0 ||

          // Are there any non-zero digits after the rounding digit?
          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
           xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

          r = rm < 4
           ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
           : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

            // Check whether the digit to the left of the rounding digit is odd.
            ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
             rm == (x.s < 0 ? 8 : 7));

          if (sd < 1 || !xc[0]) {
            xc.length = 0;

            if (r) {

              // Convert sd to decimal places.
              sd -= x.e + 1;

              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
              x.e = -sd || 0;
            } else {

              // Zero.
              xc[0] = x.e = 0;
            }

            return x;
          }

          // Remove excess digits.
          if (i == 0) {
            xc.length = ni;
            k = 1;
            ni--;
          } else {
            xc.length = ni + 1;
            k = pows10[LOG_BASE - i];

            // E.g. 56700 becomes 56000 if 7 is the rounding digit.
            // j > 0 means i > number of leading zeros of n.
            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
          }

          // Round up?
          if (r) {

            for (; ;) {

              // If the digit to be rounded up is in the first element of xc...
              if (ni == 0) {

                // i will be the length of xc[0] before k is added.
                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
                j = xc[0] += k;
                for (k = 1; j >= 10; j /= 10, k++);

                // if i != k the length has increased.
                if (i != k) {
                  x.e++;
                  if (xc[0] == BASE) xc[0] = 1;
                }

                break;
              } else {
                xc[ni] += k;
                if (xc[ni] != BASE) break;
                xc[ni--] = 0;
                k = 1;
              }
            }
          }

          // Remove trailing zeros.
          for (i = xc.length; xc[--i] === 0; xc.pop());
        }

        // Overflow? Infinity.
        if (x.e > MAX_EXP) {
          x.c = x.e = null;

        // Underflow? Zero.
        } else if (x.e < MIN_EXP) {
          x.c = [x.e = 0];
        }
      }

      return x;
    }


    // PROTOTYPE/INSTANCE METHODS


    /*
     * Return a new BigNumber whose value is the absolute value of this BigNumber.
     */
    P.absoluteValue = P.abs = function () {
      var x = new BigNumber(this);
      if (x.s < 0) x.s = 1;
      return x;
    };


    /*
     * Return
     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
     *   0 if they have the same value,
     *   or null if the value of either is NaN.
     */
    P.comparedTo = function (y, b) {
      return compare(this, new BigNumber(y, b));
    };


    /*
     * If dp is undefined or null or true or false, return the number of decimal places of the
     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     *
     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.decimalPlaces = P.dp = function (dp, rm) {
      var c, n, v,
        x = this;

      if (dp != null) {
        intCheck(dp, 0, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), dp + x.e + 1, rm);
      }

      if (!(c = x.c)) return null;
      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

      // Subtract the number of trailing zeros of the last number.
      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
      if (n < 0) n = 0;

      return n;
    };


    /*
     *  n / 0 = I
     *  n / N = N
     *  n / I = 0
     *  0 / n = 0
     *  0 / 0 = N
     *  0 / N = N
     *  0 / I = 0
     *  N / n = N
     *  N / 0 = N
     *  N / N = N
     *  N / I = N
     *  I / n = I
     *  I / 0 = I
     *  I / N = N
     *  I / I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.dividedBy = P.div = function (y, b) {
      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
    };


    /*
     * Return a new BigNumber whose value is the integer part of dividing the value of this
     * BigNumber by the value of BigNumber(y, b).
     */
    P.dividedToIntegerBy = P.idiv = function (y, b) {
      return div(this, new BigNumber(y, b), 0, 1);
    };


    /*
     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
     *
     * If m is present, return the result modulo m.
     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
     *
     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
     *
     * n {number|string|BigNumber} The exponent. An integer.
     * [m] {number|string|BigNumber} The modulus.
     *
     * '[BigNumber Error] Exponent not an integer: {n}'
     */
    P.exponentiatedBy = P.pow = function (n, m) {
      var half, isModExp, k, more, nIsBig, nIsNeg, nIsOdd, y,
        x = this;

      n = new BigNumber(n);

      // Allow NaN and ±Infinity, but not other non-integers.
      if (n.c && !n.isInteger()) {
        throw Error
          (bignumberError + 'Exponent not an integer: ' + n);
      }

      if (m != null) m = new BigNumber(m);

      // Exponent of MAX_SAFE_INTEGER is 15.
      nIsBig = n.e > 14;

      // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

        // The sign of the result of pow when x is negative depends on the evenness of n.
        // If +n overflows to ±Infinity, the evenness of n would be not be known.
        y = new BigNumber(Math.pow(+x.valueOf(), nIsBig ? 2 - isOdd(n) : +n));
        return m ? y.mod(m) : y;
      }

      nIsNeg = n.s < 0;

      if (m) {

        // x % m returns NaN if abs(m) is zero, or m is NaN.
        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

        isModExp = !nIsNeg && x.isInteger() && m.isInteger();

        if (isModExp) x = x.mod(m);

      // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
      // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
        // [1, 240000000]
        ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
        // [80000000000000]  [99999750000000]
        : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

        // If x is negative and n is odd, k = -0, else k = 0.
        k = x.s < 0 && isOdd(n) ? -0 : 0;

        // If x >= 1, k = ±Infinity.
        if (x.e > -1) k = 1 / k;

        // If n is negative return ±0, else return ±Infinity.
        return new BigNumber(nIsNeg ? 1 / k : k);

      } else if (POW_PRECISION) {

        // Truncating each coefficient array to a length of k after each multiplication
        // equates to truncating significant digits to POW_PRECISION + [28, 41],
        // i.e. there will be a minimum of 28 guard digits retained.
        k = mathceil(POW_PRECISION / LOG_BASE + 2);
      }

      if (nIsBig) {
        half = new BigNumber(0.5);
        nIsOdd = isOdd(n);
      } else {
        nIsOdd = n % 2;
      }

      if (nIsNeg) n.s = 1;

      y = new BigNumber(ONE);

      // Performs 54 loop iterations for n of 9007199254740991.
      for (; ;) {

        if (nIsOdd) {
          y = y.times(x);
          if (!y.c) break;

          if (k) {
            if (y.c.length > k) y.c.length = k;
          } else if (isModExp) {
            y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
          }
        }

        if (nIsBig) {
          n = n.times(half);
          round(n, n.e + 1, 1);
          if (!n.c[0]) break;
          nIsBig = n.e > 14;
          nIsOdd = isOdd(n);
        } else {
          n = mathfloor(n / 2);
          if (!n) break;
          nIsOdd = n % 2;
        }

        x = x.times(x);

        if (k) {
          if (x.c && x.c.length > k) x.c.length = k;
        } else if (isModExp) {
          x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
        }
      }

      if (isModExp) return y;
      if (nIsNeg) y = ONE.div(y);

      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
     */
    P.integerValue = function (rm) {
      var n = new BigNumber(this);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(n, n.e + 1, rm);
    };


    /*
     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isEqualTo = P.eq = function (y, b) {
      return compare(this, new BigNumber(y, b)) === 0;
    };


    /*
     * Return true if the value of this BigNumber is a finite number, otherwise return false.
     */
    P.isFinite = function () {
      return !!this.c;
    };


    /*
     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isGreaterThan = P.gt = function (y, b) {
      return compare(this, new BigNumber(y, b)) > 0;
    };


    /*
     * Return true if the value of this BigNumber is greater than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

    };


    /*
     * Return true if the value of this BigNumber is an integer, otherwise return false.
     */
    P.isInteger = function () {
      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
    };


    /*
     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isLessThan = P.lt = function (y, b) {
      return compare(this, new BigNumber(y, b)) < 0;
    };


    /*
     * Return true if the value of this BigNumber is less than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isLessThanOrEqualTo = P.lte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
    };


    /*
     * Return true if the value of this BigNumber is NaN, otherwise return false.
     */
    P.isNaN = function () {
      return !this.s;
    };


    /*
     * Return true if the value of this BigNumber is negative, otherwise return false.
     */
    P.isNegative = function () {
      return this.s < 0;
    };


    /*
     * Return true if the value of this BigNumber is positive, otherwise return false.
     */
    P.isPositive = function () {
      return this.s > 0;
    };


    /*
     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
     */
    P.isZero = function () {
      return !!this.c && this.c[0] == 0;
    };


    /*
     *  n - 0 = n
     *  n - N = N
     *  n - I = -I
     *  0 - n = -n
     *  0 - 0 = 0
     *  0 - N = N
     *  0 - I = -I
     *  N - n = N
     *  N - 0 = N
     *  N - N = N
     *  N - I = N
     *  I - n = I
     *  I - 0 = I
     *  I - N = N
     *  I - I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
     * BigNumber(y, b).
     */
    P.minus = function (y, b) {
      var i, j, t, xLTy,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
      if (a != b) {
        y.s = -b;
        return x.plus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Either Infinity?
        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

        // Either zero?
        if (!xc[0] || !yc[0]) {

          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

           // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
           ROUNDING_MODE == 3 ? -0 : 0);
        }
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Determine which is the bigger number.
      if (a = xe - ye) {

        if (xLTy = a < 0) {
          a = -a;
          t = xc;
        } else {
          ye = xe;
          t = yc;
        }

        t.reverse();

        // Prepend zeros to equalise exponents.
        for (b = a; b--; t.push(0));
        t.reverse();
      } else {

        // Exponents equal. Check digit by digit.
        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

        for (a = b = 0; b < j; b++) {

          if (xc[b] != yc[b]) {
            xLTy = xc[b] < yc[b];
            break;
          }
        }
      }

      // x < y? Point xc to the array of the bigger number.
      if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

      b = (j = yc.length) - (i = xc.length);

      // Append zeros to xc if shorter.
      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
      if (b > 0) for (; b--; xc[i++] = 0);
      b = BASE - 1;

      // Subtract yc from xc.
      for (; j > a;) {

        if (xc[--j] < yc[j]) {
          for (i = j; i && !xc[--i]; xc[i] = b);
          --xc[i];
          xc[j] += BASE;
        }

        xc[j] -= yc[j];
      }

      // Remove leading zeros and adjust exponent accordingly.
      for (; xc[0] == 0; xc.splice(0, 1), --ye);

      // Zero?
      if (!xc[0]) {

        // Following IEEE 754 (2008) 6.3,
        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
        y.s = ROUNDING_MODE == 3 ? -1 : 1;
        y.c = [y.e = 0];
        return y;
      }

      // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
      // for finite x and y.
      return normalise(y, xc, ye);
    };


    /*
     *   n % 0 =  N
     *   n % N =  N
     *   n % I =  n
     *   0 % n =  0
     *  -0 % n = -0
     *   0 % 0 =  N
     *   0 % N =  N
     *   0 % I =  0
     *   N % n =  N
     *   N % 0 =  N
     *   N % N =  N
     *   N % I =  N
     *   I % n =  N
     *   I % 0 =  N
     *   I % N =  N
     *   I % I =  N
     *
     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
     */
    P.modulo = P.mod = function (y, b) {
      var q, s,
        x = this;

      y = new BigNumber(y, b);

      // Return NaN if x is Infinity or NaN, or y is NaN or zero.
      if (!x.c || !y.s || y.c && !y.c[0]) {
        return new BigNumber(NaN);

      // Return x if y is Infinity or x is zero.
      } else if (!y.c || x.c && !x.c[0]) {
        return new BigNumber(x);
      }

      if (MODULO_MODE == 9) {

        // Euclidian division: q = sign(y) * floor(x / abs(y))
        // r = x - qy    where  0 <= r < abs(y)
        s = y.s;
        y.s = 1;
        q = div(x, y, 0, 3);
        y.s = s;
        q.s *= s;
      } else {
        q = div(x, y, 0, MODULO_MODE);
      }

      y = x.minus(q.times(y));

      // To match JavaScript %, ensure sign of zero is sign of dividend.
      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

      return y;
    };


    /*
     *  n * 0 = 0
     *  n * N = N
     *  n * I = I
     *  0 * n = 0
     *  0 * 0 = 0
     *  0 * N = N
     *  0 * I = N
     *  N * n = N
     *  N * 0 = N
     *  N * N = N
     *  N * I = N
     *  I * n = I
     *  I * 0 = N
     *  I * N = N
     *  I * I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
     * of BigNumber(y, b).
     */
    P.multipliedBy = P.times = function (y, b) {
      var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
        base, sqrtBase,
        x = this,
        xc = x.c,
        yc = (y = new BigNumber(y, b)).c;

      // Either NaN, ±Infinity or ±0?
      if (!xc || !yc || !xc[0] || !yc[0]) {

        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
          y.c = y.e = y.s = null;
        } else {
          y.s *= x.s;

          // Return ±Infinity if either is ±Infinity.
          if (!xc || !yc) {
            y.c = y.e = null;

          // Return ±0 if either is ±0.
          } else {
            y.c = [0];
            y.e = 0;
          }
        }

        return y;
      }

      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
      y.s *= x.s;
      xcL = xc.length;
      ycL = yc.length;

      // Ensure xc points to longer array and xcL to its length.
      if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

      // Initialise the result array with zeros.
      for (i = xcL + ycL, zc = []; i--; zc.push(0));

      base = BASE;
      sqrtBase = SQRT_BASE;

      for (i = ycL; --i >= 0;) {
        c = 0;
        ylo = yc[i] % sqrtBase;
        yhi = yc[i] / sqrtBase | 0;

        for (k = xcL, j = i + k; j > i;) {
          xlo = xc[--k] % sqrtBase;
          xhi = xc[k] / sqrtBase | 0;
          m = yhi * xlo + xhi * ylo;
          xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
          zc[j--] = xlo % base;
        }

        zc[j] = c;
      }

      if (c) {
        ++e;
      } else {
        zc.splice(0, 1);
      }

      return normalise(y, zc, e);
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber negated,
     * i.e. multiplied by -1.
     */
    P.negated = function () {
      var x = new BigNumber(this);
      x.s = -x.s || null;
      return x;
    };


    /*
     *  n + 0 = n
     *  n + N = N
     *  n + I = I
     *  0 + n = n
     *  0 + 0 = 0
     *  0 + N = N
     *  0 + I = I
     *  N + n = N
     *  N + 0 = N
     *  N + N = N
     *  N + I = N
     *  I + n = I
     *  I + 0 = I
     *  I + N = N
     *  I + I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
     * BigNumber(y, b).
     */
    P.plus = function (y, b) {
      var t,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
       if (a != b) {
        y.s = -b;
        return x.minus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Return ±Infinity if either ±Infinity.
        if (!xc || !yc) return new BigNumber(a / 0);

        // Either zero?
        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
      if (a = xe - ye) {
        if (a > 0) {
          ye = xe;
          t = yc;
        } else {
          a = -a;
          t = xc;
        }

        t.reverse();
        for (; a--; t.push(0));
        t.reverse();
      }

      a = xc.length;
      b = yc.length;

      // Point xc to the longer array, and b to the shorter length.
      if (a - b < 0) t = yc, yc = xc, xc = t, b = a;

      // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
      for (a = 0; b;) {
        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
      }

      if (a) {
        xc = [a].concat(xc);
        ++ye;
      }

      // No need to check for zero, as +x + +y != 0 && -x + -y != 0
      // ye = MAX_EXP + 1 possible
      return normalise(y, xc, ye);
    };


    /*
     * If sd is undefined or null or true or false, return the number of significant digits of
     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     * If sd is true include integer-part trailing zeros in the count.
     *
     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
     *                     boolean: whether to count integer-part trailing zeros: true or false.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.precision = P.sd = function (sd, rm) {
      var c, n, v,
        x = this;

      if (sd != null && sd !== !!sd) {
        intCheck(sd, 1, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), sd, rm);
      }

      if (!(c = x.c)) return null;
      v = c.length - 1;
      n = v * LOG_BASE + 1;

      if (v = c[v]) {

        // Subtract the number of trailing zeros of the last element.
        for (; v % 10 == 0; v /= 10, n--);

        // Add the number of digits of the first element.
        for (v = c[0]; v >= 10; v /= 10, n++);
      }

      if (sd && x.e + 1 > n) n = x.e + 1;

      return n;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
     *
     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
     */
    P.shiftedBy = function (k) {
      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
      return this.times('1e' + k);
    };


    /*
     *  sqrt(-n) =  N
     *  sqrt(N) =  N
     *  sqrt(-I) =  N
     *  sqrt(I) =  I
     *  sqrt(0) =  0
     *  sqrt(-0) = -0
     *
     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.squareRoot = P.sqrt = function () {
      var m, n, r, rep, t,
        x = this,
        c = x.c,
        s = x.s,
        e = x.e,
        dp = DECIMAL_PLACES + 4,
        half = new BigNumber('0.5');

      // Negative/NaN/Infinity/zero?
      if (s !== 1 || !c || !c[0]) {
        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
      }

      // Initial estimate.
      s = Math.sqrt(+x);

      // Math.sqrt underflow/overflow?
      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
      if (s == 0 || s == 1 / 0) {
        n = coeffToString(c);
        if ((n.length + e) % 2 == 0) n += '0';
        s = Math.sqrt(n);
        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

        if (s == 1 / 0) {
          n = '1e' + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf('e') + 1) + e;
        }

        r = new BigNumber(n);
      } else {
        r = new BigNumber(s + '');
      }

      // Check for zero.
      // r could be zero if MIN_EXP is changed after the this value was created.
      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
      // coeffToString to throw.
      if (r.c[0]) {
        e = r.e;
        s = e + dp;
        if (s < 3) s = 0;

        // Newton-Raphson iteration.
        for (; ;) {
          t = r;
          r = half.times(t.plus(div(x, t, dp, 1)));

          if (coeffToString(t.c  ).slice(0, s) === (n =
             coeffToString(r.c)).slice(0, s)) {

            // The exponent of r may here be one less than the final result exponent,
            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
            // are indexed correctly.
            if (r.e < e) --s;
            n = n.slice(s - 3, s + 1);

            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
            // iteration.
            if (n == '9999' || !rep && n == '4999') {

              // On the first iteration only, check to see if rounding up gives the
              // exact result as the nines may infinitely repeat.
              if (!rep) {
                round(t, t.e + DECIMAL_PLACES + 2, 0);

                if (t.times(t).eq(x)) {
                  r = t;
                  break;
                }
              }

              dp += 4;
              s += 4;
              rep = 1;
            } else {

              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
              // result. If not, then there are further digits and m will be truthy.
              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

                // Truncate to the first rounding digit.
                round(r, r.e + DECIMAL_PLACES + 2, 1);
                m = !r.times(r).eq(x);
              }

              break;
            }
          }
        }
      }

      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
    };


    /*
     * Return a string representing the value of this BigNumber in exponential notation and
     * rounded using ROUNDING_MODE to dp fixed decimal places.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toExponential = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp++;
      }
      return format(this, dp, rm, 1);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounding
     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
     * but e.g. (-0.00001).toFixed(0) is '-0'.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toFixed = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp = dp + this.e + 1;
      }
      return format(this, dp, rm);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounded
     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
     * of the FORMAT object (see BigNumber.set).
     *
     * FORMAT = {
     *      decimalSeparator : '.',
     *      groupSeparator : ',',
     *      groupSize : 3,
     *      secondaryGroupSize : 0,
     *      fractionGroupSeparator : '\xA0',    // non-breaking space
     *      fractionGroupSize : 0
     * };
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toFormat = function (dp, rm) {
      var str = this.toFixed(dp, rm);

      if (this.c) {
        var i,
          arr = str.split('.'),
          g1 = +FORMAT.groupSize,
          g2 = +FORMAT.secondaryGroupSize,
          groupSeparator = FORMAT.groupSeparator,
          intPart = arr[0],
          fractionPart = arr[1],
          isNeg = this.s < 0,
          intDigits = isNeg ? intPart.slice(1) : intPart,
          len = intDigits.length;

        if (g2) i = g1, g1 = g2, g2 = i, len -= i;

        if (g1 > 0 && len > 0) {
          i = len % g1 || g1;
          intPart = intDigits.substr(0, i);

          for (; i < len; i += g1) {
            intPart += groupSeparator + intDigits.substr(i, g1);
          }

          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
          if (isNeg) intPart = '-' + intPart;
        }

        str = fractionPart
         ? intPart + FORMAT.decimalSeparator + ((g2 = +FORMAT.fractionGroupSize)
          ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
           '$&' + FORMAT.fractionGroupSeparator)
          : fractionPart)
         : intPart;
      }

      return str;
    };


    /*
     * Return a string array representing the value of this BigNumber as a simple fraction with
     * an integer numerator and an integer denominator. The denominator will be a positive
     * non-zero value less than or equal to the specified maximum denominator. If a maximum
     * denominator is not specified, the denominator will be the lowest value necessary to
     * represent the number exactly.
     *
     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
     *
     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
     */
    P.toFraction = function (md) {
      var arr, d, d0, d1, d2, e, exp, n, n0, n1, q, s,
        x = this,
        xc = x.c;

      if (md != null) {
        n = new BigNumber(md);

        // Throw if md is less than one or is not an integer, unless it is Infinity.
        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
          throw Error
            (bignumberError + 'Argument ' +
              (n.isInteger() ? 'out of range: ' : 'not an integer: ') + md);
        }
      }

      if (!xc) return x.toString();

      d = new BigNumber(ONE);
      n1 = d0 = new BigNumber(ONE);
      d1 = n0 = new BigNumber(ONE);
      s = coeffToString(xc);

      // Determine initial denominator.
      // d is a power of 10 and the minimum max denominator that specifies the value exactly.
      e = d.e = s.length - x.e - 1;
      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
      md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

      exp = MAX_EXP;
      MAX_EXP = 1 / 0;
      n = new BigNumber(s);

      // n0 = d1 = 0
      n0.c[0] = 0;

      for (; ;)  {
        q = div(n, d, 0, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.comparedTo(md) == 1) break;
        d0 = d1;
        d1 = d2;
        n1 = n0.plus(q.times(d2 = n1));
        n0 = d2;
        d = n.minus(q.times(d2 = d));
        n = d2;
      }

      d2 = div(md.minus(d0), d1, 0, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      e *= 2;

      // Determine which fraction is closer to x, n0/d0 or n1/d1
      arr = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
         div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1
          ? [n1.toString(), d1.toString()]
          : [n0.toString(), d0.toString()];

      MAX_EXP = exp;
      return arr;
    };


    /*
     * Return the value of this BigNumber converted to a number primitive.
     */
    P.toNumber = function () {
      return +this;
    };


    /*
     * Return a string representing the value of this BigNumber rounded to sd significant digits
     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
     * necessary to represent the integer part of the value in fixed-point notation, then use
     * exponential notation.
     *
     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.toPrecision = function (sd, rm) {
      if (sd != null) intCheck(sd, 1, MAX);
      return format(this, sd, rm, 2);
    };


    /*
     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
     * TO_EXP_NEG, return exponential notation.
     *
     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
     *
     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
     */
    P.toString = function (b) {
      var str,
        n = this,
        s = n.s,
        e = n.e;

      // Infinity or NaN?
      if (e === null) {

        if (s) {
          str = 'Infinity';
          if (s < 0) str = '-' + str;
        } else {
          str = 'NaN';
        }
      } else {
        str = coeffToString(n.c);

        if (b == null) {
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS
           ? toExponential(str, e)
           : toFixedPoint(str, e, '0');
        } else {
          intCheck(b, 2, ALPHABET.length, 'Base');
          str = convertBase(toFixedPoint(str, e, '0'), 10, b, s, true);
        }

        if (s < 0 && n.c[0]) str = '-' + str;
      }

      return str;
    };


    /*
     * Return as toString, but do not accept a base argument, and include the minus sign for
     * negative zero.
     */
    P.valueOf = P.toJSON = function () {
      var str,
        n = this,
        e = n.e;

      if (e === null) return n.toString();

      str = coeffToString(n.c);

      str = e <= TO_EXP_NEG || e >= TO_EXP_POS
        ? toExponential(str, e)
        : toFixedPoint(str, e, '0');

      return n.s < 0 ? '-' + str : str;
    };


    P._isBigNumber = true;

    if (configObject != null) BigNumber.set(configObject);

    return BigNumber;
  }


  // PRIVATE HELPER FUNCTIONS


  function bitFloor(n) {
    var i = n | 0;
    return n > 0 || n === i ? i : i - 1;
  }


  // Return a coefficient array as a string of base 10 digits.
  function coeffToString(a) {
    var s, z,
      i = 1,
      j = a.length,
      r = a[0] + '';

    for (; i < j;) {
      s = a[i++] + '';
      z = LOG_BASE - s.length;
      for (; z--; s = '0' + s);
      r += s;
    }

    // Determine trailing zeros.
    for (j = r.length; r.charCodeAt(--j) === 48;);
    return r.slice(0, j + 1 || 1);
  }


  // Compare the value of BigNumbers x and y.
  function compare(x, y) {
    var a, b,
      xc = x.c,
      yc = y.c,
      i = x.s,
      j = y.s,
      k = x.e,
      l = y.e;

    // Either NaN?
    if (!i || !j) return null;

    a = xc && !xc[0];
    b = yc && !yc[0];

    // Either zero?
    if (a || b) return a ? b ? 0 : -j : i;

    // Signs differ?
    if (i != j) return i;

    a = i < 0;
    b = k == l;

    // Either Infinity?
    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

    // Compare exponents.
    if (!b) return k > l ^ a ? 1 : -1;

    j = (k = xc.length) < (l = yc.length) ? k : l;

    // Compare digit by digit.
    for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

    // Compare lengths.
    return k == l ? 0 : k > l ^ a ? 1 : -1;
  }


  /*
   * Check that n is a primitive number, an integer, and in range, otherwise throw.
   */
  function intCheck(n, min, max, name) {
    if (n < min || n > max || n !== (n < 0 ? mathceil(n) : mathfloor(n))) {
      throw Error
       (bignumberError + (name || 'Argument') + (typeof n == 'number'
         ? n < min || n > max ? ' out of range: ' : ' not an integer: '
         : ' not a primitive number: ') + n);
    }
  }


  function isArray(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
  }


  // Assumes finite n.
  function isOdd(n) {
    var k = n.c.length - 1;
    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
  }


  function toExponential(str, e) {
    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
     (e < 0 ? 'e' : 'e+') + e;
  }


  function toFixedPoint(str, e, z) {
    var len, zs;

    // Negative exponent?
    if (e < 0) {

      // Prepend zeros.
      for (zs = z + '.'; ++e; zs += z);
      str = zs + str;

    // Positive exponent
    } else {
      len = str.length;

      // Append zeros.
      if (++e > len) {
        for (zs = z, e -= len; --e; zs += z);
        str += zs;
      } else if (e < len) {
        str = str.slice(0, e) + '.' + str.slice(e);
      }
    }

    return str;
  }


  // EXPORT


  BigNumber = clone();
  BigNumber['default'] = BigNumber.BigNumber = BigNumber;

  // AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return BigNumber; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Node.js and other environments that support module.exports.
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = BigNumber;

  // Browser.
  } else {
    if (!globalObject) {
      globalObject = typeof self != 'undefined' && self ? self : window;
    }

    globalObject.BigNumber = BigNumber;
  }
})(this);


/***/ }),

/***/ "../node_modules/bn.js/lib/bn.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function (module, exports) {
  'use strict';

  // Utils
  function assert (val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }

  // Could use `inherits` module, but don't want to move from single file
  // architecture yet.
  function inherits (ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }

  // BN

  function BN (number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0;

    // Reduction context
    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }
  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;

  var Buffer;
  try {
    Buffer = __webpack_require__(4).Buffer;
  } catch (e) {
  }

  BN.isBN = function isBN (num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' &&
      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max (left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min (left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init (number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }
    assert(base === (base | 0) && base >= 2 && base <= 36);

    number = number.toString().replace(/\s+/g, '');
    var start = 0;
    if (number[0] === '-') {
      start++;
    }

    if (base === 16) {
      this._parseHex(number, start);
    } else {
      this._parseBase(number, base, start);
    }

    if (number[0] === '-') {
      this.negative = 1;
    }

    this.strip();

    if (endian !== 'le') return;

    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initNumber = function _initNumber (number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }
    if (number < 0x4000000) {
      this.words = [ number & 0x3ffffff ];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff
      ];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff,
        1
      ];
      this.length = 3;
    }

    if (endian !== 'le') return;

    // Reverse the bytes
    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray (number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');
    if (number.length <= 0) {
      this.words = [ 0 ];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;
    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }
    return this.strip();
  };

  function parseHex (str, start, end) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r <<= 4;

      // 'a' - 'f'
      if (c >= 49 && c <= 54) {
        r |= c - 49 + 0xa;

      // 'A' - 'F'
      } else if (c >= 17 && c <= 22) {
        r |= c - 17 + 0xa;

      // '0' - '9'
      } else {
        r |= c & 0xf;
      }
    }
    return r;
  }

  BN.prototype._parseHex = function _parseHex (number, start) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    // Scan 24-bit chunks and add them to the number
    var off = 0;
    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
      w = parseHex(number, i, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
      off += 24;
      if (off >= 26) {
        off -= 26;
        j++;
      }
    }
    if (i + 6 !== start) {
      w = parseHex(number, start, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
    }
    this.strip();
  };

  function parseBase (str, start, end, mul) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r *= mul;

      // 'a'
      if (c >= 49) {
        r += c - 49 + 0xa;

      // 'A'
      } else if (c >= 17) {
        r += c - 17 + 0xa;

      // '0' - '9'
      } else {
        r += c;
      }
    }
    return r;
  }

  BN.prototype._parseBase = function _parseBase (number, base, start) {
    // Initialize as zero
    this.words = [ 0 ];
    this.length = 1;

    // Find length of limb in base
    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }
    limbLen--;
    limbPow = (limbPow / base) | 0;

    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;

    var word = 0;
    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);

      this.imuln(limbPow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }
  };

  BN.prototype.copy = function copy (dest) {
    dest.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }
    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  BN.prototype.clone = function clone () {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand (size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }
    return this;
  };

  // Remove leading `0` from `this`
  BN.prototype.strip = function strip () {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }
    return this._normSign();
  };

  BN.prototype._normSign = function _normSign () {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }
    return this;
  };

  BN.prototype.inspect = function inspect () {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  };

  /*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */

  var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
  ];

  var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
  ];

  var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
  ];

  BN.prototype.toString = function toString (base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;

    var out;
    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = (((w << off) | carry) & 0xffffff).toString(16);
        carry = (w >>> (24 - off)) & 0xffffff;
        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }
        off += 2;
        if (off >= 26) {
          off -= 26;
          i--;
        }
      }
      if (carry !== 0) {
        out = carry.toString(16) + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base];
      // var groupBase = Math.pow(base, groupSize);
      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;
      while (!c.isZero()) {
        var r = c.modn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }
      if (this.isZero()) {
        out = '0' + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber () {
    var ret = this.words[0];
    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }
    return (this.negative !== 0) ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON () {
    return this.toString(16);
  };

  BN.prototype.toBuffer = function toBuffer (endian, length) {
    assert(typeof Buffer !== 'undefined');
    return this.toArrayLike(Buffer, endian, length);
  };

  BN.prototype.toArray = function toArray (endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');

    this.strip();
    var littleEndian = endian === 'le';
    var res = new ArrayType(reqLength);

    var b, i;
    var q = this.clone();
    if (!littleEndian) {
      // Assume big-endian
      for (i = 0; i < reqLength - byteLength; i++) {
        res[i] = 0;
      }

      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[reqLength - i - 1] = b;
      }
    } else {
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[i] = b;
      }

      for (; i < reqLength; i++) {
        res[i] = 0;
      }
    }

    return res;
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits (w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits (w) {
      var t = w;
      var r = 0;
      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }
      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }
      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }
      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }
      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits (w) {
    // Short-cut
    if (w === 0) return 26;

    var t = w;
    var r = 0;
    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }
    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }
    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }
    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }
    if ((t & 0x1) === 0) {
      r++;
    }
    return r;
  };

  // Return number of used bits in a BN
  BN.prototype.bitLength = function bitLength () {
    var w = this.words[this.length - 1];
    var hi = this._countBits(w);
    return (this.length - 1) * 26 + hi;
  };

  function toBitArray (num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
    }

    return w;
  }

  // Number of trailing zero bits
  BN.prototype.zeroBits = function zeroBits () {
    if (this.isZero()) return 0;

    var r = 0;
    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);
      r += b;
      if (b !== 26) break;
    }
    return r;
  };

  BN.prototype.byteLength = function byteLength () {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos (width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }
    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos (width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }
    return this.clone();
  };

  BN.prototype.isNeg = function isNeg () {
    return this.negative !== 0;
  };

  // Return negative clone of `this`
  BN.prototype.neg = function neg () {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg () {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  };

  // Or `num` with `this` in-place
  BN.prototype.iuor = function iuor (num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this.strip();
  };

  BN.prototype.ior = function ior (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  };

  // Or `num` with `this`
  BN.prototype.or = function or (num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor (num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  };

  // And `num` with `this` in-place
  BN.prototype.iuand = function iuand (num) {
    // b = min-length(num, this)
    var b;
    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;

    return this.strip();
  };

  BN.prototype.iand = function iand (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  };

  // And `num` with `this`
  BN.prototype.and = function and (num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand (num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  };

  // Xor `num` with `this` in-place
  BN.prototype.iuxor = function iuxor (num) {
    // a.length > b.length
    var a;
    var b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;

    return this.strip();
  };

  BN.prototype.ixor = function ixor (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  };

  // Xor `num` with `this`
  BN.prototype.xor = function xor (num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor (num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  };

  // Not ``this`` with ``width`` bitwidth
  BN.prototype.inotn = function inotn (width) {
    assert(typeof width === 'number' && width >= 0);

    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26;

    // Extend the buffer with leading zeroes
    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    }

    // Handle complete words
    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    }

    // Handle the residue
    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
    }

    // And remove leading zeroes
    return this.strip();
  };

  BN.prototype.notn = function notn (width) {
    return this.clone().inotn(width);
  };

  // Set `bit` of `this`
  BN.prototype.setn = function setn (bit, val) {
    assert(typeof bit === 'number' && bit >= 0);

    var off = (bit / 26) | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | (1 << wbit);
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this.strip();
  };

  // Add `num` to `this` in-place
  BN.prototype.iadd = function iadd (num) {
    var r;

    // negative + positive
    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign();

    // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    }

    // a.length > b.length
    var a, b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;
    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++;
    // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  };

  // Add `num` to `this`
  BN.prototype.add = function add (num) {
    var res;
    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);

    return num.clone().iadd(this);
  };

  // Subtract `num` from `this` in-place
  BN.prototype.isub = function isub (num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign();

    // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    }

    // At this point both numbers are positive
    var cmp = this.cmp(num);

    // Optimization - zeroify
    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    }

    // a > b
    var a, b;
    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    // Copy rest of the words
    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this.strip();
  };

  // Subtract `num` from `this`
  BN.prototype.sub = function sub (num) {
    return this.clone().isub(num);
  };

  function smallMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = (self.length + num.length) | 0;
    out.length = len;
    len = (len - 1) | 0;

    // Peel one iteration (compiler can't do it, because of code complexity)
    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;

    var lo = r & 0x3ffffff;
    var carry = (r / 0x4000000) | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = (k - j) | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += (r / 0x4000000) | 0;
        rword = r & 0x3ffffff;
      }
      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }
    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out.strip();
  }

  // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).
  var comb10MulTo = function comb10MulTo (self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;

    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */
    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = (mid + Math.imul(ah0, bl0)) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */
    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = (mid + Math.imul(ah1, bl0)) | 0;
    hi = Math.imul(ah1, bh0);
    lo = (lo + Math.imul(al0, bl1)) | 0;
    mid = (mid + Math.imul(al0, bh1)) | 0;
    mid = (mid + Math.imul(ah0, bl1)) | 0;
    hi = (hi + Math.imul(ah0, bh1)) | 0;
    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */
    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = (mid + Math.imul(ah2, bl0)) | 0;
    hi = Math.imul(ah2, bh0);
    lo = (lo + Math.imul(al1, bl1)) | 0;
    mid = (mid + Math.imul(al1, bh1)) | 0;
    mid = (mid + Math.imul(ah1, bl1)) | 0;
    hi = (hi + Math.imul(ah1, bh1)) | 0;
    lo = (lo + Math.imul(al0, bl2)) | 0;
    mid = (mid + Math.imul(al0, bh2)) | 0;
    mid = (mid + Math.imul(ah0, bl2)) | 0;
    hi = (hi + Math.imul(ah0, bh2)) | 0;
    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */
    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = (mid + Math.imul(ah3, bl0)) | 0;
    hi = Math.imul(ah3, bh0);
    lo = (lo + Math.imul(al2, bl1)) | 0;
    mid = (mid + Math.imul(al2, bh1)) | 0;
    mid = (mid + Math.imul(ah2, bl1)) | 0;
    hi = (hi + Math.imul(ah2, bh1)) | 0;
    lo = (lo + Math.imul(al1, bl2)) | 0;
    mid = (mid + Math.imul(al1, bh2)) | 0;
    mid = (mid + Math.imul(ah1, bl2)) | 0;
    hi = (hi + Math.imul(ah1, bh2)) | 0;
    lo = (lo + Math.imul(al0, bl3)) | 0;
    mid = (mid + Math.imul(al0, bh3)) | 0;
    mid = (mid + Math.imul(ah0, bl3)) | 0;
    hi = (hi + Math.imul(ah0, bh3)) | 0;
    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */
    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = (mid + Math.imul(ah4, bl0)) | 0;
    hi = Math.imul(ah4, bh0);
    lo = (lo + Math.imul(al3, bl1)) | 0;
    mid = (mid + Math.imul(al3, bh1)) | 0;
    mid = (mid + Math.imul(ah3, bl1)) | 0;
    hi = (hi + Math.imul(ah3, bh1)) | 0;
    lo = (lo + Math.imul(al2, bl2)) | 0;
    mid = (mid + Math.imul(al2, bh2)) | 0;
    mid = (mid + Math.imul(ah2, bl2)) | 0;
    hi = (hi + Math.imul(ah2, bh2)) | 0;
    lo = (lo + Math.imul(al1, bl3)) | 0;
    mid = (mid + Math.imul(al1, bh3)) | 0;
    mid = (mid + Math.imul(ah1, bl3)) | 0;
    hi = (hi + Math.imul(ah1, bh3)) | 0;
    lo = (lo + Math.imul(al0, bl4)) | 0;
    mid = (mid + Math.imul(al0, bh4)) | 0;
    mid = (mid + Math.imul(ah0, bl4)) | 0;
    hi = (hi + Math.imul(ah0, bh4)) | 0;
    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */
    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = (mid + Math.imul(ah5, bl0)) | 0;
    hi = Math.imul(ah5, bh0);
    lo = (lo + Math.imul(al4, bl1)) | 0;
    mid = (mid + Math.imul(al4, bh1)) | 0;
    mid = (mid + Math.imul(ah4, bl1)) | 0;
    hi = (hi + Math.imul(ah4, bh1)) | 0;
    lo = (lo + Math.imul(al3, bl2)) | 0;
    mid = (mid + Math.imul(al3, bh2)) | 0;
    mid = (mid + Math.imul(ah3, bl2)) | 0;
    hi = (hi + Math.imul(ah3, bh2)) | 0;
    lo = (lo + Math.imul(al2, bl3)) | 0;
    mid = (mid + Math.imul(al2, bh3)) | 0;
    mid = (mid + Math.imul(ah2, bl3)) | 0;
    hi = (hi + Math.imul(ah2, bh3)) | 0;
    lo = (lo + Math.imul(al1, bl4)) | 0;
    mid = (mid + Math.imul(al1, bh4)) | 0;
    mid = (mid + Math.imul(ah1, bl4)) | 0;
    hi = (hi + Math.imul(ah1, bh4)) | 0;
    lo = (lo + Math.imul(al0, bl5)) | 0;
    mid = (mid + Math.imul(al0, bh5)) | 0;
    mid = (mid + Math.imul(ah0, bl5)) | 0;
    hi = (hi + Math.imul(ah0, bh5)) | 0;
    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */
    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = (mid + Math.imul(ah6, bl0)) | 0;
    hi = Math.imul(ah6, bh0);
    lo = (lo + Math.imul(al5, bl1)) | 0;
    mid = (mid + Math.imul(al5, bh1)) | 0;
    mid = (mid + Math.imul(ah5, bl1)) | 0;
    hi = (hi + Math.imul(ah5, bh1)) | 0;
    lo = (lo + Math.imul(al4, bl2)) | 0;
    mid = (mid + Math.imul(al4, bh2)) | 0;
    mid = (mid + Math.imul(ah4, bl2)) | 0;
    hi = (hi + Math.imul(ah4, bh2)) | 0;
    lo = (lo + Math.imul(al3, bl3)) | 0;
    mid = (mid + Math.imul(al3, bh3)) | 0;
    mid = (mid + Math.imul(ah3, bl3)) | 0;
    hi = (hi + Math.imul(ah3, bh3)) | 0;
    lo = (lo + Math.imul(al2, bl4)) | 0;
    mid = (mid + Math.imul(al2, bh4)) | 0;
    mid = (mid + Math.imul(ah2, bl4)) | 0;
    hi = (hi + Math.imul(ah2, bh4)) | 0;
    lo = (lo + Math.imul(al1, bl5)) | 0;
    mid = (mid + Math.imul(al1, bh5)) | 0;
    mid = (mid + Math.imul(ah1, bl5)) | 0;
    hi = (hi + Math.imul(ah1, bh5)) | 0;
    lo = (lo + Math.imul(al0, bl6)) | 0;
    mid = (mid + Math.imul(al0, bh6)) | 0;
    mid = (mid + Math.imul(ah0, bl6)) | 0;
    hi = (hi + Math.imul(ah0, bh6)) | 0;
    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */
    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = (mid + Math.imul(ah7, bl0)) | 0;
    hi = Math.imul(ah7, bh0);
    lo = (lo + Math.imul(al6, bl1)) | 0;
    mid = (mid + Math.imul(al6, bh1)) | 0;
    mid = (mid + Math.imul(ah6, bl1)) | 0;
    hi = (hi + Math.imul(ah6, bh1)) | 0;
    lo = (lo + Math.imul(al5, bl2)) | 0;
    mid = (mid + Math.imul(al5, bh2)) | 0;
    mid = (mid + Math.imul(ah5, bl2)) | 0;
    hi = (hi + Math.imul(ah5, bh2)) | 0;
    lo = (lo + Math.imul(al4, bl3)) | 0;
    mid = (mid + Math.imul(al4, bh3)) | 0;
    mid = (mid + Math.imul(ah4, bl3)) | 0;
    hi = (hi + Math.imul(ah4, bh3)) | 0;
    lo = (lo + Math.imul(al3, bl4)) | 0;
    mid = (mid + Math.imul(al3, bh4)) | 0;
    mid = (mid + Math.imul(ah3, bl4)) | 0;
    hi = (hi + Math.imul(ah3, bh4)) | 0;
    lo = (lo + Math.imul(al2, bl5)) | 0;
    mid = (mid + Math.imul(al2, bh5)) | 0;
    mid = (mid + Math.imul(ah2, bl5)) | 0;
    hi = (hi + Math.imul(ah2, bh5)) | 0;
    lo = (lo + Math.imul(al1, bl6)) | 0;
    mid = (mid + Math.imul(al1, bh6)) | 0;
    mid = (mid + Math.imul(ah1, bl6)) | 0;
    hi = (hi + Math.imul(ah1, bh6)) | 0;
    lo = (lo + Math.imul(al0, bl7)) | 0;
    mid = (mid + Math.imul(al0, bh7)) | 0;
    mid = (mid + Math.imul(ah0, bl7)) | 0;
    hi = (hi + Math.imul(ah0, bh7)) | 0;
    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */
    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = (mid + Math.imul(ah8, bl0)) | 0;
    hi = Math.imul(ah8, bh0);
    lo = (lo + Math.imul(al7, bl1)) | 0;
    mid = (mid + Math.imul(al7, bh1)) | 0;
    mid = (mid + Math.imul(ah7, bl1)) | 0;
    hi = (hi + Math.imul(ah7, bh1)) | 0;
    lo = (lo + Math.imul(al6, bl2)) | 0;
    mid = (mid + Math.imul(al6, bh2)) | 0;
    mid = (mid + Math.imul(ah6, bl2)) | 0;
    hi = (hi + Math.imul(ah6, bh2)) | 0;
    lo = (lo + Math.imul(al5, bl3)) | 0;
    mid = (mid + Math.imul(al5, bh3)) | 0;
    mid = (mid + Math.imul(ah5, bl3)) | 0;
    hi = (hi + Math.imul(ah5, bh3)) | 0;
    lo = (lo + Math.imul(al4, bl4)) | 0;
    mid = (mid + Math.imul(al4, bh4)) | 0;
    mid = (mid + Math.imul(ah4, bl4)) | 0;
    hi = (hi + Math.imul(ah4, bh4)) | 0;
    lo = (lo + Math.imul(al3, bl5)) | 0;
    mid = (mid + Math.imul(al3, bh5)) | 0;
    mid = (mid + Math.imul(ah3, bl5)) | 0;
    hi = (hi + Math.imul(ah3, bh5)) | 0;
    lo = (lo + Math.imul(al2, bl6)) | 0;
    mid = (mid + Math.imul(al2, bh6)) | 0;
    mid = (mid + Math.imul(ah2, bl6)) | 0;
    hi = (hi + Math.imul(ah2, bh6)) | 0;
    lo = (lo + Math.imul(al1, bl7)) | 0;
    mid = (mid + Math.imul(al1, bh7)) | 0;
    mid = (mid + Math.imul(ah1, bl7)) | 0;
    hi = (hi + Math.imul(ah1, bh7)) | 0;
    lo = (lo + Math.imul(al0, bl8)) | 0;
    mid = (mid + Math.imul(al0, bh8)) | 0;
    mid = (mid + Math.imul(ah0, bl8)) | 0;
    hi = (hi + Math.imul(ah0, bh8)) | 0;
    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */
    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = (mid + Math.imul(ah9, bl0)) | 0;
    hi = Math.imul(ah9, bh0);
    lo = (lo + Math.imul(al8, bl1)) | 0;
    mid = (mid + Math.imul(al8, bh1)) | 0;
    mid = (mid + Math.imul(ah8, bl1)) | 0;
    hi = (hi + Math.imul(ah8, bh1)) | 0;
    lo = (lo + Math.imul(al7, bl2)) | 0;
    mid = (mid + Math.imul(al7, bh2)) | 0;
    mid = (mid + Math.imul(ah7, bl2)) | 0;
    hi = (hi + Math.imul(ah7, bh2)) | 0;
    lo = (lo + Math.imul(al6, bl3)) | 0;
    mid = (mid + Math.imul(al6, bh3)) | 0;
    mid = (mid + Math.imul(ah6, bl3)) | 0;
    hi = (hi + Math.imul(ah6, bh3)) | 0;
    lo = (lo + Math.imul(al5, bl4)) | 0;
    mid = (mid + Math.imul(al5, bh4)) | 0;
    mid = (mid + Math.imul(ah5, bl4)) | 0;
    hi = (hi + Math.imul(ah5, bh4)) | 0;
    lo = (lo + Math.imul(al4, bl5)) | 0;
    mid = (mid + Math.imul(al4, bh5)) | 0;
    mid = (mid + Math.imul(ah4, bl5)) | 0;
    hi = (hi + Math.imul(ah4, bh5)) | 0;
    lo = (lo + Math.imul(al3, bl6)) | 0;
    mid = (mid + Math.imul(al3, bh6)) | 0;
    mid = (mid + Math.imul(ah3, bl6)) | 0;
    hi = (hi + Math.imul(ah3, bh6)) | 0;
    lo = (lo + Math.imul(al2, bl7)) | 0;
    mid = (mid + Math.imul(al2, bh7)) | 0;
    mid = (mid + Math.imul(ah2, bl7)) | 0;
    hi = (hi + Math.imul(ah2, bh7)) | 0;
    lo = (lo + Math.imul(al1, bl8)) | 0;
    mid = (mid + Math.imul(al1, bh8)) | 0;
    mid = (mid + Math.imul(ah1, bl8)) | 0;
    hi = (hi + Math.imul(ah1, bh8)) | 0;
    lo = (lo + Math.imul(al0, bl9)) | 0;
    mid = (mid + Math.imul(al0, bh9)) | 0;
    mid = (mid + Math.imul(ah0, bl9)) | 0;
    hi = (hi + Math.imul(ah0, bh9)) | 0;
    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */
    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = (mid + Math.imul(ah9, bl1)) | 0;
    hi = Math.imul(ah9, bh1);
    lo = (lo + Math.imul(al8, bl2)) | 0;
    mid = (mid + Math.imul(al8, bh2)) | 0;
    mid = (mid + Math.imul(ah8, bl2)) | 0;
    hi = (hi + Math.imul(ah8, bh2)) | 0;
    lo = (lo + Math.imul(al7, bl3)) | 0;
    mid = (mid + Math.imul(al7, bh3)) | 0;
    mid = (mid + Math.imul(ah7, bl3)) | 0;
    hi = (hi + Math.imul(ah7, bh3)) | 0;
    lo = (lo + Math.imul(al6, bl4)) | 0;
    mid = (mid + Math.imul(al6, bh4)) | 0;
    mid = (mid + Math.imul(ah6, bl4)) | 0;
    hi = (hi + Math.imul(ah6, bh4)) | 0;
    lo = (lo + Math.imul(al5, bl5)) | 0;
    mid = (mid + Math.imul(al5, bh5)) | 0;
    mid = (mid + Math.imul(ah5, bl5)) | 0;
    hi = (hi + Math.imul(ah5, bh5)) | 0;
    lo = (lo + Math.imul(al4, bl6)) | 0;
    mid = (mid + Math.imul(al4, bh6)) | 0;
    mid = (mid + Math.imul(ah4, bl6)) | 0;
    hi = (hi + Math.imul(ah4, bh6)) | 0;
    lo = (lo + Math.imul(al3, bl7)) | 0;
    mid = (mid + Math.imul(al3, bh7)) | 0;
    mid = (mid + Math.imul(ah3, bl7)) | 0;
    hi = (hi + Math.imul(ah3, bh7)) | 0;
    lo = (lo + Math.imul(al2, bl8)) | 0;
    mid = (mid + Math.imul(al2, bh8)) | 0;
    mid = (mid + Math.imul(ah2, bl8)) | 0;
    hi = (hi + Math.imul(ah2, bh8)) | 0;
    lo = (lo + Math.imul(al1, bl9)) | 0;
    mid = (mid + Math.imul(al1, bh9)) | 0;
    mid = (mid + Math.imul(ah1, bl9)) | 0;
    hi = (hi + Math.imul(ah1, bh9)) | 0;
    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */
    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = (mid + Math.imul(ah9, bl2)) | 0;
    hi = Math.imul(ah9, bh2);
    lo = (lo + Math.imul(al8, bl3)) | 0;
    mid = (mid + Math.imul(al8, bh3)) | 0;
    mid = (mid + Math.imul(ah8, bl3)) | 0;
    hi = (hi + Math.imul(ah8, bh3)) | 0;
    lo = (lo + Math.imul(al7, bl4)) | 0;
    mid = (mid + Math.imul(al7, bh4)) | 0;
    mid = (mid + Math.imul(ah7, bl4)) | 0;
    hi = (hi + Math.imul(ah7, bh4)) | 0;
    lo = (lo + Math.imul(al6, bl5)) | 0;
    mid = (mid + Math.imul(al6, bh5)) | 0;
    mid = (mid + Math.imul(ah6, bl5)) | 0;
    hi = (hi + Math.imul(ah6, bh5)) | 0;
    lo = (lo + Math.imul(al5, bl6)) | 0;
    mid = (mid + Math.imul(al5, bh6)) | 0;
    mid = (mid + Math.imul(ah5, bl6)) | 0;
    hi = (hi + Math.imul(ah5, bh6)) | 0;
    lo = (lo + Math.imul(al4, bl7)) | 0;
    mid = (mid + Math.imul(al4, bh7)) | 0;
    mid = (mid + Math.imul(ah4, bl7)) | 0;
    hi = (hi + Math.imul(ah4, bh7)) | 0;
    lo = (lo + Math.imul(al3, bl8)) | 0;
    mid = (mid + Math.imul(al3, bh8)) | 0;
    mid = (mid + Math.imul(ah3, bl8)) | 0;
    hi = (hi + Math.imul(ah3, bh8)) | 0;
    lo = (lo + Math.imul(al2, bl9)) | 0;
    mid = (mid + Math.imul(al2, bh9)) | 0;
    mid = (mid + Math.imul(ah2, bl9)) | 0;
    hi = (hi + Math.imul(ah2, bh9)) | 0;
    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */
    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = (mid + Math.imul(ah9, bl3)) | 0;
    hi = Math.imul(ah9, bh3);
    lo = (lo + Math.imul(al8, bl4)) | 0;
    mid = (mid + Math.imul(al8, bh4)) | 0;
    mid = (mid + Math.imul(ah8, bl4)) | 0;
    hi = (hi + Math.imul(ah8, bh4)) | 0;
    lo = (lo + Math.imul(al7, bl5)) | 0;
    mid = (mid + Math.imul(al7, bh5)) | 0;
    mid = (mid + Math.imul(ah7, bl5)) | 0;
    hi = (hi + Math.imul(ah7, bh5)) | 0;
    lo = (lo + Math.imul(al6, bl6)) | 0;
    mid = (mid + Math.imul(al6, bh6)) | 0;
    mid = (mid + Math.imul(ah6, bl6)) | 0;
    hi = (hi + Math.imul(ah6, bh6)) | 0;
    lo = (lo + Math.imul(al5, bl7)) | 0;
    mid = (mid + Math.imul(al5, bh7)) | 0;
    mid = (mid + Math.imul(ah5, bl7)) | 0;
    hi = (hi + Math.imul(ah5, bh7)) | 0;
    lo = (lo + Math.imul(al4, bl8)) | 0;
    mid = (mid + Math.imul(al4, bh8)) | 0;
    mid = (mid + Math.imul(ah4, bl8)) | 0;
    hi = (hi + Math.imul(ah4, bh8)) | 0;
    lo = (lo + Math.imul(al3, bl9)) | 0;
    mid = (mid + Math.imul(al3, bh9)) | 0;
    mid = (mid + Math.imul(ah3, bl9)) | 0;
    hi = (hi + Math.imul(ah3, bh9)) | 0;
    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */
    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = (mid + Math.imul(ah9, bl4)) | 0;
    hi = Math.imul(ah9, bh4);
    lo = (lo + Math.imul(al8, bl5)) | 0;
    mid = (mid + Math.imul(al8, bh5)) | 0;
    mid = (mid + Math.imul(ah8, bl5)) | 0;
    hi = (hi + Math.imul(ah8, bh5)) | 0;
    lo = (lo + Math.imul(al7, bl6)) | 0;
    mid = (mid + Math.imul(al7, bh6)) | 0;
    mid = (mid + Math.imul(ah7, bl6)) | 0;
    hi = (hi + Math.imul(ah7, bh6)) | 0;
    lo = (lo + Math.imul(al6, bl7)) | 0;
    mid = (mid + Math.imul(al6, bh7)) | 0;
    mid = (mid + Math.imul(ah6, bl7)) | 0;
    hi = (hi + Math.imul(ah6, bh7)) | 0;
    lo = (lo + Math.imul(al5, bl8)) | 0;
    mid = (mid + Math.imul(al5, bh8)) | 0;
    mid = (mid + Math.imul(ah5, bl8)) | 0;
    hi = (hi + Math.imul(ah5, bh8)) | 0;
    lo = (lo + Math.imul(al4, bl9)) | 0;
    mid = (mid + Math.imul(al4, bh9)) | 0;
    mid = (mid + Math.imul(ah4, bl9)) | 0;
    hi = (hi + Math.imul(ah4, bh9)) | 0;
    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */
    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = (mid + Math.imul(ah9, bl5)) | 0;
    hi = Math.imul(ah9, bh5);
    lo = (lo + Math.imul(al8, bl6)) | 0;
    mid = (mid + Math.imul(al8, bh6)) | 0;
    mid = (mid + Math.imul(ah8, bl6)) | 0;
    hi = (hi + Math.imul(ah8, bh6)) | 0;
    lo = (lo + Math.imul(al7, bl7)) | 0;
    mid = (mid + Math.imul(al7, bh7)) | 0;
    mid = (mid + Math.imul(ah7, bl7)) | 0;
    hi = (hi + Math.imul(ah7, bh7)) | 0;
    lo = (lo + Math.imul(al6, bl8)) | 0;
    mid = (mid + Math.imul(al6, bh8)) | 0;
    mid = (mid + Math.imul(ah6, bl8)) | 0;
    hi = (hi + Math.imul(ah6, bh8)) | 0;
    lo = (lo + Math.imul(al5, bl9)) | 0;
    mid = (mid + Math.imul(al5, bh9)) | 0;
    mid = (mid + Math.imul(ah5, bl9)) | 0;
    hi = (hi + Math.imul(ah5, bh9)) | 0;
    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */
    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = (mid + Math.imul(ah9, bl6)) | 0;
    hi = Math.imul(ah9, bh6);
    lo = (lo + Math.imul(al8, bl7)) | 0;
    mid = (mid + Math.imul(al8, bh7)) | 0;
    mid = (mid + Math.imul(ah8, bl7)) | 0;
    hi = (hi + Math.imul(ah8, bh7)) | 0;
    lo = (lo + Math.imul(al7, bl8)) | 0;
    mid = (mid + Math.imul(al7, bh8)) | 0;
    mid = (mid + Math.imul(ah7, bl8)) | 0;
    hi = (hi + Math.imul(ah7, bh8)) | 0;
    lo = (lo + Math.imul(al6, bl9)) | 0;
    mid = (mid + Math.imul(al6, bh9)) | 0;
    mid = (mid + Math.imul(ah6, bl9)) | 0;
    hi = (hi + Math.imul(ah6, bh9)) | 0;
    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */
    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = (mid + Math.imul(ah9, bl7)) | 0;
    hi = Math.imul(ah9, bh7);
    lo = (lo + Math.imul(al8, bl8)) | 0;
    mid = (mid + Math.imul(al8, bh8)) | 0;
    mid = (mid + Math.imul(ah8, bl8)) | 0;
    hi = (hi + Math.imul(ah8, bh8)) | 0;
    lo = (lo + Math.imul(al7, bl9)) | 0;
    mid = (mid + Math.imul(al7, bh9)) | 0;
    mid = (mid + Math.imul(ah7, bl9)) | 0;
    hi = (hi + Math.imul(ah7, bh9)) | 0;
    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */
    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = (mid + Math.imul(ah9, bl8)) | 0;
    hi = Math.imul(ah9, bh8);
    lo = (lo + Math.imul(al8, bl9)) | 0;
    mid = (mid + Math.imul(al8, bh9)) | 0;
    mid = (mid + Math.imul(ah8, bl9)) | 0;
    hi = (hi + Math.imul(ah8, bh9)) | 0;
    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */
    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = (mid + Math.imul(ah9, bl9)) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;
    if (c !== 0) {
      o[19] = c;
      out.length++;
    }
    return out;
  };

  // Polyfill comb
  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;

    var carry = 0;
    var hncarry = 0;
    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;

        var lo = r & 0x3ffffff;
        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
        lo = (lo + rword) | 0;
        rword = lo & 0x3ffffff;
        ncarry = (ncarry + (lo >>> 26)) | 0;

        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }
      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }
    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out.strip();
  }

  function jumboMulTo (self, num, out) {
    var fftm = new FFTM();
    return fftm.mulp(self, num, out);
  }

  BN.prototype.mulTo = function mulTo (num, out) {
    var res;
    var len = this.length + num.length;
    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  };

  // Cooley-Tukey algorithm for FFT
  // slightly revisited to rely on looping instead of recursion

  function FFTM (x, y) {
    this.x = x;
    this.y = y;
  }

  FFTM.prototype.makeRBT = function makeRBT (N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;
    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }

    return t;
  };

  // Returns binary-reversed representation of `x`
  FFTM.prototype.revBin = function revBin (x, l, N) {
    if (x === 0 || x === N - 1) return x;

    var rb = 0;
    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << (l - i - 1);
      x >>= 1;
    }

    return rb;
  };

  // Performs "tweedling" phase, therefore 'emulating'
  // behaviour of the recursive algorithm
  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };

  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);

    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;

      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);

      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;

        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];

          var ro = rtws[p + j + s];
          var io = itws[p + j + s];

          var rx = rtwdf_ * ro - itwdf_ * io;

          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;

          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;

          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;

          /* jshint maxdepth : false */
          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };

  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;
    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }

    return 1 << i + 1 + odd;
  };

  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
    if (N <= 1) return;

    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];

      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;

      t = iws[i];

      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };

  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
    var carry = 0;
    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
        Math.round(ws[2 * i] / N) +
        carry;

      ws[i] = w & 0x3ffffff;

      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }

    return ws;
  };

  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
    var carry = 0;
    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);

      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
    }

    // Pad with zeroes
    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }

    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };

  FFTM.prototype.stub = function stub (N) {
    var ph = new Array(N);
    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }

    return ph;
  };

  FFTM.prototype.mulp = function mulp (x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);

    var rbt = this.makeRBT(N);

    var _ = this.stub(N);

    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);

    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);

    var rmws = out.words;
    rmws.length = N;

    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);

    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);

    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }

    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);

    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out.strip();
  };

  // Multiply `this` by `num`
  BN.prototype.mul = function mul (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  };

  // Multiply employing FFT
  BN.prototype.mulf = function mulf (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  };

  // In-place Multiplication
  BN.prototype.imul = function imul (num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);

    // Carry
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += (w / 0x4000000) | 0;
      // NOTE: lo is 27bit maximum
      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.muln = function muln (num) {
    return this.clone().imuln(num);
  };

  // `this` * `this`
  BN.prototype.sqr = function sqr () {
    return this.mul(this);
  };

  // `this` * `this` in-place
  BN.prototype.isqr = function isqr () {
    return this.imul(this.clone());
  };

  // Math.pow(`this`, `num`)
  BN.prototype.pow = function pow (num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1);

    // Skip leading zeroes
    var res = this;
    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;

        res = res.mul(q);
      }
    }

    return res;
  };

  // Shift-left in-place
  BN.prototype.iushln = function iushln (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = ((this.words[i] | 0) - newCarry) << r;
        this.words[i] = c | carry;
        carry = newCarry >>> (26 - r);
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this.strip();
  };

  BN.prototype.ishln = function ishln (bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  };

  // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits
  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;
    if (hint) {
      h = (hint - (hint % 26)) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
    var maskedWords = extended;

    h -= s;
    h = Math.max(0, h);

    // Extended mode, copy masked part
    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }
      maskedWords.length = s;
    }

    if (s === 0) {
      // No-op, we should not move anything at all
    } else if (this.length > s) {
      this.length -= s;
      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;
    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = (carry << (26 - r)) | (word >>> r);
      carry = word & mask;
    }

    // Push carried bits as a mask
    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this.strip();
  };

  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  };

  // Shift-left
  BN.prototype.shln = function shln (bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln (bits) {
    return this.clone().iushln(bits);
  };

  // Shift-right
  BN.prototype.shrn = function shrn (bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn (bits) {
    return this.clone().iushrn(bits);
  };

  // Test if n bit is set
  BN.prototype.testn = function testn (bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) return false;

    // Check bit and return
    var w = this.words[s];

    return !!(w & q);
  };

  // Return only lowers bits of number (in-place)
  BN.prototype.imaskn = function imaskn (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;

    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }
    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      this.words[this.length - 1] &= mask;
    }

    return this.strip();
  };

  // Return only lowers bits of number
  BN.prototype.maskn = function maskn (bits) {
    return this.clone().imaskn(bits);
  };

  // Add plain number `num` to `this`
  BN.prototype.iaddn = function iaddn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num);

    // Possible sign change
    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) < num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    }

    // Add without checks
    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn (num) {
    this.words[0] += num;

    // Carry
    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;
      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }
    this.length = Math.max(this.length, i + 1);

    return this;
  };

  // Subtract plain number `num` from `this`
  BN.prototype.isubn = function isubn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this.strip();
  };

  BN.prototype.addn = function addn (num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn (num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs () {
    this.negative = 0;

    return this;
  };

  BN.prototype.abs = function abs () {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;
    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - ((right / 0x4000000) | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }
    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this.strip();

    // Subtraction overflow
    assert(carry === -1);
    carry = 0;
    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }
    this.negative = 1;

    return this.strip();
  };

  BN.prototype._wordDiv = function _wordDiv (num, mode) {
    var shift = this.length - num.length;

    var a = this.clone();
    var b = num;

    // Normalize
    var bhi = b.words[b.length - 1] | 0;
    var bhiBits = this._countBits(bhi);
    shift = 26 - bhiBits;
    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    }

    // Initialize quotient
    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);
      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);
    if (diff.negative === 0) {
      a = diff;
      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
        (a.words[b.length + j - 1] | 0);

      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)
      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);
      while (a.negative !== 0) {
        qj--;
        a.negative = 0;
        a._ishlnsubmul(b, 1, j);
        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }
      if (q) {
        q.words[j] = qj;
      }
    }
    if (q) {
      q.strip();
    }
    a.strip();

    // Denormalize
    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  };

  // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested
  BN.prototype.divmod = function divmod (num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;
    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    }

    // Both numbers are positive at this point

    // Strip both numbers to approximate shift value
    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    }

    // Very short reduction
    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  };

  // Find `this` / `num`
  BN.prototype.div = function div (num) {
    return this.divmod(num, 'div', false).div;
  };

  // Find `this` % `num`
  BN.prototype.mod = function mod (num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod (num) {
    return this.divmod(num, 'mod', true).mod;
  };

  // Find Round(`this` / `num`)
  BN.prototype.divRound = function divRound (num) {
    var dm = this.divmod(num);

    // Fast case - exact division
    if (dm.mod.isZero()) return dm.div;

    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half);

    // Round down
    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

    // Round up
    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modn = function modn (num) {
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;

    var acc = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return acc;
  };

  // In-place division by number
  BN.prototype.idivn = function idivn (num) {
    assert(num <= 0x3ffffff);

    var carry = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = (w / num) | 0;
      carry = w % num;
    }

    return this.strip();
  };

  BN.prototype.divn = function divn (num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    }

    // A * x + B * y = x
    var A = new BN(1);
    var B = new BN(0);

    // C * x + D * y = y
    var C = new BN(0);
    var D = new BN(1);

    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        x.iushrn(i);
        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        y.iushrn(j);
        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  };

  // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed
  BN.prototype._invmp = function _invmp (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);

    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        a.iushrn(i);
        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        b.iushrn(j);
        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;
    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd (num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();

    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0;

    // Remove common factor of two
    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }
      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);
      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  };

  // Invert number in the field F(num)
  BN.prototype.invm = function invm (num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven () {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd () {
    return (this.words[0] & 1) === 1;
  };

  // And first word and num
  BN.prototype.andln = function andln (num) {
    return this.words[0] & num;
  };

  // Increment at the bit position in-line
  BN.prototype.bincn = function bincn (bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) {
      this._expand(s + 1);
      this.words[s] |= q;
      return this;
    }

    // Add bit and propagate, if needed
    var carry = q;
    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };

  BN.prototype.isZero = function isZero () {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn (num) {
    var negative = num < 0;

    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;

    this.strip();

    var res;
    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');

      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`
  BN.prototype.cmp = function cmp (num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;

    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Unsigned comparison
  BN.prototype.ucmp = function ucmp (num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;

    var res = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;

      if (a === b) continue;
      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }
      break;
    }
    return res;
  };

  BN.prototype.gtn = function gtn (num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt (num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten (num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte (num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn (num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt (num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten (num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte (num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn (num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq (num) {
    return this.cmp(num) === 0;
  };

  //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //
  BN.red = function red (num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed () {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed (ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd (num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd (num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub (num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub (num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl (num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr () {
    assert(this.red, 'redSqr works only with red numbers');
    this.red._verify1(this);
    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr () {
    assert(this.red, 'redISqr works only with red numbers');
    this.red._verify1(this);
    return this.red.isqr(this);
  };

  // Square root over p
  BN.prototype.redSqrt = function redSqrt () {
    assert(this.red, 'redSqrt works only with red numbers');
    this.red._verify1(this);
    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm () {
    assert(this.red, 'redInvm works only with red numbers');
    this.red._verify1(this);
    return this.red.invm(this);
  };

  // Return negative clone of `this` % `red modulo`
  BN.prototype.redNeg = function redNeg () {
    assert(this.red, 'redNeg works only with red numbers');
    this.red._verify1(this);
    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow (num) {
    assert(this.red && !num.red, 'redPow(normalNum)');
    this.red._verify1(this);
    return this.red.pow(this, num);
  };

  // Prime numbers with efficient reduction
  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  };

  // Pseudo-Mersenne prime
  function MPrime (name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);

    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp () {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce (num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      r.strip();
    }

    return r;
  };

  MPrime.prototype.split = function split (input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK (num) {
    return num.imul(this.k);
  };

  function K256 () {
    MPrime.call(
      this,
      'k256',
      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }
  inherits(K256, MPrime);

  K256.prototype.split = function split (input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;

    var outLen = Math.min(input.length, 9);
    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }
    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    }

    // Shift by 9 limbs
    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
      prev = next;
    }
    prev >>>= 22;
    input.words[i - 10] = prev;
    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK (num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2;

    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
    var lo = 0;
    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + ((lo / 0x4000000) | 0);
    }

    // Fast length reduction
    if (num.words[num.length - 1] === 0) {
      num.length--;
      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }
    return num;
  };

  function P224 () {
    MPrime.call(
      this,
      'p224',
      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }
  inherits(P224, MPrime);

  function P192 () {
    MPrime.call(
      this,
      'p192',
      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }
  inherits(P192, MPrime);

  function P25519 () {
    // 2 ^ 255 - 19
    MPrime.call(
      this,
      '25519',
      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }
  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK (num) {
    // K = 0x13
    var carry = 0;
    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;

      num.words[i] = lo;
      carry = hi;
    }
    if (carry !== 0) {
      num.words[num.length++] = carry;
    }
    return num;
  };

  // Exported mostly for testing purposes, use plain name instead
  BN._prime = function prime (name) {
    // Cached version of prime
    if (primes[name]) return primes[name];

    var prime;
    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }
    primes[name] = prime;

    return prime;
  };

  //
  // Base reduction engine
  //
  function Red (m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);
      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1 (a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2 (a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red,
      'red works only with red numbers');
  };

  Red.prototype.imod = function imod (a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    return a.umod(this.m)._forceRed(this);
  };

  Red.prototype.neg = function neg (a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add (a, b) {
    this._verify2(a, b);

    var res = a.add(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd (a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res;
  };

  Red.prototype.sub = function sub (a, b) {
    this._verify2(a, b);

    var res = a.sub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.isub = function isub (a, b) {
    this._verify2(a, b);

    var res = a.isub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res;
  };

  Red.prototype.shl = function shl (a, num) {
    this._verify1(a);
    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul (a, b) {
    this._verify2(a, b);
    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul (a, b) {
    this._verify2(a, b);
    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr (a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr (a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt (a) {
    if (a.isZero()) return a.clone();

    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1);

    // Fast case
    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    }

    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)
    var q = this.m.subn(1);
    var s = 0;
    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }
    assert(!q.isZero());

    var one = new BN(1).toRed(this);
    var nOne = one.redNeg();

    // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.
    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;
    while (t.cmp(one) !== 0) {
      var tmp = t;
      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }
      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));

      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm (a) {
    var inv = a._invmp(this.m);
    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow (a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();

    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;
    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;
    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];
      for (var j = start - 1; j >= 0; j--) {
        var bit = (word >> j) & 1;
        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }
      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo (num) {
    var r = num.umod(this.m);

    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom (num) {
    var res = num.clone();
    res.red = null;
    return res;
  };

  //
  // Montgomery method engine
  //

  BN.mont = function mont (num) {
    return new Mont(num);
  };

  function Mont (m) {
    Red.call(this, m);

    this.shift = this.m.bitLength();
    if (this.shift % 26 !== 0) {
      this.shift += 26 - (this.shift % 26);
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);

    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }
  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo (num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom (num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul (a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul (a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm (a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})(typeof module === 'undefined' || module, this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../node_modules/brorand/index.js":
/***/ (function(module, exports, __webpack_require__) {

var r;

module.exports = function rand(len) {
  if (!r)
    r = new Rand(null);

  return r.generate(len);
};

function Rand(rand) {
  this.rand = rand;
}
module.exports.Rand = Rand;

Rand.prototype.generate = function generate(len) {
  return this._rand(len);
};

// Emulate crypto API using randy
Rand.prototype._rand = function _rand(n) {
  if (this.rand.getBytes)
    return this.rand.getBytes(n);

  var res = new Uint8Array(n);
  for (var i = 0; i < res.length; i++)
    res[i] = this.rand.getByte();
  return res;
};

if (typeof self === 'object') {
  if (self.crypto && self.crypto.getRandomValues) {
    // Modern browsers
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      self.crypto.getRandomValues(arr);
      return arr;
    };
  } else if (self.msCrypto && self.msCrypto.getRandomValues) {
    // IE
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      self.msCrypto.getRandomValues(arr);
      return arr;
    };

  // Safari's WebWorkers do not have `crypto`
  } else if (typeof window === 'object') {
    // Old junk
    Rand.prototype._rand = function() {
      throw new Error('Not implemented yet');
    };
  }
} else {
  // Node.js or Web worker with no crypto support
  try {
    var crypto = __webpack_require__(5);
    if (typeof crypto.randomBytes !== 'function')
      throw new Error('Not supported');

    Rand.prototype._rand = function _rand(n) {
      return crypto.randomBytes(n);
    };
  } catch (e) {
  }
}


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var elliptic = exports;

elliptic.version = __webpack_require__("../node_modules/elliptic/package.json").version;
elliptic.utils = __webpack_require__("../node_modules/elliptic/lib/elliptic/utils.js");
elliptic.rand = __webpack_require__("../node_modules/brorand/index.js");
elliptic.hmacDRBG = __webpack_require__("../node_modules/elliptic/lib/elliptic/hmac-drbg.js");
elliptic.curve = __webpack_require__("../node_modules/elliptic/lib/elliptic/curve/index.js");
elliptic.curves = __webpack_require__("../node_modules/elliptic/lib/elliptic/curves.js");

// Protocols
elliptic.ec = __webpack_require__("../node_modules/elliptic/lib/elliptic/ec/index.js");
elliptic.eddsa = __webpack_require__("../node_modules/elliptic/lib/elliptic/eddsa/index.js");


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/curve/base.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__("../node_modules/bn.js/lib/bn.js");
var elliptic = __webpack_require__("../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var getNAF = utils.getNAF;
var getJSF = utils.getJSF;
var assert = utils.assert;

function BaseCurve(type, conf) {
  this.type = type;
  this.p = new BN(conf.p, 16);

  // Use Montgomery, when there is no fast reduction for the prime
  this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);

  // Useful for many curves
  this.zero = new BN(0).toRed(this.red);
  this.one = new BN(1).toRed(this.red);
  this.two = new BN(2).toRed(this.red);

  // Curve configuration, optional
  this.n = conf.n && new BN(conf.n, 16);
  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

  // Temporary arrays
  this._wnafT1 = new Array(4);
  this._wnafT2 = new Array(4);
  this._wnafT3 = new Array(4);
  this._wnafT4 = new Array(4);

  // Generalized Greg Maxwell's trick
  var adjustCount = this.n && this.p.div(this.n);
  if (!adjustCount || adjustCount.cmpn(100) > 0) {
    this.redN = null;
  } else {
    this._maxwellTrick = true;
    this.redN = this.n.toRed(this.red);
  }
}
module.exports = BaseCurve;

BaseCurve.prototype.point = function point() {
  throw new Error('Not implemented');
};

BaseCurve.prototype.validate = function validate() {
  throw new Error('Not implemented');
};

BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
  assert(p.precomputed);
  var doubles = p._getDoubles();

  var naf = getNAF(k, 1);
  var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
  I /= 3;

  // Translate into more windowed form
  var repr = [];
  for (var j = 0; j < naf.length; j += doubles.step) {
    var nafW = 0;
    for (var k = j + doubles.step - 1; k >= j; k--)
      nafW = (nafW << 1) + naf[k];
    repr.push(nafW);
  }

  var a = this.jpoint(null, null, null);
  var b = this.jpoint(null, null, null);
  for (var i = I; i > 0; i--) {
    for (var j = 0; j < repr.length; j++) {
      var nafW = repr[j];
      if (nafW === i)
        b = b.mixedAdd(doubles.points[j]);
      else if (nafW === -i)
        b = b.mixedAdd(doubles.points[j].neg());
    }
    a = a.add(b);
  }
  return a.toP();
};

BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
  var w = 4;

  // Precompute window
  var nafPoints = p._getNAFPoints(w);
  w = nafPoints.wnd;
  var wnd = nafPoints.points;

  // Get NAF form
  var naf = getNAF(k, w);

  // Add `this`*(N+1) for every w-NAF index
  var acc = this.jpoint(null, null, null);
  for (var i = naf.length - 1; i >= 0; i--) {
    // Count zeroes
    for (var k = 0; i >= 0 && naf[i] === 0; i--)
      k++;
    if (i >= 0)
      k++;
    acc = acc.dblp(k);

    if (i < 0)
      break;
    var z = naf[i];
    assert(z !== 0);
    if (p.type === 'affine') {
      // J +- P
      if (z > 0)
        acc = acc.mixedAdd(wnd[(z - 1) >> 1]);
      else
        acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg());
    } else {
      // J +- J
      if (z > 0)
        acc = acc.add(wnd[(z - 1) >> 1]);
      else
        acc = acc.add(wnd[(-z - 1) >> 1].neg());
    }
  }
  return p.type === 'affine' ? acc.toP() : acc;
};

BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
                                                       points,
                                                       coeffs,
                                                       len,
                                                       jacobianResult) {
  var wndWidth = this._wnafT1;
  var wnd = this._wnafT2;
  var naf = this._wnafT3;

  // Fill all arrays
  var max = 0;
  for (var i = 0; i < len; i++) {
    var p = points[i];
    var nafPoints = p._getNAFPoints(defW);
    wndWidth[i] = nafPoints.wnd;
    wnd[i] = nafPoints.points;
  }

  // Comb small window NAFs
  for (var i = len - 1; i >= 1; i -= 2) {
    var a = i - 1;
    var b = i;
    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
      naf[a] = getNAF(coeffs[a], wndWidth[a]);
      naf[b] = getNAF(coeffs[b], wndWidth[b]);
      max = Math.max(naf[a].length, max);
      max = Math.max(naf[b].length, max);
      continue;
    }

    var comb = [
      points[a], /* 1 */
      null, /* 3 */
      null, /* 5 */
      points[b] /* 7 */
    ];

    // Try to avoid Projective points, if possible
    if (points[a].y.cmp(points[b].y) === 0) {
      comb[1] = points[a].add(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].add(points[b].neg());
    } else {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    }

    var index = [
      -3, /* -1 -1 */
      -1, /* -1 0 */
      -5, /* -1 1 */
      -7, /* 0 -1 */
      0, /* 0 0 */
      7, /* 0 1 */
      5, /* 1 -1 */
      1, /* 1 0 */
      3  /* 1 1 */
    ];

    var jsf = getJSF(coeffs[a], coeffs[b]);
    max = Math.max(jsf[0].length, max);
    naf[a] = new Array(max);
    naf[b] = new Array(max);
    for (var j = 0; j < max; j++) {
      var ja = jsf[0][j] | 0;
      var jb = jsf[1][j] | 0;

      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
      naf[b][j] = 0;
      wnd[a] = comb;
    }
  }

  var acc = this.jpoint(null, null, null);
  var tmp = this._wnafT4;
  for (var i = max; i >= 0; i--) {
    var k = 0;

    while (i >= 0) {
      var zero = true;
      for (var j = 0; j < len; j++) {
        tmp[j] = naf[j][i] | 0;
        if (tmp[j] !== 0)
          zero = false;
      }
      if (!zero)
        break;
      k++;
      i--;
    }
    if (i >= 0)
      k++;
    acc = acc.dblp(k);
    if (i < 0)
      break;

    for (var j = 0; j < len; j++) {
      var z = tmp[j];
      var p;
      if (z === 0)
        continue;
      else if (z > 0)
        p = wnd[j][(z - 1) >> 1];
      else if (z < 0)
        p = wnd[j][(-z - 1) >> 1].neg();

      if (p.type === 'affine')
        acc = acc.mixedAdd(p);
      else
        acc = acc.add(p);
    }
  }
  // Zeroify references
  for (var i = 0; i < len; i++)
    wnd[i] = null;

  if (jacobianResult)
    return acc;
  else
    return acc.toP();
};

function BasePoint(curve, type) {
  this.curve = curve;
  this.type = type;
  this.precomputed = null;
}
BaseCurve.BasePoint = BasePoint;

BasePoint.prototype.eq = function eq(/*other*/) {
  throw new Error('Not implemented');
};

BasePoint.prototype.validate = function validate() {
  return this.curve.validate(this);
};

BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  bytes = utils.toArray(bytes, enc);

  var len = this.p.byteLength();

  // uncompressed, hybrid-odd, hybrid-even
  if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
      bytes.length - 1 === 2 * len) {
    if (bytes[0] === 0x06)
      assert(bytes[bytes.length - 1] % 2 === 0);
    else if (bytes[0] === 0x07)
      assert(bytes[bytes.length - 1] % 2 === 1);

    var res =  this.point(bytes.slice(1, 1 + len),
                          bytes.slice(1 + len, 1 + 2 * len));

    return res;
  } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
              bytes.length - 1 === len) {
    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
  }
  throw new Error('Unknown point format');
};

BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
  return this.encode(enc, true);
};

BasePoint.prototype._encode = function _encode(compact) {
  var len = this.curve.p.byteLength();
  var x = this.getX().toArray('be', len);

  if (compact)
    return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x);

  return [ 0x04 ].concat(x, this.getY().toArray('be', len)) ;
};

BasePoint.prototype.encode = function encode(enc, compact) {
  return utils.encode(this._encode(compact), enc);
};

BasePoint.prototype.precompute = function precompute(power) {
  if (this.precomputed)
    return this;

  var precomputed = {
    doubles: null,
    naf: null,
    beta: null
  };
  precomputed.naf = this._getNAFPoints(8);
  precomputed.doubles = this._getDoubles(4, power);
  precomputed.beta = this._getBeta();
  this.precomputed = precomputed;

  return this;
};

BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
  if (!this.precomputed)
    return false;

  var doubles = this.precomputed.doubles;
  if (!doubles)
    return false;

  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
};

BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;

  var doubles = [ this ];
  var acc = this;
  for (var i = 0; i < power; i += step) {
    for (var j = 0; j < step; j++)
      acc = acc.dbl();
    doubles.push(acc);
  }
  return {
    step: step,
    points: doubles
  };
};

BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;

  var res = [ this ];
  var max = (1 << wnd) - 1;
  var dbl = max === 1 ? null : this.dbl();
  for (var i = 1; i < max; i++)
    res[i] = res[i - 1].add(dbl);
  return {
    wnd: wnd,
    points: res
  };
};

BasePoint.prototype._getBeta = function _getBeta() {
  return null;
};

BasePoint.prototype.dblp = function dblp(k) {
  var r = this;
  for (var i = 0; i < k; i++)
    r = r.dbl();
  return r;
};


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/curve/edwards.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = __webpack_require__("../node_modules/elliptic/lib/elliptic/curve/index.js");
var elliptic = __webpack_require__("../node_modules/elliptic/lib/elliptic.js");
var BN = __webpack_require__("../node_modules/bn.js/lib/bn.js");
var inherits = __webpack_require__("../node_modules/inherits/inherits_browser.js");
var Base = curve.base;

var assert = elliptic.utils.assert;

function EdwardsCurve(conf) {
  // NOTE: Important as we are creating point in Base.call()
  this.twisted = (conf.a | 0) !== 1;
  this.mOneA = this.twisted && (conf.a | 0) === -1;
  this.extended = this.mOneA;

  Base.call(this, 'edwards', conf);

  this.a = new BN(conf.a, 16).umod(this.red.m);
  this.a = this.a.toRed(this.red);
  this.c = new BN(conf.c, 16).toRed(this.red);
  this.c2 = this.c.redSqr();
  this.d = new BN(conf.d, 16).toRed(this.red);
  this.dd = this.d.redAdd(this.d);

  assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
  this.oneC = (conf.c | 0) === 1;
}
inherits(EdwardsCurve, Base);
module.exports = EdwardsCurve;

EdwardsCurve.prototype._mulA = function _mulA(num) {
  if (this.mOneA)
    return num.redNeg();
  else
    return this.a.redMul(num);
};

EdwardsCurve.prototype._mulC = function _mulC(num) {
  if (this.oneC)
    return num;
  else
    return this.c.redMul(num);
};

// Just for compatibility with Short curve
EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
  return this.point(x, y, z, t);
};

EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var x2 = x.redSqr();
  var rhs = this.c2.redSub(this.a.redMul(x2));
  var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));

  var y2 = rhs.redMul(lhs.redInvm());
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
  y = new BN(y, 16);
  if (!y.red)
    y = y.toRed(this.red);

  // x^2 = (y^2 - 1) / (d y^2 + 1)
  var y2 = y.redSqr();
  var lhs = y2.redSub(this.one);
  var rhs = y2.redMul(this.d).redAdd(this.one);
  var x2 = lhs.redMul(rhs.redInvm());

  if (x2.cmp(this.zero) === 0) {
    if (odd)
      throw new Error('invalid point');
    else
      return this.point(this.zero, y);
  }

  var x = x2.redSqrt();
  if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  if (x.isOdd() !== odd)
    x = x.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.validate = function validate(point) {
  if (point.isInfinity())
    return true;

  // Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
  point.normalize();

  var x2 = point.x.redSqr();
  var y2 = point.y.redSqr();
  var lhs = x2.redMul(this.a).redAdd(y2);
  var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));

  return lhs.cmp(rhs) === 0;
};

function Point(curve, x, y, z, t) {
  Base.BasePoint.call(this, curve, 'projective');
  if (x === null && y === null && z === null) {
    this.x = this.curve.zero;
    this.y = this.curve.one;
    this.z = this.curve.one;
    this.t = this.curve.zero;
    this.zOne = true;
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    this.z = z ? new BN(z, 16) : this.curve.one;
    this.t = t && new BN(t, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
    if (this.t && !this.t.red)
      this.t = this.t.toRed(this.curve.red);
    this.zOne = this.z === this.curve.one;

    // Use extended coordinates
    if (this.curve.extended && !this.t) {
      this.t = this.x.redMul(this.y);
      if (!this.zOne)
        this.t = this.t.redMul(this.z.redInvm());
    }
  }
}
inherits(Point, Base.BasePoint);

EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point.fromJSON(this, obj);
};

EdwardsCurve.prototype.point = function point(x, y, z, t) {
  return new Point(this, x, y, z, t);
};

Point.fromJSON = function fromJSON(curve, obj) {
  return new Point(curve, obj[0], obj[1], obj[2]);
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.x.cmpn(0) === 0 &&
         this.y.cmp(this.z) === 0;
};

Point.prototype._extDbl = function _extDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #doubling-dbl-2008-hwcd
  // 4M + 4S

  // A = X1^2
  var a = this.x.redSqr();
  // B = Y1^2
  var b = this.y.redSqr();
  // C = 2 * Z1^2
  var c = this.z.redSqr();
  c = c.redIAdd(c);
  // D = a * A
  var d = this.curve._mulA(a);
  // E = (X1 + Y1)^2 - A - B
  var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
  // G = D + B
  var g = d.redAdd(b);
  // F = G - C
  var f = g.redSub(c);
  // H = D - B
  var h = d.redSub(b);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projDbl = function _projDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #doubling-dbl-2008-bbjlp
  //     #doubling-dbl-2007-bl
  // and others
  // Generally 3M + 4S or 2M + 4S

  // B = (X1 + Y1)^2
  var b = this.x.redAdd(this.y).redSqr();
  // C = X1^2
  var c = this.x.redSqr();
  // D = Y1^2
  var d = this.y.redSqr();

  var nx;
  var ny;
  var nz;
  if (this.curve.twisted) {
    // E = a * C
    var e = this.curve._mulA(c);
    // F = E + D
    var f = e.redAdd(d);
    if (this.zOne) {
      // X3 = (B - C - D) * (F - 2)
      nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F^2 - 2 * F
      nz = f.redSqr().redSub(f).redSub(f);
    } else {
      // H = Z1^2
      var h = this.z.redSqr();
      // J = F - 2 * H
      var j = f.redSub(h).redISub(h);
      // X3 = (B-C-D)*J
      nx = b.redSub(c).redISub(d).redMul(j);
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F * J
      nz = f.redMul(j);
    }
  } else {
    // E = C + D
    var e = c.redAdd(d);
    // H = (c * Z1)^2
    var h = this.curve._mulC(this.c.redMul(this.z)).redSqr();
    // J = E - 2 * H
    var j = e.redSub(h).redSub(h);
    // X3 = c * (B - E) * J
    nx = this.curve._mulC(b.redISub(e)).redMul(j);
    // Y3 = c * E * (C - D)
    ny = this.curve._mulC(e).redMul(c.redISub(d));
    // Z3 = E * J
    nz = e.redMul(j);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  // Double in extended coordinates
  if (this.curve.extended)
    return this._extDbl();
  else
    return this._projDbl();
};

Point.prototype._extAdd = function _extAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #addition-add-2008-hwcd-3
  // 8M

  // A = (Y1 - X1) * (Y2 - X2)
  var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
  // B = (Y1 + X1) * (Y2 + X2)
  var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
  // C = T1 * k * T2
  var c = this.t.redMul(this.curve.dd).redMul(p.t);
  // D = Z1 * 2 * Z2
  var d = this.z.redMul(p.z.redAdd(p.z));
  // E = B - A
  var e = b.redSub(a);
  // F = D - C
  var f = d.redSub(c);
  // G = D + C
  var g = d.redAdd(c);
  // H = B + A
  var h = b.redAdd(a);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projAdd = function _projAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #addition-add-2008-bbjlp
  //     #addition-add-2007-bl
  // 10M + 1S

  // A = Z1 * Z2
  var a = this.z.redMul(p.z);
  // B = A^2
  var b = a.redSqr();
  // C = X1 * X2
  var c = this.x.redMul(p.x);
  // D = Y1 * Y2
  var d = this.y.redMul(p.y);
  // E = d * C * D
  var e = this.curve.d.redMul(c).redMul(d);
  // F = B - E
  var f = b.redSub(e);
  // G = B + E
  var g = b.redAdd(e);
  // X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
  var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
  var nx = a.redMul(f).redMul(tmp);
  var ny;
  var nz;
  if (this.curve.twisted) {
    // Y3 = A * G * (D - a * C)
    ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
    // Z3 = F * G
    nz = f.redMul(g);
  } else {
    // Y3 = A * G * (D - C)
    ny = a.redMul(g).redMul(d.redSub(c));
    // Z3 = c * F * G
    nz = this.curve._mulC(f).redMul(g);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.add = function add(p) {
  if (this.isInfinity())
    return p;
  if (p.isInfinity())
    return this;

  if (this.curve.extended)
    return this._extAdd(p);
  else
    return this._projAdd(p);
};

Point.prototype.mul = function mul(k) {
  if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else
    return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, false);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, true);
};

Point.prototype.normalize = function normalize() {
  if (this.zOne)
    return this;

  // Normalize coordinates
  var zi = this.z.redInvm();
  this.x = this.x.redMul(zi);
  this.y = this.y.redMul(zi);
  if (this.t)
    this.t = this.t.redMul(zi);
  this.z = this.curve.one;
  this.zOne = true;
  return this;
};

Point.prototype.neg = function neg() {
  return this.curve.point(this.x.redNeg(),
                          this.y,
                          this.z,
                          this.t && this.t.redNeg());
};

Point.prototype.getX = function getX() {
  this.normalize();
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  this.normalize();
  return this.y.fromRed();
};

Point.prototype.eq = function eq(other) {
  return this === other ||
         this.getX().cmp(other.getX()) === 0 &&
         this.getY().cmp(other.getY()) === 0;
};

Point.prototype.eqXToP = function eqXToP(x) {
  var rx = x.toRed(this.curve.red).redMul(this.z);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(this.z);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
  return false;
};

// Compatibility with BaseCurve
Point.prototype.toP = Point.prototype.normalize;
Point.prototype.mixedAdd = Point.prototype.add;


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/curve/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = exports;

curve.base = __webpack_require__("../node_modules/elliptic/lib/elliptic/curve/base.js");
curve.short = __webpack_require__("../node_modules/elliptic/lib/elliptic/curve/short.js");
curve.mont = __webpack_require__("../node_modules/elliptic/lib/elliptic/curve/mont.js");
curve.edwards = __webpack_require__("../node_modules/elliptic/lib/elliptic/curve/edwards.js");


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/curve/mont.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = __webpack_require__("../node_modules/elliptic/lib/elliptic/curve/index.js");
var BN = __webpack_require__("../node_modules/bn.js/lib/bn.js");
var inherits = __webpack_require__("../node_modules/inherits/inherits_browser.js");
var Base = curve.base;

var elliptic = __webpack_require__("../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;

function MontCurve(conf) {
  Base.call(this, 'mont', conf);

  this.a = new BN(conf.a, 16).toRed(this.red);
  this.b = new BN(conf.b, 16).toRed(this.red);
  this.i4 = new BN(4).toRed(this.red).redInvm();
  this.two = new BN(2).toRed(this.red);
  this.a24 = this.i4.redMul(this.a.redAdd(this.two));
}
inherits(MontCurve, Base);
module.exports = MontCurve;

MontCurve.prototype.validate = function validate(point) {
  var x = point.normalize().x;
  var x2 = x.redSqr();
  var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
  var y = rhs.redSqrt();

  return y.redSqr().cmp(rhs) === 0;
};

function Point(curve, x, z) {
  Base.BasePoint.call(this, curve, 'projective');
  if (x === null && z === null) {
    this.x = this.curve.one;
    this.z = this.curve.zero;
  } else {
    this.x = new BN(x, 16);
    this.z = new BN(z, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
  }
}
inherits(Point, Base.BasePoint);

MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  return this.point(utils.toArray(bytes, enc), 1);
};

MontCurve.prototype.point = function point(x, z) {
  return new Point(this, x, z);
};

MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point.fromJSON(this, obj);
};

Point.prototype.precompute = function precompute() {
  // No-op
};

Point.prototype._encode = function _encode() {
  return this.getX().toArray('be', this.curve.p.byteLength());
};

Point.fromJSON = function fromJSON(curve, obj) {
  return new Point(curve, obj[0], obj[1] || curve.one);
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};

Point.prototype.dbl = function dbl() {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
  // 2M + 2S + 4A

  // A = X1 + Z1
  var a = this.x.redAdd(this.z);
  // AA = A^2
  var aa = a.redSqr();
  // B = X1 - Z1
  var b = this.x.redSub(this.z);
  // BB = B^2
  var bb = b.redSqr();
  // C = AA - BB
  var c = aa.redSub(bb);
  // X3 = AA * BB
  var nx = aa.redMul(bb);
  // Z3 = C * (BB + A24 * C)
  var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
  return this.curve.point(nx, nz);
};

Point.prototype.add = function add() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.diffAdd = function diffAdd(p, diff) {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
  // 4M + 2S + 6A

  // A = X2 + Z2
  var a = this.x.redAdd(this.z);
  // B = X2 - Z2
  var b = this.x.redSub(this.z);
  // C = X3 + Z3
  var c = p.x.redAdd(p.z);
  // D = X3 - Z3
  var d = p.x.redSub(p.z);
  // DA = D * A
  var da = d.redMul(a);
  // CB = C * B
  var cb = c.redMul(b);
  // X5 = Z1 * (DA + CB)^2
  var nx = diff.z.redMul(da.redAdd(cb).redSqr());
  // Z5 = X1 * (DA - CB)^2
  var nz = diff.x.redMul(da.redISub(cb).redSqr());
  return this.curve.point(nx, nz);
};

Point.prototype.mul = function mul(k) {
  var t = k.clone();
  var a = this; // (N / 2) * Q + Q
  var b = this.curve.point(null, null); // (N / 2) * Q
  var c = this; // Q

  for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
    bits.push(t.andln(1));

  for (var i = bits.length - 1; i >= 0; i--) {
    if (bits[i] === 0) {
      // N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
      a = a.diffAdd(b, c);
      // N * Q = 2 * ((N / 2) * Q + Q))
      b = b.dbl();
    } else {
      // N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
      b = a.diffAdd(b, c);
      // N * Q + Q = 2 * ((N / 2) * Q + Q)
      a = a.dbl();
    }
  }
  return b;
};

Point.prototype.mulAdd = function mulAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.jumlAdd = function jumlAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.eq = function eq(other) {
  return this.getX().cmp(other.getX()) === 0;
};

Point.prototype.normalize = function normalize() {
  this.x = this.x.redMul(this.z.redInvm());
  this.z = this.curve.one;
  return this;
};

Point.prototype.getX = function getX() {
  // Normalize coordinates
  this.normalize();

  return this.x.fromRed();
};


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/curve/short.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = __webpack_require__("../node_modules/elliptic/lib/elliptic/curve/index.js");
var elliptic = __webpack_require__("../node_modules/elliptic/lib/elliptic.js");
var BN = __webpack_require__("../node_modules/bn.js/lib/bn.js");
var inherits = __webpack_require__("../node_modules/inherits/inherits_browser.js");
var Base = curve.base;

var assert = elliptic.utils.assert;

function ShortCurve(conf) {
  Base.call(this, 'short', conf);

  this.a = new BN(conf.a, 16).toRed(this.red);
  this.b = new BN(conf.b, 16).toRed(this.red);
  this.tinv = this.two.redInvm();

  this.zeroA = this.a.fromRed().cmpn(0) === 0;
  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

  // If the curve is endomorphic, precalculate beta and lambda
  this.endo = this._getEndomorphism(conf);
  this._endoWnafT1 = new Array(4);
  this._endoWnafT2 = new Array(4);
}
inherits(ShortCurve, Base);
module.exports = ShortCurve;

ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
  // No efficient endomorphism
  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
    return;

  // Compute beta and lambda, that lambda * P = (beta * Px; Py)
  var beta;
  var lambda;
  if (conf.beta) {
    beta = new BN(conf.beta, 16).toRed(this.red);
  } else {
    var betas = this._getEndoRoots(this.p);
    // Choose the smallest beta
    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
    beta = beta.toRed(this.red);
  }
  if (conf.lambda) {
    lambda = new BN(conf.lambda, 16);
  } else {
    // Choose the lambda that is matching selected beta
    var lambdas = this._getEndoRoots(this.n);
    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
      lambda = lambdas[0];
    } else {
      lambda = lambdas[1];
      assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
    }
  }

  // Get basis vectors, used for balanced length-two representation
  var basis;
  if (conf.basis) {
    basis = conf.basis.map(function(vec) {
      return {
        a: new BN(vec.a, 16),
        b: new BN(vec.b, 16)
      };
    });
  } else {
    basis = this._getEndoBasis(lambda);
  }

  return {
    beta: beta,
    lambda: lambda,
    basis: basis
  };
};

ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
  // Find roots of for x^2 + x + 1 in F
  // Root = (-1 +- Sqrt(-3)) / 2
  //
  var red = num === this.p ? this.red : BN.mont(num);
  var tinv = new BN(2).toRed(red).redInvm();
  var ntinv = tinv.redNeg();

  var s = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);

  var l1 = ntinv.redAdd(s).fromRed();
  var l2 = ntinv.redSub(s).fromRed();
  return [ l1, l2 ];
};

ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
  // aprxSqrt >= sqrt(this.n)
  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

  // 3.74
  // Run EGCD, until r(L + 1) < aprxSqrt
  var u = lambda;
  var v = this.n.clone();
  var x1 = new BN(1);
  var y1 = new BN(0);
  var x2 = new BN(0);
  var y2 = new BN(1);

  // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
  var a0;
  var b0;
  // First vector
  var a1;
  var b1;
  // Second vector
  var a2;
  var b2;

  var prevR;
  var i = 0;
  var r;
  var x;
  while (u.cmpn(0) !== 0) {
    var q = v.div(u);
    r = v.sub(q.mul(u));
    x = x2.sub(q.mul(x1));
    var y = y2.sub(q.mul(y1));

    if (!a1 && r.cmp(aprxSqrt) < 0) {
      a0 = prevR.neg();
      b0 = x1;
      a1 = r.neg();
      b1 = x;
    } else if (a1 && ++i === 2) {
      break;
    }
    prevR = r;

    v = u;
    u = r;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
  }
  a2 = r.neg();
  b2 = x;

  var len1 = a1.sqr().add(b1.sqr());
  var len2 = a2.sqr().add(b2.sqr());
  if (len2.cmp(len1) >= 0) {
    a2 = a0;
    b2 = b0;
  }

  // Normalize signs
  if (a1.negative) {
    a1 = a1.neg();
    b1 = b1.neg();
  }
  if (a2.negative) {
    a2 = a2.neg();
    b2 = b2.neg();
  }

  return [
    { a: a1, b: b1 },
    { a: a2, b: b2 }
  ];
};

ShortCurve.prototype._endoSplit = function _endoSplit(k) {
  var basis = this.endo.basis;
  var v1 = basis[0];
  var v2 = basis[1];

  var c1 = v2.b.mul(k).divRound(this.n);
  var c2 = v1.b.neg().mul(k).divRound(this.n);

  var p1 = c1.mul(v1.a);
  var p2 = c2.mul(v2.a);
  var q1 = c1.mul(v1.b);
  var q2 = c2.mul(v2.b);

  // Calculate answer
  var k1 = k.sub(p1).sub(p2);
  var k2 = q1.add(q2).neg();
  return { k1: k1, k2: k2 };
};

ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  // XXX Is there any way to tell if the number is odd without converting it
  // to non-red form?
  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

ShortCurve.prototype.validate = function validate(point) {
  if (point.inf)
    return true;

  var x = point.x;
  var y = point.y;

  var ax = this.a.redMul(x);
  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
  return y.redSqr().redISub(rhs).cmpn(0) === 0;
};

ShortCurve.prototype._endoWnafMulAdd =
    function _endoWnafMulAdd(points, coeffs, jacobianResult) {
  var npoints = this._endoWnafT1;
  var ncoeffs = this._endoWnafT2;
  for (var i = 0; i < points.length; i++) {
    var split = this._endoSplit(coeffs[i]);
    var p = points[i];
    var beta = p._getBeta();

    if (split.k1.negative) {
      split.k1.ineg();
      p = p.neg(true);
    }
    if (split.k2.negative) {
      split.k2.ineg();
      beta = beta.neg(true);
    }

    npoints[i * 2] = p;
    npoints[i * 2 + 1] = beta;
    ncoeffs[i * 2] = split.k1;
    ncoeffs[i * 2 + 1] = split.k2;
  }
  var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

  // Clean-up references to points and coefficients
  for (var j = 0; j < i * 2; j++) {
    npoints[j] = null;
    ncoeffs[j] = null;
  }
  return res;
};

function Point(curve, x, y, isRed) {
  Base.BasePoint.call(this, curve, 'affine');
  if (x === null && y === null) {
    this.x = null;
    this.y = null;
    this.inf = true;
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    // Force redgomery representation when loading from JSON
    if (isRed) {
      this.x.forceRed(this.curve.red);
      this.y.forceRed(this.curve.red);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    this.inf = false;
  }
}
inherits(Point, Base.BasePoint);

ShortCurve.prototype.point = function point(x, y, isRed) {
  return new Point(this, x, y, isRed);
};

ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
  return Point.fromJSON(this, obj, red);
};

Point.prototype._getBeta = function _getBeta() {
  if (!this.curve.endo)
    return;

  var pre = this.precomputed;
  if (pre && pre.beta)
    return pre.beta;

  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
  if (pre) {
    var curve = this.curve;
    var endoMul = function(p) {
      return curve.point(p.x.redMul(curve.endo.beta), p.y);
    };
    pre.beta = beta;
    beta.precomputed = {
      beta: null,
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(endoMul)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(endoMul)
      }
    };
  }
  return beta;
};

Point.prototype.toJSON = function toJSON() {
  if (!this.precomputed)
    return [ this.x, this.y ];

  return [ this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  } ];
};

Point.fromJSON = function fromJSON(curve, obj, red) {
  if (typeof obj === 'string')
    obj = JSON.parse(obj);
  var res = curve.point(obj[0], obj[1], red);
  if (!obj[2])
    return res;

  function obj2point(obj) {
    return curve.point(obj[0], obj[1], red);
  }

  var pre = obj[2];
  res.precomputed = {
    beta: null,
    doubles: pre.doubles && {
      step: pre.doubles.step,
      points: [ res ].concat(pre.doubles.points.map(obj2point))
    },
    naf: pre.naf && {
      wnd: pre.naf.wnd,
      points: [ res ].concat(pre.naf.points.map(obj2point))
    }
  };
  return res;
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  return this.inf;
};

Point.prototype.add = function add(p) {
  // O + P = P
  if (this.inf)
    return p;

  // P + O = P
  if (p.inf)
    return this;

  // P + P = 2P
  if (this.eq(p))
    return this.dbl();

  // P + (-P) = O
  if (this.neg().eq(p))
    return this.curve.point(null, null);

  // P + Q = O
  if (this.x.cmp(p.x) === 0)
    return this.curve.point(null, null);

  var c = this.y.redSub(p.y);
  if (c.cmpn(0) !== 0)
    c = c.redMul(this.x.redSub(p.x).redInvm());
  var nx = c.redSqr().redISub(this.x).redISub(p.x);
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.dbl = function dbl() {
  if (this.inf)
    return this;

  // 2P = O
  var ys1 = this.y.redAdd(this.y);
  if (ys1.cmpn(0) === 0)
    return this.curve.point(null, null);

  var a = this.curve.a;

  var x2 = this.x.redSqr();
  var dyinv = ys1.redInvm();
  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.getX = function getX() {
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  return this.y.fromRed();
};

Point.prototype.mul = function mul(k) {
  k = new BN(k, 16);

  if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else if (this.curve.endo)
    return this.curve._endoWnafMulAdd([ this ], [ k ]);
  else
    return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs, true);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
};

Point.prototype.eq = function eq(p) {
  return this === p ||
         this.inf === p.inf &&
             (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
};

Point.prototype.neg = function neg(_precompute) {
  if (this.inf)
    return this;

  var res = this.curve.point(this.x, this.y.redNeg());
  if (_precompute && this.precomputed) {
    var pre = this.precomputed;
    var negate = function(p) {
      return p.neg();
    };
    res.precomputed = {
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(negate)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(negate)
      }
    };
  }
  return res;
};

Point.prototype.toJ = function toJ() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);

  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
  return res;
};

function JPoint(curve, x, y, z) {
  Base.BasePoint.call(this, curve, 'jacobian');
  if (x === null && y === null && z === null) {
    this.x = this.curve.one;
    this.y = this.curve.one;
    this.z = new BN(0);
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    this.z = new BN(z, 16);
  }
  if (!this.x.red)
    this.x = this.x.toRed(this.curve.red);
  if (!this.y.red)
    this.y = this.y.toRed(this.curve.red);
  if (!this.z.red)
    this.z = this.z.toRed(this.curve.red);

  this.zOne = this.z === this.curve.one;
}
inherits(JPoint, Base.BasePoint);

ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
  return new JPoint(this, x, y, z);
};

JPoint.prototype.toP = function toP() {
  if (this.isInfinity())
    return this.curve.point(null, null);

  var zinv = this.z.redInvm();
  var zinv2 = zinv.redSqr();
  var ax = this.x.redMul(zinv2);
  var ay = this.y.redMul(zinv2).redMul(zinv);

  return this.curve.point(ax, ay);
};

JPoint.prototype.neg = function neg() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};

JPoint.prototype.add = function add(p) {
  // O + P = P
  if (this.isInfinity())
    return p;

  // P + O = P
  if (p.isInfinity())
    return this;

  // 12M + 4S + 7A
  var pz2 = p.z.redSqr();
  var z2 = this.z.redSqr();
  var u1 = this.x.redMul(pz2);
  var u2 = p.x.redMul(z2);
  var s1 = this.y.redMul(pz2.redMul(p.z));
  var s2 = p.y.redMul(z2.redMul(this.z));

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(p.z).redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mixedAdd = function mixedAdd(p) {
  // O + P = P
  if (this.isInfinity())
    return p.toJ();

  // P + O = P
  if (p.isInfinity())
    return this;

  // 8M + 3S + 7A
  var z2 = this.z.redSqr();
  var u1 = this.x;
  var u2 = p.x.redMul(z2);
  var s1 = this.y;
  var s2 = p.y.redMul(z2).redMul(this.z);

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.dblp = function dblp(pow) {
  if (pow === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!pow)
    return this.dbl();

  if (this.curve.zeroA || this.curve.threeA) {
    var r = this;
    for (var i = 0; i < pow; i++)
      r = r.dbl();
    return r;
  }

  // 1M + 2S + 1A + N * (4S + 5M + 8A)
  // N = 1 => 6M + 6S + 9A
  var a = this.curve.a;
  var tinv = this.curve.tinv;

  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  // Reuse results
  var jyd = jy.redAdd(jy);
  for (var i = 0; i < pow; i++) {
    var jx2 = jx.redSqr();
    var jyd2 = jyd.redSqr();
    var jyd4 = jyd2.redSqr();
    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

    var t1 = jx.redMul(jyd2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);
    var dny = c.redMul(t2);
    dny = dny.redIAdd(dny).redISub(jyd4);
    var nz = jyd.redMul(jz);
    if (i + 1 < pow)
      jz4 = jz4.redMul(jyd4);

    jx = nx;
    jz = nz;
    jyd = dny;
  }

  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
};

JPoint.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  if (this.curve.zeroA)
    return this._zeroDbl();
  else if (this.curve.threeA)
    return this._threeDbl();
  else
    return this._dbl();
};

JPoint.prototype._zeroDbl = function _zeroDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 14A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a; a = 0
    var m = xx.redAdd(xx).redIAdd(xx);
    // T = M ^ 2 - 2*S
    var t = m.redSqr().redISub(s).redISub(s);

    // 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);

    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2*Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-dbl-2009-l
    // 2M + 5S + 13A

    // A = X1^2
    var a = this.x.redSqr();
    // B = Y1^2
    var b = this.y.redSqr();
    // C = B^2
    var c = b.redSqr();
    // D = 2 * ((X1 + B)^2 - A - C)
    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
    d = d.redIAdd(d);
    // E = 3 * A
    var e = a.redAdd(a).redIAdd(a);
    // F = E^2
    var f = e.redSqr();

    // 8 * C
    var c8 = c.redIAdd(c);
    c8 = c8.redIAdd(c8);
    c8 = c8.redIAdd(c8);

    // X3 = F - 2 * D
    nx = f.redISub(d).redISub(d);
    // Y3 = E * (D - X3) - 8 * C
    ny = e.redMul(d.redISub(nx)).redISub(c8);
    // Z3 = 2 * Y1 * Z1
    nz = this.y.redMul(this.z);
    nz = nz.redIAdd(nz);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._threeDbl = function _threeDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 15A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a
    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
    // T = M^2 - 2 * S
    var t = m.redSqr().redISub(s).redISub(s);
    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2 * Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
    // 3M + 5S

    // delta = Z1^2
    var delta = this.z.redSqr();
    // gamma = Y1^2
    var gamma = this.y.redSqr();
    // beta = X1 * gamma
    var beta = this.x.redMul(gamma);
    // alpha = 3 * (X1 - delta) * (X1 + delta)
    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
    alpha = alpha.redAdd(alpha).redIAdd(alpha);
    // X3 = alpha^2 - 8 * beta
    var beta4 = beta.redIAdd(beta);
    beta4 = beta4.redIAdd(beta4);
    var beta8 = beta4.redAdd(beta4);
    nx = alpha.redSqr().redISub(beta8);
    // Z3 = (Y1 + Z1)^2 - gamma - delta
    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
    // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
    var ggamma8 = gamma.redSqr();
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._dbl = function _dbl() {
  var a = this.curve.a;

  // 4M + 6S + 10A
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  var jx2 = jx.redSqr();
  var jy2 = jy.redSqr();

  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

  var jxd4 = jx.redAdd(jx);
  jxd4 = jxd4.redIAdd(jxd4);
  var t1 = jxd4.redMul(jy2);
  var nx = c.redSqr().redISub(t1.redAdd(t1));
  var t2 = t1.redISub(nx);

  var jyd8 = jy2.redSqr();
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  var ny = c.redMul(t2).redISub(jyd8);
  var nz = jy.redAdd(jy).redMul(jz);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.trpl = function trpl() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);

  // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
  // 5M + 10S + ...

  // XX = X1^2
  var xx = this.x.redSqr();
  // YY = Y1^2
  var yy = this.y.redSqr();
  // ZZ = Z1^2
  var zz = this.z.redSqr();
  // YYYY = YY^2
  var yyyy = yy.redSqr();
  // M = 3 * XX + a * ZZ2; a = 0
  var m = xx.redAdd(xx).redIAdd(xx);
  // MM = M^2
  var mm = m.redSqr();
  // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
  e = e.redIAdd(e);
  e = e.redAdd(e).redIAdd(e);
  e = e.redISub(mm);
  // EE = E^2
  var ee = e.redSqr();
  // T = 16*YYYY
  var t = yyyy.redIAdd(yyyy);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  // U = (M + E)^2 - MM - EE - T
  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
  // X3 = 4 * (X1 * EE - 4 * YY * U)
  var yyu4 = yy.redMul(u);
  yyu4 = yyu4.redIAdd(yyu4);
  yyu4 = yyu4.redIAdd(yyu4);
  var nx = this.x.redMul(ee).redISub(yyu4);
  nx = nx.redIAdd(nx);
  nx = nx.redIAdd(nx);
  // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  // Z3 = (Z1 + E)^2 - ZZ - EE
  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mul = function mul(k, kbase) {
  k = new BN(k, kbase);

  return this.curve._wnafMul(this, k);
};

JPoint.prototype.eq = function eq(p) {
  if (p.type === 'affine')
    return this.eq(p.toJ());

  if (this === p)
    return true;

  // x1 * z2^2 == x2 * z1^2
  var z2 = this.z.redSqr();
  var pz2 = p.z.redSqr();
  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
    return false;

  // y1 * z2^3 == y2 * z1^3
  var z3 = z2.redMul(this.z);
  var pz3 = pz2.redMul(p.z);
  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
};

JPoint.prototype.eqXToP = function eqXToP(x) {
  var zs = this.z.redSqr();
  var rx = x.toRed(this.curve.red).redMul(zs);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(zs);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
  return false;
};

JPoint.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC JPoint Infinity>';
  return '<EC JPoint x: ' + this.x.toString(16, 2) +
      ' y: ' + this.y.toString(16, 2) +
      ' z: ' + this.z.toString(16, 2) + '>';
};

JPoint.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/curves.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curves = exports;

var hash = __webpack_require__("../node_modules/hash.js/lib/hash.js");
var elliptic = __webpack_require__("../node_modules/elliptic/lib/elliptic.js");

var assert = elliptic.utils.assert;

function PresetCurve(options) {
  if (options.type === 'short')
    this.curve = new elliptic.curve.short(options);
  else if (options.type === 'edwards')
    this.curve = new elliptic.curve.edwards(options);
  else
    this.curve = new elliptic.curve.mont(options);
  this.g = this.curve.g;
  this.n = this.curve.n;
  this.hash = options.hash;

  assert(this.g.validate(), 'Invalid curve');
  assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
}
curves.PresetCurve = PresetCurve;

function defineCurve(name, options) {
  Object.defineProperty(curves, name, {
    configurable: true,
    enumerable: true,
    get: function() {
      var curve = new PresetCurve(options);
      Object.defineProperty(curves, name, {
        configurable: true,
        enumerable: true,
        value: curve
      });
      return curve;
    }
  });
}

defineCurve('p192', {
  type: 'short',
  prime: 'p192',
  p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
  b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
  n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
  hash: hash.sha256,
  gRed: false,
  g: [
    '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
    '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811'
  ]
});

defineCurve('p224', {
  type: 'short',
  prime: 'p224',
  p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
  b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
  n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
  hash: hash.sha256,
  gRed: false,
  g: [
    'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
    'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34'
  ]
});

defineCurve('p256', {
  type: 'short',
  prime: null,
  p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
  a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
  b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
  n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
  hash: hash.sha256,
  gRed: false,
  g: [
    '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
    '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5'
  ]
});

defineCurve('p384', {
  type: 'short',
  prime: null,
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 ffffffff',
  a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 fffffffc',
  b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
     '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
  n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
     'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
  hash: hash.sha384,
  gRed: false,
  g: [
    'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
    '5502f25d bf55296c 3a545e38 72760ab7',
    '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
    '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f'
  ]
});

defineCurve('p521', {
  type: 'short',
  prime: null,
  p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff',
  a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff fffffffc',
  b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
     '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
     '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
  n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
     'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
  hash: hash.sha512,
  gRed: false,
  g: [
    '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
    '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
    'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
    '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
    '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
    '3fad0761 353c7086 a272c240 88be9476 9fd16650'
  ]
});

defineCurve('curve25519', {
  type: 'mont',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '76d06',
  b: '1',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '9'
  ]
});

defineCurve('ed25519', {
  type: 'edwards',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '-1',
  c: '1',
  // -121665 * (121666^(-1)) (mod P)
  d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

    // 4/5
    '6666666666666666666666666666666666666666666666666666666666666658'
  ]
});

var pre;
try {
  pre = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./precomputed/secp256k1\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
} catch (e) {
  pre = undefined;
}

defineCurve('secp256k1', {
  type: 'short',
  prime: 'k256',
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
  a: '0',
  b: '7',
  n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
  h: '1',
  hash: hash.sha256,

  // Precomputed endomorphism
  beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
  lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
  basis: [
    {
      a: '3086d221a7d46bcde86c90e49284eb15',
      b: '-e4437ed6010e88286f547fa90abfe4c3'
    },
    {
      a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
      b: '3086d221a7d46bcde86c90e49284eb15'
    }
  ],

  gRed: false,
  g: [
    '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
    '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
    pre
  ]
});


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/ec/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__("../node_modules/bn.js/lib/bn.js");
var elliptic = __webpack_require__("../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var assert = utils.assert;

var KeyPair = __webpack_require__("../node_modules/elliptic/lib/elliptic/ec/key.js");
var Signature = __webpack_require__("../node_modules/elliptic/lib/elliptic/ec/signature.js");

function EC(options) {
  if (!(this instanceof EC))
    return new EC(options);

  // Shortcut `elliptic.ec(curve-name)`
  if (typeof options === 'string') {
    assert(elliptic.curves.hasOwnProperty(options), 'Unknown curve ' + options);

    options = elliptic.curves[options];
  }

  // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
  if (options instanceof elliptic.curves.PresetCurve)
    options = { curve: options };

  this.curve = options.curve.curve;
  this.n = this.curve.n;
  this.nh = this.n.ushrn(1);
  this.g = this.curve.g;

  // Point on curve
  this.g = options.curve.g;
  this.g.precompute(options.curve.n.bitLength() + 1);

  // Hash for function for DRBG
  this.hash = options.hash || options.curve.hash;
}
module.exports = EC;

EC.prototype.keyPair = function keyPair(options) {
  return new KeyPair(this, options);
};

EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
  return KeyPair.fromPrivate(this, priv, enc);
};

EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
  return KeyPair.fromPublic(this, pub, enc);
};

EC.prototype.genKeyPair = function genKeyPair(options) {
  if (!options)
    options = {};

  // Instantiate Hmac_DRBG
  var drbg = new elliptic.hmacDRBG({
    hash: this.hash,
    pers: options.pers,
    entropy: options.entropy || elliptic.rand(this.hash.hmacStrength),
    nonce: this.n.toArray()
  });

  var bytes = this.n.byteLength();
  var ns2 = this.n.sub(new BN(2));
  do {
    var priv = new BN(drbg.generate(bytes));
    if (priv.cmp(ns2) > 0)
      continue;

    priv.iaddn(1);
    return this.keyFromPrivate(priv);
  } while (true);
};

EC.prototype._truncateToN = function truncateToN(msg, truncOnly) {
  var delta = msg.byteLength() * 8 - this.n.bitLength();
  if (delta > 0)
    msg = msg.ushrn(delta);
  if (!truncOnly && msg.cmp(this.n) >= 0)
    return msg.sub(this.n);
  else
    return msg;
};

EC.prototype.sign = function sign(msg, key, enc, options) {
  if (typeof enc === 'object') {
    options = enc;
    enc = null;
  }
  if (!options)
    options = {};

  key = this.keyFromPrivate(key, enc);
  msg = this._truncateToN(new BN(msg, 16));

  // Zero-extend key to provide enough entropy
  var bytes = this.n.byteLength();
  var bkey = key.getPrivate().toArray('be', bytes);

  // Zero-extend nonce to have the same byte size as N
  var nonce = msg.toArray('be', bytes);

  // Instantiate Hmac_DRBG
  var drbg = new elliptic.hmacDRBG({
    hash: this.hash,
    entropy: bkey,
    nonce: nonce,
    pers: options.pers,
    persEnc: options.persEnc
  });

  // Number of bytes to generate
  var ns1 = this.n.sub(new BN(1));

  for (var iter = 0; true; iter++) {
    var k = options.k ?
        options.k(iter) :
        new BN(drbg.generate(this.n.byteLength()));
    k = this._truncateToN(k, true);
    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
      continue;

    var kp = this.g.mul(k);
    if (kp.isInfinity())
      continue;

    var kpX = kp.getX();
    var r = kpX.umod(this.n);
    if (r.cmpn(0) === 0)
      continue;

    var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
    s = s.umod(this.n);
    if (s.cmpn(0) === 0)
      continue;

    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
                        (kpX.cmp(r) !== 0 ? 2 : 0);

    // Use complement of `s`, if it is > `n / 2`
    if (options.canonical && s.cmp(this.nh) > 0) {
      s = this.n.sub(s);
      recoveryParam ^= 1;
    }

    return new Signature({ r: r, s: s, recoveryParam: recoveryParam });
  }
};

EC.prototype.verify = function verify(msg, signature, key, enc) {
  msg = this._truncateToN(new BN(msg, 16));
  key = this.keyFromPublic(key, enc);
  signature = new Signature(signature, 'hex');

  // Perform primitive values validation
  var r = signature.r;
  var s = signature.s;
  if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
    return false;
  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
    return false;

  // Validate signature
  var sinv = s.invm(this.n);
  var u1 = sinv.mul(msg).umod(this.n);
  var u2 = sinv.mul(r).umod(this.n);

  if (!this.curve._maxwellTrick) {
    var p = this.g.mulAdd(u1, key.getPublic(), u2);
    if (p.isInfinity())
      return false;

    return p.getX().umod(this.n).cmp(r) === 0;
  }

  // NOTE: Greg Maxwell's trick, inspired by:
  // https://git.io/vad3K

  var p = this.g.jmulAdd(u1, key.getPublic(), u2);
  if (p.isInfinity())
    return false;

  // Compare `p.x` of Jacobian point with `r`,
  // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
  // inverse of `p.z^2`
  return p.eqXToP(r);
};

EC.prototype.recoverPubKey = function(msg, signature, j, enc) {
  assert((3 & j) === j, 'The recovery param is more than two bits');
  signature = new Signature(signature, enc);

  var n = this.n;
  var e = new BN(msg);
  var r = signature.r;
  var s = signature.s;

  // A set LSB signifies that the y-coordinate is odd
  var isYOdd = j & 1;
  var isSecondKey = j >> 1;
  if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
    throw new Error('Unable to find sencond key candinate');

  // 1.1. Let x = r + jn.
  if (isSecondKey)
    r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
  else
    r = this.curve.pointFromX(r, isYOdd);

  var rInv = signature.r.invm(n);
  var s1 = n.sub(e).mul(rInv).umod(n);
  var s2 = s.mul(rInv).umod(n);

  // 1.6.1 Compute Q = r^-1 (sR -  eG)
  //               Q = r^-1 (sR + -eG)
  return this.g.mulAdd(s1, r, s2);
};

EC.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
  signature = new Signature(signature, enc);
  if (signature.recoveryParam !== null)
    return signature.recoveryParam;

  for (var i = 0; i < 4; i++) {
    var Qprime;
    try {
      Qprime = this.recoverPubKey(e, signature, i);
    } catch (e) {
      continue;
    }

    if (Qprime.eq(Q))
      return i;
  }
  throw new Error('Unable to find valid recovery factor');
};


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/ec/key.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__("../node_modules/bn.js/lib/bn.js");
var elliptic = __webpack_require__("../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var assert = utils.assert;

function KeyPair(ec, options) {
  this.ec = ec;
  this.priv = null;
  this.pub = null;

  // KeyPair(ec, { priv: ..., pub: ... })
  if (options.priv)
    this._importPrivate(options.priv, options.privEnc);
  if (options.pub)
    this._importPublic(options.pub, options.pubEnc);
}
module.exports = KeyPair;

KeyPair.fromPublic = function fromPublic(ec, pub, enc) {
  if (pub instanceof KeyPair)
    return pub;

  return new KeyPair(ec, {
    pub: pub,
    pubEnc: enc
  });
};

KeyPair.fromPrivate = function fromPrivate(ec, priv, enc) {
  if (priv instanceof KeyPair)
    return priv;

  return new KeyPair(ec, {
    priv: priv,
    privEnc: enc
  });
};

KeyPair.prototype.validate = function validate() {
  var pub = this.getPublic();

  if (pub.isInfinity())
    return { result: false, reason: 'Invalid public key' };
  if (!pub.validate())
    return { result: false, reason: 'Public key is not a point' };
  if (!pub.mul(this.ec.curve.n).isInfinity())
    return { result: false, reason: 'Public key * N != O' };

  return { result: true, reason: null };
};

KeyPair.prototype.getPublic = function getPublic(compact, enc) {
  // compact is optional argument
  if (typeof compact === 'string') {
    enc = compact;
    compact = null;
  }

  if (!this.pub)
    this.pub = this.ec.g.mul(this.priv);

  if (!enc)
    return this.pub;

  return this.pub.encode(enc, compact);
};

KeyPair.prototype.getPrivate = function getPrivate(enc) {
  if (enc === 'hex')
    return this.priv.toString(16, 2);
  else
    return this.priv;
};

KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
  this.priv = new BN(key, enc || 16);

  // Ensure that the priv won't be bigger than n, otherwise we may fail
  // in fixed multiplication method
  this.priv = this.priv.umod(this.ec.curve.n);
};

KeyPair.prototype._importPublic = function _importPublic(key, enc) {
  if (key.x || key.y) {
    // Montgomery points only have an `x` coordinate.
    // Weierstrass/Edwards points on the other hand have both `x` and
    // `y` coordinates.
    if (this.ec.curve.type === 'mont') {
      assert(key.x, 'Need x coordinate');
    } else if (this.ec.curve.type === 'short' ||
               this.ec.curve.type === 'edwards') {
      assert(key.x && key.y, 'Need both x and y coordinate');
    }
    this.pub = this.ec.curve.point(key.x, key.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(key, enc);
};

// ECDH
KeyPair.prototype.derive = function derive(pub) {
  return pub.mul(this.priv).getX();
};

// ECDSA
KeyPair.prototype.sign = function sign(msg, enc, options) {
  return this.ec.sign(msg, this, enc, options);
};

KeyPair.prototype.verify = function verify(msg, signature) {
  return this.ec.verify(msg, signature, this);
};

KeyPair.prototype.inspect = function inspect() {
  return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
         ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
};


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/ec/signature.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__("../node_modules/bn.js/lib/bn.js");

var elliptic = __webpack_require__("../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var assert = utils.assert;

function Signature(options, enc) {
  if (options instanceof Signature)
    return options;

  if (this._importDER(options, enc))
    return;

  assert(options.r && options.s, 'Signature without r or s');
  this.r = new BN(options.r, 16);
  this.s = new BN(options.s, 16);
  if (options.recoveryParam === undefined)
    this.recoveryParam = null;
  else
    this.recoveryParam = options.recoveryParam;
}
module.exports = Signature;

function Position() {
  this.place = 0;
}

function getLength(buf, p) {
  var initial = buf[p.place++];
  if (!(initial & 0x80)) {
    return initial;
  }
  var octetLen = initial & 0xf;
  var val = 0;
  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
    val <<= 8;
    val |= buf[off];
  }
  p.place = off;
  return val;
}

function rmPadding(buf) {
  var i = 0;
  var len = buf.length - 1;
  while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
    i++;
  }
  if (i === 0) {
    return buf;
  }
  return buf.slice(i);
}

Signature.prototype._importDER = function _importDER(data, enc) {
  data = utils.toArray(data, enc);
  var p = new Position();
  if (data[p.place++] !== 0x30) {
    return false;
  }
  var len = getLength(data, p);
  if ((len + p.place) !== data.length) {
    return false;
  }
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var rlen = getLength(data, p);
  var r = data.slice(p.place, rlen + p.place);
  p.place += rlen;
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var slen = getLength(data, p);
  if (data.length !== slen + p.place) {
    return false;
  }
  var s = data.slice(p.place, slen + p.place);
  if (r[0] === 0 && (r[1] & 0x80)) {
    r = r.slice(1);
  }
  if (s[0] === 0 && (s[1] & 0x80)) {
    s = s.slice(1);
  }

  this.r = new BN(r);
  this.s = new BN(s);
  this.recoveryParam = null;

  return true;
};

function constructLength(arr, len) {
  if (len < 0x80) {
    arr.push(len);
    return;
  }
  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
  arr.push(octets | 0x80);
  while (--octets) {
    arr.push((len >>> (octets << 3)) & 0xff);
  }
  arr.push(len);
}

Signature.prototype.toDER = function toDER(enc) {
  var r = this.r.toArray();
  var s = this.s.toArray();

  // Pad values
  if (r[0] & 0x80)
    r = [ 0 ].concat(r);
  // Pad values
  if (s[0] & 0x80)
    s = [ 0 ].concat(s);

  r = rmPadding(r);
  s = rmPadding(s);

  while (!s[0] && !(s[1] & 0x80)) {
    s = s.slice(1);
  }
  var arr = [ 0x02 ];
  constructLength(arr, r.length);
  arr = arr.concat(r);
  arr.push(0x02);
  constructLength(arr, s.length);
  var backHalf = arr.concat(s);
  var res = [ 0x30 ];
  constructLength(res, backHalf.length);
  res = res.concat(backHalf);
  return utils.encode(res, enc);
};


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/eddsa/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hash = __webpack_require__("../node_modules/hash.js/lib/hash.js");
var elliptic = __webpack_require__("../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var KeyPair = __webpack_require__("../node_modules/elliptic/lib/elliptic/eddsa/key.js");
var Signature = __webpack_require__("../node_modules/elliptic/lib/elliptic/eddsa/signature.js");

function EDDSA(curve) {
  assert(curve === 'ed25519', 'only tested with ed25519 so far');

  if (!(this instanceof EDDSA))
    return new EDDSA(curve);

  var curve = elliptic.curves[curve].curve;
  this.curve = curve;
  this.g = curve.g;
  this.g.precompute(curve.n.bitLength() + 1);

  this.pointClass = curve.point().constructor;
  this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
  this.hash = hash.sha512;
}

module.exports = EDDSA;

/**
* @param {Array|String} message - message bytes
* @param {Array|String|KeyPair} secret - secret bytes or a keypair
* @returns {Signature} - signature
*/
EDDSA.prototype.sign = function sign(message, secret) {
  message = parseBytes(message);
  var key = this.keyFromSecret(secret);
  var r = this.hashInt(key.messagePrefix(), message);
  var R = this.g.mul(r);
  var Rencoded = this.encodePoint(R);
  var s_ = this.hashInt(Rencoded, key.pubBytes(), message)
               .mul(key.priv());
  var S = r.add(s_).umod(this.curve.n);
  return this.makeSignature({ R: R, S: S, Rencoded: Rencoded });
};

/**
* @param {Array} message - message bytes
* @param {Array|String|Signature} sig - sig bytes
* @param {Array|String|Point|KeyPair} pub - public key
* @returns {Boolean} - true if public key matches sig of message
*/
EDDSA.prototype.verify = function verify(message, sig, pub) {
  message = parseBytes(message);
  sig = this.makeSignature(sig);
  var key = this.keyFromPublic(pub);
  var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
  var SG = this.g.mul(sig.S());
  var RplusAh = sig.R().add(key.pub().mul(h));
  return RplusAh.eq(SG);
};

EDDSA.prototype.hashInt = function hashInt() {
  var hash = this.hash();
  for (var i = 0; i < arguments.length; i++)
    hash.update(arguments[i]);
  return utils.intFromLE(hash.digest()).umod(this.curve.n);
};

EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
  return KeyPair.fromPublic(this, pub);
};

EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
  return KeyPair.fromSecret(this, secret);
};

EDDSA.prototype.makeSignature = function makeSignature(sig) {
  if (sig instanceof Signature)
    return sig;
  return new Signature(this, sig);
};

/**
* * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
*
* EDDSA defines methods for encoding and decoding points and integers. These are
* helper convenience methods, that pass along to utility functions implied
* parameters.
*
*/
EDDSA.prototype.encodePoint = function encodePoint(point) {
  var enc = point.getY().toArray('le', this.encodingLength);
  enc[this.encodingLength - 1] |= point.getX().isOdd() ? 0x80 : 0;
  return enc;
};

EDDSA.prototype.decodePoint = function decodePoint(bytes) {
  bytes = utils.parseBytes(bytes);

  var lastIx = bytes.length - 1;
  var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~0x80);
  var xIsOdd = (bytes[lastIx] & 0x80) !== 0;

  var y = utils.intFromLE(normed);
  return this.curve.pointFromY(y, xIsOdd);
};

EDDSA.prototype.encodeInt = function encodeInt(num) {
  return num.toArray('le', this.encodingLength);
};

EDDSA.prototype.decodeInt = function decodeInt(bytes) {
  return utils.intFromLE(bytes);
};

EDDSA.prototype.isPoint = function isPoint(val) {
  return val instanceof this.pointClass;
};


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/eddsa/key.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var elliptic = __webpack_require__("../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var cachedProperty = utils.cachedProperty;

/**
* @param {EDDSA} eddsa - instance
* @param {Object} params - public/private key parameters
*
* @param {Array<Byte>} [params.secret] - secret seed bytes
* @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
* @param {Array<Byte>} [params.pub] - public key point encoded as bytes
*
*/
function KeyPair(eddsa, params) {
  this.eddsa = eddsa;
  this._secret = parseBytes(params.secret);
  if (eddsa.isPoint(params.pub))
    this._pub = params.pub;
  else
    this._pubBytes = parseBytes(params.pub);
}

KeyPair.fromPublic = function fromPublic(eddsa, pub) {
  if (pub instanceof KeyPair)
    return pub;
  return new KeyPair(eddsa, { pub: pub });
};

KeyPair.fromSecret = function fromSecret(eddsa, secret) {
  if (secret instanceof KeyPair)
    return secret;
  return new KeyPair(eddsa, { secret: secret });
};

KeyPair.prototype.secret = function secret() {
  return this._secret;
};

cachedProperty(KeyPair, 'pubBytes', function pubBytes() {
  return this.eddsa.encodePoint(this.pub());
});

cachedProperty(KeyPair, 'pub', function pub() {
  if (this._pubBytes)
    return this.eddsa.decodePoint(this._pubBytes);
  return this.eddsa.g.mul(this.priv());
});

cachedProperty(KeyPair, 'privBytes', function privBytes() {
  var eddsa = this.eddsa;
  var hash = this.hash();
  var lastIx = eddsa.encodingLength - 1;

  var a = hash.slice(0, eddsa.encodingLength);
  a[0] &= 248;
  a[lastIx] &= 127;
  a[lastIx] |= 64;

  return a;
});

cachedProperty(KeyPair, 'priv', function priv() {
  return this.eddsa.decodeInt(this.privBytes());
});

cachedProperty(KeyPair, 'hash', function hash() {
  return this.eddsa.hash().update(this.secret()).digest();
});

cachedProperty(KeyPair, 'messagePrefix', function messagePrefix() {
  return this.hash().slice(this.eddsa.encodingLength);
});

KeyPair.prototype.sign = function sign(message) {
  assert(this._secret, 'KeyPair can only verify');
  return this.eddsa.sign(message, this);
};

KeyPair.prototype.verify = function verify(message, sig) {
  return this.eddsa.verify(message, sig, this);
};

KeyPair.prototype.getSecret = function getSecret(enc) {
  assert(this._secret, 'KeyPair is public only');
  return utils.encode(this.secret(), enc);
};

KeyPair.prototype.getPublic = function getPublic(enc) {
  return utils.encode(this.pubBytes(), enc);
};

module.exports = KeyPair;


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/eddsa/signature.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__("../node_modules/bn.js/lib/bn.js");
var elliptic = __webpack_require__("../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var assert = utils.assert;
var cachedProperty = utils.cachedProperty;
var parseBytes = utils.parseBytes;

/**
* @param {EDDSA} eddsa - eddsa instance
* @param {Array<Bytes>|Object} sig -
* @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
* @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
* @param {Array<Bytes>} [sig.Rencoded] - R point encoded
* @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
*/
function Signature(eddsa, sig) {
  this.eddsa = eddsa;

  if (typeof sig !== 'object')
    sig = parseBytes(sig);

  if (Array.isArray(sig)) {
    sig = {
      R: sig.slice(0, eddsa.encodingLength),
      S: sig.slice(eddsa.encodingLength)
    };
  }

  assert(sig.R && sig.S, 'Signature without R or S');

  if (eddsa.isPoint(sig.R))
    this._R = sig.R;
  if (sig.S instanceof BN)
    this._S = sig.S;

  this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
  this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
}

cachedProperty(Signature, 'S', function S() {
  return this.eddsa.decodeInt(this.Sencoded());
});

cachedProperty(Signature, 'R', function R() {
  return this.eddsa.decodePoint(this.Rencoded());
});

cachedProperty(Signature, 'Rencoded', function Rencoded() {
  return this.eddsa.encodePoint(this.R());
});

cachedProperty(Signature, 'Sencoded', function Sencoded() {
  return this.eddsa.encodeInt(this.S());
});

Signature.prototype.toBytes = function toBytes() {
  return this.Rencoded().concat(this.Sencoded());
};

Signature.prototype.toHex = function toHex() {
  return utils.encode(this.toBytes(), 'hex').toUpperCase();
};

module.exports = Signature;


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/hmac-drbg.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hash = __webpack_require__("../node_modules/hash.js/lib/hash.js");
var elliptic = __webpack_require__("../node_modules/elliptic/lib/elliptic.js");
var utils = elliptic.utils;
var assert = utils.assert;

function HmacDRBG(options) {
  if (!(this instanceof HmacDRBG))
    return new HmacDRBG(options);
  this.hash = options.hash;
  this.predResist = !!options.predResist;

  this.outLen = this.hash.outSize;
  this.minEntropy = options.minEntropy || this.hash.hmacStrength;

  this.reseed = null;
  this.reseedInterval = null;
  this.K = null;
  this.V = null;

  var entropy = utils.toArray(options.entropy, options.entropyEnc);
  var nonce = utils.toArray(options.nonce, options.nonceEnc);
  var pers = utils.toArray(options.pers, options.persEnc);
  assert(entropy.length >= (this.minEntropy / 8),
         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
  this._init(entropy, nonce, pers);
}
module.exports = HmacDRBG;

HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
  var seed = entropy.concat(nonce).concat(pers);

  this.K = new Array(this.outLen / 8);
  this.V = new Array(this.outLen / 8);
  for (var i = 0; i < this.V.length; i++) {
    this.K[i] = 0x00;
    this.V[i] = 0x01;
  }

  this._update(seed);
  this.reseed = 1;
  this.reseedInterval = 0x1000000000000;  // 2^48
};

HmacDRBG.prototype._hmac = function hmac() {
  return new hash.hmac(this.hash, this.K);
};

HmacDRBG.prototype._update = function update(seed) {
  var kmac = this._hmac()
                 .update(this.V)
                 .update([ 0x00 ]);
  if (seed)
    kmac = kmac.update(seed);
  this.K = kmac.digest();
  this.V = this._hmac().update(this.V).digest();
  if (!seed)
    return;

  this.K = this._hmac()
               .update(this.V)
               .update([ 0x01 ])
               .update(seed)
               .digest();
  this.V = this._hmac().update(this.V).digest();
};

HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
  // Optional entropy enc
  if (typeof entropyEnc !== 'string') {
    addEnc = add;
    add = entropyEnc;
    entropyEnc = null;
  }

  entropy = utils.toBuffer(entropy, entropyEnc);
  add = utils.toBuffer(add, addEnc);

  assert(entropy.length >= (this.minEntropy / 8),
         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

  this._update(entropy.concat(add || []));
  this.reseed = 1;
};

HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
  if (this.reseed > this.reseedInterval)
    throw new Error('Reseed is required');

  // Optional encoding
  if (typeof enc !== 'string') {
    addEnc = add;
    add = enc;
    enc = null;
  }

  // Optional additional data
  if (add) {
    add = utils.toArray(add, addEnc);
    this._update(add);
  }

  var temp = [];
  while (temp.length < len) {
    this.V = this._hmac().update(this.V).digest();
    temp = temp.concat(this.V);
  }

  var res = temp.slice(0, len);
  this._update(add);
  this.reseed++;
  return utils.encode(res, enc);
};


/***/ }),

/***/ "../node_modules/elliptic/lib/elliptic/utils.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = exports;
var BN = __webpack_require__("../node_modules/bn.js/lib/bn.js");

utils.assert = function assert(val, msg) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
};

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg !== 'string') {
    for (var i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
    return res;
  }
  if (!enc) {
    for (var i = 0; i < msg.length; i++) {
      var c = msg.charCodeAt(i);
      var hi = c >> 8;
      var lo = c & 0xff;
      if (hi)
        res.push(hi, lo);
      else
        res.push(lo);
    }
  } else if (enc === 'hex') {
    msg = msg.replace(/[^a-z0-9]+/ig, '');
    if (msg.length % 2 !== 0)
      msg = '0' + msg;
    for (var i = 0; i < msg.length; i += 2)
      res.push(parseInt(msg[i] + msg[i + 1], 16));
  }
  return res;
}
utils.toArray = toArray;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
utils.zero2 = zero2;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
utils.toHex = toHex;

utils.encode = function encode(arr, enc) {
  if (enc === 'hex')
    return toHex(arr);
  else
    return arr;
};

// Represent num in a w-NAF form
function getNAF(num, w) {
  var naf = [];
  var ws = 1 << (w + 1);
  var k = num.clone();
  while (k.cmpn(1) >= 0) {
    var z;
    if (k.isOdd()) {
      var mod = k.andln(ws - 1);
      if (mod > (ws >> 1) - 1)
        z = (ws >> 1) - mod;
      else
        z = mod;
      k.isubn(z);
    } else {
      z = 0;
    }
    naf.push(z);

    // Optimization, shift by word if possible
    var shift = (k.cmpn(0) !== 0 && k.andln(ws - 1) === 0) ? (w + 1) : 1;
    for (var i = 1; i < shift; i++)
      naf.push(0);
    k.iushrn(shift);
  }

  return naf;
}
utils.getNAF = getNAF;

// Represent k1, k2 in a Joint Sparse Form
function getJSF(k1, k2) {
  var jsf = [
    [],
    []
  ];

  k1 = k1.clone();
  k2 = k2.clone();
  var d1 = 0;
  var d2 = 0;
  while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {

    // First phase
    var m14 = (k1.andln(3) + d1) & 3;
    var m24 = (k2.andln(3) + d2) & 3;
    if (m14 === 3)
      m14 = -1;
    if (m24 === 3)
      m24 = -1;
    var u1;
    if ((m14 & 1) === 0) {
      u1 = 0;
    } else {
      var m8 = (k1.andln(7) + d1) & 7;
      if ((m8 === 3 || m8 === 5) && m24 === 2)
        u1 = -m14;
      else
        u1 = m14;
    }
    jsf[0].push(u1);

    var u2;
    if ((m24 & 1) === 0) {
      u2 = 0;
    } else {
      var m8 = (k2.andln(7) + d2) & 7;
      if ((m8 === 3 || m8 === 5) && m14 === 2)
        u2 = -m24;
      else
        u2 = m24;
    }
    jsf[1].push(u2);

    // Second phase
    if (2 * d1 === u1 + 1)
      d1 = 1 - d1;
    if (2 * d2 === u2 + 1)
      d2 = 1 - d2;
    k1.iushrn(1);
    k2.iushrn(1);
  }

  return jsf;
}
utils.getJSF = getJSF;

function cachedProperty(obj, name, computer) {
  var key = '_' + name;
  obj.prototype[name] = function cachedProperty() {
    return this[key] !== undefined ? this[key] :
           this[key] = computer.call(this);
  };
}
utils.cachedProperty = cachedProperty;

function parseBytes(bytes) {
  return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
                                     bytes;
}
utils.parseBytes = parseBytes;

function intFromLE(bytes) {
  return new BN(bytes, 'hex', 'le');
}
utils.intFromLE = intFromLE;



/***/ }),

/***/ "../node_modules/elliptic/package.json":
/***/ (function(module, exports) {

module.exports = {"_from":"elliptic@6.3.3","_id":"elliptic@6.3.3","_inBundle":false,"_integrity":"sha1-VILZZG1UvLif19mU/J4ulWiHbj8=","_location":"/elliptic","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"elliptic@6.3.3","name":"elliptic","escapedName":"elliptic","rawSpec":"6.3.3","saveSpec":null,"fetchSpec":"6.3.3"},"_requiredBy":["/browserify-sign","/create-ecdh","/ethers"],"_resolved":"https://registry.npmjs.org/elliptic/-/elliptic-6.3.3.tgz","_shasum":"5482d9646d54bcb89fd7d994fc9e2e9568876e3f","_spec":"elliptic@6.3.3","_where":"/Users/tron/Workspace/tron/tron-web/node_modules/ethers","author":{"name":"Fedor Indutny","email":"fedor@indutny.com"},"bugs":{"url":"https://github.com/indutny/elliptic/issues"},"bundleDependencies":false,"dependencies":{"bn.js":"^4.4.0","brorand":"^1.0.1","hash.js":"^1.0.0","inherits":"^2.0.1"},"deprecated":false,"description":"EC cryptography","devDependencies":{"brfs":"^1.4.3","coveralls":"^2.11.3","grunt":"^0.4.5","grunt-browserify":"^5.0.0","grunt-cli":"^1.2.0","grunt-contrib-connect":"^1.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^1.0.1","grunt-mocha-istanbul":"^3.0.1","grunt-saucelabs":"^8.6.2","istanbul":"^0.4.2","jscs":"^2.9.0","jshint":"^2.6.0","mocha":"^2.1.0"},"files":["lib"],"homepage":"https://github.com/indutny/elliptic","keywords":["EC","Elliptic","curve","Cryptography"],"license":"MIT","main":"lib/elliptic.js","name":"elliptic","repository":{"type":"git","url":"git+ssh://git@github.com/indutny/elliptic.git"},"scripts":{"jscs":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","jshint":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","lint":"npm run jscs && npm run jshint","test":"npm run lint && npm run unit","unit":"istanbul test _mocha --reporter=spec test/index.js","version":"grunt dist && git add dist/"},"version":"6.3.3"}

/***/ }),

/***/ "../node_modules/ethers/contracts/contract.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Interface = __webpack_require__("../node_modules/ethers/contracts/interface.js");

var utils = (function() {
    return {
        defineProperty: __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty,

        getAddress: __webpack_require__("../node_modules/ethers/utils/address.js").getAddress,

        bigNumberify: __webpack_require__("../node_modules/ethers/utils/bignumber.js").bigNumberify,

        hexlify: __webpack_require__("../node_modules/ethers/utils/convert.js").hexlify,
    };
})();

var errors = __webpack_require__("../node_modules/ethers/utils/errors.js");

var allowedTransactionKeys = {
    data: true, from: true, gasLimit: true, gasPrice:true, nonce: true, to: true, value: true
}

function copyObject(object) {
    var result = {};
    for (var key in object) {
        result[key] = object[key];
    }
    return result;
}


function Contract(addressOrName, contractInterface, signerOrProvider) {
    if (!(this instanceof Contract)) { throw new Error('missing new'); }

    // @TODO: Maybe still check the addressOrName looks like a valid address or name?
    //address = utils.getAddress(address);

    if (!(contractInterface instanceof Interface)) {
        contractInterface = new Interface(contractInterface);
    }

    if (!signerOrProvider) { throw new Error('missing signer or provider'); }

    var signer = signerOrProvider;
    var provider = null;

    if (signerOrProvider.provider) {
        provider = signerOrProvider.provider;
    } else {
        provider = signerOrProvider;
        signer = null;
    }

    utils.defineProperty(this, 'address', addressOrName);
    utils.defineProperty(this, 'interface', contractInterface);
    utils.defineProperty(this, 'signer', signer);
    utils.defineProperty(this, 'provider', provider);

    var addressPromise = provider.resolveName(addressOrName);

    function runMethod(method, estimateOnly) {
        return function() {
            var transaction = {}

            var params = Array.prototype.slice.call(arguments);

            // If 1 extra parameter was passed in, it contains overrides
            if (params.length === method.inputs.types.length + 1 && typeof(params[params.length - 1]) === 'object') {
                transaction = copyObject(params.pop());

                // Check for unexpected keys (e.g. using "gas" instead of "gasLimit")
                for (var key in transaction) {
                    if (!allowedTransactionKeys[key]) {
                        throw new Error('unknown transaction override ' + key);
                    }
                }
            }

            // Check overrides make sense
            ['data', 'to'].forEach(function(key) {
                if (transaction[key] != null) {
                    throw new Error('cannot override ' + key) ;
                }
            });

            var call = method.apply(contractInterface, params);

            // Send to the contract address
            transaction.to = addressOrName;

            // Set the transaction data
            transaction.data = call.data;

            switch (call.type) {
                case 'call':

                    // Call (constant functions) always cost 0 ether
                    if (estimateOnly) {
                        return Promise.resolve(new utils.bigNumberify(0));
                    }

                    // Check overrides make sense
                    ['gasLimit', 'gasPrice', 'value'].forEach(function(key) {
                        if (transaction[key] != null) {
                            throw new Error('call cannot override ' + key) ;
                        }
                    });

                    var fromPromise = null;
                    if (transaction.from == null && signer && signer.getAddress) {
                        fromPromise = signer.getAddress();
                        if (!(fromPromise instanceof Promise)) {
                            fromPromise = Promise.resolve(fromPromise);
                        }
                    } else {
                        fromPromise = Promise.resolve(null);
                    }

                    return fromPromise.then(function(address) {
                        if (address) {
                            transaction.from = utils.getAddress(address);
                        }
                        return provider.call(transaction);

                    }).then(function(value) {
                        try {
                            var result = call.parse(value);
                        } catch (error) {
                            if (value === '0x' && method.outputs.types.length > 0) {
                                errors.throwError('call exception', errors.CALL_EXCEPTION, {
                                    address: addressOrName,
                                    method: call.signature,
                                    value: params
                                });
                            }
                            throw error;
                        }
                        if (method.outputs.types.length === 1) {
                             result = result[0];
                        }
                        return result;
                    });

                case 'transaction':
                    if (!signer) { return Promise.reject(new Error('missing signer')); }

                    // Make sure they aren't overriding something they shouldn't
                    if (transaction.from != null) {
                        throw new Error('transaction cannot override from') ;
                    }

                    // Only computing the transaction estimate
                    if (estimateOnly) {
                        if (signer && signer.estimateGas) {
                            return signer.estimateGas(transaction);
                        }

                        return provider.estimateGas(transaction)
                    }

                    // If the signer supports sendTrasaction, use it
                    if (signer.sendTransaction) {
                        return signer.sendTransaction(transaction);
                    }

                    if (!signer.sign) {
                        return Promise.reject(new Error('custom signer does not support signing'));
                    }

                    if (transaction.gasLimit == null) {
                        transaction.gasLimit = signer.defaultGasLimit || 2000000;
                    }

                    var noncePromise = null;
                    if (transaction.nonce) {
                        noncePromise = Promise.resolve(transaction.nonce)
                    } else if (signer.getTransactionCount) {
                        noncePromise = signer.getTransactionCount();
                        if (!(noncePromise instanceof Promise)) {
                            noncePromise = Promise.resolve(noncePromise);
                        }
                    } else {
                        var addressPromise = signer.getAddress();
                        if (!(addressPromise instanceof Promise)) {
                            addressPromise = Promise.resolve(addressPromise);
                        }
                        noncePromise = addressPromise.then(function(address) {
                            return provider.getTransactionCount(address, 'pending');
                        });
                    }

                    var gasPricePromise = null;
                    if (transaction.gasPrice) {
                        gasPricePromise = Promise.resolve(transaction.gasPrice);
                    } else {
                        gasPricePromise = provider.getGasPrice();
                    }

                    return Promise.all([
                        noncePromise,
                        gasPricePromise

                    ]).then(function(results) {
                        transaction.nonce = results[0];
                        transaction.gasPrice = results[1];
                        return signer.sign(transaction);

                    }).then(function(signedTransaction) {
                        return provider.sendTransaction(signedTransaction);
                    });
            }
        };
    }

    var estimate = {};
    utils.defineProperty(this, 'estimate', estimate);

    var functions = {};
    utils.defineProperty(this, 'functions', functions);

    var events = {};
    utils.defineProperty(this, 'events', events);

    Object.keys(contractInterface.functions).forEach(function(methodName) {
        var method = contractInterface.functions[methodName];

        var run = runMethod(method, false);

        if (this[methodName] == null) {
            utils.defineProperty(this, methodName, run);
        } else {
            console.log('WARNING: Multiple definitions for ' + method);
        }

        if (functions[method] == null) {
            utils.defineProperty(functions, methodName, run);
            utils.defineProperty(estimate, methodName, runMethod(method, true));
        }
    }, this);

    Object.keys(contractInterface.events).forEach(function(eventName) {
        var eventInfo = contractInterface.events[eventName];

        var eventCallback = null;

        function handleEvent(log) {
            addressPromise.then(function(address) {

                // Not meant for us (the topics just has the same name)
                if (address != log.address) { return; }

                try {
                    var result = eventInfo.parse(log.topics, log.data);

                    // Some useful things to have with the log
                    log.args = result;
                    log.event = eventName;
                    log.parse = eventInfo.parse;
                    log.removeListener = function() {
                        provider.removeListener(eventInfo.topics, handleEvent);
                    }

                    log.getBlock = function() { return provider.getBlock(log.blockHash);; }
                    log.getTransaction = function() { return provider.getTransaction(log.transactionHash); }
                    log.getTransactionReceipt = function() { return provider.getTransactionReceipt(log.transactionHash); }
                    log.eventSignature = eventInfo.signature;

                    eventCallback.apply(log, Array.prototype.slice.call(result));
                } catch (error) {
                    console.log(error);
                }

                return null;
            }).catch(function(error) {
                //console.log(error);
            });
        }

        var property = {
            enumerable: true,
            get: function() {
                return eventCallback;
            },
            set: function(value) {
                if (!value) { value = null; }

                if (!value && eventCallback) {
                    provider.removeListener(eventInfo.topics, handleEvent);

                } else if (value && !eventCallback) {
                    provider.on(eventInfo.topics, handleEvent);
                }

                eventCallback = value;
            }
        };

        var propertyName = 'on' + eventName.toLowerCase();
        if (this[propertyName] == null) {
            Object.defineProperty(this, propertyName, property);
        }

        Object.defineProperty(events, eventName, property);

    }, this);
}

utils.defineProperty(Contract.prototype, 'connect', function(signerOrProvider) {
    return new Contract(this.address, this.interface, signerOrProvider);
});

utils.defineProperty(Contract, 'getDeployTransaction', function(bytecode, contractInterface) {

    if (!(contractInterface instanceof Interface)) {
        contractInterface = new Interface(contractInterface);
    }

    var args = Array.prototype.slice.call(arguments);
    args.splice(1, 1);

    return {
        data: contractInterface.deployFunction.apply(contractInterface, args).bytecode
    }
});

module.exports = Contract;


/***/ }),

/***/ "../node_modules/ethers/contracts/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Contract = __webpack_require__("../node_modules/ethers/contracts/contract.js");
var Interface = __webpack_require__("../node_modules/ethers/contracts/interface.js");

module.exports = {
    Contract: Contract,
    Interface: Interface,
}



/***/ }),

/***/ "../node_modules/ethers/contracts/interface.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI

var utils = (function() {
    var AbiCoder = __webpack_require__("../node_modules/ethers/utils/abi-coder.js");
    var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
    var properties = __webpack_require__("../node_modules/ethers/utils/properties.js");
    var utf8 = __webpack_require__("../node_modules/ethers/utils/utf8.js");

    return {
        defineFrozen: properties.defineFrozen,
        defineProperty: properties.defineProperty,

        coder: AbiCoder.defaultCoder,
        parseSignature: AbiCoder.parseSignature,

        arrayify: convert.arrayify,
        concat: convert.concat,
        isHexString: convert.isHexString,

        toUtf8Bytes: utf8.toUtf8Bytes,

        keccak256: __webpack_require__("../node_modules/ethers/utils/keccak256.js"),
    };
})();

var errors = __webpack_require__("../node_modules/ethers/utils/errors.js");

function parseParams(params) {
    var names = [];
    var types = [];

    params.forEach(function(param) {
        if (param.components != null) {
            if (param.type.substring(0, 5) !== 'tuple') {
                throw new Error('internal error; report on GitHub');
            }
            var suffix = '';
            var arrayBracket = param.type.indexOf('[');
            if (arrayBracket >= 0) { suffix = param.type.substring(arrayBracket); }

            var result = parseParams(param.components);
            names.push({ name: (param.name || null), names: result.names });
            types.push('tuple(' + result.types.join(',') + ')' + suffix)
        } else {
            names.push(param.name || null);
            types.push(param.type);
        }
    });

    return {
        names: names,
        types: types
    }
}

function populateDescription(object, items) {
    for (var key in items) {
        utils.defineProperty(object, key, items[key]);
    }
    return object;
}

/**
 *  - bytecode (optional; only for deploy)
 *  - type ("deploy")
 */
function DeployDescription() { }

/**
 *  - name
 *  - signature
 *  - sighash
 *  - 
 *  - 
 *  - 
 *  - 
 *  - type: ("call" | "transaction")
 */
function FunctionDescription() { }

/**
 *  - anonymous
 *  - name
 *  - signature
 *  - parse
 *  - topics
 *  - inputs
 *  - type ("event")
 */
function EventDescription() { }

function Indexed(value) {
    utils.defineProperty(this, 'indexed', true);
    utils.defineProperty(this, 'hash', value);
}

function Result() {}

function Interface(abi) {
    if (!(this instanceof Interface)) { throw new Error('missing new'); }

    if (typeof(abi) === 'string') {
        try {
            abi = JSON.parse(abi);
        } catch (error) {
            errors.throwError('could not parse ABI JSON', errors.INVALID_ARGUMENT, {
                arg: 'abi',
                errorMessage: error.message,
                value: abi
            });
        }
    }

    var _abi = [];
    abi.forEach(function(fragment) {
        if (typeof(fragment) === 'string') {
            fragment = utils.parseSignature(fragment);
        }
        _abi.push(fragment);
    });

    utils.defineFrozen(this, 'abi', _abi);

    var methods = {}, events = {}, deploy = null;

    utils.defineProperty(this, 'functions', methods);
    utils.defineProperty(this, 'events', events);

    function addMethod(method) {
        switch (method.type) {
            case 'constructor':
                var func = (function() {
                    var inputParams = parseParams(method.inputs);

                    var func = function(bytecode) {
                        if (!utils.isHexString(bytecode)) {
                            errors.throwError('invalid contract bytecode', errors.INVALID_ARGUMENT, {
                                arg: 'bytecode',
                                type: typeof(bytecode),
                                value: bytecode
                            });
                        }

                        var params = Array.prototype.slice.call(arguments, 1);
                        if (params.length < inputParams.types.length) {
                            errors.throwError('missing constructor argument', errors.MISSING_ARGUMENT, {
                                arg: (inputParams.names[params.length] || 'unknown'),
                                count: params.length,
                                expectedCount: inputParams.types.length
                            });
                        } else if (params.length > inputParams.types.length) {
                            errors.throwError('too many constructor arguments', errors.UNEXPECTED_ARGUMENT, {
                                count: params.length,
                                expectedCount: inputParams.types.length
                            });
                        }

                        try {
                            var encodedParams = utils.coder.encode(method.inputs, params)
                        } catch (error) {
                            errors.throwError('invalid constructor argument', errors.INVALID_ARGUMENT, {
                                arg: error.arg,
                                reason: error.reason,
                                value: error.value
                            });
                        }

                        var result = {
                            bytecode: bytecode + encodedParams.substring(2),
                            type: 'deploy'
                        }

                        return populateDescription(new DeployDescription(), result);
                    }

                    utils.defineFrozen(func, 'inputs', inputParams);
                    utils.defineProperty(func, 'payable', (method.payable == null || !!method.payable))

                    return func;
                })();

                if (!deploy) { deploy = func; }

                break;

            case 'function':
                var func = (function() {
                    var inputParams = parseParams(method.inputs);
                    var outputParams = parseParams(method.outputs);

                    var signature = '(' + inputParams.types.join(',') + ')';
                    signature = signature.replace(/tuple/g, '');
                    signature = method.name + signature;

                    var parse = function(data) {
                        try {
                            return utils.coder.decode(method.outputs, utils.arrayify(data));
                        } catch(error) {
                            errors.throwError('invalid data for function output', errors.INVALID_ARGUMENT, {
                                arg: 'data',
                                errorArg: error.arg,
                                errorValue: error.value,
                                value: data,
                                reason: error.reason
                            });
                        }
                    };

                    var sighash = utils.keccak256(utils.toUtf8Bytes(signature)).substring(0, 10);
                    var func = function() {
                        var result = {
                            name: method.name,
                            signature: signature,
                            sighash: sighash,
                            type: ((method.constant) ? 'call': 'transaction')
                        };

                        var params = Array.prototype.slice.call(arguments, 0);

                        if (params.length < inputParams.types.length) {
                            errors.throwError('missing input argument', errors.MISSING_ARGUMENT, {
                                arg: (inputParams.names[params.length] || 'unknown'),
                                count: params.length,
                                expectedCount: inputParams.types.length,
                                name: method.name
                            });
                        } else if (params.length > inputParams.types.length) {
                            errors.throwError('too many input arguments', errors.UNEXPECTED_ARGUMENT, {
                                count: params.length,
                                expectedCount: inputParams.types.length
                            });
                        }

                        try {
                            var encodedParams = utils.coder.encode(method.inputs, params);
                        } catch (error) {
                            errors.throwError('invalid input argument', errors.INVALID_ARGUMENT, {
                                arg: error.arg,
                                reason: error.reason,
                                value: error.value
                            });
                        }

                        result.data = sighash + encodedParams.substring(2);
                        result.parse = parse;

                        return populateDescription(new FunctionDescription(), result);
                    }

                    utils.defineFrozen(func, 'inputs', inputParams);
                    utils.defineFrozen(func, 'outputs', outputParams);

                    utils.defineProperty(func, 'payable', (method.payable == null || !!method.payable))

                    utils.defineProperty(func, 'parseResult', parse);

                    utils.defineProperty(func, 'signature', signature);
                    utils.defineProperty(func, 'sighash', sighash);

                    return func;
                })();

                // Expose the first (and hopefully unique named function
                if (method.name && methods[method.name] == null) {
                    utils.defineProperty(methods, method.name, func);
                }

                // Expose all methods by their signature, for overloaded functions
                if (methods[func.signature] == null) {
                    utils.defineProperty(methods, func.signature, func);
                }

                break;

            case 'event':
                var func = (function() {
                    var inputParams = parseParams(method.inputs);

                    var signature = '(' + inputParams.types.join(',') + ')';
                    signature = signature.replace(/tuple/g, '');
                    signature = method.name + signature;

                    var result = {
                        anonymous: (!!method.anonymous),
                        name: method.name,
                        signature: signature,
                        type: 'event'
                    };

                    result.parse = function(topics, data) {
                        if (data == null) {
                            data = topics;
                            topics = null;
                        }

                        // Strip the signature off of non-anonymous topics
                        if (topics != null && !method.anonymous) { topics = topics.slice(1); }

                        var inputIndexed = [], inputNonIndexed = [];
                        var inputDynamic = [];
                        method.inputs.forEach(function(param, index) {

                            if (param.indexed) {
                                if (param.type === 'string' || param.type === 'bytes' || param.type.indexOf('[') >= 0 || param.type.substring(0, 5) === 'tuple') {
                                    inputIndexed.push({ type: 'bytes32', name: (param.name || '')});
                                    inputDynamic.push(true);
                                } else {
                                    inputIndexed.push(param);
                                    inputDynamic.push(false);
                                }
                            } else {
                                inputNonIndexed.push(param);
                                inputDynamic.push(false);
                            }
                        });

                        if (topics != null) {
                            var resultIndexed = utils.coder.decode(
                                inputIndexed,
                                utils.concat(topics)
                            );
                        }

                        var resultNonIndexed = utils.coder.decode(
                            inputNonIndexed,
                            utils.arrayify(data)
                        );

                        var result = new Result();
                        var nonIndexedIndex = 0, indexedIndex = 0;
                        method.inputs.forEach(function(input, index) {
                            if (input.indexed) {
                                if (topics == null) {
                                    result[index] = new Indexed(null);

                                } else if (inputDynamic[index]) {
                                    result[index] = new Indexed(resultIndexed[indexedIndex++]);
                                } else {
                                    result[index] = resultIndexed[indexedIndex++];
                                }
                            } else {
                                result[index] = resultNonIndexed[nonIndexedIndex++];
                            }
                            if (input.name) { result[input.name] = result[index]; }
                        });

                        result.length = method.inputs.length;

                        return result;
                    };

                    var func =  populateDescription(new EventDescription(), result)
                    utils.defineFrozen(func, 'topics', [ utils.keccak256(utils.toUtf8Bytes(signature)) ]);
                    utils.defineFrozen(func, 'inputs', inputParams);
                    return func;
                })();

                // Expose the first (and hopefully unique) event name
                if (method.name && events[method.name] == null) {
                    utils.defineProperty(events, method.name, func);
                }

                // Expose all events by their signature, for overloaded functions
                if (methods[func.signature] == null) {
                    utils.defineProperty(methods, func.signature, func);
                }

                break;

            case 'fallback':
                // Nothing to do for fallback
                break;

            default:
                console.log('WARNING: unsupported ABI type - ' + method.type);
                break;
        }
    };

    _abi.forEach(addMethod, this);

    // If there wasn't a constructor, create the default constructor
    if (!deploy) {
        addMethod({type: 'constructor', inputs: []});
    }

    utils.defineProperty(this, 'deployFunction', deploy);
}

utils.defineProperty(Interface.prototype, 'parseTransaction', function(tx) {
    var sighash = tx.data.substring(0, 10).toLowerCase();
    for (var name in this.functions) {
        if (name.indexOf('(') === -1) { continue; }
        var func = this.functions[name];
        if (func.sighash === sighash) {
            var result = utils.coder.decode(func.inputs.types, '0x' + tx.data.substring(10));
            return {
                args: result,
                signature: func.signature,
                sighash: func.sighash,
                parse: func.parseResult,
                value: tx.value,
            };
        }
    }
    return null;
});

module.exports = Interface;


/***/ }),

/***/ "../node_modules/ethers/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var version = __webpack_require__("../node_modules/ethers/package.json").version;

var contracts = __webpack_require__("../node_modules/ethers/contracts/index.js");
var providers = __webpack_require__("../node_modules/ethers/providers/index.js");
var errors = __webpack_require__("../node_modules/ethers/utils/errors.js");
var utils = __webpack_require__("../node_modules/ethers/utils/index.js");
var wallet = __webpack_require__("../node_modules/ethers/wallet/index.js");

module.exports = {
    Wallet: wallet.Wallet,

    HDNode: wallet.HDNode,
    SigningKey: wallet.SigningKey,

    Contract: contracts.Contract,
    Interface: contracts.Interface,

    networks: providers.networks,
    providers: providers,

    errors: errors,
    utils: utils,

    version: version,
};


/***/ }),

/***/ "../node_modules/ethers/node_modules/js-sha3/src/sha3.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.5.7
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2016
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
  'use strict';

  var root = typeof window === 'object' ? window : {};
  var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  }
  var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var HEX_CHARS = '0123456789abcdef'.split('');
  var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
  var KECCAK_PADDING = [1, 256, 65536, 16777216];
  var PADDING = [6, 1536, 393216, 100663296];
  var SHIFT = [0, 8, 16, 24];
  var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
            0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
            2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
            2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
            2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
  var BITS = [224, 256, 384, 512];
  var SHAKE_BITS = [128, 256];
  var OUTPUT_TYPES = ['hex', 'buffer', 'arrayBuffer', 'array'];

  var createOutputMethod = function (bits, padding, outputType) {
    return function (message) {
      return new Keccak(bits, padding, bits).update(message)[outputType]();
    };
  };

  var createShakeOutputMethod = function (bits, padding, outputType) {
    return function (message, outputBits) {
      return new Keccak(bits, padding, outputBits).update(message)[outputType]();
    };
  };

  var createMethod = function (bits, padding) {
    var method = createOutputMethod(bits, padding, 'hex');
    method.create = function () {
      return new Keccak(bits, padding, bits);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(bits, padding, type);
    }
    return method;
  };

  var createShakeMethod = function (bits, padding) {
    var method = createShakeOutputMethod(bits, padding, 'hex');
    method.create = function (outputBits) {
      return new Keccak(bits, padding, outputBits);
    };
    method.update = function (message, outputBits) {
      return method.create(outputBits).update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createShakeOutputMethod(bits, padding, type);
    }
    return method;
  };

  var algorithms = [
    {name: 'keccak', padding: KECCAK_PADDING, bits: BITS, createMethod: createMethod},
    {name: 'sha3', padding: PADDING, bits: BITS, createMethod: createMethod},
    {name: 'shake', padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod}
  ];

  var methods = {}, methodNames = [];

  for (var i = 0; i < algorithms.length; ++i) {
    var algorithm = algorithms[i];
    var bits  = algorithm.bits;
    for (var j = 0; j < bits.length; ++j) {
      var methodName = algorithm.name +'_' + bits[j];
      methodNames.push(methodName);
      methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
    }
  }

  function Keccak(bits, padding, outputBits) {
    this.blocks = [];
    this.s = [];
    this.padding = padding;
    this.outputBits = outputBits;
    this.reset = true;
    this.block = 0;
    this.start = 0;
    this.blockCount = (1600 - (bits << 1)) >> 5;
    this.byteCount = this.blockCount << 2;
    this.outputBlocks = outputBits >> 5;
    this.extraBytes = (outputBits & 31) >> 3;

    for (var i = 0; i < 50; ++i) {
      this.s[i] = 0;
    }
  }

  Keccak.prototype.update = function (message) {
    var notString = typeof message !== 'string';
    if (notString && message.constructor === ArrayBuffer) {
      message = new Uint8Array(message);
    }
    var length = message.length, blocks = this.blocks, byteCount = this.byteCount,
      blockCount = this.blockCount, index = 0, s = this.s, i, code;

    while (index < length) {
      if (this.reset) {
        this.reset = false;
        blocks[0] = this.block;
        for (i = 1; i < blockCount + 1; ++i) {
          blocks[i] = 0;
        }
      }
      if (notString) {
        for (i = this.start; index < length && i < byteCount; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < byteCount; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }
      this.lastByteIndex = i;
      if (i >= byteCount) {
        this.start = i - byteCount;
        this.block = blocks[blockCount];
        for (i = 0; i < blockCount; ++i) {
          s[i] ^= blocks[i];
        }
        f(s);
        this.reset = true;
      } else {
        this.start = i;
      }
    }
    return this;
  };

  Keccak.prototype.finalize = function () {
    var blocks = this.blocks, i = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
    blocks[i >> 2] |= this.padding[i & 3];
    if (this.lastByteIndex === this.byteCount) {
      blocks[0] = blocks[blockCount];
      for (i = 1; i < blockCount + 1; ++i) {
        blocks[i] = 0;
      }
    }
    blocks[blockCount - 1] |= 0x80000000;
    for (i = 0; i < blockCount; ++i) {
      s[i] ^= blocks[i];
    }
    f(s);
  };

  Keccak.prototype.toString = Keccak.prototype.hex = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
    var hex = '', block;
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        block = s[i];
        hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F] +
               HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F] +
               HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F] +
               HEX_CHARS[(block >> 28) & 0x0F] + HEX_CHARS[(block >> 24) & 0x0F];
      }
      if (j % blockCount === 0) {
        f(s);
        i = 0;
      }
    }
    if (extraBytes) {
      block = s[i];
      if (extraBytes > 0) {
        hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F];
      }
      if (extraBytes > 1) {
        hex += HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F];
      }
      if (extraBytes > 2) {
        hex += HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F];
      }
    }
    return hex;
  };

  Keccak.prototype.arrayBuffer = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
    var bytes = this.outputBits >> 3;
    var buffer;
    if (extraBytes) {
      buffer = new ArrayBuffer((outputBlocks + 1) << 2);
    } else {
      buffer = new ArrayBuffer(bytes);
    }
    var array = new Uint32Array(buffer);
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        array[j] = s[i];
      }
      if (j % blockCount === 0) {
        f(s);
      }
    }
    if (extraBytes) {
      array[i] = s[i];
      buffer = buffer.slice(0, bytes);
    }
    return buffer;
  };

  Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;

  Keccak.prototype.digest = Keccak.prototype.array = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
    var array = [], offset, block;
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        offset = j << 2;
        block = s[i];
        array[offset] = block & 0xFF;
        array[offset + 1] = (block >> 8) & 0xFF;
        array[offset + 2] = (block >> 16) & 0xFF;
        array[offset + 3] = (block >> 24) & 0xFF;
      }
      if (j % blockCount === 0) {
        f(s);
      }
    }
    if (extraBytes) {
      offset = j << 2;
      block = s[i];
      if (extraBytes > 0) {
        array[offset] = block & 0xFF;
      }
      if (extraBytes > 1) {
        array[offset + 1] = (block >> 8) & 0xFF;
      }
      if (extraBytes > 2) {
        array[offset + 2] = (block >> 16) & 0xFF;
      }
    }
    return array;
  };

  var f = function (s) {
    var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9,
        b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17,
        b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33,
        b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
    for (n = 0; n < 48; n += 2) {
      c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
      c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
      c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
      c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
      c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
      c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
      c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
      c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
      c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
      c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

      h = c8 ^ ((c2 << 1) | (c3 >>> 31));
      l = c9 ^ ((c3 << 1) | (c2 >>> 31));
      s[0] ^= h;
      s[1] ^= l;
      s[10] ^= h;
      s[11] ^= l;
      s[20] ^= h;
      s[21] ^= l;
      s[30] ^= h;
      s[31] ^= l;
      s[40] ^= h;
      s[41] ^= l;
      h = c0 ^ ((c4 << 1) | (c5 >>> 31));
      l = c1 ^ ((c5 << 1) | (c4 >>> 31));
      s[2] ^= h;
      s[3] ^= l;
      s[12] ^= h;
      s[13] ^= l;
      s[22] ^= h;
      s[23] ^= l;
      s[32] ^= h;
      s[33] ^= l;
      s[42] ^= h;
      s[43] ^= l;
      h = c2 ^ ((c6 << 1) | (c7 >>> 31));
      l = c3 ^ ((c7 << 1) | (c6 >>> 31));
      s[4] ^= h;
      s[5] ^= l;
      s[14] ^= h;
      s[15] ^= l;
      s[24] ^= h;
      s[25] ^= l;
      s[34] ^= h;
      s[35] ^= l;
      s[44] ^= h;
      s[45] ^= l;
      h = c4 ^ ((c8 << 1) | (c9 >>> 31));
      l = c5 ^ ((c9 << 1) | (c8 >>> 31));
      s[6] ^= h;
      s[7] ^= l;
      s[16] ^= h;
      s[17] ^= l;
      s[26] ^= h;
      s[27] ^= l;
      s[36] ^= h;
      s[37] ^= l;
      s[46] ^= h;
      s[47] ^= l;
      h = c6 ^ ((c0 << 1) | (c1 >>> 31));
      l = c7 ^ ((c1 << 1) | (c0 >>> 31));
      s[8] ^= h;
      s[9] ^= l;
      s[18] ^= h;
      s[19] ^= l;
      s[28] ^= h;
      s[29] ^= l;
      s[38] ^= h;
      s[39] ^= l;
      s[48] ^= h;
      s[49] ^= l;

      b0 = s[0];
      b1 = s[1];
      b32 = (s[11] << 4) | (s[10] >>> 28);
      b33 = (s[10] << 4) | (s[11] >>> 28);
      b14 = (s[20] << 3) | (s[21] >>> 29);
      b15 = (s[21] << 3) | (s[20] >>> 29);
      b46 = (s[31] << 9) | (s[30] >>> 23);
      b47 = (s[30] << 9) | (s[31] >>> 23);
      b28 = (s[40] << 18) | (s[41] >>> 14);
      b29 = (s[41] << 18) | (s[40] >>> 14);
      b20 = (s[2] << 1) | (s[3] >>> 31);
      b21 = (s[3] << 1) | (s[2] >>> 31);
      b2 = (s[13] << 12) | (s[12] >>> 20);
      b3 = (s[12] << 12) | (s[13] >>> 20);
      b34 = (s[22] << 10) | (s[23] >>> 22);
      b35 = (s[23] << 10) | (s[22] >>> 22);
      b16 = (s[33] << 13) | (s[32] >>> 19);
      b17 = (s[32] << 13) | (s[33] >>> 19);
      b48 = (s[42] << 2) | (s[43] >>> 30);
      b49 = (s[43] << 2) | (s[42] >>> 30);
      b40 = (s[5] << 30) | (s[4] >>> 2);
      b41 = (s[4] << 30) | (s[5] >>> 2);
      b22 = (s[14] << 6) | (s[15] >>> 26);
      b23 = (s[15] << 6) | (s[14] >>> 26);
      b4 = (s[25] << 11) | (s[24] >>> 21);
      b5 = (s[24] << 11) | (s[25] >>> 21);
      b36 = (s[34] << 15) | (s[35] >>> 17);
      b37 = (s[35] << 15) | (s[34] >>> 17);
      b18 = (s[45] << 29) | (s[44] >>> 3);
      b19 = (s[44] << 29) | (s[45] >>> 3);
      b10 = (s[6] << 28) | (s[7] >>> 4);
      b11 = (s[7] << 28) | (s[6] >>> 4);
      b42 = (s[17] << 23) | (s[16] >>> 9);
      b43 = (s[16] << 23) | (s[17] >>> 9);
      b24 = (s[26] << 25) | (s[27] >>> 7);
      b25 = (s[27] << 25) | (s[26] >>> 7);
      b6 = (s[36] << 21) | (s[37] >>> 11);
      b7 = (s[37] << 21) | (s[36] >>> 11);
      b38 = (s[47] << 24) | (s[46] >>> 8);
      b39 = (s[46] << 24) | (s[47] >>> 8);
      b30 = (s[8] << 27) | (s[9] >>> 5);
      b31 = (s[9] << 27) | (s[8] >>> 5);
      b12 = (s[18] << 20) | (s[19] >>> 12);
      b13 = (s[19] << 20) | (s[18] >>> 12);
      b44 = (s[29] << 7) | (s[28] >>> 25);
      b45 = (s[28] << 7) | (s[29] >>> 25);
      b26 = (s[38] << 8) | (s[39] >>> 24);
      b27 = (s[39] << 8) | (s[38] >>> 24);
      b8 = (s[48] << 14) | (s[49] >>> 18);
      b9 = (s[49] << 14) | (s[48] >>> 18);

      s[0] = b0 ^ (~b2 & b4);
      s[1] = b1 ^ (~b3 & b5);
      s[10] = b10 ^ (~b12 & b14);
      s[11] = b11 ^ (~b13 & b15);
      s[20] = b20 ^ (~b22 & b24);
      s[21] = b21 ^ (~b23 & b25);
      s[30] = b30 ^ (~b32 & b34);
      s[31] = b31 ^ (~b33 & b35);
      s[40] = b40 ^ (~b42 & b44);
      s[41] = b41 ^ (~b43 & b45);
      s[2] = b2 ^ (~b4 & b6);
      s[3] = b3 ^ (~b5 & b7);
      s[12] = b12 ^ (~b14 & b16);
      s[13] = b13 ^ (~b15 & b17);
      s[22] = b22 ^ (~b24 & b26);
      s[23] = b23 ^ (~b25 & b27);
      s[32] = b32 ^ (~b34 & b36);
      s[33] = b33 ^ (~b35 & b37);
      s[42] = b42 ^ (~b44 & b46);
      s[43] = b43 ^ (~b45 & b47);
      s[4] = b4 ^ (~b6 & b8);
      s[5] = b5 ^ (~b7 & b9);
      s[14] = b14 ^ (~b16 & b18);
      s[15] = b15 ^ (~b17 & b19);
      s[24] = b24 ^ (~b26 & b28);
      s[25] = b25 ^ (~b27 & b29);
      s[34] = b34 ^ (~b36 & b38);
      s[35] = b35 ^ (~b37 & b39);
      s[44] = b44 ^ (~b46 & b48);
      s[45] = b45 ^ (~b47 & b49);
      s[6] = b6 ^ (~b8 & b0);
      s[7] = b7 ^ (~b9 & b1);
      s[16] = b16 ^ (~b18 & b10);
      s[17] = b17 ^ (~b19 & b11);
      s[26] = b26 ^ (~b28 & b20);
      s[27] = b27 ^ (~b29 & b21);
      s[36] = b36 ^ (~b38 & b30);
      s[37] = b37 ^ (~b39 & b31);
      s[46] = b46 ^ (~b48 & b40);
      s[47] = b47 ^ (~b49 & b41);
      s[8] = b8 ^ (~b0 & b2);
      s[9] = b9 ^ (~b1 & b3);
      s[18] = b18 ^ (~b10 & b12);
      s[19] = b19 ^ (~b11 & b13);
      s[28] = b28 ^ (~b20 & b22);
      s[29] = b29 ^ (~b21 & b23);
      s[38] = b38 ^ (~b30 & b32);
      s[39] = b39 ^ (~b31 & b33);
      s[48] = b48 ^ (~b40 & b42);
      s[49] = b49 ^ (~b41 & b43);

      s[0] ^= RC[n];
      s[1] ^= RC[n + 1];
    }
  };

  if (COMMON_JS) {
    module.exports = methods;
  } else {
    for (var i = 0; i < methodNames.length; ++i) {
      root[methodNames[i]] = methods[methodNames[i]];
    }
  }
})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js"), __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/ethers/package.json":
/***/ (function(module, exports) {

module.exports = {"_from":"ethers@^3.0.26","_id":"ethers@3.0.26","_inBundle":false,"_integrity":"sha512-5O05fG4HCmjIjcyTXl0qIlpVFxMR77d3zjSlmhtQi9s8xaUhOQDWjgPL+zkb6QTjGzB7inCpq4/pac24qV9T2Q==","_location":"/ethers","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"ethers@^3.0.26","name":"ethers","escapedName":"ethers","rawSpec":"^3.0.26","saveSpec":null,"fetchSpec":"^3.0.26"},"_requiredBy":["/"],"_resolved":"https://registry.npmjs.org/ethers/-/ethers-3.0.26.tgz","_shasum":"8b6d9d45c30e4a107cd2467329f2280d650d49f0","_spec":"ethers@^3.0.26","_where":"/Users/tron/Workspace/tron/tron-web","author":{"name":"Richard Moore","email":"me@ricmoo.com"},"browser":{"fs":"./tests/browser-fs.js","zlib":"browserify-zlib","./utils/base64.js":"./utils/browser-base64.js","./utils/random-bytes.js":"./utils/browser-random-bytes.js","./providers/ipc-provider.js":"./utils/empty.js","xmlhttprequest":"./providers/browser-xmlhttprequest.js"},"bugs":{"url":"https://github.com/ethers-io/ethers-wallet/issues"},"bundleDependencies":false,"dependencies":{"aes-js":"3.0.0","bn.js":"^4.4.0","elliptic":"6.3.3","hash.js":"^1.0.0","inherits":"2.0.1","js-sha3":"0.5.7","scrypt-js":"2.0.3","setimmediate":"1.0.4","uuid":"2.0.1","xmlhttprequest":"1.8.0"},"deprecated":false,"description":"Ethereum wallet library.","devDependencies":{"browserify-zlib":"^0.2.0","eslint":"^5.0.1","eslint-plugin-promise":"^3.8.0","grunt":"^0.4.5","grunt-browserify":"^5.0.0","grunt-cli":"1.2.0","grunt-contrib-uglify":"^1.0.1","mocha":"^5.2.0","mocha-phantomjs-core":"2.1.2","solc":"0.4.20","web3":"0.20.2"},"homepage":"https://github.com/ethers-io/ethers-wallet#readme","keywords":["ethereum","wallet"],"license":"MIT","main":"index.js","name":"ethers","repository":{"type":"git","url":"git://github.com/ethers-io/ethers-wallet.git"},"scripts":{"eslint":"eslint index.js contracts/*.js providers/*.js utils/*.js wallet/*.js","test":"if [ \"$RUN_PHANTOMJS\" = \"1\" ]; then npm run-script test-phantomjs; else npm run-script test-node; fi","test-node":"mocha tests/test-*.js","test-phantomjs":"grunt dist && ./node_modules/.bin/grunt --gruntfile Gruntfile-test.js dist && phantomjs --web-security=false ./node_modules/mocha-phantomjs-core/mocha-phantomjs-core.js ./tests/test.html","version":"grunt dist"},"version":"3.0.26"}

/***/ }),

/***/ "../node_modules/ethers/providers/browser-xmlhttprequest.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


try {
    module.exports.XMLHttpRequest = XMLHttpRequest;
} catch(error) {
    console.log('Warning: XMLHttpRequest is not defined');
    module.exports.XMLHttpRequest = null;
}


/***/ }),

/***/ "../node_modules/ethers/providers/etherscan-provider.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Provider = __webpack_require__("../node_modules/ethers/providers/provider.js");

var utils = (function() {
    var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
    return {
        defineProperty: __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty,

        hexlify: convert.hexlify,
        hexStripZeros: convert.hexStripZeros,
    };
})();


function getTransactionString(transaction) {
    var result = [];
    for (var key in transaction) {
        if (transaction[key] == null) { continue; }
        var value = utils.hexlify(transaction[key]);
        if ({ gasLimit: true, gasPrice: true, nonce: true, value: true }[key]) {
            value = utils.hexStripZeros(value);
        }
        result.push(key + '=' + value);
    }
    return result.join('&');
}

function EtherscanProvider(network, apiKey) {
    Provider.call(this, network);

    var baseUrl = null;
    switch(this.name) {
        case 'homestead':
            baseUrl = 'https://api.etherscan.io';
            break;
        case 'ropsten':
            baseUrl = 'https://api-ropsten.etherscan.io';
            break;
        case 'rinkeby':
            baseUrl = 'https://api-rinkeby.etherscan.io';
            break;
        case 'kovan':
            baseUrl = 'https://api-kovan.etherscan.io';
            break;
        default:
            throw new Error('unsupported network');
    }
    utils.defineProperty(this, 'baseUrl', baseUrl);

    utils.defineProperty(this, 'apiKey', apiKey || null);
}
Provider.inherits(EtherscanProvider);

utils.defineProperty(EtherscanProvider.prototype, '_call', function() {
});

utils.defineProperty(EtherscanProvider.prototype, '_callProxy', function() {
});

function getResult(result) {
    // getLogs, getHistory have weird success responses
    if (result.status == 0 && (result.message === 'No records found' || result.message === 'No transactions found')) {
        return result.result;
    }

    if (result.status != 1 || result.message != 'OK') {
        var error = new Error('invalid response');
        error.result = JSON.stringify(result);
        throw error;
    }

    return result.result;
}

function getJsonResult(result) {
    if (result.jsonrpc != '2.0') {
        var error = new Error('invalid response');
        error.result = JSON.stringify(result);
        throw error;
    }

    if (result.error) {
        var error = new Error(result.error.message || 'unknown error');
        if (result.error.code) { error.code = result.error.code; }
        if (result.error.data) { error.data = result.error.data; }
        throw error;
    }

    return result.result;
}

function checkLogTag(blockTag) {
    if (blockTag === 'pending') { throw new Error('pending not supported'); }
    if (blockTag === 'latest') { return blockTag; }

    return parseInt(blockTag.substring(2), 16);
}


utils.defineProperty(EtherscanProvider.prototype, 'perform', function(method, params) {
    if (!params) { params = {}; }

    var url = this.baseUrl;

    var apiKey = '';
    if (this.apiKey) { apiKey += '&apikey=' + this.apiKey; }

    switch (method) {
        case 'getBlockNumber':
            url += '/api?module=proxy&action=eth_blockNumber' + apiKey;
            return Provider.fetchJSON(url, null, getJsonResult);

        case 'getGasPrice':
            url += '/api?module=proxy&action=eth_gasPrice' + apiKey;
            return Provider.fetchJSON(url, null, getJsonResult);


        case 'getBalance':
            // Returns base-10 result
            url += '/api?module=account&action=balance&address=' + params.address;
            url += '&tag=' + params.blockTag + apiKey;
            return Provider.fetchJSON(url, null, getResult);

        case 'getTransactionCount':
            url += '/api?module=proxy&action=eth_getTransactionCount&address=' + params.address;
            url += '&tag=' + params.blockTag + apiKey;
            return Provider.fetchJSON(url, null, getJsonResult);

        case 'getCode':
            url += '/api?module=proxy&action=eth_getCode&address=' + params.address;
            url += '&tag=' + params.blockTag + apiKey;
            return Provider.fetchJSON(url, null, getJsonResult);

        case 'getStorageAt':
            url += '/api?module=proxy&action=eth_getStorageAt&address=' + params.address;
            url += '&position=' + params.position;
            url += '&tag=' + params.blockTag + apiKey;
            return Provider.fetchJSON(url, null, getJsonResult);

        case 'sendTransaction':
            url += '/api?module=proxy&action=eth_sendRawTransaction&hex=' + params.signedTransaction;
            url += apiKey;
            return Provider.fetchJSON(url, null, getJsonResult);


        case 'getBlock':
            if (params.blockTag) {
                url += '/api?module=proxy&action=eth_getBlockByNumber&tag=' + params.blockTag;
                url += '&boolean=false';
                url += apiKey;
                return Provider.fetchJSON(url, null, getJsonResult);
            }
            throw new Error('getBlock by blockHash not implmeneted');

        case 'getTransaction':
            url += '/api?module=proxy&action=eth_getTransactionByHash&txhash=' + params.transactionHash;
            url += apiKey;
            return Provider.fetchJSON(url, null, getJsonResult);

        case 'getTransactionReceipt':
            url += '/api?module=proxy&action=eth_getTransactionReceipt&txhash=' + params.transactionHash;
            url += apiKey;
            return Provider.fetchJSON(url, null, getJsonResult);


        case 'call':
            var transaction = getTransactionString(params.transaction);
            if (transaction) { transaction = '&' + transaction; }
            url += '/api?module=proxy&action=eth_call' + transaction;
            url += apiKey;
            return Provider.fetchJSON(url, null, getJsonResult);

        case 'estimateGas':
            var transaction = getTransactionString(params.transaction);
            if (transaction) { transaction = '&' + transaction; }
            url += '/api?module=proxy&action=eth_estimateGas&' + transaction;
            url += apiKey;
            return Provider.fetchJSON(url, null, getJsonResult);

        case 'getLogs':
            url += '/api?module=logs&action=getLogs';
            try {
                if (params.filter.fromBlock) {
                    url += '&fromBlock=' + checkLogTag(params.filter.fromBlock);
                }

                if (params.filter.toBlock) {
                    url += '&toBlock=' + checkLogTag(params.filter.toBlock);
                }

                if (params.filter.address) {
                    url += '&address=' + params.filter.address;
                }

                // @TODO: We can handle slightly more complicated logs using the logs API
                if (params.filter.topics && params.filter.topics.length > 0) {
                    if (params.filter.topics.length > 1) {
                        throw new Error('unsupported topic format');
                    }
                    var topic0 = params.filter.topics[0];
                    if (typeof(topic0) !== 'string' || topic0.length !== 66) {
                        throw new Error('unsupported topic0 format');
                    }
                    url += '&topic0=' + topic0;
                }
            } catch (error) {
                return Promise.reject(error);
            }


            url += apiKey;

            var self = this;
            return Provider.fetchJSON(url, null, getResult).then(function(logs) {
                var txs = {};

                var seq = Promise.resolve();
                logs.forEach(function(log) {
                    seq = seq.then(function() {
                        if (log.blockHash != null) { return null; }
                        log.blockHash = txs[log.transactionHash];
                        if (log.blockHash == null) {
                            return self.getTransaction(log.transactionHash).then(function(tx) {
                                txs[log.transactionHash] = tx.blockHash;
                                log.blockHash = tx.blockHash;
                                return log;
                            });
                        }
                        return null;
                    });
                })

                return seq.then(function() {
                    return logs;
                });
            });

        case 'getEtherPrice':
            if (this.name !== 'homestead') { return Promise.resolve(0.0); }
            url += '/api?module=stats&action=ethprice';
            url += apiKey;
            return Provider.fetchJSON(url, null, getResult).then(function(result) {
                return parseFloat(result.ethusd);
            });

        default:
            break;
    }

    return Promise.reject(new Error('not implemented - ' + method));
});

utils.defineProperty(EtherscanProvider.prototype, 'getHistory', function(addressOrName, startBlock, endBlock) {

    var url = this.baseUrl;

    var apiKey = '';
    if (this.apiKey) { apiKey += '&apikey=' + this.apiKey; }

    if (startBlock == null) { startBlock = 0; }
    if (endBlock == null) { endBlock = 99999999; }

    return this.resolveName(addressOrName).then(function(address) {
        url += '/api?module=account&action=txlist&address=' + address;
        url += '&startblock=' + startBlock;
        url += '&endblock=' + endBlock;
        url += '&sort=asc';

        return Provider.fetchJSON(url, null, getResult).then(function(result) {
            var output = [];
            result.forEach(function(tx) {
                ['contractAddress', 'to'].forEach(function(key) {
                    if (tx[key] == '') { delete tx[key]; }
                });
                if (tx.creates == null && tx.contractAddress != null) {
                    tx.creates = tx.contractAddress;
                }
                var item = Provider._formatters.checkTransactionResponse(tx);
                if (tx.timeStamp) { item.timestamp = parseInt(tx.timeStamp); }
                output.push(item);
            });
            return output;
        });
    });
});

module.exports = EtherscanProvider;;


/***/ }),

/***/ "../node_modules/ethers/providers/fallback-provider.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__("../node_modules/inherits/inherits_browser.js");

var Provider = __webpack_require__("../node_modules/ethers/providers/provider.js");

var utils = (function() {
    return {
        defineProperty: __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty,
    };
})();


function FallbackProvider(providers) {
    if (providers.length === 0) { throw new Error('no providers'); }

    var network = {};
    ['chainId', 'ensAddress', 'name', 'testnet'].forEach(function(key) {
        for (var i = 1; i < providers.length; i++) {
            if (providers[0][key] !== providers[i][key]) {
                throw new Error('incompatible providers - ' + key + ' mismatch');
            }
        }
        network[key] = providers[0][key];
    });

    if (!(this instanceof FallbackProvider)) { throw new Error('missing new'); }
    Provider.call(this, network);

    providers = providers.slice(0);
    Object.defineProperty(this, 'providers', {
        get: function() {
            return providers.slice(0);
        }
    });
}
inherits(FallbackProvider, Provider);


utils.defineProperty(FallbackProvider.prototype, 'perform', function(method, params) {
    var providers = this.providers;
    return new Promise(function(resolve, reject) {
        var firstError = null;
        function next() {
            if (!providers.length) {
                reject(firstError);
                return;
            }

            var provider = providers.shift();
            provider.perform(method, params).then(function(result) {
                return resolve(result);
            }, function (error) {
                if (!firstError) { firstError = error; }
                next();
            }).catch(function(error) { });
        }
        next();
    });
});

module.exports = FallbackProvider;


/***/ }),

/***/ "../node_modules/ethers/providers/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Provider = __webpack_require__("../node_modules/ethers/providers/provider.js");

var EtherscanProvider = __webpack_require__("../node_modules/ethers/providers/etherscan-provider.js");
var FallbackProvider = __webpack_require__("../node_modules/ethers/providers/fallback-provider.js");
var IpcProvider = __webpack_require__("../node_modules/ethers/utils/empty.js");
var InfuraProvider = __webpack_require__("../node_modules/ethers/providers/infura-provider.js");
var JsonRpcProvider = __webpack_require__("../node_modules/ethers/providers/json-rpc-provider.js");
var Web3Provider = __webpack_require__("../node_modules/ethers/providers/web3-provider.js");

function getDefaultProvider(network) {
    return new FallbackProvider([
        new InfuraProvider(network),
        new EtherscanProvider(network),
    ]);
}

var exports = {
    EtherscanProvider: EtherscanProvider,
    FallbackProvider: FallbackProvider,
    InfuraProvider: InfuraProvider,
    JsonRpcProvider: JsonRpcProvider,
    Web3Provider: Web3Provider,

    isProvider: Provider.isProvider,

    networks: Provider.networks,

    getDefaultProvider:getDefaultProvider,

    Provider: Provider,
}

// Only available in node, so we do not include it in browsers
if (IpcProvider) {
    exports.IpcProvider = IpcProvider;
}

module.exports = exports;


/***/ }),

/***/ "../node_modules/ethers/providers/infura-provider.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Provider = __webpack_require__("../node_modules/ethers/providers/provider.js");
var JsonRpcProvider = __webpack_require__("../node_modules/ethers/providers/json-rpc-provider.js");

var utils = (function() {
    return {
        defineProperty: __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty
    }
})();

var errors = __webpack_require__("../node_modules/ethers/utils/errors.js");

function InfuraProvider(network, apiAccessToken) {
    errors.checkNew(this, InfuraProvider);

    network = Provider.getNetwork(network);

    var host = null;
    switch(network.name) {
        case 'homestead':
            host = 'mainnet.infura.io';
            break;
        case 'ropsten':
            host = 'ropsten.infura.io';
            break;
        case 'rinkeby':
            host = 'rinkeby.infura.io';
            break;
        case 'kovan':
            host = 'kovan.infura.io';
            break;
        default:
            throw new Error('unsupported network');
    }

    var url = 'https://' + host + '/' + (apiAccessToken || '');

    JsonRpcProvider.call(this, url, network);

    utils.defineProperty(this, 'apiAccessToken', apiAccessToken || null);
}
JsonRpcProvider.inherits(InfuraProvider);

utils.defineProperty(InfuraProvider.prototype, '_startPending', function() {
    console.log('WARNING: INFURA does not support pending filters');
});

utils.defineProperty(InfuraProvider.prototype, '_stopPending', function() {
});

utils.defineProperty(InfuraProvider.prototype, 'getSigner', function(address) {
    errors.throwError('INFURA does not support signing', errors.UNSUPPORTED_OPERATION, { operation: 'getSigner' });
});

utils.defineProperty(InfuraProvider.prototype, 'listAccounts', function() {
    return Promise.resolve([]);
});

module.exports = InfuraProvider;


/***/ }),

/***/ "../node_modules/ethers/providers/json-rpc-provider.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// See: https://github.com/ethereum/wiki/wiki/JSON-RPC

var Provider = __webpack_require__("../node_modules/ethers/providers/provider.js");

var utils = (function() {
    var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
    return {
        defineProperty: __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty,

        hexlify: convert.hexlify,
        isHexString: convert.isHexString,
        hexStripZeros: convert.hexStripZeros,

        toUtf8Bytes: __webpack_require__("../node_modules/ethers/utils/utf8.js").toUtf8Bytes,

        getAddress: __webpack_require__("../node_modules/ethers/utils/address.js").getAddress,
    }
})();

var errors = __webpack_require__("../node_modules/ethers/utils/errors.js");

function timer(timeout) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, timeout);
    });
}

function getResult(payload) {
    if (payload.error) {
        var error = new Error(payload.error.message);
        error.code = payload.error.code;
        error.data = payload.error.data;
        throw error;
    }

    return payload.result;
}

function getTransaction(transaction) {
    var result = {};

    for (var key in transaction) {
        result[key] = utils.hexlify(transaction[key]);
    }

    // Some nodes (INFURA ropsten; INFURA mainnet is fine) don't like extra zeros.
    ['gasLimit', 'gasPrice', 'nonce', 'value'].forEach(function(key) {
        if (!result[key]) { return; }
        result[key] = utils.hexStripZeros(result[key]);
    });

    // Transform "gasLimit" to "gas"
    if (result.gasLimit != null && result.gas == null) {
        result.gas = result.gasLimit;
        delete result.gasLimit;
    }

    return result;
}

function getLowerCase(value) {
    if (value) { return value.toLowerCase(); }
    return value;
}

function JsonRpcSigner(provider, address) {
    errors.checkNew(this, JsonRpcSigner);

    utils.defineProperty(this, 'provider', provider);

    // Statically attach to a given address
    if (address) {
        utils.defineProperty(this, 'address', address);
        utils.defineProperty(this, '_syncAddress', true);

    } else {
        Object.defineProperty(this, 'address', {
            enumerable: true,
            get: function() {
                errors.throwError('no sync sync address available; use getAddress', errors.UNSUPPORTED_OPERATION, { operation: 'address' });
            }
        });
        utils.defineProperty(this, '_syncAddress', false);
    }
}

utils.defineProperty(JsonRpcSigner.prototype, 'getAddress', function() {
    if (this._syncAddress) { return Promise.resolve(this.address); }

    return this.provider.send('eth_accounts', []).then(function(accounts) {
        if (accounts.length === 0) {
            errors.throwError('no accounts', errors.UNSUPPORTED_OPERATION, { operation: 'getAddress' });
        }
        return utils.getAddress(accounts[0]);
    });
});

utils.defineProperty(JsonRpcSigner.prototype, 'getBalance', function(blockTag) {
    var provider = this.provider;
    return this.getAddress().then(function(address) {
        return provider.getBalance(address, blockTag);
    });
});

utils.defineProperty(JsonRpcSigner.prototype, 'getTransactionCount', function(blockTag) {
    var provider = this.provider;
    return this.getAddress().then(function(address) {
        return provider.getTransactionCount(address, blockTag);
    });
});

utils.defineProperty(JsonRpcSigner.prototype, 'sendTransaction', function(transaction) {
    var provider = this.provider;
    transaction = getTransaction(transaction);
    return this.getAddress().then(function(address) {
        transaction.from = address.toLowerCase();
        return provider.send('eth_sendTransaction', [ transaction ]).then(function(hash) {
            return new Promise(function(resolve, reject) {
                function check() {
                    provider.getTransaction(hash).then(function(transaction) {
                        if (!transaction) {
                            setTimeout(check, 1000);
                            return null;
                        }
                        transaction.wait = function() {
                            return provider.waitForTransaction(hash);
                        };
                        resolve(transaction);
                        return null;
                    }).catch(function(error) {
                        setTimeout(check, 1000);
                        return null;
                    });
                }
                check();
            });
        });
    });
});

utils.defineProperty(JsonRpcSigner.prototype, 'signMessage', function(message) {
    var provider = this.provider;

    var data = ((typeof(message) === 'string') ? utils.toUtf8Bytes(message): message);
    return this.getAddress().then(function(address) {

        // https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign
        return provider.send('eth_sign', [ address.toLowerCase(), utils.hexlify(data) ]);
    });
});

utils.defineProperty(JsonRpcSigner.prototype, 'unlock', function(password) {
    var provider = this.provider;

    return this.getAddress().then(function(address) {
        return provider.send('personal_unlockAccount', [ address.toLowerCase(), password, null ]);
    });
});


function JsonRpcProvider(url, network) {
    errors.checkNew(this, JsonRpcProvider);

    if (arguments.length == 1) {
        if (typeof(url) === 'string') {
            try {
                network = Provider.getNetwork(url);
                url = null;
            } catch (error) { }
        } else if (url && url.url == null) {
            network = url;
            url = null;
        }
    }

    Provider.call(this, network);

    if (!url) { url = 'http://localhost:8545'; }

    utils.defineProperty(this, 'url', url);
}
Provider.inherits(JsonRpcProvider);

utils.defineProperty(JsonRpcProvider.prototype, 'getSigner', function(address) {
    return new JsonRpcSigner(this, address);
});

utils.defineProperty(JsonRpcProvider.prototype, 'listAccounts', function() {
    return this.send('eth_accounts', []).then(function(accounts) {
        accounts.forEach(function(address, index) {
            accounts[index] = utils.getAddress(address);
        });
        return accounts;
    });
});

utils.defineProperty(JsonRpcProvider.prototype, 'send', function(method, params) {
    var request = {
        method: method,
        params: params,
        id: 42,
        jsonrpc: "2.0"
    };
    return Provider.fetchJSON(this.url, JSON.stringify(request), getResult);
});

utils.defineProperty(JsonRpcProvider.prototype, 'perform', function(method, params) {
    switch (method) {
        case 'getBlockNumber':
            return this.send('eth_blockNumber', []);

        case 'getGasPrice':
            return this.send('eth_gasPrice', []);

        case 'getBalance':
            return this.send('eth_getBalance', [getLowerCase(params.address), params.blockTag]);

        case 'getTransactionCount':
            return this.send('eth_getTransactionCount', [getLowerCase(params.address), params.blockTag]);

        case 'getCode':
            return this.send('eth_getCode', [getLowerCase(params.address), params.blockTag]);

        case 'getStorageAt':
            return this.send('eth_getStorageAt', [getLowerCase(params.address), params.position, params.blockTag]);

        case 'sendTransaction':
            return this.send('eth_sendRawTransaction', [params.signedTransaction]);

        case 'getBlock':
            if (params.blockTag) {
                return this.send('eth_getBlockByNumber', [params.blockTag, false]);
            } else if (params.blockHash) {
                return this.send('eth_getBlockByHash', [params.blockHash, false]);
            }
            return Promise.reject(new Error('invalid block tag or block hash'));

        case 'getTransaction':
            return this.send('eth_getTransactionByHash', [params.transactionHash]);

        case 'getTransactionReceipt':
            return this.send('eth_getTransactionReceipt', [params.transactionHash]);

        case 'call':
            return this.send('eth_call', [getTransaction(params.transaction), 'latest']);

        case 'estimateGas':
            return this.send('eth_estimateGas', [getTransaction(params.transaction)]);

        case 'getLogs':
            if (params.filter && params.filter.address != null) {
                params.filter.address = getLowerCase(params.filter.address);
            }
            return this.send('eth_getLogs', [params.filter]);

        default:
            break;
    }

    return Promise.reject(new Error('not implemented - ' + method));
});

utils.defineProperty(JsonRpcProvider.prototype, '_startPending', function() {
    if (this._pendingFilter != null) { return; }
    var self = this;

    var pendingFilter = this.send('eth_newPendingTransactionFilter', []);
    this._pendingFilter = pendingFilter;

    pendingFilter.then(function(filterId) {
        function poll() {
            self.send('eth_getFilterChanges', [ filterId ]).then(function(hashes) {
                if (self._pendingFilter != pendingFilter) { return; }

                var seq = Promise.resolve();
                hashes.forEach(function(hash) {
                    self._emitted['t:' + hash.toLowerCase()] = 'pending';
                    seq = seq.then(function() {
                        return self.getTransaction(hash).then(function(tx) {
                            self.emit('pending', tx);
                            return null;
                        });
                    });
                });

                return seq.then(function() {
                    return timer(1000);
                });
            }).then(function() {
                if (self._pendingFilter != pendingFilter) {
                    self.send('eth_uninstallFilter', [ filterIf ]);
                    return null;
                }
                setTimeout(function() { poll(); }, 0);
                return null;
            }).catch(function(error) {
                
            });
        }
        poll();

        return filterId;
    }).catch(function(error) {
    });
});

utils.defineProperty(JsonRpcProvider.prototype, '_stopPending', function() {
    this._pendingFilter = null;
});

utils.defineProperty(JsonRpcProvider, '_hexlifyTransaction', function(transaction) {
    return getTransaction(transaction);
});

module.exports = JsonRpcProvider;


/***/ }),

/***/ "../node_modules/ethers/providers/networks.json":
/***/ (function(module, exports) {

module.exports = {"unspecified":{"chainId":0,"name":"unspecified"},"homestead":{"chainId":1,"ensAddress":"0x314159265dd8dbb310642f98f50c066173c1259b","name":"homestead"},"mainnet":{"chainId":1,"ensAddress":"0x314159265dd8dbb310642f98f50c066173c1259b","name":"homestead"},"morden":{"chainId":2,"name":"morden"},"ropsten":{"chainId":3,"ensAddress":"0x112234455c3a32fd11230c42e7bccd4a84e02010","name":"ropsten"},"testnet":{"chainId":3,"ensAddress":"0x112234455c3a32fd11230c42e7bccd4a84e02010","name":"ropsten"},"rinkeby":{"chainId":4,"name":"rinkeby"},"kovan":{"chainId":42,"name":"kovan"},"classic":{"chainId":61,"name":"classic"}}

/***/ }),

/***/ "../node_modules/ethers/providers/provider.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__("../node_modules/inherits/inherits_browser.js");

var XMLHttpRequest = __webpack_require__("../node_modules/ethers/providers/browser-xmlhttprequest.js").XMLHttpRequest;

var networks = __webpack_require__("../node_modules/ethers/providers/networks.json");

var utils = (function() {
    var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
    var utf8 = __webpack_require__("../node_modules/ethers/utils/utf8.js");
    return {
        defineProperty: __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty,

        getAddress: __webpack_require__("../node_modules/ethers/utils/address.js").getAddress,
        getContractAddress: __webpack_require__("../node_modules/ethers/utils/contract-address.js").getContractAddress,

        bigNumberify: __webpack_require__("../node_modules/ethers/utils/bignumber.js").bigNumberify,
        arrayify: convert.arrayify,

        hexlify: convert.hexlify,
        isHexString: convert.isHexString,

        concat: convert.concat,
        hexStripZeros: convert.hexStripZeros,
        stripZeros: convert.stripZeros,

        base64: __webpack_require__("../node_modules/ethers/utils/browser-base64.js"),

        namehash: __webpack_require__("../node_modules/ethers/utils/namehash.js"),

        toUtf8String: utf8.toUtf8String,
        toUtf8Bytes: utf8.toUtf8Bytes,

        RLP: __webpack_require__("../node_modules/ethers/utils/rlp.js"),
    }
})();

var errors = __webpack_require__("../node_modules/ethers/utils/errors.js");

function copyObject(obj) {
    var result = {};
    for (var key in obj) { result[key] = obj[key]; }
    return result;
}

function check(format, object) {
    var result = {};
    for (var key in format) {
        try {
            var value = format[key](object[key]);
            if (value !== undefined) { result[key] = value; }
        } catch (error) {
            error.checkKey = key;
            error.checkValue = object[key];
            throw error;
        }
    }
    return result;
}

function allowNull(check, nullValue) {
    return (function(value) {
        if (value == null) { return nullValue; }
        return check(value);
    });
}

function allowFalsish(check, replaceValue) {
    return (function(value) {
        if (!value) { return replaceValue; }
        return check(value);
    });
}

function arrayOf(check) {
    return (function(array) {
        if (!Array.isArray(array)) { throw new Error('not an array'); }

        var result = [];

        array.forEach(function(value) {
            result.push(check(value));
        });

        return result;
    });
}

function checkHash(hash) {
    if (!utils.isHexString(hash) || hash.length !== 66) {
        throw new Error('invalid hash - ' + hash);
    }
    return hash;
}

function checkNumber(number) {
    return utils.bigNumberify(number).toNumber();
}

function checkDifficulty(number) {
    var value = utils.bigNumberify(number);

    try {
        value = value.toNumber();
    } catch (error) {
        value = null;
    }

    return value;
}

function checkBoolean(value) {
    if (typeof(value) === 'boolean') { return value; }
    if (typeof(value) === 'string') {
        if (value === 'true') { return true; }
        if (value === 'false') { return false; }
    }
    throw new Error('invaid boolean - ' + value);
}

function checkUint256(uint256) {
    if (!utils.isHexString(uint256)) {
        throw new Error('invalid uint256');
    }
    while (uint256.length < 66) {
        uint256 = '0x0' + uint256.substring(2);
    }
    return uint256;
}

function checkString(string) {
    if (typeof(string) !== 'string') { throw new Error('invalid string'); }
    return string;
}

function checkBlockTag(blockTag) {
    if (blockTag == null) { return 'latest'; }

    if (blockTag === 'earliest') { return '0x0'; }

    if (blockTag === 'latest' || blockTag === 'pending') {
        return blockTag;
    }

    if (typeof(blockTag) === 'number') {
        return utils.hexStripZeros(utils.hexlify(blockTag));
    }

    if (utils.isHexString(blockTag)) { return utils.hexStripZeros(blockTag); }

    throw new Error('invalid blockTag');
}

var formatBlock = {
    hash: checkHash,
    parentHash: checkHash,
    number: checkNumber,

    timestamp: checkNumber,
    nonce: allowNull(utils.hexlify),
    difficulty: checkDifficulty,

    gasLimit: utils.bigNumberify,
    gasUsed: utils.bigNumberify,

    miner: utils.getAddress,
    extraData: utils.hexlify,

    //transactions: allowNull(arrayOf(checkTransaction)),
    transactions: allowNull(arrayOf(checkHash)),

    //transactionRoot: checkHash,
    //stateRoot: checkHash,
    //sha3Uncles: checkHash,

    //logsBloom: utils.hexlify,
};

function checkBlock(block) {
    if (block.author != null && block.miner == null) {
        block.miner = block.author;
    }
    return check(formatBlock, block);
}


var formatTransaction = {
   hash: checkHash,

   blockHash: allowNull(checkHash, null),
   blockNumber: allowNull(checkNumber, null),
   transactionIndex: allowNull(checkNumber, null),

   from: utils.getAddress,

   gasPrice: utils.bigNumberify,
   gasLimit: utils.bigNumberify,
   to: allowNull(utils.getAddress, null),
   value: utils.bigNumberify,
   nonce: checkNumber,
   data: utils.hexlify,

   r: allowNull(checkUint256),
   s: allowNull(checkUint256),
   v: allowNull(checkNumber),

   creates: allowNull(utils.getAddress, null),

   raw: allowNull(utils.hexlify),
};

function checkTransaction(transaction) {

    // Rename gas to gasLimit
    if (transaction.gas != null && transaction.gasLimit == null) {
        transaction.gasLimit = transaction.gas;
    }

    // Some clients (TestRPC) do strange things like return 0x0 for the
    // 0 address; correct this to be a real address
    if (transaction.to && utils.bigNumberify(transaction.to).isZero()) {
        transaction.to = '0x0000000000000000000000000000000000000000';
    }

    // Rename input to data
    if (transaction.input != null && transaction.data == null) {
        transaction.data = transaction.input;
    }

    // If to and creates are empty, populate the creates from the transaction
    if (transaction.to == null && transaction.creates == null) {
        transaction.creates = utils.getContractAddress(transaction);
    }

    if (!transaction.raw) {
        // Very loose providers (e.g. TestRPC) don't provide a signature or raw
        if (transaction.v && transaction.r && transaction.s) {
            var raw = [
                utils.stripZeros(utils.hexlify(transaction.nonce)),
                utils.stripZeros(utils.hexlify(transaction.gasPrice)),
                utils.stripZeros(utils.hexlify(transaction.gasLimit)),
                (transaction.to || "0x"),
                utils.stripZeros(utils.hexlify(transaction.value || '0x')),
                utils.hexlify(transaction.data || '0x'),
                utils.stripZeros(utils.hexlify(transaction.v || '0x')),
                utils.stripZeros(utils.hexlify(transaction.r)),
                utils.stripZeros(utils.hexlify(transaction.s)),
            ];

            transaction.raw = utils.RLP.encode(raw);
        }
    }


    var result = check(formatTransaction, transaction);

    var networkId = transaction.networkId;

    if (utils.isHexString(networkId)) {
        networkId = utils.bigNumberify(networkId).toNumber();
    }

    if (typeof(networkId) !== 'number' && result.v != null) {
        networkId = (result.v - 35) / 2;
        if (networkId < 0) { networkId = 0; }
        networkId = parseInt(networkId);
    }

    if (typeof(networkId) !== 'number') { networkId = 0; }

    result.networkId = networkId;

    // 0x0000... should actually be null
    if (result.blockHash && result.blockHash.replace(/0/g, '') === 'x') {
        result.blockHash = null;
    }

    return result;
}

var formatTransactionRequest = {
    from: allowNull(utils.getAddress),
    nonce: allowNull(checkNumber),
    gasLimit: allowNull(utils.bigNumberify),
    gasPrice: allowNull(utils.bigNumberify),
    to: allowNull(utils.getAddress),
    value: allowNull(utils.bigNumberify),
    data: allowNull(utils.hexlify),
};

function checkTransactionRequest(transaction) {
    return check(formatTransactionRequest, transaction);
}

var formatTransactionReceiptLog = {
    transactionLogIndex: allowNull(checkNumber),
    transactionIndex: checkNumber,
    blockNumber: checkNumber,
    transactionHash: checkHash,
    address: utils.getAddress,
    topics: arrayOf(checkHash),
    data: utils.hexlify,
    logIndex: checkNumber,
    blockHash: checkHash,
};

function checkTransactionReceiptLog(log) {
    return check(formatTransactionReceiptLog, log);
}

var formatTransactionReceipt = {
    contractAddress: allowNull(utils.getAddress, null),
    transactionIndex: checkNumber,
    root: allowNull(checkHash),
    gasUsed: utils.bigNumberify,
    logsBloom: allowNull(utils.hexlify),
    blockHash: checkHash,
    transactionHash: checkHash,
    logs: arrayOf(checkTransactionReceiptLog),
    blockNumber: checkNumber,
    cumulativeGasUsed: utils.bigNumberify,
    status: allowNull(checkNumber)
};

function checkTransactionReceipt(transactionReceipt) {
    var status = transactionReceipt.status;
    var root = transactionReceipt.root;

    var result = check(formatTransactionReceipt, transactionReceipt);
    result.logs.forEach(function(entry, index) {
        if (entry.transactionLogIndex == null) {
            entry.transactionLogIndex = index;
        }
    });
    if (transactionReceipt.status != null) {
        result.byzantium = true;
    }
    return result;
}

function checkTopics(topics) {
    if (Array.isArray(topics)) {
        topics.forEach(function(topic) {
            checkTopics(topic);
        });

    } else if (topics != null) {
        checkHash(topics);
    }

    return topics;
}

var formatFilter = {
    fromBlock: allowNull(checkBlockTag, undefined),
    toBlock: allowNull(checkBlockTag, undefined),
    address: allowNull(utils.getAddress, undefined),
    topics: allowNull(checkTopics, undefined),
};

function checkFilter(filter) {
    return check(formatFilter, filter);
}

var formatLog = {
    blockNumber: allowNull(checkNumber),
    blockHash: allowNull(checkHash),
    transactionIndex: checkNumber,

    removed: allowNull(checkBoolean),

    address: utils.getAddress,
    data: allowFalsish(utils.hexlify, '0x'),

    topics: arrayOf(checkHash),

    transactionHash: checkHash,
    logIndex: checkNumber,
}

function checkLog(log) {
    return check(formatLog, log);
}

function Provider(network) {
    if (!(this instanceof Provider)) { throw new Error('missing new'); }

    network = Provider.getNetwork(network);

    // Check the ensAddress (if any)
    var ensAddress = null;
    if (network.ensAddress) {
        ensAddress = utils.getAddress(network.ensAddress);
    }

    // Setup our network properties
    utils.defineProperty(this, 'chainId', network.chainId);
    utils.defineProperty(this, 'ensAddress', ensAddress);
    utils.defineProperty(this, 'name', network.name);

    var events = {};
    utils.defineProperty(this, '_events', events);

    // We use this to track recent emitted events; for example, if we emit a "block" of 100
    // and we get a `getBlock(100)` request which would result in null, we should retry
    // until we get a response. This provides devs with a consistent view. Similarly for
    // transaction hashes.
    utils.defineProperty(this, '_emitted', { block: -1 });

    var self = this;

    var lastBlockNumber = null;

    var balances = {};

    function doPoll() {
        self.getBlockNumber().then(function(blockNumber) {

            // If the block hasn't changed, meh.
            if (blockNumber === lastBlockNumber) { return; }

            if (lastBlockNumber === null) { lastBlockNumber = blockNumber - 1; }

            // Notify all listener for each block that has passed
            for (var i = lastBlockNumber + 1; i <= blockNumber; i++) {
                if (self._emitted.block < i) {
                    self._emitted.block = i;

                    // Evict any transaction hashes or block hashes over 12 blocks
                    // old, since they should not return null anyways
                    Object.keys(self._emitted).forEach(function(key) {
                        if (key === 'block') { return; }

                        if (self._emitted[key] > i + 12) {
                            delete self._emitted[key];
                        }
                    });
                }
                self.emit('block', i);
            }

            // Sweep balances and remove addresses we no longer have events for
            var newBalances = {};

            // Find all transaction hashes we are waiting on
            Object.keys(events).forEach(function(eventName) {
                var event = parseEventString(eventName);

                if (event.type === 'transaction') {
                    self.getTransaction(event.hash).then(function(transaction) {
                        if (!transaction || transaction.blockNumber == null) { return null; }
                        self._emitted['t:' + transaction.hash.toLowerCase()] = transaction.blockNumber;
                        self.emit(event.hash, transaction);
                        return null;
                    }).catch(function(error) { });

                } else if (event.type === 'address') {
                    if (balances[event.address]) {
                        newBalances[event.address] = balances[event.address];
                    }
                    self.getBalance(event.address, 'latest').then(function(balance) {
                        var lastBalance = balances[event.address];
                        if (lastBalance && balance.eq(lastBalance)) { return null; }
                        balances[event.address] = balance;
                        self.emit(event.address, balance);
                        return null;
                    }).catch(function(error) { });

                } else if (event.type === 'topic') {
                    self.getLogs({
                        fromBlock: lastBlockNumber + 1,
                        toBlock: blockNumber,
                        topics: event.topic
                    }).then(function(logs) {
                        if (logs.length === 0) { return null; }
                        logs.forEach(function(log) {
                            self._emitted['b:' + log.blockHash.toLowerCase()] = log.blockNumber;
                            self._emitted['t:' + log.transactionHash.toLowerCase()] = log.blockNumber;
                            self.emit(event.topic, log);
                        });
                        return null;
                    }).catch(function(error) { });
                }
            });

            lastBlockNumber = blockNumber;

            balances = newBalances;

            return null;
        }).catch(function() { });

        self.doPoll();
    }

    utils.defineProperty(this, 'resetEventsBlock', function(blockNumber) {
        lastBlockNumber = blockNumber;
        self.doPoll();
    });

    var pollingInterval = 4000;

    var poller = null;
    Object.defineProperty(this, 'polling', {
        get: function() { return (poller != null); },
        set: function(value) {
            setTimeout(function() {
                if (value && !poller) {
                    poller = setInterval(doPoll, pollingInterval);

                } else if (!value && poller) {
                    clearInterval(poller);
                    poller = null;
                }
            }, 0);
        }
    });

    Object.defineProperty(this, 'pollingInterval', {
        get: function() { return pollingInterval; },
        set: function(value) {
            if (typeof(value) !== 'number' || value <= 0 || parseInt(value) != value) {
                throw new Error('invalid polling interval');
            }

            pollingInterval = value;

            if (poller) {
                clearInterval(poller);
                poller = setInterval(doPoll, pollingInterval);
            }
        }
    });

    // @TODO: Add .poller which must be an event emitter with a 'start', 'stop' and 'block' event;
    //        this will be used once we move to the WebSocket or other alternatives to polling
}

function inheritable(parent) {
    return function(child) {
        inherits(child, parent);
        utils.defineProperty(child, 'inherits', inheritable(child));
    }
}

utils.defineProperty(Provider, 'inherits', inheritable(Provider));
/*
function(child) {
    inherits(child, Provider);
    child.inherits = function(grandchild) {
        inherits(grandchild, child)
    }
});
*/

utils.defineProperty(Provider, 'getNetwork', function(network) {

    if (typeof(network) === 'string') {
        network = networks[network];
        if (!network) { throw new Error('unknown network'); }

    } else if (network == null) {
        network = networks['homestead'];
    }

    if (typeof(network.chainId) !== 'number') { throw new Error('invalid chainId'); }

    return network;
});

utils.defineProperty(Provider, 'networks', networks);

utils.defineProperty(Provider, 'fetchJSON', function(url, json, processFunc) {
    var headers = [ ];

    if (typeof(url) === 'object' && url.url != null && url.user != null && url.password != null) {
        if (url.url.substring(0, 6) !== 'https:' && url.forceInsecure !== true) {
            errors.throwError('basic authentication requires a secure https url', errors.INVALID_ARGUMENT, { arg: 'url', url: url.url, user: url.user, password: '[REDACTED]' });
        }

        var authorization = url.user + ':' + url.password;
        headers.push({
            key: 'Authorization',
            value: 'Basic ' + utils.base64.encode(utils.toUtf8Bytes(authorization))
        });

        url = url.url;
    }

    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();

        if (json) {
            request.open('POST', url, true);
            headers.push({ key: 'Content-Type', value: 'application/json' });
        } else {
            request.open('GET', url, true);
        }

        headers.forEach(function(header) {
            request.setRequestHeader(header.key, header.value);
        });

        request.onreadystatechange = function() {
            if (request.readyState !== 4) { return; }

            try {
                var result = JSON.parse(request.responseText);
            } catch (error) {
                var jsonError = new Error('invalid json response');
                jsonError.orginialError = error;
                jsonError.responseText = request.responseText;
                jsonError.url = url;
                reject(jsonError);
                return;
            }

            if (processFunc) {
                try {
                    result = processFunc(result);
                } catch (error) {
                    error.url = url;
                    error.body = json;
                    error.responseText = request.responseText;
                    reject(error);
                    return;
                }
            }

            if (request.status != 200) {
                var error = new Error('invalid response - ' + request.status);
                error.statusCode = request.statusCode;
                reject(error);
                return;
            }

            resolve(result);
        };

        request.onerror = function(error) {
            reject(error);
        }

        try {
            if (json) {
                request.send(json);
            } else {
                request.send();
            }

        } catch (error) {
            var connectionError = new Error('connection error');
            connectionError.error = error;
            reject(connectionError);
        }
    });
});


utils.defineProperty(Provider.prototype, 'waitForTransaction', function(transactionHash, timeout) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var timer = null;

        function complete(transaction) {
            if (timer) { clearTimeout(timer); }
            resolve(transaction);
        }

        self.once(transactionHash, complete);

        if (typeof(timeout) === 'number' && timeout > 0) {
            timer = setTimeout(function() {
                self.removeListener(transactionHash, complete);
                reject(new Error('timeout'));
            }, timeout);
        }

    });
});


utils.defineProperty(Provider.prototype, 'getBlockNumber', function() {
    try {
        return this.perform('getBlockNumber').then(function(result) {
            var value = parseInt(result);
            if (value != result) { throw new Error('invalid response - getBlockNumber'); }
            return value;
        });
    } catch (error) {
        return Promise.reject(error);
    }
});

utils.defineProperty(Provider.prototype, 'getGasPrice', function() {
    try {
        return this.perform('getGasPrice').then(function(result) {
            return utils.bigNumberify(result);
        });
    } catch (error) {
        return Promise.reject(error);
    }
});


utils.defineProperty(Provider.prototype, 'getBalance', function(addressOrName, blockTag) {
    var self = this;
    return this.resolveName(addressOrName).then(function(address) {
        var params = { address: address, blockTag: checkBlockTag(blockTag) };
        return self.perform('getBalance', params).then(function(result) {
            return utils.bigNumberify(result);
        });
    });
});

utils.defineProperty(Provider.prototype, 'getTransactionCount', function(addressOrName, blockTag) {
    var self = this;
    return this.resolveName(addressOrName).then(function(address) {
        var params = { address: address, blockTag: checkBlockTag(blockTag) };
        return self.perform('getTransactionCount', params).then(function(result) {
            var value = parseInt(result);
            if (value != result) { throw new Error('invalid response - getTransactionCount'); }
            return value;
        });
    });
});

utils.defineProperty(Provider.prototype, 'getCode', function(addressOrName, blockTag) {
    var self = this;
    return this.resolveName(addressOrName).then(function(address) {
        var params = {address: address, blockTag: checkBlockTag(blockTag)};
        return self.perform('getCode', params).then(function(result) {
            return utils.hexlify(result);
        });
    });
});

utils.defineProperty(Provider.prototype, 'getStorageAt', function(addressOrName, position, blockTag) {
    var self = this;
    return this.resolveName(addressOrName).then(function(address) {
        var params = {
            address: address,
            blockTag: checkBlockTag(blockTag),
            position: utils.hexStripZeros(utils.hexlify(position)),
        };
        return self.perform('getStorageAt', params).then(function(result) {
            return utils.hexlify(result);
        });
    });
});

utils.defineProperty(Provider.prototype, 'sendTransaction', function(signedTransaction) {
    try {
        var params = {signedTransaction: utils.hexlify(signedTransaction)};
        return this.perform('sendTransaction', params).then(function(result) {
            result = utils.hexlify(result);
            if (result.length !== 66) { throw new Error('invalid response - sendTransaction'); }
            return result;
        });
    } catch (error) {
        return Promise.reject(error);
    }
});


utils.defineProperty(Provider.prototype, 'call', function(transaction) {
    var self = this;
    return this._resolveNames(transaction, [ 'to', 'from' ]).then(function(transaction) {
        var params = { transaction: checkTransactionRequest(transaction) };
        return self.perform('call', params).then(function(result) {
            return utils.hexlify(result);
        });
    });
});

utils.defineProperty(Provider.prototype, 'estimateGas', function(transaction) {
    var self = this;
    return this._resolveNames(transaction, [ 'to', 'from' ]).then(function(transaction) {
        var params = {transaction: checkTransactionRequest(transaction)};
        return self.perform('estimateGas', params).then(function(result) {
             return utils.bigNumberify(result);
        });
    });
});

function stallPromise(allowNullFunc, executeFunc) {
    return new Promise(function(resolve, reject) {
        var attempt = 0;
        function check() {
            executeFunc().then(function(result) {
                // If we have a result, or are allowed null then we're done
                if (result || allowNullFunc()) {
                    resolve(result);

                // Otherwise, exponential back-off (up to 10s) our next request
                } else {
                    attempt++;
                    var timeout = 500 + 250 * parseInt(Math.random() * (1 << attempt));
                    if (timeout > 10000) { timeout = 10000; }
                    setTimeout(check, timeout);
                }
                return null;
            }, function(error) {
                reject(error);
            }).catch(function(error) { reject(error); });
        }
        check();
    });
}

utils.defineProperty(Provider.prototype, 'getBlock', function(blockHashOrBlockTag) {
    var self = this;
    try {
        var blockHash = utils.hexlify(blockHashOrBlockTag);
        if (blockHash.length === 66) {
            return stallPromise(function() {
                return (self._emitted['b:' + blockHash.toLowerCase()] == null);
            }, function() {
                return self.perform('getBlock', {blockHash: blockHash}).then(function(block) {
                    if (block == null) { return null; }
                    return checkBlock(block);
                });
            });
        }
    } catch (error) { }

    try {
        var blockTag = checkBlockTag(blockHashOrBlockTag);
        return stallPromise(function() {
            if (utils.isHexString(blockTag)) {
                var blockNumber = parseInt(blockTag.substring(2), 16);
                return blockNumber > self._emitted.block;
            }
            return true;
        }, function() {
            return self.perform('getBlock', { blockTag: blockTag }).then(function(block) {
                if (block == null) { return null; }
                return checkBlock(block);
            });
        });
    } catch (error) { }

    return Promise.reject(new Error('invalid block hash or block tag'));
});

utils.defineProperty(Provider.prototype, 'getTransaction', function(transactionHash) {
    var self = this;
    try {
        var params = { transactionHash: checkHash(transactionHash) };
        return stallPromise(function() {
            return (self._emitted['t:' + transactionHash.toLowerCase()] == null);
        }, function() {
            return self.perform('getTransaction', params).then(function(result) {
                if (result != null) { result = checkTransaction(result); }
                return result;
            });
        });
    } catch (error) {
        return Promise.reject(error);
    }
});

utils.defineProperty(Provider.prototype, 'getTransactionReceipt', function(transactionHash) {
    var self = this;

    try {
        var params = { transactionHash: checkHash(transactionHash) };
        return stallPromise(function() {
            return (self._emitted['t:' + transactionHash.toLowerCase()] == null);
        }, function() {
            return self.perform('getTransactionReceipt', params).then(function(result) {
                if (result != null) { result = checkTransactionReceipt(result); }
                return result;
            });
        });
    } catch (error) {
        return Promise.reject(error);
    }
});

utils.defineProperty(Provider.prototype, 'getLogs', function(filter) {
    var self = this;
    return this._resolveNames(filter, ['address']).then(function(filter) {
        var params = { filter: checkFilter(filter) };
        return self.perform('getLogs', params).then(function(result) {
            return arrayOf(checkLog)(result);
        });
    });
});

utils.defineProperty(Provider.prototype, 'getEtherPrice', function() {
    try {
        return this.perform('getEtherPrice', {}).then(function(result) {
            // @TODO: Check valid float
            return result;
        });
    } catch (error) {
        return Promise.reject(error);
    }
});


utils.defineProperty(Provider.prototype, '_resolveNames', function(object, keys) {
    var promises = [];

    var result = copyObject(object);

    keys.forEach(function(key) {
        if (result[key] === undefined) { return; }
        promises.push(this.resolveName(result[key]).then(function(address) {
            result[key] = address;
            return null;
        }));
    }, this);

    return Promise.all(promises).then(function() { return result; });
});

utils.defineProperty(Provider.prototype, '_getResolver', function(name) {
    var nodeHash = utils.namehash(name);

    // keccak256('resolver(bytes32)')
    var data = '0x0178b8bf' + nodeHash.substring(2);
    var transaction = { to: this.ensAddress, data: data };

    // Get the resolver from the blockchain
    return this.call(transaction).then(function(data) {

        // extract the address from the data
        if (data.length != 66) { return null; }
        return utils.getAddress('0x' + data.substring(26));
    });
});

utils.defineProperty(Provider.prototype, 'resolveName', function(name) {
    // If it is already an address, nothing to resolve
    try {
        return Promise.resolve(utils.getAddress(name));
    } catch (error) { }

    if (!this.ensAddress) { throw new Error('network does not have ENS deployed'); }

    var self = this;

    var nodeHash = utils.namehash(name);

    // Get the addr from the resovler
    return this._getResolver(name).then(function(resolverAddress) {

        // keccak256('addr(bytes32)')
        var data = '0x3b3b57de' + nodeHash.substring(2);
        var transaction = { to: resolverAddress, data: data };
        return self.call(transaction);

    // extract the address from the data
    }).then(function(data) {
        if (data.length != 66) { return null; }
        var address = utils.getAddress('0x' + data.substring(26));
        if (address === '0x0000000000000000000000000000000000000000') { return null; }
        return address;
    });
});

utils.defineProperty(Provider.prototype, 'lookupAddress', function(address) {
    if (!this.ensAddress) { throw new Error('network does not have ENS deployed'); }

    address = utils.getAddress(address);

    var name = address.substring(2) + '.addr.reverse'
    var nodehash = utils.namehash(name);

    var self = this;

    return this._getResolver(name).then(function(resolverAddress) {
        if (!resolverAddress) { return null; }

        // keccak('name(bytes32)')
        var data = '0x691f3431' + nodehash.substring(2);
        var transaction = { to: resolverAddress, data: data };
        return self.call(transaction);

    }).then(function(data) {
        // Strip off the "0x"
        data = data.substring(2);

        // Strip off the dynamic string pointer (0x20)
        if (data.length < 64) { return null; }
        data = data.substring(64);

        if (data.length < 64) { return null; }
        var length = utils.bigNumberify('0x' + data.substring(0, 64)).toNumber();
        data = data.substring(64);

        if (2 * length > data.length) { return null; }

        var name = utils.toUtf8String('0x' + data.substring(0, 2 * length));

        // Make sure the reverse record matches the foward record
        return self.resolveName(name).then(function(addr) {
            if (addr != address) { return null; }
            return name;
        });

    });
});

utils.defineProperty(Provider.prototype, 'doPoll', function() {
});

utils.defineProperty(Provider.prototype, 'perform', function(method, params) {
    return Promise.reject(new Error('not implemented - ' + method));
});

function recurse(object, convertFunc) {
    if (Array.isArray(object)) {
        var result = [];
        object.forEach(function(object) {
            result.push(recurse(object, convertFunc));
        });
        return result;
    }
    return convertFunc(object);
}

function getEventString(object) {
    try {
        return 'address:' + utils.getAddress(object);
    } catch (error) { }

    if (object === 'block') {
        return 'block';

    } else if (object === 'pending') {
        return 'pending';

    } else if (utils.isHexString(object)) {
        if (object.length === 66) {
            return 'tx:' + object;
        }
    } else if (Array.isArray(object)) {
        object = recurse(object, function(object) {
            if (object == null) { object = '0x'; }
            return object;
        });

        try {
            return 'topic:' + utils.RLP.encode(object);
        } catch (error) {
            console.log(error);
        }
    }

    throw new Error('invalid event - ' + object);
}

function parseEventString(string) {
    if (string.substring(0, 3) === 'tx:') {
        return {type: 'transaction', hash: string.substring(3)};

    } else if (string === 'block') {
        return {type: 'block'};

    } else if (string === 'pending') {
        return {type: 'pending'};

    } else if (string.substring(0, 8) === 'address:') {
        return {type: 'address', address: string.substring(8)};

    } else if (string.substring(0, 6) === 'topic:') {
        try {
            var object = utils.RLP.decode(string.substring(6));
            object = recurse(object, function(object) {
                if (object === '0x') { object = null; }
                return object;
            });
            return {type: 'topic', topic: object};
        } catch (error) {
            console.log(error);
        }
    }

    throw new Error('invalid event string');
}

utils.defineProperty(Provider.prototype, '_startPending', function() {
    console.log('WARNING: this provider does not support pending events');
});

utils.defineProperty(Provider.prototype, '_stopPending', function() {
});

utils.defineProperty(Provider.prototype, 'on', function(eventName, listener) {
    var key = getEventString(eventName);
    if (!this._events[key]) { this._events[key] = []; }
    this._events[key].push({eventName: eventName, listener: listener, type: 'on'});
    if (key === 'pending') { this._startPending(); }
    this.polling = true;
});

utils.defineProperty(Provider.prototype, 'once', function(eventName, listener) {
    var key = getEventString(eventName);
    if (!this._events[key]) { this._events[key] = []; }
    this._events[key].push({eventName: eventName, listener: listener, type: 'once'});
    if (key === 'pending') { this._startPending(); }
    this.polling = true;
});

utils.defineProperty(Provider.prototype, 'emit', function(eventName) {
    var key = getEventString(eventName);

    var args = Array.prototype.slice.call(arguments, 1);
    var listeners = this._events[key];
    if (!listeners) { return; }

    for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        if (listener.type === 'once') {
            listeners.splice(i, 1);
            i--;
        }

        try {
            listener.listener.apply(this, args);
        } catch (error) {
            console.log('Event Listener Error: ' + error.message);
        }
    }

    if (listeners.length === 0) {
        delete this._events[key];
        if (key === 'pending') { this._stopPending(); }
    }

    if (this.listenerCount() === 0) { this.polling = false; }
});

utils.defineProperty(Provider.prototype, 'listenerCount', function(eventName) {
    if (!eventName) {
        var result = 0;
        for (var key in this._events) {
            result += this._events[key].length;
        }
        return result;
    }

    var listeners = this._events[getEventString(eventName)];
    if (!listeners) { return 0; }
    return listeners.length;
});

utils.defineProperty(Provider.prototype, 'listeners', function(eventName) {
    var listeners = this._events[getEventString(eventName)];
    if (!listeners) { return 0; }
    var result = [];
    for (var i = 0; i < listeners.length; i++) {
        result.push(listeners[i].listener);
    }
    return result;
});

utils.defineProperty(Provider.prototype, 'removeAllListeners', function(eventName) {
    delete this._events[getEventString(eventName)];
    if (this.listenerCount() === 0) { this.polling = false; }
});

utils.defineProperty(Provider.prototype, 'removeListener', function(eventName, listener) {
    var eventNameString = getEventString(eventName);
    var listeners = this._events[eventNameString];
    if (!listeners) { return 0; }
    for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].listener === listener) {
            listeners.splice(i, 1);
            break;
        }
    }

    if (listeners.length === 0) {
        this.removeAllListeners(eventName);
    }
});

utils.defineProperty(Provider, '_formatters', {
    checkTransactionResponse: checkTransaction
});

module.exports = Provider;


/***/ }),

/***/ "../node_modules/ethers/providers/web3-provider.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Provider = __webpack_require__("../node_modules/ethers/providers/provider.js");
var JsonRpcProvider = __webpack_require__("../node_modules/ethers/providers/json-rpc-provider.js");

var utils = (function() {
    return {
        defineProperty: __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty,
    }
})();

var errors = __webpack_require__("../node_modules/ethers/utils/errors.js");

/*
@TODO
utils.defineProperty(Web3Signer, 'onchange', {

});
*/

function Web3Provider(web3Provider, network) {
    errors.checkNew(this, Web3Provider);

    // HTTP has a host; IPC has a path.
    var url = web3Provider.host || web3Provider.path || 'unknown';

    if (network == null) { network = 'homestead'; }

    JsonRpcProvider.call(this, url, network);
    utils.defineProperty(this, '_web3Provider', web3Provider);
}
JsonRpcProvider.inherits(Web3Provider);

utils.defineProperty(Web3Provider.prototype, 'send', function(method, params) {

    // Metamask complains about eth_sign (and on some versions hangs)
    if (method == 'eth_sign' && this._web3Provider.isMetaMask) {
        // https://github.com/ethereum/go-ethereum/wiki/Management-APIs#personal_sign
        method = 'personal_sign';
        params = [ params[1], params[0] ];
    }

    var provider = this._web3Provider;
    return new Promise(function(resolve, reject) {
        var request = {
            method: method,
            params: params,
            id: 42,
            jsonrpc: "2.0"
        };
        provider.sendAsync(request, function(error, result) {
            if (error) {
                reject(error);
                return;
            }
            if (result.error) {
                var error = new Error(result.error.message);
                error.code = result.error.code;
                error.data = result.error.data;
                reject(error);
                return;
            }
            resolve(result.result);
        });
    });
});

module.exports = Web3Provider;


/***/ }),

/***/ "../node_modules/ethers/utils/abi-coder.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI

var utils = (function() {
    var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
    var utf8 = __webpack_require__("../node_modules/ethers/utils/utf8.js");

    return {
        defineProperty: __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty,

        arrayify: convert.arrayify,
        padZeros: convert.padZeros,

        bigNumberify: __webpack_require__("../node_modules/ethers/utils/bignumber.js").bigNumberify,

        getAddress: __webpack_require__("../node_modules/ethers/utils/address.js").getAddress,

        concat: convert.concat,

        toUtf8Bytes: utf8.toUtf8Bytes,
        toUtf8String: utf8.toUtf8String,

        hexlify: convert.hexlify,
    };
})();

var errors = __webpack_require__("../node_modules/ethers/utils/errors.js");

var paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
var paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
var paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);

var defaultCoerceFunc = function(type, value) {
    var match = type.match(paramTypeNumber)
    if (match && parseInt(match[2]) <= 48) { return value.toNumber(); }
    return value;
}

// Shallow copy object (will move to utils/properties in v4)
function shallowCopy(object) {
    var result = {};
    for (var key in object) { result[key] = object[key]; }
    return result;
}

///////////////////////////////////
// Parsing for Solidity Signatures

var regexParen = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
var regexIdentifier = new RegExp("^[A-Za-z_][A-Za-z0-9_]*$");

var close = { "(": ")", "[": "]" };

function verifyType(type) {

    // These need to be transformed to their full description
    if (type.match(/^uint($|[^1-9])/)) {
        type = 'uint256' + type.substring(4);
    } else if (type.match(/^int($|[^1-9])/)) {
        type = 'int256' + type.substring(3);
    }

    return type;
}

function parseParam(param, allowIndexed) {
    function throwError(i) {
        throw new Error('unexpected character "' + param[i] + '" at position ' + i + ' in "' + param + '"');
    }

    var parent = { type: '', name: '', state: { allowType: true } };
    var node = parent;

    for (var i = 0; i < param.length; i++) {
        var c = param[i];
        switch (c) {
            case '(':
                if (!node.state.allowParams) { throwError(i); }
                delete node.state.allowType;
                node.type = verifyType(node.type);
                node.components = [ { type: '', name: '', parent: node, state: { allowType: true } } ];
                node = node.components[0];
                break;

            case ')':
                delete node.state;
                node.type = verifyType(node.type);

                var child = node;
                node = node.parent;
                if (!node) { throwError(i); }
                delete child.parent;
                delete node.state.allowParams;
                node.state.allowName = true;
                node.state.allowArray = true;
                break;

            case ',':
                delete node.state;
                node.type = verifyType(node.type);

                var sibling = { type: '', name: '', parent: node.parent, state: { allowType: true } };
                node.parent.components.push(sibling);
                delete node.parent;
                node = sibling;
                break;

            // Hit a space...
            case ' ':

                // If reading type, the type is done and may read a param or name
                if (node.state.allowType) {
                    if (node.type !== '') {
                        node.type = verifyType(node.type);
                        delete node.state.allowType;
                        node.state.allowName = true;
                        node.state.allowParams = true;
                    }
                }

                // If reading name, the name is done
                if (node.state.allowName) {
                    if (node.name !== '') {
                        if (allowIndexed && node.name === 'indexed') {
                            node.indexed = true;
                            node.name = '';
                        } else {
                            delete node.state.allowName;
                        }
                    }
                }

                break;

            case '[':
                if (!node.state.allowArray) { throwError(i); }

                //if (!node.array) { node.array = ''; }
                //node.array += c;
                node.type += c;

                delete node.state.allowArray;
                delete node.state.allowName;
                node.state.readArray = true;
                break;

            case ']':
                if (!node.state.readArray) { throwError(i); }

                //node.array += c;
                node.type += c;

                delete node.state.readArray;
                node.state.allowArray = true;
                node.state.allowName = true;
                break;

            default:
                if (node.state.allowType) {
                    node.type += c;
                    node.state.allowParams = true;
                    node.state.allowArray = true;
                } else if (node.state.allowName) {
                    node.name += c;
                    delete node.state.allowArray;
                } else if (node.state.readArray) {
                    //node.array += c;
                    node.type += c;
                } else {
                    throwError(i);
                }
        }
    }

    if (node.parent) { throw new Error("unexpected eof"); }

    delete parent.state;
    parent.type = verifyType(parent.type);

    //verifyType(parent);

    return parent;
}

function parseSignatureEvent(fragment) {

    var abi = {
        anonymous: false,
        inputs: [],
        type: 'event'
    }

    var match = fragment.match(regexParen);
    if (!match) { throw new Error('invalid event: ' + fragment); }

    abi.name = match[1].trim();

    splitNesting(match[2]).forEach(function(param) {
        param = parseParam(param, true);
        param.indexed = !!param.indexed;
        abi.inputs.push(param);
    });

    match[3].split(' ').forEach(function(modifier) {
        switch(modifier) {
            case 'anonymous':
                abi.anonymous = true;
                break;
            case '':
                break;
            default:
                console.log('unknown modifier: ' + mdifier);
        }
    });

    if (abi.name && !abi.name.match(regexIdentifier)) {
        throw new Error('invalid identifier: "' + result.name + '"');
    }

    return abi;
}

function parseSignatureFunction(fragment) {
    var abi = {
        constant: false,
        inputs: [],
        outputs: [],
        payable: false,
        type: 'function'
    };

    var comps = fragment.split(' returns ');
    var left = comps[0].match(regexParen);
    if (!left) { throw new Error('invalid signature'); }

    abi.name = left[1].trim();
    if (!abi.name.match(regexIdentifier)) {
        throw new Error('invalid identifier: "' + left[1] + '"');
    }

    splitNesting(left[2]).forEach(function(param) {
        abi.inputs.push(parseParam(param));
    });

    left[3].split(' ').forEach(function(modifier) {
        switch (modifier) {
            case 'constant':
                abi.constant = true;
                break;
            case 'payable':
                abi.payable = true;
                break;
            case 'pure':
                abi.constant = true;
                abi.stateMutability = 'pure';
                break;
            case 'view':
                abi.constant = true;
                abi.stateMutability = 'view';
                break;
            case '':
                break;
            default:
                console.log('unknown modifier: ' + modifier);
        }
    });

    // We have outputs
    if (comps.length > 1) {
        var right = comps[1].match(regexParen);
        if (right[1].trim() != '' || right[3].trim() != '') {
            throw new Error('unexpected tokens');
        }

        splitNesting(right[2]).forEach(function(param) {
            abi.outputs.push(parseParam(param));
        });
    }

    return abi;
}


function parseSignature(fragment) {
    if(typeof(fragment) === 'string') {
        // Make sure the "returns" is surrounded by a space and all whitespace is exactly one space
        fragment = fragment.replace(/\(/g, ' (').replace(/\)/g, ') ').replace(/\s+/g, ' ');
        fragment = fragment.trim();

        if (fragment.substring(0, 6) === 'event ') {
           return parseSignatureEvent(fragment.substring(6).trim());

        } else {
            if (fragment.substring(0, 9) === 'function ') {
                fragment = fragment.substring(9);
            }
            return parseSignatureFunction(fragment.trim());
        }
    }

    throw new Error('unknown fragment');
}


///////////////////////////////////
// Coders

var coderNull = function(coerceFunc) {
    return {
        name: 'null',
        type: '',
        encode: function(value) {
            return utils.arrayify([]);
        },
        decode: function(data, offset) {
            if (offset > data.length) { throw new Error('invalid null'); }
            return {
                consumed: 0,
                value: coerceFunc('null', undefined)
            }
        },
        dynamic: false
    };
}

var coderNumber = function(coerceFunc, size, signed, localName) {
    var name = ((signed ? 'int': 'uint') + (size * 8));
    return {
        localName: localName,
        name: name,
        type: name,
        encode: function(value) {
            try {
                value = utils.bigNumberify(value)
            } catch (error) {
                errors.throwError('invalid number value', errors.INVALID_ARGUMENT, {
                    arg: localName,
                    type: typeof(value),
                    value: value
                });
            }
            value = value.toTwos(size * 8).maskn(size * 8);

            if (signed) {
                value = value.fromTwos(size * 8).toTwos(256);
            }

            return utils.padZeros(utils.arrayify(value), 32);
        },
        decode: function(data, offset) {
            if (data.length < offset + 32) {
                errors.throwError('insufficient data for ' + name + ' type', errors.INVALID_ARGUMENT, {
                    arg: localName,
                    coderType: name,
                    value: utils.hexlify(data.slice(offset, offset + 32))
                });
            }
            var junkLength = 32 - size;
            var value = utils.bigNumberify(data.slice(offset + junkLength, offset + 32));
            if (signed) {
                value = value.fromTwos(size * 8);
            } else {
                value = value.maskn(size * 8);
            }

            //if (size <= 6) { value = value.toNumber(); }

            return {
                consumed: 32,
                value: coerceFunc(name, value),
            }
        }
    };
}
var uint256Coder = coderNumber(function(type, value) { return value; }, 32, false);

var coderBoolean = function(coerceFunc, localName) {
    return {
        localName: localName,
        name: 'bool',
        type: 'bool',
        encode: function(value) {
           return uint256Coder.encode(!!value ? 1: 0);
        },
        decode: function(data, offset) {
            try {
                var result = uint256Coder.decode(data, offset);
            } catch (error) {
                if (error.reason === 'insufficient data for uint256 type') {
                    errors.throwError('insufficient data for boolean type', errors.INVALID_ARGUMENT, {
                        arg: localName,
                        coderType: 'boolean',
                        value: error.value
                    });
                }
                throw error;
            }
            return {
                consumed: result.consumed,
                value: coerceFunc('boolean', !result.value.isZero())
            }
        }
    }
}

var coderFixedBytes = function(coerceFunc, length, localName) {
    var name = ('bytes' + length);
    return {
        localName: localName,
        name: name,
        type: name,
        encode: function(value) {
            try {
                value = utils.arrayify(value);

                // @TODO: In next major change, the value.length MUST equal the
                // length, but that is a backward-incompatible change, so here
                // we just check for things that can cause problems.
                if (value.length > 32) {
                    throw new Error('too many bytes for field');
                }

            } catch (error) {
                errors.throwError('invalid ' + name + ' value', errors.INVALID_ARGUMENT, {
                    arg: localName,
                    type: typeof(value),
                    value: error.value
                });
            }

            if (value.length === 32) { return value; }

            var result = new Uint8Array(32);
            result.set(value);
            return result;
        },
        decode: function(data, offset) {
            if (data.length < offset + 32) {
                errors.throwError('insufficient data for ' + name + ' type', errors.INVALID_ARGUMENT, {
                    arg: localName,
                    coderType: name,
                    value: utils.hexlify(data.slice(offset, offset + 32))
                });
            }

            return {
                consumed: 32,
                value: coerceFunc(name, utils.hexlify(data.slice(offset, offset + length)))
            }
        }
    };
}

var coderAddress = function(coerceFunc, localName) {
    return {
        localName: localName,
        name: 'address',
        type: 'address',
        encode: function(value) {
            try {
                value = utils.arrayify(utils.getAddress(value));
            } catch (error) {
                errors.throwError('invalid address', errors.INVALID_ARGUMENT, {
                    arg: localName,
                    type: typeof(value),
                    value: value
                });
            }
            var result = new Uint8Array(32);
            result.set(value, 12);
            return result;
        },
        decode: function(data, offset) {
            if (data.length < offset + 32) {
                errors.throwError('insufficuent data for address type', errors.INVALID_ARGUMENT, {
                    arg: localName,
                    coderType: 'address',
                    value: utils.hexlify(data.slice(offset, offset + 32))
                });
            }
            return {
                consumed: 32,
                value: coerceFunc('address', utils.getAddress(utils.hexlify(data.slice(offset + 12, offset + 32))))
           }
        }
    }
}

function _encodeDynamicBytes(value) {
    var dataLength = parseInt(32 * Math.ceil(value.length / 32));
    var padding = new Uint8Array(dataLength - value.length);

    return utils.concat([
        uint256Coder.encode(value.length),
        value,
        padding
    ]);
}

function _decodeDynamicBytes(data, offset, localName) {
    if (data.length < offset + 32) {
        errors.throwError('insufficient data for dynamicBytes length', errors.INVALID_ARGUMENT, {
            arg: localName,
            coderType: 'dynamicBytes',
            value: utils.hexlify(data.slice(offset, offset + 32))
        });
    }

    var length = uint256Coder.decode(data, offset).value;
    try {
        length = length.toNumber();
    } catch (error) {
        errors.throwError('dynamic bytes count too large', errors.INVALID_ARGUMENT, {
            arg: localName,
            coderType: 'dynamicBytes',
            value: length.toString()
        });
    }

    if (data.length < offset + 32 + length) {
        errors.throwError('insufficient data for dynamicBytes type', errors.INVALID_ARGUMENT, {
            arg: localName,
            coderType: 'dynamicBytes',
            value: utils.hexlify(data.slice(offset, offset + 32 + length))
        });
    }

    return {
        consumed: parseInt(32 + 32 * Math.ceil(length / 32)),
        value: data.slice(offset + 32, offset + 32 + length),
    }
}

var coderDynamicBytes = function(coerceFunc, localName) {
    return {
        localName: localName,
        name: 'bytes',
        type: 'bytes',
        encode: function(value) {
            try {
                value = utils.arrayify(value);
            } catch (error) {
                errors.throwError('invalid bytes value', errors.INVALID_ARGUMENT, {
                    arg: localName,
                    type: typeof(value),
                    value: error.value
                });
            }
            return _encodeDynamicBytes(value);
        },
        decode: function(data, offset) {
            var result = _decodeDynamicBytes(data, offset, localName);
            result.value = coerceFunc('bytes', utils.hexlify(result.value));
            return result;
        },
        dynamic: true
    };
}

var coderString = function(coerceFunc, localName) {
    return {
        localName: localName,
        name: 'string',
        type: 'string',
        encode: function(value) {
            if (typeof(value) !== 'string') {
                errors.throwError('invalid string value', errors.INVALID_ARGUMENT, {
                    arg: localName,
                    type: typeof(value),
                    value: value
                });
            }
            return _encodeDynamicBytes(utils.toUtf8Bytes(value));
        },
        decode: function(data, offset) {
            var result = _decodeDynamicBytes(data, offset, localName);
            result.value = coerceFunc('string', utils.toUtf8String(result.value));
            return result;
        },
        dynamic: true
    };
}

function alignSize(size) {
    return parseInt(32 * Math.ceil(size / 32));
}

function pack(coders, values) {

    if (Array.isArray(values)) {
       // do nothing

    } else if (values && typeof(values) === 'object') {
        var arrayValues = [];
        coders.forEach(function(coder) {
            arrayValues.push(values[coder.localName]);
        });
        values = arrayValues;

    } else {
        errors.throwError('invalid tuple value', errors.INVALID_ARGUMENT, {
            coderType: 'tuple',
            type: typeof(values),
            value: values
        });
    }

    if (coders.length !== values.length) {
        errors.throwError('types/value length mismatch', errors.INVALID_ARGUMENT, {
            coderType: 'tuple',
            value: values
        });
    }

    var parts = [];

    coders.forEach(function(coder, index) {
        parts.push({ dynamic: coder.dynamic, value: coder.encode(values[index]) });
    });

    var staticSize = 0, dynamicSize = 0;
    parts.forEach(function(part, index) {
        if (part.dynamic) {
            staticSize += 32;
            dynamicSize += alignSize(part.value.length);
        } else {
            staticSize += alignSize(part.value.length);
        }
    });

    var offset = 0, dynamicOffset = staticSize;
    var data = new Uint8Array(staticSize + dynamicSize);

    parts.forEach(function(part, index) {
        if (part.dynamic) {
            //uint256Coder.encode(dynamicOffset).copy(data, offset);
            data.set(uint256Coder.encode(dynamicOffset), offset);
            offset += 32;

            //part.value.copy(data, dynamicOffset);  @TODO
            data.set(part.value, dynamicOffset);
            dynamicOffset += alignSize(part.value.length);
        } else {
            //part.value.copy(data, offset);  @TODO
            data.set(part.value, offset);
            offset += alignSize(part.value.length);
        }
    });

    return data;
}

function unpack(coders, data, offset) {
    var baseOffset = offset;
    var consumed = 0;
    var value = [];
    coders.forEach(function(coder) {
        if (coder.dynamic) {
            var dynamicOffset = uint256Coder.decode(data, offset);
            var result = coder.decode(data, baseOffset + dynamicOffset.value.toNumber());
            // The dynamic part is leap-frogged somewhere else; doesn't count towards size
            result.consumed = dynamicOffset.consumed;
        } else {
            var result = coder.decode(data, offset);
        }

        if (result.value != undefined) {
            value.push(result.value);
        }

        offset += result.consumed;
        consumed += result.consumed;
    });

    coders.forEach(function(coder, index) {
        var name = coder.localName;
        if (!name) { return; }

        if (typeof(name) === 'object') { name = name.name; }
        if (!name) { return; }

        if (name === 'length') { name = '_length'; }

        if (value[name] != null) { return; }

        value[name] = value[index];
    });

    return {
        value: value,
        consumed: consumed
    }

    return result;
}

function coderArray(coerceFunc, coder, length, localName) {
    var type = (coder.type + '[' + (length >= 0 ? length: '') + ']');

    return {
        coder: coder,
        localName: localName,
        length: length,
        name: 'array',
        type: type,
        encode: function(value) {
            if (!Array.isArray(value)) {
                errors.throwError('expected array value', errors.INVALID_ARGUMENT, {
                    arg: localName,
                    coderType: 'array',
                    type: typeof(value),
                    value: value
                });
            }

            var count = length;

            var result = new Uint8Array(0);
            if (count === -1) {
                count = value.length;
                result = uint256Coder.encode(count);
            }

            if (count !== value.length) {
                error.throwError('array value length mismatch', errors.INVALID_ARGUMENT, {
                    arg: localName,
                    coderType: 'array',
                    count: value.length,
                    expectedCount: count,
                    value: value
                });
            }

            var coders = [];
            value.forEach(function(value) { coders.push(coder); });

            return utils.concat([result, pack(coders, value)]);
        },
        decode: function(data, offset) {
            // @TODO:
            //if (data.length < offset + length * 32) { throw new Error('invalid array'); }

            var consumed = 0;

            var count = length;

            if (count === -1) {
                 try {
                      var decodedLength = uint256Coder.decode(data, offset);
                 } catch (error) {
                     errors.throwError('insufficient data for dynamic array length', errors.INVALID_ARGUMENT, {
                         arg: localName,
                         coderType: 'array',
                         value: error.value
                     });
                 }
                 try {
                     count = decodedLength.value.toNumber();
                 } catch (error) {
                     errors.throwError('array count too large', errors.INVALID_ARGUMENT, {
                         arg: localName,
                         coderType: 'array',
                         value: decodedLength.value.toString()
                     });
                 }
                 consumed += decodedLength.consumed;
                 offset += decodedLength.consumed;
            }

            // We don't want the children to have a localName
            var subCoder = {
                name: coder.name,
                type: coder.type,
                encode: coder.encode,
                decode: coder.decode,
                dynamic: coder.dynamic
            };

            var coders = [];
            for (var i = 0; i < count; i++) { coders.push(subCoder); }

            var result = unpack(coders, data, offset);
            result.consumed += consumed;
            result.value = coerceFunc(type, result.value);
            return result;
        },
        dynamic: (length === -1 || coder.dynamic)
    }
}


function coderTuple(coerceFunc, coders, localName) {

    var dynamic = false;
    var types = [];
    coders.forEach(function(coder) {
        if (coder.dynamic) { dynamic = true; }
        types.push(coder.type);
    });

    var type = ('tuple(' + types.join(',') + ')');

    return {
        coders: coders,
        localName: localName,
        name: 'tuple',
        type: type,
        encode: function(value) {
            return pack(coders, value);
        },
        decode: function(data, offset) {
            var result = unpack(coders, data, offset);
            result.value = coerceFunc(type, result.value);
            return result;
        },
        dynamic: dynamic
    };
}
/*
function getTypes(coders) {
    var type = coderTuple(coders).type;
    return type.substring(6, type.length - 1);
}
*/
function splitNesting(value) {
    var result = [];
    var accum = '';
    var depth = 0;
    for (var offset = 0; offset < value.length; offset++) {
        var c = value[offset];
        if (c === ',' && depth === 0) {
            result.push(accum);
            accum = '';
        } else {
            accum += c;
            if (c === '(') {
                depth++;
            } else if (c === ')') {
                depth--;
                if (depth === -1) {
                    throw new Error('unbalanced parenthsis');
                }
            }
        }
    }
    result.push(accum);

    return result;
}

var paramTypeSimple = {
    address: coderAddress,
    bool: coderBoolean,
    string: coderString,
    bytes: coderDynamicBytes,
};

function getTupleParamCoder(coerceFunc, components, localName) {
    if (!components) { components = []; }
    var coders = [];
    components.forEach(function(component) {
        coders.push(getParamCoder(coerceFunc, component));
    });

    return coderTuple(coerceFunc, coders, localName);
}

function getParamCoder(coerceFunc, param) {
    var coder = paramTypeSimple[param.type];
    if (coder) { return coder(coerceFunc, param.name); }

    var match = param.type.match(paramTypeNumber);
    if (match) {
        var size = parseInt(match[2] || 256);
        if (size === 0 || size > 256 || (size % 8) !== 0) {
            errors.throwError('invalid ' + match[1] + ' bit length', errors.INVALID_ARGUMENT, {
                arg: 'param',
                value: param
            });
        }
        return coderNumber(coerceFunc, size / 8, (match[1] === 'int'), param.name);
    }

    var match = param.type.match(paramTypeBytes);
    if (match) {
        var size = parseInt(match[1]);
        if (size === 0 || size > 32) {
            errors.throwError('invalid bytes length', errors.INVALID_ARGUMENT, {
                arg: 'param',
                value: param
            });
        }
        return coderFixedBytes(coerceFunc, size, param.name);
    }

    var match = param.type.match(paramTypeArray);
    if (match) {
        param = shallowCopy(param);
        var size = parseInt(match[2] || -1);
        param.type = match[1];
        return coderArray(coerceFunc, getParamCoder(coerceFunc, param), size, param.name);
    }

    if (param.type.substring(0, 5) === 'tuple') {
        return getTupleParamCoder(coerceFunc, param.components, param.name);
    }

    if (type === '') {
        return coderNull(coerceFunc);
    }

    errors.throwError('invalid type', errors.INVALID_ARGUMENT, {
        arg: 'type',
        value: type
    });
}

function Coder(coerceFunc) {
    if (!(this instanceof Coder)) { throw new Error('missing new'); }
    if (!coerceFunc) { coerceFunc = defaultCoerceFunc; }
    utils.defineProperty(this, 'coerceFunc', coerceFunc);
}

// Legacy name support
// @TODO: In the next major version, remove names from decode/encode and don't do this
function populateNames(type, name) {
    if (!name) { return; }

    if (type.type.substring(0, 5) === 'tuple' && typeof(name) !== 'string') {
        if (type.components.length != name.names.length) {
            errors.throwError('names/types length mismatch', errors.INVALID_ARGUMENT, {
                count: { names: name.names.length, types: type.components.length },
                value: { names: name.names, types: type.components }
            });
        }

        name.names.forEach(function(name, index) {
            populateNames(type.components[index], name);
        });

        name = (name.name || '');
    }

    if (!type.name && typeof(name) === 'string') {
        type.name = name;
    }
}

utils.defineProperty(Coder.prototype, 'encode', function(names, types, values) {

    // Names is optional, so shift over all the parameters if not provided
    if (arguments.length < 3) {
        values = types;
        types = names;
        names = [];
    }

    if (types.length !== values.length) {
        errors.throwError('types/values length mismatch', errors.INVALID_ARGUMENT, {
            count: { types: types.length, values: values.length },
            value: { types: types, values: values }
        });
    }

    var coders = [];
    types.forEach(function(type, index) {
        // Convert types to type objects
        //   - "uint foo" => { type: "uint", name: "foo" }
        //   - "tuple(uint, uint)" => { type: "tuple", components: [ { type: "uint" }, { type: "uint" }, ] }
        if (typeof(type) === 'string') {
            type = parseParam(type);
        }

        // Legacy support for passing in names (this is going away in the next major version)
        populateNames(type, names[index]);

        coders.push(getParamCoder(this.coerceFunc, type));
    }, this);

    return utils.hexlify(coderTuple(this.coerceFunc, coders).encode(values));
});

utils.defineProperty(Coder.prototype, 'decode', function(names, types, data) {

    // Names is optional, so shift over all the parameters if not provided
    if (arguments.length < 3) {
        data = types;
        types = names;
        names = [];
    }

    data = utils.arrayify(data);

    var coders = [];
    types.forEach(function(type, index) {

        // See encode for details
        if (typeof(type) === 'string') {
            type = parseParam(type);
        }

        // Legacy; going away in the next major version
        populateNames(type, names[index]);

        coders.push(getParamCoder(this.coerceFunc, type));
    }, this);

    return coderTuple(this.coerceFunc, coders).decode(data, 0).value;

});

utils.defineProperty(Coder, 'defaultCoder', new Coder());

utils.defineProperty(Coder, 'parseSignature', parseSignature);


module.exports = Coder


/***/ }),

/***/ "../node_modules/ethers/utils/address.js":
/***/ (function(module, exports, __webpack_require__) {


var BN = __webpack_require__("../node_modules/bn.js/lib/bn.js");

var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
var throwError = __webpack_require__("../node_modules/ethers/utils/throw-error.js");
var keccak256 = __webpack_require__("../node_modules/ethers/utils/keccak256.js");

function getChecksumAddress(address) {
    if (typeof(address) !== 'string' || !address.match(/^0x[0-9A-Fa-f]{40}$/)) {
        throwError('invalid address', {input: address});
    }

    address = address.toLowerCase();

    var hashed = address.substring(2).split('');
    for (var i = 0; i < hashed.length; i++) {
        hashed[i] = hashed[i].charCodeAt(0);
    }
    hashed = convert.arrayify(keccak256(hashed));

    address = address.substring(2).split('');
    for (var i = 0; i < 40; i += 2) {
        if ((hashed[i >> 1] >> 4) >= 8) {
            address[i] = address[i].toUpperCase();
        }
        if ((hashed[i >> 1] & 0x0f) >= 8) {
            address[i + 1] = address[i + 1].toUpperCase();
        }
    }

    return '0x' + address.join('');
}

// Shims for environments that are missing some required constants and functions
var MAX_SAFE_INTEGER = 0x1fffffffffffff;

function log10(x) {
    if (Math.log10) { return Math.log10(x); }
    return Math.log(x) / Math.LN10;
}


// See: https://en.wikipedia.org/wiki/International_Bank_Account_Number
var ibanChecksum = (function() {

    // Create lookup table
    var ibanLookup = {};
    for (var i = 0; i < 10; i++) { ibanLookup[String(i)] = String(i); }
    for (var i = 0; i < 26; i++) { ibanLookup[String.fromCharCode(65 + i)] = String(10 + i); }

    // How many decimal digits can we process? (for 64-bit float, this is 15)
    var safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));

    return function(address) {
        address = address.toUpperCase();
        address = address.substring(4) + address.substring(0, 2) + '00';

        var expanded = address.split('');
        for (var i = 0; i < expanded.length; i++) {
            expanded[i] = ibanLookup[expanded[i]];
        }
        expanded = expanded.join('');

        // Javascript can handle integers safely up to 15 (decimal) digits
        while (expanded.length >= safeDigits){
            var block = expanded.substring(0, safeDigits);
            expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
        }

        var checksum = String(98 - (parseInt(expanded, 10) % 97));
        while (checksum.length < 2) { checksum = '0' + checksum; }

        return checksum;
    };
})();

function getAddress(address, icapFormat) {
    var result = null;

    if (typeof(address) !== 'string') {
        throwError('invalid address', {input: address});
    }

    if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {

        // Missing the 0x prefix
        if (address.substring(0, 2) !== '0x') { address = '0x' + address; }

        result = getChecksumAddress(address);

        // It is a checksummed address with a bad checksum
        if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
            throwError('invalid address checksum', { input: address, expected: result });
        }

    // Maybe ICAP? (we only support direct mode)
    } else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {

        // It is an ICAP address with a bad checksum
        if (address.substring(2, 4) !== ibanChecksum(address)) {
            throwError('invalid address icap checksum', { input: address });
        }

        result = (new BN(address.substring(4), 36)).toString(16);
        while (result.length < 40) { result = '0' + result; }
        result = getChecksumAddress('0x' + result);

    } else {
        throwError('invalid address', { input: address });
    }

    if (icapFormat) {
        var base36 = (new BN(result.substring(2), 16)).toString(36).toUpperCase();
        while (base36.length < 30) { base36 = '0' + base36; }
        return 'XE' + ibanChecksum('XE00' + base36) + base36;
    }

    return result;
}


module.exports = {
    getAddress: getAddress,
}


/***/ }),

/***/ "../node_modules/ethers/utils/bignumber.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 *  BigNumber
 *
 *  A wrapper around the BN.js object. In the future we can swap out
 *  the underlying BN.js library for something smaller.
 */

var BN = __webpack_require__("../node_modules/bn.js/lib/bn.js");

var defineProperty = __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty;
var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
var throwError = __webpack_require__("../node_modules/ethers/utils/throw-error.js");

function BigNumber(value) {
    if (!(this instanceof BigNumber)) { throw new Error('missing new'); }

    if (convert.isHexString(value)) {
        if (value == '0x') { value = '0x0'; }
        value = new BN(value.substring(2), 16);
    } else if (typeof(value) === 'string' && value[0] === '-' && convert.isHexString(value.substring(1))) {
        value = (new BN(value.substring(3), 16)).mul(BigNumber.constantNegativeOne._bn);

    } else if (typeof(value) === 'string' && value.match(/^-?[0-9]*$/)) {
        if (value == '') { value = '0'; }
        value = new BN(value);

    } else if (typeof(value) === 'number' && parseInt(value) == value) {
        value = new BN(value);

    } else if (BN.isBN(value)) {
        //value = value

    } else if (isBigNumber(value)) {
        value = value._bn;

    } else if (convert.isArrayish(value)) {
        value = new BN(convert.hexlify(value).substring(2), 16);

    } else {
        throwError('invalid BigNumber value', { input: value });
    }

    defineProperty(this, '_bn', value);
}

defineProperty(BigNumber, 'constantNegativeOne', bigNumberify(-1));
defineProperty(BigNumber, 'constantZero', bigNumberify(0));
defineProperty(BigNumber, 'constantOne', bigNumberify(1));
defineProperty(BigNumber, 'constantTwo', bigNumberify(2));
defineProperty(BigNumber, 'constantWeiPerEther', bigNumberify(new BN('1000000000000000000')));


defineProperty(BigNumber.prototype, 'fromTwos', function(value) {
    return new BigNumber(this._bn.fromTwos(value));
});

defineProperty(BigNumber.prototype, 'toTwos', function(value) {
    return new BigNumber(this._bn.toTwos(value));
});


defineProperty(BigNumber.prototype, 'add', function(other) {
    return new BigNumber(this._bn.add(bigNumberify(other)._bn));
});

defineProperty(BigNumber.prototype, 'sub', function(other) {
    return new BigNumber(this._bn.sub(bigNumberify(other)._bn));
});


defineProperty(BigNumber.prototype, 'div', function(other) {
    return new BigNumber(this._bn.div(bigNumberify(other)._bn));
});

defineProperty(BigNumber.prototype, 'mul', function(other) {
    return new BigNumber(this._bn.mul(bigNumberify(other)._bn));
});

defineProperty(BigNumber.prototype, 'mod', function(other) {
    return new BigNumber(this._bn.mod(bigNumberify(other)._bn));
});

defineProperty(BigNumber.prototype, 'pow', function(other) {
    return new BigNumber(this._bn.pow(bigNumberify(other)._bn));
});


defineProperty(BigNumber.prototype, 'maskn', function(value) {
    return new BigNumber(this._bn.maskn(value));
});



defineProperty(BigNumber.prototype, 'eq', function(other) {
    return this._bn.eq(bigNumberify(other)._bn);
});

defineProperty(BigNumber.prototype, 'lt', function(other) {
    return this._bn.lt(bigNumberify(other)._bn);
});

defineProperty(BigNumber.prototype, 'lte', function(other) {
    return this._bn.lte(bigNumberify(other)._bn);
});

defineProperty(BigNumber.prototype, 'gt', function(other) {
    return this._bn.gt(bigNumberify(other)._bn);
});

defineProperty(BigNumber.prototype, 'gte', function(other) {
    return this._bn.gte(bigNumberify(other)._bn);
});


defineProperty(BigNumber.prototype, 'isZero', function() {
    return this._bn.isZero();
});


defineProperty(BigNumber.prototype, 'toNumber', function(base) {
    return this._bn.toNumber();
});

defineProperty(BigNumber.prototype, 'toString', function() {
    //return this._bn.toString(base || 10);
    return this._bn.toString(10);
});

defineProperty(BigNumber.prototype, 'toHexString', function() {
    var hex = this._bn.toString(16);
    if (hex.length % 2) { hex = '0' + hex; }
    return '0x' + hex;
});


function isBigNumber(value) {
    return (value._bn && value._bn.mod);
}

function bigNumberify(value) {
    if (isBigNumber(value)) { return value; }
    return new BigNumber(value);
}

module.exports = {
    isBigNumber: isBigNumber,
    bigNumberify: bigNumberify,
    BigNumber: BigNumber
};


/***/ }),

/***/ "../node_modules/ethers/utils/browser-base64.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");

module.exports = {
    decode: function(textData) {
         textData = atob(textData);
         var data = [];
         for (var i = 0; i < textData.length; i++) {
             data.push(textData.charCodeAt(i));
         }
         return convert.arrayify(data);
    },
    encode: function(data) {
        data = convert.arrayify(data);
        var textData = '';
        for (var i = 0; i < data.length; i++) {
            textData += String.fromCharCode(data[i]);
        }
        return btoa(textData);
    }
};




/***/ }),

/***/ "../node_modules/ethers/utils/browser-random-bytes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
var defineProperty = __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty;

var crypto = global.crypto || global.msCrypto;
if (!crypto || !crypto.getRandomValues) {

    console.log('WARNING: Missing strong random number source; using weak randomBytes');

    crypto = {
        getRandomValues: function(buffer) {
            for (var round = 0; round < 20; round++) {
                for (var i = 0; i < buffer.length; i++) {
                    if (round) {
                        buffer[i] ^= parseInt(256 * Math.random());
                    } else {
                        buffer[i] = parseInt(256 * Math.random());
                    }
                }
            }

            return buffer;
        },
        _weakCrypto: true
    };
}

function randomBytes(length) {
    if (length <= 0 || length > 1024 || parseInt(length) != length) {
        throw new Error('invalid length');
    }

    var result = new Uint8Array(length);
    crypto.getRandomValues(result);
    return convert.arrayify(result);
};

if (crypto._weakCrypto === true) {
    defineProperty(randomBytes, '_weakCrypto', true);
}

module.exports = randomBytes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/ethers/utils/contract-address.js":
/***/ (function(module, exports, __webpack_require__) {


var getAddress = __webpack_require__("../node_modules/ethers/utils/address.js").getAddress;
var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
var keccak256 = __webpack_require__("../node_modules/ethers/utils/keccak256.js");
var RLP = __webpack_require__("../node_modules/ethers/utils/rlp.js");

// http://ethereum.stackexchange.com/questions/760/how-is-the-address-of-an-ethereum-contract-computed
function getContractAddress(transaction) {
    if (!transaction.from) { throw new Error('missing from address'); }
    var nonce = transaction.nonce;

    return getAddress('0x' + keccak256(RLP.encode([
        getAddress(transaction.from),
        convert.stripZeros(convert.hexlify(nonce, 'nonce'))
    ])).substring(26));
}

module.exports = {
    getContractAddress: getContractAddress,
}


/***/ }),

/***/ "../node_modules/ethers/utils/convert.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Conversion Utilities
 *
 */

var defineProperty = __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty;

var errors = __webpack_require__("../node_modules/ethers/utils/errors.js");

function addSlice(array) {
    if (array.slice) { return array; }

    array.slice = function() {
        var args = Array.prototype.slice.call(arguments);
        return new Uint8Array(Array.prototype.slice.apply(array, args));
    }

    return array;
}

function isArrayish(value) {
    if (!value || parseInt(value.length) != value.length || typeof(value) === 'string') {
        return false;
    }

    for (var i = 0; i < value.length; i++) {
        var v = value[i];
        if (v < 0 || v >= 256 || parseInt(v) != v) {
            return false;
        }
    }

    return true;
}

function arrayify(value) {
    if (value == null) {
        errors.throwError('cannot convert null value to array', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
    }

    if (value && value.toHexString) {
        value = value.toHexString();
    }

    if (isHexString(value)) {
        value = value.substring(2);
        if (value.length % 2) { value = '0' + value; }

        var result = [];
        for (var i = 0; i < value.length; i += 2) {
            result.push(parseInt(value.substr(i, 2), 16));
        }

        return addSlice(new Uint8Array(result));

    } else if (typeof(value) === 'string') {
        if (value.match(/^[0-9a-fA-F]*$/)) {
             errors.throwError('hex string must have 0x prefix', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
        }
        errors.throwError('invalid hexidecimal string', errors.INVALID_ARGUMENT, { arg: 'value', value: value });
    }

    if (isArrayish(value)) {
        return addSlice(new Uint8Array(value));
    }

    errors.throwError('invalid arrayify value', { arg: 'value', value: value, type: typeof(value) });
}

function concat(objects) {
    var arrays = [];
    var length = 0;
    for (var i = 0; i < objects.length; i++) {
        var object = arrayify(objects[i])
        arrays.push(object);
        length += object.length;
    }

    var result = new Uint8Array(length);
    var offset = 0;
    for (var i = 0; i < arrays.length; i++) {
        result.set(arrays[i], offset);
        offset += arrays[i].length;
    }

    return addSlice(result);
}
function stripZeros(value) {
    value = arrayify(value);

    if (value.length === 0) { return value; }

    // Find the first non-zero entry
    var start = 0;
    while (value[start] === 0) { start++ }

    // If we started with zeros, strip them
    if (start) {
        value = value.slice(start);
    }

    return value;
}

function padZeros(value, length) {
    value = arrayify(value);

    if (length < value.length) { throw new Error('cannot pad'); }

    var result = new Uint8Array(length);
    result.set(value, length - value.length);
    return addSlice(result);
}


function isHexString(value, length) {
    if (typeof(value) !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false
    }
    if (length && value.length !== 2 + 2 * length) { return false; }
    return true;
}

var HexCharacters = '0123456789abcdef';

function hexlify(value) {

    if (value && value.toHexString) {
        return value.toHexString();
    }

    if (typeof(value) === 'number') {
        if (value < 0) {
            errors.throwError('cannot hexlify negative value', errors.INVALID_ARG, { arg: 'value', value: value });
        }

        var hex = '';
        while (value) {
            hex = HexCharacters[value & 0x0f] + hex;
            value = parseInt(value / 16);
        }

        if (hex.length) {
            if (hex.length % 2) { hex = '0' + hex; }
            return '0x' + hex;
        }

        return '0x00';
    }

    if (isHexString(value)) {
        if (value.length % 2) {
            value = '0x0' + value.substring(2);
        }
        return value;
    }

    if (isArrayish(value)) {
        var result = [];
        for (var i = 0; i < value.length; i++) {
             var v = value[i];
             result.push(HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f]);
        }
        return '0x' + result.join('');
    }

    errors.throwError('invalid hexlify value', { arg: 'value', value: value });
}

function hexStripZeros(value) {
    while (value.length > 3 && value.substring(0, 3) === '0x0') {
        value = '0x' + value.substring(3);
    }
    return value;
}

function hexZeroPad(value, length) {
    while (value.length < 2 * length + 2) {
        value = '0x0' + value.substring(2);
    }
    return value;
}

/* @TODO: Add something like this to make slicing code easier to understand
function hexSlice(hex, start, end) {
    hex = hexlify(hex);
    return '0x' + hex.substring(2 + start * 2, 2 + end * 2);
}
*/

function splitSignature(signature) {
    signature = arrayify(signature);
    if (signature.length !== 65) {
        throw new Error('invalid signature');
    }

    var v = signature[64];
    if (v !== 27 && v !== 28) {
        v = 27 + (v % 2);
    }

    return {
        r: hexlify(signature.slice(0, 32)),
        s: hexlify(signature.slice(32, 64)),
        v: v
    }
}

module.exports = {
    arrayify: arrayify,
    isArrayish: isArrayish,

    concat: concat,

    padZeros: padZeros,
    stripZeros: stripZeros,

    splitSignature: splitSignature,

    hexlify: hexlify,
    isHexString: isHexString,
    hexStripZeros: hexStripZeros,
    hexZeroPad: hexZeroPad,
};


/***/ }),

/***/ "../node_modules/ethers/utils/empty.js":
/***/ (function(module, exports) {

module.exports = undefined;


/***/ }),

/***/ "../node_modules/ethers/utils/errors.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperty = __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty;

var codes = { };

[
    // Unknown Error
    'UNKNOWN_ERROR',

    // Not implemented
    'NOT_IMPLEMENTED',

    // Missing new operator to an object
    //  - name: The name of the class
    'MISSING_NEW',


    // Call exception
    'CALL_EXCEPTION',


    // Response from a server was invalid
    //   - response: The body of the response
    //'BAD_RESPONSE',


    // Invalid argument (e.g. type) to a function:
    //   - arg: The argument name that was invalid
    //   - value: The value of the argument
    //   - type: The type of the argument
    //   - expected: What was expected
    'INVALID_ARGUMENT',

    // Missing argument to a function:
    //   - arg: The argument name that is required
    //   - count: The number of arguments received
    //   - expectedCount: The number of arguments expected
    'MISSING_ARGUMENT',

    // Too many arguments
    //   - count: The number of arguments received
    //   - expectedCount: The number of arguments expected
    'UNEXPECTED_ARGUMENT',


    // Unsupported operation
    //   - operation
    'UNSUPPORTED_OPERATION',


].forEach(function(code) {
    defineProperty(codes, code, code);
});


defineProperty(codes, 'throwError', function(message, code, params) {
    if (!code) { code = codes.UNKNOWN_ERROR; }
    if (!params) { params = {}; }

    var messageDetails = [];
    Object.keys(params).forEach(function(key) {
        try {
            messageDetails.push(key + '=' + JSON.stringify(params[key]));
        } catch (error) {
            messageDetails.push(key + '=' + JSON.stringify(params[key].toString()));
        }
    });
    var reason = message;
    if (messageDetails.length) {
        message += ' (' + messageDetails.join(', ') + ')';
    }

    var error = new Error(message);
    error.reason = reason;
    error.code = code

    Object.keys(params).forEach(function(key) {
        error[key] = params[key];
    });

    throw error;
});

defineProperty(codes, 'checkNew', function(self, kind) {
    if (!(self instanceof kind)) {
        codes.throwError('missing new', codes.MISSING_NEW, { name: kind.name });
    }
});

module.exports = codes;


/***/ }),

/***/ "../node_modules/ethers/utils/hmac.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hash = __webpack_require__("../node_modules/hash.js/lib/hash.js");

var sha2 = __webpack_require__("../node_modules/ethers/utils/sha2.js");

var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");

// @TODO: Make this use create-hmac in node

function createSha256Hmac(key) {
    if (!key.buffer) { key = convert.arrayify(key); }
    return new hash.hmac(sha2.createSha256, key);
}

function createSha512Hmac(key) {
    if (!key.buffer) { key = convert.arrayify(key); }
    return new hash.hmac(sha2.createSha512, key);
}

module.exports = {
    createSha256Hmac: createSha256Hmac,
    createSha512Hmac: createSha512Hmac,
};


/***/ }),

/***/ "../node_modules/ethers/utils/id.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keccak256 = __webpack_require__("../node_modules/ethers/utils/keccak256.js");
var utf8 = __webpack_require__("../node_modules/ethers/utils/utf8.js");

function id(text) {
    return keccak256(utf8.toUtf8Bytes(text));
}

module.exports = id;


/***/ }),

/***/ "../node_modules/ethers/utils/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This is SUPER useful, but adds 140kb (even zipped, adds 40kb)
//var unorm = require('unorm');

var address = __webpack_require__("../node_modules/ethers/utils/address.js");
var AbiCoder = __webpack_require__("../node_modules/ethers/utils/abi-coder.js");
var base64 = __webpack_require__("../node_modules/ethers/utils/browser-base64.js");
var bigNumber = __webpack_require__("../node_modules/ethers/utils/bignumber.js");
var contractAddress = __webpack_require__("../node_modules/ethers/utils/contract-address.js");
var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
var id = __webpack_require__("../node_modules/ethers/utils/id.js");
var keccak256 = __webpack_require__("../node_modules/ethers/utils/keccak256.js");
var namehash = __webpack_require__("../node_modules/ethers/utils/namehash.js");
var sha256 = __webpack_require__("../node_modules/ethers/utils/sha2.js").sha256;
var solidity = __webpack_require__("../node_modules/ethers/utils/solidity.js");
var randomBytes = __webpack_require__("../node_modules/ethers/utils/browser-random-bytes.js");
var properties = __webpack_require__("../node_modules/ethers/utils/properties.js");
var RLP = __webpack_require__("../node_modules/ethers/utils/rlp.js");
var utf8 = __webpack_require__("../node_modules/ethers/utils/utf8.js");
var units = __webpack_require__("../node_modules/ethers/utils/units.js");


module.exports = {
    AbiCoder: AbiCoder,

    RLP: RLP,

    defineProperty: properties.defineProperty,

    // NFKD (decomposed)
    //etherSymbol: '\uD835\uDF63',

    // NFKC (composed)
    etherSymbol: '\u039e',

    arrayify: convert.arrayify,

    concat: convert.concat,
    padZeros: convert.padZeros,
    stripZeros: convert.stripZeros,

    base64: base64,

    bigNumberify: bigNumber.bigNumberify,
    BigNumber: bigNumber.BigNumber,

    hexlify: convert.hexlify,

    toUtf8Bytes: utf8.toUtf8Bytes,
    toUtf8String: utf8.toUtf8String,

    namehash: namehash,
    id: id,

    getAddress: address.getAddress,
    getContractAddress: contractAddress.getContractAddress,

    formatEther: units.formatEther,
    parseEther: units.parseEther,

    formatUnits: units.formatUnits,
    parseUnits: units.parseUnits,

    keccak256: keccak256,
    sha256: sha256,

    randomBytes: randomBytes,

    solidityPack: solidity.pack,
    solidityKeccak256: solidity.keccak256,
    soliditySha256: solidity.sha256,

    splitSignature: convert.splitSignature,
}


/***/ }),

/***/ "../node_modules/ethers/utils/keccak256.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sha3 = __webpack_require__("../node_modules/ethers/node_modules/js-sha3/src/sha3.js");

var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");

function keccak256(data) {
    data = convert.arrayify(data);
    return '0x' + sha3.keccak_256(data);
}

module.exports = keccak256;


/***/ }),

/***/ "../node_modules/ethers/utils/namehash.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
var utf8 = __webpack_require__("../node_modules/ethers/utils/utf8.js");
var keccak256 = __webpack_require__("../node_modules/ethers/utils/keccak256.js");

var Zeros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var Partition = new RegExp("^((.*)\\.)?([^.]+)$");
var UseSTD3ASCIIRules = new RegExp("^[a-z0-9.-]*$");

function namehash(name, depth) {
    name = name.toLowerCase();

    // Supporting the full UTF-8 space requires additional (and large)
    // libraries, so for now we simply do not support them.
    // It should be fairly easy in the future to support systems with
    // String.normalize, but that is future work.
    if (!name.match(UseSTD3ASCIIRules)) {
        throw new Error('contains invalid UseSTD3ASCIIRules characters');
    }

    var result = Zeros;
    var processed = 0;
    while (name.length && (!depth || processed < depth)) {
        var partition = name.match(Partition);
        var label = utf8.toUtf8Bytes(partition[3]);
        result = keccak256(convert.concat([result, keccak256(label)]));

        name = partition[2] || '';

        processed++;
    }

    return convert.hexlify(result);
}

module.exports = namehash;



/***/ }),

/***/ "../node_modules/ethers/utils/pbkdf2.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");

function pbkdf2(password, salt, iterations, keylen, createHmac) {
    var hLen
    var l = 1
    var DK = new Uint8Array(keylen)
    var block1 = new Uint8Array(salt.length + 4)
    block1.set(salt);
    //salt.copy(block1, 0, 0, salt.length)

    var r
    var T

    for (var i = 1; i <= l; i++) {
        //block1.writeUInt32BE(i, salt.length)
        block1[salt.length] = (i >> 24) & 0xff;
        block1[salt.length + 1] = (i >> 16) & 0xff;
        block1[salt.length + 2] = (i >> 8) & 0xff;
        block1[salt.length + 3] = i & 0xff;

        var U = createHmac(password).update(block1).digest();

        if (!hLen) {
            hLen = U.length
            T = new Uint8Array(hLen)
            l = Math.ceil(keylen / hLen)
            r = keylen - (l - 1) * hLen
        }

        //U.copy(T, 0, 0, hLen)
        T.set(U);


        for (var j = 1; j < iterations; j++) {
            U = createHmac(password).update(U).digest()
            for (var k = 0; k < hLen; k++) T[k] ^= U[k]
        }


        var destPos = (i - 1) * hLen
        var len = (i === l ? r : hLen)
        //T.copy(DK, destPos, 0, len)
        DK.set(convert.arrayify(T).slice(0, len), destPos);
    }

    return convert.arrayify(DK)
}

module.exports = pbkdf2;


/***/ }),

/***/ "../node_modules/ethers/utils/properties.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function defineProperty(object, name, value) {
    Object.defineProperty(object, name, {
        enumerable: true,
        value: value,
        writable: false,
    });
}

function defineFrozen(object, name, value) {
    var frozen = JSON.stringify(value);
    Object.defineProperty(object, name, {
        enumerable: true,
        get: function() { return JSON.parse(frozen); }
    });
}

module.exports = {
    defineFrozen: defineFrozen,
    defineProperty: defineProperty,
};


/***/ }),

/***/ "../node_modules/ethers/utils/rlp.js":
/***/ (function(module, exports, __webpack_require__) {

//See: https://github.com/ethereum/wiki/wiki/RLP

var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");

function arrayifyInteger(value) {
    var result = [];
    while (value) {
        result.unshift(value & 0xff);
        value >>= 8;
    }
    return result;
}

function unarrayifyInteger(data, offset, length) {
    var result = 0;
    for (var i = 0; i < length; i++) {
        result = (result * 256) + data[offset + i];
    }
    return result;
}

function _encode(object) {
    if (Array.isArray(object)) {
        var payload = [];
        object.forEach(function(child) {
            payload = payload.concat(_encode(child));
        });

        if (payload.length <= 55) {
            payload.unshift(0xc0 + payload.length)
            return payload;
        }

        var length = arrayifyInteger(payload.length);
        length.unshift(0xf7 + length.length);

        return length.concat(payload);

    } else {
        object = [].slice.call(convert.arrayify(object));

        if (object.length === 1 && object[0] <= 0x7f) {
            return object;

        } else if (object.length <= 55) {
            object.unshift(0x80 + object.length);
            return object
        }

        var length = arrayifyInteger(object.length);
        length.unshift(0xb7 + length.length);

        return length.concat(object);
    }
}

function encode(object) {
    return convert.hexlify(_encode(object));
}

function _decodeChildren(data, offset, childOffset, length) {
    var result = [];

    while (childOffset < offset + 1 + length) {
        var decoded = _decode(data, childOffset);

        result.push(decoded.result);

        childOffset += decoded.consumed;
        if (childOffset > offset + 1 + length) {
            throw new Error('invalid rlp');
        }
    }

    return {consumed: (1 + length), result: result};
}

// returns { consumed: number, result: Object }
function _decode(data, offset) {
    if (data.length === 0) { throw new Error('invalid rlp data'); }

    // Array with extra length prefix
    if (data[offset] >= 0xf8) {
        var lengthLength = data[offset] - 0xf7;
        if (offset + 1 + lengthLength > data.length) {
            throw new Error('too short');
        }

        var length = unarrayifyInteger(data, offset + 1, lengthLength);
        if (offset + 1 + lengthLength + length > data.length) {
            throw new Error('to short');
        }

        return _decodeChildren(data, offset, offset + 1 + lengthLength, lengthLength + length);

    } else if (data[offset] >= 0xc0) {
        var length = data[offset] - 0xc0;
        if (offset + 1 + length > data.length) {
            throw new Error('invalid rlp data');
        }

        return _decodeChildren(data, offset, offset + 1, length);

    } else if (data[offset] >= 0xb8) {
        var lengthLength = data[offset] - 0xb7;
        if (offset + 1 + lengthLength > data.length) {
            throw new Error('invalid rlp data');
        }

        var length = unarrayifyInteger(data, offset + 1, lengthLength);
        if (offset + 1 + lengthLength + length > data.length) {
            throw new Error('invalid rlp data');
        }

        var result = convert.hexlify(data.slice(offset + 1 + lengthLength, offset + 1 + lengthLength + length));
        return { consumed: (1 + lengthLength + length), result: result }

    } else if (data[offset] >= 0x80) {
        var length = data[offset] - 0x80;
        if (offset + 1 + length > data.offset) {
            throw new Error('invlaid rlp data');
        }

        var result = convert.hexlify(data.slice(offset + 1, offset + 1 + length));
        return { consumed: (1 + length), result: result }
    }
    return { consumed: 1, result: convert.hexlify(data[offset]) };
}

function decode(data) {
    data = convert.arrayify(data);
    var decoded = _decode(data, 0);
    if (decoded.consumed !== data.length) {
        throw new Error('invalid rlp data');
    }
    return decoded.result;
}

module.exports = {
    encode: encode,
    decode: decode,
}


/***/ }),

/***/ "../node_modules/ethers/utils/sha2.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hash = __webpack_require__("../node_modules/hash.js/lib/hash.js");

var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");

function sha256(data) {
    data = convert.arrayify(data);
    return '0x' + (hash.sha256().update(data).digest('hex'));
}

function sha512(data) {
    data = convert.arrayify(data);
    return '0x' + (hash.sha512().update(data).digest('hex'));
}

module.exports = {
    sha256: sha256,
    sha512: sha512,

    createSha256: hash.sha256,
    createSha512: hash.sha512,
}


/***/ }),

/***/ "../node_modules/ethers/utils/solidity.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bigNumberify = __webpack_require__("../node_modules/ethers/utils/bignumber.js").bigNumberify;
var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
var getAddress = __webpack_require__("../node_modules/ethers/utils/address.js").getAddress;
var utf8 = __webpack_require__("../node_modules/ethers/utils/utf8.js");

var hashKeccak256 = __webpack_require__("../node_modules/ethers/utils/keccak256.js");
var hashSha256 = __webpack_require__("../node_modules/ethers/utils/sha2.js").sha256;

var regexBytes = new RegExp("^bytes([0-9]+)$");
var regexNumber = new RegExp("^(u?int)([0-9]*)$");
var regexArray = new RegExp("^(.*)\\[([0-9]*)\\]$");

var Zeros = '0000000000000000000000000000000000000000000000000000000000000000';

function _pack(type, value, isArray) {
    switch(type) {
        case 'address':
            if (isArray) { return convert.padZeros(value, 32); }
            return convert.arrayify(value);
        case 'string':
            return utf8.toUtf8Bytes(value);
        case 'bytes':
            return convert.arrayify(value);
        case 'bool':
            value = (value ? '0x01': '0x00');
            if (isArray) { return convert.padZeros(value, 32); }
            return convert.arrayify(value);
    }

    var match =  type.match(regexNumber);
    if (match) {
        var signed = (match[1] === 'int')
        var size = parseInt(match[2] || "256")
        if ((size % 8 != 0) || size === 0 || size > 256) {
            throw new Error('invalid number type - ' + type);
        }

        if (isArray) { size = 256; }

        value = bigNumberify(value).toTwos(size);

        return convert.padZeros(value, size / 8);
    }

    match = type.match(regexBytes);
    if (match) {
        var size = match[1];
        if (size != parseInt(size) || size === 0 || size > 32) {
            throw new Error('invalid number type - ' + type);
        }
        size = parseInt(size);
        if (convert.arrayify(value).byteLength !== size) { throw new Error('invalid value for ' + type); }
        if (isArray) { return (value + Zeros).substring(0, 66); }
        return value;
    }

    match = type.match(regexArray);
    if (match) {
        var baseType = match[1];
        var count = parseInt(match[2] || value.length);
        if (count != value.length) { throw new Error('invalid value for ' + type); }
        var result = [];
        value.forEach(function(value) {
            value = _pack(baseType, value, true);
            result.push(value);
        });
        return convert.concat(result);
    }

    throw new Error('unknown type - ' + type);
}

function pack(types, values) {
    if (types.length != values.length) { throw new Error('type/value count mismatch'); }
    var tight = [];
    types.forEach(function(type, index) {
        tight.push(_pack(type, values[index]));
    });
    return convert.hexlify(convert.concat(tight));
}

function keccak256(types, values) {
    return hashKeccak256(pack(types, values));
}

function sha256(types, values) {
    return hashSha256(pack(types, values));
}

module.exports = {
    pack: pack,

    keccak256: keccak256,
    sha256: sha256,
}


/***/ }),

/***/ "../node_modules/ethers/utils/throw-error.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function throwError(message, params) {
    var error = new Error(message);
    for (var key in params) {
        error[key] = params[key];
    }
    throw error;
}

module.exports = throwError;


/***/ }),

/***/ "../node_modules/ethers/utils/units.js":
/***/ (function(module, exports, __webpack_require__) {

var bigNumberify = __webpack_require__("../node_modules/ethers/utils/bignumber.js").bigNumberify;
var throwError = __webpack_require__("../node_modules/ethers/utils/throw-error.js");

var zero = new bigNumberify(0);
var negative1 = new bigNumberify(-1);

var names = [
    'wei',
    'kwei',
    'Mwei',
    'Gwei',
    'szabo',
    'finny',
    'ether',
];

var getUnitInfo = (function() {
    var unitInfos = {};

    function getUnitInfo(value) {
        return {
            decimals: value.length - 1,
            tenPower: bigNumberify(value)
        };
    }

    // Cache the common units
    var value = '1';
    names.forEach(function(name) {
        var info = getUnitInfo(value);
        unitInfos[name.toLowerCase()] = info;
        unitInfos[String(info.decimals)] = info;
        value += '000';
    });

    return function(name) {
        // Try the cache
        var info = unitInfos[String(name).toLowerCase()];

        if (!info && typeof(name) === 'number' && parseInt(name) == name && name >= 0 && name <= 256) {
            var value = '1';
            for (var i = 0; i < name; i++) { value += '0'; }
            info = getUnitInfo(value);
        }

        // Make sure we got something
        if (!info) { throwError('invalid unitType', { unitType: name }); }

        return info;
    }
})();

function formatUnits(value, unitType, options) {
    if (typeof(unitType) === 'object' && !options) {
        options = unitType;
        unitType = undefined;
    }

    if (unitType == null) { unitType = 18; }
    var unitInfo = getUnitInfo(unitType);

    // Make sure wei is a big number (convert as necessary)
    value = bigNumberify(value);

    if (!options) { options = {}; }

    var negative = value.lt(zero);
    if (negative) { value = value.mul(negative1); }

    var fraction = value.mod(unitInfo.tenPower).toString(10);
    while (fraction.length < unitInfo.decimals) { fraction = '0' + fraction; }

    // Strip off trailing zeros (but keep one if would otherwise be bare decimal point)
    if (!options.pad) {
        fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
    }

    var whole = value.div(unitInfo.tenPower).toString(10);

    if (options.commify) {
        whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    var value = whole + '.' + fraction;

    if (negative) { value = '-' + value; }

    return value;
}

function parseUnits(value, unitType) {
    if (unitType == null) { unitType = 18; }
    var unitInfo = getUnitInfo(unitType);

    if (typeof(value) !== 'string' || !value.match(/^-?[0-9.,]+$/)) {
        throwError('invalid value', { input: value });
    }

    // Remove commas
    var value = value.replace(/,/g,'');

    // Is it negative?
    var negative = (value.substring(0, 1) === '-');
    if (negative) { value = value.substring(1); }

    if (value === '.') { throwError('invalid value', { input: value }); }

    // Split it into a whole and fractional part
    var comps = value.split('.');
    if (comps.length > 2) { throwError('too many decimal points', { input: value }); }

    var whole = comps[0], fraction = comps[1];
    if (!whole) { whole = '0'; }
    if (!fraction) { fraction = '0'; }

    // Prevent underflow
    if (fraction.length > unitInfo.decimals) {
        throwError('too many decimal places', { input: value, decimals: fraction.length });
    }

    // Fully pad the string with zeros to get to wei
    while (fraction.length < unitInfo.decimals) { fraction += '0'; }

    whole = bigNumberify(whole);
    fraction = bigNumberify(fraction);

    var wei = (whole.mul(unitInfo.tenPower)).add(fraction);

    if (negative) { wei = wei.mul(negative1); }

    return wei;
}

function formatEther(wei, options) {
    return formatUnits(wei, 18, options);
}

function parseEther(ether) {
    return parseUnits(ether, 18);
}

module.exports = {
    formatEther: formatEther,
    parseEther: parseEther,

    formatUnits: formatUnits,
    parseUnits: parseUnits,
}


/***/ }),

/***/ "../node_modules/ethers/utils/utf8.js":
/***/ (function(module, exports, __webpack_require__) {


var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");

// http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
function utf8ToBytes(str) {
    var result = [];
    var offset = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            result[offset++] = c;
        } else if (c < 2048) {
            result[offset++] = (c >> 6) | 192;
            result[offset++] = (c & 63) | 128;
        } else if (((c & 0xFC00) == 0xD800) && (i + 1) < str.length && ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
            result[offset++] = (c >> 18) | 240;
            result[offset++] = ((c >> 12) & 63) | 128;
            result[offset++] = ((c >> 6) & 63) | 128;
            result[offset++] = (c & 63) | 128;
        } else {
            result[offset++] = (c >> 12) | 224;
            result[offset++] = ((c >> 6) & 63) | 128;
            result[offset++] = (c & 63) | 128;
        }
    }

    return convert.arrayify(result);
};


// http://stackoverflow.com/questions/13356493/decode-utf-8-with-javascript#13691499
function bytesToUtf8(bytes) {
    bytes = convert.arrayify(bytes);

    var result = '';
    var i = 0;

    // Invalid bytes are ignored
    while(i < bytes.length) {
        var c = bytes[i++];
        if (c >> 7 == 0) {
            // 0xxx xxxx
            result += String.fromCharCode(c);
            continue;
        }

        // Invalid starting byte
        if (c >> 6 == 0x02) { continue; }

        // Multibyte; how many bytes left for thus character?
        var extraLength = null;
        if (c >> 5 == 0x06) {
            extraLength = 1;
        } else if (c >> 4 == 0x0e) {
            extraLength = 2;
        } else if (c >> 3 == 0x1e) {
            extraLength = 3;
        } else if (c >> 2 == 0x3e) {
            extraLength = 4;
        } else if (c >> 1 == 0x7e) {
            extraLength = 5;
        } else {
            continue;
        }

        // Do we have enough bytes in our data?
        if (i + extraLength > bytes.length) {

            // If there is an invalid unprocessed byte, try to continue
            for (; i < bytes.length; i++) {
                if (bytes[i] >> 6 != 0x02) { break; }
            }
            if (i != bytes.length) continue;

            // All leftover bytes are valid.
            return result;
        }

        // Remove the UTF-8 prefix from the char (res)
        var res = c & ((1 << (8 - extraLength - 1)) - 1);

        var count;
        for (count = 0; count < extraLength; count++) {
            var nextChar = bytes[i++];

            // Is the char valid multibyte part?
            if (nextChar >> 6 != 0x02) {break;};
            res = (res << 6) | (nextChar & 0x3f);
        }

        if (count != extraLength) {
            i--;
            continue;
        }

        if (res <= 0xffff) {
            result += String.fromCharCode(res);
            continue;
        }

        res -= 0x10000;
        result += String.fromCharCode(((res >> 10) & 0x3ff) + 0xd800, (res & 0x3ff) + 0xdc00);
    }

    return result;
}

module.exports = {
    toUtf8Bytes: utf8ToBytes,
    toUtf8String: bytesToUtf8,
};


/***/ }),

/***/ "../node_modules/ethers/wallet/hdnode.js":
/***/ (function(module, exports, __webpack_require__) {

// See: https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
// See: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki

var secp256k1 = new (__webpack_require__("../node_modules/elliptic/lib/elliptic.js")).ec('secp256k1');

var wordlist = (function() {
    var words = __webpack_require__("../node_modules/ethers/wallet/words.json");
    return words.replace(/([A-Z])/g, ' $1').toLowerCase().substring(1).split(' ');
})();

var utils = (function() {
    var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");

    var sha2 = __webpack_require__("../node_modules/ethers/utils/sha2.js");

    var hmac = __webpack_require__("../node_modules/ethers/utils/hmac.js");

    return {
        defineProperty: __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty,

        arrayify: convert.arrayify,
        bigNumberify: __webpack_require__("../node_modules/ethers/utils/bignumber.js").bigNumberify,
        hexlify: convert.hexlify,

        toUtf8Bytes: __webpack_require__("../node_modules/ethers/utils/utf8.js").toUtf8Bytes,

        sha256: sha2.sha256,
        createSha512Hmac: hmac.createSha512Hmac,

        pbkdf2: __webpack_require__("../node_modules/ethers/utils/pbkdf2.js"),
    }
})();

// "Bitcoin seed"
var MasterSecret = utils.toUtf8Bytes('Bitcoin seed');

var HardenedBit = 0x80000000;

// Returns a byte with the MSB bits set
function getUpperMask(bits) {
   return ((1 << bits) - 1) << (8 - bits);
}

// Returns a byte with the LSB bits set
function getLowerMask(bits) {
   return (1 << bits) - 1;
}

function HDNode(keyPair, chainCode, index, depth) {
    if (!(this instanceof HDNode)) { throw new Error('missing new'); }

    utils.defineProperty(this, '_keyPair', keyPair);

    utils.defineProperty(this, 'privateKey', utils.hexlify(keyPair.priv.toArray('be', 32)));
    utils.defineProperty(this, 'publicKey', '0x' + keyPair.getPublic(true, 'hex'));

    utils.defineProperty(this, 'chainCode', utils.hexlify(chainCode));

    utils.defineProperty(this, 'index', index);
    utils.defineProperty(this, 'depth', depth);
}

utils.defineProperty(HDNode.prototype, '_derive', function(index) {

    // Public parent key -> public child key
    if (!this.privateKey) {
        if (index >= HardenedBit) { throw new Error('cannot derive child of neutered node'); }
        throw new Error('not implemented');
    }

    var data = new Uint8Array(37);

    if (index & HardenedBit) {
        // Data = 0x00 || ser_256(k_par)
        data.set(utils.arrayify(this.privateKey), 1);

    } else {
        // Data = ser_p(point(k_par))
        data.set(this._keyPair.getPublic().encode(null, true));
    }

    // Data += ser_32(i)
    for (var i = 24; i >= 0; i -= 8) { data[33 + (i >> 3)] = ((index >> (24 - i)) & 0xff); }

    var I = utils.arrayify(utils.createSha512Hmac(this.chainCode).update(data).digest());
    var IL = utils.bigNumberify(I.slice(0, 32));
    var IR = I.slice(32);

    var ki = IL.add('0x' + this._keyPair.getPrivate('hex')).mod('0x' + secp256k1.curve.n.toString(16));

    return new HDNode(secp256k1.keyFromPrivate(utils.arrayify(ki)), I.slice(32), index, this.depth + 1);
});

utils.defineProperty(HDNode.prototype, 'derivePath', function(path) {
    var components = path.split('/');

    if (components.length === 0 || (components[0] === 'm' && this.depth !== 0)) {
        throw new Error('invalid path');
    }

    if (components[0] === 'm') { components.shift(); }

    var result = this;
    for (var i = 0; i < components.length; i++) {
        var component = components[i];
        if (component.match(/^[0-9]+'$/)) {
            var index = parseInt(component.substring(0, component.length - 1));
            if (index >= HardenedBit) { throw new Error('invalid path index - ' + component); }
            result = result._derive(HardenedBit + index);
        } else if (component.match(/^[0-9]+$/)) {
            var index = parseInt(component);
            if (index >= HardenedBit) { throw new Error('invalid path index - ' + component); }
            result = result._derive(index);
        } else {
            throw new Error('invlaid path component - ' + component);
        }
    }

    return result;
});

utils.defineProperty(HDNode, 'fromMnemonic', function(mnemonic) {
    // Check that the checksum s valid (will throw an error)
    mnemonicToEntropy(mnemonic);

    return HDNode.fromSeed(mnemonicToSeed(mnemonic));
});

utils.defineProperty(HDNode, 'fromSeed', function(seed) {
    seed = utils.arrayify(seed);
    if (seed.length < 16 || seed.length > 64) { throw new Error('invalid seed'); }

    var I = utils.arrayify(utils.createSha512Hmac(MasterSecret).update(seed).digest());

    return new HDNode(secp256k1.keyFromPrivate(I.slice(0, 32)), I.slice(32), 0, 0, 0);
});

function mnemonicToSeed(mnemonic, password) {

    if (!password) {
        password = '';

    } else if (password.normalize) {
        password = password.normalize('NFKD');

    } else {
        for (var i = 0; i < password.length; i++) {
            var c = password.charCodeAt(i);
            if (c < 32 || c > 127) { throw new Error('passwords with non-ASCII characters not supported in this environment'); }
        }
    }

    mnemonic = utils.toUtf8Bytes(mnemonic, 'NFKD');
    var salt = utils.toUtf8Bytes('mnemonic' + password, 'NFKD');

    return utils.hexlify(utils.pbkdf2(mnemonic, salt, 2048, 64, utils.createSha512Hmac));
}

function mnemonicToEntropy(mnemonic) {
   var words = mnemonic.toLowerCase().split(' ');
   if ((words.length % 3) !== 0) { throw new Error('invalid mnemonic'); }

   var entropy = utils.arrayify(new Uint8Array(Math.ceil(11 * words.length / 8)));

   var offset = 0;
   for (var i = 0; i < words.length; i++) {
       var index = wordlist.indexOf(words[i]);
       if (index === -1) { throw new Error('invalid mnemonic'); }

       for (var bit = 0; bit < 11; bit++) {
           if (index & (1 << (10 - bit))) {
               entropy[offset >> 3] |= (1 << (7 - (offset % 8)));
           }
           offset++;
       }
   }

   var entropyBits = 32 * words.length / 3;

   var checksumBits = words.length / 3;
   var checksumMask = getUpperMask(checksumBits);

   var checksum = utils.arrayify(utils.sha256(entropy.slice(0, entropyBits / 8)))[0];
   checksum &= checksumMask;

   if (checksum !== (entropy[entropy.length - 1] & checksumMask)) {
       throw new Error('invalid checksum');
   }

   return utils.hexlify(entropy.slice(0, entropyBits / 8));
}

function entropyToMnemonic(entropy) {
    entropy = utils.arrayify(entropy);

    if ((entropy.length % 4) !== 0 || entropy.length < 16 || entropy.length > 32) {
        throw new Error('invalid entropy');
    }

    var words = [0];

    var remainingBits = 11;
    for (var i = 0; i < entropy.length; i++) {

        // Consume the whole byte (with still more to go)
        if (remainingBits > 8) {
            words[words.length - 1] <<= 8;
            words[words.length - 1] |= entropy[i];

            remainingBits -= 8;

        // This byte will complete an 11-bit index
        } else {
            words[words.length - 1] <<= remainingBits;
            words[words.length - 1] |= entropy[i] >> (8 - remainingBits);

            // Start the next word
            words.push(entropy[i] & getLowerMask(8 - remainingBits));

            remainingBits += 3;
        }
    }

    // Compute the checksum bits
    var checksum = utils.arrayify(utils.sha256(entropy))[0];
    var checksumBits = entropy.length / 4;
    checksum &= getUpperMask(checksumBits);

    // Shift the checksum into the word indices
    words[words.length - 1] <<= checksumBits;
    words[words.length - 1] |= (checksum >> (8 - checksumBits));

    // Convert indices into words
    for (var i = 0; i < words.length; i++) {
        words[i] = wordlist[words[i]];
    }

    return words.join(' ');
}

function isValidMnemonic(mnemonic) {
    try {
        mnemonicToEntropy(mnemonic);
        return true;
    } catch (error) { }

    return false;
}

module.exports = {
    fromMnemonic: HDNode.fromMnemonic,
    fromSeed: HDNode.fromSeed,

    mnemonicToEntropy: mnemonicToEntropy,
    entropyToMnemonic: entropyToMnemonic,
    mnemonicToSeed: mnemonicToSeed,

    isValidMnemonic: isValidMnemonic,
};


/***/ }),

/***/ "../node_modules/ethers/wallet/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Wallet = __webpack_require__("../node_modules/ethers/wallet/wallet.js");
var HDNode = __webpack_require__("../node_modules/ethers/wallet/hdnode.js");
var SigningKey = __webpack_require__("../node_modules/ethers/wallet/signing-key.js");

module.exports = {
    HDNode: HDNode,
    Wallet: Wallet,

    SigningKey: SigningKey,
}


/***/ }),

/***/ "../node_modules/ethers/wallet/secret-storage.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aes = __webpack_require__("../node_modules/aes-js/index.js");
var scrypt = __webpack_require__("../node_modules/scrypt-js/scrypt.js");
var uuid = __webpack_require__("../node_modules/uuid/uuid.js");

var hmac = __webpack_require__("../node_modules/ethers/utils/hmac.js");
var pbkdf2 = __webpack_require__("../node_modules/ethers/utils/pbkdf2.js");
var utils = __webpack_require__("../node_modules/ethers/utils/index.js");

var SigningKey = __webpack_require__("../node_modules/ethers/wallet/signing-key.js");
var HDNode = __webpack_require__("../node_modules/ethers/wallet/hdnode.js");

// @TODO: Maybe move this to HDNode?
var defaultPath = "m/44'/60'/0'/0/0";

function arrayify(hexString) {
    if (typeof(hexString) === 'string' && hexString.substring(0, 2) !== '0x') {
        hexString = '0x' + hexString;
    }
    return utils.arrayify(hexString);
}

function zpad(value, length) {
    value = String(value);
    while (value.length < length) { value = '0' + value; }
    return value;
}

function getPassword(password) {
    if (typeof(password) === 'string') {
        return utils.toUtf8Bytes(password, 'NFKC');
    }
    return utils.arrayify(password, 'password');
}

// Search an Object and its children recursively, caselessly.
function searchPath(object, path) {
    var currentChild = object;

    var comps = path.toLowerCase().split('/');
    for (var i = 0; i < comps.length; i++) {

        // Search for a child object with a case-insensitive matching key
        var matchingChild = null;
        for (var key in currentChild) {
             if (key.toLowerCase() === comps[i]) {
                 matchingChild = currentChild[key];
                 break;
             }
        }

        // Didn't find one. :'(
        if (matchingChild === null) {
            return null;
        }

        // Now check this child...
        currentChild = matchingChild;
    }

    return currentChild;
}

var secretStorage = {};


utils.defineProperty(secretStorage, 'isCrowdsaleWallet', function(json) {
    try {
        var data = JSON.parse(json);
    } catch (error) { return false; }

    return (data.encseed && data.ethaddr);
});

utils.defineProperty(secretStorage, 'isValidWallet', function(json) {
    try {
        var data = JSON.parse(json);
    } catch (error) { return false; }

    if (!data.version || parseInt(data.version) !== data.version || parseInt(data.version) !== 3) {
        return false;
    }

    // @TODO: Put more checks to make sure it has kdf, iv and all that good stuff
    return true;
});


// See: https://github.com/ethereum/pyethsaletool
utils.defineProperty(secretStorage, 'decryptCrowdsale', function(json, password) {
    var data = JSON.parse(json);

    password = getPassword(password);

    // Ethereum Address
    var ethaddr = utils.getAddress(searchPath(data, 'ethaddr'));

    // Encrypted Seed
    var encseed = arrayify(searchPath(data, 'encseed'));
    if (!encseed || (encseed.length % 16) !== 0) {
        throw new Error('invalid encseed');
    }

    var key = pbkdf2(password, password, 2000, 32, hmac.createSha256Hmac).slice(0, 16);

    var iv = encseed.slice(0, 16);
    var encryptedSeed = encseed.slice(16);

    // Decrypt the seed
    var aesCbc = new aes.ModeOfOperation.cbc(key, iv);
    var seed = utils.arrayify(aesCbc.decrypt(encryptedSeed));
    seed = aes.padding.pkcs7.strip(seed);

    // This wallet format is weird... Convert the binary encoded hex to a string.
    var seedHex = '';
    for (var i = 0; i < seed.length; i++) {
        seedHex += String.fromCharCode(seed[i]);
    }

    var seedHexBytes = utils.toUtf8Bytes(seedHex);

    var signingKey = new SigningKey(utils.keccak256(seedHexBytes));

    if (signingKey.address !== ethaddr) {
        throw new Error('corrupt crowdsale wallet');
    }

    return signingKey;
});


utils.defineProperty(secretStorage, 'decrypt', function(json, password, progressCallback) {
    var data = JSON.parse(json);

    password = getPassword(password);

    var decrypt = function(key, ciphertext) {
        var cipher = searchPath(data, 'crypto/cipher');
        if (cipher === 'aes-128-ctr') {
            var iv = arrayify(searchPath(data, 'crypto/cipherparams/iv'), 'crypto/cipherparams/iv')
            var counter = new aes.Counter(iv);

            var aesCtr = new aes.ModeOfOperation.ctr(key, counter);

            return arrayify(aesCtr.decrypt(ciphertext));
        }

        return null;
    };

    var computeMAC = function(derivedHalf, ciphertext) {
        return utils.keccak256(utils.concat([derivedHalf, ciphertext]));
    }

    var getSigningKey = function(key, reject) {
        var ciphertext = arrayify(searchPath(data, 'crypto/ciphertext'));

        var computedMAC = utils.hexlify(computeMAC(key.slice(16, 32), ciphertext)).substring(2);
        if (computedMAC !== searchPath(data, 'crypto/mac').toLowerCase()) {
            reject(new Error('invalid password'));
            return null;
        }

        var privateKey = decrypt(key.slice(0, 16), ciphertext);
        var mnemonicKey = key.slice(32, 64);

        if (!privateKey) {
            reject(new Error('unsupported cipher'));
            return null;
        }

        var signingKey = new SigningKey(privateKey);
        if (signingKey.address !== utils.getAddress(data.address)) {
            reject(new Error('address mismatch'));
            return null;
        }

        // Version 0.1 x-ethers metadata must contain an encrypted mnemonic phrase
        if (searchPath(data, 'x-ethers/version') === '0.1') {
            var mnemonicCiphertext = arrayify(searchPath(data, 'x-ethers/mnemonicCiphertext'), 'x-ethers/mnemonicCiphertext');
            var mnemonicIv = arrayify(searchPath(data, 'x-ethers/mnemonicCounter'), 'x-ethers/mnemonicCounter');

            var mnemonicCounter = new aes.Counter(mnemonicIv);
            var mnemonicAesCtr = new aes.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);

            var path = searchPath(data, 'x-ethers/path') || defaultPath;

            var entropy = arrayify(mnemonicAesCtr.decrypt(mnemonicCiphertext));
            var mnemonic = HDNode.entropyToMnemonic(entropy);

            if (HDNode.fromMnemonic(mnemonic).derivePath(path).privateKey != utils.hexlify(privateKey)) {
                reject(new Error('mnemonic mismatch'));
                return null;
            }

            signingKey.mnemonic = mnemonic;
            signingKey.path = path;
        }

        return signingKey;
    }


    return new Promise(function(resolve, reject) {
        var kdf = searchPath(data, 'crypto/kdf');
        if (kdf && typeof(kdf) === 'string') {
            if (kdf.toLowerCase() === 'scrypt') {
                var salt = arrayify(searchPath(data, 'crypto/kdfparams/salt'), 'crypto/kdfparams/salt');
                var N = parseInt(searchPath(data, 'crypto/kdfparams/n'));
                var r = parseInt(searchPath(data, 'crypto/kdfparams/r'));
                var p = parseInt(searchPath(data, 'crypto/kdfparams/p'));
                if (!N || !r || !p) {
                    reject(new Error('unsupported key-derivation function parameters'));
                    return;
                }

                // Make sure N is a power of 2
                if ((N & (N - 1)) !== 0) {
                    reject(new Error('unsupported key-derivation function parameter value for N'));
                    return;
                }

                var dkLen = parseInt(searchPath(data, 'crypto/kdfparams/dklen'));
                if (dkLen !== 32) {
                    reject( new Error('unsupported key-derivation derived-key length'));
                    return;
                }

                scrypt(password, salt, N, r, p, 64, function(error, progress, key) {
                    if (error) {
                        error.progress = progress;
                        reject(error);

                    } else if (key) {
                        key = arrayify(key);

                        var signingKey = getSigningKey(key, reject);
                        if (!signingKey) { return; }

                        if (progressCallback) { progressCallback(1); }
                        resolve(signingKey);

                    } else if (progressCallback) {
                        return progressCallback(progress);
                    }
                });

            } else if (kdf.toLowerCase() === 'pbkdf2') {
                var salt = arrayify(searchPath(data, 'crypto/kdfparams/salt'), 'crypto/kdfparams/salt');

                var prfFunc = null;
                var prf = searchPath(data, 'crypto/kdfparams/prf');
                if (prf === 'hmac-sha256') {
                    prfFunc = hmac.createSha256Hmac;
                } else if (prf === 'hmac-sha512') {
                    prfFunc = hmac.createSha512Hmac;
                } else {
                    reject(new Error('unsupported prf'));
                    return;
                }

                var c = parseInt(searchPath(data, 'crypto/kdfparams/c'));

                var dkLen = parseInt(searchPath(data, 'crypto/kdfparams/dklen'));
                if (dkLen !== 32) {
                    reject( new Error('unsupported key-derivation derived-key length'));
                    return;
                }

                var key = pbkdf2(password, salt, c, dkLen, prfFunc);

                var signingKey = getSigningKey(key, reject);
                if (!signingKey) { return; }

                resolve(signingKey);

            } else {
                reject(new Error('unsupported key-derivation function'));
            }

        } else {
            reject(new Error('unsupported key-derivation function'));
        }
    });
});

utils.defineProperty(secretStorage, 'encrypt', function(privateKey, password, options, progressCallback) {

    // the options are optional, so adjust the call as needed
    if (typeof(options) === 'function' && !progressCallback) {
        progressCallback = options;
        options = {};
    }
    if (!options) { options = {}; }

    // Check the private key
    if (privateKey instanceof SigningKey) {
        privateKey = privateKey.privateKey;
    }
    privateKey = arrayify(privateKey, 'private key');
    if (privateKey.length !== 32) { throw new Error('invalid private key'); }

    password = getPassword(password);

    var entropy = options.entropy;
    if (options.mnemonic) {
        if (entropy) {
            if (HDNode.entropyToMnemonic(entropy) !== options.mnemonic) {
                throw new Error('entropy and mnemonic mismatch');
            }
        } else {
            entropy = HDNode.mnemonicToEntropy(options.mnemonic);
        }
    }
    if (entropy) {
        entropy = arrayify(entropy, 'entropy');
    }

    var path = options.path;
    if (entropy && !path) {
        path = defaultPath;
    }

    var client = options.client;
    if (!client) { client = "ethers.js"; }

    // Check/generate the salt
    var salt = options.salt;
    if (salt) {
        salt = arrayify(salt, 'salt');
    } else {
        salt = utils.randomBytes(32);;
    }

    // Override initialization vector
    var iv = null;
    if (options.iv) {
        iv = arrayify(options.iv, 'iv');
        if (iv.length !== 16) { throw new Error('invalid iv'); }
    } else {
       iv = utils.randomBytes(16);
    }

    // Override the uuid
    var uuidRandom = options.uuid;
    if (uuidRandom) {
        uuidRandom = arrayify(uuidRandom, 'uuid');
        if (uuidRandom.length !== 16) { throw new Error('invalid uuid'); }
    } else {
        uuidRandom = utils.randomBytes(16);
    }

    // Override the scrypt password-based key derivation function parameters
    var N = (1 << 17), r = 8, p = 1;
    if (options.scrypt) {
        if (options.scrypt.N) { N = options.scrypt.N; }
        if (options.scrypt.r) { r = options.scrypt.r; }
        if (options.scrypt.p) { p = options.scrypt.p; }
    }

    return new Promise(function(resolve, reject) {

        // We take 64 bytes:
        //   - 32 bytes   As normal for the Web3 secret storage (derivedKey, macPrefix)
        //   - 32 bytes   AES key to encrypt mnemonic with (required here to be Ethers Wallet)
        scrypt(password, salt, N, r, p, 64, function(error, progress, key) {
            if (error) {
                error.progress = progress;
                reject(error);

            } else if (key) {
                key = arrayify(key);

                // This will be used to encrypt the wallet (as per Web3 secret storage)
                var derivedKey = key.slice(0, 16);
                var macPrefix = key.slice(16, 32);

                // This will be used to encrypt the mnemonic phrase (if any)
                var mnemonicKey = key.slice(32, 64);

                // Get the address for this private key
                var address = (new SigningKey(privateKey)).address;

                // Encrypt the private key
                var counter = new aes.Counter(iv);
                var aesCtr = new aes.ModeOfOperation.ctr(derivedKey, counter);
                var ciphertext = utils.arrayify(aesCtr.encrypt(privateKey));

                // Compute the message authentication code, used to check the password
                var mac = utils.keccak256(utils.concat([macPrefix, ciphertext]))

                // See: https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition
                var data = {
                    address: address.substring(2).toLowerCase(),
                    id: uuid.v4({ random: uuidRandom }),
                    version: 3,
                    Crypto: {
                        cipher: 'aes-128-ctr',
                        cipherparams: {
                            iv: utils.hexlify(iv).substring(2),
                        },
                        ciphertext: utils.hexlify(ciphertext).substring(2),
                        kdf: 'scrypt',
                        kdfparams: {
                            salt: utils.hexlify(salt).substring(2),
                            n: N,
                            dklen: 32,
                            p: p,
                            r: r
                        },
                        mac: mac.substring(2)
                    }
                };

                // If we have a mnemonic, encrypt it into the JSON wallet
                if (entropy) {
                    var mnemonicIv = utils.randomBytes(16);
                    var mnemonicCounter = new aes.Counter(mnemonicIv);
                    var mnemonicAesCtr = new aes.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);
                    var mnemonicCiphertext = utils.arrayify(mnemonicAesCtr.encrypt(entropy));
                    var now = new Date();
                    var timestamp = (now.getUTCFullYear() + '-' +
                                     zpad(now.getUTCMonth() + 1, 2) + '-' +
                                     zpad(now.getUTCDate(), 2) + 'T' +
                                     zpad(now.getUTCHours(), 2) + '-' +
                                     zpad(now.getUTCMinutes(), 2) + '-' +
                                     zpad(now.getUTCSeconds(), 2) + '.0Z'
                                    );
                    data['x-ethers'] = {
                        client: client,
                        gethFilename: ('UTC--' + timestamp + '--' + data.address),
                        mnemonicCounter: utils.hexlify(mnemonicIv).substring(2),
                        mnemonicCiphertext: utils.hexlify(mnemonicCiphertext).substring(2),
                        version: "0.1"
                    };
                }

                if (progressCallback) { progressCallback(1); }
                resolve(JSON.stringify(data));

            } else if (progressCallback) {
                return progressCallback(progress);
            }
        });
    });
});

module.exports = secretStorage;


/***/ }),

/***/ "../node_modules/ethers/wallet/signing-key.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 *  SigningKey
 *
 *
 */

var secp256k1 = new (__webpack_require__("../node_modules/elliptic/lib/elliptic.js")).ec('secp256k1');
var utils = (function() {
    var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
    return {
        defineProperty: __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty,

        arrayify: convert.arrayify,
        hexlify: convert.hexlify,
        padZeros: convert.padZeros,

        getAddress: __webpack_require__("../node_modules/ethers/utils/address.js").getAddress,

        keccak256: __webpack_require__("../node_modules/ethers/utils/keccak256.js")
    };
})();

var errors = __webpack_require__("../node_modules/ethers/utils/errors.js");


function SigningKey(privateKey) {
    errors.checkNew(this, SigningKey);

    try {
        privateKey = utils.arrayify(privateKey);
        if (privateKey.length !== 32) {
            errors.throwError('exactly 32 bytes required', errors.INVALID_ARGUMENT, { value: privateKey });
        }
    } catch(error) {
        var params = { arg: 'privateKey', reason: error.reason, value: '[REDACTED]' }
        if (error.value) {
            if(typeof(error.value.length) === 'number') {
                params.length = error.value.length;
            }
            params.type = typeof(error.value);
        }
        errors.throwError('invalid private key', error.code, params);
    }

    utils.defineProperty(this, 'privateKey', utils.hexlify(privateKey))

    var keyPair = secp256k1.keyFromPrivate(privateKey);

    utils.defineProperty(this, 'publicKey', '0x' + keyPair.getPublic(true, 'hex'))

    var address = SigningKey.publicKeyToAddress('0x' + keyPair.getPublic(false, 'hex'));
    utils.defineProperty(this, 'address', address)

    utils.defineProperty(this, 'signDigest', function(digest) {
        var signature = keyPair.sign(utils.arrayify(digest), {canonical: true});
        var r = '0x' + signature.r.toString(16);
        var s = '0x' + signature.s.toString(16);

        return {
            recoveryParam: signature.recoveryParam,
            r: utils.hexlify(utils.padZeros(r, 32)),
            s: utils.hexlify(utils.padZeros(s, 32))
        }
    });
}

utils.defineProperty(SigningKey, 'recover', function(digest, r, s, recoveryParam) {
    var signature = {
        r: utils.arrayify(r),
        s: utils.arrayify(s)
    };
    var publicKey = secp256k1.recoverPubKey(utils.arrayify(digest), signature, recoveryParam);
    return SigningKey.publicKeyToAddress('0x' + publicKey.encode('hex', false));
});


utils.defineProperty(SigningKey, 'getPublicKey', function(value, compressed) {
    value = utils.arrayify(value);
    compressed = !!compressed;

    if (value.length === 32) {
        var keyPair = secp256k1.keyFromPrivate(value);
        return '0x' + keyPair.getPublic(compressed, 'hex');

    } else if (value.length === 33) {
        var keyPair = secp256k1.keyFromPublic(value);
        return '0x' + keyPair.getPublic(compressed, 'hex');

    } else if (value.length === 65) {
        var keyPair = secp256k1.keyFromPublic(value);
        return '0x' + keyPair.getPublic(compressed, 'hex');
    }

    throw new Error('invalid value');
});

utils.defineProperty(SigningKey, 'publicKeyToAddress', function(publicKey) {
    publicKey = '0x' + SigningKey.getPublicKey(publicKey, false).slice(4);
    return utils.getAddress('0x' + utils.keccak256(publicKey).substring(26));
});

module.exports = SigningKey;


/***/ }),

/***/ "../node_modules/ethers/wallet/wallet.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var scrypt = __webpack_require__("../node_modules/scrypt-js/scrypt.js");

var utils = (function() {
    var convert = __webpack_require__("../node_modules/ethers/utils/convert.js");
    return {
        defineProperty: __webpack_require__("../node_modules/ethers/utils/properties.js").defineProperty,

        arrayify: convert.arrayify,
        concat: convert.concat,
        hexlify: convert.hexlify,
        stripZeros: convert.stripZeros,
        hexZeroPad: convert.hexZeroPad,

        bigNumberify: __webpack_require__("../node_modules/ethers/utils/bignumber.js").bigNumberify,

        toUtf8Bytes: __webpack_require__("../node_modules/ethers/utils/utf8.js").toUtf8Bytes,

        getAddress: __webpack_require__("../node_modules/ethers/utils/address.js").getAddress,

        keccak256: __webpack_require__("../node_modules/ethers/utils/keccak256.js"),

        //randomBytes: require('../utils/random-bytes'),
        randomBytes: __webpack_require__("../node_modules/ethers/utils/index.js").randomBytes,

        RLP: __webpack_require__("../node_modules/ethers/utils/rlp.js")
    };
})();

var errors = __webpack_require__("../node_modules/ethers/utils/errors.js");

var HDNode = __webpack_require__("../node_modules/ethers/wallet/hdnode.js");

var secretStorage = __webpack_require__("../node_modules/ethers/wallet/secret-storage.js");
var SigningKey = __webpack_require__("../node_modules/ethers/wallet/signing-key.js");

// This ensures we inject a setImmediate into the global space, which
// dramatically improves the performance of the scrypt PBKDF.
__webpack_require__("../node_modules/setimmediate/setImmediate.js");

var defaultPath = "m/44'/60'/0'/0/0";

var transactionFields = [
    {name: 'nonce',    maxLength: 32, },
    {name: 'gasPrice', maxLength: 32, },
    {name: 'gasLimit', maxLength: 32, },
    {name: 'to',          length: 20, },
    {name: 'value',    maxLength: 32, },
    {name: 'data'},
];

function Wallet(privateKey, provider) {
    errors.checkNew(this, Wallet);

    // Make sure we have a valid signing key
    var signingKey = privateKey;
    if (!(privateKey instanceof SigningKey)) {
        signingKey = new SigningKey(privateKey);
    }
    utils.defineProperty(this, 'privateKey', signingKey.privateKey);

    // Provider
    Object.defineProperty(this, 'provider', {
        enumerable: true,
        get: function() { return provider; },
        set: function(value) {
            provider = value;
        }
    });
    if (provider) { this.provider = provider; }

    var defaultGasLimit = 1500000;
    Object.defineProperty(this, 'defaultGasLimit', {
        enumerable: true,
        get: function() { return defaultGasLimit; },
        set: function(value) {
            if (typeof(value) !== 'number') { throw new Error('invalid defaultGasLimit'); }
            defaultGasLimit = value;
        }
    });

    utils.defineProperty(this, 'address', signingKey.address);

    utils.defineProperty(this, 'sign', function(transaction) {
        var chainId = transaction.chainId;
        if (chainId == null && this.provider) { chainId = this.provider.chainId; }
        if (!chainId) { chainId = 0; }

        var raw = [];
        transactionFields.forEach(function(fieldInfo) {
            var value = transaction[fieldInfo.name] || ([]);
            value = utils.arrayify(utils.hexlify(value), fieldInfo.name);

            // Fixed-width field
            if (fieldInfo.length && value.length !== fieldInfo.length && value.length > 0) {
                var error = new Error('invalid ' + fieldInfo.name);
                error.reason = 'wrong length';
                error.value = value;
                throw error;
            }

            // Variable-width (with a maximum)
            if (fieldInfo.maxLength) {
                value = utils.stripZeros(value);
                if (value.length > fieldInfo.maxLength) {
                    var error = new Error('invalid ' + fieldInfo.name);
                    error.reason = 'too long';
                    error.value = value;
                    throw error;
                }
            }

            raw.push(utils.hexlify(value));
        });

        if (chainId) {
            raw.push(utils.hexlify(chainId));
            raw.push('0x');
            raw.push('0x');
        }

        var digest = utils.keccak256(utils.RLP.encode(raw));

        var signature = signingKey.signDigest(digest);

        var v = 27 + signature.recoveryParam
        if (chainId) {
            raw.pop();
            raw.pop();
            raw.pop();
            v += chainId * 2 + 8;
        }

        raw.push(utils.hexlify(v));
        raw.push(utils.stripZeros(utils.arrayify(signature.r)));
        raw.push(utils.stripZeros(utils.arrayify(signature.s)));

        return utils.RLP.encode(raw);
    });
}

utils.defineProperty(Wallet, 'parseTransaction', function(rawTransaction) {
    rawTransaction = utils.hexlify(rawTransaction, 'rawTransaction');
    var signedTransaction = utils.RLP.decode(rawTransaction);
    if (signedTransaction.length !== 9) { throw new Error('invalid transaction'); }

    var raw = [];

    var transaction = {};
    transactionFields.forEach(function(fieldInfo, index) {
        transaction[fieldInfo.name] = signedTransaction[index];
        raw.push(signedTransaction[index]);
    });

    if (transaction.to) {
        if (transaction.to == '0x') {
            delete transaction.to;
        } else {
            transaction.to = utils.getAddress(transaction.to);
        }
    }

    ['gasPrice', 'gasLimit', 'nonce', 'value'].forEach(function(name) {
        if (!transaction[name]) { return; }
        if (transaction[name].length === 0) {
            transaction[name] = utils.bigNumberify(0);
        } else {
            transaction[name] = utils.bigNumberify(transaction[name]);
        }
    });

    if (transaction.nonce) {
        transaction.nonce = transaction.nonce.toNumber();
    } else {
        transaction.nonce = 0;
    }

    var v = utils.arrayify(signedTransaction[6]);
    var r = utils.arrayify(signedTransaction[7]);
    var s = utils.arrayify(signedTransaction[8]);

    if (v.length >= 1 && r.length >= 1 && r.length <= 32 && s.length >= 1 && s.length <= 32) {
        transaction.v = utils.bigNumberify(v).toNumber();
        transaction.r = signedTransaction[7];
        transaction.s = signedTransaction[8];

        var chainId = (transaction.v - 35) / 2;
        if (chainId < 0) { chainId = 0; }
        chainId = parseInt(chainId);

        transaction.chainId = chainId;

        var recoveryParam = transaction.v - 27;

        if (chainId) {
            raw.push(utils.hexlify(chainId));
            raw.push('0x');
            raw.push('0x');
            recoveryParam -= chainId * 2 + 8;
        }

        var digest = utils.keccak256(utils.RLP.encode(raw));
        try {
            transaction.from = SigningKey.recover(digest, r, s, recoveryParam);
        } catch (error) {
            console.log(error);
        }
    }


    return transaction;
});

utils.defineProperty(Wallet.prototype, 'getAddress', function() {
    return this.address;
});

utils.defineProperty(Wallet.prototype, 'getBalance', function(blockTag) {
    if (!this.provider) { throw new Error('missing provider'); }
    return this.provider.getBalance(this.address, blockTag);
});

utils.defineProperty(Wallet.prototype, 'getTransactionCount', function(blockTag) {
    if (!this.provider) { throw new Error('missing provider'); }
    return this.provider.getTransactionCount(this.address, blockTag);
});

utils.defineProperty(Wallet.prototype, 'estimateGas', function(transaction) {
    if (!this.provider) { throw new Error('missing provider'); }

    var calculate = {};
    ['from', 'to', 'data', 'value'].forEach(function(key) {
        if (transaction[key] == null) { return; }
        calculate[key] = transaction[key];
    });

    if (transaction.from == null) { calculate.from = this.address; }

    return this.provider.estimateGas(calculate);
});

utils.defineProperty(Wallet.prototype, 'sendTransaction', function(transaction) {
    if (!this.provider) { throw new Error('missing provider'); }

    if (!transaction || typeof(transaction) !== 'object') {
        throw new Error('invalid transaction object');
    }

    var gasLimit = transaction.gasLimit;
    if (gasLimit == null) { gasLimit = this.defaultGasLimit; }

    var self = this;

    var gasPricePromise = null;
    if (transaction.gasPrice) {
        gasPricePromise = Promise.resolve(transaction.gasPrice);
    } else {
        gasPricePromise = this.provider.getGasPrice();
    }

    var noncePromise = null;
    if (transaction.nonce) {
        noncePromise = Promise.resolve(transaction.nonce);
    } else {
        noncePromise = this.provider.getTransactionCount(self.address, 'pending');
    }

    var chainId = this.provider.chainId;

    var toPromise = null;
    if (transaction.to) {
        toPromise = this.provider.resolveName(transaction.to);
    } else {
        toPromise = Promise.resolve(undefined);
    }

    var data = utils.hexlify(transaction.data || '0x');
    var value = utils.hexlify(transaction.value || 0);

    return Promise.all([gasPricePromise, noncePromise, toPromise]).then(function(results) {
        var signedTransaction = self.sign({
            to: results[2],
            data: data,
            gasLimit: gasLimit,
            gasPrice: results[0],
            nonce: results[1],
            value: value,
            chainId: chainId
        });

        return self.provider.sendTransaction(signedTransaction).then(function(hash) {
            var transaction = Wallet.parseTransaction(signedTransaction);
            transaction.hash = hash;
            transaction.wait = function() {
                return self.provider.waitForTransaction(hash);
            };
            return transaction;
        });
    });
});

utils.defineProperty(Wallet.prototype, 'send', function(addressOrName, amountWei, options) {
    if (!options) { options = {}; }

    return this.sendTransaction({
        to: addressOrName,
        gasLimit: options.gasLimit,
        gasPrice: options.gasPrice,
        nonce: options.nonce,
        value: amountWei,
    });
});

utils.defineProperty(Wallet, 'hashMessage', function (message) {
    var payload = utils.concat([
        utils.toUtf8Bytes('\x19Ethereum Signed Message:\n'),
        utils.toUtf8Bytes(String(message.length)),
        ((typeof(message) === 'string') ? utils.toUtf8Bytes(message): message)
    ]);
    return utils.keccak256(payload);
});

utils.defineProperty(Wallet.prototype, 'signMessage', function(message) {
    var signingKey = new SigningKey(this.privateKey);
    var sig = signingKey.signDigest(Wallet.hashMessage(message));

    return (utils.hexZeroPad(sig.r, 32) + utils.hexZeroPad(sig.s, 32).substring(2) + (sig.recoveryParam ? '1c': '1b'));
});

utils.defineProperty(Wallet, 'verifyMessage', function(message, signature) {
    signature = utils.hexlify(signature);
    if (signature.length != 132) { throw new Error('invalid signature'); }
    var digest = Wallet.hashMessage(message);

    var recoveryParam = parseInt(signature.substring(130), 16);
    if (recoveryParam >= 27) { recoveryParam -= 27; }
    if (recoveryParam < 0) { throw new Error('invalid signature'); }

    return SigningKey.recover(
        digest,
        signature.substring(0, 66),
        '0x' + signature.substring(66, 130),
        recoveryParam
    );
});

utils.defineProperty(Wallet.prototype, 'encrypt', function(password, options, progressCallback) {
    if (typeof(options) === 'function' && !progressCallback) {
        progressCallback = options;
        options = {};
    }

    if (progressCallback && typeof(progressCallback) !== 'function') {
        throw new Error('invalid callback');
    }

    if (!options) { options = {}; }

    if (this.mnemonic) {
        // Make sure we don't accidentally bubble the mnemonic up the call-stack
        var safeOptions = {};
        for (var key in options) { safeOptions[key] = options[key]; }
        options = safeOptions;

        // Set the mnemonic and path
        options.mnemonic = this.mnemonic;
        options.path = this.path
    }

    return secretStorage.encrypt(this.privateKey, password, options, progressCallback);
});


utils.defineProperty(Wallet, 'isEncryptedWallet', function(json) {
    return (secretStorage.isValidWallet(json) || secretStorage.isCrowdsaleWallet(json));
});



utils.defineProperty(Wallet, 'createRandom', function(options) {
    var entropy = utils.randomBytes(16);

    if (!options) { options = { }; }

    if (options.extraEntropy) {
        entropy = utils.keccak256(utils.concat([entropy, options.extraEntropy])).substring(0, 34);
    }

    var mnemonic = HDNode.entropyToMnemonic(entropy);
    return Wallet.fromMnemonic(mnemonic, options.path);
});


utils.defineProperty(Wallet, 'fromEncryptedWallet', function(json, password, progressCallback) {
    if (progressCallback && typeof(progressCallback) !== 'function') {
        throw new Error('invalid callback');
    }

    return new Promise(function(resolve, reject) {

        if (secretStorage.isCrowdsaleWallet(json)) {
            try {
                var privateKey = secretStorage.decryptCrowdsale(json, password);
                resolve(new Wallet(privateKey));
            } catch (error) {
                reject(error);
            }

        } else if (secretStorage.isValidWallet(json)) {

            secretStorage.decrypt(json, password, progressCallback).then(function(signingKey) {
                var wallet = new Wallet(signingKey);
                if (signingKey.mnemonic && signingKey.path) {
                    utils.defineProperty(wallet, 'mnemonic', signingKey.mnemonic);
                    utils.defineProperty(wallet, 'path', signingKey.path);
                }
                resolve(wallet);
                return null;
            }, function(error) {
                reject(error);
            }).catch(function(error) { reject(error); });

        } else {
            reject('invalid wallet JSON');
        }
    });
});

utils.defineProperty(Wallet, 'fromMnemonic', function(mnemonic, path) {
    if (!path) { path = defaultPath; }

    var hdnode = HDNode.fromMnemonic(mnemonic).derivePath(path);

    var wallet = new Wallet(hdnode.privateKey);
    utils.defineProperty(wallet, 'mnemonic', mnemonic);
    utils.defineProperty(wallet, 'path', path);

    return wallet;
});


utils.defineProperty(Wallet, 'fromBrainWallet', function(username, password, progressCallback) {
    if (progressCallback && typeof(progressCallback) !== 'function') {
        throw new Error('invalid callback');
    }

    if (typeof(username) === 'string') {
        username =  utils.toUtf8Bytes(username, 'NFKC');
    } else {
        username = utils.arrayify(username, 'password');
    }

    if (typeof(password) === 'string') {
        password =  utils.toUtf8Bytes(password, 'NFKC');
    } else {
        password = utils.arrayify(password, 'password');
    }

    return new Promise(function(resolve, reject) {
        scrypt(password, username, (1 << 18), 8, 1, 32, function(error, progress, key) {
            if (error) {
                reject(error);

            } else if (key) {
                resolve(new Wallet(utils.hexlify(key)));

            } else if (progressCallback) {
                return progressCallback(progress);
            }
        });
    });
});

//utils.defineProperty(Wallet, 'isCrowdsaleWallet', secretStorage.isCrowdsaleWallet);

//utils.defineProperty(Wallet, 'decryptCrowdsale', function(json, password) {
//    return new Wallet(secretStorage.decryptCrowdsale(json, password));
//});

module.exports = Wallet;


/***/ }),

/***/ "../node_modules/ethers/wallet/words.json":
/***/ (function(module, exports) {

module.exports = "AbandonAbilityAbleAboutAboveAbsentAbsorbAbstractAbsurdAbuseAccessAccidentAccountAccuseAchieveAcidAcousticAcquireAcrossActActionActorActressActualAdaptAddAddictAddressAdjustAdmitAdultAdvanceAdviceAerobicAffairAffordAfraidAgainAgeAgentAgreeAheadAimAirAirportAisleAlarmAlbumAlcoholAlertAlienAllAlleyAllowAlmostAloneAlphaAlreadyAlsoAlterAlwaysAmateurAmazingAmongAmountAmusedAnalystAnchorAncientAngerAngleAngryAnimalAnkleAnnounceAnnualAnotherAnswerAntennaAntiqueAnxietyAnyApartApologyAppearAppleApproveAprilArchArcticAreaArenaArgueArmArmedArmorArmyAroundArrangeArrestArriveArrowArtArtefactArtistArtworkAskAspectAssaultAssetAssistAssumeAsthmaAthleteAtomAttackAttendAttitudeAttractAuctionAuditAugustAuntAuthorAutoAutumnAverageAvocadoAvoidAwakeAwareAwayAwesomeAwfulAwkwardAxisBabyBachelorBaconBadgeBagBalanceBalconyBallBambooBananaBannerBarBarelyBargainBarrelBaseBasicBasketBattleBeachBeanBeautyBecauseBecomeBeefBeforeBeginBehaveBehindBelieveBelowBeltBenchBenefitBestBetrayBetterBetweenBeyondBicycleBidBikeBindBiologyBirdBirthBitterBlackBladeBlameBlanketBlastBleakBlessBlindBloodBlossomBlouseBlueBlurBlushBoardBoatBodyBoilBombBoneBonusBookBoostBorderBoringBorrowBossBottomBounceBoxBoyBracketBrainBrandBrassBraveBreadBreezeBrickBridgeBriefBrightBringBriskBroccoliBrokenBronzeBroomBrotherBrownBrushBubbleBuddyBudgetBuffaloBuildBulbBulkBulletBundleBunkerBurdenBurgerBurstBusBusinessBusyButterBuyerBuzzCabbageCabinCableCactusCageCakeCallCalmCameraCampCanCanalCancelCandyCannonCanoeCanvasCanyonCapableCapitalCaptainCarCarbonCardCargoCarpetCarryCartCaseCashCasinoCastleCasualCatCatalogCatchCategoryCattleCaughtCauseCautionCaveCeilingCeleryCementCensusCenturyCerealCertainChairChalkChampionChangeChaosChapterChargeChaseChatCheapCheckCheeseChefCherryChestChickenChiefChildChimneyChoiceChooseChronicChuckleChunkChurnCigarCinnamonCircleCitizenCityCivilClaimClapClarifyClawClayCleanClerkCleverClickClientCliffClimbClinicClipClockClogCloseClothCloudClownClubClumpClusterClutchCoachCoastCoconutCodeCoffeeCoilCoinCollectColorColumnCombineComeComfortComicCommonCompanyConcertConductConfirmCongressConnectConsiderControlConvinceCookCoolCopperCopyCoralCoreCornCorrectCostCottonCouchCountryCoupleCourseCousinCoverCoyoteCrackCradleCraftCramCraneCrashCraterCrawlCrazyCreamCreditCreekCrewCricketCrimeCrispCriticCropCrossCrouchCrowdCrucialCruelCruiseCrumbleCrunchCrushCryCrystalCubeCultureCupCupboardCuriousCurrentCurtainCurveCushionCustomCuteCycleDadDamageDampDanceDangerDaringDashDaughterDawnDayDealDebateDebrisDecadeDecemberDecideDeclineDecorateDecreaseDeerDefenseDefineDefyDegreeDelayDeliverDemandDemiseDenialDentistDenyDepartDependDepositDepthDeputyDeriveDescribeDesertDesignDeskDespairDestroyDetailDetectDevelopDeviceDevoteDiagramDialDiamondDiaryDiceDieselDietDifferDigitalDignityDilemmaDinnerDinosaurDirectDirtDisagreeDiscoverDiseaseDishDismissDisorderDisplayDistanceDivertDivideDivorceDizzyDoctorDocumentDogDollDolphinDomainDonateDonkeyDonorDoorDoseDoubleDoveDraftDragonDramaDrasticDrawDreamDressDriftDrillDrinkDripDriveDropDrumDryDuckDumbDuneDuringDustDutchDutyDwarfDynamicEagerEagleEarlyEarnEarthEasilyEastEasyEchoEcologyEconomyEdgeEditEducateEffortEggEightEitherElbowElderElectricElegantElementElephantElevatorEliteElseEmbarkEmbodyEmbraceEmergeEmotionEmployEmpowerEmptyEnableEnactEndEndlessEndorseEnemyEnergyEnforceEngageEngineEnhanceEnjoyEnlistEnoughEnrichEnrollEnsureEnterEntireEntryEnvelopeEpisodeEqualEquipEraEraseErodeErosionErrorEruptEscapeEssayEssenceEstateEternalEthicsEvidenceEvilEvokeEvolveExactExampleExcessExchangeExciteExcludeExcuseExecuteExerciseExhaustExhibitExileExistExitExoticExpandExpectExpireExplainExposeExpressExtendExtraEyeEyebrowFabricFaceFacultyFadeFaintFaithFallFalseFameFamilyFamousFanFancyFantasyFarmFashionFatFatalFatherFatigueFaultFavoriteFeatureFebruaryFederalFeeFeedFeelFemaleFenceFestivalFetchFeverFewFiberFictionFieldFigureFileFilmFilterFinalFindFineFingerFinishFireFirmFirstFiscalFishFitFitnessFixFlagFlameFlashFlatFlavorFleeFlightFlipFloatFlockFloorFlowerFluidFlushFlyFoamFocusFogFoilFoldFollowFoodFootForceForestForgetForkFortuneForumForwardFossilFosterFoundFoxFragileFrameFrequentFreshFriendFringeFrogFrontFrostFrownFrozenFruitFuelFunFunnyFurnaceFuryFutureGadgetGainGalaxyGalleryGameGapGarageGarbageGardenGarlicGarmentGasGaspGateGatherGaugeGazeGeneralGeniusGenreGentleGenuineGestureGhostGiantGiftGiggleGingerGiraffeGirlGiveGladGlanceGlareGlassGlideGlimpseGlobeGloomGloryGloveGlowGlueGoatGoddessGoldGoodGooseGorillaGospelGossipGovernGownGrabGraceGrainGrantGrapeGrassGravityGreatGreenGridGriefGritGroceryGroupGrowGruntGuardGuessGuideGuiltGuitarGunGymHabitHairHalfHammerHamsterHandHappyHarborHardHarshHarvestHatHaveHawkHazardHeadHealthHeartHeavyHedgehogHeightHelloHelmetHelpHenHeroHiddenHighHillHintHipHireHistoryHobbyHockeyHoldHoleHolidayHollowHomeHoneyHoodHopeHornHorrorHorseHospitalHostHotelHourHoverHubHugeHumanHumbleHumorHundredHungryHuntHurdleHurryHurtHusbandHybridIceIconIdeaIdentifyIdleIgnoreIllIllegalIllnessImageImitateImmenseImmuneImpactImposeImproveImpulseInchIncludeIncomeIncreaseIndexIndicateIndoorIndustryInfantInflictInformInhaleInheritInitialInjectInjuryInmateInnerInnocentInputInquiryInsaneInsectInsideInspireInstallIntactInterestIntoInvestInviteInvolveIronIslandIsolateIssueItemIvoryJacketJaguarJarJazzJealousJeansJellyJewelJobJoinJokeJourneyJoyJudgeJuiceJumpJungleJuniorJunkJustKangarooKeenKeepKetchupKeyKickKidKidneyKindKingdomKissKitKitchenKiteKittenKiwiKneeKnifeKnockKnowLabLabelLaborLadderLadyLakeLampLanguageLaptopLargeLaterLatinLaughLaundryLavaLawLawnLawsuitLayerLazyLeaderLeafLearnLeaveLectureLeftLegLegalLegendLeisureLemonLendLengthLensLeopardLessonLetterLevelLiarLibertyLibraryLicenseLifeLiftLightLikeLimbLimitLinkLionLiquidListLittleLiveLizardLoadLoanLobsterLocalLockLogicLonelyLongLoopLotteryLoudLoungeLoveLoyalLuckyLuggageLumberLunarLunchLuxuryLyricsMachineMadMagicMagnetMaidMailMainMajorMakeMammalManManageMandateMangoMansionManualMapleMarbleMarchMarginMarineMarketMarriageMaskMassMasterMatchMaterialMathMatrixMatterMaximumMazeMeadowMeanMeasureMeatMechanicMedalMediaMelodyMeltMemberMemoryMentionMenuMercyMergeMeritMerryMeshMessageMetalMethodMiddleMidnightMilkMillionMimicMindMinimumMinorMinuteMiracleMirrorMiseryMissMistakeMixMixedMixtureMobileModelModifyMomMomentMonitorMonkeyMonsterMonthMoonMoralMoreMorningMosquitoMotherMotionMotorMountainMouseMoveMovieMuchMuffinMuleMultiplyMuscleMuseumMushroomMusicMustMutualMyselfMysteryMythNaiveNameNapkinNarrowNastyNationNatureNearNeckNeedNegativeNeglectNeitherNephewNerveNestNetNetworkNeutralNeverNewsNextNiceNightNobleNoiseNomineeNoodleNormalNorthNoseNotableNoteNothingNoticeNovelNowNuclearNumberNurseNutOakObeyObjectObligeObscureObserveObtainObviousOccurOceanOctoberOdorOffOfferOfficeOftenOilOkayOldOliveOlympicOmitOnceOneOnionOnlineOnlyOpenOperaOpinionOpposeOptionOrangeOrbitOrchardOrderOrdinaryOrganOrientOriginalOrphanOstrichOtherOutdoorOuterOutputOutsideOvalOvenOverOwnOwnerOxygenOysterOzonePactPaddlePagePairPalacePalmPandaPanelPanicPantherPaperParadeParentParkParrotPartyPassPatchPathPatientPatrolPatternPausePavePaymentPeacePeanutPearPeasantPelicanPenPenaltyPencilPeoplePepperPerfectPermitPersonPetPhonePhotoPhrasePhysicalPianoPicnicPicturePiecePigPigeonPillPilotPinkPioneerPipePistolPitchPizzaPlacePlanetPlasticPlatePlayPleasePledgePluckPlugPlungePoemPoetPointPolarPolePolicePondPonyPoolPopularPortionPositionPossiblePostPotatoPotteryPovertyPowderPowerPracticePraisePredictPreferPreparePresentPrettyPreventPricePridePrimaryPrintPriorityPrisonPrivatePrizeProblemProcessProduceProfitProgramProjectPromoteProofPropertyProsperProtectProudProvidePublicPuddingPullPulpPulsePumpkinPunchPupilPuppyPurchasePurityPurposePursePushPutPuzzlePyramidQualityQuantumQuarterQuestionQuickQuitQuizQuoteRabbitRaccoonRaceRackRadarRadioRailRainRaiseRallyRampRanchRandomRangeRapidRareRateRatherRavenRawRazorReadyRealReasonRebelRebuildRecallReceiveRecipeRecordRecycleReduceReflectReformRefuseRegionRegretRegularRejectRelaxReleaseReliefRelyRemainRememberRemindRemoveRenderRenewRentReopenRepairRepeatReplaceReportRequireRescueResembleResistResourceResponseResultRetireRetreatReturnReunionRevealReviewRewardRhythmRibRibbonRiceRichRideRidgeRifleRightRigidRingRiotRippleRiskRitualRivalRiverRoadRoastRobotRobustRocketRomanceRoofRookieRoomRoseRotateRoughRoundRouteRoyalRubberRudeRugRuleRunRunwayRuralSadSaddleSadnessSafeSailSaladSalmonSalonSaltSaluteSameSampleSandSatisfySatoshiSauceSausageSaveSayScaleScanScareScatterSceneSchemeSchoolScienceScissorsScorpionScoutScrapScreenScriptScrubSeaSearchSeasonSeatSecondSecretSectionSecuritySeedSeekSegmentSelectSellSeminarSeniorSenseSentenceSeriesServiceSessionSettleSetupSevenShadowShaftShallowShareShedShellSheriffShieldShiftShineShipShiverShockShoeShootShopShortShoulderShoveShrimpShrugShuffleShySiblingSickSideSiegeSightSignSilentSilkSillySilverSimilarSimpleSinceSingSirenSisterSituateSixSizeSkateSketchSkiSkillSkinSkirtSkullSlabSlamSleepSlenderSliceSlideSlightSlimSloganSlotSlowSlushSmallSmartSmileSmokeSmoothSnackSnakeSnapSniffSnowSoapSoccerSocialSockSodaSoftSolarSoldierSolidSolutionSolveSomeoneSongSoonSorrySortSoulSoundSoupSourceSouthSpaceSpareSpatialSpawnSpeakSpecialSpeedSpellSpendSphereSpiceSpiderSpikeSpinSpiritSplitSpoilSponsorSpoonSportSpotSpraySpreadSpringSpySquareSqueezeSquirrelStableStadiumStaffStageStairsStampStandStartStateStaySteakSteelStemStepStereoStickStillStingStockStomachStoneStoolStoryStoveStrategyStreetStrikeStrongStruggleStudentStuffStumbleStyleSubjectSubmitSubwaySuccessSuchSuddenSufferSugarSuggestSuitSummerSunSunnySunsetSuperSupplySupremeSureSurfaceSurgeSurpriseSurroundSurveySuspectSustainSwallowSwampSwapSwarmSwearSweetSwiftSwimSwingSwitchSwordSymbolSymptomSyrupSystemTableTackleTagTailTalentTalkTankTapeTargetTaskTasteTattooTaxiTeachTeamTellTenTenantTennisTentTermTestTextThankThatThemeThenTheoryThereTheyThingThisThoughtThreeThriveThrowThumbThunderTicketTideTigerTiltTimberTimeTinyTipTiredTissueTitleToastTobaccoTodayToddlerToeTogetherToiletTokenTomatoTomorrowToneTongueTonightToolToothTopTopicToppleTorchTornadoTortoiseTossTotalTouristTowardTowerTownToyTrackTradeTrafficTragicTrainTransferTrapTrashTravelTrayTreatTreeTrendTrialTribeTrickTriggerTrimTripTrophyTroubleTruckTrueTrulyTrumpetTrustTruthTryTubeTuitionTumbleTunaTunnelTurkeyTurnTurtleTwelveTwentyTwiceTwinTwistTwoTypeTypicalUglyUmbrellaUnableUnawareUncleUncoverUnderUndoUnfairUnfoldUnhappyUniformUniqueUnitUniverseUnknownUnlockUntilUnusualUnveilUpdateUpgradeUpholdUponUpperUpsetUrbanUrgeUsageUseUsedUsefulUselessUsualUtilityVacantVacuumVagueValidValleyValveVanVanishVaporVariousVastVaultVehicleVelvetVendorVentureVenueVerbVerifyVersionVeryVesselVeteranViableVibrantViciousVictoryVideoViewVillageVintageViolinVirtualVirusVisaVisitVisualVitalVividVocalVoiceVoidVolcanoVolumeVoteVoyageWageWagonWaitWalkWallWalnutWantWarfareWarmWarriorWashWaspWasteWaterWaveWayWealthWeaponWearWeaselWeatherWebWeddingWeekendWeirdWelcomeWestWetWhaleWhatWheatWheelWhenWhereWhipWhisperWideWidthWifeWildWillWinWindowWineWingWinkWinnerWinterWireWisdomWiseWishWitnessWolfWomanWonderWoodWoolWordWorkWorldWorryWorthWrapWreckWrestleWristWriteWrongYardYearYellowYouYoungYouthZebraZeroZoneZoo"

/***/ }),

/***/ "../node_modules/hash.js/lib/hash.js":
/***/ (function(module, exports, __webpack_require__) {

var hash = exports;

hash.utils = __webpack_require__("../node_modules/hash.js/lib/hash/utils.js");
hash.common = __webpack_require__("../node_modules/hash.js/lib/hash/common.js");
hash.sha = __webpack_require__("../node_modules/hash.js/lib/hash/sha.js");
hash.ripemd = __webpack_require__("../node_modules/hash.js/lib/hash/ripemd.js");
hash.hmac = __webpack_require__("../node_modules/hash.js/lib/hash/hmac.js");

// Proxy hash functions to the main object
hash.sha1 = hash.sha.sha1;
hash.sha256 = hash.sha.sha256;
hash.sha224 = hash.sha.sha224;
hash.sha384 = hash.sha.sha384;
hash.sha512 = hash.sha.sha512;
hash.ripemd160 = hash.ripemd.ripemd160;


/***/ }),

/***/ "../node_modules/hash.js/lib/hash/common.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/hash.js/lib/hash/utils.js");
var assert = __webpack_require__("../node_modules/minimalistic-assert/index.js");

function BlockHash() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = 'big';

  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
exports.BlockHash = BlockHash;

BlockHash.prototype.update = function update(msg, enc) {
  // Convert message to array, pad it, and join into 32bit blocks
  msg = utils.toArray(msg, enc);
  if (!this.pending)
    this.pending = msg;
  else
    this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;

  // Enough data, try updating
  if (this.pending.length >= this._delta8) {
    msg = this.pending;

    // Process pending data in blocks
    var r = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r, msg.length);
    if (this.pending.length === 0)
      this.pending = null;

    msg = utils.join32(msg, 0, msg.length - r, this.endian);
    for (var i = 0; i < msg.length; i += this._delta32)
      this._update(msg, i, i + this._delta32);
  }

  return this;
};

BlockHash.prototype.digest = function digest(enc) {
  this.update(this._pad());
  assert(this.pending === null);

  return this._digest(enc);
};

BlockHash.prototype._pad = function pad() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - ((len + this.padLength) % bytes);
  var res = new Array(k + this.padLength);
  res[0] = 0x80;
  for (var i = 1; i < k; i++)
    res[i] = 0;

  // Append length
  len <<= 3;
  if (this.endian === 'big') {
    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;

    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = len & 0xff;
  } else {
    res[i++] = len & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;

    for (t = 8; t < this.padLength; t++)
      res[i++] = 0;
  }

  return res;
};


/***/ }),

/***/ "../node_modules/hash.js/lib/hash/hmac.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/hash.js/lib/hash/utils.js");
var assert = __webpack_require__("../node_modules/minimalistic-assert/index.js");

function Hmac(hash, key, enc) {
  if (!(this instanceof Hmac))
    return new Hmac(hash, key, enc);
  this.Hash = hash;
  this.blockSize = hash.blockSize / 8;
  this.outSize = hash.outSize / 8;
  this.inner = null;
  this.outer = null;

  this._init(utils.toArray(key, enc));
}
module.exports = Hmac;

Hmac.prototype._init = function init(key) {
  // Shorten key, if needed
  if (key.length > this.blockSize)
    key = new this.Hash().update(key).digest();
  assert(key.length <= this.blockSize);

  // Add padding to key
  for (var i = key.length; i < this.blockSize; i++)
    key.push(0);

  for (i = 0; i < key.length; i++)
    key[i] ^= 0x36;
  this.inner = new this.Hash().update(key);

  // 0x36 ^ 0x5c = 0x6a
  for (i = 0; i < key.length; i++)
    key[i] ^= 0x6a;
  this.outer = new this.Hash().update(key);
};

Hmac.prototype.update = function update(msg, enc) {
  this.inner.update(msg, enc);
  return this;
};

Hmac.prototype.digest = function digest(enc) {
  this.outer.update(this.inner.digest());
  return this.outer.digest(enc);
};


/***/ }),

/***/ "../node_modules/hash.js/lib/hash/ripemd.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/hash.js/lib/hash/utils.js");
var common = __webpack_require__("../node_modules/hash.js/lib/hash/common.js");

var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_3 = utils.sum32_3;
var sum32_4 = utils.sum32_4;
var BlockHash = common.BlockHash;

function RIPEMD160() {
  if (!(this instanceof RIPEMD160))
    return new RIPEMD160();

  BlockHash.call(this);

  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
  this.endian = 'little';
}
utils.inherits(RIPEMD160, BlockHash);
exports.ripemd160 = RIPEMD160;

RIPEMD160.blockSize = 512;
RIPEMD160.outSize = 160;
RIPEMD160.hmacStrength = 192;
RIPEMD160.padLength = 64;

RIPEMD160.prototype._update = function update(msg, start) {
  var A = this.h[0];
  var B = this.h[1];
  var C = this.h[2];
  var D = this.h[3];
  var E = this.h[4];
  var Ah = A;
  var Bh = B;
  var Ch = C;
  var Dh = D;
  var Eh = E;
  for (var j = 0; j < 80; j++) {
    var T = sum32(
      rotl32(
        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
        s[j]),
      E);
    A = E;
    E = D;
    D = rotl32(C, 10);
    C = B;
    B = T;
    T = sum32(
      rotl32(
        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
        sh[j]),
      Eh);
    Ah = Eh;
    Eh = Dh;
    Dh = rotl32(Ch, 10);
    Ch = Bh;
    Bh = T;
  }
  T = sum32_3(this.h[1], C, Dh);
  this.h[1] = sum32_3(this.h[2], D, Eh);
  this.h[2] = sum32_3(this.h[3], E, Ah);
  this.h[3] = sum32_3(this.h[4], A, Bh);
  this.h[4] = sum32_3(this.h[0], B, Ch);
  this.h[0] = T;
};

RIPEMD160.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'little');
  else
    return utils.split32(this.h, 'little');
};

function f(j, x, y, z) {
  if (j <= 15)
    return x ^ y ^ z;
  else if (j <= 31)
    return (x & y) | ((~x) & z);
  else if (j <= 47)
    return (x | (~y)) ^ z;
  else if (j <= 63)
    return (x & z) | (y & (~z));
  else
    return x ^ (y | (~z));
}

function K(j) {
  if (j <= 15)
    return 0x00000000;
  else if (j <= 31)
    return 0x5a827999;
  else if (j <= 47)
    return 0x6ed9eba1;
  else if (j <= 63)
    return 0x8f1bbcdc;
  else
    return 0xa953fd4e;
}

function Kh(j) {
  if (j <= 15)
    return 0x50a28be6;
  else if (j <= 31)
    return 0x5c4dd124;
  else if (j <= 47)
    return 0x6d703ef3;
  else if (j <= 63)
    return 0x7a6d76e9;
  else
    return 0x00000000;
}

var r = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
];

var rh = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
];

var s = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
];

var sh = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
];


/***/ }),

/***/ "../node_modules/hash.js/lib/hash/sha.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.sha1 = __webpack_require__("../node_modules/hash.js/lib/hash/sha/1.js");
exports.sha224 = __webpack_require__("../node_modules/hash.js/lib/hash/sha/224.js");
exports.sha256 = __webpack_require__("../node_modules/hash.js/lib/hash/sha/256.js");
exports.sha384 = __webpack_require__("../node_modules/hash.js/lib/hash/sha/384.js");
exports.sha512 = __webpack_require__("../node_modules/hash.js/lib/hash/sha/512.js");


/***/ }),

/***/ "../node_modules/hash.js/lib/hash/sha/1.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/hash.js/lib/hash/utils.js");
var common = __webpack_require__("../node_modules/hash.js/lib/hash/common.js");
var shaCommon = __webpack_require__("../node_modules/hash.js/lib/hash/sha/common.js");

var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_5 = utils.sum32_5;
var ft_1 = shaCommon.ft_1;
var BlockHash = common.BlockHash;

var sha1_K = [
  0x5A827999, 0x6ED9EBA1,
  0x8F1BBCDC, 0xCA62C1D6
];

function SHA1() {
  if (!(this instanceof SHA1))
    return new SHA1();

  BlockHash.call(this);
  this.h = [
    0x67452301, 0xefcdab89, 0x98badcfe,
    0x10325476, 0xc3d2e1f0 ];
  this.W = new Array(80);
}

utils.inherits(SHA1, BlockHash);
module.exports = SHA1;

SHA1.blockSize = 512;
SHA1.outSize = 160;
SHA1.hmacStrength = 80;
SHA1.padLength = 64;

SHA1.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];

  for(; i < W.length; i++)
    W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];

  for (i = 0; i < W.length; i++) {
    var s = ~~(i / 20);
    var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
    e = d;
    d = c;
    c = rotl32(b, 30);
    b = a;
    a = t;
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
};

SHA1.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};


/***/ }),

/***/ "../node_modules/hash.js/lib/hash/sha/224.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/hash.js/lib/hash/utils.js");
var SHA256 = __webpack_require__("../node_modules/hash.js/lib/hash/sha/256.js");

function SHA224() {
  if (!(this instanceof SHA224))
    return new SHA224();

  SHA256.call(this);
  this.h = [
    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
}
utils.inherits(SHA224, SHA256);
module.exports = SHA224;

SHA224.blockSize = 512;
SHA224.outSize = 224;
SHA224.hmacStrength = 192;
SHA224.padLength = 64;

SHA224.prototype._digest = function digest(enc) {
  // Just truncate output
  if (enc === 'hex')
    return utils.toHex32(this.h.slice(0, 7), 'big');
  else
    return utils.split32(this.h.slice(0, 7), 'big');
};



/***/ }),

/***/ "../node_modules/hash.js/lib/hash/sha/256.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/hash.js/lib/hash/utils.js");
var common = __webpack_require__("../node_modules/hash.js/lib/hash/common.js");
var shaCommon = __webpack_require__("../node_modules/hash.js/lib/hash/sha/common.js");
var assert = __webpack_require__("../node_modules/minimalistic-assert/index.js");

var sum32 = utils.sum32;
var sum32_4 = utils.sum32_4;
var sum32_5 = utils.sum32_5;
var ch32 = shaCommon.ch32;
var maj32 = shaCommon.maj32;
var s0_256 = shaCommon.s0_256;
var s1_256 = shaCommon.s1_256;
var g0_256 = shaCommon.g0_256;
var g1_256 = shaCommon.g1_256;

var BlockHash = common.BlockHash;

var sha256_K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

function SHA256() {
  if (!(this instanceof SHA256))
    return new SHA256();

  BlockHash.call(this);
  this.h = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  this.k = sha256_K;
  this.W = new Array(64);
}
utils.inherits(SHA256, BlockHash);
module.exports = SHA256;

SHA256.blockSize = 512;
SHA256.outSize = 256;
SHA256.hmacStrength = 192;
SHA256.padLength = 64;

SHA256.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f = this.h[5];
  var g = this.h[6];
  var h = this.h[7];

  assert(this.k.length === W.length);
  for (i = 0; i < W.length; i++) {
    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
    var T2 = sum32(s0_256(a), maj32(a, b, c));
    h = g;
    g = f;
    f = e;
    e = sum32(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32(T1, T2);
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
  this.h[5] = sum32(this.h[5], f);
  this.h[6] = sum32(this.h[6], g);
  this.h[7] = sum32(this.h[7], h);
};

SHA256.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};


/***/ }),

/***/ "../node_modules/hash.js/lib/hash/sha/384.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/hash.js/lib/hash/utils.js");

var SHA512 = __webpack_require__("../node_modules/hash.js/lib/hash/sha/512.js");

function SHA384() {
  if (!(this instanceof SHA384))
    return new SHA384();

  SHA512.call(this);
  this.h = [
    0xcbbb9d5d, 0xc1059ed8,
    0x629a292a, 0x367cd507,
    0x9159015a, 0x3070dd17,
    0x152fecd8, 0xf70e5939,
    0x67332667, 0xffc00b31,
    0x8eb44a87, 0x68581511,
    0xdb0c2e0d, 0x64f98fa7,
    0x47b5481d, 0xbefa4fa4 ];
}
utils.inherits(SHA384, SHA512);
module.exports = SHA384;

SHA384.blockSize = 1024;
SHA384.outSize = 384;
SHA384.hmacStrength = 192;
SHA384.padLength = 128;

SHA384.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h.slice(0, 12), 'big');
  else
    return utils.split32(this.h.slice(0, 12), 'big');
};


/***/ }),

/***/ "../node_modules/hash.js/lib/hash/sha/512.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/hash.js/lib/hash/utils.js");
var common = __webpack_require__("../node_modules/hash.js/lib/hash/common.js");
var assert = __webpack_require__("../node_modules/minimalistic-assert/index.js");

var rotr64_hi = utils.rotr64_hi;
var rotr64_lo = utils.rotr64_lo;
var shr64_hi = utils.shr64_hi;
var shr64_lo = utils.shr64_lo;
var sum64 = utils.sum64;
var sum64_hi = utils.sum64_hi;
var sum64_lo = utils.sum64_lo;
var sum64_4_hi = utils.sum64_4_hi;
var sum64_4_lo = utils.sum64_4_lo;
var sum64_5_hi = utils.sum64_5_hi;
var sum64_5_lo = utils.sum64_5_lo;

var BlockHash = common.BlockHash;

var sha512_K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function SHA512() {
  if (!(this instanceof SHA512))
    return new SHA512();

  BlockHash.call(this);
  this.h = [
    0x6a09e667, 0xf3bcc908,
    0xbb67ae85, 0x84caa73b,
    0x3c6ef372, 0xfe94f82b,
    0xa54ff53a, 0x5f1d36f1,
    0x510e527f, 0xade682d1,
    0x9b05688c, 0x2b3e6c1f,
    0x1f83d9ab, 0xfb41bd6b,
    0x5be0cd19, 0x137e2179 ];
  this.k = sha512_K;
  this.W = new Array(160);
}
utils.inherits(SHA512, BlockHash);
module.exports = SHA512;

SHA512.blockSize = 1024;
SHA512.outSize = 512;
SHA512.hmacStrength = 192;
SHA512.padLength = 128;

SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
  var W = this.W;

  // 32 x 32bit words
  for (var i = 0; i < 32; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i += 2) {
    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
    var c1_hi = W[i - 14];  // i - 7
    var c1_lo = W[i - 13];
    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
    var c3_hi = W[i - 32];  // i - 16
    var c3_lo = W[i - 31];

    W[i] = sum64_4_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
    W[i + 1] = sum64_4_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
  }
};

SHA512.prototype._update = function _update(msg, start) {
  this._prepareBlock(msg, start);

  var W = this.W;

  var ah = this.h[0];
  var al = this.h[1];
  var bh = this.h[2];
  var bl = this.h[3];
  var ch = this.h[4];
  var cl = this.h[5];
  var dh = this.h[6];
  var dl = this.h[7];
  var eh = this.h[8];
  var el = this.h[9];
  var fh = this.h[10];
  var fl = this.h[11];
  var gh = this.h[12];
  var gl = this.h[13];
  var hh = this.h[14];
  var hl = this.h[15];

  assert(this.k.length === W.length);
  for (var i = 0; i < W.length; i += 2) {
    var c0_hi = hh;
    var c0_lo = hl;
    var c1_hi = s1_512_hi(eh, el);
    var c1_lo = s1_512_lo(eh, el);
    var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
    var c3_hi = this.k[i];
    var c3_lo = this.k[i + 1];
    var c4_hi = W[i];
    var c4_lo = W[i + 1];

    var T1_hi = sum64_5_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);
    var T1_lo = sum64_5_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);

    c0_hi = s0_512_hi(ah, al);
    c0_lo = s0_512_lo(ah, al);
    c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

    hh = gh;
    hl = gl;

    gh = fh;
    gl = fl;

    fh = eh;
    fl = el;

    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
    el = sum64_lo(dl, dl, T1_hi, T1_lo);

    dh = ch;
    dl = cl;

    ch = bh;
    cl = bl;

    bh = ah;
    bl = al;

    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
  }

  sum64(this.h, 0, ah, al);
  sum64(this.h, 2, bh, bl);
  sum64(this.h, 4, ch, cl);
  sum64(this.h, 6, dh, dl);
  sum64(this.h, 8, eh, el);
  sum64(this.h, 10, fh, fl);
  sum64(this.h, 12, gh, gl);
  sum64(this.h, 14, hh, hl);
};

SHA512.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};

function ch64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ ((~xh) & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function ch64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ ((~xl) & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 28);
  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 28);
  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 14);
  var c1_hi = rotr64_hi(xh, xl, 18);
  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 14);
  var c1_lo = rotr64_lo(xh, xl, 18);
  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 1);
  var c1_hi = rotr64_hi(xh, xl, 8);
  var c2_hi = shr64_hi(xh, xl, 7);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 1);
  var c1_lo = rotr64_lo(xh, xl, 8);
  var c2_lo = shr64_lo(xh, xl, 7);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 19);
  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
  var c2_hi = shr64_hi(xh, xl, 6);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 19);
  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
  var c2_lo = shr64_lo(xh, xl, 6);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}


/***/ }),

/***/ "../node_modules/hash.js/lib/hash/sha/common.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("../node_modules/hash.js/lib/hash/utils.js");
var rotr32 = utils.rotr32;

function ft_1(s, x, y, z) {
  if (s === 0)
    return ch32(x, y, z);
  if (s === 1 || s === 3)
    return p32(x, y, z);
  if (s === 2)
    return maj32(x, y, z);
}
exports.ft_1 = ft_1;

function ch32(x, y, z) {
  return (x & y) ^ ((~x) & z);
}
exports.ch32 = ch32;

function maj32(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}
exports.maj32 = maj32;

function p32(x, y, z) {
  return x ^ y ^ z;
}
exports.p32 = p32;

function s0_256(x) {
  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
}
exports.s0_256 = s0_256;

function s1_256(x) {
  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
}
exports.s1_256 = s1_256;

function g0_256(x) {
  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
}
exports.g0_256 = g0_256;

function g1_256(x) {
  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
}
exports.g1_256 = g1_256;


/***/ }),

/***/ "../node_modules/hash.js/lib/hash/utils.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__("../node_modules/minimalistic-assert/index.js");
var inherits = __webpack_require__("../node_modules/hash.js/node_modules/inherits/inherits_browser.js");

exports.inherits = inherits;

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === 'string') {
    if (!enc) {
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        var hi = c >> 8;
        var lo = c & 0xff;
        if (hi)
          res.push(hi, lo);
        else
          res.push(lo);
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
exports.toArray = toArray;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
exports.toHex = toHex;

function htonl(w) {
  var res = (w >>> 24) |
            ((w >>> 8) & 0xff00) |
            ((w << 8) & 0xff0000) |
            ((w & 0xff) << 24);
  return res >>> 0;
}
exports.htonl = htonl;

function toHex32(msg, endian) {
  var res = '';
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === 'little')
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
exports.toHex32 = toHex32;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
exports.zero2 = zero2;

function zero8(word) {
  if (word.length === 7)
    return '0' + word;
  else if (word.length === 6)
    return '00' + word;
  else if (word.length === 5)
    return '000' + word;
  else if (word.length === 4)
    return '0000' + word;
  else if (word.length === 3)
    return '00000' + word;
  else if (word.length === 2)
    return '000000' + word;
  else if (word.length === 1)
    return '0000000' + word;
  else
    return word;
}
exports.zero8 = zero8;

function join32(msg, start, end, endian) {
  var len = end - start;
  assert(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === 'big')
      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
    else
      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
exports.join32 = join32;

function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === 'big') {
      res[k] = m >>> 24;
      res[k + 1] = (m >>> 16) & 0xff;
      res[k + 2] = (m >>> 8) & 0xff;
      res[k + 3] = m & 0xff;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = (m >>> 16) & 0xff;
      res[k + 1] = (m >>> 8) & 0xff;
      res[k] = m & 0xff;
    }
  }
  return res;
}
exports.split32 = split32;

function rotr32(w, b) {
  return (w >>> b) | (w << (32 - b));
}
exports.rotr32 = rotr32;

function rotl32(w, b) {
  return (w << b) | (w >>> (32 - b));
}
exports.rotl32 = rotl32;

function sum32(a, b) {
  return (a + b) >>> 0;
}
exports.sum32 = sum32;

function sum32_3(a, b, c) {
  return (a + b + c) >>> 0;
}
exports.sum32_3 = sum32_3;

function sum32_4(a, b, c, d) {
  return (a + b + c + d) >>> 0;
}
exports.sum32_4 = sum32_4;

function sum32_5(a, b, c, d, e) {
  return (a + b + c + d + e) >>> 0;
}
exports.sum32_5 = sum32_5;

function sum64(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];

  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
exports.sum64 = sum64;

function sum64_hi(ah, al, bh, bl) {
  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
exports.sum64_hi = sum64_hi;

function sum64_lo(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}
exports.sum64_lo = sum64_lo;

function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;

  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
exports.sum64_4_hi = sum64_4_hi;

function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}
exports.sum64_4_lo = sum64_4_lo;

function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = (lo + el) >>> 0;
  carry += lo < el ? 1 : 0;

  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
exports.sum64_5_hi = sum64_5_hi;

function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;

  return lo >>> 0;
}
exports.sum64_5_lo = sum64_5_lo;

function rotr64_hi(ah, al, num) {
  var r = (al << (32 - num)) | (ah >>> num);
  return r >>> 0;
}
exports.rotr64_hi = rotr64_hi;

function rotr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.rotr64_lo = rotr64_lo;

function shr64_hi(ah, al, num) {
  return ah >>> num;
}
exports.shr64_hi = shr64_hi;

function shr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.shr64_lo = shr64_lo;


/***/ }),

/***/ "../node_modules/hash.js/node_modules/inherits/inherits_browser.js":
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "../node_modules/inherits/inherits_browser.js":
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "../node_modules/is-buffer/index.js":
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "../node_modules/js-sha3/src/sha3.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.7.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2017
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_SHA3_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD = "function" === 'function' && __webpack_require__("./node_modules/webpack/buildin/amd-options.js");
  var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
  var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
  var KECCAK_PADDING = [1, 256, 65536, 16777216];
  var PADDING = [6, 1536, 393216, 100663296];
  var SHIFT = [0, 8, 16, 24];
  var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
    0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
    2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
    2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
    2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
  var BITS = [224, 256, 384, 512];
  var SHAKE_BITS = [128, 256];
  var OUTPUT_TYPES = ['hex', 'buffer', 'arrayBuffer', 'array', 'digest'];
  var CSHAKE_BYTEPAD = {
    '128': 168,
    '256': 136
  };

  if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  var createOutputMethod = function (bits, padding, outputType) {
    return function (message) {
      return new Keccak(bits, padding, bits).update(message)[outputType]();
    };
  };

  var createShakeOutputMethod = function (bits, padding, outputType) {
    return function (message, outputBits) {
      return new Keccak(bits, padding, outputBits).update(message)[outputType]();
    };
  };

  var createCshakeOutputMethod = function (bits, padding, outputType) {
    return function (message, outputBits, n, s) {
      return methods['cshake' + bits].update(message, outputBits, n, s)[outputType]();
    };
  };

  var createKmacOutputMethod = function (bits, padding, outputType) {
    return function (key, message, outputBits, s) {
      return methods['kmac' + bits].update(key, message, outputBits, s)[outputType]();
    };
  };

  var createOutputMethods = function (method, createMethod, bits, padding) {
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createMethod(bits, padding, type);
    }
    return method;
  };

  var createMethod = function (bits, padding) {
    var method = createOutputMethod(bits, padding, 'hex');
    method.create = function () {
      return new Keccak(bits, padding, bits);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    return createOutputMethods(method, createOutputMethod, bits, padding);
  };

  var createShakeMethod = function (bits, padding) {
    var method = createShakeOutputMethod(bits, padding, 'hex');
    method.create = function (outputBits) {
      return new Keccak(bits, padding, outputBits);
    };
    method.update = function (message, outputBits) {
      return method.create(outputBits).update(message);
    };
    return createOutputMethods(method, createShakeOutputMethod, bits, padding);
  };

  var createCshakeMethod = function (bits, padding) {
    var w = CSHAKE_BYTEPAD[bits];
    var method = createCshakeOutputMethod(bits, padding, 'hex');
    method.create = function (outputBits, n, s) {
      if (!n && !s) {
        return methods['shake' + bits].create(outputBits);
      } else {
        return new Keccak(bits, padding, outputBits).bytepad([n, s], w);
      }
    };
    method.update = function (message, outputBits, n, s) {
      return method.create(outputBits, n, s).update(message);
    };
    return createOutputMethods(method, createCshakeOutputMethod, bits, padding);
  };

  var createKmacMethod = function (bits, padding) {
    var w = CSHAKE_BYTEPAD[bits];
    var method = createKmacOutputMethod(bits, padding, 'hex');
    method.create = function (key, outputBits, s) {
      return new Kmac(bits, padding, outputBits).bytepad(['KMAC', s], w).bytepad([key], w);
    };
    method.update = function (key, message, outputBits, s) {
      return method.create(key, outputBits, s).update(message);
    };
    return createOutputMethods(method, createKmacOutputMethod, bits, padding);
  };

  var algorithms = [
    { name: 'keccak', padding: KECCAK_PADDING, bits: BITS, createMethod: createMethod },
    { name: 'sha3', padding: PADDING, bits: BITS, createMethod: createMethod },
    { name: 'shake', padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
    { name: 'cshake', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
    { name: 'kmac', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
  ];

  var methods = {}, methodNames = [];

  for (var i = 0; i < algorithms.length; ++i) {
    var algorithm = algorithms[i];
    var bits = algorithm.bits;
    for (var j = 0; j < bits.length; ++j) {
      var methodName = algorithm.name + '_' + bits[j];
      methodNames.push(methodName);
      methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
      if (algorithm.name !== 'sha3') {
        var newMethodName = algorithm.name + bits[j];
        methodNames.push(newMethodName);
        methods[newMethodName] = methods[methodName];
      }
    }
  }

  function Keccak(bits, padding, outputBits) {
    this.blocks = [];
    this.s = [];
    this.padding = padding;
    this.outputBits = outputBits;
    this.reset = true;
    this.finalized = false;
    this.block = 0;
    this.start = 0;
    this.blockCount = (1600 - (bits << 1)) >> 5;
    this.byteCount = this.blockCount << 2;
    this.outputBlocks = outputBits >> 5;
    this.extraBytes = (outputBits & 31) >> 3;

    for (var i = 0; i < 50; ++i) {
      this.s[i] = 0;
    }
  }

  Keccak.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }
    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw ERROR;
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    var blocks = this.blocks, byteCount = this.byteCount, length = message.length,
      blockCount = this.blockCount, index = 0, s = this.s, i, code;

    while (index < length) {
      if (this.reset) {
        this.reset = false;
        blocks[0] = this.block;
        for (i = 1; i < blockCount + 1; ++i) {
          blocks[i] = 0;
        }
      }
      if (notString) {
        for (i = this.start; index < length && i < byteCount; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < byteCount; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }
      this.lastByteIndex = i;
      if (i >= byteCount) {
        this.start = i - byteCount;
        this.block = blocks[blockCount];
        for (i = 0; i < blockCount; ++i) {
          s[i] ^= blocks[i];
        }
        f(s);
        this.reset = true;
      } else {
        this.start = i;
      }
    }
    return this;
  };

  Keccak.prototype.encode = function (x, right) {
    var o = x & 255, n = 1;
    var bytes = [o];
    x = x >> 8;
    o = x & 255;
    while (o > 0) {
      bytes.unshift(o);
      x = x >> 8;
      o = x & 255;
      ++n;
    }
    if (right) {
      bytes.push(n);
    } else {
      bytes.unshift(n);
    }
    this.update(bytes);
    return bytes.length;
  };

  Keccak.prototype.encodeString = function (str) {
    var notString, type = typeof str;
    if (type !== 'string') {
      if (type === 'object') {
        if (str === null) {
          throw ERROR;
        } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
          str = new Uint8Array(str);
        } else if (!Array.isArray(str)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    var bytes = 0, length = str.length;
    if (notString) {
      bytes = length;
    } else {
      for (var i = 0; i < str.length; ++i) {
        var code = str.charCodeAt(i);
        if (code < 0x80) {
          bytes += 1;
        } else if (code < 0x800) {
          bytes += 2;
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes += 3;
        } else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(++i) & 0x3ff));
          bytes += 4;
        }
      }
    }
    bytes += this.encode(bytes * 8);
    this.update(str);
    return bytes;
  };

  Keccak.prototype.bytepad = function (strs, w) {
    var bytes = this.encode(w);
    for (var i = 0; i < strs.length; ++i) {
      bytes += this.encodeString(strs[i]);
    }
    var paddingBytes = w - bytes % w;
    var zeros = [];
    zeros.length = paddingBytes;
    this.update(zeros);
    return this;
  };

  Keccak.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
    blocks[i >> 2] |= this.padding[i & 3];
    if (this.lastByteIndex === this.byteCount) {
      blocks[0] = blocks[blockCount];
      for (i = 1; i < blockCount + 1; ++i) {
        blocks[i] = 0;
      }
    }
    blocks[blockCount - 1] |= 0x80000000;
    for (i = 0; i < blockCount; ++i) {
      s[i] ^= blocks[i];
    }
    f(s);
  };

  Keccak.prototype.toString = Keccak.prototype.hex = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
      extraBytes = this.extraBytes, i = 0, j = 0;
    var hex = '', block;
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        block = s[i];
        hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F] +
          HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F] +
          HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F] +
          HEX_CHARS[(block >> 28) & 0x0F] + HEX_CHARS[(block >> 24) & 0x0F];
      }
      if (j % blockCount === 0) {
        f(s);
        i = 0;
      }
    }
    if (extraBytes) {
      block = s[i];
      hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F];
      if (extraBytes > 1) {
        hex += HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F];
      }
      if (extraBytes > 2) {
        hex += HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F];
      }
    }
    return hex;
  };

  Keccak.prototype.arrayBuffer = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
      extraBytes = this.extraBytes, i = 0, j = 0;
    var bytes = this.outputBits >> 3;
    var buffer;
    if (extraBytes) {
      buffer = new ArrayBuffer((outputBlocks + 1) << 2);
    } else {
      buffer = new ArrayBuffer(bytes);
    }
    var array = new Uint32Array(buffer);
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        array[j] = s[i];
      }
      if (j % blockCount === 0) {
        f(s);
      }
    }
    if (extraBytes) {
      array[i] = s[i];
      buffer = buffer.slice(0, bytes);
    }
    return buffer;
  };

  Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;

  Keccak.prototype.digest = Keccak.prototype.array = function () {
    this.finalize();

    var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
      extraBytes = this.extraBytes, i = 0, j = 0;
    var array = [], offset, block;
    while (j < outputBlocks) {
      for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
        offset = j << 2;
        block = s[i];
        array[offset] = block & 0xFF;
        array[offset + 1] = (block >> 8) & 0xFF;
        array[offset + 2] = (block >> 16) & 0xFF;
        array[offset + 3] = (block >> 24) & 0xFF;
      }
      if (j % blockCount === 0) {
        f(s);
      }
    }
    if (extraBytes) {
      offset = j << 2;
      block = s[i];
      array[offset] = block & 0xFF;
      if (extraBytes > 1) {
        array[offset + 1] = (block >> 8) & 0xFF;
      }
      if (extraBytes > 2) {
        array[offset + 2] = (block >> 16) & 0xFF;
      }
    }
    return array;
  };

  function Kmac(bits, padding, outputBits) {
    Keccak.call(this, bits, padding, outputBits);
  }

  Kmac.prototype = new Keccak();

  Kmac.prototype.finalize = function () {
    this.encode(this.outputBits, true);
    return Keccak.prototype.finalize.call(this);
  };

  var f = function (s) {
    var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9,
      b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17,
      b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33,
      b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
    for (n = 0; n < 48; n += 2) {
      c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
      c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
      c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
      c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
      c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
      c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
      c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
      c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
      c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
      c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

      h = c8 ^ ((c2 << 1) | (c3 >>> 31));
      l = c9 ^ ((c3 << 1) | (c2 >>> 31));
      s[0] ^= h;
      s[1] ^= l;
      s[10] ^= h;
      s[11] ^= l;
      s[20] ^= h;
      s[21] ^= l;
      s[30] ^= h;
      s[31] ^= l;
      s[40] ^= h;
      s[41] ^= l;
      h = c0 ^ ((c4 << 1) | (c5 >>> 31));
      l = c1 ^ ((c5 << 1) | (c4 >>> 31));
      s[2] ^= h;
      s[3] ^= l;
      s[12] ^= h;
      s[13] ^= l;
      s[22] ^= h;
      s[23] ^= l;
      s[32] ^= h;
      s[33] ^= l;
      s[42] ^= h;
      s[43] ^= l;
      h = c2 ^ ((c6 << 1) | (c7 >>> 31));
      l = c3 ^ ((c7 << 1) | (c6 >>> 31));
      s[4] ^= h;
      s[5] ^= l;
      s[14] ^= h;
      s[15] ^= l;
      s[24] ^= h;
      s[25] ^= l;
      s[34] ^= h;
      s[35] ^= l;
      s[44] ^= h;
      s[45] ^= l;
      h = c4 ^ ((c8 << 1) | (c9 >>> 31));
      l = c5 ^ ((c9 << 1) | (c8 >>> 31));
      s[6] ^= h;
      s[7] ^= l;
      s[16] ^= h;
      s[17] ^= l;
      s[26] ^= h;
      s[27] ^= l;
      s[36] ^= h;
      s[37] ^= l;
      s[46] ^= h;
      s[47] ^= l;
      h = c6 ^ ((c0 << 1) | (c1 >>> 31));
      l = c7 ^ ((c1 << 1) | (c0 >>> 31));
      s[8] ^= h;
      s[9] ^= l;
      s[18] ^= h;
      s[19] ^= l;
      s[28] ^= h;
      s[29] ^= l;
      s[38] ^= h;
      s[39] ^= l;
      s[48] ^= h;
      s[49] ^= l;

      b0 = s[0];
      b1 = s[1];
      b32 = (s[11] << 4) | (s[10] >>> 28);
      b33 = (s[10] << 4) | (s[11] >>> 28);
      b14 = (s[20] << 3) | (s[21] >>> 29);
      b15 = (s[21] << 3) | (s[20] >>> 29);
      b46 = (s[31] << 9) | (s[30] >>> 23);
      b47 = (s[30] << 9) | (s[31] >>> 23);
      b28 = (s[40] << 18) | (s[41] >>> 14);
      b29 = (s[41] << 18) | (s[40] >>> 14);
      b20 = (s[2] << 1) | (s[3] >>> 31);
      b21 = (s[3] << 1) | (s[2] >>> 31);
      b2 = (s[13] << 12) | (s[12] >>> 20);
      b3 = (s[12] << 12) | (s[13] >>> 20);
      b34 = (s[22] << 10) | (s[23] >>> 22);
      b35 = (s[23] << 10) | (s[22] >>> 22);
      b16 = (s[33] << 13) | (s[32] >>> 19);
      b17 = (s[32] << 13) | (s[33] >>> 19);
      b48 = (s[42] << 2) | (s[43] >>> 30);
      b49 = (s[43] << 2) | (s[42] >>> 30);
      b40 = (s[5] << 30) | (s[4] >>> 2);
      b41 = (s[4] << 30) | (s[5] >>> 2);
      b22 = (s[14] << 6) | (s[15] >>> 26);
      b23 = (s[15] << 6) | (s[14] >>> 26);
      b4 = (s[25] << 11) | (s[24] >>> 21);
      b5 = (s[24] << 11) | (s[25] >>> 21);
      b36 = (s[34] << 15) | (s[35] >>> 17);
      b37 = (s[35] << 15) | (s[34] >>> 17);
      b18 = (s[45] << 29) | (s[44] >>> 3);
      b19 = (s[44] << 29) | (s[45] >>> 3);
      b10 = (s[6] << 28) | (s[7] >>> 4);
      b11 = (s[7] << 28) | (s[6] >>> 4);
      b42 = (s[17] << 23) | (s[16] >>> 9);
      b43 = (s[16] << 23) | (s[17] >>> 9);
      b24 = (s[26] << 25) | (s[27] >>> 7);
      b25 = (s[27] << 25) | (s[26] >>> 7);
      b6 = (s[36] << 21) | (s[37] >>> 11);
      b7 = (s[37] << 21) | (s[36] >>> 11);
      b38 = (s[47] << 24) | (s[46] >>> 8);
      b39 = (s[46] << 24) | (s[47] >>> 8);
      b30 = (s[8] << 27) | (s[9] >>> 5);
      b31 = (s[9] << 27) | (s[8] >>> 5);
      b12 = (s[18] << 20) | (s[19] >>> 12);
      b13 = (s[19] << 20) | (s[18] >>> 12);
      b44 = (s[29] << 7) | (s[28] >>> 25);
      b45 = (s[28] << 7) | (s[29] >>> 25);
      b26 = (s[38] << 8) | (s[39] >>> 24);
      b27 = (s[39] << 8) | (s[38] >>> 24);
      b8 = (s[48] << 14) | (s[49] >>> 18);
      b9 = (s[49] << 14) | (s[48] >>> 18);

      s[0] = b0 ^ (~b2 & b4);
      s[1] = b1 ^ (~b3 & b5);
      s[10] = b10 ^ (~b12 & b14);
      s[11] = b11 ^ (~b13 & b15);
      s[20] = b20 ^ (~b22 & b24);
      s[21] = b21 ^ (~b23 & b25);
      s[30] = b30 ^ (~b32 & b34);
      s[31] = b31 ^ (~b33 & b35);
      s[40] = b40 ^ (~b42 & b44);
      s[41] = b41 ^ (~b43 & b45);
      s[2] = b2 ^ (~b4 & b6);
      s[3] = b3 ^ (~b5 & b7);
      s[12] = b12 ^ (~b14 & b16);
      s[13] = b13 ^ (~b15 & b17);
      s[22] = b22 ^ (~b24 & b26);
      s[23] = b23 ^ (~b25 & b27);
      s[32] = b32 ^ (~b34 & b36);
      s[33] = b33 ^ (~b35 & b37);
      s[42] = b42 ^ (~b44 & b46);
      s[43] = b43 ^ (~b45 & b47);
      s[4] = b4 ^ (~b6 & b8);
      s[5] = b5 ^ (~b7 & b9);
      s[14] = b14 ^ (~b16 & b18);
      s[15] = b15 ^ (~b17 & b19);
      s[24] = b24 ^ (~b26 & b28);
      s[25] = b25 ^ (~b27 & b29);
      s[34] = b34 ^ (~b36 & b38);
      s[35] = b35 ^ (~b37 & b39);
      s[44] = b44 ^ (~b46 & b48);
      s[45] = b45 ^ (~b47 & b49);
      s[6] = b6 ^ (~b8 & b0);
      s[7] = b7 ^ (~b9 & b1);
      s[16] = b16 ^ (~b18 & b10);
      s[17] = b17 ^ (~b19 & b11);
      s[26] = b26 ^ (~b28 & b20);
      s[27] = b27 ^ (~b29 & b21);
      s[36] = b36 ^ (~b38 & b30);
      s[37] = b37 ^ (~b39 & b31);
      s[46] = b46 ^ (~b48 & b40);
      s[47] = b47 ^ (~b49 & b41);
      s[8] = b8 ^ (~b0 & b2);
      s[9] = b9 ^ (~b1 & b3);
      s[18] = b18 ^ (~b10 & b12);
      s[19] = b19 ^ (~b11 & b13);
      s[28] = b28 ^ (~b20 & b22);
      s[29] = b29 ^ (~b21 & b23);
      s[38] = b38 ^ (~b30 & b32);
      s[39] = b39 ^ (~b31 & b33);
      s[48] = b48 ^ (~b40 & b42);
      s[49] = b49 ^ (~b41 & b43);

      s[0] ^= RC[n];
      s[1] ^= RC[n + 1];
    }
  };

  if (COMMON_JS) {
    module.exports = methods;
  } else {
    for (i = 0; i < methodNames.length; ++i) {
      root[methodNames[i]] = methods[methodNames[i]];
    }
    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return methods;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js"), __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/minimalistic-assert/index.js":
/***/ (function(module, exports) {

module.exports = assert;

function assert(val, msg) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l, r, msg) {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};


/***/ }),

/***/ "../node_modules/scrypt-js/scrypt.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

(function(root) {
    var MAX_VALUE = 0x7fffffff;

    // The SHA256 and PBKDF2 implementation are from scrypt-async-js:
    // See: https://github.com/dchest/scrypt-async-js
    function SHA256(m) {
        var K = [
           0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
           0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
           0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
           0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
           0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
           0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
           0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
           0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
           0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
           0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
           0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
           0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
           0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
       ];

        var h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
        var h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
        var w = new Array(64);

        function blocks(p) {
            var off = 0, len = p.length;
            while (len >= 64) {
                var a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7, u, i, j, t1, t2;

                for (i = 0; i < 16; i++) {
                    j = off + i*4;
                    w[i] = ((p[j] & 0xff)<<24) | ((p[j+1] & 0xff)<<16) |
                    ((p[j+2] & 0xff)<<8) | (p[j+3] & 0xff);
                }

                for (i = 16; i < 64; i++) {
                    u = w[i-2];
                    t1 = ((u>>>17) | (u<<(32-17))) ^ ((u>>>19) | (u<<(32-19))) ^ (u>>>10);

                    u = w[i-15];
                    t2 = ((u>>>7) | (u<<(32-7))) ^ ((u>>>18) | (u<<(32-18))) ^ (u>>>3);

                    w[i] = (((t1 + w[i-7]) | 0) + ((t2 + w[i-16]) | 0)) | 0;
                }

                for (i = 0; i < 64; i++) {
                    t1 = ((((((e>>>6) | (e<<(32-6))) ^ ((e>>>11) | (e<<(32-11))) ^
                             ((e>>>25) | (e<<(32-25)))) + ((e & f) ^ (~e & g))) | 0) +
                          ((h + ((K[i] + w[i]) | 0)) | 0)) | 0;

                    t2 = ((((a>>>2) | (a<<(32-2))) ^ ((a>>>13) | (a<<(32-13))) ^
                           ((a>>>22) | (a<<(32-22)))) + ((a & b) ^ (a & c) ^ (b & c))) | 0;

                    h = g;
                    g = f;
                    f = e;
                    e = (d + t1) | 0;
                    d = c;
                    c = b;
                    b = a;
                    a = (t1 + t2) | 0;
                }

                h0 = (h0 + a) | 0;
                h1 = (h1 + b) | 0;
                h2 = (h2 + c) | 0;
                h3 = (h3 + d) | 0;
                h4 = (h4 + e) | 0;
                h5 = (h5 + f) | 0;
                h6 = (h6 + g) | 0;
                h7 = (h7 + h) | 0;

                off += 64;
                len -= 64;
            }
        }

        blocks(m);

        var i, bytesLeft = m.length % 64,
        bitLenHi = (m.length / 0x20000000) | 0,
        bitLenLo = m.length << 3,
        numZeros = (bytesLeft < 56) ? 56 : 120,
        p = m.slice(m.length - bytesLeft, m.length);

        p.push(0x80);
        for (i = bytesLeft + 1; i < numZeros; i++) { p.push(0); }
        p.push((bitLenHi>>>24) & 0xff);
        p.push((bitLenHi>>>16) & 0xff);
        p.push((bitLenHi>>>8)  & 0xff);
        p.push((bitLenHi>>>0)  & 0xff);
        p.push((bitLenLo>>>24) & 0xff);
        p.push((bitLenLo>>>16) & 0xff);
        p.push((bitLenLo>>>8)  & 0xff);
        p.push((bitLenLo>>>0)  & 0xff);

        blocks(p);

        return [
            (h0>>>24) & 0xff, (h0>>>16) & 0xff, (h0>>>8) & 0xff, (h0>>>0) & 0xff,
            (h1>>>24) & 0xff, (h1>>>16) & 0xff, (h1>>>8) & 0xff, (h1>>>0) & 0xff,
            (h2>>>24) & 0xff, (h2>>>16) & 0xff, (h2>>>8) & 0xff, (h2>>>0) & 0xff,
            (h3>>>24) & 0xff, (h3>>>16) & 0xff, (h3>>>8) & 0xff, (h3>>>0) & 0xff,
            (h4>>>24) & 0xff, (h4>>>16) & 0xff, (h4>>>8) & 0xff, (h4>>>0) & 0xff,
            (h5>>>24) & 0xff, (h5>>>16) & 0xff, (h5>>>8) & 0xff, (h5>>>0) & 0xff,
            (h6>>>24) & 0xff, (h6>>>16) & 0xff, (h6>>>8) & 0xff, (h6>>>0) & 0xff,
            (h7>>>24) & 0xff, (h7>>>16) & 0xff, (h7>>>8) & 0xff, (h7>>>0) & 0xff
        ];
    }

    function PBKDF2_HMAC_SHA256_OneIter(password, salt, dkLen) {
        // compress password if it's longer than hash block length
        password = password.length <= 64 ? password : SHA256(password);

        var i;
        var innerLen = 64 + salt.length + 4;
        var inner = new Array(innerLen);
        var outerKey = new Array(64);
        var dk = [];

        // inner = (password ^ ipad) || salt || counter
        for (i = 0; i < 64; i++) inner[i] = 0x36;
        for (i = 0; i < password.length; i++) inner[i] ^= password[i];
        for (i = 0; i < salt.length; i++) inner[64+i] = salt[i];
        for (i = innerLen - 4; i < innerLen; i++) inner[i] = 0;

        // outerKey = password ^ opad
        for (i = 0; i < 64; i++) outerKey[i] = 0x5c;
        for (i = 0; i < password.length; i++) outerKey[i] ^= password[i];

        // increments counter inside inner
        function incrementCounter() {
            for (var i = innerLen-1; i >= innerLen-4; i--) {
                inner[i]++;
                if (inner[i] <= 0xff) return;
                inner[i] = 0;
            }
        }

        // output blocks = SHA256(outerKey || SHA256(inner)) ...
        while (dkLen >= 32) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))));
            dkLen -= 32;
        }
        if (dkLen > 0) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))).slice(0, dkLen));
        }

        return dk;
    }

    // The following is an adaptation of scryptsy
    // See: https://www.npmjs.com/package/scryptsy
    function blockmix_salsa8(BY, Yi, r, x, _X) {
        var i;

        arraycopy(BY, (2 * r - 1) * 16, _X, 0, 16);
        for (i = 0; i < 2 * r; i++) {
            blockxor(BY, i * 16, _X, 16);
            salsa20_8(_X, x);
            arraycopy(_X, 0, BY, Yi + (i * 16), 16);
        }

        for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + (i * 2) * 16, BY, (i * 16), 16);
        }

        for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + (i * 2 + 1) * 16, BY, (i + r) * 16, 16);
        }
    }

    function R(a, b) {
        return (a << b) | (a >>> (32 - b));
    }

    function salsa20_8(B, x) {
        arraycopy(B, 0, x, 0, 16);

        for (var i = 8; i > 0; i -= 2) {
            x[ 4] ^= R(x[ 0] + x[12], 7);
            x[ 8] ^= R(x[ 4] + x[ 0], 9);
            x[12] ^= R(x[ 8] + x[ 4], 13);
            x[ 0] ^= R(x[12] + x[ 8], 18);
            x[ 9] ^= R(x[ 5] + x[ 1], 7);
            x[13] ^= R(x[ 9] + x[ 5], 9);
            x[ 1] ^= R(x[13] + x[ 9], 13);
            x[ 5] ^= R(x[ 1] + x[13], 18);
            x[14] ^= R(x[10] + x[ 6], 7);
            x[ 2] ^= R(x[14] + x[10], 9);
            x[ 6] ^= R(x[ 2] + x[14], 13);
            x[10] ^= R(x[ 6] + x[ 2], 18);
            x[ 3] ^= R(x[15] + x[11], 7);
            x[ 7] ^= R(x[ 3] + x[15], 9);
            x[11] ^= R(x[ 7] + x[ 3], 13);
            x[15] ^= R(x[11] + x[ 7], 18);
            x[ 1] ^= R(x[ 0] + x[ 3], 7);
            x[ 2] ^= R(x[ 1] + x[ 0], 9);
            x[ 3] ^= R(x[ 2] + x[ 1], 13);
            x[ 0] ^= R(x[ 3] + x[ 2], 18);
            x[ 6] ^= R(x[ 5] + x[ 4], 7);
            x[ 7] ^= R(x[ 6] + x[ 5], 9);
            x[ 4] ^= R(x[ 7] + x[ 6], 13);
            x[ 5] ^= R(x[ 4] + x[ 7], 18);
            x[11] ^= R(x[10] + x[ 9], 7);
            x[ 8] ^= R(x[11] + x[10], 9);
            x[ 9] ^= R(x[ 8] + x[11], 13);
            x[10] ^= R(x[ 9] + x[ 8], 18);
            x[12] ^= R(x[15] + x[14], 7);
            x[13] ^= R(x[12] + x[15], 9);
            x[14] ^= R(x[13] + x[12], 13);
            x[15] ^= R(x[14] + x[13], 18);
        }

        for (i = 0; i < 16; ++i) {
            B[i] += x[i];
        }
    }

    // naive approach... going back to loop unrolling may yield additional performance
    function blockxor(S, Si, D, len) {
        for (var i = 0; i < len; i++) {
            D[i] ^= S[Si + i]
        }
    }

    function arraycopy(src, srcPos, dest, destPos, length) {
        while (length--) {
            dest[destPos++] = src[srcPos++];
        }
    }

    function checkBufferish(o) {
        if (!o || typeof(o.length) !== 'number') {
            return false;
        }
        for (var i = 0; i < o.length; i++) {
            if (typeof(o[i]) !== 'number') { return false; }

            var v = parseInt(o[i]);
            if (v != o[i] || v < 0 || v >= 256) {
                return false;
            }
        }
        return true;
    }

    function ensureInteger(value, name) {
        var intValue = parseInt(value);
        if (value != intValue) { throw new Error('invalid ' + name); }
        return intValue;
    }

    // N = Cpu cost, r = Memory cost, p = parallelization cost
    // callback(error, progress, key)
    function scrypt(password, salt, N, r, p, dkLen, callback) {

        if (!callback) { throw new Error('missing callback'); }

        N = ensureInteger(N, 'N');
        r = ensureInteger(r, 'r');
        p = ensureInteger(p, 'p');

        dkLen = ensureInteger(dkLen, 'dkLen');

        if (N === 0 || (N & (N - 1)) !== 0) { throw new Error('N must be power of 2'); }

        if (N > MAX_VALUE / 128 / r) { throw new Error('N too large'); }
        if (r > MAX_VALUE / 128 / p) { throw new Error('r too large'); }

        if (!checkBufferish(password)) {
            throw new Error('password must be an array or buffer');
        }

        if (!checkBufferish(salt)) {
            throw new Error('salt must be an array or buffer');
        }

        var b = PBKDF2_HMAC_SHA256_OneIter(password, salt, p * 128 * r);
        var B = new Uint32Array(p * 32 * r)
        for (var i = 0; i < B.length; i++) {
            var j = i * 4;
            B[i] = ((b[j + 3] & 0xff) << 24) |
                   ((b[j + 2] & 0xff) << 16) |
                   ((b[j + 1] & 0xff) << 8) |
                   ((b[j + 0] & 0xff) << 0);
        }

        var XY = new Uint32Array(64 * r);
        var V = new Uint32Array(32 * r * N);

        var Yi = 32 * r;

        // scratch space
        var x = new Uint32Array(16);       // salsa20_8
        var _X = new Uint32Array(16);      // blockmix_salsa8

        var totalOps = p * N * 2;
        var currentOp = 0;
        var lastPercent10 = null;

        // Set this to true to abandon the scrypt on the next step
        var stop = false;

        // State information
        var state = 0;
        var i0 = 0, i1;
        var Bi;

        // How many blockmix_salsa8 can we do per step?
        var limit = parseInt(1000 / r);

        // Trick from scrypt-async; if there is a setImmediate shim in place, use it
        var nextTick = (typeof(setImmediate) !== 'undefined') ? setImmediate : setTimeout;

        // This is really all I changed; making scryptsy a state machine so we occasionally
        // stop and give other evnts on the evnt loop a chance to run. ~RicMoo
        var incrementalSMix = function() {
            if (stop) {
                return callback(new Error('cancelled'), currentOp / totalOps);
            }

            switch (state) {
                case 0:
                    // for (var i = 0; i < p; i++)...
                    Bi = i0 * 32 * r;

                    arraycopy(B, Bi, XY, 0, Yi);                       // ROMix - 1

                    state = 1;                                         // Move to ROMix 2
                    i1 = 0;

                    // Fall through

                case 1:

                    // Run up to 1000 steps of the first inner smix loop
                    var steps = N - i1;
                    if (steps > limit) { steps = limit; }
                    for (var i = 0; i < steps; i++) {                  // ROMix - 2
                        arraycopy(XY, 0, V, (i1 + i) * Yi, Yi)         // ROMix - 3
                        blockmix_salsa8(XY, Yi, r, x, _X);             // ROMix - 4
                    }

                    // for (var i = 0; i < N; i++)
                    i1 += steps;
                    currentOp += steps;

                    // Call the callback with the progress (optionally stopping us)
                    var percent10 = parseInt(1000 * currentOp / totalOps);
                    if (percent10 !== lastPercent10) {
                        stop = callback(null, currentOp / totalOps);
                        if (stop) { break; }
                        lastPercent10 = percent10;
                    }

                    if (i1 < N) {
                        break;
                    }

                    i1 = 0;                                          // Move to ROMix 6
                    state = 2;

                    // Fall through

                case 2:

                    // Run up to 1000 steps of the second inner smix loop
                    var steps = N - i1;
                    if (steps > limit) { steps = limit; }
                    for (var i = 0; i < steps; i++) {                // ROMix - 6
                        var offset = (2 * r - 1) * 16;               // ROMix - 7
                        var j = XY[offset] & (N - 1);
                        blockxor(V, j * Yi, XY, Yi);                 // ROMix - 8 (inner)
                        blockmix_salsa8(XY, Yi, r, x, _X);           // ROMix - 9 (outer)
                    }

                    // for (var i = 0; i < N; i++)...
                    i1 += steps;
                    currentOp += steps;

                    // Call the callback with the progress (optionally stopping us)
                    var percent10 = parseInt(1000 * currentOp / totalOps);
                    if (percent10 !== lastPercent10) {
                        stop = callback(null, currentOp / totalOps);
                        if (stop) { break; }
                        lastPercent10 = percent10;
                    }

                    if (i1 < N) {
                        break;
                    }

                    arraycopy(XY, 0, B, Bi, Yi);                     // ROMix - 10

                    // for (var i = 0; i < p; i++)...
                    i0++;
                    if (i0 < p) {
                        state = 0;
                        break;
                    }

                    b = [];
                    for (var i = 0; i < B.length; i++) {
                        b.push((B[i] >>  0) & 0xff);
                        b.push((B[i] >>  8) & 0xff);
                        b.push((B[i] >> 16) & 0xff);
                        b.push((B[i] >> 24) & 0xff);
                    }

                    var derivedKey = PBKDF2_HMAC_SHA256_OneIter(password, b, dkLen);

                    // Done; don't break (which would reschedule)
                    return callback(null, 1.0, derivedKey);
                }

                // Schedule the next steps
                nextTick(incrementalSMix);
            }

            // Bootstrap the incremental smix
            incrementalSMix();
    }

    // node.js
    if (true) {
       module.exports = scrypt;

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else if (typeof(define) === 'function' && define.amd) {
        define(scrypt);

    // Web Browsers
    } else if (root) {

        // If there was an existing library "scrypt", make sure it is still available
        if (root.scrypt) {
            root._scrypt = root.scrypt;
        }

        root.scrypt = scrypt;
    }

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "../node_modules/setimmediate/setImmediate.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var setImmediate;

    function addFromSetImmediateArguments(args) {
        tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
        return nextHandle++;
    }

    // This function accepts the same arguments as setImmediate, but
    // returns a function that requires no arguments.
    function partiallyApplied(handler) {
        var args = [].slice.call(arguments, 1);
        return function() {
            if (typeof handler === "function") {
                handler.apply(undefined, args);
            } else {
                (new Function("" + handler))();
            }
        };
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    task();
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function installNextTickImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            process.nextTick(partiallyApplied(runIfPresent, handle));
            return handle;
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            global.postMessage(messagePrefix + handle, "*");
            return handle;
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
    }

    function installSetTimeoutImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
            return handle;
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/uuid/rng-browser.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
var rng;

if (global.crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/uuid/uuid.js":
/***/ (function(module, exports, __webpack_require__) {

//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = __webpack_require__("../node_modules/uuid/rng-browser.js");

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;


/***/ }),

/***/ "../src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("../node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_help__ = __webpack_require__("../src/utils/help.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__private__ = __webpack_require__("../src/private.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_account__ = __webpack_require__("../src/utils/account.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_account___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__utils_account__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_crypto__ = __webpack_require__("../src/utils/crypto.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__utils_crypto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ethers__ = __webpack_require__("../node_modules/ethers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ethers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ethers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_bignumber_js__ = __webpack_require__("../node_modules/bignumber.js/bignumber.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_bignumber_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_bignumber_js__);








class TronWeb {
    constructor(apiUrl,tronInfuraUrl) {
        this.apiUrl = apiUrl;
        this.defaultAccount='';
        this.defaultPk='';
        this.tronInfuraUrl = tronInfuraUrl;
        //xhr.defaults.baseURL = this.apiUrl;
    }
    toHex(str){
        //address
        if(str.length==34&&str.indexOf('T')==0){
            return Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(str)
        }
        return Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(str)
    }
    fromHex(sHex){
        if(sHex.length==42&&sHex.indexOf('41')==0){
            return Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["b" /* hexString2Address */])(sHex)
        }
        return Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["c" /* hexString2Utf8 */])(sHex)
    }
    setFullNodeServer(value){
        this.apiUrl = value;
    }
    setEventServer(value = 'http://52.44.75.99:18889'){
        this.tronInfuraUrl = value;
    }

    /**
     * get address from pk
     * @param {string} pk
     * @return {string} address
     * */
    login(pk){
        return Object(__WEBPACK_IMPORTED_MODULE_4__utils_crypto__["pkToAddress"])(pk);
    }

    /**
     * Obtain account balance
     * @param {string} address
     * @return {object}
     **/
    async getBalance(address){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getaccount`,{
            address : Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address)
        })
        return data;
    }

    /**
     * Query the latest block
     * @param null
     * @return {object}
     * */
    async blockNumber(){
        let  { data }= await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getnowblock`)
        return data;
    }

    /**
     * Query the block by hashString or blockNumber
     * parms {string or number} 
     * @return {object}
     */
    async getBlock(hashStringOrBlockNumber){
        let data;
        if(isNaN(hashStringOrBlockNumber)){
            data = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getblockbyid`,{value:hashStringOrBlockNumber})
        }else{
            hashStringOrBlockNumber = typeof hashStringOrBlockNumber === 'number' ? hashStringOrBlockNumber : parseInt(hashStringOrBlockNumber);
            data = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getblockbynum`,{num:hashStringOrBlockNumber})
        }
        return data.data;
    }

    /**
     * Query the count of transaction in a block by hashString or blockNumber
     * params {string or number} 
     * @return {object}
     */
    async getBlockTransactionCount(hashStringOrBlockNumber){
        const data = await this.getBlock(hashStringOrBlockNumber)
        return {count:data.transactions?data.transactions.length:0};
    }

    /**
     * Query a transactional information by hash string of txId 
     * params {string or number} 
     * @return {object}
     */
    async getTransaction(id){
        const {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/gettransactionbyid`,{value:id})
        return data;
    }
    /**
     * Total all transactions
     * @param null
     * @returns {object} {num:11111}
     * */
    async getTransactionCount(){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/totaltransaction`);
        return data.num;
    }
    /**
     * A transaction that sends a transfer
     * @param {string} from ,{string} to ,{int} amount,
     * @return {object} transaction
     * */
    async sendTransaction(from,to,amount,privateKey){
        try{
            if(!privateKey){
                throw "please input privateKey！";
            }
            const transaction = await this.createTransaction(to,from,amount)
            const signTransaction = await this.signTransaction(transaction,privateKey,0);
            const res = await this.sendRawTransaction(signTransaction);
            return Object.assign(res,signTransaction)
        }catch(err){
            console.error(err);
        }
    }

    /**
     * Create a transfer transaction,If the to address for the transfer does not exist, create the account on the blockchain  
     * @param {string} to_address,{string} owner_address,{int} amount
     * @return {object} transaction
     * */
    async createTransaction(to_address,owner_address,amount){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/createtransaction`,{
            to_address:Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(to_address),
            owner_address:Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address),
            amount
        })
        return data;
    }
    /**
     * Sign a transaction，this api maybe leak the private key,so apply this api in a safe environment please.
     * @param {object} transaction，{string} privateKey,{int} teriminal 0: client, 1: service
     * @return {object} transaction
     *
     * */

    async signTransaction(transaction,privateKey,teriminal=0){
        if(teriminal==0){
            return Object(__WEBPACK_IMPORTED_MODULE_4__utils_crypto__["signTransaction"])(privateKey,transaction);
        } else {
            let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/gettransactionsign`,{
                transaction : transaction,
                privateKey : privateKey
            })
            return data;
        }
    }
    /**
     * Broadcast signed transactions。
     * @param {object} signTransaction
     * @return {object} {result:true}
     * */
    async sendRawTransaction(signTransaction){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/broadcasttransaction`,signTransaction)
        return data;
    }
    /**
     * Change the account name (only once)
     * @param {string} account_name,{string} owner_address
     * @return {object}
     * */
    async updateAccount(account_name,owner_address){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/updateaccount`,{
            account_name:Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(account_name),
            owner_address:Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address)
        })
        return data;
    }
    /**
     * Vote on superdelegates
     * @param {string} owner_address, {object} votes example:
     * [{"vote_address": "41e552f6487585c2b58bc2c9bb4492bc1f17132cd0", "vote_count": 5}]
     *
     * */
    async voteWitnessAccount(owner_address,votes){
        let newVotes = votes.map((item)=>{
            return {
                vote_count:item.vote_count,
                vote_address:Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(item.vote_address)
            }
        })
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/votewitnessaccount`,{
            owner_address:Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address),
            votes:newVotes
        })
        return data;
    }

    /**
     * Publish the Token
     * @param {object} oToken: {
        "owner_address":"41e552f6487585c2b58bc2c9bb4492bc1f17132cd0",
        "name":"0x6173736574497373756531353330383934333132313538",
        "abbr": "0x6162627231353330383934333132313538",
        "total_supply" :4321,
        "trx_num":1,
        "num":1,
        "start_time" : 1530894315158,
        "end_time":1533894312158,
        "description":"007570646174654e616d6531353330363038383733343633",
        "url":"007570646174654e616d6531353330363038383733343633",
        "free_asset_net_limit":10000,
        "public_free_asset_net_limit":10000,
        "frozen_supply":{"frozen_amount":1, "frozen_days":2}
        }
     *
     * */
    async createToken(oToken){
        let {
            owner_address,
            name,
            abbr,
            total_supply,
            trx_num,
            num,
            start_time,
            end_time,
            description,
            url,
            free_asset_net_limit,
            public_free_asset_net_limit,
            frozen_supply
        } = oToken;
        owner_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address);
        name = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(name);
        abbr=Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(abbr);
        description=Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(description);
        url = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(url);
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/createassetissue`,{
            owner_address,
            name,
            abbr,
            total_supply,
            trx_num,
            num,
            start_time,
            end_time,
            description,
            url,
            free_asset_net_limit,
            public_free_asset_net_limit,
            frozen_supply
        })
        return data;

    }

    /**
     * Create account
     * @param {string} owner_address,{string} account_address
     * */
    async createAccount(owner_address,account_address){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/createaccount`,{
            owner_address:Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address),
            account_address:Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(account_address)
        })
        return data;
    }

    /**
     * Apply to be a super delegate
     * @param {string} owner_address,{string} url
     * @return {object} transaction
     * */
    async createWitness(owner_address,url){
        let {data}=await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/createwitness`,{
            owner_address:Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address),
            url:Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(url)
        })
        return data;
    }
    /**Transfer the Token
     * @param {object} options {{"owner_address":"Txxxxxxx...", "to_address": "Txxxxxxx...", "asset_name": "a token", "amount": 100}}
     * @return {object} transaction
     *
     * */
    async transferAsset(options){
        let {owner_address,to_address,asset_name,amount} = options;
        owner_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address);
        to_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(to_address);
        asset_name = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(asset_name);

        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/transferasset`,{
            owner_address,to_address,asset_name,amount
        })
        return data;
    }
    /**
     * Quick transfer,this api maybe leak the private key,so call this api in a safe environment please.(before call this api,please call createAddress api to generate the address)
     * @param {string} passPhrase,{string} toAddress, {int} amount
     * @return {object}
     * */
    async easytransfer(passPhrase,toAddress,amount) {
        let { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/easytransfer`,{
            passPhrase:Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(passPhrase),
            toAddress:Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(toAddress),
            amount
        })
        return data;
    }

    /**
     * Create an address with a password,this api maybe leak the password,so call this api in a safe environment please.
     * @param {string} password
     * @return {object}
     * */
    async createAddress(password){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/createaddress`,{
            value: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(password)
        })
        return data;
    }

    /**
     * Participate in token issuance
     * @param {object} {
                "to_address": "41e552f6487585c2b58bc2c9bb4492bc1f17132cd0",
                "owner_address":"41e472f387585c2b58bc2c9bb4492bc1f17342cd1",
                "amount":100,
                "asset_name":"3230313271756265696a696e67"
               }
     * @return {object} transaction
     * */
    async participateAssetIssue(options){
        let {to_address,owner_address,amount,asset_name} = options;
        to_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(to_address);
        owner_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address);
        asset_name = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(asset_name);

        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/participateassetissue`,{
            to_address,
            owner_address,
            amount,
            asset_name
        });
        return data;
    }
    /**
     * Freeze TRX, gain bandwidth, gain voting rights
     * @param {string} owner_address,{float} frozen_balance,{int} frozen_duration
     * @return {object} transaction
     * */
    async freezeBalance(owner_address,frozen_balance,frozen_duration){
        owner_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address);
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/freezebalance`,{
            owner_address,
            frozen_balance,
            frozen_duration
        })
        return data;
    }

    /**
     * The thawing of TRX that has ended the freeze will also lose the bandwidth and voting power that this part of TRX brings
     * @param {string} owner_address
     * @return {object} transaction
     * */
    async unfreezeBalance(owner_address){
        owner_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address);
        let {data} = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/unfreezebalance`,{
            owner_address
        })
        return data;
    }

    /**
     * Thawing has ended the Token freeze
     * @param {string} owner_address
     * @return {object} transaction
     * */
    async unfreezeAsset(owner_address){
        owner_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address);
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/unfreezeasset`,{
            owner_address
        })
        return data;
    }
    /**
     * Superdelegates represent rewards to balance, which can be withdrawn every 24 hours
     * @param {string} owner_address
     * @return {object} transaction
     */
    async withdrawBalance(owner_address){
        owner_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address);
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/withdrawbalance`,{
            owner_address
        })
        return data;
    }
    /**
     * Modify token information
     * @param {string} owner_address,{string} description,{string} url,{int} new_limit,{int} new_public_limit
     * @return {object} transaction
     * */
    async updateAsset(options){
        let {owner_address,description,url,new_limit,new_public_limit} = options;
        owner_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address);
        description = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(description);
        url = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(url);
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/updateasset`,{
            owner_address,description,url,new_limit,new_public_limit
        })
        return data;
    }
    /**
     * Query the node on which the API is connected
     * @param null
     * @return {object Array}
     * */
    async listNodes(){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/listnodes`);
        return data;
    }
    /**
     * Check the token issued by the account
     * @param {string} address
     * @return {object}
     * */
    async getAssetIssueByAccount(address){
        address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address);
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getassetissuebyaccount`,{address})
        return data;
    }
    /**
     * Query bandwidth information
     * @param {string} address
     * @return {object}
     * */
    async getAccountNet(address){
        address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address);
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getaccountnet`,{address})
        return data;
    }
    /**
     * Query token by name
     * @param {string} value
     * @return {object}
     * */
    async getAssetIssueByName(value){
        value = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(value);
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getassetissuebyname`,{value})
        return data;
    }
   
    /**
     * Query blocks by scope
     * @param {int} startNum,{int} endNum
     * @return {object}
     * */
    async getBlockByLimitNext(startNum,endNum){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getblockbylimitnext`,{startNum,endNum});
        return data;
    }

    /**
     * Query the latest blocks
     * @param {int} num
     * @return {object}
     * */
    async getBlockByLatestNum(num){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getblockbylatestnum`,{num});
        return data;
    }
   

    /**
     * query all withnesses list
     * @param null
     * @returns {Array}
     * */
    async listWitNesses(){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/listwitnesses`)
        return data;
    }
    /**
     * query all token list
     * @returns {Array}
     * */
    async getAssetIssueList(){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getassetissuelist`)
        return data;
    }
    /**
     * query token list by page
     * @param {int} offset {int} limit
     * @returns {Array} 
     * */
    async getPaginateDassetIssueList(offset,limit){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getpaginatedassetissuelist`,{offset,limit})
        return data;
    }
    
    /**
     * Get the time for the next count
     * @param null
     * @returns {object} {num:time stamp}
     * */
    async getNextMainteNanceTime(){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getnextmaintenancetime`);
        return data;
    }

    /**
     * Quick transfer
     * @param {string}privateKey,{string} toAddress,{int} amount
     * @return {object}
     * */
    async easyTransferByPrivate(privateKey,toAddress,amount){
        privateKey = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["d" /* stringUtf8toHex */])(privateKey);
        toAddress = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(toAddress);
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/easytransferbyprivate`,{
            privateKey,toAddress,amount
        })
        return data;
    }
    /**
     * Generate private keys and addresses online
     * @param null
     * @return {object}
     * */
    async generateAddressOnLine(){
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/generateaddress`)
        return data;
    }
    /**
     * Generate private keys and addresses locally
     * @param null
     * @return {object}
     * */
    async generateAddressOnClient(){
        let data = await Object(__WEBPACK_IMPORTED_MODULE_3__utils_account__["generateAccount"])();
        return data;
    }


    /**
     * Check that the address is correct
     * @param {string hexString} address
     * @return {object}
     * */
    async validateAddress(address){
        address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(address);
        let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/validateaddress`,{address})
        return data;
    }
    /**
     * Deploy contract
     * @param
     * {string} abi,
     * {string} bytecode,
     * {int} bandwidth_limit 字节数,
     * {int} cpu_limit 微秒,
     * {int} storage_limit 字节数
     * {int} drop_limit 最大消耗的Drop (1trx = 1000000drop)
     * {int} call_value 本次调用网合约转账的Drop (1trx = 1000000drop)
     * {string hexString} owner_address 发起部署合约的账户地址
     * @return {object transction}
     * */
    async deployContract(options){
        try{
            let payable = false;
            let {abi,bytecode,fee_limit,call_value,owner_address,consume_user_resource_percent} = options;
            owner_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address);
            for(let v of JSON.parse(abi)){
                if(v.payable){
                    payable = true;
                }
            }
            if(payable && call_value == 0){
                throw "call_value must be set greater than 0 ,if contract type is payable";
            }
            if(!payable && call_value > 0){
                throw "call_value must be set as 0 ,if contract type is't payable";
            }
            let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/deploycontract`,{
                abi,
                bytecode,
                fee_limit,
                call_value,
                owner_address,
                consume_user_resource_percent
            })
            return data;
        }catch(err){
            console.log(err);
            return false;
        }
        
    }

    async getContract(contractAddress){
        try {
            let {data} = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/getcontract`, {
                value: Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(contractAddress)
            })
            return data;
        }catch (e) {
            console.warn(e.toString())
        }
    }

    async triggerSmartContract(options){
        let coder = new __WEBPACK_IMPORTED_MODULE_5_ethers__["utils"].AbiCoder()
        let {
            contract_address,
            function_selector,
            parameter,
            fee_limit,
            call_value,
            owner_address
        } = options
        contract_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(contract_address);
        function_selector = function_selector.replace(/\s*/g,'');
        if(parameter||parameter.length){
            let paramTypes = parameter[0];
            let paramValues = parameter[1];
            paramTypes.forEach((itemType,index)=>{
                if(itemType =='address'){
                    paramValues[index] = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(paramValues[index]).replace(/^(41)/,'0x');
                }
            })
            parameter = coder.encode(paramTypes,paramValues).replace(/^(0x)/,'');
        }

        owner_address = Object(__WEBPACK_IMPORTED_MODULE_1__utils_help__["a" /* address2HexString */])(owner_address);

        let { data } = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${this.apiUrl}/wallet/triggersmartcontract`,{
            contract_address,
            function_selector,
            parameter,
            fee_limit,
            call_value,
            owner_address
        })

        return data;
    }

    async getEventResult({contractAddress,eventName,blockNum,transactionId}) {
        let requestUrl = `${this.tronInfuraUrl}/event/contract`;
        if(contractAddress){
            requestUrl+=`/${contractAddress}`
        }
        if(eventName){
            requestUrl+=`/${eventName}`
        }
        if(blockNum){
            requestUrl+=`/${blockNum}`
        }
        if(transactionId){
            requestUrl = `${this.tronInfuraUrl}/event/transaction/${transactionId}`
        }
        let result = await __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(requestUrl);
        return result;
    }

    contract(abiArray){
        let _this = this;
        return {
            abi: abiArray,
            at: async function(address) {
                if (address) {
                    let { contract_address,origin_address } = await _this.getContract(address);
                    let abiObj = __WEBPACK_IMPORTED_MODULE_2__private__["a" /* parseAbi */].call(_this,abiArray,{contract_address,owner_address: _this.defaultAccount})
                    let contractInstance = Object.assign({address:contract_address},abiObj);
                    return contractInstance;
                }
                return new Object();
            },
            new: async function(options,pk) {
                let _self = this;
                let bytecode = options.data;
                let owner_address = options.from||_this.defaultAccount;
                let fee_limit = options.fee_limit;
                let call_value = options.call_value;
                let consume_user_resource_percent = options.consume_user_resource_percent;
                let abi =JSON.stringify(abiArray);
                let res = await _this.deployContract({
                    abi,
                    bytecode,
                    fee_limit,
                    call_value,
                    owner_address,
                    consume_user_resource_percent
                })
                if(res){
                    let returnRes ={transactionHash:res.txID,address:res.contract_address}
                    if(Object.keys(res).indexOf('txID')>-1){
                        const signTransaction = await _this.signTransaction(res,pk)
                        //广播交易
                        const result = await _this.sendRawTransaction(signTransaction);
                        if(result){
                            returnRes.broadCast = true;
                        }

                    }
                    let contractInstance = await _self.at(returnRes.address);
                    return Object.assign(contractInstance,returnRes);    
                }else{
                    return res;
                }
                
            }
        }
    }

    toBigNumber(str){
        return Object(__WEBPACK_IMPORTED_MODULE_6_bignumber_js__["BigNumber"])(str)
    }
    sendTransactionByWallet(options,callback){
        let {to,amount,transaction} = options;
        if(document){
            let oTronWallet = document.getElementById("oTronWallet");
            let oWalletTransationResult = document.getElementById('transaction_wallet_result');
            if (oTronWallet) {
                console.log('Chrome extension is installed!');
                var open_wallet = document.createEvent('Event');
                open_wallet.initEvent('open_wallet', true, true);
                oTronWallet.innerText=JSON.stringify({
                    to:to,
                    amount:amount||0,
                    data:transaction
                });
                oTronWallet.dispatchEvent(open_wallet);
                oWalletTransationResult.value = '';
                let timer = setInterval(async ()=>{
                    if(oWalletTransationResult.value){
                        let walletResult = JSON.parse(oWalletTransationResult.value);
                        if(!walletResult.success){
                            callback&&callback('Failed')
                        }else{
                            let transactionid = walletResult.transaction.txID;
                            let validResult = await this.getTransaction(transactionid);
                            if(Object.keys(validResult).length==0){
                                callback&&callback('Failed')
                            }else{
                                callback&&callback('success')
                            }
                        }
                        clearInterval(timer);
                    }
                },500)

            }
            else {
                let returnWarn = 'Chrome extention is not installed yet...';
                console.log(returnWarn);
                return returnWarn;
            }
        }
    }
    trxToSun(trxCount){
        if(trxCount>=0){
            return trxCount*Math.pow(10,6)
        }
        return 0;
    }
    sunToTrx(sunCount){
        if(sunCount>=0){
            return sunCount/Math.pow(10,6)
        }
        return 0;
    }

}
/* harmony default export */ __webpack_exports__["a"] = (TronWeb);


/***/ }),

/***/ "../src/lib/base58.js":
/***/ (function(module, exports) {

var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
var ALPHABET_MAP = {}
for(var i = 0; i < ALPHABET.length; i++) {
  ALPHABET_MAP[ALPHABET.charAt(i)] = i
}
var BASE = 58;

/**
 *
 * @param buffer
 * @returns {string}
 */
function encode58(buffer) {
  if (buffer.length === 0) return '';

  var i, j, digits = [0];
  for (i = 0; i < buffer.length; i++) {
    for (j = 0; j < digits.length; j++) digits[j] <<= 8

    digits[0] += buffer[i];

    var carry = 0;
    for (j = 0; j < digits.length; ++j) {
      digits[j] += carry;

      carry = (digits[j] / BASE) | 0;
      digits[j] %= BASE
    }

    while (carry) {
      digits.push(carry % BASE);

      carry = (carry / BASE) | 0
    }
  }

  // deal with leading zeros
  for (i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) digits.push(0)

  return digits.reverse().map(function(digit) { return ALPHABET[digit] }).join('');
}

/**
 * @param string
 * @returns number[]
 */
function decode58(string) {
  if (string.length === 0) return []

  var i, j, bytes = [0]
  for (i = 0; i < string.length; i++) {
    var c = string[i]
    if (!(c in ALPHABET_MAP)) throw new Error('Non-base58 character')

    for (j = 0; j < bytes.length; j++) bytes[j] *= BASE
    bytes[0] += ALPHABET_MAP[c]

    var carry = 0
    for (j = 0; j < bytes.length; ++j) {
      bytes[j] += carry

      carry = bytes[j] >> 8
      bytes[j] &= 0xff
    }

    while (carry) {
      bytes.push(carry & 0xff)

      carry >>= 8
    }
  }

  // deal with leading zeros
  for (i = 0; string[i] === '1' && i < string.length - 1; i++) {
    bytes.push(0)
  }

  return bytes.reverse();
}

module.exports = {
  encode58,
  decode58,
};


/***/ }),

/***/ "../src/lib/code.js":
/***/ (function(module, exports) {

/* eslint-disable */
function bin2String(array) {
  return String.fromCharCode.apply(String, array);
}

//比较两个byteArray是否相等
function arrayEquals(array1, array2) {
  if (array1.length != array2.length) {
    return false;
  }
  var i;
  for (i = 0; i < array1.length; i++) {
    if (array1[i] != array2[i]) {
      return false;
    }
  }
  return true;
}

//字符串转byteArray数据格式
function stringToBytes(str) {
  var bytes = new Array();
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(((c >> 18) & 0x07) | 0xF0);
      bytes.push(((c >> 12) & 0x3F) | 0x80);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0);
      bytes.push((c & 0x3F) | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }
  return bytes;

}

//byteArray数据格式转字符串
function bytesToString(arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  var str = '',
      _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
        v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}

function hextoString(hex) {
  var arr = hex.split("")
  var out = ""
  for (var i = 0; i < arr.length / 2; i++) {
    var tmp = "0x" + arr[i * 2] + arr[i * 2 + 1]
    var charValue = String.fromCharCode(tmp);
    out += charValue
  }
  return out
}

/* Convert a hex char to value */
function hexChar2byte(c) {
  var d = 0;
  if (c >= 'A' && c <= 'F') {
    d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }
  else if (c >= 'a' && c <= 'f') {
    d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
  }
  else if (c >= '0' && c <= '9') {
    d = c.charCodeAt(0) - '0'.charCodeAt(0);
  }
  return d;
}

/* Check if a char is hex char */
function isHexChar(c) {
  if ((c >= 'A' && c <= 'F') ||
      (c >= 'a' && c <= 'f') ||
      (c >= '0' && c <= '9')) {
    return 1;
  }
  return 0;
}

/* Convert HEX string to byte array */

//16进制的ASCII字符串转为byteArray格式。
function hexStr2byteArray(str) {
  var byteArray = Array();
  var d = 0;
  var j = 0;
  var k = 0;

  for (let i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;
      if (0 === (j % 2)) {
        byteArray[k++] = d;
        d = 0;
      }
    }
  }
  return byteArray;
}


/* Convert a byte to string */
function byte2hexStr(byte) {
  var hexByteMap = "0123456789ABCDEF";
  var str = "";
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
}

/* Convert byte arry to HEX string */

//byteArray格式数据转为16进制的ASCII字符串。
function byteArray2hexStr(byteArray) {
  var str = "";
  for (var i = 0; i < (byteArray.length - 1); i++) {
    str += byte2hexStr(byteArray[i]);
  }
  str += byte2hexStr(byteArray[i]);
  return str;
}

//从base64字符串中解码出原文，格式为byteArray格式
function base64DecodeFromString(string64) {
  var b = new Base64();
  var decodeBytes = b.decodeToByteArray(string64);
  return decodeBytes;
}

//return baset64 String
//将byteArray格式数据编码为base64字符串
function base64EncodeToString(bytes) {
  // var string = bytesToString(bytes);
  var b = new Base64();
  var string64 = b.encodeIgnoreUtf8(bytes);
  return string64
}

function Base64() {

  // private property
  let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
//    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for encoding
  this.encodeIgnoreUtf8 = function (inputBytes) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
//    input = _utf8_encode(input);
    while (i < inputBytes.length) {
      chr1 = inputBytes[i++];
      chr2 = inputBytes[i++];
      chr3 = inputBytes[i++];
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = this._utf8_decode(output);
    return output;
  }

  // public method for decoding
  this.decodeToByteArray = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    var outBytes = this._out2ByteArray(output);
    return outBytes;
  };

  // private method for UTF-8 decoding
  this._out2ByteArray = function (utftext) {
    let byteArray = new Array(utftext.length)
    let i = 0;
    let c = 0;
    let c1 = 0;
    let c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      byteArray[i] = c;
      i++;
    }
    return byteArray;
  };

  // private method for UTF-8 encoding
  this._utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  // private method for UTF-8 decoding
  this._utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3
            & 63));
        i += 3;
      }
    }
    return string;
  }
}

//yyyy-MM-DD HH-mm-ss
function strToDate(str) {
  var tempStrs = str.split(" ");
  var dateStrs = tempStrs[0].split("-");
  var year = parseInt(dateStrs[0], 10);
  var month = parseInt(dateStrs[1], 10) - 1;
  var day = parseInt(dateStrs[2], 10);
  if (tempStrs.length > 1) {
    var timeStrs = tempStrs[1].split("-");
    var hour = parseInt(timeStrs [0], 10);
    var minute = parseInt(timeStrs[1], 10) - 1;
    var second = parseInt(timeStrs[2], 10);
    return new Date(year, month, day, hour, minute, second);
  }

  return new Date(year, month, day);
}

function isNumber(c) {
  if (c >= '0' && c <= '9') {
    return 1;
  }
  return 0;
}

//return 1: address  --- 20Bytes HexString
//return 2: blockNumber ------ Decimal number
//return 3: assetName ------ String
//return other: error
function getStringType(str) {
  if (null == str) {
    return -1;
  }

  if (typeof(str) != 'string') {
    return -1;
  }

  if (str.length == 0 || str == "") {
    return -1;
  }

  var i = 0;
  if (str.length == 40) {
    for (; i < 40; i++) {
      var c = str.charAt(i);
      if (!isHexChar(c)) {
        break;
      }
    }
  }
  if (i == 40) {
    return 1;  //40 Hex, Address
  }

  for (i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (!isNumber(c)) {
      break;
    }
  }
  if (i == str.length) {
    return 2;  //Alll Decimal number, BlockNumber
  }

  for (i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (c > ' ') {
      return 3;   //At least one visible character
    }
  }

  return -1;
}

module.exports = {
  base64EncodeToString,
  base64DecodeFromString,
  hexStr2byteArray,
  stringToBytes
};


/***/ }),

/***/ "../src/lib/sha256.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;/*
 A JavaScript implementation of the SHA family of hashes, as
 defined in FIPS PUB 180-4 and FIPS PUB 202, as well as the corresponding
 HMAC implementation as defined in FIPS PUB 198a

 Copyright Brian Turek 2008-2017
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information

 Several functions taken from Paul Johnston
*/

(function (I) {
  function w(c, a, d) {
    var l = 0, b = [], g = 0, f, n, k, e, h, q, y, p, m = !1, t = [], r = [], u,
        z = !1;
    d = d || {};
    f = d.encoding || "UTF8";
    u = d.numRounds || 1;
    if (u !== parseInt(u, 10) || 1 > u) {
      throw Error(
          "numRounds must a integer >= 1");
    }
    if (0 === c.lastIndexOf("SHA-", 0)) {
      if (q = function (b, a) {
            return A(b, a, c)
          }, y = function (b, a, l, f) {
            var g, e;
            if ("SHA-224" === c || "SHA-256" === c) {
              g = (a + 65 >>> 9 << 4)
                  + 15, e = 16;
            } else {
              throw Error(
                  "Unexpected error in SHA-2 implementation");
            }
            for (; b.length <= g;) {
              b.push(0);
            }
            b[a >>> 5] |= 128 << 24 - a % 32;
            a = a + l;
            b[g] = a & 4294967295;
            b[g - 1] = a / 4294967296 | 0;
            l = b.length;
            for (a = 0; a < l; a += e) {
              f = A(b.slice(a, a + e), f, c);
            }
            if ("SHA-224" === c) {
              b = [f[0], f[1], f[2], f[3], f[4], f[5],
                f[6]];
            } else if ("SHA-256" === c) {
              b = f;
            } else {
              throw Error(
                  "Unexpected error in SHA-2 implementation");
            }
            return b
          }, p = function (b) {
            return b.slice()
          }, "SHA-224" === c) {
        h = 512, e = 224;
      } else if ("SHA-256"
          === c) {
        h = 512, e = 256;
      } else {
        throw Error(
            "Chosen SHA variant is not supported");
      }
    } else {
      throw Error(
          "Chosen SHA variant is not supported");
    }
    k = B(a, f);
    n = x(c);
    this.setHMACKey = function (b, a, g) {
      var e;
      if (!0 === m) {
        throw Error("HMAC key already set");
      }
      if (!0 === z) {
        throw Error("Cannot set HMAC key after calling update");
      }
      f = (g || {}).encoding || "UTF8";
      a = B(a, f)(b);
      b = a.binLen;
      a = a.value;
      e = h >>> 3;
      g = e / 4 - 1;
      if (e < b / 8) {
        for (a = y(a, b, 0, x(c)); a.length <= g;) {
          a.push(0);
        }
        a[g] &= 4294967040
      } else if (e > b / 8) {
        for (; a.length <= g;) {
          a.push(0);
        }
        a[g] &= 4294967040
      }
      for (b = 0; b <= g; b += 1) {
        t[b] = a[b] ^ 909522486, r[b] = a[b]
            ^ 1549556828;
      }
      n = q(t, n);
      l = h;
      m = !0
    };
    this.update = function (a) {
      var c, f, e, d = 0, p = h >>> 5;
      c = k(a, b, g);
      a = c.binLen;
      f = c.value;
      c = a >>> 5;
      for (e = 0; e < c; e += p) {
        d + h <= a && (n = q(f.slice(e, e + p),
            n), d += h);
      }
      l += d;
      b = f.slice(d >>>
          5);
      g = a % h;
      z = !0
    };
    this.getHash = function (a, f) {
      var d, h, k, q;
      if (!0 === m) {
        throw Error("Cannot call getHash after setting HMAC key");
      }
      k = C(f);
      switch (a) {
        case "HEX":
          d = function (a) {
            return D(a, e, k)
          };
          break;
        case "B64":
          d = function (a) {
            return E(a, e, k)
          };
          break;
        case "BYTES":
          d = function (a) {
            return F(a, e)
          };
          break;
        case "ARRAYBUFFER":
          try {
            h = new ArrayBuffer(0)
          } catch (v) {
            throw Error("ARRAYBUFFER not supported by this environment");
          }
          d = function (a) {
            return G(a, e)
          };
          break;
        default:
          throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");
      }
      q = y(b.slice(), g, l, p(n));
      for (h = 1; h < u; h += 1) {
        q = y(q, e, 0, x(c));
      }
      return d(q)
    };
    this.getHMAC = function (a, f) {
      var d, k, t, u;
      if (!1 === m) {
        throw Error(
            "Cannot call getHMAC without first setting HMAC key");
      }
      t = C(f);
      switch (a) {
        case "HEX":
          d = function (a) {
            return D(a, e, t)
          };
          break;
        case "B64":
          d = function (a) {
            return E(a, e, t)
          };
          break;
        case "BYTES":
          d = function (a) {
            return F(a, e)
          };
          break;
        case "ARRAYBUFFER":
          try {
            d = new ArrayBuffer(0)
          } catch (v) {
            throw Error("ARRAYBUFFER not supported by this environment");
          }
          d = function (a) {
            return G(a, e)
          };
          break;
        default:
          throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
      }
      k = y(b.slice(), g, l, p(n));
      u = q(r, x(c));
      u = y(k, e, h, u);
      return d(u)
    }
  }

  function m() {
  }

  function D(c, a, d) {
    var l = "";
    a /= 8;
    var b, g;
    for (b = 0; b < a; b += 1) {
      g = c[b >>> 2] >>> 8 * (3 + b % 4
          * -1), l += "0123456789abcdef".charAt(g >>> 4 & 15)
          + "0123456789abcdef".charAt(g & 15);
    }
    return d.outputUpper ? l.toUpperCase() : l
  }

  function E(c, a, d) {
    var l = "", b = a / 8, g, f, n;
    for (g = 0; g < b; g += 3) {
      for (f = g + 1 < b ? c[g + 1 >>> 2] : 0, n = g
      + 2 < b ? c[g + 2 >>> 2] : 0, n = (c[g >>> 2] >>> 8 * (3 + g % 4 * -1)
          & 255) << 16 | (f >>> 8 * (3 + (g + 1) % 4 * -1) & 255) << 8 | n >>> 8
          * (3 + (g + 2) % 4 * -1) & 255, f = 0; 4 > f; f += 1) {
        8 * g + 6 * f <= a
            ? l += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n
            >>>
            6 * (3 - f) & 63) : l += d.b64Pad;
      }
    }
    return l
  }

  function F(c, a) {
    var d = "", l = a / 8, b, g;
    for (b = 0; b < l; b += 1) {
      g = c[b >>> 2] >>> 8 * (3 + b % 4 * -1)
          & 255, d += String.fromCharCode(g);
    }
    return d
  }

  function G(c, a) {
    var d = a / 8, l, b = new ArrayBuffer(d), g;
    g = new Uint8Array(b);
    for (l = 0; l < d; l += 1) {
      g[l] = c[l >>> 2] >>> 8 * (3 + l % 4 * -1) & 255;
    }
    return b
  }

  function C(c) {
    var a = {outputUpper: !1, b64Pad: "=", shakeLen: -1};
    c = c || {};
    a.outputUpper = c.outputUpper || !1;
    !0 === c.hasOwnProperty("b64Pad") && (a.b64Pad = c.b64Pad);
    if ("boolean" !== typeof a.outputUpper) {
      throw Error(
          "Invalid outputUpper formatting option");
    }
    if ("string" !== typeof a.b64Pad) {
      throw Error(
          "Invalid b64Pad formatting option");
    }
    return a
  }

  function B(c, a) {
    var d;
    switch (a) {
      case "UTF8":
      case "UTF16BE":
      case "UTF16LE":
        break;
      default:
        throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");
    }
    switch (c) {
      case "HEX":
        d = function (a, b, c) {
          var f = a.length, d, k, e, h, q;
          if (0 !== f % 2) {
            throw Error(
                "String of HEX type must be in byte increments");
          }
          b = b || [0];
          c = c || 0;
          q = c >>> 3;
          for (d = 0; d < f; d += 2) {
            k = parseInt(a.substr(d, 2), 16);
            if (isNaN(k)) {
              throw Error(
                  "String of HEX type contains invalid characters");
            }
            h = (d >>> 1) + q;
            for (e = h >>> 2; b.length <= e;) {
              b.push(0);
            }
            b[e] |= k << 8 * (3 + h % 4 * -1)
          }
          return {value: b, binLen: 4 * f + c}
        };
        break;
      case "TEXT":
        d = function (c, b, d) {
          var f, n, k = 0, e, h, q, m, p, r;
          b = b || [0];
          d = d || 0;
          q = d >>> 3;
          if ("UTF8" === a) {
            for (r = 3, e = 0; e < c.length;
                e += 1) {
              for (f = c.charCodeAt(e), n = [], 128 > f ? n.push(f)
                  : 2048 > f ? (n.push(192 | f >>> 6), n.push(128 | f & 63))
                      : 55296 > f || 57344 <= f ? n.push(224 | f >>> 12, 128 | f
                          >>> 6 & 63, 128 | f & 63) : (e += 1, f = 65536 + ((f
                          & 1023) << 10 | c.charCodeAt(e) & 1023), n.push(240
                          | f
                          >>> 18, 128 | f >>> 12 & 63, 128 | f >>> 6 & 63, 128
                          | f
                          & 63)), h = 0; h < n.length; h += 1) {
                p = k +
                    q;
                for (m = p >>> 2; b.length <= m;) {
                  b.push(0);
                }
                b[m] |= n[h] << 8 * (r + p % 4 * -1);
                k += 1
              }
            }
          } else if ("UTF16BE" === a || "UTF16LE"
              === a) {
            for (r = 2, n = "UTF16LE" === a && !0 || "UTF16LE" !== a
                && !1, e = 0; e < c.length; e += 1) {
              f = c.charCodeAt(e);
              !0 === n && (h = f & 255, f = h << 8 | f >>> 8);
              p = k + q;
              for (m = p >>> 2; b.length <= m;) {
                b.push(0);
              }
              b[m] |= f << 8 * (r + p % 4 * -1);
              k += 2
            }
          }
          return {value: b, binLen: 8 * k + d}
        };
        break;
      case "B64":
        d = function (a, b, c) {
          var f = 0, d, k, e, h, q, m, p;
          if (-1 === a.search(/^[a-zA-Z0-9=+\/]+$/)) {
            throw Error(
                "Invalid character in base-64 string");
          }
          k = a.indexOf("=");
          a = a.replace(/\=/g,
              "");
          if (-1 !== k && k < a.length) {
            throw Error(
                "Invalid '=' found in base-64 string");
          }
          b = b || [0];
          c = c || 0;
          m = c >>> 3;
          for (k = 0; k < a.length; k += 4) {
            q = a.substr(k, 4);
            for (e = h = 0; e < q.length;
                e += 1) {
              d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(
                  q[e]), h |= d << 18 - 6 * e;
            }
            for (e = 0; e < q.length - 1; e += 1) {
              p = f + m;
              for (d = p >>> 2; b.length <= d;) {
                b.push(0);
              }
              b[d] |= (h >>> 16 - 8 * e & 255) << 8 * (3 + p % 4 * -1);
              f += 1
            }
          }
          return {value: b, binLen: 8 * f + c}
        };
        break;
      case "BYTES":
        d = function (a, b, c) {
          var d, n, k, e, h;
          b = b || [0];
          c = c || 0;
          k = c >>> 3;
          for (n = 0; n < a.length; n +=
              1) {
            d = a.charCodeAt(n), h = n + k, e = h >>> 2, b.length <= e
            && b.push(0), b[e] |= d << 8 * (3 + h % 4 * -1);
          }
          return {value: b, binLen: 8 * a.length + c}
        };
        break;
      case "ARRAYBUFFER":
        try {
          d = new ArrayBuffer(0)
        } catch (l) {
          throw Error("ARRAYBUFFER not supported by this environment");
        }
        d = function (a, b, c) {
          var d, n, k, e, h;
          b = b || [0];
          c = c || 0;
          n = c >>> 3;
          h = new Uint8Array(a);
          for (d = 0; d < a.byteLength; d += 1) {
            e = d + n, k = e >>> 2, b.length
            <= k && b.push(0), b[k] |= h[d] << 8 * (3 + e % 4 * -1);
          }
          return {value: b, binLen: 8 * a.byteLength + c}
        };
        break;
      default:
        throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");
    }
    return d
  }

  function r(c, a) {
    return c >>> a | c << 32 - a
  }

  function J(c, a, d) {
    return c & a ^ ~c & d
  }

  function K(c, a, d) {
    return c & a ^ c & d ^ a & d
  }

  function L(c) {
    return r(c, 2) ^ r(c, 13) ^ r(c, 22)
  }

  function M(c) {
    return r(c, 6) ^ r(c, 11) ^ r(c, 25)
  }

  function N(c) {
    return r(c, 7) ^ r(c, 18) ^ c >>> 3
  }

  function O(c) {
    return r(c, 17) ^ r(c, 19) ^ c >>> 10
  }

  function P(c, a) {
    var d = (c & 65535) + (a & 65535);
    return ((c >>> 16) + (a >>> 16) + (d >>> 16) & 65535) << 16 | d & 65535
  }

  function Q(c, a, d, l) {
    var b = (c & 65535) + (a & 65535) + (d & 65535) + (l & 65535);
    return ((c >>> 16) + (a >>> 16) + (d >>> 16) + (l >>> 16) + (b >>>
        16) & 65535) << 16 | b & 65535
  }

  function R(c, a, d, l, b) {
    var g = (c & 65535) + (a & 65535) + (d & 65535) + (l & 65535) + (b & 65535);
    return ((c >>> 16) + (a >>> 16) + (d >>> 16) + (l >>> 16) + (b >>> 16) + (g
        >>> 16) & 65535) << 16 | g & 65535
  }

  function x(c) {
    var a = [], d;
    if (0 === c.lastIndexOf("SHA-", 0)) {
      switch (a = [3238371032, 914150663,
        812702999, 4144912697, 4290775857, 1750603025, 1694076839,
        3204075428], d = [1779033703, 3144134277, 1013904242, 2773480762,
        1359893119, 2600822924, 528734635, 1541459225], c) {
        case "SHA-224":
          break;
        case "SHA-256":
          a = d;
          break;
        case "SHA-384":
          a = [new m, new m,
            new m, new m, new m, new m, new m, new m];
          break;
        case "SHA-512":
          a = [new m, new m, new m, new m, new m, new m, new m, new m];
          break;
        default:
          throw Error("Unknown SHA variant");
      }
    } else {
      throw Error("No SHA variants supported");
    }
    return a
  }

  function A(c, a, d) {
    var l, b, g, f, n, k, e, h, m, r, p, w, t, x, u, z, A, B, C, D, E, F,
        v = [], G;
    if ("SHA-224" === d || "SHA-256"
        === d) {
      r = 64, w = 1, F = Number, t = P, x = Q, u = R, z = N, A = O, B = L, C = M, E = K, D = J, G = H;
    } else {
      throw Error(
          "Unexpected error in SHA-2 implementation");
    }
    d = a[0];
    l = a[1];
    b = a[2];
    g = a[3];
    f = a[4];
    n = a[5];
    k = a[6];
    e = a[7];
    for (p =
        0; p < r; p += 1) {
      16 > p ? (m = p * w, h = c.length <= m ? 0
          : c[m], m = c.length <= m + 1 ? 0 : c[m + 1], v[p] = new F(h, m))
          : v[p] = x(A(v[p - 2]), v[p - 7], z(v[p - 15]), v[p - 16]), h = u(e,
          C(f), D(f, n, k), G[p], v[p]), m = t(B(d),
          E(d, l, b)), e = k, k = n, n = f, f = t(g,
          h), g = b, b = l, l = d, d = t(h, m);
    }
    a[0] = t(d, a[0]);
    a[1] = t(l, a[1]);
    a[2] = t(b, a[2]);
    a[3] = t(g, a[3]);
    a[4] = t(f, a[4]);
    a[5] = t(n, a[5]);
    a[6] = t(k, a[6]);
    a[7] = t(e, a[7]);
    return a
  }

  var H;
  H = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206,
    2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628,
    770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349,
    2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895,
    666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051,
    2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
    3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616,
    659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
    1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
    2756734187, 3204031479, 3329325298];
   true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return w
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" !== typeof exports ? ("undefined" !== typeof module
  && module.exports && (module.exports = w), exports = w) : I.jsSHA = w
})(this);


/***/ }),

/***/ "../src/private.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parseAbi;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_crypto__ = __webpack_require__("../src/utils/crypto.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_crypto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ethers__ = __webpack_require__("../node_modules/ethers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ethers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ethers__);


async function timeInterval(eventName,ms,fn) {
    let timerName = eventName+'_timer';

   return await new Promise((resolve) => {
        window[timerName] =setInterval(()=>{
           fn.then((result)=>{
               resolve(result);
           })
        }, ms);
    });
}
function parseAbi(abiArray,{owner_address,contract_address}){

    let _this = this;
    let returnObj = {};
    returnObj.abi = abiArray;
    abiArray.forEach((item)=>{
        if(item.type =='function') {
            returnObj[item.name] = async function () {
                let arrInputs = item.inputs;
                let arrOutputs = item.outputs;
                let params = [];
                let paramInputTypes = [];
                let paramInputValues = [];
                let paramOutputTypes = [];
                let function_selector = item.name;
                let otherParams = {};
                arrInputs.forEach((itemInput) => {
                    paramInputTypes.push(itemInput.type);
                })
                arrOutputs.forEach((itemOutput) => {
                    paramOutputTypes.push(itemOutput.type);
                })
                function_selector += `(${paramInputTypes.join(',')})`;
                params.push(paramInputTypes, paramInputValues);

                for (let i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] == 'object') {
                        otherParams = arguments[i];
                    } else {
                        paramInputValues.push(arguments[i])
                    }
                }
                let triggerCallBackParams = {
                    owner_address,
                    contract_address,
                    function_selector,
                    parameter: params,
                    fee_limit: otherParams.fee_limit,
                    call_value: otherParams.call_value,
                }
                let res = await _this.triggerSmartContract(triggerCallBackParams);
                if (res.constant_result) {
                    let coder = new __WEBPACK_IMPORTED_MODULE_1_ethers__["utils"].AbiCoder();
                    if (res.constant_result.length) {
                        //let value = res.constant_result[0];
                        let constantArr = res.constant_result.map((item) => {
                            return ('0x' + item);
                        })
                        res.constant_result = coder.decode(paramOutputTypes, constantArr[0]);
                    }
                }
                return res;

            }

            returnObj[item.name].sendTransaction = async function (transaction, pk) {
                const sign_Transaction = await Object(__WEBPACK_IMPORTED_MODULE_0__utils_crypto__["signTransaction"])(pk, transaction)

                const sendResult = await _this.sendRawTransaction(sign_Transaction);

                return sendResult;
            }
        }
        if(item.type =='event'){
            returnObj[item.name] =  function({contractAddress = contract_address,eventName,blockNum,transactionId}={}) {
                contractAddress = _this.fromHex(contractAddress);
                let _self = this;
                return {
                    async fn(){
                        let {data} =await  _this.getEventResult({
                            contractAddress,
                            eventName,
                            blockNum,
                            transactionId
                        })
                        return data;
                    },
                    watch(callback){
                         this.fn().then((data)=>{
                             callback('',data)
                         }).catch((e)=>{
                             callback(e.toString())
                         })
                         _self.timer =setInterval(()=>{
                             this.fn().then((data)=>{
                                 callback('',data)
                             }).catch((e)=>{
                                 callback(e.toString())
                             })
                         }, 3000);

                    },
                    async get(callback){
                        this.fn().then((data)=>{
                            callback('',data)
                        }).catch((e)=>{
                            callback(e.toString())
                        })
                    },
                    stopWatching(){
                         clearInterval(_self.timer)
                    }

                }
            }
        }
    })
    return returnObj;
}

/***/ }),

/***/ "../src/utils/account.js":
/***/ (function(module, exports, __webpack_require__) {

const byteArray2hexStr = __webpack_require__("../src/utils/bytes.js").byteArray2hexStr;
const base64EncodeToString = __webpack_require__("../src/lib/code.js").base64EncodeToString;
const {getBase58CheckAddress, genPriKey, getAddressFromPriKey} = __webpack_require__("../src/utils/crypto.js");

/**
 * Generate a new account
 */
function generateAccount() {
  let priKeyBytes = genPriKey();
  let addressBytes = getAddressFromPriKey(priKeyBytes);
  let address = getBase58CheckAddress(addressBytes);
  let password = base64EncodeToString(priKeyBytes);
  let privateKey = byteArray2hexStr(priKeyBytes);

  return {
    privateKey,
    address,
    password,
  }
}

module.exports = {
  generateAccount,
};


/***/ }),

/***/ "../src/utils/address.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {let isTestNet = process.env.NET === 'testnet';

const ADDRESS_SIZE = isTestNet ? 35 : 34;
const ADDRESS_PREFIX = isTestNet ? "a0" : "41";
const ADDRESS_PREFIX_BYTE = isTestNet ? 0xa0 : 0x41;

module.exports = {
  ADDRESS_SIZE,
  ADDRESS_PREFIX,
  ADDRESS_PREFIX_BYTE,
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "../src/utils/base64.js":
/***/ (function(module, exports) {


exports.Base64 = function() {

  // private property
  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
//    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for encoding
  this.encodeIgnoreUtf8 = function (inputBytes) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
//    input = _utf8_encode(input);
    while (i < inputBytes.length) {
      chr1 = inputBytes[i++];
      chr2 = inputBytes[i++];
      chr3 = inputBytes[i++];
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }

  // public method for decoding
  this.decodeToByteArray = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    var outBytes = _out2ByteArray(output);
    return outBytes;
  }

  // private method for UTF-8 decoding
  _out2ByteArray = function (utftext) {
    var byteArray = new Array(utftext.length)
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      byteArray[i] = c;
      i++;
    }
    return byteArray;
  }

  // private method for UTF-8 encoding
  _utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  // private method for UTF-8 decoding
  _utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3
          & 63));
        i += 3;
      }
    }
    return string;
  }
}


/***/ }),

/***/ "../src/utils/bytes.js":
/***/ (function(module, exports, __webpack_require__) {

const {Base64} = __webpack_require__("../src/utils/base64.js");


/* Convert a byte to string */
function byte2hexStr(byte) {
  var hexByteMap = "0123456789ABCDEF";
  var str = "";
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
}

/**
 * Converts a byte array to string
 *
 * @param {Uint8Array} arr byte array
 * @returns {string}
 */
function bytesToString(arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  let str = '',
    _arr = arr;
  for (let i = 0; i < _arr.length; i++) {
    let one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);
    if (v && one.length === 8) {
      let bytesLength = v[0].length;
      let store = _arr[i].toString(2).slice(7 - bytesLength);
      for (let st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}

/**
 * Converts a hex string to a decoded string
 *
 * @param {string} hex
 * @returns {string}
 */
function hextoString(hex) {
  let arr = hex.split("");
  let out = "";
  for (let i = 0; i < arr.length / 2; i++) {
    let tmp = "0x" + arr[i * 2] + arr[i * 2 + 1];
    out += String.fromCharCode(tmp);
  }
  return out;
}

function base64DecodeFromString(string64) {
  return new Base64().decodeToByteArray(string64);
}


function byteArray2hexStr(byteArray) {
  let str = "";
  for (let i = 0; i < (byteArray.length); i++) {
    str += byte2hexStr(byteArray[i]);
  }
  return str;
}


module.exports = {
  byteArray2hexStr,
  hextoString,
  base64DecodeFromString,
  bytesToString,
  byte2hexStr
};


/***/ }),

/***/ "../src/utils/crypto.js":
/***/ (function(module, exports, __webpack_require__) {

const {ADDRESS_PREFIX, ADDRESS_PREFIX_BYTE} = __webpack_require__("../src/utils/address.js");
const base64EncodeToString = __webpack_require__("../src/lib/code.js").base64EncodeToString;
const {base64DecodeFromString, hexStr2byteArray} = __webpack_require__("../src/lib/code.js");
const {encode58, decode58} = __webpack_require__("../src/lib/base58.js");
const EC = __webpack_require__("../node_modules/elliptic/lib/elliptic.js").ec;
const { keccak256 } = __webpack_require__("../node_modules/js-sha3/src/sha3.js");
const jsSHA = __webpack_require__("../src/lib/sha256.js");
const ADDRESS_SIZE = __webpack_require__("../src/utils/address.js").ADDRESS_SIZE;
const { byte2hexStr, byteArray2hexStr } = __webpack_require__("../src/utils/bytes.js");


//return address by Base58Check String,
function getBase58CheckAddress(addressBytes) {
  var hash0 = SHA256(addressBytes);
  var hash1 = SHA256(hash0);
  var checkSum = hash1.slice(0, 4);
  checkSum = addressBytes.concat(checkSum);
  return encode58(checkSum);
}

function decodeBase58Address(base58Sting) {
    var zeroAddress = hexStr2byteArray(
        "000000000000000000000000000000000000000000");
    if (typeof (base58Sting) != 'string') {
        console.error("Input format error!");
        return;
    }
    if (base58Sting.length <= 4) {
        console.error("Input length error!");
        return;
    }
    var address = decode58(base58Sting);
    if (base58Sting.length <= 4) {
        console.error("Decode58 output length error!");
        return;
    }
    var len = address.length;
    var offset = len - 4;
    var checkSum = address.slice(offset);
    address = address.slice(0, offset);
    var hash0 = SHA256(address);
    var hash1 = SHA256(hash0);
    var checkSum1 = hash1.slice(0, 4);
    if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2]
        == checkSum1[2] && checkSum[3] == checkSum1[3]
    ) {
        return address;
    }
    console.error("Check sum error!");
    return zeroAddress;
}
/**
 * Sign A Transaction by priKey.
 * signature is 65 bytes, r[32] || s[32] || id[1](<27)
 * @returns  a Transaction object signed
 * @param priKeyBytes: privateKey for ECC
 * @param transaction: a Transaction object unSigned
 */
/*function signTransaction(priKeyBytes, transaction) {

    if (typeof priKeyBytes === 'string') {
        priKeyBytes = hexStr2byteArray(priKeyBytes);
    }
    let raw = transaction.getRawData();
    let rawBytes = raw.serializeBinary();
    let hashBytes = SHA256(rawBytes);
    let signBytes = ECKeySign(hashBytes, priKeyBytes);
    let uint8Array = new Uint8Array(signBytes);
    let count = raw.getContractList().length;
    for (let i = 0; i < count; i++) {
        transaction.addSignature(uint8Array);
    }

    return {
        transaction,
        hex: byteArray2hexStr(transaction.serializeBinary()),
    };
}*/
function signTransaction(priKeyBytes, transaction) {

    if (typeof priKeyBytes === 'string') {
        priKeyBytes = hexStr2byteArray(priKeyBytes);
    }
    let txID = transaction.txID;
    let signature = ECKeySign(hexStr2byteArray(txID),priKeyBytes);

    transaction.signature=[signature];
    return transaction;
}


function arrayToBase64String(a) {
    return btoa(String.fromCharCode(...a));
}

function signBytes(privateKey, contents) {

    if (typeof privateKey === 'string') {
        privateKey = hexStr2byteArray(privateKey);
    }

    let hashBytes = SHA256(contents);
    let signBytes = ECKeySign(hashBytes, privateKey);

    return signBytes;
}

//return bytes of rowdata, use to sign.
function getRowBytesFromTransactionBase64(base64Data) {
    let bytesDecode = base64DecodeFromString(base64Data);
    let transaction = proto.protocol.Transaction.deserializeBinary(bytesDecode);
    let raw = transaction.getRawData();
    return raw.serializeBinary();
}

//gen Ecc priKey for bytes
function genPriKey() {
    let ec = new EC('secp256k1');
    let key = ec.genKeyPair();
    let priKey = key.getPrivate();
    let priKeyHex = priKey.toString('hex');
    while (priKeyHex.length < 64) {
        priKeyHex = "0" + priKeyHex;
    }

    return hexStr2byteArray(priKeyHex);
}

//return address by bytes, pubBytes is byte[]
function computeAddress(pubBytes) {
    if (pubBytes.length === 65) {
        pubBytes = pubBytes.slice(1);
    }

    var hash = keccak256(pubBytes).toString();
    var addressHex = hash.substring(24);
    addressHex = ADDRESS_PREFIX + addressHex;
    return hexStr2byteArray(addressHex);
}

//return address by bytes, priKeyBytes is byte[]
function getAddressFromPriKey(priKeyBytes) {
    let pubBytes = getPubKeyFromPriKey(priKeyBytes);
    return computeAddress(pubBytes);
}

//return address by Base58Check String,
function getBase58CheckAddress(addressBytes) {
    var hash0 = SHA256(addressBytes);
    var hash1 = SHA256(hash0);
    var checkSum = hash1.slice(0, 4);
    checkSum = addressBytes.concat(checkSum);
    return encode58(checkSum);
}

function decode58Check(addressStr) {

    var decodeCheck = decode58(addressStr);
    if (decodeCheck.length <= 4) {
        console.error("ERROR CHECK");
        return null;
    }

    var decodeData = decodeCheck.slice(0, decodeCheck.length - 4);
    var hash0 = SHA256(decodeData);
    var hash1 = SHA256(hash0);

    if (hash1[0] === decodeCheck[decodeData.length] &&
        hash1[1] === decodeCheck[decodeData.length + 1] &&
        hash1[2] === decodeCheck[decodeData.length + 2] &&
        hash1[3] === decodeCheck[decodeData.length + 3]) {
        return decodeData;
    }

    return null;
}

function isAddressValid(base58Str) {
    if (typeof(base58Str) !== 'string') {
        return false;
    }
    if (base58Str.length !== ADDRESS_SIZE) {
        return false;
    }
    var address = decode58(base58Str);

    if (address.length !== 25) {
        return false;
    }
    if (address[0] !== ADDRESS_PREFIX_BYTE) {
        return false;
    }
    var checkSum = address.slice(21);
    address = address.slice(0, 21);
    var hash0 = SHA256(address);
    var hash1 = SHA256(hash0);
    var checkSum1 = hash1.slice(0, 4);
    if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2]
        == checkSum1[2] && checkSum[3] == checkSum1[3]
    ) {
        return true
    }
    return false;
}

//return address by Base58Check String, priKeyBytes is base64String
function getBase58CheckAddressFromPriKeyBase64String(priKeyBase64String) {
    var priKeyBytes = base64DecodeFromString(priKeyBase64String);
    var pubBytes = getPubKeyFromPriKey(priKeyBytes);
    var addressBytes = computeAddress(pubBytes);
    return getBase58CheckAddress(addressBytes);
}

//return address by String, priKeyBytes is base64String
function getHexStrAddressFromPriKeyBase64String(priKeyBase64String) {
    let priKeyBytes = base64DecodeFromString(priKeyBase64String);
    let pubBytes = getPubKeyFromPriKey(priKeyBytes);
    let addressBytes = computeAddress(pubBytes);
    let addressHex = byteArray2hexStr(addressBytes);
    return addressHex;
}
//return address by String, priKeyBytes is base64String
function getAddressFromPriKeyBase64String(priKeyBase64String) {
    let priKeyBytes = base64DecodeFromString(priKeyBase64String);
    let pubBytes = getPubKeyFromPriKey(priKeyBytes);
    let addressBytes = computeAddress(pubBytes);
    let addressBase64 = base64EncodeToString(addressBytes);
    return addressBase64;
}

//return pubkey by 65 bytes, priKeyBytes is byte[]
function getPubKeyFromPriKey(priKeyBytes) {
    var ec = new EC('secp256k1');
    var key = ec.keyFromPrivate(priKeyBytes, 'bytes');
    var pubkey = key.getPublic();
    var x = pubkey.x;
    var y = pubkey.y;
    var xHex = x.toString('hex');
    while (xHex.length < 64) {
        xHex = "0" + xHex;
    }
    var yHex = y.toString('hex');
    while (yHex.length < 64) {
        yHex = "0" + yHex;
    }
    var pubkeyHex = "04" + xHex + yHex;
    var pubkeyBytes = hexStr2byteArray(pubkeyHex);
    return pubkeyBytes;
}

//return sign by 65 bytes r s id. id < 27
function ECKeySign(hashBytes, priKeyBytes) {
    let ec = new EC('secp256k1');
    let key = ec.keyFromPrivate(priKeyBytes, 'bytes');
    let signature = key.sign(hashBytes);
    let r = signature.r;
    let s = signature.s;
    let id = signature.recoveryParam;

    let rHex = r.toString('hex');
    while (rHex.length < 64) {
        rHex = "0" + rHex;
    }
    let sHex = s.toString('hex');
    while (sHex.length < 64) {
        sHex = "0" + sHex;
    }
    let idHex = byte2hexStr(id);
    let signHex = rHex + sHex + idHex;
    return signHex;
    //return hexStr2byteArray(signHex);
}

//return 32 bytes
function SHA256(msgBytes) {
    let shaObj = new jsSHA("SHA-256", "HEX");
    let msgHex = byteArray2hexStr(msgBytes);
    shaObj.update(msgHex);
    let hashHex = shaObj.getHash("HEX");
    return hexStr2byteArray(hashHex);
}

function passwordToAddress(password) {
    let com_priKeyBytes = base64DecodeFromString(password);
    let com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
    return getBase58CheckAddress(com_addressBytes);
}

function pkToAddress(privateKey) {
    let com_priKeyBytes = hexStr2byteArray(privateKey);
    let com_addressBytes = getAddressFromPriKey(com_priKeyBytes);
    return getBase58CheckAddress(com_addressBytes);
}





module.exports = {
    decodeBase58Address,
    byteArray2hexStr,
    signTransaction,
    passwordToAddress,
    genPriKey,
    getAddressFromPriKey,
    getPubKeyFromPriKey,
    getBase58CheckAddress,
    isAddressValid,
    getBase58CheckAddressFromPriKeyBase64String,
    pkToAddress,
    decode58Check,
    signBytes,
};


/***/ }),

/***/ "../src/utils/help.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = address2HexString;
/* harmony export (immutable) */ __webpack_exports__["b"] = hexString2Address;
/* harmony export (immutable) */ __webpack_exports__["c"] = hexString2Utf8;
/* harmony export (immutable) */ __webpack_exports__["d"] = stringUtf8toHex;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_code__ = __webpack_require__("../src/lib/code.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_code___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lib_code__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crypto__ = __webpack_require__("../src/utils/crypto.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__crypto__);



function hexStringToBase58(sHexString){
    if (sHexString.length < 2 || (sHexString.length & 1) != 0) {
        alert("addressHex error!");
        return;
    }
    var bytes = Object(__WEBPACK_IMPORTED_MODULE_0__lib_code__["hexStr2byteArray"])(sHexString);
    return Object(__WEBPACK_IMPORTED_MODULE_1__crypto__["getBase58CheckAddress"])(bytes);
}
function base58ToHexString(sBase58) {
    var bytes = Object(__WEBPACK_IMPORTED_MODULE_1__crypto__["decodeBase58Address"])(sBase58);
    return Object(__WEBPACK_IMPORTED_MODULE_1__crypto__["byteArray2hexStr"])(bytes);
}
function hexStringToUtf8(hex) {
    var arr = hex.split("")
    var out = ""
    for (var i = 0; i < arr.length / 2; i++) {
        var tmp = "0x" + arr[i * 2] + arr[i * 2 + 1]
        var charValue = String.fromCharCode(tmp);
        out += charValue
    }
    return out
}
function stringUtf8tHex(str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {
        if (val == "")
            val = str.charCodeAt(i).toString(16);
        else
            val += str.charCodeAt(i).toString(16);
    }
    return val
}

function address2HexString(sHexAddress){
    if(sHexAddress.length==42&&sHexAddress.indexOf('41')==0){
        return sHexAddress;
    }
    return base58ToHexString(sHexAddress)
}
function hexString2Address(sAddress){
    return hexStringToBase58(sAddress)
}
function hexString2Utf8(sHexString){
    return hexStringToUtf8(sHexString)
}
function stringUtf8toHex(sUtf8){
    return stringUtf8tHex(sUtf8)
}


/***/ }),

/***/ "./node_modules/axios/index.js":
false,

/***/ "./node_modules/axios/lib/adapters/xhr.js":
false,

/***/ "./node_modules/axios/lib/axios.js":
false,

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
false,

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
false,

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
false,

/***/ "./node_modules/axios/lib/core/Axios.js":
false,

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
false,

/***/ "./node_modules/axios/lib/core/createError.js":
false,

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
false,

/***/ "./node_modules/axios/lib/core/enhanceError.js":
false,

/***/ "./node_modules/axios/lib/core/settle.js":
false,

/***/ "./node_modules/axios/lib/core/transformData.js":
false,

/***/ "./node_modules/axios/lib/defaults.js":
false,

/***/ "./node_modules/axios/lib/helpers/bind.js":
false,

/***/ "./node_modules/axios/lib/helpers/btoa.js":
false,

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
false,

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
false,

/***/ "./node_modules/axios/lib/helpers/cookies.js":
false,

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
false,

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
false,

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
false,

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
false,

/***/ "./node_modules/axios/lib/helpers/spread.js":
false,

/***/ "./node_modules/axios/lib/utils.js":
false,

/***/ "./node_modules/babel-runtime/regenerator/index.js":
false,

/***/ "./node_modules/bignumber.js/bignumber.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/curve/base.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/curve/edwards.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/curve/index.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/curve/mont.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/curve/short.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/curves.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/ec/index.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/ec/key.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/ec/signature.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/eddsa/index.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/eddsa/key.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/eddsa/signature.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/utils.js":
false,

/***/ "./node_modules/elliptic/package.json":
false,

/***/ "./node_modules/hmac-drbg/lib/hmac-drbg.js":
false,

/***/ "./node_modules/is-buffer/index.js":
false,

/***/ "./node_modules/js-sha3/src/sha3.js":
false,

/***/ "./node_modules/minimalistic-crypto-utils/lib/utils.js":
false,

/***/ "./node_modules/tronweb/es/index.js":
false,

/***/ "./node_modules/tronweb/es/lib/base58.js":
false,

/***/ "./node_modules/tronweb/es/lib/code.js":
false,

/***/ "./node_modules/tronweb/es/lib/sha256.js":
false,

/***/ "./node_modules/tronweb/es/private.js":
false,

/***/ "./node_modules/tronweb/es/utils/account.js":
false,

/***/ "./node_modules/tronweb/es/utils/address.js":
false,

/***/ "./node_modules/tronweb/es/utils/base64.js":
false,

/***/ "./node_modules/tronweb/es/utils/bytes.js":
false,

/***/ "./node_modules/tronweb/es/utils/crypto.js":
false,

/***/ "./node_modules/tronweb/es/utils/help.js":
false,

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_jsx_style__ = __webpack_require__("./node_modules/styled-jsx/style.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_index__ = __webpack_require__("../src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact__ = __webpack_require__("./node_modules/json-stringify-pretty-compact/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ethers__ = __webpack_require__("./node_modules/ethers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ethers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ethers__);

var _jsxFileName = "/Users/tron/Workspace/tron/tron-web/examples/pages/index.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }




 //let tronWeb = new TronWeb('http://52.44.75.99:8090');
//tronWeb.setEventServer('http://52.44.75.99:18889');
//tronWeb.defaultAccount = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';
//tronWeb.defaultPk='da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

var tronWeb = new __WEBPACK_IMPORTED_MODULE_3__src_index__["a" /* default */]('http://testapi.trondapps.org');
tronWeb.setEventServer('http://testevent.trondapps.org');
tronWeb.defaultAccount = 'TWsm8HtU2A5eEzoT8ev8yaoFjHsXLLrckb';
tronWeb.defaultPk = '8ef7dd1a81d4ef2b538daae0c20e37f4edb3fd1338aff91b03e2b8b1ed956645';

var Index =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        data: {}
      }
    }), _temp));
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var coder = new __WEBPACK_IMPORTED_MODULE_5_ethers__["utils"].AbiCoder();
      window.tronWeb = tronWeb;
    }
  }, {
    key: "triggerChromeWallet",
    value: function triggerChromeWallet() {
      tronWeb.sendTransactionByWallet({
        to: 'TZ3SmkD8qJK3VY8AnqN9XFiYuspEP3cwB5',
        amount: 0.1
      }, function (result) {
        console.log('cbk', result);
      });
    }
  }, {
    key: "toBigNumber",
    value: function () {
      var _toBigNumber = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee() {
        var str, bigNumber, value;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                str = '200000000000000000000001';
                bigNumber = tronWeb.toBigNumber(str);
                console.log(bigNumber.toNumber(), '2.0000000000000002e+23');
                value = bigNumber.toString(10);
                this.setState({
                  data: value
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function toBigNumber() {
        return _toBigNumber.apply(this, arguments);
      };
    }()
  }, {
    key: "getBalance",
    value: function () {
      var _getBalance = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee2() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return tronWeb.getBalance(this.account.value);

              case 2:
                res = _context2.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getBalance() {
        return _getBalance.apply(this, arguments);
      };
    }()
  }, {
    key: "getBlock",
    value: function () {
      var _getBlock = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee3() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return tronWeb.getBlock(this.idOrHeight.value);

              case 2:
                res = _context3.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function getBlock() {
        return _getBlock.apply(this, arguments);
      };
    }()
  }, {
    key: "getBlockTransactionCount",
    value: function () {
      var _getBlockTransactionCount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee4() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return tronWeb.getBlockTransactionCount(this.idOrHeight.value);

              case 2:
                res = _context4.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function getBlockTransactionCount() {
        return _getBlockTransactionCount.apply(this, arguments);
      };
    }()
  }, {
    key: "getTransaction",
    value: function () {
      var _getTransaction = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee5() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return tronWeb.getTransaction(this.transactionId.value);

              case 2:
                res = _context5.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function getTransaction() {
        return _getTransaction.apply(this, arguments);
      };
    }() //生成私钥和地址并存储到localStorage中
    //该api有泄漏private key的风险，请确保在安全的环境中调用该api

  }, {
    key: "generateAddress",
    value: function () {
      var _generateAddress = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee6() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return tronWeb.generateAddressOnLine();

              case 2:
                res = _context6.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function generateAddress() {
        return _generateAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "generateAddressOnClient",
    value: function () {
      var _generateAddressOnClient = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee7() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return tronWeb.generateAddressOnClient();

              case 2:
                res = _context7.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function generateAddressOnClient() {
        return _generateAddressOnClient.apply(this, arguments);
      };
    }() //通过密码创建地址

  }, {
    key: "createAddressWithPassWord",
    value: function () {
      var _createAddressWithPassWord = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee8() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return tronWeb.createAddress('123456');

              case 2:
                res = _context8.sent;
                console.log(res); //{base58checkAddress: "TMip2NnRKhy2Wyf1FjKG1D1yn3F1LLGCDV",value:""4180e8816651790d4d6c187eef09f90b7a19408bb8"

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function createAddressWithPassWord() {
        return _createAddressWithPassWord.apply(this, arguments);
      };
    }() //转账

  }, {
    key: "sendTransaction",
    value: function () {
      var _sendTransaction = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee9(e) {
        var from, to, amount, pk, res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                e.preventDefault();
                from = this.from.value;
                to = this.to.value;
                amount = parseInt(this.amount.value);
                pk = this.pkForTransaction.value;
                _context9.next = 7;
                return tronWeb.sendTransaction(from, to, amount, pk);

              case 7:
                res = _context9.sent;
                this.setState({
                  data: res
                });

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function sendTransaction(_x) {
        return _sendTransaction.apply(this, arguments);
      };
    }() //1、更新账户名称

  }, {
    key: "updateAccount",
    value: function () {
      var _updateAccount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee10() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return tronWeb.updateAccount('wujiaolong1009', 'TT67rPNwgmpeimvHUMVzFfKsjL9GZ1wGw8');

              case 2:
                res = _context10.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function updateAccount() {
        return _updateAccount.apply(this, arguments);
      };
    }() //2、Vote for the superrepresentative

  }, {
    key: "voteWitnessAccount",
    value: function () {
      var _voteWitnessAccount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee11() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return tronWeb.voteWitnessAccount('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9', [{
                  vote_address: 'TQxyQu5d76MaxsEF4nBf9tFa8s93nSHe8M',
                  vote_count: 1
                }]);

              case 2:
                res = _context11.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function voteWitnessAccount() {
        return _voteWitnessAccount.apply(this, arguments);
      };
    }() //3、发行token

  }, {
    key: "createAssetIssue",
    value: function () {
      var _createAssetIssue = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee12() {
        var options, res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                options = {
                  owner_address: 'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
                  name: 'TestTRX',
                  //名称
                  abbr: 'TTRX',
                  //简称
                  total_supply: 100,
                  //发行总量
                  trx_num: 1,
                  // 和 num 的兑换比例
                  num: 1,
                  start_time: 1530894315158,
                  //开始时间
                  end_time: 1533894312158,
                  //结束时间
                  description: '这是一个测试token',
                  //描述
                  url: 'http://www.baidu.com',
                  //官网地址
                  free_asset_net_limit: 10000,
                  //免费带宽
                  public_free_asset_net_limit: 10000,
                  // 每个token用户能使用本token的免费带宽
                  frozen_supply: {
                    frozen_amount: 1,
                    //发行者在发行的时候指定冻结的token
                    frozen_days: 2 //冻结的天数

                  }
                };
                _context12.next = 3;
                return tronWeb.createToken(options);

              case 3:
                res = _context12.sent;
                this.setState({
                  data: res
                });

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function createAssetIssue() {
        return _createAssetIssue.apply(this, arguments);
      };
    }() //5、 Apply to be a superrepresentative

  }, {
    key: "createWitness",
    value: function () {
      var _createWitness = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee13() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return tronWeb.createWitness('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9', 'http://www.xxx.com');

              case 2:
                res = _context13.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function createWitness() {
        return _createWitness.apply(this, arguments);
      };
    }() //6、 Transfer token

  }, {
    key: "transferAsset",
    value: function () {
      var _transferAsset = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee14() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return tronWeb.transferAsset({
                  owner_address: 'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
                  to_address: 'TRzzMbFDNdFnRgGqKCkqoCuLoHfyRZfuVL',
                  asset_name: 'ZZZ',
                  amount: 1
                });

              case 2:
                res = _context14.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function transferAsset() {
        return _transferAsset.apply(this, arguments);
      };
    }() //7、 Participation in token distribution

  }, {
    key: "participateAssetIssue",
    value: function () {
      var _participateAssetIssue = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee15() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return tronWeb.transferAsset({
                  owner_address: 'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
                  to_address: 'TRzzMbFDNdFnRgGqKCkqoCuLoHfyRZfuVL',
                  asset_name: 'ZZZ',
                  amount: 1
                });

              case 2:
                res = _context15.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      return function participateAssetIssue() {
        return _participateAssetIssue.apply(this, arguments);
      };
    }() //8、 解冻已经技术冻结期的 TRX

  }, {
    key: "unfreezeBalance",
    value: function () {
      var _unfreezeBalance = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee16() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return tronWeb.unfreezeBalance('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');

              case 2:
                res = _context16.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      return function unfreezeBalance() {
        return _unfreezeBalance.apply(this, arguments);
      };
    }() //9、解冻已经结束冻结期的 token

  }, {
    key: "unfreezeAsset",
    value: function () {
      var _unfreezeAsset = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee17() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return tronWeb.unfreezeAsset('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');

              case 2:
                res = _context17.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      return function unfreezeAsset() {
        return _unfreezeAsset.apply(this, arguments);
      };
    }() //10、超级代表提现奖励到balance,每24小时可提现一次

  }, {
    key: "withdrawBalance",
    value: function () {
      var _withdrawBalance = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee18() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return tronWeb.withdrawBalance('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');

              case 2:
                res = _context18.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      return function withdrawBalance() {
        return _withdrawBalance.apply(this, arguments);
      };
    }() //11、修改token信息

  }, {
    key: "updateAsset",
    value: function () {
      var _updateAsset = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee19() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return tronWeb.updateAsset({
                  owner_address: "TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9",
                  description: 'test',
                  url: 'http://www.baidu.com',
                  new_limit: 1000000,
                  new_public_limit: 100
                });

              case 2:
                res = _context19.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      return function updateAsset() {
        return _updateAsset.apply(this, arguments);
      };
    }() //12、查询api所在机器连接的节点

  }, {
    key: "listNodes",
    value: function () {
      var _listNodes = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee20() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return tronWeb.listNodes();

              case 2:
                res = _context20.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      return function listNodes() {
        return _listNodes.apply(this, arguments);
      };
    }() //13、查询账户发行的token

  }, {
    key: "getAssetIssueByAccount",
    value: function () {
      var _getAssetIssueByAccount = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee21() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return tronWeb.getAssetIssueByAccount('TRzzMbFDNdFnRgGqKCkqoCuLoHfyRZfuVL');

              case 2:
                res = _context21.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      return function getAssetIssueByAccount() {
        return _getAssetIssueByAccount.apply(this, arguments);
      };
    }() //14、根据名称查询token

  }, {
    key: "getAssetIssueByName",
    value: function () {
      var _getAssetIssueByName = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee22() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return tronWeb.getAssetIssueByName('ZZZ');

              case 2:
                res = _context22.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      return function getAssetIssueByName() {
        return _getAssetIssueByName.apply(this, arguments);
      };
    }() //15、查询最新块

  }, {
    key: "blockNumber",
    value: function () {
      var _blockNumber = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee23() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return tronWeb.blockNumber();

              case 2:
                res = _context23.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      return function blockNumber() {
        return _blockNumber.apply(this, arguments);
      };
    }() //16、通过高度查询块

  }, {
    key: "getBlockByNum",
    value: function () {
      var _getBlockByNum = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee24() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return tronWeb.getBlockByNum(869015);

              case 2:
                res = _context24.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      return function getBlockByNum() {
        return _getBlockByNum.apply(this, arguments);
      };
    }() //17、通过id查询块

  }, {
    key: "getBlockById",
    value: function () {
      var _getBlockById = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee25() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                _context25.next = 2;
                return tronWeb.getBlockById('00000000000d429759175a43cb3e112d0761ecabf06ef0c253affe1420977651');

              case 2:
                res = _context25.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      return function getBlockById() {
        return _getBlockById.apply(this, arguments);
      };
    }() //18、按照范围查询块

  }, {
    key: "getBlockByLimitNext",
    value: function () {
      var _getBlockByLimitNext = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee26() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return tronWeb.getBlockByLimitNext(869010, 869015);

              case 2:
                res = _context26.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      return function getBlockByLimitNext() {
        return _getBlockByLimitNext.apply(this, arguments);
      };
    }() //19、﻿查询最新的几个块

  }, {
    key: "getBlockByLatestNum",
    value: function () {
      var _getBlockByLatestNum = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee27() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.next = 2;
                return tronWeb.getBlockByLatestNum(5);

              case 2:
                res = _context27.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      return function getBlockByLatestNum() {
        return _getBlockByLatestNum.apply(this, arguments);
      };
    }() //20、通过ID查询交易

  }, {
    key: "getTransactionById",
    value: function () {
      var _getTransactionById = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee28() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _context28.next = 2;
                return tronWeb.getTransactionById('0689352aff84a0ff3691502bca94b1ded40abb4aa8806b313acb59a34cf10c22');

              case 2:
                res = _context28.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      return function getTransactionById() {
        return _getTransactionById.apply(this, arguments);
      };
    }() //21、查询所有超级代表列表

  }, {
    key: "listWitNesses",
    value: function () {
      var _listWitNesses = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee29() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return tronWeb.listWitNesses();

              case 2:
                res = _context29.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));

      return function listWitNesses() {
        return _listWitNesses.apply(this, arguments);
      };
    }() //22、查询所有token列表

  }, {
    key: "getAssetIssueList",
    value: function () {
      var _getAssetIssueList = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee30() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                _context30.next = 2;
                return tronWeb.getAssetIssueList();

              case 2:
                res = _context30.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      return function getAssetIssueList() {
        return _getAssetIssueList.apply(this, arguments);
      };
    }() //23、分页查询token列表

  }, {
    key: "getPaginateDassetIssueList",
    value: function () {
      var _getPaginateDassetIssueList = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee31() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.next = 2;
                return tronWeb.getPaginateDassetIssueList(1, 10);

              case 2:
                res = _context31.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));

      return function getPaginateDassetIssueList() {
        return _getPaginateDassetIssueList.apply(this, arguments);
      };
    }() //24、统计所有交易总数

  }, {
    key: "totalTransaction",
    value: function () {
      var _totalTransaction = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee32() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.next = 2;
                return tronWeb.getTransactionCount();

              case 2:
                res = _context32.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));

      return function totalTransaction() {
        return _totalTransaction.apply(this, arguments);
      };
    }() //25、获取下次统计投票时间

  }, {
    key: "getNextMaintenanceTime",
    value: function () {
      var _getNextMaintenanceTime = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee33() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _context33.next = 2;
                return tronWeb.getNextMainteNanceTime();

              case 2:
                res = _context33.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));

      return function getNextMaintenanceTime() {
        return _getNextMaintenanceTime.apply(this, arguments);
      };
    }() //26、检查地址是否正确

  }, {
    key: "validateAddress",
    value: function () {
      var _validateAddress = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee34() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                _context34.next = 2;
                return tronWeb.validateAddress('TZ3SmkD8qJK3VY8AnqN9XFiYuspEP3cwB5');

              case 2:
                res = _context34.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this);
      }));

      return function validateAddress() {
        return _validateAddress.apply(this, arguments);
      };
    }() //27、部署合约

  }, {
    key: "deployContract",
    value: function () {
      var _deployContract = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee35(event) {
        var myContract, contractInstance;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                event.preventDefault();
                myContract = tronWeb.contract(JSON.parse(this.abi.value)); //部署合约

                _context35.next = 4;
                return myContract.new({
                  from: this.owner_address.value,
                  data: this.byteCode.value,
                  fee_limit: this.fee_limit.value,
                  call_value: this.call_value.value,
                  consume_user_resource_percent: 0
                }, this.pk.value);

              case 4:
                contractInstance = _context35.sent;
                this.setState({
                  data: contractInstance
                });

              case 6:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
      }));

      return function deployContract(_x2) {
        return _deployContract.apply(this, arguments);
      };
    }() //28、查询合约

  }, {
    key: "getContract",
    value: function () {
      var _getContract = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee36() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                _context36.next = 2;
                return tronWeb.getContract(this.contract_address.value);

              case 2:
                res = _context36.sent;
                this.setState({
                  data: res
                });

              case 4:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this);
      }));

      return function getContract() {
        return _getContract.apply(this, arguments);
      };
    }() //29、调用合约

  }, {
    key: "triggerContract",
    value: function () {
      var _triggerContract = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee37() {
        var abi, myContract, contractAddress, contractInstance, _ref2, transaction, result, constant_result, res, myEvent;

        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                abi = [{
                  "constant": false,
                  "inputs": [{
                    "name": "number",
                    "type": "uint256"
                  }],
                  "name": "fibonacciNotify",
                  "outputs": [{
                    "name": "result",
                    "type": "uint256"
                  }],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
                }, {
                  "constant": true,
                  "inputs": [{
                    "name": "number",
                    "type": "uint256"
                  }],
                  "name": "fibonacci",
                  "outputs": [{
                    "name": "result",
                    "type": "uint256"
                  }],
                  "payable": false,
                  "stateMutability": "view",
                  "type": "function"
                }, {
                  "anonymous": false,
                  "inputs": [{
                    "indexed": false,
                    "name": "input",
                    "type": "uint256"
                  }, {
                    "indexed": false,
                    "name": "result",
                    "type": "uint256"
                  }],
                  "name": "Notify",
                  "type": "event"
                }];
                myContract = tronWeb.contract(abi);
                contractAddress = '41b3169cb739b1612e33188429e3872c0ca10238cd';
                _context37.next = 5;
                return myContract.at(contractAddress);

              case 5:
                contractInstance = _context37.sent;
                _context37.next = 8;
                return contractInstance.fibonacciNotify(7, {
                  fee_limit: 700000000000000,
                  call_value: 0
                });

              case 8:
                _ref2 = _context37.sent;
                transaction = _ref2.transaction;
                result = _ref2.result;
                constant_result = _ref2.constant_result;

                if (constant_result) {
                  _context37.next = 21;
                  break;
                }

                _context37.next = 15;
                return contractInstance.fibonacciNotify.sendTransaction(transaction, this.pk.value);

              case 15:
                res = _context37.sent;
                this.setState({
                  data: res
                }); //监听事件

                _context37.next = 19;
                return contractInstance.Notify();

              case 19:
                myEvent = _context37.sent;
                //默认根据合约地址查询，可以输入{eventName:'',blockNum:'',transactionId:''}
                myEvent.watch(function (err, result) {
                  var eventResult = '';
                  result.forEach(function (item) {
                    if (item.transaction_id == transaction.txID) {
                      eventResult = item.result;
                      myEvent.stopWatching();
                    }
                  });
                  console.log('eventResult:', eventResult);
                }); // console.log(eventResult)

              case 21:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, this);
      }));

      return function triggerContract() {
        return _triggerContract.apply(this, arguments);
      };
    }() //30、login

  }, {
    key: "login",
    value: function login() {
      var account = tronWeb.login(tronWeb.defaultPk);
      this.setState({
        data: account
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var data = this.state.data;
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 373
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        style: {
          marginTop: '200px'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 374
        },
        className: "jsx-2187904324" + " " + "box"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 375
        },
        className: "jsx-2187904324"
      }, "\u5DE5\u5177\u51FD\u6570 - Tool function"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 376
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "to BigNumber",
        onClick: function onClick() {
          return _this2.toBigNumber();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 377
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 379
        },
        className: "jsx-2187904324"
      }, "\u8D26\u53F7\u3001\u8F6C\u8D26 - Account number, transfer"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 380
        },
        className: "jsx-2187904324"
      }, "\u8D26\u53F7 - account number\uFF1A", __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.account = input;
        },
        defaultValue: tronWeb.defaultAccount,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 381
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        onClick: function onClick() {
          return _this2.getBalance();
        },
        value: "\u67E5\u8BE2\u8D26\u6237\u4F59\u989D - Check account balance",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 382
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 384
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "triggerWallet",
        onClick: function onClick() {
          return _this2.triggerChromeWallet();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 385
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 387
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u751F\u6210\u79C1\u94A5\u5730\u5740 - Generate private key address(onLine)",
        onClick: function onClick() {
          return _this2.generateAddress();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 388
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u751F\u6210\u79C1\u94A5\u5730\u5740 - Generate private key address(onClient)",
        onClick: function onClick() {
          return _this2.generateAddressOnClient();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 389
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 390
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u9A8C\u8BC1\u5730\u5740 - Verify address",
        onClick: function onClick() {
          return _this2.validateAddress();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 391
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u901A\u8FC7\u5BC6\u7801\u521B\u5EFA\u5730\u5740 - Create an address with a password",
        onClick: function onClick() {
          return _this2.createAddressWithPassWord();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 393
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u66F4\u65B0\u8D26\u53F7\u540D\u79F0 - Update account name",
        onClick: function onClick() {
          return _this2.updateAccount();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 395
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("hr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 396
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("form", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 397
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 398
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 398
        },
        className: "jsx-2187904324"
      }, "from"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.from = input;
        },
        defaultValue: tronWeb.defaultAccount,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 398
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 399
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 399
        },
        className: "jsx-2187904324"
      }, "to"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.to = input;
        },
        defaultValue: "TGhepyLuyML5n5jQBTykKqh9od8hQrBDkS",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 399
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 400
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 400
        },
        className: "jsx-2187904324"
      }, "amount"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this2.amount = input;
        },
        defaultValue: 1000000,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 400
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 401
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 401
        },
        className: "jsx-2187904324"
      }, "pk"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '500px'
        },
        ref: function ref(input) {
          return _this2.pkForTransaction = input;
        },
        defaultValue: tronWeb.defaultPk,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 401
        },
        className: "jsx-2187904324"
      }), " "), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        onClick: function onClick(e) {
          return _this2.sendTransaction(e);
        },
        value: "\u8F6C\u8D26 - Transfer",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 402
        },
        className: "jsx-2187904324"
      }))), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 405
        },
        className: "jsx-2187904324"
      }, "\u8282\u70B9\u67E5\u8BE2 - Node query"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 406
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2API\u6240\u5728\u673A\u5668\u8FDE\u63A5\u7684\u8282\u70B9 - Query the node to which the machine where the API is connected",
        onClick: function onClick() {
          return _this2.listNodes();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 407
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 409
        },
        className: "jsx-2187904324"
      }, "\u5757\u67E5\u8BE2 - Block query"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 410
        },
        className: "jsx-2187904324"
      }, "\u5757id\u6216\u9AD8\u5EA6 - Block id or height\uFF1A", __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '600px'
        },
        ref: function ref(input) {
          return _this2.idOrHeight = input;
        },
        defaultValue: "00000000000005ae07f42776b3bfd8e873feaebf2d743aceb716db5f70cb373b",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 411
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        onClick: function onClick() {
          return _this2.getBlock();
        },
        value: "\u67E5\u8BE2\u533A\u5757 - Query block",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 412
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        onClick: function onClick() {
          return _this2.getBlockTransactionCount();
        },
        value: "\u67E5\u8BE2\u533A\u5757\u5185\u4EA4\u6613\u6570\u91CF - Query the number of transactions in the block",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 413
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u6700\u65B0\u5757 - Query the latest block",
        onClick: function onClick() {
          return _this2.blockNumber();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 414
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 416
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 420
        },
        className: "jsx-2187904324"
      }, "\u4EA4\u6613\u67E5\u8BE2 - Transaction inquiry"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 421
        },
        className: "jsx-2187904324"
      }, "\u4EA4\u6613id - Transaction id\uFF1A", __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '600px'
        },
        ref: function ref(input) {
          return _this2.transactionId = input;
        },
        defaultValue: "c523edd7b4b776aa44e4cd4bbdf925cb4eb6d047e27316e1ff919014cc6a9f54",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 422
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u901A\u8FC7id\u67E5\u8BE2\u4EA4\u6613\u8BB0\u5F55 - Query transaction records by id",
        onClick: function onClick() {
          return _this2.getTransaction();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 423
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u7EDF\u8BA1\u6240\u6709\u7684\u4EA4\u6613\u603B\u6570 - Count all transactions",
        onClick: function onClick() {
          return _this2.totalTransaction();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 424
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 426
        },
        className: "jsx-2187904324"
      }, "\u8D85\u7EA7\u4EE3\u8868 - Super Representative (SR)"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 427
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u6240\u6709\u8D85\u7EA7\u4EE3\u8868 - Query all SR",
        onClick: function onClick() {
          return _this2.listWitNesses();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 428
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u83B7\u53D6\u4E0B\u6B21\u7EDF\u8BA1\u6295\u7968\u65F6\u95F4 - Get the next maintenance time",
        onClick: function onClick() {
          return _this2.getNextMaintenanceTime();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 429
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u7533\u8BF7\u6210\u4E3A\u8D85\u7EA7\u4EE3\u8868 - Apply to become a SR",
        onClick: function onClick() {
          return _this2.createWitness();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 430
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u4E3A\u8D85\u7EA7\u4EE3\u8868\u6295\u7968 - Vote for the SR",
        onClick: function onClick() {
          return _this2.voteWitnessAccount();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 431
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u89E3\u51BB\u7ED3\u675F\u51BB\u7ED3\u671F\u7684trx - Unfreeze the trx at the end of the freeze period",
        onClick: function onClick() {
          return _this2.unfreezeBalance();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 432
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u8D85\u7EA7\u4EE3\u8868\u63D0\u73B0\u5956\u52B1\u5230balance - SR withdraws the reward to balance",
        onClick: function onClick() {
          return _this2.withdrawBalance();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 433
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 435
        },
        className: "jsx-2187904324"
      }, "token\u7BA1\u7406 - Token management"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 436
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u6240\u6709token\u5217\u8868 - Query all token lists",
        onClick: function onClick() {
          return _this2.getAssetIssueList();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 437
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u5206\u9875\u67E5\u8BE2token\u5217\u8868 - Paging query token list",
        onClick: function onClick() {
          return _this2.getPaginateDassetIssueList();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 438
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u67D0\u8D26\u6237\u53D1\u884C\u7684token - Query the token issued by an account",
        onClick: function onClick() {
          return _this2.getAssetIssueByAccount();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 439
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u6839\u636E\u540D\u79F0\u67E5\u8BE2token - Query token by name",
        onClick: function onClick() {
          return _this2.getAssetIssueByName();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 440
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u53D1\u884Ctoken - Issue token",
        onClick: function onClick() {
          return _this2.createAssetIssue();
        },
        style: {
          color: 'red'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 441
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u8F6C\u8D26token - Transfer token",
        onClick: function onClick() {
          return _this2.transferAsset();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 442
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u4FEE\u6539token - Modify token",
        onClick: function onClick() {
          return _this2.updateAsset();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 443
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u89E3\u51BBtoken - Unfreeze the token",
        onClick: function onClick() {
          return _this2.unfreezeAsset();
        },
        style: {
          color: 'red'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 444
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u53C2\u4E0Etoken\u53D1\u884C - Participate in token issuance",
        onClick: function onClick() {
          return _this2.participateAssetIssue();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 445
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 447
        },
        className: "jsx-2187904324"
      }, "\u667A\u80FD\u5408\u7EA6 - Smart contract"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 448
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 449
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("form", {
        onSubmit: function onSubmit(e) {
          return _this2.deployContract(e);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 450
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 451
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 452
        },
        className: "jsx-2187904324"
      }, "owner_address\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.owner_address = input;
        },
        defaultValue: tronWeb.defaultAccount,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 453
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 455
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 456
        },
        className: "jsx-2187904324"
      }, "pk:"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '500px'
        },
        ref: function ref(input) {
          return _this2.pk = input;
        },
        defaultValue: tronWeb.defaultPk,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 457
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 459
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 460
        },
        className: "jsx-2187904324"
      }, "Abi"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("textarea", {
        cols: "50",
        rows: "10",
        placeholder: "abi",
        defaultValue: "[ { \"constant\": true, \"inputs\": [], \"name\": \"getUsers\", \"outputs\": [ { \"name\": \"\", \"type\": \"uint256[]\" }, { \"name\": \"\", \"type\": \"bytes32[]\" }, { \"name\": \"\", \"type\": \"uint256[]\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [ { \"name\": \"\", \"type\": \"uint256\" } ], \"name\": \"users\", \"outputs\": [ { \"name\": \"id\", \"type\": \"uint256\" }, { \"name\": \"name\", \"type\": \"bytes32\" }, { \"name\": \"point\", \"type\": \"uint256\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [], \"name\": \"last_completed_migration\", \"outputs\": [ { \"name\": \"\", \"type\": \"uint256\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [ { \"name\": \"id\", \"type\": \"uint256\" } ], \"name\": \"getName\", \"outputs\": [ { \"name\": \"\", \"type\": \"string\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [], \"name\": \"owner\", \"outputs\": [ { \"name\": \"\", \"type\": \"address\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": false, \"inputs\": [ { \"name\": \"id\", \"type\": \"uint256\" } ], \"name\": \"plusFive\", \"outputs\": [ { \"name\": \"suc\", \"type\": \"bool\" } ], \"payable\": false, \"stateMutability\": \"nonpayable\", \"type\": \"function\" }, { \"constant\": false, \"inputs\": [ { \"name\": \"userName\", \"type\": \"bytes32\" }, { \"name\": \"userPoint\", \"type\": \"uint256\" } ], \"name\": \"addUser\", \"outputs\": [ { \"name\": \"userID\", \"type\": \"uint256\" }, { \"name\": \"success\", \"type\": \"bool\" } ], \"payable\": false, \"stateMutability\": \"nonpayable\", \"type\": \"function\" }, { \"inputs\": [], \"payable\": false, \"stateMutability\": \"nonpayable\", \"type\": \"constructor\" }, { \"constant\": false, \"inputs\": [ { \"name\": \"key\", \"type\": \"uint256\" }, { \"name\": \"value\", \"type\": \"uint256\" } ], \"name\": \"set\", \"outputs\": [], \"payable\": false, \"stateMutability\": \"nonpayable\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [ { \"name\": \"key\", \"type\": \"uint256\" } ], \"name\": \"get\", \"outputs\": [ { \"name\": \"value\", \"type\": \"uint256\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [], \"name\": \"say\", \"outputs\": [ { \"name\": \"\", \"type\": \"string\" } ], \"payable\": false, \"stateMutability\": \"pure\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [ { \"name\": \"name\", \"type\": \"string\" } ], \"name\": \"print\", \"outputs\": [ { \"name\": \"\", \"type\": \"string\" } ], \"payable\": false, \"stateMutability\": \"pure\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [ { \"name\": \"_data\", \"type\": \"bytes\" } ], \"name\": \"useUtil\", \"outputs\": [ { \"name\": \"\", \"type\": \"uint256\" } ], \"payable\": false, \"stateMutability\": \"pure\", \"type\": \"function\" }, { \"constant\": true, \"inputs\": [], \"name\": \"getMigration\", \"outputs\": [ { \"name\": \"\", \"type\": \"uint256\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }, { \"constant\": false, \"inputs\": [ { \"name\": \"completed\", \"type\": \"uint256\" } ], \"name\": \"setCompleted\", \"outputs\": [], \"payable\": false, \"stateMutability\": \"nonpayable\", \"type\": \"function\" }, { \"constant\": false, \"inputs\": [ { \"name\": \"new_address\", \"type\": \"address\" } ], \"name\": \"upgrade\", \"outputs\": [], \"payable\": false, \"stateMutability\": \"nonpayable\", \"type\": \"function\" } ]",
        ref: function ref(input) {
          return _this2.abi = input;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 460
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 742
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 743
        },
        className: "jsx-2187904324"
      }, "byteCode"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("textarea", {
        cols: "50",
        rows: "10",
        placeholder: "byteCode",
        defaultValue: '0x608060405234801561001057600080fd5b5033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061100c806100616000396000f3006080604052600436106100da576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168062ce8e3e146100df5780630900f010146101db57806311114af11461021e5780631ab06ee514610300578063223eb640146103375780632c841f5814610362578063365b98b2146103df578063445df0ac146104365780636b8ff574146104615780638da5cb5b146105075780639507d39a1461055e578063954ab4b21461059f578063a8293c281461062f578063b69ea68414610674578063fdacd576146106ce575b600080fd5b3480156100eb57600080fd5b506100f46106fb565b60405180806020018060200180602001848103845287818151815260200191508051906020019060200280838360005b8381101561013f578082015181840152602081019050610124565b50505050905001848103835286818151815260200191508051906020019060200280838360005b83811015610181578082015181840152602081019050610166565b50505050905001848103825285818151815260200191508051906020019060200280838360005b838110156101c35780820151818401526020810190506101a8565b50505050905001965050505050505060405180910390f35b3480156101e757600080fd5b5061021c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061089b565b005b34801561022a57600080fd5b50610285600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610984565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102c55780820151818401526020810190506102aa565b50505050905090810190601f1680156102f25780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561030c57600080fd5b50610335600480360381019080803590602001909291908035906020019092919050505061098e565b005b34801561034357600080fd5b5061034c6109e0565b6040518082815260200191505060405180910390f35b34801561036e57600080fd5b506103c9600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506109ea565b6040518082815260200191505060405180910390f35b3480156103eb57600080fd5b5061040a600480360381019080803590602001909291905050506109fc565b604051808481526020018360001916600019168152602001828152602001935050505060405180910390f35b34801561044257600080fd5b5061044b610a35565b6040518082815260200191505060405180910390f35b34801561046d57600080fd5b5061048c60048036038101908080359060200190929190505050610a3b565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104cc5780820151818401526020810190506104b1565b50505050905090810190601f1680156104f95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561051357600080fd5b5061051c610a6d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561056a57600080fd5b5061058960048036038101908080359060200190929190505050610a93565b6040518082815260200191505060405180910390f35b3480156105ab57600080fd5b506105b4610ab0565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156105f45780820151818401526020810190506105d9565b50505050905090810190601f1680156106215780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561063b57600080fd5b5061065a60048036038101908080359060200190929190505050610aed565b604051808215151515815260200191505060405180910390f35b34801561068057600080fd5b506106ad600480360381019080803560001916906020019092919080359060200190929190505050610b40565b60405180838152602001821515151581526020019250505060405180910390f35b3480156106da57600080fd5b506106f960048036038101908080359060200190929190505050610bea565b005b6060806060600060608060606000610711610fbb565b6000805490509550856040519080825280602002602001820160405280156107485781602001602082028038833980820191505090505b5094508560405190808252806020026020018201604052801561077a5781602001602082028038833980820191505090505b509350856040519080825280602002602001820160405280156107ac5781602001602082028038833980820191505090505b509250600091505b85821015610887576000828154811015156107cb57fe5b9060005260206000209060030201606060405190810160405290816000820154815260200160018201546000191660001916815260200160028201548152505090508060000151858381518110151561082057fe5b90602001906020020181815250508060200151848381518110151561084157fe5b9060200190602002019060001916908160001916815250508060400151838381518110151561086c57fe5b906020019060200201818152505081806001019250506107b4565b848484985098509850505050505050909192565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610980578190508073ffffffffffffffffffffffffffffffffffffffff1663fdacd5766003546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b15801561096757600080fd5b505af115801561097b573d6000803e3d6000fd5b505050505b5050565b6060819050919050565b60405180807f7878730000000000000000000000000000000000000000000000000000000000815250600301905060405180910390a08060046000848152602001908152602001600020819055505050565b6000600354905090565b60006109f582610c4b565b9050919050565b600081815481101515610a0b57fe5b90600052602060002090600302016000915090508060000154908060010154908060020154905083565b60035481565b6060610a66600083815481101515610a4f57fe5b906000526020600020906003020160010154610dbf565b9050919050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060046000838152602001908152602001600020549050919050565b60606040805190810160405280600e81526020017f68656c6c6f206d73686b2e746f70000000000000000000000000000000000000815250905090565b60006005600083815481101515610b0057fe5b90600052602060002090600302016002015401600083815481101515610b2257fe5b90600052602060002090600302016002018190555060019050919050565b600080610b4b610fbb565b60016000815480929190600101919050559250828160000181815250508481602001906000191690816000191681525050838160400181815250506000819080600181540180825580915050906001820390600052602060002090600302016000909192909190915060008201518160000155602082015181600101906000191690556040820151816002015550505082600192509250509250929050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610c4857806003819055505b50565b60008060008060009250600490505b8451811015610db4578481815181101515610c7157fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027f01000000000000000000000000000000000000000000000000000000000000009004915060308210158015610cf25750603a82105b15610d0b576030826004859060020a0201039250610da7565b60618210158015610d1c5750606782105b15610d3857600a6061836004869060020a020103019250610da6565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f6279746573546f55696e74206572726f7200000000000000000000000000000081525060200191505060405180910390fd5b5b8080600101915050610c5a565b829350505050919050565b6060806000806000606060206040519080825280601f01601f191660200182016040528015610dfd5781602001602082028038833980820191505090505b50945060009350600092505b6020831015610ec7578260080260020a876001900402600102915060007f010000000000000000000000000000000000000000000000000000000000000002827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141515610eba57818585815181101515610e8157fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535083806001019450505b8280600101935050610e09565b836040519080825280601f01601f191660200182016040528015610efa5781602001602082028038833980820191505090505b509050600092505b83831015610fae578483815181101515610f1857fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028184815181101515610f7157fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508280600101935050610f02565b8095505050505050919050565b60606040519081016040528060008152602001600080191681526020016000815250905600a165627a7a7230582019d49e3861189bdfe95b3c9397bf51e7bab8db9883aa7a6204816699af692fc40029',
        ref: function ref(input) {
          return _this2.byteCode = input;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 743
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 746
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 747
        },
        className: "jsx-2187904324"
      }, "fee_limit\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this2.fee_limit = input;
        },
        defaultValue: Math.pow(10, 10),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 748
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 750
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 751
        },
        className: "jsx-2187904324"
      }, "call_value\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this2.call_value = input;
        },
        defaultValue: 0,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 752
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 754
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "submit",
        value: "\u90E8\u7F72\u5408\u7EA6 - Deploy contract",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 755
        },
        className: "jsx-2187904324"
      }))), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("hr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 758
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 760
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 761
        },
        className: "jsx-2187904324"
      }, "\u67E5\u8BE2\u5408\u7EA6\u5730\u5740 - Query contract address\uFF1A"), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "text",
        style: {
          width: '300px'
        },
        ref: function ref(input) {
          return _this2.contract_address = input;
        },
        defaultValue: "",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 762
        },
        className: "jsx-2187904324"
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u67E5\u8BE2\u5408\u7EA6 - Query contract",
        onClick: function onClick() {
          return _this2.getContract();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 763
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 765
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u8C03\u7528\u5408\u7EA6 - Call contract",
        onClick: function onClick() {
          _this2.triggerContract();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 766
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 768
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("input", {
        type: "button",
        value: "\u767B\u5F55 - login",
        onClick: function onClick() {
          return _this2.login();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 769
        },
        className: "jsx-2187904324"
      })))), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("div", {
        style: {
          position: 'fixed',
          left: 0,
          top: 0
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 776
        },
        className: "jsx-2187904324"
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("textarea", {
        cols: "100",
        rows: "10",
        value: __WEBPACK_IMPORTED_MODULE_4_json_stringify_pretty_compact___default()(data),
        onChange: function onChange() {},
        __source: {
          fileName: _jsxFileName,
          lineNumber: 777
        },
        className: "jsx-2187904324"
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_styled_jsx_style___default.a, {
        styleId: "2187904324",
        css: "label.jsx-2187904324{display:inline-block;width:150px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTB3QjRCLEFBSTZDLHFCQUNULFlBQ2YiLCJmaWxlIjoicGFnZXMvaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3Ryb24vV29ya3NwYWNlL3Ryb24vdHJvbi13ZWIvZXhhbXBsZXMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1JlYWN0RE9NfSBmcm9tICdyZWFjdCdcbmltcG9ydCBUcm9uV2ViIGZyb20gJy4uLy4uL3NyYy9pbmRleCdcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnanNvbi1zdHJpbmdpZnktcHJldHR5LWNvbXBhY3QnXG5pbXBvcnQge3V0aWxzfSBmcm9tICdldGhlcnMnXG4vL2xldCB0cm9uV2ViID0gbmV3IFRyb25XZWIoJ2h0dHA6Ly81Mi40NC43NS45OTo4MDkwJyk7XG4vL3Ryb25XZWIuc2V0RXZlbnRTZXJ2ZXIoJ2h0dHA6Ly81Mi40NC43NS45OToxODg4OScpO1xuLy90cm9uV2ViLmRlZmF1bHRBY2NvdW50ID0gJ1RQTDY2VksyZ0NYTkNEN0VKZzlwZ0pSZnFjUmF6amhVWlknO1xuLy90cm9uV2ViLmRlZmF1bHRQaz0nZGExNDYzNzRhNzUzMTBiOTY2NmU4MzRlZTRhZDA4NjZkNmY0MDM1OTY3YmZjNzYyMTdjNWE0OTVmZmY5ZjBkMCc7XG5sZXQgdHJvbldlYiA9IG5ldyBUcm9uV2ViKCdodHRwOi8vdGVzdGFwaS50cm9uZGFwcHMub3JnJyk7XG50cm9uV2ViLnNldEV2ZW50U2VydmVyKCdodHRwOi8vdGVzdGV2ZW50LnRyb25kYXBwcy5vcmcnKTtcbnRyb25XZWIuZGVmYXVsdEFjY291bnQgPSAnVFdzbThIdFUyQTVlRXpvVDhldjh5YW9GakhzWExMcmNrYic7XG50cm9uV2ViLmRlZmF1bHRQaz0nOGVmN2RkMWE4MWQ0ZWYyYjUzOGRhYWUwYzIwZTM3ZjRlZGIzZmQxMzM4YWZmOTFiMDNlMmI4YjFlZDk1NjY0NSc7XG5jbGFzcyBJbmRleCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZGF0YTp7fVxuICAgIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICBsZXQgY29kZXIgPSBuZXcgdXRpbHMuQWJpQ29kZXIoKTtcbiAgICAgICAgd2luZG93LnRyb25XZWIgPSB0cm9uV2ViO1xuICAgIH1cbiAgICB0cmlnZ2VyQ2hyb21lV2FsbGV0KCl7XG4gICAgICAgIHRyb25XZWIuc2VuZFRyYW5zYWN0aW9uQnlXYWxsZXQoe3RvOidUWjNTbWtEOHFKSzNWWThBbnFOOVhGaVl1c3BFUDNjd0I1JyxhbW91bnQ6MC4xfSxmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NiaycscmVzdWx0KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyB0b0JpZ051bWJlcigpe1xuICAgICAgICBsZXQgc3RyID0gJzIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSc7XG4gICAgICAgIGxldCBiaWdOdW1iZXIgPSB0cm9uV2ViLnRvQmlnTnVtYmVyKHN0cik7XG4gICAgICAgIGNvbnNvbGUubG9nKGJpZ051bWJlci50b051bWJlcigpLCcyLjAwMDAwMDAwMDAwMDAwMDJlKzIzJylcbiAgICAgICAgbGV0IHZhbHVlID0gYmlnTnVtYmVyLnRvU3RyaW5nKDEwKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnZhbHVlXG4gICAgICAgIH0pXG5cbiAgICB9XG4gICAgYXN5bmMgZ2V0QmFsYW5jZSgpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJhbGFuY2UodGhpcy5hY2NvdW50LnZhbHVlKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICBhc3luYyBnZXRCbG9jaygpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJsb2NrKHRoaXMuaWRPckhlaWdodC52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9IFxuICAgIGFzeW5jIGdldEJsb2NrVHJhbnNhY3Rpb25Db3VudCgpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJsb2NrVHJhbnNhY3Rpb25Db3VudCh0aGlzLmlkT3JIZWlnaHQudmFsdWUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfSBcbiAgICBhc3luYyBnZXRUcmFuc2FjdGlvbigpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldFRyYW5zYWN0aW9uKHRoaXMudHJhbnNhY3Rpb25JZC52YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy/nlJ/miJDnp4HpkqXlkozlnLDlnYDlubblrZjlgqjliLBsb2NhbFN0b3JhZ2XkuK1cbiAgICAvL+ivpWFwaeacieazhOa8j3ByaXZhdGUga2V555qE6aOO6Zmp77yM6K+356Gu5L+d5Zyo5a6J5YWo55qE546v5aKD5Lit6LCD55So6K+lYXBpXG4gICAgYXN5bmMgZ2VuZXJhdGVBZGRyZXNzKCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2VuZXJhdGVBZGRyZXNzT25MaW5lKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgYXN5bmMgZ2VuZXJhdGVBZGRyZXNzT25DbGllbnQoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi5nZW5lcmF0ZUFkZHJlc3NPbkNsaWVudCgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8v6YCa6L+H5a+G56CB5Yib5bu65Zyw5Z2AXG4gICAgYXN5bmMgY3JlYXRlQWRkcmVzc1dpdGhQYXNzV29yZCgpe1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLmNyZWF0ZUFkZHJlc3MoJzEyMzQ1NicpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpOy8ve2Jhc2U1OGNoZWNrQWRkcmVzczogXCJUTWlwMk5uUktoeTJXeWYxRmpLRzFEMXluM0YxTExHQ0RWXCIsdmFsdWU6XCJcIjQxODBlODgxNjY1MTc5MGQ0ZDZjMTg3ZWVmMDlmOTBiN2ExOTQwOGJiOFwiXG4gICAgfVxuICAgIC8v6L2s6LSmXG4gICAgYXN5bmMgc2VuZFRyYW5zYWN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGZyb20gPSB0aGlzLmZyb20udmFsdWU7XG4gICAgICAgIGNvbnN0IHRvID0gdGhpcy50by52YWx1ZTtcbiAgICAgICAgY29uc3QgYW1vdW50ID1wYXJzZUludCh0aGlzLmFtb3VudC52YWx1ZSk7XG4gICAgICAgIGNvbnN0IHBrID0gdGhpcy5wa0ZvclRyYW5zYWN0aW9uLnZhbHVlO1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0cm9uV2ViLnNlbmRUcmFuc2FjdGlvbihmcm9tLHRvLGFtb3VudCxwayk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzHjgIHmm7TmlrDotKbmiLflkI3np7BcbiAgICBhc3luYyB1cGRhdGVBY2NvdW50KCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIudXBkYXRlQWNjb3VudCgnd3VqaWFvbG9uZzEwMDknLCdUVDY3clBOd2dtcGVpbXZIVU1WekZmS3NqTDlHWjF3R3c4Jyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8y44CBVm90ZSBmb3IgdGhlIHN1cGVycmVwcmVzZW50YXRpdmVcbiAgICBhc3luYyB2b3RlV2l0bmVzc0FjY291bnQoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi52b3RlV2l0bmVzc0FjY291bnQoJ1RCcDM5eVdaaEZFRzVOZEFvRkZ4ZXBhajJkeENRak5tQjknLFt7XG4gICAgICAgICAgICB2b3RlX2FkZHJlc3M6J1RReHlRdTVkNzZNYXhzRUY0bkJmOXRGYThzOTNuU0hlOE0nLFxuICAgICAgICAgICAgdm90ZV9jb3VudDoxXG4gICAgICAgIH1dKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzPjgIHlj5HooYx0b2tlblxuICAgIGFzeW5jIGNyZWF0ZUFzc2V0SXNzdWUoKXtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBvd25lcl9hZGRyZXNzOidUQnAzOXlXWmhGRUc1TmRBb0ZGeGVwYWoyZHhDUWpObUI5JyxcbiAgICAgICAgICAgIG5hbWU6J1Rlc3RUUlgnLC8v5ZCN56ewXG4gICAgICAgICAgICBhYmJyOidUVFJYJywvL+eugOensFxuICAgICAgICAgICAgdG90YWxfc3VwcGx5IDoxMDAsLy/lj5HooYzmgLvph49cbiAgICAgICAgICAgIHRyeF9udW06MSwvLyDlkowgbnVtIOeahOWFkeaNouavlOS+i1xuICAgICAgICAgICAgbnVtOjEsXG4gICAgICAgICAgICBzdGFydF90aW1lIDogMTUzMDg5NDMxNTE1OCwvL+W8gOWni+aXtumXtFxuICAgICAgICAgICAgZW5kX3RpbWU6MTUzMzg5NDMxMjE1OCwvL+e7k+adn+aXtumXtFxuICAgICAgICAgICAgZGVzY3JpcHRpb246J+i/meaYr+S4gOS4qua1i+ivlXRva2VuJywvL+aPj+i/sFxuICAgICAgICAgICAgdXJsOidodHRwOi8vd3d3LmJhaWR1LmNvbScsLy/lrpjnvZHlnLDlnYBcbiAgICAgICAgICAgIGZyZWVfYXNzZXRfbmV0X2xpbWl0OjEwMDAwLC8v5YWN6LS55bim5a69XG4gICAgICAgICAgICBwdWJsaWNfZnJlZV9hc3NldF9uZXRfbGltaXQ6MTAwMDAsLy8g5q+P5LiqdG9rZW7nlKjmiLfog73kvb/nlKjmnKx0b2tlbueahOWFjei0ueW4puWuvVxuICAgICAgICAgICAgZnJvemVuX3N1cHBseTp7XG4gICAgICAgICAgICAgICAgZnJvemVuX2Ftb3VudDoxLC8v5Y+R6KGM6ICF5Zyo5Y+R6KGM55qE5pe25YCZ5oyH5a6a5Ya757uT55qEdG9rZW5cbiAgICAgICAgICAgICAgICBmcm96ZW5fZGF5czoyIC8v5Ya757uT55qE5aSp5pWwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi5jcmVhdGVUb2tlbihvcHRpb25zKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vNeOAgSBBcHBseSB0byBiZSBhIHN1cGVycmVwcmVzZW50YXRpdmVcbiAgICBhc3luYyBjcmVhdGVXaXRuZXNzKCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIuY3JlYXRlV2l0bmVzcygnVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScsJ2h0dHA6Ly93d3cueHh4LmNvbScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vNuOAgSBUcmFuc2ZlciB0b2tlblxuICAgIGFzeW5jIHRyYW5zZmVyQXNzZXQoKXtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdHJvbldlYi50cmFuc2ZlckFzc2V0KHtcbiAgICAgICAgICAgIG93bmVyX2FkZHJlc3M6J1RCcDM5eVdaaEZFRzVOZEFvRkZ4ZXBhajJkeENRak5tQjknLFxuICAgICAgICAgICAgdG9fYWRkcmVzczonVFJ6ek1iRkROZEZuUmdHcUtDa3FvQ3VMb0hmeVJaZnVWTCcsXG4gICAgICAgICAgICBhc3NldF9uYW1lOidaWlonLFxuICAgICAgICAgICAgYW1vdW50OjFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8344CBIFBhcnRpY2lwYXRpb24gaW4gdG9rZW4gZGlzdHJpYnV0aW9uXG4gICAgYXN5bmMgcGFydGljaXBhdGVBc3NldElzc3VlKCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIudHJhbnNmZXJBc3NldCh7XG4gICAgICAgICAgICBvd25lcl9hZGRyZXNzOidUQnAzOXlXWmhGRUc1TmRBb0ZGeGVwYWoyZHhDUWpObUI5JyxcbiAgICAgICAgICAgIHRvX2FkZHJlc3M6J1RSenpNYkZETmRGblJnR3FLQ2txb0N1TG9IZnlSWmZ1VkwnLFxuICAgICAgICAgICAgYXNzZXRfbmFtZTonWlpaJyxcbiAgICAgICAgICAgIGFtb3VudDoxXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vOOOAgSDop6Plhrvlt7Lnu4/mioDmnK/lhrvnu5PmnJ/nmoQgVFJYXG4gICAgYXN5bmMgdW5mcmVlemVCYWxhbmNlKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLnVuZnJlZXplQmFsYW5jZSgnVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vOeOAgeino+WGu+W3sue7j+e7k+adn+WGu+e7k+acn+eahCB0b2tlblxuICAgIGFzeW5jIHVuZnJlZXplQXNzZXQoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIudW5mcmVlemVBc3NldCgnVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTDjgIHotoXnuqfku6Pooajmj5DnjrDlpZblirHliLBiYWxhbmNlLOavjzI05bCP5pe25Y+v5o+Q546w5LiA5qyhXG4gICAgYXN5bmMgd2l0aGRyYXdCYWxhbmNlKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLndpdGhkcmF3QmFsYW5jZSgnVEJwMzl5V1poRkVHNU5kQW9GRnhlcGFqMmR4Q1FqTm1COScpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTHjgIHkv67mlLl0b2tlbuS/oeaBr1xuICAgIGFzeW5jIHVwZGF0ZUFzc2V0KCl7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRyb25XZWIudXBkYXRlQXNzZXQoe1xuICAgICAgICAgICAgb3duZXJfYWRkcmVzczpcIlRCcDM5eVdaaEZFRzVOZEFvRkZ4ZXBhajJkeENRak5tQjlcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAndGVzdCcsXG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vd3d3LmJhaWR1LmNvbScsXG4gICAgICAgICAgICBuZXdfbGltaXQgOiAxMDAwMDAwLFxuICAgICAgICAgICAgbmV3X3B1YmxpY19saW1pdCA6IDEwMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzEy44CB5p+l6K+iYXBp5omA5Zyo5py65Zmo6L+e5o6l55qE6IqC54K5XG4gICAgYXN5bmMgbGlzdE5vZGVzKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmxpc3ROb2RlcygpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTPjgIHmn6Xor6LotKbmiLflj5HooYznmoR0b2tlblxuICAgIGFzeW5jIGdldEFzc2V0SXNzdWVCeUFjY291bnQoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0QXNzZXRJc3N1ZUJ5QWNjb3VudCgnVFJ6ek1iRkROZEZuUmdHcUtDa3FvQ3VMb0hmeVJaZnVWTCcpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTTjgIHmoLnmja7lkI3np7Dmn6Xor6J0b2tlblxuICAgIGFzeW5jIGdldEFzc2V0SXNzdWVCeU5hbWUoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0QXNzZXRJc3N1ZUJ5TmFtZSgnWlpaJyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8xNeOAgeafpeivouacgOaWsOWdl1xuICAgIGFzeW5jIGJsb2NrTnVtYmVyKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmJsb2NrTnVtYmVyKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8xNuOAgemAmui/h+mrmOW6puafpeivouWdl1xuICAgIGFzeW5jIGdldEJsb2NrQnlOdW0oKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0QmxvY2tCeU51bSg4NjkwMTUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTfjgIHpgJrov4dpZOafpeivouWdl1xuICAgIGFzeW5jIGdldEJsb2NrQnlJZCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRCbG9ja0J5SWQoJzAwMDAwMDAwMDAwZDQyOTc1OTE3NWE0M2NiM2UxMTJkMDc2MWVjYWJmMDZlZjBjMjUzYWZmZTE0MjA5Nzc2NTEnKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzE444CB5oyJ54Wn6IyD5Zu05p+l6K+i5Z2XXG4gICAgYXN5bmMgZ2V0QmxvY2tCeUxpbWl0TmV4dCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRCbG9ja0J5TGltaXROZXh0KDg2OTAxMCw4NjkwMTUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMTnjgIHvu7/mn6Xor6LmnIDmlrDnmoTlh6DkuKrlnZdcbiAgICBhc3luYyBnZXRCbG9ja0J5TGF0ZXN0TnVtKCl7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCB0cm9uV2ViLmdldEJsb2NrQnlMYXRlc3ROdW0oNSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLzIw44CB6YCa6L+HSUTmn6Xor6LkuqTmmJNcbiAgICBhc3luYyBnZXRUcmFuc2FjdGlvbkJ5SWQoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0VHJhbnNhY3Rpb25CeUlkKCcwNjg5MzUyYWZmODRhMGZmMzY5MTUwMmJjYTk0YjFkZWQ0MGFiYjRhYTg4MDZiMzEzYWNiNTlhMzRjZjEwYzIyJylcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzIx44CB5p+l6K+i5omA5pyJ6LaF57qn5Luj6KGo5YiX6KGoXG4gICAgYXN5bmMgbGlzdFdpdE5lc3Nlcygpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5saXN0V2l0TmVzc2VzKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8yMuOAgeafpeivouaJgOaciXRva2Vu5YiX6KGoXG4gICAgYXN5bmMgZ2V0QXNzZXRJc3N1ZUxpc3QoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0QXNzZXRJc3N1ZUxpc3QoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzIz44CB5YiG6aG15p+l6K+idG9rZW7liJfooahcbiAgICBhc3luYyBnZXRQYWdpbmF0ZURhc3NldElzc3VlTGlzdCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRQYWdpbmF0ZURhc3NldElzc3VlTGlzdCgxLDEwKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvLzI044CB57uf6K6h5omA5pyJ5Lqk5piT5oC75pWwXG4gICAgYXN5bmMgdG90YWxUcmFuc2FjdGlvbigpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRUcmFuc2FjdGlvbkNvdW50KCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8yNeOAgeiOt+WPluS4i+asoee7n+iuoeaKleelqOaXtumXtFxuICAgIGFzeW5jIGdldE5leHRNYWludGVuYW5jZVRpbWUoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIuZ2V0TmV4dE1haW50ZU5hbmNlVGltZSgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMjbjgIHmo4Dmn6XlnLDlnYDmmK/lkKbmraPnoa5cbiAgICBhc3luYyB2YWxpZGF0ZUFkZHJlc3MoKXtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRyb25XZWIudmFsaWRhdGVBZGRyZXNzKCdUWjNTbWtEOHFKSzNWWThBbnFOOVhGaVl1c3BFUDNjd0I1Jyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpyZXNcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8yN+OAgemDqOe9suWQiOe6plxuICAgIGFzeW5jIGRlcGxveUNvbnRyYWN0KGV2ZW50KXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IG15Q29udHJhY3QgPSB0cm9uV2ViLmNvbnRyYWN0KEpTT04ucGFyc2UodGhpcy5hYmkudmFsdWUpKTtcbiAgICAgICAgLy/pg6jnvbLlkIjnuqZcbiAgICAgICAgbGV0IGNvbnRyYWN0SW5zdGFuY2UgPSBhd2FpdCBteUNvbnRyYWN0Lm5ldyh7XG4gICAgICAgICAgICBmcm9tOnRoaXMub3duZXJfYWRkcmVzcy52YWx1ZSxcbiAgICAgICAgICAgIGRhdGE6dGhpcy5ieXRlQ29kZS52YWx1ZSxcbiAgICAgICAgICAgIGZlZV9saW1pdDp0aGlzLmZlZV9saW1pdC52YWx1ZSxcbiAgICAgICAgICAgIGNhbGxfdmFsdWU6dGhpcy5jYWxsX3ZhbHVlLnZhbHVlLFxuICAgICAgICAgICAgY29uc3VtZV91c2VyX3Jlc291cmNlX3BlcmNlbnQ6MFxuICAgICAgICB9LHRoaXMucGsudmFsdWUpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0YTpjb250cmFjdEluc3RhbmNlXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMjjjgIHmn6Xor6LlkIjnuqZcbiAgICBhc3luYyBnZXRDb250cmFjdCgpe1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgdHJvbldlYi5nZXRDb250cmFjdCh0aGlzLmNvbnRyYWN0X2FkZHJlc3MudmFsdWUpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6cmVzXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vMjnjgIHosIPnlKjlkIjnuqZcbiAgICBhc3luYyB0cmlnZ2VyQ29udHJhY3QoKXtcbiAgICAgICAgbGV0IGFiaSA9IFt7XCJjb25zdGFudFwiOmZhbHNlLFwiaW5wdXRzXCI6W3tcIm5hbWVcIjpcIm51bWJlclwiLFwidHlwZVwiOlwidWludDI1NlwifV0sXCJuYW1lXCI6XCJmaWJvbmFjY2lOb3RpZnlcIixcIm91dHB1dHNcIjpbe1wibmFtZVwiOlwicmVzdWx0XCIsXCJ0eXBlXCI6XCJ1aW50MjU2XCJ9XSxcInBheWFibGVcIjpmYWxzZSxcInN0YXRlTXV0YWJpbGl0eVwiOlwibm9ucGF5YWJsZVwiLFwidHlwZVwiOlwiZnVuY3Rpb25cIn0se1wiY29uc3RhbnRcIjp0cnVlLFwiaW5wdXRzXCI6W3tcIm5hbWVcIjpcIm51bWJlclwiLFwidHlwZVwiOlwidWludDI1NlwifV0sXCJuYW1lXCI6XCJmaWJvbmFjY2lcIixcIm91dHB1dHNcIjpbe1wibmFtZVwiOlwicmVzdWx0XCIsXCJ0eXBlXCI6XCJ1aW50MjU2XCJ9XSxcInBheWFibGVcIjpmYWxzZSxcInN0YXRlTXV0YWJpbGl0eVwiOlwidmlld1wiLFwidHlwZVwiOlwiZnVuY3Rpb25cIn0se1wiYW5vbnltb3VzXCI6ZmFsc2UsXCJpbnB1dHNcIjpbe1wiaW5kZXhlZFwiOmZhbHNlLFwibmFtZVwiOlwiaW5wdXRcIixcInR5cGVcIjpcInVpbnQyNTZcIn0se1wiaW5kZXhlZFwiOmZhbHNlLFwibmFtZVwiOlwicmVzdWx0XCIsXCJ0eXBlXCI6XCJ1aW50MjU2XCJ9XSxcIm5hbWVcIjpcIk5vdGlmeVwiLFwidHlwZVwiOlwiZXZlbnRcIn1dO1xuICAgICAgICBsZXQgbXlDb250cmFjdCA9IHRyb25XZWIuY29udHJhY3QoYWJpKTtcbiAgICAgICAgbGV0IGNvbnRyYWN0QWRkcmVzcyA9ICc0MWIzMTY5Y2I3MzliMTYxMmUzMzE4ODQyOWUzODcyYzBjYTEwMjM4Y2QnXG4gICAgICAgIGxldCBjb250cmFjdEluc3RhbmNlID0gYXdhaXQgbXlDb250cmFjdC5hdChjb250cmFjdEFkZHJlc3MpO1xuXG4gICAgICAgIGxldCB7IHRyYW5zYWN0aW9uLHJlc3VsdCxjb25zdGFudF9yZXN1bHQgfSA9IGF3YWl0IGNvbnRyYWN0SW5zdGFuY2UuZmlib25hY2NpTm90aWZ5KDcse1xuICAgICAgICAgICAgZmVlX2xpbWl0OjcwMDAwMDAwMDAwMDAwMCxcbiAgICAgICAgICAgIGNhbGxfdmFsdWU6MFxuICAgICAgICB9KVxuICAgICAgICBpZighY29uc3RhbnRfcmVzdWx0KXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCBjb250cmFjdEluc3RhbmNlLmZpYm9uYWNjaU5vdGlmeS5zZW5kVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24sdGhpcy5way52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOnJlc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8v55uR5ZCs5LqL5Lu2XG4gICAgICAgICAgICBsZXQgbXlFdmVudCA9IGF3YWl0IGNvbnRyYWN0SW5zdGFuY2UuTm90aWZ5KCk7Ly/pu5jorqTmoLnmja7lkIjnuqblnLDlnYDmn6Xor6LvvIzlj6/ku6XovpPlhaV7ZXZlbnROYW1lOicnLGJsb2NrTnVtOicnLHRyYW5zYWN0aW9uSWQ6Jyd9XG4gICAgICAgICAgICAgbXlFdmVudC53YXRjaChmdW5jdGlvbihlcnIscmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgbGV0IGV2ZW50UmVzdWx0ID0gJyc7XG4gICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChpdGVtKT0+e1xuICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS50cmFuc2FjdGlvbl9pZCA9PXRyYW5zYWN0aW9uLnR4SUQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50UmVzdWx0ID0gaXRlbS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgbXlFdmVudC5zdG9wV2F0Y2hpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50UmVzdWx0OicsZXZlbnRSZXN1bHQpO1xuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudFJlc3VsdClcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvLzMw44CBbG9naW5cbiAgICBsb2dpbigpe1xuICAgICAgICBsZXQgYWNjb3VudCA9IHRyb25XZWIubG9naW4odHJvbldlYi5kZWZhdWx0UGspO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6YWNjb3VudFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm94XCIgc3R5bGU9e3ttYXJnaW5Ub3A6JzIwMHB4J319PlxuICAgICAgICAgICAgICAgICAgICA8aDM+5bel5YW35Ye95pWwIC0gVG9vbCBmdW5jdGlvbjwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwidG8gQmlnTnVtYmVyXCIgb25DbGljaz17KCk9PnRoaXMudG9CaWdOdW1iZXIoKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPui0puWPt+OAgei9rOi0piAtIEFjY291bnQgbnVtYmVyLCB0cmFuc2ZlcjwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDotKblj7cgLSBhY2NvdW50IG51bWJlcu+8mjxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzMwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy5hY2NvdW50ID1pbnB1dH0gZGVmYXVsdFZhbHVlPXt0cm9uV2ViLmRlZmF1bHRBY2NvdW50fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpPT50aGlzLmdldEJhbGFuY2UoKX0gdmFsdWU9XCLmn6Xor6LotKbmiLfkvZnpop0gLSBDaGVjayBhY2NvdW50IGJhbGFuY2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJ0cmlnZ2VyV2FsbGV0XCIgb25DbGljaz17KCk9PnRoaXMudHJpZ2dlckNocm9tZVdhbGxldCgpfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIueUn+aIkOengemSpeWcsOWdgCAtIEdlbmVyYXRlIHByaXZhdGUga2V5IGFkZHJlc3Mob25MaW5lKVwiIG9uQ2xpY2s9eygpPT50aGlzLmdlbmVyYXRlQWRkcmVzcygpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi55Sf5oiQ56eB6ZKl5Zyw5Z2AIC0gR2VuZXJhdGUgcHJpdmF0ZSBrZXkgYWRkcmVzcyhvbkNsaWVudClcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZW5lcmF0ZUFkZHJlc3NPbkNsaWVudCgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLpqozor4HlnLDlnYAgLSBWZXJpZnkgYWRkcmVzc1wiIG9uQ2xpY2s9eygpPT50aGlzLnZhbGlkYXRlQWRkcmVzcygpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLpgJrov4flr4bnoIHliJvlu7rlnLDlnYAgLSBDcmVhdGUgYW4gYWRkcmVzcyB3aXRoIGEgcGFzc3dvcmRcIiBvbkNsaWNrPXsoKT0+dGhpcy5jcmVhdGVBZGRyZXNzV2l0aFBhc3NXb3JkKCl9Lz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuabtOaWsOi0puWPt+WQjeensCAtIFVwZGF0ZSBhY2NvdW50IG5hbWVcIiBvbkNsaWNrPXsoKT0+dGhpcy51cGRhdGVBY2NvdW50KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoci8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48bGFiZWw+ZnJvbTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonMzAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLmZyb20gPWlucHV0fSBkZWZhdWx0VmFsdWU9e3Ryb25XZWIuZGVmYXVsdEFjY291bnR9Lz4gPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxsYWJlbD50bzwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonMzAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLnRvID1pbnB1dH0gZGVmYXVsdFZhbHVlPXtgVEdoZXB5THV5TUw1bjVqUUJUeWtLcWg5b2Q4aFFyQkRrU2B9Lz4gPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxsYWJlbD5hbW91bnQ8L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj17KGlucHV0KT0+dGhpcy5hbW91bnQgPWlucHV0fSAgZGVmYXVsdFZhbHVlPXsxMDAwMDAwfSAvPiA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGxhYmVsPnBrPC9sYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiAgc3R5bGU9e3t3aWR0aDonNTAwcHgnfX1yZWY9eyhpbnB1dCk9PnRoaXMucGtGb3JUcmFuc2FjdGlvbiA9aW5wdXR9IGRlZmF1bHRWYWx1ZT17dHJvbldlYi5kZWZhdWx0UGt9IC8+IDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eyhlKT0+dGhpcy5zZW5kVHJhbnNhY3Rpb24oZSl9IHZhbHVlPVwi6L2s6LSmIC0gVHJhbnNmZXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPuiKgueCueafpeivoiAtIE5vZGUgcXVlcnk8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuafpeivokFQSeaJgOWcqOacuuWZqOi/nuaOpeeahOiKgueCuSAtIFF1ZXJ5IHRoZSBub2RlIHRvIHdoaWNoIHRoZSBtYWNoaW5lIHdoZXJlIHRoZSBBUEkgaXMgY29ubmVjdGVkXCIgb25DbGljaz17KCk9PnRoaXMubGlzdE5vZGVzKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMz7lnZfmn6Xor6IgLSBCbG9jayBxdWVyeTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDlnZdpZOaIlumrmOW6piAtIEJsb2NrIGlkIG9yIGhlaWdodO+8mjxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzYwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy5pZE9ySGVpZ2h0ID1pbnB1dH0gZGVmYXVsdFZhbHVlPScwMDAwMDAwMDAwMDAwNWFlMDdmNDI3NzZiM2JmZDhlODczZmVhZWJmMmQ3NDNhY2ViNzE2ZGI1ZjcwY2IzNzNiJyAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRCbG9jaygpfSB2YWx1ZT1cIuafpeivouWMuuWdlyAtIFF1ZXJ5IGJsb2NrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCk9PnRoaXMuZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50KCl9IHZhbHVlPVwi5p+l6K+i5Yy65Z2X5YaF5Lqk5piT5pWw6YePIC0gUXVlcnkgdGhlIG51bWJlciBvZiB0cmFuc2FjdGlvbnMgaW4gdGhlIGJsb2NrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmn6Xor6LmnIDmlrDlnZcgLSBRdWVyeSB0aGUgbGF0ZXN0IGJsb2NrXCIgb25DbGljaz17KCk9PnRoaXMuYmxvY2tOdW1iZXIoKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLpgJrov4fpq5jluqbojIPlm7Tmn6Xor6LlnZcgLSBRdWVyeSBibG9jayBieSBoZWlnaHQgcmFuZ2VcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRCbG9ja0J5TGltaXROZXh0KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmn6Xor6LmnIDov5HnmoTlh6DkuKrlnZcgLSBRdWVyeSB0aGUgbW9zdCByZWNlbnQgYmxvY2tzXCIgb25DbGljaz17KCk9PnRoaXMuZ2V0QmxvY2tCeUxhdGVzdE51bSgpfS8+Ki99XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDM+5Lqk5piT5p+l6K+iIC0gVHJhbnNhY3Rpb24gaW5xdWlyeTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDkuqTmmJNpZCAtIFRyYW5zYWN0aW9uIGlk77yaPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9e3t3aWR0aDonNjAwcHgnfX0gcmVmPXsoaW5wdXQpPT50aGlzLnRyYW5zYWN0aW9uSWQgPWlucHV0fSBkZWZhdWx0VmFsdWU9J2M1MjNlZGQ3YjRiNzc2YWE0NGU0Y2Q0YmJkZjkyNWNiNGViNmQwNDdlMjczMTZlMWZmOTE5MDE0Y2M2YTlmNTQnLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLpgJrov4dpZOafpeivouS6pOaYk+iusOW9lSAtIFF1ZXJ5IHRyYW5zYWN0aW9uIHJlY29yZHMgYnkgaWRcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRUcmFuc2FjdGlvbigpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi57uf6K6h5omA5pyJ55qE5Lqk5piT5oC75pWwIC0gQ291bnQgYWxsIHRyYW5zYWN0aW9uc1wiIG9uQ2xpY2s9eygpPT50aGlzLnRvdGFsVHJhbnNhY3Rpb24oKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPui2hee6p+S7o+ihqCAtIFN1cGVyIFJlcHJlc2VudGF0aXZlIChTUik8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuafpeivouaJgOaciei2hee6p+S7o+ihqCAtIFF1ZXJ5IGFsbCBTUlwiIG9uQ2xpY2s9eygpPT50aGlzLmxpc3RXaXROZXNzZXMoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuiOt+WPluS4i+asoee7n+iuoeaKleelqOaXtumXtCAtIEdldCB0aGUgbmV4dCBtYWludGVuYW5jZSB0aW1lXCIgb25DbGljaz17KCk9PnRoaXMuZ2V0TmV4dE1haW50ZW5hbmNlVGltZSgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi55Sz6K+35oiQ5Li66LaF57qn5Luj6KGoIC0gQXBwbHkgdG8gYmVjb21lIGEgU1JcIiBvbkNsaWNrPXsoKT0+dGhpcy5jcmVhdGVXaXRuZXNzKCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLkuLrotoXnuqfku6PooajmipXnpaggLSBWb3RlIGZvciB0aGUgU1JcIiBvbkNsaWNrPXsoKT0+dGhpcy52b3RlV2l0bmVzc0FjY291bnQoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuino+WGu+e7k+adn+WGu+e7k+acn+eahHRyeCAtIFVuZnJlZXplIHRoZSB0cnggYXQgdGhlIGVuZCBvZiB0aGUgZnJlZXplIHBlcmlvZFwiIG9uQ2xpY2s9eygpPT50aGlzLnVuZnJlZXplQmFsYW5jZSgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi6LaF57qn5Luj6KGo5o+Q546w5aWW5Yqx5YiwYmFsYW5jZSAtIFNSIHdpdGhkcmF3cyB0aGUgcmV3YXJkIHRvIGJhbGFuY2VcIiBvbkNsaWNrPXsoKT0+dGhpcy53aXRoZHJhd0JhbGFuY2UoKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPnRva2Vu566h55CGIC0gVG9rZW4gbWFuYWdlbWVudDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5p+l6K+i5omA5pyJdG9rZW7liJfooaggLSBRdWVyeSBhbGwgdG9rZW4gbGlzdHNcIiBvbkNsaWNrPXsoKT0+dGhpcy5nZXRBc3NldElzc3VlTGlzdCgpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5YiG6aG15p+l6K+idG9rZW7liJfooaggLSBQYWdpbmcgcXVlcnkgdG9rZW4gbGlzdFwiIG9uQ2xpY2s9eygpPT50aGlzLmdldFBhZ2luYXRlRGFzc2V0SXNzdWVMaXN0KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmn6Xor6Lmn5DotKbmiLflj5HooYznmoR0b2tlbiAtIFF1ZXJ5IHRoZSB0b2tlbiBpc3N1ZWQgYnkgYW4gYWNjb3VudFwiIG9uQ2xpY2s9eygpPT50aGlzLmdldEFzc2V0SXNzdWVCeUFjY291bnQoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuagueaNruWQjeensOafpeivonRva2VuIC0gUXVlcnkgdG9rZW4gYnkgbmFtZVwiIG9uQ2xpY2s9eygpPT50aGlzLmdldEFzc2V0SXNzdWVCeU5hbWUoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWPkeihjHRva2VuIC0gSXNzdWUgdG9rZW5cIiBvbkNsaWNrPXsoKT0+dGhpcy5jcmVhdGVBc3NldElzc3VlKCl9IHN0eWxlPXt7Y29sb3I6J3JlZCd9fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi6L2s6LSmdG9rZW4gLSBUcmFuc2ZlciB0b2tlblwiIG9uQ2xpY2s9eygpPT50aGlzLnRyYW5zZmVyQXNzZXQoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuS/ruaUuXRva2VuIC0gTW9kaWZ5IHRva2VuXCIgb25DbGljaz17KCk9PnRoaXMudXBkYXRlQXNzZXQoKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuino+WGu3Rva2VuIC0gVW5mcmVlemUgdGhlIHRva2VuXCIgb25DbGljaz17KCk9PnRoaXMudW5mcmVlemVBc3NldCgpfSBzdHlsZT17e2NvbG9yOidyZWQnfX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWPguS4jnRva2Vu5Y+R6KGMIC0gUGFydGljaXBhdGUgaW4gdG9rZW4gaXNzdWFuY2VcIiBvbkNsaWNrPXsoKT0+dGhpcy5wYXJ0aWNpcGF0ZUFzc2V0SXNzdWUoKX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPuaZuuiDveWQiOe6piAtIFNtYXJ0IGNvbnRyYWN0PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17KGUpPT50aGlzLmRlcGxveUNvbnRyYWN0KGUpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPm93bmVyX2FkZHJlc3PvvJo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPXt7d2lkdGg6JzMwMHB4J319IHJlZj17KGlucHV0KT0+dGhpcy5vd25lcl9hZGRyZXNzPWlucHV0fSBkZWZhdWx0VmFsdWU9e3Ryb25XZWIuZGVmYXVsdEFjY291bnR9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+cGs6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT17e3dpZHRoOic1MDBweCd9fSByZWY9eyhpbnB1dCk9PnRoaXMucGsgPSBpbnB1dH0gZGVmYXVsdFZhbHVlPXt0cm9uV2ViLmRlZmF1bHRQa30vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5BYmk8L2xhYmVsPjx0ZXh0YXJlYSBjb2xzPVwiNTBcIiByb3dzPVwiMTBcIiBwbGFjZWhvbGRlcj1cImFiaVwiIGRlZmF1bHRWYWx1ZT0nW1xuICAgIHtcbiAgICAgIFwiY29uc3RhbnRcIjogdHJ1ZSxcbiAgICAgIFwiaW5wdXRzXCI6IFtdLFxuICAgICAgXCJuYW1lXCI6IFwiZ2V0VXNlcnNcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2W11cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMltdXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZbXVwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInZpZXdcIixcbiAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiY29uc3RhbnRcIjogdHJ1ZSxcbiAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJuYW1lXCI6IFwidXNlcnNcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJpZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwibmFtZVwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzMzJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwicG9pbnRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwidmlld1wiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJjb25zdGFudFwiOiB0cnVlLFxuICAgICAgXCJpbnB1dHNcIjogW10sXG4gICAgICBcIm5hbWVcIjogXCJsYXN0X2NvbXBsZXRlZF9taWdyYXRpb25cIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwidmlld1wiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJjb25zdGFudFwiOiB0cnVlLFxuICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiaWRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwibmFtZVwiOiBcImdldE5hbWVcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJ2aWV3XCIsXG4gICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImNvbnN0YW50XCI6IHRydWUsXG4gICAgICBcImlucHV0c1wiOiBbXSxcbiAgICAgIFwibmFtZVwiOiBcIm93bmVyXCIsXG4gICAgICBcIm91dHB1dHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInZpZXdcIixcbiAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJpZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJuYW1lXCI6IFwicGx1c0ZpdmVcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJzdWNcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJib29sXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwibm9ucGF5YWJsZVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJjb25zdGFudFwiOiBmYWxzZSxcbiAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcInVzZXJOYW1lXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiYnl0ZXMzMlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJ1c2VyUG9pbnRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwibmFtZVwiOiBcImFkZFVzZXJcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJ1c2VySURcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJib29sXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwibm9ucGF5YWJsZVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpbnB1dHNcIjogW10sXG4gICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcIm5vbnBheWFibGVcIixcbiAgICAgIFwidHlwZVwiOiBcImNvbnN0cnVjdG9yXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJrZXlcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcInZhbHVlXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwidWludDI1NlwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcIm5hbWVcIjogXCJzZXRcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwibm9ucGF5YWJsZVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJjb25zdGFudFwiOiB0cnVlLFxuICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwia2V5XCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwidWludDI1NlwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcIm5hbWVcIjogXCJnZXRcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJ2YWx1ZVwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJ2aWV3XCIsXG4gICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImNvbnN0YW50XCI6IHRydWUsXG4gICAgICBcImlucHV0c1wiOiBbXSxcbiAgICAgIFwibmFtZVwiOiBcInNheVwiLFxuICAgICAgXCJvdXRwdXRzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInB1cmVcIixcbiAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiY29uc3RhbnRcIjogdHJ1ZSxcbiAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIm5hbWVcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJuYW1lXCI6IFwicHJpbnRcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJwdXJlXCIsXG4gICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImNvbnN0YW50XCI6IHRydWUsXG4gICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJfZGF0YVwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImJ5dGVzXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwibmFtZVwiOiBcInVzZVV0aWxcIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwicHVyZVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJjb25zdGFudFwiOiB0cnVlLFxuICAgICAgXCJpbnB1dHNcIjogW10sXG4gICAgICBcIm5hbWVcIjogXCJnZXRNaWdyYXRpb25cIixcbiAgICAgIFwib3V0cHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50MjU2XCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwicGF5YWJsZVwiOiBmYWxzZSxcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwidmlld1wiLFxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJjb25zdGFudFwiOiBmYWxzZSxcbiAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcImNvbXBsZXRlZFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQyNTZcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJuYW1lXCI6IFwic2V0Q29tcGxldGVkXCIsXG4gICAgICBcIm91dHB1dHNcIjogW10sXG4gICAgICBcInBheWFibGVcIjogZmFsc2UsXG4gICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcIm5vbnBheWFibGVcIixcbiAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiY29uc3RhbnRcIjogZmFsc2UsXG4gICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJuZXdfYWRkcmVzc1wiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImFkZHJlc3NcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJuYW1lXCI6IFwidXBncmFkZVwiLFxuICAgICAgXCJvdXRwdXRzXCI6IFtdLFxuICAgICAgXCJwYXlhYmxlXCI6IGZhbHNlLFxuICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJub25wYXlhYmxlXCIsXG4gICAgICBcInR5cGVcIjogXCJmdW5jdGlvblwiXG4gICAgfVxuICBdJyByZWY9eyhpbnB1dCk9PnRoaXMuYWJpID0gaW5wdXR9PjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPmJ5dGVDb2RlPC9sYWJlbD48dGV4dGFyZWEgIGNvbHM9XCI1MFwiIHJvd3M9XCIxMFwiIHBsYWNlaG9sZGVyPSdieXRlQ29kZScgZGVmYXVsdFZhbHVlPXsnMHg2MDgwNjA0MDUyMzQ4MDE1NjEwMDEwNTc2MDAwODBmZDViNTAzMzYwMDI2MDAwNjEwMTAwMGE4MTU0ODE3M2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYwMjE5MTY5MDgzNzNmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmMTYwMjE3OTA1NTUwNjExMDBjODA2MTAwNjE2MDAwMzk2MDAwZjMwMDYwODA2MDQwNTI2MDA0MzYxMDYxMDBkYTU3NjAwMDM1N2MwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwOTAwNDYzZmZmZmZmZmYxNjgwNjJjZThlM2UxNDYxMDBkZjU3ODA2MzA5MDBmMDEwMTQ2MTAxZGI1NzgwNjMxMTExNGFmMTE0NjEwMjFlNTc4MDYzMWFiMDZlZTUxNDYxMDMwMDU3ODA2MzIyM2ViNjQwMTQ2MTAzMzc1NzgwNjMyYzg0MWY1ODE0NjEwMzYyNTc4MDYzMzY1Yjk4YjIxNDYxMDNkZjU3ODA2MzQ0NWRmMGFjMTQ2MTA0MzY1NzgwNjM2YjhmZjU3NDE0NjEwNDYxNTc4MDYzOGRhNWNiNWIxNDYxMDUwNzU3ODA2Mzk1MDdkMzlhMTQ2MTA1NWU1NzgwNjM5NTRhYjRiMjE0NjEwNTlmNTc4MDYzYTgyOTNjMjgxNDYxMDYyZjU3ODA2M2I2OWVhNjg0MTQ2MTA2NzQ1NzgwNjNmZGFjZDU3NjE0NjEwNmNlNTc1YjYwMDA4MGZkNWIzNDgwMTU2MTAwZWI1NzYwMDA4MGZkNWI1MDYxMDBmNDYxMDZmYjU2NWI2MDQwNTE4MDgwNjAyMDAxODA2MDIwMDE4MDYwMjAwMTg0ODEwMzg0NTI4NzgxODE1MTgxNTI2MDIwMDE5MTUwODA1MTkwNjAyMDAxOTA2MDIwMDI4MDgzODM2MDAwNWI4MzgxMTAxNTYxMDEzZjU3ODA4MjAxNTE4MTg0MDE1MjYwMjA4MTAxOTA1MDYxMDEyNDU2NWI1MDUwNTA1MDkwNTAwMTg0ODEwMzgzNTI4NjgxODE1MTgxNTI2MDIwMDE5MTUwODA1MTkwNjAyMDAxOTA2MDIwMDI4MDgzODM2MDAwNWI4MzgxMTAxNTYxMDE4MTU3ODA4MjAxNTE4MTg0MDE1MjYwMjA4MTAxOTA1MDYxMDE2NjU2NWI1MDUwNTA1MDkwNTAwMTg0ODEwMzgyNTI4NTgxODE1MTgxNTI2MDIwMDE5MTUwODA1MTkwNjAyMDAxOTA2MDIwMDI4MDgzODM2MDAwNWI4MzgxMTAxNTYxMDFjMzU3ODA4MjAxNTE4MTg0MDE1MjYwMjA4MTAxOTA1MDYxMDFhODU2NWI1MDUwNTA1MDkwNTAwMTk2NTA1MDUwNTA1MDUwNTA2MDQwNTE4MDkxMDM5MGYzNWIzNDgwMTU2MTAxZTc1NzYwMDA4MGZkNWI1MDYxMDIxYzYwMDQ4MDM2MDM4MTAxOTA4MDgwMzU3M2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYxNjkwNjAyMDAxOTA5MjkxOTA1MDUwNTA2MTA4OWI1NjViMDA1YjM0ODAxNTYxMDIyYTU3NjAwMDgwZmQ1YjUwNjEwMjg1NjAwNDgwMzYwMzgxMDE5MDgwODAzNTkwNjAyMDAxOTA4MjAxODAzNTkwNjAyMDAxOTA4MDgwNjAxZjAxNjAyMDgwOTEwNDAyNjAyMDAxNjA0MDUxOTA4MTAxNjA0MDUyODA5MzkyOTE5MDgxODE1MjYwMjAwMTgzODM4MDgyODQzNzgyMDE5MTUwNTA1MDUwNTA1MDkxOTI5MTkyOTA1MDUwNTA2MTA5ODQ1NjViNjA0MDUxODA4MDYwMjAwMTgyODEwMzgyNTI4MzgxODE1MTgxNTI2MDIwMDE5MTUwODA1MTkwNjAyMDAxOTA4MDgzODM2MDAwNWI4MzgxMTAxNTYxMDJjNTU3ODA4MjAxNTE4MTg0MDE1MjYwMjA4MTAxOTA1MDYxMDJhYTU2NWI1MDUwNTA1MDkwNTA5MDgxMDE5MDYwMWYxNjgwMTU2MTAyZjI1NzgwODIwMzgwNTE2MDAxODM2MDIwMDM2MTAxMDAwYTAzMTkxNjgxNTI2MDIwMDE5MTUwNWI1MDkyNTA1MDUwNjA0MDUxODA5MTAzOTBmMzViMzQ4MDE1NjEwMzBjNTc2MDAwODBmZDViNTA2MTAzMzU2MDA0ODAzNjAzODEwMTkwODA4MDM1OTA2MDIwMDE5MDkyOTE5MDgwMzU5MDYwMjAwMTkwOTI5MTkwNTA1MDUwNjEwOThlNTY1YjAwNWIzNDgwMTU2MTAzNDM1NzYwMDA4MGZkNWI1MDYxMDM0YzYxMDllMDU2NWI2MDQwNTE4MDgyODE1MjYwMjAwMTkxNTA1MDYwNDA1MTgwOTEwMzkwZjM1YjM0ODAxNTYxMDM2ZTU3NjAwMDgwZmQ1YjUwNjEwM2M5NjAwNDgwMzYwMzgxMDE5MDgwODAzNTkwNjAyMDAxOTA4MjAxODAzNTkwNjAyMDAxOTA4MDgwNjAxZjAxNjAyMDgwOTEwNDAyNjAyMDAxNjA0MDUxOTA4MTAxNjA0MDUyODA5MzkyOTE5MDgxODE1MjYwMjAwMTgzODM4MDgyODQzNzgyMDE5MTUwNTA1MDUwNTA1MDkxOTI5MTkyOTA1MDUwNTA2MTA5ZWE1NjViNjA0MDUxODA4MjgxNTI2MDIwMDE5MTUwNTA2MDQwNTE4MDkxMDM5MGYzNWIzNDgwMTU2MTAzZWI1NzYwMDA4MGZkNWI1MDYxMDQwYTYwMDQ4MDM2MDM4MTAxOTA4MDgwMzU5MDYwMjAwMTkwOTI5MTkwNTA1MDUwNjEwOWZjNTY1YjYwNDA1MTgwODQ4MTUyNjAyMDAxODM2MDAwMTkxNjYwMDAxOTE2ODE1MjYwMjAwMTgyODE1MjYwMjAwMTkzNTA1MDUwNTA2MDQwNTE4MDkxMDM5MGYzNWIzNDgwMTU2MTA0NDI1NzYwMDA4MGZkNWI1MDYxMDQ0YjYxMGEzNTU2NWI2MDQwNTE4MDgyODE1MjYwMjAwMTkxNTA1MDYwNDA1MTgwOTEwMzkwZjM1YjM0ODAxNTYxMDQ2ZDU3NjAwMDgwZmQ1YjUwNjEwNDhjNjAwNDgwMzYwMzgxMDE5MDgwODAzNTkwNjAyMDAxOTA5MjkxOTA1MDUwNTA2MTBhM2I1NjViNjA0MDUxODA4MDYwMjAwMTgyODEwMzgyNTI4MzgxODE1MTgxNTI2MDIwMDE5MTUwODA1MTkwNjAyMDAxOTA4MDgzODM2MDAwNWI4MzgxMTAxNTYxMDRjYzU3ODA4MjAxNTE4MTg0MDE1MjYwMjA4MTAxOTA1MDYxMDRiMTU2NWI1MDUwNTA1MDkwNTA5MDgxMDE5MDYwMWYxNjgwMTU2MTA0Zjk1NzgwODIwMzgwNTE2MDAxODM2MDIwMDM2MTAxMDAwYTAzMTkxNjgxNTI2MDIwMDE5MTUwNWI1MDkyNTA1MDUwNjA0MDUxODA5MTAzOTBmMzViMzQ4MDE1NjEwNTEzNTc2MDAwODBmZDViNTA2MTA1MWM2MTBhNmQ1NjViNjA0MDUxODA4MjczZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjE2NzNmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmMTY4MTUyNjAyMDAxOTE1MDUwNjA0MDUxODA5MTAzOTBmMzViMzQ4MDE1NjEwNTZhNTc2MDAwODBmZDViNTA2MTA1ODk2MDA0ODAzNjAzODEwMTkwODA4MDM1OTA2MDIwMDE5MDkyOTE5MDUwNTA1MDYxMGE5MzU2NWI2MDQwNTE4MDgyODE1MjYwMjAwMTkxNTA1MDYwNDA1MTgwOTEwMzkwZjM1YjM0ODAxNTYxMDVhYjU3NjAwMDgwZmQ1YjUwNjEwNWI0NjEwYWIwNTY1YjYwNDA1MTgwODA2MDIwMDE4MjgxMDM4MjUyODM4MTgxNTE4MTUyNjAyMDAxOTE1MDgwNTE5MDYwMjAwMTkwODA4MzgzNjAwMDViODM4MTEwMTU2MTA1ZjQ1NzgwODIwMTUxODE4NDAxNTI2MDIwODEwMTkwNTA2MTA1ZDk1NjViNTA1MDUwNTA5MDUwOTA4MTAxOTA2MDFmMTY4MDE1NjEwNjIxNTc4MDgyMDM4MDUxNjAwMTgzNjAyMDAzNjEwMTAwMGEwMzE5MTY4MTUyNjAyMDAxOTE1MDViNTA5MjUwNTA1MDYwNDA1MTgwOTEwMzkwZjM1YjM0ODAxNTYxMDYzYjU3NjAwMDgwZmQ1YjUwNjEwNjVhNjAwNDgwMzYwMzgxMDE5MDgwODAzNTkwNjAyMDAxOTA5MjkxOTA1MDUwNTA2MTBhZWQ1NjViNjA0MDUxODA4MjE1MTUxNTE1ODE1MjYwMjAwMTkxNTA1MDYwNDA1MTgwOTEwMzkwZjM1YjM0ODAxNTYxMDY4MDU3NjAwMDgwZmQ1YjUwNjEwNmFkNjAwNDgwMzYwMzgxMDE5MDgwODAzNTYwMDAxOTE2OTA2MDIwMDE5MDkyOTE5MDgwMzU5MDYwMjAwMTkwOTI5MTkwNTA1MDUwNjEwYjQwNTY1YjYwNDA1MTgwODM4MTUyNjAyMDAxODIxNTE1MTUxNTgxNTI2MDIwMDE5MjUwNTA1MDYwNDA1MTgwOTEwMzkwZjM1YjM0ODAxNTYxMDZkYTU3NjAwMDgwZmQ1YjUwNjEwNmY5NjAwNDgwMzYwMzgxMDE5MDgwODAzNTkwNjAyMDAxOTA5MjkxOTA1MDUwNTA2MTBiZWE1NjViMDA1YjYwNjA4MDYwNjA2MDAwNjA2MDgwNjA2MDYwMDA2MTA3MTE2MTBmYmI1NjViNjAwMDgwNTQ5MDUwOTU1MDg1NjA0MDUxOTA4MDgyNTI4MDYwMjAwMjYwMjAwMTgyMDE2MDQwNTI4MDE1NjEwNzQ4NTc4MTYwMjAwMTYwMjA4MjAyODAzODgzMzk4MDgyMDE5MTUwNTA5MDUwNWI1MDk0NTA4NTYwNDA1MTkwODA4MjUyODA2MDIwMDI2MDIwMDE4MjAxNjA0MDUyODAxNTYxMDc3YTU3ODE2MDIwMDE2MDIwODIwMjgwMzg4MzM5ODA4MjAxOTE1MDUwOTA1MDViNTA5MzUwODU2MDQwNTE5MDgwODI1MjgwNjAyMDAyNjAyMDAxODIwMTYwNDA1MjgwMTU2MTA3YWM1NzgxNjAyMDAxNjAyMDgyMDI4MDM4ODMzOTgwODIwMTkxNTA1MDkwNTA1YjUwOTI1MDYwMDA5MTUwNWI4NTgyMTAxNTYxMDg4NzU3NjAwMDgyODE1NDgxMTAxNTE1NjEwN2NiNTdmZTViOTA2MDAwNTI2MDIwNjAwMDIwOTA2MDAzMDIwMTYwNjA2MDQwNTE5MDgxMDE2MDQwNTI5MDgxNjAwMDgyMDE1NDgxNTI2MDIwMDE2MDAxODIwMTU0NjAwMDE5MTY2MDAwMTkxNjgxNTI2MDIwMDE2MDAyODIwMTU0ODE1MjUwNTA5MDUwODA2MDAwMDE1MTg1ODM4MTUxODExMDE1MTU2MTA4MjA1N2ZlNWI5MDYwMjAwMTkwNjAyMDAyMDE4MTgxNTI1MDUwODA2MDIwMDE1MTg0ODM4MTUxODExMDE1MTU2MTA4NDE1N2ZlNWI5MDYwMjAwMTkwNjAyMDAyMDE5MDYwMDAxOTE2OTA4MTYwMDAxOTE2ODE1MjUwNTA4MDYwNDAwMTUxODM4MzgxNTE4MTEwMTUxNTYxMDg2YzU3ZmU1YjkwNjAyMDAxOTA2MDIwMDIwMTgxODE1MjUwNTA4MTgwNjAwMTAxOTI1MDUwNjEwN2I0NTY1Yjg0ODQ4NDk4NTA5ODUwOTg1MDUwNTA1MDUwNTA1MDkwOTE5MjU2NWI2MDAwNjAwMjYwMDA5MDU0OTA2MTAxMDAwYTkwMDQ3M2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYxNjczZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjE2MzM3M2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYxNjE0MTU2MTA5ODA1NzgxOTA1MDgwNzNmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmMTY2M2ZkYWNkNTc2NjAwMzU0NjA0MDUxODI2M2ZmZmZmZmZmMTY3YzAxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMjgxNTI2MDA0MDE4MDgyODE1MjYwMjAwMTkxNTA1MDYwMDA2MDQwNTE4MDgzMDM4MTYwMDA4NzgwM2IxNTgwMTU2MTA5Njc1NzYwMDA4MGZkNWI1MDVhZjExNTgwMTU2MTA5N2I1NzNkNjAwMDgwM2UzZDYwMDBmZDViNTA1MDUwNTA1YjUwNTA1NjViNjA2MDgxOTA1MDkxOTA1MDU2NWI2MDQwNTE4MDgwN2Y3ODc4NzMwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwODE1MjUwNjAwMzAxOTA1MDYwNDA1MTgwOTEwMzkwYTA4MDYwMDQ2MDAwODQ4MTUyNjAyMDAxOTA4MTUyNjAyMDAxNjAwMDIwODE5MDU1NTA1MDUwNTY1YjYwMDA2MDAzNTQ5MDUwOTA1NjViNjAwMDYxMDlmNTgyNjEwYzRiNTY1YjkwNTA5MTkwNTA1NjViNjAwMDgxODE1NDgxMTAxNTE1NjEwYTBiNTdmZTViOTA2MDAwNTI2MDIwNjAwMDIwOTA2MDAzMDIwMTYwMDA5MTUwOTA1MDgwNjAwMDAxNTQ5MDgwNjAwMTAxNTQ5MDgwNjAwMjAxNTQ5MDUwODM1NjViNjAwMzU0ODE1NjViNjA2MDYxMGE2NjYwMDA4MzgxNTQ4MTEwMTUxNTYxMGE0ZjU3ZmU1YjkwNjAwMDUyNjAyMDYwMDAyMDkwNjAwMzAyMDE2MDAxMDE1NDYxMGRiZjU2NWI5MDUwOTE5MDUwNTY1YjYwMDI2MDAwOTA1NDkwNjEwMTAwMGE5MDA0NzNmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmMTY4MTU2NWI2MDAwNjAwNDYwMDA4MzgxNTI2MDIwMDE5MDgxNTI2MDIwMDE2MDAwMjA1NDkwNTA5MTkwNTA1NjViNjA2MDYwNDA4MDUxOTA4MTAxNjA0MDUyODA2MDBlODE1MjYwMjAwMTdmNjg2NTZjNmM2ZjIwNmQ3MzY4NmIyZTc0NmY3MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDgxNTI1MDkwNTA5MDU2NWI2MDAwNjAwNTYwMDA4MzgxNTQ4MTEwMTUxNTYxMGIwMDU3ZmU1YjkwNjAwMDUyNjAyMDYwMDAyMDkwNjAwMzAyMDE2MDAyMDE1NDAxNjAwMDgzODE1NDgxMTAxNTE1NjEwYjIyNTdmZTViOTA2MDAwNTI2MDIwNjAwMDIwOTA2MDAzMDIwMTYwMDIwMTgxOTA1NTUwNjAwMTkwNTA5MTkwNTA1NjViNjAwMDgwNjEwYjRiNjEwZmJiNTY1YjYwMDE2MDAwODE1NDgwOTI5MTkwNjAwMTAxOTE5MDUwNTU5MjUwODI4MTYwMDAwMTgxODE1MjUwNTA4NDgxNjAyMDAxOTA2MDAwMTkxNjkwODE2MDAwMTkxNjgxNTI1MDUwODM4MTYwNDAwMTgxODE1MjUwNTA2MDAwODE5MDgwNjAwMTgxNTQwMTgwODI1NTgwOTE1MDUwOTA2MDAxODIwMzkwNjAwMDUyNjAyMDYwMDAyMDkwNjAwMzAyMDE2MDAwOTA5MTkyOTA5MTkwOTE1MDYwMDA4MjAxNTE4MTYwMDAwMTU1NjAyMDgyMDE1MTgxNjAwMTAxOTA2MDAwMTkxNjkwNTU2MDQwODIwMTUxODE2MDAyMDE1NTUwNTA1MDgyNjAwMTkyNTA5MjUwNTA5MjUwOTI5MDUwNTY1YjYwMDI2MDAwOTA1NDkwNjEwMTAwMGE5MDA0NzNmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmMTY3M2ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYxNjMzNzNmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmMTYxNDE1NjEwYzQ4NTc4MDYwMDM4MTkwNTU1MDViNTA1NjViNjAwMDgwNjAwMDgwNjAwMDkyNTA2MDA0OTA1MDViODQ1MTgxMTAxNTYxMGRiNDU3ODQ4MTgxNTE4MTEwMTUxNTYxMGM3MTU3ZmU1YjkwNjAyMDAxMDE1MTdmMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDkwMDQ3ZjAxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMjdmMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDkwMDQ5MTUwNjAzMDgyMTAxNTgwMTU2MTBjZjI1NzUwNjAzYTgyMTA1YjE1NjEwZDBiNTc2MDMwODI2MDA0ODU5MDYwMDIwYTAyMDEwMzkyNTA2MTBkYTc1NjViNjA2MTgyMTAxNTgwMTU2MTBkMWM1NzUwNjA2NzgyMTA1YjE1NjEwZDM4NTc2MDBhNjA2MTgzNjAwNDg2OTA2MDAyMGEwMjAxMDMwMTkyNTA2MTBkYTY1NjViNjA0MDUxN2YwOGMzNzlhMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwODE1MjYwMDQwMTgwODA2MDIwMDE4MjgxMDM4MjUyNjAxMTgxNTI2MDIwMDE4MDdmNjI3OTc0NjU3MzU0NmY1NTY5NmU3NDIwNjU3MjcyNmY3MjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDgxNTI1MDYwMjAwMTkxNTA1MDYwNDA1MTgwOTEwMzkwZmQ1YjViODA4MDYwMDEwMTkxNTA1MDYxMGM1YTU2NWI4MjkzNTA1MDUwNTA5MTkwNTA1NjViNjA2MDgwNjAwMDgwNjAwMDYwNjA2MDIwNjA0MDUxOTA4MDgyNTI4MDYwMWYwMTYwMWYxOTE2NjAyMDAxODIwMTYwNDA1MjgwMTU2MTBkZmQ1NzgxNjAyMDAxNjAyMDgyMDI4MDM4ODMzOTgwODIwMTkxNTA1MDkwNTA1YjUwOTQ1MDYwMDA5MzUwNjAwMDkyNTA1YjYwMjA4MzEwMTU2MTBlYzc1NzgyNjAwODAyNjAwMjBhODc2MDAxOTAwNDAyNjAwMTAyOTE1MDYwMDA3ZjAxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMjgyN2VmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjE5MTYxNDE1MTU2MTBlYmE1NzgxODU4NTgxNTE4MTEwMTUxNTYxMGU4MTU3ZmU1YjkwNjAyMDAxMDE5MDdlZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYxOTE2OTA4MTYwMDAxYTkwNTM1MDgzODA2MDAxMDE5NDUwNTA1YjgyODA2MDAxMDE5MzUwNTA2MTBlMDk1NjViODM2MDQwNTE5MDgwODI1MjgwNjAxZjAxNjAxZjE5MTY2MDIwMDE4MjAxNjA0MDUyODAxNTYxMGVmYTU3ODE2MDIwMDE2MDIwODIwMjgwMzg4MzM5ODA4MjAxOTE1MDUwOTA1MDViNTA5MDUwNjAwMDkyNTA1YjgzODMxMDE1NjEwZmFlNTc4NDgzODE1MTgxMTAxNTE1NjEwZjE4NTdmZTViOTA2MDIwMDEwMTUxN2YwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwOTAwNDdmMDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAyODE4NDgxNTE4MTEwMTUxNTYxMGY3MTU3ZmU1YjkwNjAyMDAxMDE5MDdlZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYxOTE2OTA4MTYwMDAxYTkwNTM1MDgyODA2MDAxMDE5MzUwNTA2MTBmMDI1NjViODA5NTUwNTA1MDUwNTA1MDkxOTA1MDU2NWI2MDYwNjA0MDUxOTA4MTAxNjA0MDUyODA2MDAwODE1MjYwMjAwMTYwMDA4MDE5MTY4MTUyNjAyMDAxNjAwMDgxNTI1MDkwNTYwMGExNjU2MjdhN2E3MjMwNTgyMDE5ZDQ5ZTM4NjExODliZGZlOTViM2M5Mzk3YmY1MWU3YmFiOGRiOTg4M2FhN2E2MjA0ODE2Njk5YWY2OTJmYzQwMDI5J30gcmVmPXsoaW5wdXQpPT50aGlzLmJ5dGVDb2RlID0gaW5wdXR9PjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgPmZlZV9saW1pdO+8mjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVmPXsoaW5wdXQpPT50aGlzLmZlZV9saW1pdD1pbnB1dH0gZGVmYXVsdFZhbHVlPXtNYXRoLnBvdygxMCwxMCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgPmNhbGxfdmFsdWXvvJo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj17KGlucHV0KT0+dGhpcy5jYWxsX3ZhbHVlPWlucHV0fSBkZWZhdWx0VmFsdWU9ezB9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwi6YOo572y5ZCI57qmIC0gRGVwbG95IGNvbnRyYWN0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGhyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsID7mn6Xor6LlkIjnuqblnLDlnYAgLSBRdWVyeSBjb250cmFjdCBhZGRyZXNz77yaPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT17e3dpZHRoOiczMDBweCd9fSByZWY9eyhpbnB1dCk9PnRoaXMuY29udHJhY3RfYWRkcmVzcz1pbnB1dH0gZGVmYXVsdFZhbHVlPXtgYH0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLmn6Xor6LlkIjnuqYgLSBRdWVyeSBjb250cmFjdFwiIG9uQ2xpY2s9eygpPT50aGlzLmdldENvbnRyYWN0KCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi6LCD55So5ZCI57qmIC0gQ2FsbCBjb250cmFjdFwiIG9uQ2xpY2s9eygpPT57dGhpcy50cmlnZ2VyQ29udHJhY3QoKX19Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi55m75b2VIC0gbG9naW5cIiBvbkNsaWNrPXsoKT0+dGhpcy5sb2dpbigpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOidmaXhlZCcsbGVmdDowLHRvcDowfX0+XG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjb2xzPVwiMTAwXCIgcm93cz1cIjEwXCIgIHZhbHVlPXtzdHJpbmdpZnkoZGF0YSl9IG9uQ2hhbmdlPXsoKT0+e319PjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHN0eWxlIGpzeD57YFxuXG4gICAgICAgICAgICAgICAgICAgIGxhYmVse1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTppbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDoxNTBweDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICA8L3N0eWxlPlxuXG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICApXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgSW5kZXgiXX0= */\n/*@ sourceURL=pages/index.js */"
      }));
    }
  }]);

  return Index;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Index);
    (function (Component, route) {
      if(!Component) return
      if (false) return
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

})
//# sourceMappingURL=4.f10a613f09e60311930b.hot-update.js.map
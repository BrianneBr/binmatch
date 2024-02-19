# binmatch

[![NPM Version][npm-version-image]][npm-url]
[![NPM Install Size][npm-install-size-image]][npm-install-size-url]
<!-- [![NPM Downloads][npm-downloads-image]][npm-downloads-url] -->

Simple and effective binary pattern matching.

Define binary patterns and binary signatures to create simple matchers.

## Example
Pattern matching:
```js
import { Pattern } from "binmatch";

// Defined patterns may include wildcards & spaces
const webpPattern = new Pattern("52 49 46 46 ?? ?? ?? ?? 57 45 42 50");

const data = Buffer.from("5249464600000000574542500000", "hex");
if (webpPattern.test(data)) {
    console.log("Matched the WEBP pattern!");
}
```

Signature matching:
```js
import { Signature } from "binmatch";

// A Signature allows you to define multiple patterns at once
const jpegSignature = new Signature([
    "FF D8 FF E0 00 10 4A 46 49 46 00 01",
    "FF D8 FF EE",
    "FF D8 FF E1 ?? ?? 45 78 69 66 00 00",
    "FF D8 FF E0"
]);

const data = Buffer.from("FFD8FFE0000000", "hex");
if (jpegSignature.test(data)) {
    console.log("Matched a JPEG pattern!");
}
```

<!-- [npm-downloads-image]: https://badgen.net/npm/dm/binmatch
[npm-downloads-url]: https://npmcharts.com/compare/binmatch?minimal=true -->
[npm-install-size-image]: https://badgen.net/packagephobia/install/binmatch
[npm-install-size-url]: https://packagephobia.com/result?p=binmatch
[npm-url]: https://npmjs.org/package/binmatch
[npm-version-image]: https://badgen.net/npm/v/binmatch

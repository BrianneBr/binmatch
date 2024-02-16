# binmatch

Simple and effective binary pattern matching.

Define binary patterns and binary signatures to create simple matchers.

## Example
Pattern matching:
```js
import { Pattern } from "binmatch";

// Defined patterns may include wildcards & spaces
const webpPattern = new Pattern("52 49 46 46 ?? ?? ?? ?? 57 45 42 50");

const data = Buffer.from("52 49 46 46 00 00 00 00 57 45 42 50 00 00", "hex");
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

const data = Buffer.from("FF D8 FF E0 00 00 00", "hex");
if (jpegSignature.test(data)) {
    console.log("Matched a JPEG pattern!");
}
```

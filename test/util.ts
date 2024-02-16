/**
 * Shorthand tag function to make a {@link Buffer} from a hex string
 */
export function hex(strings: TemplateStringsArray): Buffer {
    if (strings.length != 1) {
        throw new Error("Invalid hex string");
    }
    return Buffer.from(strings[0], "hex");
}

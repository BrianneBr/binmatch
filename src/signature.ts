import { Pattern } from "./pattern";

/**
 * A set of {@link Pattern} which data can be tested against.
 */
export class Signature {
	private readonly patterns: Pattern[];

	public constructor(patterns: string | string[]) {
		if (!Array.isArray(patterns)) {
			patterns = [patterns];
		}

		this.patterns = patterns.map((text) => new Pattern(text));
	}

	/**
	 * Returns a boolean value that indicates whether or not the given data
	 * starts with a match to one of the patterns in this signature.
	 * @param {Buffer} data Buffer on which to perform the match test.
	 * @returns {boolean}
	 */
	public test(data: Buffer): boolean {
		return this.patterns.some((pattern) => pattern.test(data));
	}
}

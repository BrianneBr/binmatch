interface Segment {
	buffer: Buffer;
	offset: number;
}

/**
 * A binary pattern which data can be tested against.
 */
export class Pattern {
	private segments: Segment[];

	public constructor(pattern: string) {
		// Remove whitespace
		pattern = pattern.replace(/\s+/g, "");

		// Pattern length validation
		if (pattern.length === 0 || pattern.length % 2 !== 0) {
			throw new Error("Invalid pattern: Invalid length");
		}

		// Pattern character validation
		if (/[^0-9a-fA-F?]/.test(pattern)) {
			throw new Error("Invalid pattern: Invalid char(s)");
		}

		// Split pattern into non-wildcard chunks
		const chunks = pattern.split(/\?+/g);

		let searchOffset = 0;
		this.segments = chunks.map((chunk) => {
			// Ensure valid chunk length
			if (chunk.length % 2 !== 0) {
				throw new Error("Invalid pattern");
			}

			// Get the offset of the chunk within the pattern string
			const txtOffset = pattern.indexOf(chunk, searchOffset);

			if (txtOffset === -1) {
				throw new Error("Invalid pattern");
			}

			searchOffset = txtOffset + chunk.length;

			// Calculate binary offset for the chunk
			const offset = Math.floor(txtOffset / 2);

			// Generate a buffer from the chunk text
			const buffer = Buffer.from(chunk, "hex");

			return {
				buffer,
				offset,
			};
		});
	}

	/**
	 * Returns a boolean value that indicates whether or not the given data
	 * starts with a match to this pattern.
	 * @param {Buffer} data Buffer on which to perform the match test.
	 * @returns {boolean}
	 */
	public test(data: Buffer): boolean {
		return this.segments.every((segment) => {
			// Get the slice of the source buffer to compare against
			const slice = data.subarray(
				segment.offset,
				segment.offset + segment.buffer.length
			);

			return slice.equals(segment.buffer);
		});
	}
}

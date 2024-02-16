import { Signature } from "../src/signature";
import { hex } from "./util";

describe("Signature", () => {
	test("matches basic patterns", () => {
		const signature = new Signature("12AB");

		expect(signature.test(hex`12AB`)).toBeTruthy();
		expect(signature.test(hex`12AB56`)).toBeTruthy();

		expect(signature.test(hex`0012AB`)).toBeFalsy();
		expect(signature.test(hex`1235`)).toBeFalsy();
		expect(signature.test(hex`12`)).toBeFalsy();
	});

    test("matches multiple patterns", () => {
		const signature = new Signature([
            "12",
            "AB",
            "00 ?? 00"
        ]);

		expect(signature.test(hex`1234`)).toBeTruthy();
		expect(signature.test(hex`ABCD`)).toBeTruthy();
        expect(signature.test(hex`00110011`)).toBeTruthy();

        expect(signature.test(hex`5678`)).toBeFalsy();
		expect(signature.test(hex`00`)).toBeFalsy();
	});

    test("throws on invalid signature", () => {
        expect(() => new Signature("!!")).toThrow();
        expect(() => new Signature("123")).toThrow();
        expect(() => new Signature(["0000", "123"])).toThrow();
	});
});


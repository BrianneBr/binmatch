import { Pattern } from "../src/pattern";
import { hex } from "./util";

describe("Pattern", () => {
	test("matches basic patterns", () => {
		const pattern = new Pattern("12AB");

		expect(pattern.test(hex`12AB`)).toBeTruthy();
		expect(pattern.test(hex`12AB56`)).toBeTruthy();

		expect(pattern.test(hex`0012AB`)).toBeFalsy();
		expect(pattern.test(hex`1235`)).toBeFalsy();
		expect(pattern.test(hex`12`)).toBeFalsy();
	});

    test("supports spaces", () => {
		const pattern = new Pattern("  12 34 ");

		expect(pattern.test(hex`1234`)).toBeTruthy();
		expect(pattern.test(hex`123456`)).toBeTruthy();

		expect(pattern.test(hex`12000034`)).toBeFalsy();
        expect(pattern.test(hex`12`)).toBeFalsy();
	});

    test("supports wildcards", () => {
		const pattern = new Pattern("12??34");

		expect(pattern.test(hex`120034`)).toBeTruthy();
		expect(pattern.test(hex`12AA3456`)).toBeTruthy();

		expect(pattern.test(hex`12000034`)).toBeFalsy();
        expect(pattern.test(hex`1234`)).toBeFalsy();
        expect(pattern.test(hex`12`)).toBeFalsy();
	});

    test("throws on invalid pattern", () => {
        expect(() => new Pattern("!!")).toThrow();
        expect(() => new Pattern("123")).toThrow();
        expect(() => new Pattern("12YZ")).toThrow();
        expect(() => new Pattern("1?")).toThrow();
        expect(() => new Pattern("12???")).toThrow();
        expect(() => new Pattern("")).toThrow();
	});
});

